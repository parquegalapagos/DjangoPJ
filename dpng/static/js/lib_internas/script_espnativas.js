


/*fin codigo para agregar pestañas al contenedor*/

/*funcion para poder utilizar teclado direccional en las tablas con input */
$(".table-section").keydown(function(e) {
    bodyid = $(this).attr("id");
    if (bodyid == 'tbody_peso_h')
        incFila = 3;
    if (bodyid == 'tbody_incuv_h')
        incFila = 9;
    if (bodyid == 'square-wrapper')
        incFila = 3;
    if (bodyid == 'bodytabla_controlc')
        incFila = 7;

    var items = $(this).find('.input'),
        activo = document.activeElement;

    if (e.which == 39) {
        //ciclo for que valida si NO es el último 
        for (var i = 0; i < items.length - 1; i++) {
            if (activo === items[i]) {
                items[i + 1].focus();
                return 0;
            }
        }
    }
    if (e.which == 37) {
        //ciclo for que valida si NO es el primero
        for (var i = 1; i <= items.length; i++) {
            if (activo === items[i]) {
                items[i - 1].focus();
                return 0;
            }
        }
    }
    if (bodyid != 'square-wrapper') {
        if (e.which == 40) {
            //ciclo for que valida si NO es el primero
            for (var i = 0; i < items.length - incFila; i++) {
                if (activo === items[i]) {
                    items[i + incFila].focus();
                    return 0;
                }
            }
        }
        if (e.which == 38) {
            //ciclo for que valida si NO es el primero
            for (var i = 1; i <= items.length; i++) {
                if (activo === items[i]) {
                    items[i - incFila].focus();
                    return 0;
                }
            }
        }
    }
});


/*funcion para agregar un tr a la tabla*/
$('#btnAddRow').on('click', function() {
    var lastRow = $('#tblAddRow tbody tr:last').html();
    //alert(lastRow);
    $('#tblAddRow tbody').append('<tr>' + lastRow + '</tr>');
    $('#tblAddRow tbody tr:last input').val('');
    //se remueve la clase disabled
    $('#tblAddRow tbody tr:last td').removeClass('disabled-select');
});

// Delete last row in the table
$('#btnDelLastRow').on('click', function() {
    var lenRow = $('#tblAddRow tbody tr').length;
    //alert(lenRow);
    if (lenRow == 1 || lenRow <= 1) {
        alert("Can't remove all row!");
    } else {
        $('#tblAddRow tbody tr:last').remove();
    }
});


/*codigo para agregar pestañas al contenedor*/
var tabs = $("#tabs").tabs();
//tabCounter = 0;

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

/*funcion para llenar la tabla pestaña cotrol de peso*/
function getDataPeso() {
    var data = [];
    tabla = "";
    for (var i = 1; i <= 12; i++) {
        data.push({
            "nido": $("#num_nido" + i).val(),
            "huevo": $("#num_huevo" + i).val(),
            "hembra": $("#num_hembra12" + i).val(),
            "total": $("#total" + i).val()
        });
        tabla += "<tr>";
        tabla += "<td>" + $("#num_nido" + i).val() + "</td>";
        tabla += "<td>" + $("#num_huevo" + i).val() + "</td>";
        tabla += "<td>" + $("#fechaI" + i).val() + "</td>";
        tabla += "<td><input type='text' id='peso1_" + i + "'/></td>";
        tabla += "<td><input type='date' id='fecha_ini2_" + i + "'/></td>";
        tabla += "<td><input type='text' id='peso2_" + i + "'/></td>";
        tabla += "<td><input type='text' id='idDetalleH_" + i + "' /></td>";
        tabla += "</tr>";
    }

    $("#tbody_peso_h").html("");
    $("#tbody_peso_h").append(tabla);
    console.log(data);
}

/*funcion para llenar la tabla pestaña huevos incubados*/
function getDataIncubadora() {
    var data = [];
    tabla = "";
    for (var i = 1; i <= 12; i++) {
        //data.push({"nido": $("#num_nido"+i).val(), "huevo": $("#num_huevo"+i).val(), "hembra": $("#num_hembra12"+i).val(), "total": $("#total"+i).val()});
        tabla += "<tr>";
        tabla += "<td>" + $("#num_nido" + i).val() + "</td>";
        tabla += "<td>" + $("#num_hembra" + i).val() + "</td>";
        tabla += "<td>" + $("#num_huevo" + i).val() + "</td>";
        tabla += "<td></td>";
        tabla += "<td></td>";
        tabla += "<td><textarea id='condicion_" + i + "' style='width:150px;height:25px;'/></textarea></td>";
        tabla += "<td><input type='date' id='fecha_eclosion_" + i + "' style='width:100px;'/></td>";
        tabla += "<td><input type='text' id='num_pintura_" + i + "'  class='cajaNumero'/></td>";
        tabla += "<td><input type='text' id='largo_curvo_" + i + "'  class='cajaNumero'/></td>";
        tabla += "<td><input type='text' id='ancho_curvo_" + i + "'  class='cajaNumero'/></td>";
        tabla += "<td><input type='text' id='largo_plastron_" + i + "'  class='cajaNumero'/></td>";
        tabla += "<td><input type='text' id='peso_" + i + "'  class='cajaNumero'/></td>";
        tabla += "<td><input type='date' id='fecha_salida" + i + "' style='width:100px;'/></td>";
        tabla += "<td>";
        //tabla += "<textarea id='condicion_malo_" + i + "' style='width:150px;height:25px;'/></textarea></td>";

        tabla += "<select id='condicion_malo_"+i+"' class='select2 requerido'>";
        tabla += "<option value=''></option>";
        tabla += "<option value='EMBRION'>EMBRION</option>";
        tabla += "<option value='SIN EMBRION'>SIN EMBRION</option>";
        tabla += "</select>";

        tabla += "</td>"
        tabla += "<td align='center'><a class='add'><i style='font-size: 20px;cursor: pointer;' class='fa fa-save text-green'></i></a></td>";
        tabla += "</tr>";
    }

    $("#tbody_incuv_h").html("");
    $("#tbody_incuv_h").append(tabla);
    //console.log(data);
}

/*funcion para buscar inf delo control de huevos*/
function buscarControlHuevos() {
    ccrianza = $('#SccrianzaCH').val();
    grupo = $('#SgnacimientoCH').val();
    caja = $('#ScajaCH').val();
    incubadora = $('#SincubadoraCH').val();
    poblacion = $('#SpoblacionCH').val();

    $("#canthuevosCh").val(0);

    data = "num_caja__in=" + caja + "&";
    data += "num_incubadora__in=" + incubadora + "&";
    data += "grupo_nacimiento__in=" + grupo + "&";
    data += "centro_crianza_id__in=" + ccrianza + "&";
    data += "poblacion_id__in=" + poblacion;

    console.log(data);
    $.ajax({
        url: "data_ControlHuevos",
        type: "get",
        data: {
            "data": data
        },
        dataType: "json",

        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
            } else {
                tabla = "";
                if (data.length > 0) {

                    $("#btnGuardarControlH").show();
                    $("#btnSaveCaja").show();

                    $("#colorP_ch").show();

                    if ($("#SpoblacionCH option:selected").text().toUpperCase() == "SANTIAGO") {

                        $("#ch_colorp").css("background-color", "yellow");
                    }
                    if ($("#SpoblacionCH option:selected").text().toUpperCase() == "SANTA CRUZ") {

                        $("#ch_colorp").css("background-color", "#ffa500");
                    }
                    if ($("#SpoblacionCH option:selected").text().toUpperCase() == "ESPAÑOLA") {

                        $("#ch_colorp").css("background-color", "#75beff");
                    }
                    if ($("#SpoblacionCH option:selected").text().toUpperCase() == "FLOREANA") {

                        $("#ch_colorp").css("background-color", "red");
                    }
                    if ($("#SpoblacionCH option:selected").text().toUpperCase() == "PINZON") {

                        $("#ch_colorp").css("background-color", "white");
                    }

                    var old = JSON.stringify(data).replace(/null/g, '""'); //convert to JSON string
                    var data = JSON.parse(old); //convert back to array
                    $('#TcaguaCH').val(data[0].cant_agua);
                    $('#TcsustratoCH').val(data[0].cant_sustrato);
                    $('#TtemperaturaCH').val(data[0].temperatura);
                    $('#controlhuevo_id').val(data[0].id);
                    //$('#errorBUsquedaCH').hide();
                    inicial = 1;
                    final = 0;
                    tabla = "";
                    tabla1 = "";
                    tabla2 = "";
                    cantHuevos = 0;
                    //canthuevosCh
                    clearFormCh(formControlCh);
                    if (data[0].control_resumen_id.length > 0) {
                        for (var x = 0; x < data[0].control_resumen_id.length; x++) {
                            tabla += "<tr>";
                            tabla += "<td align='center'><input name='txtfecha1[]' style='height: 25px;' type='date' value='" + data[0].control_resumen_id[x].fecha_postura + "' /></td>";
                            tabla += "<td align='center'><input name='txtnumhembra[]' type='text' value='" + data[0].control_resumen_id[x].num_hembra + "' class='cajaNumero' style='text-align:center;' onkeypress='return isNumberKey(event);'/></td>";
                            tabla += "<td align='center'><input name='txtnumnido[]' type='text' value='" + data[0].control_resumen_id[x].num_nido + "' class='cajaNumero' style='text-align:center;' onkeypress='return isNumberKey(event);'/></td>";
                            tabla += "<td align='center'><input name='txttotalh[]' type='text' value='" + data[0].control_resumen_id[x].total_huevos + "' class='cajaNumero' style='text-align:center;' onkeypress='return isNumberKey(event);'/></td>";
                            tabla += "<td class='resumen' align='center'><input name='txtnumh[]' type='text' value='" + data[0].control_resumen_id[x].num_ingresos + "' class='cajaNumero' style='text-align:center;' onkeypress='return isNumberKey(event);'/></td>";
                            tabla += "<td align='center'><input name='txtfecha2[]' type='date' style='height: 25px;' value='" + data[0].control_resumen_id[x].fecha_ingreso_inc + "'/></td>";
                            tabla += "<td hidden><input name='txtidrseumen[]' type='text' value='" + data[0].control_resumen_id[x].id + "'/></td>";

                            if ($("#perm_change_spncontrolhuevos").val() == "1") {
                                tabla += "<td align='center' id='botonAddRseumen'><a class='add'><i style='font-size: 20px;cursor: pointer;' class='fa fa-save text-green'></i></a></td>";
                            } else {
                                tabla += "<td> </td>";

                            }

                            if ($("#perm_delete_spncontrolhuevos").val() == "1") {
                                tabla += "<td align='center'><a class='delete'><i style='font-size: 20px;cursor: pointer;' class='fa fa-trash text-green'></i></a></td>";
                            } else {
                                tabla += "<td> </td>";
                            }


                            tabla += "</tr>";

                            cantHuevos += parseInt(data[0].control_resumen_id[x].num_ingresos);

                            if (data[0].control_resumen_id[x].control_resumen_detalles_id.length > 0) {
                                final += parseInt(data[0].control_resumen_id[x].control_resumen_detalles_id.length);
                                pos = 0;
                                for (var i = inicial; i <= final; i++) {
                                    $("#tipotrxCh").val(1);
                                    /*caja de control de huevos*/
                                    $("#id" + i).val(data[0].control_resumen_id[x].control_resumen_detalles_id[pos].id);
                                    $("#padre" + i).val(data[0].control_resumen_id[x].id);
                                    $("#fechaI" + i).val(data[0].control_resumen_id[x].fecha_ingreso_inc);
                                    $("#num_nido" + i).val(data[0].control_resumen_id[x].num_nido);
                                    $("#num_hembra" + i).val(data[0].control_resumen_id[x].num_hembra);
                                    $("#total" + i).val(data[0].control_resumen_id[x].total_huevos);
                                    $("#num_huevo" + i).val(data[0].control_resumen_id[x].control_resumen_detalles_id[pos].num_huevo);

                                    if (data[0].control_resumen_id[x].control_resumen_detalles_id[pos].num_pintura != "")
                                        $("#huevoV_x" + i + ".visto").css('display', 'block');
                                    else
                                        $("#huevoV_x" + i + ".visto").css('display', 'none');

                                    if (data[0].control_resumen_id[x].control_resumen_detalles_id[pos].fecha_sacado != "") {
                                        $("#huevo_x" + i + ".equis").css('display', 'block');
                                        $("#huevoV_x" + i + ".visto").css('display', 'none');
                                    } else {
                                        $("#huevo_x" + i + ".equis").css('display', 'none');
                                    }


                                    /*fin caja control huevos*/
                                    /*tabla de control de peso*/
                                    if (data[0].control_resumen_id[x].control_resumen_detalles_id[pos].peso_inicial == 0)
                                        peso_inicialT = "";
                                    else
                                        peso_inicialT = data[0].control_resumen_id[x].control_resumen_detalles_id[pos].peso_inicial;
                                    if (data[0].control_resumen_id[x].control_resumen_detalles_id[pos].peso_cambio == 0)
                                        peso_cambioT = "";
                                    else
                                        peso_cambioT = data[0].control_resumen_id[x].control_resumen_detalles_id[pos].peso_cambio;
                                    tabla1 += "<tr>";
                                    tabla1 += "<td align='center'>" + data[0].control_resumen_id[x].num_nido + "</td>";
                                    tabla1 += "<td align='center'>" + data[0].control_resumen_id[x].control_resumen_detalles_id[pos].num_huevo + "</td>";
                                    tabla1 += "<td align='center'>" + data[0].control_resumen_id[x].fecha_ingreso_inc + "</td>";
                                    tabla1 += "<td align='center'><input type='text' class='input cajaNumero' style='text-align:center;' id='peso1_" + i + "' value='" + peso_inicialT + "' onkeypress='return isNumberKey(event);'/></td>";
                                    tabla1 += "<td align='center'><input type='date' class='input' style='width: 150px;text-align:center;height: 25px;' id='fecha_ini2_" + i + "' value='" + data[0].control_resumen_id[x].control_resumen_detalles_id[pos].fecha_cambio_sustrato + "' onkeypress='return isNumberKey(event);'/></td>";
                                    tabla1 += "<td align='center'><input type='text' class='input cajaNumero' style='text-align:center;' id='peso2_" + i + "' value='" + peso_cambioT + "' onkeypress='return isNumberKey(event);'/></td>";
                                    tabla1 += "<td hidden ><input type='text' id='idDetalleH_" + i + "' value='" + data[0].control_resumen_id[x].control_resumen_detalles_id[pos].id + "'/></td>";
                                    if ($("#perm_change_spncontrolhuevos").val() == "1") {
                                        tabla1 += "<td align='center'><a class='addDetallePeso'><i style='font-size: 20px;cursor: pointer;' class='fa fa-save text-green'></i></a></td>";
                                    } else {
                                        tabla1 += "<td> </td>";
                                    }

                                    tabla1 += "</tr>";

                                    /*tabla de control de huevos incuvados*/
                                    numPint = data[0].control_resumen_id[x].control_resumen_detalles_id[pos].num_pintura
                                    if (numPint == 0) numPint = "";
                                    largoC = data[0].control_resumen_id[x].control_resumen_detalles_id[pos].largo_curvo;
                                    if (largoC == 0) largoC = "";
                                    anchoC = data[0].control_resumen_id[x].control_resumen_detalles_id[pos].ancho_curvo
                                    if (anchoC == 0) anchoC = "";
                                    largoP = data[0].control_resumen_id[x].control_resumen_detalles_id[pos].largo_plastron
                                    if (largoP == 0) largoP = "";
                                    pesoS = data[0].control_resumen_id[x].control_resumen_detalles_id[pos].peso_salida
                                    if (pesoS == 0) pesoS = "";

                                    tabla2 += "<tr>";
                                    tabla2 += "<td class='zui-sticky-col' id='start'>" + data[0].control_resumen_id[x].num_nido + "</td>";
                                    tabla2 += "<td class='zui-sticky-col2'>" + data[0].control_resumen_id[x].num_hembra + "</td>";
                                    tabla2 += "<td class='zui-sticky-col3'> <b> " + data[0].control_resumen_id[x].control_resumen_detalles_id[pos].num_huevo + " </b></td>";
                                    tabla2 += "<td class='zui-sticky-col4'>" + data[0].control_resumen_id[x].fecha_postura + "</td>";
                                    tabla2 += "<td class='zui-sticky-col5'>" + data[0].control_resumen_id[x].fecha_ingreso_inc + "</td>";
                                    tabla2 += "<td><textarea id='condicion_" + i + "' class='input' style='width:150px; font-size: 10px;height: 25px;'>" + data[0].control_resumen_id[x].control_resumen_detalles_id[pos].condicion_huevo_no_ingresado + "</textarea></td>";
                                    tabla2 += "<td><input type='date' class='input' id='fecha_eclosion_" + i + "' style='width:100px; font-size: 10px;height: 25px;' value='" + data[0].control_resumen_id[x].control_resumen_detalles_id[pos].fecha_eclosion + "'/></td>";
                                    tabla2 += "<td> <b> <input type='text' class='input cajaNumero' id='num_pintura_" + i + "' style='font-size: 10px;' value='" + numPint + "' onkeypress='return isNumberKey(event);'/> </b> </td>";
                                    tabla2 += "<td><input type='text' class='input cajaNumero' id='largo_curvo_" + i + "' style='font-size: 10px;' value='" + largoC + "' onkeypress='return isNumberKey(event);'/></td>";
                                    tabla2 += "<td><input type='text' class='input cajaNumero' id='ancho_curvo_" + i + "' style='font-size: 10px;' value='" + anchoC + "' onkeypress='return isNumberKey(event);'/></td>";
                                    tabla2 += "<td><input type='text' class='input cajaNumero' id='largo_plastron_" + i + "' style='font-size: 10px;' value='" + largoP + "' onkeypress='return isNumberKey(event);'/></td>";
                                    tabla2 += "<td><input type='text' class='input cajaNumero' id='peso_" + i + "' style='font-size: 10px;' value='" + pesoS + "' onkeypress='return isNumberKey(event);'/></td>";
                                    tabla2 += "<td><input type='date' class='input' id='fecha_salida" + i + "' style='width:100px;font-size: 10px;height: 25px;' value='" + data[0].control_resumen_id[x].control_resumen_detalles_id[pos].fecha_sacado + "' onkeypress='return isNumberKey(event);'/></td>";
                                    //tabla2 += "<td><textarea id='condicion_malo_" + i + "' class='input' style='width:150px;font-size: 10px;height: 25px;'>" + data[0].control_resumen_id[x].control_resumen_detalles_id[pos].condicion + "</textarea></td>";
                                    tabla2 += "<td>";

                                    tabla2 += "<select id='condicion_malo_"+i+"' class='select2 requerido'>";
                                    tabla2 += "<option value=''></option>";
                                    if(data[0].control_resumen_id[x].control_resumen_detalles_id[pos].condicion == "EMBRION")
                                        selected1 ='selected';
                                    else
                                        selected1 ='';
                                    if(data[0].control_resumen_id[x].control_resumen_detalles_id[pos].condicion == "SIN EMBRION")
                                        selected2 ='selected';
                                    else
                                        selected2 ='';
                                    tabla2 += "<option value='EMBRION' "+selected1+">EMBRION</option>";
                                    tabla2 += "<option value='SIN EMBRION' "+selected2+">SIN EMBRION</option>";
                                    tabla2 += "</select>";
                                    tabla2 += "<td hidden ><input type='text' id='idDetalleHInc_" + i + "' value='" + data[0].control_resumen_id[x].control_resumen_detalles_id[pos].id + "'/></td>";

                                    if ($("#perm_change_spncontrolhuevos").val() == "1") {
                                        tabla2 += "<td align='center'><a class='addDetalleIncu'><i style='font-size: 20px;cursor: pointer;' class='fa fa-save text-green'></i></a></td>";
                                    } else {
                                        tabla2 += "<td> </td>";
                                    }

                                    tabla2 += "</tr>";

                                    pos++;
                                }
                                inicial += parseInt(data[0].control_resumen_id[x].num_ingresos);
                            } else {
                                $("#tbody_incuv_h").html("");
                            }
                        }
                        $("#body_tblAddRow").html("");
                        $("#body_tblAddRow").append(tabla);

                        $("#tbody_peso_h").html("");
                        $("#tbody_peso_h").append(tabla1);

                        $("#tbody_incuv_h").html("");
                        $("#tbody_incuv_h").append(tabla2);
                        $("#canthuevosCh").val(cantHuevos);


                    } else {
                        tabla = "";
                        $("#body_tblAddRow").html("");
                        $("#tbody_peso_h").html("");
                        $("#tbody_incuv_h").html("");
                        tabla += "<tr>";
                        tabla += "<td align='center'><input name='txtfecha1[]' type='date' style='height: 25px;'/></td>";
                        tabla += "<td align='center'><input name='txtnumhembra[]' type='text' class='cajaNumero' style='text-align:center;'/></td>";
                        tabla += "<td align='center'><input name='txtnumnido[]' type='text' class='cajaNumero' style='text-align:center;'/></td>";
                        tabla += "<td align='center'><input name='txttotalh[]' type='text' class='cajaNumero' style='text-align:center;'/></td>";
                        tabla += "<td align='center'><input name='txtnumh[]' type='text' class='cajaNumero' style='text-align:center;'/></td>";
                        tabla += "<td align='center'><input name='txtfecha2[]' type='date' style='height: 25px;'/></td>";
                        tabla += "<td hidden><input name='txtidrseumen[]' type='text' /></td>";

                        if ($("#perm_change_spncontrolhuevos").val() == "1") {
                            tabla += "<td align='center'><a class='add'><i style='font-size: 20px;cursor: pointer;' class='fa fa-save text-green'></i></a></td>";
                        } else {
                            tabla += "<td> </td>";

                        }
                        if ($("#perm_delete_spncontrolhuevos").val() == "1") {
                            tabla += "<td align='center'><a class='delete'><i style='font-size: 20px;cursor: pointer;' class='fa fa-trash text-green'></i></a></td>";
                        } else {
                            tabla += "<td> </td>";

                        }

                        tabla += "</tr>";

                        $("#body_tblAddRow").append(tabla);
                    }


                } else {
                    tabla = "";
                    $("#btnGuardarControlH").show();
                    $("#btnSaveCaja").hide();
                    $('#TcaguaCH').val(1000);
                    $('#TcsustratoCH').val(375);
                    $('#TtemperaturaCH').val("");
                    $('#controlhuevo_id').val("");
                    //$('#errorBUsquedaCH').show();
                    $("#colorP_ch").hide();

                    $("#body_tblAddRow").html("");

                    validaContenedorExt("content_control", "No existe informacion para este periodo");

                    clearFormCh(formControlCh);
                    tabla += "<tr>";
                    tabla += "<td align='center'><input name='txtfecha1[]' type='date' style='height: 25px;' /></td>";
                    tabla += "<td align='center'><input name='txtnumhembra[]' type='text' class='cajaNumero' style='text-align:center;'/></td>";
                    tabla += "<td align='center'><input name='txtnumnido[]' type='text' class='cajaNumero' style='text-align:center;'/></td>";
                    tabla += "<td align='center'><input name='txttotalh[]' type='text' class='cajaNumero' style='text-align:center;'/></td>";
                    tabla += "<td align='center'><input name='txtnumh[]' type='text' class='cajaNumero' style='text-align:center;'/></td>";
                    tabla += "<td align='center'><input name='txtfecha2[]' type='date' style='height: 25px;'/></td>";
                    tabla += "<td hidden><input name='txtidrseumen[]' type='text' /></td>";

                    if ($("#perm_change_spncontrolhuevos").val() == "1") {
                        tabla += "<td align='center'><a class='add'><i style='font-size: 20px;cursor: pointer;' class='fa fa-save text-green'></i></a></td>";
                    } else {
                        tabla += "<td> </td>";

                    }

                    if ($("#perm_delete_spncontrolhuevos").val() == "1") {
                        tabla += "<td align='center'><a class='delete'><i style='font-size: 20px;cursor: pointer;' class='fa fa-trash text-green'></i></a></td>";
                    } else {
                        tabla += "<td> </td>";

                    }

                    tabla += "</tr>";

                    $("#body_tblAddRow").append(tabla);
                    $("#tbody_peso_h").html("");
                    $("#tbody_incuv_h").html("");
                    $("#tipotrxCh").val(0);
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

/**funcion para guardar o actualizar datos del control de huevos spncontrolhuevos*/
function guardarControlHuevos() {
    ccrianza = $('#SccrianzaCH').val();
    grupo = $('#SgnacimientoCH').val();
    caja = $('#ScajaCH').val();
    incubadora = $('#SincubadoraCH').val();
    poblacion = $('#SpoblacionCH').val();

    cant_agua = $('#TcaguaCH').val();
    cantsustra = $('#TcsustratoCH').val();
    temperatura = $('#TtemperaturaCH').val();

    if (ccrianza == "") {
        validaContenedorExt("content_control", "Centro de Crianza Obligatorio");
        return 0;
    }
    if (grupo == "") {
        validaContenedorExt("content_control", "Grupo Obligatorio");
        return 0;
    }
    if (caja == "") {
        validaContenedorExt("content_control", "#Caja Obligatorio");
        return 0;
    }
    if (incubadora == "") {
        validaContenedorExt("content_control", "#Incubadora Obligatorio");
        return 0;
    }
    if (poblacion == "") {
        validaContenedorExt("content_control", "Poblacion Obligatorio");
        return 0;
    }
    if (cant_agua == "") {
        validaContenedorExt("content_control", "Cantidad de Agua Obligatorio");
        return 0;
    }
    if (cantsustra == "") {
        validaContenedorExt("content_control", "Cantidad Sustrato Obligatorio");
        return 0;
    }
    if (temperatura == "") {
        validaContenedorExt("content_control", "Temperatura Obligatorio");
        return 0;
    }


    datos = '{"num_caja":"' + caja + '", "num_incubadora":"' + incubadora + '", "grupo_nacimiento":"' + grupo + '", "centro_crianza_id":"' + ccrianza + '", "poblacion_id":"' + poblacion + '", "cant_agua":"' + cant_agua + '", "cant_sustrato":"' + cantsustra + '", "temperatura":"' + temperatura + '"}';

    dj_url = "spncontrolhuevos";

    $('#modalLoadin').show();

    if ($('#controlhuevo_id').val() == "") {
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
                    console.log("data---->" + datos + "--->" + "spncontrolhuevos" + "Error--->" + data);
                } else {
                    //console.log(data);
                    $('#modalLoadin').hide();
                    $('#controlhuevo_id').val(data.id);
                    swal("", "Registro insertado con exito", "success");

                    bedit = "<div style='text-align:center;'><a style='cursor: pointer;' onclick='dataControlHuevos(\"" + ccrianza + "\",\"" + grupo + "\",\"" + poblacion + "\",\"" + caja + "\",\"" + incubadora + "\");'><i class='fa fa-search text-green'></i></a></div>"

                    var dTable = $('#tabla_cab_huev').DataTable();
                    dTable.row.add([
                        grupo,
                        $('#SccrianzaCH option:selected').text().toUpperCase(),
                        $('#SpoblacionCH option:selected').text().toUpperCase(),
                        caja,
                        incubadora,
                        bedit
                    ]).draw();

                    buscarControlHuevos();
                }
            },
            error: function(data) {
                $('#modalLoadin').hide();
                swal("", "Error al Insertar el registro", "error");
                console.log("data---->" + datos + "--->" + "spncontrolhuevos" + "Error--->" + data);
            },
        });
    } else {
        $.ajax({
            url: "update_General",
            type: 'get',
            cache: 'false',
            data: {
                "dj_url": dj_url,
                "idtabla": $('#controlhuevo_id').val(),
                "data": JSON.stringify(datos)
            },
            dataType: "json",
            success: function(data) {
                if (data.id == undefined) {

                    $('#modalLoadin').hide();
                    swal("", "Error al Actualizar el registro", "error");
                    console.log("idtabla---->" + $('#controlhuevo_id').val() + "--->" + "data---->" + datos + "--->" + "spncontrolhuevos" + "Error--->" + data);
                } else {
                    console.log(data);
                    $('#modalLoadin').hide();
                    swal("", "Registro Actualizado con exito", "success");
                }
            },
            error: function(data) {
                $('#modalLoadin').hide();
                swal("", "Error al Actualizar el registro", "error");
                console.log("idtabla---->" + $('#controlhuevo_id').val() + "--->" + "data---->" + datos + "--->" + "spncontrolhuevos" + "Error--->" + data);
            },
        });
    }
}

// guardar/actualizar datos formulario datos de ingreso
$('#tblAddRow').on('click', '.add', function(e) {
    cantHuevos = $("#canthuevosCh").val();
    if (cantHuevos == "") cantHuevos = 0;
    totalhuevos = 0;

    var lenRow = $('#tblAddRow tbody tr').length;
    e.preventDefault();
    idControlHuevo = $('#controlhuevo_id').val();

    if (idControlHuevo == "") {
        validaContenedorExt("content_control", "No existe cabecera para este detalle");
        return 0;
    }

    var data = $(this).parents('tr').find("td").find("input");

    if ($(data).eq(0).val() == "") {
        validaContenedorExt("content_control", "Fecha de Postura obligatoria");
        return 0;
    }
    if ($(data).eq(1).val() == "") {
        validaContenedorExt("content_control", "Numero de Hembra obligatorio");
        return 0;
    }
    if ($(data).eq(2).val() == "") {
        validaContenedorExt("content_control", "Numero de Nido obligatorio");
        return 0;
    }
    if ($(data).eq(3).val() == "") {
        validaContenedorExt("content_control", "Total de Huevos obligatorio");
        return 0;
    }
    if ($(data).eq(4).val() == "") {
        validaContenedorExt("content_control", "Numero de Huevos obligatorio");
        return 0;
    }
    if ($(data).eq(5).val() == "") {
        validaContenedorExt("content_control", "Fecha de Ingreso obligatoria");
        return 0;
    }

    if (parseInt($(data).eq(3).val()) < parseInt($(data).eq(4).val())) {
        validaContenedorExt("content_control", "Numero de huevos ingresados mayor al total de huevos");
        return 0;
    }

    datos = '{"control_huevos_id":"' + idControlHuevo + '", "fecha_postura":"' + $(data).eq(0).val() + '", "num_hembra":"' + $(data).eq(1).val() + '" , "num_nido":"' + $(data).eq(2).val() + '", "total_huevos":"' + $(data).eq(3).val() + '", "num_ingresos":"' + $(data).eq(4).val() + '", "fecha_ingreso_inc":"' + $(data).eq(5).val() + '"}';
    console.log(datos);
    dj_url = "spncontrolhuevosresumen";
    $('#modalLoadin').show();
    /*verifico si el registro tiene id(para insertar o actualizar)*/
    if ($(data).eq(6).val() == "") {
        totalhuevos = parseInt(cantHuevos) + parseInt($(data).eq(4).val());
        console.log(totalhuevos);
        cadenaI = '';
        if (totalhuevos <= 12) {
            $.ajax({
                url: "insert_General",
                type: 'get',
                cache: 'false',
                data: {
                    "dj_url": dj_url,
                    "data": JSON.stringify("[" + datos + "]")
                },
                dataType: "json",
                success: function(data2) {
                    if (!data2['results']) {
                        $(data).eq(6).val("");
                        $('#modalLoadin').hide();
                        swal("", "Error al Insertar el registro", "error");
                        console.log("data---->" + datos + "--->" + "spncontrolhuevosresumen" + "Error--->" + data2);
                    } else {
                        $('#modalLoadin').hide();
                        $(data).eq(6).val(data2['results'][0].id)

                        for (i = 1; i <= parseInt($(data).eq(4).val()); i++) {
                            cadenaI += '{"num_nido":"' + $(data).eq(2).val() + '", "num_hembra":"' + $(data).eq(1).val() + '", "control_huevos_resumen_id":"' + data2['results'][0].id + '"},';
                        }
                        cadenaI = cadenaI.substring(0, cadenaI.length - 1);
                        //buscarControlHuevos();
                        guardar_cajaHuevos22(cadenaI);
                    }
                },
                error: function(data2) {
                    $('#modalLoadin').hide();
                    $(data).eq(6).val("");
                    swal("", "Error al Insertar el registro: " + JSON.stringify(data2['non_field_errors']), "error");
                    console.log("data---->" + datos + "--->" + "spncontrolhuevosresumen" + "Error--->" + data2);
                },
            });
        } else {
            $('#modalLoadin').hide();
            swal("", "Total de Huevos Ingresados es mayor a los que se permiten en la caja", "warning");
        }
    } else {
        /*actualizacion*/
        console.log("actualizacion")
        $(".resumen").each(function() {
            console.log($(this).find("input").eq(0).val());
            totalhuevos += parseInt($(this).find("input").eq(0).val());

        });
        if (totalhuevos <= 12) {
            $.ajax({
                url: "update_General",
                data: {
                    "dj_url": dj_url,
                    "idtabla": $(data).eq(6).val(),
                    "data": JSON.stringify(datos)
                },
                type: "get",
                cache: 'false',
                async: true,
                dataType: "json",

                success: function(data2) {
                    if (data2.id == undefined) {
                        $('#modalLoadin').hide();
                        swal("", "Error al actualizar el registro", "error");
                        console.log("idtabla---->" + (data).eq(6).val() + "--->" + "data---->" + datos + "--->" + "spncontrolhuevosresumen" + "Error--->" + data2);
                        return 0;
                    } else {
                        $('#modalLoadin').hide();
                        swal("", "Registro Actualizado con éxito!", "success");
                        return 1;
                    }
                },
                error: function(data2) {
                    $('#modalLoadin').hide();
                    swal("", "Error al actualizar el registro", "error");
                    console.log("idtabla---->" + (data).eq(6).val() + "--->" + "data---->" + datos + "--->" + "spncontrolhuevosresumen" + "Error--->" + data2);
                    return 0;
                },
            });
        } else {
            $('#modalLoadin').hide();
            swal("", "Total de Huevos Ingresados es mayor a los que se permiten en la caja", "warning");
        }
    }
});

// Delete row on click in the table
$('#tblAddRow').on('click', '.delete', function(e) {
    var bool = confirm("Esta accion eliminara los registros de control de crecimineto asiciados. Estas seguro de eliminar el registro?");
    if (bool) {
        var lenRow = $('#tblAddRow tbody tr').length;
        e.preventDefault();
        var data = $(this).parents('tr').find("td").find("input");

        console.log($(data).eq(6).val());
        dj_url = "spncontrolhuevosresumen";
        if ($(data).eq(0).val() != "") {
            $.ajax({
                url: "delete_General",
                //url:"http://172.18.1.45:8000/api/v1/spncontrolhuevosresumen/"+$(data).eq(6).val(),
                data: {
                    "dj_url": dj_url,
                    "idtabla": $(data).eq(6).val()
                },
                type: "get",
                async: "false",
                dataType: "json",

                success: function(data2) {
                    console.log(data2.status_response);
                    if (data2.status_response == "OK") {
                        $('#modalLoadin').hide();
                        swal("", "Registro Actualizado con éxito!", "success");
                        if (lenRow == 1 || lenRow <= 1) {
                            ///alert("Can't remove all row!");
                            $(data).eq(0).val("");
                            $(data).eq(1).val("");
                            $(data).eq(2).val("");
                            $(data).eq(3).val("");
                            $(data).eq(4).val("");
                            $(data).eq(5).val("");
                            $(data).eq(6).val("");
                            $("#canthuevosCh").val(0);
                            $('#tblAddRow tbody tr:last td').removeClass('disabled-select');
                        } else {
                            $(this).parents('tr').remove();
                        }
                        clearFormCh(formControlCh);
                        buscarControlHuevos();

                        dataE = '';
                        dataE += "grupo_nacimiento__in=" + grupo + "&";
                        dataE += "centro_crianza_id__in=" + ccrianza + "&";
                        dataE += "poblacion_id__in=" + poblacion;

                        $.ajax({
                            url: "data_medicionesParam",
                            type: "get",
                            data: {
                                "data": dataE
                            },
                            async: "false",
                            dataType: "json",

                            success: function(data3) {
                                if (data3['non_field_errors']) {
                                    console.log(data3['non_field_errors']);
                                } else {
                                    var old = JSON.stringify(data3).replace(/null/g, '""'); //convert to JSON string
                                    var data = JSON.parse(old); //convert back to array
                                    tabla = "";
                                    if ((data.length > 0)) {
                                        for (i = 0; i < data.length; i++) {
                                            if (data[i].det_control_crecimiento_id.length == 0) {
                                                cadena = '';
                                                cadena = '{"estado":"I", "eliminado":"t","det_control_crecimiento_id":[]}';

                                                //cadena = cadena.substring(0, cadena.length-1);
                                                console.log(datos);
                                                $.ajax({
                                                    url: "update_General",
                                                    data: {
                                                        "dj_url": "spncontrolcrecimientogalapaguitos",
                                                        "idtabla": data[i].id,
                                                        "data": JSON.stringify(cadena)
                                                    },
                                                    type: "get",
                                                    async: "false",
                                                    dataType: "json",
                                                    success: function(data2) {
                                                        console.log("eliminado: " + data[i].id);
                                                    },
                                                    error: function(data) {
                                                        swal("", "Error: " + JSON.stringify(data), "error");
                                                        console.log(JSON.stringify(data));
                                                        //console.log( JSON.stringify(data));
                                                    }
                                                });
                                            }
                                        }
                                    }
                                }
                            },
                            error: function(data3) {
                                swal("", "Error: " + JSON.stringify(data3), "error");
                                console.log(JSON.stringify(data3));
                                //console.log( JSON.stringify(data));
                            }
                        });
                        return 0;
                    } else {
                        $('#modalLoadin').hide();
                        swal("", "Error al actualizar el registro: " + data2.status_response, "error");
                        return 1;
                    }
                },
                error: function(data2) {
                    $('#modalLoadin').hide();
                    swal("", "Error al actualizar el registro: " + data2.status_response, "error");
                    console.log(JSON.stringify(data2['non_field_errors']));
                    return 0;
                },
            });
        } else {
            $(this).parents('tr').remove();
        }
    } /*en if confirm*/
});


/*funcion para actualizar la caja de huevos con lo que tiene el formulario de ingreso*/
function actualizar_cajaHuevos() {

    var table = $("#tblAddRow tbody");
    inicial = 1;
    final = 0;
    table.find('tr').each(function(i) {
        var data = $(this).find("td").find("input");
        final += parseInt($(data).eq(4).val());
        for (i = inicial; i <= final; i++) {
            $("#padre" + i).val($(data).eq(6).val());
            $("#fechaI" + i).val($(data).eq(5).val());
            $("#num_nido" + i).val($(data).eq(2).val());
            $("#num_hembra" + i).val($(data).eq(1).val());
            $("#total" + i).val($(data).eq(3).val());
        }
        inicial += parseInt($(data).eq(4).val());
    });
}

/*insertar o actualizar los datos del control de huevos*/
function insertupdatehuevosdetalle() {
    cadenaI = "";
    cadenaU = "";
    for (i = 1; i <= 12; i++) {
        if ($("#num_nido" + i).val() != "") {
            if ($("#num_huevo" + i).val() == "") {
                validaContenedorExt("content_control", "Numero de Huevo obligatorio Por favor revise");
                return 0;
            }
            if ($("#id" + i).val() == "")
                cadenaI += '{"num_nido":"' + $("#num_nido" + i).val() + '", "num_hembra":"' + $("#num_hembra" + i).val() + '", "num_huevo":"' + $("#num_huevo" + i).val() + '" , "control_huevos_resumen_id":"' + $("#padre" + i).val() + '"},';
            else
                cadenaU += '{"id":"' + $("#id" + i).val() + '","num_nido":"' + $("#num_nido" + i).val() + '", "num_hembra":"' + $("#num_hembra" + i).val() + '", "num_huevo":"' + $("#num_huevo" + i).val() + '" , "control_huevos_resumen_id":"' + $("#padre" + i).val() + '"},';

        }
    }
    cadenaI = cadenaI.substring(0, cadenaI.length - 1);
    //cadenaI = "["+cadenaI+"]";
    cadenaU = cadenaU.substring(0, cadenaU.length - 1);
    cadenaU = "[" + cadenaU + "]";
    jcadenaU = jQuery.parseJSON(cadenaU);

    if (cadenaI != "")
        guardar_cajaHuevos22(cadenaI);

    if (cadenaU != "")
        editar_cajaHuevos2(jcadenaU);

}

/*/*insertar los datos del control de huevos*/
function guardar_cajaHuevos2(cadena) {
    dj_url = "spncontrolhuevosdetalles";
    $.ajax({
        url: "insert_General",
        type: 'get',
        cache: 'false',
        data: {
            "dj_url": dj_url,
            "data": JSON.stringify("[" + cadena + "]")
        },
        dataType: "json",
        success: function(data2) {
            if (!data2['results']) {
                $('#modalLoadin').hide();
                swal("", "Error al Insertar el registro", "error");
                console.log("data---->" + cadena + "--->" + "spncontrolhuevosdetalles" + "Error--->" + data2);
            } else {
                console.log("------------" + data2);
                for (i = 0; i < data2.results.length; i++)
                    $("#id" + (i + 1)).val(data2['results'][i].id);
                $('#modalLoadin').hide();
                swal("", "Registro insertado con exito", "success");
                buscarControlHuevos();
            }
        },
        error: function(data2) {
            $('#modalLoadin').hide();
            swal("", "Error al Insertar el registro", "error");
            console.log("data---->" + cadena + "--->" + "spncontrolhuevosdetalles" + "Error--->" + data2);
        },
    });
}

/*actualizar los datos del control de huevos*/
function editar_cajaHuevos2(jcadenaU) {
    $('#modalLoadin').show();
    dj_url = "spncontrolhuevosdetalles";
    cadenaE = '';
    for (i = 0; i < jcadenaU.length; i++) {
        id = jcadenaU[i].id;
        console.log(id);
        data = jcadenaU[i];
        console.log(data);
        delete data['id'];
        console.log(data);
        datos = JSON.stringify(data);

        $.ajax({
            url: "update_General",
            data: {
                "dj_url": dj_url,
                "idtabla": id,
                "data": JSON.stringify(datos)
            },
            type: 'get',
            cache: 'false',
            dataType: "json",
            async: false,
            success: function(data2) {
                if (data2.id == undefined) {
                    cadenaE += "error:" + id + ",";
                }
            },
            error: function(data2) {
                cadenaE += "error:" + id + ",";
            },
        });
    }
    $('#modalLoadin').hide();
    if (cadenaE != "")
        swal("", "Error al actualizar los registros:" + cadenaE, "error");
    else {
        swal("", "Registros Actuaizados con exito", "success");
        buscarControlHuevos();
    }


}


function guardar_cajaHuevos() {
    dj_url = "spncontrolhuevosdetalles";
    datos = '';
    cadena = '';
    for (i = 1; i <= 12; i++) {
        if ($("#num_nido" + i).val() != "")
            cadena += '{"num_nido":"' + $("#num_nido" + i).val() + '", "num_hembra":"' + $("#num_hembra" + i).val() + '", "num_huevo":"' + $("#num_huevo" + i).val() + '" , "control_huevos_resumen_id":"' + $("#padre" + i).val() + '"},';
    }
    cadena = cadena.substring(0, cadena.length - 1);
    cadenaE = '';
    console.log(cadena);
    $.ajax({
        url: "insert_General",
        type: 'get',
        cache: 'false',
        data: {
            "dj_url": dj_url,
            "data": JSON.stringify("[" + cadena + "]")
        },
        dataType: "json",
        success: function(data2) {
            if (!data2['results']) {
                $('#modalLoadin').hide();
                swal("", "Error al Insertar el registro", "error");
                console.log("data---->" + cadena + "--->" + "spncontrolhuevosdetalles" + "Error--->" + data2);
            } else {
                for (i = 0; i < data2.results.length; i++)
                    $("#id" + (i + 1)).val(data2['results'][i].id);
                $('#modalLoadin').hide();
                swal("", "Registro insertado con exito", "success");
                buscarControlHuevos();
            }
        },
        error: function(data2) {
            $('#modalLoadin').hide();
            swal("", "Error al Insertar el registro", "error");
            console.log("data---->" + cadena + "--->" + "spncontrolhuevosdetalles" + "Error--->" + data2);
        },
    });
}


function editar_cajaHuevos() {
    dj_url = "spncontrolhuevosdetalles";
    datos = '';
    cadenaE = '';
    for (i = 1; i <= 12; i++) {
        cadena = '';
        cadena = '{"num_nido":"' + $("#num_nido" + i).val() + '", "num_hembra":"' + $("#num_hembra" + i).val() + '", "num_huevo":"' + $("#num_huevo" + i).val() + '" , "control_huevos_resumen_id":"' + $("#padre" + i).val() + '"}';

        //cadena = cadena.substring(0, cadena.length-1);
        console.log(datos);
        $.ajax({
            url: "update_General",
            data: {
                "dj_url": dj_url,
                "idtabla": $("#id" + i).val(),
                "data": JSON.stringify(cadena)
            },
            type: 'get',
            cache: 'false',
            dataType: "json",
            success: function(data2) {
                if (data2.id == undefined) {
                    cadenaE += "error:" + $("#num_huevo" + i).val() + ",";
                }
            },
            error: function(data2) {
                cadenaE += "error:" + $("#num_huevo" + i).val() + ",";
            },
        });
    }

    if (cadenaE != "")
        swal("", "Error al actualizar los registros:" + cadenaE, "error");
    else {
        swal("", "Registros Actuaizados con exito", "success");
        buscarControlHuevos();
    }

    $('#modalLoadin').hide();
}

/*actualizar datos del peso de los huevos*/
function actDatosPesoHuevo() {
    $('#modalLoadin').show();

    dj_url = "spncontrolhuevosdetalles";
    var salida = [];

    var table = $("#table_peso_h tbody");
    datos = '';
    table.find('tr').each(function(i) {

        var data = $(this).find("td").find("input");
        var dataTD = $(this).find("td");

        if ($(data).eq(0).val() == "")
            peso_inicial = null;
        else
            peso_inicial = $(data).eq(0).val();

        if (($(data).eq(1).val() == "") || ($(data).eq(1).val() == null))
            fecha_cambio = null;
        else
            fecha_cambio = '"' + $(data).eq(1).val() + '"';

        if ($(data).eq(2).val() == "")
            peso_cambio = null;
        else
            peso_cambio = $(data).eq(2).val();

        datos = '{"peso_inicial":' + peso_inicial + ', "fecha_cambio_sustrato":' + fecha_cambio + ' , "peso_cambio":' + peso_cambio + '}';
        console.log(datos + "-----" + $(data).eq(3).val());
        /*actualizacion*/
        $.ajax({
            url: "update_General",
            data: {
                "dj_url": dj_url,
                "idtabla": $(data).eq(3).val(),
                "data": JSON.stringify(datos)
            },
            type: "get",
            cache: 'false',
            async: false,
            dataType: "json",

            success: function(data2) {

                if (data2.id == undefined) {
                    //$('#modalLoadin').hide();
                    salida.push(['Error', (dataTD).eq(0).html()]);
                    console.log("idtabla---->" + (data).eq(3).val() + "--->" + "data---->" + datos + "--->" + "spncontrolhuevosdetalles" + "Error--->" + data2);

                } else salida.push(['OK', (dataTD).eq(0).html()]);;

            },
            error: function(data2) {
                salida.push(['Error', (dataTD).eq(0).html()]);
                console.log("idtabla---->" + (data).eq(3).val() + "--->" + "data---->" + datos + "--->" + "spncontrolhuevosdetalles" + "Error--->" + data2);
                //return 0;
            },
        });

    });

    mensaje = "";
    for (i = 0; i < salida.length; i++) {
        if (salida[i][0] == 'OK')
            band = 0;
        else
            mensaje += "Numero de Huevo: " + salida[i][1] + "<br>";
    }

    if (mensaje == "") {
        swal("", "Registros Actualizados con exito", "success");
        buscarControlHuevos();
    } else
        swal("", "Error al actualizar los registros:" + mensaje, "error");

    $('#modalLoadin').hide();
}



// actualizar los datos del formulario de control de peso
$('#table_peso_h').on('click', '.addDetallePeso', function(e) {
    var lenRow = $('#table_peso_h tbody tr').length;
    e.preventDefault();

    var data = $(this).parents('tr').find("td").find("input");
    datos = '{"peso_inicial":"' + $(data).eq(0).val() + '", "fecha_cambio_sustrato":"' + $(data).eq(1).val() + '" , "peso_cambio":"' + $(data).eq(2).val() + '"}';
    console.log(datos);
    dj_url = "spncontrolhuevosdetalles";

    /*verifico si el registro tiene id(para insertar o actualizar)*/

    /*actualizacion*/
    console.log("actualizacion")
    $.ajax({
        url: "update_General",
        data: {
            "dj_url": dj_url,
            "idtabla": $(data).eq(3).val(),
            "data": JSON.stringify(datos)
        },
        type: "get",
        cache: 'false',
        async: true,
        dataType: "json",

        success: function(data2) {

            if (data2.id == undefined) {
                $('#modalLoadin').hide();
                swal("", "Error al actualizar el registro: " + data2['non_field_errors'][0], "error");
                console.log("idtabla---->" + (data).eq(3).val() + "--->" + "data---->" + datos + "--->" + "spncontrolhuevosdetalles" + "Error--->" + data2);
                return 0;
            } else {
                $('#modalLoadin').hide();
                swal("", "Registro Actualizado con éxito!", "success");
                return 1;
            }
        },
        error: function(data2) {
            $('#modalLoadin').hide();
            swal("", "Error al actualizar el registro", "error");
            console.log("idtabla---->" + (data).eq(3).val() + "--->" + "data---->" + datos + "--->" + "spncontrolhuevosdetalles" + "Error--->" + data2);
            return 0;
        },
    });
});


// actualizar datos de la taabla detalle de huevos incubados
$('#table_incuv_h').on('click', '.addDetalleIncu', function(e) {
    var lenRow = $('#table_incuv_h tbody tr').length;
    e.preventDefault();

    var data = $(this).parents('tr').find("td").find("input");
    var dataA = $(this).parents('tr').find("td").find("textarea");
    var dataB = $(this).parents('tr').find("td").find("select");
    fecha_eclosion = $(data).eq(0).val();
    fecha_sacado = $(data).eq(6).val();
    num_pintura = $(data).eq(1).val();
    largo_curvo = $(data).eq(2).val();
    ancho_curvo = $(data).eq(3).val();
    largo_plastron = $(data).eq(4).val();
    peso_salida = $(data).eq(5).val();

    if (fecha_eclosion != "") datoE = '"fecha_eclosion":"' + fecha_eclosion + '",';
    else datoE = ' "fecha_eclosion":null,';
    if (fecha_sacado != "") datoF = '"fecha_sacado":"' + fecha_sacado + '",';
    else datoF = ' "fecha_sacado":null,';
    if (num_pintura != "") datoN = '"num_pintura":"' + num_pintura + '",';
    else datoN = ' "num_pintura":null,';
    if (largo_curvo != "") datoL = '"largo_curvo":"' + largo_curvo + '",';
    else datoL = ' "largo_curvo":null,';
    if (ancho_curvo != "") datoA = '"ancho_curvo":"' + ancho_curvo + '",';
    else datoA = ' "ancho_curvo":null,';
    if (largo_plastron != "") datoP = '"largo_plastron":"' + largo_plastron + '",';
    else datoP = ' "largo_plastron":null,';
    if (peso_salida != "") datoPS = '"peso_salida":"' + peso_salida + '",';
    else datoPS = ' "peso_salida":null,';
    if(valor_nulo_str($(dataA).eq(0).val()) != ""){
        datoCondicionNoIng = ' "condicion_huevo_no_ingresado":"' + $(dataA).eq(0).val() + '",';
    }else{
        datoCondicionNoIng = ' "condicion_huevo_no_ingresado":null,';
    }
    if(valor_nulo_str($(dataB).eq(0).val()) != ""){
        datoCondicion = ' "condicion":"' + $(dataB).eq(0).val() + '"';
    }else{
        datoCondicion = ' "condicion":null';
    }

    //datos = '{' + datoE + ' ' + datoN + ' ' + datoL + ' ' + datoA + ' ' + datoP + ' ' + datoPS + ' ' + datoF + '  "condicion_huevo_no_ingresado":"' + $(dataA).eq(0).val() + '", "condicion":"' + $(dataB).eq(0).val() + '"}';
    datos = '{' + datoE + ' ' + datoN + ' ' + datoL + ' ' + datoA + ' ' + datoP + ' ' + datoPS + ' ' + datoF + ' ' + datoCondicionNoIng + ' '+ datoCondicion + '}';

    dj_url = "spncontrolhuevosdetalles";
    //$('#modalLoadin').show();
    console.log($(data).eq(7).val() + "***********");
    /*verifico si el registro tiene id(para insertar o actualizar)*/
    /*actualizacion*/
    console.log("actualizacion")
    $.ajax({
        url: "update_General",
        data: {
            "dj_url": dj_url,
            "idtabla": $(data).eq(7).val(),
            "data": JSON.stringify(datos)
        },
        type: "get",
        cache: 'false',
        async: true,
        dataType: "json",

        success: function(data2) {

            if (data2.id == undefined) {
                $('#modalLoadin').hide();
                swal("", "Error al actualizar el registro", "error");
                console.log("idtabla---->" + (data).eq(7).val() + "--->" + "data---->" + datos + "--->" + "spncontrolhuevosdetalles" + "Error--->" + data2);
                return 0;
            } else {
                $('#modalLoadin').hide();
                swal("", "Registro Actualizado con éxito!", "success");
                if (fecha_sacado != "") {
                    for (i = 1; i <= 12; i++) {
                        if ($("#id" + i).val() == $(data).eq(7).val()) {
                            $("#huevo_x" + i + ".equis").css('display', 'block');
                            $("#huevoV_x" + i + ".visto").css('display', 'none');
                        }
                    }

                } else {
                    for (i = 1; i <= 12; i++) {
                        if ($("#id" + i).val() == $(data).eq(7).val())
                            $("#huevo_x" + i + ".equis").css('display', 'none');
                    }
                }
                return 1;
            }
        },
        error: function(data2) {
            $('#modalLoadin').hide();
            swal("", "Error al actualizar el registro", "error");
            console.log("idtabla---->" + (data).eq(7).val() + "--->" + "data---->" + datos + "--->" + "spncontrolhuevosdetalles" + "Error--->" + data2);
            return 0;
        },
    });
});


//actualizar datos del detalle de control de huevos
function actDatosHuevoIncuv() {
    $('#modalLoadin').show();
    dj_url = "spncontrolhuevosdetalles";
    var table = $("#table_incuv_h tbody");
    var salida = [];
    datos = '';
    table.find('tr').each(function(i) {

        var data = $(this).find("td").find("input");
        var dataA = $(this).find("td").find("textarea");
        var dataB = $(this).find("td").find("select");
        fecha_eclosion = $(data).eq(0).val();
        fecha_sacado = $(data).eq(6).val();
        num_pintura = $(data).eq(1).val();
        largo_curvo = $(data).eq(2).val();
        ancho_curvo = $(data).eq(3).val();
        largo_plastron = $(data).eq(4).val();
        peso_salida = $(data).eq(5).val();

        if (fecha_eclosion != "") datoE = '"fecha_eclosion":"' + fecha_eclosion + '",';
        else datoE = ' "fecha_eclosion":null,';
        if (fecha_sacado != "") datoF = '"fecha_sacado":"' + fecha_sacado + '",';
        else datoF = ' "fecha_sacado":null,';
        if (num_pintura != "") datoN = '"num_pintura":"' + num_pintura + '",';
        else datoN = ' "num_pintura":null,';
        if (largo_curvo != "") datoL = '"largo_curvo":"' + largo_curvo + '",';
        else datoL = ' "largo_curvo":null,';
        if (ancho_curvo != "") datoA = '"ancho_curvo":"' + ancho_curvo + '",';
        else datoA = ' "ancho_curvo":null,';
        if (largo_plastron != "") datoP = '"largo_plastron":"' + largo_plastron + '",';
        else datoP = ' "largo_plastron":null,';
        if (peso_salida != "") datoPS = '"peso_salida":"' + peso_salida + '",';
        else datoPS = ' "peso_salida":null,';

        datos = '{' + datoE + ' ' + datoN + ' ' + datoL + ' ' + datoA + ' ' + datoP + ' ' + datoPS + ' ' + datoF + '  "condicion_huevo_no_ingresado":"' + $(dataA).eq(0).val() + '", "condicion":"' + $(dataB).eq(0).val() + '"}';

        dj_url = "spncontrolhuevosdetalles";

        console.log($(data).eq(7).val() + "***********");
        /*verifico si el registro tiene id(para insertar o actualizar)*/
        /*actualizacion*/
        console.log("actualizacion")
        $.ajax({
            url: "update_General",
            data: {
                "dj_url": dj_url,
                "idtabla": $(data).eq(7).val(),
                "data": JSON.stringify(datos)
            },
            type: "get",
            cache: 'false',
            async: false,
            dataType: "json",

            success: function(data2) {

                if (data2.id == undefined) {
                    //$('#modalLoadin').hide();
                    //swal("","Error al actualizar el registro", "error");
                    salida.push(['Error', num_pintura]);
                    console.log("idtabla---->" + (data).eq(7).val() + "--->" + "data---->" + datos + "--->" + "spncontrolhuevosdetalles" + "Error--->" + data2);
                    //return 0;
                } else {
                    //$('#modalLoadin').hide();
                    salida.push(['OK', num_pintura]);
                    //swal("","Registro Actualizado con éxito!", "success");              
                }
            },
            error: function(data2) {
                //$('#modalLoadin').hide();
                salida.push(['Error', num_pintura]);
                //swal("","Error al actualizar el registro", "error");
                console.log("idtabla---->" + (data).eq(7).val() + "--->" + "data---->" + datos + "--->" + "spncontrolhuevosdetalles" + "Error--->" + data2);
                //return 0;
            },
        });

    });

    $('#modalLoadin').hide();
    mensaje = "";
    for (i = 0; i < salida.length; i++) {
        if (salida[i][0] == 'OK')
            band = 0;
        else
            mensaje += "Numero de Huevo: " + salida[i][1] + "<br>";
    }

    if (mensaje == "") {
        swal("", "Registros Actualizados con exito", "success");
        buscarControlHuevos();
    } else
        swal("", "Error al actualizar los registros:" + mensaje, "error");

}


//limpiar pantalla de control de huevos
function clearFormCh(myFormElement) {

    var elements = myFormElement.elements;

    //myFormElement.reset();

    for (i = 0; i < elements.length; i++) {

        field_type = elements[i].type.toLowerCase();
        switch (field_type) {

            case "text":
            case "textarea":
            case "hidden":
                elements[i].value = "";
                break;
            case "radio":
            case "checkbox":
                if (elements[i].checked) {
                    elements[i].checked = false;
                }
                break;

            case "select-one":
            case "select-multi":
                elements[i].selectedIndex = 0;
                $("#" + elements[i].id).trigger("change");
                break;
            default:
                break;
        }
    }
    for (j = 1; j <= 12; j++) {
        $("#huevo_x" + j + ".equis").css('display', 'none');
        $("#huevoV_x" + j + ".visto").css('display', 'none');
    }
}


/*metodo para buscar datos de las mediciones segun los parametros ingresado*/
function buscarMedicionesParametros() {
    if ($("#SccrianzaCC").val() == "") {
        validaContenedorExt("content_control", "Centro de Crianza Obligatorio");
        return 0;
    }
    if ($("#SgnacimientoCC").val() == "") {
        validaContenedorExt("content_control", "Grupo de nacimineto Obligatorio");
        return 0;
    }
    if ($("#SpoblacionCC").val() == "") {
        validaContenedorExt("content_control", "Poblacion Obligatorio");
        return 0;
    }

    data = '';

    if ($("#SccrianzaCC").val() != "")
        data = "centro_crianza_id__in=" + $("#SccrianzaCC").val() + "&";

    if ($("#SgnacimientoCC").val() != "")
        data += "grupo_nacimiento__in=" + $("#SgnacimientoCC").val() + "&";

    if ($("#SpoblacionCC").val() != "")
        data += "poblacion_id__id__in=" + $("#SpoblacionCC").val() + "&";

    if ($("#SmedicionCC").val() != "")
        data += "periodo__in=" + $("#SmedicionCC").val() + "&";

    if ($("#SanioCC").val() != "")
        data += "anio__in=" + $("#SanioCC").val() + "&";

    data = data.substring(0, data.length - 1);

    console.log(data);

    checkM = '';
    checkR = '';
    cursor = '';
    claseEstado = '';

    $.ajax({
        url: "data_medicionesParam",
        type: "get",
        data: {
            "data": data
        },
        dataType: "json",

        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
            } else {
                var old = JSON.stringify(data).replace(/null/g, '""'); //convert to JSON string
                var data = JSON.parse(old); //convert back to array
                tabla = "";
                if ((data.length > 0)) {
                    for (i = 0; i < data.length; i++) {
                        $("#control_crecimiento_id").val(data[i].id);

                        if (data[i].det_control_crecimiento_id.length > 0) {
                            for (j = 0; j < data[i].det_control_crecimiento_id.length; j++) {

                                if (data[i].det_control_crecimiento_id[j].muerta == 1)
                                    checkM = 'checked';
                                else
                                    checkM = '';
                                if (data[i].det_control_crecimiento_id[j].repatriada == 1)
                                    checkR = 'checked';
                                else
                                    checkR = '';
                                if ((checkM != "") || (checkR != "")) {
                                    /*si verifica la fecha de muerte o repatriacion*/
                                    if (checkM != "") {
                                        fechaMR = data[i].det_control_crecimiento_id[j].fecha_medida;
                                        fechaMRarr = fechaMR.split("-");
                                    }
                                    if (checkR != "") {
                                        /*fechaMR = data[i].det_control_crecimiento_id[j].fecha_repatriacion;
                                        if (fechaMR == "") */ fechaMR = data[i].det_control_crecimiento_id[j].fecha_medida;
                                        fechaMRarr = fechaMR.split("-");
                                        $("#fecha_repatria").val(data[i].det_control_crecimiento_id[j].fecha_repatriacion);
                                        $("#SsitioCC").val(data[i].det_control_crecimiento_id[j].sitio_repatriacion).trigger("change");
                                    }


                                    cadenaFecha = fechaMRarr[0] + '-' + fechaMRarr[1].replace("0", "");
                                    cadenaMesB = $("#SanioCC").val() + '-' + $("#SmedicionCC").val();

                                    //console.log(cadenaFecha+'*********'+cadenaMesB);
                                    /*si las fecha de muerto o repatriacion es igual a la del periodo seleccionado se habilita el tr para q pueda modificarse*/
                                    if (cadenaFecha == cadenaMesB) {
                                        clase = '';
                                        style = '';
                                        cursor = '';
                                    } else {
                                        clase = 'disabled-select';
                                        style = 'background-color: #e4e4e4 !important;';
                                        cursor = 'pointer-events: all;';
                                    }
                                    /*fin*/
                                } else {
                                    clase = '';
                                    style = '';
                                }


                                if (data[i].det_control_crecimiento_id[j].estado_ingreso == 1) {
                                    claseEstado = 'IngresoFuera';
                                    color = "background-color: #428bca; color: white;";
                                    console.log(color + "--" + data[i].det_control_crecimiento_id[j].estado_ingreso);
                                    eliminarCheck = "<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Eliminar&nbsp;&nbsp;<input type='checkbox' name='check1' value='1' onclick='eliminarCCexterna(this);'/>";
                                } else {
                                    color = "";
                                    eliminarCheck = "";
                                    claseEstado = '';
                                }

                                if (data[i].det_control_crecimiento_id[j].num_hierro == 0) con_hierro = "";
                                else con_hierro = data[i].det_control_crecimiento_id[j].num_hierro;
                                if (data[i].det_control_crecimiento_id[j].num_pit == 0) con_pit = "";
                                else con_pit = data[i].det_control_crecimiento_id[j].num_pit;
                                if (data[i].det_control_crecimiento_id[j].largo_curvo == 0) largo_curvo = "";
                                else largo_curvo = data[i].det_control_crecimiento_id[j].largo_curvo;
                                if (data[i].det_control_crecimiento_id[j].ancho_curvo == 0) ancho_curvo = "";
                                else ancho_curvo = data[i].det_control_crecimiento_id[j].ancho_curvo;
                                if (data[i].det_control_crecimiento_id[j].largo_plastron == 0) largo_plastron = "";
                                else largo_plastron = data[i].det_control_crecimiento_id[j].largo_plastron;
                                if (data[i].det_control_crecimiento_id[j].peso == 0) peso = "";
                                else peso = data[i].det_control_crecimiento_id[j].peso;

                                if (data[i].det_control_crecimiento_id[j].estado == 'A') {
                                    tabla += "<tr class='" + clase + "' style='" + style + "'>";
                                    tabla += "<td><input class='fecha_cc' name='txtfecha[]' max='9999-01-01' type='date' style='width:110px; font-size: 10px;height: 25px;' value='" + data[i].det_control_crecimiento_id[j].fecha_medida + "'/></td>";
                                    tabla += "<td style='width:5%;" + cursor + "" + color + "'  onclick='prueba(\"PopS" + j + "\"," + data[i].det_control_crecimiento_id[j].num_pintura + ",\"" + $("#SccrianzaCC").val() + "\",\"" + $("#SgnacimientoCC").val() + "\",\"" + $("#SpoblacionCC").val() + "\");' class='PopS " + claseEstado + "' data-toggle='popover' data-trigger='click' data-placement='right' data-container='body' data-html='true' id='PopS" + j + "' >" + data[i].det_control_crecimiento_id[j].num_pintura + "</td>";
                                    tabla += "<td align='center'><input autocomplete='off' class='input' name='txthierro[]' type='text' style='width: 50px;text-align:center;height: 25px;' value='" + con_hierro + "' onkeypress='return isNumberKey(event);'/></td>";
                                    tabla += "<td align='center'><input autocomplete='off' class='input' name='txtpit[]' type='text' style='width: 100px;text-align:center;height: 25px;' maxlength='10' value='" + con_pit + "' onkeypress='return isNumberKey(event);'/></td>";
                                    tabla += "<td align='center'><input autocomplete='off' class='input cajaNumero' name='txtlargoc[]' type='text' style='text-align:center;' value='" + largo_curvo + "' onkeypress='return isNumberKey(event);'/></td>";
                                    tabla += "<td align='center'><input autocomplete='off' class='input cajaNumero' name='txtanchoc[]' type='text' style='text-align:center;' value='" + ancho_curvo + "' onkeypress='return isNumberKey(event);'/></td>";
                                    tabla += "<td align='center'><input autocomplete='off' class='input cajaNumero' name='txtlplastron[]' type='text' style='text-align:center;' value='" + largo_plastron + "' onkeypress='return isNumberKey(event);'/></td>";
                                    tabla += "<td align='center'><input autocomplete='off' class='input cajaNumero' name='txtpeso[]' type='text' style='text-align:center;' value='" + peso + "' onkeypress='return isNumberKey(event);'/></td>";
                                    tabla += "<td><textarea class='input' id='comentario_" + i + "' style='width:150px;'>" + data[i].det_control_crecimiento_id[j].observacion + "</textarea></td>";
                                    tabla += "<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Muerta&nbsp;&nbsp;<input type='checkbox' name='check1' value='1' " + checkM + "/><br>Repatriada&nbsp;&nbsp;<input type='checkbox' name='check1' value='1' " + checkR + "/>" + eliminarCheck + "</td>";
                                    //tabla+="<td align='center'><a href='#addSancionSP' data-stackbox='true' data-stackbox-position='absolute' onclick='editSancion_SP(\""+data[i].det_control_crecimiento_id[j].id+"\")'><i class='fa fa-edit text-green'></i></a> </td>";
                                    tabla += "<td hidden>" + data[i].det_control_crecimiento_id[j].id + "</td>";
                                    tabla += "</tr>";
                                }
                            } /*end for*/
                        } else {
                            $("#control_crecimiento_id").val("");
                            tabla = "<td align='center' colspan='10'>No Existe informacion para este periodo <br> <button type='button' class='btn btn-block btn-save' style='width: 80px;' onclick='addMedicionParametros();'>Agregar</button></td>";
                        }
                    } /*end for data.length*/
                } else {
                    $("#control_crecimiento_id").val("");
                    console.log("Test");
                    console.log($("#perm_controlcrec_add").val());
                    if ($("#perm_controlcrec_add").val() == "1") {
                        tabla = "<td align='center' colspan='10'>No Existe informacion para este periodo <br> <button type='button' class='btn btn-block btn-save' style='width: 80px;' onclick='addMedicionParametros();'>Agregar</button></td>";
                    }
                } /*end if data.length*/

                $("#bodytabla_controlc").html("");
                $("#bodytabla_controlc").append(tabla);

                sortTable("tabla_controlc");

                $('#tabla_controlc_aux tbody').html("");
            }
        },
        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
            //console.log( JSON.stringify(data));
        },
    });
}

/*funcion para eliminar registgro del conotrol de crecimiento ingresado desde el boton +*/
function eliminarCCexterna(check) {

    if ($("#perm_controlcrec_encont_delete").val() == "1") {
        datosD = "";
        if ($(check).is(':checked')) {
            swal({
                    title: "Estas seguro de Eliminar este registro?",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                .then((willDelete) => {
                    if (willDelete) {
                        var dataTD = $(check).parents('tr').find("td");
                        console.log($(dataTD).eq(10).html());
                        id = $(dataTD).eq(10).html();
                        datosD += '{';
                        datosD += ' "estado":"I",';
                        datosD += ' "eliminado":"t"';
                        datosD += '}';
                        console.log(datosD);

                        dj_url = 'spncontrolcrecimientogalapaguitosdetalles';
                        $.ajax({
                            url: "update_General",
                            type: 'get',
                            cache: 'false',
                            data: {
                                "dj_url": dj_url,
                                "idtabla": id,
                                "data": JSON.stringify(datosD)
                            },
                            dataType: "json",
                            async: false,
                            success: function(data2) {
                                if (data2.id == undefined) {
                                    console.log('error1');
                                    swal("", "Error al Eliminar el registro", "error");
                                    console.log("idtabla---->" + id + "--->" + "data---->" + datosD + "--->" + "spncontrolcrecimientogalapaguitosdetalles" + "Error--->" + data2);
                                } else {
                                    console.log('ok');
                                    $(check).parents('tr').remove();
                                    swal("Listo! Registro Eliminado con Exito", {
                                        icon: "success",
                                    });
                                }
                            },
                            error: function(data2) {
                                console.log('error2');
                                swal("", "Error al Eliminar el registro", "error");
                                console.log("idtabla---->" + id + "--->" + "data---->" + datosD + "--->" + "spncontrolcrecimientogalapaguitosdetalles" + "Error--->" + data2);
                            },
                        });

                    } else {
                        $(check).attr("checked", false);
                    }
                });
        } else {
            console.log('unchecked');
        }
    }
}

/*funcion para mostrar info de la tortuga al dar clik sobre el numero de pintura en la tabla*/
function prueba(idPop, pintura, cc, grupo, pobla) {
    dataP = "centro_crianza_id__in=" + cc + "&";
    dataP += "grupo_nacimiento__in=" + grupo + "&";
    dataP += "poblacion_id__id__in=" + pobla + "&";
    dataP += "num_pintura__in=" + pintura + "";

    $.ajax({
        url: "datos_huevopintura",
        type: "get",
        data: {
            "data": dataP
        },
        dataType: "json",

        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
            } else {
                var old = JSON.stringify(data).replace(/null/g, '""'); //convert to JSON string
                var data = JSON.parse(old); //convert back to array
                tabla = "";
                if (data.length > 0) {
                    tabla += "<table class='table table-striped table-bordered'>";
                    tabla += "<tr>";
                    tabla += "<td colspan='2' style='text-transform:uppercase;background-color: #3c8dbc; color:#fff;text-align: center; border: 1px solid black;font-size:10px;font-weight:bold;'>Datos del Huevo segun el Numero de Pintura</td>";
                    tabla += "</tr>";
                    tabla += "<tr>";
                    tabla += "<td style='text-transform:uppercase;background-color: #3c8dbc; color:#fff;text-align: right; border: 1px solid black;font-size:10px;font-weight:bold;'>Numero Huevo</td>";
                    tabla += "<td style=' border: 1px solid black;text-align: center;font-size:10px;font-weight:bold;'>" + data[0].num_huevo + "</td>";
                    tabla += "</tr>";
                    tabla += "<tr>";
                    tabla += "<td style='text-transform:uppercase;background-color: #3c8dbc; color:#fff;text-align: right;border: 1px solid black;font-size:10px;font-weight:bold;'>Numero Nido</td>";
                    tabla += "<td style=' border: 1px solid black;text-align: center;font-size:10px;font-weight:bold;'>" + data[0].num_nido + "</td>";
                    tabla += "</tr>";
                    tabla += "<tr>";
                    tabla += "<td style='text-transform:uppercase;background-color: #3c8dbc; color:#fff;text-align: right;border: 1px solid black;font-size:10px;font-weight:bold;'>Numero Hembra</td>";
                    tabla += "<td style=' border: 1px solid black;text-align: center;font-size:10px;font-weight:bold;'>" + data[0].num_nido + "</td>";
                    tabla += "</tr>";
                    tabla += "<tr>";
                    tabla += "<td style='text-transform:uppercase;background-color: #3c8dbc; color:#fff;text-align: right;border: 1px solid black;font-size:10px;font-weight:bold;'>Numero caja</td>";
                    tabla += "<td style=' border: 1px solid black;text-align: center;font-size:10px;font-weight:bold;'>" + data[0].num_caja + "</td>";
                    tabla += "</tr>";
                    tabla += "<tr>";
                    tabla += "<td style='text-transform:uppercase;background-color: #3c8dbc; color:#fff;text-align: right;border: 1px solid black;font-size:10px;font-weight:bold;'>Numero Incubadora</td>";
                    tabla += "<td style=' border: 1px solid black;text-align: center;font-size:10px;font-weight:bold;'>" + data[0].num_incubadora + "</td>";
                    tabla += "</tr>";
                    tabla += "<tr>";
                    tabla += "<td style='text-transform:uppercase;background-color: #3c8dbc; color:#fff;text-align: right;border: 1px solid black;font-size:10px;font-weight:bold;'>Temperatura</td>";
                    tabla += "<td style=' border: 1px solid black;text-align: center;font-size:10px;font-weight:bold;'>" + data[0].temperatura + "</td>";
                    tabla += "</tr>";
                    tabla += "<tr>";
                    tabla += "<td style='text-transform:uppercase;background-color: #3c8dbc; color:#fff;text-align: right;border: 1px solid black;font-size:10px;font-weight:bold;'>Numero Ingresados</td>";
                    tabla += "<td style=' border: 1px solid black;text-align: center;font-size:10px;font-weight:bold;'>" + data[0].num_ingresos + "</td>";
                    tabla += "</tr>";
                    tabla += "<tr>";
                    tabla += "<td style='text-transform:uppercase;background-color: #3c8dbc; color:#fff;text-align: right;border: 1px solid black;font-size:10px;font-weight:bold;'>Total Huevos</td>";
                    tabla += "<td style=' border: 1px solid black;text-align: center;font-size:10px;font-weight:bold;'>" + data[0].total_huevos + "</td>";
                    tabla += "</tr>";
                    tabla += "<tr>";
                    tabla += "<td style='text-transform:uppercase;background-color: #3c8dbc; color:#fff;text-align: right;border: 1px solid black;font-size:10px;font-weight:bold;'>Fecha Postura</td>";
                    tabla += "<td style=' border: 1px solid black;text-align: center;font-size:10px;font-weight:bold;'>" + data[0].fecha_postura + "</td>";
                    tabla += "</tr>";
                    tabla += "<tr>";
                    tabla += "<td style='text-transform:uppercase;background-color: #3c8dbc; color:#fff;text-align: right;border: 1px solid black;font-size:10px;font-weight:bold;'>Fecha Ingreso</td>";
                    tabla += "<td style=' border: 1px solid black;text-align: center;font-size:10px;font-weight:bold;'>" + data[0].fecha_ingreso_inc + "</td>";
                    tabla += "</tr>";
                    tabla += "</table>";
                } else {
                    tabla = "No existe informacion";
                }

                $("#" + idPop).popover({
                    html: true,
                    content: tabla
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


/*buscar datos de las mediciones y agregar nuevas mediciones*/
function addMedicionParametros() {
    if ($("#SccrianzaCC").val() != "") {
        dataP = "centro_crianza_id__in=" + $("#SccrianzaCC").val() + "&";
        dataP2 = "centro_crianza_id__in=" + $("#SccrianzaCC").val() + "&";
    }

    if ($("#SgnacimientoCC").val() != "") {
        dataP += "grupo_nacimiento__in=" + $("#SgnacimientoCC").val() + "&";
        dataP2 += "grupo_nacimiento__in=" + $("#SgnacimientoCC").val() + "&";
    }

    if ($("#SpoblacionCC").val() != "") {
        dataP += "poblacion_id__in=" + $("#SpoblacionCC").val() + "&";
        dataP2 += "poblacion_id__in=" + $("#SpoblacionCC").val() + "&";
    }

    dataP = dataP.substring(0, dataP.length - 1);
    tabla = "";
    console.log(dataP);

    claseEstado = "";

    $.ajax({
        //url: "dataCabmedicionesParam",
        url: "data_medicionesParam",
        type: "get",
        data: {
            "data": dataP
        },
        dataType: "json",

        success: function(data1) {
            if (data1['non_field_errors']) {
                console.log(data1['non_field_errors']);
            } else {
                if (data1.length > 0) {
                    var conta = 0;
                    for (i = 0; i < data1.length; i++) {
                        if (data1[i].det_control_crecimiento_id.length > 0)
                            conta += data1[i].det_control_crecimiento_id.length;
                    }
                }
                if (conta > 0) {
                    console.log("si existe");
                    console.log(dataP);
                    $.ajax({
                        url: "data_ultimaMedicionParam",
                        type: "get",
                        data: {
                            "data": dataP
                        },
                        dataType: "json",

                        success: function(data) {
                            if (data['non_field_errors']) {
                                console.log(data['non_field_errors']);
                            } else {
                                if (data.length > 0) {
                                    console.log(data);
                                    dataP += "&poblacion_id__id__in=" + $("#SpoblacionCC").val() + "&anio__in=" + data[(data.length - 1)].anio + "&periodo__in=" + data[(data.length - 1)].periodo;
                                    console.log(dataP);
                                    $.ajax({
                                        url: "data_medicionesParam",
                                        type: "get",
                                        data: {
                                            "data": dataP
                                        },
                                        dataType: "json",

                                        success: function(data) {
                                            if (data['non_field_errors']) {
                                                console.log(data['non_field_errors']);
                                            } else {
                                                if (data.length > 0) {
                                                    for (i = 0; i < data.length; i++) {
                                                        for (j = 0; j < data[i].det_control_crecimiento_id.length; j++) {
                                                            if (data[i].det_control_crecimiento_id[j].muerta == 1)
                                                                checkM = 'checked';
                                                            else
                                                                checkM = '';
                                                            if (data[i].det_control_crecimiento_id[j].repatriada == 1)
                                                                checkR = 'checked';
                                                            else
                                                                checkR = '';

                                                            if ((checkM != "") || (checkR != "")) {
                                                                clase = 'disabled-select';
                                                                style = 'background-color: #e4e4e4 !important;';
                                                                cursor = 'pointer-events: all;';
                                                                if (checkM != "") {
                                                                    fechaMR = data[i].det_control_crecimiento_id[j].fecha_medida;
                                                                }
                                                                if (checkR != "") {
                                                                    fechaMR = data[i].det_control_crecimiento_id[j].fecha_repatriacion;
                                                                }
                                                            } else {
                                                                clase = '';
                                                                style = '';
                                                                cursor = '';
                                                                //fechaMR = getToday();
                                                                mes = $("#SmedicionCC").val()
                                                                if (mes < 10) {
                                                                    mes = '0' + $("#SmedicionCC").val();
                                                                }
                                                                fechaMR = $("#SanioCC").val() + '-' + mes + '-01';
                                                            }

                                                            if (data[i].det_control_crecimiento_id[j].estado_ingreso == 1) {
                                                                color = "background-color: #428bca; color: white;";
                                                                console.log(color + "--" + data[i].det_control_crecimiento_id[j].estado_ingreso);
                                                                eliminarCheck = "<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Eliminar&nbsp;&nbsp;<input type='checkbox' name='check1' value='1'/>";
                                                                claseEstado = 'IngresoFuera';
                                                            } else {
                                                                color = "";
                                                                eliminarCheck = "";
                                                                claseEstado = "";
                                                            }

                                                            if (data[i].det_control_crecimiento_id[j].estado == 'A') {
                                                                tabla += "<tr class='" + clase + "' style='" + style + "'>";
                                                                //tabla+="<td id='td_sancionFechaCreacion_"+data[i].id+"'>"+data[i].fecha_ingreso+"</td>";
                                                                tabla += "<td><input class='fecha_cc' max='9999-01-01' name='txtfecha[]' type='date' style='width:110px; font-size: 10px;height: 205x;' value='" + fechaMR + "'/></td>";
                                                                tabla += "<td style='width:5%;" + cursor + "" + color + "' onclick='prueba(\"PopS" + j + "\"," + data[i].det_control_crecimiento_id[j].num_pintura + ",\"" + $("#SccrianzaCC").val() + "\",\"" + $("#SgnacimientoCC").val() + "\",\"" + $("#SpoblacionCC").val() + "\");' class='PopS " + claseEstado + "' data-toggle='popover' data-trigger='click' data-placement='right' data-container='body' data-html='true' id='PopS" + j + "' >" + data[i].det_control_crecimiento_id[j].num_pintura + "</td>";
                                                                tabla += "<td align='center'><input autocomplete='off' class='input' name='txthierro[]' type='text' style='width: 50px;text-align:center;' value='' onkeypress='return isNumberKey(event);'/></td>";
                                                                tabla += "<td align='center'><input autocomplete='off' class='input' name='txtpit[]' type='text' style='width: 100px;text-align:center;' maxlength='10' value='' onkeypress='return isNumberKey(event);'/></td>";
                                                                tabla += "<td align='center'><input autocomplete='off' class='input cajaNumero' name='txtlargoc[]' type='text' style='text-align:center;' value='' onkeypress='return isNumberKey(event);'/></td>";
                                                                tabla += "<td align='center'><input autocomplete='off' class='input cajaNumero' name='txtanchoc[]' type='text' style='text-align:center;' value='' onkeypress='return isNumberKey(event);'/></td>";
                                                                tabla += "<td align='center'><input autocomplete='off' class='input cajaNumero' name='txtlplastron[]' type='text' style='text-align:center;' value='' onkeypress='return isNumberKey(event);'/></td>";
                                                                tabla += "<td align='center'><input autocomplete='off' class='input cajaNumero' name='txtpeso[]' type='text' style='text-align:center;' value='' onkeypress='return isNumberKey(event);'/></td>";
                                                                tabla += "<td><textarea class='input' style='width:150px;'>" + data[i].det_control_crecimiento_id[j].observacion + "</textarea></td>";
                                                                tabla += "<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Muerta&nbsp;&nbsp;<input type='checkbox' name='check1' value='1' " + checkM + "/><br>Repatriada&nbsp;&nbsp;<input type='checkbox' name='check1' value='1' " + checkR + "/>" + eliminarCheck + "</td>";
                                                                tabla += "<td hidden>" + data[i].det_control_crecimiento_id[j].control_huevos_resumen_id + "<td>";
                                                                tabla += "</tr>";
                                                            }

                                                        }
                                                    }
                                                    $("#bodytabla_controlc").html("");
                                                    $("#bodytabla_controlc").append(tabla);

                                                    sortTable("tabla_controlc");
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
                        },
                        error: function(data) {
                            swal("", "Error: " + JSON.stringify(data), "error");
                            console.log(JSON.stringify(data));
                            //console.log( JSON.stringify(data));
                        },
                    });
                } else {
                    $.ajax({
                        url: "data_ControlHuevos",
                        type: "get",
                        data: {
                            "data": dataP2
                        },
                        dataType: "json",

                        success: function(data) {
                            if (data['non_field_errors']) {
                                console.log(data['non_field_errors']);
                            } else {
                                if (data.length > 0) {
                                    tabla = '';
                                    console.log("no existe");
                                    contDet = 0;
                                    for (i = 0; i < data.length; i++) {
                                        for (x = 0; x < data[i].control_resumen_id.length; x++) {
                                            contDet++;
                                            for (j = 0; j < data[i].control_resumen_id[x].control_resumen_detalles_id.length; j++) {
                                                console.log(data[i].control_resumen_id[x].control_resumen_detalles_id[j].fecha_sacado);
                                                if (data[i].control_resumen_id[x].control_resumen_detalles_id[j].fecha_sacado == null) {
                                                    //fechaMR2 = getToday();
                                                    mes = $("#SmedicionCC").val()
                                                    if (mes < 10) {
                                                        mes = '0' + $("#SmedicionCC").val();
                                                    }
                                                    fechaMR = $("#SanioCC").val() + '-' + mes + '-01';

                                                    tabla += "<tr>";
                                                    //tabla+="<td id='td_sancionFechaCreacion_"+data[i].id+"'>"+data[i].fecha_ingreso+"</td>";
                                                    tabla += "<td><input class='fecha_cc' max='9999-01-01' name='txtfecha[]' type='date' style='width:110px; font-size: 10px;height: 25px;' value='" + fechaMR + "'/></td>";
                                                    tabla += "<td style='width:5%;' onclick='prueba(\"PopS" + j + "\"," + data[i].control_resumen_id[x].control_resumen_detalles_id[j].num_pintura + ",\"" + $("#SccrianzaCC").val() + "\",\"" + $("#SgnacimientoCC").val() + "\",\"" + $("#SpoblacionCC").val() + "\");' class'PopS' data-toggle='popover' data-trigger='click' data-placement='right' data-container='body' data-html='true' id='PopS" + j + "'>" + data[i].control_resumen_id[x].control_resumen_detalles_id[j].num_pintura + "</td>";
                                                    tabla += "<td align='center'><input autocomplete='off' class='input' name='txthierro[]' type='text' style='width: 50px;text-align:center;' value='' onkeypress='return isNumberKey(event);'/></td>";
                                                    tabla += "<td align='center'><input autocomplete='off' class='input' name='txtpit[]' type='text' style='width: 100px;text-align:center;' maxlength='10' value='' onkeypress='return isNumberKey(event);'/></td>";
                                                    tabla += "<td align='center'><input autocomplete='off' class='input cajaNumero' name='txtlargoc[]' type='text' style='text-align:center;' value='' onkeypress='return isNumberKey(event);'/></td>";
                                                    tabla += "<td align='center'><input autocomplete='off' class='input cajaNumero' name='txtanchoc[]' type='text' style='text-align:center;' value='' onkeypress='return isNumberKey(event);'/></td>";
                                                    tabla += "<td align='center'><input autocomplete='off' class='input cajaNumero' name='txtlplastron[]' type='text' style='text-align:center;' value='' onkeypress='return isNumberKey(event);'/></td>";
                                                    tabla += "<td align='center'><input autocomplete='off' class='input cajaNumero' name='txtpeso[]' type='text' style='text-align:center;' value='' onkeypress='return isNumberKey(event);'/></td>";
                                                    tabla += "<td><textarea class='input' style='width:150px;'></textarea></td>";
                                                    tabla += "<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Muerta&nbsp;&nbsp;<input type='checkbox' name='check1' value='1'/><br>Repatriada&nbsp;&nbsp;<input type='checkbox' name='check1' value='1'/></td>";
                                                    tabla += "<td hidden>" + data[i].control_resumen_id[x].control_resumen_detalles_id[j].control_huevos_resumen_id + "<td>";
                                                    tabla += "</tr>";
                                                }
                                            }
                                        }
                                    }
                                    if (contDet == 0) {
                                        tabla += "<tr>";
                                        tabla += "<td colspan='10'> No existe datos para el periodo seleccionado</td>";
                                        tabla += "</tr>";
                                    }
                                    $("#bodytabla_controlc").html("");
                                    $("#bodytabla_controlc").append(tabla);

                                    sortTable("tabla_controlc");
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
        },
        error: function(data) {
            swal("", "Error: " + JSON.stringify(data1), "error");
            console.log(JSON.stringify(data1));
            //console.log( JSON.stringify(data));
        },
    });
}

/*funcion para ordenar tabla*/
function sortTable(table) {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById(table);
    switching = true;
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
        //start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /*Loop through all table rows (except the
        first, which contains table headers):*/
        for (i = 1; i < (rows.length - 1); i++) {
            //start by saying there should be no switching:
            shouldSwitch = false;
            /*Get the two elements you want to compare,
            one from current row and one from the next:*/
            x = rows[i].getElementsByTagName("TD")[1];
            y = rows[i + 1].getElementsByTagName("TD")[1];
            //check if the two rows should switch place:
            if (parseInt(x.innerHTML.toLowerCase()) > parseInt(y.innerHTML.toLowerCase())) {
                //if so, mark as a switch and break the loop:
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            /*If a switch has been marked, make the switch
            and mark that a switch has been done:*/
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}

/*funcion para insertar o actualizar mediciones*/
function insertUpdateMedicionesParametros() {
    if ($("#control_crecimiento_id").val() != "")
        UpdateMedicionesParametros($("#control_crecimiento_id").val());
    else
        insertMedicionesParametros();

}

/*funcion para insertar mediciones del control de crecimineto*/
function insertMedicionesParametros() {
    $('#modalLoadin').show();
    datosC = '{';
    datosC += ' "grupo_nacimiento":"' + $("#SgnacimientoCC").val() + '",';
    datosC += ' "centro_crianza_id":"' + $("#SccrianzaCC").val() + '",';
    datosC += ' "poblacion_id":"' + $("#SpoblacionCC").val() + '",';
    datosC += ' "periodo":"' + $("#SmedicionCC").val() + '",';
    datosC += ' "anio":"' + $("#SanioCC").val() + '",';

    var table = $("#tabla_controlc tbody");
    inicial = 1;
    final = 0;
    datosD = '';
    mensaje = '';
    cadenaF = '';
    table.find('tr').each(function(i) {

        observaAux = '';

        var data = $(this).find("td").find("input");
        var dataT = $(this).find("td").find("textarea");
        var dataTD = $(this).find("td");

        if ($(data).eq(0).val() == ""){
           cadenaF += $(dataTD).eq(0).html()+"<br>";
        }

        datosD += '{';
        datosD += ' "fecha_medida":"' + $(data).eq(0).val() + '",';
        datosD += ' "num_pintura":"' + $(dataTD).eq(1).html() + '",';
        //console.log($(dataTD).eq(10).html());
        if($(dataTD).eq(10).html() == "null"){
            datosD += ' "control_huevos_resumen_id":null,';
            console.log($(dataTD).eq(10).html()+"--------si");
        }
        else{
            datosD += ' "control_huevos_resumen_id":"' + $(dataTD).eq(10).html() + '",';
            console.log($(dataTD).eq(10).html()+"--------no");
        }

        idPintura = $(dataTD).eq(1).attr("id");
        if ($("#" + idPintura).hasClass("IngresoFuera"))
            datosD += ' "estado_ingreso":"1",';

        if ($(data).eq(1).val() == "") datosD += '';
        else datosD += ' "num_hierro":"' + $(data).eq(1).val() + '",';
        if ($(data).eq(2).val() == "") datosD += '';
        else datosD += ' "num_pit":"' + $(data).eq(2).val() + '",';
        if ($(data).eq(3).val() == "") datosD += '';
        else datosD += ' "largo_curvo":"' + $(data).eq(3).val() + '",';
        if ($(data).eq(4).val() == "") datosD += '';
        else datosD += ' "ancho_curvo":"' + $(data).eq(4).val() + '",';
        if ($(data).eq(5).val() == "") datosD += '';
        else datosD += ' "largo_plastron":"' + $(data).eq(5).val() + '",';
        if ($(data).eq(6).val() == "") datosD += '';
        else datosD += ' "peso":"' + $(data).eq(6).val() + '",';
        if ($(data).eq(7).is(':checked')) {
            datosD += ' "muerta":"1",';
            datosD += ' "fecha_muerte_tort":"' + $(data).eq(0).val() + '",';
        }
        if ($(data).eq(8).is(':checked')) {
            datosD += ' "repatriada":"1",';
            if (!$(this).hasClass("disabled-select")) {
                if(($("#fecha_repatria").val() == "")||($("#SsitioCC").val() == "")) {
                    mensaje += $(dataTD).eq(1).html() + ",";
                }
                datosD += ' "fecha_repatriacion":"' + $("#fecha_repatria").val() + '",';
            } else
                datosD += ' "fecha_repatriacion":"' + $(data).eq(0).val() + '",';

            if (!$(this).hasClass("disabled-select")) datosD += ' "sitio_repatriacion":"' + $("#SsitioCC").val() + '",';
            //observaAux = ' fecha repatriacion '+$("#fecha_repatria").val()+'';
        } else {
            datosD += ' "repatriada":null,';
            if (!$(this).hasClass("disabled-select")) datosD += ' "fecha_repatriacion":null,';
            if (!$(this).hasClass("disabled-select")) datosD += ' "sitio_repatriacion":null,';
        }

        datosD += ' "observacion":"' + $(dataT).eq(0).val() + observaAux + '"';
        datosD += '},';

    });

    if(cadenaF != ""){
        $('#modalLoadin').hide();
        swal("", "fecha medida no puede ser nula"+cadenaF, "error");
        return false;
    }

    if (mensaje != "") {
        $('#modalLoadin').hide();
        swal("", "No ha seleccionado fecha de repatriacion para el/los numeros de pintura: " + mensaje + "", "warning");
        return 0;
    }

    datosD = datosD.substring(0, datosD.length - 1);

    /*para obtner los registros de las especies q son ingresadas directamente al grupo*/
    var tableAux = $("#tabla_controlc_aux tbody");
    inicialAux = 1;
    finalAux = 0;
    datosDAux = '';
    cadena2F  = '';
    tableAux.find('tr').each(function(i) {
        var dataAux = $(this).find("td").find("input");
        var dataTAux = $(this).find("td").find("textarea");


        if ($(dataAux).eq(0).val() == ""){
           cadena2F += "fecha nula<br>";
        }
        if ($(dataAux).eq(1).val() == ""){
           cadena2F += "numero pIntura nulo<br>";
        }

        datosDAux += '{';
        datosDAux += ' "fecha_medida":"' + $(dataAux).eq(0).val() + '",';
        datosDAux += ' "num_pintura":"' + $(dataAux).eq(1).val() + '",';
        datosDAux += ' "estado_ingreso":1,';
        datosDAux += ' "fecha_ingreso_tort":"' + $(dataAux).eq(0).val() + '",';

        if ($(dataAux).eq(2).val() == "") datosDAux += ' "num_hierro":null,';
        else datosDAux += ' "num_hierro":"' + $(dataAux).eq(2).val() + '",';
        if ($(dataAux).eq(3).val() == "") datosDAux += ' "num_pit":null,';
        else datosDAux += ' "num_pit":"' + $(dataAux).eq(3).val() + '",';
        if ($(dataAux).eq(4).val() == "") datosDAux += ' "largo_curvo":null,';
        else datosDAux += ' "largo_curvo":"' + $(dataAux).eq(4).val() + '",';
        if ($(dataAux).eq(5).val() == "") datosDAux += ' "ancho_curvo":null,';
        else datosDAux += ' "ancho_curvo":"' + $(dataAux).eq(5).val() + '",';
        if ($(dataAux).eq(6).val() == "") datosDAux += ' "largo_plastron":null,';
        else datosDAux += ' "largo_plastron":"' + $(dataAux).eq(6).val() + '",';
        if ($(dataAux).eq(7).val() == "") datosDAux += ' "peso":null,';
        else datosDAux += ' "peso":"' + $(dataAux).eq(7).val() + '",';
        if ($(dataAux).eq(8).is(':checked')) {
            datosDAux += ' "muerta":"1",';
            datosD += ' "fecha_muerte_tort":"' + $(data).eq(0).val() + '",';
        }
        if ($(dataAux).eq(9).is(':checked')) {
            datosDAux += ' "repatriada":"1",';
            datosDAux += ' "fecha_repatriacion":"' + $("#fecha_repatria").val() + '",';
            datosDAux += ' "sitio_repatriacion":"' + $("#SsitioCC").val() + '",';
        }

        datosDAux += ' "observacion":"' + $(dataTAux).eq(0).val() + '"';
        datosDAux += '},';

    });



    if(cadena2F != ""){
        $('#modalLoadin').hide();
        swal("", cadena2F, "error");
        return false;
    }

    datosDAux = datosDAux.substring(0, datosDAux.length - 1);

    if (datosDAux != "")
        dataFinal = datosD + ',' + datosDAux;
    else
        dataFinal = datosD;
    /*fin*/

    datosC += '"det_control_crecimiento_id":[' + dataFinal + ']}';
    console.log(datosC);
    dj_url = 'spncontrolcrecimientogalapaguitos';
    $.ajax({
        url: "insert_General_mediciones",
        type: 'post',
        cache: 'false',
        data: {
            "dj_url": dj_url,
            "data": JSON.stringify("[" + datosC + "]")
        },
        dataType: "json",
        success: function(data2) {
            if (!data2['results']) {
                $('#modalLoadin').hide();
                swal("", "Error al Insertar el registro", "error");
                console.log("data---->" + datosC + "--->" + "spncontrolcrecimientogalapaguitos" + "Error--->" + data2);
            } else {
                $('#modalLoadin').hide();
                swal("", "Registro insertado con exito", "success");
                buscarMedicionesParametros();
            }
        },
        error: function(data2) {
            $('#modalLoadin').hide();
            swal("", "Error al Insertar el registro", "error");
            console.log("data---->" + datosC + "--->" + "spncontrolcrecimientogalapaguitos" + "Error--->" + data2);
        },
    });

}


/*funcion para actualizar mediciones de los crecimientos*/
function UpdateMedicionesParametros(cabecera) {
    $('#modalLoadin').show();
    datosC = '{';

    var table = $("#tabla_controlc tbody");
    inicial = 1;
    final = 0;
    datosD = '';
    cadenaF = '';
    mensaje = '';
    table.find('tr').each(function(i) {
        var data = $(this).find("td").find("input");
        var dataT = $(this).find("td").find("textarea");
        var dataTD = $(this).find("td");

        if ($(data).eq(0).val() == ""){
           cadenaF += $(dataTD).eq(0).html()+"<br>";
        }


        datosD += '{';
        datosD += ' "id":"' + $(dataTD).eq(10).html() + '",';
        datosD += '"control_huevos_resumen_id":"' + $(dataTD).eq(10).val() + '",';
        if ($(data).eq(0).val() == "") datosD += ' "fecha_medida":null,';
        else datosD += ' "fecha_medida":"' + $(data).eq(0).val() + '",';
        if ($(data).eq(1).val() == "") datosD += ' "num_hierro":null,';
        else datosD += ' "num_hierro":"' + $(data).eq(1).val() + '",';
        if ($(data).eq(2).val() == "") datosD += ' "num_pit":null,';
        else datosD += ' "num_pit":"' + $(data).eq(2).val() + '",';
        if ($(data).eq(3).val() == "") datosD += ' "largo_curvo":null,';
        else datosD += ' "largo_curvo":"' + $(data).eq(3).val() + '",';
        if ($(data).eq(4).val() == "") datosD += ' "ancho_curvo":null,';
        else datosD += ' "ancho_curvo":"' + $(data).eq(4).val() + '",';
        if ($(data).eq(5).val() == "") datosD += ' "largo_plastron":null,';
        else datosD += ' "largo_plastron":"' + $(data).eq(5).val() + '",';
        if ($(data).eq(6).val() == "") datosD += ' "peso":null,';
        else datosD += ' "peso":"' + $(data).eq(6).val() + '",';
        if ($(data).eq(7).is(':checked')) {
            datosD += ' "muerta":"1",';
            if (!$(this).hasClass("disabled-select"))
                datosD += ' "fecha_muerte_tort":"' + $(data).eq(0).val() + '",';
        } else {
            datosD += ' "muerta":null,';
        }
        if ($(data).eq(8).is(':checked')) {
            datosD += ' "repatriada":"1",';
            if (!$(this).hasClass("disabled-select")) {
                if(($("#fecha_repatria").val() == "")||($("#SsitioCC").val() == "")) {
                    mensaje += $(dataTD).eq(1).html() + ",";
                }
                datosD += ' "fecha_repatriacion":"' + $("#fecha_repatria").val() + '",';
                datosD += ' "sitio_repatriacion":"' + $("#SsitioCC").val() + '",';
            }
        } else {
            datosD += ' "repatriada":null,';
            datosD += ' "fecha_repatriacion":null,';
            datosD += ' "sitio_repatriacion":null,';
        }

        datosD += ' "observacion":"' + $(dataT).eq(0).val() + '"';
        datosD += '},';


    });

    if (mensaje != "") {
        $('#modalLoadin').hide();
        swal("", "No ha seleccionado fecha de repatriacion para el/los numeros de pintura: " + mensaje + "", "warning");
        return 0;
    }

    if(cadenaF != ""){
        $('#modalLoadin').hide();
        swal("", "fecha medida no puede ser nula"+cadenaF, "error");
        return false;
    }



    /*para obtner los registros de las especies q son ingresadas directamente al grupo*/
    var tableAux = $("#tabla_controlc_aux tbody");
    inicialAux = 1;
    finalAux = 0;
    datosDAux = '';
    cadena2F = '';
    tableAux.find('tr').each(function(i) {
        
        var dataAux = $(this).find("td").find("input");
        var dataTAux = $(this).find("td").find("textarea");

        if ($(dataAux).eq(0).val() == ""){
           cadena2F += "fecha nula<br>";
        }
        if ($(dataAux).eq(1).val() == ""){
        $('#modalLoadin').hide();
           cadena2F += "numero pIntura nulo<br>";
        }

        datosDAux += '{';
        datosDAux += ' "fecha_medida":"' + $(dataAux).eq(0).val() + '",';
        datosDAux += ' "num_pintura":"' + $(dataAux).eq(1).val() + '",';
        datosDAux += ' "control_crecimiento_id":"' + $("#control_crecimiento_id").val() + '",';
        datosDAux += ' "estado_ingreso":1,';
        datosDAux += ' "fecha_ingreso_tort":"' + $(dataAux).eq(0).val() + '",';

        if ($(dataAux).eq(2).val() == "") datosDAux += ' "num_hierro":null,';
        else datosDAux += ' "num_hierro":"' + $(dataAux).eq(2).val() + '",';
        if ($(dataAux).eq(3).val() == "") datosDAux += ' "num_pit":null,';
        else datosDAux += ' "num_pit":"' + $(dataAux).eq(3).val() + '",';
        if ($(dataAux).eq(4).val() == "") datosDAux += ' "largo_curvo":null,';
        else datosDAux += ' "largo_curvo":"' + $(dataAux).eq(4).val() + '",';
        if ($(dataAux).eq(5).val() == "") datosDAux += ' "ancho_curvo":null,';
        else datosDAux += ' "ancho_curvo":"' + $(dataAux).eq(5).val() + '",';
        if ($(dataAux).eq(6).val() == "") datosDAux += ' "largo_plastron":null,';
        else datosDAux += ' "largo_plastron":"' + $(dataAux).eq(6).val() + '",';
        if ($(dataAux).eq(7).val() == "") datosDAux += ' "peso":null,';
        else datosDAux += ' "peso":"' + $(dataAux).eq(7).val() + '",';
        if ($(dataAux).eq(8).is(':checked')) {
            datosDAux += ' "muerta":"1",';
            datosDAux += ' "fecha_muerte_tort":"' + $(dataAux).eq(0).val() + '",';
        } else {
            datosDAux += ' "muerta":null,';
        }
        if ($(dataAux).eq(9).is(':checked')) {
            datosDAux += ' "repatriada":"1",';
            datosDAux += ' "fecha_repatriacion":"' + $("#fecha_repatria").val() + '",';
            datosDAux += ' "sitio_repatriacion":"' + $("#SsitioCC").val() + '",';
        } else {
            datosDAux += ' "repatriada":null,';
            datosDAux += ' "fecha_repatriacion":null,';
            datosDAux += ' "sitio_repatriacion":null,';
        }

        datosDAux += ' "observacion":"' + $(dataTAux).eq(0).val() + '"';
        datosDAux += '},';
    });

    if(cadena2F != ""){
        $('#modalLoadin').hide();
        swal("", cadena2F, "error");
        return false;
    }

    datosD+= datosDAux;

    datosD = datosD.substring(0, datosD.length - 1);

    datosC += '"det_control_crecimiento_id":[' + datosD + ']}';
    console.log(cabecera);
    console.log(datosC);
    dj_url = 'spncontrolcrecimientogalapaguitos';
    $.ajax({
        url: "update_General_mediciones",
        type: 'post',
        cache: 'false',
        data: {
            "dj_url": dj_url,
            "idtabla": cabecera,
            "data": JSON.stringify(datosC)
        },
        dataType: "json",
        async: false,
        success: function(data2) {
            if (data2.id == undefined) {
                $('#modalLoadin').hide();
                swal("", "Error al Actualizar el registro", "error");
                for(i=0; i<data2["det_control_crecimiento_id"].length; i++){
                    console.log(data2.det_control_crecimiento_id[i]);
                }
                console.log("idtabla---->" + cabecera + "--->" + "spncontrolcrecimientogalapaguitos" + "Error---> UpdateMedicionesParametros");
            } else {
                $('#modalLoadin').hide();
                swal("", "Registros Actualizdos con exito", "success");
                $("#bodytabla_controlc_aux").html("");
                buscarMedicionesParametros();
            }
        },
        error: function(data2) {
            $('#modalLoadin').hide();
            swal("", "Error al Actualizar el registro", "error");
            console.log("idtabla---->" + cabecera + "--->" + "data---->" + "spncontrolcrecimientogalapaguitos" + "Error---> UpdateMedicionesParametros");
        },
    });

}

/*add new tr a la tabla de control de crecimiento*/
$('#addNewTortuTablaCC').on('click', function() {

    mes = $("#SmedicionCC").val()
    if (mes < 10) {
        mes = '0' + $("#SmedicionCC").val();
    }
    fechaMR = $("#SanioCC").val() + '-' + mes + '-01';
    console.log(fechaMR);

    tabla = '';
    tabla += "<tr>";
    tabla += "<td><input name='txtfecha[]' type='date' style='width:100px; font-size: 10px;height: 205x;' value='" + fechaMR + "'/></td>";
    tabla += '<td><input class="input" name="txtpint[]" type="text" style="width: 50px;height:25px;text-align:center;" value="" onkeypress="return isNumberKey(event);" autocomplete="off"></td>';
    tabla += '<td><input class="input" autocomplete="off" name="txthierro[]" type="text" style="width: 50px;text-align:center;height:25px;" value="" onkeypress="return isNumberKey(event);"></td>';
    tabla += '<td><input class="input" autocomplete="off" name="txtpit[]" type="text" style="width: 100px;text-align:center;height:25px;" value="" onkeypress="return isNumberKey(event);"></td>';;
    tabla += '<td><input class="input cajaNumero" autocomplete="off" name="txtlargoc[]" type="text" style="text-align:center;" value="22.00" onkeypress="return isNumberKey(event);"></td>';
    tabla += '<td><input class="input cajaNumero" autocomplete="off" name="txtanchoc[]" type="text" style="text-align:center;" value="" onkeypress="return isNumberKey(event);"></td>';
    tabla += '<td><input class="input cajaNumero" autocomplete="off" name="txtlplastron[]" type="text" style="text-align:center;" value="" onkeypress="return isNumberKey(event);"></td>';
    tabla += '<td><input class="input cajaNumero" autocomplete="off" name="txtpeso[]" type="text" style="text-align:center;" value="" onkeypress="return isNumberKey(event);"></td>'
    tabla += '<td><textarea class="input" id="comentario_0" style="width:150px;"></textarea></td>';
    tabla += '<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Muerta&nbsp;&nbsp;<input type="checkbox" name="check1" value=""><br>Repatriada&nbsp;&nbsp;<input type="checkbox" name="check1" value=""></td>';
    tabla += "<td align='center'><a class='delete'><i style='font-size: 20px;cursor: pointer;' class='fa fa-trash text-green'></i></a></td>";
    tabla += "</tr>";

    $('#tabla_controlc_aux tbody').append(tabla);
    $('#tabla_controlc_aux tbody tr:last input').val('');
    //se remueve la clase disabled
    $('#tabla_controlc_aux tbody tr:last td').removeClass('disabled-select');
});

// Delete row on click in the table
$('#tabla_controlc_aux').on('click', '.delete', function(e) {
    console.log("este")
    var lenRow = $('#tabla_controlc_aux tbody tr').length;
    $(this).parents('tr').remove();
});

/*iniciar año select*/
function iniciaYears(select) {
    currentYear = (new Date).getFullYear();
    option = '';
    for (i = 2000; i <= currentYear + 1; i++) {
        option += '<option value="' + i + '" ' + select + '>' + i + '</option>';
    }
    $("#" + select).append(option);
    $("#" + select).addClass("select2");
    $("#" + select).select2();
    $("#" + select).val(currentYear).trigger("change");
}

/*iniciar grupo de nacimineto select*/
function iniciarGruposYears(select) {
    console.log("** iniciarGruposYears **");
    currentYear = (new Date).getFullYear();
    ini = currentYear - 20;
    option = '';
    for (i = ini; i <= currentYear + 1; i++) {
        option += '<option value="' + i + '">' + i + '-' + (i + 1) + '</option>';
    }

    $("#" + select).append(option);
    $("#" + select).addClass("select2");
    $("#" + select).select2();
    $("#" + select).val(currentYear).trigger("change");
    $("#" + select).select2({
        sorter: data => data.sort((a, b) => a.text.localeCompare(b.text)),
    });
}


/*metodo para buscar datos del control de crecimineto segun el numero de pintura ingresado*/
function buscarControlCreceXpintura() {
    if ($("#SccrianzaBP").val() == "") {
        validaContenedorExt("content_control3", "Centro de Crianza Obligatorio");
        return 0;
    }

    if ($("#num_pinturaBP").val() == "") {
        validaContenedorExt("content_control3", "Numero de pintura Obligatorio");
        return 0;
    }

    datap = '';

    if ($("#SccrianzaBP").val() != "")
        datap = "centro_crianza_id__in=" + $("#SccrianzaBP").val() + "&";

    if ($("#SgnacimientoBP").val() != "")
        datap += "grupo_nacimiento__in=" + $("#SgnacimientoBP").val() + "&";

    if ($("#num_pinturaBP").val() != "")
        datap += "num_pintura=" + $("#num_pinturaBP").val() + "&";

    datap = datap.substring(0, datap.length - 1);

    cabecera1 = '<tr class="bg-blue" style="color:#fff; text-align: center; text-transform: uppercase;font-weight:bold;">';
    cabecera1 += '<td rowspan="2">#CAJA</td>';
    cabecera1 += '<td rowspan="2">#INCUBADORA</td>';
    cabecera1 += '<td colspan="4">PESO(g) DEL HUEVO AL INICIO Y AL SEGUNDO CAMBIO DE SUSTRATO</td>';
    cabecera1 += '</tr>';
    cabecera1 += '<tr class="bg-blue" style="color:#fff; text-align: center; text-transform: uppercase;font-weight:bold;">';
    cabecera1 += '<td >FECHA INICIAL</td>';
    cabecera1 += '<td >PESO</td>';
    cabecera1 += '<td >FECHA 2DO</td>';
    cabecera1 += '<td >PESO</td>';
    cabecera1 += '</tr>'

    tabla = '';

    $.ajax({
        url: "datos_huevopintura",
        type: "get",
        data: {
            "data": datap
        },
        dataType: "json",
        async: false,

        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
            } else {
                var old = JSON.stringify(data).replace(/null/g, '""'); //convert to JSON string
                var data = JSON.parse(old); //convert back to array
                if (data.length > 0) {
                    tabla += "<ul class='timeline'>";
                    tabla += "<li class='time-label'><span class='bg-red'>" + data[0].fecha_postura + "</span></li>";
                    tabla += "<li>";
                    tabla += "<i class='fa fa-sign-out bg-blue'></i>";
                    tabla += "<div class='timeline-item'>";
                    tabla += "<span class='time'><i class='fa fa-clock-o'></i></span>";
                    tabla += "<h3 class='timeline-header'><a>Ingreso Incubadora " + data[0].fecha_ingreso_inc + "</a></h3>";
                    tabla += "<div class='timeline-body'>";
                    tabla += "<div class='col-xs-2'>";
                    tabla += '<div class="square" align="center">';
                    tabla += '<div id="circle">';
                    tabla += '<div>';
                    tabla += '<table>';
                    tabla += '<tr><td>N&nbsp;&nbsp;</td><td>' + data[0].num_nido + '</td></tr>';
                    tabla += '<tr><td>H&nbsp;&nbsp;</td><td>' + data[0].num_huevo + '</td></tr>';
                    tabla += '<tr><td>&#x2640;&nbsp;&nbsp;</td><td>' + data[0].num_hembra + '</td></tr>';
                    tabla += '<tr><td>T&nbsp;&nbsp;</td><td>' + data[0].total_huevos + '</td></tr>';
                    tabla += '</table>';
                    tabla += '</div>';
                    tabla += '</div>';
                    tabla += '</div>';
                    tabla += "</div>";
                    tabla += "<div class='col-xs-10'>";
                    tabla += "<table class='table table-bordered' style='width: 100%;font-size:10px;font-weight:bold;'><thead>" + cabecera1 + "</thead><tbody><tr>";
                    tabla += "<td align='center'>" + data[0].num_caja + "</td>";
                    tabla += "<td align='center'>" + data[0].num_incubadora + "</td>";
                    tabla += "<td align='center'>" + data[0].fecha_ingreso_inc + "</td>";
                    tabla += "<td align='center'>" + data[0].peso_inicial + "</td>";
                    tabla += "<td align='center'>" + data[0].fecha_cambio_sustrato + "</td>";
                    tabla += "<td align='center'>" + data[0].peso_cambio + "</td>";
                    tabla += "</tr></tbody></table>";
                    tabla += data[0].observacion + "</div>";
                    tabla += "</div>" /*body*/
                    tabla += "</div>"; /*item*/
                    tabla += "</li>";
                    tabla += "</ul>";
                } else {
                    tabla = "No existe informacion";
                }

                $("#PopS" + id).popover({
                    html: true,
                    content: tabla
                });
            }
        },
        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
            //console.log( JSON.stringify(data));
        },
    });


    cabecera = '<tr class="bg-blue" style="color:#fff; text-align: center; text-transform: uppercase;font-weight:bold;">';
    cabecera += '<td >#PIT</td>';
    cabecera += '<td >LARGO CURVO</td>';
    cabecera += '<td >ANCHO CURVO</td>';
    cabecera += '<td >LARGO PLASTRON</td>';
    cabecera += '<td >PESO(g)</td>';
    cabecera += '</tr>'

    $.ajax({
        url: "data_controlcreceParam",
        type: "get",
        data: {
            "data": datap
        },
        dataType: "json",
        async: false,

        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
            } else {
                var old = JSON.stringify(data).replace(/null/g, '""'); //convert to JSON string
                var data = JSON.parse(old); //convert back to array
                if (data.length > 0) {
                    tabla += "<ul class='timeline'>";
                    categories = [];
                    largo_curvo = [];
                    ancho_curvo = [];
                    largo_plastron = [];
                    for (i = 0; i < data.length; i++) {
                        categories.push(data[i].anio + "-" + data[i].periodo);
                        des_poblacion = data[i].desc_poblacion;

                        if (data[i].largo_curvo == 0) largo_curvo.push(null);
                        else largo_curvo.push(parseInt(data[i].largo_curvo));
                        if (data[i].ancho_curvo == 0) ancho_curvo.push(null);
                        else ancho_curvo.push(parseInt(data[i].ancho_curvo));
                        if (data[i].largo_plastron == 0) largo_plastron.push(null);
                        else largo_plastron.push(parseInt(data[i].largo_plastron));

                        tabla += "<li class='time-label'><span class='bg-red'>" + data[i].fecha_medida + "</span></li>";
                        tabla += "<li>";
                        tabla += "<i class='fa fa-tachometer bg-blue'></i>";
                        tabla += "<div class='timeline-item'>";
                        tabla += "<span class='time'><i class='fa fa-clock-o'></i></span>";
                        tabla += "<h3 class='timeline-header'><a>Medicion " + (i + 1) + "</a></h3>";
                        tabla += "<div class='timeline-body'>"

                        tabla += "<table class='table table-bordered' style='width: 100%;font-size:10px;'>" + cabecera + "<tr>";
                        tabla += "<td align='center'>" + data[i].num_pit + "</td>";
                        tabla += "<td align='center'>" + data[i].largo_curvo + "</td>";
                        tabla += "<td align='center'>" + data[i].ancho_curvo + "</td>";
                        tabla += "<td align='center'>" + data[i].largo_plastron + "</td>";
                        tabla += "<td align='center'>" + data[i].peso + "</td>";
                        tabla += "</tr></table>";


                        tabla += data[i].observacion + "</div>"; /*body*/
                        tabla += "</div>";
                        tabla += "</li>";
                    }
                    tabla += "</ul>";

                    var highchartsOptions = Highcharts.setOptions(themeDataH);
                    chart = new Highcharts.Chart({
                        chart: {
                            renderTo: 'containerDH',
                            type: 'line'
                        },
                        title: {
                            text: 'Grafico de Mediciones de la Tortuga con numero de pIntura ' + $("#num_pinturaBP").val() + ''
                        },
                        subtitle: {
                            text: 'Poblacion: ' + des_poblacion + ''
                        },
                        xAxis: {
                            categories: categories
                        },
                        yAxis: {
                            title: {
                                text: 'Tamaño(cm)'
                            }
                        },
                        plotOptions: {
                            line: {
                                dataLabels: {
                                    enabled: true
                                },
                                enableMouseTracking: false
                            }
                        },
                        series: [{
                            name: 'Largo Curvo',
                            data: largo_curvo
                        }, {
                            name: 'Ancho Curva',
                            data: ancho_curvo
                        }, {
                            name: 'Largo Plastron',
                            data: largo_plastron
                        }]
                    });

                    var obj = {},
                        chart;
                    var cadena = [];
                    //chart = $('#containerDH').highcharts();
                    obj.svg = chart.getSVG();
                    obj.type = 'image/png';
                    obj.width = 800;
                    obj.async = true;


                    $.ajax({
                        type: 'post',
                        url: chart.options.exporting.url,
                        data: obj,
                        success: function(data) {
                            var exportUrl = this.url;
                            localStorage.setItem(container, exportUrl + data);
                            $("#urlPintura").val(data);
                            console.log(data);
                        },
                        error: function(request, error) {
                            console.log(arguments);
                            alert("Porfavor intenta otra vez en unos 15 segundos");
                        }
                    });

                } else {
                    tabla = "<div>No Existe informacion para este periodo </div>";
                }

                $("#contentCC").html("");
                $("#contentCC").append(tabla);
            }
        },
        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
            //console.log( JSON.stringify(data));
        },
    });
}

/**/
function IngresarDescGrap1(container) {
    var obj = {},
        chart;

    var cadena = [];
    chart = $('#' + container).highcharts();
    obj.svg = chart.getSVG();
    obj.type = 'image/png';
    obj.width = 800;
    obj.async = true;


    $.ajax({
        type: 'post',
        url: chart.options.exporting.url,
        data: obj,
        success: function(data) {
            var exportUrl = this.url;
            localStorage.setItem(container, exportUrl + data);
            alert("Grafico guardado con exito");
        },
        error: function(request, error) {
            console.log(arguments);
            alert("Porfavor intenta otra vez en unos 15 segundos");
        }
    });
}

/*funcion para generar los graficos del control de huevos*/
function graficoHuevosCentroCrianza() {
    datap = '';
    pos = 0;
    $.ajax({
        url: "data_huevosCentroCrianza",
        type: "get",
        data: {
            "data": datap
        },
        dataType: "json",
        async: false,

        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
            } else {
                var old = JSON.stringify(data).replace(/null/g, '""'); //convert to JSON string
                var data = JSON.parse(old); //convert back to array
                s1 = [0, 0, 0];
                s2 = [0, 0, 0];
                sc1 = [0, 0, 0];
                sc2 = [0, 0, 0];

                esp1 = [0, 0, 0];
                esp2 = [0, 0, 0];

                flo1 = [0, 0, 0];
                flo2 = [0, 0, 0];

                pin1 = [0, 0, 0];
                pin2 = [0, 0, 0];

                categories = [];

                gra_San = 0;
                gra_Sc = 0;
                gra_Esp = 0;
                gra_Flo = 0;
                gra_Pin = 0;

                nombre = '';
                nombre_aux = '';
                for (i = 0; i < data.length; i++) {

                    if (data[i].des.toUpperCase() == "C.C. FAUSTO LLERENA")
                        pos = 2;
                    if (data[i].des.toUpperCase() == "C.C. ARNALDO TUPIZA CHAMAIDAN")
                        pos = 1;
                    if (data[i].des.toUpperCase() == "C.C. DAVID RODRÍGUEZ")
                        pos = 0;

                    if (data[i].descripcion.toUpperCase() == "SANTIAGO") {
                        s1[pos] = (parseInt(data[i].total_huevos) - parseInt(data[i].huevos_sacados));
                        s2[pos] = data[i].huevos_sacados;

                        if (pos == 2) gra_San = parseInt(data[i].total_huevos);
                    }
                    if (data[i].descripcion.toUpperCase() == "SANTA CRUZ") {
                        sc1[pos] = (parseInt(data[i].total_huevos) - parseInt(data[i].huevos_sacados));
                        sc2[pos] = data[i].huevos_sacados;

                        if (pos == 2) gra_Sc = parseInt(data[i].total_huevos);
                    }
                    if (data[i].descripcion.toUpperCase() == "ESPAÑOLA") {
                        esp1[pos] = (parseInt(data[i].total_huevos) - parseInt(data[i].huevos_sacados));
                        esp2[pos] = data[i].huevos_sacados;

                        if (pos == 2) gra_Esp = parseInt(data[i].total_huevos);
                    }
                    if (data[i].descripcion.toUpperCase() == "FLOREANA") {
                        flo1[pos] = (parseInt(data[i].total_huevos) - parseInt(data[i].huevos_sacados));
                        flo2[pos] = data[i].huevos_sacados;

                        if (pos == 2) gra_Flo = parseInt(data[i].total_huevos);
                    }
                    if (data[i].descripcion.toUpperCase() == "PINZON") {
                        pin1[pos] = (parseInt(data[i].total_huevos) - parseInt(data[i].huevos_sacados));
                        pin2[pos] = data[i].huevos_sacados;

                        if (pos == 2) gra_Pin = parseInt(data[i].total_huevos);
                    }

                    categories.push(data[i].des);
                }

                categories = eliminateDuplicates(categories);
                console.log(categories);

                chart = new Highcharts.Chart({
                    chart: {
                        renderTo: 'container',
                        type: 'bar',

                    },
                    title: {
                        text: 'Total Huevos Ingresados y Malos por Centro de Crianza y Poblacion y Grupo 2019'
                    },

                    xAxis: {
                        categories: ["C.C. DAVID RODRÍGUEZ", "C.C. ARNALDO TUPIZA CHAMAIDAN", "C.C. FAUSTO LLERENA"]
                    },

                    yAxis: {
                        allowDecimals: false,
                        min: 0,
                        title: {
                            text: 'Numero de Huevos'
                        },
                        stackLabels: {
                            enabled: true,
                            style: {
                                fontWeight: 'bold',
                                color: ( // theme
                                    Highcharts.defaultOptions.title.style &&
                                    Highcharts.defaultOptions.title.style.color
                                ) || 'gray'
                            }
                        }
                    },

                    tooltip: {
                        formatter: function() {
                            return '<b>' + this.x + '</b><br/>' +
                                this.series.name + ': ' + this.y + '<br/>' +
                                'Total: ' + this.point.stackTotal;
                        }
                    },

                    plotOptions: {
                        series: {
                            stacking: 'normal',
                            dataLabels: {
                                enabled: true
                            }
                        }
                    },
                    series: [{
                        id: 'g1',
                        color: 'yellow',
                        name: "Santiago",
                        data: s1,
                        stack: "buena",
                        borderColor: 'green',
                        borderWidth: 4
                    }, {
                        linkedTo: 'g1',
                        color: 'yellow',
                        name: "Santiago",
                        data: s2,
                        stack: "mala",
                        borderColor: 'red',
                        borderWidth: 4
                    }, {
                        id: 'g2',
                        color: '#ffa500',
                        name: "Santa Cruz",
                        data: sc1,
                        stack: "buena",
                        borderColor: 'green',
                        borderWidth: 4
                    }, {
                        linkedTo: 'g2',
                        color: '#ffa500',
                        name: "Santa Cruz",
                        data: sc2,
                        stack: "mala",
                        borderWidth: 4,
                        borderColor: 'red'
                    }, {
                        id: 'g3',
                        color: '#75beff',
                        name: "Española",
                        data: esp1,
                        stack: "buena",
                        borderColor: 'green',
                        borderWidth: 4
                    }, {
                        linkedTo: 'g3',
                        color: '#75beff',
                        name: "Española",
                        data: esp2,
                        stack: "mala",
                        borderWidth: 4,
                        borderColor: 'red'
                    }, {
                        id: 'g4',
                        color: 'red',
                        name: "Floreana",
                        data: flo1,
                        stack: "buena",
                        borderColor: 'green',
                        borderWidth: 4
                    }, {
                        linkedTo: 'g4',
                        color: 'red',
                        name: "Floreana",
                        data: flo2,
                        stack: "mala",
                        borderWidth: 4,
                        borderColor: 'red'
                    }, {
                        id: 'g5',
                        color: 'grey',
                        name: "pinzon",
                        data: pin1,
                        stack: "buena",
                        borderColor: 'green',
                        borderWidth: 4
                    }, {
                        linkedTo: 'g5',
                        color: 'grey',
                        name: "pinzon",
                        data: pin2,
                        stack: "mala",
                        borderWidth: 4,
                        borderColor: 'red'
                    }]
                })

                chart.setTitle({
                    text: 'Total Huevos <span style="width:10px; background-color:green;color:white;">Ingresados</span> y <span style="width:10px; background-color:red;color:white;">Malos</span> por Centro de Crianza y Poblacion y Grupo 2019',
                    useHTML: true
                });

                // Radialize the colors
                Highcharts.setOptions({
                    colors: Highcharts.map(Highcharts.getOptions().colors, function(color) {
                        return {
                            radialGradient: {
                                cx: 0.5,
                                cy: 0.3,
                                r: 0.7
                            },
                            stops: [
                                [0, color],
                                [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
                            ]
                        };
                    })
                });


                Highcharts.chart('container2', {
                    chart: {
                        type: 'pie',
                        options3d: {
                            enabled: true,
                            alpha: 45
                        }
                    },
                    title: {
                        text: 'Total Huevos en el Centro de Crianza Santa Cruz, Grupo 2019'
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.y}</b>'
                    },
                    plotOptions: {
                        pie: {
                            innerSize: 100,
                            depth: 45,
                            dataLabels: {
                                enabled: true,
                                format: '<b>{point.name}({point.y})</b>: {point.percentage:.1f} %',
                                connectorColor: 'silver'
                            }
                        }
                    },
                    series: [{
                        name: 'Share',
                        data: [{
                                name: 'Santiago',
                                y: gra_San,
                                color: 'yellow',
                            },
                            {
                                name: 'Santa Cruz',
                                y: gra_Sc,
                                color: '#ffa500'
                            },
                            {
                                name: 'Española',
                                y: gra_Esp,
                                color: '#75beff'
                            },
                            {
                                name: 'Floreana',
                                y: gra_Flo,
                                color: 'red'
                            },
                            {
                                name: 'Pinzon',
                                y: gra_Pin,
                                color: 'grey'
                            },
                        ]
                    }]
                })
            }
        },
        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
            //console.log( JSON.stringify(data));
        },
    });
}

/*generar graficos de control de huevos segun el centro de crianza*/
function grafico2() {

    datap = 'centro_crianza_id__in=dce2dc45-a3fb-4e95-a97c-dfd8cc0a77d1';
    $.ajax({
        url: "data_huevosCentroCrianzaDetalles",
        type: "get",
        data: {
            "data": datap
        },
        dataType: "json",
        async: false,

        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
            } else {
                var old = JSON.stringify(data).replace(/null/g, '""'); //convert to JSON string
                var data = JSON.parse(old); //convert back to array
                s1 = [0, 0, 0, 0, 0, 0]; /*muertas*/
                s2 = [0, 0, 0, 0, 0, 0]; /**repatriada*/
                s3 = [0, 0, 0, 0, 0, 0]; /**ingresda*/
                s4 = [0, 0, 0, 0, 0, 0];
                s5 = [0, 0, 0, 0, 0, 0];
                gra_San = 0;
                gra_Sc = 0;
                gra_Esp = 0;
                gra_Flo = 0;
                gra_Pin = 0;
                gra_Enc = 0;

                nombre = '';
                nombre_aux = '';
                for (i = 0; i < data.length; i++) {

                    if (data[i].des_poblacion.toUpperCase() == "ESPAÑOLA")
                        pos = 0;
                    if (data[i].des_poblacion.toUpperCase() == "FLOREANA")
                        pos = 1;
                    if (data[i].des_poblacion.toUpperCase() == "PINZON")
                        pos = 2;
                    if (data[i].des_poblacion.toUpperCase() == "SANTA CRUZ")
                        pos = 3;
                    if (data[i].des_poblacion.toUpperCase() == "SANTIAGO")
                        pos = 4;
                    if (data[i].des_poblacion.toUpperCase() == "ENCONTRADAS") {
                        pos = 5;
                    }

                    if (data[i].muerta == "")
                        data[i].muerta = 0;
                    if (data[i].repatriada == "")
                        data[i].repatriada = 0;

                    console.log(data[i].con_pintura + "-" + data[i].muerta)
                    total = (parseInt(data[i].con_pintura) - parseInt(data[i].muerta))

                    if (pos != 5) {
                        s1[pos] = (data[i].muerta);
                        s2[pos] = (data[i].repatriada);
                        s3[pos] = (data[i].ingresada);
                        s4[pos] = (parseInt(data[i].con_pintura) - parseInt(data[i].muerta) - parseInt(data[i].repatriada));
                    } else {
                        s1[pos] = (data[i].muerta);
                        s2[pos] = (0);
                        s3[pos] = (0);
                        s4[pos] = (parseInt(data[i].con_pintura) - parseInt(data[i].muerta));
                    }
                }

                const color = {
                    ESPAÑOLA: '#75beff',
                    FLOREANA: 'red',
                    PINZON: 'grey',
                    SANTA_CRUZ: '#ffa500',
                    SANTIAGO: '#c3c30d',
                    ENCONTRADAS: 'black'
                }

                chart = new Highcharts.Chart({
                    chart: {
                        renderTo: 'container3',
                        type: 'column',
                        options3d: {
                            enabled: true,
                            alpha: 0,
                            beta: -25,
                            depth: 40,
                            viewDistance: 25
                        }
                    },
                    title: {
                        text: 'Total Tortugas Repatriados y Muertos en el Centro de Crianza Santa Cruz, Grupo 2019'
                    },
                    xAxis: {
                        categories: ['ESPAÑOLA', 'FLOREANA', 'PINZON', 'SANTA_CRUZ', 'SANTIAGO', 'ENCONTRADAS'],
                        labels: {
                            formatter() {
                                return `<span style="font-weight:bold;color: ${color[this.value]}">${this.value}</span>`
                            }
                        }
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Total Huevos Incubados'
                        },
                        stackLabels: {
                            enabled: true,
                            style: {
                                fontWeight: 'bold',
                                color: ( // theme
                                    Highcharts.defaultOptions.title.style &&
                                    Highcharts.defaultOptions.title.style.color
                                ) || 'gray'
                            }
                        }
                    },
                    legend: {

                        backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || 'white',
                        borderColor: '#CCC',
                        borderWidth: 1,
                        shadow: false
                    },
                    tooltip: {
                        headerFormat: '<b>{point.x}</b><br/>',
                        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
                    },
                    plotOptions: {
                        column: {
                            stacking: 'normal',
                            dataLabels: {
                                enabled: true
                            }
                        }
                    },
                    series: [{
                        name: 'Muertas',
                        data: s1
                    }, {
                        name: 'Repatriadas',
                        data: s2
                    }, {
                        name: 'Ingresadas',
                        data: s3
                    }, {
                        name: 'En Corral',
                        data: s4
                    }]
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

/*eliminar dupplicados de un array*/
function eliminateDuplicates(arr) {
    var i,
        len = arr.length,
        out = [],
        obj = {};

    for (i = 0; i < len; i++) {
        obj[arr[i]] = 0;
    }
    for (i in obj) {
        out.push(i);
    }
    return out;
}


/*metodo para buscar datos en tabla funcionario segun el parametro que se envie cedula/nombre /apellido*/
function buscarMedicionesParametrosVer() {
    data = '';

    if ($("#SccrianzaCCV").val() != "")
        data = "centro_crianza_id__in=" + $("#SccrianzaCCV").val() + "&";

    if ($("#SgnacimientoCCV").val() != "")
        data += "grupo_nacimiento__in=" + $("#SgnacimientoCCV").val() + "&";

    if ($("#SpoblacionCCV").val() != "")
        data += "poblacion_id__id__in=" + $("#SpoblacionCCV").val() + "&";
    else
        data += "";

    if ($("#SmedicionCCV").val() != "")
        data += "periodo__in=" + $("#SmedicionCCV").val() + "&";

    if ($("#SanioCCV").val() != "")
        data += "anio__in=" + $("#SanioCCV").val() + "&";

    data = data.substring(0, data.length - 1);

    checkM = '';
    checkR = '';
    cursor = '';
    claseEstado = '';

    $.ajax({
        url: "data_medicionesParam",
        type: "get",
        data: {
            "data": data
        },
        dataType: "json",

        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
            } else {
                var old = JSON.stringify(data).replace(/null/g, '""'); //convert to JSON string
                var data = JSON.parse(old); //convert back to array
                tabla = "";
                if (data.length > 0) {
                    for (i = 0; i < data.length; i++) {
                        for (j = 0; j < data[i].det_control_crecimiento_id.length; j++) {

                            if (data[i].det_control_crecimiento_id[j].estado_ingreso == 1) {
                                claseEstado = 'IngresoFuera';
                            } else {
                                claseEstado = '';
                            }

                            color = data[i].poblacion_id.color;

                            if (data[i].det_control_crecimiento_id[j].estado == 'A') {
                                tabla += "<tr>";
                                tabla += "<td style='background-color:" + color + "'></td>";
                                tabla += "<td>" + data[i].det_control_crecimiento_id[j].fecha_medida + "</td>";
                                tabla += "<td onclick='prueba(\"PopSM" + j + "\"," + data[i].det_control_crecimiento_id[j].num_pintura + ",\"" + $("#SccrianzaCCV").val() + "\",\"" + $("#SgnacimientoCCV").val() + "\",\"" + $("#SpoblacionCCV").val() + "\");' class='PopS " + claseEstado + "' data-toggle='popover' data-trigger='click' data-placement='right' data-container='body' data-html='true' id='PopSM" + j + "' >" + data[i].det_control_crecimiento_id[j].num_pintura + "</td>";
                                tabla += "<td align='center'>" + data[i].det_control_crecimiento_id[j].num_hierro + "</td>";
                                tabla += "<td align='center'>" + data[i].det_control_crecimiento_id[j].num_pit + "</td>";
                                tabla += "<td align='center'>" + data[i].det_control_crecimiento_id[j].largo_curvo + "</td>";
                                tabla += "<td align='center'>" + data[i].det_control_crecimiento_id[j].ancho_curvo + "</td>";
                                tabla += "<td align='center'>" + data[i].det_control_crecimiento_id[j].largo_plastron + "</td>";
                                tabla += "<td align='center'>" + data[i].det_control_crecimiento_id[j].peso + "</td>";
                                tabla += "<td>" + data[i].det_control_crecimiento_id[j].observacion + "</td>";
                                tabla += "</tr>";
                            }
                        }
                    }
                } else {
                    tabla = "<td align='center' colspan='10'>No Existe informacion para este periodo</td>";
                }

                $('#tabla_controlc_ver').dataTable().fnClearTable();
                $('#tabla_controlc_ver').dataTable().fnDestroy();

                $("#bodytabla_controlc_ver").html("");
                $("#bodytabla_controlc_ver").append(tabla);

                var table = $('#tabla_controlc_ver').DataTable();
            }
        },
        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
            //console.log( JSON.stringify(data));
        },
    });
}


/*metodo para datos de los huevos segun los parametros ingresados*/
function buscarDetalleHuevosPeriodoParametros() {

    if ($("#SccrianzaCCP").val() == "") {
        validaContenedorExt("content_control2", "Centro de Crianza Obligatorio");
        return 0;
    }

    if ($("#FdesdeParamCCP").val() == "") {
        validaContenedorExt("content_control2", "Periodo inicio obligatorio");
        return 0;
    }

    if ($("#FhastaParamCCP").val() == "") {
        validaContenedorExt("content_control2", "Periodo fin obligatorio");
        return 0;
    }

    data = '';

    totalM = 0;
    totalR = 0;
    totalI = 0;
    totalC = 0;
    totalC2 = 0;
    totalCAux = 0;
    tabla = "";
    tablaC = "";
    perido_act = '';
    perido_aux = 'aaaa';
    count = 1;
    if ($("#SccrianzaCCP").val() != "")
        data = "centro_crianza_id__in=" + $("#SccrianzaCCP").val() + "&";

    if ($("#SgnacimientoCCP").val() != "")
        data += "grupo_nacimiento__in=" + $("#SgnacimientoCCP").val() + "&";


    desde = $("#FdesdeParamCCP").val();
    hasta = $("#FhastaParamCCP").val();

    desdeArr = desde.split('-');
    hastaArr = hasta.split('-');

    fdesde = desdeArr[1] + "-" + desdeArr[0] + "-01";
    fhasta = hastaArr[1] + "-" + hastaArr[0] + "-01";
    data += "periodo_medida__range=" + fdesde + "," + fhasta + "&";

    data = data.substring(0, data.length - 1);

    ultimo_periodo = '';

    cont_aux = 0;

    $.ajax({
        url: "data_huevosCentroCrianzaPeriodoDetalles",
        type: "get",
        data: {
            "data": data
        },
        dataType: "json",
        async: true,

        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
            } else {
                if (data.length > 0) {
                    for (i = 0; i < data.length; i++) {
                        totalC += data[i].con_pintura
                        console.log(totalC + '****')
                        fecha1 = data[i].fecha_medida + '-01';

                        if (fecha1 == data[i].periodo_medida) {
                            if (count == 1)
                                totalCAux = totalC;

                            if (data[i].muerta == null) data[i].muerta = 0;
                            if (data[i].repatriada == null) data[i].repatriada = 0;
                            if (data[i].ingresada == null) data[i].ingresada = 0;
                            if (data[i].con_pintura == null) data[i].con_pintura = 0;

                            totalM += data[i].muerta;
                            totalR += data[i].repatriada;
                            if (i == 0) {
                                totalI += data[i].ingresada;
                                ingreso_aux = totalI;
                            } else {
                                totalI += (data[i].ingresada - data[cont_aux].ingresada);
                                ingreso_aux = (data[i].ingresada - data[cont_aux].ingresada);
                            }

                            if (i == 0) {
                                totalCAux = totalCAux;
                            } else {
                                totalCAux = totalCAux - data[i].repatriada - data[i].muerta + ingreso_aux;
                            }
                            console.log(totalC);
                            //totalC2 = data[i].con_pintura;
                            totalC2 = totalCAux;

                            tabla += "<tr>";
                            tabla += "<td align='center'>" + data[i].fecha_medida + "</td>";
                            tabla += "<td align='center'>" + totalCAux + "</td>";
                            tabla += "<td align='center'>" + data[i].muerta + "</td>";
                            tabla += "<td align='center'>" + data[i].repatriada + "</td>";
                            tabla += "<td align='center'>" + ingreso_aux + "</td>";
                            tabla += "</tr>";
                            count++;
                            cont_aux = i;
                            ultimo_periodo = data[i].fecha_medida;
                        }
                        perido_aux = perido_act;
                        ultimo_periodo = data[i].fecha_medida;
                    }

                    var defaultOptions = {
                        // your options
                    };

                    var highchartsOptions = Highcharts.setOptions(Highcharts.theme);
                    chart = new Highcharts.Chart({
                        chart: {
                            renderTo: 'containerCCP',
                            plotBackgroundColor: null,
                            plotBorderWidth: null,
                            plotShadow: false,
                            type: 'pie'
                        },
                        title: {
                            text: 'Resumen de Tortugas en corral, muertas, ingresadas y repatriadas'
                        },
                        tooltip: {
                            pointFormat: '{series.name}: <b>{point.y}</b>'
                        },
                        plotOptions: {
                            pie: {
                                allowPointSelect: true,
                                cursor: 'pointer',
                                dataLabels: {
                                    enabled: true,
                                    format: '<b>{point.name}({point.y})</b>: {point.percentage:.1f} %',
                                    connectorColor: 'silver'
                                }
                            }
                        },
                        series: [{
                            name: '',
                            data: [{
                                    name: 'En Corral',
                                    y: totalC2
                                },
                                {
                                    name: 'Muertas',
                                    y: totalM
                                },
                                {
                                    name: 'Repatriadas',
                                    y: totalR
                                },
                                /*{ name: 'Ingresadas', y: totalI }*/
                            ]
                        }]
                    })

                    tablaC += "<table id='tabla_rsumen_tor' class='table table-bordered' style='width: 100%;font-size:10px;'><thead><tr>";
                    tablaC += "<td class='bg-blue' style='color:#fff;' align='center'>Periodo</td>";
                    tablaC += "<td class='bg-blue' style='color:#fff;' align='center'>En corral</td>";
                    tablaC += "<td class='bg-blue' style='color:#fff;' align='center'>Muertas</td>";
                    tablaC += "<td class='bg-blue' style='color:#fff;' align='center'>Repatriadas</td>";
                    tablaC += "<td class='bg-blue' style='color:#fff;' align='center'>Ingresadas</td>";
                    tablaC += "</tr></thead><tbody>" + tabla + "</tbody></table>";

                    $("#tabla_detalle_tor").html("");
                    $("#tabla_detalle_tor").html(tablaC);

                    var table = $('#tabla_rsumen_tor').dataTable();

                }
            }

            if ($("#SccrianzaCCP").val() != "")
                data2 = "centro_crianza_id__in=" + $("#SccrianzaCCP").val() + "&";

            if ($("#SgnacimientoCCP").val() != "")
                data2 += "grupo_nacimiento__in=" + $("#SgnacimientoCCP").val() + "&";

            hasta2 = ultimo_periodo

            hastaArr2 = hasta2.split('-');
            data2 += "periodo__in=" + hastaArr2[1] + "&";
            data2 += "anio__in=" + hastaArr2[0] + "&";

            fhasta_aux = hastaArr2[1] + '-' + hastaArr2[0]

            data2 = data2.substring(0, data2.length - 1);

            console.log(data2);

            $.ajax({
                url: "data_medicionesParam",
                type: "get",
                data: {
                    "data": data2
                },
                dataType: "json",

                success: function(data) {
                    if (data['non_field_errors']) {
                        console.log(data['non_field_errors']);
                    } else {
                        var old = JSON.stringify(data).replace(/null/g, '""'); //convert to JSON string
                        var data = JSON.parse(old); //convert back to array
                        tabla = "";
                        tablaM = "";
                        tablaI = "";
                        tablaR = "";
                        tablaF = "";
                        if (data.length > 0) {
                            for (i = 0; i < data.length; i++) {
                                for (j = 0; j < data[i].det_control_crecimiento_id.length; j++) {
                                    fecha_medida_aux = data[i].det_control_crecimiento_id[j].fecha_medida;
                                    fecha_medida_auxArray = fecha_medida_aux.split('-');
                                    fmedidaAux = fecha_medida_auxArray[0] + '-' + fecha_medida_auxArray[1]
                                    fmedidaAux2 = fecha_medida_auxArray[1] + '-' + fecha_medida_auxArray[0]
                                    if (data[i].det_control_crecimiento_id[j].estado == 'A') {
                                        if ((data[i].det_control_crecimiento_id[j].muerta == 1)) {
                                            tablaM += "<tr>";
                                            tablaM += "<td style='background-color:" + data[i].poblacion_id.color + "'></td>";
                                            tablaM += "<td>" + data[i].det_control_crecimiento_id[j].fecha_medida + "</td>";
                                            tablaM += "<td onclick='prueba(\"PopSP1" + j + "\"," + data[i].det_control_crecimiento_id[j].num_pintura + ",\"" + $("#SccrianzaCCP").val() + "\",\"" + $("#SgnacimientoCCP").val() + "\",\"" + data[i].poblacion_id.id + "\");' class='PopS' data-toggle='popover' data-trigger='click' data-placement='right' data-container='body' data-html='true' id='PopSP1" + j + "' >" + data[i].det_control_crecimiento_id[j].num_pintura + "</td>";
                                            tablaM += "<td>" + data[i].det_control_crecimiento_id[j].observacion + "</td>";
                                            tablaM += "</tr>";
                                        } else if ((data[i].det_control_crecimiento_id[j].repatriada == 1)) {
                                            tablaR += "<tr>";
                                            tablaR += "<td style='background-color:" + data[i].poblacion_id.color + "'></td>";
                                            tablaR += "<td>" + data[i].det_control_crecimiento_id[j].fecha_medida + "</td>";
                                            tablaR += "<td onclick='prueba(\"PopSP2" + j + "\"," + data[i].det_control_crecimiento_id[j].num_pintura + ",\"" + $("#SccrianzaCCP").val() + "\",\"" + $("#SgnacimientoCCP").val() + "\",\"" + data[i].poblacion_id.id + "\");' class='PopS' data-toggle='popover' data-trigger='click' data-placement='right' data-container='body' data-html='true' id='PopSP2" + j + "' >" + data[i].det_control_crecimiento_id[j].num_pintura + "</td>";
                                            tablaR += "<td>" + data[i].det_control_crecimiento_id[j].observacion + "</td>";
                                            tablaR += "</tr>";
                                        } else if ((data[i].det_control_crecimiento_id[j].estado_ingreso == 1) && (fmedidaAux2 == fhasta_aux)) {
                                            tablaI += "<tr>";
                                            tablaI += "<td style='background-color:" + data[i].poblacion_id.color + "'></td>";
                                            tablaI += "<td>" + data[i].det_control_crecimiento_id[j].fecha_medida + "</td>";
                                            tablaI += "<td onclick='prueba(\"PopSP3" + j + "\"," + data[i].det_control_crecimiento_id[j].num_pintura + ",\"" + $("#SccrianzaCCP").val() + "\",\"" + $("#SgnacimientoCCP").val() + "\",\"" + data[i].poblacion_id.id + "\");' class='PopS' data-toggle='popover' data-trigger='click' data-placement='right' data-container='body' data-html='true' id='PopSP3" + j + "' >" + data[i].det_control_crecimiento_id[j].num_pintura + "</td>";
                                            tablaI += "<td>" + data[i].det_control_crecimiento_id[j].observacion + "</td>";
                                            tablaI += "</tr>";
                                        } else {
                                            if ((fmedidaAux2 == fhasta_aux) || (data[i].det_control_crecimiento_id[j].muerta != 1)) {
                                                tablaF += "<tr>";
                                                tablaF += "<td style='background-color:" + data[i].poblacion_id.color + "'></td>";
                                                tablaF += "<td>" + data[i].det_control_crecimiento_id[j].fecha_medida + "</td>";
                                                tablaF += "<td onclick='prueba(\"PopSP4" + j + "\"," + data[i].det_control_crecimiento_id[j].num_pintura + ",\"" + $("#SccrianzaCCP").val() + "\",\"" + $("#SgnacimientoCCP").val() + "\",\"" + data[i].poblacion_id.id + "\");' class='PopS' data-toggle='popover' data-trigger='click' data-placement='right' data-container='body' data-html='true' id='PopSP4" + j + "' >" + data[i].det_control_crecimiento_id[j].num_pintura + "</td>";
                                                tablaF += "<td>" + data[i].det_control_crecimiento_id[j].observacion + "</td>";
                                                tablaF += "</tr>";
                                            }
                                        }

                                    }
                                }
                            }
                        }

                        $('#tabla_controlc_corral').dataTable().fnClearTable();
                        $('#tabla_controlc_corral').dataTable().fnDestroy();

                        $("#bodytabla_controlc_corral").html("");
                        $("#bodytabla_controlc_corral").append(tablaF);

                        var table = $('#tabla_controlc_corral').DataTable();

                        $('#tabla_controlc_ing').dataTable().fnClearTable();
                        $('#tabla_controlc_ing').dataTable().fnDestroy();

                        $("#bodytabla_controlc_ing").html("");
                        $("#bodytabla_controlc_ing").append(tablaI);

                        var table = $('#tabla_controlc_ing').DataTable();

                        $('#tabla_controlc_muerta').dataTable().fnClearTable();
                        $('#tabla_controlc_muerta').dataTable().fnDestroy();

                        $("#bodytabla_controlc_muerta").html("");
                        $("#bodytabla_controlc_muerta").append(tablaM);

                        var table = $('#tabla_controlc_muerta').DataTable();

                        $('#tabla_controlc_repa').dataTable().fnClearTable();
                        $('#tabla_controlc_repa').dataTable().fnDestroy();

                        $("#bodytabla_controlc_repa").html("");
                        $("#bodytabla_controlc_repa").append(tablaR);

                        var table = $('#tabla_controlc_repa').DataTable();
                    }
                },
                error: function(data) {
                    swal("", "Error: " + JSON.stringify(data), "error");
                    console.log(JSON.stringify(data));
                    //console.log( JSON.stringify(data));
                },
            });




        },
        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
            //console.log( JSON.stringify(data));
        },
    });
}

/*control de crecimiento tortugas encontradas*/
$('#addNewTortuTablaCCE').on('click', function() {
    tabla = '';
    tabla += "<tr>";
    tabla += '<td><input name="txtfecha[]" type="date" style="width:100px; font-size: 10px;height: 25px;" value=""></td>';
    tabla += '<td><input class="input" autocomplete="off" name="txtpint[]" type="text" style="width: 50px;text-align:center;height: 25px;" value="" onkeypress="return isNumberKey(event);"></td>';
    tabla += '<td><input class="input" autocomplete="off" name="txthierro[]" type="text" style="width: 50px;text-align:center;height: 25px;" value="" onkeypress="return isNumberKey(event);"></td>';
    tabla += '<td><input class="input" autocomplete="off" name="txtpit[]" type="text" style="width: 100px;text-align:center;height: 25px;" value="" onkeypress="return isNumberKey(event);"></td>';;
    tabla += '<td><input class="input cajaNumero" autocomplete="off" name="txtlargoc[]" type="text" style="width: 50px;text-align:center;" value="" onkeypress="return isNumberKey(event);"></td>';
    tabla += '<td><input class="input cajaNumero" autocomplete="off" name="txtanchoc[]" type="text" style="width: 50px;text-align:center;" value="" onkeypress="return isNumberKey(event);"></td>';
    tabla += '<td><input class="input cajaNumero" autocomplete="off" name="txtlplastron[]" type="text" style="width: 50px;text-align:center;" value="" onkeypress="return isNumberKey(event);"></td>';
    tabla += '<td><input class="input cajaNumero" autocomplete="off" name="txtpeso[]" type="text" style="width: 50px;text-align:center;" value="" onkeypress="return isNumberKey(event);"></td>'
    tabla += '<td><textarea class="input" id="comentario_0" style="width:150px;"></textarea></td>';
    tabla += '<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Muerta&nbsp;&nbsp;<input type="checkbox" name="check1" value=""><br>Repatriada&nbsp;&nbsp;<input type="checkbox" name="check1" value=""></td>';
    tabla += "<td align='center'><a class='delete'><i style='font-size: 20px;cursor: pointer;' class='fa fa-trash text-green'></i></a></td>";
    tabla += "</tr>";

    //alert(lastRow);
    $('#tabla_controlcE_aux tbody').append(tabla);
    $('#tabla_controlcE_aux tbody tr:last input').val('');
    //se remueve la clase disabled
    $('#tabla_controlcE_aux tbody tr:last td').removeClass('disabled-select');
});

// Delete row on click in the table
$('#tabla_controlcE_aux').on('click', '.delete', function(e) {
    console.log("este")
    var lenRow = $('#tabla_controlcE_aux tbody tr').length;
    $(this).parents('tr').remove();
});


/*metodo para buscar datos en tabla de control de crecimineto segun los parametros ingresados*/
function buscarMedicionesParametrosEnc() {
    data = '';

    if ($("#SccrianzaCCE").val() != "")
        data = "centro_crianza_id__in=" + $("#SccrianzaCCE").val() + "&";

    if ($("#SgnacimientoCCE").val() != "")
        data += "grupo_nacimiento__in=" + $("#SgnacimientoCCE").val() + "&";

    if ($("#SpoblacionCCE").val() != "")
        data += "poblacion_id__id__in=" + $("#SpoblacionCCE").val() + "&";

    if ($("#SmedicionCCE").val() != "")
        data += "periodo__in=" + $("#SmedicionCCE").val() + "&";

    if ($("#SanioCCE").val() != "")
        data += "anio__in=" + $("#SanioCCE").val() + "&";

    data = data.substring(0, data.length - 1);

    console.log(data);

    checkM = '';
    checkR = '';
    cursor = '';
    claseEstado = '';

    $.ajax({
        url: "data_medicionesParam",
        type: "get",
        data: {
            "data": data
        },
        dataType: "json",

        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
            } else {
                var old = JSON.stringify(data).replace(/null/g, '""'); //convert to JSON string
                var data = JSON.parse(old); //convert back to array
                tabla = "";
                if (data.length > 0) {
                    for (i = 0; i < data.length; i++) {
                        $("#control_crecimientoE_id").val(data[i].id);
                        for (j = 0; j < data[i].det_control_crecimiento_id.length; j++) {
                            if (data[i].det_control_crecimiento_id[j].muerta == 1)
                                checkM = 'checked';
                            else
                                checkM = '';
                            if (data[i].det_control_crecimiento_id[j].repatriada == 1)
                                checkR = 'checked';
                            else
                                checkR = '';
                            if ((checkM != "") || (checkR != "")) {
                                /*si verifica la fecha de muerte o repatriacion*/
                                if (checkM != "") {
                                    fechaMR = data[i].det_control_crecimiento_id[j].fecha_medida;
                                    fechaMRarr = fechaMR.split("-");
                                }
                                if (checkR != "") {
                                    fechaMR = data[i].det_control_crecimiento_id[j].fecha_repatriacion;
                                    if (fechaMR == "") fechaMR = data[i].det_control_crecimiento_id[j].fecha_medida;
                                    fechaMRarr = fechaMR.split("-");
                                }

                                cadenaFecha = fechaMRarr[0] + '-' + fechaMRarr[1].replace("0", "");
                                cadenaMesB = $("#SanioCC").val() + '-' + $("#SmedicionCC").val();

                                //console.log(cadenaFecha+'*********'+cadenaMesB);
                                /*si las fecha de muerto o repatriacion es igual a la del periodo seleccionado se habilita el tr para q pueda modificarse*/
                                if (cadenaFecha == cadenaMesB) {
                                    clase = '';
                                    style = '';
                                    cursor = '';
                                } else {
                                    clase = 'disabled-select';
                                    style = 'background-color: #e4e4e4 !important;';
                                    cursor = 'pointer-events: all;';
                                }
                                /*fin*/
                            } else {
                                clase = '';
                                style = '';
                            }

                            selectP2 = $("#poblacionOcultaCCE").html();

                            selectP = '<select id="SpoblacionCCE_aux" style="width: 100px;" onchange="asignarPoblacionEnc(this.value,\'' + data[i].det_control_crecimiento_id[j].id + '\')";>';
                            selectP += selectP2
                            selectP += '</select>';


                            if (data[i].det_control_crecimiento_id[j].estado_ingreso == 1) {
                                claseEstado = 'IngresoFuera';
                                color = "background-color: #428bca; color: white;";
                                eliminarCheck = "<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Eliminar&nbsp;&nbsp;<input type='checkbox' name='check1' value='1' onclick='eliminarCCexterna(this);'/>";

                            } else {
                                color = "";
                                eliminarCheck = "";
                                claseEstado = '';
                            }

                            if (data[i].det_control_crecimiento_id[j].estado == 'A') {
                                tabla += "<tr class='" + clase + "' style='" + style + "'>";
                                tabla += "<td><input name='txtfecha[]' type='date' style='width:100px; font-size: 10px;height: 25px;' value='" + data[i].det_control_crecimiento_id[j].fecha_medida + "'/></td>";
                                tabla += "<td style='" + cursor + "" + color + "'  onclick='prueba(\"PopSE" + j + "\"," + data[i].det_control_crecimiento_id[j].num_pintura + ",\"" + $("#SccrianzaCCE").val() + "\",\"" + $("#SgnacimientoCCE").val() + "\",\"" + $("#SpoblacionCCE").val() + "\");' class='PopS " + claseEstado + "' data-toggle='popover' data-trigger='click' data-placement='right' data-container='body' data-html='true' id='PopSE" + j + "' >" + data[i].det_control_crecimiento_id[j].num_pintura + "</td>";
                                tabla += "<td align='center'><input class='input' name='txthierro[]' type='text' style='width: 50px;text-align:center;height:25px;' value='" + data[i].det_control_crecimiento_id[j].num_hierro + "' onkeypress='return isNumberKey(event);'/></td>";
                                tabla += "<td align='center'><input class='input cajaNumero' name='txtpit[]' type='text' style='width: 100px;text-align:center;height:25px;' maxlength='10' value='" + data[i].det_control_crecimiento_id[j].num_pit + "' onkeypress='return isNumberKey(event);'/></td>";
                                tabla += "<td align='center'><input class='input cajaNumero' name='txtlargoc[]' type='text' style='text-align:center;' value='" + data[i].det_control_crecimiento_id[j].largo_curvo + "' onkeypress='return isNumberKey(event);'/></td>";
                                tabla += "<td align='center'><input class='input cajaNumero' name='txtanchoc[]' type='text' style='text-align:center;' value='" + data[i].det_control_crecimiento_id[j].ancho_curvo + "' onkeypress='return isNumberKey(event);'/></td>";
                                tabla += "<td align='center'><input class='input cajaNumero' name='txtlplastron[]' type='text' style='text-align:center;' value='" + data[i].det_control_crecimiento_id[j].largo_plastron + "' onkeypress='return isNumberKey(event);'/></td>";
                                tabla += "<td align='center'><input class='input cajaNumero' name='txtpeso[]' type='text' style='text-align:center;' value='" + data[i].det_control_crecimiento_id[j].peso + "' onkeypress='return isNumberKey(event);'/></td>";
                                tabla += "<td><textarea class='input' id='comentario_" + i + "' style='width:150px;'>" + data[i].det_control_crecimiento_id[j].observacion + "</textarea></td>";
                                tabla += "<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Muerta&nbsp;&nbsp;<input type='checkbox' name='check1' value='1' " + checkM + "/>" + eliminarCheck + "<br>" + selectP + "</td>";
                                //tabla+="<td align='center'><a href='#addSancionSP' data-stackbox='true' data-stackbox-position='absolute' onclick='editSancion_SP(\""+data[i].det_control_crecimiento_id[j].id+"\")'><i class='fa fa-edit text-green'></i></a> </td>";
                                tabla += "<td hidden>" + data[i].det_control_crecimiento_id[j].id + "</td>";
                                tabla += "</tr>";
                            }
                        }
                    }
                } else {
                    $("#control_crecimientoE_id").val("");

                    //Flag para mostrar/ ocultar boton de agregar en el detalle del control de crecimiento
                    console.log($("#perm_controlcrec_encont_add").val());
                    if ($("#perm_controlcrec_encont_add").val() == "1") {
                        tabla = "<td align='center' colspan='10'>No Existe informacion para este periodo <br> <button type='button' onclick='addMedicionParametrosEnc();' class='btn btn-block btn-save' style='width: 80px;'>Agregar</button></td>";
                    }
                }

                $("#bodytabla_controlcE").html("");
                $("#bodytabla_controlcE").append(tabla);

                sortTable("tabla_controlcE");

                $('#tabla_controlcE_aux tbody').html("");
            }
        },
        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
            //console.log( JSON.stringify(data));
        },
    });
}

/*obtener datos de las mediciones de tortugas encontradas*/
function addMedicionParametrosEnc() {
    if ($("#SccrianzaCCE").val() != "") {
        dataP = "centro_crianza_id__in=" + $("#SccrianzaCCE").val() + "&";
        dataP2 = "centro_crianza_id__in=" + $("#SccrianzaCCE").val() + "&";
    }

    if ($("#SgnacimientoCCE").val() != "") {
        dataP += "grupo_nacimiento__in=" + $("#SgnacimientoCCE").val() + "&";
        dataP2 += "grupo_nacimiento__in=" + $("#SgnacimientoCCE").val() + "&";
    }

    if ($("#SpoblacionCCE").val() != "") {
        dataP += "poblacion__in=" + $("#SpoblacionCCE").val() + "&";
        dataP2 += "poblacion_id__in=" + $("#SpoblacionCCE").val() + "&";
    }

    dataP = dataP.substring(0, dataP.length - 1);
    tabla = "";
    console.log(dataP);

    claseEstado = "";

    $.ajax({
        //url: "dataCabmedicionesParam",
        url: "data_medicionesParam",
        type: "get",
        data: {
            "data": dataP
        },
        dataType: "json",

        success: function(data1) {
            if (data1['non_field_errors']) {
                console.log(data1['non_field_errors']);
            } else {
                if (data1.length > 0) {
                    console.log("si existe");
                    console.log(dataP);
                    $.ajax({
                        url: "data_ultimaMedicionParam",
                        type: "get",
                        data: {
                            "data": dataP
                        },
                        dataType: "json",

                        success: function(data) {
                            if (data['non_field_errors']) {
                                console.log(data['non_field_errors']);
                            } else {
                                if (data.length > 0) {

                                    dataP += "&poblacion_id__id__in=" + $("#SpoblacionCCE").val() + "&anio__in=" + data[0].anio + "&periodo__in=" + data[0].periodo;
                                    console.log(dataP);
                                    $.ajax({
                                        url: "data_medicionesParam",
                                        type: "get",
                                        data: {
                                            "data": dataP
                                        },
                                        dataType: "json",

                                        success: function(data) {
                                            if (data['non_field_errors']) {
                                                console.log(data['non_field_errors']);
                                            } else {
                                                if (data.length > 0) {
                                                    for (i = 0; i < data.length; i++) {
                                                        for (j = 0; j < data[i].det_control_crecimiento_id.length; j++) {
                                                            if (data[i].det_control_crecimiento_id[j].muerta == 1)
                                                                checkM = 'checked';
                                                            else
                                                                checkM = '';
                                                            if (data[i].det_control_crecimiento_id[j].repatriada == 1)
                                                                checkR = 'checked';
                                                            else
                                                                checkR = '';

                                                            if ((checkM != "") || (checkR != "")) {
                                                                clase = 'disabled-select';
                                                                style = 'background-color: #e4e4e4 !important;';
                                                                cursor = 'pointer-events: all;';
                                                                if (checkM != "") {
                                                                    fechaMR = data[i].det_control_crecimiento_id[j].fecha_medida;
                                                                }
                                                                if (checkR != "") {
                                                                    fechaMR = data[i].det_control_crecimiento_id[j].fecha_repatriacion;
                                                                }
                                                            } else {
                                                                clase = '';
                                                                style = '';
                                                                cursor = '';
                                                                fechaMR = getToday();
                                                            }

                                                            if (data[i].det_control_crecimiento_id[j].estado_ingreso == 1) {
                                                                color = "background-color: #428bca; color: white;";
                                                                console.log(color + "--" + data[i].det_control_crecimiento_id[j].estado_ingreso);
                                                                eliminarCheck = "<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Eliminar&nbsp;&nbsp;<input type='checkbox' name='check1' value='1'/>";
                                                                claseEstado = 'IngresoFuera';
                                                            } else {
                                                                color = "";
                                                                eliminarCheck = "";
                                                                claseEstado = "";
                                                            }

                                                            selectP = '<select class="select2" id="SpoblacionCCE_aux" style="width: 100px;" onchange="asignarPoblacionEnc(this.value,\'' + data[i].det_control_crecimiento_id[j].id + '\')";>';
                                                            selectP += '<option value="">Poblacion</option>';
                                                            selectP += '<option value="2cc7250b-87d5-4cc6-a15e-bb0ea07c30c0">Santiago</option>';
                                                            selectP += '<option value="2cc7250b-87d5-4cc6-a15e-bb0ea07c30c1">Santa Cruz</option>';
                                                            selectP += '<option value="2cc7250b-87d5-4cc6-a15e-bb0ea07c30c2">Española</option>';
                                                            selectP += '<option value="2cc7250b-87d5-4cc6-a15e-bb0ea07c30c3">Floreana</option>';
                                                            selectP += '<option value="2cc7250b-87d5-4cc6-a15e-bb0ea07c30c4">Pinzon</option>';
                                                            selectP += '</select>';

                                                            if (data[i].det_control_crecimiento_id[j].estado == 'A') {
                                                                tabla += "<tr class='" + clase + "' style='" + style + "'>";
                                                                //tabla+="<td id='td_sancionFechaCreacion_"+data[i].id+"'>"+data[i].fecha_ingreso+"</td>";
                                                                tabla += "<td><input name='txtfecha[]' type='date' style='width:100px; font-size: 10px;height: 20px;' value='" + fechaMR + "'/></td>";
                                                                tabla += "<td style='" + cursor + "" + color + "' onclick='prueba(\"PopSE" + j + "\"," + data[i].det_control_crecimiento_id[j].num_pintura + ",\"" + $("#SccrianzaCCE").val() + "\",\"" + $("#SgnacimientoCCE").val() + "\",\"" + $("#SpoblacionCCE").val() + "\");' class='PopS " + claseEstado + "' data-toggle='popover' data-trigger='click' data-placement='right' data-container='body' data-html='true' id='PopSE" + j + "' >" + data[i].det_control_crecimiento_id[j].num_pintura + "</td>";
                                                                tabla += "<td align='center'><input class='input' name='txthierro[]' type='text' style='width: 50px;text-align:center;' value='' onkeypress='return isNumberKey(event);'/></td>";
                                                                tabla += "<td align='center'><input class='input' name='txtpit[]' type='text' style='width: 100px;text-align:center;' maxlength='10' value='' onkeypress='return isNumberKey(event);'/></td>";
                                                                tabla += "<td align='center'><input class='input' name='txtlargoc[]' type='text' style='width: 50px;text-align:center;' value='' onkeypress='return isNumberKey(event);'/></td>";
                                                                tabla += "<td align='center'><input class='input' name='txtanchoc[]' type='text' style='width: 50px;text-align:center;' value='' onkeypress='return isNumberKey(event);'/></td>";
                                                                tabla += "<td align='center'><input class='input' name='txtlplastron[]' type='text' style='width: 50px;text-align:center;' value='' onkeypress='return isNumberKey(event);'/></td>";
                                                                tabla += "<td align='center'><input class='input' name='txtpeso[]' type='text' style='width: 50px;text-align:center;' value='' onkeypress='return isNumberKey(event);'/></td>";
                                                                tabla += "<td><textarea class='input' style='width:150px;'>" + data[i].det_control_crecimiento_id[j].observacion + "</textarea></td>";
                                                                tabla += "<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Muerta&nbsp;&nbsp;<input type='checkbox' name='check1' value='1' " + checkM + "/>" + eliminarCheck + "<br>" + selectP + "</td>";
                                                                tabla += "</tr>";
                                                            }

                                                        }
                                                    }
                                                    $("#bodytabla_controlcE").html("");
                                                    $("#bodytabla_controlcE").append(tabla);

                                                    sortTable("tabla_controlcE");
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
                        },
                        error: function(data) {
                            swal("", "Error: " + JSON.stringify(data), "error");
                            console.log(JSON.stringify(data));
                            //console.log( JSON.stringify(data));
                        },
                    });
                }
            }
        },
        error: function(data) {
            swal("", "Error: " + JSON.stringify(data1), "error");
            console.log(JSON.stringify(data1));
            //console.log( JSON.stringify(data));
        },
    });
}

/*iniserta o actualizar mediciones parametros encontradas*/
function insertUpdateMedicionesParametrosEnc() {
    if ($("#control_crecimientoE_id").val() != "")
        UpdateMedicionesParametrosEnc($("#control_crecimientoE_id").val());
    else
        insertMedicionesParametrosEnc();

}

/*iniserta mediciones parametros encontradas*/
function insertMedicionesParametrosEnc() {
    datosC = '{';
    datosC += ' "grupo_nacimiento":"' + $("#SgnacimientoCCE").val() + '",';
    datosC += ' "centro_crianza_id":"' + $("#SccrianzaCCE").val() + '",';
    datosC += ' "poblacion_id":"' + $("#SpoblacionCCE").val() + '",';
    datosC += ' "periodo":"' + $("#SmedicionCCE").val() + '",';
    datosC += ' "anio":"' + $("#SanioCCE").val() + '",';

    var table = $("#tabla_controlcE tbody");
    inicial = 1;
    final = 0;
    datosD = '';
    mensaje = '';
    table.find('tr').each(function(i) {

        if ($(this).hasClass("disabled-select"))
            console.log('disabled-select')
        else
            console.log('noooo disabled-select')

        observaAux = '';

        var data = $(this).find("td").find("input");
        var dataT = $(this).find("td").find("textarea");
        var dataTD = $(this).find("td");
        datosD += '{';
        datosD += ' "fecha_medida":"' + $(data).eq(0).val() + '",';
        datosD += ' "num_pintura":"' + $(dataTD).eq(1).html() + '",';

        idPintura = $(dataTD).eq(1).attr("id");
        if ($("#" + idPintura).hasClass("IngresoFuera"))
            datosD += ' "estado_ingreso":"1",';

        if ($(data).eq(1).val() == "") datosD += '';
        else datosD += ' "num_hierro":"' + $(data).eq(1).val() + '",';
        if ($(data).eq(2).val() == "") datosD += '';
        else datosD += ' "num_pit":"' + $(data).eq(2).val() + '",';
        if ($(data).eq(3).val() == "") datosD += '';
        else datosD += ' "largo_curvo":"' + $(data).eq(3).val() + '",';
        if ($(data).eq(4).val() == "") datosD += '';
        else datosD += ' "ancho_curvo":"' + $(data).eq(4).val() + '",';
        if ($(data).eq(5).val() == "") datosD += '';
        else datosD += ' "largo_plastron":"' + $(data).eq(5).val() + '",';
        if ($(data).eq(6).val() == "") datosD += '';
        else datosD += ' "peso":"' + $(data).eq(6).val() + '",';
        if ($(data).eq(7).is(':checked')) {
            datosD += ' "muerta":"1",';
            datosD += ' "fecha_muerte_tort":"' + $(data).eq(0).val() + '",';
        }

        datosD += ' "observacion":"' + $(dataT).eq(0).val() + observaAux + '"';
        datosD += '},';

    });

    datosD = datosD.substring(0, datosD.length - 1);

    /*para obtner los registros de las especies q son ingresadas directamente al grupo*/
    var tableAux = $("#tabla_controlcE_aux tbody");
    inicialAux = 1;
    finalAux = 0;
    datosDAux = '';
    tableAux.find('tr').each(function(i) {
        var dataAux = $(this).find("td").find("input");
        var dataTAux = $(this).find("td").find("textarea");
        datosDAux += '{';
        datosDAux += ' "fecha_medida":"' + $(dataAux).eq(0).val() + '",';
        datosDAux += ' "num_pintura":"' + $(dataAux).eq(1).val() + '",';
        datosDAux += ' "estado_ingreso":1,';
        datosDAux += ' "fecha_ingreso_tort":"' + $(dataAux).eq(0).val() + '",';

        if ($(dataAux).eq(2).val() == "") datosDAux += ' "num_hierro":null,';
        else datosDAux += ' "num_hierro":"' + $(dataAux).eq(2).val() + '",';
        if ($(dataAux).eq(3).val() == "") datosDAux += ' "num_pit":null,';
        else datosDAux += ' "num_pit":"' + $(dataAux).eq(3).val() + '",';
        if ($(dataAux).eq(4).val() == "") datosDAux += ' "largo_curvo":null,';
        else datosDAux += ' "largo_curvo":"' + $(dataAux).eq(4).val() + '",';
        if ($(dataAux).eq(5).val() == "") datosDAux += ' "ancho_curvo":null,';
        else datosDAux += ' "ancho_curvo":"' + $(dataAux).eq(5).val() + '",';
        if ($(dataAux).eq(6).val() == "") datosDAux += ' "largo_plastron":null,';
        else datosDAux += ' "largo_plastron":"' + $(dataAux).eq(6).val() + '",';
        if ($(dataAux).eq(7).val() == "") datosDAux += ' "peso":null,';
        else datosDAux += ' "peso":"' + $(dataAux).eq(7).val() + '",';
        if ($(dataAux).eq(8).is(':checked')) {
            datosDAux += ' "muerta":"1",';
            datosD += ' "fecha_muerte_tort":"' + $(data).eq(0).val() + '",'
        }

        datosDAux += ' "observacion":"' + $(dataTAux).eq(0).val() + '"';
        datosDAux += '},';

    });

    datosDAux = datosDAux.substring(0, datosDAux.length - 1);

    if (datosDAux != "") {
        if (datosD != "")
            dataFinal = datosD + ',' + datosDAux;
        else
            dataFinal = datosDAux;
    } else
        dataFinal = datosD;
    /*fin*/

    datosC += '"det_control_crecimiento_id":[' + dataFinal + ']}';
    //console.log(datosC);
    dj_url = 'spncontrolcrecimientogalapaguitos';
    $.ajax({
        url: "insert_General",
        type: 'get',
        cache: 'false',
        data: {
            "dj_url": dj_url,
            "data": JSON.stringify("[" + datosC + "]")
        },
        dataType: "json",
        success: function(data2) {
            if (!data2['results']) {
                $('#modalLoadin').hide();
                swal("", "Error al Insertar el registro", "error");
                console.log("data---->" + datosC + "--->" + "spncontrolcrecimientogalapaguitos" + "Error--->" + data2);
            } else {
                $('#modalLoadin').hide();
                swal("", "Registro insertado con exito", "success");
                buscarMedicionesParametrosEnc();
            }
        },
        error: function(data2) {
            $('#modalLoadin').hide();
            swal("", "Error al Insertar el registro", "error");
            console.log("data---->" + datosC + "--->" + "spncontrolcrecimientogalapaguitos" + "Error--->" + data2);
        },
    });

}

/*actualizar mediciones parametros encontradas*/
function UpdateMedicionesParametrosEnc(cabecera) {
    datosC = '{';

    var table = $("#tabla_controlcE tbody");
    inicial = 1;
    final = 0;
    datosD = '';
    table.find('tr').each(function(i) {
        var data = $(this).find("td").find("input");
        var dataT = $(this).find("td").find("textarea");
        var dataTD = $(this).find("td");

        datosD += '{';
        datosD += ' "id":"' + $(dataTD).eq(10).html() + '",';
        if ($(data).eq(0).val() == "") datosD += ' "fecha_medida":null,';
        else datosD += ' "fecha_medida":"' + $(data).eq(0).val() + '",';
        if ($(data).eq(1).val() == "") datosD += ' "num_hierro":null,';
        else datosD += ' "num_hierro":"' + $(data).eq(1).val() + '",';
        if ($(data).eq(2).val() == "") datosD += ' "num_pit":null,';
        else datosD += ' "num_pit":"' + $(data).eq(2).val() + '",';
        if ($(data).eq(3).val() == "") datosD += ' "largo_curvo":null,';
        else datosD += ' "largo_curvo":"' + $(data).eq(3).val() + '",';
        if ($(data).eq(4).val() == "") datosD += ' "ancho_curvo":null,';
        else datosD += ' "ancho_curvo":"' + $(data).eq(4).val() + '",';
        if ($(data).eq(5).val() == "") datosD += ' "largo_plastron":null,';
        else datosD += ' "largo_plastron":"' + $(data).eq(5).val() + '",';
        if ($(data).eq(6).val() == "") datosD += ' "peso":null,';
        else datosD += ' "peso":"' + $(data).eq(6).val() + '",';
        if ($(data).eq(7).is(':checked')) {
            datosD += ' "muerta":"1",';
            datosD += ' "fecha_muerte_tort":"' + $(data).eq(0).val() + '",'
        } else {
            datosD += ' "muerta":null,';
        }

        datosD += ' "observacion":"' + $(dataT).eq(0).val() + '"';
        datosD += '},';
    });

    datosD = datosD.substring(0, datosD.length - 1);

    datosC += '"det_control_crecimiento_id":[' + datosD + ']}';
    console.log(datosC);
    dj_url = 'spncontrolcrecimientogalapaguitos';
    $.ajax({
        url: "update_General",
        type: 'get',
        cache: 'false',
        data: {
            "dj_url": dj_url,
            "idtabla": cabecera,
            "data": JSON.stringify(datosC)
        },
        dataType: "json",
        async: false,
        success: function(data2) {
            if (data2.id == undefined) {
                $('#modalLoadin').hide();
                swal("", "Error al Actualizar el registro", "error");
                console.log("idtabla---->" + cabecera + "--->" + "data---->" + datosC + "--->" + "spncontrolcrecimientogalapaguitos" + "Error--->" + data2);
            } else {
                $('#modalLoadin').hide();

                /*para obtner los registros de las especies q son ingresadas directamente al grupo*/
                var tableAux = $("#tabla_controlcE_aux tbody");
                inicialAux = 1;
                finalAux = 0;
                datosDAux = '';
                tableAux.find('tr').each(function(i) {
                    datosDAux = '';
                    var dataAux = $(this).find("td").find("input");
                    var dataTAux = $(this).find("td").find("textarea");
                    datosDAux += '[{';
                    datosDAux += ' "fecha_medida":"' + $(dataAux).eq(0).val() + '",';
                    datosDAux += ' "num_pintura":"' + $(dataAux).eq(1).val() + '",';
                    datosDAux += ' "control_crecimiento_id":"' + $("#control_crecimientoE_id").val() + '",';
                    datosDAux += ' "estado_ingreso":1,';

                    if ($(dataAux).eq(2).val() == "") datosDAux += ' "num_hierro":null,';
                    else datosDAux += ' "num_hierro":"' + $(dataAux).eq(2).val() + '",';
                    if ($(dataAux).eq(3).val() == "") datosDAux += ' "num_pit":null,';
                    else datosDAux += ' "num_pit":"' + $(dataAux).eq(3).val() + '",';
                    if ($(dataAux).eq(4).val() == "") datosDAux += ' "largo_curvo":null,';
                    else datosDAux += ' "largo_curvo":"' + $(dataAux).eq(4).val() + '",';
                    if ($(dataAux).eq(5).val() == "") datosDAux += ' "ancho_curvo":null,';
                    else datosDAux += ' "ancho_curvo":"' + $(dataAux).eq(5).val() + '",';
                    if ($(dataAux).eq(6).val() == "") datosDAux += ' "largo_plastron":null,';
                    else datosDAux += ' "largo_plastron":"' + $(dataAux).eq(6).val() + '",';
                    if ($(dataAux).eq(7).val() == "") datosDAux += ' "peso":null,';
                    else datosDAux += ' "peso":"' + $(dataAux).eq(7).val() + '",';
                    if ($(dataAux).eq(8).is(':checked')) {
                        datosDAux += ' "muerta":"1",';
                        datosD += ' "fecha_muerte_tort":"' + $(data).eq(0).val() + '",'
                    } else {
                        datosDAux += ' "muerta":null,';
                    }

                    datosDAux += ' "observacion":"' + $(dataTAux).eq(0).val() + '"';
                    datosDAux += '}]';

                    console.log(datosDAux);
                    dj_url = 'spncontrolcrecimientogalapaguitosdetalles';
                    $.ajax({
                        url: "insert_General",
                        type: 'get',
                        cache: 'false',
                        data: {
                            "dj_url": dj_url,
                            "data": JSON.stringify(datosDAux)
                        },
                        dataType: "json",
                        async: false,
                        success: function(data2) {
                            if (!data2['results']) {
                                console.log("data---->" + datosDAux + "--->" + "spncontrolcrecimientogalapaguitosdetalles" + "Error--->" + data2);
                            } else {
                                console.log('ok');
                            }
                        },
                        error: function(data2) {
                            console.log("data---->" + datosDAux + "--->" + "spncontrolcrecimientogalapaguitosdetalles" + "Error--->" + data2);
                        },
                    });
                    /*fin*/
                });
                swal("", "Registros Actualizdos con exito", "success");
                $("#bodytabla_controlcE_aux").html("");
                buscarMedicionesParametrosEnc();
            }
        },
        error: function(data2) {
            $('#modalLoadin').hide();
            swal("", "Error al Actualizar el registro", "error");
            console.log("idtabla---->" + cabecera + "--->" + "data---->" + datosC + "--->" + "spncontrolcrecimientogalapaguitos" + "Error--->" + data2);
        },
    });

}

/*funcion para asignarle una poblacion a una tortuga encontrada*/
function asignarPoblacionEnc(id_poblacion, id_registro) {

    if ($("#perm_controlcrec_encont_add").val() == "1") {

        swal({
                title: "Estas seguro de asiganar poblacion a esta Tortuga?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {

                    if ($("#SccrianzaCCE").val() != "")
                        data = "centro_crianza_id__in=" + $("#SccrianzaCCE").val() + "&";

                    if ($("#SgnacimientoCCE").val() != "")
                        data += "grupo_nacimiento__in=" + $("#SgnacimientoCCE").val() + "&";

                    data += "poblacion_id__id__in=" + id_poblacion + "&";

                    if ($("#SmedicionCCE").val() != "")
                        data += "periodo__in=" + $("#SmedicionCCE").val() + "&";

                    if ($("#SanioCCE").val() != "")
                        data += "anio__in=" + $("#SanioCCE").val() + "&";

                    data = data.substring(0, data.length - 1);

                    $.ajax({
                        url: "data_medicionesParam",
                        type: "get",
                        data: {
                            "data": data
                        },
                        dataType: "json",

                        success: function(data2) {
                            if (data2['non_field_errors']) {
                                console.log(data2['non_field_errors']);
                            } else {
                                if (data2.length > 0)
                                    control_crecimiento_id = data2[0].id;
                                console.log(control_crecimiento_id + '+++++++++++++');
                                datosD = '{"control_crecimiento_id":"' + control_crecimiento_id + '"}';

                                dj_url = 'spncontrolcrecimientogalapaguitosdetalles';
                                $.ajax({
                                    url: "update_General",
                                    type: 'get',
                                    cache: 'false',
                                    data: {
                                        "dj_url": dj_url,
                                        "idtabla": id_registro,
                                        "data": JSON.stringify(datosD)
                                    },
                                    dataType: "json",
                                    async: false,
                                    success: function(data2) {
                                        if (data2.id == undefined) {
                                            console.log("idtabla---->" + id_registro + "--->" + "data---->" + datosD + "--->" + "spncontrolcrecimientogalapaguitosdetalles" + "Error--->" + data2);
                                            swal("", "Error al Asignar el registro", "error");

                                        } else {
                                            swal("Listo! Registro Actualizado con Exito", {
                                                icon: "success",
                                            });
                                            buscarMedicionesParametrosEnc();
                                        }
                                    },
                                    error: function(data2) {
                                        console.log("idtabla---->" + id_registro + "--->" + "data---->" + datosD + "--->" + "spncontrolcrecimientogalapaguitosdetalles" + "Error--->" + data2);
                                        swal("", "Error al Asignar el registro", "error");
                                    },
                                });
                            }
                        },
                        error: function(data) {
                            swal("", "Error: " + JSON.stringify(data2), "error");
                            console.log(JSON.stringify(data2));
                            //console.log( JSON.stringify(data));
                        },
                    });

                } else {
                    return 1;
                }
            });

    }

}


/*reporte control de crecimineto detalle*/
function buscarReporteGrupoParametros() {
    data = '';

    if ($("#SgnacimientoCCP").val() != "")
        data += "grupo_nacimiento__in=" + $("#SgnacimientoCCG").val() + "&";


    desde = $("#FdesdeParamCCG").val();
    hasta = $("#FhastaParamCCG").val();

    desdeArr = desde.split('-');
    hastaArr = hasta.split('-');

    fdesde = desdeArr[1] + "-" + desdeArr[0] + "-01";
    fhasta = hastaArr[1] + "-" + hastaArr[0] + "-01";
    data += "periodo_medida__range=" + fdesde + "," + fhasta;

    $.ajax({
        url: "data_detalleControlCrecimiento",
        type: "get",
        data: {
            "data": data
        },
        dataType: "json",

        success: function(data) {
            //console.log(JSON.stringify(data));
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
            } else {

                var derivers = $.pivotUtilities.derivers;
                var renderers = $.extend($.pivotUtilities.renderers,
                    $.pivotUtilities.c3_renderers);
                $("#output").pivotUI(data, {
                    renderers: renderers,
                    rows: ["grupo_nacimiento", "centro_crianza", "des_poblacion"],
                    cols: ["estado_tortuga"],
                    rendererName: "Table",
                    rowOrder: "value_z_to_a",
                    colOrder: "value_z_to_a",
                    rendererOptions: {
                        c3: {
                            data: {
                                colors: {
                                    Liberal: '#dc3912',
                                    Conservative: '#3366cc',
                                    NDP: '#ff9900',
                                    Green: '#109618',
                                    'Bloc Quebecois': '#990099'
                                }
                            }
                        }
                    }
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

/**/

/*metodo para editar datos del cc*/
function editCC(id) {
    $("#tituloAcc").html("Editar");
    $("#tipoCC_acc").val(1);
    $.ajax({
        url: "editCentroCrianza",
        type: "get",
        data: {
            "data": id
        },
        dataType: "json",

        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
            } else {
                $("#idCC").val(data[0].id);
                $("#desc_acc").val(data[0].descripcion);
                $("#SislaCC").val(data[0].isla_id.id).trigger("change");
                $("#SestadoCC").val(data[0].estado).trigger("change");
                $("#ObservacionCC").val(data[0].observacion);
            }
        },
        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
            //console.log( JSON.stringify(data));
        },
    });
}

/*limpiar form del cc*/
function limpiarFormCC() {
    clearForm(frm_cc);
    $("#tipoCC_acc").val(0);
    $("#tituloAcc").html("Agregar");
}

function setInsertUpdateCC() {
    valida = validaContenedor("addCentroCrianza");
    if (valida) {
        if ($("#tipoCC_acc").val() == 0)
            insertCC();
        else
            saveEditCC();
    }
}

/*insertar datos del cc*/
function insertCC() {
    nombre = $("#desc_acc").val();
    estado = $("#SestadoCC").val();
    observacion = $("#ObservacionCC").val();
    isla = $("#SislaCC").val();

    id_padre = $('#content_centrosCrianzas').parent().attr('id');
    datos = '{"descripcion":"' + nombre + '", "estado":"' + estado + '", "observacion":"' + observacion + '", "isla_id":"' + isla + '"}';
    th_insert(datos, "centrosCrianza", id_padre, "spncentroscrianza")

}

/*editar datos del cc*/
function saveEditCC() {
    nombre = $("#desc_acc").val();
    estado = $("#SestadoCC").val();
    observacion = $("#ObservacionCC").val();
    isla = $("#SislaCC").val();

    id = $("#idCC").val();

    id_padre = $('#content_centrosCrianzas').parent().attr('id');

    datos = '{"descripcion":"' + nombre + '", "estado":"' + estado + '", "observacion":"' + observacion + '", "isla_id":"' + isla + '"}';

    $("#td_desc_" + id).html(nombre);

    salida = th_update(datos, "centrosCrianza", id_padre, "spncentroscrianza", id);

}

/*delete datos del cc*/
function deleteCC(id) {
    console.log(111);
    id_padre = $('#content_centrosCrianzas').parent().attr('id');
    datos = '{"estado":"I","eliminado":"t"}';
    th_delete(datos, "centrosCrianza", id_padre, "spncentroscrianza", id);
}

/*edit datos del poblacion*/
function editPob(id) {
    $("#tituloPob").html("Editar");
    $("#tipoPob_acc").val(1);
    $.ajax({
        url: "editPoblacion",
        type: "get",
        data: {
            "data": id
        },
        dataType: "json",

        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
            } else {
                $("#idPob").val(data[0].id);
                $("#desc_pob").val(data[0].descripcion);
                $("#SestadoPob").val(data[0].estado).trigger("change");
                $("#observacionPob").val(data[0].observacion);
            }
        },
        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
            //console.log( JSON.stringify(data));
        },
    });
}

/*limpiar formulario poblacion*/
function limpiarFormPob() {
    clearForm(frm_pob);
    $("#tipoPob_acc").val(0);
    $("#tituloPob").html("Agregar");
}

function setInsertUpdatePob() {
    valida = validaContenedor("addPoblacion");
    if (valida) {
        if ($("#tipoPob_acc").val() == 0)
            insertPob();
        else
            saveEditPob();
    }
}

/*insert datos del poblacion*/
function insertPob() {

    nombre = $("#desc_pob").val();
    estado = $("#SestadoPob").val();
    observacion = $("#observacionPob").val();

    id_padre = $('#content_poblacion').parent().attr('id');
    datos = '{"descripcion":"' + nombre + '", "estado":"' + estado + '", "observacion":"' + observacion + '"}';
    th_insert(datos, "poblacion", id_padre, "spnpoblacion")

}

/*actualizar datos del poblacion*/
function saveEditPob() {

    nombre = $("#desc_pob").val();
    estado = $("#SestadoPob").val();
    observacion = $("#observacionPob").val();

    id = $("#idPob").val();

    id_padre = $('#content_poblacion').parent().attr('id');

    datos = '{"descripcion":"' + nombre + '", "estado":"' + estado + '", "observacion":"' + observacion + '"}';

    $("#td_desc_" + id).html(nombre);

    salida = th_update(datos, "poblacion", id_padre, "spnpoblacion", id);

}

/*eliminar datos del poblacion*/
function deletePob(id) {
    console.log(111);
    id_padre = $('#content_poblacion').parent().attr('id');
    datos = '{"estado":"I","eliminado":"t"}';
    th_delete(datos, "poblacion", id_padre, "spnpoblacion", id);
}


/*edit datos tortugas adultas*/
function editTorAdul(id) {
    $("#tituloTorAdul").html("Editar");
    $("#tipoTorAdul_acc").val(1);
    $.ajax({
        url: "editTortugasAdultas",
        type: "get",
        data: {
            "data": id
        },
        dataType: "json",

        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
            } else {
                $("#idTorAdul").val(data[0].id)
                $("#SccTorAdul").val(data[0].centro_crianza_id.id).trigger("change");
                $("#SpoblacionTorAdul").val(data[0].poblacion_id.id).trigger("change");
                $("#cantTorAdul").val(data[0].cantidad);
                $("#SanioTorAdul").val(data[0].anio).trigger("change");
                $("#SmesTorAdul").val(data[0].mes).trigger("change");
                $("#observacionTorAdul").val(data[0].observacion);
            }
        },
        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
            //console.log( JSON.stringify(data));
        },
    });
}

/*limpiar formulario de tortugas adultas*/
function limpiarFormTorAdul() {
    clearForm(frm_TorAdul);
    $("#tipoTorAdul_acc").val(0);
    $("#tituloTorAdul").html("Agregar");
}

function setInsertUpdateTorAdul() {
    valida = validaContenedor("addTorAdul");
    if (valida) {
        if ($("#tipoTorAdul_acc").val() == 0)
            insertTorAdul();
        else
            saveEditTorAdul();
    }
}

/*insert datos tortugas adultas*/
function insertTorAdul() {
    cc = $("#SccTorAdul").val();
    poblacion = $("#SpoblacionTorAdul").val();
    observacion = $("#observacionTorAdul").val();
    anio = $("#SanioTorAdul").val();
    mes = $("#SmesTorAdul").val();
    cant = $("#cantTorAdul").val();

    id_padre = $('#content_TorAdul').parent().attr('id');
    datos = '{"centro_crianza_id":"' + cc + '", "poblacion_id":"' + poblacion + '", "anio":"' + anio + '", "mes":"' + mes + '","periodo":"' + anio + '-' + mes + '", "cantidad":"' + cant + '", "observacion":"' + observacion + '", "estado":"A"}';
    th_insert(datos, "tortugasAdultas", id_padre, "spntortugasadultas")

}

/*actualizar datos tortugas adultas*/
function saveEditTorAdul() {

    cc = $("#SccTorAdul").val();
    poblacion = $("#SpoblacionTorAdul").val();
    observacion = $("#observacionTorAdul").val();
    anio = $("#SanioTorAdul").val();
    mes = $("#SmesTorAdul").val();
    cant = $("#cantTorAdul").val();

    id = $("#idTorAdul").val();

    id_padre = $('#content_TorAdul').parent().attr('id');

    datos = '{"centro_crianza_id":"' + cc + '", "poblacion_id":"' + poblacion + '", "anio":"' + anio + '", "mes":"' + mes + '", "periodo":"' + anio + '-' + mes + '", "cantidad":"' + cant + '", "observacion":"' + observacion + '", "estado":"A"}';

    salida = th_update(datos, "tortugasAdultas", id_padre, "spntortugasadultas", id);

    $("#td_cc_" + id).html($("#SccTorAdul option:selected").text().toUpperCase());
    $("#td_pob_" + id).html($("#SpoblacionTorAdul option:selected").text().toUpperCase());
    $("#td_anio_" + id).html(anio);
    $("#td_mes_" + id).html(mes);
    $("#td_cant_" + id).html(cant);

}

/*delete datos tortugas adultas*/
function deleteTorAdul(id) {
    console.log(111);
    id_padre = $('#content_TorAdul').parent().attr('id');
    datos = '{"estado":"I","eliminado":"t"}';
    th_delete(datos, "tortugasAdultas", id_padre, "spntortugasadultas", id);
}

/*reporte de estado actual del centro de crianza*/
function dataEstadoActualCC() {
    currentYear = (new Date).getFullYear();
    dataC = '';

    if ($("#FdesdeRep").val() != "") {
        desde = $("#FdesdeRep").val();
        desdeArr = desde.split('-');
        fdesde = desdeArr[1] + "-" + desdeArr[0];
        dataFecha = "&periodo__lte=" + fdesde + "";
    } else
        dataFecha = "";

    if ($("#SccEstadoAct").val() != "")
        dataC = "centro_crianza_id__in=" + $("#SccEstadoAct").val();

    dataC += dataFecha;
    tabla = '';

    $.ajax({
        url: "data_estadoActualCC",
        type: "get",
        data: {
            "data": dataC
        },
        dataType: "json",

        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
            } else {
                if (data.length > 0) {
                    tabla = '';
                    pob_act = '';
                    pob_aux = '111';
                    total_huevos = 0;
                    huevos_sacados = 0;
                    huevos_en_incuv = 0;
                    huevos_nacidos = 0;
                    total_huevosMes = 0;
                    band = 0;
                    bandIns = 1;
                    total = 0;
                    totalJ = 0;
                    bandAux = 0;
                    tabla += "<tr>";
                    tabla += "<td align='center' colspan='12'style='color:white;background-color:#0073b7;'>Juveniles</td>";
                    tabla += "</tr>";
                    for (i = 0; i < data.length; i++) {
                        console.log(total + '**');
                        pob_act = data[i].des_poblacion;

                        if (pob_act == pob_aux) {
                            //total+=data[i].en_corral;

                        } else {
                            if (i > 0) {
                                tabla += "<tr>";
                                tabla += "<td align='left'   style='color:white;background-color:#0073b7; 'colspan='11'></td>";
                                tabla += "<td align='center' style='color:white;background-color:#0073b7;'>" + total + "</td>";
                                tabla += "</tr>";
                                //totalJ+=total;
                                total = 0;
                            }
                        }

                        if (i <= data.length) {
                            if (data[i].tipo == 1) {
                                bandIns = 1;
                            } else {
                                bandIns = 0;
                            }
                            if ((currentYear == data[i].grupo_nacimiento) && (data[i].tipo == 2)) {
                                if (i < (data.length - 1)) {
                                    if (data[i].des_poblacion != data[i + 1].des_poblacion) {
                                        bandIns = 1;
                                        total_huevos += data[i].total_huevos;
                                        huevos_sacados += data[i].huevos_sacados;
                                        //huevos_en_incuv+= data[i].en_incubadora;
                                        huevos_nacidos += data[i].huevos_nacidos;
                                        total_huevosMes = data[i].total_huevos;
                                    } else {
                                        /*acumula totales*/
                                        total_huevos += data[i].total_huevos;
                                        huevos_sacados += data[i].huevos_sacados;
                                        //huevos_en_incuv+= data[i].en_incubadora;
                                        huevos_nacidos += data[i].huevos_nacidos;
                                        total_huevosMes = data[i].total_huevos;
                                        bandIns = 0;
                                    }
                                } else {
                                    bandIns = 1;
                                    total_huevos += data[i].total_huevos;
                                    huevos_sacados += data[i].huevos_sacados;
                                    //huevos_en_incuv+= data[i].en_incubadora;
                                    huevos_nacidos += data[i].huevos_nacidos;
                                    total_huevosMes = data[i].total_huevos;
                                }
                            } else {
                                if ((currentYear == data[i].grupo_nacimiento) && (data[i + 1].tipo == 2)) {
                                    if (i < (data.length - 1)) {
                                        if (data[i].des_poblacion == data[i + 1].des_poblacion) {
                                            bandIns = 0;
                                            bandAux = 1;
                                            muerta = data[i].muerta;
                                            repatriada = data[i].repatriada;
                                            en_corral = data[i].en_corral;
                                        }
                                    }
                                }
                            }

                            if (bandIns == 1) {
                                if (total_huevos == 0) total_huevos = '';
                                if (huevos_sacados == 0) huevos_sacados = '';
                                //if(huevos_en_incuv == 0) huevos_en_incuv = '';
                                if (huevos_nacidos == 0) huevos_nacidos = '';
                                if (total_huevosMes == 0) total_huevosMes = '';


                                if ((total_huevos - total_huevosMes) == 0) mesAnt = "";
                                else mesAnt = total_huevos - total_huevosMes;
                                if ((total_huevos - huevos_sacados) == 0) huevos_en_incuv = "";
                                else huevos_en_incuv = total_huevos - huevos_sacados;

                                if (bandAux == 1) {
                                    muertaAux = muerta;
                                    repatriadaAux = repatriada;
                                    en_corralAux = en_corral;
                                } else {
                                    muertaAux = data[i].muerta;
                                    repatriadaAux = data[i].repatriada;
                                    en_corralAux = data[i].en_corral;
                                }

                                total += en_corralAux;
                                totalJ += en_corralAux;

                                if ((muertaAux == 0) || (muertaAux == null)) muertaAux = '';
                                if ((repatriadaAux == 0) || (repatriadaAux == null)) repatriadaAux = '';
                                if ((en_corralAux == 0) || (en_corralAux == null)) en_corralAux = '';


                                tabla += "<tr>";
                                tabla += "<td align='left'>" + data[i].des_poblacion + "</td>";
                                tabla += "<td align='center'>" + data[i].grupo_nacimiento + "-" + (data[i].grupo_nacimiento + 1) + "</td>";
                                tabla += "<td align='center'>" + mesAnt + "</td>";
                                tabla += "<td align='center'>" + total_huevosMes + "</td>";
                                tabla += "<td align='center'>" + huevos_sacados + "</td>";
                                tabla += "<td align='center'>" + huevos_en_incuv + "</td>";
                                tabla += "<td align='center'>" + huevos_nacidos + "</td>";
                                tabla += "<td align='center'>" + muertaAux + "</td>";
                                tabla += "<td align='center'>" + repatriadaAux + "</td>";
                                tabla += "<td align='center'>" + en_corralAux + "</td>";
                                tabla += "<td align='center'></td>";
                                tabla += "<td align='center'></td>";
                                tabla += "</tr>";



                                /*inicializa totales*/
                                total_huevos = 0;
                                huevos_sacados = 0;
                                huevos_en_incuv = 0;
                                huevos_nacidos = 0;
                                total_huevosMes = 0;
                                bandAux = 0;
                            }
                            pob_aux = pob_act;
                        }
                    }

                    tabla += "<tr>";
                    tabla += "<td align='left' style='background-color:#0073b7;' colspan='11'></td>";
                    tabla += "<td align='center' style='color:white;background-color:#0073b7;'>" + total + "</td>";
                    tabla += "</tr>";
                    //total=0;
                    //totalJ+=total;    
                    tabla += "<tr>";
                    tabla += "<td align='left' colspan='10'></td>";
                    tabla += "<td align='center' style='color:white;background-color:#0073b7;'>Total Juveniles</td>";
                    tabla += "<td align='center' style='color:white;background-color:#0073b7;'>" + totalJ + "</td>";
                    tabla += "</tr>";

                    dataC2 = "centro_crianza_id__id__in=" + $("#SccEstadoAct").val();
                    dataC2 += dataFecha;
                    total = 0;
                    totalA = 0;
                    $.ajax({
                        url: "dataTortugasAdultas",
                        type: "get",
                        data: {
                            "data": dataC2
                        },
                        dataType: "json",
                        async: false,
                        success: function(data) {
                            if (data['non_field_errors']) {
                                console.log(data['non_field_errors']);
                            } else {
                                if (data.length > 0) {
                                    tabla += "<tr>";
                                    tabla += "<td align='center' colspan='12'style='color:white;background-color:#0073b7;'>Adultas</td>";
                                    tabla += "</tr>";


                                    if (data.length == 1) {
                                        tabla += "<tr>";
                                        tabla += "<td align='left'>" + data[0].poblacion_id.descripcion + "</td>";
                                        tabla += "<td align='center' colspan='8'></td>";
                                        tabla += "<td align='center'>" + data[0].cantidad + "</td>";
                                        tabla += "</tr>";
                                    } else {

                                        for (i = 0; i < data.length; i++) {

                                            console.log(data[i].periodo + "******" + fdesde);
                                            if (data[i].periodo == fdesde) {
                                                observ = 'Ingresan ' + data[i].cantidad + ' tortugas';
                                            } else observ = '';

                                            total += data[i].cantidad;
                                            totalA += data[i].cantidad;
                                            if (i < (data.length - 1)) {

                                                if (data[i].poblacion_id.id == data[i + 1].poblacion_id.id) {
                                                    bandIns = 0;
                                                } else
                                                    bandIns = 1;

                                                if (bandIns == 1) {
                                                    tabla += "<tr>";
                                                    tabla += "<td align='left'>" + data[i].poblacion_id.descripcion + "</td>";
                                                    tabla += "<td align='center' colspan='8'>" + observ + "</td>";
                                                    tabla += "<td align='center'>" + total + "</td>";
                                                    tabla += "</tr>";
                                                    total = 0;
                                                }
                                            } else {
                                                tabla += "<tr>";
                                                tabla += "<td align='left'>" + data[i].poblacion_id.descripcion + "</td>";
                                                tabla += "<td align='center' colspan='8'></td>";
                                                tabla += "<td align='center'>" + total + "</td>";
                                                tabla += "</tr>";
                                            }
                                        }
                                    }

                                    tabla += "<tr>";
                                    tabla += "<td align='left' colspan='10'></td>";
                                    tabla += "<td align='center' style='color:white;background-color:#0073b7;'>Total Adultas</td>";
                                    tabla += "<td align='center' style='color:white;background-color:#0073b7;'>" + totalA + "</td>";
                                    tabla += "</tr>";
                                    tabla += "<tr>";
                                    tabla += "<td align='left' colspan='10'></td>";
                                    tabla += "<td align='center' style='color:white;background-color:#0073b7;'>Total Centro Crianza</td>";
                                    tabla += "<td align='center' style='color:white;background-color:#0073b7;'>" + (totalA + totalJ) + "</td>";
                                    tabla += "</tr>";
                                }
                            }
                        },
                        error: function(data) {
                            swal("", "Error: " + JSON.stringify(data), "error");
                            console.log(JSON.stringify(data));
                            //console.log( JSON.stringify(data));
                        },
                    });


                } else {
                    tabla += "<tr>";
                    tabla += "<td colspan='11' align='center'>No existe informacion para este periodo</td>";
                    tabla += "</tr>";
                }
                $("#bodytabla_estAct").html("");
                $("#bodytabla_estAct").append(tabla);
            }
        },
        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
            //console.log( JSON.stringify(data));
        },
    });
}

/*asiganar modulo a funcionarios*/
arrayMod = [];

function asignarModulo(id, modulos, isla) {
    $("#idSitio").val(id);
    //$("#idisla").val(isla);
    arrayMod = [];
    $("#listMod").multiSelect('destroy');
    /*remover los selected*/
    $("#listMod option:selected").each(function() {
        $(this).removeAttr('selected');
    });
    if (modulos != "None") {
        arrayMod = modulos.split('|');
        console.log(arrayMod);
        $("#listMod option").each(function() {
            resp = $.inArray($(this).val(), arrayMod);
            if (resp != -1) {
                $(this).prop('selected', true);
            }
        });
    }
    $("#listMod").multiSelect({
        afterSelect: function(values) {
            arrayMod.push(values[0]);
            console.log(arrayMod);
        },
        afterDeselect: function(values) {
            var indice = arrayMod.indexOf(values[0]); // obtenemos el indice
            arrayMod.splice(indice, 1); // 1 es la cantidad de elemento a eliminar
        }
    });
}

/*asignar modulos a sitios*/
function asignarModulosSitioTable() {
    id = $("#idSitio").val();
    //isla = $("#idisla").val();

    id_padre = $('#content_sitios').parent().attr('id');

    datos = '{"modulo":"' + arrayMod.join('|') + '"}';
    console.log(datos);

    salida = th_update(datos, "sitios", id_padre, "geositio", id);

    $('#td_moodulo_' + id).html("");
    $('#td_moodulo_' + id).html(arrayMod.join('|'));

    $('#btnModSit_' + id).attr('onclick', '');
    $('#btnModSit_' + id).attr('onclick', 'asignarModulo("' + id + '","' + arrayMod.join('|') + '")');
}


/*exportar tabla a excel*/
var tableToExcel = (function() {
    var uri = 'data:application/vnd.ms-excel;base64,',
        template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{table}</table></body></html>',
        base64 = function(s) {
            return window.btoa(unescape(encodeURIComponent(s)))
        },
        format = function(s, c) {
            return s.replace(/{(\w+)}/g, function(m, p) {
                return c[p];
            })
        }
    return function(table, name) {
        if (!table.nodeType) table = document.getElementById(table)
        var ctx = {
            worksheet: name || 'Worksheet',
            table: table.innerHTML
        }
        window.location.href = uri + base64(format(template, ctx))
    }
})()

/*configuracion de graficos*/
themeDataH = {
    colors: ["#DDDF0D", "#7798BF", "#55BF3B", "#DF5353", "#aaeeee", "#ff0066", "#eeaaee",
        "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"
    ],
    chart: {
        backgroundColor: {
            linearGradient: [0, 0, 0, 400],
            stops: [
                [0, 'rgb(96, 96, 96)'],
                [1, 'rgb(16, 16, 16)']
            ]
        },
        borderWidth: 0,
        borderRadius: 15,
        plotBackgroundColor: null,
        plotShadow: false,
        plotBorderWidth: 0
    },
    title: {
        style: {
            color: '#FFF',
            font: '16px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
        }
    },
    subtitle: {
        style: {
            color: '#DDD',
            font: '12px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
        }
    },
    xAxis: {
        gridLineWidth: 0,
        lineColor: '#999',
        tickColor: '#999',
        labels: {
            style: {
                color: '#999',
                fontWeight: 'bold'
            }
        },
        title: {
            style: {
                color: '#AAA',
                font: 'bold 12px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
            }
        }
    },
    yAxis: {
        alternateGridColor: null,
        minorTickInterval: null,
        gridLineColor: 'rgba(255, 255, 255, .1)',
        lineWidth: 0,
        tickWidth: 0,
        labels: {
            style: {
                color: '#999',
                fontWeight: 'bold'
            }
        },
        title: {
            style: {
                color: '#AAA',
                font: 'bold 12px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
            }
        }
    },
    legend: {
        itemStyle: {
            color: '#CCC'
        },
        itemHoverStyle: {
            color: '#FFF'
        },
        itemHiddenStyle: {
            color: '#333'
        }
    },
    labels: {
        style: {
            color: '#CCC'
        }
    },
    tooltip: {
        backgroundColor: {
            linearGradient: [0, 0, 0, 50],
            stops: [
                [0, 'rgba(96, 96, 96, .8)'],
                [1, 'rgba(16, 16, 16, .8)']
            ]
        },
        borderWidth: 0,
        style: {
            color: '#FFF'
        }
    },


    plotOptions: {
        line: {
            dataLabels: {
                color: '#CCC'
            },
            marker: {
                lineColor: '#333'
            }
        },
        spline: {
            marker: {
                lineColor: '#333'
            }
        },
        scatter: {
            marker: {
                lineColor: '#333'
            }
        },
        candlestick: {
            lineColor: 'white'
        }
    },

    toolbar: {
        itemStyle: {
            color: '#CCC'
        }
    },

    navigation: {
        buttonOptions: {
            backgroundColor: {
                linearGradient: [0, 0, 0, 20],
                stops: [
                    [0.4, '#606060'],
                    [0.6, '#333333']
                ]
            },
            borderColor: '#000000',
            symbolStroke: '#C0C0C0',
            hoverSymbolStroke: '#FFFFFF'
        }
    },

    exporting: {
        buttons: {
            exportButton: {
                symbolFill: '#55BE3B'
            },
            printButton: {
                symbolFill: '#7797BE'
            }
        }
    },

    // scroll charts
    rangeSelector: {
        buttonTheme: {
            fill: {
                linearGradient: [0, 0, 0, 20],
                stops: [
                    [0.4, '#888'],
                    [0.6, '#555']
                ]
            },
            stroke: '#000000',
            style: {
                color: '#CCC',
                fontWeight: 'bold'
            },
            states: {
                hover: {
                    fill: {
                        linearGradient: [0, 0, 0, 20],
                        stops: [
                            [0.4, '#BBB'],
                            [0.6, '#888']
                        ]
                    },
                    stroke: '#000000',
                    style: {
                        color: 'white'
                    }
                },
                select: {
                    fill: {
                        linearGradient: [0, 0, 0, 20],
                        stops: [
                            [0.1, '#000'],
                            [0.3, '#333']
                        ]
                    },
                    stroke: '#000000',
                    style: {
                        color: 'yellow'
                    }
                }
            }
        },
        inputStyle: {
            backgroundColor: '#333',
            color: 'silver'
        },
        labelStyle: {
            color: 'silver'
        }
    },

    navigator: {
        handles: {
            backgroundColor: '#666',
            borderColor: '#AAA'
        },
        outlineColor: '#CCC',
        maskFill: 'rgba(16, 16, 16, 0.5)',
        series: {
            color: '#7798BF',
            lineColor: '#A6C7ED'
        }
    },

    scrollbar: {
        barBackgroundColor: {
            linearGradient: [0, 0, 0, 20],
            stops: [
                [0.4, '#888'],
                [0.6, '#555']
            ]
        },
        barBorderColor: '#CCC',
        buttonArrowColor: '#CCC',
        buttonBackgroundColor: {
            linearGradient: [0, 0, 0, 20],
            stops: [
                [0.4, '#888'],
                [0.6, '#555']
            ]
        },
        buttonBorderColor: '#CCC',
        rifleColor: '#FFF',
        trackBackgroundColor: {
            linearGradient: [0, 0, 0, 10],
            stops: [
                [0, '#000'],
                [1, '#333']
            ]
        },
        trackBorderColor: '#666'
    },

    // special colors for some of the demo examples
    legendBackgroundColor: 'rgba(48, 48, 48, 0.8)',
    legendBackgroundColorSolid: 'rgb(70, 70, 70)',
    dataLabelsColor: '#444',
    textColor: '#E0E0E0',
    maskColor: 'rgba(255,255,255,0.3)'
};

Highcharts.theme = {
    colors: ['#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce', '#492970',
        '#f28f43', '#77a1e5', '#c42525', '#a6c96a'
    ],
    chart: {
        backgroundColor: '#fff',
        borderWidth: 0,
        plotBackgroundColor: '#fff',
        plotShadow: false,
        plotBorderWidth: 0
    },
    title: {
        style: {
            color: '#274b6d', //#3E576F',
            fontSize: '16px'
        }
    },
    subtitle: {
        style: {
            color: '#4d759e'
        }
    },
    xAxis: {
        gridLineWidth: 0,
        lineColor: '#C0D0E0',
        tickColor: '#C0D0E0',
        labels: {
            style: {
                color: '#666',
                cursor: 'default',
                fontSize: '11px',
                lineHeight: '14px'
            }
        },
        title: {
            style: {
                color: '#4d759e',
                fontWeight: 'bold'
            }
        }
    },
    yAxis: {
        minorTickInterval: null,
        lineColor: '#C0D0E0',
        lineWidth: 1,
        tickWidth: 1,
        tickColor: '#C0D0E0',
        labels: {
            style: {
                color: '#666',
                cursor: 'default',
                fontSize: '11px',
                lineHeight: '14px'
            }
        },
        title: {
            style: {
                color: '#4d759e',
                fontWeight: 'bold'
            }
        }
    },
    legend: {
        itemStyle: {
            color: '#274b6d',
            fontSize: '12px'
        },
        itemHoverStyle: {
            color: '#000'
        },
        itemHiddenStyle: {
            color: '#CCC'
        }
    },
    labels: {
        style: {
            color: '#3E576F'
        }
    },

    navigation: {
        buttonOptions: {
            theme: {
                stroke: '#CCCCCC'
            }
        }
    }
};
/*fin configuracion de graficos*/

/*nidos*/
/*obtner data de nido segun id*/
function getDataNido(idnido) {
    if (idnido) {
        respReg = $("#SnidoTN option:selected").attr("data-resp_id");
        invitado = $("#SnidoTN option:selected").attr("data-inv");
        fechPrt = $("#SnidoTN option:selected").attr("data-fecha");
        lat = $("#SnidoTN option:selected").attr("data-lat");
        lon = $("#SnidoTN option:selected").attr("data-lng");
        isla = $("#SnidoTN option:selected").attr("data-isla");
        zona = $("#SnidoTN option:selected").attr("data-zona");

        arrayResp = respReg.split("|");

        console.log(lat + "***" + lon);

        if (lat == "None") lat = "";
        if (lon == "None") lon = "";

        $("#responRegTN").val(arrayResp).trigger('change');
        $("#invTorN").val(invitado);
        $("#FProt").val(fechPrt);
        $("#islaNT").val(isla);
        $("#zonaNT").val(zona);
        $("#ptoGpsNT").val(lat + "|" + lon);

        geo = $("#ptoGpsNT").val();

        arrF = [];
        arrF = geo.split("|");
        //console.log(arrF[0].toString().replace(/\,/g, '.'));

        $("#ptoGpsNT").val(arrF[0].toString().replace(/\,/g, '.') + "|" + arrF[1].toString().replace(/\,/g, '.'));
    }
}

/*limpiar formulario de nidos*/
function limpiarFormTorNido() {
    clearForm(frm_TorNido);
    $("#tipoTN").val(0);
    $("#responRegTN").val([]).trigger('change');
    $("#responlibTN").val([]).trigger('change');
}

/*editar registros de nidos de tortugas*/
function editRegistroNidoTor(id) {
    limpiarFormTorNido();
    $("#tipoTN").val(1);
    $.ajax({
        url: "editTortugasNido",
        type: "get",
        data: {
            "data": id
        },
        dataType: "json",

        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
            } else {
                $("#idTorNido").val(data[0].id)
                $("#FProt").val(data[0].fecha_protegido);
                $("#FLiber").val(data[0].fecha_liberacion);
                $("#SnidoTN").val(data[0].num_nido.id).trigger("change");
                $("#neoLib").val(data[0].neo_liberado);
                $("#hnoEclo").val(data[0].huevos_no_eclo);
                $("#muertosTN").val(data[0].muertos);
                $("#escapaTN").val(data[0].escapados);
                $("#htraidoTN").val(data[0].huevos_traidos);
                $("#ntraidoTN").val(data[0].neo_traidos);
                $("#InvTorN").val(data[0].invitado);

                if (data[0].resp_liberar_id != null) {
                    arryRespLb = data[0].resp_liberar_id.split("|");
                    $("#responlibTN").val(arryRespLb).trigger('change');
                }

                $("#observacionTN").val(data[0].observacion);
            }
        },
        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
            //console.log( JSON.stringify(data));
        },
    });
}

function setInsertUpdateTorNido() {
    valida = validaContenedor("addTorNido");
    if (valida) {

        if ($("#tipoTN").val() == 0)
            insertTorNido();
        else
            saveEditTorNido();
    }

}

/*insert datos nidos*/
function insertTorNido() {

    fecha_protegido = $("#FProt").val();
    fecha_liberacion = $("#FLiber").val();
    num_nido = $("#SnidoTN").val();
    neo_liberado = $("#neoLib").val();
    huevos_no_eclo = $("#hnoEclo").val();
    muertos = $("#muertosTN").val();
    escapados = $("#escapaTN").val();
    huevos_traidos = $("#htraidoTN").val();
    neo_traidos = $("#ntraidoTN").val();
    observacion = $("#observacionTN").val();
    invitado = $("#InvTorN").val();

    arrayresPeg = $("#responRegTN").val();

    arrayresRegNom = [];

    $('#responRegTN option:selected').each(function(index) {
        arrayresRegNom.push($(this).attr("data-nombre"));
    });

    //console.log(arrayresPeg.join('|'));
    id_padre = $('#content_TorNido').parent().attr('id');
    datos = '{"fecha_protegido":"' + fecha_protegido + '", "num_nido":"' + num_nido + '","neo_liberado":"' + neo_liberado + '","huevos_no_eclo":"' + huevos_no_eclo + '","muertos":"' + muertos + '","escapados":"' + escapados + '","huevos_traidos":"' + huevos_traidos + '","neo_traidos":"' + neo_traidos + '" ,"resp_registro_id":"' + arrayresPeg.join('|') + '","resp_registro":"' + arrayresRegNom.join(' | ') + '", "estado":"A","invitado":"' + invitado + '"}';
    //console.log(datos);
    th_insert(datos, "tortugasNidos", id_padre, "spncontrolhuevosnidos")

}

/*edit datos nidos*/
function saveEditTorNido() {
    fecha_protegido = $("#FProt").val();
    fecha_liberacion = $("#FLiber").val();
    num_nido = $("#SnidoTN").val();
    neo_liberado = $("#neoLib").val();
    huevos_no_eclo = $("#hnoEclo").val();
    muertos = $("#muertosTN").val();
    escapados = $("#escapaTN").val();
    huevos_traidos = $("#htraidoTN").val();
    neo_traidos = $("#ntraidoTN").val();
    invitado = $("#InvTorN").val();

    arrayresReg = $("#responRegTN").val();
    arrayresLib = $("#responlibTN").val();

    arrayresRegNom = [];
    arrayresLibNom = [];

    $('#responRegTN option:selected').each(function(index) {
        arrayresRegNom.push($(this).attr("data-nombre"));
    });

    if (arrayresLib != null) {
        $('#responlibTN option:selected').each(function(index) {
            arrayresLibNom.push($(this).attr("data-nombre"));
        });
        listaResLibNom = arrayresLibNom.join(' | ');
        listaResLibid = arrayresLib.join(' | ');
    } else {
        listaResLibNom = "";
        listaResLibid = "";
    }

    observacion = $("#observacionTN").val();

    id = $("#idTorNido").val();

    id_padre = $('#content_TorNido').parent().attr('id');

    datos = '{"fecha_protegido":"' + fecha_protegido + '", "num_nido":"' + num_nido + '", "neo_traidos":"' + neo_traidos + '","escapados":"' + escapados + '","muertos":"' + muertos + '","huevos_traidos":"' + huevos_traidos + '","fecha_liberacion":"' + fecha_liberacion + '","neo_liberado":"' + neo_liberado + '","huevos_no_eclo":"' + huevos_no_eclo + '", "observacion":"' + observacion + '", "resp_registro_id":"' + arrayresReg.join('|') + '","resp_liberar_id":"' + listaResLibid + '", "resp_registro":"' + arrayresRegNom.join('|') + '","resp_liberar":"' + listaResLibNom + '","estado":"A","invitado":"' + invitado + '"}';

    salida = th_update(datos, "tortugasNidos", id_padre, "spncontrolhuevosnidos", id);


    $("#td_fp_" + id).html(fecha_protegido);
    $("#td_fl_" + id).html(fecha_liberacion);
    $("#td_nl_" + id).html(neo_liberado);
    $("#td_zn_" + id).html($("#zonaNT").val());
    $("#td_nn_" + id).html($("#SnidoTN option:selected").text().toUpperCase());
    $("#td_hne_" + id).html(huevos_no_eclo);
    $("#td_mu_" + id).html(muertos);
    $("#td_es_" + id).html(escapados);
    $("#td_ht_" + id).html(huevos_traidos);
    $("#td_nt_" + id).html(neo_traidos);
    $("#td_rp_" + id).html(arrayresRegNom.join(' | '));
    $("#td_invt_" + id).html(invitado);
}

/*delete datos nidos*/
function deleteTorNido(id) {
    id_padre = $('#content_TorNido').parent().attr('id');
    datos = '{"estado":"I","eliminado":"t"}';
    th_delete(datos, "tortugasNidos", id_padre, "spncontrolhuevosnidos", id);
}


function limpiarFormNidos() {
    clearForm(frm_Nidos);
    $("#img_nido").attr("src","");
    $("#tipoNido_acc").val(0);
    $("#SfuncionarioNido").val([]).trigger('change');
    $('.nav-tabs a[href="#tab_info"]').tab('show');

}


/*ver datos nidos*/
function editNido(id) {
    limpiarFormNidos();
    $("#tipoNido_acc").val(1);
    $.ajax({
        url: "editNido",
        type: "get",
        data: {
            "data": id
        },
        dataType: "json",

        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
            } else {
                $("#idNido").val(data[0].id);

                $("#img_nido").attr('src', 'data:image/png;base64, '+data[0].foto_nido);
                $("#divimg_nido").attr('rel', 'gallery');
                $("#divimg_nido").addClass('fancybox');
                $("#divimg_nido").attr('href', 'data:image/png;base64, '+data[0].foto_nido);

                $(".fancybox").fancybox();

                $('#SfuncionarioNido').val(data[0].responsable_nido).trigger("change");
                $('#inviNido').val(data[0].invitado);
                $('#StemporadaNido').val(data[0].temporada).trigger("change");
                $('#fecha_protegidos').val(data[0].fecha_protegido);
                $("#SzonaNido").val(data[0].sitio_id.id).trigger("change");
                $("#StipoNido").val(data[0].tipo_nido).trigger("change");
                $("#descNido").val(data[0].descripcion);
                $("#latNido").val(data[0].latitud);
                $("#lonNido").val(data[0].longitud);
                $("#utmnorte").val(data[0].utm_norte);
                $("#utmeste").val(data[0].utm_este);
                $("#utmzona").val(data[0].utm_zona);
                $("#observacionNido").val(data[0].observacion);
                if (data[0].responsable_nido_id != null) {
                    arryRespRg = data[0].responsable_nido_id.split("|");
                    $("#SfuncionarioNido").val(arryRespRg).trigger('change');
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

function setInsertUpdateNido() {
    //valida = validaContenedor("addTorAdul");

    if ($("#tipoNido_acc").val() == 0)
        insertNido();
    else
        saveEditNido();

}

/*insert nidos*/
function insertNido() {

    zona = $("#SzonaNido").val();
    descripcion = $("#descNido").val();
    latitud = $("#latNido").val();
    longitud = $("#lonNido").val();
    observacion = $("#observacionNido").val();
    tipoNido = $("#StipoNido").val();
    utmnorte = $("#utmnorte").val();
    utmeste = $("#utmeste").val();
    utmzona = $("#utmzona").val();

    arrayresRegId = $("#SfuncionarioNido").val();

    arrayresRegNom = [];

    $('#SfuncionarioNido option:selected').each(function(index) {
        arrayresRegNom.push($(this).text());
    });

    invitado = $('#inviNido').val();
    temporada = $('#StemporadaNido').val();
    fecha_protegido = $('#fecha_protegidos').val();

    id_padre = $('#content_nidos').parent().attr('id');
    datos = '{"sitio_id":"' + zona + '", "descripcion":"' + descripcion + '","tipo_nido":"' + tipoNido+'",';
    datos += '"latitud":"' + latitud + '", "longitud":"' + longitud + '", "observacion":"' + observacion + '",';
    datos += '"utm_norte":"' + utmnorte + '", "utm_este":"' + utmeste + '", "utm_zona":"' + utmzona + '",';
    datos += '"estado":"A", "responsable_nido_id":"' + arrayresRegId.join('|') + '", "fecha_protegido":"' + fecha_protegido + '", "temporada":"' + temporada + '","invitado":"' + invitado + '", "responsable_nido":"' + arrayresRegNom.join(' | ') + '"}';
    //console.log(datos);
    th_insert(datos, "nidos", id_padre, "spnnidos");
    $('#addNidos').modal('hide');
}

/*actualizar nidos*/
function saveEditNido() {

    zona = $("#SzonaNido").val();
    zdes = $("#SzonaNido option:selected").text().toUpperCase();
    descripcion = $("#descNido").val();
    latitud = $("#latNido").val();
    longitud = $("#lonNido").val();
    observacion = $("#observacionNido").val();
    tipoNido = $("#StipoNido").val();
    temporada = $('#StemporadaNido').val();
    fecha_protegido = $('#fecha_protegidos').val();
    invitado = $('#inviNido').val();
    utmnorte = $("#utmnorte").val();
    utmeste = $("#utmeste").val();
    utmzona = $("#utmzona").val();

    arrayresRegId = $("#SfuncionarioNido").val();

    arrayresRegNom = [];

    $('#SfuncionarioNido option:selected').each(function(index) {
        arrayresRegNom.push($(this).text());
    });

    id = $("#idNido").val();

    id_padre = $('#content_nidos').parent().attr('id');
    //datos = '{"sitio_id":"' + zona + '", "descripcion":"' + descripcion + '","tipo_nido":"' + tipoNido + '", "latitud":"' + latitud + '", "longitud":"' + longitud + '", "observacion":"' + observacion + '", "responsable_nido_id":"' + arrayresRegId.join('|') + '", "fecha_protegido":"' + fecha_protegido + '", "temporada":"' + temporada + '","invitado":"' + invitado + '", "responsable_nido":"' + arrayresRegNom.join(' | ') + '"}';
    datos = "";
    datos += '{"sitio_id":"' + zona + '", "descripcion":"' + descripcion + '","tipo_nido":"' + tipoNido+'",';
    datos += '"latitud":"' + latitud + '", "longitud":"' + longitud + '", "observacion":"' + observacion + '",';
    datos += '"utm_norte":"' + utmnorte + '", "utm_este":"' + utmeste + '", "utm_zona":"' + utmzona + '",';
    datos += '"estado":"A", "responsable_nido_id":"' + arrayresRegId.join('|') + '", "fecha_protegido":"' + fecha_protegido + '", "temporada":"' + temporada + '","invitado":"' + invitado + '", "responsable_nido":"' + arrayresRegNom.join(' | ') + '"}';
    console.log(datos);
    //salida = th_update(datos, "nidos", 'addNidos', "spnnidos", id);

    $.ajax({
        url: "update_General",
        type: "get",
        cache: 'false',
        data: {
            "dj_url": "spnnidos",
            "idtabla": id,
            "data": JSON.stringify(datos)
        },
        dataType: "json",

        success: function(data) {
            if (data.id == undefined) {
                $('#modalLoadin').hide();
                validaContenedorExt("addNidos", "Error al actualizar el registro");
                console.log("idtabla---->" + id + "--->" + "data---->" + datos + "--->" + "spnnidos" + "Error--->" + data);
            } else {
                swal("", "Registro Actualizado con exito", "success");
                $("#td_des_" + id).html(descripcion);
                $("#td_lat_" + id).html(latitud);
                $("#td_lon_" + id).html(longitud);
                $("#td_zona_" + id).html(zdes);
                $("#td_tipo_" + id).html(tipoNido);
                $('#addNidos').modal('hide');
            }
        },
        error: function(data) {
            $('#modalLoadin').hide();
            validaContenedorExt("addNidos", "Error al actualizar el registro");
            console.log("idtabla---->" + id + "--->" + "data---->" + datos + "--->" + "spnnidos" + "Error--->" + data);
        },
    });

   
}

/*eliminar nidos*/
function deleteNido(id) {
    id_padre = $('#content_nidos').parent().attr('id');
    datos = '{"estado":"I","eliminado":"t"}';
    th_delete(datos, "nidos", id_padre, "spnnidos", id);
}




/*Obtener datos de nidos de petreles*/
function getDataNidoPet(idnido) {
    lat = $("#SnidoPet option:selected").attr("data-lat");
    lon = $("#SnidoPet option:selected").attr("data-lng");
    isla = $("#SnidoPet option:selected").attr("data-isla");
    zona = $("#SnidoPet option:selected").attr("data-zona");


    norte = $("#SnidoPet option:selected").attr("data-not");
    este = $("#SnidoPet option:selected").attr("data-est");
    zona = $("#SnidoPet option:selected").attr("data-zon");

    if (lat == "None")  lat = "";
    if (lon == "None") lon = "";

    $("#islaPet").val(isla);
    $("#zonaPet").val(zona);

    if(lat != "")
        $("#ptoGpsPet").val(lat + "|" + lon);
    else{
        zona = zona.substring(0, zona.length - 1);
        var latlng = UTMtoGeog(este, norte, zona); 
        $("#ptoGpsPet").val(latlng.lat + "|" + latlng.lon);
    }


    geo = $("#ptoGpsPet").val();

    arrF = [];
    arrF = geo.split("|");
    //console.log(arrF[0].toString().replace(/\,/g, '.'));

    $("#ptoGpsPet").val(arrF[0].toString().replace(/\,/g, '.') + "|" + arrF[1].toString().replace(/\,/g, '.'));
}

/*limpiar formulario de nidos de petreles*/
function limpiarFormPetNido() {
    clearForm(frm_PetrelNido);
    $("#tipoPet_acc").val(0);
    $("#participantesPet").val([]).trigger('change');
}

/*editar registro de nidos de petreles segun el id*/
function editRegistroNidoPet(id) {
    console.log("****** editRegistroNidoPet ******");

    limpiarFormPetNido();

    $("#tipoPet_acc").val(1);
    $.ajax({
        url: "editPetrelesNido",
        type: "get",
        data: {
            "data": id
        },
        dataType: "json",

        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
            } else {
                $("#idPetNido").val(data[0].id)
                $("#FrevPet").val(data[0].fecha_revision);
                $("#idnidoPet").val(data[0].num_nido.id);
                $("#nidoPet").val(data[0].num_nido.descripcion);
                $("#InvPet").val(data[0].invitado);

                $("#islaPet").val(data[0].num_nido.sitio_id.isla_id.descripcion);
                $("#zonaPet").val(data[0].utm_zona);

                lat = data[0].num_nido.latitud;
                if(lat != null)
                    $("#ptoGpsPet").val(data[0].num_nido.latitud + "|" + data[0].num_nido.longitud);
                else{
                    zona = data[0].num_nido.utm_zona.substring(0, data[0].num_nido.utm_zona.length - 1);
                    var latlng = UTMtoGeog(data[0].num_nido.utm_este, data[0].num_nido.utm_norte, zona); 
                    $("#ptoGpsPet").val(latlng.lat + "|" + latlng.lon);
                }

                geo = $("#ptoGpsPet").val();

                arrF = [];
                arrF = geo.split("|");
                //console.log(arrF[0].toString().replace(/\,/g, '.'));

                $("#ptoGpsPet").val(arrF[0].toString().replace(/\,/g, '.') + "|" + arrF[1].toString().replace(/\,/g, '.'));

                if (data[0].adulto == 1) $("#adultoPet").prop('checked', true);
                if (data[0].pareja == 1) $("#parejaPet").prop('checked', true);
                if (data[0].huevo == 1) $("#huevoPet").prop('checked', true);
                if (data[0].pichon == 1) $("#pichonPet").prop('checked', true);
                if (data[0].pichon_volo == 1) $("#pichonVoloPet").prop('checked', true);
                if (data[0].rastro == 1) $("#rastroPet").prop('checked', true);
                if (data[0].sin_rastro == 1) $("#sinrastroPet").prop('checked', true);
                if (data[0].nido_largo == 1) $("#nidoLargoPet").prop('checked', true);
                if (data[0].pichon_depredado == 1) $("#pichonDepPet").prop('checked', true);
                if (data[0].nido_destruido == 1) $("#nidoDesPet").prop('checked', true);

                if (data[0].participantes_id != null) {
                    arryRespRg = data[0].participantes_id.split("|");
                    $("#participantesPet").val(arryRespRg).trigger('change');
                }

                $("#observacionPet").val(data[0].observacion);
                $("#num_anilloN").val(data[0].num_anillo_nuevo);
                $("#num_anilloR").val(data[0].num_anillo_recaptura);
            }
        },
        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
            //console.log( JSON.stringify(data));
        },
    });


}

function setInsertUpdatePetNido() {
    valida = validaContenedor("addPetrelNido");
    if (valida) {
        if ($("#tipoPet_acc").val() == 0)
            insertPetNido();
        else
            saveEditPetNido();
    }
}

/*insertar registro de nidos de petreles*/
function insertPetNido() {

    fecha_revision = $("#FrevPet").val();
    num_nido = $("#idnidoPet").val();
    adulto = $("#adultoPet").prop('checked');
    pareja = $("#parejaPet").prop('checked');
    huevo = $("#huevoPet").prop('checked');
    pichon = $("#pichonPet").prop('checked');
    pichon_volo = $("#pichonVoloPet").prop('checked');
    rastro = $("#rastroPet").prop('checked');
    sin_rastro = $("#sinrastroPet").prop('checked');
    nido_largo = $("#nidoLargoPet").prop('checked');
    pichon_depredado = $("#pichonDepPet").prop('checked');
    nido_destruido = $("#nidoDesPet").prop('checked');
    observacion = $("#observacionPet").val();
    invitado = $("#InvPet").val();

    temporada   = $("#StemporadaNidoP").val();

    num_anilloN = $("#num_anilloN").val();
    num_anilloR = $("#num_anilloR").val();

    arrayresPeg = $("#participantesPet").val();

    if (adulto == true) adulto = 1;
    else adulto = 0;
    if (pareja == true) pareja = 1;
    else pareja = 0;
    if (huevo == true) huevo = 1;
    else huevo = 0;
    if (pichon == true) pichon = 1;
    else pichon = 0;
    if (pichon_volo == true) pichon_volo = 1;
    else pichon_volo = 0;
    if (rastro == true) rastro = 1;
    else rastro = 0;
    if (sin_rastro == true) sin_rastro = 1;
    else sin_rastro = 0;
    if (nido_largo == true) nido_largo = 1;
    else nido_largo = 0;
    if (pichon_depredado == true) pichon_depredado = 1;
    else pichon_depredado = 0;
    if (nido_destruido == true) nido_destruido = 1;
    else nido_destruido = 0;
    if (num_anilloN == "") num_anilloN = 0;
    if (num_anilloR == "") num_anilloR = 0;

    arrayresRegNom = [];

    $('#participantesPet option:selected').each(function(index) {
        arrayresRegNom.push($(this).attr("data-nombre"));
    });


    id_padre = $('#content_PetrelNido').parent().attr('id');
    datos = '{"fecha_revision":"' + fecha_revision + '", "num_nido":"' + num_nido + '","num_anillo_nuevo":"' + num_anilloN + '","num_anillo_recaptura":"' + num_anilloR + '", "adulto":"' + adulto + '","pareja":"' + pareja + '","huevo":"' + huevo + '","pichon":"' + pichon + '","pichon_volo":"' + pichon_volo + '","rastro":"' + rastro + '","sin_rastro":"' + sin_rastro + '","nido_largo":"' + nido_largo + '","pichon_depredado":"' + pichon_depredado + '","nido_destruido":"' + nido_destruido + '","observacion":"' + observacion + '", "participantes_id":"' + arrayresPeg.join('|') + '","participantes_nombres":"' + arrayresRegNom.join(' | ') + '", "estado":"A","invitado":"' + invitado + '","temporada":"' + temporada + '"}';
    //console.log(datos);
    th_insert(datos, "petrelesNidos", id_padre, "spncontrolpetrelesnidos");

}

/*actualizar informacion de nidos de petreles*/
function saveEditPetNido() {

    marca = "<i class='fa fa-check'></i>";
    fecha_revision = $("#FrevPet").val();
    num_nido = $("#idnidoPet").val();
    adulto = $("#adultoPet").prop('checked');
    pareja = $("#parejaPet").prop('checked');
    huevo = $("#huevoPet").prop('checked');
    pichon = $("#pichonPet").prop('checked');
    pichon_volo = $("#pichonVoloPet").prop('checked');
    rastro = $("#rastroPet").prop('checked');
    sin_rastro = $("#sinrastroPet").prop('checked');
    nido_largo = $("#nidoLargoPet").prop('checked');
    pichon_depredado = $("#pichonDepPet").prop('checked');
    nido_destruido = $("#nidoDesPet").prop('checked');
    observacion = $("#observacionPet").val();
    invitado = $("#InvPet").val();
    num_anilloN = $("#num_anilloN").val();
    num_anilloR = $("#num_anilloR").val();
    temporada   = $("#StemporadaNidoP").val();

    if (adulto == true) adulto = 1;
    else adulto = 0;
    if (pareja == true) pareja = 1;
    else pareja = 0;
    if (huevo == true) huevo = 1;
    else huevo = 0;
    if (pichon == true) pichon = 1;
    else pichon = 0;
    if (pichon_volo == true) pichon_volo = 1;
    else pichon_volo = 0;
    if (rastro == true) rastro = 1;
    else rastro = 0;
    if (sin_rastro == true) sin_rastro = 1;
    else sin_rastro = 0;
    if (nido_largo == true) nido_largo = 1;
    else nido_largo = 0;
    if (pichon_depredado == true) pichon_depredado = 1;
    else pichon_depredado = 0;
    if (nido_destruido == true) nido_destruido = 1;
    else nido_destruido = 0;

    if (num_anilloN == "") num_anilloN = 0;
    if (num_anilloR == "") num_anilloR = 0;

    arrayresPeg = $("#participantesPet").val();

    arrayresRegNom = [];

    $('#participantesPet option:selected').each(function(index) {
        arrayresRegNom.push($(this).attr("data-nombre"));
    });

    id = $("#idPetNido").val();

    id_padre = $('#content_PetrelNido').parent().attr('id');

    datos = '{"fecha_revision":"' + fecha_revision + '", "num_nido":"' + num_nido + '", "num_anillo_nuevo":"' + num_anilloN + '","num_anillo_recaptura":"' + num_anilloR + '", "adulto":"' + adulto + '","pareja":"' + pareja + '","huevo":"' + huevo + '","pichon":"' + pichon + '","pichon_volo":"' + pichon_volo + '","rastro":"' + rastro + '","sin_rastro":"' + sin_rastro + '","nido_largo":"' + nido_largo + '","pichon_depredado":"' + pichon_depredado + '","nido_destruido":"' + nido_destruido + '","observacion":"' + observacion + '","invitado":"' + invitado + '", "participantes_id":"' + arrayresPeg.join('|') + '","participantes_nombres":"' + arrayresRegNom.join(' | ') + '", "estado":"A","temporada":"' + temporada + '"}';
    //console.log(datos);
    salida = th_update(datos, "petrelesNidos", id_padre, "spncontrolpetrelesnidos", id);

    if (adulto == 0) adulto = "";
    else adulto = marca;
    if (pareja == 0) pareja = "";
    else pareja = marca;
    if (huevo == 0) huevo = "";
    else huevo = marca;
    if (pichon == 0) pichon = "";
    else pichon = marca;
    if (pichon_volo == 0) pichon_volo = "";
    else pichon_volo = marca;
    if (rastro == 0) rastro = "";
    else rastro = marca;
    if (sin_rastro == 0) sin_rastro = "";
    else sin_rastro = marca;

    $("#td_fr_" + id).html(fecha_revision);
    $("#td_tp_" + id).html(temporada);
    $("#td_pn_" + id).html(arrayresRegNom.join(' | '));
    $("#td_nn_" + id).html($("#nidoPet").val());
    $("#td_ad_" + id).html(adulto);
    $("#td_pa_" + id).html(pareja);
    $("#td_hu_" + id).html(huevo);
    $("#td_pi_" + id).html(pichon);
    $("#td_pv_" + id).html(pichon_volo);
    $("#td_ra_" + id).html(rastro);
    $("#td_sr_" + id).html(sin_rastro);
    $("#td_nl_" + id).html(nido_largo);
    $("#td_pd_" + id).html(pichon_depredado);
    $("#td_nd_" + id).html(nido_destruido);
    $("#td_ob_" + id).html(observacion);
    $("#td_inv_" + id).html(invitado);
    $("#td_an_" + id).html(num_anilloN);
    $("#td_ar_" + id).html(num_anilloR);

}

/*eliminar registro nidos de petreles*/
function deletePetNido(id) {
    id_padre = $('#content_PetrelNido').parent().attr('id');
    datos = '{"estado":"I","eliminado":"t"}';
    th_delete(datos, "petrelesNidos", id_padre, "spncontrolpetrelesnidos", id);
}


/*limpiar formulario de registro de avistamineto de flamingos*/
function limpiarFormFla() {
    clearForm(frm_FlaNido);
    $("#tabAve").addClass('disabledTab');
    $("#tabOtro").addClass('disabledTab');
    $("#tabNidos").addClass('disabledTab');
    $("#tipo_acc_fla").val(0);
    $("#SparticipantesFla").val([]).trigger('change');
    $('.nav-tabs a[href="#tab_fla"]').tab('show');
    $("#tbody_otras_esp").html("");
    $("#tbody_otras_aves").html("");
    $("#tbody_datos_nidos").html("");
    $("#infoFladiv").hide();
}

/*ver registro de avistamineto de flamingos*/
function editRegistroFla(id) {
    limpiarFormFla();
    $("#infoFladiv").show();
    $("#tabAve").removeClass('disabledTab');
    $("#tabOtro").removeClass('disabledTab');
    $("#tabNidos").removeClass('disabledTab');
    $("#tipo_acc_fla").val(1);
    $.ajax({
        url: "editFla",
        type: "get",
        data: {
            "data": id
        },
        dataType: "json",

        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
            } else {
                data = JSON.stringify(data).replace(/null/g, '""'); //convert to JSON string
                data = JSON.parse(data); //convert back to array
                $("#idFlaNido").val(data[0].id)
                $("#FregFla").val(data[0].fecha);
                $("#SsitioFla").val(data[0].sitio_id.id).trigger("change");

                $("#hdesdeFla").val(data[0].hora_inicio);
                $("#hfinFla").val(data[0].hora_fin);
                $("#adulFla").val(data[0].adulto);

                $("#SnivAve").val(data[0].nivel_agua).trigger("change");
                $("#ScarAguaAve").val(data[0].caracteristica_agua).trigger("change");

                if (data[0].encargados_id != null) {
                    arryRespRg = data[0].encargados_id.split("|");
                    $("#SparticipantesFla").val(arryRespRg).trigger('change');
                }

                $("#InvFla").val(data[0].invitado);
                $("#observacionFla").val(data[0].observacion);
                getDataFla();
            }
        },
        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
            //console.log( JSON.stringify(data));
        },
    });
}

function setInsertUpdateFla() {
    if ($("#tipo_acc_fla").val() == 0)
        insertFla();
    else
        saveEditFla();
}

/*insertar registro de avistamineto de flamingos*/
function insertFla() {

    fecha = $("#FregFla").val();
    sitio = $("#SsitioFla").val();
    estado_com = $("#SestadoComp").val();
    hora1 = $("#hdesdeFla").val();
    hora2 = $("#hfinFla").val();

    nivelAgua = $("#SnivAve").val();
    caracAgua = $("#ScarAguaAve").val();
    invitado = $("#InvFla").val();

    //dnido = $("#Snido").val();
    //numero = $("#n_nidoFla").val();

    observacion = $("#observacionFla").val();

    arrayresPeg = $("#SparticipantesFla").val();

    arrayresRegNom = [];

    $('#SparticipantesFla option:selected').each(function(index) {
        arrayresRegNom.push($(this).attr("data-nombre"));
    });


    id_padre = $('#content_FlaNido').parent().attr('id');
    datos = '{"fecha":"' + fecha + '", "sitio_id":"' + sitio + '","hora_inicio":"' + hora1 + '","hora_fin":"' + hora2 + '", "observacion":"' + observacion + '", "encargados_id":"' + arrayresPeg.join('|') + '","encargados_nombres":"' + arrayresRegNom.join(' | ') + '","nivel_agua":"' + nivelAgua + '", "caracteristica_agua":"' + caracAgua + '", "estado":"A","invitado":"' + invitado + '"}';
    //console.log(datos);
    th_insert(datos, "flamingosNidos", id_padre, "spncontrolflamingos");

}

/*actualizar registro de avistamineto de flamingos*/
function saveEditFla() {

    fecha = $("#FregFla").val();
    sitio = $("#SsitioFla").val();
    estado_com = $("#SestadoComp").val();
    hora1 = $("#hdesdeFla").val();
    hora2 = $("#hfinFla").val();
    nivelAgua = $("#SnivAve").val();
    caracAgua = $("#ScarAguaAve").val();
    invitado = $("#InvFla").val();

    observacion = $("#observacionFla").val();

    arrayresPeg = $("#SparticipantesFla").val();

    arrayresRegNom = [];

    $('#SparticipantesFla option:selected').each(function(index) {
        arrayresRegNom.push($(this).attr("data-nombre"));
    });

    id = $("#idFlaNido").val();

    id_padre = $('#content_FlaNido').parent().attr('id');

    datos = '{"fecha":"' + fecha + '", "sitio_id":"' + sitio + '","hora_inicio":"' + hora1 + '","hora_fin":"' + hora2 + '", "observacion":"' + observacion + '", "encargados_id":"' + arrayresPeg.join('|') + '","encargados_nombres":"' + arrayresRegNom.join(' | ') + '", "nivel_agua":"' + nivelAgua + '", "caracteristica_agua":"' + caracAgua + '","invitado":"' + invitado + '"}';
    //console.log(datos);
    salida = th_update(datos, "flamingosNidos", id_padre, "spncontrolflamingos", id);

    $("#td_fr_" + id).html(fecha);
    $("#td_enc_" + id).html(arrayresRegNom.join(' | '));
    $("#td_sitio_" + id).html($("#SsitioFla option:selected").text().toUpperCase());
    $("#td_hora1_" + id).html(hora1);
    $("#td_hora2_" + id).html(hora2);
    $("#td_nivA_" + id).html(nivelAgua);
    $("#td_carA_" + id).html(caracAgua);
    $("#td_invF_" + id).html(invitado);

}

/*eliminar registro de avistamineto de flamingos*/
function deleteFla(id) {
    id_padre = $('#content_FlaNido').parent().attr('id');
    datos = '{"estado":"I","eliminado":"t"}';
    th_delete(datos, "flamingosNidos", id_padre, "spncontrolflamingos", id);
}

/*limpiar formulario de registro de avistamineto de flamingos*/
function limpiarDatosFla() {
    $("#SestadoComp").val("").trigger("change");
    $("#adulFla").val("");
    $("#edadFla").val("");
    $("#juvFla").val("");
    $("#picFla").val("");
    $("#tipo_acc_fla_det").val(1);

};

$('#btnAddRowFla').on('click', function() {
    tipo = $("#tipo_acc_fla_det").val();
    //console.log(tipo);
    if (tipo == 1)
        insertRowFla();
    else
        updateRowFla();
});

/*insertar registro de avistamineto de otras especies spncontrolflamingosotrasespecies*/
function insertRowFla() {
    dj_url = "spncontrolflamingosotrasespecies";
    idCab = $("#idFlaNido").val();

    estado = $("#SestadoComp").val();
    adulto = $("#adulFla").val();
    edad = $("#edadFla").val();
    juvenil = $("#juvFla").val();
    pichon = $("#picFla").val();

    if (adulto == "") adulto = 0;
    if (edad == "") edad = 0;
    if (juvenil == "") juvenil = 0;
    if (pichon == "") pichon = 0;

    datos = '{"control_flamingos_id":"' + idCab + '","individuo_id":"f9731db3-2504-4231-af80-b057a7a52115","estado_comportamiento":"' + estado + '","adulto":"' + adulto + '","edad_intermedia":"' + edad + '","juveniles":"' + juvenil + '","pichones":"' + pichon + '","estado":"A","tipo":"0"}';

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
            //console.log(data['results'][0]);
            if (!data['results']) {
                $('#modalLoadin').hide();
                validaContenedorExt("addFlaNido", 'Error Insertando el Registro');
                console.log("data---->" + datos + "--->" + "spncontrolflamingosotrasespecies" + "Error--->" + data);
            } else {
                $('#modalLoadin').hide();
                validaContenedorExt2("addFlaNido", 'Registro insertado con exito');
                getDataFla();
            }
        },
        error: function(data) {
            $('#modalLoadin').hide();
            validaContenedorExt("addFlaNido", 'Error Insertando el Registro');
            console.log("data---->" + datos + "--->" + "spncontrolflamingosotrasespecies--->" + "Error--->" + data);
        },
    });
}

/*actualizar registro de avistamineto de otras especies spncontrolflamingosotrasespecies*/
function updateRowFla() {
    dj_url = "spncontrolflamingosotrasespecies";
    idCab = $("#idFlaNido").val();

    estado = $("#SestadoComp").val();
    adulto = $("#adulFla").val();
    edad = $("#edadFla").val();
    juvenil = $("#juvFla").val();
    pichon = $("#picFla").val();

    if (adulto == "") adulto = 0;
    if (edad == "") edad = 0;
    if (juvenil == "") juvenil = 0;
    if (pichon == "") pichon = 0;

    id = $("#iddatoFla").val();

    datos = '{"control_flamingos_id":"' + idCab + '","estado_comportamiento":"' + estado + '","adulto":"' + adulto + '","edad_intermedia":"' + edad + '","juveniles":"' + juvenil + '","pichones":"' + pichon + '"}';

    $.ajax({
        url: "update_General",
        type: 'get',
        cache: 'false',
        data: {
            "dj_url": dj_url,
            "idtabla": id,
            "data": JSON.stringify(datos)
        },
        dataType: "json",
        success: function(data) {
            if (data.id == undefined) {
                $('#modalLoadin').hide();
                validaContenedorExt("addFlaNido", 'Error al actualizar el registro');
                console.log("idtabla---->" + id + "--->" + "data---->" + datos + "--->" + "spncontrolflamingosotrasespecies" + "Error--->" + data);
            } else {
                //console.log(data);
                $('#modalLoadin').hide();
                validaContenedorExt2("addFlaNido", 'Registro Actualizado con exito');
                getDataFla();
            }
        },
        error: function(data) {
            $('#modalLoadin').hide();
            validaContenedorExt("addFlaNido", 'Error al actualizar el registro');
            console.log("idtabla---->" + id + "--->" + "data---->" + datos + "--->" + "spncontrolflamingosotrasespecies" + "Error--->" + data);
        },
    });
}

/*eliminar registro de avistamineto de otras especies spncontrolflamingosotrasespecies*/
$('#table_fla').on('click', '.delete', function(e) {
    datosD = '';
    var bool = confirm("Seguro de eliminar el dato?");
    if (bool) {
        var dataTD = $(this).parents('tr').find("td");

        id = $(dataTD).eq(6).html();
        datosD += '{';
        datosD += ' "estado":"I",';
        datosD += ' "eliminado":"t"';
        datosD += '}';


        dj_url = 'spncontrolflamingosotrasespecies';
        $.ajax({
            url: "update_General",
            type: 'get',
            cache: 'false',
            data: {
                "dj_url": dj_url,
                "idtabla": id,
                "data": JSON.stringify(datosD)
            },
            dataType: "json",
            async: false,
            success: function(data2) {
                if (data2.id == undefined) {
                    validaContenedorExt("addFlaNido", 'Error al Eliminar el registro');
                    console.log("idtabla---->" + id + "--->" + "data---->" + datosD + "--->" + "spncontrolflamingosotrasespecies" + "Error--->" + data2);
                } else {
                    console.log('ok');
                    validaContenedorExt2("addFlaNido", 'Registro Eliminado con exito');
                    getDataFla();

                }
            },
            error: function(data2) {
                validaContenedorExt("addFlaNido", 'Error al Eliminar el registro');
                console.log("idtabla---->" + id + "--->" + "data---->" + datosD + "--->" + "spncontrolflamingosotrasespecies" + "Error--->" + data2);
            },
        });
    } else {
        console.log(11);
        //return 0;
    }
});

/*ver registro de avistamineto de flamingos*/
function getDataFla() {

    cab = $("#idFlaNido").val();
    $("#tipo_acc_fla_det").val(1);
    table = '';
    $.ajax({
        url: "data_observFla",
        type: "get",
        data: {
            "data": cab
        },
        dataType: "json",

        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
            } else {
                var old = JSON.stringify(data).replace(/null/g, '""'); //convert to JSON string
                var data = JSON.parse(old); //convert back to array
                tabla = "";
                if (data.length > 0) {
                    for (i = 0; i < data.length; i++) {
                        if (data[i].estado_comportamiento != "") comp = data[i].estado_comportamiento;
                        else comp = "";

                        table += '<tr>';
                        table += '<td>' + comp + '</td>';
                        table += '<td>' + data[i].adulto + '</td>';
                        table += '<td>' + data[i].edad_intermedia + '</td>';
                        table += '<td>' + data[i].juveniles + '</td>';
                        table += '<td>' + data[i].pichones + '</td>';
                        table += '<td hidden>' + data[i].estado_comportamiento + '</td>';
                        table += '<td hidden>' + data[i].id + '</td>';
                        table += '<td><a class="delete" style="cursor: pointer;"> <i class="fa fa-trash text-green" title="Eliminar"></i> </a></td>';
                        table += '</tr>';
                    }
                }
                $("#tbody_fla").html("");
                $("#tbody_fla").append(table);
                limpiarDatosFla();
            }
        },
        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
            //console.log( JSON.stringify(data));
        },
    });
}

$('#table_fla').on('click', 'tr', function(e) {
    $("#tipo_acc_fla_det").val(0);
    var lenRow = $('#table_fla tbody tr').length;
    var data = $(this).find("td");

    $("#SestadoComp").val($(data).eq(5).html()).trigger("change");
    $("#adulFla").val($(data).eq(1).html());
    $("#edadFla").val($(data).eq(2).html());
    $("#juvFla").val($(data).eq(3).html());
    $("#picFla").val($(data).eq(4).html());
    $("#picFla").val($(data).eq(4).html());
    $("#iddatoFla").val($(data).eq(6).html());
});

/*limpiar formulario regsitro de otras especies*/
function limpiarDatosOtras() {
    $("#SindividuoOtro").val("").trigger("change");
    $("#numOtro").val("");
    $("#tipo_acc_otro").val(1);

};

/*ver datos registro de otras especies*/
function getDataOtras() {
    id = $("#idFlaNido").val();
    $("#tipo_acc_otro").val(1);
    table = '';
    $.ajax({
        url: "data_observOtrasEsp",
        type: "get",
        data: {
            "data": id
        },
        dataType: "json",

        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
            } else {
                var old = JSON.stringify(data).replace(/null/g, '""'); //convert to JSON string
                var data = JSON.parse(old); //convert back to array
                tabla = "";
                if (data.length > 0) {
                    for (i = 0; i < data.length; i++) {
                        table += '<tr>';
                        table += '<td>' + data[i].individuo_id.nombre_comun + '</td>';
                        table += '<td>' + data[i].numero + '</td>';
                        table += '<td hidden>' + data[i].individuo_id.id + '</td>';
                        table += '<td hidden>' + data[i].id + '</td>';
                        table += '<td><a class="delete" style="cursor: pointer;"> <i class="fa fa-trash text-green" title="Eliminar"></i> </a></td>';
                        table += '</tr>';
                    }
                }
                $("#tbody_otras_esp").html("");
                $("#tbody_otras_esp").append(table);
                limpiarDatosOtras();
            }
        },
        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
            //console.log( JSON.stringify(data));
        },
    });
}


$('#btnAddRowOtro').on('click', function() {
    tipo = $("#tipo_acc_otro").val();
    //console.log(tipo);
    if (tipo == 1)
        insertRowOtro();
    else
        updateRowOtro();
});

/*insertar registro de avistamineto otras especies*/
function insertRowOtro() {
    dj_url = "spncontrolflamingosotrasespecies";
    idfla = $("#idFlaNido").val();

    ind = $("#SindividuoOtro").val();
    num = $("#numOtro").val();

    datos = '{"control_flamingos_id":"' + idfla + '", "individuo_id":"' + ind + '","numero":"' + num + '","estado":"A","tipo":"2"}';

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
                validaContenedorExt("addFlaNido", 'Error Insertando el Registro');
                console.log("data---->" + datos + "--->" + "spncontrolflamingosotrasespecies" + "Error--->" + data);
            } else {
                //console.log(data);
                $('#modalLoadin').hide();
                validaContenedorExt2("addFlaNido", 'Registro insertado con exito');
                getDataOtras();
            }
        },
        error: function(data) {
            $('#modalLoadin').hide();
            validaContenedorExt("addFlaNido", 'Error Insertando el Registro');
            console.log("data---->" + datos + "--->" + "spncontrolflamingosotrasespecies" + "Error--->" + data);
        },
    });
}

/*actualizar registro de avistamineto otras especies*/
function updateRowOtro() {
    dj_url = "spncontrolflamingosotrasespecies";
    idFla = $("#idFlaNido").val();

    ind = $("#SindividuoOtro").val();
    num = $("#numOtro").val();

    id = $("#iddatoOtro").val();

    datos = '{"control_flamingos_id":"' + idFla + '", "individuo_id":"' + ind + '","numero":"' + num + '"}';

    $.ajax({
        url: "update_General",
        type: 'get',
        cache: 'false',
        data: {
            "dj_url": dj_url,
            "idtabla": id,
            "data": JSON.stringify(datos)
        },
        dataType: "json",
        success: function(data) {
            if (data.id == undefined) {
                $('#modalLoadin').hide();
                validaContenedorExt("addFlaNido", 'Error al actualizar el registro');
                console.log("idtabla---->" + id + "--->" + "data---->" + datos + "--->" + "spncontrolflamingosotrasespecies" + "Error--->" + data);
            } else {
                //console.log(data);
                $('#modalLoadin').hide();
                validaContenedorExt2("addFlaNido", 'Registro Actualizado con exito');
                getDataOtras();
            }
        },
        error: function(data) {
            $('#modalLoadin').hide();
            validaContenedorExt("addFlaNido", 'Error al actualizar el registro');
            console.log("idtabla---->" + id + "--->" + "data---->" + datos + "--->" + "spncontrolflamingosotrasespecies" + "Error--->" + data);
        },
    });
}

/*eliminar registro de avistamineto otras especies*/
$('#table_otras_esp').on('click', '.delete', function(e) {
    datosD = '';
    var bool = confirm("Seguro de eliminar el dato?");
    if (bool) {
        var dataTD = $(this).parents('tr').find("td");

        id = $(dataTD).eq(3).html();
        datosD += '{';
        datosD += ' "estado":"I",';
        datosD += ' "eliminado":"t"';
        datosD += '}';


        dj_url = 'spncontrolflamingosotrasespecies';
        $.ajax({
            url: "update_General",
            type: 'get',
            cache: 'false',
            data: {
                "dj_url": dj_url,
                "idtabla": id,
                "data": JSON.stringify(datosD)
            },
            dataType: "json",
            async: false,
            success: function(data2) {
                if (data2.id == undefined) {
                    validaContenedorExt("addFlaNido", 'Error al Eliminar el registro');
                    console.log("idtabla---->" + id + "--->" + "data---->" + datosD + "--->" + "spncontrolflamingosotrasespecies" + "Error--->" + data2);
                } else {
                    console.log('ok');
                    validaContenedorExt2("addFlaNido", 'Registro Eliminado con exito');
                    getDataOtras();

                }
            },
            error: function(data2) {
                validaContenedorExt("addFlaNido", 'Error al Eliminar el registro');
                console.log("idtabla---->" + id + "--->" + "data---->" + datosD + "--->" + "spncontrolflamingosotrasespecies" + "Error--->" + data2);
            },
        });
    } else {
        return 0;
    }
});


$('#table_otras_esp').on('click', 'tr', function(e) {
    $("#tipo_acc_otro").val(0);
    var lenRow = $('#table_otras_esp tbody tr').length;
    //var data = $(this).parents('tr').find("td");
    var data = $(this).find("td");

    $("#numOtro").val($(data).eq(1).html());
    $("#SindividuoOtro").val($(data).eq(2).html()).trigger("change");
    $("#iddatoOtro").val($(data).eq(3).html());
});


// PESTAÑA DATOS DE NIDOS
/*limpiar formulario registro de avistamineto nidos*/
function limpiarDatosNidos() {
    $("#Snido").val("").trigger("change");
    $("#numNido").val("");
    $("#tipo_acc_nido").val(1);

};

/*ver informacion de registro de avistamineto nidos*/
function getDataNidos() {
    id = $("#idFlaNido").val();
    $("#tipo_acc_nido").val(1);
    table = '';
    $.ajax({
        url: "data_datosNidos",
        type: "get",
        data: {
            "data": id
        },
        dataType: "json",

        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
            } else {
                var old = JSON.stringify(data).replace(/null/g, '""'); //convert to JSON string
                var data = JSON.parse(old); //convert back to array
                tabla = "";
                if (data.length > 0) {
                    for (i = 0; i < data.length; i++) {
                        table += '<tr>';
                        table += '<td>' + data[i].datos_nidos_id.label + '</td>';
                        table += '<td>' + data[i].numero_nidos + '</td>';
                        table += '<td hidden>' + data[i].datos_nidos_id.id + '</td>';
                        table += '<td hidden>' + data[i].id + '</td>';
                        table += '<td><a class="delete" style="cursor: pointer;"> <i class="fa fa-trash text-green" title="Eliminar"></i> </a></td>';
                        table += '</tr>';
                    }
                }
                $("#tbody_datos_nidos").html("");
                $("#tbody_datos_nidos").append(table);
                limpiarDatosNidos();
            }
        },
        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
            //console.log( JSON.stringify(data));
        },
    });
}

/*add registro de avistamineto nidos*/
$('#btnAddRowNidos').on('click', function() {
    tipo = $("#tipo_acc_nido").val();
    console.log(tipo);
    if (tipo == 1)
        insertRowNidos();
    else
        updateRowNidos();
});

/*insertar registro de avistamineto nidos*/
function insertRowNidos() {
    dj_url = "spncontrolflamingosotrasespecies";
    idfla = $("#idFlaNido").val();

    ind = $("#Snido").val();
    num = $("#numNido").val();

    datos = '{"control_flamingos_id":"' + idfla + '", "datos_nidos_id":"' + ind + '","numero_nidos":"' + num + '","estado":"A","tipo":"3"}';

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
                validaContenedorExt("addFlaNido", 'Error Insertando el Registro');
                console.log("data---->" + datos + "--->" + "spncontrolflamingosotrasespecies" + "Error--->" + data);
            } else {
                //console.log(data);
                $('#modalLoadin').hide();
                validaContenedorExt2("addFlaNido", 'Registro insertado con exito');
                getDataNidos();
            }
        },
        error: function(data) {
            $('#modalLoadin').hide();
            validaContenedorExt("addFlaNido", 'Error Insertando el Registro');
            console.log("data---->" + datos + "--->" + "spncontrolflamingosotrasespecies" + "Error--->" + data);
        },
    });
}

/*actualizar registro de avistamineto nidos*/
function updateRowNidos() {
    dj_url = "spncontrolflamingosotrasespecies";
    idFla = $("#idFlaNido").val();

    ind = $("#Snido").val();
    num = $("#numNido").val();

    id = $("#iddatoNido").val();

    datos = '{"control_flamingos_id":"' + idFla + '", "datos_nidos_id":"' + ind + '","numero_nidos":"' + num + '"}';

    $.ajax({
        url: "update_General",
        type: 'get',
        cache: 'false',
        data: {
            "dj_url": dj_url,
            "idtabla": id,
            "data": JSON.stringify(datos)
        },
        dataType: "json",
        success: function(data) {
            if (data.id == undefined) {
                $('#modalLoadin').hide();
                validaContenedorExt("addFlaNido", 'Error al actualizar el registro');
                console.log("idtabla---->" + id + "--->" + "data---->" + datos + "--->" + "spncontrolflamingosotrasespecies" + "Error--->" + data);
            } else {
                //console.log(data);
                $('#modalLoadin').hide();
                validaContenedorExt2("addFlaNido", 'Registro Actualizado con exito');
                getDataNidos();
            }
        },
        error: function(data) {
            $('#modalLoadin').hide();
            validaContenedorExt("addFlaNido", 'Error al actualizar el registro');
            console.log("idtabla---->" + id + "--->" + "data---->" + datos + "--->" + "spncontrolflamingosotrasespecies" + "Error--->" + data);
        },
    });
}

/*eliminar registro de avistamineto nidos*/
$('#table_datos_nido').on('click', '.delete', function(e) {
    datosD = '';
    var bool = confirm("Seguro de eliminar el dato?");
    if (bool) {
        var dataTD = $(this).parents('tr').find("td");

        id = $(dataTD).eq(3).html();
        datosD += '{';
        datosD += ' "estado":"I",';
        datosD += ' "eliminado":"t"';
        datosD += '}';


        dj_url = 'spncontrolflamingosotrasespecies';
        $.ajax({
            url: "update_General",
            type: 'get',
            cache: 'false',
            data: {
                "dj_url": dj_url,
                "idtabla": id,
                "data": JSON.stringify(datosD)
            },
            dataType: "json",
            async: false,
            success: function(data2) {
                if (data2.id == undefined) {
                    validaContenedorExt("addFlaNido", 'Error al Eliminar el registro');
                    console.log("idtabla---->" + id + "--->" + "data---->" + datosD + "--->" + "spncontrolflamingosotrasespecies" + "Error--->" + data2);
                } else {
                    console.log('ok');
                    validaContenedorExt2("addFlaNido", 'Registro Eliminado con exito');
                    getDataNidos();

                }
            },
            error: function(data2) {
                validaContenedorExt("addFlaNido", 'Error al Eliminar el registro');
                console.log("idtabla---->" + id + "--->" + "data---->" + datosD + "--->" + "spncontrolflamingosotrasespecies" + "Error--->" + data2);
            },
        });
    } else {
        return 0;
    }
});


$('#table_datos_nido').on('click', 'tr', function(e) {
    $("#tipo_acc_nido").val(0);
    var lenRow = $('#table_datos_nido tbody tr').length;
    //var data = $(this).parents('tr').find("td");
    var data = $(this).find("td");

    $("#numNido").val($(data).eq(1).html());
    $("#Snido").val($(data).eq(2).html()).trigger("change");
    $("#iddatoNido").val($(data).eq(3).html());
});


// PESTAÑA OTRAS AVES
/*ver registro de avistamineto otras aves*/
function getDataAves() {
    id = $("#idFlaNido").val();
    $("#tipo_acc_ave").val(1);
    table = '';
    $.ajax({
        url: "data_observAves",
        type: "get",
        data: {
            "data": id
        },
        dataType: "json",

        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
            } else {
                var old = JSON.stringify(data).replace(/null/g, '""'); //convert to JSON string
                var data = JSON.parse(old); //convert back to array
                tabla = "";
                if (data.length > 0) {
                    for (i = 0; i < data.length; i++) {
                        table += '<tr>';
                        table += '<td>' + data[i].individuo_id.nombre_comun + '</td>';
                        table += '<td>' + data[i].numero + '</td>';
                        table += '<td>' + $("#SnivAve option:selected").text().toUpperCase() + '</td>';
                        table += '<td>' + $("#ScarAguaAve option:selected").text().toUpperCase() + '</td>';
                        table += '<td hidden>' + data[i].individuo_id.id + '</td>';
                        table += '<td hidden>' + data[i].id + '</td>';
                        table += '<td hidden>' + data[i].nivel_agua + '</td>';
                        table += '<td hidden>' + data[i].caracteristica_agua + '</td>';
                        table += '<td><a class="delete" style="cursor: pointer;"> <i class="fa fa-trash text-green" title="Eliminar"></i> </a></td>';
                        table += '</tr>';
                    }
                }
                $("#tbody_otras_aves").html("");
                $("#tbody_otras_aves").append(table);
                limpiarDatosAves();
            }
        },
        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
            //console.log( JSON.stringify(data));
        },
    });
}

/*limpiar formulario de avistamineto otras aves*/
function limpiarDatosAves() {
    $("#SindividuoAve").val("").trigger("change");
    $("#numAve").val("");
    //$("#SnivAve").val("").trigger("change");
    //$("#ScarAguaAve").val("").trigger("change");
    $("#iddatoAve").val("");
    $("#tipo_acc_ave").val(1);

};


$('#btnAddRowAve').on('click', function() {
    tipo = $("#tipo_acc_ave").val();

    if (tipo == 1)
        insertRowAve();
    else
        updateRowAve();
});

/*insertar registro de avistamineto otras aves*/
function insertRowAve() {
    dj_url = "spncontrolflamingosotrasespecies";
    id = $("#idFlaNido").val();

    ind = $("#SindividuoAve").val();
    num = $("#numAve").val();
    niv = $("#SnivAve").val();
    car = $("#ScarAguaAve").val();

    datos = '{"control_flamingos_id":"' + id + '", "individuo_id":"' + ind + '","numero":"' + num + '","estado":"A","tipo":"1"}';

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
                validaContenedorExt("addFlaNido", 'Error Insertando el Registro');
                console.log("data---->" + datos + "--->" + "spncontrolflamingosotrasespecies" + "Error--->" + data);
            } else {

                $('#modalLoadin').hide();
                validaContenedorExt2("addFlaNido", 'Registro insertado con exito');
                getDataAves();
            }
        },
        error: function(data) {
            $('#modalLoadin').hide();
            validaContenedorExt("addFlaNido", 'Error Insertando el Registro');
            console.log("data---->" + datos + "--->" + "spncontrolflamingosotrasespecies" + "Error--->" + data);
        },
    });
}

/*actualizar registro de avistamineto otras aves*/
function updateRowAve() {
    dj_url = "spncontrolflamingosotrasespecies";
    idFla = $("#idFlaNido").val();

    ind = $("#SindividuoAve").val();
    num = $("#numAve").val();
    niv = $("#SnivAve").val();
    car = $("#ScarAguaAve").val();
    id = $("#iddatoAve").val();

    datos = '{"control_flamingos_id":"' + idFla + '", "individuo_id":"' + ind + '","numero":"' + num + '","estado":"A"}';

    $.ajax({
        url: "update_General",
        type: 'get',
        cache: 'false',
        data: {
            "dj_url": dj_url,
            "idtabla": id,
            "data": JSON.stringify(datos)
        },
        dataType: "json",
        success: function(data) {
            if (data.id == undefined) {
                $('#modalLoadin').hide();
                validaContenedorExt("addFlaNido", 'Error al actualizar el registro');
                console.log("idtabla---->" + id + "--->" + "data---->" + datos + "--->" + "spncontrolflamingosotrasespecies" + "Error--->" + data);
            } else {

                $('#modalLoadin').hide();
                validaContenedorExt2("addFlaNido", 'Registro Actualizado con exito');
                getDataAves();
            }
        },
        error: function(data) {
            $('#modalLoadin').hide();
            validaContenedorExt("addFlaNido", 'Error al actualizar el registro');
            console.log("idtabla---->" + id + "--->" + "data---->" + datos + "--->" + "spncontrolflamingosotrasespecies" + "Error--->" + data);
        },
    });
}

/*eliminar registro de avistamineto otras aves*/
$('#table_otras_aves').on('click', '.delete', function(e) {

    datosD = '';
    var bool = confirm("Seguro de eliminar el dato?");
    if (bool) {
        var dataTD = $(this).parents('tr').find("td");

        id = $(dataTD).eq(5).html();
        datosD += '{';
        datosD += ' "estado":"I",';
        datosD += ' "eliminado":"t"';
        datosD += '}';


        dj_url = 'spncontrolflamingosotrasespecies';
        $.ajax({
            url: "update_General",
            type: 'get',
            cache: 'false',
            data: {
                "dj_url": dj_url,
                "idtabla": id,
                "data": JSON.stringify(datosD)
            },
            dataType: "json",
            async: false,
            success: function(data2) {
                if (data2.id == undefined) {
                    validaContenedorExt("addFlaNido", 'Error al Eliminar el registro');
                    console.log("idtabla---->" + id + "--->" + "data---->" + datosD + "--->" + "spncontrolflamingosotrasespecies" + "Error--->" + data2);
                } else {

                    validaContenedorExt2("addFlaNido", 'Registro Eliminado con exito');
                    getDataAves();

                }
            },
            error: function(data2) {
                validaContenedorExt("addFlaNido", 'Error al Eliminar el registro');
                console.log("idtabla---->" + id + "--->" + "data---->" + datosD + "--->" + "spncontrolflamingosotrasespecies" + "Error--->" + data2);
            },
        });
    } else {
        return 0;
    }

});


$('#table_otras_aves').on('click', 'tr', function(e) {
    $("#tipo_acc_ave").val(0);
    var lenRow = $('#table_otras_aves tbody tr').length;
    //var data = $(this).parents('tr').find("td");
    var data = $(this).find("td");

    $("#numAve").val($(data).eq(1).html());
    $("#SnivAve").val($(data).eq(6).html()).trigger("change");
    $("#ScarAguaAve").val($(data).eq(7).html()).trigger("change");
    $("#SindividuoAve").val($(data).eq(4).html()).trigger("change");
    $("#iddatoAve").val($(data).eq(5).html());
});

/*buscar registros de nidos de tortugas segun los parametros ingresados*/
function buscarTorNidoParametros(dataIni) {
    data = '';
    var fdesde;
    var fhasta;
    if (dataIni) {
        data = data += "fecha_protegido__range=" + dataIni;
    } else {

        desde = $("#FdesdePTorNido").val();
        hasta = $("#FhastaPTorNido").val();

        if ((desde == "") || (hasta == ""))
            cadenaFecha = "";
        else
            cadenaFecha = "1";

        desde1 = $("#FdLibPTorNido").val();
        hasta1 = $("#FhLibPTorNido").val();

        if ((desde1 == "") || (hasta1 == ""))
            cadenaFecha1 = "";
        else
            cadenaFecha1 = "1";

        nombre = $("#respPTorNido").val();
        nido = $("#nidoPTorNido").val();
        zona = $("#zonaPTorNido").val();

        if (cadenaFecha != "") {
            desdeArr = desde.split('/');
            hastaArr = hasta.split('/');

            fdesde = desdeArr[2] + "-" + desdeArr[0] + "-" + desdeArr[1];
            fhasta = hastaArr[2] + "-" + hastaArr[0] + "-" + hastaArr[1];
        }

        if (cadenaFecha1 != "") {
            desdeArr1 = desde1.split('/');
            hastaArr1 = hasta1.split('/');

            fdesde1 = desdeArr1[2] + "-" + desdeArr1[0] + "-" + desdeArr1[1];
            fhasta1 = hastaArr1[2] + "-" + hastaArr1[0] + "-" + hastaArr1[1];
        }

        data = '';
        dataIni = fdesde + ',' + fhasta;

        if (nombre != "")
            data = "resp_registro__icontains=" + nombre + "&";

        if (nido != "")
            data += "num_nido__descripcion__icontains=" + nido + "&";

        if (zona != "")
            data += "num_nido__sitio_id__descripcion__icontains=" + zona + "&";

        if (cadenaFecha != "")
            data += "fecha_protegido__range=" + fdesde + "," + fhasta + "&";

        if (cadenaFecha1 != "")
            data += "fecha_liberacion__range=" + fdesde1 + "," + fhasta2 + "&";

        data = data.substring(0, data.length - 1);
    }

    array = [];

    $.ajax({
        url: "data_ParamTorNido",
        type: "get",
        data: {
            "data": data
        },
        dataType: "json",

        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
            } else {
                var old = JSON.stringify(data).replace(/null/g, '""'); //convert to JSON string
                var data = JSON.parse(old); //convert back to array
                tabla = "";
                dataArray = "";
                if (data.length > 0) {
                    for (i = 0; i < data.length; i++) {

                        dataArray += '{"zona":"' + data[i].num_nido.sitio_id.descripcion + '","neo_lib":"' + data[i].neo_liberado + '","huevo_no_ecl":"' + data[i].huevos_no_eclo + '","muertos":"' + data[i].muertos + '","escapados":"' + data[i].escapados + '","huevos_traidos":"' + data[i].huevos_traidos + '","neo_traidos":"' + data[i].neo_traidos + '"},'

                        tabla += "<tr>";
                        tabla += "<td align='center' id='td_fp_" + data[i].id + "'>" + data[i].fecha_protegido + "</td>";
                        tabla += "<td align='center' id='td_fl_" + data[i].id + "'>" + data[i].fecha_liberacion + "</td>";
                        tabla += "<td align='center' id='td_zn_" + data[i].id + "'>" + data[i].num_nido.sitio_id.descripcion + "</td>";
                        tabla += "<td align='center' id='td_nn_" + data[i].id + "'>" + data[i].num_nido.descripcion + "</td>";
                        tabla += "<td align='center' id='td_nl_" + data[i].id + "'>" + data[i].neo_liberado + "</td>";
                        tabla += "<td align='center' id='td_hne_" + data[i].id + "'>" + data[i].huevos_no_eclo + "</td>";
                        tabla += "<td align='center' id='td_mu_" + data[i].id + "'>" + data[i].muertos + "</td>";
                        tabla += "<td align='center' id='td_es_" + data[i].id + "'>" + data[i].escapados + "</td>";
                        tabla += "<td align='center' id='td_ht_" + data[i].id + "'>" + data[i].huevos_traidos + "</td>";
                        tabla += "<td align='center' id='td_nt_" + data[i].id + "'>" + data[i].neo_traidos + "</td>";
                        tabla += "<td align='left' id='td_rp_" + data[i].id + "'>" + data[i].resp_registro + "</td>";
                        tabla += "<td align='left' id='td_rp_" + data[i].id + "'>" + data[i].resp_liberar + "</td>";
                        tabla += "<td align='left' id='td_rp_" + data[i].id + "'>" + data[i].observacion + "</td>";

                        if ($("#perm_change_spncontrolhuevosnidos").val() == "1") {
                            tabla += "<td align='center'><a href='#addTorNido' data-stackbox='true' data-stackbox-position='absolute' onclick='editRegistroNidoTor(\"" + data[i].id + "\")'><i class='fa fa-edit text-green'></i></a></td>";
                        } else {
                            tabla += "<td> </td>";
                        }

                        tabla += "<td align='center'><a style='cursor: pointer;' onclick='deleteModal(\"" + data[i].id + "\",\"TorNido\");'><i class='fa fa-trash text-green' title='Eliminar'></i></a></td>";
                        tabla += "</tr>";
                        //array.push(dataArray);
                    }
                    dataArray = dataArray.substring(0, dataArray.length - 1);
                    dataArray = "[" + dataArray + "]";
                    jdataArray = jQuery.parseJSON(dataArray);
                    var result = [];
                    var zonaArr = [];
                    jdataArray.reduce(function(res, value) {
                        if (!res[value.zona]) {
                            res[value.zona] = {
                                name: value.zona,
                                data: [0, 0, 0, 0, 0, 0]
                            };
                            result.push(res[value.zona])
                            zonaArr.push(value.zona);
                        }

                        if (value.neo_lib == "") value.neo_lib = 0;
                        res[value.zona].data[0] += parseInt(value.neo_lib);
                        if (value.huevo_no_ecl == "") value.huevo_no_ecl = 0;
                        res[value.zona].data[1] += parseInt(value.huevo_no_ecl);
                        if (value.muertos == "") value.muertos = 0;
                        res[value.zona].data[2] += parseInt(value.muertos);
                        if (value.escapados == "") value.escapados = 0;
                        res[value.zona].data[3] += parseInt(value.escapados);
                        if (value.huevos_traidos == "") value.huevos_traidos = 0;
                        res[value.zona].data[4] += parseInt(value.huevos_traidos);
                        if (value.neo_traidos == "") value.neo_traidos = 0;
                        res[value.zona].data[5] += parseInt(value.neo_traidos);
                        return res;
                    }, {});

                    var highchartsOptions = Highcharts.setOptions(themeDataH);
                    chart = new Highcharts.Chart({
                        chart: {
                            renderTo: 'containerTorN',
                            type: 'column'
                        },
                        title: {
                            text: 'Gráfico Totales Por Zonas '
                        },
                        subtitle: {
                            text: 'Periodo: ' + dataIni + ''
                        },
                        xAxis: {
                            categories: ["Neo_lib", "No eclosionado", "Muertos", "Escapados", "Huevos traidos", "Neonatos traidos"],
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: 'Total'
                            },
                            stackLabels: {
                                enabled: true,
                                style: {
                                    fontWeight: 'bold',
                                    color: ( // theme
                                        Highcharts.defaultOptions.title.style &&
                                        Highcharts.defaultOptions.title.style.color
                                    ) || 'white'
                                }
                            }
                        },
                        legend: {

                            /*backgroundColor:
                                Highcharts.defaultOptions.legend.backgroundColor || 'white',*/
                            borderColor: '#CCC',
                            borderWidth: 1,
                            shadow: false
                        },
                        tooltip: {
                            headerFormat: '<b>{point.x}</b><br/>',
                            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
                        },
                        plotOptions: {
                            column: {
                                stacking: 'normal',
                                dataLabels: {
                                    enabled: true
                                }
                            }
                        },
                        series: result
                    });


                } else {
                    tabla = "<td align='center' colspan='12'>No Existe informacion para este periodo </td>";
                    $('#containerTorN').html("No Existe informacion para este periodo");
                }

                $('#tabla_TorNido').dataTable().fnClearTable();
                $('#tabla_TorNido').dataTable().fnDestroy();

                $("#bodytabla_TorNido").html("");
                $("#bodytabla_TorNido").append(tabla);

                var table = $('#tabla_TorNido').DataTable({
                    "columnDefs": [{
                        "targets": [11, 12],
                        "visible": false
                    }]
                });

                $('#collapseTable .toggle-vis').on('click', function(e) {
                    e.preventDefault();

                    // Get the column API object
                    var column = table.column($(this).attr('data-column'));

                    // Toggle the visibility
                    column.visible(!column.visible());
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

/*buscar registros de nidos de petreles segun los parametros ingresados*/
function buscarPetParametros(dataIni) {
    $("#modalLoadin").show()
    data = '';
    if (dataIni) {
        data = data += "fecha_revision__range=" + dataIni;
    } else {

        desde = $("#FdesdePPet").val();
        hasta = $("#FhastaPPet").val();

        if ((desde == "") || (hasta == ""))
            cadenaFecha = "";
        else
            cadenaFecha = "1";

        nombre = $("#respPPet").val();
        nido = $("#nidoPPet").val();
        zona = $("#zonaPPet").val();

        if (cadenaFecha != "") {
            desdeArr = desde.split('/');
            hastaArr = hasta.split('/');

            fdesde = desdeArr[2] + "-" + desdeArr[0] + "-" + desdeArr[1];
            fhasta = hastaArr[2] + "-" + hastaArr[0] + "-" + hastaArr[1];
        }

        data = '';
        //dataIni = fdesde + ',' + fhasta;

        if (nombre != "")
            data = "participantes_nombres__icontains=" + nombre + "&";

        if (nido != "")
            data += "num_nido__descripcion__icontains=" + nido + "&";

        if (zona != "")
            data += "num_nido__sitio_id__descripcion__icontains=" + zona + "&";

        if (cadenaFecha != "")
            data += "fecha_revision__range=" + fdesde + "," + fhasta + "&";

        data = data.substring(0, data.length - 1);
    }


    $.ajax({
        url: "data_ParamPet",
        type: "get",
        data: {
            "data": data
        },
        dataType: "json",

        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
            } else {
                var old = JSON.stringify(data).replace(/null/g, '""'); //convert to JSON string
                var data = JSON.parse(old); //convert back to array
                tabla = "";
                marca = "<i class='fa fa-check'></i>";
                dataArray = [];
                if (data.length > 0) {
                    for (i = 0; i < data.length; i++) {
                        dataArray += '{"zona":"' + data[i].num_nido.sitio_id.descripcion + '","adulto":"' + data[i].adulto + '","pareja":"' + data[i].pareja + '","huevo":"' + data[i].huevo + '","pichon":"' + data[i].pichon + '","pichon_volo":"' + data[i].pichon_volo + '","rastro":"' + data[i].rastro + '","sin_rastro":"' + data[i].sin_rastro + '","pichon_depredado":"' + data[i].pichon_depredado + '"},'



                        if (data[i].adulto == 0) adulto = "";
                        else adulto = marca;
                        if (data[i].pareja == 0) pareja = "";
                        else pareja = marca;
                        if (data[i].huevo == 0) huevo = "";
                        else huevo = marca;
                        if (data[i].pichon == 0) pichon = "";
                        else pichon = marca;
                        if (data[i].pichon_volo == 0) pichon_volo = "";
                        else pichon_volo = marca;
                        if (data[i].rastro == 0) rastro = "";
                        else rastro = marca;
                        if (data[i].sin_rastro == 0) sin_rastro = "";
                        else sin_rastro = marca;

                        tabla += "<tr>";
                        tabla += "<td align='center' id='td_fr_" + data[i].id + "'>" + data[i].fecha_revision + "</td>";
                        tabla += "<td align='center' id='td_tp_" + data[i].id + "'>" + data[i].temporada + "</td>";
                        tabla += "<td align='left' id='td_pn_" + data[i].id + "'>" + data[i].participantes_nombres + "</td>";
                        //tabla+="<td align='center' id='td_inv_"+data[i].id+"'>"+data[i].invitado+"</td>";
                        tabla += "<td align='center' id='td_zn_" + data[i].id + "'>" + data[i].num_nido.sitio_id.descripcion + "</td>";
                        tabla += "<td align='center' id='td_nn_" + data[i].id + "'>" + data[i].num_nido.descripcion + "</td>";
                        tabla += "<td align='center' id='td_ad_" + data[i].id + "'>" + adulto + "</td>";
                        tabla += "<td align='center' id='td_pa_" + data[i].id + "'>" + pareja + "</td>";
                        tabla += "<td align='center' id='td_hu_" + data[i].id + "'>" + huevo + "</td>";
                        tabla += "<td align='center' id='td_pi_" + data[i].id + "'>" + pichon + "</td>";
                        tabla += "<td align='center' id='td_pv_" + data[i].id + "'>" + pichon_volo + "</td>";
                        tabla += "<td align='center' id='td_ra_" + data[i].id + "'>" + rastro + "</td>";
                        tabla += "<td align='center' id='td_sr_" + data[i].id + "'>" + sin_rastro + "</td>";
                        tabla += "<td align='center' id='td_nl_" + data[i].id + "'>" + data[i].nido_largo + "</td>";
                        tabla += "<td align='center' id='td_pd_" + data[i].id + "'>" + data[i].pichon_depredado + "</td>";
                        tabla += "<td align='center' id='td_nd_" + data[i].id + "'>" + data[i].nido_destruido + "</td>";
                        tabla += "<td align='center' id='td_ob_" + data[i].id + "'>" + data[i].observacion + "</td>";
                        tabla += "<td align='center' id='td_an_" + data[i].id + "'>" + data[i].num_anillo_nueva + "</td>";
                        tabla += "<td align='center' id='td_ar_" + data[i].id + "'>" + data[i].num_anillo_recaptura + "</td>";

                        if ($("#perm_change_spncontrolpetrelesnidos").val() == "1") {
                            tabla += "<td align='center'><a href='#addPetrelNido' data-stackbox='true' data-stackbox-position='absolute' onclick='editRegistroNidoPet(\"" + data[i].id + "\")'><i class='fa fa-edit text-green'></i></a></td>";
                        } else {
                            tabla += "<td align='center'> </td>";
                        }

                        if ($("#perm_delete_spncontrolpetrelesnidos").val() == "1") {
                            tabla += "<td align='center'><a style='cursor: pointer;' onclick='deleteModal(\"" + data[i].id + "\",\"PetNido\");'><i class='fa fa-trash text-green' title='Eliminar'></i></a></td>";
                        } else {
                            tabla += "<td align='center'> </td>";
                        }

                        tabla += "</tr>";
                    }

                    dataArray = dataArray.substring(0, dataArray.length - 1);
                    dataArray = "[" + dataArray + "]";
                    jdataArray = jQuery.parseJSON(dataArray);
                    var result = [];
                    var zonaArr = [];
                    jdataArray.reduce(function(res, value) {
                        if (!res[value.zona]) {
                            res[value.zona] = {
                                name: value.zona,
                                data: [0, 0, 0, 0, 0, 0, 0, 0]
                            };
                            result.push(res[value.zona])
                            zonaArr.push(value.zona);
                        }

                        if (value.adulto == "") value.adulto = 0;
                        res[value.zona].data[0] += parseInt(value.adulto);
                        if (value.pareja == "") value.pareja = 0;
                        res[value.zona].data[1] += parseInt(value.pareja);
                        if (value.huevo == "") value.huevo = 0;
                        res[value.zona].data[2] += parseInt(value.huevo);
                        if (value.pichon == "") value.pichon = 0;
                        res[value.zona].data[3] += parseInt(value.pichon);
                        if (value.pichon_volo == "") value.pichon_volo = 0;
                        res[value.zona].data[4] += parseInt(value.pichon_volo);
                        if (value.rastro == "") value.rastro = 0;
                        res[value.zona].data[5] += parseInt(value.rastro);
                        if (value.sin_rastro == "") value.sin_rastro = 0;
                        res[value.zona].data[6] += parseInt(value.sin_rastro);
                        if (value.pichon_depredado == "") value.pichon_depredado = 0;
                        res[value.zona].data[7] += parseInt(value.pichon_depredado);

                        return res;
                    }, {});

                    var highchartsOptions = Highcharts.setOptions(themeDataH);
                    chart = new Highcharts.Chart({
                        chart: {
                            renderTo: 'containerPetN',
                            type: 'column'
                        },
                        title: {
                            text: 'Gráfico Totales Por Zonas '
                        },
                        subtitle: {
                            text: 'Periodo: ' + dataIni + ''
                        },
                        xAxis: {
                            categories: ["Adulto", "Pareja", "Huevo", "Pichon", "Pichon volo", "Rastro", "Sin Rastro", "Pichon Depredado"],
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: 'Total'
                            },
                            stackLabels: {
                                enabled: true,
                                style: {
                                    fontWeight: 'bold',
                                    color: ( // theme
                                        Highcharts.defaultOptions.title.style &&
                                        Highcharts.defaultOptions.title.style.color
                                    ) || 'white'
                                }
                            }
                        },
                        legend: {
                            borderColor: '#CCC',
                            borderWidth: 1,
                            shadow: false
                        },
                        tooltip: {
                            headerFormat: '<b>{point.x}</b><br/>',
                            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
                        },
                        plotOptions: {
                            column: {
                                stacking: 'normal',
                                dataLabels: {
                                    enabled: true
                                }
                            }
                        },
                        series: result
                    });

                } else {
                    tabla = "<td align='center' colspan='12'>No Existe informacion para este periodo </td>";
                    $('#containerPetN').html("No Existe informacion para este periodo");
                }

                $('#tabla_PetNido').dataTable().fnClearTable();
                $('#tabla_PetNido').dataTable().fnDestroy();

                $("#bodytabla_PetNido").html("");
                $("#bodytabla_PetNido").append(tabla);

                var table = $('#tabla_PetNido').DataTable({
                    "columnDefs": [{
                        "targets": [11, 12, 13, 14, 15, 16,17],
                        "visible": false
                    }]
                });

                $('#collapseTableP .toggle-vis').on('click', function(e) {
                    e.preventDefault();
                    var column = table.column($(this).attr('data-column'));
                    // Toggle the visibility
                    column.visible(!column.visible());
                });
            }
            $('#modalLoadin').hide();
        },
        error: function(data) {
            $('#modalLoadin').hide();
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
            //console.log( JSON.stringify(data));
        },
    });
}

/*buscar registros de flamingos segun los parametros ingresados*/
function buscarFlaParametros(dataIni) {

    data = '';
    estado = '';
    if (dataIni) {
        data = data += "fecha__range=" + dataIni;
    } else {
        desde = $("#FdesdePFla").val();
        hasta = $("#FhastaPFla").val();

        if ((desde == "") || (hasta == ""))
            cadenaFecha = "";
        else
            cadenaFecha = "1";

        nombre = $("#respPFla").val();
        estado = $("#estPFla").val();
        sitio = $("#sitioPFla").val();

        if (cadenaFecha != "") {
            desdeArr = desde.split('/');
            hastaArr = hasta.split('/');

            fdesde = desdeArr[2] + "-" + desdeArr[0] + "-" + desdeArr[1];
            fhasta = hastaArr[2] + "-" + hastaArr[0] + "-" + hastaArr[1];
            dataIni = fdesde + ',' + fhasta;
        } else {
            dataIni = "";
        }

        data = '';


        if (nombre != "")
            data = "encargados_nombres__icontains=" + nombre + "&";

        if (sitio != "")
            data += "sitio_id__descripcion__icontains=" + sitio + "&";

        if (estado != "")
            data += "control_flamingos_id__estado_comportamiento__icontains=" + estado + "&";

        if (cadenaFecha != "")
            data += "fecha__range=" + fdesde + "," + fhasta + "&";

        data = data.substring(0, data.length - 1);
    }

    $.ajax({
        url: "data_ParamFla",
        type: "get",
        data: {
            "data": data
        },
        dataType: "json",

        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
            } else {
                var old = JSON.stringify(data).replace(/null/g, '""'); //convert to JSON string
                var data = JSON.parse(old); //convert back to array
                tabla = "";
                tabla_aux = "";
                tabla_auxF = "";
                dataArray = [];
                if (data.length > 0) {
                    for (i = 0; i < data.length; i++) {
                        //if(data[i].datos_nidos_id != "") dnido = data[i].datos_nidos_id.label;else dnido = "";

                        tabla += "<tr>";
                        tabla += "<td align='center' id='td_fr_" + data[i].id + "'>" + data[i].fecha + "</td>";
                        tabla += "<td align='left' id='td_enc_" + data[i].id + "'>" + data[i].encargados_nombres + "</td>";
                        tabla += "<td align='center' id='td_sitio_" + data[i].id + "'>" + data[i].sitio_id.descripcion + "</td>";
                        tabla += "<td align='center' id='td_hora1_" + data[i].id + "'>" + data[i].hora_inicio + "</td>";
                        tabla += "<td align='center' id='td_hora2_" + data[i].id + "'>" + data[i].hora_fin + "</td>";
                        //tabla+="<td align='center' id='td_nivA_"+data[i].id+"'>"+data[i].nivel_agua.+"</td>";
                        //tabla+="<td align='center' id='td_carA_"+data[i].id+"'>"+data[i].caracteristica_agua+"</td>";
                        tabla += "<td align='center' id='td_ob_" + data[i].id + "'>" + data[i].observacion + "</td>";
                        //tabla+="<td align='left' id='td_ni_"+data[i].id+"'>"+dnido+"</td>";
                        //tabla+="<td align='center' id='td_nn_"+data[i].id+"'>"+data[i].numero+"</td>";
                        if ($("#perm_change_spncontrolflamingos").val() == "1") {
                            tabla += "<td align='center'><a href='#addFlaNido' data-stackbox='true' data-stackbox-position='absolute' onclick='editRegistroFla(\"" + data[i].id + "\")'><i class='fa fa-edit text-green'></i></a></td>";
                        } else {
                            tabla += "<td> </td>";
                        }

                        if ($("#perm_delete_spncontrolflamingos").val() == "1") {
                            tabla += "<td align='center'><a style='cursor: pointer;' onclick='deleteModal(\"" + data[i].id + "\",\"Fla\");'><i class='fa fa-trash text-green' title='Eliminar'></i></a></td>";
                        } else {
                            tabla += "<td> </td>";
                        }

                        tabla += "</tr>";

                        tabla_aux += "<tr>";
                        tabla_aux += "<td align='center' >" + data[i].fecha + "</td>";
                        tabla_aux += "<td align='left' >" + data[i].encargados_nombres + "</td>";
                        tabla_aux += "<td align='center' >" + data[i].sitio_id.descripcion + "</td>";
                        tabla_aux += "<td align='center' >" + data[i].hora_inicio + "</td>";
                        tabla_aux += "<td align='center' >" + data[i].hora_fin + "</td>";
                        //tabla_aux+="<td align='center' >"+data[i].nivel_agua+"</td>";
                        //tabla_aux+="<td align='center' >"+data[i].caracteristica_agua+"</td>";
                        //tabla_aux+="<td align='left' >"+dnido+"</td>";
                        //tabla_aux+="<td align='center'>"+data[i].numero+"</td>";
                        tabla_aux += "<td align='center' >" + data[i].observacion + "</td>";
                        tabla_aux += "<td align='center' ></td>";
                        tabla_aux += "<td align='center' ></td>";
                        tabla_aux += "<td align='center' ></td>";
                        tabla_aux += "<td align='center' ></td>";
                        tabla_aux += "<td align='center' ></td>";
                        tabla_aux += "<td align='center'></td>";
                        tabla_aux += "<td align='center'></td>";
                        tabla_aux += "<td align='center'></td>";
                        tabla_aux += "<td align='center'></td>";
                        tabla_aux += "<td align='center'></td>";
                        tabla_aux += "<td align='center'></td>";
                        tabla_aux += "<td></td>";
                        tabla_aux += "</tr>";


                        for (j = 0; j < data[i].control_flamingos_id.length; j++) {
                            if (data[i].control_flamingos_id[j].estado == 'A') {
                                if (data[i].control_flamingos_id[j].tipo == 0) {
                                    comport = data[i].control_flamingos_id[j].estado_comportamiento;
                                    if (comport.search(estado.toUpperCase()) >= 0) {
                                        dataArray += '{"sitio":"' + data[i].sitio_id.descripcion + '","comportamiento":"' + data[i].control_flamingos_id[j].estado_comportamiento + '","adultos":"' + data[i].control_flamingos_id[j].adulto + '","juveniles":"' + data[i].control_flamingos_id[j].juveniles + '","pichones":"' + data[i].control_flamingos_id[j].pichones + '"},'
                                        tabla_aux += "<tr>";
                                        tabla_aux += "<td >" + data[i].fecha + "</td>";
                                        tabla_aux += "<td ></td>";
                                        tabla_aux += "<td ></td>";
                                        tabla_aux += "<td ></td>";
                                        tabla_aux += "<td ></td>";
                                        tabla_aux += "<td ></td>";
                                        tabla_aux += "<td ></td>";
                                        tabla_aux += "<td ></td>";
                                        tabla_aux += "<td >" + data[i].control_flamingos_id[j].estado_comportamiento + "</td>";
                                        tabla_aux += "<td >" + data[i].control_flamingos_id[j].adulto + "</td>";
                                        tabla_aux += "<td >" + data[i].control_flamingos_id[j].edad_intermedia + "</td>";
                                        tabla_aux += "<td >" + data[i].control_flamingos_id[j].juveniles + "</td>";
                                        tabla_aux += "<td >" + data[i].control_flamingos_id[j].pichones + "</td>";

                                        tabla_aux += "<td></td>";
                                        tabla_aux += "<td></td>";
                                        tabla_aux += "<td></td>";
                                        tabla_aux += "<td></td>";
                                        tabla_aux += "<td></td>";
                                        tabla_aux += "<td></td>";
                                        tabla_aux += "<td>" + data[i].control_flamingos_id[j].tipo + "</td>";
                                        tabla_aux += "</tr>";
                                    }
                                }
                                if (data[i].control_flamingos_id[j].tipo == 1) {
                                    tabla_aux += "<tr>";
                                    tabla_aux += "<td >" + data[i].fecha + "</td>";
                                    tabla_aux += "<td ></td>";
                                    tabla_aux += "<td ></td>";
                                    tabla_aux += "<td ></td>";
                                    tabla_aux += "<td ></td>";
                                    tabla_aux += "<td ></td>";
                                    tabla_aux += "<td ></td>";
                                    tabla_aux += "<td ></td>";
                                    tabla_aux += "<td ></td>";
                                    tabla_aux += "<td ></td>";
                                    tabla_aux += "<td ></td>";
                                    tabla_aux += "<td ></td>";
                                    tabla_aux += "<td ></td>";
                                    tabla_aux += "<td>" + data[i].control_flamingos_id[j].individuo_id.nombre_comun + "</td>";
                                    tabla_aux += "<td>" + data[i].control_flamingos_id[j].numero + "</td>";
                                    tabla_aux += "<td>" + $("#SnivAve option[value='" + data[i].control_flamingos_id[j].nivel_agua + "']").text().toUpperCase() + "</td>";
                                    tabla_aux += "<td>" + $("#ScarAguaAve option[value='" + data[i].control_flamingos_id[j].caracteristica_agua + "']").text().toUpperCase() + "</td>";
                                    tabla_aux += "<td></td>";
                                    tabla_aux += "<td></td>";
                                    tabla_aux += "<td>" + data[i].control_flamingos_id[j].tipo + "</td>";
                                    tabla_aux += "</tr>";
                                }
                                if (data[i].control_flamingos_id[j].tipo == 2) {
                                    tabla_aux += "<tr>";
                                    tabla_aux += "<td >" + data[i].fecha + "</td>";
                                    tabla_aux += "<td ></td>";
                                    tabla_aux += "<td ></td>";
                                    tabla_aux += "<td ></td>";
                                    tabla_aux += "<td ></td>";
                                    tabla_aux += "<td ></td>";
                                    tabla_aux += "<td ></td>";
                                    tabla_aux += "<td ></td>";
                                    tabla_aux += "<td ></td>";
                                    tabla_aux += "<td ></td>";
                                    tabla_aux += "<td ></td>";
                                    tabla_aux += "<td ></td>";
                                    tabla_aux += "<td ></td>";
                                    tabla_aux += "<td></td>";
                                    tabla_aux += "<td></td>";
                                    tabla_aux += "<td></td>";
                                    tabla_aux += "<td></td>";
                                    tabla_aux += "<td>" + data[i].control_flamingos_id[j].individuo_id.nombre_comun + "</td>";
                                    tabla_aux += "<td>" + data[i].control_flamingos_id[j].numero + "</td>";
                                    tabla_aux += "<td>" + data[i].control_flamingos_id[j].tipo + "</td>";
                                    tabla_aux += "</tr>";
                                }
                            }
                        }

                    }

                    if (dataArray.length > 0) {
                        dataArray = dataArray.substring(0, dataArray.length - 1);
                        dataArray = "[" + dataArray + "]";
                        jdataArray = jQuery.parseJSON(dataArray);


                        var derivers = $.pivotUtilities.derivers;
                        var renderers = $.extend($.pivotUtilities.renderers,
                            $.pivotUtilities.c3_renderers);
                        $("#outputFla").pivotUI(jdataArray, {
                            renderers: renderers,
                            rows: ["sitio", "comportamiento", "adultos", "juveniles", "pichones"],
                            cols: [],
                            rendererName: "Table",
                            rowOrder: "value_z_to_a",
                            colOrder: "value_z_to_a",
                            rendererOptions: {
                                c3: {
                                    data: {
                                        colors: {
                                            Liberal: '#dc3912',
                                            Conservative: '#3366cc',
                                            NDP: '#ff9900',
                                            Green: '#109618',
                                            'Bloc Quebecois': '#990099'
                                        }
                                    }
                                }
                            }
                        });

                        var result = [];
                        var zonaArr = [];

                        jdataArray.reduce(function(res, value) {
                            if (!res[value.sitio]) {
                                //if(!res[value.sitio]){var stacks = ['Volando', 'Descansando', ''],

                                res[value.sitio] = {
                                    name: value.sitio,
                                    data: [0, 0, 0]
                                };
                                result.push(res[value.sitio])

                                //}
                            }

                            if (value.adultos == "") value.adultos = 0;
                            res[value.sitio].data[0] += parseInt(value.adultos);
                            if (value.juveniles == "") value.juveniles = 0;
                            res[value.sitio].data[1] += parseInt(value.juveniles);
                            if (value.pichones == "") value.pichones = 0;
                            res[value.sitio].data[2] += parseInt(value.pichones);
                            //console.log(res);
                            return res;
                        }, {});

                        console.log(result);




                        var highchartsOptions = Highcharts.setOptions(themeDataH);
                        chart = new Highcharts.Chart({
                            chart: {
                                renderTo: 'containerFla',
                                type: 'column'
                            },
                            title: {
                                text: 'Gráfico Totales Sitios'
                            },
                            subtitle: {
                                text: 'Periodo: ' + dataIni + ''
                            },
                            xAxis: {
                                categories: ["Adulto", "Juveniles", "Pichones"],
                            },
                            yAxis: {
                                min: 0,
                                title: {
                                    text: 'Total'
                                },
                                stackLabels: {
                                    enabled: true,
                                    style: {
                                        fontWeight: 'bold',
                                        color: ( // theme
                                            Highcharts.defaultOptions.title.style &&
                                            Highcharts.defaultOptions.title.style.color
                                        ) || 'white'
                                    }
                                }
                            },
                            legend: {
                                borderColor: '#CCC',
                                borderWidth: 1,
                                shadow: false
                            },
                            tooltip: {
                                headerFormat: '<b>{point.x}</b><b>{series.stack}</b><br/>',
                                pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
                            },
                            plotOptions: {
                                column: {
                                    stacking: 'normal',
                                    dataLabels: {
                                        enabled: true
                                    }
                                }
                            },
                            series: result
                        }); //
                    }


                } else {
                    tabla = "<td align='center' colspan='12'>No Existe informacion para este periodo </td>";
                }

                $('#tabla_Fla').dataTable().fnClearTable();
                $('#tabla_Fla').dataTable().fnDestroy();

                $("#bodytabla_Fla").html("");
                $("#bodytabla_Fla").append(tabla);

                $('#tabla_Fla_aux').dataTable().fnClearTable();
                $('#tabla_Fla_aux').dataTable().fnDestroy();
                $("#bodytabla_Fla_aux").html("");
                $("#bodytabla_Fla_aux").append(tabla_aux);

                var table = $('#tabla_Fla').DataTable();

                var table2 = $('#tabla_Fla_aux').DataTable({
                    orderCellsTop: true,
                    "order": [
                        [0, "desc"],
                        [19, "asc"]
                    ]
                });

                $('#collapseTableF .toggle-vis').on('click', function(e) {
                    e.preventDefault();
                    // Get the column API object
                    var column = table.column($(this).attr('data-column'));
                    // Toggle the visibility
                    column.visible(!column.visible());
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

/*funcion para mostrar la informacion del control de huevos segun los datos seleccionado sen la tabla*/
function dataControlHuevos(centro, grupo, poblacion, caja, incubadora) {
    $('#SccrianzaCH').val(centro).trigger("change");
    $('#SgnacimientoCH').val(grupo).trigger("change");
    $('#ScajaCH').val(caja).trigger("change");
    $('#SincubadoraCH').val(incubadora).trigger("change");
    $('#SpoblacionCH').val(poblacion).trigger("change");
    buscarControlHuevos();
}

/*funcion para mostrar la informacion del control de crecimiento segun los datos seleccionado sen la tabla*/
function dataControlCrecimiento(centro, grupo, poblacion, mes, anio) {
    $('#SccrianzaCC').val(centro).trigger("change");
    $('#SgnacimientoCC').val(grupo).trigger("change");
    $('#SpoblacionCC').val(poblacion).trigger("change");
    $('#SmedicionCC').val(mes).trigger("change");
    $('#SanioCC').val(anio).trigger("change");
    buscarMedicionesParametros();
}

/*funcion para mostrar la informacion del control de crecimineto que existen por periodo segun los datos seleccionados*/
function buscarMedicionesParametrosList() {
    data = '';

    if ($("#SccrianzaCC").val() != "")
        data = "centro_crianza_id__in=" + $("#SccrianzaCC").val() + "&";

    if ($("#SgnacimientoCC").val() != "")
        data += "grupo_nacimiento__in=" + $("#SgnacimientoCC").val() + "&";

    if ($("#SpoblacionCC").val() != "")
        data += "poblacion_id__id__in=" + $("#SpoblacionCC").val() + "&";

    $.ajax({
        url: "data_medicionesParam",
        type: "get",
        data: {
            "data": data
        },
        dataType: "json",

        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
            } else {
                var old = JSON.stringify(data).replace(/null/g, '""'); //convert to JSON string
                var data = JSON.parse(old); //convert back to array
                tabla = "";
                if (data.length > 0) {
                    for (i = 0; i < data.length; i++) {

                        tabla += "<tr >";
                        tabla += "<td>" + data[i].poblacion_id.descripcion + "</td>";
                        tabla += "<td>" + data[i].grupo_nacimiento + "</td>";
                        tabla += "<td>" + data[i].periodo + "</td>";
                        tabla += "<td>" + data[i].anio + "</td>";
                        tabla += "</tr>";
                    }
                } else {
                    tabla = "<td align='center' colspan='5'>No Existe informacion para este periodo</td>";
                }

                $("#bodytableDetCC").html("");
                $("#bodytableDetCC").append(tabla);

            }
        },
        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
            //console.log( JSON.stringify(data));
        },
    });
}

/*funcion para generar grafico segun los parametros ingresados*/
function graficoHuevosCentroCrianzaByFilter(idgrupo, idcc, pagina) {
    datap = '';
    if (!idgrupo) {
        idcc = "SccrianzaDash";
        idgrupo = "SgnacimientoDash";
        pagina = 'dash';
    }

    datap = "centro_crianza_id__in=" + $("#" + idcc).val() + "&";
    datap += "grupo_nacimiento__in=" + $("#" + idgrupo).val() + "&";


    pos = 0;
    $.ajax({
        url: "data_huevosCentroCrianza",
        type: "get",
        data: {
            "data": datap
        },
        dataType: "json",
        async: false,

        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
            } else {
                var old = JSON.stringify(data).replace(/null/g, '""'); //convert to JSON string
                var data = JSON.parse(old); //convert back to array
                s1 = [0];
                s2 = [0];
                sc1 = [0];
                sc2 = [0];

                esp1 = [0];
                esp2 = [0];

                flo1 = [0];
                flo2 = [0];

                pin1 = [0];
                pin2 = [0];

                categories = [];

                gra_San = 0;
                gra_Sc = 0;
                gra_Esp = 0;
                gra_Flo = 0;
                gra_Pin = 0;

                nombre = '';
                nombre_aux = '';
                for (i = 0; i < data.length; i++) {

                    if (data[i].descripcion.toUpperCase() == "SANTIAGO") {
                        s1[pos] = (parseInt(data[i].total_huevos) - parseInt(data[i].huevos_sacados));
                        s2[pos] = data[i].huevos_sacados;

                        gra_San = parseInt(data[i].total_huevos);
                    }
                    if (data[i].descripcion.toUpperCase() == "SANTA CRUZ") {
                        sc1[pos] = (parseInt(data[i].total_huevos) - parseInt(data[i].huevos_sacados));
                        sc2[pos] = data[i].huevos_sacados;

                        gra_Sc = parseInt(data[i].total_huevos);
                    }
                    if (data[i].descripcion.toUpperCase() == "ESPAÑOLA") {
                        esp1[pos] = (parseInt(data[i].total_huevos) - parseInt(data[i].huevos_sacados));
                        esp2[pos] = data[i].huevos_sacados;

                        gra_Esp = parseInt(data[i].total_huevos);
                    }
                    if (data[i].descripcion.toUpperCase() == "FLOREANA") {
                        flo1[pos] = (parseInt(data[i].total_huevos) - parseInt(data[i].huevos_sacados));
                        flo2[pos] = data[i].huevos_sacados;

                        gra_Flo = parseInt(data[i].total_huevos);
                    }
                    if (data[i].descripcion.toUpperCase() == "PINZON") {
                        pin1[pos] = (parseInt(data[i].total_huevos) - parseInt(data[i].huevos_sacados));
                        pin2[pos] = data[i].huevos_sacados;

                        gra_Pin = parseInt(data[i].total_huevos);
                    }

                    categories.push(data[i].des);
                }

                chart = new Highcharts.Chart({
                    chart: {
                        renderTo: 'container',
                        type: 'bar',

                    },
                    title: {
                        text: 'Total Huevos Ingresados y Malos'
                    },
                    subtitle: {
                        text: '' + $("#" + idcc + " option:selected").text() + ', Grupo ' + $("#" + idgrupo + " option:selected").text() + ''
                    },
                    xAxis: {
                        categories: [$("#" + idcc + " option:selected").text()]
                    },

                    yAxis: {
                        allowDecimals: false,
                        min: 0,
                        title: {
                            text: 'Numero de Huevos'
                        },
                        stackLabels: {
                            enabled: true,
                            style: {
                                fontWeight: 'bold',
                                color: ( // theme
                                    Highcharts.defaultOptions.title.style &&
                                    Highcharts.defaultOptions.title.style.color
                                ) || 'gray'
                            }
                        }
                    },

                    tooltip: {
                        formatter: function() {
                            return '<b>' + this.x + '</b><br/>' +
                                this.series.name + ': ' + this.y + '<br/>' +
                                'Total: ' + this.point.stackTotal;
                        }
                    },

                    plotOptions: {
                        series: {
                            stacking: 'normal',
                            dataLabels: {
                                enabled: true
                            }
                        }
                    },
                    series: [{
                        id: 'g1',
                        color: 'yellow',
                        name: "Santiago",
                        data: s1,
                        stack: "buena",
                        borderColor: 'green',
                        borderWidth: 4
                    }, {
                        linkedTo: 'g1',
                        color: 'yellow',
                        name: "Santiago",
                        data: s2,
                        stack: "mala",
                        borderColor: 'red',
                        borderWidth: 4
                    }, {
                        id: 'g2',
                        color: '#ffa500',
                        name: "Santa Cruz",
                        data: sc1,
                        stack: "buena",
                        borderColor: 'green',
                        borderWidth: 4
                    }, {
                        linkedTo: 'g2',
                        color: '#ffa500',
                        name: "Santa Cruz",
                        data: sc2,
                        stack: "mala",
                        borderWidth: 4,
                        borderColor: 'red'
                    }, {
                        id: 'g3',
                        color: '#75beff',
                        name: "Española",
                        data: esp1,
                        stack: "buena",
                        borderColor: 'green',
                        borderWidth: 4
                    }, {
                        linkedTo: 'g3',
                        color: '#75beff',
                        name: "Española",
                        data: esp2,
                        stack: "mala",
                        borderWidth: 4,
                        borderColor: 'red'
                    }, {
                        id: 'g4',
                        color: 'red',
                        name: "Floreana",
                        data: flo1,
                        stack: "buena",
                        borderColor: 'green',
                        borderWidth: 4
                    }, {
                        linkedTo: 'g4',
                        color: 'red',
                        name: "Floreana",
                        data: flo2,
                        stack: "mala",
                        borderWidth: 4,
                        borderColor: 'red'
                    }, {
                        id: 'g5',
                        color: 'grey',
                        name: "pinzon",
                        data: pin1,
                        stack: "buena",
                        borderColor: 'green',
                        borderWidth: 4
                    }, {
                        linkedTo: 'g5',
                        color: 'grey',
                        name: "pinzon",
                        data: pin2,
                        stack: "mala",
                        borderWidth: 4,
                        borderColor: 'red'
                    }]
                })

                chart.setTitle({
                    text: 'Total Huevos <span style="width:10px; background-color:green;color:white;">Ingresados</span> y <span style="width:10px; background-color:red;color:white;">Malos',
                    useHTML: true
                });

                Highcharts.chart('container2', {
                    chart: {
                        type: 'pie',
                        options3d: {
                            enabled: true,
                            alpha: 45
                        }
                    },
                    title: {
                        text: 'Total Huevos en el Centro de Crianza'
                    },
                    subtitle: {
                        text: '' + $("#" + idcc + " option:selected").text() + ', Grupo ' + $("#" + idgrupo + " option:selected").text() + ''
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.y}</b>'
                    },
                    plotOptions: {
                        pie: {
                            innerSize: 100,
                            depth: 45,
                            dataLabels: {
                                enabled: true,
                                format: '<b>{point.name}({point.y})</b>: {point.percentage:.1f} %',
                                connectorColor: 'silver'
                            }
                        }
                    },
                    series: [{
                        name: 'Share',
                        data: [{
                                name: 'Santiago',
                                y: gra_San,
                                color: 'yellow',
                            },
                            {
                                name: 'Santa Cruz',
                                y: gra_Sc,
                                color: '#ffa500'
                            },
                            {
                                name: 'Española',
                                y: gra_Esp,
                                color: '#75beff'
                            },
                            {
                                name: 'Floreana',
                                y: gra_Flo,
                                color: 'red'
                            },
                            {
                                name: 'Pinzon',
                                y: gra_Pin,
                                color: 'grey'
                            },
                        ]
                    }]
                });
                if (pagina == 'dash')
                    graficoXtempHuevos(idgrupo, idcc);
                graficoNacidosByFilter(idgrupo, idcc);
            }
        },
        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
            //console.log( JSON.stringify(data));
        },
    });
}

/*funcion para generar grafico segun las temperaturas ingresadas*/
function graficoXtempHuevos(idgrupo, idcc) {

    datap = '';
    datap = "centro_crianza_id__in=" + $("#" + idcc).val() + "&";
    datap += "grupo_nacimiento__in=" + $("#" + idgrupo).val() + "&";

    $.ajax({
        url: "datos_huevopintura",
        type: "get",
        data: {
            "data": datap
        },
        dataType: "json",
        async: false,

        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
            } else {
                var old = JSON.stringify(data).replace(/null/g, '""'); //convert to JSON string
                var data = JSON.parse(old); //convert back to array
                var result = [];
                data.reduce(function(res, value) {
                    if (!res[value.temperatura]) {
                        //if(!res[value.sitio]){var stacks = ['Volando', 'Descansando', ''],

                        res[value.temperatura] = {
                            temperatura: value.temperatura,
                            data: [0, 0]
                        };
                        result.push(res[value.temperatura])

                        //}
                    }

                    if (value.fecha_sacado == "") value.fecha_sacado = 0;
                    else value.fecha_sacado = 1;
                    res[value.temperatura].data[0] += value.fecha_sacado;
                    res[value.temperatura].data[1] += 1;

                    //console.log(res);
                    return res;
                }, {});

                console.log(result);
                var temperaturas = [];
                var bueno = [];
                var malos = [];
                for (var i = 0; i < result.length; i++) {
                    temperaturas.push(result[i].temperatura);
                }
                console.log(temperaturas);

                for (var i = 0; i < temperaturas.length; i++) {
                    bueno.push(parseInt(result[i].data[1]) - parseInt(result[i].data[0]));
                    malos.push(result[i].data[0]);
                }

                console.log(bueno);
                console.log(malos);

                //var highchartsOptions = Highcharts.setOptions(themeDataH);	           
                chart = new Highcharts.Chart({
                    chart: {
                        renderTo: 'container3',
                        type: 'scatter'
                    },
                    title: {
                        text: 'Huevos incubados por temperatura'
                    },
                    subtitle: {
                        text: '' + $("#" + idcc + " option:selected").text() + ', Grupo ' + $("#" + idgrupo + " option:selected").text() + ''
                    },
                    xAxis: {
                        categories: temperaturas,
                        title: {
                            text: 'Temperaturas'
                        }
                    },
                    yAxis: {
                        title: {
                            text: 'Cantidad Huevos'
                        }
                    },
                    plotOptions: {
                        line: {
                            dataLabels: {
                                enabled: true
                            },
                            enableMouseTracking: false
                        }
                    },
                    series: [{
                        name: 'incubados',
                        color: '#008000',
                        data: bueno
                    }, {
                        name: 'Sacados',
                        color: '#ff0000',
                        data: malos
                    }]
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

/*funcion para generar grafico de huevos nacidos segun el grupo y el centro de crianza*/
function graficoNacidosByFilter(idgrupo, idcc) {

    datap = '';
    datap = "centro_crianza_id__in=" + $("#" + idcc).val() + "&";
    datap += "grupo_nacimiento__in=" + $("#" + idgrupo).val() + "&";
    $.ajax({
        url: "data_huevosCentroCrianzaDetalles",
        type: "get",
        data: {
            "data": datap
        },
        dataType: "json",
        async: false,

        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
            } else {
                var old = JSON.stringify(data).replace(/null/g, '""'); //convert to JSON string
                var data = JSON.parse(old); //convert back to array
                s1 = [0, 0, 0, 0, 0, 0]; /*muertas*/
                s2 = [0, 0, 0, 0, 0, 0]; /**repatriada*/
                s3 = [0, 0, 0, 0, 0, 0]; /**ingresda*/
                s4 = [0, 0, 0, 0, 0, 0];
                s5 = [0, 0, 0, 0, 0, 0];
                gra_San = 0;
                gra_Sc = 0;
                gra_Esp = 0;
                gra_Flo = 0;
                gra_Pin = 0;
                gra_Enc = 0;

                nombre = '';
                nombre_aux = '';
                for (i = 0; i < data.length; i++) {

                    if (data[i].des_poblacion.toUpperCase() == "ESPAÑOLA")
                        pos = 0;
                    if (data[i].des_poblacion.toUpperCase() == "FLOREANA")
                        pos = 1;
                    if (data[i].des_poblacion.toUpperCase() == "PINZON")
                        pos = 2;
                    if (data[i].des_poblacion.toUpperCase() == "SANTA CRUZ")
                        pos = 3;
                    if (data[i].des_poblacion.toUpperCase() == "SANTIAGO")
                        pos = 4;
                    if (data[i].des_poblacion.toUpperCase() == "ENCONTRADAS")
                        pos = 5;

                    if (data[i].muerta == "")
                        data[i].muerta = 0;
                    if (data[i].repatriada == "")
                        data[i].repatriada = 0;

                    console.log(data[i].con_pintura + "-" + data[i].muerta)
                    total = (parseInt(data[i].con_pintura) - parseInt(data[i].muerta))

                    if (pos != 5) {
                        s1[pos] = (data[i].muerta);
                        s2[pos] = (data[i].repatriada);
                        s3[pos] = (data[i].ingresada);
                        s4[pos] = (parseInt(data[i].con_pintura) - parseInt(data[i].muerta) - parseInt(data[i].repatriada));
                    } else {
                        s1[pos] = (data[i].muerta);
                        s2[pos] = (0);
                        s3[pos] = (0);
                        s4[pos] = (parseInt(data[i].con_pintura) - parseInt(data[i].muerta));
                    }
                }

                const color = {
                    ESPAÑOLA: '#75beff',
                    FLOREANA: 'red',
                    PINZON: 'grey',
                    SANTA_CRUZ: '#ffa500',
                    SANTIAGO: '#c3c30d',
                    ENCONTRADAS: 'black'
                }

                chart = new Highcharts.Chart({
                    chart: {
                        renderTo: 'container4',
                        type: 'column',
                        options3d: {
                            enabled: true,
                            alpha: 0,
                            beta: -25,
                            depth: 40,
                            viewDistance: 25
                        }
                    },
                    title: {
                        text: 'Total Tortugas Repatriados y Muertos'
                    },
                    subtitle: {
                        text: '' + $("#" + idcc + " option:selected").text() + ', Grupo ' + $("#" + idgrupo + " option:selected").text() + ''
                    },
                    xAxis: {
                        categories: ['ESPAÑOLA', 'FLOREANA', 'PINZON', 'SANTA_CRUZ', 'SANTIAGO', 'ENCONTRADAS'],
                        labels: {
                            formatter() {
                                return `<span style="font-weight:bold;color: ${color[this.value]}">${this.value}</span>`
                            }
                        }
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Total Huevos Incubados'
                        },
                        stackLabels: {
                            enabled: true,
                            style: {
                                fontWeight: 'bold',
                                color: ( // theme
                                    Highcharts.defaultOptions.title.style &&
                                    Highcharts.defaultOptions.title.style.color
                                ) || 'gray'
                            }
                        }
                    },
                    legend: {

                        backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || 'white',
                        borderColor: '#CCC',
                        borderWidth: 1,
                        shadow: false
                    },
                    tooltip: {
                        headerFormat: '<b>{point.x}</b><br/>',
                        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
                    },
                    plotOptions: {
                        column: {
                            stacking: 'normal',
                            dataLabels: {
                                enabled: true
                            }
                        }
                    },
                    series: [{
                        name: 'Muertas',
                        data: s1
                    }, {
                        name: 'Repatriadas',
                        data: s2
                    }, {
                        name: 'Ingresadas',
                        data: s3
                    }, {
                        name: 'En Corral',
                        data: s4
                    }]
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

/*funcion para limiar formulario de especies*/
function limpiarFormEspecies() {
    clearForm(frm_Especies);
    $("#tipoEsp_acc").val(0);
    $("#SmoduloEsp").val([]).trigger('change');
}

/*ver informacion de especies segun el id*/
function editEspecie(id) {

    limpiarFormEspecies();

    $("#tipoEsp_acc").val(1);
    $.ajax({
        url: "editEspecies",
        type: "get",
        data: {
            "data": id
        },
        dataType: "json",

        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
            } else {
                $("#idEspecie").val(data[0].id);
                $("#ncientifico").val(data[0].nombre_cientifico)
                $("#ncomun").val(data[0].nombre_comun);
                $("#StipoEsp").val(data[0].tipo_especie).trigger("change");
                $("#SclasEsp").val(data[0].clasificacion).trigger("change");

                if (data[0].categoria != null) {
                    arryRespRg = data[0].categoria.split("|");
                    $("#SmoduloEsp").val(arryRespRg).trigger('change');
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

function setInsertUpdateEsp() {
    valida = validaContenedor("addEspecies");
    if (valida) {
        if ($("#tipoEsp_acc").val() == 0)
            insertEspecies();
        else
            saveEditEspecies();
    }
}

/*insertar especies*/
function insertEspecies() {

    nombre_cientifico = $("#ncientifico").val();
    nombre_comun = $("#ncomun").val();
    tipo_especie = $("#StipoEsp").val();
    clasificacion = $("#SclasEsp").val();

    arrayresRegNom = [];

    $('#SmoduloEsp option:selected').each(function(index) {
        arrayresRegNom.push($(this).val());
    });

    id_padre = $('#content_esp').parent().attr('id');
    datos = '{"nombre_cientifico":"' + nombre_cientifico + '", "nombre_comun":"' + nombre_comun + '","tipo_especie":"' + tipo_especie + '","clasificacion":"' + clasificacion + '","categoria":"' + arrayresRegNom.join('|') + '", "estado":"A"}';
    //console.log(datos);
    th_insert(datos, "especies", id_padre, "bioespecie");

}

/*actualizar especies*/
function saveEditEspecies() {
    console.log(1111);
    nombre_cientifico = $("#ncientifico").val();
    nombre_comun = $("#ncomun").val();
    tipo_especie = $("#StipoEsp").val();
    clasificacion = $("#SclasEsp").val();

    arrayresRegNom = [];

    $('#SmoduloEsp option:selected').each(function(index) {
        arrayresRegNom.push($(this).val());
    });

    id = $("#idEspecie").val();

    id_padre = $('#content_esp').parent().attr('id');

    datos = '{"nombre_cientifico":"' + nombre_cientifico + '", "nombre_comun":"' + nombre_comun + '","tipo_especie":"' + tipo_especie + '","clasificacion":"' + clasificacion + '","categoria":"' + arrayresRegNom.join('|') + '"}';
    //console.log(datos);
    salida = th_update(datos, "especies", id_padre, "bioespecie", id);

    $("#td_nc_" + id).html(nombre_cientifico);
    $("#td_nci_" + id).html(nombre_comun);
    $("#td_tipo_" + id).html(tipo_especie);
    $("#td_cla_" + id).html(clasificacion);
    $("#td_cat_" + id).html(arrayresRegNom.join(' | '));
}

/*eliminar especies*/
function deleteEspecies(id) {
    id_padre = $('#content_esp').parent().attr('id');
    datos = '{"estado":"I","eliminado":"t"}';
    th_delete(datos, "especies", id_padre, "bioespecie", id);
}


function getDataGraficoDH() {
    $('#imagenRepDH').attr('src', 'https://export.highcharts.com/' + $("#urlPintura").val());

    $('#bodyRepDH').html($('#contentCC').html());
}

/*generar pdf de datos de huevos*/
function generaPdfDH() {
    pdf = $('#bodyPopRepDH').html();
    const element = document.getElementById("bodyPopRepDH");
    filename = 'report_DH.pdf'

    html2pdf(element, {
        margin: [0.20, 0.40, 0.20, 0.20],
        filename: 'myfile.pdf',
        image: {
            type: 'jpg',
            quality: 0.98
        },
        html2canvas: {
            dpi: 192,
            letterRendering: true,
            useCORS: true
        },
        jsPDF: {
            unit: 'in',
            format: 'a4',
            orientation: 'portrait'
        }
    });
}


/*buscar registros de nidos de tortuga para generar repote*/
function buscarTorNidoParametrosRep(dataIni) {
    data = '';
    var fdesde;
    var fhasta;
    if (dataIni) {
        data = data += "fecha_protegido__range=" + dataIni;
    } else {

        desde = $("#FdesdeRepAvis").val();
        hasta = $("#FhastaRepAvis").val();

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
            data += "fecha_protegido__range=" + fdesde + "," + fhasta;
        } else {
            validaContenedorExt("content_graficoSP", "No a seleccionado rango de Fechas");
            return 0;
        }
    }

    array = [];

    $.ajax({
        url: "data_ParamTorNido",
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
                var old = JSON.stringify(data).replace(/null/g, '""'); //convert to JSON string
                var data = JSON.parse(old); //convert back to array
                tabla = "";
                dataArray = "";
                if (data.length > 0) {
                    for (i = 0; i < data.length; i++) {
                        dataArray += '{"zona":"' + data[i].num_nido.sitio_id.descripcion + '","neo_lib":"' + data[i].neo_liberado + '","huevo_no_ecl":"' + data[i].huevos_no_eclo + '","muertos":"' + data[i].muertos + '","escapados":"' + data[i].escapados + '","huevos_traidos":"' + data[i].huevos_traidos + '","neo_traidos":"' + data[i].neo_traidos + '"},';
                    }
                    dataArray = dataArray.substring(0, dataArray.length - 1);
                    dataArray = "[" + dataArray + "]";
                    jdataArray = jQuery.parseJSON(dataArray);
                    var result = [];
                    var zonaArr = [];
                    jdataArray.reduce(function(res, value) {
                        if (!res[value.zona]) {
                            res[value.zona] = {
                                name: value.zona,
                                data: [0, 0, 0, 0, 0, 0]
                            };
                            result.push(res[value.zona])
                            zonaArr.push(value.zona);
                        }

                        if (value.neo_lib == "") value.neo_lib = 0;
                        res[value.zona].data[0] += parseInt(value.neo_lib);
                        if (value.huevo_no_ecl == "") value.huevo_no_ecl = 0;
                        res[value.zona].data[1] += parseInt(value.huevo_no_ecl);
                        if (value.muertos == "") value.muertos = 0;
                        res[value.zona].data[2] += parseInt(value.muertos);
                        if (value.escapados == "") value.escapados = 0;
                        res[value.zona].data[3] += parseInt(value.escapados);
                        if (value.huevos_traidos == "") value.huevos_traidos = 0;
                        res[value.zona].data[4] += parseInt(value.huevos_traidos);
                        if (value.neo_traidos == "") value.neo_traidos = 0;
                        res[value.zona].data[5] += parseInt(value.neo_traidos);
                        return res;
                    }, {});

                    //var highchartsOptions = Highcharts.setOptions(themeDataH);	
                    chart = new Highcharts.Chart({
                        chart: {
                            renderTo: 'containerTRep',
                            type: 'column'
                        },
                        title: {
                            text: 'Gráfico Tortugas Por Zonas '
                        },
                        subtitle: {
                            text: 'Periodo: ' + dataIni + ''
                        },
                        xAxis: {
                            categories: ["Neo_lib", "No eclosionado", "Muertos", "Escapados", "Huevos traidos", "Neonatos traidos"],
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: 'Total'
                            },
                            stackLabels: {
                                enabled: true,
                                style: {
                                    fontWeight: 'bold',
                                    color: ( // theme
                                        Highcharts.defaultOptions.title.style &&
                                        Highcharts.defaultOptions.title.style.color
                                    ) || 'white'
                                }
                            }
                        },
                        legend: {

                            /*backgroundColor:
                                Highcharts.defaultOptions.legend.backgroundColor || 'white',*/
                            borderColor: '#CCC',
                            borderWidth: 1,
                            shadow: false
                        },
                        tooltip: {
                            headerFormat: '<b>{point.x}</b><br/>',
                            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
                        },
                        plotOptions: {
                            column: {
                                stacking: 'normal',
                                dataLabels: {
                                    enabled: true
                                }
                            }
                        },
                        series: result
                    });


                } else {
                    $('#containerTRep').html("No Existe informacion para este periodo");
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

/*buscar informacion de nidos de petreles para generar reporte*/
function buscarPetParametrosRep(dataIni) {
    data = '';
    if (dataIni) {
        data = data += "fecha_revision__range=" + dataIni;
    } else {

        desde = $("#FdesdeRepAvis").val();
        hasta = $("#FhastaRepAvis").val();

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
            data += "fecha_protegido__range=" + fdesde + "," + fhasta;
        } else {
            validaContenedorExt("content_graficoSP", "No a seleccionado rango de Fechas");
            return 0;
        }
    }

    $.ajax({
        url: "data_ParamPet",
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
                var old = JSON.stringify(data).replace(/null/g, '""'); //convert to JSON string
                var data = JSON.parse(old); //convert back to array
                tabla = "";
                marca = "<i class='fa fa-check'></i>";
                dataArray = [];
                if (data.length > 0) {
                    for (i = 0; i < data.length; i++) {
                        dataArray += '{"zona":"' + data[i].num_nido.sitio_id.descripcion + '","adulto":"' + data[i].adulto + '","pareja":"' + data[i].pareja + '","huevo":"' + data[i].huevo + '","pichon":"' + data[i].pichon + '","pichon_volo":"' + data[i].pichon_volo + '","rastro":"' + data[i].rastro + '","sin_rastro":"' + data[i].sin_rastro + '","pichon_depredado":"' + data[i].pichon_depredado + '"},';
                    }

                    dataArray = dataArray.substring(0, dataArray.length - 1);
                    dataArray = "[" + dataArray + "]";
                    jdataArray = jQuery.parseJSON(dataArray);
                    var result = [];
                    var zonaArr = [];
                    jdataArray.reduce(function(res, value) {
                        if (!res[value.zona]) {
                            res[value.zona] = {
                                name: value.zona,
                                data: [0, 0, 0, 0, 0, 0, 0, 0]
                            };
                            result.push(res[value.zona])
                            zonaArr.push(value.zona);
                        }

                        if (value.adulto == "") value.adulto = 0;
                        res[value.zona].data[0] += parseInt(value.adulto);
                        if (value.pareja == "") value.pareja = 0;
                        res[value.zona].data[1] += parseInt(value.pareja);
                        if (value.huevo == "") value.huevo = 0;
                        res[value.zona].data[2] += parseInt(value.huevo);
                        if (value.pichon == "") value.pichon = 0;
                        res[value.zona].data[3] += parseInt(value.pichon);
                        if (value.pichon_volo == "") value.pichon_volo = 0;
                        res[value.zona].data[4] += parseInt(value.pichon_volo);
                        if (value.rastro == "") value.rastro = 0;
                        res[value.zona].data[5] += parseInt(value.rastro);
                        if (value.sin_rastro == "") value.sin_rastro = 0;
                        res[value.zona].data[6] += parseInt(value.sin_rastro);
                        if (value.pichon_depredado == "") value.pichon_depredado = 0;
                        res[value.zona].data[7] += parseInt(value.pichon_depredado);

                        return res;
                    }, {});

                    //var highchartsOptions = Highcharts.setOptions(themeDataH);	
                    chart = new Highcharts.Chart({
                        chart: {
                            renderTo: 'containerPRep',
                            type: 'column'
                        },
                        title: {
                            text: 'Gráfico Avistamiento Petreles Por Zonas '
                        },
                        subtitle: {
                            text: 'Periodo: ' + dataIni + ''
                        },
                        xAxis: {
                            categories: ["Adulto", "Pareja", "Huevo", "Pichon", "Pichon volo", "Rastro", "Sin Rastro", "Pichon Depredado"],
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: 'Total'
                            },
                            stackLabels: {
                                enabled: true,
                                style: {
                                    fontWeight: 'bold',
                                    color: ( // theme
                                        Highcharts.defaultOptions.title.style &&
                                        Highcharts.defaultOptions.title.style.color
                                    ) || 'white'
                                }
                            }
                        },
                        legend: {
                            borderColor: '#CCC',
                            borderWidth: 1,
                            shadow: false
                        },
                        tooltip: {
                            headerFormat: '<b>{point.x}</b><br/>',
                            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
                        },
                        plotOptions: {
                            column: {
                                stacking: 'normal',
                                dataLabels: {
                                    enabled: true
                                }
                            }
                        },
                        series: result
                    });

                } else {
                    $('#containerPRep').html("No Existe informacion para este periodo");
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

/*funcion para buscar registros de avistamineto de flamingos y generar reporte*/
function buscarFlaParametrosRep(dataIni) {

    data = '';
    estado = '';
    if (dataIni) {
        data = data += "fecha__range=" + dataIni;
    } else {
        desde = $("#FdesdeRepAvis").val();
        hasta = $("#FhastaRepAvis").val();

        if ((desde == "") || (hasta == ""))
            cadenaFecha = "";
        else
            cadenaFecha = "1";

        if (cadenaFecha != "") {
            desdeArr = desde.split('/');
            hastaArr = hasta.split('/');

            fdesde = desdeArr[2] + "-" + desdeArr[0] + "-" + desdeArr[1];
            fhasta = hastaArr[2] + "-" + hastaArr[0] + "-" + hastaArr[1];

            data += "fecha_protegido__range=" + fdesde + "," + fhasta;
            dataIni = fdesde + "," + fhasta;
        } else {
            validaContenedorExt("content_graficoSP", "No a seleccionado rango de Fechas");
            return 0;
        }
    }

    $.ajax({
        url: "data_ParamFla",
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
                var old = JSON.stringify(data).replace(/null/g, '""'); //convert to JSON string
                var data = JSON.parse(old); //convert back to array
                dataArray = [];
                if (data.length > 0) {
                    for (i = 0; i < data.length; i++) {
                        for (j = 0; j < data[i].control_flamingos_id.length; j++) {
                            if (data[i].control_flamingos_id[j].estado == 'A') {
                                if (data[i].control_flamingos_id[j].tipo == 0) {
                                    comport = data[i].control_flamingos_id[j].estado_comportamiento;
                                    if (comport.search(estado.toUpperCase()) >= 0) {
                                        dataArray += '{"sitio":"' + data[i].sitio_id.descripcion + '","comportamiento":"' + data[i].control_flamingos_id[j].estado_comportamiento + '","adultos":"' + data[i].control_flamingos_id[j].adulto + '","juveniles":"' + data[i].control_flamingos_id[j].juveniles + '","pichones":"' + data[i].control_flamingos_id[j].pichones + '"},';
                                    }
                                }

                            }
                        }
                    }

                    if (dataArray.length > 0) {
                        dataArray = dataArray.substring(0, dataArray.length - 1);
                        dataArray = "[" + dataArray + "]";
                        jdataArray = jQuery.parseJSON(dataArray);


                        var derivers = $.pivotUtilities.derivers;
                        var renderers = $.extend($.pivotUtilities.renderers,
                            $.pivotUtilities.c3_renderers);
                        $("#outputFla").pivotUI(jdataArray, {
                            renderers: renderers,
                            rows: ["sitio", "comportamiento", "adultos", "juveniles", "pichones"],
                            cols: [],
                            rendererName: "Table",
                            rowOrder: "value_z_to_a",
                            colOrder: "value_z_to_a",
                            rendererOptions: {
                                c3: {
                                    data: {
                                        colors: {
                                            Liberal: '#dc3912',
                                            Conservative: '#3366cc',
                                            NDP: '#ff9900',
                                            Green: '#109618',
                                            'Bloc Quebecois': '#990099'
                                        }
                                    }
                                }
                            }
                        });

                        var result = [];
                        var zonaArr = [];

                        jdataArray.reduce(function(res, value) {
                            if (!res[value.sitio]) {
                                res[value.sitio] = {
                                    name: value.sitio,
                                    data: [0, 0, 0]
                                };
                                result.push(res[value.sitio]);
                            }

                            if (value.adultos == "") value.adultos = 0;
                            res[value.sitio].data[0] += parseInt(value.adultos);
                            if (value.juveniles == "") value.juveniles = 0;
                            res[value.sitio].data[1] += parseInt(value.juveniles);
                            if (value.pichones == "") value.pichones = 0;
                            res[value.sitio].data[2] += parseInt(value.pichones);
                            //console.log(res);
                            return res;
                        }, {});

                        //var highchartsOptions = Highcharts.setOptions(themeDataH);	
                        chart = new Highcharts.Chart({
                            chart: {
                                renderTo: 'containerFRep',
                                type: 'column'
                            },
                            title: {
                                text: 'Gráfico Avistamiento Flamingos Sitios'
                            },
                            subtitle: {
                                text: 'Periodo: ' + dataIni + ''
                            },
                            xAxis: {
                                categories: ["Adulto", "Juveniles", "Pichones"],
                            },
                            yAxis: {
                                min: 0,
                                title: {
                                    text: 'Total'
                                },
                                stackLabels: {
                                    enabled: true,
                                    style: {
                                        fontWeight: 'bold',
                                        color: ( // theme
                                            Highcharts.defaultOptions.title.style &&
                                            Highcharts.defaultOptions.title.style.color
                                        ) || 'white'
                                    }
                                }
                            },
                            legend: {
                                borderColor: '#CCC',
                                borderWidth: 1,
                                shadow: false
                            },
                            tooltip: {
                                headerFormat: '<b>{point.x}</b><b>{series.stack}</b><br/>',
                                pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
                            },
                            plotOptions: {
                                column: {
                                    stacking: 'normal',
                                    dataLabels: {
                                        enabled: true
                                    }
                                }
                            },
                            series: result
                        }); //
                    }


                } else {
                    $("#containerFRep").html("No existe informacion para este periodo");
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


/*funcion para insertar mediciones de control d crecimineto modificada(usada)*/
function insertMedicionesParametros2() {
	$('#modalLoadin').show();
    datosC = '{';
    datosC += ' "grupo_nacimiento":"' + $("#SgnacimientoCC").val() + '",';
    datosC += ' "centro_crianza_id":"' + $("#SccrianzaCC").val() + '",';
    datosC += ' "poblacion_id":"' + $("#SpoblacionCC").val() + '",';
    datosC += ' "periodo":"' + $("#SmedicionCC").val() + '",';
    datosC += ' "anio":"' + $("#SanioCC").val() + '",';
    datosC += ' "det_control_crecimiento_id":[]';
    datosC += '}';

    salida = [];
    dj_url = 'spncontrolcrecimientogalapaguitos';
    $.ajax({
        url: "insert_General",
        type: 'get',
        cache: 'false',
        data: {
            "dj_url": dj_url,
            "data": JSON.stringify("[" + datosC + "]")
        },
        dataType: "json",
        async: false,
        success: function(data2) {
            if (!data2['results']) {
                $('#modalLoadin').hide();
                swal("", "Error al Insertar el registro", "error");
                console.log("data---->" + datosC + "--->" + "spncontrolcrecimientogalapaguitos" + "Error--->" + data2);
            } else {
                $('#modalLoadin').hide();
                control_crecimiento_id = data2['results'][0].id;
                var table = $("#tabla_controlc tbody");
                inicial = 1;
                final = 0;
                datosD = '';
                mensaje = '';
                table.find('tr').each(function(i) {

                    if ($(this).hasClass("disabled-select"))
                        console.log('disabled-select')
                    else
                        console.log('noooo disabled-select')

                    observaAux = '';

                    var data = $(this).find("td").find("input");
                    var dataT = $(this).find("td").find("textarea");
                    var dataTD = $(this).find("td");
                    datosD += '{';
                    datosD += ' "control_crecimiento_id":"' + control_crecimiento_id + '",';
                    datosD += ' "fecha_medida":"' + $(data).eq(0).val() + '",';
                    datosD += ' "num_pintura":"' + $(dataTD).eq(1).html() + '",';
                    console.log($(dataTD).eq(10).html() + "+++++++++++++++++++++++++++++++++++++++" + $(dataTD).eq(1).html());
                    control = $(dataTD).eq(10).html();
                    if (control != "null") {
                        datosD += ' "control_huevos_resumen_id":"' + control + '",';
                        console.log(control);
                    } else console.log(control + "*****no");


                    idPintura = $(dataTD).eq(1).attr("id");
                    if ($("#" + idPintura).hasClass("IngresoFuera"))
                        datosD += ' "estado_ingreso":"1",';

                    if ($(data).eq(1).val() == "") datosD += '';
                    else datosD += ' "num_hierro":"' + $(data).eq(1).val() + '",';
                    if ($(data).eq(2).val() == "") datosD += '';
                    else datosD += ' "num_pit":"' + $(data).eq(2).val() + '",';
                    if ($(data).eq(3).val() == "") datosD += '';
                    else datosD += ' "largo_curvo":"' + $(data).eq(3).val() + '",';
                    if ($(data).eq(4).val() == "") datosD += '';
                    else datosD += ' "ancho_curvo":"' + $(data).eq(4).val() + '",';
                    if ($(data).eq(5).val() == "") datosD += '';
                    else datosD += ' "largo_plastron":"' + $(data).eq(5).val() + '",';
                    if ($(data).eq(6).val() == "") datosD += '';
                    else datosD += ' "peso":"' + $(data).eq(6).val() + '",';
                    if ($(data).eq(7).is(':checked')) {
                        datosD += ' "muerta":"1",';
                        datosD += ' "fecha_muerte_tort":"' + $(data).eq(0).val() + '",';
                    }
                    if ($(data).eq(8).is(':checked')) {
                        datosD += ' "repatriada":"1",';
                        if (!$(this).hasClass("disabled-select")) {
                            if ($("#fecha_repatria").val() == "") {
                                mensaje += $(dataTD).eq(1).html() + ",";
                            }
                            datosD += ' "fecha_repatriacion":"' + $("#fecha_repatria").val() + '",';
                        } else
                            datosD += ' "fecha_repatriacion":"' + $(data).eq(0).val() + '",';

                        if (!$(this).hasClass("disabled-select")) datosD += ' "sitio_repatriacion":"' + $("#SsitioCC").val() + '",';
                        //observaAux = ' fecha repatriacion '+$("#fecha_repatria").val()+'';
                    } else {
                        datosD += ' "repatriada":null,';
                        if (!$(this).hasClass("disabled-select")) datosD += ' "fecha_repatriacion":null,';
                        if (!$(this).hasClass("disabled-select")) datosD += ' "sitio_repatriacion":null,';
                    }

                    datosD += ' "observacion":"' + $(dataT).eq(0).val() + observaAux + '"';
                    datosD += '},';

                });

                if (mensaje != "") {
                    swal("", "No ha seleccionado fecha de repatriacion para el/los numeros de pintura: " + mensaje + "", "warning");
					$('#modalLoadin').hide();
                    return 0;
                }

                datosD = datosD.substring(0, datosD.length - 1);

                /*para obtner los registros de las especies q son ingresadas directamente al grupo*/
                var tableAux = $("#tabla_controlc_aux tbody");
                inicialAux = 1;
                finalAux = 0;
                datosDAux = '';
                tableAux.find('tr').each(function(i) {
                    var dataAux = $(this).find("td").find("input");
                    var dataTAux = $(this).find("td").find("textarea");
                    datosDAux += '{';
                    datosDAux += ' "control_crecimiento_id":"' + control_crecimiento_id + '",';
                    datosDAux += ' "fecha_medida":"' + $(dataAux).eq(0).val() + '",';
                    datosDAux += ' "num_pintura":"' + $(dataAux).eq(1).val() + '",';
                    datosDAux += ' "estado_ingreso":1,';
                    datosDAux += ' "fecha_ingreso_tort":"' + $(dataAux).eq(0).val() + '",';

                    if ($(dataAux).eq(2).val() == "") datosDAux += ' "num_hierro":null,';
                    else datosDAux += ' "num_hierro":"' + $(dataAux).eq(2).val() + '",';
                    if ($(dataAux).eq(3).val() == "") datosDAux += ' "num_pit":null,';
                    else datosDAux += ' "num_pit":"' + $(dataAux).eq(3).val() + '",';
                    if ($(dataAux).eq(4).val() == "") datosDAux += ' "largo_curvo":null,';
                    else datosDAux += ' "largo_curvo":"' + $(dataAux).eq(4).val() + '",';
                    if ($(dataAux).eq(5).val() == "") datosDAux += ' "ancho_curvo":null,';
                    else datosDAux += ' "ancho_curvo":"' + $(dataAux).eq(5).val() + '",';
                    if ($(dataAux).eq(6).val() == "") datosDAux += ' "largo_plastron":null,';
                    else datosDAux += ' "largo_plastron":"' + $(dataAux).eq(6).val() + '",';
                    if ($(dataAux).eq(7).val() == "") datosDAux += ' "peso":null,';
                    else datosDAux += ' "peso":"' + $(dataAux).eq(7).val() + '",';
                    if ($(dataAux).eq(8).is(':checked')) {
                        datosDAux += ' "muerta":"1",';
                        datosD += ' "fecha_muerte_tort":"' + $(data).eq(0).val() + '",';
                    }
                    if ($(dataAux).eq(9).is(':checked')) {
                        datosDAux += ' "repatriada":"1",';
                        datosDAux += ' "fecha_repatriacion":"' + $("#fecha_repatria").val() + '",';
                        datosDAux += ' "sitio_repatriacion":"' + $("#SsitioCC").val() + '",';
                    }

                    datosDAux += ' "observacion":"' + $(dataTAux).eq(0).val() + '"';
                    //datosDAux+=' "control_huevos_resumen_id":"'+control_huevo+'"';
                    datosDAux += '},';

                });

                datosDAux = datosDAux.substring(0, datosDAux.length - 1);

                if (datosDAux != "")
                    dataFinal = datosD + ',' + datosDAux;
                else
                    dataFinal = datosD;
                /*fin*/
                var dataJson = JSON.parse("[" + dataFinal + "]");
                dj_url = 'spncontrolcrecimientogalapaguitosdetalles';
                for (i = 0; i < dataJson.length; i++) {
                    $.ajax({
                        url: "insert_General",
                        type: 'get',
                        cache: 'false',
                        data: {
                            "dj_url": dj_url,
                            "data": JSON.stringify("[" + JSON.stringify(dataJson[i]) + "]")
                        },
                        dataType: "json",
                        async: false,
                        success: function(data2) {
                            if (!data2['results']) {
                                salida.push(['Error', dataJson[i].num_pintura]);
                                console.log("data---->" + dataJson[i].num_pintura + "--->" + "spncontrolcrecimientogalapaguitosdetalles" + "Error--->" + data2);
                            } else {
                                salida.push(['OK', dataJson[i].num_pintura]);
                                //buscarMedicionesParametros();
                            }
                        },
                        error: function(data2) {
                            salida.push(['Error', dataJson[i].num_pintura]);
                            console.log("data---->" + dataJson[i].num_pintura + "--->" + "spncontrolcrecimientogalapaguitosdetalles" + "Error--->" + data2);
                        },
                    });
                };
            }
        },
        error: function(data2) {
            $('#modalLoadin').hide();
            swal("", "Error al Insertar el registro", "error");
            console.log("data---->" + datosC + "--->" + "spncontrolcrecimientogalapaguitos" + "Error--->" + data2);
        },
    });

    mensaje2 = "";
    for (i = 0; i < salida.length; i++) {
        if (salida[i][0] == 'OK')
            band = 0;
        else
            mensaje2 += "Numero de Pintura: " + salida[i][1] + "<br>";
    }

    if (mensaje2 == "") {
        swal("", "Registros Actualizados con exito", "success");
		$('#modalLoadin').hide();
        buscarMedicionesParametros();
    } else{
        swal("", "Error al actualizar los registros:" + mensaje2, "error");
		$('#modalLoadin').hide();
	}

}


/*funcion para actualizar mediciones de centro de crianza modificada(usada)*/
function UpdateMedicionesParametros2(cabecera) {
    $('#modalLoadin').show();
    control_huevo = '';
    mensaje2 = '';
    var salida = [];
    var table = $("#tabla_controlc tbody");
    inicial = 1;
    final = 0;
    datosD = '';
    table.find('tr').each(function(i) {
        datosD = '';
        var data = $(this).find("td").find("input");
        var dataT = $(this).find("td").find("textarea");
        var dataTD = $(this).find("td");

        datosD += '{';
        //datosD+=' "id":"'+$(dataTD).eq(10).html()+'",';
        //datosD+= '"control_huevos_resumen_id":"'+$(dataTD).eq(10).val()+'",';
        if ($(data).eq(0).val() == "") datosD += ' "fecha_medida":null,';
        else datosD += ' "fecha_medida":"' + $(data).eq(0).val() + '",';
        if ($(data).eq(1).val() == "") datosD += ' "num_hierro":null,';
        else datosD += ' "num_hierro":"' + $(data).eq(1).val() + '",';
        if ($(data).eq(2).val() == "") datosD += ' "num_pit":null,';
        else datosD += ' "num_pit":"' + $(data).eq(2).val() + '",';
        if ($(data).eq(3).val() == "") datosD += ' "largo_curvo":null,';
        else datosD += ' "largo_curvo":"' + $(data).eq(3).val() + '",';
        if ($(data).eq(4).val() == "") datosD += ' "ancho_curvo":null,';
        else datosD += ' "ancho_curvo":"' + $(data).eq(4).val() + '",';
        if ($(data).eq(5).val() == "") datosD += ' "largo_plastron":null,';
        else datosD += ' "largo_plastron":"' + $(data).eq(5).val() + '",';
        if ($(data).eq(6).val() == "") datosD += ' "peso":null,';
        else datosD += ' "peso":"' + $(data).eq(6).val() + '",';
        if ($(data).eq(7).is(':checked')) {
            datosD += ' "muerta":"1",';
            if (!$(this).hasClass("disabled-select")) {
                datosD += ' "fecha_muerte_tort":"' + $(data).eq(0).val() + '",';
            }
        } else {
            datosD += ' "muerta":null,';
        }
        if ($(data).eq(8).is(':checked')) {
            datosD += ' "repatriada":"1",';
            if (!$(this).hasClass("disabled-select")) {
                if ($("#fecha_repatria").val() == "") {
                    mensaje2 += $(dataTD).eq(1).html() + ",";
                    datosD += ' "fecha_repatriacion":null,';
                    datosD += ' "sitio_repatriacion":null,';
                } else {
                    datosD += ' "fecha_repatriacion":"' + $("#fecha_repatria").val() + '",';
                    datosD += ' "sitio_repatriacion":"' + $("#SsitioCC").val() + '",';
                }
            }
        } else {
            datosD += ' "repatriada":null,';
            datosD += ' "fecha_repatriacion":null,';
            datosD += ' "sitio_repatriacion":null,';
        }

        datosD += ' "observacion":"' + $(dataT).eq(0).val() + '"';
        datosD += '}';

        dj_url = 'spncontrolcrecimientogalapaguitosdetalles';
        $.ajax({
            url: "update_General",
            type: 'get',
            cache: 'false',
            data: {
                "dj_url": dj_url,
                "idtabla": $(dataTD).eq(10).html(),
                "data": JSON.stringify(datosD)
            },
            dataType: "json",
            async: false,
            success: function(data2) {
                if (data2.id == undefined) {
                    $('#modalLoadin').hide();
                    //salida = 'Error';
                    salida.push(['Error', $(dataTD).eq(1).html()]);
                    swal("", "Error al Actualizar el registro", "error");
                    console.log("idtabla---->" + $(dataTD).eq(10).html() + "--->" + "data---->" + datosD + "--->" + "spncontrolcrecimientogalapaguitosdetalles" + "Error--->" + data2);
                } else {
                    salida.push(['OK', $(dataTD).eq(1).html()]);
                    console.log("OK");
                }
            },
            error: function(data2) {
                $('#modalLoadin').hide();
                salida.push(['Error', $(dataTD).eq(1).html()]);
                swal("", "Error al Actualizar el registro", "error");
                console.log("idtabla---->" + $(dataTD).eq(10).html() + "--->" + "data---->" + datosD + "--->" + "spncontrolcrecimientogalapaguitosdetalles" + "Error--->" + data2);
            },
        });
    });



    /*para obtner los registros de las especies q son ingresadas directamente al grupo*/
    var tableAux = $("#tabla_controlc_aux tbody");
    inicialAux = 1;
    finalAux = 0;
    datosDAux = '';
    tableAux.find('tr').each(function(i) {
        datosDAux = '';
        var dataAux = $(this).find("td").find("input");
        var dataTAux = $(this).find("td").find("textarea");
        datosDAux += '[{';
        datosDAux += ' "fecha_medida":"' + $(dataAux).eq(0).val() + '",';
        datosDAux += ' "num_pintura":"' + $(dataAux).eq(1).val() + '",';
        datosDAux += ' "control_crecimiento_id":"' + $("#control_crecimiento_id").val() + '",';
        datosDAux += ' "estado_ingreso":1,';
        datosDAux += ' "fecha_ingreso_tort":"' + $(dataAux).eq(0).val() + '",';


        if ($(dataAux).eq(2).val() == "") datosDAux += ' "num_hierro":null,';
        else datosDAux += ' "num_hierro":"' + $(dataAux).eq(2).val() + '",';
        if ($(dataAux).eq(3).val() == "") datosDAux += ' "num_pit":null,';
        else datosDAux += ' "num_pit":"' + $(dataAux).eq(3).val() + '",';
        if ($(dataAux).eq(4).val() == "") datosDAux += ' "largo_curvo":null,';
        else datosDAux += ' "largo_curvo":"' + $(dataAux).eq(4).val() + '",';
        if ($(dataAux).eq(5).val() == "") datosDAux += ' "ancho_curvo":null,';
        else datosDAux += ' "ancho_curvo":"' + $(dataAux).eq(5).val() + '",';
        if ($(dataAux).eq(6).val() == "") datosDAux += ' "largo_plastron":null,';
        else datosDAux += ' "largo_plastron":"' + $(dataAux).eq(6).val() + '",';
        if ($(dataAux).eq(7).val() == "") datosDAux += ' "peso":null,';
        else datosDAux += ' "peso":"' + $(dataAux).eq(7).val() + '",';
        if ($(dataAux).eq(8).is(':checked')) {
            datosDAux += ' "muerta":"1",';
            datosDAux += ' "fecha_muerte_tort":"' + $(dataAux).eq(0).val() + '",';
        } else {
            datosDAux += ' "muerta":null,';
        }
        if ($(dataAux).eq(9).is(':checked')) {
            datosDAux += ' "repatriada":"1",';
            datosDAux += ' "fecha_repatriacion":"' + $("#fecha_repatria").val() + '",';
            datosDAux += ' "sitio_repatriacion":"' + $("#SsitioCC").val() + '",';
        } else {
            datosDAux += ' "repatriada":null,';
            datosDAux += ' "fecha_repatriacion":null,';
            datosDAux += ' "sitio_repatriacion":null,';
        }

        datosDAux += ' "observacion":"' + $(dataTAux).eq(0).val() + '"';
        datosDAux += '}]';

        console.log(datosDAux);
        dj_url = 'spncontrolcrecimientogalapaguitosdetalles';
        $.ajax({
            url: "insert_General",
            type: 'get',
            cache: 'false',
            data: {
                "dj_url": dj_url,
                "data": JSON.stringify(datosDAux)
            },
            dataType: "json",
            async: false,
            success: function(data2) {
                if (!data2['results']) {
                    salida.push(['Error', $(dataAux).eq(3).val()]);
                    console.log("data---->" + datosDAux + "--->" + "spncontrolcrecimientogalapaguitosdetalles" + "Error--->" + data2);
                } else {
                    salida.push(['OK', $(dataAux).eq(3).val()]);
                    console.log('ok');
                }
            },
            error: function(data2) {
                salida.push(['Error', $(dataAux).eq(3).val()]);
                console.log("data---->" + datosDAux + "--->" + "spncontrolcrecimientogalapaguitosdetalles" + "Error--->" + data2);
            },
        });
        /*fin*/
    });
    mensaje = "";
    for (i = 0; i < salida.length; i++) {
        if (salida[i][0] == 'OK')
            band = 0;
        else
            mensaje += "Numero de Pintura: " + salida[i][1] + "\n";
    }

    if (mensaje == "") {
        if (mensaje2 != "") {
            swal("", "No ha seleccionado fecha de repatriacion para el/los numeros de pintura: " + mensaje2 + "", "warning");

        } else
            swal("", "Registros Actualizados con exito", "success");
        buscarMedicionesParametros();
    } else
        swal("", "Error al actualizar los registros:" + "\n" + mensaje, "error");


    $('#modalLoadin').hide();
}


/*/*insertar los datos del control de huevos modificada (usada)*/
function guardar_cajaHuevos22(cadena) {
    $('#modalLoadin').show();
    cadena = "[" + cadena + "]";
    var dtaaJson = JSON.parse(cadena);
    dj_url = "spncontrolhuevosdetalles";
    var salida = [];
    for (i = 0; i < dtaaJson.length; i++) {
        $.ajax({
            url: "insert_General",
            type: 'get',
            cache: 'false',
            data: {
                "dj_url": dj_url,
                "data": JSON.stringify("[" + JSON.stringify(dtaaJson[i]) + "]")
            },
            dataType: "json",
            async: false,
            success: function(data2) {
                if (!data2['results']) {
                    salida.push(['Error', dtaaJson[i].num_huevo]);
                    console.log("data---->" + cadena + "--->" + "spncontrolhuevosdetalles" + "Error--->" + data2);
                } else {
                    salida.push(['OK', dtaaJson[i].num_huevo]);
                    $("#id" + (i + 1)).val(data2['results'][0].id);

                }
            },
            error: function(data2) {
                salida.push(['Error', dtaaJson[i].num_huevo]);
                console.log("data---->" + cadena + "--->" + "spncontrolhuevosdetalles" + "Error--->" + data2);
            },
        });
    }

    mensaje = "";
    for (i = 0; i < salida.length; i++) {
        if (salida[i][0] == 'OK')
            band = 0;
        else
            mensaje += "Numero de Huevo: " + salida[i][1] + "<br>";
    }

    if (mensaje == "") {
        swal("", "Registros Actualizados con exito", "success");
        buscarControlHuevos();
    } else
        swal("", "Error al actualizar los registros:" + mensaje, "error");


    $('#modalLoadin').hide();
}


function buscarReporteAvistamiento(dataini) {
    buscarTorNidoParametrosRep(dataini);
    buscarPetParametrosRep(dataini);
    buscarFlaParametrosRep(dataini);
}



/*reporte control de crecimineto detalle*/
function buscarReporteAvistamientoParametros(dataini) {
    data = '';

    if(dataini == "filtro"){
        if ($("#StemporadaAP").val() != "")
            data += "temporada__in=" + $("#StemporadaAP").val() + "&";


        desde = $("#FdesdeParamAP").val();
        hasta = $("#FhastaParamAP").val();

        desdeArr = desde.split('/');
        hastaArr = hasta.split('/');

        fdesde = desdeArr[2] + "-" + desdeArr[0] + "-" + desdeArr[1];
        fhasta = hastaArr[2] + "-" + hastaArr[0] + "-" + desdeArr[1];
        data += "fecha_revision__range=" + fdesde + "," + fhasta;
    }else{
        data += "temporada__in=" + $("#StemporadaAP").val() + "&";
        data += "fecha_revision__range=" + dataini;
    }

    $.ajax({
        url: "data_ParamPet",
        type: "get",
        data: {
            "data": data
        },
        dataType: "json",

        success: function(data) {
            //console.log(JSON.stringify(data));
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
            } else {
                arrayPet = [];
                for(i=0; i< data.length; i++){
                    if(data[i].adulto == null) data[i].adulto = 0;
                    if(data[i].pareja == null) data[i].pareja = 0;
                    if(data[i].huevo == null) data[i].huevo = 0;
                    if(data[i].pichon == null) data[i].pichon = 0;
                    if(data[i].pichon_volo == null) data[i].pichon_volo = 0;
                    if(data[i].pichon_depredado == null) data[i].pichon_depredado = 0;
                    if(data[i].rastro == null) data[i].rastro = 0;
                    if(data[i].sin_rastro == null) data[i].sin_rastro = 0;
                    if(data[i].nido_largo == null) data[i].nido_largo = 0;
                    if(data[i].nido_destruido == null) data[i].nido_destruido = 0;


                    arrayPet.push({temporada: ""+data[i].temporada+"", nido: ""+data[i].num_nido.descripcion+"", sitio: ""+data[i].num_nido.sitio_id.descripcion+"", adulto: ""+data[i].adulto+"", pareja: ""+data[i].pareja+"",huevo: ""+data[i].huevo+"",pichon: ""+data[i].pichon+"",pichon_volo: ""+data[i].pichon_volo+"",pichon_depredado: ""+data[i].pichon_depredado+"",rastro: ""+data[i].rastro+"",sin_rastro: ""+data[i].sin_rastro+"",nido_largo: ""+data[i].nido_largo+"",nido_destruido: ""+data[i].nido_destruido+""});
                }

                var derivers = $.pivotUtilities.derivers;
                var renderers = $.extend($.pivotUtilities.renderers,
                    $.pivotUtilities.c3_renderers);
                $("#outputPet").pivotUI(arrayPet, {
                    renderers: renderers,
                    cols: ["temporada", "nido", "sitio"],
                    rows: ["adulto,pareja,huevo,pichon,pichon_volo,pichon_depredado,rastro,sin_rastro,nido_largo,nido_destruido"],
                    rendererName: "Table",
                    rowOrder: "value_z_to_a",
                    colOrder: "value_z_to_a",
                    rendererOptions: {
                        c3: {
                            data: {
                                colors: {
                                    Liberal: '#dc3912',
                                    Conservative: '#3366cc',
                                    NDP: '#ff9900',
                                    Green: '#109618',
                                    'Bloc Quebecois': '#990099'
                                }
                            }
                        }
                    }
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

/*para conversiones de coordenadas*/

var usft = 1;
function Declarations(){
//Symbols as used in USGS PP 1395: Map Projections - A Working Manual
    DatumEqRad = [6378137.0, 6378137.0, 6378137.0, 6378135.0, 6378160.0, 6378245.0, 6378206.4,
    6378388.0, 6378388.0, 6378249.1, 6378206.4, 6377563.4, 6377397.2, 6377276.3, 6378137.0];    
    DatumFlat = [298.2572236, 298.2572236, 298.2572215, 298.2597208, 298.2497323, 298.2997381, 294.9786982,
    296.9993621, 296.9993621, 293.4660167, 294.9786982, 299.3247788, 299.1527052, 300.8021499, 298.2572236]; 
    Item = 1;//Default
//        alert(Item);
    k0 = 0.9996;//scale on central meridian
    a = DatumEqRad[Item];//equatorial radius, meters. 
        //alert(a);
    f = 1/DatumFlat[Item];//polar flattening.
    b = a*(1-f);//polar axis.
    e = Math.sqrt(1 - b*b/a*a);//eccentricity
    drad = Math.PI/180;//Convert degrees to radians)
    latd = 0;//latitude in degrees
    phi = 0;//latitude (north +, south -), but uses phi in reference
    e0 = e/Math.sqrt(1 - e*e);//e prime in reference
    N = a/Math.sqrt(1-Math.pow(e*Math.sin(phi)),2);
    T = Math.pow(Math.tan(phi),2);
    C = Math.pow(e*Math.cos(phi),2);
    lng = 0;//Longitude (e = +, w = -) - can't use long - reserved word
    lng0 = 0;//longitude of central meridian
    lngd = 0;//longitude in degrees
    M = 0;//M requires calculation
    x = 0;//x coordinate
    y = 0;//y coordinate
    k = 1;//local scale
    utmz = 30;//utm zone
    zcm = 0;//zone central meridian
    DigraphLetrsE = "ABCDEFGHJKLMNPQRSTUVWXYZ";
    DigraphLetrsN = "ABCDEFGHJKLMNPQRSTUV";
        //alert(a);
    /*document.getElementById("EqRadBox").value = a;
    document.getElementById("PolRadBox").value = b;
    document.getElementById("FlatBox").value = f;
    document.getElementById("RecipBox").value = 1/f;*/
//        alert(a);
    OOZok = false;
}//Close declarations

function DatumSelect()     {
    Item = 0;
//    alert (Item);
//    ChosenType = form.Datum.options[Item].value;
    Item = document.getElementById("Datum").value;
//    alert (Item);
    if (Item == 14) {usft = 0.3048;}
    DatumEqRad = [6378137.0, 6378137.0, 6378137.0, 6378135.0, 6378160.0, 6378245.0, 6378206.4,
    6378388.0, 6378388.0, 6378249.1, 6378206.4, 6377563.4, 6377397.2, 6377276.3, 6378137.0];    
    DatumFlat = [298.2572236, 298.2572236, 298.2572215, 298.2597208, 298.2497323, 298.2997381, 294.9786982,
    296.9993621, 296.9993621, 293.4660167, 294.9786982, 299.3247788, 299.1527052, 300.8021499, 298.2572236]; 
    k0 = 0.9996;//scale on central meridian
    a = DatumEqRad[Item];//equatorial radius, meters. 
    f = 1/DatumFlat[Item];//polar flattening.
    b = a*(1-f);//polar axis.
        //alert(a);
        /*document.getElementById("EqRadBox").value = a;
    document.getElementById("PolRadBox").value = Math.floor(10*b)/10;
    document.getElementById("FlatBox").value = Math.floor(1e+7*f)/1e+7;
    document.getElementById("RecipBox").value = 1/f;
//        alert(Item);
    if (Item == 14) {
      document.getElementById("Utmmetro").innerHTML = "UTM (pies)";
     }else{
      document.getElementById("Utmmetro").innerHTML = "UTM (metros)";
    }*/
}
    //Datum Info here: Name, a, b, f, 1/f
    //WGS 84        6,378,137.0 6356752.314 0.003352811 298.2572236
    //NAD 83        6,378,137.0 6356752.314 0.003352811 298.2572236
    //GRS 80        6,378,137.0 6,356,752.3 0.003352811 298.2572215
    //WGS 72        6,378,135.0 6,356,750.5 0.003352783 298.2597208
    //Australian 1965   6,378,160.0 6,356,774.7 0.003352895 298.2497323
    //Krasovsky 1940    6,378,245.0 6,356,863.0 0.003352333 298.2997381
    //North American 1927   6,378,206.4 6,356,583.8 0.003390075 294.9786982
    //International 1924    6,378,388.0 6,356,911.9 0.003367011 296.9993621
    //Hayford 1909      6,378,388.0 6,356,911.9 0.003367011 296.9993621
    //Clarke 1880       6,378,249.1 6,356,514.9 0.00340755  293.4660167
    //Clarke 1866       6,378,206.4 6,356,583.8 0.003390075 294.9786982
    //Airy 1830     6,377,563.4 6,356,256.9 0.003340853 299.3247788
    //Bessel 1841       6,377,397.2 6,356,079.0 0.003342774 299.1527052
    //Everest 1830      6,377,276.3 6,356,075.4 0.003324444 300.8021499
    //NAD 83 pies       6,378,137.0 6356752.314 0.003352811 298.2572236


function EraseUTM(){
    document.getElementById("UTMzBox1").value = " ";
    document.getElementById("SHemBox").checked = false;
    document.getElementById("UTMeBox1").value = " ";
    document.getElementById("UTMnBox1").value = " ";
    }

function EraseDDeg(){
    document.getElementById("DDLatBox0").value = " ";
    document.getElementById("DDLonBox0").value = " ";
    }

function EraseDMS(){
    document.getElementById("DLatBox0").value = " ";
    document.getElementById("MLatBox0").value = " ";
    document.getElementById("SLatBox0").value = " ";
    document.getElementById("DLonBox0").value = " ";
    document.getElementById("MLonBox0").value = " ";
    document.getElementById("SLonBox0").value = " ";
    }
    
function EraseDeg(){
    EraseDDeg();
    EraseDMS();
    }

function EraseAll(){
    EraseDDeg();
    EraseDMS();
    EraseUTM();
    EraseNATO();
    }

//List of Boxes
//UTMzBox1
//SHemBox
//UTMeBox1
//UTMnBox1
//DDLatBox0
//DDLonBox0
//DLatBox0
//MLatBox0
//SLatBox0
//DLonBox0
//MLonBox0
//SLonBox0
//UTMLonZoneBox2
//UTMLatZoneBox2
//UTMDgBox2
//UTMeBox2
//UTMnBox2

    

    
function DDtoDMS(){
    //Input= xd(long) and yd(lat)
    //Output = xdd xm xs (long) and ydd ym ys (lat)
    ydd = Math.floor(Math.abs(yd));
    ym = Math.floor(60*(Math.abs(yd) - ydd));
    ys = 3600*(Math.abs(yd)-ydd - ym/60);
    if (yd<0){ydd=-ydd;}
    xdd = Math.floor(Math.abs(xd));
    xm = Math.floor(60*(Math.abs(xd) - xdd));
    xs = 3600*(Math.abs(xd)-xdd - xm/60);
    if (xd<0){xdd=-xdd;}
    }//End DDtoDMS
    
function DMStoDD(){
    //Input = xdd xm xs (long) and ydd ym ys (lat)
    //Output= xd(long) and yd(lat)
    xd = Math.abs(xdd) + xm/60 + xs/3600;
    yd = Math.abs(ydd) + ym/60 + ys/3600;
    if (ydd<0){yd=-yd;}
    if (xdd<0){xd=-xd;}
    }//End DMStoDD

function ajaxmagic()
        {
        slat=document.getElementById("DDLatBox0").value
        slong=document.getElementById("DDLonBox0").value
//        alert(slat);
//        alert(slat+"dos");
//        alert(slong);
//        alert("contatra.php?&ids="+slat+"&idl="+slong);
    var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    document.getElementById('okphp').innerHTML = "ok" ;
//                    alert("ok");
                }
            }
            xhttp.open("POST", "/contatra.php?&ids="+slat+"&idl="+slong,true);
            xhttp.send();
        }

function GeogToUTM(){
    //Convert Latitude and Longitude to UTM
    Declarations();
    k0 = 0.9996;//scale on central meridian
    b = a*(1-f);//polar axis.
    //alert(a+"   "+b);
    //alert(1-(b/a)*(b/a));
    e = Math.sqrt(1 - (b/a)*(b/a));//eccentricity
    //alert(e);
    //Input Geographic Coordinates
    //Decimal Degree Option
        latd0 = parseFloat(document.getElementById("DDLatBox0").value);
    lngd0 = parseFloat(document.getElementById("DDLonBox0").value);
    latd1 = Math.abs(parseFloat(document.getElementById("DLatBox0").value));
    latd1 = latd1 + parseFloat(document.getElementById("MLatBox0").value)/60;
    latd1 = latd1 + parseFloat(document.getElementById("SLatBox0").value)/3600;
    if (parseFloat(document.getElementById("DLatBox0").value)<0){latd1=-latd1;}
    lngd1 = Math.abs(parseFloat(document.getElementById("DLonBox0").value));
    lngd1 = lngd1 + parseFloat(document.getElementById("MLonBox0").value)/60;
    lngd1 = lngd1 + parseFloat(document.getElementById("SLonBox0").value)/3600;
    if (parseFloat(document.getElementById("DLonBox0").value)<0){lngd1=-lngd1;}

    lngd=lngd0;
    latd=latd0;
    if(isNaN(latd)){
    latd = latd1;
    document.getElementById("DDLatBox0").value = Math.floor(1000000*latd)/1000000;
    lngd=lngd1;
    document.getElementById("DDLonBox0").value = Math.floor(1000000*lngd)/1000000;
    }
    
    if(isNaN(lngd)){lngd = latd1;}
        if(isNaN(latd)|| isNaN(lngd)){
        alert("Non-Numeric Input Value");
        }
    if(latd <-90 || latd> 90){
        alert("Latitude must be between -90 and 90");
        }
    if(lngd <-180 || lngd > 180){
        alert("Latitude must be between -180 and 180");
        }

    xd = lngd;
    yd = latd;
//        alert(Item);
//        alert(usft);
    DDtoDMS();
    //Read Input from DMS Boxes
    document.getElementById("DLatBox0").value = Math.floor(ydd);
    document.getElementById("MLatBox0").value = ym;
    document.getElementById("SLatBox0").value = Math.floor(1000*ys)/1000;
    document.getElementById("DLonBox0").value = Math.floor(xdd);
    document.getElementById("MLonBox0").value = xm;
    document.getElementById("SLonBox0").value = Math.floor(1000*xs)/1000;

    
    phi = latd*drad;//Convert latitude to radians
    lng = lngd*drad;//Convert longitude to radians
    utmz = 1 + Math.floor((lngd+180)/6);//calculate utm zone
    latz = 0;//Latitude zone: A-B S of -80, C-W -80 to +72, X 72-84, Y,Z N of 84
    if (latd > -80 && latd < 72){latz = Math.floor((latd + 80)/8)+2;}
    if (latd > 72 && latd < 84){latz = 21;}
    if (latd > 84){latz = 23;}
        
    zcm = 3 + 6*(utmz-1) - 180;//Central meridian of zone
    //alert(utmz + "   " + zcm);
    //Calculate Intermediate Terms
    e0 = e/Math.sqrt(1 - e*e);//Called e prime in reference
    esq = (1 - (b/a)*(b/a));//e squared for use in expansions
    e0sq = e*e/(1-e*e);// e0 squared - always even powers
    //alert(esq+"   "+e0sq)
    N = a/Math.sqrt(1-Math.pow(e*Math.sin(phi),2));
    //alert(1-Math.pow(e*Math.sin(phi),2));
    //alert("N=  "+N);
    T = Math.pow(Math.tan(phi),2);
    //alert("T=  "+T);
    C = e0sq*Math.pow(Math.cos(phi),2);
    //alert("C=  "+C);
    A = (lngd-zcm)*drad*Math.cos(phi);
    //alert("A=  "+A);
    //Calculate M
    M = phi*(1 - esq*(1/4 + esq*(3/64 + 5*esq/256)));
    M = M - Math.sin(2*phi)*(esq*(3/8 + esq*(3/32 + 45*esq/1024)));
    M = M + Math.sin(4*phi)*(esq*esq*(15/256 + esq*45/1024));
    M = M - Math.sin(6*phi)*(esq*esq*esq*(35/3072));
    M = M*a;//Arc length along standard meridian
    //alert(a*(1 - esq*(1/4 + esq*(3/64 + 5*esq/256))));
    //alert(a*(esq*(3/8 + esq*(3/32 + 45*esq/1024))));
    //alert(a*(esq*esq*(15/256 + esq*45/1024)));
    //alert(a*esq*esq*esq*(35/3072));
    //alert(M);
    M0 = 0;//M0 is M for some origin latitude other than zero. Not needed for standard UTM
    //alert("M    ="+M);
    //Calculate UTM Values
    x = k0*N*A*(1 + A*A*((1-T+C)/6 + A*A*(5 - 18*T + T*T + 72*C -58*e0sq)/120));//Easting relative to CM
    x=x+500000;//Easting standard 
    y = k0*(M - M0 + N*Math.tan(phi)*(A*A*(1/2 + A*A*((5 - T + 9*C + 4*C*C)/24 + A*A*(61 - 58*T + T*T + 600*C - 330*e0sq)/720))));//Northing from equator
    yg = y + 10000000;//yg = y global, from S. Pole
    if (y < 0){y = 10000000+y;}
    //Output into UTM Boxes
        //alert(utmz);
    document.getElementById("UTMzBox1").value = utmz;
    document.getElementById("UTMeBox1").value = Math.round(10*(x))/10 / usft;
    document.getElementById("UTMnBox1").value = Math.round(10*y)/10 /usft;
    if (phi<0){document.getElementById("SHemBox").checked=true;}
    //document.getElementById("UTMzBox1").value = utmz;
    //document.getElementById("UTMeBox1").value = Math.round(10*(500000+x))/10;
//  document.getElementById("UTMLonZoneBox2").value = utmz;
//  document.getElementById("UTMLatZoneBox2").value = DigraphLetrsE[latz];
//  document.getElementById("UTMeBox2").value = Math.round(10*(x-100000*Math.floor(x/100000)))/10;
//  document.getElementById("UTMnBox2").value = Math.round(10*(y-100000*Math.floor(y/100000)))/10;
//Generate Digraph
//  MakeDigraph();
//  document.getElementById("UTMDgBox2").value = Digraph;
//        alert("entrando en ajax");
    ajaxmagic();            
}//close Geog to UTM
///////////////////////////////////////////////////////////////////////

function UTMtoGeog(latP, lonP, zonaP){
    //Convert UTM Coordinates to Geographic
    Declarations();
    k0 = 0.9996;//scale on central meridian
    b = a*(1-f);//polar axis.
    e = Math.sqrt(1 - (b/a)*(b/a));//eccentricity
    e0 = e/Math.sqrt(1 - e*e);//Called e prime in reference
    esq = (1 - (b/a)*(b/a));//e squared for use in expansions
    e0sq = e*e/(1-e*e);// e0 squared - always even powers
 //       alert(usft);
    //x = parseFloat(document.getElementById("UTMeBox1").value) * usft;
    x = parseFloat(latP) * usft;
    if (x<160000 || x>840000){alert("Valores del Este estan afuera del rango permitido \n Los resultados no son confiables \n Uselos con precauci&oacute;n");} 
    //y = parseFloat(document.getElementById("UTMnBox1").value) * usft;
    y = parseFloat(lonP) * usft;
    //alert(y)
    if (y<0){alert("Valores negativos no son permitidos \n Los resultados no son confiables \n Use con precauci&oacute;n");}
    if (y>10000000){alert("Los valores de Norte no pueden exceder 10,000,000 \n Los resultados no son confiables \n Use con precauci&oacute;n");}
    //utmz = parseFloat(document.getElementById("UTMzBox1").value);
    utmz = parseFloat(zonaP);
    zcm = 3 + 6*(utmz-1) - 180;//Central meridian of zone
    e1 = (1 - Math.sqrt(1 - e*e))/(1 + Math.sqrt(1 - e*e));//Called e1 in USGS PP 1395 also
    M0 = 0;//In case origin other than zero lat - not needed for standard UTM
    M = M0 + y/k0;//Arc length along standard meridian. 
    //if (document.getElementById("SHemBox").checked === true){M=M0+(y-10000000)/k;}
    M=M0+(y-10000000)/k;

    mu = M/(a*(1 - esq*(1/4 + esq*(3/64 + 5*esq/256))));
    phi1 = mu + e1*(3/2 - 27*e1*e1/32)*Math.sin(2*mu) + e1*e1*(21/16 -55*e1*e1/32)*Math.sin(4*mu);//Footprint Latitude
    phi1 = phi1 + e1*e1*e1*(Math.sin(6*mu)*151/96 + e1*Math.sin(8*mu)*1097/512);
    C1 = e0sq*Math.pow(Math.cos(phi1),2);
    T1 = Math.pow(Math.tan(phi1),2);
    N1 = a/Math.sqrt(1-Math.pow(e*Math.sin(phi1),2));
    R1 = N1*(1-e*e)/(1-Math.pow(e*Math.sin(phi1),2));
    D = (x-500000)/(N1*k0);
    phi = (D*D)*(1/2 - D*D*(5 + 3*T1 + 10*C1 - 4*C1*C1 - 9*e0sq)/24);
        phi = phi + Math.pow(D,6)*(61 + 90*T1 + 298*C1 + 45*T1*T1 -252*e0sq - 3*C1*C1)/720;
        phi = phi1 - (N1*Math.tan(phi1)/R1)*phi;
                
//Output Latitude
    //document.getElementById("DDLatBox0").value = Math.floor(1000000*phi/drad)/1000000;
    latitude = Math.floor(1000000*phi/drad)/1000000;
        
//Longitude
    lng = D*(1 + D*D*((-1 -2*T1 -C1)/6 + D*D*(5 - 2*C1 + 28*T1 - 3*C1*C1 +8*e0sq + 24*T1*T1)/120))/Math.cos(phi1);
    lngd = zcm+lng/drad;
    
//Output Longitude
    //document.getElementById("DDLonBox0").value = Math.floor(1000000*lngd)/1000000;
    longitude = Math.floor(1000000*lngd)/1000000;

    return {
        lat: latitude,
        lon: longitude
    };
    
/**
//Parse DMS
    xd = lngd;
    yd = phi/drad;
    DDtoDMS();
    document.getElementById("DLatBox0").value = Math.floor(ydd);
    document.getElementById("MLatBox0").value = ym;
    document.getElementById("SLatBox0").value = Math.floor(1000*ys)/1000;
    document.getElementById("DLonBox0").value = Math.floor(xdd);
    document.getElementById("MLonBox0").value = xm;
    document.getElementById("SLonBox0").value = Math.floor(1000*xs)/1000;

    ajaxmagic();
    }//End UTM to Geog
function glatlonmap(){
//  alert("entrando en glat");
        slat=document.getElementById("DDLatBox0").value
        slong=document.getElementById("DDLonBox0").value
//  alert(slat);
  if (slat & slong) {
  window.open("https://www.google.co.ve/maps/place/"+slat+","+slong+"/@"+slat+","+slong+",17z","mywindow")
//  alert("saliendo de winopn");
  }
  else {
   alert("Error, lat y lon no existen");
  }
//  alert("saliendo en glat");
// window.location.href = "searchresult.html?city="+value;*/
}


/*fin funciones conversiones de coordenadas*/


function cambiar_fechacc(fecha){

    console.log(fecha);

    $(".fecha_cc").each(function() {

        console.log($(this).parent().parent().hasClass("disabled-select"));
        if($(this).parent().parent().hasClass("disabled-select") == false)
            $(this).val(fecha)
        

    });



}



/*buscar registros de nidos de petreles segun los parametros ingresados*/
function buscarNidosParametros(dataIni) {
    $('#modalLoadin').show();
    data = '';
    if (dataIni) {
        data = data += "tipo_nido__in=TORTUGA";
    } else {


        nido = $("#nidoP").val();
        tipo = $("#tipoP").val();
        zona = $("#zonaP").val();

        data = '';
        //dataIni = fdesde + ',' + fhasta;

        if (nido != "")
            data = "descripcion__icontains=" + nido + "&";

        if (tipo != "")
            data += "tipo_nido__icontains=" + tipo + "&";

        if (zona != "")
            data += "sitio_id__descripcion__icontains=" + zona + "&";

        data = data.substring(0, data.length - 1);
    }


    $.ajax({
        url: "data_ParamNido",
        type: "get",
        data: {
            "data": data
        },
        dataType: "json",

        success: function(data) {
            
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
                $('#modalLoadin').hide();
            } else {
                var old = JSON.stringify(data).replace(/null/g, '""'); //convert to JSON string
                var data = JSON.parse(old); //convert back to array
                tabla = "";
                dataArray = [];
                if (data.length > 0) {
                    for (i = 0; i < data.length; i++) {

                        tabla += "<tr>";
                        tabla += "<td align='center' id='td_fec_" + data[i].id + "'>" + data[i].fecha_ingreso + "</td>";
                        tabla += "<td align='left' id='td_des_" + data[i].id + "'>" + data[i].descripcion + "</td>";
                        tabla += "<td align='left' id='td_zona_" + data[i].id + "'>" + data[i].sitio_id.descripcion + "</td>";
                        tabla += "<td align='left' id='td_tipo_" + data[i].id + "'>" + data[i].tipo_nido + "</td>";
                        tabla += "<td align='center' id='td_lat_" + data[i].id + "'>" + data[i].latitud + "</td>";
                        tabla += "<td align='center' id='td_lon_" + data[i].id + "'>" + data[i].longitud + "</td>";
                        tabla += "<td align='center'><a href='#mapaNido1' data-stackbox='true' data-stackbox-position='absolute' onclick='initMap(\"" + data[i].latitud + "\",\"" + data[i].longitud + "\",\"" + data[i].descripcion + "\")' data-stackbox-width='500' data-stackbox-height='500'><i class='fa fa-street-view text-green'></i></a></td> ";
                        tabla += "<td align='center'><a href='#addNidos' onclick='openModelEspecies(\"addNidos\");editNido(\"" + data[i].id + "\")'><i class='fa fa-edit text-green'></i></a></td> ";
                        tabla += "<td align='center'><a style='cursor: pointer;'' onclick='deleteModal(\"" + data[i].id + "\",\"Nidos\");''><i class='fa fa-trash text-green'></i></a></td>";
                        tabla += "</tr>";
                    }

                } else {
                    tabla = "<td align='center' colspan='12'>No Existe informacion para este periodo </td>";
                    $('#containerPetN').html("No Existe informacion para este periodo");
                }

                $('#tabla_nidos').dataTable().fnClearTable();
                $('#tabla_nidos').dataTable().fnDestroy();

                $("#bodytabla_nidos").html("");
                $("#bodytabla_nidos").append(tabla);

                var table = $('#tabla_nidos').DataTable();
                $('#modalLoadin').hide();
            }
        },
        error: function(data) {
            $('#modalLoadin').hide();
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
            //console.log( JSON.stringify(data));
        },
    });
}


function openModelEspecies(nombre){
    console.log(nombre);
    $("#"+nombre).modal(
        {
            backdrop: 'static',
            keyboard: true, 
            show: true
        }
        //'show'
    );
}


/*funcion para obtener los funcionarios en el popup*/
function getDataNidosPop() {
    nido = $("#nidoPopup").val();
    zona = $("#zonaPopup").val();
    pagina = $("#pagina_enviaPopNido").val();
    dataC  = "tipo_nido__in=PETRELES&";
    if(nido != "")
        dataC += "descripcion__icontains=" + nido + "&";
    if(zona != "")
        dataC += "sitio_id__descripcion__icontains=" + zona + "&";
    /*if(codigoP != "")
        dataC += "codigo=" + codigoP + "&";
    if(marcaP != "")
        dataC += "marca_id__descripcion=" + marcaP + "&";

    */
    dataC = dataC.substring(0, dataC.length - 1);

    $.ajax({
        url: "data_ParamNido",
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
                            tabla += "<td align='left'>" + data[i].sitio_id.descripcion + "</td>";
                            tabla += '<td align="center"><textarea id="td_'+pagina+'_' + i + '" hidden>' + JSON.stringify(data[i]) + '</textarea> <a style="cursor: pointer; font-size: 20px;" title="Buscar" data-close-stackbox="true" onClick="getDataNidoPagina(' + i + ',\'' + pagina + '\');"><i class="fa fa-plus-circle text-blue"></i></a></td>';
                            tabla += "</tr>";
                        }
                        
                    }
                }

                $('#tabla_PopupNido').dataTable().fnClearTable();
                $('#tabla_PopupNido').dataTable().fnDestroy();

                $("#body_tabla_PopupNido").html("");
                $("#body_tabla_PopupNido").append(tabla);

                var table = $('#tabla_PopupNido').DataTable({
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

function limpiaPopupNido(pagina) {
    console.log(pagina);
    document.getElementById('pagina_enviaPopNido').value = pagina;
    $('#tabla_PopupNido').dataTable().fnClearTable();
    $('#tabla_PopupNido').dataTable().fnDestroy();
    $("#body_tabla_PopupNido").html("");
}

/*funcion para verificar que pagina envia la peticion desde el popup*/
function getDataNidoPagina(idx, pagina) {
    console.log(111);
    funcionario = $("#td_"+pagina+"_" + idx).val();
    newF = funcionario.replace(/None/g, null)
    newF = newF.replace(/False/g, "'false'")
    newF = newF.replace(/True/g, "'true'")
    newF = newF.replace(/'/g, '"')

    var json = JSON.parse("[" + newF + "]");
    if (pagina == 'petrel_nido')
        getDataNidoTablaPop(json);
}

function getDataNidoTablaPop(json){
    $("#nidoPet").val(json[0].descripcion) 
    $('#idnidoPet').val(json[0].id);
    $("#islaPet").val(json[0].sitio_id.isla_id.descripcion);
    $('#zonaPet').val(json[0].utm_zona);
    lat = json[0].latitud;


    if(lat != null)
        $("#ptoGpsPet").val(json[0].latitud + "|" + json[0].longitud);
    else{
        zona = json[0].utm_zona.substring(0, json[0].utm_zona.length - 1);
        var latlng = UTMtoGeog(json[0].utm_este, json[0].utm_norte, zona); 
        $("#ptoGpsPet").val(latlng.lat + "|" + latlng.lon);
    }


    geo = $("#ptoGpsPet").val();

    arrF = [];
    arrF = geo.split("|");
    //console.log(arrF[0].toString().replace(/\,/g, '.'));

    $("#ptoGpsPet").val(arrF[0].toString().replace(/\,/g, '.') + "|" + arrF[1].toString().replace(/\,/g, '.'));
    
}

