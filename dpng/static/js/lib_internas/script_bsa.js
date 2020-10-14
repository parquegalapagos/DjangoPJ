// Actual addTab function: adds new tab using the input from the form above
function addTab(titulo, contenido, idmenu) {
    // $("#modalLoadin").show();
    cont = 0;

    $('.' + contenido + '').each(function() {
        cont++;
    });

    if (cont == 0) {

        $("#" + idmenu).removeClass("fa-circle-o");
        $("#" + idmenu).addClass("fa-dot-circle-o");
        $("#" + idmenu).parent().css("color", "#00c0ef");

        $('#modalLoadin').show();
        $("#principal_home").hide();
        var n = $("#tabs_ul li").length;

        tabCounter = $("#conta_tab").val();
        id = "tabs-" + tabCounter;

        tabs.find(".ui-tabs-nav").append("<li id='li_" + id + "' tab_name='" + contenido + "' class='" + contenido + "'><a href='#" + id + "' style='font-weight:bold;font-family: Comic Sans MS, Comic Sans, cursive'>" + titulo + "</a> <span class='ui-icon ui-icon-close' idmenu='" + idmenu + "' role='presentation'></span></li>");
        tabs.append("<div id='" + id + "'></div>");

        $.fn.extend({
            syncLoad: function(url) {
                $("#modalLoadin").show();
                var result = $.ajax({
                    url: url,
                    async: false,
                    type: "GET",
                    success: function(html) {
                        $('#modalLoadin').hide();
                    }
                }).responseText;

                $(this).html(result);
            }
        });

        $("#" + id).syncLoad(contenido);

        tabs.tabs("refresh");
        $("#tabs").tabs({
            active: $('.ui-tabs-nav li:last').index()
        });

        $("#conta_tab").val(parseInt(tabCounter) + 1)
    } else $("#tabs").tabs({
        active: $('.ui-tabs-nav li.' + contenido + '').index()
    });
}

function addPag(titulo, contenido, idmenu) {

    $(".fa-dot-circle-o").each(function(index) {
          $("#" + $(this).attr('id')).removeClass("fa-dot-circle-o");
          $("#" + $(this).attr('id')).addClass("fa-circle-o");
          $("#" + $(this).attr('id')).parent().css("color", "");
      });

    
    $("#" + idmenu).addClass("fa-dot-circle-o");
    $("#" + idmenu).parent().css("color", "#00c0ef");

    $('#modalLoadin').show();
    $("#principal_home").hide();
    //var n = $("#tabs_ul li").length;

    //tabCounter = $("#conta_tab").val();
    id = "tabs-" + 0;

    //tabs.find(".ui-tabs-nav").append("<li id='li_" + id + "' tab_name='" + contenido + "' class='" + contenido + "'><a href='#" + id + "' style='font-weight:bold;font-family: Comic Sans MS, Comic Sans, cursive'>" + titulo + "</a> <span class='ui-icon ui-icon-close' idmenu='" + idmenu + "' role='presentation'></span></li>");
    tabs.append("<div id='" + id + "'></div>");

    $.fn.extend({
        syncLoad: function(url) {
            $("#modalLoadin").show();
            var result = $.ajax({
                url: url,
                async: false,
                type: "GET",
                success: function(html) {
                    $('#modalLoadin').hide();
                }
            }).responseText;

            $(this).html(result);
        }
    });

    $("#" + id).syncLoad(contenido);

}

// Close icon: removing the tab on click
$(".ui-icon-close").click(function() {

    var panelId = $(this).closest("li").remove().attr("aria-controls");
    $("#" + panelId).remove();
    tabs.tabs("refresh");

    var n = $("#tabs_ul li").length;
    if (n == 0)
        $("#principal_home").show();

    idmenu = $(this).attr("idmenu");
    $("#" + idmenu).removeClass("fa-dot-circle-o");
    $("#" + idmenu).addClass("fa-circle-o");
    $("#" + idmenu).parent().css("color", "");

    //tinyMCE.get(".editor").remove();
});

$(".ui-icon-close").keyup(function(event) {
    if (event.altKey && event.keyCode === $.ui.keyCode.BACKSPACE) {
        var panelId = tabs.find(".ui-tabs-active").remove().attr("aria-controls");
        $("#" + panelId).html("");
        $("#" + panelId).remove();
        tabs.tabs("refresh");
    }
});
/*fin codigo para agregar pestañas al contenedor*/

function generarPdfMpetreo() {
    const element = document.getElementById("bodympetreoPdf");

    filename = 'guiaMPetreo.pdf'
    var opt = {
        margin: [0.10, 0.10, 0.10, 0.10],
        filename: 'myfile.pdf',
        image: {
            type: 'jpeg',
            quality: 0.98
        },
        html2canvas: {
            scale: 2
        },
        jsPDF: {
            unit: 'in',

            orientation: 'landscape'
        }

    };

    html2pdf().set(opt).from(element).save();
}

/*funcion para limpiar formulario de ingreso y actualizacion de Listas*/
function limpiarFormVehiculoST() {
    clearForm(frm_vehiculo);
    $("#SestadoVehiculo").val("A").trigger("change");
    $("#tipoVST").val(0);
}

function buscarVehiculoParametros(){
console.log(121);
    /*if (nombre != "")
        data = "persona_id__nombre_completo__icontains=" + nombre + "&";

    if (cedula != "")
        data += "persona_id__identificacion__icontains=" + cedula + "&";*/

    //data += "descripcion__icontains=" + cedula + "&";

    dataC = "";

     $.ajax({
        url: "data_vehiculoParam",
        type: "get",
        data: {
            "data": dataC
        },
        async: false,
        dataType: "json",
        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
            } else {

                tabla = "";
                dataArray = "";
                if (data.length > 0) {
                    for (i = 0; i < data.length; i++) {
                        tabla += "<tr>";
                        tabla += "<td align='center' id='td_vehiculo_"+data[i].id+"'>" + data[i].descripcion + "</td>"; 
                        tabla += "<td align='center' id='td_marca_"+data[i].id+"'>" + data[i].marca + "</td>";
                        tabla += "<td align='center' id='td_modelo_"+data[i].id+"'>" + data[i].modelo + "</td>";
                        tabla += "<td align='center' id='td_color_"+data[i].id+"'>" + data[i].color + "</td>";
                        tabla += "<td align='center' id='td_identificador_"+data[i].id+"'>" + data[i].identificador + "</td>";
                        tabla += "<td align='center' id='td_estado_"+data[i].id+"'>" + data[i].estado + "</td>";
                        tabla += "<td align='center'><a href='#addVehiculo' data-stackbox='true' data-stackbox-position='absolute' onclick='editVehiculo(\"" + data[i].id + "\")'><i class='fa fa-edit text-green btn_edit'></i></a> </td>";
                        tabla += "<td align='center'><a onclick='deleteModal(\"" + data[i].id + "\",\"vehiculo\");'><i class='fa fa-trash text-green btn_edit'></i></a></td>";
                        tabla += "</tr>";                
                    }
                }

                $('#tabla_vehiculo').dataTable().fnClearTable();
                $('#tabla_vehiculo').dataTable().fnDestroy();

                $("#bodytabla_vehiculo").html("");
                $("#bodytabla_vehiculo").append(tabla);

                var table = $('#tabla_vehiculo').DataTable();

            }
        },
        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
        },
    });
} 

/*funcion para verificar si se realiza una insercion o una actualizacion*/
/*el valor del if se llena con 0 cuando se da click en el boton nuevo y con 1 cuando se da clik en editar*/
function setInsertUpdateVehiculo() {
    valida = validaContenedor("addVehiculo");

    if (valida) {
        if ($("#tipoVST").val() == 0)
            insertarTablaVehiculo();
        else
            saveEditVehiculo();
    }
}

/*funcion para asignar los datos al formulario*/
/*parametros id ---> id tabla*/
function editVehiculo(id) {
    
$.ajax({
        url: "vehiculo_data",
        type: "get",
        data: {
            "data": id
        },
        dataType: "json",

        success: function(json) {
            $("#modalLoadin").hide();
            if (json['non_field_errors']) {
                console.log(json['non_field_errors']);
            } else {
                $("#tipoVST").val(1);
                $("#idVehiculoST").val(json[0].id);
                $("#marcaVehiculoST").val(json[0].marca);
                $("#modeloVehiculoST").val(json[0].modelo);
                $("#colorVehiculoST").val(json[0].color);
                $("#identificadorVehiculoST").val(json[0].identificador);
                $("#descVehiculoST").val(json[0].descripcion);
                $("#SestadoVehiculoST").val(json[0].estado).trigger("change");
                $("#observacionVehiculoST").val(json[0].observaciones);
            }
        },
        error: function(json) {
            $("#modalLoadin").hide();
            swal("", "Error: " + JSON.stringify(json), "error");
            console.log(JSON.stringify(json));
            //console.log( JSON.stringify(data));
        },
    });
}

/*funcion para insertar en la base de datos*/
function insertarTablaVehiculo() {
    desc   = $('#descVehiculoST').val();
    marca   = $('#marcaVehiculoST').val();
    modelo   = $('#modeloVehiculoST').val();
    color   = $('#colorVehiculoST').val();
    identificador   = $('#identificadorVehiculoST').val();

    estado = $('#SestadoVehiculoST').val();
    observacion = $('#observacionVehiculoST').val();

    id_padre = $('#content_vehiculo').parent().attr('id');
    datos = '{"descripcion":"' + desc + '", "marca":"' + marca + '", "modelo":"' + modelo + '", "color":"' + color + '","identificador":"' + identificador + '", "observaciones":"' + observacion + '"}';
    th_insert(datos, "vehiculo", id_padre, "trpvehiculo")
}

/*funcion para editar en la base de datos*/
/*el id se lo guarda en un campo oculto al momento de dar clik en editar*/
function saveEditVehiculo() {

    desc   = $('#descVehiculoST').val();
    marca   = $('#marcaVehiculoST').val();
    modelo   = $('#modeloVehiculoST').val();
    color   = $('#colorVehiculoST').val();
    identificador   = $('#identificadorVehiculoST').val();

    estado = $('#SestadoVehiculoST').val();
    observacion = $('#observacionVehiculoST').val();

    id = $("#idVehiculoST").val();

    id_padre = $('#content_vehiculo').parent().attr('id');

    datos = '{"descripcion":"' + desc + '", "marca":"' + marca + '", "modelo":"' + modelo + '", "color":"' + color + '","identificador":"' + identificador + '", "observaciones":"' + observacion + '"}';

    $("#td_vehiculo_" + id).html(desc);
    $("#td_marca_" + id).html(marca);
    $("#td_modelo_" + id).html(modelo);
    $("#td_color_" + id).html(color);
    $("#td_identificador_" + id).html(identificador);
    $("#td_observacion_" + id).html(observacion);
    $("#td_estado_" + id).html(estado);

    salida = th_update(datos, "vehiculo", id_padre, "trpvehiculo", id);
}

/*funcion para eliminar(cambio de estado en la base de datos)*/
function deleteVehiculo(id) {
    id_padre = $('#content_vehiculo').parent().attr('id');
    datos = '{"estado":"I","eliminado":"t"}';
    th_delete(datos, "vehiculo", id_padre, "trpvehiculo", id);
}

/*datos VehiculoTipo*/

/*funcion para limpiar formulario de ingreso y actualizacion de Listas*/
function limpiarFormVehiculoTipoST() {
    clearForm(frm_vehiculotipo);
    $("#SestadoVehiculoTipo").val("A").trigger("change");
    $("#tipoVST").val(0);
}

/*funcion para verificar si se realiza una insercion o una actualizacion*/
/*el valor del if se llena con 0 cuando se da click en el boton nuevo y con 1 cuando se da clik en editar*/

function setInsertUpdateVehiculoTipo() {
    console.log(11);
    valida = validaContenedor("addVehiculoTipo");

    if (valida) {
        if ($("#tipoVST").val() == 0)
            insertarTablaVehiculoTipo();
        else
            saveEditVehiculoTipo();
    }
}

function buscarVehiculoTipoParametros(){
console.log(121);
    /*if (nombre != "")
        data = "persona_id__nombre_completo__icontains=" + nombre + "&";

    if (cedula != "")
        data += "persona_id__identificacion__icontains=" + cedula + "&";*/

    //data += "descripcion__icontains=" + cedula + "&";

    dataC = "";

     $.ajax({
        url: "data_vehiculotipoParam",
        type: "get",
        data: {
            "data": dataC
        },
        async: false,
        dataType: "json",
        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
            } else {

                tabla = "";
                dataArray = "";
                if (data.length > 0) {
                    for (i = 0; i < data.length; i++) {
                        tabla += "<tr>";
                        tabla += "<td align='center' id='td_vehiculotipo_"+data[i].id+"'>" + data[i].nombre + "</td>";  
                        tabla += "<td align='center' id='td_estado_"+data[i].id+"'>" + data[i].estado + "</td>";
                        tabla += "<td align='center'><a href='#addVehiculoTipo' data-stackbox='true' data-stackbox-position='absolute' onclick='editVehiculoTipo(\"" + data[i].id + "\")'><i class='fa fa-edit text-green btn_edit'></i></a> </td>";
                        tabla += "<td align='center'><a onclick='deleteModal(\"" + data[i].id + "\",\"vehiculotipo\");'><i class='fa fa-trash text-green btn_edit'></i></a></td>";
                        tabla += "</tr>";                
                    }
                }

                $('#tabla_vehiculotipo').dataTable().fnClearTable();
                $('#tabla_vehiculotipo').dataTable().fnDestroy();

                $("#bodytabla_vehiculotipo").html("");
                $("#bodytabla_vehiculotipo").append(tabla);

                var table = $('#tabla_vehiculotipo').DataTable();

            }
        },
        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
        },
    });
} 



/*funcion para verificar si se realiza una insercion o una actualizacion*/
/*el valor del if se llena con 0 cuando se da click en el boton nuevo y con 1 cuando se da clik en editar*/
function setInsertUpdateVehiculoTipo() {
    valida = validaContenedor("addVehiculoTipo");

    if (valida) {
        if ($("#tipoVST").val() == 0)
            insertarTablaVehiculoTipo();
        else
            saveEditVehiculoTipo();
    }
}

/*funcion para asignar los datos al formulario*/
/*parametros id ---> id tabla*/
function editVehiculoTipo(id) {
    
$.ajax({
        url: "vehiculotipo_data",
        type: "get",
        data: {
            "data": id
        },
        dataType: "json",

        success: function(json) {
            $("#modalLoadin").hide();
            if (json['non_field_errors']) {
                console.log(json['non_field_errors']);
            } else {
                $("#tipoVST").val(1);
                $("#idVehiculoTipoST").val(json[0].id);
                $("#descVehiculoTipoST").val(json[0].nombre);
                $("#SestadoVehiculoTipoST").val(json[0].estado).trigger("change");
                $("#observacionVehiculoTipoST").val(json[0].observaciones);
            }
        },
        error: function(json) {
            $("#modalLoadin").hide();
            swal("", "Error: " + JSON.stringify(json), "error");
            console.log(JSON.stringify(json));
            //console.log( JSON.stringify(data));
        },
    });
}

/*funcion para insertar en la base de datos VehiculoTipo*/
function insertarTablaVehiculoTipo() {
    
    estado = $('#SestadoVehiculoTipoST').val();
    observacion = $('#observacionVehiculoTipoST').val();
    nombre = $('#descVehiculoTipoST').val();
    
    
    id_padre = $('#content_vehiculotipo').parent().attr('id');
    datos = '{"nombre":"' + nombre + '","observaciones":"' + observacion + '", "estado":"' + estado + '"}';
    th_insert(datos, "vehiculotipo", id_padre, "trpvehiculotipo")
}

/*funcion para editar en la base de datos*/
/*el id se lo guarda en un campo oculto al momento de dar clik en editar*/
function saveEditVehiculoTipo() {

    nombre   = $('#descVehiculoTipoST').val();
    estado = $('#SestadoVehiculoTipoST').val();
    observacion = $('#observacionVehiculoTipoST').val();
    

    id = $("#idVehiculoTipoST").val();

    id_padre = $('#content_vehiculotipo').parent().attr('id');

    datos = '{"nombre":"' + nombre + '","observaciones":"' + observacion + '", "estado":"' + estado + '"}';

    $("#td_vehiculotipo_" + id).html(nombre);
    $("#td_estado_" + id).html(estado);

    salida = th_update(datos, "vehiculotipo", id_padre, "trpvehiculotipo", id);
}

/*funcion para eliminar(cambio de estado en la base de datos)*/
function deleteVehiculoTipo(id) {
    id_padre = $('#content_vehiculotipo').parent().attr('id');
    datos = '{"estado":"I","eliminado":"t"}';
    th_delete(datos, "vehiculotipo", id_padre, "trpvehiculotipo", id);
}




/*Datos de Material Petreo*/
function getDataMPetreo(json) { 
    console.log(111);
    $("#personaidSA").val(json[0].id);
    $("#personaSA").val(json[0].nombre_completo);

    persona_id = json[0].id;

    getVehiculoPersona(persona_id,"");
}

function getVehiculoPersona(persona_id,vehiculos){
    $.ajax({
        url: "data_vehiculosXpersona",
        type: "get",
        data: {
            "data": persona_id
        },
        async: false,
        dataType: "json",
        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
            } else {

                tabla = "";
                dataArray = "";
                style = "";
                checked = "";
                if (data.length > 0) {
                    for (i = 0; i < data.length; i++) {
                        if( (i%2) ==0)
                            style = "";
                        else
                            style = "background-color: #eee;";

                        if(vehiculos.indexOf(data[i].vehiculo_id.id) > -1)
                            checked = "checked";
                        else
                            checked = "";

                        tabla += "<tr style='"+style+"'>";
                        tabla += "<td hidden>" + data[i].vehiculo_id.id  + "</td>";
                        tabla += "<td align='left' style='border: 1px solid;'>" + data[i].vehiculo_id.identificador  + "</td>";                      
                        tabla += "<td align='left' style='border: 1px solid;'>" + $("#StvehiculoSA option[value='" + data[i].vehiculo_id.tipo_id + "']").text() + "</td>";
                        tabla += "<td align='center' style='border: 1px solid;'><input type='checkbox' id='tchech"+i+"' "+checked+"/></td>";
                        tabla += "</tr>";                
                    }
                }

                $("#bodytabla_userVeh").html("");
                $("#bodytabla_userVeh").append(tabla);
            }
        },
        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
        },
    });
}

function getPlacasVehiculosPersona(persona_id,vehiculos){
    placas = "";
    $.ajax({
        url: "data_vehiculosXpersona",
        type: "get",
        data: {
            "data": persona_id
        },
        async: false,
        dataType: "json",
        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
                return "-1";
            } else {
                
                if (data.length > 0) {
                    for (i = 0; i < data.length; i++) {
                        if(vehiculos.indexOf(data[i].vehiculo_id.id) > -1)
                            placas += data[i].vehiculo_id.identificador+"   ,";
                              
                    }
                }
                placas = placas.substring(0, placas.length - 1);
            }
        },
        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
            return "-1";
        },
    });
    return placas;
}

function insertarVehiculoPersona(){
    placa      = $("#placaSA").val();
    tipo_id    = $("#StvehiculoSA").val();
    persona_id = $("#personaidSA").val();

    datos   = '{"identificador":"' + placa + '", "tipo_id":"' + tipo_id + '"}';

    dj_url = "trpvehiculo";
    $.ajax({
        url: "insert_General",
        type: 'get',
        cache: 'false',
        data: {
            "dj_url": dj_url,
            "data": JSON.stringify("[" + datos + "]")
        },
        dataType: "json",
        success: function(data) {
            if (!data['results']) {
                //$('#modalLoadin').hide();
                swal("", "Error al Insertar el registro: " + data['non_field_errors'][0], "error");
                console.log("data---->" + datos + "--->" + "spncontrolhuevos" + "Error--->" + data);
            } else {
                console.log(data['results'][0].id);
                datosPV   = '{"persona_id":"' + persona_id + '", "vehiculo_id":"' + data['results'][0].id + '"}';
                $.ajax({
                    url: "insert_General",
                    type: 'get',
                    cache: 'false',
                    data: {
                        "dj_url": "trppersonavehiculo",
                        "data": JSON.stringify("[" + datosPV + "]")
                    },
                    dataType: "json",
                    success: function(data2) {
                        if (!data2['results']) {
                            //$('#modalLoadin').hide();
                            swal("", "Error al Insertar el registro: " + data2['non_field_errors'][0], "error");
                            console.log("data---->" + datosPV + "--->" + "spncontrolhuevos" + "Error--->" + data2);
                        } else {
                            getVehiculoPersona(persona_id,"");
                        }
                    },
                    error: function(data) {
                        $('#modalLoadin').hide();
                        swal("", "Error al Insertar el registro", "error");
                        console.log("data---->" + datosPV + "--->" + "spncontrolhuevos" + "Error--->" + data2);
                    },
                });    
            }
        },
        error: function(data) {
            $('#modalLoadin').hide();
            swal("", "Error al Insertar el registro", "error");
            console.log("data---->" + datos + "--->" + "spncontrolhuevos" + "Error--->" + data);
        },
    });
}


function limpiarFormControlMaterialSA() {
    clearForm(frm_mpetreo);
    $("#tipoCMPSA").val(0);
    $("#idMpetreoSA").val("");
    /*se limpia la tabla de visitas*/
    var today = new Date();
    document.getElementById("fechaSA").value = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
    document.getElementById("fechaViajeSA").value = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);

    $("#bodytabla_userVeh").html("");
    $("#bodytabla_userVeh").append("");

    $('#tabla_visitas').dataTable().fnClearTable();
    $('#tabla_visitas').dataTable().fnDestroy();

    $("#bodytabla_visitas").html("");
    $("#bodytabla_visitas").append("");
    $('.nav-tabs a[href="#tab_GenMP"]').tab('show'); //para q cuando se abra el popup aparezca en la primera pestaña
}

/*Datos Tipo Usuario*/

/*funcion para limpiar formulario de ingreso y actualizacion de Listas*/
function limpiarFormTipoUsuarioST() {
    clearForm(frm_tipousuario);
    $("#SestadoTipoUsuario").val("A").trigger("change");
    $("#tipoTUST").val(0);
}

function buscarTipoUsuarioParametros(){
console.log(121);
    dataC = "";

     $.ajax({
        url: "data_tipousuarioParam",
        type: "get",
        data: {
            "data": dataC
        },
        async: false,
        dataType: "json",
        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
            } else {

                tabla = "";
                dataArray = "";
                if (data.length > 0) {
                    for (i = 0; i < data.length; i++) {
                        tabla += "<tr>";
                        tabla += "<td align='center' id='td_tipousuario_"+data[i].id+"'>" + data[i].descripcion + "</td>";             
                        tabla += "<td align='center' id='td_estado_"+data[i].id+"'>" + data[i].estado + "</td>";
                        tabla += "<td align='center'><a href='#addTipoUsuario' data-stackbox='true' data-stackbox-position='absolute' onclick='editTipoUsuario(\"" + data[i].id + "\")'><i class='fa fa-edit text-green btn_edit'></i></a> </td>";
                        tabla += "<td align='center'><a onclick='deleteModal(\"" + data[i].id + "\",\"tipousuario\");'><i class='fa fa-trash text-green btn_edit'></i></a></td>";
                        tabla += "</tr>";
                    }
                }
                $('#tabla_tipousuario').dataTable().fnClearTable();
                $('#tabla_tipousuario').dataTable().fnDestroy();

                $("#bodytabla_tipousuario").html("");
                $("#bodytabla_tipousuario").append(tabla);

                var table = $('#tabla_tipousuario').DataTable();
                }
        },
        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
        },
    });
}

/*funcion para asignar los datos al formulario*/
/*parametros id ---> id tabla*/
function editTipoUsuario(id) {
    
$.ajax({
        url: "tipousuario_data",
        type: "get",
        data: {
            "data": id
        },
        dataType: "json",

        success: function(json) {
            $("#modalLoadin").hide();
            if (json['non_field_errors']) {
                console.log(json['non_field_errors']);
            } else {
                $("#tipoTUST").val(1);
                $("#idTipoUsuarioST").val(id);
                $("#descTipoUsuarioST").val(json[0].descripcion);
                $("#SestadoTipoUsuarioST").val(json[0].estado).trigger("change");
                $("#observacionTipoUsuarioST").val(json[0].observaciones);
            }
        },
        error: function(json) {
            $("#modalLoadin").hide();
            swal("", "Error: " + JSON.stringify(json), "error");
            console.log(JSON.stringify(json));
            //console.log( JSON.stringify(data));
        },
    });
}

/*funcion para verificar si se realiza una insercion o una actualizacion*/
/*el valor del if se llena con 0 cuando se da click en el boton nuevo y con 1 cuando se da clik en editar*/
function setInsertUpdateTipoUsuario() {
    valida = validaContenedor("addTipoUsuario");

    if (valida) {
        if ($("#tipoTUST").val() == 0)
            insertarTablaTipoUsario();
        else
            saveEditTipoUsario();
    }
}

/*funcion para insertar en la base de datos*/
function insertarTablaTipoUsario() {
    desc   = $('#descTipoUsuarioST').val();
    
    estado = $('#SestadoTipoUsuarioST').val();
    observacion = $('#observacionTipoUsuarioST').val();

    id_padre = $('#content_tipousuario').parent().attr('id');
    datos = '{"descripcion":"' + desc + '", "observaciones":"' + observacion + '"}';
    th_insert(datos, "tipousuario", id_padre, "trptipousuario")
}

/*funcion para editar en la base de datos*/
/*el id se lo guarda en un campo oculto al momento de dar clik en editar*/
function saveEditTipoUsario() {

    desc   = $('#descTipoUsuarioST').val();
    
    estado = $('#SestadoTipoUsuarioST').val();
    observacion = $('#observacionTipoUsuarioST').val();

    id = $("#idTipoUsuarioST").val();

    id_padre = $('#content_tipousuario').parent().attr('id');

    datos = '{"descripcion":"' + desc + '", "observaciones":"' + observacion + '"}';

    $("#td_tipousuario_" + id).html(desc);
    
    $("#td_observacion_" + id).html(observacion);
    $("#td_estado_" + id).html(estado);

    salida = th_update(datos, "tipousuario", id_padre, "trptipousuario", id);
}

/*funcion para eliminar(cambio de estado en la base de datos)*/
function deleteTipoUsuario(id) {
    id_padre = $('#content_tipousuario').parent().attr('id');
    datos = '{"estado":"I","eliminado":"t"}';
    th_delete(datos, "tipousuario", id_padre, "trptipousuario", id);
}


/*parametros id ---> id tabla*/
function editControlMaterial(id,vehiculos) {
limpiarFormControlMaterialSA();
$.ajax({
        url: "controlMaterial_data",
        type: "get",
        data: {
            "data": id
        },
        dataType: "json",

        success: function(json) {
            $("#modalLoadin").hide();
            if (json['non_field_errors']) {
                console.log(json['non_field_errors']);
            } else {
                $("#tipoCMPSA").val(1);
                $("#idMpetreoSA").val(json[0].id);
                $("#personaidSA").val(json[0].usuario_id.id);
                $("#nroSolSA").val(json[0].numero_solicitud);
                $("#personaSA").val(json[0].usuario_id.nombre_completo);
                $("#fechaSA").val(json[0].fecha_recepcion);
                $("#StusuarioSA").val(json[0].tipo_usuario_id.id).trigger("change");

                /*se limpia la tabla de visitas*/
                $('#tabla_visitas').dataTable().fnClearTable();
                $('#tabla_visitas').dataTable().fnDestroy();

                $("#bodytabla_visitas").html("");
                $("#bodytabla_visitas").append("");

                var dTable = $('#tabla_visitas').DataTable();
                option   = '';
                
                if(json[0].detmatpetreo.length > 0){
                    for(i=0; i< json[0].detmatpetreo.length; i++){
                        select ='';
                        option ='';
                        datosDet = '';
                        if(json[0].detmatpetreo[i].estado == 'A'){
                            $('#SsitioExtSA > option').each((index, obj) => {
                            if($(obj).val() == json[0].detmatpetreo[i].sitio_extraccion_id)
                                selected = 'selected';
                            else
                                selected = '';
                            option+="<option value ='"+$(obj).val()+"'' "+selected+">"+$(obj).text()+"</option>";
                            })
                            select = '<select>'+option+'</select>'
                            sitio       = select;
                            fecha_viaje = json[0].detmatpetreo[i].fecha_viaje;

                            arena       = "<input type='text' style='width:50px;' value='"+( (parseInt(json[0].detmatpetreo[i].arena) == "0" || json[0].detmatpetreo[i].arena == null)  ? "" : json[0].detmatpetreo[i].arena )+"' onkeypress='return isNumberKey(event);'/>";
                            granillo    = "<input type='text' style='width:50px;' value='"+( (parseInt(json[0].detmatpetreo[i].granillo) == "0" || json[0].detmatpetreo[i].arena == null)  ? "" : json[0].detmatpetreo[i].granillo )+"' onkeypress='return isNumberKey(event);'/>";
                            relleno     = "<input type='text' style='width:50px;' value='"+( (parseInt(json[0].detmatpetreo[i].relleno) == "0" || json[0].detmatpetreo[i].arena == null)  ? "" : json[0].detmatpetreo[i].relleno )+"' onkeypress='return isNumberKey(event);'/>";
                            bloque      = "<input type='text' style='width:50px;' value='"+( (parseInt(json[0].detmatpetreo[i].bloque) == "0" || json[0].detmatpetreo[i].arena == null)  ? "" : json[0].detmatpetreo[i].bloque )+"' onkeypress='return isNumberKey(event);'/>";
                            ripio       = "<input type='text' style='width:50px;' value='"+( (parseInt(json[0].detmatpetreo[i].ripio) == "0" || json[0].detmatpetreo[i].arena == null)  ? "" : json[0].detmatpetreo[i].ripio )+"' onkeypress='return isNumberKey(event);'/>";
                            eliminar    = "<a class='delete' id_detalle='"+json[0].detmatpetreo[i].id+"'><i class='fa fa-trash text-green btn_edit'></i></a>";

                            datosDet  += '{';
                            datosDet  += '"numeracion":"", ';
                            datosDet  += '"fecha_viaje":"' + fecha_viaje + '", ';
                            datosDet  += '"sitio_extraccion_id":"' + sitio + '", ';
                            datosDet  += '"arena":"' + arena  + '", ';
                            datosDet  += '"granillo":"' + granillo  + '",'; 
                            datosDet  += '"relleno":"' + relleno  + '",'; 
                            datosDet  += '"bloque":"' + bloque  + '", ';
                            datosDet  += '"ripio":"' + ripio  +'",';
                            datosDet  += '"eliminar":"' + eliminar  +'"';
                            datosDet  += '}'; 
                            AddRowDataTable('tabla_visitas',datosDet);                           
                        }
                    }
                }

                getVehiculoPersona(json[0].usuario_id.id,json[0].vehiculos);
            }
        },
        error: function(json) {
            $("#modalLoadin").hide();
            swal("", "Error: " + JSON.stringify(json), "error");
            console.log(JSON.stringify(json));
            //console.log( JSON.stringify(data));
        },
    });
}

function ControlMaterialPdf(id) {
    $.ajax({
        url: "controlMaterial_data",
        type: "get",
        data: {
            "data": id
        },
        dataType: "json",
        async: false,
        success: function(json) {
            $("#modalLoadin").hide();
            if (json['non_field_errors']) {
                console.log(json['non_field_errors']);
            } else {

                $("#for_numSolSA").html(json[0].numero_solicitud);
                $("#for_fechaEmiSA").html(json[0].fecha_recepcion);
                $("#for_fechaCadSA").html(json[0].fecha_recepcion);
                $("#for_nUsuarioSA").html(json[0].usuario_id.nombre_completo);
                $("#for_institucionSA").html(json[0].tipo_usuario_id.descripcion);
                //$("#StusuarioSA").html(json[0].tipo_usuario_id.descripcion);

                 $("#for_placaSA").html(getPlacasVehiculosPersona(json[0].usuario_id.id,json[0].vehiculos));

                
                option   = '';
                
                if(json[0].detmatpetreo.length > 0){
                    arena = 0;
                    granillo = 0;
                    relleno = 0;
                    bloque = 0;
                    ripio = 0;
                    arraySitio = [];
                    for(i=0; i< json[0].detmatpetreo.length; i++){
                        select ='';
                        option ='';
                        datosDet = '';   
                        if(json[0].detmatpetreo[i].estado == 'A'){
                           
                            arraySitio.push($("#SsitioExtSA option[value='" + json[0].detmatpetreo[i].sitio_extraccion_id + "']").text());
                            arena += parseInt(json[0].detmatpetreo[i].arena);
                            granillo += parseInt(json[0].detmatpetreo[i].granillo);
                            relleno += parseInt(json[0].detmatpetreo[i].relleno);
                            bloque += parseInt(json[0].detmatpetreo[i].bloque);
                            ripio += parseInt(json[0].detmatpetreo[i].ripio);   
                                                       
                        }
                    }
                }
                cadenaM = '';
                if(arena > 0 ) cadenaM += 'Arena, ';
                if(granillo > 0 ) cadenaM += 'Granillo, ';
                if(relleno > 0 ) cadenaM += 'P.Relleno, ';
                if(bloque > 0 ) cadenaM += 'Bloque, ';
                if(ripio > 0 ) cadenaM += 'ripio, ';

                cadenaM = cadenaM.substring(0, cadenaM.length - 1);

                $("#for_materialSA").html(cadenaM);
                console.log(arraySitio);
                var uniqs = arraySitio.filter(function(item, index, array) {
                  return array.indexOf(item) === index;
                })
                console.log(uniqs); // [ 1, 2, 5, 6 ]
                $("#for_sitioSA").html(uniqs.join(",  "));
            }
        },
        error: function(json) {
            $("#modalLoadin").hide();
            swal("", "Error: " + JSON.stringify(json), "error");
            console.log(JSON.stringify(json));
            //console.log( JSON.stringify(data));
        },
    });
}

function buscarControlMaterialSA() {
    console.log(11);
    dataC = "";

     $.ajax({
        url: "data_controlMaterialParam",

        type: "get",
        data: {
            "data": dataC
        },
        async: false,
        dataType: "json",
        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
            } else {

                tabla = "";
                dataArray = "";
                if (data.length > 0) {
                    for (i = 0; i < data.length; i++) {
                        tabla += "<tr>";
                        /*hacer la secuencia para el  numero de solicitud*/
                        tabla += "<td align='center' id='td_nro_"+data[i].id+"'>" + data[i].numero_solicitud + "</td>";                      
                        tabla += "<td align='left' id='td_fecha_"+data[i].id+"'>" + data[i].fecha_recepcion + "</td>";
                        tabla += "<td align='left' id='td_usuario_"+data[i].id+"'>" + data[i].usuario_id.nombre_completo + "</td>";
                        tabla += "<td align='left' id='td_tusuario_"+data[i].id+"'>" + data[i].tipo_usuario_id.descripcion + "</td>";
                        tabla += "<td align='center'><a href='#addMpetreo' data-stackbox='true' data-stackbox-position='absolute' data-stackbox-width='1000' onclick='editControlMaterial(\"" + data[i].id + "\",\"" + data[i].vehiculos + "\")'><i class='fa fa-edit text-green btn_edit'></i></a> </td>";
                        tabla += "<td align='center'><a href='#mpetreoPdf' data-stackbox='true' data-stackbox-position='absolute' data-stackbox-width='1000' onclick='ControlMaterialPdf(\"" + data[i].id + "\")'><i class='fa fa-id-card text-green btn_edit'></i></a> </td>";
                        tabla += "<td align='center'><a onclick='deleteModal(\"" + data[i].id + "\",\"VehiculoTipo\");'><i class='fa fa-trash text-green btn_edit'></i></a></td>";
                        tabla += "</tr>";                
                    }
                }

                $('#tabla_mpetreo').dataTable().fnClearTable();
                $('#tabla_mpetreo').dataTable().fnDestroy();

                $("#bodytabla_mpetreo").html("");
                $("#bodytabla_mpetreo").append(tabla);

                var table = $('#tabla_mpetreo').DataTable();
            }
        },
        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
        },
    });
}

function setInsertUpdateControlMaterial() {
    valida = validaContenedor("addMpetreo");

    if (valida) {
        persona_id = $("#personaidSA").val();
        fecha_recp = $("#fechaSA").val();
        num_viajes = $("#num_viajesSA").val();
        tipo_user  = $("#StusuarioSA").val();
        ordenPago  = $("#ordenPagoSA").val();
        vehiculos = "";
        //var table = $("#tabla_userVeh tbody");
        inicial = 1;
        final = 0;
        
        var filas = $("#tabla_userVeh").find("tr"); //devulve las filas del body de tu tabla segun el ejemplo que brindaste
        var resultado = "";
        for(i=1; i<filas.length; i++){ //Recorre las filas 1 a 1
            var celdas = $(filas[i]).find("td"); //devolverá las celdas de una fila
            
            codigo  = $(celdas[0]).text();
            checked = $($(celdas[3]).children("input")[0]).is(':checked');
            
            if (checked) {
                vehiculos += codigo+"|";
            }
        }
        vehiculos = vehiculos.substring(0, vehiculos.length - 1);
        
        datosDet = '';
        var filas = $("#tabla_visitas").find("tr"); //devulve las filas del body de tu tabla segun el ejemplo que brindaste
        var resultado = "";
        for(i=1; i<filas.length; i++){ //Recorre las filas 1 a 1
            var celdas = $(filas[i]).find("td"); //devolverá las celdas de una fila
            
            fecha_viaje  = $(celdas[1]).text();
            sitio        = $($(celdas[2]).children("select")[0]).val();
            arena        = $($(celdas[3]).children("input")[0]).val();
            granillo     = $($(celdas[4]).children("input")[0]).val();
            relleno      = $($(celdas[5]).children("input")[0]).val();
            bloque       = $($(celdas[6]).children("input")[0]).val();
            ripio        = $($(celdas[7]).children("input")[0]).val();
            id_detalle        = $($(celdas[8]).children("a")[0]).attr("id_detalle");

            datosDet  += '{"fecha_viaje":"' + fecha_viaje + '", ';
            datosDet  += '"sitio_extraccion_id":"' + sitio + '", ';
            datosDet  += '"arena":"' + ( (arena == "null" || arena == "")  ? 0 : arena ) + '", ';
            datosDet  += '"granillo":"' + ( (granillo == "null" || granillo == "")  ? 0 : granillo ) + '",'; 
            datosDet  += '"relleno":"' + ( (relleno == "null" || relleno == "")  ? 0 : relleno ) + '",'; 
            datosDet  += '"bloque":"' + ( (bloque == "null" || bloque == "")  ? 0 : bloque ) + '", ';
            datosDet  += '"ripio":"' + ( (ripio == "null" || ripio == "")  ? 0 : ripio )+'"';
            //solo id si es un update
            if($("#tipoCMPSA").val() == 1)
                datosDet  += ',"id":"' + id_detalle + '"';
            datosDet  += '},';            
        }

        datosDet = datosDet.substring(0, datosDet.length - 1);

        datos   = '{"usuario_id":"' + persona_id + '", "orden_pago":"' + ordenPago + '", "fecha_recepcion":"' + fecha_recp + '" , "numero_viajes":"' + num_viajes + '" , "tipo_usuario_id":"' + tipo_user + '", "vehiculos":"' + vehiculos + '","detmatpetreo":[' + datosDet + ']}';

        if ($("#tipoCMPSA").val() == 0)
            insertarCabControlMaterial(datos);
        else
            saveEditCabControlMaterial(datos);
    }
}

function insertarCabControlMaterial(datos){
    dj_url = "trpcabdetcontrolmaterialpetreo";
    $.ajax({
        url: "insert_General",
        type: 'get',
        cache: 'false',
        data: {
            "dj_url": dj_url,
            "data": JSON.stringify("[" + datos + "]")
        },
        dataType: "json",
        success: function(data) {
            if (!data['results']) {
                //$('#modalLoadin').hide();
                swal("", "Error al Insertar el registro: " + data['non_field_errors'][0], "error");
                console.log("data---->" + datos + "--->" + "trpcontrolmaterialpetreo" + "Error--->" + data);
            } else {
                swal("", "Registro insertado con Exito", "success");
                console.log(data['results'][0].id);
                
                buscarControlMaterialSA();      
            }
        },
        error: function(data) {
            $('#modalLoadin').hide();
            swal("", "Error al Insertar el registro", "error");
            console.log("data---->" + datos + "--->" + "trp_control_material_petreo" + "Error--->" + data);
        },
    });
}

function saveEditCabControlMaterial(datos){

    dj_url = "trpcabdetcontrolmaterialpetreo";
    $.ajax({
        url: "update_General",
        type: 'get',
        cache: 'false',
        data: {
            "dj_url": dj_url,
            "idtabla": $("#idMpetreoSA").val(),
            "data": JSON.stringify(datos)
        },
        dataType: "json",
        success: function(data) {
            if (data.id == undefined) {
                //$('#modalLoadin').hide();
                swal("", "Error al Actualizar el registro", "error");
                console.log("data---->" + datos + "--->" + "trpcontrolmaterialpetreo" + "Error--->" + data);
            } else {
                swal("", "Registro Actualizados con Exito", "success");               
            }
        },
        error: function(data) {
            swal("", "Error al Actualizar el registro", "error");
            console.log("data---->" + datos + "--->" + "trpcontrolmaterialpetreo" + "Error--->" + data);
        },
    });
}


function insertarDetControlMaterial(){

    id_cab = $("#idMpetreoSA").val();

    fecha_viaje = $('#fechaViajeSA').val();
    sitio_id       = $('#SsitioExtSA').val();
    numRegistro = $('#numRegistroSA').val();

    if(numRegistro == "")
        numRegistro = 1;


    if(fecha_viaje == ""){
        validaContenedorExt("addMpetreo", "Fecha de viaje no puede ser nula","error");
        return 0;
    }

    selected ='';
    option   ='';
    datosDet ='';

    $('#SsitioExtSA > option').each((index, obj) => {
        if($(obj).val() == $('#SsitioExtSA').val())
            selected = 'selected';
        else
            selected = '';
        option+="<option value ='"+$(obj).val()+"' "+selected+">"+$(obj).text()+"</option>";
    })
    select = '<select>'+option+'</select>'
    sitio       = select;
    arena       = "<input type='text' style='width:50px;' onkeypress='return isNumberKey(event);'/>";
    granillo    = "<input type='text' style='width:50px;' onkeypress='return isNumberKey(event);'/>";
    relleno     = "<input type='text' style='width:50px;' onkeypress='return isNumberKey(event);'/>";
    bloque      = "<input type='text' style='width:50px;' onkeypress='return isNumberKey(event);'/>";
    ripio       = "<input type='text' style='width:50px;' onkeypress='return isNumberKey(event);'/>";

   



    for(i=0; i<parseInt(numRegistro); i++){

        datosDet = '';
        datosDet  += '{';
        datosDet  += '"numeracion":"'+(i+1)+'", ';
        datosDet  += '"fecha_viaje":"' + fecha_viaje + '", ';
        datosDet  += '"sitio_extraccion_id":"' + sitio + '", ';
        datosDet  += '"arena":"' + arena  + '", ';
        datosDet  += '"granillo":"' + granillo  + '",'; 
        datosDet  += '"relleno":"' + relleno  + '",'; 
        datosDet  += '"bloque":"' + bloque  + '", ';
        datosDet  += '"ripio":"' + ripio  +'",';  

        if ($("#tipoCMPSA").val() != 0){

            datos   = '{"cab_matpetreo_id":"' + id_cab + '", "fecha_viaje":"' + fecha_viaje + '", "sitio_extraccion_id":"' + sitio_id + '"}';

            dj_url = "trpcontrolmaterialpetreodetalle";
            $.ajax({
                url: "insert_General",
                type: 'get',
                cache: 'false',
                data: {
                    "dj_url": dj_url,
                    "data": JSON.stringify("[" + datos + "]")
                },
                dataType: "json",
                success: function(data) {
                    if (!data['results']) {
                        //$('#modalLoadin').hide();
                        swal("", "Error al Insertar el registro: " + data['non_field_errors'][0], "error");
                        console.log("data---->" + datos + "--->" + "trpcontrolmaterialpetreodetalle" + "Error--->" + data);
                    } else {
                        eliminar  = "<a class='delete' id_detalle='"+data['results'][0].id+"'><i class='fa fa-trash text-green btn_edit'></i></a>";
                        datosDet  += '"eliminar":"' + eliminar  +'"';
                        datosDet  += '}'; 
                        AddRowDataTable('tabla_visitas',datosDet);    
                    }
                },
                error: function(data) {
                    $('#modalLoadin').hide();
                    swal("", "Error al Insertar el registro", "error");
                    console.log("data---->" + datos + "--->" + "trp_control_material_petreo" + "Error--->" + data);
                },
            });
        }else{

            eliminar  = "<a class='delete'><i class='fa fa-trash text-green btn_edit'></i></a>";
            datosDet  += '"eliminar":"' + eliminar  +'"';
            datosDet  += '}'; 
            console.log(datosDet);
            AddRowDataTable('tabla_visitas',datosDet);
        }
    }
}

function AddRowDataTable(tabla,camposString){
    camposJson = JSON.parse(camposString);
    var dTable = $('#'+tabla).DataTable();
            dTable.row.add([
                camposJson.numeracion,
                camposJson.fecha_viaje,
                camposJson.sitio_extraccion_id,
                camposJson.arena,
                camposJson.granillo,
                camposJson.relleno,
                camposJson.bloque,
                camposJson.ripio,
                camposJson.eliminar
            ]).draw();

            dTable.on( 'order.dt search.dt', function () {
                dTable.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                    cell.innerHTML = i+1;
                } );
            } ).draw();
}

$('#tabla_visitas').on('click', '.delete', function () {
    var pageParamTable = $('#tabla_visitas').DataTable();
    var tableRow = pageParamTable.row($(this).parents('tr'));
    id_detalle = $(this).attr("id_detalle");
    
    //console.log(id_detalle);
    if(id_detalle){
        datos = '{"estado":"I","eliminado":"t"}';
        $.ajax({
        url: "update_General",
        type: "get",
        cache: 'false',
        data: {
            "dj_url": "trpcontrolmaterialpetreodetalle",
            "idtabla": id_detalle,
            "data": JSON.stringify(datos)
        },
        dataType: "json",

        success: function(data) {
            if (data.id == undefined) {
                $('#modalLoadin').hide();
                validaContenedorExt("addMpetreo", "Error al Insertar el registro");
                console.log("idtabla---->" + id + "--->" + "data---->" + datos + "--->" + "trpcontrolmaterialpetreodetalle" + "Error--->" + data);
            } else {
                validaContenedorExt2("addMpetreo", "Registro eliminado con exito");
                pageParamTable.row( tableRow ).remove().draw();
            }
        },
        error: function(data) {
            $('#modalLoadin').hide();
            validaContenedorExt("addMpetreo", "Error al Insertar el registro");
            console.log("idtabla---->" + id + "--->" + "data---->" + datos + "--->" + "trpcontrolmaterialpetreodetalle" + "Error--->" + data);
        },
    });
    }else
        pageParamTable.row( tableRow ).remove().draw();
});



/*Datos Configuracion Parametros*/

/*funcion para limpiar formulario de ingreso y actualizacion de Listas*/
function limpiarFormBsaParametrosConfigST() {
    clearForm(frm_bsaparametrosconfig);
    $("#SestadoParamConfig").val("A").trigger("change");
    $("#tipoBSPC").val(0);
}

function buscarFormBsaParametrosConfigParam(){
console.log(121);
    dataC = "";

     $.ajax({
        url: "data_bsaparametrosconfigParam",
        type: "get",
        data: {
            "data": dataC
        },
        async: false,
        dataType: "json",
        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
            } else {

                tabla = "";
                dataArray = "";
                if (data.length > 0) {
                    for (i = 0; i < data.length; i++) {
                        tabla += "<tr>";
                           
                        tabla += "<td align='center' id='td_nombre_"+data[i].id+"'>" + data[i].nombre + "</td>"; 
                        tabla += "<td align='center' id='td_desc_"+data[i].id+"'>" + data[i].descripcion + "</td>";
                        tabla += "<td align='center' id='td_categoria_"+data[i].id+"'>" + data[i].categoria + "</td>";
                        tabla += "<td align='center' id='td_valor_"+data[i].id+"'>" + data[i].valor + "</td>";         
                        tabla += "<td align='center' id='td_estado_"+data[i].id+"'>" + data[i].estado + "</td>";
                        tabla += "<td align='center' id='td_observaciones_"+data[i].id+"'>" + data[i].observaciones + "</td>";
                        tabla += "<td align='center'><a href='#addBsaParametrosConfig' data-stackbox='true' data-stackbox-position='absolute' onclick='editBsaParametrosConfig(\"" + data[i].id + "\")'><i class='fa fa-edit text-green btn_edit'></i></a> </td>";
                        tabla += "<td align='center'><a onclick='deleteModal(\"" + data[i].id + "\",\"bsaparametrosconfig\");'><i class='fa fa-trash text-green btn_edit'></i></a></td>";
                        tabla += "</tr>";
                    }
                }
                $('#tabla_bsaparametrosconfig').dataTable().fnClearTable();
                $('#tabla_bsaparametrosconfig').dataTable().fnDestroy();

                $("#bodytabla_bsaparametrosconfig").html("");
                $("#bodytabla_bsaparametrosconfig").append(tabla);

                var table = $('#tabla_bsaparametrosconfig').DataTable();
                }
        },
        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
        },
    });
}

function limpiarFormInfoCampo(){
 $('.nav-tabs a[href="#tab_Gen"]').tab('show'); //para q cuando se abra el popup aparezca en la primera pestaña

$("#SprocesoicSA").val("PRC_CREI").trigger("change");
$("#SsubprocesoicSA").val("SPC_BSA").trigger("change");
$("#actividadicSA").val("");
$("#SislaicSA").val("").trigger("change");
$("#fechadesdeicSA").val("");
$("#fechahastaicSA").val("");
$("#fechapreicSA").val("");
$("#StransporteicSA").val("").trigger("change");

tinymce.get("ci_desaSA").setContent("");
tinymce.get("ci_resultSA").setContent("");
tinymce.get("ci_concluSA").setContent("");
tinymce.get("ci_obserSA").setContent("");
tinymce.get("ci_recomaSA").setContent("");

$('#tablafotos_rep').dataTable().fnClearTable();
$('#tablafotos_rep').dataTable().fnDestroy();

$("#bodytablafotos_rep").html("");

$("#tipoICSA").val(0);
$("#idInfCampoSA").val("");
$('#descargaICSA').val(0);
$('#secInfCampoSA').val(0);
}


function setInsertUpdateInfoCampo() {
    valida = validaContenedor("infocampo");

    if (valida) {
        proceso = $("#SprocesoicSA").val();
        subproc = $("#SsubprocesoicSA").val();
        activid = $("#actividadicSA").val();
        fdesde  = $("#fechadesdeicSA").val();
        fhasta  = $("#fechahastaicSA").val();
        fprese  = $("#fechapreicSA").val();
        transp  = $("#StransporteicSA").val();
        //sitio   = $("#SislaicSA").val();
        periodo = $("#periodoSA").val();

        arraySitio = $("#SislaicSA").val();   
        console.log(periodo);

        intro = tinyMCE.get('ci_introSA').getContent();
        objet = tinyMCE.get('ci_objSA').getContent();
        mater = tinyMCE.get('ci_matSA').getContent();
        metod = tinyMCE.get('ci_metSA').getContent();
        desar = tinyMCE.get('ci_desaSA').getContent();
        resul = tinyMCE.get('ci_resultSA').getContent();
        concl = tinyMCE.get('ci_concluSA').getContent();
        obser = tinyMCE.get('ci_obserSA').getContent();
        recom = tinyMCE.get('ci_recomaSA').getContent();

        datosDet = '';
        var filas = $("#tablafotos_rep").find("tr"); //devulve las filas del body de tu tabla segun el ejemplo que brindaste
        var resultado = "";
        for(i=1; i<filas.length; i++){ //Recorre las filas 1 a 1
            var celdas = $(filas[i]).find("td"); //devolverá las celdas de una fila
            console.log(celdas.length);
            if(celdas.length > 1){  
            
                orden  = $($(celdas[0]).children("input")[0]).val();;
                foto   = $(celdas[2]).text();
                comentario  = $(celdas[3]).text();
                id_detalle  = $($(celdas[4]).children("a")[0]).attr("id_detalle");

                datosDet  += '{"orden":"' + orden + '", ';
                datosDet  += '"foto":"' + foto + '", ';
                datosDet  += '"comentario":"' + comentario + '" ';
                //solo id si es un update
                if($("#tipoICSA").val() == 1){
                    //datoshormiga  += ',"cab_especieintro_id":"' + $("#idcabespecie").val() + '"';
                    if((id_detalle == null)||(id_detalle == ""))
                        datosDet  += '';
                    else
                        datosDet  += ',"id":"' + id_detalle + '"';
                }
                datosDet  += '},'; 
            }           
        }

        datosDet = datosDet.substring(0, datosDet.length - 1);


        /*se arma la cadena datos*/
        datos = '{';
        //datos += ' "numero":"", ';
        datos += ' "proceso":"' + proceso + '", ';
        datos += ' "sitio_id":"' + arraySitio.join("|") + '", ';
        datos += ' "subproceso":"' + subproc + '", ';
        datos += ' "actividad":"' + activid + '", ';
        datos += ' "fecha_desde":"' + fdesde + '", ';
        datos += ' "fecha_hasta":"' + fhasta + '", ';
        datos += ' "fecha_presentacion":"' + fprese + '", ';
        datos += ' "periodo":"' + periodo + '", ';
        datos += ' "transporte_id":"' + transp + '", ';
        datos += ' "introduccion":"' + intro.replace(/\n\r?/g, '').replace(/["]+/g, "'").replace(/\//g, "/") + '" ,';
        datos += ' "objetivos":"' + objet.replace(/\n\r?/g, '').replace(/["]+/g, "'").replace(/\//g, "/") + '" ,';
        datos += ' "materiales":"' + mater.replace(/\n\r?/g, '').replace(/["]+/g, "'").replace(/\//g, "/") + '" ,';
        datos += ' "metodologia":"' + metod.replace(/\n\r?/g, '').replace(/["]+/g, "'").replace(/\//g, "/") + '" ,';
        datos += ' "desarrollo":"' + desar.replace(/\n\r?/g, '').replace(/["]+/g, "'").replace(/\//g, "/") + '" ,';
        datos += ' "resultados":"' + resul.replace(/\n\r?/g, '').replace(/["]+/g, "'").replace(/\//g, "/") + '" ,';
        datos += ' "consclusiones":"' + concl.replace(/\n\r?/g, '').replace(/["]+/g, "'").replace(/\//g, "/") + '" ,';
        datos += ' "observacion":"' + obser.replace(/\n\r?/g, '').replace(/["]+/g, "'").replace(/\//g, "/") + '" ,';
        datos += ' "recomendaciones":"' + recom.replace(/\n\r?/g, '').replace(/["]+/g, "'").replace(/\//g, "/") + '" ,';
        datos += ' "det_infcampo":[' + datosDet + ']';
        datos += '}';
       
        datos = datos.replace(/undefined/g, null);
        datos = datos.replace(/None/g,null);
        datos = datos.replace(/False/g,"'false'");
        datos = datos.replace(/True/g,"'true'");
        datos = datos.replace(/"null"/g, null);
        datos.replace(/(\r\n\t|\n|\r\t)/gm,"").trim();

        console.log(datos);

        if ($("#tipoICSA").val() == 0)
            insertarCabDetInfoCampo(datos);
        else
            saveEditCabDetInfoCampo(datos);
    }
}

function insertarCabDetInfoCampo(datos){
    $("#modalLoadin").show();
    dj_url = "bsacabdetinformecampo";
    $.ajax({
        url: "insert_General_bsa",
        type: 'post',
        cache: 'false',
        data: {
            "dj_url": dj_url,
            "data": JSON.stringify("[" + datos + "]")
        },
        dataType: "json",
        success: function(data) {
            if (!data['results']) {
                $('#modalLoadin').hide();
                swal("", "Error al Insertar el registro: " + data['non_field_errors'][0], "error");
                console.log("data---->" + datos + "--->" + "trpcontrolmaterialpetreo" + "Error--->" + data);
            } else {
                swal("", "Registro insertado con Exito", "success");
                console.log(data['results'][0].id);
                getInformesCampoCab();
                $('#modalLoadin').hide();
            }
        },
        error: function(data) {
            $('#modalLoadin').hide();
            swal("", "Error al Insertar el registro", "error");
            console.log("data---->" + datos + "--->" + "trp_control_material_petreo" + "Error--->" + data);
        },
    });
}

function saveEditCabDetInfoCampo(datos){
    $("#modalLoadin").show();
    dj_url = "bsacabdetinformecampo";
    $.ajax({
        url: "update_General_bsa",
        type: 'post',
        cache: 'false',
        data: {
            "dj_url": dj_url,
            "idtabla": $("#idInfCampoSA").val(),
            "data": JSON.stringify(datos)
        },
        dataType: "json",
        success: function(data) {
            if (data.id == undefined) {
                $('#modalLoadin').hide();
                swal("", "Error al Actualizar el registro", "error");
                console.log("data---->" + datos + "--->" + "trpcontrolmaterialpetreo" + "Error--->" + data);
            } else {
                $("#modalLoadin").hide();
                swal("", "Registro Actualizados con Exito", "success");
                if ($('#window').is(':visible')) {
                    getDataICPdf();    
                }
                             
            }
        },
        error: function(data) {
            $("#modalLoadin").hide();
            swal("", "Error al Actualizar el registro", "error");
            console.log("data---->" + datos + "--->" + "trpcontrolmaterialpetreo" + "Error--->" + data);
        },
    });
}


function getInformesCampoCab(dataIni){
limpiarFormInfoCampo();
dataC = '';
var fdesde;
var fhasta;
if (dataIni) {
    dataC = dataC += "fecha_presentacion__range=" + dataIni;
} else {

    desde = $("#FdesdeInfCam").val();
    hasta = $("#FhastaInfCam").val();

    if ((desde == "") || (hasta == ""))
        cadenaFecha = "";
    else
        cadenaFecha = "1";

    if (cadenaFecha != "") {
        desdeArr = desde.split('/');
        hastaArr = hasta.split('/');

        fdesde = desdeArr[2] + "-" + desdeArr[0] + "-" + desdeArr[1];
        fhasta = hastaArr[2] + "-" + hastaArr[0] + "-" + hastaArr[1];
        dataIni = fdesde + "," + fhasta;
        dataC += "fecha_presentacion__range=" + fdesde + "," + fhasta;
    } else {
        validaContenedorExt("infocampo", "No a seleccionado rango de Fechas");
        return 0;
    }
}


 $.ajax({
    url: "data_infoCampoCabParam",
    type: "get",
    data: {
        "data": dataC
    },
    async: false,
    dataType: "json",
    success: function(data) {
        if (data['non_field_errors']) {
            console.log(data['non_field_errors']);
        } else {
            cadenatree = "";
            dataArray = "";
            if (data.length > 0) {
                lista = "<ul>";
                lista += "<li data-jstree='{ \"opened\" : true}'><span style='font-size:12px;'>Informes de Campo</span>";
                lista +="<ul>";
                for (i = 0; i < data.length; i++) {//,"id_cab":"'+data[i].id+'"                      
                    lista +="<li><a onclick='getDataInformecampo(\""+data[i].id+"\");'><span style='font-size:12px;'>"+data[i].numero+"</span></a></li>";
                    
                    //cadenatree += '{"id":'+(i+1)+',"text":"'+data[i].numero+'"},';
                }
                lista +="</ul>";
                lista += "</li></ul>";
                $("#html").jstree('destroy');
                $("#html").html("");
                $("#html").append(lista);
            }
            
            $('#html').jstree({   
            "plugins": ["search","themes"],
                "search": {
                    "case_sensitive": false,
                    "show_only_matches": true
                }
            });

            /*BUSCADOR  del arbol informe de campos*/
            $(".search-input").keyup(function () {
                var searchString = $(this).val();
                $('#html').jstree('search', searchString);
            });
        }
    },
    error: function(data) {
        swal("", "Error: " + JSON.stringify(data), "error");
        console.log(JSON.stringify(data));
    },
});
    
}

function cambiarComboSubproceso(proceso_id){
    //console.log(data);
    $.ajax({
        url: "data_subprocesoXproc",
        type: "get",
        data: {
            "data": proceso_id
        },
        dataType: "json",
        async: false,

        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
            } else {
                console.log(data);
                if (data.length != 0) {

                    option = '<option value=""> Seleccione una opcion </option>';
                    option_descrp = '';
                    if (data.length > 0) {
                        for (i = 0; i < data.length; i++) {
                            option += "<option value='" + data[i].id + "'>" + data[i].name + " </option>";
                        }
                    }
                    
                    $("#SsubprocesoicSA").select2('destroy');
                    $("#SsubprocesoicSA option").remove();
                    $("#SsubprocesoicSA").append(option);
                    $("#SsubprocesoicSA").select2({
                        sorter: data => data.sort((a, b) => a.text.localeCompare(b.text)),
                    });
                } 
            }
        },
        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
            //console.log( JSON.stringify(data));
        },
    });
}

function getDataInformecampo(id){

    //initTinymce();
    
    limpiarFormInfoCampo();

    console.log(id);
    $.ajax({
        url: "data_infoCampoCab",
        type: "get",
        data: {
            "data": id
        },
        dataType: "json",

        success: function(json) {
            $("#modalLoadin").hide();
            if (json['non_field_errors']) {
                console.log(json['non_field_errors']);
            } else {
                $("#tipoICSA").val(1);
                $("#secInfCampoSA").val(json[0].numero);
                $("#idInfCampoSA").val(json[0].id);
                $("#nroicSA").val(json[0].numero);
                $("#SprocesoicSA").val(json[0].proceso).trigger('change');
                $("#SsubprocesoicSA").val(json[0].subproceso).trigger('change');
                $("#actividadicSA").val(json[0].actividad);
                $("#fechadesdeicSA").val(json[0].fecha_desde);
                $("#fechahastaicSA").val(json[0].fecha_hasta);
                $("#fechapreicSA").val(json[0].fecha_presentacion);
                $("#StransporteicSA").val(json[0].transporte_id).trigger("change");
                //$("#SislaicSA").val(json[0].sitio_id).trigger("change");
                $("#periodoSA").val(json[0].periodo);

                if (json[0].sitio_id != null) {
                    arryRespRg = json[0].sitio_id.split("|");
                    $("#SislaicSA").val(arryRespRg).trigger('change');
                }

  
                if(json[0].introduccion != ""){
                    //initEditor("ci_introSA");
                    tinymce.get("ci_introSA").setContent(json[0].introduccion);
                }
                if(json[0].objetivos != ""){
                    //initEditor("ci_objSA");
                    tinymce.get("ci_objSA").setContent(json[0].objetivos);
                }
                if(json[0].materiales != ""){
                    //initEditor("ci_matSA");
                    tinymce.get("ci_matSA").setContent(json[0].materiales);
                }
                if(json[0].metodologia != ""){
                    //initEditor("ci_metSA");
                    tinymce.get("ci_metSA").setContent(json[0].metodologia);
                }
                if(json[0].desarrollo != ""){
                    //initEditor("ci_desaSA");
                    tinymce.get("ci_desaSA").setContent(json[0].desarrollo);
                }
                if(json[0].resultados != ""){
                    //initEditor("ci_resultSA");
                    tinymce.get("ci_resultSA").setContent(json[0].resultados);
                }
                if(json[0].consclusiones != ""){
                    //initEditor("ci_concluSA");
                    tinymce.get("ci_concluSA").setContent(json[0].consclusiones);
                }
                if(json[0].observacion != ""){
                    //initEditor("ci_obserSA");
                    tinymce.get("ci_obserSA").setContent(json[0].observacion);
                }
                if(json[0].recomendaciones != ""){
                    //initEditor("ci_recomaSA");
                    tinymce.get("ci_recomaSA").setContent(json[0].recomendaciones);
                }

                datosDet = '';
                camposJson = '';
                if(json[0].det_infcampo.length > 0){ 
                    
                    for(i=0; i< json[0].det_infcampo.length; i++){                        
                        if(json[0].det_infcampo[i].estado == 'A'){

                            path_archivos = 'static/media/bsa/infocampo/'+json[0].numero+'/';
                            
                            orden = json[0].det_infcampo[i].orden;
                            foto  = json[0].det_infcampo[i].foto;
                            comentario  = json[0].det_infcampo[i].comentario;
                            imagen  = "<a rel='gallery' class='fancybox' href='"+path_archivos+json[0].det_infcampo[i].foto+"'><img src='"+path_archivos+json[0].det_infcampo[i].foto+"' style='width:20px;'></a>";

                            eliminar    = "<a class='delete' id_detalle='"+json[0].det_infcampo[i].id+"'><i class='fa fa-trash text-green btn_edit'></i></a>";

                            datosDet  += '{';
                            datosDet  += '"orden":"<input type=\'text\' style=\'width:50px;\' onkeypress=\'return isNumberKey(event);\' value=\''+ orden + '\'/>", ';
                            datosDet  += '"foto":"' + foto + '", ';
                            datosDet  += '"comentario":"' + comentario  + '", ';
                            datosDet  += '"imagen":"' + imagen  + '",'; 
                            datosDet  += '"eliminar":"' + eliminar  +'"';
                            datosDet  += '},';              
                        }
                    }
                    datosDet = datosDet.substring(0, datosDet.length - 1);
                    datosDet = "["+datosDet+"]";
                    camposJson = JSON.parse(datosDet);
                    
                }
                var dTable = $('#tablafotos_rep').DataTable({  
                    "destroy": true,
                    data :camposJson,
                    columns: [
                        {"data" : "orden", className: "uniqueClassName" },
                        {"data" : "imagen", className: "uniqueClassName" },
                        {"data" : "foto"} ,
                        {"data" : "comentario"},
                        {"data" : "eliminar", className: "uniqueClassName" }          
                    ],
                });

                 $(".fancybox").fancybox();
                
            }
        },
        error: function(json) {
            $("#modalLoadin").hide();
            swal("", "Error: " + JSON.stringify(json), "error");
            console.log(JSON.stringify(json));
            //console.log( JSON.stringify(data));

        },
    });
}
/*funcion para asignar los datos al formulario*/
/*parametros id ---> id tabla*/
function editBsaParametrosConfig(id) {
    
$.ajax({
        url: "bsaparametrosconfig_data",
         type: "get",
        data: {
            "data": id
        },
        dataType: "json",

        success: function(json) {
            $("#modalLoadin").hide();
            if (json['non_field_errors']) {
                console.log(json['non_field_errors']);
            } else {

                $("#tipoBSPC").val(1);
                $("#idBsaParametrosConfigST").val(id);
                $('#nombreBsaParametrosConfigST').val(json[0].nombre);
                $("#descBsaParametrosConfigST").val(json[0].descripcion);
                $('#categoriaBsaParametrosConfigST').val(json[0].categoria);
                $('#valorBsaParametrosConfigST').val(json[0].valor);
                $("#SestadoBsaParametrosConfigST").val(json[0].estado).trigger("change");
                $("#observacionesBsaParametrosConfigST").val(json[0].observaciones);

            }
        },
        error: function(json) {
            $("#modalLoadin").hide();
            swal("", "Error: " + JSON.stringify(json), "error");
            console.log(JSON.stringify(json));
            //console.log( JSON.stringify(data));
        },
    });

}



function getDataICPdf(){
$("#modalLoadin").show();
id = $("#idInfCampoSA").val();
if(id != ""){

    $.ajax({
        url: "data_infoCampoCab",

        type: "get",
        data: {
            "data": id
        },
        dataType: "json",
        success: function(json) {
            $("#modalLoadin").hide();
            if (json['non_field_errors']) {
                console.log(json['non_field_errors']);
            } else {
                $("#tipoICSA").val(1);
                $("#for_procesoIC").html(json[0].proceso);
                $("#for_subIC").html(json[0].subproceso);
                $("#for_actIC").html(json[0].actividad);
                $("#for_sitioIC").html("");
                $("#for_personalIC").html("");
                $("#for_periodoIC").html("");
                $("#for_fechaPreIC").html(json[0].fecha_presentacion);
                $("#for_transIC").html(json[0].transporte);

                $("#for_introIC").html(json[0].introduccion);
                $("#for_objetIC").html(json[0].objetivos);
                $("#for_materIC").html(json[0].materiales);
                $("#for_metodIC").html(json[0].metodologia);
                $("#for_desaIC").html(json[0].desarrollo);
                $("#for_resultIC").html(json[0].resultados);
                $("#for_concluIC").html(json[0].consclusiones);
                $("#for_recomIC").html(json[0].recomendaciones);

                if(json[0].det_infcampo.length > 0){
                    datosDet = '';
                    conta = 1;
                    tableTtr = '';
                    tableI   = '';
                    tablaF = '<table>';
                    for(i=0; i< json[0].det_infcampo.length; i++){                        
                        if(json[0].det_infcampo[i].estado == 'A'){
                            tableI+="<td style='width:300px;'>";
                            tableI+="<div style='width:300px;'><span><img src='static/media/bsa/infocampo/"+json[0].det_infcampo[i].foto+"' style='width:300px;'/></div>";
                            tableI+="<div style='height:100px;'><b>Anexo "+conta+": </b> "+json[0].det_infcampo[i].comentario+"</span></div>";
                            tableI+="</td>";
                            tableI+="<td width='20px'>";
                            if(conta >= 1){
                                if(conta % 2 == 0){
                                    tableTtr += "<tr>"+tableI+"</tr>";
                                    tableI = "";
                                }   
                            }
                            conta++;                    
                        }      
                    }

                    if(conta % 2 == 0){
                        if(tableI != ""){
                            tableTtr += "<tr>"+tableI+"</tr>";
                        }
                    }
                    
                    tablaF += tableTtr+'</table>';
                    $("#for_anexosIC").html(tablaF);
                }
                $("#modalLoadin").hide();
                $('#descargaICSA').val(1);
                generarPdfInfoCampo();
               
            }
        },
        error: function(json) {
            $("#modalLoadin").hide();
            swal("", "Error: " + JSON.stringify(json), "error");
            console.log(JSON.stringify(json));
            //console.log( JSON.stringify(data));
        },
    });
}else
    validaContenedorExt("infocampo", "No ha seleccionado un informe para generar el PDF");

}


function insertarDetInformeCampo(){

    file = $('#doc_anexosSA')[0].files[0];
    if (!file) {
        fileExtension = "";
    } else {
        fileExtension = file.name.split('.').pop();
        salida = ValidateExt(fileExtension);
        cadenaImg = '"file_memo":"' + file.name + '",';
    }

    fileExtension = fileExtension.toLowerCase();

    numeracion = $("#secInfCampoSA").val();
    isla = $("#islaICSA").val();
    //isla ='c718b0a6-a637-11e4-8ba2-6c3be5ba6ec8';
    var path_archivos = '';

    if(numeracion != 0)
        path_archivos = 'static/media/bsa/infocampo/'+numeracion+'/';
    /*se obtiene la nuevo numeracion*/
    else{
        $.ajax({
            url: "data_secinfoCampoCab",
            type: "get",
            data: {
                "data": isla
            },
            dataType: "json",
            cache: 'false',
            async: false,
            success: function(json) {
                $("#modalLoadin").hide();
                if (json['non_field_errors']) {
                    console.log(json['non_field_errors']);
                } else {
                   json.sort(function(val1, val2){
                        if(val1.str > val2.str){
                            return -1;
                        }else{
                            return 1;
                        }    
                    });
                    console.log(json);
                    numeroAct= json[0].numero;
                    numeroArr= numeroAct.split("-");
                    numSig   = parseInt(numeroArr[1])+1;
                    if((numSig > 1)&&(numSig < 10))
                        numeroArr[1] = "000"+numSig;
                    if((numSig >= 10)&&(numSig < 100))
                        numeroArr[1] = "00"+numSig;
                    if((numSig >= 100)&&(numSig < 1000))
                        numeroArr[1] = "0"+numSig;
                    if((numSig >= 1000))
                        numeroArr[1] = numSig;

                    console.log(numeroArr);
                    $("#secInfCampoSA").val(numeroArr[0]+"-"+numeroArr[1]+"-"+numeroArr[2]);
                    path_archivos = 'static/media/bsa/infocampo/'+numeroArr[0]+"-"+numeroArr[1]+"-"+numeroArr[2]+'/';
                }
            },
            error: function(json) {
                $("#modalLoadin").hide();
                swal("", "Error: " + JSON.stringify(json), "error");
                console.log(JSON.stringify(json));
                //console.log( JSON.stringify(data));
            },
        });
    }


    if (file)
        upload_file("frm_infocampoSA",path_archivos);

    id_cab = $("#idInfCampoSA").val();

    orden = $('#ci_ordenSA').val();
    comentario = $('#ci_observacionSA').val();
    foto       = file.name;

    imagen  = "<a rel='gallery' class='fancybox' href="+path_archivos+file.name+"'><img src='"+path_archivos+file.name+"' style='width:20px;'></a>";

    datosDet = '';

    datosDet  += '{';
    datosDet  += '"orden":"<input \'text\' style=\'width:50px;\' onkeypress=\'return isNumberKey(event);\' value=\''+ orden + '\'/>", ';
    datosDet  += '"comentario":"' + comentario + '", ';
    datosDet  += '"foto":"' + foto + '", ';
    datosDet  += '"imagen":"' + imagen + '", ';

    if ($("#tipoICSA").val() != 0){

        datos   = '{"cab_infcampo_id":"' + id_cab + '", "orden":"' + orden + '", "comentario":"' + comentario + '", "foto":"' + foto + '"}';

        dj_url = "bsainformecampodetalle";
        $.ajax({
            url: "insert_General",
            type: 'get',
            cache: 'false',
            async: false,
            data: {
                "dj_url": dj_url,
                "data": JSON.stringify("[" + datos + "]")
            },
            dataType: "json",
            success: function(data) {
                if (!data['results']) {
                    //$('#modalLoadin').hide();
                    swal("", "Error al Insertar el registro: " + data['non_field_errors'][0], "error");
                    console.log("data---->" + datos + "--->" + "trpcontrolmaterialpetreodetalle" + "Error--->" + data);
                } else {
                    eliminar  = "<a class='delete' id_detalle='"+data['results'][0].id+"'><i class='fa fa-trash text-green btn_edit'></i></a>";
                    datosDet  += '"eliminar":"' + eliminar  +'"';
                    datosDet  += '}'; 
                    datosDet = "["+datosDet+"]";
                    camposJson = JSON.parse(datosDet);
                    //console.log( camposJson["orden"]);
                   
                    var dTable = $('#tablafotos_rep').DataTable();
                    dTable.row.add(
                        camposJson[0]
                    ).draw();

                    $(".fancybox").fancybox();
                }
            },
            error: function(data) {
                $('#modalLoadin').hide();
                swal("", "Error al Insertar el registro", "error");
                console.log("data---->" + datos + "--->" + "trp_control_material_petreo" + "Error--->" + data);
            },
        });
    }else{
        eliminar  = "<a class='delete'><i class='fa fa-trash text-green btn_edit'></i></a>";
        datosDet  += '"eliminar":"' + eliminar  +'"';
        datosDet  += '}'; 

        datosDet = "["+datosDet+"]";
        camposJson = JSON.parse(datosDet);
        //console.log( camposJson["orden"]);
       
        /*var dTable = $('#tablafotos_rep').DataTable();
                dTable.row.add(
                    camposJson[0]
                ).draw();*/
         var dTable = $('#tablafotos_rep').DataTable();
            dTable.row.add([
                    camposJson[0].orden,
                    camposJson[0].imagen,
                    camposJson[0].foto,
                    camposJson[0].comentario,
                    camposJson[0].eliminar
            ]).draw();

        $(".fancybox").fancybox();
    }
    
}

$('#tablafotos_rep').on('click', '.delete', function () {
    var pageParamTable = $('#tablafotos_rep').DataTable();
    var tableRow = pageParamTable.row($(this).parents('tr'));
    id_detalle = $(this).attr("id_detalle");
    
    //console.log(id_detalle);
    if(id_detalle){
        datos = '{"estado":"I","eliminado":"t"}';
        $.ajax({
        url: "update_General",
        type: "get",
        cache: 'false',
        data: {
            "dj_url": "bsainformecampodetalle",
            "idtabla": id_detalle,
            "data": JSON.stringify(datos)
        },
        dataType: "json",

        success: function(data) {
            if (data.id == undefined) {
                $('#modalLoadin').hide();
                validaContenedorExt("infocampo", "Error al Insertar el registro");
                console.log("idtabla---->" + id + "--->" + "data---->" + datos + "--->" + "trpcontrolmaterialpetreodetalle" + "Error--->" + data);
            } else {
                validaContenedorExt2("infocampo", "Registro eliminado con exito");
                pageParamTable.row( tableRow ).remove().draw();
            }
        },
        error: function(data) {
            $('#modalLoadin').hide();
            validaContenedorExt("infocampo", "Error al Insertar el registro");
            console.log("idtabla---->" + id + "--->" + "data---->" + datos + "--->" + "trpcontrolmaterialpetreodetalle" + "Error--->" + data);
        },
    });
    }else
        pageParamTable.row( tableRow ).remove().draw();
});

//base64Pdf = "";
function generarPdfInfoCampo() {
    //const element = document.getElementById("bodyinfoCampoPdf");
    const element = document.getElementById("bodyinfoCampoPdfAux");
    //$("#pdfIC").attr("src","");
  
    filename = 'infocampo.pdf'
    var opt = {
        margin:[ 2.0, 0.7, 0.7, 0.7],//top, left, buttom, right,
        filename: 'infocampo.pdf',
        image: {
            type: 'jpeg',
            quality: 0.98
        },
        html2canvas: {
            scale: 1
        },
        jsPDF: {
            unit: 'in',
            orientation: 'portrait'
        },
        pagebreak: { mode: 'avoid-all'},
        //pageBreak: { mode: 'css', after:'.break-page'}
    };

 var img = new Image()
 img.src = 'static/image/cab1.jpg'

//html2pdf().from(element).outputPdf().then(function(pdf) {
html2pdf().from(element).set(opt).toPdf().get('pdf').then(function (pdf) {
   var totalPages = pdf.internal.getNumberOfPages();


  for (i = 1; i <= totalPages; i++) {
    pdf.setPage(i);
    pdf.setFontSize(14);
    pdf.setTextColor(150);
    pdf.addImage(img, 'png',0.3, 0.01);
    pdf.text('DIRECCIÓN DEL PARQUE NACIONAL GALÁPAGOS', 1.7,1.5);
    pdf.text('INFORME DE CAMPO', 3.0,1.8);
  } 
  
    //console.log();
}).outputPdf().then(function(pdf) {
    base64Pdf = btoa(pdf) ;
    //console.log(base64Pdf);
    
    var embed1 = document.getElementById('pdfIC');
    embed1.src = "";
    var embed1 = document.getElementById('pdfIC');
    embed1.src = "data:application/pdf;base64,"+base64Pdf;
    //$("#modalLoadin").hide();
    //$("#pdfIC").setAttribute("src","");
    //$("#pdfIC").setAttribute("src","data:application/pdf;base64,"+base64Pdf);
});

generarPdfInfoCampoAnexos();

}

function generarPdfInfoCampoAnexos() {
    //const element = document.getElementById("bodyinfoCampoPdf");
    const element = document.getElementById("anexosIC");
    $("#pdfAnexoIC").html("");
  
    filename = 'infocampo.pdf'
    var opt = {
        margin:[ 2.0, 0.7, 0.7, 0.7],//top, left, buttom, right,
        filename: 'infocampo.pdf',
        image: {
            type: 'jpeg',
            quality: 0.98
        },
        html2canvas: {
            scale: 2
        },
        jsPDF: {
            unit: 'in',
            orientation: 'portrait'
        },
        pagebreak: { mode: 'avoid-all'},
        //pageBreak: { mode: 'css', after:'.break-page'}
    };

 var img = new Image()
 img.src = 'static/image/cab1.jpg'

//html2pdf().from(element).outputPdf().then(function(pdf) {
html2pdf().from(element).set(opt).toPdf().get('pdf').then(function (pdf) {
   var totalPages = pdf.internal.getNumberOfPages();


  for (i = 1; i <= totalPages; i++) {
    pdf.setPage(i);
    pdf.setFontSize(14);
    pdf.setTextColor(150);
    pdf.addImage(img, 'png',0.3, 0.01);
    pdf.text('DIRECCIÓN DEL PARQUE NACIONAL GALÁPAGOS', 1.7,1.5);
    pdf.text('INFORME DE CAMPO', 3.0,1.8);
  } 
  
    //console.log();
}).outputPdf().then(function(pdf2) {
    base64Pdf2 = btoa(pdf2) ;
    //console.log(base64Pdf2);
    
    var embed12 = document.getElementById('pdfAnexoIC');
    embed12.src = "";
    var embed12 = document.getElementById('pdfAnexoIC');
    embed12.src = "data:application/pdf;base64,"+base64Pdf2;
    //$("#modalLoadin").hide();
    //$("#pdfAnexoIC").setAttribute("src","");
    //$("#pdfAnexoIC").setAttribute("src","data:application/pdf;base64,"+base64Pdf);
});

}

/*funcion para verificar si se realiza una insercion o una actualizacion*/
/*el valor del if se llena con 0 cuando se da click en el boton nuevo y con 1 cuando se da clik en editar*/
function setInsertUpdateBsaParametrosConfig() {
    valida = validaContenedor("addBsaParametrosConfig");

    if (valida) {
        if ($("#tipoBSPC").val() == 0)
            insertarTablaBsaParametrosConfig();
        else
            saveEditBsaParametrosConfig();
    }
}

/*funcion para insertar en la base de datos*/
function insertarTablaBsaParametrosConfig() {
    
    nombre   = $('#nombreBsaParametrosConfigST').val();
    desc   = $('#descBsaParametrosConfigST').val();
    categoria   = $('#categoriaBsaParametrosConfigST').val();
    valor   = $('#valorBsaParametrosConfigST').val();
    estado = $('#SestadoBsaParametrosConfigST').val();
    observaciones = $('#observacionesBsaParametrosConfigST').val();

    id_padre = $('#content_bsaparametrosconfig').parent().attr('id');
    datos = '{"nombre":"' + nombre + '", "descripcion":"' + desc + '", "categoria":"' + categoria + '", "valor":"' + valor + '",  "estado":"' + estado + '", "observaciones":"' + observaciones + '"}';
    th_insert(datos, "bsaparametrosconfig", id_padre, "bsaparametrosconfig")
}

/*funcion para editar en la base de datos*/
/*el id se lo guarda en un campo oculto al momento de dar clik en editar*/
function saveEditBsaParametrosConfig() {

    nombre   = $('#nombreBsaParametrosConfigST').val();
    desc   = $('#descBsaParametrosConfigST').val();
    categoria   = $('#categoriaBsaParametrosConfigST').val();
    valor   = $('#valorBsaParametrosConfigST').val();
    estado = $('#SestadoBsaParametrosConfigST').val();
    observaciones = $('#observacionesBsaParametrosConfigST').val();

    id = $("#idBsaParametrosConfigST").val();
    id_padre = $('#content_bsaparametrosconfig').parent().attr('id');


    datos = '{"nombre":"' + nombre + '", "descripcion":"' + desc + '", "categoria":"' + categoria + '", "valor":"' + valor + '",  "estado":"' + estado + '", "observaciones":"' + observaciones + '"}';

    $("#td_nombre_" + id).html(nombre);
    $("#td_desc_" + id).html(desc);
    $("#td_categoria_" + id).html(categoria);
    $("#td_valor_" + id).html(valor);
    $("#td_estado_" + id).html(estado);
    $("#td_observaciones_" + id).html(observaciones);
    

    salida = th_update(datos, "bsaparametrosconfig", id_padre, "bsaparametrosconfig", id);
}

/*funcion para eliminar(cambio de estado en la base de datos)*/
function deleteBsaParametrosConfig(id) {
    id_padre = $('#content_bsaparametrosconfig').parent().attr('id');
    datos = '{"estado":"I","eliminado":"t"}';
    th_delete(datos, "bsaparametrosconfig", id_padre, "bsaparametrosconfig", id);
}

function addButtons(dlg){
    // Define Buttons
    var $close = dlg.find(".ui-dialog-titlebar-close");
    var $min = $("<button>", {
      class: "ui-button ui-corner-all ui-widget ui-button-icon-only ui-window-minimize",
      type: "button",
      title: "Minimize"
    }).insertBefore($close);
    $min.data("isMin", false);
    $("<span>", {
      class: "ui-button-icon ui-icon ui-icon-minusthick"
    }).appendTo($min);
    $("<span>", {
      class: "ui-button-icon-space"
    }).html(" ").appendTo($min);
    
    // Define Function
    $min.click(function(e) {
      if ($min.data("isMin") === false) {
        console.log("Minimize Window");
        $min.data("original-pos", dlg.position());
        $min.data("original-size", {
          width: dlg.width(),
          height: dlg.height()
        });
        $min.data("isMin", true);
        dlg.animate({
          height: '40px',
          top: $(window).height() - 50
        }, 200);
        dlg.find(".ui-dialog-content").hide();
      } else {
        console.log("Restore Window");
        $min.data("isMin", false);
        dlg.find(".ui-dialog-content").show();
        dlg.animate({
          height: $min.data("original-size").height + "px",
          top: $min.data("original-pos").top + "px"
        }, 200);
      }
    });
  }


  /*funcion para limpiar formulario de ingreso y actualizacion de Listas*/
function limpiarForminfoTecGestPetST() {
    clearForm(frm_infoTecGestPet);
    $("#SestadoinfoTecST").val("A").trigger("change");
    $("#tipoinfoTecST").val(0);
    $("#bodytable_infoTFile").html("");
    $("#StecnicosInfoTecST").val([]).trigger('change');
}

function buscarinfoTecGestPetParametros(){
console.log(121);
    /*if (nombre != "")
        data = "persona_id__nombre_completo__icontains=" + nombre + "&";

    if (cedula != "")
        data += "persona_id__identificacion__icontains=" + cedula + "&";*/

    //data += "descripcion__icontains=" + cedula + "&";

    dataC = "";
    var path_archivos_cert = 'static/media/ser_ambientales/'; 
     $.ajax({
        url: "data_infoTecGestPetParam",
        type: "get",
        data: {
            "data": dataC
        },
        async: false,
        dataType: "json",
        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
            } else {

                tabla = "";
                dataArray = "";
                if (data.length > 0) {
                    for (i = 0; i < data.length; i++) {
                        tabla += "<tr>";
                        tabla += "<td align='center' id='td_numero_"+data[i].id+"'>" + data[i].numero + "</td>"; 
                        tabla += "<td align='left' id='td_tema_"+data[i].id+"'>" + data[i].tema + "</td>";
                        tabla += "<td align='center' id='td_fecha_"+data[i].id+"'>" + data[i].fecha + "</td>";
                        arrayTecnicos = data[i].tecnicos.split("|");
                        arrayTecnicosN = [];
                        for(j=0; j< arrayTecnicos.length; j++){
                            arrayTecnicosN.push($("#StecnicosInfoTecST option[value='" + arrayTecnicos[j].trim()+ "']").text())
                        }
                        tabla += "<td align='left' id='td_tecnicos_"+data[i].id+"'>" + arrayTecnicosN.join('<br>') + "</td>";
                        archivo = data[i].archivo;
                        if((archivo == null)||(archivo == ""))
                            tabla += "<td align='left' id='td_archivo_"+data[i].id+"'></td>";
                        else
                            tabla += "<td align='left' id='td_archivo_"+data[i].id+"'><a style='cursor:pointer; text-decoration:none;color:red;' href='"+path_archivos_cert+data[i].archivo+"' target='_blank'>"+data[i].archivo+"</a></td>";                                                      
                        tabla += "<td align='center'><a href='#addinfoTecGestPet' data-stackbox='true' data-stackbox-position='absolute' onclick='editinfoTecGestPet(\"" + data[i].id + "\")'><i class='fa fa-edit text-green btn_edit'></i></a> </td>";
                        tabla += "<td align='center'><a onclick='deleteModal(\"" + data[i].id + "\",\"infpetreos\");'><i class='fa fa-trash text-green btn_edit'></i></a></td>";
                        tabla += "</tr>";                
                    }
                }

                $('#tabla_infoTecGestPet').dataTable().fnClearTable();
                $('#tabla_infoTecGestPet').dataTable().fnDestroy();

                $("#bodytabla_infoTecGestPet").html("");
                $("#bodytabla_infoTecGestPet").append(tabla);

                var table = $('#tabla_infoTecGestPet').DataTable();

            }
        },
        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
        },
    });
} 

/*funcion para verificar si se realiza una insercion o una actualizacion*/
/*el valor del if se llena con 0 cuando se da click en el boton nuevo y con 1 cuando se da clik en editar*/
function setInsertUpdateinfoTecGestPet() {
    valida = validaContenedor("addinfoTecGestPet");

    if (valida) {
        if ($("#tipoinfoTecST").val() == 0)
            insertarTablainfoTecGestPet();
        else
            saveEditinfoTecGestPet();
    }
}

/*funcion para asignar los datos al formulario*/
/*parametros id ---> id tabla*/
function editinfoTecGestPet(id) {
limpiarForminfoTecGestPetST();
var path_archivos_cert = 'static/media/ser_ambientales/'; 
$.ajax({
        url: "infoTecGestPet_data",
        type: "get",
        data: {
            "data": id
        },
        dataType: "json",

        success: function(json) {
            $("#modalLoadin").hide();
            if (json['non_field_errors']) {
                console.log(json['non_field_errors']);
            } else {
                $("#tipoinfoTecST").val(1);
                $("#idinfoTecST").val(json[0].id);
                $("#numInfoTecST").val(json[0].numero);
                $("#temaInfoTecST").val(json[0].tema);
                $("#fechaInfoTecST").val(json[0].fecha);

                $("#SestadoinfoTecST").val(json[0].estado).trigger('change');

                if (json[0].tecnicos != null) {
                    arryRespRg = json[0].tecnicos.split("|");
                    console.log(arryRespRg);
                    $("#StecnicosInfoTecST").val(arryRespRg).trigger('change');
                }

                if(json[0].archivo){
                    tr='';
                    tr='<tr>';
                    tr+='<td align="left" style="border: 2px solid;padding:5px;background-color:#0073b7;color:#000;"><a style="cursor:pointer; text-decoration:none;" href="'+path_archivos_cert+json[0].archivo+'" target="_blank">'+json[0].archivo+'</a></td>';
                    tr+='<td width="10px"></td><td style="" align="center"><a class="delete_file" style="font-size: 20px;cursor:pointer;"><i class="fa fa-close text-red"></i></a></td>';
                    tr+='</tr>';
                    $("#bodytable_infoTFile").append("");
                    $("#bodytable_infoTFile").append(tr);
                }else
                    $("#bodytable_infoTFile").append("");


                $("#observacioninfoTecST").val(json[0].observaciones);
            }
        },
        error: function(json) {
            $("#modalLoadin").hide();
            swal("", "Error: " + JSON.stringify(json), "error");
            console.log(JSON.stringify(json));
            //console.log( JSON.stringify(data));
        },
    });
}

/*funcion para insertar en la base de datos*/
function insertarTablainfoTecGestPet() {
    numero   = $('#numInfoTecST').val();
    tema   = $('#temaInfoTecST').val();
    fecha   = $('#fechaInfoTecST').val();

    estado = $('#SestadoInfoTecST').val();
    observacion = $('#observacioninfoTecST').val();

    archivo = "";
    archivo_name = "";

    table = $("#table_infoTFile tbody");
    table.find('tr').each(function(i) {
        var data = $(this).find("td").find("a");
        archivo = $(data).eq(0).html() + ":" + $(data).eq(1).html();
        archivo_name = $(data).eq(0).html();
        console.log(archivo_name);
    });

    arrayresPeg = $("#StecnicosInfoTecST").val();

    id_padre = $('#content_infoTecGestPet').parent().attr('id');
    datos = '{"numero":"' + numero + '", "tema":"' + tema + '", "fecha":"' + fecha + '", "observaciones":"' + observacion + '", "tecnicos":"' + arrayresPeg.join('|')+'", "archivo":"' + archivo_name +'"}';
    //th_insert(datos, "infpetreos", id_padre, "bsainformetecnico")
    console.log(datos);
    $.ajax({
        url: "insert_General",
        type: 'get',
        cache: 'false',
        data: {
            "dj_url": "bsainformetecnico",
            "data": JSON.stringify("[" + datos + "]")
        },
        dataType: "json",
        async: false,
        success: function(data2) {
            if (!data2['results']) {
                swal("", "Error al insertar el registro" , "error");
                console.log("data---->" + datos + "--->" + "spncontrolcrecimientogalapaguitosdetalles" + "Error--->" + data2);
            } else {
                swal("", "Registro Insertado con Exito" , "success");
                buscarinfoTecGestPetParametros();
            }
        },
        error: function(data2) {
            swal("", "Error al insertar el registro", "error");
            console.log("data---->" + datos + "--->" + "spncontrolcrecimientogalapaguitosdetalles" + "Error--->" + data2);
        },
    });
}

/*funcion para editar en la base de datos*/
/*el id se lo guarda en un campo oculto al momento de dar clik en editar*/
function saveEditinfoTecGestPet() {

    numero   = $('#numInfoTecST').val();
    tema   = $('#temaInfoTecST').val();
    fecha   = $('#fechaInfoTecST').val();

    estado = $('#SestadoInfoTecST').val();
    observacion = $('#observacioninfoTecST').val();

    arrayresPeg = $("#StecnicosInfoTecST").val();

    archivo = "";

    table = $("#table_infoTFile tbody");
    table.find('tr').each(function(i) {
        var data = $(this).find("td").find("a");
        archivo = $(data).eq(0).html();
        console.log(archivo);
    });

    id = $("#idinfoTecST").val();

    id_padre = $('#content_infoTecGestPet').parent().attr('id');

    datos = '{"numero":"' + numero + '", "tema":"' + tema + '", "fecha":"' + fecha + '", "observaciones":"' + observacion + '", "tecnicos":"' + arrayresPeg.join('|')+'", "archivo":"' + archivo +'"}';
   
    $("#td_numero_" + id).html(numero);
    $("#td_tema_" + id).html(tema);
    $("#td_fecha_" + id).html(fecha);
    var path_archivos_cert = 'static/media/ser_ambientales/'; 
    $("#td_archivo_" + id).html("<a style='cursor:pointer; text-decoration:none;color:blue;' href='"+path_archivos_cert+archivo+"' target='_blank'>"+archivo+"</a>");

    arrayTecnicosN = [];
    for(j=0; j< arrayresPeg.length; j++){
        arrayTecnicosN.push($("#StecnicosInfoTecST option[value='" + arrayresPeg[j]+ "']").text())
    }

    $("#td_tecnicos_" + id).html(arrayTecnicosN.join('<br>'));
    //$("#td_archivos_" + id).html(identificador);

    salida = th_update(datos, "infpetreos", id_padre, "bsainformetecnico", id);
}

/*funcion para eliminar(cambio de estado en la base de datos)*/
function deleteinfoTecGestPet(id) {
    id_padre = $('#content_infoTecGestPet').parent().attr('id');
    datos = '{"estado":"I","eliminado":"t"}';
    th_delete(datos, "infpetreos", id_padre, "bsainformetecnico", id);
}


function cargar_archivo(formulario,file_id){
    console.log("************* cargar_archivo ***************** ");

    $("#modalLoadin").show();
    
    var path_archivos_cert = 'static/media/ser_ambientales/'; 
    

        file = "";
        file = $('#doc_anexos')[0].files[0];
        
        if(file == undefined || file == null){
            $("#modalLoadin").hide();
            validaContenedorExt("addinfoTecGestPet", "Seleccione un ARCHIVO!");
            return 0;
        }
        var fileName = file.name;
        var fileSize = file.size;
        salidaImg = validarArchivo(fileName,fileSize);
        if(salidaImg == 1){
            validaContenedorExt("addinfoTecGestPet", "El archivo no debe superar los 2MB");
            $("#modalLoadin").hide();
            return 0;
        }

        if(salidaImg == 2){
            validaContenedorExt("addinfoTecGestPet", "El archivo no tiene la extensión adecuada");
            $("#modalLoadin").hide();
            return 0;
        }
            

        //imgpdf='<i style="font-weight: bold;font-size: 16px;" class="fa fa-file-pdf-o text-red"></i>';

        if(salidaImg == 0){

            var data1 = new FormData($('#' + formulario).get(0));

            // path_archivos_cert: Ya se carga en el editDafCertificaciones.
            data1.append("file_path", path_archivos_cert);
            data1.append("file_name", fileName);

            $.ajax({
                type: 'POST',
                url: 'upload_files_json_informe',
                data: data1,
                contentType: 'multipart/form-data',
                processData: false,
                contentType: false,
                success: function(data) {
                    console.log(data);
                    
                        tr='';
                        tr='<tr>';
                        tr+='<td align="left" style="border: 2px solid;padding-left:5px;background-color:#0073b7;color:#000;"><a style="cursor:pointer; text-decoration:none;" href="'+path_archivos_cert+data+'" target="_blank">'+data+'</a></td>';
                        tr+='<td width="10px"><td style="" align="center"><a class="delete_file" style="font-size: 20px;cursor:pointer;"><i class="fa fa-close text-red"></i></a></td>';
                        tr+='</tr>';
                        $("#bodytable_infoTFile").append("");
                        $("#bodytable_infoTFile").append(tr);
         
                 
                    $("#modalLoadin").hide();
                },
                error: function(data) {
                    console.log(data);
                    //Cuando la interacción retorne un error, se ejecutará esto.
                    $("#modalLoadin").hide();
                }
            })
        }
}


$('#table_infoTFile').on('click', '.delete_file', function(e) {
    var path_archivos_cert = 'static/media/ser_ambientales/'; 
    var bool = confirm("Esta seguro de eliminar este documento?");
    if (bool) {
        var dataA = $(this).parents('tr').find("td").find("a");
        archivo = $(dataA).eq(0).html();
        var data1 = new FormData();


        // path_archivos_cert: Ya se carga en el editDafCertificaciones.
        data1.append("file_path", path_archivos_cert);
        data1.append("file_name", archivo);

        console.log(data1);

        $.ajax({
            type: 'POST',
            url: 'delete_files_informe',
            data: data1,
            contentType: 'multipart/form-data',
            processData: false,
            contentType: false,
            success: function(data) {
                console.log(data);
                $("#bodytable_infoTFile").html("");
            },
            error: function(data) {
                console.log(data);
                //Cuando la interacción retorne un error, se ejecutará esto.
            }
        })
        
       
    }
})

function getSecuenciaInformeTecGestPetST (){
    isla   = $("#islaITGP").val();
    if(isla == 'c718d004-a637-11e4-b1ae-6c3be5ba6ec8')
        codigo = 'bsa_it_sx';
    if(isla == 'c718b0a6-a637-11e4-8ba2-6c3be5ba6ec8')
        codigo = 'bsa_it_sc';
    if(isla == 'c716b8be-a637-11e4-935a-6c3be5ba6ec8')
        codigo = 'bsa_it_isa';

    $.ajax({
        url: "datasecuencia_InformeTecGestPetST",
        type: "get",
        data: {
            "data": codigo
        },
        dataType: "json",

        success: function(json) {
            $("#modalLoadin").hide();
            if (json['non_field_errors']) {
                console.log(json['non_field_errors']);
            } else {
                numSig = parseInt(json[0].valor)+1;
                numero = '';
                if((numSig >= 0)&&(numSig < 10))
                    numero = "000"+numSig;
                if((numSig >= 10)&&(numSig < 100))
                    numero = "00"+numSig;
                if((numSig >= 100)&&(numSig < 1000))
                    numero = "0"+numSig;
                if((numSig >= 1000))
                    numero = numSig;
                $("#numInfoTecST").val(json[0].prefijo+numero);
                
            }
        },
        error: function(json) {
            $("#modalLoadin").hide();
            swal("", "Error: " + JSON.stringify(json), "error");
            console.log(JSON.stringify(json));
            //console.log( JSON.stringify(data));
        },
    });
}


/*############################informe de novedades*/
function limpiarFormInfoNovedades(){

 
id_padre = $('#content_infoNovedadesP').parent().attr('id');

$("#nroINSA").val("");
$("#SprocesoINSA").val("PRC_CREI").trigger("change");
$("#actividadINSA").val("");
$("#SislaINSA").val("").trigger("change");
$("#personalINSA").val("");
$("#periodoINSA").val("");
$("#fechapreINSA").val("");
$("#transporteINSA").val("");
$("#ci_ordenSAIN").val("");
$("#ci_observacionSAIN").val("");

$('.nav-tabs a[href="#tab_GenIN"]').tab('show');
$("#tipoINSA").val(0);
$("#secInfNovedadesSA").val(0);
$("#idInfNovedadesSA").val("");
$("#descargaINSA").val(0);

$('#tablafotos_repIN').dataTable().fnClearTable();
$('#tablafotos_repIN').dataTable().fnDestroy();

$("#bodytablafotos_repIN").html("");

tinymce.get("ci_desaSAIN").setContent("");
tinymce.get("ci_resultSAIN").setContent("");

}


function setInsertUpdateInfoNovedades() {
    console.log("asdas");
    valida = validaContenedor("infoNovedades");

    if (valida) {
        proceso = $("#SprocesoINSA").val();
        activid = $("#actividadINSA").val();
        periodo  = $("#periodoINSA").val();
        personal = $("#personalINSA").val();
        fprese  = $("#fechapreINSA").val();
        transp  = $("#transporteINSA").val();
        sitio   = $("#SislaINSA").val();

        intro = tinyMCE.get('ci_introSAIN').getContent();
        objet = tinyMCE.get('ci_objSAIN').getContent();
        mater = tinyMCE.get('ci_matSAIN').getContent();
        desar = tinyMCE.get('ci_desaSAIN').getContent();
        resul = tinyMCE.get('ci_resultSAIN').getContent();

        datosDet = '';
        var filas = $("#tablafotos_repIN").find("tr"); //devulve las filas del body de tu tabla segun el ejemplo que brindaste
        var resultado = "";
        for(i=1; i<filas.length; i++){ //Recorre las filas 1 a 1
            var celdas = $(filas[i]).find("td"); //devolverá las celdas de una fila
            
            orden  = $($(celdas[0]).children("input")[0]).val();;
            foto   = $(celdas[2]).text();
            comentario  = $(celdas[3]).text();
            id_detalle  = $($(celdas[4]).children("a")[0]).attr("id_detalle");

            datosDet  += '{"orden":"' + orden + '", ';
            datosDet  += '"foto":"' + foto + '", ';
            datosDet  += '"comentario":"' + comentario + '" ';
            //solo id si es un update
            if($("#tipoINSA").val() == 1)
                datosDet  += ',"id":"' + id_detalle + '"';
            datosDet  += '},';            
        }

        datosDet = datosDet.substring(0, datosDet.length - 1);


        /*se arma la cadena datos*/
        datos = '{';
        //datos += ' "numero":"", ';
        datos += ' "proceso":"' + proceso + '", ';
        datos += ' "sitio_id":"' + sitio + '", ';
        datos += ' "actividad":"' + activid + '", ';
        datos += ' "periodo":"' + periodo + '", ';
        datos += ' "personal":"' + personal + '", ';
        datos += ' "fecha_entrega":"' + fprese + '", ';
        datos += ' "transporte":"' + transp + '", ';
        datos += ' "introduccion":"' + intro.replace(/\n\r?/g, '').replace(/["]+/g, "'").replace(/\//g, "/") + '" ,';
        datos += ' "objetivos":"' + objet.replace(/\n\r?/g, '').replace(/["]+/g, "'").replace(/\//g, "/") + '" ,';
        datos += ' "materiales":"' + mater.replace(/\n\r?/g, '').replace(/["]+/g, "'").replace(/\//g, "/") + '" ,';
        datos += ' "desarrollo":"' + desar.replace(/\n\r?/g, '').replace(/["]+/g, "'").replace(/\//g, "/") + '" ,';
        datos += ' "resultados":"' + resul.replace(/\n\r?/g, '').replace(/["]+/g, "'").replace(/\//g, "/") + '" ,';
        datos += ' "det_infnovedades":[' + datosDet + ']';
        datos += '}';
       
        datos = datos.replace(/undefined/g, null);
        datos = datos.replace(/None/g,null);
        datos = datos.replace(/False/g,"'false'");
        datos = datos.replace(/True/g,"'true'");
        datos = datos.replace(/"null"/g, null);
        datos.replace(/(\r\n\t|\n|\r\t)/gm,"").trim();

        console.log(datos);

        if ($("#tipoINSA").val() == 0)
            insertarCabDetInfoNovedades(datos);
        else
            saveEditCabDetInfoNovedades(datos);
    }
}

function insertarCabDetInfoNovedades(datos){
    $("#modalLoadin").show();
    dj_url = "bsacabdetinformenovedades";
    $.ajax({
        url: "insert_General",
        type: 'get',
        cache: 'false',
        data: {
            "dj_url": dj_url,
            "data": JSON.stringify("[" + datos + "]")
        },
        dataType: "json",
        success: function(data) {
            if (!data['results']) {
                $('#modalLoadin').hide();
                swal("", "Error al Insertar el registro: " + data['non_field_errors'][0], "error");
                console.log("data---->" + datos + "--->" + "trpcontrolmaterialpetreo" + "Error--->" + data);
            } else {
                swal("", "Registro insertado con Exito", "success");
                console.log(data['results'][0].id);
                getInformesNovedadesCab();
                $('#modalLoadin').hide();
            }
        },
        error: function(data) {
            $('#modalLoadin').hide();
            swal("", "Error al Insertar el registro", "error");
            console.log("data---->" + datos + "--->" + "trp_control_material_petreo" + "Error--->" + data);
        },
    });
}

function saveEditCabDetInfoNovedades(datos){
    $("#modalLoadin").show();
    dj_url = "bsacabdetinformenovedades";
    $.ajax({
        url: "update_General",
        type: 'get',
        cache: 'false',
        data: {
            "dj_url": dj_url,
            "idtabla": $("#idInfNovedadesSA").val(),
            "data": JSON.stringify(datos)
        },
        dataType: "json",
        success: function(data) {
            if (data.id == undefined) {
                $('#modalLoadin').hide();
                swal("", "Error al Actualizar el registro", "error");
                console.log("data---->" + datos + "--->" + "trpcontrolmaterialpetreo" + "Error--->" + data);
            } else {
                $("#modalLoadin").hide();
                swal("", "Registro Actualizados con Exito", "success");
                if ($('#window').is(':visible')) {
                    getDataINPdf();      
                }          
            }
        },
        error: function(data) {
            $("#modalLoadin").hide();
            swal("", "Error al Actualizar el registro", "error");
            console.log("data---->" + datos + "--->" + "trpcontrolmaterialpetreo" + "Error--->" + data);
        },
    });
}


function getInformesNovedadesCab(dataIni){
limpiarFormInfoNovedades();
dataC = '';
var fdesde;
var fhasta;
if (dataIni) {
    dataC = dataC += "fecha_entrega__range=" + dataIni;
} else {

    desde = $("#FdesdeInfNov").val();
    hasta = $("#FhastaInfNov").val();

    if ((desde == "") || (hasta == ""))
        cadenaFecha = "";
    else
        cadenaFecha = "1";

    if (cadenaFecha != "") {
        desdeArr = desde.split('/');
        hastaArr = hasta.split('/');

        fdesde = desdeArr[2] + "-" + desdeArr[0] + "-" + desdeArr[1];
        fhasta = hastaArr[2] + "-" + hastaArr[0] + "-" + hastaArr[1];
        dataIni = fdesde + "," + fhasta;
        dataC += "fecha_entrega__range=" + fdesde + "," + fhasta;
    } else {
        validaContenedorExt("infoNovedades", "No a seleccionado rango de Fechas");
        return 0;
    }
}

 $.ajax({
    url: "data_infoNovedadesCabParam",
    type: "get",
    data: {
        "data": dataC
    },
    async: false,
    dataType: "json",
    success: function(data) {
        if (data['non_field_errors']) {
            console.log(data['non_field_errors']);
        } else {
            cadenatree = "";
            dataArray = "";
            if (data.length > 0) {
                lista = "<ul>";
                lista += "<li data-jstree='{ \"opened\" : true}'><span style='font-size:12px;'>Informes Novedades</span>";
                lista +="<ul>";
                for (i = 0; i < data.length; i++) {//,"id_cab":"'+data[i].id+'"                      
                    lista +="<li><a onclick='getDataInformenovedades(\""+data[i].id+"\");'><span style='font-size:12px;'>"+data[i].numero+"</span></a></li>";
                }
                lista +="</ul>";
                lista += "</li></ul>";
                $("#html").jstree('destroy');
                $("#html").html("");
                $("#html").append(lista);
            }
            
            $('#html').jstree({   
            "plugins": ["search","themes"],
                "search": {
                    "case_sensitive": false,
                    "show_only_matches": true
                }
            });

            /*BUSCADOR  del arbol informe de novedadess*/
            $("#search-input2").keyup(function () {
                var searchString = $(this).val();
                $('#html').jstree('search', searchString);
            });
        }
    },
    error: function(data) {
        swal("", "Error: " + JSON.stringify(data), "error");
        console.log(JSON.stringify(data));
    },
});
    
}


function getDataInformenovedades(id){
    novedadessJson = [];
    //initTinymce();
     $('.nav-tabs a[href="#tab_GenIN"]').tab('show'); //para q cuando se abra el popup aparezca en la primera pestaña

    $("#content_divTab").removeClass("disabled-select");
    console.log(id);
    $.ajax({
        url: "data_infoNovedadesCab",
        type: "get",
        data: {
            "data": id
        },
        dataType: "json",

        success: function(json) {
            $("#modalLoadin").hide();
            if (json['non_field_errors']) {
                console.log(json['non_field_errors']);
            } else {
                $("#tipoINSA").val(1);
                $("#secInfNovedadesSA").val(json[0].numero);
                $("#idInfNovedadesSA").val(json[0].id);
                $("#nroINSA").val(json[0].numero);
                $("#SprocesoINSA").val(json[0].proceso).trigger("change");
                $("#personalINSA").val(json[0].personal);
                $("#actividadINSA").val(json[0].actividad);
                $("#periodoINSA").val(json[0].periodo);
                $("#fechapreINSA").val(json[0].fecha_entrega);
                $("#transporteINSA").val(json[0].transporte);
                $("#SislaINSA").val(json[0].sitio_id).trigger("change");

                path_archivos = 'static/media/bsa/infonovedades/'+json[0].numero+'/';

  
                if(json[0].introduccion != ""){
                    //initEditor("ci_introSA");
                    tinymce.get("ci_introSAIN").setContent(json[0].introduccion);
                }
                if(json[0].objetivos != ""){
                    //initEditor("ci_objSA");
                    tinymce.get("ci_objSAIN").setContent(json[0].objetivos);
                }
                if(json[0].materiales != ""){
                    //initEditor("ci_matSA");
                    tinymce.get("ci_matSAIN").setContent(json[0].materiales);
                }
                if(json[0].desarrollo != ""){
                    //initEditor("ci_desaSA");
                    tinymce.get("ci_desaSAIN").setContent(json[0].desarrollo);
                }
                if(json[0].resultados != ""){
                    //initEditor("ci_resultSA");
                    tinymce.get("ci_resultSAIN").setContent(json[0].resultados);
                }
               
                if(json[0].det_infnovedades.length > 0){
                    datosDet = '';
                    for(i=0; i< json[0].det_infnovedades.length; i++){                        
                        if(json[0].det_infnovedades[i].estado == 'A'){
                            
                            orden = json[0].det_infnovedades[i].orden;
                            foto  = json[0].det_infnovedades[i].foto;
                            comentario  = json[0].det_infnovedades[i].comentario;
                            imagen  = "<a rel='gallery' class='fancybox' href='"+path_archivos+json[0].det_infnovedades[i].foto+"'><img src='"+path_archivos+json[0].det_infnovedades[i].foto+"' style='width:20px;'></a>";

                            eliminar    = "<a class='delete' id_detalle='"+json[0].det_infnovedades[i].id+"'><i class='fa fa-trash text-green btn_edit'></i></a>";

                            datosDet  += '{';
                            datosDet  += '"orden":"<input type=\'text\' style=\'width:50px;\' onkeypress=\'return isNumberKey(event);\' value=\''+ orden + '\'/>", ';
                            datosDet  += '"foto":"' + foto + '", ';
                            datosDet  += '"comentario":"' + comentario  + '", ';
                            datosDet  += '"imagen":"' + imagen  + '",'; 
                            datosDet  += '"eliminar":"' + eliminar  +'"';
                            datosDet  += '},';              
                        }
                    }
                    datosDet = datosDet.substring(0, datosDet.length - 1);
                    datosDet = "["+datosDet+"]";
                    novedadessJson = JSON.parse(datosDet);
                    
                }
                var dTable = $('#tablafotos_repIN').DataTable({  
                    "destroy": true,
                    data :novedadessJson,
                    columns: [
                        {"data" : "orden", className: "uniqueClassName" },
                        {"data" : "imagen", className: "uniqueClassName" },
                        {"data" : "foto"} ,
                        {"data" : "comentario"},
                        {"data" : "eliminar", className: "uniqueClassName" }          
                    ],
                });

                 $(".fancybox").fancybox();
                
            }
        },
        error: function(json) {
            $("#modalLoadin").hide();
            swal("", "Error: " + JSON.stringify(json), "error");
            console.log(JSON.stringify(json));
            //console.log( JSON.stringify(data));

        },
    });
}

function getDataINPdf(){
$("#modalLoadin").show();
id = $("#idInfNovedadesSA").val();
if(id != ""){

    $.ajax({
        url: "data_infoNovedadesCab",

        type: "get",
        data: {
            "data": id
        },
        dataType: "json",
        success: function(json) {
            $("#modalLoadin").hide();
            if (json['non_field_errors']) {
                console.log(json['non_field_errors']);
            } else {
                path_archivos = 'static/media/bsa/infonovedades/'+json[0].numero+'/';
                $("#tipoINSA").val(1);
                $("#for_procesoIN").html(json[0].proceso);
                $("#for_actIN").html(json[0].actividad);
                $("#for_sitioIN").html("");
                $("#for_personalIN").html("");
                $("#for_periodoIN").html("");
                $("#for_fechaPreIN").html(json[0].fecha_entrega);
                $("#for_transIN").html(json[0].transporte);

                $("#for_introIN").html(json[0].introduccion);
                $("#for_objetIN").html(json[0].objetivos);
                $("#for_materIN").html(json[0].materiales);
                $("#for_desaIN").html(json[0].desarrollo);
                $("#for_resultIN").html(json[0].resultados);
                
                if(json[0].det_infnovedades.length > 0){
                    datosDet = '';
                    conta = 1;
                    tableTtr = '';
                    tableI   = '';
                    tablaF = '<table>';
                    for(i=0; i< json[0].det_infnovedades.length; i++){                        
                        if(json[0].det_infnovedades[i].estado == 'A'){
                            tableI+="<td style='width:300px;'>";
                            tableI+="<div style='width:300px;'><span><img src='"+path_archivos+json[0].det_infnovedades[i].foto+"' style='width:300px;'/></div>";
                            tableI+="<div style='height:100px;'><b>Anexo "+conta+": </b> "+json[0].det_infnovedades[i].comentario+"</span></div>";
                            tableI+="</td>";
                            tableI+="<td width='20px'>";
                            if(conta >= 1){
                                if(conta % 2 == 0){
                                    tableTtr += "<tr>"+tableI+"</tr>";
                                    tableI = "";
                                }   
                            }
                            conta++;                    
                        }      
                    }

                    if(conta % 2 == 0){
                        if(tableI != ""){
                            tableTtr += "<tr>"+tableI+"</tr>";
                        }
                    }
                    
                    tablaF += tableTtr+'</table>';
                    $("#for_anexosIN").html(tablaF);
                }
                $("#modalLoadin").hide();
                $('#descargaINSA').val(1);
                generarPdfInfoNovedades();
               
            }
        },
        error: function(json) {
            $("#modalLoadin").hide();
            swal("", "Error: " + JSON.stringify(json), "error");
            console.log(JSON.stringify(json));
            //console.log( JSON.stringify(data));
        },
    });
}else
    validaContenedorExt("infonovedades", "No ha seleccionado un informe para generar el PDF");

}



function insertarDetInformeNovedades(){
console.log(111);
    file = $('#doc_anexosSAIN')[0].files[0];
    if (!file) {
        fileExtension = "";
    } else {
        fileExtension = file.name.split('.').pop();
        salida = ValidateExt(fileExtension);
        cadenaImg = '"file_memo":"' + file.name + '",';
    }

    fileExtension = fileExtension.toLowerCase();

    numeracion = $("#secInfNovedadesSA").val();
    isla = $("#islaINSA").val();
    //isla ='c718b0a6-a637-11e4-8ba2-6c3be5ba6ec8';
    var path_archivos = '';

    if(numeracion != 0)
        path_archivos = 'static/media/bsa/infonovedades/'+numeracion+'/';
    /*se obtiene la nuevo numeracion*/
    else{
        $.ajax({
            url: "data_secinfoNovedadesCab",
            type: "get",
            data: {
                "data": isla
            },
            dataType: "json",
            cache: 'false',
            async: false,
            success: function(json) {
                $("#modalLoadin").hide();
                if (json['non_field_errors']) {
                    console.log(json['non_field_errors']);
                } else {
                   json.sort(function(val1, val2){
                        if(val1.str > val2.str){
                            return -1;
                        }else{
                            return 1;
                        }    
                    });
                    console.log(json);
                    numeroAct= json[0].numero;
                    numeroArr= numeroAct.split("-");
                    numSig   = parseInt(numeroArr[1])+1;
                    if((numSig > 1)&&(numSig < 10))
                        numeroArr[1] = "000"+numSig;
                    if((numSig >= 10)&&(numSig < 100))
                        numeroArr[1] = "00"+numSig;
                    if((numSig >= 100)&&(numSig < 1000))
                        numeroArr[1] = "0"+numSig;
                    if((numSig >= 1000))
                        numeroArr[1] = numSig;

                    console.log(numeroArr);
                    $("#secInfNovedadesSA").val(numeroArr[0]+"-"+numeroArr[1]+"-"+numeroArr[2]);
                    path_archivos = 'static/media/bsa/infonovedades/'+numeroArr[0]+"-"+numeroArr[1]+"-"+numeroArr[2]+'/';
                }
            },
            error: function(json) {
                $("#modalLoadin").hide();
                swal("", "Error: " + JSON.stringify(json), "error");
                console.log(JSON.stringify(json));
                //console.log( JSON.stringify(data));
            },
        });
    }

    if (file)
        upload_file("frm_infonovedadesSA",path_archivos);

    id_cab = $("#idInfNovedadesSA").val();

    orden = $('#ci_ordenSAIN').val();
    comentario = $('#ci_observacionSAIN').val();
    foto       = file.name;

    imagen  = "<a rel='gallery' class='fancybox' href='"+path_archivos+file.name+"'><img src='"+path_archivos+file.name+"' style='width:20px;'></a>";

    datosDet = '';

    datosDet  += '{';
    datosDet  += '"orden":"<input \'text\' style=\'width:50px;\' onkeypress=\'return isNumberKey(event);\' value=\''+ orden + '\'/>", ';
    datosDet  += '"comentario":"' + comentario + '", ';
    datosDet  += '"foto":"' + foto + '", ';
    datosDet  += '"imagen":"' + imagen + '", ';

    if ($("#tipoINSA").val() != 0){

        datos   = '{"cab_infnovedades_id":"' + id_cab + '", "orden":"' + orden + '", "comentario":"' + comentario + '", "foto":"' + foto + '"}';

        dj_url = "bsainformenovedadesdetalle";
        $.ajax({
            url: "insert_General",
            type: 'get',
            cache: 'false',
            async: false,
            data: {
                "dj_url": dj_url,
                "data": JSON.stringify("[" + datos + "]")
            },
            dataType: "json",
            success: function(data) {
                if (!data['results']) {
                    //$('#modalLoadin').hide();
                    swal("", "Error al Insertar el registro: " + data['non_field_errors'][0], "error");
                    console.log("data---->" + datos + "--->" + "trpcontrolmaterialpetreodetalle" + "Error--->" + data);
                } else {
                    eliminar  = "<a class='delete' id_detalle='"+data['results'][0].id+"'><i class='fa fa-trash text-green btn_edit'></i></a>";
                    datosDet  += '"eliminar":"' + eliminar  +'"';
                    datosDet  += '}'; 
                    datosDet = "["+datosDet+"]";
                    novedadessJson = JSON.parse(datosDet);
                   
                    var dTable = $('#tablafotos_repIN').DataTable();
                    dTable.row.add(
                        novedadessJson[0]
                    ).draw();

                    $(".fancybox").fancybox();
                }
            },
            error: function(data) {
                $('#modalLoadin').hide();
                swal("", "Error al Insertar el registro", "error");
                console.log("data---->" + datos + "--->" + "trp_control_material_petreo" + "Error--->" + data);
            },
        });
    }else{
        eliminar  = "<a class='delete'><i class='fa fa-trash text-green btn_edit'></i></a>";
        datosDet  += '"eliminar":"' + eliminar  +'"';
        datosDet  += '}'; 

        datosDet = "["+datosDet+"]";
        novedadessJson = JSON.parse(datosDet);

        var dTable = $('#tablafotos_repIN').DataTable();
            dTable.row.add([
                    novedadessJson[0].orden,
                    novedadessJson[0].imagen,
                    novedadessJson[0].foto,
                    novedadessJson[0].comentario,
                    novedadessJson[0].eliminar
            ]).draw();

        $(".fancybox").fancybox();
    }
    
}

$('#tablafotos_repIN').on('click', '.delete', function () {
    var pageParamTable = $('#tablafotos_repIN').DataTable();
    var tableRow = pageParamTable.row($(this).parents('tr'));
    id_detalle = $(this).attr("id_detalle");
    
    //console.log(id_detalle);
    if(id_detalle){
        datos = '{"estado":"I","eliminado":"t"}';
        $.ajax({
        url: "update_General",
        type: "get",
        cache: 'false',
        data: {
            "dj_url": "bsainformenovedadesdetalle",
            "idtabla": id_detalle,
            "data": JSON.stringify(datos)
        },
        dataType: "json",

        success: function(data) {
            if (data.id == undefined) {
                $('#modalLoadin').hide();
                validaContenedorExt("infoNovedades", "Error al Insertar el registro");
                console.log("idtabla---->" + id + "--->" + "data---->" + datos + "--->" + "trpcontrolmaterialpetreodetalle" + "Error--->" + data);
            } else {
                validaContenedorExt2("infoNovedades", "Registro eliminado con exito");
                pageParamTable.row( tableRow ).remove().draw();
            }
        },
        error: function(data) {
            $('#modalLoadin').hide();
            validaContenedorExt("infoNovedades", "Error al Insertar el registro");
            console.log("idtabla---->" + id + "--->" + "data---->" + datos + "--->" + "trpcontrolmaterialpetreodetalle" + "Error--->" + data);
        },
    });
    }else
        pageParamTable.row( tableRow ).remove().draw();
});

//base64Pdf = "";
function generarPdfInfoNovedades() {
    //const element = document.getElementById("bodyinfoNovedadesPdf");
    const element = document.getElementById("bodyinfoNovedadesPdfAux");
    //$("#pdfIN").attr("src","");
  
    filename = 'infonovedades.pdf'
    var opt = {
        margin:[ 2.0, 0.7, 0.7, 0.7],//top, left, buttom, right,
        filename: 'infonovedades.pdf',
        image: {
            type: 'jpeg',
            quality: 0.98
        },
        html2canvas: {
            scale: 2
        },
        jsPDF: {
            unit: 'in',
            orientation: 'portrait'
        },
        pagebreak: { mode: 'avoid-all'},
        //pageBreak: { mode: 'css', after:'.break-page'}
    };

 var img = new Image()
 img.src = 'static/image/cab1.jpg'

//html2pdf().from(element).outputPdf().then(function(pdf) {
html2pdf().from(element).set(opt).toPdf().get('pdf').then(function (pdf) {
   var totalPages = pdf.internal.getNumberOfPages();


  for (i = 1; i <= totalPages; i++) {
    pdf.setPage(i);
    pdf.setFontSize(14);
    pdf.setTextColor(150);
    pdf.addImage(img, 'png',0.3, 0.01);
    pdf.text('DIRECCIÓN DEL PARQUE NACIONAL GALÁPAGOS', 1.7,1.5);
    pdf.text('INFORME DE CAMPO', 3.0,1.8);
  } 
  
    //console.log();
}).outputPdf().then(function(pdf) {
    base64Pdf = btoa(pdf) ;
    //console.log(base64Pdf);
    
    var embed1 = document.getElementById('pdfIN');
    embed1.src = "";
    var embed1 = document.getElementById('pdfIN');
    embed1.src = "data:application/pdf;base64,"+base64Pdf;
    //$("#modalLoadin").hide();
    //$("#pdfIN").setAttribute("src","");
    //$("#pdfIN").setAttribute("src","data:application/pdf;base64,"+base64Pdf);
});

generarPdfInfoNovedadesAnexos();

}

function generarPdfInfoNovedadesAnexos() {
    //const element = document.getElementById("bodyinfoNovedadesPdf");
    const element = document.getElementById("anexosIN");
    $("#pdfAnexoIN").html("");
  
    filename = 'infonovedades.pdf'
    var opt = {
        margin:[ 2.0, 0.7, 0.7, 0.7],//top, left, buttom, right,
        filename: 'infonovedades.pdf',
        image: {
            type: 'jpeg',
            quality: 0.98
        },
        html2canvas: {
            scale: 2
        },
        jsPDF: {
            unit: 'in',
            orientation: 'portrait'
        },
        pagebreak: { mode: 'avoid-all'},
        //pageBreak: { mode: 'css', after:'.break-page'}
    };

 var img = new Image()
 img.src = 'static/image/cab1.jpg'

//html2pdf().from(element).outputPdf().then(function(pdf) {
html2pdf().from(element).set(opt).toPdf().get('pdf').then(function (pdf) {
   var totalPages = pdf.internal.getNumberOfPages();


  for (i = 1; i <= totalPages; i++) {
    pdf.setPage(i);
    pdf.setFontSize(14);
    pdf.setTextColor(150);
    pdf.addImage(img, 'png',0.3, 0.01);
    pdf.text('DIRECCIÓN DEL PARQUE NACIONAL GALÁPAGOS', 1.7,1.5);
    pdf.text('INFORME DE CAMPO', 3.0,1.8);
  } 
  
    //console.log();
}).outputPdf().then(function(pdf2) {
    base64Pdf2 = btoa(pdf2) ;
    //console.log(base64Pdf2);
    
    var embed12 = document.getElementById('pdfAnexoIN');
    embed12.src = "";
    var embed12 = document.getElementById('pdfAnexoIN');
    embed12.src = "data:application/pdf;base64,"+base64Pdf2;
});

}




//base64Pdf = "";
function descargarPdfInfoNovedades() {
    if($('#descargaINSA').val() == 1){
        //const element = document.getElementById("bodyinfoNovedadesPdf");
        const element = document.getElementById("bodyinfoNovedadesPdf");
        console.log(element);
      
        filename = 'infonovedades.pdf'
        var opt = {
            margin:[ 2.0, 0.7, 0.7, 0.7],//top, left, buttom, right,
            filename: 'infonovedades.pdf',
            image: {
                type: 'jpeg',
                quality: 0.98
            },
            html2canvas: {
                scale: 2
            },
            jsPDF: {
                unit: 'in',
                orientation: 'portrait'
            },
            pagebreak: { mode: 'avoid-all'},
            //pageBreak: { mode: 'css', after:'.break-page'}
        };

        var img = new Image()
        img.src = 'static/image/cab1.jpg'

        //html2pdf().from(element).outputPdf().then(function(pdf) {
        html2pdf().from(element).set(opt).toPdf().get('pdf').then(function (pdf) {
           var totalPages = pdf.internal.getNumberOfPages();


          for (i = 1; i <= totalPages; i++) {
            pdf.setPage(i);
            pdf.setFontSize(14);
            pdf.setTextColor(150);
            pdf.addImage(img, 'png',0.3, 0.01);
            pdf.text('DIRECCIÓN DEL PARQUE NACIONAL GALÁPAGOS', 1.7,1.5);
            pdf.text('INFORME DE CAMPO', 3.0,1.8);
          } 
        }).save();
    }else{
        validaContenedorExt("infoNovedades", "Debe generar la vista previa antes de descargar el informe");
    }

}


function descargarPdfInfoCampo() {
    if($('#descargaICSA').val() == 1){
        const element = document.getElementById("bodyinfoCampoPdf");
        console.log(element);
      
        filename = 'infocampo.pdf'
        var opt = {
            margin:[ 2.0, 0.7, 0.7, 0.7],//top, left, buttom, right,
            filename: 'infocampo.pdf',
            image: {
                type: 'jpeg',
                quality: 0.98
            },
            html2canvas: {
                scale: 2
            },
            jsPDF: {
                unit: 'in',
                orientation: 'portrait'
            },
            pagebreak: { mode: 'avoid-all'},
            //pageBreak: { mode: 'css', after:'.break-page'}
        };

        var img = new Image()
        img.src = 'static/image/cab1.jpg'

        //html2pdf().from(element).outputPdf().then(function(pdf) {
        html2pdf().from(element).set(opt).toPdf().get('pdf').then(function (pdf) {
           var totalPages = pdf.internal.getNumberOfPages();


          for (i = 1; i <= totalPages; i++) {
            pdf.setPage(i);
            pdf.setFontSize(14);
            pdf.setTextColor(150);
            pdf.addImage(img, 'png',0.3, 0.01);
            pdf.text('DIRECCIÓN DEL PARQUE NACIONAL GALÁPAGOS', 1.7,1.5);
            pdf.text('INFORME DE CAMPO', 3.0,1.8);
          } 
        }).save();
    }else{
        validaContenedorExt("infocampo", "Debe generar la vista previa antes de descargar el informe");
    }

}



function getDataOrdenPago(datos){
    $("#modalLoadin").show();
    orden = $("#ordenPagoSA").val();
    $.ajax({
        url: "get_remote_orden_pago",
        type: 'get',
        cache: 'false',
        data: {
            "ordenP": orden
        },
        dataType: "json",
        success: function(data) {
            $("#modalLoadin").hide();
            if(data.length > 0){  
                $("#estadoOPSA").val(data[0].sale_estado);
                $("#facturaSA").val(data[0].nro_theos_factura);
                $("#cedOPSA").val(data[0].cedula);
                $("#nombreOPSA").val(data[0].razon_social);
            }else{
                $("#estadoOPSA").val("");
                $("#facturaSA").val("");
                $("#cedOPSA").val("");
                $("#nombreOPSA").val("");
                validaContenedorExt("addMpetreo", "No existe información para esta orden de pago","error");
            }
            console.log(data);
        },
        error: function(data) {
            $("#modalLoadin").hide();
            validaContenedorExt("addMpetreo", "Error consultando esta orden de pago","error");
            console.log("data---->" + datos + "--->" + "trpcontrolmaterialpetreo" + "Error--->" + data);
        },
    });
}