
/*configuracion accion personal*/

function get_permisos_user(user, tabla_id){
  console.log(">> get_permisos_user <<");
  //limpiarFormAccionPersonal();
  
  //var usuario1 = $("#user1_id option:selected").val();
  //var usuario2 = $("#user2_id option:selected").val();

  $.ajax({
    url: "data_grupos_users",
    type: "get",
    cache: 'false',
    data: {"user": user},
    dataType: "json",
    async:false,

    success: function(json) {
      $("#modalLoadin").hide();
      if(json['error']){
            if(json['error']['context'])
                var salida = json['error']['context']['resource'][0].message;
            else
                var salida = json['error']['message']
       }else{
          tabla="";
          tabla2="";
          if(json.length > 0){
            for(i = 0; i < json.length; i++) {
              if(json[i][5]==1){
               tabla+="<tr>";
               tabla+="<td align='center' >"+json[i][4]+"</td>";
               tabla+="</tr>";
              }else{
               tabla2+="<tr>";
               tabla2+="<td align='center' >"+json[i][4]+"</td>";
               tabla2+="</tr>";
               if(json[i][5]==0)
                  evento = 1;//add persimos originales
               else
                  evento = 0;//quitar permisos originales
              }
           }
          }

          if(evento==1){
            $("#eventoP").val(1);
            $("#check_p").removeClass('fa-times-circle');
            $("#check_p").addClass('fa-check');
            $("#tr_original").css('background-color','gray');
            $("#botonP").removeClass('btn-danger');
            $("#botonP").addClass('btn-success');
          }
          else{
            $("#eventoP").val(0);
            $("#check_p").removeClass('fa-check');
            $("#check_p").addClass('fa-times-circle');
            $("#tr_original").css('background-color','green');
            $("#botonP").removeClass('btn-success');
            $("#botonP").addClass('btn-danger');
          }

          $("#body"+tabla_id).html("");
          $("#body"+tabla_id).append(tabla2);

          $("#body"+tabla_id+"_aux").html("");
          $("#body"+tabla_id+"_aux").append(tabla);
      }           
    },
    error:function(data) {
      $("#modalLoadin").hide();
      swal("","Error: "+JSON.stringify(data), "error");
      console.log(JSON.stringify(data));
      
    },

  });
}


function cambiar_permisos(){
  console.log(">> cambiar_permisos <<");

  var r = confirm("Esta seguro?");
  if (r == true) {
    var usuario1 = $("#user1_id option:selected").val();
    var usuario2 = $("#user2_id option:selected").val();

    $.ajax({
      url: "cambiar_permisos",
      type: "post",
      cache: 'false',
      data: {"user1_id": usuario1,"user2_id":usuario2},
      dataType: "json",
      async:false,

      success: function(json) {
        $("#modalLoadin").hide();
        if(json['salida']!='OK'){
            swal("","Error: Comuniquese con el administrador", "error");
         }else{
            swal("","Registros Actualizados con exito", "success");
            get_permisos_user(usuario1,'tabla_permisos1');
            get_permisos_user(usuario2,'tabla_permisos2');
        }           
      },
      error:function(data) {
        $("#modalLoadin").hide();
        swal("","Error: Comuniquese con el administrador", "error");
        console.log(JSON.stringify(data));
        
      },

    });
  
  }else {
    txt = "You pressed Cancel!";
  }  
}


function add_permisos(){
  console.log(">> cambiar_permisos <<");

  var r = confirm("Esta seguro?");
  if (r == true) {
    var usuario1 = $("#user1_id option:selected").val();
    var usuario2 = $("#user2_id option:selected").val();

    $.ajax({
      url: "add_permisosUser",
      type: "post",
      cache: 'false',
      data: {"user1_id": usuario1,"user2_id":usuario2},
      dataType: "json",
      async:false,

      success: function(json) {
        console.log(json['salida']);
        $("#modalLoadin").hide();
        if(json['salida']!='OK'){
              if(json['error']['context'])
                  var salida = json['error']['context']['resource'][0].message;
              else
                  var salida = json['error']['message']
         }else{
            swal("","Registros Insertados con exito", "success");
            get_permisos_user(usuario2,'tabla_permisos2');
        }           
      },
      error:function(data) {
        $("#modalLoadin").hide();
        swal("","Error: "+JSON.stringify(data), "error");
        console.log(JSON.stringify(data));
        
      },

    });
  
  }else {
    txt = "You pressed Cancel!";
  }  
}


function return_permisos(){
  console.log(">> return_permisos <<");

  var r = confirm("Esta seguro?");
  if (r == true) {
    var usuario2 = $("#user2_id option:selected").val();

    $.ajax({
      url: "return_permisosUser",
      type: "post",
      cache: 'false',
      data: {"user2_id":usuario2},
      dataType: "json",
      async:false,

      success: function(json) {
        console.log(json['salida']);
        $("#modalLoadin").hide();
        if(json['salida']!='OK'){
              if(json['error']['context'])
                  var salida = json['error']['context']['resource'][0].message;
              else
                  var salida = json['error']['message']
         }else{
            swal("","Registros Insertados con exito", "success");
            get_permisos_user(usuario2,'tabla_permisos2');
        }           
      },
      error:function(data) {
        $("#modalLoadin").hide();
        swal("","Error: "+JSON.stringify(data), "error");
        console.log(JSON.stringify(data));
        
      },

    });
  
  }else {
    txt = "You pressed Cancel!";
  }  
}

function activar_permisos(){
  console.log(">> activar_permisos <<");

  var r = confirm("Esta seguro?");
  if (r == true) {
    var usuario2 = $("#user2_id option:selected").val();
    var evento = $("#eventoP").val();

    $.ajax({
      url: "activar_permisosUser",
      type: "post",
      cache: 'false',
      data: {"user2_id":usuario2,"evento":evento},
      dataType: "json",
      async:false,

      success: function(json) {
        console.log(json['salida']);
        $("#modalLoadin").hide();
        if(json['salida']!='OK'){
              if(json['error']['context'])
                  var salida = json['error']['context']['resource'][0].message;
              else
                  var salida = json['error']['message']
         }else{
            swal("","Registros Insertados con exito", "success");
            get_permisos_user(usuario2,'tabla_permisos2');
        }           
      },
      error:function(data) {
        $("#modalLoadin").hide();
        swal("","Error: "+JSON.stringify(data), "error");
        console.log(JSON.stringify(data));
        
      },

    });
  
  }else {
    txt = "You pressed Cancel!";
  }  
}
