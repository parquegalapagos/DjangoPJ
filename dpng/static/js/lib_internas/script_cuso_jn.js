function getDataPersonaActaVisita(json){
    $("#armadaCUSO").val(json[0].nombre_completo);
    $("#idarmadaCUSO").val(json[0].id);
}

function getDataCapitanActaVisita(json){
    $("#nombrecapiCUSO").val(json[0].nombre_completo);
    $("#idnombrecapiCUSO").val(json[0].id);
    $("#cedcapiCUSO").val(json[0].identificacion);
}

function getDataPersonaActaInspec(json){
    $("#armadaCUSO").val(json[0].nombre_completo);
    $("#idarmadaCUSO").val(json[0].id);
}

function getDataCapitanActaInspec(json){
    $("#nombrecapiCUSO").val(json[0].nombre_completo);
    $("#idnombrecapiCUSO").val(json[0].id);
    $("#cedcapiCUSO").val(json[0].identificacion);
}



//tipo 1 envia pagina tipo 0 envia popup
function getDataParma(tipo){
    if(tipo == 1){
       parma = $("#licparmaCUSO").val();
       cedula = $("#cedparCUSO").val();
       nombre = $("#nombreparCUSO").val();
       $("#parmaPopup").val($("#licparmaCUSO").val());
       $("#cedPopup").val($("#cedparCUSO").val());
       $("#nombrePopup").val($("#nombreparCUSO").val());
    }
    else {
        parma = $("#parmaPopup").val();
        cedula = $("#cedPopup").val();
        nombre = $("#nombrePopup").val();
    }

    pagina = $("#pagina_enviaPopParma").val();
    dataC  = "";
    if(parma != "")
        dataC += "id__icontains=" + parma+ "&";
    if(cedula != "")
        dataC += "c_cedula__icontains=" + cedula+ "&";
    if(nombre != "")
        dataC += "c_apellidos__icontains=" + nombre + "&";
    /*if(nombre != "")
        dataC += "c_nombres__icontains=" + nombre + "&";*/

    dataC = dataC.substring(0, dataC.length - 1);

    console.log(dataC);
    $.ajax({
        url: "get_lista_licenciaparma",
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
                        if(data[i].c_estado == 'ACTIVO'){ //Solo funcionarios Activos
                            tabla += "<tr>";
                            tabla += "<td align='left'>" + data[i].id + "</td>";
                            tabla += "<td align='left'>" + data[i].c_apellidos + " " + data[i].c_nombres + "</td>";
                            tabla += "<td align='left'>" + data[i].c_cedula + "</td>";
                            tabla += '<td align="center"><textarea id="td_'+pagina+'_' + i + '" hidden>' + JSON.stringify(data[i]) + '</textarea> <a style="cursor: pointer; font-size: 20px;" title="Buscar" data-close-stackbox="true" onClick="getDataParmaPagina(' + i + ',\'' + pagina + '\');"><i class="fa fa-plus-circle text-blue"></i></a></td>';
                            tabla += "</tr>";
                        }
                        
                    }
                }

                $('#tabla_PopupParma').dataTable().fnClearTable();
                $('#tabla_PopupParma').dataTable().fnDestroy();

                $("#body_tabla_PopupParma").html("");
                $("#body_tabla_PopupParma").append(tabla);

                var table = $('#tabla_PopupParma').DataTable({
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

//tipo 1 envia pagina tipo 0 envia popup
function getDataLicGuia(tipo){
    
    num_lic = $("#licGuiaPopup").val();
    nombre_lic = $("#nombreGuiaPopup").val();
    ced_lic = $("#cedGuiaPopup").val();

    pagina = $("#pagina_enviaPopLicGuia").val();
    dataC  = "";
    if(num_lic != "")
        dataC += "num_licencia__icontains=" + num_lic + "&";
    if(nombre_lic != "")
        dataC += "guia_id__persona_id__nombre_completo__icontains=" + nombre_lic + "&";
    if(ced_lic != "")
        dataC += "guia_id__persona_id__identificacion__icontains=" + ced_lic + "&";

    dataC = dataC.substring(0, dataC.length - 1);

    $.ajax({
        url: "get_lista_numlicencia",
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
                            tabla += "<td align='left'>" + data[i].num_licencia + "</td>";
                            tabla += "<td align='left'>" + data[i].guia_id.persona_id.nombre_completo + "</td>";
                            tabla += "<td align='left'>" + data[i].guia_id.persona_id.identificacion + "</td>";
                            tabla += '<td align="center"><textarea id="td_'+pagina+'_' + i + '" hidden>' + JSON.stringify(data[i]) + '</textarea> <a style="cursor: pointer; font-size: 20px;" title="Buscar" data-close-stackbox="true" onClick="getDataParmaPagina(' + i + ',\'' + pagina + '\');"><i class="fa fa-plus-circle text-blue"></i></a></td>';
                            tabla += "</tr>";
                        }
                        
                    }
                }

                $('#tabla_PopupLicGuia').dataTable().fnClearTable();
                $('#tabla_PopupLicGuia').dataTable().fnDestroy();

                $("#body_tabla_PopupLicGuia").html("");
                $("#body_tabla_PopupLicGuia").append(tabla);

                var table = $('#tabla_PopupLicGuia').DataTable({
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

function limpiaPopupParma(pagina) {
    console.log(pagina);
    document.getElementById('pagina_enviaPopParma').value = pagina;
    $('#tabla_PopupParma').dataTable().fnClearTable();
    $('#tabla_PopupParma').dataTable().fnDestroy();
    $("#body_tabla_PopupParma").html("");
}

function limpiaPopupLicenciaGuia(pagina) {
    console.log(pagina);
    document.getElementById('pagina_enviaPopLicGuia').value = pagina;
    $('#tabla_PopupLicguia').dataTable().fnClearTable();
    $('#tabla_PopupLicguia').dataTable().fnDestroy();
    $("#body_tabla_PopupLicguia").html("");
}


/*funcion para verificar que pagina envia la peticion desde el popup*/
function getDataParmaPagina(idx, pagina) {
    console.log(111);
    funcionario = $("#td_"+pagina+"_" + idx).val();
    newF = funcionario.replace(/None/g, null)
    newF = newF.replace(/False/g, "'false'")
    newF = newF.replace(/True/g, "'true'")
    newF = newF.replace(/'/g, '"')

    var json = JSON.parse("[" + newF + "]");
    if (pagina == 'parma')
        getDataParmaTablaPop(json);
    if (pagina == 'embarcacion')
        getDataEmbarcTablaPop(json);
    if (pagina == 'licguia')
        getDataLicGuiaTablaPop(json);
    if (pagina == 'emb_patrulla')
        getDataEmbPatrullaPop(json);
    if (pagina == 'acta_retencion')
        getDataActaRetPop(json);
    if (pagina == 'acta_retencionImp')
        insertarDataParmaImpActaRetencion(json);
    if (pagina == 'embarcacionTuris')
        getDataEmbarcTurisTablaPop(json);
    if (pagina == 'emb_infodia')
        getDataEmbarcInfoDia(json);
}


/*funcion para mapear los datos de la situacion actual del funcionario*/
function getDataParmaTablaPop(json) {
    eliminar  = "<a class='delete' parma_id='"+json[0].id+"' onClick='deleteTablaParma(this);'><i class='fa fa-trash text-green btn_edit'></i></a>";
    var dTable = $('#tabla_parma').DataTable({
                                              "destroy": true
                                            } );
    dTable.row.add([
        json[0].id,
        json[0].c_apellidos+" "+json[0].c_nombres,
        json[0].c_cedula,
        eliminar
    ]).draw();
}

/*funcion para mapear los datos de la situacion actual del funcionario*/
function getDataLicGuiaTablaPop(json) {
    eliminar  = "<a class='delete' licguia_id='"+json[0].id+"' onClick='deleteTablaLicGuia(this);'><i class='fa fa-trash text-green btn_edit'></i></a>";
    var dTable = $('#tabla_licguia').DataTable({
                                              "destroy": true
                                            } );
    dTable.row.add([
        json[0].num_licencia,
        json[0].guia_id.persona_id.nombre_completo,
        json[0].guia_id.persona_id.identificacion,
        eliminar
    ]).draw();
}

/*funcion para mapear los datos de la situacion actual del funcionario*/
function getDataEmbarcTablaPop(json) {
    $("#embarcacionCUSO").val(json[0].c_nombreembarcacion);
    if(json[0].c_armadordosapellidos!= "")
        armador2 = '\n'+json[0].c_armadordosapellidos+" "+json[0].c_armadordosnombres;
    else
        armador2="";
    $("#armadorCUSO").val(json[0].c_armadorunoapellidos+" "+json[0].c_armadorunonombres+armador2);
    $("#matriculaEmbCUSO").val(json[0].c_matriculadigmer);
    $("#permisoEmbCUSO").val(json[0].c_permisopesca);
    $("#idembarcacionCUSO").val(json[0].id);   
}

/*funcion para mapear los datos de la situacion actual del funcionario*/
function getDataEmbarcTurisTablaPop(json) {
    $("#embarcacionCUSO").val(json[0].embarcacion_id.nombre);
   
    $("#matriculaEmbCUSO").val(json[0].embarcacion_id.num_matricula);
    $("#permisoEmbCUSO").val(json[0].c_permisopesca);
    $("#idembarcacionCUSO").val(json[0].id);   
}

/*funcion para mapear los datos de la situacion actual del funcionario*/
function getDataEmbPatrullaPop(json) {
    $("#nombreUniPP").val(json[0].nombre);
    $("#idnombreUniPP").val(json[0].id); 
    $("#matriculaUniPP").val(json[0].matricula);
    $("#nominativoUniPP").val(json[0].nominativo);
    $("#tipoUniPP").val(json[0].tipo);
    $("#combUniPP").val(json[0].combustible);
    $("#velocidadUniPP").val(json[0].velocidad);
    $("#tripulanteUniPP").val(json[0].num_tripulantes);     
}


//$('#tabla_parma').on('click', '.delete', function () {
function deleteTablaParma(trthis){
var pageParamTable = $('#tabla_parma').DataTable();
    var tableRow = pageParamTable.row($(trthis).parents('tr'));
    id_detalle = $(trthis).attr("id_detalle");
    
    //console.log(id_detalle);
    if(id_detalle){
        //return 0;
        datos = '{"estado":"I","eliminado":"t"}';
        $.ajax({
        url: "update_General",
        type: "get",
        cache: 'false',
        data: {
            "dj_url": "cmnactavisitainspecembpescatripulacion",
            "idtabla": id_detalle,
            "data": JSON.stringify(datos)
        },
        dataType: "json",

        success: function(data) {
            if (data.id == undefined) {
                $('#modalLoadin').hide();
                validaContenedorExt("addactaVisitaCuso", "Error al Insertar el registro");
                console.log("idtabla---->" + id + "--->" + "data---->" + datos + "--->" + "cmnactavisitainspecembpescatripulacion" + "Error--->" + data);
            } else {
                validaContenedorExt2("addactaVisitaCuso", "Registro eliminado con exito");
                pageParamTable.row( tableRow ).remove().draw();
            }
        },
        error: function(data) {
            $('#modalLoadin').hide();
            validaContenedorExt("addactaVisitaCuso", "Error al Insertar el registro");
            console.log("idtabla---->" + id + "--->" + "data---->" + datos + "--->" + "cmnactavisitainspecembpescatripulacion" + "Error--->" + data);
        },
    });
    }else
        pageParamTable.row( tableRow ).remove().draw();
};


function sortJSON(arr, key, way) {
    return arr.sort(function(a, b) {
        var match1 = /(\d+)\/(\d+)\/(\d+)/.exec((a[key]));
        var match2 = /(\d+)\/(\d+)\/(\d+)/.exec((b[key]));
        var x = new Date(match1[3], match1[2], match1[1]); 
        var y = new Date(match2[3], match2[2], match2[1]);
        if (way === '123') { return ((x < y) ? -1 : ((x > y) ? 1 : 0)); }
        if (way === '321') { return ((x > y) ? -1 : ((x < y) ? 1 : 0)); }
    });
}

function sortJSON2(arr, key, way) {
    return arr.sort(function(a, b) {
        var match1 = (a[key]).split('-');
        var match2 = (b[key]).split('-');
        var x = new Date(match1[0], match1[1], match1[2]); 
        var y = new Date(match2[0], match2[1], match2[2]);
        if (way === '123') { return ((x < y) ? -1 : ((x > y) ? 1 : 0)); }
        if (way === '321') { return ((x > y) ? -1 : ((x < y) ? 1 : 0)); }
    });
}


//tipo 1 envia pagina tipo 0 envia popup
function getDataEmbarcacion(){

    embarcacion = $("#nombreEmbPopup").val();
    matricula   = $("#matEmbPopup").val();
    permiso     = $("#perpescaEmbPopup").val();

    pagina = $("#pagina_enviaPopEmbarcPesca").val();
    dataC  = "";
    if(embarcacion != "")
        dataC += "c_nombreembarcacion__icontains=" + embarcacion + "&";
    if(matricula != "")
        dataC += "c_matriculadigmer__icontains=" + matricula + "&";
    if(permiso != "")
        dataC += "c_permisopesca__icontains=" + permiso + "&";

    dataC = dataC.substring(0, dataC.length - 1);

    console.log(dataC);

    $.ajax({
        url: "get_lista_embarcacionesPesca",
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
                //geeks_outer(data);
                console.log(sortJSON(data,'c_fechaemision', '321')); // 123 or 321
                data = sortJSON(data,'c_fechaemision', '321');
                if (data.length > 0) {
                    for (i = 0; i < data.length; i++) {
                        
                            tabla += "<tr>";
                            tabla += "<td align='left'>" + data[i].c_nombreembarcacion + "</td>";
                            tabla += "<td align='left'>" + data[i].c_matriculadigmer +  "</td>";
                            tabla += "<td align='left'>" + data[i].c_permisopesca + "</td>";
                            tabla += "<td align='left'>" + data[i].c_armadorunoapellidos + " " + data[i].c_armadorunonombres + "</td>";
                            tabla += "<td align='left'>" + data[i].c_fechaemision + "</td>";
                            tabla += "<td align='left'>" + data[i].c_fechacaducidad + "</td>";
                            tabla += '<td align="center"><textarea id="td_'+pagina+'_' + i + '" hidden>' + JSON.stringify(data[i]) + '</textarea> <a style="cursor: pointer; font-size: 20px;" title="Buscar" data-close-stackbox="true" onClick="getDataParmaPagina(' + i + ',\'' + pagina + '\');"><i class="fa fa-plus-circle text-blue"></i></a></td>';
                            tabla += "</tr>";
                            break; 
                    }
                }

                $('#tabla_PopupEmbarc').dataTable().fnClearTable();
                $('#tabla_PopupEmbarc').dataTable().fnDestroy();

                $("#body_tabla_PopupEmbarc").html("");
                $("#body_tabla_PopupEmbarc").append(tabla);

                var table = $('#tabla_PopupEmbarc').DataTable({
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

//tipo 1 envia pagina tipo 0 envia popup
function getDataEmbarcacionTuris(){

    embarcacion = $("#nombreEmbTPopup").val();
    matricula   = $("#matEmbTPopup").val();
    permiso     = $("#perpescaEmbTPopup").val();

    pagina = $("#pagina_enviaPopEmbarc").val();
    dataC  = "";
    if(embarcacion != "")
        dataC += "embarcacion_id__nombre__icontains=" + embarcacion + "&";
    if(matricula != "")
        dataC += "embarcacion_id__num_matricula__icontains=" + matricula + "&";
    if(permiso != "")
        dataC += "num_patente__icontains=" + permiso + "&";

    dataC = dataC.substring(0, dataC.length - 1);

    console.log(dataC);

    $.ajax({
        url: "get_lista_embarcacionesTuris",
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
                    console.log(sortJSON2(data,'fecha_expedicion', '321')); // 123 or 321
                    data = sortJSON2(data,'fecha_expedicion', '321');
                    for (i = 0; i < data.length; i++) {
                        
                            tabla += "<tr>";
                            tabla += "<td align='left'>" + data[i].embarcacion_id.nombre + "</td>";
                            tabla += "<td align='left'>" + data[i].embarcacion_id.num_matricula +  "</td>";
                            tabla += "<td align='left'>" + data[i].num_patente + "</td>";
                            tabla += "<td align='left'>" + data[i].fecha_expedicion + "</td>";
                            tabla += "<td align='left'>" + data[i].fecha_caducidad + "</td>";
                            tabla += '<td align="center"><textarea id="td_'+pagina+'_' + i + '" hidden>' + JSON.stringify(data[i]) + '</textarea> <a style="cursor: pointer; font-size: 20px;" title="Buscar" data-close-stackbox="true" onClick="getDataParmaPagina(' + i + ',\'' + pagina + '\');"><i class="fa fa-plus-circle text-blue"></i></a></td>';
                            tabla += "</tr>";
                            break; 
                    }
                }

                $('#tabla_PopupEmbarcT').dataTable().fnClearTable();
                $('#tabla_PopupEmbarcT').dataTable().fnDestroy();

                $("#body_tabla_PopupEmbarcT").html("");
                $("#body_tabla_PopupEmbarcT").append(tabla);

                var table = $('#tabla_PopupEmbarcT').DataTable({
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



function limpiaPopupEmbarc(pagina) {
    console.log(pagina);
    document.getElementById('pagina_enviaPopEmbarcPesca').value = pagina;
    $('#tabla_PopupEmbarc').dataTable().fnClearTable();
    $('#tabla_PopupEmbarc').dataTable().fnDestroy();
    $("#body_tabla_PopupEmbarc").html("");
}

function limpiaPopupEmbarcT(pagina) {
    console.log(pagina);
    document.getElementById('pagina_enviaPopEmbarc').value = pagina;
    $('#tabla_PopupEmbarcT').dataTable().fnClearTable();
    $('#tabla_PopupEmbarcT').dataTable().fnDestroy();
    $("#body_tabla_PopupEmbarcT").html("");
}

function limpiaPopupEmbPat(pagina) {
    console.log(pagina);
    document.getElementById('pagina_enviaPopEmbPat').value = pagina;
    $('#tabla_PopupEmbPat').dataTable().fnClearTable();
    $('#tabla_PopupEmbPat').dataTable().fnDestroy();
    $("#body_tabla_PopupEmbPat").html("");
}

function limpiaPopupActaRet(pagina) {
    console.log(pagina);
    document.getElementById('pagina_enviaPopActaR').value = pagina;
    $("#pagina_enviaPopActaR").val(pagina);
    $('#tabla_PopupActaR').dataTable().fnClearTable();
    $('#tabla_PopupActaR').dataTable().fnDestroy();
    $("#body_tabla_PopupActaR").html("");
}

//tipo 1 envia pagina tipo 0 envia popup
function getDataEmbPatrulla(){

    embarcacion = $("#nombreEmbPatPopup").val();
    matricula   = $("#matEmbPatPopup").val();


    pagina = $("#pagina_enviaPopEmbPat").val();
    dataC  = "";
    if(embarcacion != "")
        dataC += "nombre__icontains=" + embarcacion + "&";
    if(matricula != "")
        dataC += "matricula__icontains=" + matricula + "&";

    dataC = dataC.substring(0, dataC.length - 1);

    console.log(dataC);

    $.ajax({
        url: "get_lista_embPat",
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
                        
                            tabla += "<tr>";
                            tabla += "<td align='left'>" + data[i].nombre + "</td>";
                            tabla += "<td align='left'>" + data[i].matricula +  "</td>";
                            tabla += "<td align='left'>" + data[i].tipo + "</td>";
                            tabla += "<td align='left'>" + data[i].puerto_operacion_id.descripcion + "</td>";
                            tabla += '<td align="center"><textarea id="td_'+pagina+'_' + i + '" hidden>' + JSON.stringify(data[i]) + '</textarea> <a style="cursor: pointer; font-size: 20px;" title="Buscar" data-close-stackbox="true" onClick="getDataParmaPagina(' + i + ',\'' + pagina + '\');"><i class="fa fa-plus-circle text-blue"></i></a></td>';
                            tabla += "</tr>";
                    }
                }

                $('#tabla_PopupEmbPat').dataTable().fnClearTable();
                $('#tabla_PopupEmbPat').dataTable().fnDestroy();

                $("#body_tabla_PopupEmbPat").html("");
                $("#body_tabla_PopupEmbPat").append(tabla);

                var table = $('#tabla_PopupEmbPat').DataTable({
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


/*############################informe de novedades*/
function limpiarFormactaVisitaCuso(){
clearForm(frm_acta);
$("#tipoAVCUSO").val(0);
$("#idAVCUSO").val("");
$('.nav-tabs a[href="#tab_Gen"]').tab('show');
//$("#descargaINSA").val(0);
$('#tabla_parma').dataTable().fnClearTable();
$('#tabla_parma').dataTable().fnDestroy();
$("#bodytabla_parma").html("");

}


function buscarActaVisitaCusoParam(filtro){
if(filtro != ""){
    dataC = "";
    numero = $("#numeropAVCUSO").val();
    embarcacion = $("#embarcapAVCUSO").val();
    funcionario = $("#funcionariopAVCUSO").val();
    if (numero != "")
        dataC += "secuencia__icontains=" + numero + "&";

    if (embarcacion != "")
        dataC += "permisopesca_id__c_nombreembarcacion__icontains=" + embarcacion + "&";

    if (funcionario != "")
        dataC += "guardaparque_id__persona_id__nombre_completo__icontains=" + funcionario + "&";

    dataC = dataC.substring(0, dataC.length - 1);
}else
    dataC = "";

     $.ajax({
        url: "data_actavisitaParam",
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
                        tabla += "<td align='center' id='td_secuencia_"+data[i].id+"'>" + data[i].secuencia + "</td>";             
                        tabla += "<td align='center' id='td_fecha_"+data[i].id+"'>" + data[i].fecha + "</td>";
                        tabla += "<td align='center'><a href='#addactaVisitaCuso' data-stackbox='true' data-stackbox-position='absolute' onclick='editActaVisita(\"" + data[i].id + "\")'><i class='fa fa-edit text-green btn_edit'></i></a> </td>";
                        tabla += "<td align='center'><a onclick='deleteModal(\"" + data[i].id + "\",\"actavisita\");'><i class='fa fa-trash text-green btn_edit'></i></a></td>";
                        tabla += "</tr>";
                    }
                }
                $('#tabla_actaVisitaCuso').dataTable().fnClearTable();
                $('#tabla_actaVisitaCuso').dataTable().fnDestroy();

                $("#bodytabla_actaVisitaCuso").html("");
                $("#bodytabla_actaVisitaCuso").append(tabla);

                var table = $('#tabla_actaVisitaCuso').DataTable();
                }
        },
        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
        },
    });
}

function editActaVisita(id){
limpiarFormactaVisitaCuso();
$.ajax({
        url: "actavisita_data",
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
                $("#tipoAVCUSO").val(1);
                $("#idAVCUSO").val(id);
                arrayF = json[0].fecha.split("T");
                $("#fechaCUSO").val(arrayF[0]);
                arrayHora = arrayF[1].split(":")
                $("#horaCUSO").val(arrayHora[0]+":"+arrayHora[1]);
                $("#SsitioCuso").val(json[0].sitio_inspeccion_id.id).trigger("change");
                $("#referCUSO").val(json[0].referencia);
                $("#numtripuCUSO").val(json[0].num_tripulantes);

                if(json[0].autoridadmaritima_id != null){
                    $("#guardaparqueCUSO").val(json[0].guardaparque_id.persona_id.nombre_completo);
                    $("#idguardaparqueCUSO").val(json[0].guardaparque_id.id);
                }else{
                    $("#guardaparqueCUSO").val("");
                    $("#idguardaparqueCUSO").val("");
                }

                if(json[0].autoridadmaritima_id != null){
                    $("#armadaCUSO").val(json[0].autoridadmaritima_id.nombre_completo);
                    $("#idarmadaCUSO").val(json[0].autoridadmaritima_id.id);
                }else{
                    $("#armadaCUSO").val("");
                    $("#idarmadaCUSO").val("");
                }

                if(json[0].permisopesca_id != null){
                    $("#embarcacionCUSO").val(json[0].permisopesca_id.c_nombreembarcacion);
                    $("#armadorCUSO").val(json[0].permisopesca_id.c_armadorunoapellidos+" "+json[0].permisopesca_id.c_armadorunonombres);
                    $("#matriculaEmbCUSO").val(json[0].permisopesca_id.c_matriculadigmer);
                    $("#permisoEmbCUSO").val(json[0].permisopesca_id.c_permisopesca);
                    $("#idembarcacionCUSO").val(json[0].permisopesca_id.id);  
                }else{
                    $("#embarcacionCUSO").val("");
                    $("#armadorCUSO").val("");
                    $("#matriculaEmbCUSO").val("");
                    $("#permisoEmbCUSO").val("");
                    $("#idembarcacionCUSO").val("");
                }

                $("#nombrecapiCUSO").val(json[0].capitan_id.nombre_completo);
                $("#idnombrecapiCUSO").val(json[0].capitan_id.id); 
                $("#cedcapiCUSO").val(json[0].capitan_id.identificacion); 

                $("#SpuertoCuso").val(json[0].ultimopuertovisitado_id.id).trigger("change");

                if (json[0].det_tripulacion.length > 0) {
                    tabla = '';
                    for (i = 0; i < json[0].det_tripulacion.length; i++) {
                        tabla += "<tr>";
                        /*hacer la secuencia para el  numero de solicitud*/
                        tabla += "<td>" + json[0].det_tripulacion[i].parma_id.id + "</td>";                      
                        tabla += "<td>" + json[0].det_tripulacion[i].parma_id.c_apellidos + " " + json[0].det_tripulacion[i].parma_id.c_nombres + "</td>";
                        tabla += "<td>" + json[0].det_tripulacion[i].parma_id.c_cedula + "</td>";
                        tabla += "<td align='center'><a class='delete' id_detalle='" + json[0].det_tripulacion[i].id + "' onclick='deleteTablaParma(this);'><i class='fa fa-trash text-green btn_edit'></i></a></td>";
                        tabla += "</tr>";                
                    }

                    $('#tabla_parma').dataTable().fnClearTable();
                    $('#tabla_parma').dataTable().fnDestroy();
                    $("#bodytabla_parma").html("");
                    $("#bodytabla_parma").append(tabla);

                    var table = $('#tabla_parma').DataTable();
                }

                if (json[0].det_observaciones.length > 0) {
                    tabla = '';
                    for (i = 0; i < json[0].det_observaciones.length; i++) {
                         if(json[0].det_observaciones[i].observacion_id.valor == '1' ){
                            $("#pregunta1").attr("detalle_observ_id",json[0].det_observaciones[i].id);
                            if(json[0].det_observaciones[i].respuesta == true )
                                $("#pSi1").prop('checked', true);
                            else
                                $("#pSi1").prop('checked', false);

                            if(json[0].det_observaciones[i].respuesta == false )
                                $("#pNo1").prop('checked', true);
                            else
                                $("#pNo1").prop('checked', false);

                            $("#preguntaT1").val(json[0].det_observaciones[i].observaciones);
                         }
                         
                         if(json[0].det_observaciones[i].observacion_id.valor == '2' ){
                            $("#pregunta2").attr("detalle_observ_id",json[0].det_observaciones[i].id);
                            if(json[0].det_observaciones[i].respuesta == true )
                                $("#pSi2").prop('checked', true);
                            else
                                $("#pSi2").prop('checked', false);

                            if(json[0].det_observaciones[i].respuesta == false )
                                $("#pNo2").prop('checked', true);
                            else
                                $("#pNo2").prop('checked', false);

                            $("#preguntaT2").val(json[0].det_observaciones[i].observaciones);
                         }
                         if(json[0].det_observaciones[i].observacion_id.valor == '3' ){
                            $("#pregunta3").attr("detalle_observ_id",json[0].det_observaciones[i].id);
                            if(json[0].det_observaciones[i].respuesta == true )
                                $("#pSi3").prop('checked', true);
                            else
                                $("#pSi3").prop('checked', false);

                            if(json[0].det_observaciones[i].respuesta == false )
                                $("#pNo3").prop('checked', true);
                            else
                                $("#pNo3").prop('checked', false);

                            $("#preguntaT3").val(json[0].det_observaciones[i].observaciones);
                         }
                         if(json[0].det_observaciones[i].observacion_id.valor == '4' ){
                            $("#pregunta4").attr("detalle_observ_id",json[0].det_observaciones[i].id);
                            if(json[0].det_observaciones[i].respuesta == true )
                                $("#pSi4").prop('checked', true);
                            else
                                $("#pSi4").prop('checked', false);

                            if(json[0].det_observaciones[i].respuesta == false)
                                $("#pNo4").prop('checked', true);
                            else
                                $("#pNo4").prop('checked', false);

                            if(json[0].det_observaciones[i].observaciones == "true" )
                                $("#pSi42").prop('checked', true);
                            else
                                $("#pSi42").prop('checked', false);

                            if(json[0].det_observaciones[i].observaciones == "false" )
                                $("#pNo42").prop('checked', true);
                            else
                                $("#pNo42").prop('checked', false);
                         }
                         if(json[0].det_observaciones[i].observacion_id.valor == '5' ){
                            $("#pregunta5").attr("detalle_observ_id",json[0].det_observaciones[i].id);
                            if(json[0].det_observaciones[i].respuesta == true )
                                $("#pSi5").prop('checked', true);
                            else
                                $("#pSi5").prop('checked', false);

                            if(json[0].det_observaciones[i].respuesta == false )
                                $("#pNo5").prop('checked', true);
                            else
                                $("#pNo5").prop('checked', false);

                            if(json[0].det_observaciones[i].observaciones == "true" )
                                $("#pSi52").prop('checked', true);
                            else
                                $("#pSi52").prop('checked', false);

                            if(json[0].det_observaciones[i].observaciones == "false" )
                                $("#pNo52").prop('checked', true);
                            else
                                $("#pNo52").prop('checked', false);
                         }          
                    }
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


function setInsertUpdateactaVisitaCuso() {
    console.log("asdas");
    valida = validaContenedor("addactaVisitaCuso");

    //if (valida) {
        proceso    = $("#procesoCUSO").val();
        subproceso = $("#subprocesoCUSO").val();
        guardaparque  = $("#idguardaparqueCUSO").val();
        armada        = $("#idarmadaCUSO").val();
        fecha      = $("#fechaCUSO").val();
        hora       = $("#horaCUSO").val();
        sitio      = $("#SsitioCuso").val();
        coordenada = $("#coordCUSO").val();
        referencia = $("#referCUSO").val();

        fechaF = fecha+" "+hora;

        embarcacion = $("#idembarcacionCUSO").val();
        capitan     = $("#idnombrecapiCUSO").val();
        ced_capitan = $("#cedcapiCUSO").val();
        num_tripula = $("#numtripuCUSO").val();
        ult_puerto  = $("#SpuertoCuso").val();

        datosTripulacion = '';
        var filas = $("#tabla_parma").find("tr"); //devulve las filas del body de tu tabla segun el ejemplo que brindaste
        var resultado = "";
        for(i=1; i<filas.length; i++){ //Recorre las filas 1 a 1
            var celdas = $(filas[i]).find("td"); //devolverá las celdas de una fila
            
            parma_id    = $(celdas[0]).html();
            id_detalle  = $($(celdas[3]).children("a")[0]).attr("id_detalle");

            datosTripulacion  += '{"parma_id":"' + parma_id + '"';

            if($("#tipoAVCUSO").val() == 1){
                datosTripulacion  += ',"cab_actpescaemb_id":"' + $("#idAVCUSO").val() + '"';
                if(id_detalle != null)
                    datosTripulacion  += ',"id":"' + id_detalle + '"';
            }
            datosTripulacion  += '},';            
        }

        datosTripulacion = datosTripulacion.substring(0, datosTripulacion.length - 1);

        var filas = $("#tabla_observacionesAV").find("tr"); //devulve las filas del body de tu tabla segun el ejemplo que brindaste
        var resultado = "";
        datosObservacion  = '';
        for(i=1; i<filas.length; i++){ //Recorre las filas 1 a 1
            var celdas = $(filas[i]).find("td"); //devolverá las celdas de una fila
            
            pergunta_id  = $(celdas[0]).attr("data_id");
            
            if(pergunta_id != null){

                respuestaSI  = $($(celdas[1]).children("input")[0]).is(':checked');
                respuestaNO  = $($(celdas[2]).children("input")[0]).is(':checked');
                respuestaf = '';
                if(respuestaSI == true)
                    respuestaf = true;
                if(respuestaNO == true)
                    respuestaf = false;

                tipo_preg    = $(celdas[3]).attr("data_tipo");
                respuestaObsf = '';
                if(tipo_preg == 1)
                    respuestaObsf  = $($(celdas[3]).children("textarea")[0]).val();
                else{
                    respuestaObsSI  = $($(celdas[3]).children("input")[0]).is(':checked');
                    respuestaObsNo  = $($(celdas[3]).children("input")[1]).is(':checked');
                    if(respuestaObsSI == true)
                        respuestaObsf = true;
                    if(respuestaObsNo == true)
                        respuestaObsf = false;

                }

                id_detalleObs  = $(celdas[0]).attr("detalle_observ_id");

                datosObservacion  += '{"observacion_id":"' + pergunta_id + '", ';
                datosObservacion  += '"respuesta":"' + respuestaf + '", ';
                datosObservacion  += '"observaciones":"' + respuestaObsf + '" ';
                //solo id si es un update
                if($("#tipoAVCUSO").val() == 1)
                    datosObservacion  += ',"id":"' + id_detalleObs + '"';
                datosObservacion  += '},';  

            }          
        }

        datosObservacion = datosObservacion.substring(0, datosObservacion.length - 1);

        datos = '{';
        //datos += ' "numero":"", ';
        datos += ' "proceso_estatuto_id":"' + proceso + '", ';
        datos += ' "subproceso_estatuto_id":"' + subproceso + '", ';
        datos += ' "sitio_inspeccion_id":"' + sitio + '", ';
        datos += ' "referencia":"' + referencia + '", ';
        datos += ' "fecha":"' + fechaF + '", ';
        datos += ' "latitud":"' + coordenada + '", ';
        datos += ' "longitud":"' + coordenada + '", ';
        datos += ' "permisopesca_id":"' + embarcacion + '", '; 
        datos += ' "capitan_id":"' + capitan + '", ';
        datos += ' "num_tripulantes":"' + num_tripula + '", ';
        datos += ' "ultimopuertovisitado_id":"' + ult_puerto + '", ';
        datos += ' "guardaparque_id":"' + guardaparque + '", ';
        datos += ' "autoridadmaritima_id":"' + armada + '", ';
        datos += ' "det_tripulacion":[' + datosTripulacion + '],';
        datos += ' "det_observaciones":[' + datosObservacion + ']';
        datos += '}';
       
        datos = datos.replace(/undefined/g, null);
        datos = datos.replace(/None/g,null);
        datos = datos.replace(/False/g,"'false'");
        datos = datos.replace(/True/g,"'true'");
        datos = datos.replace(/"null"/g, null);
        datos.replace(/(\r\n\t|\n|\r\t)/gm,"").trim();

        console.log(datos);

        if ($("#tipoAVCUSO").val() == 0)
            insertarCabDetActaVisitas(datos);
        else
            saveEditCabDetActaVisitas(datos);
    //}
}

function insertarCabDetActaVisitas(datos){
    $("#modalLoadin").show();
    dj_url = "cusocabdetcmnactavisitainspecembpesca";
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
                console.log("data---->" + datos + "--->" + "cusocabdetcmnactavisitainspecembpesca" + "Error--->" + data);
            } else {
                swal("", "Registro insertado con Exito", "success");
                buscarActaVisitaCusoParam("");
                $('#modalLoadin').hide();
            }
        },
        error: function(data) {
            $('#modalLoadin').hide();
            swal("", "Error al Insertar el registro", "error");
            console.log("data---->" + datos + "--->" + "cusocabdetcmnactavisitainspecembpesca" + "Error--->" + data);
        },
    });
}

function saveEditCabDetActaVisitas(datos){
    $("#modalLoadin").show();
    console.log($("#idAVCUSO").val());
    dj_url = "cusocabdetcmnactavisitainspecembpesca";
    $.ajax({
        url: "update_General",
        type: 'get',
        cache: 'false',
        data: {
            "dj_url": dj_url,
            "idtabla": $("#idAVCUSO").val(),
            "data": JSON.stringify(datos)
        },
        dataType: "json",
        success: function(data) {
            if (data.id == undefined) {
                $('#modalLoadin').hide();
                swal("", "Error al Actualizar el registro", "error");
                console.log("data---->" + datos + "--->" + "cusocabdetcmnactavisitainspecembpesca" + "Error--->" + data);
            } else {
                $("#modalLoadin").hide();
                swal("", "Registro Actualizados con Exito", "success");
                if ($('#window').is(':visible')) {
                    getDataINCusoPdf();      
                }          
            }
        },
        error: function(data) {
            $("#modalLoadin").hide();
            swal("", "Error al Actualizar el registro", "error");
            console.log("data---->" + datos + "--->" + "cusocabdetcmnactavisitainspecembpesca" + "Error--->" + data);
        },
    });
}


function deleteActavisita(id){
    $('#modalLoadin').show();
    datos = '{ "estado":"I",';
    datos += ' "eliminado":"t"';
    datos += '}';
    dj_url = "cmnactavisitainspecembpesca";
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
                swal("", "Error al Eliminar el registro", "error");
                console.log("data---->" + datos + "--->" + "cmnactavisitainspecembpesca" + "Error--->" + data);
            } else {
                $("#modalLoadin").hide();
                swal("", "Registro eliminado con Exito", "success");
                buscarActaVisitaCusoParam("");
                       
            }
        },
        error: function(data) {
            $("#modalLoadin").hide();
            swal("", "Error al Eliminar el registro", "error");
            console.log("data---->" + datos + "--->" + "cmnactavisitainspecembpesca" + "Error--->" + data);
        },
    });
}




/*******************************************acta inspeccion *****************************************************/
function limpiarFormactaInspecCuso(){
    clearForm(frm_acta);
    $("#tipoAICUSO").val(0);
    $("#idAICUSO").val("");
    $('.nav-tabs a[href="#tab_GenAI"]').tab('show');

    
    $('#tabla_licguia').dataTable().fnClearTable();
    $('#tabla_licguia').dataTable().fnDestroy();
    $("#bodytabla_licguia").html("");
}


function buscarActaInspecCusoParam(filtro){
if(filtro != ""){
    dataC = "";
    numero = $("#numeropAICUSO").val();
    embarcacion = $("#embarcapAICUSO").val();
    funcionario = $("#funcionariopAICUSO").val();
    if (numero != "")
        dataC += "secuencia__icontains=" + numero + "&";

    if (embarcacion != "")
        dataC += "embarcacion_id__nombre__icontains=" + embarcacion + "&";

    if (funcionario != "")
        dataC += "guardaparque_id__persona_id__nombre_completo__icontains=" + funcionario + "&";

    dataC = dataC.substring(0, dataC.length - 1);
}else
    dataC = "";

     $.ajax({
        url: "data_actainspecParam",
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
                        tabla += "<td align='center' id='td_secuencia_"+data[i].id+"'>" + data[i].secuencia + "</td>";             
                        tabla += "<td align='center' id='td_fecha_"+data[i].id+"'>" + data[i].fecha + "</td>";
                        tabla += "<td align='center'><a href='#addactaInspecCuso' data-stackbox='true' data-stackbox-position='absolute' data-stackbox-width='900' onclick='editActaInspec(\"" + data[i].id + "\")'><i class='fa fa-edit text-green btn_edit'></i></a> </td>";
                        tabla += "<td align='center'><a onclick='deleteModal(\"" + data[i].id + "\",\"actainspec\");'><i class='fa fa-trash text-green btn_edit'></i></a></td>";
                        tabla += "</tr>";
                    }
                }
                $('#tabla_actaInspecCuso').dataTable().fnClearTable();
                $('#tabla_actaInspecCuso').dataTable().fnDestroy();

                $("#bodytabla_actaInspecCuso").html("");
                $("#bodytabla_actaInspecCuso").append(tabla);

                var table = $('#tabla_actaInspecCuso').DataTable();
                }
        },
        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
        },
    });
}


function editActaInspec(id){
limpiarFormactaInspecCuso();
$.ajax({
        url: "actainspec_data",
        type: "post",
        data: {
            "data": id
        },
        dataType: "json",

        success: function(json) {
            $("#modalLoadin").hide();
            if (json['non_field_errors']) {
                console.log(json['non_field_errors']);
            } else {
                $("#tipoAICUSO").val(1);
                $("#idAICUSO").val(id);
                arrayF = json[0].fecha.split("T");
                $("#fechaCUSO").val(arrayF[0]);
                arrayHora = arrayF[1].split(":")
                $("#horaCUSO").val(arrayHora[0]+":"+arrayHora[1]);
                $("#SsitioCuso").val(json[0].sitio_inspeccion_id.id).trigger("change");
                $("#referCUSO").val(json[0].referencia);
                $("#numtripuCUSO").val(json[0].num_tripulantes);

                if(json[0].guardaparque_id != null){
                    $("#guardaparqueCUSO").val(json[0].guardaparque_id.persona_id.nombre_completo);
                    $("#idguardaparqueCUSO").val(json[0].guardaparque_id.id);
                }else{
                    $("#guardaparqueCUSO").val("");
                    $("#idguardaparqueCUSO").val("");
                }

                if(json[0].autoridadmaritima_id != null){
                    $("#armadaCUSO").val(json[0].autoridadmaritima_id.nombre_completo);
                    $("#idarmadaCUSO").val(json[0].autoridadmaritima_id.id);
                }else{
                    $("#armadaCUSO").val("");
                    $("#idarmadaCUSO").val("");
                }

                if(json[0].embarcacion_id != null){
                    $("#embarcacionCUSO").val(json[0].embarcacion_id.embarcacion_id.nombre);
                    //$("#armadorCUSO").val(json[0].permisopesca_id.c_armadorunoapellidos+" "+json[0].permisopesca_id.c_armadorunonombres);
                    $("#matriculaEmbCUSO").val(json[0].embarcacion_id.embarcacion_id.num_matricula);
                    //$("#permisoEmbCUSO").val(json[0].permisopesca_id.c_permisopesca);
                    $("#idembarcacionCUSO").val(json[0].embarcacion_id.id);  
                }else{
                    $("#embarcacionCUSO").val("");
                    //$("#armadorCUSO").val("");
                    $("#matriculaEmbCUSO").val("");
                    //$("#permisoEmbCUSO").val("");
                    $("#idembarcacionCUSO").val("");
                }

                $("#nombrecapiCUSO").val(json[0].capitan_id.nombre_completo);
                $("#idnombrecapiCUSO").val(json[0].capitan_id.id); 
                $("#cedcapiCUSO").val(json[0].capitan_id.identificacion); 

                $("#SpuertoCuso").val(json[0].ultimopuertovisitado_id.id).trigger("change");

                if (json[0].det_tripulacion.length > 0) {
                    tabla = '';
                    for (i = 0; i < json[0].det_tripulacion.length; i++) {
                        tabla += "<tr>";
                        /*hacer la secuencia para el  numero de solicitud*/
                        tabla += "<td>" + json[0].det_tripulacion[i].licguia_id.num_licencia + "</td>";                      
                        tabla += "<td>" + json[0].det_tripulacion[i].licguia_id.guia_id.persona_id.nombre_completo + "</td>";
                        tabla += "<td>" + json[0].det_tripulacion[i].licguia_id.guia_id.persona_id.identificacion + "</td>";
                        tabla += "<td align='center'><a class='delete' licguia_id='" + json[0].det_tripulacion[i].licguia_id.id+ "' id_detalle='" + json[0].det_tripulacion[i].id + "' onclick='deleteTablaLicGuia(this);'><i class='fa fa-trash text-green btn_edit'></i></a></td>";
                        tabla += "</tr>";                
                    }

                    $('#tabla_licguia').dataTable().fnClearTable();
                    $('#tabla_licguia').dataTable().fnDestroy();
                    $("#bodytabla_licguia").html("");
                    $("#bodytabla_licguia").append(tabla);

                    var table = $('#tabla_licguia').DataTable();
                }

                if (json[0].det_observaciones.length > 0) {
                    tabla = '';
                    for (i = 0; i < json[0].det_observaciones.length; i++) {
                         if(json[0].det_observaciones[i].observacion_id.valor == '1' ){
                            $("#pregunta1").attr("detalle_observ_id",json[0].det_observaciones[i].id);
                            if(json[0].det_observaciones[i].respuesta == true )
                                $("#pSi1").prop('checked', true);
                            else
                                $("#pSi1").prop('checked', false);

                            if(json[0].det_observaciones[i].respuesta == false )
                                $("#pNo1").prop('checked', true);
                            else
                                $("#pNo1").prop('checked', false);

                            $("#preguntaT1").val(json[0].det_observaciones[i].observaciones);
                         }
                         
                         if(json[0].det_observaciones[i].observacion_id.valor == '2' ){
                            $("#pregunta2").attr("detalle_observ_id",json[0].det_observaciones[i].id);
                            if(json[0].det_observaciones[i].respuesta == true )
                                $("#pSi2").prop('checked', true);
                            else
                                $("#pSi2").prop('checked', false);

                            if(json[0].det_observaciones[i].respuesta == false )
                                $("#pNo2").prop('checked', true);
                            else
                                $("#pNo2").prop('checked', false);

                            $("#preguntaT2").val(json[0].det_observaciones[i].observaciones);
                         }
                         if(json[0].det_observaciones[i].observacion_id.valor == '3' ){
                            $("#pregunta3").attr("detalle_observ_id",json[0].det_observaciones[i].id);
                            if(json[0].det_observaciones[i].respuesta == true )
                                $("#pSi3").prop('checked', true);
                            else
                                $("#pSi3").prop('checked', false);

                            if(json[0].det_observaciones[i].respuesta == false )
                                $("#pNo3").prop('checked', true);
                            else
                                $("#pNo3").prop('checked', false);

                            $("#preguntaT3").val(json[0].det_observaciones[i].observaciones);
                         }
                         if(json[0].det_observaciones[i].observacion_id.valor == '4' ){
                            $("#pregunta4").attr("detalle_observ_id",json[0].det_observaciones[i].id);
                            if(json[0].det_observaciones[i].respuesta == true )
                                $("#pSi4").prop('checked', true);
                            else
                                $("#pSi4").prop('checked', false);

                            if(json[0].det_observaciones[i].respuesta == false )
                                $("#pNo4").prop('checked', true);
                            else
                                $("#pNo4").prop('checked', false);

                            $("#preguntaT4").val(json[0].det_observaciones[i].observaciones);
                         }
                         if(json[0].det_observaciones[i].observacion_id.valor == '5' ){
                            $("#pregunta5").attr("detalle_observ_id",json[0].det_observaciones[i].id);
                            if(json[0].det_observaciones[i].respuesta == true )
                                $("#pSi5").prop('checked', true);
                            else
                                $("#pSi5").prop('checked', false);

                            if(json[0].det_observaciones[i].respuesta == false )
                                $("#pNo5").prop('checked', true);
                            else
                                $("#pNo5").prop('checked', false);

                            $("#preguntaT5").val(json[0].det_observaciones[i].observaciones);
                         }
                         if(json[0].det_observaciones[i].observacion_id.valor == '6' ){
                            $("#pregunta6").attr("detalle_observ_id",json[0].det_observaciones[i].id);
                            if(json[0].det_observaciones[i].respuesta == true )
                                $("#pSi6").prop('checked', true);
                            else
                                $("#pSi6").prop('checked', false);

                            if(json[0].det_observaciones[i].respuesta == false)
                                $("#pNo6").prop('checked', true);
                            else
                                $("#pNo6").prop('checked', false);

                            $("#preguntaT6").val(json[0].det_observaciones[i].observaciones);
                         }
                         if(json[0].det_observaciones[i].observacion_id.valor == '7' ){
                            $("#pregunta7").attr("detalle_observ_id",json[0].det_observaciones[i].id);
                            if(json[0].det_observaciones[i].respuesta == true )
                                $("#pSi7").prop('checked', true);
                            else
                                $("#pSi7").prop('checked', false);

                            if(json[0].det_observaciones[i].respuesta == false )
                                $("#pNo7").prop('checked', true);
                            else
                                $("#pNo7").prop('checked', false);

                            $("#preguntaT7").val(json[0].det_observaciones[i].observaciones);
                         }          
                    }
                }            
            }
        },
        error: function(json) {
            $("#modalLoadin").hide();
            swal("", "Error: " + JSON.stringify(json), "error");
            console.log(JSON.stringify(json));
        },
    });
}


function setInsertUpdateactaInspecCuso() {
    console.log("asdas");
    valida = validaContenedor("addactaInspecCuso");

    //if (valida) {
        proceso    = $("#procesoCUSO").val();
        subproceso = $("#subprocesoCUSO").val();
        guardaparque  = $("#idguardaparqueCUSO").val();
        armada        = $("#idarmadaCUSO").val();
        fecha      = $("#fechaCUSO").val();
        hora       = $("#horaCUSO").val();
        sitio      = $("#SsitioCuso").val();
        referencia = $("#referCUSO").val();
        coordenada = $("#coordCUSO").val();

        fechaF = fecha+" "+hora;

        embarcacion = $("#idembarcacionCUSO").val();
        capitan     = $("#idnombrecapiCUSO").val();
        ced_capitan = $("#cedcapiCUSO").val();
        num_tripula = $("#numtripuCUSO").val();
        ult_puerto  = $("#SpuertoCuso").val();

        datosTripulacion = '';
        var filas = $("#tabla_licguia").find("tr"); //devulve las filas del body de tu tabla segun el ejemplo que brindaste
        var resultado = "";
        for(i=1; i<filas.length; i++){ //Recorre las filas 1 a 1
            var celdas = $(filas[i]).find("td"); //devolverá las celdas de una fila
            
            licguia_id  = $($(celdas[3]).children("a")[0]).attr("licguia_id");
            id_detalle  = $($(celdas[3]).children("a")[0]).attr("id_detalle");

            datosTripulacion  += '{"licguia_id":"' + licguia_id + '"';
            //solo id si es un update
            if($("#tipoAICUSO").val() == 1){
                datosTripulacion  += ',"cab_actinspecemb_id":"' + $("#idAICUSO").val() + '"';
                if(id_detalle != null)
                    datosTripulacion  += ',"id":"' + id_detalle + '"';
            }
            datosTripulacion  += '},';            
        }

        datosTripulacion = datosTripulacion.substring(0, datosTripulacion.length - 1);

        var filas = $("#tabla_observacionesAI").find("tr"); //devulve las filas del body de tu tabla segun el ejemplo que brindaste
        var resultado = "";
        datosObservacion  = '';
        for(i=1; i<filas.length; i++){ //Recorre las filas 1 a 1
            var celdas = $(filas[i]).find("td"); //devolverá las celdas de una fila
            
            pergunta_id  = $(celdas[0]).attr("data_id");
            
            if(pergunta_id != null){

                respuestaSI  = $($(celdas[1]).children("input")[0]).is(':checked');
                respuestaNO  = $($(celdas[2]).children("input")[0]).is(':checked');
                respuestaf = '';
                if(respuestaSI == true)
                    respuestaf = true;
                if(respuestaNO == true)
                    respuestaf = false;

                tipo_preg    = $(celdas[3]).attr("data_tipo");
                respuestaObsf = '';
                
                respuestaObsf  = $($(celdas[3]).children("textarea")[0]).val();
                
                id_detalleObs  = $(celdas[0]).attr("detalle_observ_id");

                datosObservacion  += '{"observacion_id":"' + pergunta_id + '", ';
                datosObservacion  += '"respuesta":"' + respuestaf + '", ';
                datosObservacion  += '"observaciones":"' + respuestaObsf + '" ';
                //solo id si es un update
                if($("#tipoAICUSO").val() == 1)
                    datosObservacion  += ',"id":"' + id_detalleObs + '"';
                datosObservacion  += '},';  

            }          
        }

        datosObservacion = datosObservacion.substring(0, datosObservacion.length - 1);

        datos = '{';
        //datos += ' "numero":"", ';
        datos += ' "proceso_estatuto_id":"' + proceso + '", ';
        datos += ' "subproceso_estatuto_id":"' + subproceso + '", ';
        datos += ' "sitio_inspeccion_id":"' + sitio + '", ';
        datos += ' "referencia":"' + referencia + '", ';
        datos += ' "fecha":"' + fechaF + '", ';
        datos += ' "latitud":"' + coordenada + '", ';
        datos += ' "longitud":"' + coordenada + '", ';
        datos += ' "embarcacion_id":"' + embarcacion + '", '; 
        datos += ' "capitan_id":"' + capitan + '", ';
        datos += ' "num_tripulantes":"' + num_tripula + '", ';
        datos += ' "ultimopuertovisitado_id":"' + ult_puerto + '", ';
        datos += ' "guardaparque_id":"' + guardaparque + '", ';
        datos += ' "autoridadmaritima_id":"' + armada + '", ';
        datos += ' "det_tripulacion":[' + datosTripulacion + '],';
        datos += ' "det_observaciones":[' + datosObservacion + ']';
        datos += '}';
       
        datos = datos.replace(/undefined/g, null);
        datos = datos.replace(/None/g,null);
        datos = datos.replace(/False/g,"'false'");
        datos = datos.replace(/True/g,"'true'");
        datos = datos.replace(/"null"/g, null);
        datos.replace(/(\r\n\t|\n|\r\t)/gm,"").trim();

        console.log(datos);

        if ($("#tipoAICUSO").val() == 0)
            insertarCabDetActaInspec(datos);
        else
            saveEditCabDetActaInspec(datos);
    //}
}


function insertarCabDetActaInspec(datos){
    $("#modalLoadin").show();
    dj_url = "cusocabdetcmnactainspecembturis";
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
                console.log("data---->" + datos + "--->" + "cusocabdetcmnactainspecembturis" + "Error--->" + data);
            } else {
                swal("", "Registro insertado con Exito", "success");
                buscarActaInspecCusoParam("");
                $('#modalLoadin').hide();
            }
        },
        error: function(data) {
            $('#modalLoadin').hide();
            swal("", "Error al Insertar el registro", "error");
            console.log("data---->" + datos + "--->" + "cusocabdetcmnactainspecembturis" + "Error--->" + data);
        },
    });
}

function saveEditCabDetActaInspec(datos){
    $("#modalLoadin").show();
    dj_url = "cusocabdetcmnactainspecembturis";
    $.ajax({
        url: "update_General_post",
        type: 'post',
        cache: 'false',
        data: {
            "dj_url": dj_url,
            "idtabla": $("#idAICUSO").val(),
            "data": JSON.stringify(datos)
        },
        dataType: "json",
        success: function(data) {
            if (data.id == undefined) {
                $('#modalLoadin').hide();
                validaContenedorExt("addactaInspecCuso","Error al Actualizar el registro","error");
                //swal("", "Error al Actualizar el registro", "error");
                console.log("data---->" + datos + "--->" + "cusocabdetcmnactainspecembturis" + "Error--->" + data);
            } else {
                $("#modalLoadin").hide();
                swal("", "Registro Actualizados con Exito", "success");      
            }
        },
        error: function(data) {
            $("#modalLoadin").hide();
            //swal("", "Error al Actualizar el registro", "error");
            validaContenedorExt("addactaInspecCuso","Error al Actualizar el registro","error");
            console.log("data---->" + datos + "--->" + "cusocabdetcmnactainspecembturis" + "Error--->" + data);
        },
    });
}


function deleteActavisita(id){
    $('#modalLoadin').show();
    datos = '{ "estado":"I",';
    datos += ' "eliminado":"t"';
    datos += '}';
    dj_url = "cmnactainspecembturis";
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
                swal("", "Error al Eliminar el registro", "error");
                console.log("data---->" + datos + "--->" + "cmnactainspecembturis" + "Error--->" + data);
            } else {
                $("#modalLoadin").hide();
                swal("", "Registro eliminado con Exito", "success");
                buscarActaInspecCusoParam("");
                       
            }
        },
        error: function(data) {
            $("#modalLoadin").hide();
            swal("", "Error al Eliminar el registro", "error");
            console.log("data---->" + datos + "--->" + "cmnactainspecembturis" + "Error--->" + data);
        },
    });
}

function deleteTablaLicGuia(trthis){
var pageParamTable = $('#tabla_licguia').DataTable();
    var tableRow = pageParamTable.row($(trthis).parents('tr'));
    id_detalle = $(trthis).attr("id_detalle");
    
    //console.log(id_detalle);
    if(id_detalle){
        //return 0;
        datos = '{"estado":"I","eliminado":"t"}';
        $.ajax({
        url: "update_General",
        type: "get",
        cache: 'false',
        data: {
            "dj_url": "cmnactainspecembturistripulacion",
            "idtabla": id_detalle,
            "data": JSON.stringify(datos)
        },
        dataType: "json",

        success: function(data) {
            if (data.id == undefined) {
                $('#modalLoadin').hide();
                validaContenedorExt("addactaInspecCuso", "Error al Insertar el registro");
                console.log("idtabla---->" + id_detalle + "--->" + "data---->" + datos + "--->" + "cmnactainspecembturistripulacion" + "Error--->" + data);
            } else {
                validaContenedorExt2("addactaInspecCuso", "Registro eliminado con exito");
                pageParamTable.row( tableRow ).remove().draw();
            }
        },
        error: function(data) {
            $('#modalLoadin').hide();
            validaContenedorExt("addactaInspecCuso", "Error al Insertar el registro");
            console.log("idtabla---->" + id_detalle + "--->" + "data---->" + datos + "--->" + "cmnactainspecembturistripulacion" + "Error--->" + data);
        },
    });
    }else
        pageParamTable.row( tableRow ).remove().draw();
};


function deleteActaInsepec(id){
    $('#modalLoadin').show();
    datos = '{ "estado":"I",';
    datos += ' "eliminado":"t"';
    datos += '}';
    dj_url = "cmnactainspecembturis";
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
                swal("", "Error al Eliminar el registro", "error");
                console.log("data---->" + datos + "--->" + "cmnactainspecembturis" + "Error--->" + data);
            } else {
                $("#modalLoadin").hide();
                swal("", "Registro eliminado con Exito", "success");
                buscarActaInspecCusoParam("");
                       
            }
        },
        error: function(data) {
            $("#modalLoadin").hide();
            swal("", "Error al Eliminar el registro", "error");
            console.log("data---->" + datos + "--->" + "cmnactainspecembturis" + "Error--->" + data);
        },
    });
}



/****************informe de novedades cuso****************************/
function insertarDetInformeNovedades(){

    file = $('#doc_anexosIN')[0].files[0];
    if (!file) {
        fileExtension = "";
    } else {
        fileExtension = file.name.split('.').pop();
        salida = ValidateExt(fileExtension);
        cadenaImg = '"file_memo":"' + file.name + '",';
    }

    fileExtension = fileExtension.toLowerCase();

    var path_archivos = 'static/media/cuso/';

    if (file)
        upload_file("frm_infonovIN",path_archivos);

    id_cab = $("#idInfNovedadesIN").val();

    orden = $('#ci_ordenIN').val();
    comentario = $('#ci_observacionIN').val();
    foto       = file.name;

    imagen  = "<a rel='gallery' class='fancybox' href='static/media/cuso/"+file.name+"'><img src='static/media/cuso/"+file.name+"' style='width:20px;'></a>";

    datosDet = '';

    datosDet  += '{';
    datosDet  += '"orden":"<input \'text\' style=\'width:50px;\' onkeypress=\'return isNumberKey(event);\' value=\''+ orden + '\'/>", ';
    datosDet  += '"comentario":"' + comentario + '", ';
    datosDet  += '"foto":"' + foto + '", ';
    datosDet  += '"imagen":"' + imagen + '", ';


    eliminar  = "<a class='delete' onclick='deleteTablaFotosInfoNov(this);'><i class='fa fa-trash text-green btn_edit'></i></a>";
    datosDet  += '"eliminar":"' + eliminar  +'"';
    datosDet  += '}'; 

    datosDet = "["+datosDet+"]";
    camposJson = JSON.parse(datosDet);
    //console.log( camposJson["orden"]);
   
    var dTable = $('#tablafotos_rep').DataTable({"destroy": true,});
    dTable.row.add([
            camposJson[0].orden,
            camposJson[0].imagen,
            camposJson[0].foto,
            camposJson[0].comentario,
            camposJson[0].eliminar
    ]).draw();

    $(".fancybox").fancybox();    
}

function deleteTablaFotosInfoNov(trthis){
    var pageParamTable = $('#tablafotos_rep').DataTable();
    var tableRow = pageParamTable.row($(trthis).parents('tr'));
    id_detalle = $(trthis).attr("id_detalle");
    
    //console.log(id_detalle);
    if(id_detalle){
        datos = '{"estado":"I","eliminado":"t"}';
        $.ajax({
        url: "update_General",
        type: "get",
        cache: 'false',
        data: {
            "dj_url": "cmninformenovedadesdetalle",
            "idtabla": id_detalle,
            "data": JSON.stringify(datos)
        },
        dataType: "json",

        success: function(data) {
            if (data.id == undefined) {
                $('#modalLoadin').hide();
                validaContenedorExt("infonov", "Error al Insertar el registro");
                console.log("idtabla---->" + id + "--->" + "data---->" + datos + "--->" + "cmn_informenovedadesdetalle" + "Error--->" + data);
            } else {
                validaContenedorExt2("infonov", "Registro eliminado con exito");
                pageParamTable.row( tableRow ).remove().draw();
            }
        },
        error: function(data) {
            $('#modalLoadin').hide();
            validaContenedorExt("infonov", "Error al Insertar el registro");
            console.log("idtabla---->" + id + "--->" + "data---->" + datos + "--->" + "cmn_informenovedadesdetalle" + "Error--->" + data);
        },
    });
    }else
        pageParamTable.row( tableRow ).remove().draw();

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

function limpiarFormInfoNovedadesReload(){
    location.reload();
}

function limpiarFormInfoNovedades(){
    /*falta borrar formulario*/
    //$('#bodyinfonov').find(':input').val('');
    jQuery('#bodyinfonov').find(':input').each(function() {
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
    $('#bodyinfonov').find('.select2').val('').trigger("change");
    $("#tipoIN").val(0);
    $("#idInfNovedadesIN").val("");
    $("#descargaIN").val(0);

    tinymce.get("ci_introIN").setContent("");
    tinymce.get("ci_objGIN").setContent("");
    tinymce.get("ci_objEIN").setContent("");
    tinymce.get("ci_matIN").setContent("");
    tinymce.get("ci_metIN").setContent("");
    tinymce.get("ci_desaIN").setContent("");
    tinymce.get("ci_resultIN").setContent("");

    $('.nav-tabs a[href="#tab_Gen"]').tab('show');

    $('#tablafotos_rep').dataTable().fnClearTable();
    $('#tablafotos_rep').dataTable().fnDestroy();

    $("#body_tablafotos_rep").html("");
    var table = $('#tablafotos_rep').DataTable({
        "destroy": true
    });

    $('#tablaFunIN').dataTable().fnClearTable();
    $('#tablaFunIN').dataTable().fnDestroy();

    $("#body_tablaFunIN").html("");
    var table = $('#tablaFunIN').DataTable({
        "destroy": true
    });

    $('#tablaArmIN').dataTable().fnClearTable();
    $('#tablaArmIN').dataTable().fnDestroy();

    $("#body_tablaArmIN").html("");
    var table = $('#tablaArmIN').DataTable({
        "destroy": true
    });

   $("#StipotransporteIN").val("").trigger("change");
}


function setInsertUpdateInfoNovedades() {
    console.log("asdas");
    valida = validaContenedor("infonov");

    if (valida) {
        proceso = $("#procesoIN").val();
        subproceso = $("#subprocesoIN").val();
        oficina = $("#oficinaIN").val();
        activid = $("#SactividadIN").val();
        //funcionario = $("#idfuncionarioIN").val();
        //armada = $("#idarmadaIN").val();
        felab  = $("#fechaelabIN").val();
        
        sitio   = $("#SislaIN").val();

        intro = tinyMCE.get('ci_introIN').getContent();
        objetG = tinyMCE.get('ci_objGIN').getContent();
        objetE = tinyMCE.get('ci_objEIN').getContent();
        mater = tinyMCE.get('ci_matIN').getContent();
        metod = tinyMCE.get('ci_metIN').getContent();
        desar = tinyMCE.get('ci_desaIN').getContent();
        resul = tinyMCE.get('ci_resultIN').getContent();

        datosDet = '';
        var filas = $("#tablafotos_rep").find("tr"); //devulve las filas del body de tu tabla segun el ejemplo que brindaste
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
            if($("#tipoIN").val() == 1){
                datosDet  += ',"cab_infnovedades_id":"' + $("#idInfNovedadesIN").val() + '"';
                if(id_detalle != null)
                    datosDet  += ',"id":"' + id_detalle + '"';
            }
            datosDet  += '},';            
        }

        datosDet = datosDet.substring(0, datosDet.length - 1);
        dataF= '';
        datosPer = '';
        var filas = $("#tablaFunIN").find("tr"); //devulve las filas del body de tu tabla segun el ejemplo que brindaste
        var resultado = "";
        for(i=1; i<filas.length; i++){ //Recorre las filas 1 a 1
            var celdas = $(filas[i]).find("td"); //devolverá las celdas de una fila
            
            
            id_detalle   = $($(celdas[2]).children("a")[0]).attr("id_detalle");
            funcionario  = $($(celdas[2]).children("a")[0]).attr("funcionario_id");
            if(funcionario != null){
                datosPer  += '{"funcionario_id":"' + funcionario + '", ';
                datosPer  += '"tipo":"1" ';
                //solo id si es un update
                if($("#tipoIN").val() == 1){
                    datosPer  += ',"cab_infnovedades_id":"' + $("#idInfNovedadesIN").val() + '"';
                    if(id_detalle != null)
                        datosPer  += ',"id":"' + id_detalle + '"';
                }
                datosPer  += '},';           
            } 
        }

        datosPer = datosPer.substring(0, datosPer.length - 1);

        if(datosPer != "")
            dataF = datosPer;
        else
            dataF = dataF;

        datosArm = '';
        var filas = $("#tablaArmIN").find("tr"); //devulve las filas del body de tu tabla segun el ejemplo que brindaste
        var resultado = "";
        for(i=1; i<filas.length; i++){ //Recorre las filas 1 a 1
            var celdas = $(filas[i]).find("td"); //devolverá las celdas de una fila
            
            
            id_detalle   = $($(celdas[2]).children("a")[0]).attr("id_detalle");
            persona  = $($(celdas[2]).children("a")[0]).attr("persona_id");
            if(persona != null){
                datosArm  += '{"persona_id":"' + persona + '", ';
                datosArm  += '"tipo":"2" ';
                //solo id si es un update
                if($("#tipoIN").val() == 1){
                    datosArm  += ',"cab_infnovedades_id":"' + $("#idInfNovedadesIN").val() + '"';
                    if(id_detalle != null)
                        datosArm  += ',"id":"' + id_detalle + '"';
                }
                datosArm  += '},';   
            }         
        }

        datosArm = datosArm.substring(0, datosArm.length - 1);

        if(datosArm != "")
            if(dataF != "")
                dataF = dataF +','+datosArm;
            else
                dataF = datosArm;
        else
            dataF = dataF;


        tipotrans = $("#StipotransporteIN").val();
        if(tipotrans == 1)
            transp  = $("#StransporteIN").val();
        else
            transp  = null;

        if(tipotrans == 2)
            embarc  = $("#SembarcacionIN").val();
        else
            embarc  = null;

        if(tipotrans == 3)
            otrot  = $("#otrotransporteIN").val();
        else
            otrot  = null;


        /*se arma la cadena datos*/
        datos = '{';
        //datos += ' "numero":"", ';
        datos += ' "proceso":"' + proceso + '", ';
        datos += ' "subproceso":"' + subproceso + '", ';
        datos += ' "oficina_id":"' + oficina + '", ';
        datos += ' "sitio_id":"' + sitio + '", ';
        datos += ' "actividad":"' + activid + '", ';
        //datos += ' "funcionario_id":"' + funcionario + '", ';
        //datos += ' "armada_id":"' + armada + '", ';
        datos += ' "fecha_elaboracion":"' + felab + '", ';
        datos += ' "transporte_id":"' + transp + '", ';
        datos += ' "embarcacion_id":"' + embarc + '", ';
        datos += ' "transporte_otro":"' + otrot + '", ';
        datos += ' "introduccion":"' + intro.replace(/\n\r?/g, '').replace(/["]+/g, "'").replace(/\//g, "/") + '" ,';
        datos += ' "objetivos_gen":"' + objetG.replace(/\n\r?/g, '').replace(/["]+/g, "'").replace(/\//g, "/") + '" ,';
        datos += ' "objetivos_esp":"' + objetE.replace(/\n\r?/g, '').replace(/["]+/g, "'").replace(/\//g, "/") + '" ,';
        datos += ' "materiales":"' + mater.replace(/\n\r?/g, '').replace(/["]+/g, "'").replace(/\//g, "/") + '" ,';
        datos += ' "metodologia":"' + metod.replace(/\n\r?/g, '').replace(/["]+/g, "'").replace(/\//g, "/") + '" ,';
        datos += ' "desarrollo":"' + desar.replace(/\n\r?/g, '').replace(/["]+/g, "'").replace(/\//g, "/") + '" ,';
        datos += ' "resultados":"' + resul.replace(/\n\r?/g, '').replace(/["]+/g, "'").replace(/\//g, "/") + '" ,';
        datos += ' "det_infnovedades_cuso":[' + datosDet + '],';
        datos += ' "det_infnovedadespar_cuso":[' + dataF + ']';
        datos += '}';
       
        datos = datos.replace(/undefined/g, null);
        datos = datos.replace(/None/g,null);
        datos = datos.replace(/False/g,"'false'");
        datos = datos.replace(/True/g,"'true'");
        datos = datos.replace(/"null"/g, null);
        datos.replace(/(\r\n\t|\n|\r\t)/gm,"").trim();

        console.log(datos);

        if ($("#tipoIN").val() == 0)
            insertarCabDetInfoNovedades(datos);
        else
            saveEditCabDetInfoNovedades(datos);
    }
}

function insertarCabDetInfoNovedades(datos){
    $("#modalLoadin").show();
    dj_url = "cmncabdetinformenovedades";
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
                console.log("data---->" + datos + "--->" + "cmncabdetinformenovedades" + "Error--->" + data);
            } else {
                swal("", "Registro insertado con Exito", "success");
                console.log(data['results'][0].id);
                getInformesNovedadesCabCuso();
                $('#modalLoadin').hide();
            }
        },
        error: function(data) {
            $('#modalLoadin').hide();
            swal("", "Error al Insertar el registro", "error");
            console.log("data---->" + datos + "--->" + "cmncabdetinformenovedades" + "Error--->" + data);
        },
    });
}

function saveEditCabDetInfoNovedades(datos){
    $("#modalLoadin").show();
    dj_url = "cmncabdetinformenovedades";
    $.ajax({
        url: "update_General",
        type: 'get',
        cache: 'false',
        data: {
            "dj_url": dj_url,
            "idtabla": $("#idInfNovedadesIN").val(),
            "data": JSON.stringify(datos)
        },
        dataType: "json",
        success: function(data) {
            if (data.id == undefined) {
                $('#modalLoadin').hide();
                swal("", "Error al Actualizar el registro", "error");
                console.log("data---->" + datos + "--->" + "cmncabdetinformenovedades" + "Error--->" + data);
            } else {
                $("#modalLoadin").hide();
                swal("", "Registro Actualizados con Exito", "success");
                if ($('#window').is(':visible')) {
                    getDataINCusoPdf();      
                }          
            }
        },
        error: function(data) {
            $("#modalLoadin").hide();
            swal("", "Error al Actualizar el registro", "error");
            console.log("data---->" + datos + "--->" + "cmncabdetinformenovedades" + "Error--->" + data);
        },
    });
}

function deleteNovedades(pagina){
    id = $("#idInfNovedadesIN").val();
    if(id != "")
        deleteModal(id,pagina);
}


function deleteInfoNovedades(id){
    $('#modalLoadin').show();
    datos = '{ "estado":"I",';
    datos += ' "eliminado":"t"';
    datos += '}';
    dj_url = "cmninformenovedades";
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
                swal("", "Error al Eliminar el registro", "error");
                console.log("data---->" + datos + "--->" + "cmninformenovedades" + "Error--->" + data);
            } else {
                $("#modalLoadin").hide();
                swal("", "Registro eliminado con Exito", "success");
                getInformesNovedadesCabCuso();
                       
            }
        },
        error: function(data) {
            $("#modalLoadin").hide();
            swal("", "Error al Eliminar el registro", "error");
            console.log("data---->" + datos + "--->" + "cmninformenovedades" + "Error--->" + data);
        },
    });
}


function getInformesNovedadesCabCuso(dataIni){
    dataC = '';
    var fdesde;
    var fhasta;
    if (dataIni) {
        dataC = dataC += "fecha_elaboracion__range=" + dataIni;
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
            dataC += "fecha_elaboracion__range=" + fdesde + "," + fhasta;
        } else {
            validaContenedorExt("infonov", "No a seleccionado rango de Fechas");
            return 0;
        }
    }

    $.ajax({
        url: "data_infoNovedadesCabParamCuso",
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
    limpiarFormInfoNovedades();
    $("#modalLoadin").show();
    novedadessJson = [];
    //initTinymce();
     $('.nav-tabs a[href="#tab_Gen"]').tab('show'); //para q cuando se abra el popup aparezca en la primera pestaña

    console.log(id);
    $.ajax({
        url: "data_infoNovedadesCabCuso",
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
                $("#tipoIN").val(1);
                $("#idInfNovedadesIN").val(json[0].id);
                $("#nroIN").val(json[0].numero);
                $("#procesoIN").val(json[0].proceso);
                $("#oficinaIN").val(json[0].oficina_id.id).trigger("change");;
                $("#subprocesoIN").val(json[0].subproceso);
                //$("#funcionarioIN").val(json[0].funcionario_id.persona_id.nombre_completo);
                //$("#idfuncionarioIN").val(json[0].funcionario_id.id);
                //$("#armadaIN").val(json[0].armada_id.nombre_completo);
                //$("#idarmadaIN").val(json[0].armada_id.id);
                $("#SactividadIN").val(json[0].actividad).trigger("change");
                $("#fechaelabIN").val(json[0].fecha_elaboracion);
                //$("#StransporteIN").val(json[0].transporte_id.id).trigger("change");
                $("#SislaIN").val(json[0].sitio_id.id).trigger("change");


               
                if(json[0].transporte_id != null){
                    $("#StransporteIN").val(json[0].transporte_id.id).trigger("change");
                    $("#StipotransporteIN").val(1).trigger("change");
                    $("#trvehiculo").show();
                    $("#trembarcacion").hide();
                    $("#trotro").hide();
                }
                if(json[0].embarcacion_id != null){
                    $("#SembarcacionIN").val(json[0].embarcacion_id).trigger("change");
                    $("#StipotransporteIN").val(2).trigger("change");
                    $("#trvehiculo").hide();
                    $("#trembarcacion").show();
                    $("#trotro").hide();
                }
                if(json[0].transporte_otro != null){
                    $("#otrotransporteIN").val(json[0].transporte_otro);
                    $("#StipotransporteIN").val(3).trigger("change");
                    $("#trvehiculo").hide();
                    $("#trembarcacion").hide();
                    $("#trotro").show();
                }

  
                if(json[0].introduccion != ""){
                    //initEditor("ci_introSA");
                    tinymce.get("ci_introIN").setContent(json[0].introduccion);
                }
                if(json[0].objetivos_gen != ""){
                    //initEditor("ci_objSA");
                    tinymce.get("ci_objGIN").setContent(json[0].objetivos_gen);
                }
                if(json[0].objetivos_esp != ""){
                    //initEditor("ci_objSA");
                    tinymce.get("ci_objEIN").setContent(json[0].objetivos_esp);
                }
                if(json[0].materiales != ""){
                    //initEditor("ci_matSA");
                    tinymce.get("ci_matIN").setContent(json[0].materiales);
                }
                if(json[0].metodologia != ""){
                    //initEditor("ci_matSA");
                    tinymce.get("ci_metIN").setContent(json[0].metodologia);
                }
                if(json[0].desarrollo != ""){
                    //initEditor("ci_desaSA");
                    tinymce.get("ci_desaIN").setContent(json[0].desarrollo);
                }
                if(json[0].resultados != ""){
                    //initEditor("ci_resultSA");
                    tinymce.get("ci_resultIN").setContent(json[0].resultados);
                }
               
                if(json[0].det_infnovedades_cuso.length > 0){
                    datosDet = '';
                    for(i=0; i< json[0].det_infnovedades_cuso.length; i++){                        
                        if(json[0].det_infnovedades_cuso[i].estado == 'A'){
                            
                            orden = json[0].det_infnovedades_cuso[i].orden;
                            foto  = json[0].det_infnovedades_cuso[i].foto;
                            comentario  = json[0].det_infnovedades_cuso[i].comentario;
                            imagen  = "<a rel='gallery' class='fancybox' href='static/media/cuso/"+json[0].det_infnovedades_cuso[i].foto+"'><img src='static/media/cuso/"+json[0].det_infnovedades_cuso[i].foto+"' style='width:20px;'></a>";

                            eliminar    = "<a class='delete' id_detalle='"+json[0].det_infnovedades_cuso[i].id+"' onClick='deleteTablaFotosInfoNov(this);'><i class='fa fa-trash text-green btn_edit'></i></a>";

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
                var dTable = $('#tablafotos_rep').DataTable({  
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


                 if(json[0].det_infnovedadespar_cuso.length > 0){
                    datosDetFun = '';
                    datosDetArm = '';
                    for(i=0; i< json[0].det_infnovedadespar_cuso.length; i++){                        
                        if(json[0].det_infnovedadespar_cuso[i].estado == 'A'){
                            if(json[0].det_infnovedadespar_cuso[i].tipo == '1'){

                                eliminar    = "<a class='delete' funcionario_id='"+json[0].det_infnovedadespar_cuso[i].funcionario_id.id+"' id_detalle='"+json[0].det_infnovedadespar_cuso[i].id+"' onClick='deleteTablaFunIN(this);'><i class='fa fa-trash text-green btn_edit'></i></a>";
                                datosDetFun  += '{';
                                datosDetFun  += '"cedula":"' + json[0].det_infnovedadespar_cuso[i].funcionario_id.persona_id.identificacion + '", ';
                                datosDetFun  += '"nombre":"' + json[0].det_infnovedadespar_cuso[i].funcionario_id.persona_id.nombre_completo  + '", ';
                                datosDetFun  += '"eliminar":"' + eliminar  +'"';
                                datosDetFun  += '},'; 
                            }else{
                                eliminar    = "<a class='delete' persona_id='"+json[0].det_infnovedadespar_cuso[i].persona_id.id+"' id_detalle='"+json[0].det_infnovedadespar_cuso[i].id+"' onClick='deleteTablaPerIN(this);'><i class='fa fa-trash text-green btn_edit'></i></a>";
                                datosDetArm  += '{';
                                datosDetArm  += '"cedula":"' + json[0].det_infnovedadespar_cuso[i].persona_id.identificacion + '", ';
                                datosDetArm  += '"nombre":"' + json[0].det_infnovedadespar_cuso[i].persona_id.nombre_completo  + '", ';
                                datosDetArm  += '"eliminar":"' + eliminar  +'"';
                                datosDetArm  += '},';   
                            }          
                        }
                    }
                    datosDetFun = datosDetFun.substring(0, datosDetFun.length - 1);
                    datosDetFun = "["+datosDetFun+"]";
                    novedadessJsonFun = JSON.parse(datosDetFun);

                    datosDetArm = datosDetArm.substring(0, datosDetArm.length - 1);
                    datosDetArm = "["+datosDetArm+"]";
                    novedadessJsonArm = JSON.parse(datosDetArm);

                    var dTable = $('#tablaFunIN').DataTable({  
                        "destroy": true,
                        data :novedadessJsonFun,
                        columns: [
                            {"data" : "cedula", className: "uniqueClassName" },
                            {"data" : "nombre", className: "uniqueClassName" },
                            {"data" : "eliminar", className: "uniqueClassName" }          
                        ],
                    });

                    var dTable = $('#tablaArmIN').DataTable({  
                        "destroy": true,
                        data :novedadessJsonArm,
                        columns: [
                            {"data" : "cedula", className: "uniqueClassName" },
                            {"data" : "nombre", className: "uniqueClassName" },
                            {"data" : "eliminar", className: "uniqueClassName" }          
                        ],
                    });
                    
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

function getDataINCusoPdf(){
$("#modalLoadin").show();
id = $("#idInfNovedadesIN").val();
if(id != ""){

    $.ajax({
        url: "data_infoNovedadesCabCuso",

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
                $("#tipoIN").val(1);
                $("#for_procesoIC").html(json[0].proceso);
                $("#for_subprocesoIC").html(json[0].subproceso);
                $("#for_oficinaIC").html(json[0].oficina);
                $("#for_direccionIC").html(json[0].direccion);
                $("#for_actIC").html(json[0].actividad);
                $("#for_sitioIC").html(json[0].sitio_id.descripcion);
                $("#for_personalIC").html(json[0].funcionario_id.persona_id.nombre_completo);
                $("#for_armadaIC").html(json[0].armada_id.nombre_completo);
                $("#for_fechaIC").html(json[0].fecha_entrega);
                $("#for_transIC").html(json[0].transporte);

                $("#for_introIC").html(json[0].introduccion);
                $("#for_objetGIC").html(json[0].objetivos_gen);
                $("#for_objetEIC").html(json[0].objetivos_esp);
                $("#for_materIC").html(json[0].materiales);
                $("#for_metodIC").html(json[0].metodologia);
                $("#for_desaIC").html(json[0].desarrollo);
                $("#for_resultIC").html(json[0].resultados);
                
                if(json[0].det_infnovedades_cuso.length > 0){
                    datosDet = '';
                    conta = 1;
                    tableTtr = '';
                    tableI   = '';
                    tablaF = '<table>';
                    for(i=0; i< json[0].det_infnovedades_cuso.length; i++){                        
                        if(json[0].det_infnovedades_cuso[i].estado == 'A'){
                            tableI+="<td style='width:300px;'>";
                            tableI+="<div style='width:300px;'><span><img src='static/media/cuso/"+json[0].det_infnovedades_cuso[i].foto+"' style='width:300px;'/></div>";
                            tableI+="<div style='height:100px;'><b>Anexo "+conta+": </b> "+json[0].det_infnovedades_cuso[i].comentario+"</span></div>";
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
                $('#descargaIN').val(1);
                generarPdfInfoNovedadesCuso();
               
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
    validaContenedorExt("infonov", "No ha seleccionado un informe para generar el PDF");
}

//base64Pdf = "";
function generarPdfInfoNovedadesCuso() {
    //const element = document.getElementById("bodyinfoNovedadesPdf");
    const element = document.getElementById("bodyinfonovPdfAux");
    //$("#pdfIN").attr("src","");
  
    filename = 'infonovedadescuso.pdf'
    var opt = {
        margin:[ 2.0, 0.7, 0.7, 0.7],//top, left, buttom, right,
        filename: filename,
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

generarPdfInfoNovedadesCusoAnexos();

}

function generarPdfInfoNovedadesCusoAnexos() {
    //const element = document.getElementById("bodyinfoNovedadesPdf");
    const element = document.getElementById("anexosIN");
    $("#pdfAnexoIN").html("");
  
    filename = 'infonovedadescuso.pdf'
    var opt = {
        margin:[ 2.0, 0.7, 0.7, 0.7],//top, left, buttom, right,
        filename: filename,
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
function descargarPdfInfoNovedadesCuso() {
    if($('#descargaIN').val() == 1){
        //const element = document.getElementById("bodyinfoNovedadesPdf");
        const element = document.getElementById("bodyinfonovPdf");
        console.log(element);
      
        filename = 'infonovedadescuso.pdf'
        var opt = {
            margin:[ 2.0, 0.7, 0.7, 0.7],//top, left, buttom, right,
            filename: filename,
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
        validaContenedorExt("infoNov", "Debe generar la vista previa antes de descargar el informe");
    }

}

/*informe de monitoreo*/
function limpiarFormInfoMonitoreos2(){
    location.reload();
}

function limpiarFormInfoMonitoreos(){
    /*falta borrar formulario*/
    $('#bodyinfomon').find(':input').val('');
    $("#tipoIM").val(0);
    $("#idInfMonitoreos").val("");
    $("#descargaIM").val(0);

    tinymce.get("ci_introIM").setContent("");
    tinymce.get("ci_desaIM").setContent("");
    tinymce.get("ci_actiIM").setContent("");
    tinymce.get("ci_concIM").setContent("");
    tinymce.get("ci_recoIM").setContent("");
    tinymce.get("ci_obseIM").setContent("");

    $('.nav-tabs a[href="#tab_Gen"]').tab('show');

    $('#tablafotos_rep').dataTable().fnClearTable();
    $('#tablafotos_rep').dataTable().fnDestroy();

    $("#body_tablafotos_rep").html("");
    var table = $('#tablafotos_rep').DataTable({
        "destroy": true
    });
}


function getInformesMonitoreosCabCuso(dataIni){
    console.log(2222);
    dataC = '';
    var fdesde  = '';;
    var fhasta  = '';;
    if (dataIni) {
        dataC = dataC += "fecha_presentacion__range=" + dataIni;
    } else {

        desde = $("#FdesdeInfMon").val();
        hasta = $("#FhastaInfMon").val();

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
            validaContenedorExt("infomov", "No a seleccionado rango de Fechas");
            return 0;
        }
    }

    $.ajax({
        url: "data_infoMonitoreoCabParamCuso",
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
                    lista += "<li data-jstree='{ \"opened\" : true}'><span style='font-size:12px;'>Informes Monitoreo</span>";
                    lista +="<ul>";
                    for (i = 0; i < data.length; i++) {//,"id_cab":"'+data[i].id+'"                      
                        lista +="<li><a onclick='getDataInformeMonitoreo(\""+data[i].id+"\");'><span style='font-size:12px;'>"+data[i].numero+"</span></a></li>";
                        
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



function getDataInformeMonitoreo(id){
    limpiarFormInfoMonitoreos();
    $("#modalLoadin").show();
    novedadessJson = [];
    //initTinymce();
     $('.nav-tabs a[href="#tab_Gen"]').tab('show'); //para q cuando se abra el popup aparezca en la primera pestaña

    console.log(id);
    $.ajax({
        url: "data_infoMonitoreoCabCuso",
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
                $("#tipoIM").val(1);
                $("#idInfMonitoreos").val(json[0].id);
                $("#nroIM").val(json[0].numero);
                $("#procesoIM").val(json[0].proceso);
                $("#direccionIM").val(json[0].direccion);
                $("#subprocesoIM").val(json[0].subproceso);
                $("#funcionarioIM").val(json[0].funcionario_id.persona_id.nombre_completo);
                $("#idfuncionarioIM").val(json[0].funcionario_id.id);
                $("#asuntoIM").val(json[0].asunto);
                $("#fechaelabIM").val(json[0].fecha_presentacion);

  
                if(json[0].introduccion != ""){
                    //initEditor("ci_introSA");
                    tinymce.get("ci_introIM").setContent(json[0].introduccion);
                }
                if(json[0].desarrollo != ""){
                    //initEditor("ci_objSA");
                    tinymce.get("ci_desaIM").setContent(json[0].desarrollo);
                }
                if(json[0].actividad_observada != ""){
                    //initEditor("ci_objSA");
                    tinymce.get("ci_actiIM").setContent(json[0].actividad_observada);
                }
                if(json[0].conclusiones != ""){
                    //initEditor("ci_matSA");
                    tinymce.get("ci_concIM").setContent(json[0].conclusiones);
                }
                if(json[0].recomendaciones != ""){
                    //initEditor("ci_matSA");
                    tinymce.get("ci_recoIM").setContent(json[0].recomendaciones);
                }
                if(json[0].observacionesR!= ""){
                    //initEditor("ci_desaSA");
                    tinymce.get("ci_obseIM").setContent(json[0].observacionesR);
                }

                if(json[0].det_infmonitoreo_id.length > 0){
                    datosDet = '';
                    for(i=0; i< json[0].det_infmonitoreo_id.length; i++){                        
                        if(json[0].det_infmonitoreo_id[i].estado == 'A'){
                            
                            orden = json[0].det_infmonitoreo_id[i].orden;
                            foto  = json[0].det_infmonitoreo_id[i].foto;
                            comentario  = json[0].det_infmonitoreo_id[i].comentario;
                            imagen  = "<a rel='gallery' class='fancybox' href='static/media/cuso/"+json[0].det_infmonitoreo_id[i].foto+"'><img src='static/media/cuso/"+json[0].det_infmonitoreo_id[i].foto+"' style='width:20px;'></a>";

                            eliminar    = "<a class='delete' id_detalle='"+json[0].det_infmonitoreo_id[i].id+"' onClick='deleteTablaFotosInfoNov(this);'><i class='fa fa-trash text-green btn_edit'></i></a>";

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
                var dTable = $('#tablafotos_rep').DataTable({  
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

function setInsertUpdateInfoMonitoreos() {
    valida = validaContenedor("infomon");

    if (valida) {
        proceso = $("#procesoIM").val();
        subproceso = $("#subprocesoIM").val();
        direccion = $("#direccionIM").val();
        asunto = $("#asuntoIM").val();
        funcionario = $("#idfuncionarioIM").val();
        felab  = $("#fechaelabIM").val();

        intro = tinyMCE.get('ci_introIM').getContent();
        desar = tinyMCE.get('ci_desaIM').getContent();
        activ = tinyMCE.get('ci_actiIM').getContent();
        concl = tinyMCE.get('ci_concIM').getContent();
        recom = tinyMCE.get('ci_recoIM').getContent();
        obser = tinyMCE.get('ci_obseIM').getContent();

        datosDet = '';
        var filas = $("#tablafotos_rep").find("tr"); //devulve las filas del body de tu tabla segun el ejemplo que brindaste
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
            if($("#tipoIM").val() == 1){
                datosDet  += ',"cab_infmonitoreo_id":"' + $("#idInfMonitoreos").val() + '"';
                if(id_detalle != null)
                    datosDet  += ',"id":"' + id_detalle + '"';
            }
            datosDet  += '},';            
        }
        console.log(filas.length);
        datosDet = datosDet.substring(0, datosDet.length - 1);


        /*se arma la cadena datos*/
        datos = '{';
        //datos += ' "numero":"", ';
        datos += ' "proceso":"' + proceso + '", ';
        datos += ' "subproceso":"' + subproceso + '", ';
        datos += ' "direccion":"' + direccion + '", ';
        datos += ' "asunto":"' + asunto + '", ';
        datos += ' "funcionario_id":"' + funcionario + '", ';
        datos += ' "fecha_presentacion":"' + felab + '", ';
        datos += ' "introduccion":"' + intro.replace(/\n\r?/g, '').replace(/["]+/g, "'").replace(/\//g, "/") + '" ,';
        datos += ' "desarrollo":"' + desar.replace(/\n\r?/g, '').replace(/["]+/g, "'").replace(/\//g, "/") + '" ,';
        datos += ' "actividad_observada":"' + activ.replace(/\n\r?/g, '').replace(/["]+/g, "'").replace(/\//g, "/") + '" ,';
        datos += ' "conclusiones":"' + concl.replace(/\n\r?/g, '').replace(/["]+/g, "'").replace(/\//g, "/") + '" ,';
        datos += ' "recomendaciones":"' + recom.replace(/\n\r?/g, '').replace(/["]+/g, "'").replace(/\//g, "/") + '" ,';
        datos += ' "observacionesR":"' + obser.replace(/\n\r?/g, '').replace(/["]+/g, "'").replace(/\//g, "/") + '" ';
        //if(datosDet != "")
            datos += ',"det_infmonitoreo_id":[' + datosDet + ']';
        datos += '}';
       
        datos = datos.replace(/undefined/g, null);
        datos = datos.replace(/None/g,null);
        datos = datos.replace(/False/g,"'false'");
        datos = datos.replace(/True/g,"'true'");
        datos = datos.replace(/"null"/g, null);
        datos.replace(/(\r\n\t|\n|\r\t)/gm,"").trim();

        console.log(datos);

        if ($("#tipoIM").val() == 0)
            insertarCabDetInfoMonitoreo(datos);
        else
            saveEditCabDetInfoMonitoreo(datos);
    }
}

function insertarCabDetInfoMonitoreo(datos){
    $("#modalLoadin").show();
    dj_url = "cmncabdetinformemonitoreo";
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
                console.log("data---->" + datos + "--->" + "cmncabdetinformemonitoreo" + "Error--->" + data);
            } else {
                swal("", "Registro insertado con Exito", "success");
                console.log(data['results'][0].id);
                getInformesMonitoreosCabCuso();
                $('#modalLoadin').hide();
            }
        },
        error: function(data) {
            $('#modalLoadin').hide();
            swal("", "Error al Insertar el registro", "error");
            console.log("data---->" + datos + "--->" + "cmncabdetinformemonitoreo" + "Error--->" + data);
        },
    });
}

function saveEditCabDetInfoMonitoreo(datos){
    $("#modalLoadin").show();
    dj_url = "cmncabdetinformemonitoreo";
    $.ajax({
        url: "update_General",
        type: 'get',
        cache: 'false',
        data: {
            "dj_url": dj_url,
            "idtabla": $("#idInfMonitoreos").val(),
            "data": JSON.stringify(datos)
        },
        dataType: "json",
        success: function(data) {
            if (data.id == undefined) {
                $('#modalLoadin').hide();
                swal("", "Error al Actualizar el registro", "error");
                console.log("data---->" + datos + "--->" + "cmncabdetinformemonitoreo" + "Error--->" + data);
            } else {
                $("#modalLoadin").hide();
                swal("", "Registro Actualizados con Exito", "success");
                if ($('#window').is(':visible')) {
                    getDataIMCusoPdf();      
                }          
            }
        },
        error: function(data) {
            $("#modalLoadin").hide();
            swal("", "Error al Actualizar el registro", "error");
            console.log("data---->" + datos + "--->" + "cmncabdetinformemonitoreo" + "Error--->" + data);
        },
    });
}


function getDataIMCusoPdf(){
$("#modalLoadin").show();
id = $("#idInfMonitoreos").val();
if(id != ""){

    $.ajax({
        url: "data_infoMonitoreoCabCuso",

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
                $("#tipoIN").val(1);
                $("#for_procesoIC").html(json[0].proceso);
                $("#for_subprocesoIC").html(json[0].subproceso);
                $("#for_direccionIC").html(json[0].direccion);
                $("#for_asuntoIC").html(json[0].asunto);
                $("#for_personalIC").html(json[0].funcionario_id.persona_id.nombre_completo);
                $("#for_fechaIC").html(json[0].fecha_presentacion);

                $("#for_introIC").html(json[0].introduccion);
                $("#for_desaIC").html(json[0].desarrollo);
                $("#for_actiIC").html(json[0].actividad_observada);
                $("#for_concIC").html(json[0].conclusiones);
                $("#for_recoIC").html(json[0].recomendaciones);
                $("#for_obseIC").html(json[0].observacionesR);
                //$("#for_resultIC").html(json[0].resultados);
                
                if(json[0].det_infmonitoreo_id.length > 0){
                    datosDet = '';
                    conta = 1;
                    tableTtr = '';
                    tableI   = '';
                    tablaF = '<table>';
                    for(i=0; i< json[0].det_infmonitoreo_id.length; i++){                        
                        if(json[0].det_infmonitoreo_id[i].estado == 'A'){
                            tableI+="<td style='width:300px;'>";
                            tableI+="<div style='width:300px;'><span><img src='static/media/cuso/"+json[0].det_infmonitoreo_id[i].foto+"' style='width:300px;'/></div>";
                            tableI+="<div style='height:100px;'><b>Anexo "+conta+": </b> "+json[0].det_infmonitoreo_id[i].comentario+"</span></div>";
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
                    $("#for_anexosIM").html(tablaF);
                }
                $("#modalLoadin").hide();
                $('#descargaIM').val(1);
                generarPdfInfoMonitoreoCuso();
               
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
    validaContenedorExt("infomon", "No ha seleccionado un informe para generar el PDF");
}

//base64Pdf = "";
function generarPdfInfoMonitoreoCuso() {
    //const element = document.getElementById("bodyinfoNovedadesPdf");
    const element = document.getElementById("bodyinfomonPdfAux");
    //$("#pdfIN").attr("src","");
  
    filename = 'infomonitoreocuso.pdf'
    var opt = {
        margin:[ 2.0, 0.7, 0.7, 0.7],//top, left, buttom, right,
        filename: filename,
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
        
        var embed1 = document.getElementById('pdfIM');
        embed1.src = "";
        var embed1 = document.getElementById('pdfIM');
        embed1.src = "data:application/pdf;base64,"+base64Pdf;
        //$("#modalLoadin").hide();
        //$("#pdfIN").setAttribute("src","");
        //$("#pdfIN").setAttribute("src","data:application/pdf;base64,"+base64Pdf);
    });
    generarPdfInfoMonitoreoCusoAnexos();

}


function generarPdfInfoMonitoreoCusoAnexos() {
    //const element = document.getElementById("bodyinfoNovedadesPdf");
    const element = document.getElementById("anexosIM");
    $("#pdfAnexoIM").html("");
  
    filename = 'infomonitoreocuso.pdf'
    var opt = {
        margin:[ 2.0, 0.7, 0.7, 0.7],//top, left, buttom, right,
        filename: filename,
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
            
            var embed12 = document.getElementById('pdfAnexoIM');
            embed12.src = "";
            var embed12 = document.getElementById('pdfAnexoIM');
            embed12.src = "data:application/pdf;base64,"+base64Pdf2;
        });

}

//base64Pdf = "";
function descargarPdfInfoMonitoreoCuso() {
    if($('#descargaIM').val() == 1){
        //const element = document.getElementById("bodyinfoNovedadesPdf");
        const element = document.getElementById("bodyinfomonPdf");
        console.log(element);
      
        filename = 'infomonitoreocuso.pdf'
        var opt = {
            margin:[ 2.0, 0.7, 0.7, 0.7],//top, left, buttom, right,
            filename: filename,
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
        validaContenedorExt("infomon", "Debe generar la vista previa antes de descargar el informe");
    }
}

function insertarDetInformeMonitoreos(){

    file = $('#doc_anexosIM')[0].files[0];
    if (!file) {
        fileExtension = "";
    } else {
        fileExtension = file.name.split('.').pop();
        salida = ValidateExt(fileExtension);
        cadenaImg = '"file_memo":"' + file.name + '",';
    }

    fileExtension = fileExtension.toLowerCase();

    var path_archivos = 'static/media/cuso/';

    if (file)
        upload_file("frm_infomonIM",path_archivos);

    id_cab = $("#idInfMonitoreos").val();

    orden = $('#ci_ordenIM').val();
    comentario = $('#ci_observacionIM').val();
    foto       = file.name;

    imagen  = "<a rel='gallery' class='fancybox' href='static/media/cuso/"+file.name+"'><img src='static/media/cuso/"+file.name+"' style='width:20px;'></a>";

    datosDet = '';

    datosDet  += '{';
    datosDet  += '"orden":"<input \'text\' style=\'width:50px;\' onkeypress=\'return isNumberKey(event);\' value=\''+ orden + '\'/>", ';
    datosDet  += '"comentario":"' + comentario + '", ';
    datosDet  += '"foto":"' + foto + '", ';
    datosDet  += '"imagen":"' + imagen + '", ';


    eliminar  = "<a class='delete' onclick='deleteTablaFotosInfoMonitoreo(this);'><i class='fa fa-trash text-green btn_edit'></i></a>";
    datosDet  += '"eliminar":"' + eliminar  +'"';
    datosDet  += '}'; 

    datosDet = "["+datosDet+"]";
    camposJson = JSON.parse(datosDet);
    //console.log( camposJson["orden"]);
   
    var dTable = $('#tablafotos_rep').DataTable({"destroy": true,});
    dTable.row.add([
            camposJson[0].orden,
            camposJson[0].imagen,
            camposJson[0].foto,
            camposJson[0].comentario,
            camposJson[0].eliminar
    ]).draw();

    $(".fancybox").fancybox();    
}

function deleteTablaFotosInfoMonitoreo(trthis){
    var pageParamTable = $('#tablafotos_rep').DataTable();
    var tableRow = pageParamTable.row($(trthis).parents('tr'));
    id_detalle = $(trthis).attr("id_detalle");
    
    //console.log(id_detalle);
    if(id_detalle){
        datos = '{"estado":"I","eliminado":"t"}';
        $.ajax({
        url: "update_General",
        type: "get",
        cache: 'false',
        data: {
            "dj_url": "cmninformemonitoreodetalle",
            "idtabla": id_detalle,
            "data": JSON.stringify(datos)
        },
        dataType: "json",

        success: function(data) {
            if (data.id == undefined) {
                $('#modalLoadin').hide();
                validaContenedorExt("infomon", "Error al Insertar el registro");
                console.log("idtabla---->" + id + "--->" + "data---->" + datos + "--->" + "cmninformemonitoreodetalle" + "Error--->" + data);
            } else {
                validaContenedorExt2("infomon", "Registro eliminado con exito");
                pageParamTable.row( tableRow ).remove().draw();
            }
        },
        error: function(data) {
            $('#modalLoadin').hide();
            validaContenedorExt("infomon", "Error al Insertar el registro");
            console.log("idtabla---->" + id + "--->" + "data---->" + datos + "--->" + "cmninformemonitoreodetalle" + "Error--->" + data);
        },
    });
    }else
        pageParamTable.row( tableRow ).remove().draw();

}


function deleteMonitoreo(pagina){
    id = $("#idInfMonitoreos").val();
    if(id != "")
        deleteModal(id,pagina);
}


function deleteInfoMonitoreo(id){
    $('#modalLoadin').show();
    datos = '{ "estado":"I",';
    datos += ' "eliminado":"t"';
    datos += '}';
    dj_url = "cmninformemonitoreo";
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
                swal("", "Error al Eliminar el registro", "error");
                console.log("data---->" + datos + "--->" + "cmninformemonitoreo" + "Error--->" + data);
            } else {
                $("#modalLoadin").hide();
                swal("", "Registro eliminado con Exito", "success");
                getInformesMonitoreosCabCuso();
                       
            }
        },
        error: function(data) {
            $("#modalLoadin").hide();
            swal("", "Error al Eliminar el registro", "error");
            console.log("data---->" + datos + "--->" + "cmninformemonitoreo" + "Error--->" + data);
        },
    });
}

function getDataPerPlanPatrulla(json){
    $("#responsableUniPP").val(json[0].nombre_completo);
    $("#idresponsableUniPP").val(json[0].id);
}



/*Plan de Patrullas*/
//hacer metodo limpiar div
function limpiarFormPlanPatrulla2(){
    location.reload();
}
function limpiarFormPlanPatrulla(){
    $('#bodyplanp').find(':input').val('');
    $("#tipoPP").val(0);
    $("#idPlanP").val("");
    $("#descargaPP").val(0);
    $('.nav-tabs a[href="#tab_Gen"]').tab('show');
    $('#tablafotos_rep').dataTable().fnClearTable();
    $('#tablafotos_rep').dataTable().fnDestroy();

    tinymce.get("ci_descPP").setContent("");
    tinymce.get("ci_obsePP").setContent("");

    $("#body_tablafotos_rep").html("");
    var table = $('#tablafotos_rep').DataTable({
        "destroy": true
    });
    //$("#descargaINSA").val(0);
}


function getPlanPatrullaCabCuso(dataIni){
    //limpiarFormPlanPatrulla();
    console.log(2222);
    dataC = '';
    var fdesde  = '';;
    var fhasta  = '';;
    if (dataIni) {
        dataC = dataC += "fecha_inicio__range=" + dataIni;
    } else {

        desde = $("#FdesdePP").val();
        hasta = $("#FhastaPP").val();

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
            dataC += "fecha_inicio__range=" + fdesde + "," + fhasta;
        } else {
            validaContenedorExt("plnap", "No a seleccionado rango de Fechas");
            return 0;
        }
    }

    $.ajax({
        url: "data_planpatrullaCabParamCuso",
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
                    lista += "<li data-jstree='{ \"opened\" : true}'><span style='font-size:12px;'>Planes Patrulla</span>";
                    lista +="<ul>";
                    for (i = 0; i < data.length; i++) {//,"id_cab":"'+data[i].id+'"                      
                        lista +="<li><a onclick='getDataPlanPatrulla(\""+data[i].id+"\");'><span style='font-size:12px;'>"+data[i].numero+"</span></a></li>";
                        
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

                /*BUSCADOR  del arbol informe de novedadess*/
                $("#search-input").keyup(function () {
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



function getDataPlanPatrulla(id){
    limpiarFormPlanPatrulla();
    $("#modalLoadin").show();
    novedadessJson = [];
    //initTinymce();
     $('.nav-tabs a[href="#tab_Gen"]').tab('show'); //para q cuando se abra el popup aparezca en la primera pestaña

    console.log(id);
    $.ajax({
        url: "data_planpatrullaCabCuso",
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
                $("#tipoPP").val(1);
                $("#idPlanP").val(json[0].id);
                $("#nroPP").val(json[0].numero);
                $("#idnombreUniPP").val(json[0].embarcacion_id.id);
                $("#nombreUniPP").val(json[0].embarcacion_id.nombre);
                $("#islasPP").val(json[0].islas);
                $("#sitiosPP").val(json[0].sitios);
                $("#responsableUniPP").val(json[0].responsable_id.nombre_completo);
                $("#idresponsableUniPP").val(json[0].responsable_id.id);
                fechaIniArr = json[0].fecha_inicio.split("T");
                FechaIni = fechaIniArr[0].split("-");
                horaIni = fechaIniArr[1].split(":");
                fechaFinArr = json[0].fecha_fin.split("T");
                horaFin = fechaFinArr[1].split(":");

                $("#fechaIniPP").val(fechaIniArr[0]+"T"+horaIni[0]+":"+horaIni[1]);
                $("#fechaFinPP").val(fechaFinArr[0]+"T"+horaFin[0]+":"+horaFin[1]);
                $("#totalmPP").val(json[0].total_millas);
                $("#tiempoPP").val(json[0].tiempo_operacion);

                if(json[0].elaborado1_id != null){
                    $('#idrepon1PP').val(json[0].elaborado1_id.id);
                    $('#repon1PP').val(json[0].elaborado1_id.persona_id.nombre_completo);
                }else{
                    $('#idrepon1PP').val("");
                    $('#repon1PP').val("");
                }
                if(json[0].elaborado2_id != null){
                    $('#idrepon2PP').val(json[0].elaborado2_id.id);
                    $('#repon2PP').val(json[0].elaborado2_id.persona_id.nombre_completo);
                }else{
                    $('#idrepon2PP').val("");
                    $('#repon2PP').val("");
                }
                if(json[0].autorizado_id != null){
                    $('#idautorizaPP').val(json[0].autorizado_id.id);
                    $('#autorizaPP').val(json[0].autorizado_id.persona_id.nombre_completo);
                }else{
                    $('#idautorizaPP').val("");
                    $('#autorizaPP').val("");
                }
                if(json[0].lider_id != null){
                    $('#idasignadoPP').val(json[0].lider_id.id);
                    $('#asignadoPP').val(json[0].lider_id.persona_id.nombre_completo);
                }else{
                    $('#idasignadoPP').val("");
                    $('#asignadoPP').val("");
                }
  
                if(json[0].descripcion != ""){
                    tinymce.get("ci_descPP").setContent(json[0].descripcion);
                }
               
                if(json[0].observacion!= ""){
                    tinymce.get("ci_obsePP").setContent(json[0].observacion);
                }

                if(json[0].det_planpatrulla_id.length > 0){
                    datosDet = '';
                    for(i=0; i< json[0].det_planpatrulla_id.length; i++){                        
                        if(json[0].det_planpatrulla_id[i].estado == 'A'){
                            
                            orden = json[0].det_planpatrulla_id[i].orden;
                            foto  = json[0].det_planpatrulla_id[i].foto;
                            comentario  = json[0].det_planpatrulla_id[i].comentario;
                            imagen  = "<a rel='gallery' class='fancybox' href='static/media/cuso/"+json[0].det_planpatrulla_id[i].foto+"'><img src='static/media/cuso/"+json[0].det_planpatrulla_id[i].foto+"' style='width:20px;'></a>";
                            eliminar    = "<a class='delete' id_detalle='"+json[0].det_planpatrulla_id[i].id+"' onClick='deleteTablaFotosPlanPatrulla(this);'><i class='fa fa-trash text-green btn_edit'></i></a>";

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
                var dTable = $('#tablafotos_rep').DataTable({  
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
        },
    });
}

function setInsertUpdatePlanPatrulla() {
    valida = validaContenedor("planp");

    if (valida) {
        embarcacion_id = $("#idnombreUniPP").val();
        responsable_id = $("#idresponsableUniPP").val();
        islas = $("#islasPP").val();
        sitios = $("#sitiosPP").val();
        fecha_ini = $("#fechaIniPP").val();
        fecha_fin  = $("#fechaFinPP").val();
        totalmPP  = $("#totalmPP").val();
        tiempoPP  = $("#tiempoPP").val();

        descr = tinyMCE.get('ci_descPP').getContent();
        obser = tinyMCE.get('ci_obsePP').getContent();

        datosDet = '';
        var filas = $("#tablafotos_rep").find("tr"); //devulve las filas del body de tu tabla segun el ejemplo que brindaste
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
            if($("#tipoPP").val() == 1){
                datosDet  += ',"cab_planpatrulla_id":"' + $("#idPlanP").val() + '"';
                if(id_detalle != null)
                    datosDet  += ',"id":"' + id_detalle + '"';
            }
            datosDet  += '},';            
        }
        console.log(filas.length);
        datosDet = datosDet.substring(0, datosDet.length - 1);

        elaborado1 = $('#idrepon1PP').val();
        elaborado2 = $('#idrepon2PP').val();
        autoriza   = $('#idautorizaPP').val();
        asignado   = $('#idasignadoPP').val();


        /*se arma la cadena datos*/
        datos = '{';
        //datos += ' "numero":"", ';
        datos += ' "embarcacion_id":"' + embarcacion_id + '", ';
        datos += ' "islas":"' + islas + '", ';

        datos += ' "elaborado1_id":"' + elaborado1 + '", ';
        datos += ' "elaborado2_id":"' + elaborado2 + '", ';
        datos += ' "autorizado_id":"' + autoriza + '", ';
        datos += ' "lider_id":"' + asignado + '", ';

        datos += ' "sitios":"' + sitios + '", ';
        datos += ' "fecha_inicio":"' + fecha_ini + '", ';
        datos += ' "fecha_fin":"' + fecha_fin + '", ';
        datos += ' "total_millas":"' + totalmPP + '", ';
        datos += ' "tiempo_operacion":"' + tiempoPP + '", ';
        datos += ' "responsable_id":"' + responsable_id + '", ';
        datos += ' "descripcion":"' + descr.replace(/\n\r?/g, '').replace(/["]+/g, "'").replace(/\//g, "/") + '" ,';
        datos += ' "observacion":"' + obser.replace(/\n\r?/g, '').replace(/["]+/g, "'").replace(/\//g, "/") + '" ';
       
        if(datosDet != "")
            datos += ',"det_planpatrulla_id":[' + datosDet + ']';
        datos += '}';
       
        datos = datos.replace(/undefined/g, null);
        datos = datos.replace(/None/g,null);
        datos = datos.replace(/False/g,"'false'");
        datos = datos.replace(/True/g,"'true'");
        datos = datos.replace(/"null"/g, null);
        datos.replace(/(\r\n\t|\n|\r\t)/gm,"").trim();

        console.log(datos);

        if ($("#tipoPP").val() == 0)
            insertarCabDetPlanPatrulla(datos);
        else
            saveEditCabDetPlanPatrulla(datos);
    }
}

function insertarCabDetPlanPatrulla(datos){
    $("#modalLoadin").show();
    dj_url = "cmncabdetplanpatrulla";
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
                console.log("data---->" + datos + "--->" + "cmncabdetplanpatrulla" + "Error--->" + data);
            } else {
                swal("", "Registro insertado con Exito", "success");
                console.log(data['results'][0].id);
                getPlanPatrullaCabCuso();
                $('#modalLoadin').hide();
            }
        },
        error: function(data) {
            $('#modalLoadin').hide();
            swal("", "Error al Insertar el registro", "error");
            console.log("data---->" + datos + "--->" + "cmncabdetplanpatrulla" + "Error--->" + data);
        },
    });
}

function saveEditCabDetPlanPatrulla(datos){
    $("#modalLoadin").show();
    dj_url = "cmncabdetplanpatrulla";
    $.ajax({
        url: "update_General",
        type: 'get',
        cache: 'false',
        data: {
            "dj_url": dj_url,
            "idtabla": $("#idPlanP").val(),
            "data": JSON.stringify(datos)
        },
        dataType: "json",
        success: function(data) {
            if (data.id == undefined) {
                $('#modalLoadin').hide();
                swal("", "Error al Actualizar el registro", "error");
                console.log("data---->" + datos + "--->" + "cmncabdetplanpatrulla" + "Error--->" + data);
            } else {
                $("#modalLoadin").hide();
                swal("", "Registro Actualizados con Exito", "success");
                if ($('#window').is(':visible')) {
                    getDataPPCusoPdf();      
                }          
            }
        },
        error: function(data) {
            $("#modalLoadin").hide();
            swal("", "Error al Actualizar el registro", "error");
            console.log("data---->" + datos + "--->" + "cmncabdetplanpatrulla" + "Error--->" + data);
        },
    });
}

/*pendiente*/
function getDataPPCusoPdf(){
$("#modalLoadin").show();
id = $("#idInfMonitoreos").val();
if(id != ""){

    $.ajax({
        url: "data_infoMonitoreoCabCuso",

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
                $("#tipoIN").val(1);
                $("#for_procesoIC").html(json[0].proceso);
                $("#for_subprocesoIC").html(json[0].subproceso);
                $("#for_direccionIC").html(json[0].direccion);
                $("#for_asuntoIC").html(json[0].asunto);
                $("#for_personalIC").html(json[0].funcionario_id.persona_id.nombre_completo);
                $("#for_fechaIC").html(json[0].fecha_presentacion);

                $("#for_introIC").html(json[0].introduccion);
                $("#for_desaIC").html(json[0].desarrollo);
                $("#for_actiIC").html(json[0].actividad_observada);
                $("#for_concIC").html(json[0].conclusiones);
                $("#for_recoIC").html(json[0].recomendaciones);
                $("#for_obseIC").html(json[0].observacionesR);
                //$("#for_resultIC").html(json[0].resultados);
                
                if(json[0].det_infmonitoreo_id.length > 0){
                    datosDet = '';
                    conta = 1;
                    tableTtr = '';
                    tableI   = '';
                    tablaF = '<table>';
                    for(i=0; i< json[0].det_infmonitoreo_id.length; i++){                        
                        if(json[0].det_infmonitoreo_id[i].estado == 'A'){
                            tableI+="<td style='width:300px;'>";
                            tableI+="<div style='width:300px;'><span><img src='static/media/cuso/"+json[0].det_infmonitoreo_id[i].foto+"' style='width:300px;'/></div>";
                            tableI+="<div style='height:100px;'><b>Anexo "+conta+": </b> "+json[0].det_infmonitoreo_id[i].comentario+"</span></div>";
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
                    $("#for_anexosIM").html(tablaF);
                }
                $("#modalLoadin").hide();
                $('#descargaIM').val(1);
                generarPdfInfoMonitoreoCuso();
               
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
    validaContenedorExt("planp", "No ha seleccionado un informe para generar el PDF");
}

//base64Pdf = "";
function generarPdfPlanPatrullaCuso() {
    //const element = document.getElementById("bodyinfoNovedadesPdf");
    const element = document.getElementById("bodyplanpPdfAux");
    //$("#pdfIN").attr("src","");
  
    filename = 'planpatrulla.pdf'
    var opt = {
        margin:[ 2.0, 0.7, 0.7, 0.7],//top, left, buttom, right,
        filename: filename,
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
        
        var embed1 = document.getElementById('pdfPP');
        embed1.src = "";
        var embed1 = document.getElementById('pdfPP');
        embed1.src = "data:application/pdf;base64,"+base64Pdf;
        //$("#modalLoadin").hide();
        //$("#pdfIN").setAttribute("src","");
        //$("#pdfIN").setAttribute("src","data:application/pdf;base64,"+base64Pdf);
    });
    generarPdfPlanPatrullaCusoAnexos();

}


function generarPdfPlanPatrullaCusoAnexos() {
    //const element = document.getElementById("bodyinfoNovedadesPdf");
    const element = document.getElementById("anexosPP");
    $("#pdfAnexoPP").html("");
  
    filename = 'planpatrulla.pdf'
    var opt = {
        margin:[ 2.0, 0.7, 0.7, 0.7],//top, left, buttom, right,
        filename: filename,
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
            
            var embed12 = document.getElementById('pdfAnexoPP');
            embed12.src = "";
            var embed12 = document.getElementById('pdfAnexoPP');
            embed12.src = "data:application/pdf;base64,"+base64Pdf2;
        });
}

//base64Pdf = "";
function descargarPdfPlanPatrullaCuso() {
    if($('#descargaPP').val() == 1){
        //const element = document.getElementById("bodyinfoNovedadesPdf");
        const element = document.getElementById("bodyplanpPdf");
        console.log(element);
      
        filename = 'planpatrulla.pdf'
        var opt = {
            margin:[ 2.0, 0.7, 0.7, 0.7],//top, left, buttom, right,
            filename: filename,
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
        validaContenedorExt("planp", "Debe generar la vista previa antes de descargar el informe");
    }
}

function insertarDetPlanPatrulla(){

    file = $('#doc_anexosPP')[0].files[0];
    if (!file) {
        fileExtension = "";
    } else {
        fileExtension = file.name.split('.').pop();
        salida = ValidateExt(fileExtension);
        cadenaImg = '"file_memo":"' + file.name + '",';
    }

    fileExtension = fileExtension.toLowerCase();

    var path_archivos = 'static/media/cuso/';

    if (file)
        upload_file("frm_planpPP",path_archivos);

    id_cab = $("#idPlanP").val();

    orden = $('#ci_ordenPP').val();
    comentario = $('#ci_observacionPP').val();
    foto       = file.name;

    imagen  = "<a rel='gallery' class='fancybox' href='static/media/cuso/"+file.name+"'><img src='static/media/cuso/"+file.name+"' style='width:20px;'></a>";

    datosDet = '';

    datosDet  += '{';
    datosDet  += '"orden":"<input \'text\' style=\'width:50px;\' onkeypress=\'return isNumberKey(event);\' value=\''+ orden + '\'/>", ';
    datosDet  += '"comentario":"' + comentario + '", ';
    datosDet  += '"foto":"' + foto + '", ';
    datosDet  += '"imagen":"' + imagen + '", ';


    eliminar  = "<a class='delete' onclick='deleteTablaFotosPlanPatrulla(this);'><i class='fa fa-trash text-green btn_edit'></i></a>";
    datosDet  += '"eliminar":"' + eliminar  +'"';
    datosDet  += '}'; 

    datosDet = "["+datosDet+"]";
    camposJson = JSON.parse(datosDet);
    //console.log( camposJson["orden"]);
   
    var dTable = $('#tablafotos_rep').DataTable({"destroy": true,});
    dTable.row.add([
            camposJson[0].orden,
            camposJson[0].imagen,
            camposJson[0].foto,
            camposJson[0].comentario,
            camposJson[0].eliminar
    ]).draw();

    $(".fancybox").fancybox();    
}

function deleteTablaFotosPlanPatrulla(trthis){
    var pageParamTable = $('#tablafotos_rep').DataTable();
    var tableRow = pageParamTable.row($(trthis).parents('tr'));
    id_detalle = $(trthis).attr("id_detalle");
    
    //console.log(id_detalle);
    if(id_detalle){
        datos = '{"estado":"I","eliminado":"t"}';
        $.ajax({
        url: "update_General",
        type: "get",
        cache: 'false',
        data: {
            "dj_url": "cmnplanpatrulladetalle",
            "idtabla": id_detalle,
            "data": JSON.stringify(datos)
        },
        dataType: "json",

        success: function(data) {
            if (data.id == undefined) {
                $('#modalLoadin').hide();
                validaContenedorExt("planp", "Error al Insertar el registro");
                console.log("idtabla---->" + id + "--->" + "data---->" + datos + "--->" + "cmnembarcacionespatrulladetalle" + "Error--->" + data);
            } else {
                validaContenedorExt2("planp", "Registro eliminado con exito");
                pageParamTable.row( tableRow ).remove().draw();
            }
        },
        error: function(data) {
            $('#modalLoadin').hide();
            validaContenedorExt("planp", "Error al Insertar el registro");
            console.log("idtabla---->" + id + "--->" + "data---->" + datos + "--->" + "cmnembarcacionespatrulladetalle" + "Error--->" + data);
        },
    });
    }else
        pageParamTable.row( tableRow ).remove().draw();

}


function deletePlanPatrullaM(pagina){
    id = $("#idPlanP").val();
    if(id != "")
        deleteModal(id,pagina);
}


function deletePlanPatrulla(id){
    $('#modalLoadin').show();
    datos = '{ "estado":"I",';
    datos += ' "eliminado":"t"';
    datos += '}';
    dj_url = "cmnplanpatrulla";
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
                swal("", "Error al Eliminar el registro", "error");
                console.log("data---->" + datos + "--->" + "cmnembarcacionespatrulla" + "Error--->" + data);
            } else {
                $("#modalLoadin").hide();
                swal("", "Registro eliminado con Exito", "success");
                getPlanPatrullaCabCuso();
                       
            }
        },
        error: function(data) {
            $("#modalLoadin").hide();
            swal("", "Error al Eliminar el registro", "error");
            console.log("data---->" + datos + "--->" + "cmnembarcacionespatrulla" + "Error--->" + data);
        },
    });
}

function getDataPerTestigoActaRetencion(json){
    $("#testigoAR").val(json[0].nombre_completo);
    $("#idtestigoAR").val(json[0].id);
}

//tipo 1 envia pagina tipo 0 envia popup
function getDataActaRet(){

    numero   = $("#numeroPopup").val();
    embarcacion   = $("#embarcacionPopup").val();

    pagina = $("#pagina_enviaPopActaR").val();
    if(pagina == '')
        pagina = 'acta_retencion';
    dataC  = "";
    if (embarcacion != "")
        dataC += "permisopesca_id__c_nombreembarcacion__icontains=" + embarcacion + "&";
    if(numero != "")
        dataC += "secuencia__icontains=" + numero + "&";
   

    dataC = dataC.substring(0, dataC.length - 1);

    console.log(dataC);

    $.ajax({
        url: "data_actavisitaParam",
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
                        
                            tabla += "<tr>";
                            tabla += "<td align='left'>" + data[i].secuencia + "</td>";
                            tabla += "<td align='left'>" + data[i].permisopesca_id.c_nombreembarcacion + "</td>";
                            tabla += "<td align='left'>" + data[i].fecha +  "</td>";
                            tabla += '<td align="center"><textarea id="td_'+pagina+'_' + i + '" hidden>' + JSON.stringify(data[i]) + '</textarea> <a style="cursor: pointer; font-size: 20px;" title="Buscar" data-close-stackbox="true" onClick="getDataParmaPagina(' + i + ',\'' + pagina + '\');"><i class="fa fa-plus-circle text-blue"></i></a></td>';
                            tabla += "</tr>";
                    }
                }

                $('#tabla_PopupActaR').dataTable().fnClearTable();
                $('#tabla_PopupActaR').dataTable().fnDestroy();

                $("#body_tabla_PopupActaR").html("");
                $("#body_tabla_PopupActaR").append(tabla);

                var table = $('#tabla_PopupActaR').DataTable({
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


function insertarDescActaRet(){

    id_cab = $("#idActaR").val();

    producto_id = $('#SproductoAR').val();
    cantidad    = $('#cantidad_desAR').val();
    tipo        = $('#tipo_desAR').val();
    estado      = $('#estado_desAR').val();


    datosDet = '';

    datosDet  += '{';
    datosDet  += '"nombre":"' + $("#SproductoAR option:selected").text() + '", ';
    datosDet  += '"cantidad":"' + cantidad + '", ';
    datosDet  += '"tipo":"' + tipo + '", ';
    datosDet  += '"estado":"' + estado + '", ';


    eliminar  = "<a class='delete nuevo' id_acta='"+id_cab+"' producto_id='"+producto_id+"' onclick='deleteTablaDesActaRet(this);'><i class='fa fa-trash text-green btn_edit'></i></a>";
    datosDet  += '"eliminar":"' + eliminar  +'"';
    datosDet  += '}'; 

    datosDet = "["+datosDet+"]";
    camposJson = JSON.parse(datosDet);
    //console.log( camposJson["orden"]);
   
    var dTable = $('#tabla_descripcion').DataTable({"destroy": true,});
    dTable.row.add([
            camposJson[0].nombre,
            camposJson[0].cantidad,
            camposJson[0].tipo,
            camposJson[0].estado,
            camposJson[0].eliminar
    ]).draw();
   
}

function deleteTablaDesActaRet(trthis){
    var pageParamTable = $('#tabla_descripcion').DataTable();
    var tableRow = pageParamTable.row($(trthis).parents('tr'));
    id_acta = $(trthis).attr("id_acta");
    id_detalle = $(trthis).attr("id_detalle");
    
    //console.log(id_detalle);
    if(id_detalle){
        console.log(id_acta);
        datos = '{"estado":"I","eliminado":"t"}';
        $.ajax({
        url: "update_General",
        type: "get",
        cache: 'false',
        data: {
            "dj_url": "cmnproductosactaretencion",
            "idtabla": id_detalle,
            "data": JSON.stringify(datos)
        },
        dataType: "json",

        success: function(data) {
            if (data.id == undefined) {
                $('#modalLoadin').hide();
                validaContenedorExt("actar", "Error al Insertar el registro");
                console.log("idtabla---->" + id_detalle + "--->" + "data---->" + datos + "--->" + "cmnproductosactaretencion" + "Error--->" + data);
            } else {
                validaContenedorExt2("actar", "Registro eliminado con exito");
                pageParamTable.row( tableRow ).remove().draw();
            }
        },
        error: function(data) {
            $('#modalLoadin').hide();
            validaContenedorExt("actar", "Error al Insertar el registro");
            console.log("idtabla---->" + id_detalle + "--->" + "data---->" + datos + "--->" + "cmnproductosactaretencion" + "Error--->" + data);
        },
    });
    }else
        pageParamTable.row( tableRow ).remove().draw();

}


function insertDataFunActaRetencion(json){

    id_cab = $("#idActaR").val();

    datosDet = '';

    datosDet  += '{';
    datosDet  += '"nombre":"' + json[0].persona_id.nombre_completo + '", ';
    datosDet  += '"cedula":"' + json[0].persona_id.identificacion + '", ';
    datosDet  += '"institucion":"DPNG", ';

    eliminar  = "<a class='delete nuevo' id_acta='"+id_cab+"' id_funcionario='"+json[0].id+"' onclick='deleteTablaParticipantesActaRet(this);'><i class='fa fa-trash text-green btn_edit'></i></a>";
    datosDet  += '"eliminar":"' + eliminar  +'"';
    datosDet  += '}'; 

    datosDet = "["+datosDet+"]";
    camposJson = JSON.parse(datosDet);
    //console.log( camposJson["orden"]);
   
    var dTable = $('#tabla_participantes').DataTable({"destroy": true,});
    dTable.row.add([
            camposJson[0].nombre,
            camposJson[0].cedula,
            camposJson[0].institucion,
            camposJson[0].eliminar
    ]).draw();
}

function insertDataPerActaRetencion(json){
    id_cab = $("#idActaR").val();

    datosDet = '';

    datosDet  += '{';
    datosDet  += '"nombre":"' + json[0].nombre_completo + '", ';
    datosDet  += '"cedula":"' + json[0].identificacion + '", ';
    datosDet  += '"institucion":"Armada", ';

    eliminar  = "<a class='delete nuevo' id_acta='"+id_cab+"' id_funcionario='"+json[0].id+"' onclick='deleteTablaParticipantesActaRet(this);'><i class='fa fa-trash text-green btn_edit'></i></a>";
    datosDet  += '"eliminar":"' + eliminar  +'"';
    datosDet  += '}'; 

    datosDet = "["+datosDet+"]";
    camposJson = JSON.parse(datosDet);
    //console.log( camposJson["orden"]);
   
    var dTable = $('#tabla_participantes').DataTable({"destroy": true,});
    dTable.row.add([
            camposJson[0].nombre,
            camposJson[0].cedula,
            camposJson[0].institucion,
            camposJson[0].eliminar
    ]).draw();
}

function deleteTablaParticipantesActaRet(trthis){
    var pageParamTable = $('#tabla_participantes').DataTable();
    var tableRow = pageParamTable.row($(trthis).parents('tr'));
    id_acta = $(trthis).attr("id_acta");
    id_detalle = $(trthis).attr("id_detalle");
    
    //console.log(id_detalle);
    if(id_detalle){
        console.log(id_acta);
        datos = '{"estado":"I","eliminado":"t"}';
        $.ajax({
            url: "update_General",
            type: "get",
            cache: 'false',
            data: {
                "dj_url": "cmnparticipantesactaretencion",
                "idtabla": id_detalle,
                "data": JSON.stringify(datos)
            },
            dataType: "json",

            success: function(data) {
                if (data.id == undefined) {
                    $('#modalLoadin').hide();
                    validaContenedorExt("actar", "Error al Insertar el registro");
                    console.log("idtabla---->" + id + "--->" + "data---->" + datos + "--->" + "cmnparticipantesactaretencion" + "Error--->" + data);
                } else {
                    validaContenedorExt2("actar", "Registro eliminado con exito");
                    pageParamTable.row( tableRow ).remove().draw();
                }
            },
            error: function(data) {
                $('#modalLoadin').hide();
                validaContenedorExt("actar", "Error al Insertar el registro");
                console.log("idtabla---->" + id + "--->" + "data---->" + datos + "--->" + "cmnparticipantesactaretencion" + "Error--->" + data);
            },
        });
    }else
        pageParamTable.row( tableRow ).remove().draw();

}

/*funcion para mapear los datos de la situacion actual del funcionario*/
function getDataActaRetPop(json) {
    $("#infoNovAR").val(json[0].secuencia);
    $("#idinfoNovAR").val(json[0].id); 
    $("#fechaAR").val(json[0].fecha);
    $("#sitioAR").val(json[0].sitio_inspeccion_id.descripcion);
    $("#idsitioAR").val(json[0].sitio_inspeccion_id.id);

    id_cab = $("#idActaR").val();

    tabla="";
    tabla+="<tr>";
    tabla+="<td>"+json[0].guardaparque_id.persona_id.nombre_completo+"</td>";
    tabla+="<td>"+json[0].guardaparque_id.persona_id.identificacion+"</td>";
    tabla+="<td>DPNG</td>";
    tabla+="<td></td>";
    tabla+="</tr>";
    tabla+="<tr>";
    tabla+="<td>"+json[0].autoridadmaritima_id.nombre_completo+"</td>";
    tabla+="<td>"+json[0].autoridadmaritima_id.identificacion+"</td>";
    tabla+="<td>Armada</td>";
    tabla+="<td></td>";
    tabla+="</tr>";

    $('#tabla_participantes').dataTable().fnClearTable();
    $('#tabla_participantes').dataTable().fnDestroy();

    $("#bodytabla_participantes").html("");
    $("#bodytabla_participantes").append(tabla);

    var table = $('#tabla_participantes').DataTable({
        orderCellsTop: true
    });

    if (json[0].det_tripulacion.length > 0) {
        tabla = '';
        for (i = 0; i < json[0].det_tripulacion.length; i++) {
            tabla += "<tr>";
            /*hacer la secuencia para el  numero de solicitud*/
            tabla += "<td>" + json[0].det_tripulacion[i].parma_id.id + "</td>";                      
            tabla += "<td>" + json[0].det_tripulacion[i].parma_id.c_apellidos + " " + json[0].det_tripulacion[i].parma_id.c_nombres + "</td>";
            tabla += "<td>" + json[0].det_tripulacion[i].parma_id.c_cedula + "</td>";
            tabla += "<td>SI<input type='checkbox' value='1'/>&nbsp&nbsp&nbspNO<input type='checkbox' value='1'/></td>";
            tabla += "<td><textarea style='width: 98%;'></textarea></td>";
            tabla += "<td align='center'><a class='delete' id_personaparma='"+json[0].det_tripulacion[i].parma_id.id+"' id_acta='"+id_cab+"' onclick='deleteTablaParticipantesImpActaRet(this);'><i class='fa fa-trash text-green btn_edit'></i></a></td>";
            tabla += "</tr>";                
        }

        $('#tabla_implicados').dataTable().fnClearTable();
        $('#tabla_implicados').dataTable().fnDestroy();
        $("#bodytabla_implicados").html("");
        $("#bodytabla_implicados").append(tabla);

        var table = $('#tabla_implicados').DataTable();
    }

    
}


function insertDataPerImpActaRetencion(json){
    id_cab = $("#idActaR").val();

    datosDet = '';

    datosDet  += '{';
    datosDet  += '"nombre":"' + json[0].nombre_completo + '", ';
    datosDet  += '"liencia":"", ';
    datosDet  += '"cedula":"'+json[0].identificacion+'", ';

    eliminar  = "<a class='delete' id_acta='"+id_cab+"' id_personaparma='"+json[0].id+"' onclick='deleteTablaParticipantesImpActaRet(this);'><i class='fa fa-trash text-green btn_edit'></i></a>";
    checkbox  = "SI<input type='checkbox' value='1'/>&nbsp&nbsp&nbspNO<input type='checkbox' value='1'/>";
    tarea     = "<textarea style='width: 98%;'></textarea>";
    datosDet  += '"checkbox":"' + checkbox  +'",';
    datosDet  += '"tarea":"' + tarea  +'",';
    datosDet  += '"eliminar":"' + eliminar  +'"';
    datosDet  += '}'; 

    datosDet = "["+datosDet+"]";
    camposJson = JSON.parse(datosDet);
    //console.log( camposJson["orden"]);
   
    var dTable = $('#tabla_implicados').DataTable({"destroy": true,});
    dTable.row.add([
            camposJson[0].liencia,
            camposJson[0].nombre,
            camposJson[0].cedula,
            camposJson[0].checkbox,
            camposJson[0].tarea,
            camposJson[0].eliminar
    ]).draw();
}

function insertarDataParmaImpActaRetencion(json){

    id_cab = $("#idActaR").val();

    datosDet = '';

    datosDet  += '{';
    datosDet  += '"nombre":"' + json[0].c_apellidos + " " + json[0].c_nombres + '", ';
    datosDet  += '"liencia":"' +  json[0].id + '", ';
    datosDet  += '"cedula":"'+json[0].c_cedula+'", ';

    eliminar  = "<a class='delete' id_acta='"+id_cab+"' id_personaparma='"+json[0].id+"' onclick='deleteTablaParticipantesImpActaRet(this);'><i class='fa fa-trash text-green btn_edit'></i></a>";
    checkbox  = "SI<input type='checkbox' value='1'/>&nbsp&nbsp&nbspNO<input type='checkbox' value='1'/>";
    tarea     = "<textarea style='width: 98%;'></textarea>";
    datosDet  += '"checkbox":"' + checkbox  +'",';
    datosDet  += '"tarea":"' + tarea  +'",';
    datosDet  += '"eliminar":"' + eliminar  +'"';
    datosDet  += '}'; 

    datosDet = "["+datosDet+"]";
    camposJson = JSON.parse(datosDet);
    //console.log( camposJson["orden"]);
   
    var dTable = $('#tabla_implicados').DataTable({"destroy": true,});
    dTable.row.add([
            camposJson[0].liencia,
            camposJson[0].nombre,
            camposJson[0].cedula,
            camposJson[0].checkbox,
            camposJson[0].tarea,
            camposJson[0].eliminar
    ]).draw();
}

function deleteTablaParticipantesImpActaRet(trthis){
    var pageParamTable = $('#tabla_implicados').DataTable();
    var tableRow = pageParamTable.row($(trthis).parents('tr'));
    id_acta = $(trthis).attr("id_acta");
    id_detalle = $(trthis).attr("id_detalle");
    
    //console.log(id_detalle);
    if(id_detalle){
        console.log(id_acta);
        datos = '{"estado":"I","eliminado":"t"}';
        $.ajax({
        url: "update_General",
        type: "get",
        cache: 'false',
        data: {
            "dj_url": "cmnimplicadosactaretencion",
            "idtabla": id_detalle,
            "data": JSON.stringify(datos)
        },
        dataType: "json",

        success: function(data) {
            if (data.id == undefined) {
                $('#modalLoadin').hide();
                validaContenedorExt("actar", "Error al Insertar el registro");
                console.log("idtabla---->" + id + "--->" + "data---->" + datos + "--->" + "cmnimplicadosactaretencion" + "Error--->" + data);
            } else {
                validaContenedorExt2("actar", "Registro eliminado con exito");
                pageParamTable.row( tableRow ).remove().draw();
            }
        },
        error: function(data) {
            $('#modalLoadin').hide();
            validaContenedorExt("actar", "Error al Insertar el registro");
            console.log("idtabla---->" + id + "--->" + "data---->" + datos + "--->" + "cmnimplicadosactaretencion" + "Error--->" + data);
        },
    });
    }else
        pageParamTable.row( tableRow ).remove().draw();
}

/*############################informe de novedades*/
function limpiarFormactaRetencionCuso(){
    $("#tipoAR").val(0);
    $("#idActaR").val("");
    $('.nav-tabs a[href="#tab_Gen"]').tab('show');
    $("#nroAR").val("");
    $("#infoNovAR").val("");
    $("#idinfoNovAR").val("");
    $("#idsitioAR").val("").trigger("change");
    $("#fechaAR").val("");
    $("#tiporetAR").val("").trigger("change");
    //$("#descargaINSA").val(0);
    $('#tabla_participantes').dataTable().fnClearTable();
    $('#tabla_participantes').dataTable().fnDestroy();
    $("#bodytabla_participantes").html("");

    $('#tabla_descripcion').dataTable().fnClearTable();
    $('#tabla_descripcion').dataTable().fnDestroy();
    $("#bodytabla_descripcion").html("");

    $('#tabla_implicados').dataTable().fnClearTable();
    $('#tabla_implicados').dataTable().fnDestroy();
    $("#bodytabla_implicados").html("");

}


function getActaRetencionCabCuso(dataIni){
    limpiarFormactaRetencionCuso();
    dataC = '';
    var fdesde;
    var fhasta;
    if (dataIni) {
        dataC = dataC += "fecha_ingreso__range=" + dataIni;
    } else {

        desde = $("#FdesdeAR").val();
        hasta = $("#FhastaAR").val();

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
            dataC += "fecha_ingreso__range=" + fdesde + "," + fhasta;
        } else {
            validaContenedorExt("actar", "No a seleccionado rango de Fechas");
            return 0;
        }
    }

    $.ajax({
        url: "data_actaretencionCabParamCuso",
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
                        lista +="<li><a onclick='getDataActaRetencion(\""+data[i].id+"\");'><span style='font-size:12px;'>"+data[i].numero+"</span></a></li>";
                        
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

function getDataActaRetencion(id){
    limpiarFormactaRetencionCuso();
    $.ajax({
            url: "data_actaretencionCabCuso",
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
                    $("#tipoAR").val(1);
                    $("#idActaR").val(id);
                    $("#nroAR").val(json[0].numero);
                    $("#infoNovAR").val(json[0].acta_inspeccion_id.secuencia);
                    $("#idinfoNovAR").val(json[0].acta_inspeccion_id.id);
                    $("#sitioAR").val(json[0].acta_inspeccion_id.sitio_inspeccion_id.descripcion);
                    $("#fechaAR").val(json[0].acta_inspeccion_id.fecha);
                    $("#tiporetAR").val(json[0].tipo_retencion).trigger("change");

                    if(json[0].testigo_id != null){
                        console.log(json[0].testigo_id.nombre_completo);
                        $("#testigoAR").val(json[0].testigo_id.nombre_completo);
                        $("#idtestigoAR").val(json[0].testigo_id.id);
                    }
                    tabla="";
                    tabla+="<tr>";
                    tabla+="<td>"+json[0].acta_inspeccion_id.guardaparque_id.persona_id.nombre_completo+"</td>";
                    tabla+="<td>"+json[0].acta_inspeccion_id.guardaparque_id.persona_id.identificacion+"</td>";
                    tabla+="<td>DPNG</td>";
                    tabla+="<td></td>";
                    tabla+="</tr>";
                    tabla+="<tr>";
                    tabla+="<td>"+json[0].acta_inspeccion_id.autoridadmaritima_id.nombre_completo+"</td>";
                    tabla+="<td>"+json[0].acta_inspeccion_id.autoridadmaritima_id.identificacion+"</td>";
                    tabla+="<td>Armada</td>";
                    tabla+="<td></td>";
                    tabla+="</tr>";
            console.log(11122);
                    if (json[0].det_participantes.length > 0) {
                        for (i = 0; i < json[0].det_participantes.length; i++) {
                            if(json[0].det_participantes[i].estado == 'A'){
                                if(json[0].det_participantes[i].funcionario_id != null){
                                    tabla+="<tr>";
                                    tabla+="<td>"+json[0].det_participantes[i].funcionario_id.persona_id.nombre_completo+"</td>";
                                    tabla+="<td>"+json[0].det_participantes[i].funcionario_id.persona_id.identificacion+"</td>";
                                    tabla+="<td>DPNG</td>";
                                    tabla+="<td><a class='delete nuevo' id_acta='"+json[0].id+"' id_detalle='" + json[0].det_participantes[i].id + "' id_funcionario='"+json[0].det_participantes[i].funcionario_id.id+"' onclick='deleteTablaParticipantesActaRet(this);'><i class='fa fa-trash text-green btn_edit'></i></a></td>";
                                }
                                if(json[0].det_participantes[i].persona_id != null){
                                    tabla+="<tr>";
                                    tabla+="<td>"+json[0].det_participantes[i].persona_id.nombre_completo+"</td>";
                                    tabla+="<td>"+json[0].det_participantes[i].persona_id.identificacion+"</td>";
                                    tabla+="<td>Armada</td>";
                                    tabla+="<td><a class='delete nuevo' id_acta='"+json[0].id+"' id_detalle='" + json[0].det_participantes[i].id + "' id_funcionario='"+json[0].det_participantes[i].persona_id.id+"' onclick='deleteTablaParticipantesActaRet(this);'><i class='fa fa-trash text-green btn_edit'></i></a></td>";
                                }
                            }    
                        }
                    }

                    $('#tabla_participantes').dataTable().fnClearTable();
                    $('#tabla_participantes').dataTable().fnDestroy();

                    $("#bodytabla_participantes").html("");
                    $("#bodytabla_participantes").append(tabla);

                    var table1 = $('#tabla_participantes').DataTable({
                        orderCellsTop: true
                    });

                    if (json[0].det_implicados.length == 0) {
                        if (json[0].acta_inspeccion_id.det_tripulacion.length > 0) {
                            tabla = '';
                            for (i = 0; i < json[0].acta_inspeccion_id.det_tripulacion.length; i++) {
                                tabla += "<tr>";
                                /*hacer la secuencia para el  numero de solicitud*/
                                tabla += "<td>" + json[0].acta_inspeccion_id.det_tripulacion[i].parma_id.id + "</td>";                      
                                tabla += "<td>" + json[0].acta_inspeccion_id.det_tripulacion[i].parma_id.c_apellidos + " " + json[0].acta_inspeccion_id.det_tripulacion[i].parma_id.c_nombres + "</td>";
                                tabla += "<td>" + json[0].acta_inspeccion_id.det_tripulacion[i].parma_id.c_cedula + "</td>";
                                tabla += "<td align='center'>SI<input type='checkbox' value='1'/>&nbsp&nbsp&nbspNO<input type='checkbox' value='1'/></td>";
                                tabla += "<td><textarea style='width: 98%;'></textarea></td>";
                                tabla += "<td align='center'><a class='delete' id_acta='" + json[0].id + "' id_personaparma='" + json[0].acta_inspeccion_id.det_tripulacion[i].parma_id.id + "' onclick='deleteTablaParticipantesImpActaRet(this);'><i class='fa fa-trash text-green btn_edit'></i></a></td>";
                                tabla += "</tr>";                
                            }

                            $('#tabla_implicados').dataTable().fnClearTable();
                            $('#tabla_implicados').dataTable().fnDestroy();
                            $("#bodytabla_implicados").html("");
                            $("#bodytabla_implicados").append(tabla);

                            var table2 = $('#tabla_implicados').DataTable();
                        }
                    }else{
                        if (json[0].det_implicados.length > 0) {
                            tabla = '';
                            
                            for (i = 0; i < json[0].det_implicados.length; i++) {
                                resistencia = json[0].det_implicados[i].resistencia;
                                if(resistencia){
                                    resp1 = 'checked';
                                    resp2 = '';
                                }
                                else{
                                    resp1 = '';
                                    resp2 = 'checked';
                                }
                                if(json[0].det_implicados[i].parma_id != null){ 
                                    tabla += "<tr>";
                                    tabla += "<td>" + json[0].det_implicados[i].parma_id.id + "</td>";                      
                                    tabla += "<td>" + json[0].det_implicados[i].parma_id.c_apellidos + " " + json[0].det_implicados[i].parma_id.c_nombres + "</td>";
                                    tabla += "<td>" + json[0].det_implicados[i].parma_id.c_cedula + "</td>";
                                    tabla += "<td align='center'>SI<input type='checkbox' value='1' "+resp1+"/>&nbsp&nbsp&nbspNO<input type='checkbox' value='1' "+resp2+"/></td>";
                                    tabla += "<td><textarea style='width: 98%;'>" + json[0].det_implicados[i].observaciones + "</textarea></td>";
                                    tabla += "<td align='center'><a class='delete' id_personaparma='"+json[0].det_implicados[i].parma_id.id+"' id_acta='" + json[0].id + "' id_detalle='" + json[0].det_implicados[i].id + "' onclick='deleteTablaParticipantesImpActaRet(this);'><i class='fa fa-trash text-green btn_edit'></i></a></td>";
                                    tabla += "</tr>"; 
                                }   
                                if(json[0].det_implicados[i].persona_id != null){  
                                    tabla += "<tr>";
                                    tabla += "<td></td>";                      
                                    tabla += "<td>" + json[0].det_implicados[i].persona_id.nombre_completo + "</td>";
                                    tabla += "<td>" + json[0].det_implicados[i].persona_id.identificacion + "</td>";
                                    tabla += "<td align='center'>SI<input type='checkbox' value='1' "+resp1+"/>&nbsp&nbsp&nbspNO<input type='checkbox' value='1' "+resp2+"/></td>";
                                    tabla += "<td><textarea style='width: 98%;'>" + json[0].det_implicados[i].observaciones + "</textarea></td>";
                                    tabla += "<td align='center'><a class='delete' id_personaparma='"+json[0].det_implicados[i].persona_id.id+"' id_acta='" + json[0].id + "' id_detalle='" + json[0].det_implicados[i].id + "' onclick='deleteTablaParticipantesImpActaRet(this);'><i class='fa fa-trash text-green btn_edit'></i></a></td>";
                                    tabla += "</tr>"; 
                                }         
                            }

                            $('#tabla_implicados').dataTable().fnClearTable();
                            $('#tabla_implicados').dataTable().fnDestroy();
                            $("#bodytabla_implicados").html("");
                            $("#bodytabla_implicados").append(tabla);

                            var table2 = $('#tabla_implicados').DataTable();
                        }
                    }


                    if (json[0].det_productos.length > 0) {
                        tabla = '';
                        for (i = 0; i < json[0].det_productos.length; i++) {
                            if(json[0].det_productos[i].estado == 'A'){
                                tabla += "<tr>";
                                /*hacer la secuencia para el  numero de solicitud*/
                                tabla += "<td>" + json[0].det_productos[i].producto_id.descripcion + "</td>";                      
                                tabla += "<td>" + json[0].det_productos[i].cantidad + "</td>";
                                tabla += "<td>" + json[0].det_productos[i].producto_id.tipo + "</td>";
                                tabla += "<td>" + json[0].det_productos[i].estado_producto + "</td>";
                                tabla += "<td align='center'><a class='delete' id_acta='" + json[0].id + "' id_detalle='" + json[0].det_productos[i].id + "' producto_id='"+json[0].det_productos[i].producto_id.id+"' onclick='deleteTablaDesActaRet(this);'><i class='fa fa-trash text-green btn_edit'></i></a></td>";
                                tabla += "</tr>";     
                            }           
                        }

                        $('#tabla_descripcion').dataTable().fnClearTable();
                        $('#tabla_descripcion').dataTable().fnDestroy();
                        $("#bodytabla_descripcion").html("");
                        $("#bodytabla_descripcion").append(tabla);

                        var table3 = $('#tabla_descripcion').DataTable();
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


function setInsertUpdateActaRetencionCuso() {
    //valida = validaContenedor("addactaVisitaCuso");

    //if (valida) {
        actainspec    = $("#idinfoNovAR").val();
        sitio         = $("#sitioAR").val();
        fecha         = $("#fechaAR").val();
        tipo          = $("#tiporetAR").val();
        testigo       = $("#idtestigoAR").val();
        

        datosParticipantes = '';
        var filas = $("#tabla_participantes").find("tr"); //devulve las filas del body de tu tabla segun el ejemplo que brindaste
        var resultado = "";
        for(i=1; i<filas.length; i++){ //Recorre las filas 1 a 1
            var celdas = $(filas[i]).find("td"); //devolverá las celdas de una fila

            if($($(celdas[3]).children("a")[0]).hasClass("nuevo")){

                funcionario_id  = $($(celdas[3]).children("a")[0]).attr("id_funcionario");
                id_detalle      = $($(celdas[3]).children("a")[0]).attr("id_detalle");
                tipo_partic     = $(celdas[2]).html();

                if(tipo_partic == 'DPNG')
                    datosParticipantes  += '{"funcionario_id":"' + funcionario_id + '"';
                else
                    datosParticipantes  += '{"persona_id":"' + funcionario_id + '"';

                if($("#tipoAR").val() == 1){
                    datosParticipantes  += ',"acta_retencion_id":"' + $("#idActaR").val() + '"';
                    if(id_detalle != null)
                        datosParticipantes  += ',"id":"' + id_detalle + '"';
                }
                datosParticipantes  += '},';
            }
        }

        datosParticipantes = datosParticipantes.substring(0, datosParticipantes.length - 1);

        datosProductos = '';
        var filas = $("#tabla_descripcion").find("tr"); //devulve las filas del body de tu tabla segun el ejemplo que brindaste
        for(i=1; i<filas.length; i++){ //Recorre las filas 1 a 1
            var celdas = $(filas[i]).find("td"); //devolverá las celdas de una fila
            
            producto_id  = $($(celdas[4]).children("a")[0]).attr("producto_id");
            id_detalle   = $($(celdas[4]).children("a")[0]).attr("id_detalle");
            cantidad     = $(celdas[1]).html();
            estado       = $(celdas[3]).html();

            datosProductos  += '{"producto_id":"' + producto_id + '",';
            datosProductos  += '"cantidad":"' + cantidad + '",';
            datosProductos  += '"estado_producto":"' + estado + '"';

            if($("#tipoAR").val() == 1){
                datosProductos  += ',"acta_retencion_id":"' + $("#idActaR").val() + '"';
                if(id_detalle != null)
                    datosProductos  += ',"id":"' + id_detalle + '"';
            }
            datosProductos  += '},';            
        }

        datosProductos = datosProductos.substring(0, datosProductos.length - 1);

        datosImplicados = '';
        var filas = $("#tabla_implicados").find("tr"); //devulve las filas del body de tu tabla segun el ejemplo que brindaste
        for(i=1; i<filas.length; i++){ //Recorre las filas 1 a 1
            var celdas = $(filas[i]).find("td"); //devolverá las celdas de una fila
            
            persona_id   = $($(celdas[5]).children("a")[0]).attr("id_personaparma");
            id_detalle   = $($(celdas[5]).children("a")[0]).attr("id_detalle");
            licencia     = $(celdas[0]).html();


            respuestaSI  = $($(celdas[3]).children("input")[0]).is(':checked');
            respuestaNO  = $($(celdas[3]).children("input")[1]).is(':checked');
            respuestaf = '';
            if(respuestaSI == true)
                respuestaf = true;
            if(respuestaNO == true)
                respuestaf = false;

            respuestaObsf = '';
            
            respuestaObsf  = $($(celdas[4]).children("textarea")[0]).val();


            if(licencia == '')
                datosImplicados  += '{"persona_id":"' + persona_id + '"';
            else
                datosImplicados  += '{"parma_id":"' + persona_id + '"';

            datosImplicados  += ',"resistencia":"' + respuestaf + '"';
            datosImplicados  += ',"observaciones":"' + respuestaObsf + '"';

            if($("#tipoAR").val() == 1){
                datosImplicados  += ',"acta_retencion_id":"' + $("#idActaR").val() + '"';
                if(id_detalle != null)
                    datosImplicados  += ',"id":"' + id_detalle + '"';
            }
            datosImplicados  += '},';            
        }

        datosImplicados = datosImplicados.substring(0, datosImplicados.length - 1);

        datos = '{';
        //datos += ' "numero":"", ';
        datos += ' "acta_inspeccion_id":"' + actainspec + '", ';
        datos += ' "tipo_retencion":"' + tipo + '", ';
        datos += ' "testigo_id":"' + testigo + '", ';
        datos += ' "det_productos":[' + datosProductos + '],';
        datos += ' "det_participantes":[' + datosParticipantes + '],';
        datos += ' "det_implicados":[' + datosImplicados + ']';
        datos += '}';
       
        datos = datos.replace(/undefined/g, null);
        datos = datos.replace(/None/g,null);
        datos = datos.replace(/False/g,"'false'");
        datos = datos.replace(/True/g,"'true'");
        datos = datos.replace(/"null"/g, null);
        datos.replace(/(\r\n\t|\n|\r\t)/gm,"").trim();

        console.log(datos);

        if ($("#tipoAR").val() == 0)
            insertarCabDetActaRetencion(datos);
        else
            saveEditCabDetActaRetencion(datos);
}

function insertarCabDetActaRetencion(datos){
    $("#modalLoadin").show();
    dj_url = "cmnactaretencioncabdet";
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
                console.log("data---->" + datos + "--->" + "cmnactaretencioncabdet" + "Error--->" + data);
            } else {
                swal("", "Registro insertado con Exito", "success");
                getActaRetencionCabCuso("");
                $('#modalLoadin').hide();
            }
        },
        error: function(data) {
            $('#modalLoadin').hide();
            swal("", "Error al Insertar el registro", "error");
            console.log("data---->" + datos + "--->" + "cmnactaretencioncabdet" + "Error--->" + data);
        },
    });
}

function saveEditCabDetActaRetencion(datos){
    $("#modalLoadin").show();
    console.log($("#idActaR").val());
    dj_url = "cmnactaretencioncabdet";
    $.ajax({
        url: "update_General",
        type: 'get',
        cache: 'false',
        data: {
            "dj_url": dj_url,
            "idtabla": $("#idActaR").val(),
            "data": JSON.stringify(datos)
        },
        dataType: "json",
        success: function(data) {
            if (data.id == undefined) {
                $('#modalLoadin').hide();
                swal("", "Error al Actualizar el registro", "error");
                console.log("data---->" + datos + "--->" + "cmnactaretencioncabdet" + "Error--->" + data);
            } else {
                $("#modalLoadin").hide();
                swal("", "Registro Actualizados con Exito", "success");        
            }
        },
        error: function(data) {
            $("#modalLoadin").hide();
            swal("", "Error al Actualizar el registro", "error");
            console.log("data---->" + datos + "--->" + "cmnactaretencioncabdet" + "Error--->" + data);
        },
    });
}

function deleteActaRetencion(pagina){
    id = $("#idActaR").val();
    if(id != "")
        deleteActaRetencionTabla(id);
}

function deleteActaRetencionTabla(id){
    $('#modalLoadin').show();
    datos = '{ "estado":"I",';
    datos += ' "eliminado":"t"';
    datos += '}';
    dj_url = "cmnactaretencion";
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
                swal("", "Error al Eliminar el registro", "error");
                console.log("data---->" + datos + "--->" + "cmnactaretencion" + "Error--->" + data);
            } else {
                $("#modalLoadin").hide();
                swal("", "Registro eliminado con Exito", "success");
                getActaRetencionCabCuso();// --------------------
                       
            }
        },
        error: function(data) {
            $("#modalLoadin").hide();
            swal("", "Error al Eliminar el registro", "error");
            console.log("data---->" + datos + "--->" + "cmnactaretencion" + "Error--->" + data);
        },
    });
}


function getDataFuncInfoNov_cuso(json) {

    datosDet = '';

    datosDet  += '{';
    datosDet  += '"nombre":"' + json[0].persona_id.apellidos+ " " + json[0].persona_id.nombres + '", ';
    datosDet  += '"cedula":"'+json[0].persona_id.identificacion+'", ';

    eliminar  = "<a class='delete' funcionario_id='"+json[0].id+"' onclick='deleteTablaFunIN(this);'><i class='fa fa-trash text-green btn_edit'></i></a>";
    datosDet  += '"eliminar":"' + eliminar  +'"';
    datosDet  += '}'; 

    datosDet = "["+datosDet+"]";
    camposJson = JSON.parse(datosDet);
    //console.log( camposJson["orden"]);
   
    var dTable = $('#tablaFunIN').DataTable({"destroy": true,});
    dTable.row.add([
            camposJson[0].cedula,
            camposJson[0].nombre,
            camposJson[0].eliminar
    ]).draw();
}

function deleteTablaFunIN(trthis){
    var pageParamTable = $('#tablaFunIN').DataTable();
    var tableRow = pageParamTable.row($(trthis).parents('tr'));

    id_detalle = $(trthis).attr("id_detalle");
    
    //console.log(id_detalle);
    if(id_detalle){
        datos = '{"estado":"I","eliminado":"t"}';
        $.ajax({
        url: "update_General",
        type: "get",
        cache: 'false',
        data: {
            "dj_url": "cmninformenovedadesparticipantes",
            "idtabla": id_detalle,
            "data": JSON.stringify(datos)
        },
        dataType: "json",

        success: function(data) {
            if (data.id == undefined) {
                $('#modalLoadin').hide();
                validaContenedorExt("infonov", "Error al Insertar el registro");
                console.log("idtabla---->" + id_detalle + "--->" + "data---->" + datos + "--->" + "cmnimplicadosactaretencion" + "Error--->" + data);
            } else {
                validaContenedorExt2("infonov", "Registro eliminado con exito");
                pageParamTable.row( tableRow ).remove().draw();
            }
        },
        error: function(data) {
            $('#modalLoadin').hide();
            validaContenedorExt("infonov", "Error al Insertar el registro");
            console.log("idtabla---->" + id_detalle + "--->" + "data---->" + datos + "--->" + "cmnimplicadosactaretencion" + "Error--->" + data);
        },
    });
    }else
        pageParamTable.row( tableRow ).remove().draw();
}

function getDataInfoNovCuso(json) {

    datosDet = '';

    datosDet  += '{';
    datosDet  += '"nombre":"' + json[0].apellidos+ " " + json[0].nombres + '", ';
    datosDet  += '"cedula":"'+json[0].identificacion+'", ';

    eliminar  = "<a class='delete' persona_id='"+json[0].id+"' onclick='deleteTablaPerIN(this);'><i class='fa fa-trash text-green btn_edit'></i></a>";
    datosDet  += '"eliminar":"' + eliminar  +'"';
    datosDet  += '}'; 

    datosDet = "["+datosDet+"]";
    camposJson = JSON.parse(datosDet);
    //console.log( camposJson["orden"]);
   
    var dTable = $('#tablaArmIN').DataTable({"destroy": true,});
    dTable.row.add([
            camposJson[0].cedula,
            camposJson[0].nombre,
            camposJson[0].eliminar
    ]).draw();
}

function deleteTablaPerIN(trthis){
    var pageParamTable = $('#tablaArmIN').DataTable();
    var tableRow = pageParamTable.row($(trthis).parents('tr'));

    id_detalle = $(trthis).attr("id_detalle");
    
    //console.log(id_detalle);
    if(id_detalle){
        datos = '{"estado":"I","eliminado":"t"}';
        $.ajax({
        url: "update_General",
        type: "get",
        cache: 'false',
        data: {
            "dj_url": "cmninformenovedadesparticipantes",
            "idtabla": id_detalle,
            "data": JSON.stringify(datos)
        },
        dataType: "json",

        success: function(data) {
            if (data.id == undefined) {
                $('#modalLoadin').hide();
                validaContenedorExt("infonov", "Error al Insertar el registro");
                console.log("idtabla---->" + id_detalle + "--->" + "data---->" + datos + "--->" + "cmnimplicadosactaretencion" + "Error--->" + data);
            } else {
                validaContenedorExt2("infonov", "Registro eliminado con exito");
                pageParamTable.row( tableRow ).remove().draw();
            }
        },
        error: function(data) {
            $('#modalLoadin').hide();
            validaContenedorExt("infonov", "Error al Insertar el registro");
            console.log("idtabla---->" + id_detalle + "--->" + "data---->" + datos + "--->" + "cmnimplicadosactaretencion" + "Error--->" + data);
        },
    });
    }else
        pageParamTable.row( tableRow ).remove().draw();
}


function mostrarOcultarTrasporte(id){
    if(id == 1){
        $("#trvehiculo").show();
        $("#trembarcacion").hide();
        $("#trotro").hide();
    }
    if(id == 2){
        $("#trvehiculo").hide();
        $("#trembarcacion").show();
        $("#trotro").hide();
    }
    if(id == 3){
        $("#trvehiculo").hide();
        $("#trembarcacion").hide();
        $("#trotro").show();
    }
    if(id == ""){
        $("#trvehiculo").hide();
        $("#trembarcacion").hide();
        $("#trotro").hide();
    }
}


/*obtine los funcionarios segun el nombre de busqueda y la pagina que envia la solicitud*/
function getDataPersonaFuncionarioPopCuso() {
    nombre = $("#nombresPopupPercuso").val();
    pagina = $("#pagina_enviaPopPercuso").val();

    $('#tabla_PopupPersonaFcuso').dataTable().fnClearTable();
    $('#tabla_PopupPersonaFcuso').dataTable().fnDestroy();

    $("#body_PopupPersonaFcuso").html("");
    var table = $('#tabla_PopupPersonaFcuso').DataTable({

        orderCellsTop: true
    });

    $.ajax({
        url: "persona_data",
        type: "get",
        data: {
            "data": nombre
        },
        dataType: "json",

        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
            } else {

                console.log(data.length);
                tabla = "";
                if (data.length > 0) {
                    for (i = 0; i < data.length; i++) {
                       
                            tabla += "<tr>";
                            tabla += "<td align='left'>" + data[i].identificacion + "</td>";
                            tabla += "<td align='left'>" + data[i].nombre_completo + "</td>";
                            tabla += '<td align="center"><textarea id="td_perfuncionario_' + i + '" hidden>' + JSON.stringify(data[i]) + '</textarea> <a style="cursor: pointer; font-size: 15px;" title="Buscar" data-close-stackbox="true" onClick="getDataPersonaFuncionarioCuso(' + i + ',\'' + pagina + '\');"><i class="fa fa-plus-circle text-blue"></i></a></td>';
                            tabla += "</tr>";
                       
                    }
                }

                $('#tabla_PopupPersonaFcuso').dataTable().fnClearTable();
                $('#tabla_PopupPersonaFcuso').dataTable().fnDestroy();

                $("#body_PopupPersonaFcuso").html("");
                $("#body_PopupPersonaFcuso").append(tabla);

                var table = $('#tabla_PopupPersonaFcuso').DataTable({

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

/*funcion para mapear los datos en la pagina personas y funcionarios*/
function getDataPersonaFuncionarioCuso(idx, pagina) {
    perfuncionario = $("#td_perfuncionario_" + idx).val();
    newF = perfuncionario.replace(/None/g, null)
    newF = newF.replace(/False/g, "'false'")
    newF = newF.replace(/True/g, "'true'")
    newF = newF.replace(/'/g, '"')
    var json = JSON.parse("[" + newF + "]");

    if (pagina == 'personas')
        getDataPersonasFunc(json);
    if (pagina == 'personas2')
        getDataFuncFamiliar(json);
    if (pagina == 'mpetreo')
        getDataMPetreo(json);
    if (pagina == 'acta_visita')
        getDataPersonaActaVisita(json);
    if (pagina == 'acta_visitaCapi')
        getDataCapitanActaVisita(json);
    if (pagina == 'acta_Inspec')
        getDataPersonaActaInspec(json);
    if (pagina == 'acta_InspecCapi')
        getDataCapitanActaInspec(json);
    if (pagina == 'infonov_cuso')
        getDataInfoNovCuso(json);
    if (pagina == 'planpatrulla')
        getDataPerPlanPatrulla(json);
    if (pagina == 'acta_retencion')
        insertDataPerActaRetencion(json);
    if (pagina == 'acta_retencionImp')
        insertDataPerImpActaRetencion(json);
    if (pagina == 'acta_retencionTest')
        getDataPerTestigoActaRetencion(json);

}


/*funcion para insertar en la base de datos*/
function insertarTablaPersonaCuso() {


    datos = '{';
    datos += ' "nombre_completo":"' + $("#apellidos_persPcuso").val() + ' ' + $("#nombres_persPcuso").val() + '",';
    datos += ' "identificacion":"' + $("#num_cedpersPcuso").val() + '",';
    datos += ' "nombres":"' + $("#nombres_persPcuso").val() + '",';
    datos += ' "apellidos":"' + $("#apellidos_persPcuso").val() + '",';
    datos += ' "tipo_identificacion":"C",';
    datos += ' "tipo_persona":"N",';

    datos = datos.substring(0, datos.length - 1); //se le quita el ultimo caracter ya q puede ser un ,
    datos += '}';



    $.ajax({
        url: "persona_data",
        type: "get",
        data: {
            "data": $("#num_cedpersPcuso").val()
        },
        dataType: "json",

        success: function(data) {
            if (data.length > 0) {
                //$('#modalLoadin').hide();
                validaContenedorExt("popupDatosPersonaCuso", "Ya existe Persona con esa identificación");
                return 0;
            } else {
               // id_padre = $('#content_persona').parent().attr('id');
                //th_insert(datos, "personas", id_padre, "perpersona", dato_insert);
                $.ajax({
                    url: "insert_General",
                    type: 'get',
                    cache: 'false',
                    data: {
                        "dj_url": "perpersona",
                        "data": JSON.stringify("[" + datos + "]")
                    },
                    dataType: "json",
                    success: function(data) {
                        if (!data['results']) {
                            $('#modalLoadin').hide();
                            validaContenedorExt("popupDatosPersonaCuso", "Error al Insertar el registro");
                            console.log("data---->" + datos + "--->" + "cusocabdetcmnactavisitainspecembpesca" + "Error--->" + data);
                        } else {
                            validaContenedorExt2("popupDatosPersonaCuso", "Registro Insertado con Exito");
                           
                            $('#modalLoadin').hide();
                        }
                    },
                    error: function(data) {
                        $('#modalLoadin').hide();
                        validaContenedorExt("popupDatosPersonaCuso", "Error al Insertar el registro");
                        console.log("data---->" + datos + "--->" + "cusocabdetcmnactavisitainspecembpesca" + "Error--->" + data);
                    },
                });
            }
        },
        error: function(data) {
            $('#modalLoadin').hide();
            validaContenedorExt("popupDatosPersonaCuso", "Error al Insertar el registro");
            console.log("idtabla---->" + id + "--->" + "data---->" + datos + "--->" + "perpersonacuenta" + "Error--->" + data);
        },
    });

}






function lastday(y,m){
return  new Date(y, m , 0).getDate();
}


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




function getDataFuncionariosActividadTablaCM(){

    f1 = $('#FdesdeCr').val();
    f1Arr = f1.split("-");
    console.log(f1);
    console.log(lastday(f1Arr[1],f1Arr[0]));
    lastday1= lastday(f1Arr[1],f1Arr[0]);
    var tabla = "";
    $.ajax({
            url: "data_controlpersonal",
            type: "get",
            data: {
                "data": "anio="+f1Arr[1]+"&mes="+f1Arr[0]
            },
            dataType: "json",
            async: false,

            success: function(json) {
                $("#modalLoadin").hide();
                if (json['non_field_errors'])
                    console.log(json['non_field_errors']);
                else {
                    tabla = "";
                    nombre = "";
                    nombre_aux = "aaaa";
                    cont = 1;

                    head  = "";
                    head1 = "";
                    head2 = "";

                   

                    var weekdays = ["D", "L", "M", "M", "J", "V", "S"];
                    for (i = 1; i <= lastday1; i++) {



                        var date = new Date(f1Arr[1]+'-'+f1Arr[0]+'-'+i);
                        var weekday = weekdays[date.getDay()]
                        console.log(weekday);
                        if((weekday == 'S') || (weekday == 'D'))
                            color = 'background-color: yellow;font-weight:bold;text-align:center;font-size:12px;;'
                        else
                            color = 'background-color:#005196; color: white;font-weight:bold;text-align:center;font-size:12px;';
                        head+="<th style='"+color+"'>"+i+"</th>";
                        head1+="<th style='"+color+"'>"+weekday+"</th>";
                        //head2+="<td style='"+color+"'>"+datadias[1]+"</td>";
                    } 


                    for (i = 0; i < json.length; i++) {

                        tabla+="<tr>";
                        tabla+="<td style='background-color:#005196; color: white;font-weight:bold;font-size:12px;'>"+(i+1)+"</td>";
                        tabla+="<td style='background-color:#005196; color: white;font-weight:bold;font-size:12px;' href='#popupdias' data-stackbox='true' data-stackbox-width='1300px' data-stackbox-height='500px' data-stackbox-position='absolute' onClick='getDataDiasActFunCM(\"" + json[i].id + "\",\"" + json[i].funcionario_id.persona_id.nombre_completo + "\",\"" + f1Arr[1] + "\",\"" + f1Arr[0] + "\");'>"+json[i].funcionario_id.persona_id.nombre_completo+"</td>";
                        
                        arrayDias = [];
                        datadias  = [];
                        if(json[i].dias_actividad != ""){
                            arrayDias = json[i].dias_actividad.split(";");
                        }

                        
                        head2 = '';
                        for (j = 1; j <= lastday1; j++) {
                            if(arrayDias.length > 0){
                                datadias = arrayDias[j-1].split(":");
                                valorDia = datadias[1];
                            }else
                                valorDia = '';

                            var date = new Date(f1Arr[1]+'-'+f1Arr[0]+'-'+j);
                            var weekday = weekdays[date.getDay()]
                            if((weekday == 'S') || (weekday == 'D'))
                                color = 'background-color: yellow;'
                            else
                                color = '';

                            if((valorDia == 'B')||(valorDia == 'O')||(valorDia == 'G')){

                                if(valorDia == 'B') colorBack = 'blue';
                                if(valorDia == 'O') colorBack = 'orange';
                                if(valorDia == 'G') colorBack = 'green';
                                valorDia = '';
                                color = 'background-color: '+colorBack+';'
                            }

                            head2+="<td style='text-transform:uppercase;font-weight:bold;font-size:12px;text-align:center;"+color+"' id=''>"+valorDia+"</td>";
                        } 
                        tabla+=head2;
                    }

                    if(json.length > 0){
                        console.log(11111);
                        
                    }else{
                        datat = "subproceso_estatuto_id__in=SPC_CM";

                        $.ajax({
                            //url: "funcionario_data",
                            url: "data_funcionarioParam",
                            type: "get",
                            data: {
                                "data": datat
                            },
                            dataType: "json",
                            async: false,

                            success: function(data) {
                                if (data['non_field_errors']) {
                                    console.log(data['non_field_errors']);
                                } else {

                                    tabla = "";
                                    if (data.length > 0) {
                                        for (i = 0; i < data.length; i++) {
                                            datosPer ='';
                                            datosPer  += '{"funcionario_id":"' + data[i].id + '", ';
                                            datosPer  += '"dias_actividad":"", ';
                                            datosPer  += '"anio":"' + f1Arr[1] + '", ';
                                            datosPer  += '"mes":"' + f1Arr[0] + '" ';
                                            datosPer  += '}';  
                                            $.ajax({
                                                url: "insert_General",
                                                type: 'get',
                                                cache: 'false',
                                                data: {
                                                    "dj_url": "cmncontrolpersonal",
                                                    "data": JSON.stringify("[" + datosPer + "]")
                                                },
                                                dataType: "json",
                                                async: false,
                                                success: function(dataI) {
                                                    if (!dataI['results']) {
                                                        //$('#modalLoadin').hide();
                                                        //swal("", "Error al Insertar el registro: " + data['non_field_errors'][0], "error");
                                                        console.log("data---->" + datosPer + "--->" + "cusocabdetcmnactavisitainspecembpesca" + "Error--->" + dataI);
                                                    } else {
                                                        //swal("", "Registro insertado con Exito", "success");
                                                        //buscarActaVisitaCusoParam("");
                                                        //$('#modalLoadin').hide();
                                                        console.log('OK');
                                                    }
                                                },
                                                error: function(dataI) {
                                                    //$('#modalLoadin').hide();
                                                    //swal("", "Error al Insertar el registro", "error");
                                                    console.log("data---->" + datosPer + "--->" + "cusocabdetcmnactavisitainspecembpesca" + "Error--->" + dataI);
                                                },
                                            });


                                            tabla+="<tr>";
                                            tabla+="<td style='background-color:#005196; color: white;font-weight:bold;font-size:12px;'>"+(i+1)+"</td>";
                                            tabla+="<td style='background-color:#005196; color: white;font-weight:bold;font-size:12px;' href='#popupdias' data-stackbox='true' data-stackbox-width='1300px' data-stackbox-height='500px' data-stackbox-position='absolute' onClick='getDataDiasActFunCM(\"" + data[i].id + "\",\"" + data[i].persona_id.nombre_completo + "\",\"" + f1Arr[1] + "\",\"" + f1Arr[0] + "\");'>"+data[i].persona_id.nombre_completo+"</td>";
                                            
                                            arrayDias = [];
                                            datadias  = [];
                                            
                                            
                                            head2 = '';
                                            for (j = 1; j <= lastday1; j++) {
                                                                                                
                                                var date = new Date(f1Arr[1]+'-'+f1Arr[0]+'-'+j);
                                                var weekday = weekdays[date.getDay()]
                                                if((weekday == 'S') || (weekday == 'D'))
                                                    color = 'background-color: yellow;'
                                                else
                                                    color = '';
                                                head2+="<td style='text-transform:uppercase;font-weight:bold;font-size:12px;text-align:center;"+color+"' id=''></td>";
                                            } 
                                            tabla+=head2;
                                        } /*for*/
                                    } /*if length*/
                                }
                            },
                            error: function(data) {
                                swal("", "Error: " + JSON.stringify(data), "error");
                                console.log(JSON.stringify(data));
                                //console.log( JSON.stringify(data));
                            },
                        });
                    }

                    cabecera ="<table style='width:100%' class='table table-striped table-bordered'>";
                    cabecera +="<thead>";
                    cabecera +="<tr>";
                    cabecera +="<th style='background-color:#005196; color: white;font-size:12px;'></th>";
                    cabecera +="<th style='background-color:#005196; color: white;font-weight:bold;font-size:12px;'>DIAS</th>";
                    cabecera +=head1;
                    cabecera +="</tr>";
                    cabecera +="<tr>";
                    cabecera +="<th style='background-color:#005196; color: white;font-weight:bold;font-size:12px;'>#</th>";
                    cabecera +="<th style='background-color:#005196; color: white;font-weight:bold;font-size:12px;'>NOMBRES APELLIDOS</th>";
                    cabecera +=head;
                    cabecera +="</tr>";
                    cabecera +="</thead>";
                    cabecera +="<tbody>";
                    cabecera +=tabla;
                    cabecera +="</tbody>";
                    cabecera +="<table>";

                    $("#bodycronogramaAct").html("");
                    $("#bodycronogramaAct").append(cabecera);
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

function addClassTable(thisr,band){
    if(band != '2'){
        if($("#"+thisr).hasClass("marca")){
            $("#"+thisr).removeClass('marca');
            $("#"+thisr).removeClass('color');
            //if(!$("#"+thisr).hasClass("color")){
                if(band == '0')
                    $("#"+thisr).css('background-color','');
            //}
            if(band == '1')
                $("#"+thisr).css('background-color','yellow');
            //if($("#"+thisr).hasClass("fd"))
              //  $("#"+thisr).css('background-color','yellow');
        }else{
            $("#"+thisr).addClass('marca');
            $("#"+thisr).css('background-color','red');
        }
    }else{
        $("#"+thisr).removeClass('marca');
        $("#"+thisr).removeClass('color');
        $("#"+thisr).css('background-color','');
        $("#"+thisr).html('');
        if($("#"+thisr).hasClass("fd"))
            $("#"+thisr).css('background-color','yellow');
    }
}

function setDataControlPersonal(valor){
    $.each($('.marca'), function(index, value) {
      id = $(this).get(0).id;
      $("#"+id).html(valor.value);

       if(valor.value != ""){
          color = $("#Sactividades option:selected").attr("color");
            if(color){
                $("#"+id).css('background-color',color);
                $("#"+id).html(color.charAt(0));
                $("#"+id).addClass('color');
            }else{
                if($("#"+id).hasClass("fd"))
                     $("#"+id).css('background-color','yellow');
                else
                    $("#"+id).css('background-color','');
            }
            addClassTable(this.id);
        }else
            addClassTable(this.id,'2');//limpiar todo
    });

}


function getDataDiasActFunCM(id,funcionario,anio,mes){
console.log(333);
    $("#popupFuncionario").html(funcionario);
    $("#popupPeriodo").html(anio+"-"+mes);
    $("#tipoCronFun").val(0);
    $("#actividad_funcionario_id").val(id);

    
    lastday1= lastday(anio,mes);
    $("#lastday").val(lastday1);

    head  = "";
    head1 = "";
    body = "";
    var weekdays = ["D", "L", "M", "M", "J", "V", "S"];
    for (i = 1; i <= lastday1; i++) {

        var date = new Date(anio+'-'+mes+'-'+i);
        var weekday = weekdays[date.getDay()]
        console.log(weekday);
        if((weekday == 'S') || (weekday == 'D')){
            color = 'background-color: yellow;font-weight:bold;'
            color2 = 'background-color: yellow;font-weight:bold;'
            bandDia = '1';
            clase = 'fd';
        }
        else{
            color = 'background-color:#005196; color: white;font-weight:bold;';
            color2 = '';
            clase = '';
            bandDia = '0';
        }
        head+="<th style='"+color+"'>"+i+"</th>";
        head1+="<th style='"+color+"' >"+weekday+"</th>";
        body+="<td class='"+clase+"' style='height:40px;"+color2+"' id='dia_"+i+"' onClick='addClassTable(\"dia_" + i + "\",\"" + bandDia + "\");'></td>";
    } 

    cabecera ="<table id='detalleActFun' style='width:100%' class='table table-striped table-bordered'>";
    cabecera +="<thead>";
    cabecera +="<tr>";
    cabecera +="<th style='background-color:#005196; color: white;font-weight:bold;'>Dias</th>";
    cabecera +=head1;
    cabecera +="</tr>";
    cabecera +="<tr>";
    cabecera +="<th style='background-color:#005196; color: white;font-weight:bold;'>#</th>";
    cabecera +=head;
    cabecera +="</tr>";
    cabecera +="</thead>";
    cabecera +="<tbody>";
    cabecera +="<tr>";
    cabecera +="<td style='background-color:#005196; color: white;font-weight:bold;'></td>";
    cabecera +=body;
    cabecera +="<tr>";
    cabecera +="</tbody>";
    cabecera +="<table>";

    $("#cronogramaFun").html("");
    $("#cronogramaFun").append(cabecera);

    var tabla = "";
    $.ajax({
        url: "data_diasfuncionariosCm",
        type: "get",
        data: {
            "data": "id="+id
        },
        dataType: "json",

        success: function(json) {
            $("#modalLoadin").hide();
            if (json['non_field_errors'])
                console.log(json['non_field_errors']);
            else {
                tabla = "";
                if(json.length > 0){
                    $("#tipoCronFun").val(1);
                    $("#idtrx").val(json[0].id); 

                    arrayDias = json[0].dias_actividad.split(";");
                    for (i = 0; i < arrayDias.length ; i++) {
                        arrarRes = arrayDias[i].split(":");
                        $("#dia_"+(i+1)).html(arrarRes[1]);
                        if((arrarRes[1] == 'B')||(arrarRes[1] == 'O')||(arrarRes[1] == 'G')){
                            if(arrarRes[1] == 'B') color = 'blue';
                            if(arrarRes[1] == 'O') color = 'orange';
                            if(arrarRes[1] == 'G') color = 'green';
                            $("#dia_"+(i+1)).css('background-color',color);
                        }
                    }
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


function getActividadesControlPersonal(){
    $.ajax({
        url: "data_actividadescronogramaCm",
        type: "get",
        dataType: "json",
        async: false,
        success: function(json) {
            $("#modalLoadin").hide();
            if (json['non_field_errors'])
                console.log(json['non_field_errors']);
            else {
                tabla = "";
                nombre = "";
                nombre_aux = "aaa";
                if(json.length > 0){
                    tabla="<option value='999' selected>Seleccione una opcion</option>";
                    tabla+="<option value=''>Limpiar</option>";
                    for (i = 0; i < json.length ; i++) {
                        nombre = json[i].categoria;
                        if(nombre != nombre_aux){
                            tabla+="<optgroup label='"+json[i].observaciones1+"'>";
                        }else{
                            tabla+="</optgroup>";
                        }

                        if(json[i].observaciones1 == 'DIAS')
                            color3 = 'color="'+json[i].valor+'"';
                        else
                            color3 = '';

                        tabla+="<option value='"+json[i].valor+"' "+color3+">"+json[i].label+"</option>";
                        nombre_aux = json[i].categoria;
                    }
                    console.log(nombre_aux);
                    $("#Sactividades").html("");
                    $("#Sactividades").append(tabla);
                    $("#Sactividades").select2();
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


function setinsertupdateDiasControlPers(){

    f1 = $('#FdesdeCr').val();
    f1Arr = f1.split("-");

    lastday1 = $("#lastday").val();
    idtrx = $("#idtrx").val();

    cadenaDias = '';
    for (i = 1; i <= lastday1; i++) {
        
        cadenaDias += i+":"+$("#dia_"+i).html()+";";
    }
    cadenaDias = cadenaDias.substring(0, cadenaDias.length - 1);

    datos = '{';
    datos += ' "dias_actividad":"' +cadenaDias + '"';
    datos += '}';

    updateDiasControlPers(datos);
}


function updateDiasControlPers(datos){
    $("#modalLoadin").show();
    console.log($("#idAVCUSO").val());
    dj_url = "cmncontrolpersonal";
    $.ajax({
        url: "update_General",
        type: 'get',
        cache: 'false',
        data: {
            "dj_url": dj_url,
            "idtabla": $("#idtrx").val(),
            "data": JSON.stringify(datos)
        },
        dataType: "json",
        success: function(data) {
            if (data.id == undefined) {
                $('#modalLoadin').hide();
                validaContenedorExt("popupdias", "Error al Actualizar el Registro");
                console.log("data---->" + datos + "--->" + "cmndiasactividadfuncionarios" + "Error--->" + data);
            } else {
                $("#modalLoadin").hide();
                validaContenedorExt2("popupdias", "Registro Actualizado con exito");
                getDataFuncionariosActividadTablaCM();
            }
        },
        error: function(data) {
            $("#modalLoadin").hide();
            validaContenedorExt("popupdias", "Error al Actualizar el Registro");
            console.log("data---->" + datos + "--->" + "cmndiasactividadfuncionarios" + "Error--->" + data);
        },
    });
}


function getDataCronoActividadFuncionario(json){

    eliminar  = "<a class='delete' funcionario_id='"+json[0].id+"' onClick='deleteTablaCronoActividadFuncionario(this);'><i class='fa fa-trash text-green btn_edit'></i></a>";
    var dTable = $('#tablaFunCron').DataTable({
                                              "destroy": true
                                            } );
    dTable.row.add([
        json[0].persona_id.nombre_completo,
        json[0].persona_id.identificacion,
        eliminar
    ]).draw();
}


function deleteTablaCronoActividadFuncionario(trthis){
    console.log(222);
    var pageParamTable = $('#tablaFunCron').DataTable();
    var tableRow = pageParamTable.row($(trthis).parents('tr'));
    pageParamTable.row( tableRow ).remove().draw();
}

function insertCronoActFuncionario(){
    f1 = $('#FdesdeCr').val();
    f1Arr = f1.split("-");
    datosFunc = '';
    var filas = $("#tablaFunCron").find("tr"); //devulve las filas del body de tu tabla segun el ejemplo que brindaste

    for(i=1; i<filas.length; i++){ //Recorre las filas 1 a 1
        var celdas = $(filas[i]).find("td");
        funcionario_id  = $($(celdas[2]).children("a")[0]).attr("funcionario_id");

        datosFunc  += '{"funcionario_id":"' + funcionario_id + '"';
        datosFunc  += ',"dias_actividad":""';
        datosFunc  += ',"anio":"' + f1Arr[1] + '"';
        datosFunc  += ',"mes":"' + f1Arr[0] + '"';
        datosFunc  += '},';            
    }

    datosFunc = datosFunc.substring(0, datosFunc.length - 1);


    dj_url = "cmncontrolpersonal";
    $.ajax({
        url: "insert_General",
        type: 'get',
        cache: 'false',
        data: {
            "dj_url": dj_url,
            "data": JSON.stringify("[" + datosFunc + "]")
        },
        dataType: "json",
        success: function(data) {
            if (!data['results']) {
                //$('#modalLoadin').hide();
                validaContenedorExt("popupAddFunCro", "Error al Insertar el registro");
                console.log("data---->" + datosFunc + "--->" + "cmncontrolpersonal" + "Error--->" + data);
            } else {
                validaContenedorExt2("popupAddFunCro", "Registro Insertado con Exito");
                getDataFuncionariosActividadTablaCM();
            }
        },
        error: function(data) {
            //$('#modalLoadin').hide();
            validaContenedorExt("popupAddFunCro", "Error al Insertar el registro");
            console.log("data---->" + datosFunc + "--->" + "cmncontrolpersonal" + "Error--->" + data);
        },
    });
}

function deleteTablaCronoActFunc(){
    id    = $("#actividad_funcionario_id").val();
    datos = '{"estado":"I","eliminado":"t"}';
    $.ajax({
        url: "update_General",
        type: "get",
        cache: 'false',
        data: {
            "dj_url": "cmncontrolpersonal",
            "idtabla": id,
            "data": JSON.stringify(datos)
        },
        dataType: "json",

        success: function(data) {
            if (data.id == undefined) {
                $('#modalLoadin').hide();
                validaContenedorExt("cronogramaAct", "Error al Insertar el registro");
                console.log("idtabla---->" + id + "--->" + "data---->" + datos + "--->" + "cmncontrolpersonal" + "Error--->" + data);
            } else {
                //validaContenedorExt2("cronogramaAct", "Registro eliminado con exito");
                swal("", "Registro eliminado con Exito", "success");
                getDataFuncionariosActividadTablaCM();
            }
        },
        error: function(data) {
            $('#modalLoadin').hide();
            validaContenedorExt("cronogramaAct", "Error al Insertar el registro");
            console.log("idtabla---->" + id + "--->" + "data---->" + datos + "--->" + "cmncontrolpersonal" + "Error--->" + data);
        },
    });
}


/*funcion para mapear los datos del funcionario en el formulario de ingresos*/
function getDataFuncionarioInfoDiario(json,pos) {
    if(pos == 1){
        $("#funcionario_de").val(json[0].persona_id.apellidos + ' ' + json[0].persona_id.nombres);
        $('#idfuncionario_de').val(json[0].id);
    }
    if(pos == 2){
        $("#funcionario_para").val(json[0].persona_id.apellidos + ' ' + json[0].persona_id.nombres);
        $('#idfuncionario_para').val(json[0].id);
    }
    if(pos == 3){
        $("#funcionario_info1").val(json[0].persona_id.apellidos + ' ' + json[0].persona_id.nombres);
        $('#idfuncionario_info1').val(json[0].id);
    }
    if(pos == 4){
        $("#funcionario_info2").val(json[0].persona_id.apellidos + ' ' + json[0].persona_id.nombres);
        $('#idfuncionario_info2').val(json[0].id);
    }
}


function addDataEmbarcacionActividad(){

    file = $('#doc_anexosID')[0].files[0];
    if (!file) {
        fileExtension = "";
    } else {
        fileExtension = file.name.split('.').pop();
        salida = ValidateExt(fileExtension);
        cadenaImg = '"imagen":"' + file.name + '",';
    }

    fileExtension = fileExtension.toLowerCase();

    if (file){
        //si la numeracion es igual a 0 se la obtiene de la base
        numeracion = $("#secInfDiario").val();
        isla = $("#islaID").val();
        //isla ='c718b0a6-a637-11e4-8ba2-6c3be5ba6ec8';
        var path_archivos = '';

        if(numeracion != 0)
            path_archivos = 'static/media/contolmarino/'+numeracion+'/';
        /*se obtiene la nuevo numeracion*/
        else{
            $.ajax({
                url: "data_secinfoDiarioCab",
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
                        numeroAct= json[0].num_reporte;
                        numeroArr= numeroAct.split("-");
                        numSig   = parseInt(numeroArr[2])+1;
                        if((numSig > 1)&&(numSig < 10))
                            numeroArr[2] = "000"+numSig;
                        if((numSig >= 10)&&(numSig < 100))
                            numeroArr[2] = "00"+numSig;
                        if((numSig >= 100)&&(numSig < 1000))
                            numeroArr[2] = "0"+numSig;
                        if((numSig >= 1000))
                            numeroArr[2] = numSig;

                        console.log(numeroArr);
                        $("#secInfDiario").val(numeroArr[0]+"-"+numeroArr[1]+"-"+numeroArr[2]+"-"+numeroArr[3]);
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

        upload_file("frm_infodiasID",path_archivos);
    }

    id_cab = $("#idinfodia").val();

    orden      = $('#ci_ordenID').val();
    titulo     = $('#ci_tituloID').val();
    desarrollo =  tinyMCE.get('ci_desarrolloID').getContent();
    foto       = file.name;

    imagen  = "<a rel='gallery' class='fancybox' href='"+path_archivos+file.name+"'><img src='"+path_archivos+file.name+"' style='width:20px;'></a>";

    datosDet = '';

    datosDet  += '{';
    datosDet  += '"orden":"<input \'text\' style=\'width:50px;\' onkeypress=\'return isNumberKey(event);\' value=\''+ orden + '\'/>", ';
    datosDet  += '"titulo":"' + titulo + '", ';
    //datosDet  += '"foto":"' + foto + '", ';
    datosDet  += '"imagen":"' + imagen + '", ';


    eliminar  = "<a class='delete' id_detalle='' id_cabecera='"+id_cab+"' onclick='deleteDataEmbarcacionActividad(this);'><i class='fa fa-trash text-green btn_edit'></i></a>";
    editar    = "<textarea  hidden>"+desarrollo+"</textarea><a class='' id_detalle='' id_cabecera='"+id_cab+"' onclick='editDataEmbarcacionActividad(this);'><i class='fa fa-edit text-green btn_edit'></i></a>";
    datosDet  += '"editar":"' + editar  +'",';
    datosDet  += '"eliminar":"' + eliminar  +'"';
    datosDet  += '}'; 

    datosDet = "["+datosDet+"]";
    camposJson = JSON.parse(datosDet);
    //console.log( camposJson["orden"]);
   
    var dTable = $('#tablafotos_repID').DataTable({"destroy": true,});
    dTable.row.add([
            camposJson[0].orden,
            camposJson[0].titulo,
            camposJson[0].imagen,
            camposJson[0].editar,
            camposJson[0].eliminar
    ]).draw();

    validaContenedorExt2("infDia", "Titulo insertado con exito");
    $('.nav-tabs a[href="#tab_det"]').tab('show');

    $(".fancybox").fancybox();    
}

function deleteDataEmbarcacionActividad(trthis){
    var pageParamTable = $('#tablafotos_repID').DataTable();
    var tableRow = pageParamTable.row($(trthis).parents('tr'));
    id_detalle = $(trthis).attr("id_detalle");
    
    //console.log(id_detalle);
    if(id_detalle){
        datos = '{"estado":"I","eliminado":"t"}';
        $.ajax({
        url: "update_General",
        type: "get",
        cache: 'false',
        data: {
            "dj_url": "cmncmonitreportediarioimagenes",
            "idtabla": id_detalle,
            "data": JSON.stringify(datos)
        },
        dataType: "json",

        success: function(data) {
            if (data.id == undefined) {
                $('#modalLoadin').hide();
                validaContenedorExt("infomon", "Error al Insertar el registro");
                console.log("idtabla---->" + id + "--->" + "data---->" + datos + "--->" + "cmncmonitreportediarioimagenes" + "Error--->" + data);
            } else {
                validaContenedorExt2("infomon", "Registro eliminado con exito");
                pageParamTable.row( tableRow ).remove().draw();
            }
        },
        error: function(data) {
            $('#modalLoadin').hide();
            validaContenedorExt("infomon", "Error al Insertar el registro");
            console.log("idtabla---->" + id + "--->" + "data---->" + datos + "--->" + "cmncmonitreportediarioimagenes" + "Error--->" + data);
        },
    });
    }else
        pageParamTable.row( tableRow ).remove().draw();

}


function addTipoEmbDetectada(tipo){


    id_cab = $("#idinfodia").val();
    if(tipo == 1){
        tipoAct    = $('#StipoEmb_detecF option:selected').text();
        tipoActid  = $('#StipoEmb_detecF').val();
        cantidad   = $('#cantidad_detecF').val();
        tabla      = 'tablaembfuera';
    }else{
        tipoAct    = $('#StipoEmb_detecD option:selected').text();
        tipoActid  = $('#StipoEmb_detecD').val();
        cantidad   = $('#cantidad_detecD').val();
        tabla      = 'tablaembdentro';
    }
    eliminar  = "<a class='delete' id_detalle='' id_cabecera='"+id_cab+"' id_actividad='"+tipoActid+"' onclick='deleteDataTipoEmbDetectada(this,"+tipo+");'><i class='fa fa-trash text-green btn_edit'></i></a>";

    datosDet = '';
    datosDet  += '{';
    datosDet  += '"tipo":"' + tipoAct + '", ';
    datosDet  += '"cantidad":"' + cantidad + '", ';
    datosDet  += '"eliminar":"' + eliminar  +'"';
    datosDet  += '}'; 

    datosDet = "["+datosDet+"]";
    camposJson = JSON.parse(datosDet);
    //console.log( camposJson["orden"]);
   
    var dTable = $('#'+tabla).DataTable({"destroy": true,"order": [[ 1, 'asc' ]]});
    dTable.row.add([
            1,
            camposJson[0].tipo,
            camposJson[0].cantidad,
            camposJson[0].eliminar
    ]).draw();

    dTable.on( 'order.dt search.dt', function () {
        dTable.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();

    validaContenedorExt2("infDia", "Registro insertado con exito");

    $(".fancybox").fancybox();    
}

function deleteDataTipoEmbDetectada(trthis,tipo){
    if(tipo == 1)
        tabla      = 'tablaembfuera';
    else
        tabla      = 'tablaembdentro';

    var pageParamTable = $('#'+tabla).DataTable();
    var tableRow = pageParamTable.row($(trthis).parents('tr'));
    id_detalle = $(trthis).attr("id_detalle");
    
    //console.log(id_detalle);
    if(id_detalle){
        datos = '{"estado":"I","eliminado":"t"}';
        $.ajax({
        url: "update_General",
        type: "get",
        cache: 'false',
        data: {
            "dj_url": "cmncmonitreportediarioembarcacionesactividad",
            "idtabla": id_detalle,
            "data": JSON.stringify(datos)
        },
        dataType: "json",

        success: function(data) {
            if (data.id == undefined) {
                $('#modalLoadin').hide();
                validaContenedorExt("infomon", "Error al Insertar el registro");
                console.log("idtabla---->" + id + "--->" + "data---->" + datos + "--->" + "cmncmonitreportediarioembarcacionesactividad" + "Error--->" + data);
            } else {
                validaContenedorExt2("infomon", "Registro eliminado con exito");
                pageParamTable.row( tableRow ).remove().draw();
            }
        },
        error: function(data) {
            $('#modalLoadin').hide();
            validaContenedorExt("infomon", "Error al Insertar el registro");
            console.log("idtabla---->" + id + "--->" + "data---->" + datos + "--->" + "cmncmonitreportediarioembarcacionesactividad" + "Error--->" + data);
        },
    });
    }else
        pageParamTable.row( tableRow ).remove().draw();
}

function addSistemaInfoDiario(){


    id_cab = $("#idinfodia").val();
    
    sistema    = $('#SsistemaRev option:selected').text();
    sistemaid  = $('#SsistemaRev').val();
    estado     = $('#SestadoRev option:selected').text();
    estadoid   = $('#SestadoRev').val();


    eliminar  = "<a class='delete' id_detalle='' id_cabecera='"+id_cab+"' id_sistema='"+sistemaid+"' id_estado='"+estadoid+"' onclick='deleteDataSistemaInfoDiario(this);'><i class='fa fa-trash text-green btn_edit'></i></a>";

    datosDet = '';
    datosDet  += '{';
    datosDet  += '"sistema":"' + sistema + '", ';
    datosDet  += '"estado":"' + estado + '", ';
    datosDet  += '"eliminar":"' + eliminar  +'"';
    datosDet  += '}'; 

    datosDet = "["+datosDet+"]";
    camposJson = JSON.parse(datosDet);
    //console.log( camposJson["orden"]);
   
    var dTable = $('#tabla_revision').DataTable({"destroy": true,"order": [[ 1, 'asc' ]]});
    dTable.row.add([
            1,
            camposJson[0].sistema,
            camposJson[0].estado,
            camposJson[0].eliminar
    ]).draw();

    dTable.on( 'order.dt search.dt', function () {
        dTable.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();

    validaContenedorExt2("infDia", "Registro insertado con exito");

    $(".fancybox").fancybox();    
}

function deleteDataSistemaInfoDiario(trthis){

    var pageParamTable = $('#tabla_revision').DataTable();
    var tableRow = pageParamTable.row($(trthis).parents('tr'));
    id_detalle = $(trthis).attr("id_detalle");
    
    //console.log(id_detalle);
    if(id_detalle){
        datos = '{"estado":"I","eliminado":"t"}';
        $.ajax({
        url: "update_General",
        type: "get",
        cache: 'false',
        data: {
            "dj_url": "cmncmonitreportediariosistema",
            "idtabla": id_detalle,
            "data": JSON.stringify(datos)
        },
        dataType: "json",

        success: function(data) {
            if (data.id == undefined) {
                $('#modalLoadin').hide();
                validaContenedorExt("infomon", "Error al Insertar el registro");
                console.log("idtabla---->" + id + "--->" + "data---->" + datos + "--->" + "cmncmonitreportediariosistema" + "Error--->" + data);
            } else {
                validaContenedorExt2("infomon", "Registro eliminado con exito");
                pageParamTable.row( tableRow ).remove().draw();
            }
        },
        error: function(data) {
            $('#modalLoadin').hide();
            validaContenedorExt("infomon", "Error al Insertar el registro");
            console.log("idtabla---->" + id + "--->" + "data---->" + datos + "--->" + "cmncmonitreportediariosistema" + "Error--->" + data);
        },
    });
    }else
        pageParamTable.row( tableRow ).remove().draw();
}


/*funcion para mapear los datos de la situacion actual del funcionario*/
function getDataEmbarcInfoDia(json) {
    id_cab = $("#idinfodia").val();
    editar    = "<textarea id='textAEmb_"+json[0].id+"' hidden></textarea><a href='#obserEmbarcPop'  data-stackbox='true' data-stackbox-width='1000px' data-stackbox-height='300px' data-stackbox-position='absolute' onClick='verDetalleTablaEmbarInfoDia(\""+ json[0].id + "\",\""+ json[0].nombre + "\",0);'><i class='fa fa-edit text-green btn_edit' ></i></a>";
    eliminar  = "<a class='delete' id_detalle='' id_cabecera='"+id_cab+"' embarcacion_id='"+json[0].id+"' onClick='deleteTablaEmbarInfoDia(this);'><i class='fa fa-trash text-green btn_edit'></i></a>";
    var dTable = $('#tabla_embar').DataTable({
                                              "destroy": true
                                            } );
    dTable.row.add([
        1,
        json[0].nombre,
        editar,
        eliminar
    ]).draw();

    dTable.on( 'order.dt search.dt', function () {
        dTable.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();

    validaContenedorExt2("infDia", "Registro insertado con exito");
}

function deleteTablaEmbarInfoDia(trthis){

    var pageParamTable = $('#tabla_embar').DataTable();
    var tableRow = pageParamTable.row($(trthis).parents('tr'));
    id_detalle = $(trthis).attr("id_detalle");
    
    //console.log(id_detalle);
    if(id_detalle){
        datos = '{"estado":"I","eliminado":"t"}';
        $.ajax({
        url: "update_General",
        type: "get",
        cache: 'false',
        data: {
            "dj_url": "cmncmonitreportediarioembarcaciones",
            "idtabla": id_detalle,
            "data": JSON.stringify(datos)
        },
        dataType: "json",

        success: function(data) {
            if (data.id == undefined) {
                $('#modalLoadin').hide();
                validaContenedorExt("infomon", "Error al Insertar el registro");
                console.log("idtabla---->" + id + "--->" + "data---->" + datos + "--->" + "cmncmonitreportediarioembarcaciones" + "Error--->" + data);
            } else {
                validaContenedorExt2("infomon", "Registro eliminado con exito");
                pageParamTable.row( tableRow ).remove().draw();
            }
        },
        error: function(data) {
            $('#modalLoadin').hide();
            validaContenedorExt("infomon", "Error al Insertar el registro");
            console.log("idtabla---->" + id + "--->" + "data---->" + datos + "--->" + "cmncmonitreportediarioembarcaciones" + "Error--->" + data);
        },
    });
    }else
        pageParamTable.row( tableRow ).remove().draw();
}



function addCamaraInfoDario(){
    conta = 0;
    datos = '';

    camara_id = $("#ScamaraRev").val();
    camara    = $("#ScamaraRev option:selected").text();

    $('.pregunta').each(function() {
       pregunta_id = $(this).attr("pregunta_id");
       respuesta   = $(this).prop( "checked" );

        if(respuesta)
            respF = 't';
        else
            respF = 'f';

        datos+= pregunta_id+':'+respF+'|';
    });
    console.log(datos);

    id_cab = $("#idinfodia").val();
    iddetalletrx = $("#iddetalleTrxCam").val();

    if(iddetalletrx == "")
        editar  = "<a class='editar' id_detalle='"+iddetalletrx+"' id_cabecera='"+id_cab+"' camara_id='"+camara_id+"' preguntas_resp='"+datos+"' href='#camarasPop' data-stackbox='true' data-stackbox-width='1000px' data-stackbox-height='300px' data-stackbox-position='absolute' onClick='editarTablaCamaraInfoDia(this);'><i class='fa fa-edit text-green btn_edit'></i></a>";
    else
        editar  = "<a class='editar' id_detalle='"+iddetalletrx+"' id_cabecera='"+id_cab+"' camara_id='"+camara_id+"' preguntas_resp='"+datos+"' href='#camarasPop' data-stackbox='true' data-stackbox-width='1000px' data-stackbox-height='300px' data-stackbox-position='absolute' onClick='editarTablaCamaraInfoDia(this,\""+ iddetalletrx + "\");'><i class='fa fa-edit text-green btn_edit'></i></a>";
       
    eliminar  = "<a class='delete' id_detalle='"+iddetalletrx+"' id_cabecera='"+id_cab+"' camara_id='"+camara_id+"' onClick='deleteTablaCamaraInfoDia(this);'><i class='fa fa-trash text-green btn_edit'></i></a>";
    
    tipotrx = $("#tipoTrxCam").val();

    if(tipotrx == 0){
        var dTable = $('#tabla_camaras').DataTable({ "destroy": true } );
        dTable.row.add([
            1,
            camara,
            editar,
            eliminar
        ]).draw();

        dTable.on( 'order.dt search.dt', function () {
            dTable.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                cell.innerHTML = i+1;
            } );
        } ).draw();

        validaContenedorExt2("infDia", "Registro insertado con exito");
    }else{
        indice = $("#idxTrxCam").val();
        var dTable = $('#tabla_camaras').DataTable();
        console.log(indice)
        dTable.row(indice).data( [
            (parseInt(indice)+1),
            camara,
            editar,
            eliminar
        ] ).draw();
        
        validaContenedorExt2("infDia", "Registro Actualizado con exito");
    }
    
}

function editarTablaCamaraInfoDia(thistr,idtrx){
    limpiarPopupCamaraInfDia();
    console.log($(thistr).parents('tr').index());
    $("#idxTrxCam").val($(thistr).parents('tr').index());
    $("#tipoTrxCam").val(1);
    if(idtrx)
        $("#iddetalleTrxCam").val(idtrx);
    else
        $("#iddetalleTrxCam").val('');
    preguntas_resp = $(thistr).attr("preguntas_resp");
    camara_id = $(thistr).attr("camara_id");
    $("#ScamaraRev").val(camara_id).trigger("change");
    console.log(preguntas_resp);

    arratPreg = preguntas_resp.split("|");
    if(arratPreg.length >0 ){
        $('.pregunta').each(function() {
            pregunta_id = $(this).attr("pregunta_id");
            //respuesta   = $(this).prop( "checked" );
            band = 0;
            for(i = 0; i< arratPreg.length; i++){
                dataArray = arratPreg[i].split(":");
                if(dataArray[0] == pregunta_id){
                    if(dataArray[1]=='t')
                        $(this).prop( "checked",true );
                    else
                        $(this).prop( "checked",false );
                    band = 1;
                }
                if(band == 1)
                    break;
            }
        });
    }
}

function deleteTablaCamaraInfoDia(trthis){

    var pageParamTable = $('#tabla_camaras').DataTable();
    var tableRow = pageParamTable.row($(trthis).parents('tr'));
    id_detalle = $(trthis).attr("id_detalle");
    
    //console.log(id_detalle);
    if(id_detalle){
        datos = '{"estado":"I","eliminado":"t"}';
        $.ajax({
        url: "update_General",
        type: "get",
        cache: 'false',
        data: {
            "dj_url": "cmncmonitreportediariocamaras",
            "idtabla": id_detalle,
            "data": JSON.stringify(datos)
        },
        dataType: "json",

        success: function(data) {
            if (data.id == undefined) {
                $('#modalLoadin').hide();
                validaContenedorExt("infomon", "Error al Insertar el registro");
                console.log("idtabla---->" + id + "--->" + "data---->" + datos + "--->" + "cmncmonitreportediariocamaras" + "Error--->" + data);
            } else {
                validaContenedorExt2("infomon", "Registro eliminado con exito");
                pageParamTable.row( tableRow ).remove().draw();
            }
        },
        error: function(data) {
            $('#modalLoadin').hide();
            validaContenedorExt("infomon", "Error al Insertar el registro");
            console.log("idtabla---->" + id + "--->" + "data---->" + datos + "--->" + "cmncmonitreportediariocamaras" + "Error--->" + data);
        },
    });
    }else
        pageParamTable.row( tableRow ).remove().draw();
}

function limpiarPopupCamaraInfDia(){
     jQuery('#bodycamarasPop').find(':input').each(function() {
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

    $("#tipoTrxCam").val(0);
    $("#iddetalleTrxCam").val('');
}

function limpiaPopupEmbObs(){
     jQuery('#bodypopupobserEmbarc').find(':input').each(function() {
        switch(this.type) {
            case 'password':
            case 'text':
            case 'textarea':
            case 'file':
            case 'select-one':
            case 'select-multiple':
            case 'date':
            case 'datetime-local':
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

     $("#idxTrxObsEmbar").val(0);
     $("#tipoTrxObsEmbar").val(0);
}


function addTablaObsEmbarInfoDario(){


    id_cab = $("#idinfodia").val();
    
    actividad    = $('#SactividadObsEmb option:selected').text();
    actividadid  = $('#SactividadObsEmb').val();
    sitio        = $('#SsitioObsEmb option:selected').text();
    sitioid      = $('#SsitioObsEmb').val();
    fechaObsEmb  = $('#fechaObsEmb').val();
    observEmb    = $('#observacionObsEmb').val();

    datos='{';
    datos += ' "actividad_id":"' + actividadid + '",';
    datos += ' "sitio_id":"' + sitioid + '",';
    datos += ' "fecha":"' + fechaObsEmb + '",';
    datos += ' "observacion":"' + observEmb + '"';
    datos+='}';

    //$('#dataEmbarObserv').val(datos);

    /*datos = "["+datos+"]";
    datosJson = JSON.parse(datos);*/


    eliminar  = "<a class='delete' id_detalle='' id_cabecera='"+id_cab+"' id_actividad='"+actividadid+"' id_sitio='"+sitioid+"' onclick='deleteObsEmbarInfoDiario(this);'><i class='fa fa-trash text-green btn_edit'></i></a>";
    editar    = "<a class='editar' id_detalle='' id_cabecera='"+id_cab+"' id_actividad='"+actividadid+"' id_sitio='"+sitioid+"' href='#popupobserEmbarc' data-stackbox='true' data-stackbox-width='1000px' data-stackbox-height='300px' data-stackbox-position='absolute' onClick='editarTablaObsEmbarInfoDia(this);'><i class='fa fa-edit text-green btn_edit'></i></a>";


    datosDet='{';
    datosDet += ' "actividad_id":"' + actividad + '",';
    datosDet += ' "sitio_id":"' + sitio + '",';
    datosDet += ' "fecha_reporte":"' + fechaObsEmb + '",';
    datosDet += ' "observacion":"' + observEmb + '",';
    datosDet += ' "editar":"' + editar + '",';
    datosDet += ' "eliminar":"' + eliminar + '"';
    datosDet+='}';


    datosDet = "["+datosDet+"]";
    camposJson = JSON.parse(datosDet);
    //console.log( camposJson["orden"]);
    var dTable = $('#tabla_embarObser').DataTable({"destroy": true,"order": [[ 1, 'asc' ]]});
    console.log($("#tipoTrxObsEmbar").val());
    if($("#tipoTrxObsEmbar").val() == 0){
   
        
        dTable.row.add([
                1,
                camposJson[0].actividad_id,
                camposJson[0].sitio_id,
                camposJson[0].fecha_reporte,
                camposJson[0].observacion,
                camposJson[0].editar,
                camposJson[0].eliminar
        ]).draw();

        dTable.on( 'order.dt search.dt', function () {
            dTable.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                cell.innerHTML = i+1;
            } );
        } ).draw();

        validaContenedorExt2("infDia", "Registro insertado con exito");   
    }else{
        indice = $("#idxTrxObsEmbar").val();
        dTable.row(indice).data( [
                1,
                camposJson[0].actividad_id,
                camposJson[0].sitio_id,
                camposJson[0].fecha_reporte,
                camposJson[0].observacion,
                camposJson[0].editar,
                camposJson[0].eliminar
        ] ).draw();
    }

}

function deleteObsEmbarInfoDiario(trthis){

    var pageParamTable = $('#tabla_embarObser').DataTable();
    var tableRow = pageParamTable.row($(trthis).parents('tr'));
    id_detalle = $(trthis).attr("id_detalle");
    
    //console.log(id_detalle);
    if(id_detalle){
        datos = '{"estado":"I","eliminado":"t"}';
        $.ajax({
        url: "update_General",
        type: "get",
        cache: 'false',
        data: {
            "dj_url": "cmncmonitreportediariosistema",
            "idtabla": id_detalle,
            "data": JSON.stringify(datos)
        },
        dataType: "json",

        success: function(data) {
            if (data.id == undefined) {
                $('#modalLoadin').hide();
                validaContenedorExt("infomon", "Error al Insertar el registro");
                console.log("idtabla---->" + id + "--->" + "data---->" + datos + "--->" + "cmncmonitreportediariosistema" + "Error--->" + data);
            } else {
                validaContenedorExt2("infomon", "Registro eliminado con exito");
                pageParamTable.row( tableRow ).remove().draw();
            }
        },
        error: function(data) {
            $('#modalLoadin').hide();
            validaContenedorExt("infomon", "Error al Insertar el registro");
            console.log("idtabla---->" + id + "--->" + "data---->" + datos + "--->" + "cmncmonitreportediariosistema" + "Error--->" + data);
        },
    });
    }else
        pageParamTable.row( tableRow ).remove().draw();
}


function editarTablaObsEmbarInfoDia(thisr){
    limpiaPopupEmbObs();

    
    console.log($(thisr).parents('tr').index());
    $("#idxTrxObsEmbar").val($(thisr).parents('tr').index());
    $("#tipoTrxObsEmbar").val(1);

    actividad = $(thisr).attr("id_actividad");
    sitio     = $(thisr).attr("id_sitio");

    fila = $(thisr).parents('tr');
    var celdas = $(fila).find("td"); //devolverá las celdas de una fila
            
    fecha  = $(celdas[3]).text();
    observacion   = $(celdas[4]).text();

    console.log(fecha);

    $('#SactividadObsEmb').val(actividad).trigger("change");
    $('#SsitioObsEmb').val(sitio);
    $('#fechaObsEmb').val(fecha);
    $('#observacionObsEmb').val(observacion);
    
}


function grabarTablaObsEmbDetalleInfoDia(){
    id_emb = $("#idembarcacionObs").val();
    id_cab = $("#idinfodia").val();
    datosDet = '';
    var filas = $("#tabla_embarObser").find("tr"); //devulve las filas del body de tu tabla segun el ejemplo que brindaste
    var resultado = "";
    for(i=1; i<filas.length; i++){ //Recorre las filas 1 a 1
        var celdas = $(filas[i]).find("td"); //devolverá las celdas de una fila
        
        fecha  = $(celdas[3]).text();
        observacion  = $(celdas[4]).text();
        actividad  = $($(celdas[5]).children("a")[0]).attr("id_actividad");
        sitio      = $($(celdas[5]).children("a")[0]).attr("id_sitio");
        id_detalle = $($(celdas[5]).children("a")[0]).attr("id_detalle");

        datosDet  += '{"fecha_reporte":"' + fecha + '", ';
        datosDet  += '"embarcacion_id":"' + id_emb + '", ';
        datosDet  += '"observaciones":"' + observacion + '", ';
        datosDet  += '"actividad_id":"' + actividad + '", ';
        datosDet  += '"sitio_id":"' + sitio + '" ';

        if($("#tipoID").val() == 1){
            datosDet  += ',"reporte_id":"' + id_cab + '"';
            if((id_detalle == null)||(id_detalle == ""))
                datosDet  += '';
            else
                datosDet  += ',"id":"' + id_detalle + '"';   
        }

        datosDet  += '},';            
    }

    datosDet = datosDet.substring(0, datosDet.length - 1);  

    $("#textAEmb_"+id_emb).val(datosDet);
}


function verDetalleTablaEmbarInfoDia(idembar,nombreEmb,tipo){
    console.log(idembar);
    $("#idembarcacionObs").val(idembar);
    $("#tituloNombreEmbar").html(nombreEmb);

    id_cab = $("#idinfodia").val();

    datosDet = $("#textAEmb_"+idembar).val();
    tabla = '';
    console.log(datosDet);
    /*limpiar la tabla*/
    $('#tabla_embarObser').dataTable().fnClearTable();
    $('#tabla_embarObser').dataTable().fnDestroy();
    $("#bodytabla_embarObser").html("");

    if(tipo == 0){
        if(datosDet != ""){
            datosDet = "["+datosDet+"]";
            camposJson = JSON.parse(datosDet);
            for (i = 0; i < camposJson.length; i++) {

                eliminar  = "<a class='delete' id_detalle='' id_cabecera='"+id_cab+"' id_actividad='"+camposJson[i].actividad_id+"' id_sitio='"+camposJson[i].sitio_id+"' onclick='deleteObsEmbarInfoDiario(this);'><i class='fa fa-trash text-green btn_edit'></i></a>";
                editar    = "<a class='editar' id_detalle='' id_cabecera='"+id_cab+"' id_actividad='"+camposJson[i].actividad_id+"' id_sitio='"+camposJson[i].sitio_id+"' href='#popupobserEmbarc' data-stackbox='true' data-stackbox-width='1000px' data-stackbox-height='300px' data-stackbox-position='absolute' onClick='editarTablaObsEmbarInfoDia(this);'><i class='fa fa-edit text-green btn_edit'></i></a>";

                tabla += "<tr>";
                tabla += "<td align='center'>" + (i+1) + "</td>";
                tabla += "<td align='left'>" + $("#SactividadObsEmb option[value='" + camposJson[i].actividad_id + "']").text() + "</td>";
                tabla += "<td align='left'>" + $("#SsitioObsEmb option[value='" + camposJson[i].sitio_id + "']").text() + "</td>";
                tabla += "<td align='center'>" + camposJson[i].fecha_reporte + "</td>";
                tabla += "<td align='left'>" + camposJson[i].observaciones + "</td>";
                tabla += "<td align='center'>"+editar+"</td>";
                tabla += "<td align='center'>"+eliminar+"</td>";
                tabla += "</tr>";
            }
        }
    }else{
        if(datosDet != ""){
            datosDet = "["+datosDet+"]";
            camposJson = JSON.parse(datosDet);
            for (i = 0; i < camposJson.length; i++) {

                eliminar  = "<a class='delete' id_detalle='"+camposJson[i].id+"' id_cabecera='"+id_cab+"' id_actividad='"+camposJson[i].actividad_id+"' id_sitio='"+camposJson[i].sitio_id+"' onclick='deleteObsEmbarInfoDiario(this);'><i class='fa fa-trash text-green btn_edit'></i></a>";
                editar    = "<a class='editar' id_detalle='"+camposJson[i].id+"' id_cabecera='"+id_cab+"' id_actividad='"+camposJson[i].actividad_id+"' id_sitio='"+camposJson[i].sitio_id+"' href='#popupobserEmbarc' data-stackbox='true' data-stackbox-width='1000px' data-stackbox-height='300px' data-stackbox-position='absolute' onClick='editarTablaObsEmbarInfoDia(this);'><i class='fa fa-edit text-green btn_edit'></i></a>";

                arrfecha = camposJson[i].fecha_reporte.split("T");
                horaIni = arrfecha[1].split(":");

                tabla += "<tr>";
                tabla += "<td align='center'>" + (i+1) + "</td>";
                tabla += "<td align='left'>" + $("#SactividadObsEmb option[value='" + camposJson[i].actividad_id + "']").text() + "</td>";
                tabla += "<td align='left'>" + $("#SsitioObsEmb option[value='" + camposJson[i].sitio_id + "']").text() + "</td>";
                tabla += "<td align='center'>" + arrfecha[0]+"T"+horaIni[0]+":"+horaIni[1] + "</td>";
                tabla += "<td align='left'>" + camposJson[i].observaciones + "</td>";
                tabla += "<td align='center'>"+editar+"</td>";
                tabla += "<td align='center'>"+eliminar+"</td>";
                tabla += "</tr>";
            }
        }
    }
    $("#bodytabla_embarObser").append(tabla);

    var table = $('#tabla_embarObser').DataTable({
        orderCellsTop: true
    });
}

function setInsertUpdateDataInfoDiario(){
    /*datos cabecera*/
    titulo            = $("#tituloID").val();
    fechaelab         = $("#fechaelabID").val();
    fechadesde        = $("#fechadesdeID").val();
    fechahasta        = $("#fechahastaID").val();
    funcionario_de    = $("#idfuncionario_de").val();
    funcionario_para  = $("#idfuncionario_para").val();
    funcionario_info1 = $("#idfuncionario_info1").val();
    funcionario_info2 = $("#idfuncionario_info2").val();

    recomendaciones = tinyMCE.get('ci_recomID').getContent();
    observaciones   = tinyMCE.get('ci_obserID').getContent();

    datos = '{';
    datos += '"titulo":"' + titulo + '", ';
    datos += '"fecha_reporte":"' + fechaelab + '", ';
    datos += '"fecha_desde":"' + fechadesde + '", ';
    datos += '"fecha_hasta":"' + fechahasta + '", ';
    datos += '"funcionario_id_de":"' + funcionario_de + '", ';
    datos += '"funcionario_id_para":"' + funcionario_para + '", ';
    datos += '"funcionario_id_cc1":"' + funcionario_info1 + '", ';
    datos += '"funcionario_id_cc2":"' + funcionario_info2 + '", ';
    datos += '"conclusiones":"' + recomendaciones + '", ';
    datos += '"observaciones":"' + observaciones + '", ';


    /*datos camara*/
    datosCamara = '';
    var filas = $("#tabla_camaras").find("tr"); //devulve las filas del body de tu tabla segun el ejemplo que brindaste
    for(i=1; i<filas.length; i++){ //Recorre las filas 1 a 1
        var celdas = $(filas[i]).find("td"); //devolverá las celdas de una fila       
        camara_id   = $($(celdas[3]).children("a")[0]).attr("camara_id");
        id_detalle  = $($(celdas[3]).children("a")[0]).attr("id_detalle");
        preguntas   = $($(celdas[2]).children("a")[0]).attr("preguntas_resp");
        verificar   = $(celdas[0]).text();
        resp = verificar.indexOf("No");
        if(resp == -1){
            datosCamara  += '{"camara_id":"' + camara_id + '",';
            datosCamara  += '"preguntas":"' + preguntas + '"';

            if($("#tipoID").val() == 1){
                datosCamara  += ',"reporte_id":"' + $("#idinfodia").val() + '"';
                if((id_detalle == null)||(id_detalle == ""))
                    datosCamara  += '';
                else
                    datosCamara  += ',"id":"' + id_detalle + '"';
            }
            datosCamara  += '},';  
        }          
    }
    datosCamara = datosCamara.substring(0, datosCamara.length - 1);

    /*datos Sistema*/
    datosSistema = '';
    var filas = $("#tabla_revision").find("tr"); //devulve las filas del body de tu tabla segun el ejemplo que brindaste
    for(i=1; i<filas.length; i++){ //Recorre las filas 1 a 1
        var celdas = $(filas[i]).find("td"); //devolverá las celdas de una fila       
        sistema_id  = $($(celdas[3]).children("a")[0]).attr("id_sistema");
        estado_id   = $($(celdas[3]).children("a")[0]).attr("id_estado");
        id_detalle  = $($(celdas[3]).children("a")[0]).attr("id_detalle");
        verificar   = $(celdas[0]).text();
        resp = verificar.indexOf("No");

        datosSistema  += '{"sistema_id":"' + sistema_id + '",';
        datosSistema  += '"estado_id":"' + estado_id + '"';
        if(resp == -1){
            if($("#tipoID").val() == 1){
                datosSistema  += ',"reporte_id":"' + $("#idinfodia").val() + '"';
                if((id_detalle == null)||(id_detalle == ""))
                    datosSistema  += '';
                else
                    datosSistema  += ',"id":"' + id_detalle + '"';
            }
            datosSistema  += '},';  
        }          
    }
    datosSistema = datosSistema.substring(0, datosSistema.length - 1);

    /*datos Embarcacion Observacion*/
    datosEmbObs = '';
    var filas = $("#tabla_embar").find("tr"); //devulve las filas del body de tu tabla segun el ejemplo que brindaste
    for(i=1; i<filas.length; i++){ //Recorre las filas 1 a 1
        var celdas = $(filas[i]).find("td"); //devolverá las celdas de una fila       
        embarcacion_id  = $($(celdas[3]).children("a")[0]).attr("embarcacion_id");
        dataTextArea = $("#textAEmb_"+embarcacion_id).val();
        datosEmbObs  += dataTextArea+',';
         
    }
    datosEmbObs = datosEmbObs.substring(0, datosEmbObs.length - 1);

    /*datos imagenes*/
    datosFotos = '';
    var filas = $("#tablafotos_repID").find("tr"); //devulve las filas del body de tu tabla segun el ejemplo que brindaste
    for(i=1; i<filas.length; i++){ //Recorre las filas 1 a 1
        var celdas = $(filas[i]).find("td"); //devolverá las celdas de una fila       
        orden  = $($(celdas[0]).children("input")[0]).val();;
        foto   = $(celdas[3]).text();
        titulo = $(celdas[1]).text();
        verificar   = $(celdas[0]).text();
        resp = verificar.indexOf("No");
        id_detalle  = $($(celdas[4]).children("a")[0]).attr("id_detalle");

        if(resp == -1){
            datosFotos  += '{"orden":"' + orden + '", ';
            datosFotos  += '"imagen":"' + foto + '", ';
            datosFotos  += '"titulo":"' + titulo + '" ';

            if($("#tipoID").val() == 1){
                datosFotos  += ',"reporte_id":"' + $("#idinfodia").val() + '"';
                if((id_detalle == null)||(id_detalle == ""))
                    datosFotos  += '';
                else
                    datosFotos  += ',"id":"' + id_detalle + '"';
            }
            datosFotos  += '},';   
        }         
    }
    datosFotos = datosFotos.substring(0, datosFotos.length - 1);

    /*datos detedtadas*/
    datosDetec = '';
    var filas = $("#tablaembfuera").find("tr"); //devulve las filas del body de tu tabla segun el ejemplo que brindaste
    for(i=1; i<filas.length; i++){ //Recorre las filas 1 a 1
        var celdas = $(filas[i]).find("td"); //devolverá las celdas de una fila       
        cantidad   = $(celdas[2]).text();
        verificar   = $(celdas[0]).text();
        resp = verificar.indexOf("No");

        id_detalle   = $($(celdas[3]).children("a")[0]).attr("id_detalle");
        id_actividad = $($(celdas[3]).children("a")[0]).attr("id_actividad");
        if(resp == -1){
            datosDetec  += '{"cantidad":"' + cantidad + '", ';
            datosDetec  += '"tipo_embarcacion_id":"' + id_actividad + '", ';
            datosDetec  += '"tipo":"F" ';

            if($("#tipoID").val() == 1){
                datosDetec  += ',"reporte_id":"' + $("#idinfodia").val() + '"';
                if((id_detalle == null)||(id_detalle == ""))
                    datosDetec  += '';
                else
                    datosDetec  += ',"id":"' + id_detalle + '"';
            }
            datosDetec  += '},';
        }           
    }

    //datosDetec = '';
    var filas = $("#tablaembdentro").find("tr"); //devulve las filas del body de tu tabla segun el ejemplo que brindaste
    for(i=1; i<filas.length; i++){ //Recorre las filas 1 a 1
        var celdas = $(filas[i]).find("td"); //devolverá las celdas de una fila  
        verificar   = $(celdas[0]).text();
        resp = verificar.indexOf("No");  
        cantidad   = $(celdas[2]).text();
        //comentario  = $(celdas[3]).text(); pendienteeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        id_detalle   = $($(celdas[3]).children("a")[0]).attr("id_detalle");
        id_actividad = $($(celdas[3]).children("a")[0]).attr("id_actividad");

        if(resp == -1){
            datosDetec  += '{"cantidad":"' + cantidad + '", ';
            datosDetec  += '"tipo_embarcacion_id":"' + id_actividad + '", ';
            datosDetec  += '"tipo":"D" ';

            if($("#tipoID").val() == 1){
                datosDetec  += ',"reporte_id":"' + $("#idinfodia").val() + '"';
                if((id_detalle == null)||(id_detalle == ""))
                    datosDetec  += '';
                else
                    datosDetec  += ',"id":"' + id_detalle + '"';
            }
            datosDetec  += '},';  
        }
    }
    datosDetec = datosDetec.substring(0, datosDetec.length - 1);

    datos += ' "det_camaras":[' + datosCamara + '],';
    datos += ' "det_sistema":[' + datosSistema + '],';
    datos += ' "det_embarcacionesact":[' + datosEmbObs + '],';
    datos += ' "det_imagenes":[' + datosFotos + '],';
    datos += ' "det_embarcaciones":[' + datosDetec + ']';

    datos += '}';

    console.log(datos);
    if($("#tipoID").val() == 0)
        insertarCabDetInfoDiario(datos);
    else
        updateCabDetInfoDiario(datos);
}

function insertarCabDetInfoDiario(datos){

    $("#modalLoadin").show();
    dj_url = "cmncabdetreportediario";
    $.ajax({
        url: "insert_General_post",
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
                console.log("data---->" + datos + "--->" + "cmncabdetreportediario" + "Error--->" + data);
            } else {
                swal("", "Registro insertado con Exito", "success");
                getInformesDiarioCabCuso();
                $('#modalLoadin').hide();
            }
        },
        error: function(data) {
            $('#modalLoadin').hide();
            swal("", "Error al Insertar el registro", "error");
            console.log("data---->" + datos + "--->" + "cmncabdetreportediario" + "Error--->" + data);
        },
    });
}

function updateCabDetInfoDiario(datos){
    $("#modalLoadin").show();
    dj_url = "cmncabdetreportediario";
    $.ajax({
        url: "update_General_post",
        type: 'post',
        cache: 'false',
        data: {
            "dj_url": dj_url,
            "idtabla": $("#idinfodia").val(),
            "data": JSON.stringify(datos)
        },
        dataType: "json",
        success: function(data) {
            if (data.id == undefined) {
                $('#modalLoadin').hide();
                validaContenedorExt("infDia","Error al Actualizar el registro","error");
                //swal("", "Error al Actualizar el registro", "error");
                console.log("data---->" + datos + "--->" + "cmncabdetreportediario" + "Error--->" + data);
            } else {
                $("#modalLoadin").hide();
                swal("", "Registro Actualizados con Exito", "success");      
            }
        },
        error: function(data) {
            $("#modalLoadin").hide();
            //swal("", "Error al Actualizar el registro", "error");
            validaContenedorExt("infDia","Error al Actualizar el registro","error");
            console.log("data---->" + datos + "--->" + "cmncabdetreportediario" + "Error--->" + data);
        },
    });
}


//passar el id embarcacion desde el primer popoup
//hacer q el dato se guarde en le text area
//hacer pruebas para q el editar tome los datos q existe en el texarea

function getDataInfoDiario(id){
    //limpiarFormInfoDiario(); crear
    $("#modalLoadin").show();
    novedadessJson = [];
   
    limpiarFormEmbObs();

    console.log(id);
    $.ajax({
        url: "data_infoDiarioCab",
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
                $("#tipoID").val(1);
                $("#idinfodia").val(json[0].id);
                
                $("#tituloID").val(json[0].titulo);
                arrfecha1 = json[0].fecha_reporte.split("T");
                horaIni = arrfecha1[1].split(":");
                $("#fechaelabID").val(arrfecha1[0]+"T"+horaIni[0]+":"+horaIni[1]);
                arrfecha2 = json[0].fecha_desde.split("T");
                horaIni2 = arrfecha2[1].split(":");
                $("#fechadesdeID").val(arrfecha2[0]+"T"+horaIni2[0]+":"+horaIni2[1]);
                arrfecha3 = json[0].fecha_hasta.split("T");
                horaIni3 = arrfecha3[1].split(":");
                $("#fechahastaID").val(arrfecha3[0]+"T"+horaIni3[0]+":"+horaIni3[1]);
                $("#idfuncionario_de").val(json[0].funcionario_id_de.id);
                $("#idfuncionario_para").val(json[0].funcionario_id_para.id);
                $("#idfuncionario_info1").val(json[0].funcionario_id_cc1.id);
                $("#idfuncionario_info2").val(json[0].funcionario_id_cc2.id);
                $("#funcionario_de").val(json[0].funcionario_id_de.persona_id.nombre_completo);
                $("#funcionario_para").val(json[0].funcionario_id_para.persona_id.nombre_completo);
                $("#funcionario_info1").val(json[0].funcionario_id_cc1.persona_id.nombre_completo);
                $("#funcionario_info2").val(json[0].funcionario_id_cc2.persona_id.nombre_completo);

                $("#nroID").val(json[0].num_reporte);
                $("#secInfDiario").val(json[0].num_reporte);
  
                if(json[0].conclusiones != ""){
                    //initEditor("ci_introSA");
                    tinymce.get("ci_recomID").setContent(json[0].conclusiones);
                }
                if(json[0].observaciones != ""){
                    //initEditor("ci_objSA");
                    tinymce.get("ci_obserID").setContent(json[0].observaciones);
                }
                
               //*datos imagenes*/
                if(json[0].det_imagenes.length > 0){
                    datosImg = '';
                    for(i=0; i< json[0].det_imagenes.length; i++){                        
                        if(json[0].det_imagenes[i].estado == 'A'){
                            
                            orden = json[0].det_imagenes[i].orden;
                            foto  = json[0].det_imagenes[i].imagen;
                            titulo  = json[0].det_imagenes[i].titulo;
                            descripcion  = json[0].det_imagenes[i].descripcion;
                            imagen  = "<a rel='gallery' class='fancybox' href='static/media/cuso_marino"+json[0].num_reporte+json[0].det_imagenes[i].foto+"'><img src='static/media/cuso_marino/"+json[0].num_reporte+json[0].det_imagenes[i].foto+"' style='width:20px;'></a>";

                            eliminar  = "<a class='delete' id_detalle='"+json[0].det_imagenes[i].id+"' id_cabecera='"+json[0].id+"' onclick='deleteDataEmbarcacionActividad(this);'><i class='fa fa-trash text-green btn_edit'></i></a>";
                            editar    = "<textarea hidden>"+descripcion+"</textarea><a class='editarID' id_detalle='"+json[0].det_imagenes[i].id+"' id_cabecera='"+json[0].id+"' onclick='editDataEmbarcacionActividad(this);'><i class='fa fa-edit text-green btn_edit'></i></a>";

                            datosImg  += '{';
                            datosImg  += '"orden":"<input type=\'text\' style=\'width:50px;\' onkeypress=\'return isNumberKey(event);\' value=\''+ orden + '\'/>", ';
                            datosImg  += '"titulo":"' + titulo  + '", ';
                            datosImg  += '"imagen":"' + imagen  + '",'; 
                            datosImg  += '"editar":"' + editar  +'",';
                            datosImg  += '"eliminar":"' + eliminar  +'"';
                            datosImg  += '},';    

                        }
                    }
                    datosImg = datosImg.substring(0, datosImg.length - 1);
                    datosImg = "["+datosImg+"]";
                    imgJson = JSON.parse(datosImg);
                    
                }
                var dTable = $('#tablafotos_repID').DataTable({  
                    "destroy": true,
                    data :imgJson,
                    columns: [
                        {"data" : "orden", className: "uniqueClassName" },
                        {"data" : "titulo", className: "uniqueClassName" },
                        
                        {"data" : "imagen", className: "uniqueClassName" },
                        {"data" : "editar", className: "uniqueClassName" },   
                        {"data" : "eliminar", className: "uniqueClassName" }          
                    ],
                });

                $(".fancybox").fancybox();

/*embarcaciones detectadas*/
                if(json[0].det_embarcaciones.length > 0){
                    datosDetF = '';
                    datosDetD = '';
                    conta1 = 1;
                    conta2 = 1;
                    for(i=0; i< json[0].det_embarcaciones.length; i++){  
                        if(json[0].det_embarcaciones[i].estado == 'A'){
                            if(json[0].det_embarcaciones[i].tipo == 'F'){
                                eliminar  = "<a class='delete' id_detalle='"+json[0].det_embarcaciones[i].id+"' id_cabecera='"+json[0].id+"' id_actividad='"+json[0].det_embarcaciones[i].tipo_embarcacion_id.id+"' onclick='deleteDataTipoEmbDetectada(this,1);'><i class='fa fa-trash text-green btn_edit'></i></a>";  
                                datosDetF  += '{';
                                datosDetF  += '"numero":"' + conta1 + '", ';
                                datosDetF  += '"cantidad":"' + json[0].det_embarcaciones[i].cantidad + '", ';
                                datosDetF  += '"tipo_embarcacion_id":"' + json[0].det_embarcaciones[i].tipo_embarcacion_id.id  + '", ';
                                datosDetF  += '"embarcacion":"' + json[0].det_embarcaciones[i].tipo_embarcacion_id.nombre + '", ';
                                datosDetF  += '"eliminar":"' + eliminar  +'"';
                                datosDetF  += '},'; 
                                conta1 = conta1+1;
                            }else{
                                eliminar  = "<a class='delete' id_detalle='"+json[0].det_embarcaciones[i].id+"' id_cabecera='"+json[0].id+"' id_actividad='"+json[0].det_embarcaciones[i].tipo_embarcacion_id.id+"' onclick='deleteDataTipoEmbDetectada(this,0);'><i class='fa fa-trash text-green btn_edit'></i></a>";
                                datosDetD  += '{';
                                datosDetD  += '"numero":"' + conta2 + '", ';
                                datosDetD  += '"cantidad":"' + json[0].det_embarcaciones[i].cantidad + '", ';
                                datosDetD  += '"tipo_embarcacion_id":"' + json[0].det_embarcaciones[i].tipo_embarcacion_id.id  + '", ';
                                datosDetD  += '"embarcacion":"' + json[0].det_embarcaciones[i].tipo_embarcacion_id.nombre + '", ';
                                datosDetD  += '"eliminar":"' + eliminar  +'"';
                                datosDetD  += '},'; 
                                conta2 = conta2+1;
                            }          
                        }
                    }
                    datosDetF = datosDetF.substring(0, datosDetF.length - 1);
                    datosDetF = "["+datosDetF+"]";
                    novedadesJsonDetF = JSON.parse(datosDetF);

                    datosDetD = datosDetD.substring(0, datosDetD.length - 1);
                    datosDetD = "["+datosDetD+"]";
                    novedadesJsonDetD = JSON.parse(datosDetD);

                    var dTable = $('#tablaembfuera').DataTable({  
                        "destroy": true,
                        data :novedadesJsonDetF,
                        columns: [
                            {"data" : "numero", className: "uniqueClassName" },
                            {"data" : "embarcacion", className: "uniqueClassName" },
                            {"data" : "cantidad", className: "uniqueClassName" },
                            {"data" : "eliminar", className: "uniqueClassName" }          
                        ],
                    });

                    var dTable = $('#tablaembdentro').DataTable({  
                        "destroy": true,
                        data :novedadesJsonDetD,
                        columns: [
                            {"data" : "numero", className: "uniqueClassName" },
                            {"data" : "embarcacion", className: "uniqueClassName" },
                            {"data" : "cantidad", className: "uniqueClassName" },
                            {"data" : "eliminar", className: "uniqueClassName" }          
                        ],
                    });
                    
                }

                /*data sistemas*/
                if(json[0].det_sistema.length > 0){
                    datosSistema = '';
                    cont = 1;
                    for(i=0; i< json[0].det_sistema.length; i++){                        
                        if(json[0].det_sistema[i].estado == 'A'){

                            eliminar  = "<a class='delete' id_detalle='"+json[0].det_sistema[i].id+"' id_cabecera='"+json[0].id+"' id_sistema='"+json[0].det_sistema[i].sistema_id+"' id_estado='"+json[0].det_sistema[i].estado_id+"' onclick='deleteDataSistemaInfoDiario(this);'><i class='fa fa-trash text-green btn_edit'></i></a>";

                            datosSistema  += '{';
                            datosSistema  += '"numero":"' + cont + '", ';
                            datosSistema  += '"sistema_id":"' + json[0].det_sistema[i].sistema_id + '", ';
                            datosSistema  += '"estado_id":"' + json[0].det_sistema[i].estado_id  + '", ';
                            datosSistema  += '"sistema":"' + $("#SsistemaRev option[value='" + json[0].det_sistema[i].sistema_id + "']").text()  + '", ';
                            datosSistema  += '"estado":"' + $("#SestadoRev option[value='" + json[0].det_sistema[i].estado_id + "']").text()  + '", ';
                            datosSistema  += '"eliminar":"' + eliminar  +'"';
                            datosSistema  += '},';    
                            cont++;
                        }
                    }
                    datosSistema = datosSistema.substring(0, datosSistema.length - 1);
                    datosSistema = "["+datosSistema+"]";
                    detSistemaJson = JSON.parse(datosSistema);
                    
                }
                var dTable = $('#tabla_revision').DataTable({  
                    "destroy": true,
                    data :detSistemaJson,
                    columns: [
                        {"data" : "numero", className: "uniqueClassName" },
                        {"data" : "sistema", className: "uniqueClassName" },
                        {"data" : "estado" , className: "uniqueClassName"} ,
                        {"data" : "eliminar", className: "uniqueClassName" }          
                    ],
                });

/*datos camaras*/
                if(json[0].det_camaras.length > 0){
                    datosCamara = '';
                    cont = 1;
                    for(i=0; i< json[0].det_camaras.length; i++){                        
                        if(json[0].det_camaras[i].estado == 'A'){

                            editar    = "<a class='editar' id_detalle='"+json[0].det_camaras[i].id+"' id_cabecera='"+json[0].id+"' camara_id='"+json[0].det_camaras[i].camara_id+"' preguntas_resp='"+json[0].det_camaras[i].preguntas+"' href='#camarasPop' data-stackbox='true' data-stackbox-width='1000px' data-stackbox-height='300px' data-stackbox-position='absolute' onClick='editarTablaCamaraInfoDia(this,\""+ json[0].det_camaras[i].id + "\");'><i class='fa fa-edit text-green btn_edit'></i></a>";
                            eliminar  = "<a class='delete' id_detalle='"+json[0].det_camaras[i].id+"' id_cabecera='"+json[0].id+"' camara_id='"+json[0].det_camaras[i].camara_id+"' onClick='deleteTablaCamaraInfoDia(this);'><i class='fa fa-trash text-green btn_edit'></i></a>";
  
                            var dTable = $('#tabla_camaras').DataTable({ "destroy": true } );
                            dTable.row.add([
                                (i+1),
                                $("#ScamaraRev option[value='" + json[0].det_camaras[i].camara_id + "']").text(),
                                editar,
                                eliminar
                            ]).draw();
                        }
                    }
                    
                }

                /*data embarcaciones actividades*/
           
                if(json[0].det_embarcacionesact.length > 0){
                    arrayAux = json[0].det_embarcacionesact;
                    datosEmbAct = '';
                    cont = 1;
                    var unique = [];
                    var distinct = [];
                    datosArr = '';
                    for( let i = 0; i < json[0].det_embarcacionesact.length; i++ ){
                        if( !unique[json[0].det_embarcacionesact[i].embarcacion_id.id]){
                            
                            datosArr  += '{';
                            datosArr  += '"embarcacion_id":"' + json[0].det_embarcacionesact[i].embarcacion_id.id + '", ';
                            datosArr  += '"embarcacion":"' + json[0].det_embarcacionesact[i].embarcacion_id.nombre + '"';
                            datosArr  += '},';  
                            distinct.push(datosArr);
                            unique[json[0].det_embarcacionesact[i].embarcacion_id.id] = 1;
                        }
                    }
                   // console.log(distinct);
                    
                    datosArr = datosArr.substring(0, datosArr.length - 1);
                    datosEmbAct = "["+datosArr+"]";
                    detJson = JSON.parse(datosEmbAct);
                    console.log(arrayAux);
                    for(i=0; i< detJson.length; i++){ 
                        var filteredNames = arrayAux.filter(function( idx ) {
                            console.log(idx.embarcacion_id.id+"***************"+detJson[i].embarcacion_id);
                            return idx.embarcacion_id.id === detJson[i].embarcacion_id;
                        });
                        console.log(filteredNames);
                        editar    = "<textarea hidden id='textAEmb_"+detJson[i].embarcacion_id+"'>"+detJson[i].descripcion+"</textarea><a href='#obserEmbarcPop'  data-stackbox='true' data-stackbox-width='1000px' data-stackbox-height='300px' data-stackbox-position='absolute' onClick='verDetalleTablaEmbarInfoDia(\""+ detJson[i].embarcacion_id + "\",\""+ detJson[i].embarcacion + "\",1);'><i class='fa fa-edit text-green btn_edit' ></i></a>";
                        eliminar  = "<a class='delete'  id_cabecera='"+json[0].id+"' embarcacion_id='"+detJson[i].embarcacion_id+"' onClick='deleteTablaEmbarInfoDia(this);'><i class='fa fa-trash text-green btn_edit'></i></a>";

                      var dTable = $('#tabla_embar').DataTable({ "destroy": true } );
                        dTable.row.add([
                            (i+1),
                            detJson[i].embarcacion,
                            editar,
                            eliminar
                        ]).draw();

                       datosDet ='';
                        for(x=0; x<filteredNames.length; x++){ //Recorre las filas 1 a 1
                            

                            datosDet  += '{"fecha_reporte":"' + filteredNames[x].fecha_reporte + '", ';
                            datosDet  += '"embarcacion_id":"' + filteredNames[x].embarcacion_id.id + '", ';
                            datosDet  += '"observaciones":"' + filteredNames[x].observaciones + '", ';
                            datosDet  += '"actividad_id":"' + filteredNames[x].actividad_id + '", ';
                            datosDet  += '"sitio_id":"' + filteredNames[x].sitio_id.id + '", ';
                            datosDet  += '"reporte_id":"' + filteredNames[x].reporte_id + '", ';
                            datosDet  += '"id":"' + filteredNames[x].id + '"';
                            datosDet  += '},';            
                        }

                        datosDet = datosDet.substring(0, datosDet.length - 1);  


                        $("#textAEmb_"+detJson[i].embarcacion_id).val(datosDet);
                    }

                     /*el eliminar debe eliminar todo el detalle*/
                    
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


var opt = {
        autoOpen: false,
        draggable: true,
        responsive: true,
        width: '700px',
        classes: {
          "ui-dialog": "ui-window-options",
          "ui-dialog-titlebar": "ui-window-bar"
        },
};

function editDataEmbarcacionActividad(thistr){
    dataTd = $(thistr).parents('td')
    valor  = $($(dataTd).children("textarea")[0]).val();
    console.log(valor);
    //$("#detalleImg").dialog(opt).dialog("open");
    $("#detalleImg").modal(
        {
            backdrop: 'static',
            keyboard: true, 
            show: true
        }
        //'show'
    );
    //addButtons($(".ui-window-options"));
    tinymce.get("textAdetalleImg").setContent(valor);
}
                

function getInformesDiarioCabCuso(dataIni){
    console.log(2222);
    dataC = '';
    var fdesde  = '';;
    var fhasta  = '';;
    if (dataIni) {
        dataC = dataC += "fecha_reporte__range=" + dataIni;
    } else {

        desde = $("#FdesdeinfDia").val();
        hasta = $("#FhastainfDia").val();

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
            dataC += "fecha_reporte__range=" + fdesde + "," + fhasta;
        } else {
            validaContenedorExt("infDia", "No a seleccionado rango de Fechas");
            return 0;
        }
    }

    $.ajax({
        url: "data_infoDiarioCabParamCuso",
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
                    lista += "<li data-jstree='{ \"opened\" : true}'><span style='font-size:12px;'>Informe Diario</span>";
                    lista +="<ul>";
                    for (i = 0; i < data.length; i++) {//,"id_cab":"'+data[i].id+'"                      
                        lista +="<li><a onclick='getDataInfoDiario(\""+data[i].id+"\");'><span style='font-size:10px;'>"+data[i].num_reporte+"</span></a></li>";
                        
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


function limpiarFormEmbObs(){
     jQuery('#infDia').find(':input').each(function() {
        switch(this.type) {
            case 'password':
            case 'text':
            case 'textarea':
            case 'file':
            case 'select-one':
            case 'select-multiple':
            case 'date':
            case 'datetime-local':
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

    tinymce.get("ci_obserID").setContent("");
    tinymce.get("ci_recomID").setContent("");
    tinymce.get("ci_desarrolloID").setContent("");

    $('.nav-tabs a[href="#tab_camAI"]').tab('show');
    $('.nav-tabs a[href="#tab_det"]').tab('show');
    $('.nav-tabs a[href="#tab_fuera"]').tab('show');
    $('.nav-tabs a[href="#tab_obser"]').tab('show');
    $('.nav-tabs a[href="#tab_Gen"]').tab('show');

    $("#tipoID").val(0);/*id transaccion*/
     /*id observacion*/
    $("#idxTrxObsEmbar").val(0);
    $("#tipoTrxObsEmbar").val(0);

    $("#tipoTrxCam").val(0);
    $("#iddetalleTrxCam").val('');

    $('#tabla_camaras').dataTable().fnClearTable();
    $('#tabla_camaras').dataTable().fnDestroy();
    $("#bodytabla_camaras").html("");

    $('#tabla_revision').dataTable().fnClearTable();
    $('#tabla_revision').dataTable().fnDestroy();
    $("#bodytabla_revision").html("");

    $('#tabla_embar').dataTable().fnClearTable();
    $('#tabla_embar').dataTable().fnDestroy();
    $("#bodytabla_embar").html("");

    $('#tablafotos_repID').dataTable().fnClearTable();
    $('#tablafotos_repID').dataTable().fnDestroy();
    $("#bodytablafotos_repID").html("");

    $('#tablaembfuera').dataTable().fnClearTable();
    $('#tablaembfuera').dataTable().fnDestroy();
    $("#bodytablaembfuera").html("");

    $('#tablaembdentro').dataTable().fnClearTable();
    $('#tablaembdentro').dataTable().fnDestroy();
    $("#bodytablaembdentro").html("");
}


