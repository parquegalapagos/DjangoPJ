

// CARNETIZACION
var path_fotos = 'static/media/talentohumano/carnetizacion/';
var max_nombres_print = 26;

function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}

/*funcion para limpiar form carnetizacion*/
function limpiarFormCarnetizacion(){
 
  formulario = $("#cont_form_carnetizacion").val();

  $(".bodypopupGeneral").attr('id', 'bodyaddCarnetizacion');
  $("#tituloPopup").html("Registrar Carnetización");
  $("#content_body").html("");
  $("#content_body").append(formulario);

  $("#stackbox_save").attr('onClick', 'setInsertUpdateCarnetizacion();');


  $('#cntz_id').val();
  $('#tipot_carnetizacion').val(0);
  $("#foto_personal").attr('src', "/static/image/carnetizacion/icon_persona.jpg");
  $("#foto_personal").attr('style', "width:193px;height:237px;");
  $("#ctnz_estadocredencial").val("Pendiente").trigger("change");
  mostra_cntz_funcionario(0);

  if($("#cargaFunc").val() == 0)
    cargaFuncionariosSelect()
  else{             
    $("#cntz_funcionario_id").html($("#optionFuncS").val());
    $("#cntz_funcionario_id").select2({
      sorter: data => data.sort((a, b) => a.text.localeCompare(b.text)),
    });
  }
  //clearForm(frm_carnetizacion[0]);
}

/*cargar datos de funcionario en select carnetizacion*/
function cargaFuncionariosSelect(){
  
    $.ajax({
      url: "funcionario_selectbox",
      type: "get",
      data: {"data": ""},
      dataType: "json",
      async:false,

      success: function(data) {
         if(data['non_field_errors']){
              console.log(data['non_field_errors']);
         }else{
              console.log(data);
              if(data.length!=0){
                
                option = '<option value=""> Seleccione una opcion</option>';
                option_descrp = '';
                cargo_institucional= '';
                direccion= '';
                isla= '';
                identificacion= '';
                nombre_completo= '';
                if(data.length > 0){
                  for(i = 0; i < data.length; i++) {
                     if(data[i].cargo_institucional_id != null) cargo_institucional = data[i].cargo_institucional_id.nombre; else cargo_institucional = "";                 
                     if(data[i].direccion_estatuto_id != null) direccion = data[i].direccion_estatuto_id.name; else direccion = "";
                     if(data[i].isla_trabaja_id != null) isla = data[i].isla_trabaja_id.descripcion; else isla = "";
                     if(data[i].persona_id != null){
                        identificacion = data[i].persona_id.identificacion;
                        nombre_completo = data[i].persona_id.nombre_completo;
                     }else{
                        identificacion = "";
                        nombre_completo = "";
                     }
                     option+="<option value='"+data[i].id+"' direccion='"+direccion+"' cargoinst= '"+cargo_institucional+"' islatrabajo='"+isla+"' identificacion='"+identificacion +"'>"+nombre_completo+" </option>";
                  }
                }

                $("#optionFuncS").val(option);
                
                $("#cntz_funcionario_id").html(option);
                $("#cntz_funcionario_id").select2({
                  sorter: data => data.sort((a, b) => a.text.localeCompare(b.text)),
                });
                $("#cargaFunc").val(1);
              }else{
                console.log("NO DATA ACCION...");               
              }
              
        }           
      },
      error:function(data) {
        swal("","Error: "+JSON.stringify(data), "error");
        console.log(JSON.stringify(data));
         //console.log( JSON.stringify(data));
      },
    });
}

function setInsertUpdateCarnetizacion(){
  valida = validaContenedor("addCarnetizacion");
  if(valida){
    if($("#tipot_carnetizacion").val() == 0)
      insertarTablaCarnetizacion();
    else
      saveEditCarnetizacion();
  }
}

/*obtener datos carnetizacion por id*/
function editCarnetizacion(id){
  console.log("-------- editCarnetizacion  -------------");
  formulario = $("#cont_form_carnetizacion").val();

  $(".bodypopupGeneral").attr('id', 'bodyaddCarnetizacion');
  $("#tituloPopup").html("Editar Carnetización");

  $("#content_body").html("");
  $("#content_body").append(formulario);
  
  if($("#perm_add_perfuncionariocarnet").val() == "1"){
    $("#stackbox_save").attr('onClick', 'setInsertUpdateCarnetizacion();');
  }
  

  if($("#cargaFunc").val() == 0)
    cargaFuncionariosSelect()
  else{             
    $("#cntz_funcionario_id").html($("#optionFuncS").val());
    $("#cntz_funcionario_id").select2({
      sorter: data => data.sort((a, b) => a.text.localeCompare(b.text)),
    });
  }

  /*se toman los datos del atributo datos accion*/  
  /*datos = $("#td_datos_"+id).val();
  newF = datos.replace(/None/g,null)
  newF = newF.replace(/False/g,"'false'")
  newF = newF.replace(/True/g,"'true'")
  newF = newF.replace(/'/g,'"')
  newF = newF.replace(/master./g,"")
  //se convierte la cadena a json
  var json = JSON.parse("[" + newF + "]");

  
  console.log("foto: "+json[0].foto);

  $("#foto_personal").attr('src', "/static/dir_media/talentohumano/carnetizacion/"+json[0].foto);
  $("#foto_personal").attr('style', "width:317px;height:237px;");
  
  
  $("#tipot_carnetizacion").val(1);
  $("#cntz_id").val(id); 

  $("#cntz_funcionario_id").val(json[0].funcionario_id.id).trigger("change");
  $("#ctnz_estadocredencial").val(json[0].estado_credencial).trigger("change");
  $("#cntz_observacion").val(json[0].observaciones).trigger("change");
  $("#ctnz_cargo").val(json[0].cargo_id.id).trigger("change");*/

  $("#tipot_carnetizacion").val(1);
  $("#cntz_id").val(id); 
  $.ajax({
     url: "data_carnetizacion",
     type: "get",
     cache: 'false',
     data: {"data": id},
     dataType: "json",

     success: function(json) {
        $("#modalLoadin").hide();
        if(json['error']){
          if(json['error']['context'])
              var salida = json['error']['context']['resource'][0].message;
          else
              var salida = json['error']['message']
        }else{
          $("#foto_personal").attr('src', path_fotos+json[0].foto+"?timestamp="+ new Date().getTime());
          $("#foto_personal").attr('style', "width:193px;height:237px;");

          $("#cntz_funcionario_id").val(json[0].funcionario_id.id).trigger("change");
          $("#ctnz_estadocredencial").val(json[0].estado_credencial).trigger("change");
          $("#cntz_observacion").val(json[0].observaciones).trigger("change");
          $("#ctnz_cargo").val(json[0].cargo_id.id).trigger("change");
        }           
     },
     error:function(data) {
        $("#modalLoadin").hide();
        swal("","Error: "+JSON.stringify(data), "error");
        console.log(JSON.stringify(data));
        
     },
  });

  
}

/*funcion para insertar datos carnetizacion*/
function insertarTablaCarnetizacion(){
  console.log("----> insertarTablaCarnetizacion");
  //cntz_id = $("#cntz_id").val()
  cntz_id = uuidv4();
  $("#cntz_id").val(cntz_id);

  cntz_funcionario_id = $("#cntz_funcionario_id option:selected").val();
  ctnz_estadocredencial = $('#ctnz_estadocredencial').val();
  cntz_observacion = $('#cntz_observacion').val();
  cntz_cargo = $('#ctnz_cargo').val();
  nm_foto = cntz_id+'.jpeg';

  id_padre = $('#content_carnetizacion').parent().attr('id');
  datos ='{"id":"'+ cntz_id +'","funcionario_id":"'+cntz_funcionario_id+'", "estado_credencial":"'+ctnz_estadocredencial+'","observaciones":"'+ cntz_observacion + '", "foto":"'+ nm_foto +'", "cargo_id":"'+ cntz_cargo +'" }';

  th_insert_cntz(datos,"CZ_carnetizacion",id_padre,"perfuncionariocarnet");

}

/*funcion para insertar datos carnetizacion*/
function th_insert_cntz(cadena,pagina,id_padre,dj_url,recarga,){
  paginaBody = retornaBodyPagina(pagina);

  cadena = cadena.replace(/"null"/g,null);
  cadena = cadena.replace(/None/g,null);
  cadena = cadena.replace(/'/g,'"');
  cadena = cadena.replace(/\"\"/g,null);


  $('#modalLoadin').show();
  $.ajax({
     url: "insert_General",
     type: 'get',
     cache: 'false',
     data: {"dj_url": dj_url,"data": JSON.stringify("["+cadena+"]")},
     dataType: "json",
         success: function(data) {
             if(data['non_field_errors']){
                  
                  $('#modalLoadin').hide();
                  validaContenedorExt(paginaBody,"Error al Insertar el registro: "+data['non_field_errors'][0]);
                  console.log(data['non_field_errors']);
             }else{

                if(recarga != 1){
                  
                  //saveSnap("imageprev",data.id,path_fotos);
                                  
                  nm_foto = data["results"][0].id + '.jpeg';

                  saveSnap("imageprev", nm_foto, path_fotos);
                  swal("","Registro Insertado con éxito!", "success");

                  //Actualizar nombre de foto en tabla
                  datos2 ='{"foto":"'+nm_foto+'" }';
                  salida = th_update_cntz(datos2,"CZ_carnetizacion",id_padre,"perfuncionariocarnet",data["results"][0].id);

                  $.fn.extend({
                      syncLoad: function (url) {
                          var result = $.ajax({
                            url: url,
                            async: false,
                            type: "GET",
                            beforeSend: function() {
                              $('#modalLoadin').hide();
                            },
                          }).responseText;

                          $(this).html(result);
                          
                      }
                  });
                  $("#"+id_padre).syncLoad(pagina);
                }else{ $('#modalLoadin').hide(); return 'OK';}
             }
         },
         error:function(data) {
             $('#modalLoadin').hide();
             validaContenedorExt(paginaBody,"Error al Insertar el registro");
             console.log( JSON.stringify(data['non_field_errors']));
         },
  });
}

/*funcion para actualizar datos de carnetizacion*/
function saveEditCarnetizacion(){
  cntz_funcionario_id = $("#cntz_funcionario_id option:selected").val()
  ctnz_estadocredencial = $('#ctnz_estadocredencial').val();
  cntz_observacion = $('#cntz_observacion').val();
  cntz_cargo = $('#ctnz_cargo').val();

  id = $("#cntz_id").val();

  id_padre = $('#content_carnetizacion').parent().attr('id');
  nm_foto = id+'.jpeg';

  datos ='{"funcionario_id":"'+cntz_funcionario_id+'", "estado_credencial":"'+ctnz_estadocredencial+'","observaciones":"'+ cntz_observacion + '", "foto":"'+ nm_foto +'", "cargo_id":"'+ cntz_cargo +'" }';

  $("#td_cntz_ident_"+id).html($("#cntz_funcionario_id option:selected").attr('identificacion'));
  $("#td_cntz_nombrecompleto_"+id).html($("#cntz_funcionario_id option:selected").text());
  $("#td_cntz_cargofunc_"+id).html($("#ctnz_cargo option:selected").text());
  $("#td_cntz_estadocred_"+id).html(ctnz_estadocredencial);

  salida = th_update_cntz(datos,"CZ_carnetizacion",id_padre,"perfuncionariocarnet",id);
}

/*funcion para actualziar datos carnetizacion*/
function th_update_cntz(cadena,pagina,id_padre,dj_url,idtabla){
  console.log("******* th_update_cntz **********");
  paginaBody = retornaBodyPagina(pagina);

  cadena = cadena.replace(/"null"/g,null)
  cadena = cadena.replace(/None/g,null)
  cadena = cadena.replace(/'/g,'"')
  cadena = cadena.replace(/\"\"/g,null);


  $.ajax({
       url: "update_General",
       data: {"dj_url": dj_url,"idtabla": idtabla,"data": JSON.stringify(cadena)},
       type: "get",
       cache: 'false',
       async: true,
       dataType: "json",

       success: function(data) {
           if(data['non_field_errors']){
                $('#modalLoadin').hide();
                validaContenedorExt(paginaBody,"Error al Actualizar el registro: "+data['non_field_errors'][0]);
                return 0;
           }else{
                //var salida = data['resource'][0].id;
                nm_foto = id + '.jpeg';
                saveSnap("imageprev",nm_foto,path_fotos);
                swal("","Registro Actualizado con éxito!", "success");
                return 1;                
           }
       },
       error:function(data) {
           $('#modalLoadin').hide();
           validaContenedorExt(paginaBody,"Error al Insertar el registro");
           console.log( JSON.stringify(data['non_field_errors']));
           return 0;
       },
    });
}

/*funcion eliminar datos carnetizacion*/
function deleteCarnetizacion(id){
  id_padre = $('#content_carnetizacion').parent().attr('id');
  datos ='{"estado":"I","eliminado":"t"}';
  th_delete(datos,"CZ_carnetizacion",id_padre,"perfuncionariocarnet",id);

}

/*funcion para setear datos del funcionario*/
function set_funcionariocarnet_detalles(){

  var funcionario = $("#cntz_funcionario_id option:selected").text().toUpperCase();
  var identificacion = $("#cntz_funcionario_id option:selected").attr("identificacion");
  var direccion = $("#cntz_funcionario_id option:selected").attr("direccion").toUpperCase();
  var cargoinst = $("#cntz_funcionario_id option:selected").attr("cargoinst").toUpperCase();
  var islatrabajo = $("#cntz_funcionario_id option:selected").attr("islatrabajo").toUpperCase();

  $("#cntz_identificacion").html(identificacion);
  $("#cntz_direccion").html(direccion);
  //$("#cntz_cargoinst").html(cargoinst);
  $("#cntz_islatrabajo").html(islatrabajo);

}

function mostra_cntz_funcionario(param){
  if(param == 1){
    $("#cntz_info_funcionario").show();
  }else{
    $("#cntz_info_funcionario").hide();
  }
}

function init_funcionario_selectbox(){
  console.log("----------init_funcionario_selectbox----------");
  var session_token = sessionStorage.getItem('session_token');

  $.ajax({
     type : 'GET',
     url: "funcionario_selectbox",
     cache: 'false',
     data: {"session_token": session_token },
     dataType: "json",
         success: function(data) {
             
          console.log(data.length);
          tabla="";

          if(data.length > 0){
            for(i = 0; i < data.length; i++) {   
              
                
                tabla+= "<option value='"+data[i].id+"' >";
                tabla+= data[i].persona_id.nombre_completo;
                tabla+= "</option>";

            }
            $("#cntz_funcionario_id").html(tabla);

          }

         },
         error:function(data) {
             //$('#modalLoadin').hide();
             //validaContenedorExt(paginaBody,"Error al Insertar el registro");
             //console.log( JSON.stringify(data['non_field_errors']));
             console.log("----------BAD........");
         },
  });
}

/*funcion generar pdf */
function verPdfAccion_cntz(id){
  /*se limpia el formulario del pdf*/

  //let frame = document.getElementById('prueba_212');
  //frame.contentWindow.postMessage("The user is", "https://produccion.sia.dpng.gob.ec:8243/pentaho/api/repos/%3Ahome%3ADPNG%3AReportes%3ACUEM%3AManejo%20Pesquero%3Acontador_guiasmovilizacion.prpt/viewer");

  $(".pdf_ctnz").each(function(){
    $("#"+$(this).attr("id")).html("");
  });
  $("#pdf_cntz_foto").attr('src','');

  $.ajax({
     url: "data_carnetizacion",
     type: "get",
     cache: 'false',
     data: {"data": id},
     dataType: "json",

     success: function(json) {
        $("#modalLoadin").hide();
        if(json['error']){
          if(json['error']['context'])
              var salida = json['error']['context']['resource'][0].message;
          else
              var salida = json['error']['message']
        }else{
          nombre_completo = "";
          nombres = json[0].funcionario_id.persona_id.nombres;
          apellidos = json[0].funcionario_id.persona_id.apellidos;

          num_letras = nombres.length + apellidos.length;
          if (num_letras > max_nombres_print){
            console.log("NO PERMITIDO");
            nombre = nombres.split(" ",1);
            nombre_completo = nombre + ' '+ json[0].funcionario_id.persona_id.apellidos;
          }else{
            nombre_completo = json[0].funcionario_id.persona_id.nombres + ' '+ json[0].funcionario_id.persona_id.apellidos;
          }
          $("#pdf_cntz_foto").attr('src',path_fotos+id+'.jpeg');
          $("#pdf_cntz_nombres").html(nombre_completo);
          $("#pdf_ctnz_identificacion").html(json[0].funcionario_id.persona_id.identificacion);
          
          if(json[0].funcionario_id.direccion_estatuto_id != null){
            $("#pdf_cntz_dpngdireccion").html(json[0].funcionario_id.direccion_estatuto_id.name);
          }
          if(json[0].cargo_id != null){
            $("#pdf_cntz_cargo").html(json[0].cargo_id.label);
          }
     
        }           
     },
     error:function(data) {
        $("#modalLoadin").hide();
        swal("","Error: "+JSON.stringify(data), "error");
        console.log(JSON.stringify(data));
        
     },
  });
}

/*funcion para generar pdf*/
function generarPdf_cntz(){
  const element = document.getElementById("section_rep");
  filename = 'carnet.pdf'

  html2pdf(element, {
      margin:       [0, 0, 0, 0],
      filename:     filename,
      html2canvas:  { scale: 10, letterRendering: true },
      jsPDF:        { unit: 'mm', format: [53.98,85.60], orientation: 'portrait',putOnlyUsedFonts:true }
      });

}


function readURL(input) {
  console.log("**** readURL ****");
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    
    reader.onload = function(e) {
      //$('#foto_personal').attr('src', e.target.result);
      document.getElementById('results').innerHTML = '<input type="image" name="imageprev" id="imageprev" style="width: 193px; height: 237px;" src="'+e.target.result+'"/>';
    }
    
    reader.readAsDataURL(input.files[0]);
  }
}


/*********** CONFIGURACION *************/

// Carnetizacion Cargos
function limpiarFormCarnetizCargos(){

  formulario = $("#cont_form_ctnzcargos").val();

  $(".bodypopupGeneral").attr('id', 'bodyaddcntzcargos');
  $("#tituloPopup").html("Registrar Carnetizacion-Cargos");
  $("#content_body").html("");
  $("#content_body").append(formulario);

  $("#stackbox_save").attr('onClick', 'setInsertUpdateCntzCargo();');

  $('#idrollaboral').val();
  $('#tipot_rol').val(0);
  clearForm(frm_rol_laboral[0]);
}

function setInsertUpdateCntzCargo(){
  valida = validaContenedor("addcntzcargos");
  if(valida){
    if($("#cntzcargo_tipo").val() == 0)
      insertarTablaCtnzCargo();
    else
      saveEditCtnzCargo();
  }
}

/*funcion para obtener cargos carnetizacion*/
function editCntzCargo(id){

  formulario = $("#cont_form_ctnzcargos").val();

   /*se toman los datos del atributo datos accion*/  
  datos = $("#td_datos_"+id).val();
  newF = datos.replace(/None/g,null)
  newF = newF.replace(/False/g,"'false'")
  newF = newF.replace(/True/g,"'true'")
  newF = newF.replace(/'/g,'"')
  newF = newF.replace(/master./g,"")

  //se convierte la cadena a json
  var json = JSON.parse("[" + newF + "]");

  $(".bodypopupGeneral").attr('id', 'bodyaddcntzcargos');
  $("#tituloPopup").html("Editar Carnetización-Cargos");
  $("#content_body").html("");
  $("#content_body").append(formulario);
  $("#stackbox_save").attr('onClick', 'setInsertUpdateCntzCargo();');

  $("#cntzcargo_tipo").val(1);

  $("#idrollaboral").val(id); 

  estado = $("#td_estado_"+id).html();
  descripcion = $("#td_label_"+id).html();
  observacion = $("#td_observacion_"+id).val();

  $("#cntzcargo_descrip").val(descripcion);
  $("#SestadoRol").val(estado).trigger("change");
  $("#observacion_rol").val(observacion);

}

/*funcion para insertar cargos carnetizacion*/
function insertarTablaCtnzCargo(){

  desc_func   = $('#desc_rol').val();
  estado      = $('#SestadoRol').val();
  observacion = $('#observacion_rol').val();

  id_padre = $('#content_rol_laboral').parent().attr('id');
  datos ='{"descripcion":"'+desc_func+'", "observaciones":"'+observacion+'"}';
  th_insert(datos,"rol_laboral",id_padre,"gthrollaboral")
}

/*funcion insertar cargos carnetizacion*/
function saveEditCtnzCargo(){

  desc_dis   = $('#desc_rol').val();
  estado     = $('#SestadoRol').val();
  observacion = $('#observacion_rol').val();

  id = $("#idrollaboral").val();

  id_padre = $('#content_rol_laboral').parent().attr('id');

  datos ='{"descripcion":"'+desc_dis+'", "observaciones":"'+observacion+'", "estado":"'+estado+'"}';

  $("#td_desc_"+id).html(desc_dis);
  $("#td_estado_"+id).html($("#SestadoRol").val());
  $("#td_observacion_"+id).val($("#observacion_rol").val());

  salida = th_update(datos,"rol_laboral",id_padre,"gthrollaboral",id);
}

/*funcion eliminar rol carnetizacion*/
function deleteRollaboral(id){
  id_padre = $('#content_rol_laboral').parent().attr('id');
  datos ='{"estado":"I","eliminado":"t"}';
  th_delete(datos,"rol_laboral",id_padre,"gthrollaboral",id);
}



