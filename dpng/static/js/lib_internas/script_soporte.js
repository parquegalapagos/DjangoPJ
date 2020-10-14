var pentaho_solicitudservicio = "https://produccion.sia.dpng.gob.ec:8243/pentaho/api/repos/%3Ahome%3ADPNG%3AReportes%3ADAF%3AGTEC%3AMDA%3Asolicitud_servicio.prpt/viewer";

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


});

$(".ui-icon-close").keyup(function(event) {
    if (event.altKey && event.keyCode === $.ui.keyCode.BACKSPACE) {
        var panelId = tabs.find(".ui-tabs-active").remove().attr("aria-controls");
        $("#" + panelId).remove();
        tabs.tabs("refresh");
    }
});
/*fin codigo para agregar pestañas al contenedor*/

/*funcion para limpiar formulario de ingreso y actualizacion de Accidentes*/
function limpiarFormMarcaST() {
    clearForm(frm_Marca);
    $("#SestadoMarca").val("A").trigger("change");
    $("#tipoTST").val(0);
}

function buscarMarcasParametros(){
console.log(121);
    /*if (nombre != "")
        data = "persona_id__nombre_completo__icontains=" + nombre + "&";

    if (cedula != "")
        data += "persona_id__identificacion__icontains=" + cedula + "&";*/

    //data += "descripcion__icontains=" + cedula + "&";

    dataC = "";

     $.ajax({
        url: "data_marcasParam",
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
                        tabla += "<td align='left' id='td_marca_"+data[i].id+"'>" + data[i].descripcion + "</td>";                      
                        tabla += "<td align='center' id='td_estado_"+data[i].id+"'>" + data[i].estado + "</td>";
                        tabla += "<td align='center'><a href='#addMarca' data-stackbox='true' data-stackbox-position='absolute' onclick='editMarca(\"" + data[i].id + "\")'><i class='fa fa-edit text-green btn_edit'></i></a> </td>";
                        tabla += "<td align='center'><a onclick='deleteModal(\"" + data[i].id + "\",\"marca\");'><i class='fa fa-trash text-green btn_edit'></i></a></td>";
                        tabla += "</tr>";                
                    }
                }

                $('#tabla_marcas').dataTable().fnClearTable();
                $('#tabla_marcas').dataTable().fnDestroy();

                $("#bodytabla_marcas").html("");
                $("#bodytabla_marcas").append(tabla);

                var table = $('#tabla_marcas').DataTable();

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
function setInsertUpdateMarca() {
    valida = validaContenedor("addMarca");

    if (valida) {
        if ($("#tipoTST").val() == 0)
            insertarTablaMarca();
        else
            saveEditMarca();
    }
}

/*funcion para asignar los datos al formulario*/
/*parametros id ---> id tabla*/
function editMarca(id) {
    
$.ajax({
        url: "marca_data",
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
                $("#tipoTST").val(1);
                $("#idmarcaST").val(json[0].id);
                $("#descMarca").val(json[0].descripcion);
                $("#SestadoMarca").val(json[0].estado).trigger("change");
                $("#observacionMarcaST").val(json[0].observaciones);
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
function insertarTablaMarca() {
    desc   = $('#descMarca').val();
    estado = $('#SestadoMarca').val();
    observacion = $('#observacionMarcaST').val();

    id_padre = $('#content_marca').parent().attr('id');
    datos = '{"descripcion":"' + desc + '", "observaciones":"' + observacion + '"}';
    th_insert(datos, "marcas", id_padre, "sptmarca")
}

/*funcion para editar en la base de datos*/
/*el id se lo guarda en un campo oculto al momento de dar clik en editar*/
function saveEditMarca() {

    desc   = $('#descMarca').val();
    estado = $('#SestadoMarca').val();
    observacion = $('#observacionMarcaST').val();

    id = $("#idmarcaST").val();

    id_padre = $('#content_marca').parent().attr('id');

    datos = '{"descripcion":"' + desc + '","observaciones":"' + observacion + '", "estado":"' + estado + '"}';

    $("#td_marca_" + id).html(desc);
    $("#td_estado_" + id).html(estado);

    salida = th_update(datos, "marcas", id_padre, "sptmarca", id);
}

/*funcion para eliminar(cambio de estado en la base de datos)*/
function deleteMarca(id) {
    id_padre = $('#content_marca').parent().attr('id');
    datos = '{"estado":"I","eliminado":"t"}';
    th_delete(datos, "marcas", id_padre, "sptmarca", id);
}


/*funcion para limpiar formulario de ingreso y actualizacion de Accidentes*/
function limpiarFormUbicacionST() {
    clearForm(frm_ubicacion);
    $("#SestadoUbicacionST").val("A").trigger("change");
    $("#tipoUST").val(0);
}

function buscarUbicacionesParametros(){
console.log(121);
    /*if (nombre != "")
        data = "persona_id__nombre_completo__icontains=" + nombre + "&";

    if (cedula != "")
        data += "persona_id__identificacion__icontains=" + cedula + "&";*/

    //data += "descripcion__icontains=" + cedula + "&";

    dataC = "";

     $.ajax({
        url: "data_ubicacionesParam",
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
                        tabla += "<td align='left' id='td_bodega_"+data[i].id+"'>" + data[i].bodega + "</td>";       
                        tabla += "<td align='left' id='td_ubicacion_"+data[i].id+"'>" + data[i].descripcion + "</td>";                      
                        tabla += "<td align='center' id='td_estado_"+data[i].id+"'>" + data[i].estado + "</td>";
                        tabla += "<td align='center'><a href='#addUbicacion' data-stackbox='true' data-stackbox-position='absolute' onclick='editUbicacion(\"" + data[i].id + "\")'><i class='fa fa-edit text-green btn_edit'></i></a> </td>";
                        tabla += "<td align='center'><a onclick='deleteModal(\"" + data[i].id + "\",\"Ubicacion\");'><i class='fa fa-trash text-green btn_edit'></i></a></td>";
                        tabla += "</tr>";                
                    }
                }

                $('#tabla_ubicaciones').dataTable().fnClearTable();
                $('#tabla_ubicaciones').dataTable().fnDestroy();

                $("#bodytabla_ubicaciones").html("");
                $("#bodytabla_ubicaciones").append(tabla);

                var table = $('#tabla_ubicaciones').DataTable();

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
function setInsertUpdateUbicacion() {
    console.log(11);
    valida = validaContenedor("addUbicacion");

    if (valida) {
        if ($("#tipoUST").val() == 0)
            insertarTablaUbicacion();
        else
            saveEditUbicacion();
    }
}

/*funcion para asignar los datos al formulario*/
/*parametros id ---> id tabla*/
function editUbicacion(id) {
    
$.ajax({
        url: "ubicacion_data",
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
                $("#tipoUST").val(1);
                $("#idUbicacionST").val(json[0].id);
                $("#descUbicacionST").val(json[0].descripcion);
                $("#SestadoUbicacionST").val(json[0].estado).trigger("change");
                $("#observacionUbicacionST").val(json[0].observaciones);
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
function insertarTablaUbicacion() {
    desc   = $('#descUbicacionST').val();
    estado = $('#SestadoUbicacionST').val();
    observacion = $('#observacionUbicacionST').val();

    id_padre = $('#content_Ubicacion').parent().attr('id');
    datos = '{"descripcion":"' + desc + '", "observaciones":"' + observacion + '"}';
    th_insert(datos, "ubicaciones", id_padre, "sptubicacion")
}

/*funcion para editar en la base de datos*/
/*el id se lo guarda en un campo oculto al momento de dar clik en editar*/
function saveEditUbicacion() {

    desc   = $('#descUbicacionST').val();
    estado = $('#SestadoUbicacionST').val();
    observacion = $('#observacionUbicacionST').val();

    id = $("#idUbicacionST").val();

    id_padre = $('#content_Ubicacion').parent().attr('id');

    datos = '{"descripcion":"' + desc + '","observaciones":"' + observacion + '", "estado":"' + estado + '"}';

    $("#td_bodega_" + id).html("BODEGA DE ADMINISTRACION DE BIENES");
    $("#td_ubicacion_" + id).html(desc);
    $("#td_estado_" + id).html(estado);

    salida = th_update(datos, "ubicaciones", id_padre, "sptubicacion", id);
}

/*funcion para eliminar(cambio de estado en la base de datos)*/
function deleteUbicacion(id) {
    id_padre = $('#content_Ubicacion').parent().attr('id');
    datos = '{"estado":"I","eliminado":"t"}';
    th_delete(datos, "ubicaciones", id_padre, "sptubicacion", id);
}


/*funcion para limpiar formulario de Producto*/
function limpiarFormProductoST() {
    clearForm(frm_producto);
    $("#SestadoProductoST").val("A").trigger("change");
    $("#tipoPST").val(0);
}

/*funcion para verificar si se realiza una insercion o una actualizacion*/
/*el valor del if se llena con 0 cuando se da click en el boton nuevo y con 1 cuando se da clik en editar*/

function setInsertUpdateProducto() {
    console.log(11);
    valida = validaContenedor("addProducto");

    if (valida) {
        if ($("#tipoPST").val() == 0)
            insertarTablaProducto();
        else
            saveEditProducto();
    }
}

function buscarProductoParametros(){
console.log(121);
     dataC = "";

     $.ajax({
        url: "data_ProductoParam",
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
                        tabla += "<td align='left' id='td_producto_"+data[i].id+"'>" + data[i].descripcion + "</td>";                      
                        tabla += "<td align='center' id='td_preciov_"+data[i].id+"'>" + data[i].precio_costo + "</td>";
                        tabla += "<td align='center' id='td_precioc_"+data[i].id+"'>" + data[i].precio_venta + "</td>";
                        tabla += "<td align='center' id='td_tipo_"+data[i].id+"'>" + $("#StipoProductoST option[value='" + data[i].tipo + "']").text() + "</td>";
                        tabla += "<td align='center' id='td_um_"+data[i].id+"'>" + data[i].udm_por_defecto + "</td>";
                        tabla += "<td align='center' id='td_cuenta_"+data[i].id+"'>" + data[i].cuenta_contable + "</td>";
                        tabla += "<td align='center' id='td_vendible_"+data[i].id+"'>" + data[i].vendible + "</td>";
                        tabla += "<td align='center'><a href='#addProducto' data-stackbox='true' data-stackbox-position='absolute' onclick='editProducto(\"" + data[i].id + "\")'><i class='fa fa-edit text-green btn_edit'></i></a> </td>";
                        tabla += "<td align='center'><a onclick='deleteModal(\"" + data[i].id + "\",\"producto\");'><i class='fa fa-trash text-green btn_edit'></i></a></td>";
                        tabla += "</tr>";                
                    }
                }

                $('#tabla_producto').dataTable().fnClearTable();
                $('#tabla_producto').dataTable().fnDestroy();

                $("#bodytabla_producto").html("");
                $("#bodytabla_producto").append(tabla);

                var table = $('#tabla_producto').DataTable();
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
function editProducto(id) {   
$.ajax({
        url: "producto_data",
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
                $("#tipoPST").val(1);
                $("#idProductoST").val(json[0].id);
                $("#descProductoST").val(json[0].descripcion);
                $("#pvProductoST").val(json[0].precio_venta);
                $("#pcProductoST").val(json[0].precio_costo);
                $("#StipoProductoST").val(json[0].tipo).trigger("change");
                $("#ScatProductoST").val(json[0].categoria_cuentas).trigger("change");
                $("#SumProductoST").val(json[0].udm_por_defecto).trigger("change");
                $("#SestadoProductoST").val(json[0].estado).trigger("change");
                $("#observacionProductoST").val(json[0].observaciones);

                if (json[0].vendible== "t")
                    $("#vendibleProductoST").prop('checked', true);
                else
                    $("#vendibleProductoST").prop('checked', false);
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
function insertarTablaProducto() {
    desc = $("#descProductoST").val();
    pv   = $("#pvProductoST").val();
    pc   = $("#pcProductoST").val();
    tp   = $("#StipoProductoST").val();
    ct   = $("#ScatProductoST").val();
    um   = $("#SumProductoST").val();
    estado = $('#SestadoProductoST').val();
    observacion = $('#observacionProductoST').val();

    if(tp == "") tp = null;
    if(ct == "") ct = null;
    if(um == "") um = null;

    vendible = $('#vendibleProductoST').prop('checked');
    if (vendible)
        vendible = 't';
    else
        vendible = 'f';

    id_padre = $('#content_Producto').parent().attr('id');
    datos = '{"descripcion":"' + desc + '", "precio_venta":"' + pv + '", "precio_costo":"' + pc + '", "tipo":"' + tp + '", "categoria_cuentas":"' + ct + '", "udm_por_defecto":"' + um + '", "observaciones":"' + observacion + '", "vendible":"' + vendible + '"}';
    th_insert(datos, "productos", id_padre, "sptproducto")
}

/*funcion para editar en la base de datos*/
/*el id se lo guarda en un campo oculto al momento de dar clik en editar*/
function saveEditProducto() {

    desc = $("#descProductoST").val();
    pv   = $("#pvProductoST").val();
    pc   = $("#pcProductoST").val();
    tp   = $("#StipoProductoST").val();
    ct   = $("#ScatProductoST").val();
    um   = $("#SumProductoST").val();
    estado = $('#SestadoProductoST').val();
    observacion = $('#observacionProductoST').val();

    vendible = $('#vendibleProductoST').prop('checked');
    if (vendible)
        vendible = 't';
    else
        vendible = 'f';

    id = $("#idProductoST").val();

    id_padre = $('#content_Producto').parent().attr('id');

    datos = '{"descripcion":"' + desc + '", "precio_venta":"' + pv + '", "precio_costo":"' + pc + '", "tipo":"' + tp + '", "categoria_cuentas":"' + ct + '", "udm_por_defecto":"' + um + '", "observaciones":"' + observacion + '", "vendible":"' + vendible + '"}';

    $("#td_producto_" + id).html(desc);
    $("#td_preciov_" + id).html(pv);
    $("#td_precioc_" + id).html(pc);
    $("#td_tipo_" + id).html($("#StipoProductoST option[value='" + tp + "']").text());
    $("#td_um_" + id).html($("#SumProductoST option[value='" + um + "']").text());
    $("#td_cuenta_" + id).html(ct);
    $("#td_vendible_" + id).html(vendible);
    $("#td_estado_" + id).html(estado);

    salida = th_update(datos, "productos", id_padre, "sptproducto", id);
}

/*funcion para eliminar(cambio de estado en la base de datos)*/
function deleteProducto(id) {
    id_padre = $('#content_Producto').parent().attr('id');
    datos = '{"estado":"I","eliminado":"t"}';
    th_delete(datos, "productos", id_padre, "sptproducto", id);
}


/*funcion para limpiar formulario de ingreso y actualizacion de Tipo Equipo*/
function limpiarFormTipoEquipoST() {
    clearForm(frm_TipoEquipo);
    $("#SestadoTipoEquipo").val("A").trigger("change");
    $("#tipoTST").val(0);
}

function buscarTipoEquipoParametros(){
console.log(121);
    dataC = "";

     $.ajax({
        url: "data_tipoequipoParam",
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
                        tabla += "<td align='center' id='td_tipoequipo_"+data[i].id+"'>" + data[i].descripcion + "</td>";                      
                        tabla += "<td align='center' id='td_estado_"+data[i].id+"'>" + data[i].estado + "</td>";
                        tabla += "<td align='center'><a href='#addTipoEquipo' data-stackbox='true' data-stackbox-position='absolute' onclick='editTipoEquipo(\"" + data[i].id + "\")'><i class='fa fa-edit text-green btn_edit'></i></a> </td>";
                        tabla += "<td align='center'><a onclick='deleteModal(\"" + data[i].id + "\",\"tipoequipo\");'><i class='fa fa-trash text-green btn_edit'></i></a></td>";
                        tabla += "</tr>";                
                    }
                }
                $('#tabla_tipoequipo').dataTable().fnClearTable();
                $('#tabla_tipoequipo').dataTable().fnDestroy();

                $("#bodytabla_tipoequipo").html("");
                $("#bodytabla_tipoequipo").append(tabla);

                var table = $('#tabla_tipoequipo').DataTable();
            }
        },
        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
        },
    });
} 

function setInsertUpdateTipoEquipo() {
    valida = validaContenedor("addTipoEquipo");

    if (valida) {
        if ($("#tipoTST").val() == 0)
            insertarTablaTipoEquipo();
        else
            saveEditTipoEquipo();
    }
}

/*funcion para asignar los datos al formulario*/
/*parametros id ---> id tabla*/
function editTipoEquipo(id) {
    
$.ajax({
        url: "tipoequipo_data",
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
                $("#tipoTST").val(1);
                $("#idtipoequipoST").val(json[0].id);
                $("#descTipoEquipo").val(json[0].descripcion);
                $("#SestadoTipoEquipo").val(json[0].estado).trigger("change");
                $("#observacionTipoEquipoST").val(json[0].observaciones);
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
function insertarTablaTipoEquipo() {
    desc   = $('#descTipoEquipo').val();
    estado = $('#SestadoTipoEquipo').val();
    observacion = $('#observacionTipoEquipoST').val();

    id_padre = $('#content_tipoequipo').parent().attr('id');
    datos = '{"descripcion":"' + desc + '", "observaciones":"' + observacion + '"}';
    th_insert(datos, "tipoequipo", id_padre, "spttipoequipo")
}

/*funcion para editar en la base de datos*/
/*el id se lo guarda en un campo oculto al momento de dar clik en editar*/
function saveEditTipoEquipo() {

    desc   = $('#descTipoEquipo').val();
    estado = $('#SestadoTipoEquipo').val();
    observacion = $('#observacionTipoEquipoST').val();

    id = $("#idtipoequipoST").val();

    id_padre = $('#content_tipoequipo').parent().attr('id');

    datos = '{"descripcion":"' + desc + '","observaciones":"' + observacion + '", "estado":"' + estado + '"}';

    $("#td_tipoequipo_" + id).html(desc);
    $("#td_estado_" + id).html(estado);

    salida = th_update(datos, "tipoequipo", id_padre, "spttipoequipo", id);
}

/*funcion para eliminar(cambio de estado en la base de datos)*/
function deleteTipoEquipo(id) {
    id_padre = $('#content_tipoequipo').parent().attr('id');
    datos = '{"estado":"I","eliminado":"t"}';
    th_delete(datos, "tipoequipo", id_padre, "spttipoequipo", id);
}

/*funcion para limpiar formulario de ingreso y actualizacion de Unidad Medidad*/
function limpiarFormUnidadMedidaST() {
    clearForm(frm_UnidadMedida);
    $("#SestadoUnidadMedida").val("A").trigger("change");
    $("#tipoUMST").val(0);
}

function buscarUnidadMedidaParametros(){
console.log(121);
    dataC = "";

     $.ajax({
        url: "data_unidadmedidaParam",
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
                        tabla += "<td align='center' id='td_unidadmedida_"+data[i].id+"'>" + data[i].descripcion + "</td>";
                        tabla += "<td align='center' id='td_simbolo_"+data[i].id+"'>" + data[i].simbolo + "</td>";
                        tabla += "<td align='center' id='td_categoria_"+data[i].id+"'>" + data[i].categoria + "</td>";                      
                        tabla += "<td align='center' id='td_estado_"+data[i].id+"'>" + data[i].estado + "</td>";
                        tabla += "<td align='center'><a href='#addUnidadMedida' data-stackbox='true' data-stackbox-position='absolute' onclick='editUnidadMedida(\"" + data[i].id + "\")'><i class='fa fa-edit text-green btn_edit'></i></a> </td>";
                        tabla += "<td align='center'><a onclick='deleteModal(\"" + data[i].id + "\",\"unidadmedida\");'><i class='fa fa-trash text-green btn_edit'></i></a></td>";
                        tabla += "</tr>";                
                    }
                }

                $('#tabla_unidadmedida').dataTable().fnClearTable();
                $('#tabla_unidadmedida').dataTable().fnDestroy();

                $("#bodytabla_unidadmedida").html("");
                $("#bodytabla_unidadmedida").append(tabla);

                var table = $('#tabla_unidadmedida').DataTable();

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
function setInsertUpdateUnidadMedida() {
    valida = validaContenedor("addUnidadMedida");

    if (valida) {
        if ($("#tipoUMST").val() == 0)
            insertarTablaUnidadMedida();
        else
            saveEditUnidadMedida();
    }
}

/*funcion para asignar los datos al formulario*/
/*parametros id ---> id tabla*/
function editUnidadMedida(id) {
    
$.ajax({
        url: "unidadmedida_data",
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
                $("#tipoUMST").val(1);
                $("#idunidadmedidaST").val(json[0].id);
                $("#descUnidadMedida").val(json[0].descripcion);
                $("#simboloUnidadMedida").val(json[0].simbolo);
                $("#ScatUnidadMedida").val(json[0].categoria).trigger("change");
                $("#SestadoUnidadMedida").val(json[0].estado).trigger("change");
                $("#observacionUnidadMedidaST").val(json[0].observaciones);
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
function insertarTablaUnidadMedida() {
    desc   = $('#descUnidadMedida').val();
    simbolo = $('#simboloUnidadMedida').val();
    categoria = $('#ScatUnidadMedida').val();
    estado = $('#SestadoUnidadMedida').val();
    observacion = $('#observacionUnidadMedidaST').val();

    id_padre = $('#content_unidadmedida').parent().attr('id');
    datos = '{"descripcion":"' + desc + '", "simbolo":"' + simbolo + '", "categoria":"' + categoria + '", "observaciones":"' + observacion + '"}';
    th_insert(datos, "unidadmedida", id_padre, "sptunidadmedida")
}

function saveEditUnidadMedida() {

    desc   = $('#descUnidadMedida').val();
    simbolo = $('#simboloUnidadMedida').val();
    categoria = $('#ScatUnidadMedida').val();
    estado = $('#SestadoUnidadMedida').val();
    observacion = $('#observacionUnidadMedidaST').val();

    id = $("#idunidadmedidaST").val();

    id_padre = $('#content_unidadmedida').parent().attr('id');

    datos = '{"descripcion":"' + desc + '", "simbolo":"' + simbolo + '", "categoria":"' + categoria + '", "observaciones":"' + observacion + '"}';

    $("#td_unidadmedida_" + id).html(desc);
    $("#td_estado_" + id).html(estado);

    salida = th_update(datos, "unidadmedida", id_padre, "sptunidadmedida", id);
}

/*funcion para eliminar(cambio de estado en la base de datos)*/
function deleteUnidadMedida(id) {
    id_padre = $('#content_unidadmedida').parent().attr('id');
    datos = '{"estado":"I","eliminado":"t"}';
    th_delete(datos, "unidadmedida", id_padre, "sptunidadmedida", id);
}


/*funcion para limpiar formulario de ingreso y actualizacion de Accidentes*/
function limpiarFormEquipoST() {
    $('.nav-tabs a[href="#tab_GenE"]').tab('show');
    //clearForm(frm_equipo);
    jQuery("#frm_equipo").find(':input').each(function() {
        switch(this.type) {
            case 'password':
            case 'text':
            case 'textarea':
            case 'file':
            case 'select-one':
            case 'select-multiple':
            case 'date':
            case 'number':
            case 'tel':
            case 'email':
                jQuery(this).val('');
                break;
            case 'checkbox':
            case 'radio':
                this.checked = false;
                break;
        }
      });
    $("#SestregEquipoST").val("A").trigger("change");
    $("#tipoEST").val(0);
}

/*funcion para verificar si se realiza una insercion o una actualizacion*/
/*el valor del if se llena con 0 cuando se da click en el boton nuevo y con 1 cuando se da clik en editar*/

function setInsertUpdateEquipo() {
    console.log(11);
    valida = validaContenedor("addEquipo");

    if (valida) {
        if ($("#tipoEST").val() == 0)
            insertarTablaEquipo();
        else
            saveEditEquipo();
    }
}

function buscarEquipoParametros(inicio){
dataC = "";
if(inicio != ""){
    productoP = $("#productoST").val();
    codigoP   = $("#codigoST").val();
    marcaP    = $("#marcaST").val();
    custodioP = $("#custodioST").val();

    if(productoP != "")
        dataC += "producto_id__descripcion__icontains=" + productoP + "&";
    if(codigoP != "")
        dataC += "codigo__icontains=" + codigoP + "&";
    if(marcaP != "")
        dataC += "marca_id__descripcion__icontains=" + marcaP + "&";
    if(custodioP != "")
        dataC += "administrador_id__persona_id__nombre_completo__icontains=" + custodioP + "&";
    

    dataC = dataC.substring(0, dataC.length - 1);
}else{
    dataC += "producto_id__descripcion__icontains=AIRE";
}


console.log(121);
     

     $.ajax({
        url: "data_equipoParam",
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
                        //tabla += "<td align='left' id='td_producto_"+data[i].id+"'>" + data[i].producto_id.descripcion  + "</td>";  

                        if(valor_nulo_str(data[i].producto_id)!=""){
                            tabla += "<td align='left' id='td_producto_"+data[i].id+"'>" + data[i].producto_id.descripcion  + "</td>";
                        }else{
                            tabla += "<td align='left' id='td_producto_"+data[i].id+"'>" + "</td>";
                        }

                        tabla += "<td align='center' id='td_codigo_"+data[i].id+"'>" + data[i].codigo + "</td>";
                        tabla += "<td align='center' id='td_estado_"+data[i].id+"'>" + $("#SestadoAdcEquipoST option[value='" + data[i].estado_equipo + "']").text() + "</td>";
                        tabla += "<td align='center' id='td_modelo_"+data[i].id+"'>" + data[i].modelo + "</td>";

                        if(valor_nulo_str(data[i].marca_id)!=""){
                            tabla += "<td align='center' id='td_marca_"+data[i].id+"'>" + data[i].marca_id.descripcion + "</td>";
                        }else{
                            tabla += "<td align='center' id='td_marca_"+data[i].id+"'>" + "</td>";
                        }

                        //tabla += "<td align='center' id='td_marca_"+data[i].id+"'>" + data[i].marca_id.descripcion + "</td>";
                        tabla += "<td align='center' id='td_color_"+data[i].id+"'>" + data[i].color + "</td>";
                        //tabla += "<td align='left' id='td_ubicacion_"+data[i].id+"'>" +  data[i].ubicacion_id.descripcion + "</td>";

                        if(valor_nulo_str(data[i].ubicacion_id)!=""){
                            tabla += "<td align='left' id='td_ubicacion_"+data[i].id+"'>" +  data[i].ubicacion_id.descripcion + "</td>";
                        }else{
                            tabla += "<td align='left' id='td_ubicacion_"+data[i].id+"'>" + "</td>";
                        }

                        if(valor_nulo_str(data[i].administrador_id)!=""){
                            if(valor_nulo_str(data[i].administrador_id.persona_id)!=""){
                                tabla += "<td align='left' id='td_duenio_"+data[i].id+"'>" + data[i].administrador_id.persona_id.nombre_completo  + "</td>";
                            }else{
                                tabla += "<td align='left' id='td_duenio_"+data[i].id+"'>" + "</td>";
                            }
                        }else{
                            tabla += "<td align='left' id='td_duenio_"+data[i].id+"'>" + "</td>";
                        }
                        //tabla += "<td align='left' id='td_duenio_"+data[i].id+"'>" + data[i].administrador_id.persona_id.nombre_completo  + "</td>";
                        //tabla += "<td align='center' id='td_tipoDisp_"+data[i].id+"'>" +  $("#StipoDisEquipoST option[value='" + data[i].tipo_dispositivo + "']").text() + "</td>";
                        tabla += "<td align='center' id='td_criticidad_"+data[i].id+"'>" + $("#ScritiEquipoST option[value='" + data[i].criticidad + "']").text() + "</td>";
                        tabla += "<td align='center'><a href='#addEquipo' data-stackbox='true' data-stackbox-width='1000' data-stackbox-position='absolute' onclick='editEquipo(\"" + data[i].id + "\")'><i class='fa fa-edit text-green btn_edit'></i></a> </td>";
                        tabla += "<td align='center'><a onclick='deleteModal(\"" + data[i].id + "\",\"equipo\");'><i class='fa fa-trash text-green btn_edit'></i></a></td>";
                        tabla += "</tr>";                
                    }
                }

                $('#tabla_equipos').dataTable().fnClearTable();
                $('#tabla_equipos').dataTable().fnDestroy();

                $("#bodytabla_equipos").html("");
                $("#bodytabla_equipos").append(tabla);

                var table = $('#tabla_equipos').DataTable();
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
function editEquipo(id) { 
    limpiarFormEquipoST(); 
    $.ajax({
        url: "equipo_data",
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
                $("#tipoEST").val(1);
                $("#idEquipoST").val(json[0].id);
                $("#productoEquipoST").val(json[0].producto_id.descripcion);
                $("#idproductoEquipoST").val(json[0].producto_id.id);
                $("#codExtEquipoST").val(json[0].codigo_externo);
                $("#idmarcaEquipoST").val(json[0].marca_id.id);
                $("#marcaEquipoST").val(json[0].marca_id.descripcion);
                $("#ScritiEquipoST").val(json[0].criticidad).trigger("change");               
                $("#codEquipoST").val(json[0].codigo);
                $("#modeloEquipoST").val(json[0].modelo);
                $("#referEquipoST").val(json[0].referencia);
                $("#StipoDisEquipoST").val(json[0].tipo_dispositivo).trigger("change");
                $("#colorEquipoST").val(json[0].color);
                
                $("#serieEquipoST").val(json[0].serie_num);
                $("#zonaEquipoST").val(json[0].zona_trabajo);
                $("#fcompraEquipoST").val(json[0].fecha_compra);

                try{
                    $("#administradorEquipoST").val(json[0].administrador_id.persona_id.nombre_completo);
                    $("#idadministradorEquipoST").val(json[0].administrador_id.id);
                }catch(e){
                    console.log(e);
                }

                //$("#administradorEquipoST").val(json[0].administrador_id.persona_id.nombre_completo);
                
                $("#SestadoAdcEquipoST").val(json[0].estado_equipo).trigger("change");
                
                
                try{
                   $("#ubicacionAdcEquipoST").val(json[0].ubicacion_id.descripcion); 
                   $("#idubicacionAdcEquipoST").val(json[0].ubicacion_id.id);
                }catch(e){
                    console.log(e);
                }

                try{
                   $("#duenoEquipoST").val(json[0].duenio_id.nombre_completo);
                    $("#idduenoEquipoST").val(json[0].duenio_id.id);
                }catch(e){
                    console.log(e);
                }
                
                $("#garantiaEquipoST").val(json[0].garantia);
                
                if(json[0].proveedor_mantenimiento_id != null){
                    $("#proveedorEquipoST").val(json[0].proveedor_mantenimiento_id.nombre_completo);
                    $("#idproveedorEquipoST").val(json[0].proveedor_mantenimiento_id.id);
                }else{
                    $("#proveedorEquipoST").val("");
                    $("#idproveedorEquipoST").val("");
                }
                $("#observacionEquipoST").val(json[0].notas);
            }
        },
        error: function(json) {
            $("#modalLoadin").hide();
            swal("", "Error: " + JSON.stringify(json), "error");
            console.log(JSON.stringify(json));
            //console.log( JSON.stringify(data));
        }
    });
}

/*funcion para insertar en la base de datos*/
function insertarTablaEquipo() {
    
    producto_id     = $("#idproductoEquipoST").val();
    codigo_ext      = $("#codExtEquipoST").val();
    marca_id        = $("#idmarcaEquipoST").val();
    criticidad      = $("#ScritiEquipoST").val();

    codigo          = $("#codEquipoST").val();
    modelo          = $("#modeloEquipoST").val();   
    referencia      = $("#referEquipoST").val();
    tipo_dispositivo= $("#StipoDisEquipoST").val();
    color           = $("#colorEquipoST").val();

    serie           = $("#serieEquipoST").val();
    zona            = $("#zonaEquipoST").val();
    fcompra         = $("#fcompraEquipoST").val();
    administrador   = $("#idadministradorEquipoST").val();
    estado_equipo   = $("#SestadoAdcEquipoST").val();

    ubicacion_id    = $("#idubicacionAdcEquipoST").val();
    garantia        = $("#garantiaEquipoST").val();
    duenio_id       = $("#idduenoEquipoST").val();
    proveedor_id    = $("#idproveedorEquipoST").val();
    notas           = $("#observacionEquipoST").val();
    
    
    //estado          = $("#SestregEquipoST").val();
    
    if(producto_id == "") producto_id = null;
    if(ubicacion_id == "") ubicacion_id = null;
    if(marca_id == "") marca_id = null;
    if(duenio_id == "") duenio_id = null;
    if(proveedor_id == "") proveedor_id = null;
    
    datos = '{"producto_id":"' + producto_id + '",';
    datos += '"codigo_externo":"' + codigo_ext + '",';
    datos += '"marca_id":"' + marca_id + '",';
    datos += '"criticidad":"' + criticidad + '",';
    datos += '"codigo":"' + codigo + '",';
    datos += '"modelo":"' + modelo + '",';
    datos += '"referencia":"' + referencia + '",';
    datos += '"tipo_dispositivo":"' + tipo_dispositivo + '",';
    datos += '"color":"' + color + '",';
    datos += '"serie_num":"' + serie + '",';
    datos += '"zona_trabajo":"' + zona + '",';
    datos += '"fecha_compra":"' + fcompra + '",';
    datos += '"administrador_id":"' + administrador + '",';
    datos += '"estado_equipo":"' + estado_equipo + '",'; 
    datos += '"ubicacion_id":"' + ubicacion_id + '",';
    datos += '"garantia":"' + garantia + '",';
    datos += '"duenio_id":"' + duenio_id + '",';
    datos += '"proveedor_mantenimiento_id":"' + proveedor_id + '",';
    
    datos += '"notas":"' + notas + '"}';

    //id_padre = $('#content_Equipo').parent().attr('id');
    //th_insert(datos, "equipos", id_padre, "sptequipo");

    dj_url = 'sptequipo';
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
        success: function(data2) {
            if (!data2['results']) {
                console.log("data---->" + datos + "--->" + "sptequipo" + "Error--->" + data2);
                validaContenedorExt("addEquipo", "Error al insertar el Equipo");
            } else {
                swal("", "Registro Insertado con éxito", "success");
                buscarEquipoParametros("");
            }
        },
        error: function(data2) {
            console.log("data---->" + datos + "--->" + "sptequipo" + "Error--->" + data2);
            validaContenedorExt("addEquipo", "Error al insertar el Equipo");
        },
    });



}

/*funcion para editar en la base de datos*/
/*el id se lo guarda en un campo oculto al momento de dar clik en editar*/
function saveEditEquipo() {
    id = $("#idEquipoST").val();

    producto_id     = $("#idproductoEquipoST").val();
    codigo_ext      = $("#codExtEquipoST").val();
    marca_id        = $("#idmarcaEquipoST").val();
    marca           = $("#marcaEquipoST").val();
    criticidad      = $("#ScritiEquipoST").val();

    codigo          = $("#codEquipoST").val();
    modelo          = $("#modeloEquipoST").val();   
    referencia      = $("#referEquipoST").val();
    tipo_dispositivo= $("#StipoDisEquipoST").val();
    color           = $("#colorEquipoST").val();

    serie           = $("#serieEquipoST").val();
    zona            = $("#zonaEquipoST").val();
    fcompra         = $("#fcompraEquipoST").val();
    administrador   = $("#idadministradorEquipoST").val();
    estado_equipo   = $("#SestadoAdcEquipoST").val();

    ubicacion_id    = $("#idubicacionAdcEquipoST").val();
    ubicacion_des   = $("#ubicacionAdcEquipoST").val();
    garantia        = $("#garantiaEquipoST").val();
    duenio_id       = $("#idduenoEquipoST").val();
    proveedor_id    = $("#idproveedorEquipoST").val();
    notas           = $("#observacionEquipoST").val();
    
    
    //estado          = $("#SestregEquipoST").val();
    
    if(producto_id == "") producto_id = null;
    if(ubicacion_id == "") ubicacion_id = null;
    if(marca_id == "") marca_id = null;
    if(duenio_id == "") duenio_id = null;
    if(proveedor_id == "") proveedor_id = null;
    
    datos = '{"producto_id":"' + producto_id + '",';
    datos += '"codigo_externo":"' + codigo_ext + '",';
    datos += '"marca_id":"' + marca_id + '",';
    datos += '"criticidad":"' + criticidad + '",';
    datos += '"codigo":"' + codigo + '",';
    datos += '"modelo":"' + modelo + '",';
    datos += '"referencia":"' + referencia + '",';
    datos += '"tipo_dispositivo":"' + tipo_dispositivo + '",';
    datos += '"color":"' + color + '",';
    datos += '"serie_num":"' + serie + '",';
    datos += '"zona_trabajo":"' + zona + '",';
    datos += '"fecha_compra":"' + fcompra + '",';
    datos += '"administrador_id":"' + administrador + '",';
    datos += '"estado_equipo":"' + estado_equipo + '",'; 
    datos += '"ubicacion_id":"' + ubicacion_id + '",';
    datos += '"garantia":"' + garantia + '",';
    datos += '"duenio_id":"' + duenio_id + '",';
    datos += '"proveedor_mantenimiento_id":"' + proveedor_id + '",';
    
    datos += '"notas":"' + notas + '"}';

    $("#td_producto_" + id).html($("#productoEquipoST").val());
    $("#td_codigo_" + id).html(codigo);
    $("#td_estado_" + id).html($("#SestadoAdcEquipoST option[value='" + estado_equipo + "']").text());
    $("#td_modelo_" + id).html(modelo);
    $("#td_marca_" + id).html(marca);
    $("#td_color_" + id).html(color);
    $("#td_ubicacion_" + id).html( ubicacion_des );
    $("#td_duenio_" + id).html($("#administradorEquipoST").val());
    //$("#td_tipoDisp_" + id).html($("#StipoDisEquipoST option[value='" + tipo_dispositivo + "']").text());
    $("#td_criticidad_" + id).html($("#ScritiEquipoST option[value='" + criticidad + "']").text());

    id_padre = $('#content_Equipo').parent().attr('id');
    salida = th_update(datos, "equipos", id_padre, "sptequipo", id);
}

/*funcion para eliminar(cambio de estado en la base de datos)*/
function deleteEquipo(id) {
    id_padre = $('#content_Equipo').parent().attr('id');
    datos = '{"estado":"I","eliminado":"t"}';
    th_delete(datos, "equipos", id_padre, "sptequipo", id);
}



/*Limpiar popup de funcionarios*/

function limpiaPopupEquipo(pagina) {
    console.log(pagina);
    document.getElementById('pagina_enviaPopSolServ1').value = pagina;
    $('#tabla_PopupEquipo').dataTable().fnClearTable();
    $('#tabla_PopupEquipo').dataTable().fnDestroy();
    $("#body_tabla_PopupEquipo").html("");
}


/*funcion para obtener los funcionarios en el popup*/
function getDataEquipoPop() {
    equipo = $("#equipoPopup").val();
    codigo = $("#codigoPopup").val();
    codigoext = $("#codigoextPopup").val();
    pagina = $("#pagina_enviaPopSolServ1").val();
    dataC  = "";
    if(equipo != "")
        dataC += "producto_id__descripcion__icontains=" + equipo + "&";
    if(codigo != "")
        dataC += "codigo__icontains=" + codigo + "&";
    if(codigoext != "")
        dataC += "codigo_externo__icontains=" + codigoext + "&";

    dataC = dataC.substring(0, dataC.length - 1);

    $.ajax({
        url: "data_equipoParam",
        type: "get",
        data: {
            "data": dataC
        },
        async: false,
        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
            } else {
                tabla = "";
                if (data.length > 0) {
                    for (i = 0; i < data.length; i++) {
                        if(data[i].estado == 'A'){ //Solo funcionarios Activos
                            tabla += "<tr>";
                            //tabla += "<td align='left'>" + data[i].estado_equipo + "</td>";
                            if(valor_nulo_str(data[i].producto_id)!=""){
                                tabla += "<td align='left'>" + data[i].producto_id.descripcion + "</td>";
                            }else{
                                tabla += "<td align='left'>" + "</td>";
                            }
                            
                            tabla += "<td align='left'>" + data[i].codigo + "</td>";
                            tabla += "<td align='left'>" + data[i].codigo_externo + "</td>";
                            

                            if(valor_nulo_str(data[i].marca_id)!=""){
                                tabla += "<td align='left'>" + data[i].marca_id.descripcion + "</td>";
                            }else{
                                tabla += "<td align='left'>" + "</td>";
                            }

                            tabla += '<td align="center"><textarea id="td_'+pagina+'_' + i + '" hidden>' + JSON.stringify(data[i]) + '</textarea> <a style="cursor: pointer; font-size: 20px;" title="Buscar" data-close-stackbox="true" onClick="getDataEquiposPagina(' + i + ',\'' + pagina + '\');"><i class="fa fa-plus-circle text-blue"></i></a></td>';
                            tabla += "</tr>";
                        }
                        
                    }
                }

                $('#tabla_PopupEquipo').dataTable().fnClearTable();
                $('#tabla_PopupEquipo').dataTable().fnDestroy();

                $("#body_tabla_PopupEquipo").html("");
                $("#body_tabla_PopupEquipo").append(tabla);

                var table = $('#tabla_PopupEquipo').DataTable({
                    orderCellsTop: true
                });
            }
        },
        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
            //console.log( JSON.stringify(data));
        },
    });
}

/*Limpiar popup de funcionarios*/

function limpiaPopupProducto(pagina) {
    console.log(pagina);
    document.getElementById('pagina_enviaPopSolServ3').value = pagina;
    $('#tabla_PopupProducto').dataTable().fnClearTable();
    $('#tabla_PopupProducto').dataTable().fnDestroy();
    $("#body_tabla_PopupProducto").html("");
}


/*funcion para obtener los funcionarios en el popup*/
function getDataProductoPop() {
    producto = $("#productoPopup").val();
    pagina = $("#pagina_enviaPopSolServ3").val();
    dataC  = "";
    if(producto != "")
        dataC += "descripcion__icontains=" + producto + "&";
    /*if(codigoP != "")
        dataC += "codigo=" + codigoP + "&";
    if(marcaP != "")
        dataC += "marca_id__descripcion=" + marcaP + "&";

    */
    dataC = dataC.substring(0, dataC.length - 1);

    $.ajax({
        url: "data_ProductoParam",
        type: "get",
        data: {
            "data": dataC
        },
        async: false,
        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
            } else {
                tabla = "";
                if (data.length > 0) {
                    for (i = 0; i < data.length; i++) {
                        if(data[i].estado == 'A'){ //Solo funcionarios Activos
                            tabla += "<tr>";
                            tabla += "<td align='left'>" + data[i].descripcion + "</td>";
                            tabla += "<td align='left'>" + data[i].precio_costo + "</td>";
                            tabla += "<td align='left'>" + data[i].precio_venta + "</td>";
                            tabla += "<td align='left'>" + data[i].udm_por_defecto + "</td>";
                            tabla += '<td align="center"><textarea id="td_'+pagina+'_' + i + '" hidden>' + JSON.stringify(data[i]) + '</textarea> <a style="cursor: pointer; font-size: 20px;" title="Buscar" data-close-stackbox="true" onClick="getDataEquiposPagina(' + i + ',\'' + pagina + '\');"><i class="fa fa-plus-circle text-blue"></i></a></td>';
                            tabla += "</tr>";
                        }                        
                    }
                }

                $('#tabla_PopupProducto').dataTable().fnClearTable();
                $('#tabla_PopupProducto').dataTable().fnDestroy();

                $("#body_tabla_PopupProducto").html("");
                $("#body_tabla_PopupProducto").append(tabla);

                var table = $('#tabla_PopupProducto').DataTable({
                    orderCellsTop: true
                });
            }
        },
        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
            //console.log( JSON.stringify(data));
        },
    });
}

function limpiaPopupMarca(pagina) {
    console.log(pagina);
    document.getElementById('pagina_enviaPopSolServ4').value = pagina;
    $('#tabla_PopupMarca').dataTable().fnClearTable();
    $('#tabla_PopupMarca').dataTable().fnDestroy();
    $("#body_tabla_PopupMarca").html("");
}


function limpiaPopupEquipoCust(pagina) {
    console.log(pagina);
    document.getElementById('pagina_enviaPopEquipoCust').value = pagina;
    $('#tabla_PopupEquipoCust').dataTable().fnClearTable();
    $('#tabla_PopupEquipoCust').dataTable().fnDestroy();
    $("#body_tabla_PopupEquipoCust").html("");
}

function getDataEquipoCust(idEquipo) {
    equipo = $("#"+idEquipo).val();
    dataC  = "";
    if(equipo != "")
        dataC += "equipo_id=" + equipo + "&";

    dataC = dataC.substring(0, dataC.length - 1);

    $.ajax({
        url: "data_equipoCustParam",
        type: "get",
        data: {
            "data": dataC
        },
        async: false,
        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
            } else {
                tabla = "";
                if (data.length > 0) {
                    for (i = 0; i < data.length; i++) {
                        if(data[i].estado == 'A'){ //Solo funcionarios Activos
                            tabla += "<tr>";
                            tabla += "<td align='left'>" + data[i].fecha_ingreso + "</td>";
                            tabla += "<td align='left'>" + data[i].equipo_id.producto_id.descripcion + "</td>";
                            tabla += "<td align='left'>" + data[i].new_custodio_id.persona_id.nombre_completo + "</td>";
                            tabla += "<td align='left'>" + data[i].old_custodio_id.persona_id.nombre_completo + "</td>";
                            tabla += "<td align='left'>" + data[i].observaciones + "</td>";
                            tabla += "</tr>";
                        }                        
                    }
                }

                $('#tabla_PopupEquipoCust').dataTable().fnClearTable();
                $('#tabla_PopupEquipoCust').dataTable().fnDestroy();

                $("#body_tabla_PopupEquipoCust").html("");
                $("#body_tabla_PopupEquipoCust").append(tabla);

                var table = $('#tabla_PopupEquipoCust').DataTable({
                    orderCellsTop: true
                });
            }
        },
        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
            //console.log( JSON.stringify(data));
        },
    });
}


/*funcion para obtener los funcionarios en el popup*/
function getDataMarcaPop() {
    marca = $("#marcaPopup").val();
    pagina = $("#pagina_enviaPopSolServ4").val();
    dataC  = "";
    if(marca != "")
        dataC += "descripcion__icontains=" + marca + "&";

    dataC = dataC.substring(0, dataC.length - 1);

    $.ajax({
        url: "data_marcasParam",
        type: "get",
        data: {
            "data": dataC
        },
        async: false,
        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
            } else {
                tabla = "";
                if (data.length > 0) {
                    for (i = 0; i < data.length; i++) {
                        if(data[i].estado == 'A'){ //Solo funcionarios Activos
                            tabla += "<tr>";
                            tabla += "<td align='left'>" + data[i].descripcion + "</td>";
                            tabla += '<td align="center"><textarea id="td_'+pagina+'_' + i + '" hidden>' + JSON.stringify(data[i]) + '</textarea> <a style="cursor: pointer; font-size: 20px;" title="Buscar" data-close-stackbox="true" onClick="getDataEquiposPagina(' + i + ',\'' + pagina + '\');"><i class="fa fa-plus-circle text-blue"></i></a></td>';
                            tabla += "</tr>";
                        }                        
                    }
                }

                $('#tabla_PopupMarca').dataTable().fnClearTable();
                $('#tabla_PopupMarca').dataTable().fnDestroy();

                $("#body_tabla_PopupMarca").html("");
                $("#body_tabla_PopupMarca").append(tabla);

                var table = $('#tabla_PopupMarca').DataTable({
                    orderCellsTop: true
                });
            }
        },
        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
            //console.log( JSON.stringify(data));
        },
    });
}

function limpiaPopupUbicacion(pagina) {
    console.log(pagina);
    document.getElementById('pagina_enviaPopSolServ5').value = pagina;
    $('#tabla_PopupUbicacion').dataTable().fnClearTable();
    $('#tabla_PopupUbicacion').dataTable().fnDestroy();
    $("#body_tabla_PopupUbicacion").html("");
}


/*funcion para obtener los funcionarios en el popup*/
function getDataUbicacionPop() {
    ubicacion = $("#ubicacionPopup").val();
    pagina = $("#pagina_enviaPopSolServ5").val();
    dataC  = "";
    if(ubicacion != "")
        dataC += "descripcion__icontains=" + ubicacion + "&";

    dataC = dataC.substring(0, dataC.length - 1);

    $.ajax({
        url: "data_ubicacionesParam",
        type: "get",
        data: {
            "data": dataC
        },
        async: false,
        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
            } else {
                tabla = "";
                if (data.length > 0) {
                    for (i = 0; i < data.length; i++) {
                        if(data[i].estado == 'A'){ //Solo funcionarios Activos
                            tabla += "<tr>";
                            tabla += "<td align='left'>" + data[i].descripcion + "</td>";
                            tabla += '<td align="center"><textarea id="td_'+pagina+'_' + i + '" hidden>' + JSON.stringify(data[i]) + '</textarea> <a style="cursor: pointer; font-size: 20px;" title="Buscar" data-close-stackbox="true" onClick="getDataEquiposPagina(' + i + ',\'' + pagina + '\');"><i class="fa fa-plus-circle text-blue"></i></a></td>';
                            tabla += "</tr>";
                        }                        
                    }
                }

                $('#tabla_PopupUbicacion').dataTable().fnClearTable();
                $('#tabla_PopupUbicacion').dataTable().fnDestroy();

                $("#body_tabla_PopupUbicacion").html("");
                $("#body_tabla_PopupUbicacion").append(tabla);

                var table = $('#tabla_PopupUbicacion').DataTable({
                    orderCellsTop: true
                });
            }
        },
        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
            //console.log( JSON.stringify(data));
        },
    });
}

function limpiaPopupSolServ(pagina) {
    console.log(pagina);
    document.getElementById('pagina_enviaPopSolServ2').value = pagina;
    $('#tabla_PopupSolServ').dataTable().fnClearTable();
    $('#tabla_PopupSolServ').dataTable().fnDestroy();
    $("#body_tabla_PopupSolServ").html("");
}

function getDataSolservPop() {
    console.log(">>>>>>> getDataSolservPop <<<<<<");

    solicitud  = $("#solservPopup").val();
    referencia = $("#referenciaPopup").val();
    titulo     = $("#tituloPopup").val();
    //$("#solservPopup").val(solicitud);
    pagina = $("#pagina_enviaPopSolServ2").val();
    dataC  = "";
    if(solicitud != "")
        dataC += "secuencia__icontains=" + solicitud + "&";
    if(referencia != "")
        dataC += "sysaid_ticket__icontains=" + referencia + "&";
    if(titulo != "")
        dataC += "titulo__icontains=" + titulo + "&";
    /*if(codigoP != "")
        dataC += "codigo=" + codigoP + "&";
    if(marcaP != "")
        dataC += "marca_id__descripcion=" + marcaP + "&";

    */
    dataC = dataC.substring(0, dataC.length - 1);

    $.ajax({
        url: "data_solservParam",
        type: "get",
        data: {
            "data": dataC
        },
        async: false,
        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
            } else {
                tabla = "";
                if (data.length > 0) {
                    for (i = 0; i < data.length; i++) {
                        if(data[i].estado == 'A'){ //Solo funcionarios Activos
                            tabla += "<tr>";
                            tabla += "<td align='left'>" + data[i].secuencia + "</td>";
                            tabla += "<td align='left'>" + data[i].sysaid_ticket + "</td>";
                            tabla += "<td align='left'>" + data[i].titulo + "</td>";

                            try {
                                tabla += "<td align='left'>" + data[i].equipo_id.producto_id.descripcion + "</td>";
                            }
                            catch (e) {
                                tabla += "<td align='left'>" + "</td>";
                                console.log(e);
                            }
                            
                            tabla += '<td align="center"><textarea id="td_'+pagina+'_' + i + '" hidden>' + JSON.stringify(data[i]) + '</textarea> <a style="cursor: pointer; font-size: 20px;" title="Buscar" data-close-stackbox="true" onClick="getDataEquiposPagina(' + i + ',\'' + pagina + '\');"><i class="fa fa-plus-circle text-blue"></i></a></td>';
                            tabla += "</tr>";
                        }
                        
                    }
                }

                $('#tabla_PopupSolServ').dataTable().fnClearTable();
                $('#tabla_PopupSolServ').dataTable().fnDestroy();

                $("#body_tabla_PopupSolServ").html("");
                $("#body_tabla_PopupSolServ").append(tabla);

                var table = $('#tabla_PopupSolServ').DataTable({
                    orderCellsTop: true
                });
            }
        },
        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
            //console.log( JSON.stringify(data));
        },
    });
}


/*funcion para verificar que pagina envia la peticion desde el popup*/
function getDataEquiposPagina(idx, pagina) {
    console.log(111);
    funcionario = $("#td_"+pagina+"_" + idx).val();
    newF = funcionario.replace(/None/g, null)
    newF = newF.replace(/False/g, "'false'")
    newF = newF.replace(/True/g, "'true'")
    newF = newF.replace(/'/g, '"')

    var json = JSON.parse("[" + newF + "]");
    if (pagina == 'solserv')
        getDataEquipoTablaPop(json);
    if (pagina == 'infobajas')
        getDataEquipoInfoBajas(json);
    if (pagina == 'infobajas_solserv')
        getDataSolServInfoBajas(json);
    if (pagina == 'producto_equipo')
        getDataProductosTablaPop(json);
    if (pagina == 'marca_equipo')
        getDataMarcaTablaPop(json);
    if (pagina == 'ubicacion_equipos')
        getDataUbicacionTablaPop(json);
}

/*funcion para mapear los datos de la situacion actual del funcionario*/
function getDataEquipoTablaPop(json) {

    /*situacion Actual*/
    $("#equipoSolservST").val(json[0].producto_id.descripcion);
    $("#idequipoSolservST").val(json[0].id);
    $("#marcaSolservST").val(json[0].marca_id.descripcion);
    $("#modeloSolservST").val(json[0].modelo);
    $("#serieSolservST").val(json[0].serie_num);
    $("#codSolservST").val(json[0].codigo);
    $("#ubicSolservST").val(json[0].ubicacion_id.descripcion);
    $("#duenioSolservST").val(json[0].duenio_id.nombre_completo);
    $("#cusSolservST").val(json[0].administrador_id.persona_id.nombre_completo);
    $("#emailcusSolservST").val(json[0].administrador_id.email);
}

/*funcion para mapear los datos del funcionario en el formulario de ingresos*/
function getDataEquipoInfoBajas(json) {
    console.log(12332);
    $("#equipoIBST").val(json[0].producto_id.descripcion);
    $('#idequipoIBST').val(json[0].id);
    $("#custodioIBST").val(json[0].administrador_id.persona_id.nombre_completo);
    $('#idcustodioIBST').val(json[0].administrador_id.id);
    $("#ubicacionIBST").val(json[0].duenio_id.nombre_completo);
    $('#idSubicacionIBST').val(json[0].duenio_id.id);
}

/*funcion para mapear los datos del funcionario en el formulario de ingresos*/
function getDataSolServInfoBajas(json) {
    console.log(12332);
    $("#solservIBST").val(json[0].secuencia);
    $("#idsolservIBST").val(json[0].id);
    $("#titulosolservIBST").val(json[0].titulo);
    $("#nroIBST").val(json[0].sysaid_ticket);

    $("#equipoIBST").val(json[0].equipo_id.producto_id.descripcion);
    $('#idequipoIBST').val(json[0].equipo_id.id);
    $("#custodioIBST").val(json[0].equipo_id.administrador_id.persona_id.nombre_completo);
    $('#idcustodioIBST').val(json[0].equipo_id.administrador_id.id);
    $("#ubicacionIBST").val(json[0].equipo_id.duenio_id.nombre_completo);
    $('#idSubicacionIBST').val(json[0].equipo_id.duenio_id.id);

    tinymce.get("ci_anteSAIN").setContent(json[0].descripcion);
    tinymce.get("ci_desaSAIN").setContent(json[0].resolucion);

}

/*funcion para mapear los datos del funcionario en el formulario de ingresos*/
function getDataProductosTablaPop(json) {
    console.log(12332);
    $("#productoEquipoST").val(json[0].descripcion);
    $("#idproductoEquipoST").val(json[0].id);
    //$('#idequipoIBST').val(json[0].id);
}

/*funcion para mapear los datos del funcionario en el formulario de ingresos*/
function getDataMarcaTablaPop(json) {
    console.log(12332);
    $("#marcaEquipoST").val(json[0].descripcion);
    $("#idmarcaEquipoST").val(json[0].id);
    //$('#idequipoIBST').val(json[0].id);
}

/*funcion para mapear los datos del funcionario en el formulario de ingresos*/
function getDataUbicacionTablaPop(json) {
    console.log(12332);
    $("#ubicacionAdcEquipoST").val(json[0].descripcion);
    $("#idubicacionAdcEquipoST").val(json[0].id);
    //$('#idequipoIBST').val(json[0].id);
}



function getDataSubtipo(tipoProblemaid){
   
    //data = "funcionario_id__id__in="+$("#funcionaioAccid").val()+"&accionpersonal_id__id__in="+accionpredecesora_id+"5bec1ac6-ecca-4b49-bf3f-dfdd690cda94&estado_ejecucion__in=A,C,P";
if(tipoProblemaid != ""){
    console.log(tipoProblemaid);

    data = "tipoproblema__in=" + tipoProblemaid;
    console.log(data);
    $.ajax({
        url: "data_subtipoProblemaParam",
        type: "get",
        data: {
            "data": data
        },
        dataType: "json",
        async: false,

        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
            } else {
                console.log(data);
                if (data.length != 0) {

                    option = '<option value=""> Seleccione un Sitio</option>';
                    option_descrp = '';
                    if (data.length > 0) {
                        for (i = 0; i < data.length; i++) {
                            option += "<option value='" + data[i].id + "'>" + data[i].descripcion + " </option>";
                        }
                    }
                    
                    $("#SsubtipopSolservST").select2('destroy');
                    $('#SsubtipopSolservST option').remove();
                    $("#SsubtipopSolservST").append(option);
                    $("#SsubtipopSolservST").select2({
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
}


function MostrarOcultarCustodio(){
    console.log(123121);
    tipo_serv = $("#StipoSerSolservST").val();
    tipo_acti =$("#StipoActSolservST").val();

    if(tipo_serv == 'I'){
        $("#content_provMant").css('display','none');
        if(tipo_acti == 'M')
            $("#nuevo_custodio").css('display','none');
        if(tipo_acti == 'C')
            $("#nuevo_custodio").css('display','block');
        if(tipo_acti == 'S')
            $("#nuevo_custodio").css('display','none');
    }

    if((tipo_serv == 'E')||(tipo_serv == 'A')){
        $("#content_provMant").css('display','block');
        if(tipo_acti == 'M')
            $("#nuevo_custodio").css('display','none');
        if(tipo_acti == 'C')
            $("#nuevo_custodio").css('display','block');
        if(tipo_acti == 'S')
            $("#nuevo_custodio").css('display','none');
    }

}

function openModelSolServ(nombre){
    console.log(nombre);
    $("#"+nombre).modal(
        {
            backdrop: 'static',
            keyboard: true, 
            show: true,
            width: 1200
        }
        //'show'
    );
}

function CierraPopup(nombre) {
  $("#"+nombre).modal('hide');//ocultamos el modal
  $('body').removeClass('modal-open');//eliminamos la clase del body para poder hacer scroll
  $('.modal-backdrop').remove();//eliminamos el backdrop del modal
}

/*funcion para limpiar formulario de ingreso y actualizacion de Accidentes*/
function limpiarFormSolServST() {
    $('.nav-tabs a[href="#tab_sol"]').tab('show');
    $('.nav-tabs a[href="#tab_desc"]').tab('show');
    clearForm(frm_Solserv);
    //$("#SestregEquipoST").val("A").trigger("change");
    $("#tipoSolservST").val(0);
    $("#idSolservST").val("");
    tinymce.get("descSolservST").setContent("");
    tinymce.get("resolSolservST").setContent("");

    $("#SprioridadSolservST").val("5").trigger("change");
    $("#SurgenciaSolservST").val("5").trigger("change");
    $("#StipoSerSolservST").val("I").trigger("change");
    
    var today = new Date().toISOString().split('T')[0];
    var hora = new Date().toISOString().split('T')[1];
    console.log(new Date().toISOString());
    hora = hora.split(':')
    $("#fechaSSolservST").val(today);
    $("#horaSSolservST").val(hora[0]+":"+hora[1]);
    //$('#fechaSSolservST').val(f1);
}

/*funcion para asignar los datos al formulario*/
/*parametros id ---> id tabla*/
function editSolserv(id) {
    console.log(">>>> editSolserv ");
    limpiarFormSolServST();
    //$('.nav-tabs a[href="#tab_sol"]').tab('show');
    $.ajax({
        url: "solserv_data",
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
                $("#tipoSolservST").val(1);
                $("#idSolservST").val(json[0].id);
                $("#numeroSolST").val(json[0].secuencia);
                $("#tituloSolservST").val(json[0].titulo);
                //$("#asignSolservST").val(json[0].sysaid_userasignado.persona_id.nombre_completo);
                $("#asignSolservST").val(json[0].sysaid_userasignado);
                $("#SestadoSolservST").val(json[0].estado_solicitud).trigger("change");
                
                if(valor_nulo_str(json[0].equipo_id)!=""){
                    $("#idequipoSolservST").val(json[0].equipo_id.id);
                    $("#codSolservST").val(json[0].equipo_id.codigo);
                    $("#modeloSolservST").val(json[0].equipo_id.modelo);               
                    $("#serieSolservST").val(json[0].equipo_id.serie_num);


                    if(valor_nulo_str(json[0].equipo_id.producto_id)!="")
                        $("#equipoSolservST").val(json[0].equipo_id.producto_id.descripcion);

                    if(valor_nulo_str(json[0].equipo_id.marca_id)!="")
                        $("#marcaSolservST").val(json[0].equipo_id.marca_id.descripcion);

                    if(valor_nulo_str(json[0].equipo_id.ubicacion_id)!="")
                        $("#ubicSolservST").val(json[0].equipo_id.ubicacion_id.descripcion);

                    if(valor_nulo_str(json[0].equipo_id.duenio_id)!="")
                        $("#duenioSolservST").val(json[0].equipo_id.duenio_id.nombre_completo);

                    if(valor_nulo_str(json[0].equipo_id.administrador_id)!="")
                        $("#cusSolservST").val(json[0].equipo_id.administrador_id.persona_id.nombre_completo);

                }

                if(json[0].nuevo_custodio_id != null){
                    $("#ncusSolservST").val(json[0].nuevo_custodio_id.persona_id.nombre_completo);
                    $("#idncusSolservST").val(json[0].nuevo_custodio_id.id);
                    $("#observCCST").val(json[0].observaciones);
                }

                if(json[0].proveedor_mantenimiento_id != null){
                    $("#provmanSolservST").val(json[0].proveedor_mantenimiento_id.nombre_completo);
                    $("#idprovmanSolservST").val(json[0].proveedor_mantenimiento_id.id);
                    arrFechaES = json[0].fecha_envio.split(" ");
                    $("#provmanfechaESolservST").val(arrFechaES[0]);
                    arrHoraES = arrFechaES[1].split(":");
                    $("#provmanhoraESolservST").val(arrHoraES[0]+":"+arrHoraES[1]);

                    arrFechaRS = json[0].fecha_retorno.split(" ");
                    $("#provmanfechaRSolservST").val(arrFechaRS[0]);
                    arrHoraRS = arrFechaRS[1].split(":");
                    $("#provmanhoraRSolservST").val(arrHoraRS[0]+":"+arrHoraRS[1]);
                }

                $("#IdExternoSolservST").val(json[0].sysaid_ticket);

                if(valor_nulo_str(json[0].sysaid_fe_solicitud)!=""){
                    arrFechaS = json[0].sysaid_fe_solicitud.split("T");
                    $("#fechaSSolservST").val(arrFechaS[0]);
                    arrHoraS = arrFechaS[1].split(":");                
                    $("#horaSSolservST").val(arrHoraS[0]+":"+arrHoraS[1]);
                }

                if(valor_nulo_str(json[0].sysaid_fe_vencimiento)!=""){
                    arrFechaR = json[0].sysaid_fe_vencimiento.split("T");
                    $("#fechaESolservST").val(arrFechaR[0]);
                    arrHoraR = arrFechaR[1].split(":");          
                    $("#horaESSolservST").val(arrHoraR[0]+":"+arrHoraR[1]);
                }
                

                $("#StipopSolservST").val(json[0].sysaid_categoria).trigger("change");
                $("#SsubtipopSolservST").val(json[0].sysaid_subcategoria).trigger("change");

                $("#StipoSerSolservST").val(json[0].tipo_servicio).trigger("change");
                $("#StipoActSolservST").val(json[0].tipo_actividad).trigger("change");

                $("#SprioridadSolservST").val(json[0].prioridad).trigger("change");
                $("#SurgenciaSolservST").val(json[0].urgencia).trigger("change");

                if(valor_nulo_str(json[0].sysaid_usersolicitante)!="")
                    if(valor_nulo_str(json[0].sysaid_usersolicitante.persona_id)!="")
                        $("#userSolicSolservST").val(json[0].sysaid_usersolicitante.persona_id.nombre_completo);

                $("#iduserSolicSolservST").val(json[0].sysaid_usersolicitante.id); 
                $("#emailSolicSolservST").val(json[0].sysaid_usersolicitante.email); 
                //$("#userSolicSolservST").val(json[0].sysaid_usersolicitante);


                if(json[0].descripcion != "")
                    tinymce.get("descSolservST").setContent(json[0].descripcion);
                else
                    tinymce.get("descSolservST").setContent("");

                if(json[0].resolucion != "")
                    tinymce.get("resolSolservST").setContent(json[0].resolucion);
                else
                    tinymce.get("resolSolservST").setContent("");
                
                
            }
        },
        error: function(json) {
            $("#modalLoadin").hide();
            swal("", "Error: " + JSON.stringify(json), "error");
            console.log(JSON.stringify(json));
            //console.log( JSON.stringify(data));
        }
    });
}


/*funcion para asignar los datos al formulario*/
/*parametros id ---> id tabla*/
function getDataSysId() { 
    console.log(">>>>> getDataSysId <<<");

    $("#modalLoadin").show();
    idSysid = $("#IdExternoSolservST").val();
    $.ajax({
        url: "get_remote_data_sysaid",
        type: "get",
        data: {
            "data": idSysid
        },
        dataType: "json",

        success: function(json) {
            $("#modalLoadin").hide();
            if (json['error']) {
                console.log(json['error'].name);
            } else {

                $("#tituloSolservST").val(json.title);
                $("#SestadoSolservST").val(json.ext_status).trigger("change");
                $("#StipopSolservST").val(json.problem_type).trigger("change");
                $("#SsubtipopSolservST").val(json.problem_subtype).trigger("change");
                $("#SprioridadSolservST").val(json.ext_priority).trigger("change");
                $("#SurgenciaSolservST").val(json.ext_urgency).trigger("change");


                if(json.description != "")
                    tinymce.get("descSolservST").setContent(json.description);
                else
                    tinymce.get("descSolservST").setContent("");

                arrFechaS = json.request_date.split(" ");
                $("#fechaSSolservST").val(arrFechaS[0]);
                arrHoraS = arrFechaS[1].split(":");                
                $("#horaSSolservST").val(arrHoraS[0]+":"+arrHoraS[1]);

                arrFechaR = json.due_date.split(" ");
                $("#fechaESolservST").val(arrFechaR[0]);
                arrHoraR = arrFechaR[1].split(":");          
                $("#horaESSolservST").val(arrHoraR[0]+":"+arrHoraR[1]); 

                $("#asignSolservST").val(json.assigned_to_nombre);
                //$("#idasignSolservST").val(json.assigned_to_id); 

                $("#userSolicSolservST").val(json.solicita_nombre);
                $("#iduserSolicSolservST").val(json.solicita_id_fun); 
                $("#emailSolicSolservST").val(json.solicita_email);
            }
        },
        error: function(json) {
            $("#modalLoadin").hide();
            swal("", "Error: " + JSON.stringify(json), "error");
            console.log(JSON.stringify(json));
            //console.log( JSON.stringify(data));
        }
    });
}

function buscarSolServParametros(inicio){
    console.log(">>>>>>> buscarSolServParametros <<<<");
    dataC = "";
    if(inicio != ""){
        secuencia = $("#secuenciaFST").val();
        equipo    = $("#equipoFST").val();
        asignado  = $("#asignadoFST").val();
        solicita  = $("#solicitaFST").val();
        sysid     = $("#sysidFST").val();
        tactiv    = $("#StipoActSolservSTP").val();
        estasol   = $("#SestadoSolservSTP").val();

        if(secuencia != "")
            dataC += "secuencia__icontains=" + secuencia + "&";
        if(equipo != "")
            dataC += "equipo_id__producto_id__descripcion__icontains=" + equipo + "&";
        /*
        if(asignado != "")
            dataC += "sysaid_userasignado__persona_id__nombre_completo__icontains=" + asignado + "&";
        */
        if(solicita != "")
            dataC += "sysaid_usersolicitante__persona_id__nombre_completo__icontains=" + solicita + "&";
            //dataC += "sysaid_usersolicitante__icontains=" + solicita + "&";
        if(sysid != "")
            dataC += "sysaid_ticket__icontains=" + sysid + "&";
        if(tactiv != "")
            dataC += "tipo_actividad__icontains=" + tactiv + "&";
        if(estasol != "")
            dataC += "estado_solicitud__icontains=" + estasol + "&";

        dataC = dataC.substring(0, dataC.length - 1);
    }


    console.log(121);
     

     $.ajax({
        url: "data_solservParam",
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

                        if((data[i].tipo_actividad == 'C')||(data[i].tipo_actividad == 'M'))
                            lista="<a href='#listcheck' onclick='setIdpreguntaPopup(\"" + data[i].id + "\");' data-stackbox='true' data-stackbox-width='1000px' data-stackbox-position='absolute'><i class='fa fa-list-ol text-green btn_edit'></i></a>";
                        else
                            lista="";

                        tabla += "<tr>";
                        tabla += "<td align='center' id='td_secuencia_"+data[i].id+"'>" + data[i].secuencia  + "</td>";                      
                        tabla += "<td align='center' id='td_titulo_"+data[i].id+"'>" + data[i].titulo + "</td>";
                        if(valor_nulo_str(data[i].equipo_id)!= ""){
                            if(valor_nulo_str(data[i].equipo_id.producto_id)!= "")
                                tabla += "<td align='left' id='td_equipo_"+data[i].id+"'>" + data[i].equipo_id.producto_id.descripcion + "</td>";
                            else
                                tabla += "<td align='left' id='td_equipo_"+data[i].id+"'> </td>";
                        }else{
                            tabla += "<td align='left' id='td_equipo_"+data[i].id+"'> </td>";
                        }

                        //tabla += "<td align='left' id='td_asignado_"+data[i].id+"'>" + data[i].sysaid_userasignado.persona_id.nombre_completo + "</td>";
                        tabla += "<td align='left' id='td_asignado_"+data[i].id+"'>" + data[i].sysaid_userasignado + "</td>";
                        if(valor_nulo_str(data[i].sysaid_usersolicitante)!='')
                            if(valor_nulo_str(data[i].sysaid_usersolicitante.persona_id)!='')
                                tabla += "<td align='left' id='td_solicitante_"+data[i].id+"'>" +  data[i].sysaid_usersolicitante.persona_id.nombre_completo + "</td>";
                            else
                                tabla += "<td align='left' id='td_solicitante_"+data[i].id+"'>"+"</td>";
                        else
                            tabla += "<td align='left' id='td_solicitante_"+data[i].id+"'>"+"</td>";

                        //tabla += "<td align='left' id='td_solicitante_"+data[i].id+"'>" +  data[i].sysaid_usersolicitante + "</td>";
                        tabla += "<td align='center' id='td_tipo_"+data[i].id+"'>" + $("#StipoActSolservST option[value='" + data[i].tipo_actividad + "']").text()  + "</td>";
                        tabla += "<td align='center' id='td_fecha_"+data[i].id+"'>" + data[i].sysaid_fe_solicitud  + "</td>";
                        tabla += "<td align='center' id='td_estado_"+data[i].id+"'>" + $("#SestadoSolservST option[value='" + data[i].estado_solicitud + "']").text() + "</td>";
                        tabla += "<td align='center'><a  onclick='openModelSolServ(\"addSolserv\");editSolserv(\"" + data[i].id + "\")'><i class='fa fa-edit text-green btn_edit'></i></a> </td>";
                        tabla += "<td align='center'>";
                        //tabla += "<a href='#pdfSolSer' data-stackbox='true' data-stackbox-width='1000px' data-stackbox-position='absolute'><i class='fa fa-file-pdf-o text-green btn_edit'></i></a> ";
                        tabla += "<a style='font-size: 18px; cursor: pointer;' href='"+pentaho_solicitudservicio+"?id="+  data[i].id  +"' target='_blank'><i class='fa fa-file-pdf-o text-green' ></i></a>";
                        tabla += "</td>";
                        tabla += "<td align='center'>"+lista+"</td>";
                        tabla += "<td align='center'><a onclick='deleteModal(\"" + data[i].id + "\",\"solserv\");'><i class='fa fa-trash text-green btn_edit'></i></a></td>";
                        tabla += "</tr>";
                        /*
                        <a style="font-size: 18px; cursor: pointer;" href='https://produccion.sia.dpng.gob.ec:8243/pentaho/api/repos/%3Ahome%3ADPNG%3AReportes%3ADAF%3AGTH%3ACarnetDpng.prpt/viewer?id={{ item.id }}' target="_blank"><i class="fa fa-file-pdf-o text-green" ></i></a>
                        */                
                    }
                }

                $('#tabla_Solservs').dataTable().fnClearTable();
                $('#tabla_Solservs').dataTable().fnDestroy();

                $("#bodytabla_Solservs").html("");
                $("#bodytabla_Solservs").append(tabla);

                var table = $('#tabla_Solservs').DataTable();
            }
        },
        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
        },
    });
} 

function setInsertUpdateSolserv() {
    console.log(11);
    valida = validaContenedor("addSolserv");

    if (valida) {
        if ($("#tipoSolservST").val() == 0)
            insertarTablaSolserv();
        else
            saveEditSolserv();
    }
}


/*funcion para insertar en la base de datos*/
function insertarTablaSolserv() {

    console.log(121212112);

    
    
    titulo            = $("#tituloSolservST").val();
    //sysaid_userasignado       = $("#idasignSolservST").val();
    sysaid_userasignado = $("#asignSolservST").val();
    estado_solicitud  = $("#SestadoSolservST").val();
    equipo_id         = $("#idequipoSolservST").val();
    nuevo_custodio_id = $("#idncusSolservST").val();
    observaciones_cus = $("#observCCST").val();
    proveedor_mantenimiento_id = $("#idprovmanSolservST").val();   
    fechaEntrega      = $("#provmanfechaESolservST").val();
    HoraEntrega       = $("#provmanhoraESolservST").val();
    fechaRetorno      = $("#provmanfechaRSolservST").val();
    HoraRetorno       = $("#provmanhoraRSolservST").val();

    idSysid           = $("#IdExternoSolservST").val();
    fechaSolicit      = $("#fechaSSolservST").val();
    HoraSolicit       = $("#horaSSolservST").val();
    fechaESolicit     = $("#fechaESolservST").val();
    HoraESolicit      = $("#horaESSolservST").val();

    prioridad          = $("#SprioridadSolservST").val();
    urgencia           = $("#SurgenciaSolservST").val();
    tipo_problema      = $("#StipopSolservST").val();
    subtipo_problema   = $("#SsubtipopSolservST").val();
    tipo_servicio      = $("#StipoSerSolservST").val();
    tipo_actividad     = $("#StipoActSolservST").val();
    usuario_solicitante_id = $("#iduserSolicSolservST").val();

    descripcion = tinyMCE.get('descSolservST').getContent();
    descripcion = descripcion.replace(/\n\r?/g, '').replace(/["]+/g, "'").replace(/\//g, "/");
    resolucion  = tinyMCE.get('resolSolservST').getContent();
    resolucion  = resolucion.replace(/\n\r?/g, '').replace(/["]+/g, "'").replace(/\//g, "/");
    /*descripcion        = $("#descSolservST").val();
    resolucion         = $("#resolSolservST").val();*/

    if(fechaEntrega != "")  fechaEntrega = fechaEntrega+" "+HoraEntrega; else  fechaEntrega = null;
    if(fechaRetorno != "")  fechaRetorno = fechaRetorno+" "+HoraRetorno; else  fechaRetorno = null;

    fechaSolicit  = fechaSolicit+" "+HoraSolicit;
    fechaESolicit = fechaESolicit+" "+HoraESolicit;
    
    //foto_equipo, fecha
    
    if(sysaid_userasignado == "") sysaid_userasignado = null;
    if(equipo_id == "") equipo_id = null;
    if(nuevo_custodio_id == "") nuevo_custodio_id = null;
    if(proveedor_mantenimiento_id == "") proveedor_mantenimiento_id = null;
    if(usuario_solicitante_id == "") usuario_solicitante_id = null;

    datos = '{"titulo":"' + titulo + '",';
    datos += '"sysaid_userasignado":"' + sysaid_userasignado + '",';
    datos += '"estado_solicitud":"' + estado_solicitud + '",';
    datos += '"equipo_id":"' + equipo_id + '",';
    datos += '"descripcion":"' + descripcion + '",';
    if (nuevo_custodio_id != null ) {
        datos += '"nuevo_custodio_id":"' + nuevo_custodio_id + '",'; 
        datos += '"observaciones":"' + observaciones_cus + '",'; 
    }else{
        datos += '"nuevo_custodio_id":null,';
        datos += '"observaciones":null,';
    }
    /*solo si el tipo de servicio es externo se insertan estos valores*/
    if(tipo_servicio == 'E'){
        if(fechaEntrega != "")  fechaEntrega = fechaEntrega+" "+HoraEntrega; else  fechaEntrega = null;
        if(fechaRetorno != "")  fechaRetorno = fechaRetorno+" "+HoraRetorno; else  fechaRetorno = null;
        datos += '"proveedor_mantenimiento_id":"' + proveedor_mantenimiento_id + '",';
        if(fechaEntrega != null ) datos += '"fecha_envio":"' + fechaEntrega + '",';   else datos += '"fecha_envio": null ,';
        if(fechaRetorno != null ) datos += '"fecha_retorno":"' + fechaRetorno + '",'; else datos += '"fechaRetorno": null ,';
    }else{
        datos += '"proveedor_mantenimiento_id": null,';
        if(fechaEntrega != null ) datos += '"fecha_envio":"' + fechaEntrega + '",';   else datos += '"fecha_envio": null ,';
        if(fechaRetorno != null ) datos += '"fecha_retorno":"' + fechaRetorno + '",'; else datos += '"fechaRetorno": null ,';
    }

    datos += '"tipo_servicio":"' + tipo_servicio + '",';
    datos += '"tipo_actividad":"' + tipo_actividad + '",';
    datos += '"prioridad":"' + prioridad + '",';
    datos += '"urgencia":"' + urgencia + '",';
    datos += '"sysaid_ticket":"' + idSysid + '",'; 
    datos += '"sysaid_fe_solicitud":"' + fechaSolicit + '",';
    datos += '"sysaid_fe_vencimiento":"' + fechaESolicit + '",';
    datos += '"sysaid_categoria":"' + tipo_problema + '",';
    datos += '"sysaid_subcategoria":"' + subtipo_problema + '",';
    datos += '"sysaid_usersolicitante":"' + usuario_solicitante_id + '"';

     
    
    datos += '}';

    datos = datos.replace(/undefined/g, null);
    datos = datos.replace(/None/g,null);
    datos = datos.replace(/False/g,null);
    datos = datos.replace(/True/g,"'true'");
    datos = datos.replace(/'/g,'"');
    datos = datos.replace(/"null"/g, null);

    console.log(datos);

    dj_url = 'sptsolicitudservicio';
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
        success: function(data2) {
            if (!data2['results']) {
                console.log("data---->" + datos + "--->" + "sptsolicitudservicio" + "Error--->" + data2);
                validaContenedorExt("addSolserv", "Error al insertar el Equipo");
            } else {
                swal("", "Registro Insertado con éxito", "success");
                CierraPopup("addSolserv");
                buscarSolServParametros("");
            }
        },
        error: function(data2) {
            console.log("data---->" + datos + "--->" + "sptsolicitudservicio" + "Error--->" + data2);
            validaContenedorExt("addSolserv", "Error al insertar el Equipo");
        },
    });
}


/*funcion para insertar en la base de datos*/
function saveEditSolserv() {

    console.log(">>>>>> saveEditSolserv <<<<<");

    id = $("#idSolservST").val();
    
    titulo            = $("#tituloSolservST").val();
    //sysaid_userasignado = $("#idasignSolservST").val();
    sysaid_userasignado = $("#asignSolservST").val();
    estado_solicitud  = $("#SestadoSolservST").val();
    equipo_id         = $("#idequipoSolservST").val();
    nuevo_custodio_id = $("#idncusSolservST").val();
    observaciones_cus = $("#observCCST").val();
    proveedor_mantenimiento_id = $("#idprovmanSolservST").val();   
    fechaEntrega      = $("#provmanfechaESolservST").val();
    HoraEntrega       = $("#provmanhoraESolservST").val();
    fechaRetorno      = $("#provmanfechaRSolservST").val();
    HoraRetorno       = $("#provmanhoraRSolservST").val();

    idSysid           = $("#IdExternoSolservST").val();
    fechaSolicit      = $("#fechaSSolservST").val();
    HoraSolicit       = $("#horaSSolservST").val();
    fechaESolicit     = $("#fechaESolservST").val();
    HoraESolicit      = $("#horaESSolservST").val();

    prioridad          = $("#SprioridadSolservST").val();
    urgencia           = $("#SurgenciaSolservST").val();
    tipo_problema      = $("#StipopSolservST").val();
    subtipo_problema   = $("#SsubtipopSolservST").val();
    tipo_servicio      = $("#StipoSerSolservST").val();
    tipo_actividad     = $("#StipoActSolservST").val();
    usuario_solicitante_id = $("#iduserSolicSolservST").val();

    descripcion = tinyMCE.get('descSolservST').getContent();
    descripcion = descripcion.replace(/\n\r?/g, '').replace(/["]+/g, "'").replace(/\//g, "/");
    resolucion  = tinyMCE.get('resolSolservST').getContent();
    resolucion  = resolucion.replace(/\n\r?/g, '').replace(/["]+/g, "'").replace(/\//g, "/");

    if(fechaEntrega != "")  fechaEntrega = fechaEntrega+" "+HoraEntrega; else  fechaEntrega = null;
    if(fechaRetorno != "")  fechaRetorno = fechaRetorno+" "+HoraRetorno; else  fechaRetorno = null;

    fechaSolicit  = fechaSolicit+" "+HoraSolicit;
    fechaESolicit = fechaESolicit+" "+HoraESolicit;
    
    //foto_equipo, fecha
    
    if(sysaid_userasignado == "") sysaid_userasignado = null;
    if(equipo_id == "") equipo_id = null;
    if(nuevo_custodio_id == "") nuevo_custodio_id = null;
    

    if(proveedor_mantenimiento_id == "") proveedor_mantenimiento_id = null;
    if(usuario_solicitante_id == "") usuario_solicitante_id = null;

    datos = '{"titulo":"' + titulo + '",';
    datos += '"sysaid_userasignado":"' + sysaid_userasignado + '",';
    datos += '"estado_solicitud":"' + estado_solicitud + '",';
    datos += '"equipo_id":"' + equipo_id + '",';
    datos += '"descripcion":"' + descripcion + '",';
    datos += '"resolucion":"' + resolucion + '",';
    //if (nuevo_custodio_id != null ) datos += '"nuevo_custodio_id":"' + nuevo_custodio_id + '",'; else datos += '"nuevo_custodio_id":null,';
    if (nuevo_custodio_id != null ) {
        datos += '"nuevo_custodio_id":"' + nuevo_custodio_id + '",'; 
        datos += '"observaciones":"' + observaciones_cus + '",'; 
    }else{
        datos += '"nuevo_custodio_id":null,';
        datos += '"observaciones":null,';
    }
    /*solo si el tipo de servicio es externo se insertan estos valores*/
    if(tipo_servicio == 'E'){
        if(fechaEntrega != "")  fechaEntrega = fechaEntrega+" "+HoraEntrega; else  fechaEntrega = null;
        if(fechaRetorno != "")  fechaRetorno = fechaRetorno+" "+HoraRetorno; else  fechaRetorno = null;
        datos += '"proveedor_mantenimiento_id":"' + proveedor_mantenimiento_id + '",';
        if(fechaEntrega != null ) datos += '"fecha_envio":"' + fechaEntrega + '",';   else datos += '"fecha_envio": null ,';
        if(fechaRetorno != null ) datos += '"fecha_retorno":"' + fechaRetorno + '",'; else datos += '"fechaRetorno": null ,';
    }else{
        datos += '"proveedor_mantenimiento_id": null,';
        if(fechaEntrega != null ) datos += '"fecha_envio":"' + fechaEntrega + '",';   else datos += '"fecha_envio": null ,';
        if(fechaRetorno != null ) datos += '"fecha_retorno":"' + fechaRetorno + '",'; else datos += '"fechaRetorno": null ,';
    }

    datos += '"tipo_servicio":"' + tipo_servicio + '",';
    datos += '"tipo_actividad":"' + tipo_actividad + '",';
    datos += '"prioridad":"' + prioridad + '",';
    datos += '"urgencia":"' + urgencia + '",';
    datos += '"sysaid_ticket":"' + idSysid + '",'; 
    datos += '"sysaid_fe_solicitud":"' + fechaSolicit + '",';
    datos += '"sysaid_fe_vencimiento":"' + fechaESolicit + '",';
    datos += '"sysaid_categoria":"' + tipo_problema + '",';
    datos += '"sysaid_subcategoria":"' + subtipo_problema + '",';
    datos += '"sysaid_usersolicitante":"' + usuario_solicitante_id + '"';
    
    datos += '}';

    console.log(datos);

    dj_url = 'sptsolicitudservicio';
    $.ajax({
        url: "update_General",
        type: 'get',
        cache: 'false',
        async: false,
        data: {
            "dj_url": dj_url,
            "idtabla": id,
            "data": JSON.stringify(datos)
        },
        dataType: "json",
        success: function(data2) {
            if (data2.id == undefined) {
                console.log("data---->" + datos + "--->" + "sptsolicitudservicio" + "Error--->" + data2);
                validaContenedorExt("addSolserv", "Error al Actualizar el Equipo");
            } else {
                swal("", "Registro Actualizado éxito", "success");

                CierraPopup("addSolserv");

                $("#td_titulo_" + id).html(titulo);
                $("#td_equipo_" + id).html($("#equipoSolservST").val());
                $("#td_asignado_" + id).html($("#asignSolservST").val());
                $("#td_solicitante_" + id).html($("#userSolicSolservST").val());
                $("#td_fecha_" + id).html(fechaSolicit);
                $("#td_estado_" + id).html($("#SestadoSolservST option[value='" + estado_solicitud + "']").text());
                $("#td_tipo_" + id).html($("#StipoActSolservST option[value='" + tipo_actividad + "']").text()); 

                updateDataRemote(idSysid)

            }
        },
        error: function(data2) {
            console.log("data---->" + datos + "--->" + "sptsolicitudservicio" + "Error--->" + data2);
            validaContenedorExt("addSolserv", "Error al Actualizar el Equipo");
        },
    }); 
}

function mostrarOcultarNuevoCustodio(idsubtipo){
    if(idsubtipo == 50)
        $("#nuevo_custodio").show();
    else
        $("#nuevo_custodio").hide();
}


function insertarDetInformeBajas(){

    file = $('#doc_anexosSAIB')[0].files[0];
    if (!file) {
        fileExtension = "";
    } else {
        fileExtension = file.name.split('.').pop();
        salida = ValidateExt(fileExtension);
        cadenaImg = '"file_baja":"' + file.name + '",';
    }

    respuesta1   = $("#opreporte1IE").prop( "checked" );
    respuesta2   = $("#opreporte2IE").prop( "checked" );
    if(respuesta1 == true)
        salidaresp = 'B';
    else
        salidaresp = 'T';

    fileExtension = fileExtension.toLowerCase();

    numeracion = $("#secIBSA").val();

    var path_archivos = '';

    if(numeracion != 0)
        path_archivos = 'static/media/soporte_tic/'+numeracion+'/';
    /*se obtiene la nuevo numeracion*/
    else{
        $.ajax({
            url: "data_secinfoBajaCab",
            type: "get",
            data: {"data": salidaresp},
            dataType: "json",
            cache: 'false',
            async: false,
            success: function(json) {
                $("#modalLoadin").hide();
                if (json['non_field_errors']) {
                    console.log(json['non_field_errors']);
                } else {

                    if(json.length > 0){
                        json.sort(function(val1, val2){
                            if(val1.str > val2.str){
                                return -1;
                            }else{
                                return 1;
                            }    
                        });
                        console.log(json);
                        numeroAct= json[0].secuencia;
                        numeroArr= numeroAct.split("-");
                        numSig   = parseInt(numeroArr[3])+1;
                        if((numSig > 1)&&(numSig < 10))
                            numeroArr[3] = "000"+numSig;
                        if((numSig >= 10)&&(numSig < 100))
                            numeroArr[3] = "00"+numSig;
                        if((numSig >= 100)&&(numSig < 1000))
                            numeroArr[3] = "0"+numSig;
                        if((numSig >= 1000))
                            numeroArr[3] = numSig;

                        console.log(numeroArr);
                        $("#secIBSA").val(numeroArr[0]+"-"+numeroArr[1]+"-"+numeroArr[2]+"-"+numeroArr[3]);
                        path_archivos = 'static/media/soporte_tic/'+numeroArr[0]+"-"+numeroArr[1]+"-"+numeroArr[2]+"-"+numeroArr[3]+'/';
                    }else{
                        if(salidaresp == 'B')
                            cadena = 'TIC-IB-'+(new Date).getFullYear()+'-0001';
                        else
                            cadena = 'TIC-IT-'+(new Date).getFullYear()+'-0001';

                        $("#secIBSA").val(cadena);
                        path_archivos = 'static/media/soporte_tic/'+cadena+'/';
                    }
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
        upload_file("frm_infoBajasSA",path_archivos);

    id_cab = $("#idInfBajasSA").val();

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
    console.log($("#tipoIBSA").val());
    if ($("#tipoIBSA").val() != 0){

        datos   = '{"cab_infbaja_id":"' + id_cab + '", "orden":"' + orden + '", "comentario":"' + comentario + '", "foto":"' + foto + '"}';

        dj_url = "sptinformebajadetalle";
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
                    console.log("data---->" + datos + "--->" + "sptinformebajadetalle" + "Error--->" + data);
                } else {
                    eliminar  = "<a class='delete' onclick='eliminarFotoInfoBaja(this);' id_detalle='"+data['results'][0].id+"'><i class='fa fa-trash text-green btn_edit'></i></a>";
                    datosDet  += '"eliminar":"' + eliminar  +'"';
                    datosDet  += '}'; 
                    datosDet = "["+datosDet+"]";
                    camposJson = JSON.parse(datosDet);
                    //console.log( camposJson["orden"]);
                   
                    var dTable = $('#tablafotos_repIB').DataTable();

                    /* Create an array with the values of all the input boxes in a column, parsed as numbers */
                    $.fn.dataTable.ext.order['dom-text-numeric'] = function  ( settings, col )
                    {
                        return this.api().column( col, {order:'index'} ).nodes().map( function ( td, i ) {
                            return $('input', td).val() * 1;
                        } );
                    }

                    dTable.row.add(
                        camposJson[0]
                    ).draw();

                    $(".fancybox").fancybox();
                }
            },
            error: function(data) {
                $('#modalLoadin').hide();
                swal("", "Error al Insertar el registro", "error");
                console.log("data---->" + datos + "--->" + "sptinformebajadetalle" + "Error--->" + data);
            },
        });
    }else{
        eliminar  = "<a class='delete' onclick='eliminarFotoInfoBaja(this);'><i class='fa fa-trash text-green btn_edit'></i></a>";
        datosDet  += '"eliminar":"' + eliminar  +'"';
        datosDet  += '}'; 

        datosDet = "["+datosDet+"]";
        camposJson = JSON.parse(datosDet);
        //console.log( camposJson["orden"]);
       
        /*var dTable = $('#tablafotos_rep').DataTable();
                dTable.row.add(
                    camposJson[0]
                ).draw();*/
         var dTable = $('#tablafotos_repIB').DataTable();
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


//$('#tablafotos_repIB').on('click', '.delete', function () {
function eliminarFotoInfoBaja(thistr){
    var pageParamTable = $('#tablafotos_repIB').DataTable();
    var tableRow = pageParamTable.row($(thistr).parents('tr'));
    id_detalle = $(thistr).attr("id_detalle");
    
    //console.log(id_detalle);
    if(id_detalle){
        datos = '{"estado":"I","eliminado":"t"}';
        $.ajax({
        url: "update_General",
        type: "get",
        cache: 'false',
        data: {
            "dj_url": "sptinformebajadetalle",
            "idtabla": id_detalle,
            "data": JSON.stringify(datos)
        },
        dataType: "json",

        success: function(data) {
            if (data.id == undefined) {
                $('#modalLoadin').hide();
                validaContenedorExt("infoBajas", "Error al Insertar el registro");
                console.log("idtabla---->" + id + "--->" + "data---->" + datos + "--->" + "sptinformebajadetalle" + "Error--->" + data);
            } else {
                validaContenedorExt2("infoBajas", "Registro eliminado con exito");
                pageParamTable.row( tableRow ).remove().draw();
            }
        },
        error: function(data) {
            $('#modalLoadin').hide();
            validaContenedorExt("infoBajas", "Error al Insertar el registro");
            console.log("idtabla---->" + id + "--->" + "data---->" + datos + "--->" + "sptinformebajadetalle" + "Error--->" + data);
        },
    });
    }else
        pageParamTable.row( tableRow ).remove().draw();
}


function limpiarFormInfoBaja(){

jQuery('#content_divTab').find(':input').each(function() {
    switch(this.type) {
        case 'password':
        case 'text':
        case 'textarea':
        case 'file':
        case 'select-one':
        case 'select-multiple':
        case 'date':
        case 'number':
        case 'hidden':
        case 'tel':
        case 'email':
            jQuery(this).val('');
            break;
        case 'checkbox':
        case 'radio':
            this.checked = false;
            break;
    }
  });


$('.nav-tabs a[href="#tab_GenIB"]').tab('show'); //para q cuando se abra el popup aparezca en la primera pestaña
/*$('#tab_GenIB').find('input:text').val('');
$('#tab_anexoIB').find('input:text').val('');
$('#ci_observacionSAIN').val('');*/

tinymce.get("ci_anteSAIN").setContent("");
tinymce.get("ci_desaSAIN").setContent("");
tinymce.get("ci_concSAIN").setContent("");
tinymce.get("ci_recoSAIN").setContent("");
tinymce.get("ci_baseSAIN").setContent("");

$('#tablafotos_repIB').dataTable().fnClearTable();
$('#tablafotos_repIB').dataTable().fnDestroy();

$("#bodytablafotos_repIB").html("");
//$('#tablafotos_rep').DataTable({ "destroy": true });
//$("#bodytablafotos_repIB").append("");
$("#tipoIBSA").val(0);
$("#idInfBajasSA").val("");
$('#descargaIBSA').val(0);
$('#secIBSA').val(0);

}

function getInformesBajasCab(dataIni){
limpiarFormInfoBaja();
$("#modalLoadin").show();
dataC = '';
var fdesde;
var fhasta;
if (dataIni) {
    dataC = dataC += "fecha__range=" + dataIni;
} else {

    desde = $("#FdesdeInfBaja").val();
    hasta = $("#FhastaInfBaja").val();

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
        dataC += "fecha__range=" + fdesde + "," + fhasta;
    } else {
        validaContenedorExt("infoBajas", "No a seleccionado rango de Fechas");
        return 0;
    }
}

$.ajax({
    url: "data_infoBajaCabParam",
    type: "get",
    data: {
        "data": dataC
    },
    async: false,
    dataType: "json",
    success: function(data) {
        if (data['non_field_errors']) {
            $("#modalLoadin").hide();
            console.log(data['non_field_errors']);
        } else {
            cadenatree = "";
            dataArray = "";
            if (data.length > 0) {
                lista = "<ul>";
                lista += "<li data-jstree='{ \"opened\" : true}'><span style='font-size:12px;'>Informe de Bajas</span>";
                lista +="<ul>";
                for (i = 0; i < data.length; i++) {//,"id_cab":"'+data[i].id+'"                      
                    lista +="<li><a onclick='getDataInformebaja(\""+data[i].id+"\");'><span style='font-size:12px;'>"+data[i].secuencia+"</span></a></li>";
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

            $("#modalLoadin").hide();
        }
    },
    error: function(data) {
        $("#modalLoadin").hide();
        swal("", "Error: " + JSON.stringify(data), "error");
        console.log(JSON.stringify(data));
    },
});
    
}

function open_informeBaja(){
    console.log(">>>>>>> open_informeBaja");
    
    var id_ = $("#idInfBajasSA").val();
    var pentaho_informebaja = "https://produccion.sia.dpng.gob.ec:8243/pentaho/api/repos/%3Ahome%3ADPNG%3AReportes%3ADAF%3AGTEC%3AMDA%3Abaja_equipo.prpt/viewer";

    pentaho_informebaja = pentaho_informebaja+"?id="+id_;

    var win = window.open(pentaho_informebaja, '_blank');
    if (win) {
        //Browser has allowed it to be opened
        win.focus();
    } else {
        //Browser has blocked it
        alert('Please allow popups for this website');
    }

}

function getDataInformebaja(id){
    console.log(">>>>>>>> getDataInformebaja <<<<<<<<");
    limpiarFormInfoBaja();
    novedadessJson = [];
    //initTinymce();
     

    $("#content_divTab").removeClass("disabled-select");
    console.log(id);
    $.ajax({
        url: "data_infoBajaCab",
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
                $("#tipoIBSA").val(1);
                $("#secIBSA").val(json[0].secuencia);
                $("#idInfBajasSA").val(json[0].id);
                $("#fechaIBST").val(json[0].fecha);
                $("#titulosolservIBST").val(json[0].titulo);

                if(json[0].tipo_reporte == 'B'){
                    $("#opreporte1IE").prop('checked', true);
                    $("#opreporte2IE").prop('checked', false);
                    $("#labeltitulo").html("");
                    $("#labeltitulo").html("de Baja");
                    $("#titulofoto").html("");
                    $("#titulofoto").html("de Baja");
                }else{
                    $("#opreporte1IE").prop('checked', false);
                    $("#opreporte2IE").prop('checked', true);
                    $("#labeltitulo").html("");
                    $("#labeltitulo").html("Técnico");
                    $("#titulofoto").html("");
                    $("#titulofoto").html("Técnico");
                }
                try {
                    $("#funcIBST").val(json[0].funcionario_id.persona_id.nombre_completo);
                }
                catch (e) {
                    console.log(e);
                }

                if(valor_nulo_str(json[0].funcionario_id)!="")
                    $("#idfuncIBST").val(json[0].funcionario_id.id);
                
                
                try {
                    $("#funcAIBST").val(json[0].aprobador_id.persona_id.nombre_completo);
                    $("#idfuncAIBST").val(json[0].aprobador_id.id);
                }
                catch (e) {
                    console.log(e);
                }
                
                
                

                path_archivos = 'static/media/soporte_tic/'+json[0].secuencia+'/';

                if(json[0].solicitudservicio_id != null){
                    $("#solservIBST").val(json[0].solicitudservicio_id.secuencia);
                    $("#idsolservIBST").val(json[0].solicitudservicio_id.id);
                    $("#nroIBST").val(json[0].solicitudservicio_id.sysaid_ticket);
                    $("#titulosolservIBST").val(json[0].solicitudservicio_id.titulo);


                    try{
                        $("#equipoIBST").val(json[0].solicitudservicio_id.equipo_id.producto_id.descripcion);
                    }catch (e) {
                        console.log(e);
                    }


                    try{
                        $("#idequipoIBST").val(json[0].solicitudservicio_id.equipo_id.id);
                        $("#custodioIBST").val(json[0].solicitudservicio_id.equipo_id.administrador_id.persona_id.nombre_completo);
                        $("#idcustodioIBST").val(json[0].solicitudservicio_id.equipo_id.administrador_id.id);
                        $("#ubicacionIBST").val(json[0].solicitudservicio_id.equipo_id.ubicacion_id.descripcion);
                        $("#idubicacionIBST").val(json[0].solicitudservicio_id.equipo_id.ubicacion_id.id);
                    }catch (e) {
                        console.log(e);
                    }

                    
                    
                    
                }else{
                    

                    try{
                        $("#equipoIBST").val(json[0].equipo_id.producto_id.descripcion);
                        $("#idequipoIBST").val(json[0].equipo_id.id);
                        $("#custodioIBST").val(json[0].equipo_id.administrador_id.persona_id.nombre_completo);
                        $("#idcustodioIBST").val(json[0].equipo_id.administrador_id.id);
                        $("#ubicacionIBST").val(json[0].equipo_id.ubicacion_id.descripcion);
                        $("#idubicacionIBST").val(json[0].equipo_id.ubicacion_id.id);
                    }catch (e) {
                        console.log(e);
                    }
                }
  
                if((json[0].antecedentes != "")||(json[0].antecedentes != null)){
                    //initEditor("ci_introSA");
                    tinymce.get("ci_anteSAIN").setContent(json[0].antecedentes);
                }
                if((json[0].desarrollo != "")||(json[0].desarrollo != null)){
                    //initEditor("ci_objSA");
                    tinymce.get("ci_desaSAIN").setContent(json[0].desarrollo);
                }
                if((json[0].conclusiones != "")||(json[0].conclusiones != null)){
                    //initEditor("ci_matSA");
                    tinymce.get("ci_concSAIN").setContent(json[0].conclusiones);
                }
                if((json[0].recomendaciones != "")||(json[0].recomendaciones != null)){
                    //initEditor("ci_desaSA");
                    tinymce.get("ci_recoSAIN").setContent(json[0].recomendaciones);
                }
                if((json[0].base_legal != "")||(json[0].base_legal != null)){
                    //initEditor("ci_desaSA");
                    tinymce.get("ci_baseSAIN").setContent(json[0].base_legal);
                }
                
               
                if(json[0].det_infbaja.length > 0){
                    datosDet = '';
                    for(i=0; i< json[0].det_infbaja.length; i++){                        
                        if(json[0].det_infbaja[i].estado == 'A'){
                            
                            orden = json[0].det_infbaja[i].orden;
                            foto  = json[0].det_infbaja[i].foto;
                            comentario  = json[0].det_infbaja[i].comentario;
                            imagen  = "<a rel='gallery' class='fancybox' href='"+path_archivos+json[0].det_infbaja[i].foto+"'><img src='"+path_archivos+json[0].det_infbaja[i].foto+"' style='width:20px;'></a>";

                            eliminar    = "<a class='delete' onclick='eliminarFotoInfoBaja(this);' id_detalle='"+json[0].det_infbaja[i].id+"'><i class='fa fa-trash text-green btn_edit'></i></a>";

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
                var dTable = $('#tablafotos_repIB').DataTable({  
                    "destroy": true,
                    data :novedadessJson,
                   
                    "columns": [
                        {"data" : "orden", className: "uniqueClassName", "orderDataType": "dom-text-numeric" },
                        {"data" : "imagen", className: "uniqueClassName" },
                        {"data" : "foto"} ,
                        {"data" : "comentario"},
                        {"data" : "eliminar", className: "uniqueClassName" }          
                    ],
                    "columnDefs": [
                        {
                            "targets": 0,
                            "orderDataType": "dom-text-numeric"
                         }
                    ]
                });

                /* Create an array with the values of all the input boxes in a column, parsed as numbers */
                $.fn.dataTable.ext.order['dom-text-numeric'] = function  ( settings, col )
                {
                    return this.api().column( col, {order:'index'} ).nodes().map( function ( td, i ) {
                        return $('input', td).val() * 1;
                    } );
                }

                 $(".fancybox").fancybox();         
            }
        },
        error: function(json) {
            $("#modalLoadin").hide();
            swal("", "Error: " + JSON.stringify(json), "error");
            console.log(JSON.stringify(json));
        },
    });
}


function setInsertUpdateInfoBaja() {
    console.log("infoBajas");
    valida = validaContenedor("infoBajas");

    if (valida) {
        solserv = $("#idsolservIBST").val();
        titulo  = $("#titulosolservIBST").val();
        referencia  = $("#nroIBST").val();
        fecha = $("#fechaIBST").val();
        equipoId  = $("#idequipoIBST").val();
        funcionarioId  = $("#idfuncIBST").val();
        funcionarioAId  = $("#idfuncAIBST").val();


        antec = tinyMCE.get('ci_anteSAIN').getContent();
        desar = tinyMCE.get('ci_desaSAIN').getContent();
        concl = tinyMCE.get('ci_concSAIN').getContent();
        recom = tinyMCE.get('ci_recoSAIN').getContent();
        basel = tinyMCE.get('ci_baseSAIN').getContent();

        datosDet = '';
        var filas = $("#tablafotos_repIB").find("tr"); //devulve las filas del body de tu tabla segun el ejemplo que brindaste
        var resultado = "";
        for(i=1; i<filas.length; i++){ //Recorre las filas 1 a 1
            var celdas = $(filas[i]).find("td"); //devolverá las celdas de una fila

            orden  = $($(celdas[0]).children("input")[0]).val();;
            foto   = $(celdas[2]).text();
            comentario  = $(celdas[3]).text();
            id_detalle  = $($(celdas[4]).children("a")[0]).attr("id_detalle");

            if(orden){
                datosDet  += '{"orden":"' + orden + '", ';
                datosDet  += '"foto":"' + foto + '", ';
                datosDet  += '"comentario":"' + comentario + '" ';
                //solo id si es un update
                if($("#tipoIBSA").val() == 1)
                    datosDet  += ',"id":"' + id_detalle + '"';
                datosDet  += '},'; 
            }           
        }
        datosDet = datosDet.substring(0, datosDet.length - 1);

        respuesta1   = $("#opreporte1IE").prop( "checked" );
        respuesta2   = $("#opreporte2IE").prop( "checked" );
            if(respuesta1 == true)
                salidaresp = 'B';
            else
                salidaresp = 'T';

        /*se arma la cadena datos*/
        datos = '{';
        //datos += ' "numero":"", ';
        datos += ' "solicitudservicio_id":"' + solserv + '", ';
        datos += ' "titulo":"' + titulo + '", ';
        datos += ' "fecha":"' + fecha + '", ';
        datos += ' "tipo_reporte":"' + salidaresp + '", ';
        datos += ' "equipo_id":"' + equipoId + '", ';
        datos += ' "funcionario_id":"' + funcionarioId + '", ';
        datos += ' "aprobador_id":"' + funcionarioAId + '", ';
        datos += ' "antecedentes":"' + antec.replace(/\n\r?/g, '').replace(/["]+/g, "'").replace(/\//g, "/") + '" ,';
        datos += ' "desarrollo":"' + desar.replace(/\n\r?/g, '').replace(/["]+/g, "'").replace(/\//g, "/") + '" ,';
        datos += ' "conclusiones":"' + concl.replace(/\n\r?/g, '').replace(/["]+/g, "'").replace(/\//g, "/") + '" ,';
        datos += ' "recomendaciones":"' + recom.replace(/\n\r?/g, '').replace(/["]+/g, "'").replace(/\//g, "/") + '" ,';
        datos += ' "base_legal":"' + basel.replace(/\n\r?/g, '').replace(/["]+/g, "'").replace(/\//g, "/") + '" ,';
        datos += ' "det_infbaja":[' + datosDet + ']';
        datos += '}';
       
        datos = datos.replace(/undefined/g, null);
        datos = datos.replace(/None/g,null);
        datos = datos.replace(/False/g,"'false'");
        datos = datos.replace(/True/g,"'true'");
        datos = datos.replace(/"null"/g, null);
        datos.replace(/(\r\n\t|\n|\r\t)/gm,"").trim();

        console.log(datos);

        if ($("#tipoIBSA").val() == 0)
            insertarCabDetInfoBaja(datos);
        else
            saveEditCabDetInfoBaja(datos);
    }
}


function insertarCabDetInfoBaja(datos){
    $("#modalLoadin").show();
    dj_url = "sptcabdetinformebaja";
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
                console.log("data---->" + datos + "--->" + "sptcabdetinformebaja" + "Error--->" + data);
            } else {
                swal("", "Registro insertado con Exito", "success");
                console.log(data['results'][0].id);
                getInformesBajasCab();
                $('#modalLoadin').hide();
            }
        },
        error: function(data) {
            $('#modalLoadin').hide();
            swal("", "Error al Insertar el registro", "error");
            console.log("data---->" + datos + "--->" + "sptcabdetinformebaja" + "Error--->" + data);
        },
    });
}

function saveEditCabDetInfoBaja(datos){
    $("#modalLoadin").show();
    console.log($("#idInfBajasSA").val());
    dj_url = "sptcabdetinformebaja";
    $.ajax({
        url: "update_General",
        type: 'get',
        cache: 'false',
        data: {
            "dj_url": dj_url,
            "idtabla": $("#idInfBajasSA").val(),
            "data": JSON.stringify(datos)
        },
        dataType: "json",
        success: function(data) {
            if (data.id == undefined) {
                $('#modalLoadin').hide();
                swal("", "Error al Actualizar el registro", "error");
                console.log("data---->" + datos + "--->" + "sptcabdetinformebaja" + "Error--->" + data);
            } else {
                $("#modalLoadin").hide();
                swal("", "Registro Actualizados con Exito", "success");
                if ($('#window').is(':visible')) {
                   // getDataINPdf();      
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


/*funcion para generar las tablas en pdf botones de las paaginas*/
function generarPdfSolServ() {
    const element = document.getElementById("section_repSolServ");
    filename = 'rep_solserv.pdf'

    html2pdf(element, {
        margin: [0.20, 0.01, 0.20, 0.20],
        filename: filename,
        html2canvas: {
            scale: 2,
            letterRendering: true
        },
        jsPDF: {
            unit: 'in',
            format: 'a4',
            orientation: 'portrait'
        }
    });

}


function LimpiarParametros(div){
    $('#'+div).find('input:text').val('');
}



/*funcion para limpiar formulario de ingreso y actualizacion de Accidentes*/
function limpiarFormPreguntasST() {
    clearForm(frm_preguntas);
    $("#SestadoPregunta").val("A").trigger("change");
    $("#tipoPrST").val(0);
}

function buscarPreguntasParametros(){
console.log(121);
    /*if (nombre != "")
        data = "persona_id__nombre_completo__icontains=" + nombre + "&";

    if (cedula != "")
        data += "persona_id__identificacion__icontains=" + cedula + "&";*/

    //data += "descripcion__icontains=" + cedula + "&";

    dataC = "";

     $.ajax({
        url: "data_preguntasParam",
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
                        tabla += "<td align='center' id='td_orden_"+data[i].id+"'>" + data[i].orden + "</td>";
                        tabla += "<td align='left' id='td_categoria_"+data[i].id+"'>" + $("#ScatPregunta option[value='" + data[i].categoria + "']").text() + "</td>";                    
                        tabla += "<td align='left' id='td_pregunta_"+data[i].id+"'>" + data[i].pregunta + "</td>";
                        tabla += "<td align='center'><a href='#addpreguntas' data-stackbox='true' data-stackbox-position='absolute' onclick='editPregunta(\"" + data[i].id + "\")'><i class='fa fa-edit text-green btn_edit'></i></a> </td>";
                        tabla += "<td align='center'><a onclick='deleteModal(\"" + data[i].id + "\",\"preguntas\");'><i class='fa fa-trash text-green btn_edit'></i></a></td>";
                        tabla += "</tr>";                
                    }
                }
                $('#tabla_pregunta').dataTable().fnClearTable();
                $('#tabla_pregunta').dataTable().fnDestroy();

                $("#bodytabla_pregunta").html("");
                $("#bodytabla_pregunta").append(tabla);

                var table = $('#tabla_pregunta').DataTable({"order": [[ 1, "asc" ], [ 0, "asc" ]]});
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
function setInsertUpdatePregunta() {
    valida = validaContenedor("addpreguntas");

    if (valida) {

        pregunta   = $('#preguntaST').val();
        orden      = $('#ordenST').val();
        categoria  = $('#ScatPregunta').val();
        estado     = $('#SestadoPregunta').val();   

        datos = '{"orden":"' + orden + '","pregunta":"' + pregunta + '", "categoria":"' + categoria + '", "estado":"' + estado + '"}';

        if ($("#tipoPrST").val() == 0)
            insertarTablaPregunta(datos);
        else
            saveEditPregunta(datos);
    }
}

/*funcion para asignar los datos al formulario*/
/*parametros id ---> id tabla*/
function editPregunta(id) {
    
$.ajax({
        url: "pregunta_data",
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
                $("#tipoPrST").val(1);
                $("#idpreguntaST").val(json[0].id);
                $("#ordenST").val(json[0].orden);
                $("#preguntaST").val(json[0].pregunta);
                $("#ScatPregunta").val(json[0].categoria).trigger("change");
                $("#SestadoPregunta").val(json[0].estado).trigger("change");
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
function insertarTablaPregunta(datos) {
    id_padre = $('#content_preguntas').parent().attr('id');
    th_insert(datos, "preguntas", id_padre, "sptlistapregunta");
    buscarPreguntasParametros();
}

/*funcion para editar en la base de datos*/
/*el id se lo guarda en un campo oculto al momento de dar clik en editar*/
function saveEditPregunta(datos) {
    var obj = JSON.parse(datos);
    id = $("#idpreguntaST").val();
    id_padre = $('#content_preguntas').parent().attr('id');
    $("#td_orden_" + id).html(obj.orden);
    $("#td_pregunta_" + id).html(obj.pregunta);
    $("#td_categoria_" + id).html(obj.categoria);
    salida = th_update(datos, "preguntas", id_padre, "sptlistapregunta", id);
}

/*funcion para eliminar(cambio de estado en la base de datos)*/
function deletePregunta(id) {
    id_padre = $('#content_preguntas').parent().attr('id');
    datos = '{"estado":"I","eliminado":"t"}';
    th_delete(datos, "preguntas", id_padre, "sptlistapregunta", id);
}


function grabarPreguntasSolicitud(){
    $("#modalLoadin").show();
    datos = '';
    mensaje = '';
    conta = 0;
    $('.pregunta').each(function() {
       pregunta_id = $(this).attr("id_pregunta");
       padre =  $(this).attr("padre");
       respuesta   = $(this).prop( "checked" );
        if(respuesta)
            respF = 't';
        else
            respF = 'f';
        if($("#pregunta"+pregunta_id).hasClass("requerido")){
            if(respF == 'f'){
                if(conta == 0)
                    mensaje+="Respuesta Obligatoria<br>("+padre+")"+$("#labelpregunta"+pregunta_id).html()+"<br>";
                else
                    mensaje+= "("+padre+")"+$("#labelpregunta"+pregunta_id).html()+"<br>";
                conta++;
            }
        }

        datos+="{'id_pregunta':'"+pregunta_id+"','respuesta':'"+respF+"'},";
    });

    datos = datos.substring(0, datos.length - 1);
    datos = '['+datos+']';

    dataF = '{"preguntas_resp":"'+datos+'"}'

    id    =  $("#idSolServPopup").val();


    if(mensaje == ""){

        dj_url = "sptsolicitudservicio";
        $.ajax({
            url: "update_General",
            type: 'get',
            cache: 'false',
            data: {
                "dj_url": dj_url,
                "idtabla": id,
                "data": JSON.stringify(dataF)
            },
            dataType: "json",
            success: function(data) {
                if (data.id == undefined) {
                    $('#modalLoadin').hide();
                    swal("", "Error al Actualizar el registro", "error");
                    console.log("data---->" + dataF + "--->" + "sptsolicitudservicio" + "Error--->" + data);
                } else {
                    $("#modalLoadin").hide();
                    swal("", "Registro Actualizados con Exito", "success");   
                }
            },
            error: function(data) {
                $("#modalLoadin").hide();
                swal("", "Error al Actualizar el registro", "error");
                console.log("data---->" + dataF + "--->" + "sptsolicitudservicio" + "Error--->" + data);
            },
        });
    }else{
        validaContenedorExt("listcheck",mensaje);
        $("#modalLoadin").hide();
    }
}

function setIdpreguntaPopup(id){
    $("#idSolServPopup").val(id);
    $('.nav-tabs a[href="#tab_1"]').tab('show');
    limpiarCheckPreguntas();
    $.ajax({
        url: "solserv_data",
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
                if(json[0].preguntas_resp != ""){
                   
                    var obj= eval("(" + json[0].preguntas_resp + ")");
                    console.log(obj);
                    for(i=0; i<obj.length; i++){
                        if(obj[i].respuesta == "t")
                            $("#pregunta"+obj[i].id_pregunta).prop("checked", true);
                    }
                }
            }
        },
        error: function(json) {
            $("#modalLoadin").hide();
            swal("", "Error: " + JSON.stringify(json), "error");
            console.log(JSON.stringify(json));
            //console.log( JSON.stringify(data));
        }
    });
}

function limpiarCheckPreguntas(){
$('.pregunta').each(function() {
        $(this).prop("checked", false);
    });
}


function cargarArchivoEquipo(fileName){
    $.ajax({
        url: "import_product",
        type: "get",
        data: {
            "file_name":fileName
        },
        dataType: "json",

        success: function(json) {
            $("#modalLoadin").hide();
            if(json.result == 'OK')
                swal("", "Archivo cargado con Exito", "success");
            console.log(json);
        },
        error: function(json) {
            $("#modalLoadin").hide();
            swal("", "Error: " + JSON.stringify(json), "error");
            console.log(JSON.stringify(json));
            //console.log( JSON.stringify(data));
        }
    });
}


function subirArchivoEquipo(){
    console.log("************* cargar_archivo ***************** ");
    $("#modalLoadin").show();
   
    var path_archivos = 'static/media/soporte_tic/'; 

    if(($("#file_equipo").val()=="")){
        swal('No ha seleccionado el archivo','error');
        $("#modalLoadin").hide();
        return 0;
    }else{
        
        file = $('#file_equipo')[0].files[0];
       
        if(file == undefined || file == null){
            $("#modalLoadin").hide();
            swal('Seleccione un archivo','error');
            return 0;
        }
        var fileName = file.name;
        //fileName = fileName.replace(/[^a-z0-9.\s]/gi, '').replace(/[_\s]/g, '_');
        var fileSize = file.size;
        salidaImg = validarArchivo(fileName,fileSize);
        /*if(salidaImg == 1){
            swal("El archivo no debe superar los 2MB",'error');
            $("#modalLoadin").hide();
            return 0;
        }    */       

        var data1 = new FormData($('#equipo_form').get(0));

        data1.append("file_path", path_archivos);
        data1.append("file_id", "");
        data1.append("id_table", "");

        $.ajax({
            type: 'POST',
            url: 'upload_files_json',
            data: data1,
            contentType: 'multipart/form-data',
            processData: false,
            contentType: false,
            async: false,
            success: function(data) {
                console.log(data);
                //$("#modalLoadin").hide();
                cargarArchivoEquipo(fileName);

            },
            error: function(data) {
                console.log(data);
                //Cuando la interacción retorne un error, se ejecutará esto.
                $("#modalLoadin").hide();
            }
        })
    }
} 


//$('#tablafotos_repIB').on('click', '.delete', function () {
function updateDataRemote(idext){

    estado_solicitud  = $("#SestadoSolservST").val();
    resolucion  = tinyMCE.get('resolSolservST').getContent();
    resolucion  = resolucion.replace(/\n\r?/g, '').replace(/["]+/g, "'").replace(/\//g, "/");
    
    datos = '{"solucion":"'+resolucion+'","estado":"'+estado_solicitud+'"}';
    $.ajax({
        url: "update_data_remote",
        type: "get",
        cache: 'false',
        data: {
            "id": idext,
            "resolucion": resolucion,
            "estado": estado_solicitud,
        },
        dataType: "json",

        success: function(data) {
            if (data.id == undefined) {
                validaContenedorExt("addSolserv", "Error al al Actualizar el registro  remoto");
                console.log("idtabla---->" + id + "--->" + "data---->" + datos + "--->" + "sptinformebajadetalle" + "Error--->" + data);
            } else {
                validaContenedorExt2("addSolserv", "Registro remoto Actualizado con exito");
            }
        },
        error: function(data) {
            $('#modalLoadin').hide();
            validaContenedorExt("addSolserv", "Error al Actualizar el registro  remoto");
            console.log("idtabla---->" + id + "--->" + "data---->" + datos + "--->" + "sptinformebajadetalle" + "Error--->" + data);
        },
    });
    
}


function getDataSysIdIB() { 
    console.log(">>>>> getDataSysId <<<");

    $("#modalLoadin").show();
    idSysid = $("#nroIBST").val();
    $.ajax({
        url: "get_remote_data_sysaid",
        type: "get",
        data: {
            "data": idSysid
        },
        dataType: "json",

        success: function(json) {
            $("#modalLoadin").hide();
            if (json['error']) {
                console.log(json['error'].name);
            } else {

                $("#titulosolservIBST").val(json.title);
                


                if(json.description != "")
                    tinymce.get("ci_anteSAIN").setContent(json.description);
                else
                    tinymce.get("ci_anteSAIN").setContent("");

            }
        },
        error: function(json) {
            $("#modalLoadin").hide();
            swal("", "Error: " + JSON.stringify(json), "error");
            console.log(JSON.stringify(json));
            //console.log( JSON.stringify(data));
        }
    });
}

function setTitulo(thisr,op){
    respuesta   = $(thisr).prop( "checked" );
    if(op == 1){
        $("#opreporte2IE").prop('checked', false);
        $("#labeltitulo").html("");
        $("#labeltitulo").html("de Baja");
        $("#titulofoto").html("");
        $("#titulofoto").html("de Baja");
    }
    else{
        $("#opreporte1IE").prop('checked', false);
        $("#labeltitulo").html("");
        $("#labeltitulo").html("Técnico");
        $("#titulofoto").html("");
        $("#titulofoto").html("Técnico");
    }
    
}


function getSecuenciaSolicitudServicio (){
    isla   = $("#islaSS").val();
    codigo = 'spt_solserv';

    $.ajax({
        url: "datasecuencia_SolicitudServicio",
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
                $("#numeroSolST").val(json[0].prefijo+numero);
                
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