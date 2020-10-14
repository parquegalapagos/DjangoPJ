/*
* Funcion: mask_money.
* Descripcion:  Coloca una mascara de dinero al campo que se envia.
* Parametros:
*   - param(String): B(Borrador),INICIAR_TRAMITE(Inicia el tramite).
*   - prefijo(String): Prefijo del formulario ''(IniciarTramite), BE(BandejaEntrada),ET(Estado Tramite)     
*/

//var hora_actual = moment().format('HH:mm:ss');
var sitios_turista = new Array(); /*Registro de los sitios de visita del turista*/
var copy_sitios_turista = new Array();

var registro_pesca = new Array(); /*Registro de pesca, especie, unidad y peso*/ 
var copy_registro_pesca = new Array();

var sitios_patrullaje = new Array(); /*Registro de sitio, coord. utm y novedades, patrullaje general*/
var copy_sitios_patrullaje = new Array();

var registro_aerop_guias = new Array();
var copy_registro_aerop_guias = new Array();

var registro_aerop_muestras = new Array();
var copy_registro_aerop_muestras = new Array();

var registro_aerop_vuelos = new Array();
var copy_registro_aerop_vuelos = new Array();

var registro_hitos = new Array();
var copy_registro_hitos = new Array();

var registro_novedades = new Array();
var copy_registro_novedades = new Array();


var path_fotos_cta = 'static/media/control_insular/control_turistas/';
var path_fotos_ctp = 'static/media/control_insular/control_pesca/';
var path_fotos_ctc = 'static/media/control_insular/control_contenedores/';

/*Read photo*/
function readURL(input) {
  console.log("**** readURL ****");
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    //console.log("archivo reader");
    pref_id = "";
    arraySub = input.id.split('_');
    pref_id = arraySub[0];//prefijo para identificar el template(Control Turista, Control Pesca, etc.)
  
    reader.onload = function(e) {
      $('#'+pref_id+'_foto').attr('src', e.target.result);
      //document.getElementById('div_foto').innerHTML = '<input type="image" name="imageprev" id="imageprev" style="width: 300px; height: 237px;" src="'+e.target.result+'"/>';
    }  
    reader.readAsDataURL(input.files[0]);
  }
}

/*asiganar modulo a ventanas*/
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
        arrayMod = modulos.split('|');//Linea que extrae todos los modulos a un arreglo
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


/*Freddy Lituma
/*funcion validar tecla enter  letras en el input*/
function isEnterKey(event, popup) {
    var key = window.event ? event.keyCode : event.which;
    if (event.keyCode === 13) {
        if(popup == 'ct_guia_turistico')//popup Guia Turistico
            getDataGuiasPop();
        if(popup == 'embarcacion_turismo')//popup Embarcaciones de Turismo
            getDataEmbarcacionesPop();
        if(popup == 'ct_pasajero')//popup Pasajeros
            getDataPasajerosPop(); 
        if(popup == 'sitios')//popup Sitios - Control Turistas
            getDataSitiosPop();
        if(popup == 'cp_monitoreador_pesquero')//popup Monitoreador
            getDataMonitoreadorPesqueroPop();
        if(popup == 'cp_pescador')//popup Pescador
            getDataPescadoresPop();
        if(popup == 'embarcacion_pesca')//popup Embarcaciones de Pesca
            getDataEmbarcacionesPesquerasPop();
        if(popup == 'cp_especie_pesca')//popup Embarcaciones de Pesca
            getDataEspeciesPop();
    } 
}

function getFechaHora(){
    /*Obtener hora y fecha actual*/
    fecha = moment().format('YYYY-MM-DD');
    hora = moment().format('HH:mm');
    return fecha + '-' + hora
}


function limpiarFormControlTuristas(){
    $("#cta_idActaControlTurista").val(0); 
    $("#cta_tipoOperacion").val(0); 

    /*Establecer la fecha y hora actual */
    fecha = getFechaHora();
    $("#cta_fecha").val(fecha.substring(0,10));
    $("#cta_hora").val(fecha.substring(11,16));

    /* Obtener id y nombre del usuario logeado*/
    idFuncionario = $("#cta_funcionario_session_id").val();
    nombreFuncionario = $("#cta_funcionario_session_nm").val();
    $("#cta_idGuardaparque").val(idFuncionario);
    $("#cta_nombreGuardaparque").val(nombreFuncionario); 

    $("#cta_idLugar").val("");
    $("#cta_nombreLugar").val(""); 
    $("#cta_guiaTuristico").prop('checked', false);
    $("#cta_idPasajero").val("");
    $("#cta_nombrePasajero").val(""); 
    $("#cta_numPasajeros").val("");
    $("#cta_observaciones").val("");
   
    $("#cta_imagen").attr('src', "/static/image/logo_photo.png");
    $("#cta_imagen").attr('style', "width:300px;height:237px;");
    
    /*Muestra la primera pestana del formulario*/
    $('.nav-tabs a[href="#cta_tabGeneral"]').tab('show');
    
    limpiarArregloSitios();
    refreshTablaSitio();
    mostrarDataPasajero();
}

function limpiarFormControlPesca(){
    
    $("#cp_tipoOperacion").val(0);
    $("#idActaControlPesca").val("");

    /*Establecer la fecha y hora actual */
    fecha = getFechaHora();
    $("#cp_fecha").val(fecha.substring(0,10));
    $("#cp_hora").val(fecha.substring(11,16));
    
    /* Obtener id y nombre del usuario logeado*/
    idFuncionario = $("#cp_funcionario_session_id").val();
    nombreFuncionario = $("#cp_funcionario_session_nm").val();
    $("#cp_idGuardaparque").val(idFuncionario);
    $("#cp_nombreGuardaparque").val(nombreFuncionario);

    $("#cp_idLugar").val("");
    $("#cp_nombreLugar").val("");
    $("#cp_idParma").val("");
    $("#cp_nombrePescador").val("");
    $("#cp_identificacionPescador").val("");
    $("#cp_licenciaParma").val("");
    $("#cp_fechaEmisionLicParma").val("");
    $("#cp_fechaCaducidadLicParma").val("");
    $("#cp_estadoLicenciaParma").val("");
    $("#cp_indentConductor").val("");
    $("#cp_nombresConductor").val("");
    $("#cp_apellidosConductor").val("");
    $("#cp_observaciones").val("");

    $("#cp_imagen").attr('src', "/static/image/logo_photo.png");
    $("#cp_imagen").attr('style', "width:300px;height:237px;");

     /*Muestra la primera pestana del formulario*/
    $('.nav-tabs a[href="#cp_tabGeneral"]').tab('show');
    limpiarArregloPesca();
    refreshTablaPesca();
}

function limpiarFormControlContenedores(){
    $("#ccont_tipoOperacion").val(0);
    $("#idActaControlContenedores").val("");

    /*Obtener hora y fecha actual para el nuevo registro */
    let fecha_actual = moment().format('YYYY-MM-DD');
    let hora_actual = moment().format('HH:mm');

    /* Obtener id y nombre del usuario logeado*/
    idFuncionario = $("#ccont_funcionario_session_id").val();
    nombreFuncionario = $("#ccont_funcionario_session_nm").val();

    $("#ccont_idGuardaparque").val(idFuncionario);
    $("#ccont_nombreGuardaparque").val(nombreFuncionario); 
    $("#ccont_nombreLugar").val(""); 
    $("#ccont_fecha").val(fecha_actual);
    $("#ccont_hora").val(hora_actual);
    $("#ccont_embarcacion").val("0");
    $("#ccont_codigoContenedor").val("");
    $("#ccont_numBultos").val("");
    $("#ccont_observaciones").val("");


    $("#ccont_imagen").attr('src', "/static/image/logo_photo.png");
    $("#ccont_imagen").attr('style', "width:300px;height:237px;");

    /*Muestra la primera pestana del formulario*/
    $('.nav-tabs a[href="#ccont_tabGeneral"]').tab('show');
}


function limpiarFormActaControlPatrullaje(){
    /*Obtener hora y fecha actual para el nuevo registro */
    fecha_actual = moment().format('YYYY-MM-DD');
    hora_actual = moment().format('HH:mm');

    $("#ctpa_fecha").val(fecha_actual);
    $("#ctpa_hora").val(hora_actual);
    
    //Limpiar el select de funcionarios
    $("#ctpa_funcionarios").val([""]).trigger('change');
    $('#ctpa_funcionarios option:contains(Seleccione funcionarios)').prop('selected',true);
    $("#ctpa_policia").val("");
   /*Muestra la primera pestana del formulario*/
    $('.nav-tabs a[href="#ctpa_tabGeneral"]').tab('show');
    //Limpiar el arreglo de hitos
    $("#ctpa_tipoOperacion").val(0);
    $("#idActaControlPatrullaje").val("");

    $("#ctpa_imagen").attr('src', "/static/image/logo_photo.png");
    $("#ctpa_imagen").attr('style', "width:300px;height:237px;");
    
    //limpiar arreglo de hitos
    limpiarArregloHitos();
    refreshTablaRegistroHitos();
    
    //Limpiar el arreglo de sitios
    limpiarArregloSitiosPatrullaje();
    refreshTablaSitioPatrullaje();

}

function limpiaPopupSitioPatrullaje() {
    $("#indiceRegSitioPatrullaje").val("");
    $("#opRegSitioPatrullaje").val("0");
    $("#cpag_idSitio").val("");
    $("#cpag_nombreSitio").val("");
    $("#cpag_nombreIsla").val("");
    $("#cpag_latitud").val("");
    $("#cpag_longitud").val("");
    $("#cpag_zona").val("");
    $("#cpag_existeNovedad").prop('checked', false);
    $("#cpag_novedad").val("");
    $("#cpag_cont_novedades").hide();
}

function limpiarFormControlAeropIguanas(){
    /*Obtener hora y fecha actual para el nuevo registro */
    fecha_actual = moment().format('YYYY-MM-DD');
    hora_actual  = moment().format('HH:mm');
    $("#capi_fecha").val(fecha_actual);
    $("#capi_hora").val(hora_actual);
    $("#capi_idLugar").val("");
    $("#capi_nombreLugar").val("");
    $("#capi_funcionarios").val([""]).trigger('change');
    $('#capi_funcionarios option:contains(Seleccione funcionarios)').prop('selected',true);
    $("#capi_personalOtro").val("")
    $("#capi_cantidadMov").val(""); 
    $("#capi_observaciones").val("");
    $("#capi_tipoOperacion").val("0");

    $("#capi_imagen").attr('src', "/static/image/logo_photo.png");
    $("#capi_imagen").attr('style', "width:300px;height:237px;");

    /*Muestra la primera pestana del formulario*/
    $('.nav-tabs a[href="#capi_tabGeneral"]').tab('show');
}

function limpiarFormControlAeropRecorridos(){
    /*Obtener hora y fecha actual para el nuevo registro */
    fecha_actual = moment().format('YYYY-MM-DD');
    hora_actual = moment().format('HH:mm');
    
    //Limpiar el select de funcionarios
    $("#capr_funcionarios").val([""]).trigger('change');
    $('#capr_funcionarios option:contains(Seleccione funcionarios)').prop('selected',true);

    $("#capr_fecha").val(fecha_actual);
    $("#capr_hora").val(hora_actual);
    $("#capr_idSitio").val("");
    $("#capr_nombreSitio").val("");
    $("#capr_via").prop('checked', false);
    $("#capr_pista").prop('checked', false);
    $("#capr_observaciones").val("");
    $("#capr_tipoOperacion").val("0");
}


function limpiarFormControlAeropuerto(){
    /*Obtener hora y fecha actual para el nuevo registro */
    fecha_actual = moment().format('YYYY-MM-DD');
    hora_actual = moment().format('HH:mm');
  
    $("#capp_idLugar").val("");
    $("#capp_nombreLugar").val("");
    $("#capp_funcionarios").val([""]).trigger('change');
    $('#capp_funcionarios option:contains(Seleccione funcionarios)').prop('selected',true);
    $("#capp_personalOtro").val("");
    $("#capp_fecha").val(fecha_actual);
    $("#capp_hora").val(hora_actual);
    $("#capp_areaTrabajo").val("0").trigger('change');

    $("#capp_totalEquipajes").val("0");
    $("#capp_numEquipajes").val("");

    $("#capp_totalCargas").val("0");
    $("#capp_numCargas").val("");
    
    $("#capp_totalGuias").val("0");
    $("#capp_totalPescaBlanca").val("0");
    $("#capp_totalLangosta").val("0");
    $("#capp_totalLangostino").val("0");
    $("#capp_totalPulpo").val("0");

    /*Muestra la primera pestana del formulario*/
    $('.nav-tabs a[href="#capp_tabGeneral"]').tab('show');

    //Limpia la tabla de Guias
    limpiarArregloRegistroGuias();
    refreshTablaRegistroGuias();

    //Limpia la tabla de Muestras
    limpiarArregloRegistroMuestras();
    refreshTablaRegistroMuestras();

    //Limpia la tabla de Vuelos
    limpiarArregloRegistroVuelos();
    refreshTablaRegistroVuelos();
}


/*Mostrar Ocultar opciones del tipo de visitante*/
/*en la ventana de control de turistas*/

function mostrarDataGuia(){
    $('div[name="guia_turistico"]').show();
    $('div[name="pasajero"]').hide();
                
    //Limpia los inputs de pasajero
    $("#cta_idPasajero").val("");
    $("#cta_nombrePasajero").val(""); 

    //Activa las validaciones de Guia Turistico
    $("#cta_idLicenciaGuia").attr("class","form-control requerido");
    $("#cta_nombreGuia").attr("class","form-control requerido");

    //Desactivar las validaciones de Pasajero
    $("#cta_idPasajero").attr("class","form-control");
    $("#cta_nombrePasajero").attr("class","form-control"); 
}

function mostrarDataPasajero(){
    $('div[name="guia_turistico"]').hide();
    $('div[name="pasajero"]').show();
                
    //Limpia los inputs del guia turistico
    $("#cta_idLicenciaGuia").val("");
    $("#cta_nombreGuia").val("");
    $("#cta_numLicGuia").val("");
    $("#cta_fechaEmisionLicGuia").val("");
    $("#cta_estadoLicGuia").val("");
    $("#cta_fechaCaducidadLicGuia").val("");

    //Activa las validaciones de Pasajero
    $("#cta_idPasajero").attr("class","form-control requerido");
    $("#cta_nombrePasajero").attr("class","form-control requerido"); 

    //Desactiva las validaciones de Guia Turistico
    $("#cta_idLicenciaGuia").attr("class","form-control");
    $("#cta_nombreGuia").attr("class","form-control");
}


/*Mostrar Ocultar opciones de la Embarcacion*/
/*en la ventana de control de combustibles  */

function mostrarDataEmbPesquera(){
    $('div[name="embarcacion_pesquera"]').show();
    $('div[name="embarcacion_turistica"]').hide();

    //Limpia los inputs de Embarcacion Turistica
    $("#ctc_idPatente").val("");
    $("#ctc_nombreEmbarcacion").val("");

    //Activa las validaciones de Embarcacion Pesquera
    $("#ctc_idPermisoEmbarcacionPesquera").attr("class","form-control requerido");
    $("#ctc_nombreEmbarcacionPesquera").attr("class","form-control requerido");
    $("#ctc_nombrePropEmbarcacionPesquera").attr("class","form-control requerido");

    //Desactiva las validaciones de Embarcacion Turistica
    $("#ctc_idPatente").attr("class","form-control");
    $("#ctc_nombreEmbarcacion").attr("class","form-control");
}   

function mostrarDataEmbTuristica(){
    $('div[name="embarcacion_turistica"]').show();
    $('div[name="embarcacion_pesquera"]').hide();

    //Limpia los inputs de Embarcacion Pesquera
    $("#ctc_idPermisoEmbarcacionPesquera").val("");
    $("#ctc_nombreEmbarcacionPesquera").val("");
    $("#ctc_nombrePropEmbarcacionPesquera").val("");

    //Activa las validaciones de Embarcacion Turistica
    $("#ctc_idPatente").attr("class","form-control requerido");
    $("#ctc_nombreEmbarcacion").attr("class","form-control requerido");

    //Desactiva las validaciones de Embarcacion Pesquera
    $("#ctc_idPermisoEmbarcacionPesquera").attr("class","form-control");
    $("#ctc_nombreEmbarcacionPesquera").attr("class","form-control");
    $("#ctc_nombrePropEmbarcacionPesquera").attr("class","form-control");
}

/*ver informacion de registro de guias turisticos*/
function getDataGuiasPop() {
    guia = $("#guiaPopup").val();
    identificacion = $("#identificacionGuiaPopup").val();
    pagina = $("#pagina_enviaPopGuia").val();
    dataC  = "";
    
    if(guia != "")
        dataC += "guia_id__persona_id__nombre_completo__icontains=" + guia + "&";
    if(identificacion != "")
        dataC += "guia_id__persona_id__identificacion__icontains=" + identificacion + "&";
   

    dataC = dataC.substring(0, dataC.length - 1);

    $.ajax({
        url: "data_ParamGuia",
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
                        if(data[i].estado == 'A'){ //Solo licencias activas
                            
                            tabla += "<tr>";
                            tabla += "<td align='left'>" + data[i].guia_id.persona_id.identificacion + "</td>";
                            tabla += "<td align='left'>" + data[i].guia_id.persona_id.nombre_completo + "</td>";
                            tabla += "<td align='left'>" + data[i].fecha_emision + "</td>";
                            tabla += "<td align='left'>" + data[i].fecha_caducidad + "</td>";
                            tabla += "<td align='left'>" + data[i].num_licencia + "</td>";
                            tabla += "<td align='left'>" + data[i].especializacion_id.nombre + "</td>";
                            tabla += "<td align='left'>" + data[i].estado + "</td>";
                            
                            tabla += '<td align="center"><textarea id="td_'+pagina+'_' + i + '" hidden>' + JSON.stringify(data[i]) + '</textarea> <a style="cursor: pointer; font-size: 20px;" title="Buscar" data-close-stackbox="true" onClick="getDataGuiaPagina(' + i + ',\'' + pagina + '\');"><i class="fa fa-plus-circle text-blue"></i></a></td>';
                            tabla += "</tr>";
                        }  
                    }
                }

                $('#tabla_PopupGuia').dataTable().fnClearTable();
                $('#tabla_PopupGuia').dataTable().fnDestroy();

                $("#body_tabla_PopupGuia").html("");
                $("#body_tabla_PopupGuia").append(tabla);

                var table = $('#tabla_PopupGuia').DataTable({
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

function limpiaPopupGuia(pagina) {
    document.getElementById('pagina_enviaPopGuia').value = pagina;
    $('#tabla_PopupGuia').dataTable().fnClearTable();
    $('#tabla_PopupGuia').dataTable().fnDestroy();
    $("#body_tabla_PopupGuia").html("");
}

/*funcion para verificar que pagina envia la peticion desde el popup*/
function getDataGuiaPagina(idx, pagina) {
    funcionario = $("#td_"+pagina+"_" + idx).val();
    newF = funcionario.replace(/None/g, null)
    newF = newF.replace(/False/g, "'false'")
    newF = newF.replace(/True/g, "'true'")
    newF = newF.replace(/'/g, '"')

    var json = JSON.parse("[" + newF + "]");
    if (pagina == 'pagGuia')
        getDataGuiaTablaPop(json);
}

function getDataGuiaTablaPop(json){
    $('#cta_idLicenciaGuia').val(json[0].id);
    $("#cta_nombreGuia").val(json[0].guia_id.persona_id.nombre_completo);
    $("#cta_numLicGuia").val(json[0].num_licencia);
    $("#cta_fechaEmisionLicGuia").val(json[0].fecha_emision);
    $("#cta_estadoLicGuia").val(json[0].estado);
    $("#cta_fechaCaducidadLicGuia").val(json[0].fecha_caducidad);
}
/*-------------------------------------------------------------*/

/*funcion para obtener las embarcaciones en el popup*/
function getDataEmbarcacionesPop() {
    embarcacion = $("#embarcacionPopup").val();
    matricula = $("#matriculaEmbarcacionPopup").val();
    
    pagina = $("#pagina_enviaPopEmbarcacion").val();
    dataC  = "";
    
    if(embarcacion != "")
        dataC += "embarcacion_id__nombre__icontains=" + embarcacion + "&";
    if(matricula != "")
        dataC += "embarcacion_id__num_matricula__icontains=" + matricula + "&";
   

    dataC = dataC.substring(0, dataC.length - 1);

    $.ajax({
        url: "data_ParamEmbarcacion",
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
                        if(data[i].embarcacion_id.estado == 'A'){ //Solo patentes activas
                            tabla += "<tr>";
                            tabla += "<td align='left'>" + data[i].embarcacion_id.nombre + "</td>";
                            tabla += "<td align='left'>" + data[i].embarcacion_id.num_matricula + "</td>";
                            tabla += "<td align='left'>" + data[i].fecha_vigencia + "</td>";
                            tabla += "<td align='left'>" + data[i].fecha_caducidad + "</td>";
                            tabla += "<td align='left'>" + data[i].num_patente + "</td>";
                            tabla += "<td align='left'>" + data[i].estado + "</td>";
                            
                            tabla += '<td align="center"><textarea id="td_'+pagina+'_' + i + '" hidden>' + JSON.stringify(data[i]) + '</textarea> <a style="cursor: pointer; font-size: 20px;" title="Buscar" data-close-stackbox="true" onClick="getDataEmbarcacionPagina(' + i + ',\'' + pagina + '\');"><i class="fa fa-plus-circle text-blue"></i></a></td>';
                            tabla += "</tr>";
                        }    
                    }
                }

                $('#tabla_PopupEmbarcacion').dataTable().fnClearTable();
                $('#tabla_PopupEmbarcacion').dataTable().fnDestroy();

                $("#body_tabla_PopupEmbarcacion").html("");
                $("#body_tabla_PopupEmbarcacion").append(tabla);

                var table = $('#tabla_PopupEmbarcacion').DataTable({
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


function limpiaPopupEmbarcacion(pagina) {
    document.getElementById('pagina_enviaPopEmbarcacion').value = pagina;
    $('#tabla_PopupEmbarcacion').dataTable().fnClearTable();
    $('#tabla_PopupEmbarcacion').dataTable().fnDestroy();
    $("#body_tabla_PopupEmbarcacion").html("");
}


/*funcion para verificar que pagina envia la peticion desde el popup*/
function getDataEmbarcacionPagina(idx, pagina) {
    
    embarcacion = $("#td_"+pagina+"_" + idx).val();
    newE = embarcacion.replace(/None/g, null)
    newE = newE.replace(/False/g, "'false'")
    newE = newE.replace(/True/g, "'true'")
    newE = newE.replace(/'/g, '"')

    var json = JSON.parse("[" + newE + "]");
    
    if (pagina == 'pagEmbarcacionCT'){
        $("#cta_nombreEmbarcacion").val(json[0].embarcacion_id.nombre);
        $('#cta_idPatente').val(json[0].id);
    }
    if (pagina == 'pagEmbarcacionCC'){
        $("#ctc_nombreEmbarcacion").val(json[0].embarcacion_id.nombre);
        $('#ctc_idPatente').val(json[0].id);   
    }
       
}

/*-------------------------------------------------------------*/



/*funcion para obtener las pasajeros en el popup*/
function getDataPasajerosPop() {
    pasajero = $("#pasajeroPopup").val();
    identificacion = $("#identificacionPasajeroPopup").val();

    pagina = $("#pagina_enviaPopPasajero").val();
    dataC  = "";
    
    if(pasajero != "")
        dataC += "nombre_completo__icontains=" + pasajero + "&";
    if(identificacion != "")
        dataC += "identificacion__icontains=" + identificacion + "&";
   

    dataC = dataC.substring(0, dataC.length - 1);

    $.ajax({
        url: "data_ParamPasajero",
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
                        if(data[i].estado == 'A'){ //Solo personas Activas
                            tabla += "<tr>";
                            tabla += "<td align='left'>" + data[i].nombre_completo + "</td>";
                            tabla += "<td align='left'>" + data[i].identificacion + "</td>";
                            tabla += '<td align="center"><textarea id="td_'+pagina+'_' + i + '" hidden>' + JSON.stringify(data[i]) + '</textarea> <a style="cursor: pointer; font-size: 20px;" title="Buscar" data-close-stackbox="true" onClick="getDataPasajeroPagina(' + i + ',\'' + pagina + '\');"><i class="fa fa-plus-circle text-blue"></i></a></td>';
                            tabla += "</tr>";
                        }    
                    }
                }

                $('#tabla_PopupPasajero').dataTable().fnClearTable();
                $('#tabla_PopupPasajero').dataTable().fnDestroy();

                $("#body_tabla_PopupPasajero").html("");
                $("#body_tabla_PopupPasajero").append(tabla);

                var table = $('#tabla_PopupPasajero').DataTable({
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


function limpiaPopupPasajero(pagina) {
    document.getElementById('pagina_enviaPopPasajero').value = pagina;
    $('#tabla_PopupPasajero').dataTable().fnClearTable();
    $('#tabla_PopupPasajero').dataTable().fnDestroy();
    $("#body_tabla_PopupPasajero").html("");
}

/*funcion para verificar que pagina envia la peticion desde el popup*/
function getDataPasajeroPagina(idx, pagina) {
    funcionario = $("#td_"+pagina+"_" + idx).val();
    newF = funcionario.replace(/None/g, null)
    newF = newF.replace(/False/g, "'false'")
    newF = newF.replace(/True/g, "'true'")
    newF = newF.replace(/'/g, '"')

    var json = JSON.parse("[" + newF + "]");
    if (pagina == 'pagPasajero')
        getDataPasajeroTablaPop(json);
}

function getDataPasajeroTablaPop(json){
    $("#cta_nombrePasajero").val(json[0].nombre_completo);
    $('#cta_idPasajero').val(json[0].id);    
}
/*-------------------------------------------------------------*/

/*funcion para obtener los sitios en el popup*/
function getDataSitiosPop() {
    sitio  = $("#sitioPopup").val();
    isla   = $("#islaPopup").val();
    pagina = $("#pagina_enviaPopSitio").val();
    dataC  = "";
    

    if(sitio != "")
        dataC += "descripcion__icontains=" + sitio + "&";
    if(isla != "")
        dataC += "isla_id__descripcion__icontains=" + isla + "&";

    
    dataC = dataC.substring(0, dataC.length - 1);

    $.ajax({
        url: "data_ParamSitio",
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
                        if(data[i].isla_id != null){
                            tabla += "<tr>";
                            tabla += "<td align='left'>" + data[i].descripcion + "</td>";
                            tabla += "<td align='left'>" + data[i].isla_id.descripcion + "</td>";
                            tabla += '<td align="center"><textarea id="td_'+pagina+'_' + i + '" hidden>' + JSON.stringify(data[i]) + '</textarea> <a style="cursor: pointer; font-size: 20px;" title="Buscar" data-close-stackbox="true" onClick="getDataSitioPagina(' + i + ',\'' + pagina + '\');"><i class="fa fa-plus-circle text-blue"></i></a></td>';
                            tabla += "</tr>";
                        }  
                    }
                }

                $('#tabla_PopupSitio').dataTable().fnClearTable();
                $('#tabla_PopupSitio').dataTable().fnDestroy();

                $("#body_tabla_PopupSitio").html("");
                $("#body_tabla_PopupSitio").append(tabla);

                var table = $('#tabla_PopupSitio').DataTable({
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

function limpiaPopupSitio(pagina) {
    document.getElementById('pagina_enviaPopSitio').value = pagina;
    $('#tabla_PopupSitio').dataTable().fnClearTable();
    $('#tabla_PopupSitio').dataTable().fnDestroy();
    $("#body_tabla_PopupSitio").html("");
}


/*funcion para verificar que pagina envia la peticion desde el popup*/
function getDataSitioPagina(idx, pagina) {
    funcionario = $("#td_"+pagina+"_" + idx).val();
    newF = funcionario.replace(/None/g, null)
    newF = newF.replace(/False/g, "'false'")
    newF = newF.replace(/True/g, "'true'")
    newF = newF.replace(/'/g, '"')

    var json = JSON.parse("[" + newF + "]");
    if (pagina == 'pagSitios')
        getDataSitioTablaPop(json);
    
    if (pagina == 'cta_lugar'){
        $("#cta_idLugar").val(json[0].id);
        $("#cta_nombreLugar").val(json[0].descripcion);
    }

    if (pagina == 'cp_lugar'){
        $("#cp_idLugar").val(json[0].id);
        $("#cp_nombreLugar").val(json[0].descripcion);
    }

    if (pagina == 'ctc_lugar'){
        $("#ctc_idLugar").val(json[0].id);
        $("#ctc_nombreLugar").val(json[0].descripcion);
    }

    if (pagina == 'cn_lugar'){
        $("#cn_idLugar").val(json[0].id);
        $("#cn_nombreLugar").val(json[0].descripcion);
    }

    if (pagina == 'ccont_lugar'){
        $("#ccont_idLugar").val(json[0].id);
        $("#ccont_nombreLugar").val(json[0].descripcion);
    }

    if (pagina == 'capp_lugar'){
        $("#capp_idLugar").val(json[0].id);
        $("#capp_nombreLugar").val(json[0].descripcion);
    }
    

    if (pagina == 'cn_pagSitio'){
        $("#cn_idSitio").val(json[0].id);
        $("#cn_nombreSitio").val(json[0].descripcion);
    }

    //Insertar en Control Patrullaje - Sitios
    if (pagina == 'cpa_sitio'){
        $("#ctpa_idSitio").val(json[0].id);
        $("#ctpa_nombreSitio").val(json[0].descripcion);
        $("#ctpa_nombreIsla").val(json[0].isla_id.descripcion);
    }

    if (pagina == 'cpab_sitios'){
        getDataSitioPatrullajeBares(json);
    }

    /*Form Control Aerop. Iguanas*/
    if (pagina == 'capi_sitios'){
        $("#capi_idLugar").val(json[0].id);
        $("#capi_nombreLugar").val(json[0].descripcion);
    }

    if(pagina == 'pagControlAeroRecorridos'){
        $("#capr_idSitio").val(json[0].id);
        $("#capr_nombreSitio").val(json[0].descripcion);
    }
    
}

function getDataSitioTablaPop(json){  
    const nuevo_sitio = {
        id:json[0].id, 
        descripcion:json[0].descripcion,
        isla:json[0].isla_id.descripcion,
    };
    /*Si el nuevo sitio no se encutnra en el arreglo, lo anade*/
    validate = JSON.stringify(sitios_turista).indexOf(JSON.stringify(nuevo_sitio)) > -1;
    if (!validate)
        sitios_turista.push(nuevo_sitio);
        refreshTablaSitio();  
}


function refreshTablaSitio(){
    console.log(sitios_turista);
    console.log(sitios_turista.length);
    
    let tabla="";
    let ord = 0;
    for (let i = 0; i < sitios_turista.length; i++) {
        ord = i+1;
        tabla += "<tr>";
        tabla += "<td align='center'>" + ord + "</td>";
        tabla += "<td align='center'>" + sitios_turista[i]['descripcion'] + "</td>";
        tabla += "<td align='center'>" + sitios_turista[i]['isla'] + "</td>";
        tabla += '<td align="center"><a style="cursor: pointer; font-size: 15x;" title="Buscar" data-close-stackbox="true" onClick="deleteDataSitioTabla(' + i + ')"><i class="fa fa-trash text-green"></i></a></td>';
        tabla += "</tr>";
    }

    $("#body_tabla_Sitios").html("");
    $("#body_tabla_Sitios").append(tabla);
}

function deleteDataSitioTabla(indice){
    sitios_turista.splice(indice,1);
    refreshTablaSitio();
}

function limpiarArregloSitios(){ 
    if (sitios_turista.length > 0)
        sitios_turista.splice(0,sitios_turista.length);

     if (copy_sitios_turista.length > 0)
        copy_sitios_turista.splice(0,copy_sitios_turista.length);
}
/*-------------------------------------------------------------*/

/*funcion para obtener las pescadores en el popup*/
function getDataMonitoreadorPesqueroPop() {
    monitoreador = $("#MonitoreadorPesqueroPopup").val();
    identificacion = $("#identMonitoreadorPesqueroPopup").val();
    pagina = $("#pagina_enviaPopMonitoreadorPesquero").val();
    dataC  = "proceso_estatuto_id__id=PRC_CUEM&"
    if(monitoreador != "")
        dataC += "persona_id__nombre_completo__icontains=" + monitoreador + "&";
    if(identificacion != "")
        dataC += "persona_id__identificacion__icontains=" + identificacion + "&";
        

    dataC = dataC.substring(0, dataC.length - 1);
    
    $.ajax({
        url: "data_ParamMonitoreadorPesquero",
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
                        if(data[i].persona_id.estado == 'A'){ //Solo funcionarios activos
                            tabla += "<tr>";
                            tabla += "<td align='left'>" + data[i].persona_id.nombre_completo + "</td>";
                            tabla += "<td align='left'>" + data[i].persona_id.identificacion + "</td>";
                            tabla += '<td align="center"><textarea id="td_'+pagina+'_' + i + '" hidden>' + JSON.stringify(data[i]) + '</textarea> <a style="cursor: pointer; font-size: 20px;" title="Buscar" data-close-stackbox="true" onClick="getDataMonitoreadorPesqueroPagina(' + i + ',\'' + pagina + '\');"><i class="fa fa-plus-circle text-blue"></i></a></td>';
                            tabla += "</tr>";
                        }
                        
                    }
                }

                $('#tabla_PopupMonitoreadorPesquero').dataTable().fnClearTable();
                $('#tabla_PopupMonitoreadorPesquero').dataTable().fnDestroy();

                $("#body_tabla_PopupMonitoreadorPesquero").html("");
                $("#body_tabla_PopupMonitoreadorPesquero").append(tabla);

                var table = $('#tabla_PopupMonitoreadorPesquero').DataTable({
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

function limpiaPopupMonitoreadorPesquero(pagina) {
    document.getElementById('pagina_enviaPopMonitoreadorPesquero').value = pagina;
    $('#tabla_PopupMonitoreadorPesquero').dataTable().fnClearTable();
    $('#tabla_PopupMonitoreadorPesquero').dataTable().fnDestroy();
    $("#body_tabla_PopupMonitoreadorPesquero").html("");
}

/*funcion para verificar que pagina envia la peticion desde el popup*/
function getDataMonitoreadorPesqueroPagina(idx, pagina) {
    funcionario = $("#td_"+pagina+"_" + idx).val();
    newF = funcionario.replace(/None/g, null)
    newF = newF.replace(/False/g, "'false'")
    newF = newF.replace(/True/g, "'true'")
    newF = newF.replace(/'/g, '"')

    var json = JSON.parse("[" + newF + "]");
    if (pagina == 'pagMonitoreadorPesquero')
        getDataMonitoreadorPesqueroTablaPop(json);
}

function getDataMonitoreadorPesqueroTablaPop(json){
    //$("#idMonitoreadorPesqueroCP").val(json[0].persona_id.id) 
    $("#cp_idMonitoreadorPesquero").val(json[0].id) 
    $('#cp_nombreMonitoreadorPesquero').val(json[0].persona_id.nombre_completo);
}

/*-------------------------------------------------------------*/



/*funcion para obtener las pescadores en el popup*/
function getDataPescadoresPop() {
    nombres = $("#nombresPescadorPopup").val();
    apellidos = $("#apellidosPescadorPopup").val();
    cedula = $("#identificacionPescadorPopup").val();
    parma = $("#parmaPescadorPopup").val();
    pagina = $("#pagina_enviaPopPescador").val();
    
    dataC  = "";
    if(nombres != "")
        dataC += "c_nombres__icontains=" + nombres + "&";
    if(apellidos != "")
        dataC += "c_apellidos__icontains=" + apellidos + "&";
    if(cedula != "")
        dataC += "c_cedula__icontains=" + cedula + "&";
    if(parma != "")
        dataC += "c_licenciaparma__icontains=" + parma + "&";

    console.log(dataC);
    console.log('------');
    dataC = dataC.substring(0, dataC.length - 1);
    console.log(dataC);
    $.ajax({
        url: "data_ParamPescador",
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
                        if(data[i].c_estado == 'ACTIVO'){ //Solo pescadores Activos
                            tabla += "<tr>";
                            tabla += "<td align='left'>" + data[i].c_apellidos + "</td>";
                            tabla += "<td align='left'>" + data[i].c_nombres + "</td>";
                            tabla += "<td align='left'>" + data[i].c_cedula + "</td>";
                            tabla += "<td align='left'>" + data[i].c_licenciaparma + "</td>";
                            tabla += "<td align='left'>" + data[i].c_fechaemision + "</td>";
                            tabla += "<td align='left'>" + data[i].c_fechacaducidad + "</td>";
                            tabla += "<td align='left'>" + data[i].c_estado + "</td>";
                            
                            tabla += '<td align="center"><textarea id="td_'+pagina+'_' + i + '" hidden>' + JSON.stringify(data[i]) + '</textarea> <a style="cursor: pointer; font-size: 20px;" title="Buscar" data-close-stackbox="true" onClick="getDataPescadorPagina(' + i + ',\'' + pagina + '\');"><i class="fa fa-plus-circle text-blue"></i></a></td>';
                            tabla += "</tr>";
                        }  
                    }
                }

                $('#tabla_PopupPescador').dataTable().fnClearTable();
                $('#tabla_PopupPescador').dataTable().fnDestroy();

                $("#body_tabla_PopupPescador").html("");
                $("#body_tabla_PopupPescador").append(tabla);

                var table = $('#tabla_PopupPescador').DataTable({
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

function limpiaPopupPescador(pagina) {
    console.log(pagina);
    document.getElementById('pagina_enviaPopPescador').value = pagina;
    $('#tabla_PopupPescador').dataTable().fnClearTable();
    $('#tabla_PopupPescador').dataTable().fnDestroy();
    $("#body_tabla_PopupPescador").html("");
}

/*funcion para verificar que pagina envia la peticion desde el popup*/
function getDataPescadorPagina(idx, pagina) {
    funcionario = $("#td_"+pagina+"_" + idx).val();
    newF = funcionario.replace(/None/g, null)
    newF = newF.replace(/False/g, "'false'")
    newF = newF.replace(/True/g, "'true'")
    newF = newF.replace(/'/g, '"')

    var json = JSON.parse("[" + newF + "]");
    if (pagina == 'pagPescador')
        getDataPescadorTablaPop(json);
}

function getDataPescadorTablaPop(json){
    $("#cp_idParma").val(json[0].id) 
    $('#cp_nombrePescador').val(json[0].c_apellidos + ' ' + json[0].c_nombres);
    $("#cp_identificacionPescador").val(json[0].c_cedula);
    $('#cp_licenciaParma').val(json[0].c_licenciaparma);
    $('#cp_estadoLicenciaParma').val(json[0].c_estado);
    $('#cp_fechaEmisionLicParma').val(json[0].c_fechaemision);
    $('#cp_fechaCaducidadLicParma').val(json[0].c_fechacaducidad);
}

/*-------------------------------------------------------------*/


/*funcion para obtener las embarcaciones pesqueras en el popup*/
function getDataEmbarcacionesPesquerasPop() {
    embarcacionPesquera = $("#embarcacionPesqueraPopup").val();
    pagina = $("#pagina_enviaPopEmbarcacionPesquera").val();
    dataC  = "";
   
    if(embarcacionPesquera != "")
        dataC += "c_nombreembarcacion__icontains=" + embarcacionPesquera + "&";
   
    dataC = dataC.substring(0, dataC.length - 1);

    $.ajax({
        url: "data_ParamEmbarcacionPesquera",
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
                        //if(data[i].estado == 'ACTIVO'){ //Solo embarcaciones Activos
                            tabla += "<tr>";
                            tabla += "<td align='left'>" + data[i].c_nombreembarcacion + "</td>";
                            tabla += "<td align='left'>" + data[i].c_permisopesca + "</td>";
                            tabla += "<td align='left'>" + data[i].c_matriculadigmer + "</td>";
                            tabla += "<td align='left'>" + data[i].c_fechaemision + "</td>";
                            tabla += "<td align='left'>" + data[i].c_fechacaducidad + "</td>";
                            tabla += "<td align='left'>" + data[i].estado + "</td>";
                            tabla += '<td align="center"><textarea id="td_'+pagina+'_' + i + '" hidden>' + JSON.stringify(data[i]) + '</textarea> <a style="cursor: pointer; font-size: 20px;" title="Buscar" data-close-stackbox="true" onClick="getDataEmbarcacionPesqueraPagina(' + i + ',\'' + pagina + '\');"><i class="fa fa-plus-circle text-blue"></i></a></td>';
                            tabla += "</tr>";
                        //}    
                    }
                }

                $('#tabla_PopupEmbarcacionPesquera').dataTable().fnClearTable();
                $('#tabla_PopupEmbarcacionPesquera').dataTable().fnDestroy();

                $("#body_tabla_PopupEmbarcacionPesquera").html("");
                $("#body_tabla_PopupEmbarcacionPesquera").append(tabla);

                var table = $('#tabla_PopupEmbarcacionPesquera').DataTable({
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


function limpiaPopupEmbarcacionPesquera(pagina) {
    document.getElementById('pagina_enviaPopEmbarcacionPesquera').value = pagina;
    $('#tabla_PopupEmbarcacionPesquera').dataTable().fnClearTable();
    $('#tabla_PopupEmbarcacionPesquera').dataTable().fnDestroy();
    $("#body_tabla_PopupEmbarcacionPesquera").html("");
}


/*funcion para verificar que pagina envia la peticion desde el popup*/
function getDataEmbarcacionPesqueraPagina(idx, pagina) {

    funcionario = $("#td_"+pagina+"_" + idx).val();
    newF = funcionario.replace(/None/g, null)
    newF = newF.replace(/False/g, "'false'")
    newF = newF.replace(/True/g, "'true'")
    newF = newF.replace(/'/g, '"')

    var json = JSON.parse("[" + newF + "]");
    if (pagina == 'pagEmbarcacionPesquera'){
        $('#cp_idPermisoEmbarcacionPesquera').val(json[0].id);
        $("#cp_nombreEmbarcacionPesquera").val(json[0].c_nombreembarcacion);
        
    }
    
    if (pagina == 'pagEmbarcacionPesqueraCC'){
        $('#ctc_idPermisoEmbarcacionPesquera').val(json[0].id);
        $("#ctc_nombreEmbarcacionPesquera").val(json[0].c_nombreembarcacion);
        $("#ctc_nombrePropEmbarcacionPesquera").val(json[0].c_armadorunoapellidos + ' ' + json[0].c_armadorunonombres);
    }
    
}

/*-------------------------------------------------------------*/


/*funcion para obtener las especies en el popup*/
function getDataEspeciesPop() {
    especie = $("#especiePopup").val();
    pagina = $("#pagina_enviaPopEspecie").val();
    dataC  = "";
   
    if(especie != "")
        dataC += "nombre_comun__icontains=" + especie + "&";
   
    dataC = dataC.substring(0, dataC.length - 1);

    $.ajax({
        url: "data_ParamEspecie",
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
                        if(data[i].estado == 'A'){ //Solo embarcaciones Activos
                            tabla += "<tr>";
                            tabla += "<td align='left'>" + data[i].nombre_comun + "</td>";
                            tabla += "<td align='left'>" + data[i].nombre_cientifico + "</td>";
                            tabla += '<td align="center"><textarea id="td_'+pagina+'_' + i + '" hidden>' + JSON.stringify(data[i]) + '</textarea> <a style="cursor: pointer; font-size: 20px;" title="Buscar" data-close-stackbox="true" onClick="getDataEspeciePagina(' + i + ',\'' + pagina + '\');"><i class="fa fa-plus-circle text-blue"></i></a></td>';
                            tabla += "</tr>";
                        }    
                    }
                }

                $('#tabla_PopupEspecie').dataTable().fnClearTable();
                $('#tabla_PopupEspecie').dataTable().fnDestroy();

                $("#body_tabla_PopupEspecie").html("");
                $("#body_tabla_PopupEspecie").append(tabla);

                var table = $('#tabla_PopupEspecie').DataTable({
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


function limpiaPopupEpecies(pagina) {
    document.getElementById('pagina_enviaPopEspecie').value = pagina;
    $('#tabla_PopupEspecie').dataTable().fnClearTable();
    $('#tabla_PopupEspecie').dataTable().fnDestroy();
    $("#body_tabla_PopupEspecie").html("");
}


/*funcion para verificar que pagina envia la peticion desde el popup*/
function getDataEspeciePagina(idx, pagina) {
    console.log(111);
    funcionario = $("#td_"+pagina+"_" + idx).val();
    newF = funcionario.replace(/None/g, null)
    newF = newF.replace(/False/g, "'false'")
    newF = newF.replace(/True/g, "'true'")
    newF = newF.replace(/'/g, '"')

    var json = JSON.parse("[" + newF + "]");
    if (pagina == 'control_pesca')
        getDataEspecieTablaPop(json);
}

function getDataEspecieTablaPop(json){
    $("#nombreEspecie").val(json[0].nombre_comun);
    $('#idEspecie').val(json[0].id);
    
}
/*-------------------------------------------------------------*/

/*----------Funciones registros de pesca---------*/
/*************************************************/
/*************************************************/
function limpiaPopupPesca(pagina) {
    
    $("#btnAddPesca").html("Agregar");
    $("#idEspecie").val("");
    $("#nombreEspecie").val("");
    $("#unidadPesca").val("");
    $("#pesoPesca").val("");
    $("#indiceRegPesca").val("");
    $("#opRegPesca").val("0");    
}

function addDataPesca(){
    
    operacion = $("#opRegPesca").val();
    indice = $("#indiceRegPesca").val();
    if(validaContenedor('popupAddPesca')){
       if (operacion==0){
            insertRegistroTablaPescaEspecie();
        }else{
            updateRegistroTablaPescaEspecie(indice);
        }
        refreshTablaPesca();
    }    
}


function validarRegPesca(reg_pesca){
    for (let i = 0; i < registro_pesca.length; i++) {       
        if (registro_pesca[i]['id_especie']==reg_pesca['id_especie']){
            validaContenedorExt("popupAddPesca","Ya existe un registro de" + ' ' + reg_pesca['especie']); 
            return false;
        }
    }
    return true;
}

function validarEditRegPesca(reg_pesca, indice){
    for (let i = 0; i < registro_pesca.length; i++) {       
        if ((registro_pesca[i]['id_especie']==reg_pesca['id_especie']) && (i!=indice)){
            validaContenedorExt("popupAddPesca","Ya existe un registro de" + ' ' + reg_pesca['especie']); 
            return false;
        }
    }
    return true;
}

function refreshTablaPesca(){
    let tabla="";
    let ord = 0;
    for (let i = 0; i < registro_pesca.length; i++) {
        ord = i+1;
        tabla += "<tr>";
        tabla += "<td align='center'>" + ord + "</td>";
        tabla += "<td align='center'>" + registro_pesca[i]['especie'] + "</td>";
        tabla += "<td align='center'>" + registro_pesca[i]['unidad'] + "</td>";
        tabla += "<td align='center'>" + registro_pesca[i]['peso'] + "</td>";
        tabla += "<td align='center'><a href='#popupAddPesca' data-stackbox='true' data-stackbox-position='absolute' onclick='getRegistroPescaEspecie(\"" + i + "\")'><i class='fa fa-edit text-green'></i></a></td>";             
        tabla += '<td align="center"><a style="cursor: pointer; font-size: 15x;" title="Buscar" data-close-stackbox="true" onClick="deleteDataPescaTabla(' + i + ')"><i class="fa fa-trash text-green"></i></a></td>';
        tabla += "</tr>";
    }
    $("#body_tabla_Pesca").html("");
    $("#body_tabla_Pesca").append(tabla);
}


function getRegistroPescaEspecie(indice){
    $("#btnAddPesca").html("Editar");
    $("#opRegPesca").val("1"); 
    $("#indiceRegPesca").val(indice);
    $("#idEspecie").val(registro_pesca[indice]['id_especie']);
    $("#nombreEspecie").val(registro_pesca[indice]['especie']);
    $("#unidadPesca").val(registro_pesca[indice]['unidad']);
    $("#pesoPesca").val(registro_pesca[indice]['peso']);

}

function insertRegistroTablaPescaEspecie(){
    const nueva_pesca = {
                id_especie:$("#idEspecie").val(), 
                especie:$("#nombreEspecie").val(),
                unidad:$("#unidadPesca").val(),
                peso:$("#pesoPesca").val()
            }
    //si el nuevo registro es valido y no es duplicado lo inserta en el array.
    if(validarRegPesca(nueva_pesca)){
        registro_pesca.push(nueva_pesca);
        $("#btnCloseAddPesca").trigger("click");
    } 
}

function updateRegistroTablaPescaEspecie(indice){
    const edit_pesca = {
                id_especie:$("#idEspecie").val(), 
                especie:$("#nombreEspecie").val(),
                unidad:$("#unidadPesca").val(),
                peso:$("#pesoPesca").val()
    }
    //si el registro editado es valido y no es duplicado lo actualiza en el array
    if(validarEditRegPesca(edit_pesca,indice)){
        registro_pesca[indice]['id_especie'] = $("#idEspecie").val();
        registro_pesca[indice]['especie'] = $("#nombreEspecie").val();
        registro_pesca[indice]['unidad'] = $("#unidadPesca").val();
        registro_pesca[indice]['peso'] = $("#pesoPesca").val();
        $("#btnCloseAddPesca").trigger("click");
    }
}

function deleteDataPescaTabla(indice){
    registro_pesca.splice(indice,1);
    refreshTablaPesca();
}


function limpiarArregloPesca(){ 
    if (registro_pesca.length > 0)
        registro_pesca.splice(0,registro_pesca.length);

     if (copy_registro_pesca.length > 0)
        copy_registro_pesca.splice(0,copy_registro_pesca.length);
    
}
/*-----------------------------------------------*/
/*************************************************/
/*************************************************/


/*===============================================CRUD TURISTA==================================================*/
/*============================================ACTA CONTROL TURISTA=============================================*/

/*Buscar actas de ingresos de turistas por parametros*/
function getActaControlTuristas(){
    let dataEditActaCuso = new Array();
    data = '';
    nombreGuia = $("#cta_guia").val();
    nombrePasajero = $("#cta_pasajero").val();
    if (nombreGuia != "")
            data = "lic_guia_id__guia_id__persona_id__nombre_completo__icontains=" + nombreGuia + "&";
    
    if (nombrePasajero != "")
            data = "pasajero_id__nombre_completo__icontains=" + nombrePasajero + "&";

    $.ajax({
        url: "data_ParamActaControlTuristas",
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
                        fecha = (data[i].fecha.substring(0,10));
                        hora  = (data[i].fecha.substring(11,16));
                        
                        tabla += "<tr id='tr_cta_fila_" + data[i].id + "'>";
                        tabla += "<td align='center' id='td_cta_fecha_" + data[i].id + "'>" + fecha + "</td>";
                        tabla += "<td align='center' id='td_cta_hora_" + data[i].id + "'>" + hora + "</td>";
                        
                        if(data[i].existe_guiaturistico === true) {
                            tabla += "<td align='center' id='td_cta_identificacion_" + data[i].id + "'>" + data[i].lic_guia_id.guia_id.persona_id.identificacion + "</td>";
                            tabla += "<td align='center' id='td_cta_nombre_" + data[i].id + "'>" + data[i].lic_guia_id.guia_id.persona_id.nombre_completo + "</td>";
                            tabla += "<td align='center' id='td_cta_GuiaPasajero_" + data[i].id + "'>" + 'Guia Turist.' + "</td>";        
                                if(data[i].guia_con_uniforme === true)
                                    tabla += "<td align='center' id='td_cta_uniforme_" + data[i].id + "'>" + 'SI' + "</td>";        
                                else
                                    tabla += "<td align='center' id='td_cta_uniforme_" + data[i].id + "'>" + 'NO' + "</td>";
                
                        }else{
                            tabla += "<td align='center' id='td_cta_identificacion_" + data[i].id + "'>" + data[i].pasajero_id.identificacion + "</td>";
                            tabla += "<td align='center' id='td_cta_nombre_" + data[i].id + "'>" + data[i].pasajero_id.nombre_completo + "</td>";          
                            tabla += "<td align='center' id='td_cta_GuiaPasajero_" + data[i].id + "'>" + 'Pasajero' + "</td>";  
                            tabla += "<td align='center' id='td_cta_uniforme_" + data[i].id + "'>" + 'NO' + "</td>";    
                        }
                        
                        tabla += "<td align='center' id='td_cta_numPasajeros_" + data[i].id + "'>" + data[i].num_pasajeros + "</td>";
                        tabla += "<td align='center' id='td_cta_observacion_" + data[i].id + "'>" + data[i].observaciones + "</td>";
                        
                        tabla += "<td align='center'><a href='#addActaControlTuristas' data-stackbox='true' data-stackbox-position='absolute' onclick='getByIdActaControlTuristas(\"" + data[i].id + "\")'><i class='fa fa-edit text-green'></i></a></td>";
                        tabla += "<td align='center'><a style='cursor: pointer;' onclick='deleteModal(\"" + data[i].id + "\",\"ActaControlTuristas\");'><i class='fa fa-trash text-green' title='Eliminar'></i></a></td>";
                        tabla += "</tr>";
                    }
                }

                $('#tabla_ActaControlTuristas').dataTable().fnClearTable();
                $('#tabla_ActaControlTuristas').dataTable().fnDestroy();

                $("#bodytabla_ActaControlTuristas").html("");
                $("#bodytabla_ActaControlTuristas").append(tabla);
                $('#tabla_ActaControlTuristas').DataTable();
            }
        },

        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
        },
    });
}

function validarNumSitiosTurista(){
    if(sitios_turista.length > 0)
        return true;
    else
        validaContenedorExt("addActaControlTuristas","Ingrese al menos 1 sitio");  
}

function setInsertUpdateActaCtrlTurista() {
    valida_num_sitios = validarNumSitiosTurista();
    valida_contenedor = validaContenedor("addActaControlTuristas");

    if (valida_contenedor == true && valida_num_sitios == true){
            if ($("#cta_tipoOperacion").val() == 0)
                insertActaControlTuristas();
            else
                updateActaControlTurista();
    }
}

function getDataFormControlTuristas(){
    /*Datos del acta de control de turista*/
    fecha = $("#cta_fecha").val() + ' ' + $("#cta_hora").val();
    lugar_id = $("#cta_idLugar").val();
    guardaparque_id = $("#cta_idGuardaparque").val();
    existe_guiaturistico = $("#cta_guiaTuristico").prop('checked');
    lic_guia_id = $("#cta_idLicenciaGuia").val();
    guia_con_uniforme = $('input[name="cta_uniformeGuia"]:checked').val();
    pasajero_id = $("#cta_idPasajero").val();
    num_pasajeros = $("#cta_numPasajeros").val();
    observaciones = $("#cta_observaciones").val();
    
    if (existe_guiaturistico == true) {
        existe_guiaturistico = 1;
        if (guia_con_uniforme == true) 
            guia_con_uniforme = 1;
        else 
            guia_con_uniforme = 0;
    }else {
        existe_guiaturistico = 0;
        guia_con_uniforme = 0;
    }
    
    datos  = '{'
    datos += '"fecha":"' + fecha + '",'
    datos += '"lugar_id":"' + lugar_id + '",'
    datos += '"guardaparque_id":"' + guardaparque_id + '",'
    datos += '"existe_guiaturistico":"' + existe_guiaturistico + '",'
    datos += '"lic_guia_id":"' + lic_guia_id + '",'
    datos += '"guia_con_uniforme":"' + guia_con_uniforme + '",'
    datos += '"pasajero_id":"' + pasajero_id + '",'
    datos += '"num_pasajeros":"' + num_pasajeros + '",'
    datos += '"observaciones":"' + observaciones + '"'
    datos += '}';

    return datos;
}

/*insertar registro actas de turistas*/
function insertActaControlTuristas() {
    let datos = getDataFormControlTuristas(); 
    let id_padre = $('#content_ActaControlTuristas').parent().attr('id');
    th_insert(datos,"control_turista", id_padre, "cincontrolturista",1,"",(controlturistas_id) => {

        /*Guardar registros de sistios con el id del acta de control de turistas*/
        let datosSitios = "";
        for (let i = 0; i < sitios_turista.length; i++) {    
            datosSitios +=  '{'
            datosSitios += '"controlturistas_id":"' + controlturistas_id + '",'
            datosSitios += '"sitiovisita_id":"' + sitios_turista[i]['id'] + '"'
            datosSitios +=  '}'

            if ((i + 1) < sitios_turista.length)
                datosSitios +=  ','
        }
        th_insert(datosSitios,"control_turista", id_padre, "cincontrolturistasitio");
        /*=========================================================================*/
    });
}


function getByIdActaControlTuristas(id){
    limpiarFormControlTuristas();
    $("#cta_tipoOperacion").val(1); // switch para cambiar a metodo de update

    //Consulta los datos del Acta de Control de Turistas  
    $.ajax({
        url: "editActaVisitaCuso",
        type: "get",
        data: {
            "data": id
        },
        dataType: "json",

        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
            } else {
                console.log(data);
                $("#cta_idActaControlTurista").val(data[0].id);
                $("#cta_fecha").val(data[0].fecha.substring(0,10));
                $("#cta_hora").val(data[0].fecha.substring(11,16));
                $("#cta_idLugar").val(data[0].lugar_id.id);
                $("#cta_nombreLugar").val(data[0].lugar_id.descripcion);

                if(data[0].existe_guiaturistico === true) {
                    mostrarDataGuia();
                    $("#cta_guiaTuristico").prop('checked', true); 
                    $("#cta_idLicenciaGuia").val(data[0].lic_guia_id.id);
                    $("#cta_nombreGuia").val(data[0].lic_guia_id.guia_id.persona_id.nombre_completo);
                    $("#cta_numLicGuia").val(data[0].lic_guia_id.num_licencia);
                    $("#cta_fechaEmisionLicGuia").val(data[0].lic_guia_id.fecha_emision);
                    $("#cta_estadoLicGuia").val(data[0].lic_guia_id.estado);
                    $("#cta_fechaCaducidadLicGuia").val(data[0].lic_guia_id.fecha_caducidad);

                    if(data[0].guia_con_uniforme === false)
                        $("#cta_sinUniformeGuia").prop('checked', true);  
                }else{
                    mostrarDataPasajero();
                    $("#cta_guiaTuristico").prop('checked', false);
                    $("#cta_idPasajero").val(data[0].pasajero_id.id);
                    $("#cta_nombrePasajero").val(data[0].pasajero_id.nombre_completo);  
                }
                $("#cta_numPasajeros").val(data[0].num_pasajeros);
                $("#cta_observaciones").val(data[0].observaciones);
                
                /*Mostrar la foto*/
                if(data[0].foto != null){
                    $("#cta_imagen").attr('src', 'data:image/png;base64, '+data[0].foto);
                    $("#cta_divImagen").attr('rel', 'gallery');
                    $("#cta_divImagen").addClass('fancybox');
                    $("#cta_divImagen").attr('href', 'data:image/png;base64, '+data[0].foto);
                    $(".fancybox").fancybox();
                }      
            }
        },
        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
            //console.log( JSON.stringify(data));
        },
    });

    //Consulta los sitios relacionadoa al Acta de control de turistas
    $.ajax({
        url: "editActaTuristaSitio",
        type: "get",
        data: {
            "data": id
        },
        dataType: "json",

        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
            } else {
                if (data.length > 0) {
                    copy_sitios_turista[0] = new Array();
                    copy_sitios_turista[1] = new Array();
                    
                    for (i = 0; i < data.length; i++) {
                        if(data[i].estado == 'A'){
                            sitio = {
                                    id:data[i].sitiovisita_id.id, 
                                    descripcion:data[i].sitiovisita_id.descripcion,
                                    isla:data[i].sitiovisita_id.isla_id.descripcion,
                            };
                            copy_sitios_turista[0][i] = data[i].id;
                            sitios_turista[i] = sitio;
                            copy_sitios_turista[1][i] = sitio;
                        }
                    }
                }
                refreshTablaSitio();                                    
            }
        },
        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
            //console.log( JSON.stringify(data));
        },
    });
       
}

function updateActaControlTurista(){
    let datos = getDataFormControlTuristas();
    id = $("#cta_idActaControlTurista").val();
    id_padre = $('#content_ActaControlTuristas').parent().attr('id');
    th_update(datos, "control_turista", id_padre, "cincontrolturista", id,"",(data) => {
        
        datos = JSON.parse(datos);//convierte la cadena en objeto JS (para extraer el nombre de la foto)
        /*Actualiza el archivo fotografico en el servidor si el archivo nuevo existe en el input*/
        if (datos.foto)
            upload_file("frm_cta_foto",path_fotos_cta);

        updateSitiosActaControlTurista();//Actaulizacion de Siitos del Acta de Control T.
        updateTablaControlTurista(data);//Actualizacion de la tabla de registros de actas de control T.
    });

}

function updateSitiosActaControlTurista(){
    //Verifica sitios nuevos y los guarda en la BD
    datosSitios = "";
    for (let i = 0; i < sitios_turista.length; i++) {    
        validate = JSON.stringify(copy_sitios_turista[1]).indexOf(JSON.stringify(sitios_turista[i])) > -1;
        if(!validate){
            //alert('No esta!!!')
            datosSitios +=  '{'
            datosSitios += '"controlturistas_id":"' + id + '",'
            datosSitios += '"sitiovisita_id":"' + sitios_turista[i]['id'] + '"'
            datosSitios +=  '}'
            th_insert(datosSitios,"control_turista", id_padre,"cincontrolturistasitio",1);
        }
    }
    //Verifica sitios eliminados y actualiza el estado
    datosSitios = "";
    for (let i = 0; i < copy_sitios_turista[1].length; i++) {    
        validate = JSON.stringify(sitios_turista).indexOf(JSON.stringify(copy_sitios_turista[1][i])) > -1;
        if(!validate){
            id = copy_sitios_turista[0][i];
            id_padre = $('#content_ActaControlTuristas').parent().attr('id');
            datosSitios = '{"estado":"I","eliminado":"t"}';
            th_delete(datosSitios,"control_turista", id_padre, "cincontrolturistasitio",id,1);
        }
    }    
}

function updateTablaControlTurista(data){
    id = data.id;
    $("#td_cta_fecha_" + id).html($("#cta_fecha").val());
    $("#td_cta_hora_" + id).html($("#cta_hora").val());
    
    if(data.existe_guiaturistico === true) {
        //$("#td_cta_identificacion_" + id).html($("#").val());
        $("#td_cta_nombre_" + id).html($("#cta_nombreGuia").val());
        $("#td_cta_GuiaPasajero_" + id).html("Guia Turist.");
        if(data.guia_con_uniforme === true)
            $("#td_cta_uniforme_" + id).html("SI");
        else
            $("#td_cta_uniforme_" + id).html("NO");
    }else{
        //$("#td_cta_identificacion_" + id).html($("#").val());
        $("#td_cta_nombre_" + id).html($("#cta_nombrePasajero").val());
        $("#td_cta_GuiaPasajero_" + id).html("Pasajero");
        $("#td_cta_uniforme_" + id).html("NO");
    }

    $("#td_cta_numPasajeros_" + id).html($("#cta_numPasajeros").val());
    $("#td_cta_observacion_" + id).html($("#cta_observaciones").val());
}

function deleteRowTablaControlTurista(data){
    idtabla = data.id;
    console.log(idtabla);
    $("#tr_cta_fila_" + idtabla).remove();
}

/*delete registros de actas*/
function deleteActaControlTurista(id) {
    id_padre = $('#content_ActaControlTuristas').parent().attr('id');
    datos = '{"estado":"I","eliminado":"t"}';
    th_delete(datos, "control_turista", id_padre, "cincontrolturista", id,"",deleteRowTablaControlTurista);
}
/*==================================================================================================================*/
/*==================================================================================================================*/





/*=================================================CRUD PESCA==================================================*/
/*============================================ACTA CONTROL PESCA===============================================*/
function getActaControlPesca(){
    data = '';
    licenciaParmaCP = $("#licenciaParmaCP").val();
    permisoEmbarcacionCP = $("#permisoEmbarcacionCP").val();
    if (licenciaParmaCP != "")
            data = "parma_id__c_licenciaparma__icontains=" + licenciaParmaCP + "&";
    
    if (permisoEmbarcacionCP != "")
            data = "permiso_id__c_permisopesca__icontains=" + permisoEmbarcacionCP + "&";

    $.ajax({
        url: "data_ParamActaControlPesca",
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
                        if(data[i].estado == 'A'){
                            
                            fecha = (data[i].fecha.substring(0,10));
                            hora  = (data[i].fecha.substring(11,16));

                            tabla += "<tr id='tr_cp_fila_" + data[i].id + "'>";
                            tabla += "<td align='center' id='td_cp_fecha_" + data[i].id + "'>" + fecha + "</td>";
                            tabla += "<td align='center' id='td_cp_hora_" + data[i].id + "'>" + hora + "</td>";
                            tabla += "<td align='center' id='td_cp_identPescador_" + data[i].id + "'>" + data[i].parma_id.c_cedula + "</td>";
                            tabla += "<td align='center' id='td_cp_parmaPescador_" + data[i].id + "'>" + data[i].parma_id.c_licenciaparma + "</td>";
                            tabla += "<td align='center' id='td_cp_pescador_" + data[i].id + "'>" + data[i].parma_id.c_apellidos + ' ' + data[i].parma_id.c_nombres + "</td>";
                            tabla += "<td align='center' id='td_cp_identConductor_" + data[i].id + "'>" + data[i].ident_conductor + "</td>";
                            tabla += "<td align='center' id='td_cp_conductor_" + data[i].id + "'>" + data[i].nombres_conductor + ' ' + data[i].apellidos_conductor + "</td>";
                            tabla += "<td align='center' id='td_cp_observacion_" + data[i].id + "'>" + data[i].observaciones + "</td>";
                            tabla += "<td align='center'><a href='#addActaControlPesca' data-stackbox='true' data-stackbox-position='absolute' onclick='getByIdActaControlPesca(\"" + data[i].id + "\")'><i class='fa fa-edit text-green'></i></a></td>";
                            tabla += "<td align='center'><a style='cursor: pointer;' onclick='deleteModal(\"" + data[i].id + "\",\"ActaControlPesca\");'><i class='fa fa-trash text-green' title='Eliminar'></i></a></td>";
                            tabla += "</tr>";
                        }
                    }
                }

                $('#tabla_ActaControlPesca').dataTable().fnClearTable();
                $('#tabla_ActaControlPesca').dataTable().fnDestroy();

                $("#bodytabla_ActaControlPesca").html("");
                $("#bodytabla_ActaControlPesca").append(tabla);
                $('#tabla_ActaControlPesca').DataTable();
            }
        },

        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
            //console.log( JSON.stringify(data));
        },
    });
}

function validarNumRegistrosPesca(){
    if(registro_pesca.length > 0)
        return true;
    else
        validaContenedorExt("addActaControlPesca","Ingrese al menos 1 registro de pesca");  
}

function setInsertUpdateActaCtrlPesca() {
    if(validarNumRegistrosPesca()){
        valida = validaContenedor("addActaControlPesca");
        if (valida){
            if ($("#cp_tipoOperacion").val() == 0)
                insertActaControlPesca();
            else
                updateActaControlPesca();   
        }        
    }
}

function getDataFormControlPesca(){
    /*Datos del acta de control de pesca*/
    fecha = $("#cp_fecha").val() + ' ' + $("#cp_hora").val();
    lugar_id = $("#cp_idLugar").val();
    guardaparque_id = $("#cp_idGuardaparque").val(); //User Funcionario
    parma_id = $("#cp_idParma").val(); // Licencia del Pescador
    ident_conductor = $("#cp_indentConductor").val();
    nombres_conductor = $("#cp_nombresConductor").val();
    apellidos_conductor = $("#cp_apellidosConductor").val();
    observaciones = $("#cp_observaciones").val();

    /*Diccionario*/
    datos  = '{'
    datos += '"fecha":"' + fecha + '",'
    datos += '"guardaparque_id":"' + guardaparque_id + '",'
    datos += '"lugar_id":"' + lugar_id + '",'
    datos += '"parma_id":"' + parma_id + '",'
    datos += '"ident_conductor":"' + ident_conductor + '",'
    datos += '"nombres_conductor":"' + nombres_conductor + '",'
    datos += '"apellidos_conductor":"' + apellidos_conductor + '",'
    datos += '"observaciones":"' + observaciones + '"'
    datos += '}';
    return datos;
}


/*insertar registro actas de control de pesca, datos generales*/
function insertActaControlPesca() {
    datos = getDataFormControlPesca();
    id_padre = $('#content_ActaControlPesca').parent().attr('id');
    th_insert(datos,"addActaControlPesca", id_padre, "cincontrolpesca",1,"",(controlpesca_id) => {

        /*insertar registros de especies, unidad y peso*/
        let  datosEspecie = "";
        for (let i = 0; i < registro_pesca.length; i++) {    
            datosEspecie +=  '{'
            datosEspecie += '"controlpesca_id":"' + controlpesca_id + '",'
            datosEspecie += '"especie_id":"' + registro_pesca[i]['id_especie'] + '",'
            datosEspecie += '"unidad":"' + registro_pesca[i]['unidad'] + '",'
            datosEspecie += '"peso":"' + registro_pesca[i]['peso'] + '"'
            datosEspecie +=  '}'
        
            if ((i + 1) < registro_pesca.length)
            datosEspecie +=  ','
        }
        let id_padre = $('#content_ActaControlPesca').parent().attr('id');
        th_insert(datosEspecie,"addActaControlPesca", id_padre, "cincontrolpescaespecie");
    });    
}



/*Obtiene un registro de control de pesca segun el id*/
/*Datos Generales y los registros de las especies*/
function getByIdActaControlPesca(id){
    limpiarFormControlPesca();
    $("#cp_tipoOperacion").val(1); // switch para cambiar a metodo de update
        $.ajax({
        url: "editActaControlPesca",
        type: "get",
        data: {
            "data": id
        },
        dataType: "json",

        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
            } else {
                $("#idActaControlPesca").val(data[0].id);
                $("#cp_fecha").val(data[0].fecha.substring(0,10));
                $("#cp_hora").val(data[0].fecha.substring(11,16));
                $("#cp_idLugar").val(data[0].lugar_id.id);
                $("#cp_nombreLugar").val(data[0].lugar_id.descripcion);
                $("#cp_idParma").val(data[0].parma_id.id);
                $("#cp_nombrePescador").val(data[0].parma_id.c_apellidos + ' ' + data[0].parma_id.c_nombres);
                $("#cp_identificacionPescador").val(data[0].parma_id.c_cedula);
                $('#cp_licenciaParma').val(data[0].parma_id.c_licenciaparma);
                $('#cp_estadoLicenciaParma').val(data[0].parma_id.c_estado);
                $('#cp_fechaEmisionLicParma').val(data[0].parma_id.c_fechaemision);
                $('#cp_fechaCaducidadLicParma').val(data[0].parma_id.c_fechacaducidad);
                $("#cp_indentConductor").val(data[0].ident_conductor);
                $("#cp_nombresConductor").val(data[0].nombres_conductor);
                $("#cp_apellidosConductor").val(data[0].apellidos_conductor);
                $("#cp_observaciones").val(data[0].observaciones);

                 /*Mostrar la foto*/
                if(data[0].foto != null){
                    $("#cp_imagen").attr('src', 'data:image/png;base64, '+data[0].foto);
                    $("#cp_divImagen").attr('rel', 'gallery');
                    $("#cp_divImagen").addClass('fancybox');
                    $("#cp_divImagen").attr('href', 'data:image/png;base64, '+data[0].foto);
                    $(".fancybox").fancybox();
                }     

            }
        },
        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
        },
    });

    $.ajax({
        url: "editActaPescaEspecie",
        type: "get",
        data: {
            "data": id
        },
        dataType: "json",

        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
            } else {
                if (data.length > 0) {
                    copy_registro_pesca[0] = new Array();
                    copy_registro_pesca[1] = new Array();

                    for (i = 0; i < data.length; i++) {
                        if(data[i].estado == 'A'){ //Solo registros activas
                            
                            datos_pesca = {
                                    id_especie:data[i].especie_id.id, 
                                    especie:data[i].especie_id.nombre_comun,
                                    unidad:data[i].unidad,
                                    peso:data[i].peso
                            };
                            copy_registro_pesca[0][i] = data[i].id;
                            registro_pesca[i] = datos_pesca;
                        }
                    }
                    copy_registro_pesca[1] = JSON.parse(JSON.stringify(registro_pesca));
                }
                refreshTablaPesca();                                    
            }
        },
        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
        },
    });
}

function updateActaControlPesca(){
    let datos = getDataFormControlPesca();
    id = $("#idActaControlPesca").val();
    id_padre = $('#content_ActaControlPesca').parent().attr('id');
    th_update(datos, "control_pesca", id_padre, "cincontrolpesca", id,"",(data) => {
        datos = JSON.parse(datos);//convierte la cadena en objeto JS (para extraer el nombre de la foto)
        /*Actualiza el archivo fotografico en el servidor si el archivo nuevo existe en el input*/
        if (datos.foto)
            upload_file("frm_ctp_foto",path_fotos_ctp);

        updateEspeciesActaControlPesca();// Actualiza los registros de especies.
        updateTablaControlPesca(data); // Actualiza la tabla de registros de actas.
    }); 
}


function updateEspeciesActaControlPesca(){
    let existe_data;
    let datosPesca = "";
    for (let i = 0; i < registro_pesca.length; i++) {    
        existe_data = 0;
        for (let k = 0; k < copy_registro_pesca[1].length; k++) {    
            //si el registro existe y hay cambios, actualiza el registro
            if (registro_pesca[i]['id_especie'] == copy_registro_pesca[1][k]['id_especie']){
                if((registro_pesca[i]['unidad'] != copy_registro_pesca[1][k]['unidad']) || (registro_pesca[i]['peso'] != copy_registro_pesca[1][k]['peso']) ){
                    datosPesca = "";
                    datosPesca +=  '{'
                    datosPesca += '"controlpesca_id":"' + id + '",'
                    datosPesca += '"especie_id":"' + registro_pesca[i]['id_especie'] + '",'
                    datosPesca += '"unidad":"' + registro_pesca[i]['unidad'] + '",'
                    datosPesca += '"peso":"' + registro_pesca[i]['peso'] + '"'
                    datosPesca +=  '}'
                    id_registro = copy_registro_pesca[0][k];
                    th_update(datosPesca,"addActaControlPesca", id_padre,"cincontrolpescaespecie",id_registro);
                }
                existe_data = 1;
            }
        }
            //si el registro no existe, entonces lo inserta
        datosPesca = "";
        if(existe_data == 0){
            console.log('nuevo');
            datosPesca +=  '{'
            datosPesca += '"controlpesca_id":"' + id + '",'
            datosPesca += '"especie_id":"' + registro_pesca[i]['id_especie'] + '",'
            datosPesca += '"unidad":"' + registro_pesca[i]['unidad'] + '",'
            datosPesca += '"peso":"' + registro_pesca[i]['peso'] + '"'
            datosPesca +=  '}'
            th_insert(datosPesca,"addActaControlPesca", id_padre, "cincontrolpescaespecie",1);
        }
    }

    //Verifica registro de pesca que hayan sido eliminados
    datosPesca = "";
    for (let i = 0; i < copy_registro_pesca[1].length; i++) {    
        existe_data_del = 1;
        for (let k = 0; k < registro_pesca.length; k++) {   
            if (copy_registro_pesca[1][i]['id_especie'] == registro_pesca[k]['id_especie'])
                existe_data_del = 0;
        }

        if(existe_data_del == 1){
            id = copy_registro_pesca[0][i];
            id_padre = $('#content_ActaControlPesca').parent().attr('id');
            datosPesca = '{"estado":"I","eliminado":"t"}';
            th_delete(datosPesca,"control_pesca", id_padre, "cincontrolpescaespecie",id,1);
        }
    }
}

function updateTablaControlPesca(data){
    id = data.id;
    $("#td_cp_fecha_" + id).html($("#cp_fecha").val());
    $("#td_cp_hora_" + id).html($("#cp_hora").val());
    $("#td_cp_identPescador_" + id).html($("#cp_identificacionPescador").val());
    $("#td_cp_parmaPescador_" + id).html($('#cp_licenciaParma').val());
    $("#td_cp_pescador_" + id).html($("#cp_nombrePescador").val());        
    $("#td_cp_identConductor_" + id).html($("#cp_indentConductor").val());
    $("#td_cp_conductor_" + id).html($("#cp_nombresConductor").val() + ' ' + $("#cp_apellidosConductor").val());
    $("#td_cp_observacion_" + id).html($("#cp_observaciones").val());                        
}

function deleteRowTablaControlPesca(data){
    idtabla = data.id;
    console.log(idtabla);
    $("#tr_cp_fila_" + idtabla).remove();
}

/*delete registros de actas*/
function deleteActaControlPesca(id) {
    id_padre = $('#content_ActaControlPesca').parent().attr('id');
    datos = '{"estado":"I","eliminado":"t"}';
    th_delete(datos, "control_pesca", id_padre, "cincontrolpesca", id,"",deleteRowTablaControlPesca);
    
}
/*=============================================================================================================*/
/*=============================================================================================================*/


/*=============================================CRUD CONTENEDORES===============================================*/
/*===========================================CONTROL CONTENEDORES==============================================*/

function validarSelectEmbarcacion(){
    if($("#ccont_embarcacion").val() != 0)
        return true;
    else
        validaContenedorExt("addActaControlContenedores","Seleccione Embarcacion");  
}

function setInsertUpdateActaControlContenedores() {
    valida_select_embarcacion = validarSelectEmbarcacion();
    valida_contenedor = validaContenedor("addActaControlContenedores");

    if (valida_select_embarcacion == true && valida_contenedor == true){
        if ($("#ccont_tipoOperacion").val() == 0)
            insertActaControlContenedores();
        else
            updateActaControlContenedores();
    }
}

function getDataFormControlContenedores(){
    /*Datos Generales*/
    fecha = $("#ccont_fecha").val() + ' ' + $("#ccont_hora").val();
    lugar_id = $("#ccont_idLugar").val();
    guardaparque_id = $("#ccont_idGuardaparque").val();
    embarcacion = $("#ccont_embarcacion").val();
    cod_contenedor = $("#ccont_codigoContenedor").val();
    num_bultos = $("#ccont_numBultos").val();
    observaciones = $("#ccont_observaciones").val();

    /*Diccionario*/
    datos  = '{'
    datos += '"fecha":"' + fecha + '",'
    datos += '"lugar_id":"' + lugar_id + '",'
    datos += '"guardaparque_id":"' + guardaparque_id + '",'
    datos += '"embarcacion":"' + embarcacion + '",'
    datos += '"cod_contenedor":"' + cod_contenedor + '",'
    datos += '"num_bultos":"' + num_bultos + '",'
    datos += '"observaciones":"' + observaciones + '"'
    datos += '}';

    return datos;
}

/*insertar registro actas de control patrullaje bares*/
function insertActaControlContenedores() {
    id_padre = $('#contentActaControlContenedores').parent().attr('id');
    datos = getDataFormControlContenedores(); 
    th_insert(datos,"addActaControlContenedores", id_padre, "cininspeccioncontenedores");
}

function getEmbarcacionesContenedor(){
    const arr_embarcaciones = new Array();
    $('#ccont_embarcacion').find('option').each(function(index,element){
        arr_embarcaciones.push(element.text);     
    });
    return arr_embarcaciones;
}


function getActaControlContenedores(){
    const embarcaciones = getEmbarcacionesContenedor();
    
    fecha_desde = $("#ccont_fechaDesde").val();
    fecha_hasta = $("#ccont_fechahasta").val();
    codigo_contenedor = $("#ccont_codContenedor").val();
    data = "";
    
    if (fecha_desde != "" && fecha_hasta != "")
        data = "fecha__range=" + fecha_desde + ',' + fecha_hasta + "&";

    $.ajax({
        url: "data_ParamActaControlContenedores",
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
                        if(data[i].estado == 'A'){

                            fecha = (data[i].fecha.substring(0,10));
                            hora  = (data[i].fecha.substring(11,16));

                            tabla += "<tr id='tr_ccont_fila_" + data[i].id + "'>";
                            tabla += "<td align='center' id='td_ccont_fecha_" + data[i].id + "'>" + fecha + "</td>";
                            tabla += "<td align='center' id='td_ccont_hora_" + data[i].id + "'>" + hora + "</td>";
                            tabla += "<td align='center' id='td_ccont_embarcacion_" + data[i].id + "'>" + embarcaciones[data[i].embarcacion] + "</td>";
                            tabla += "<td align='center' id='td_ccont_codContenedor_" + data[i].id + "'>" + data[i].cod_contenedor + "</td>";
                            tabla += "<td align='center' id='td_ccont_numBultos_" + data[i].id + "'>" + data[i].num_bultos + "</td>";
                            tabla += "<td align='center' id='td_ccont_observ_" + data[i].id + "'>" + data[i].observaciones + "</td>";
                            
                            tabla += "<td align='center'><a href='#addActaControlContenedores' data-stackbox='true' data-stackbox-position='absolute' onclick='getByIdActaControlContenedores(\"" + data[i].id + "\")'><i class='fa fa-edit text-green'></i></a></td>";
                            tabla += "<td align='center'><a style='cursor: pointer;' onclick='deleteModal(\"" + data[i].id + "\",\"ActaControlContenedores\");'><i class='fa fa-trash text-green' title='Eliminar'></i></a></td>";
                            tabla += "</tr>";
                        }
                    }
                }
                $('#tabla_ActaControlContenedores').dataTable().fnClearTable();
                $('#tabla_ActaControlContenedores').dataTable().fnDestroy();
                $("#bodytabla_ActaControlContenedores").html("");
                $("#bodytabla_ActaControlContenedores").append(tabla);
                $('#tabla_ActaControlContenedores').DataTable();
            }
        },

        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
            //console.log( JSON.stringify(data));
        },
    });
}

function getByIdActaControlContenedores(id){
    limpiarFormControlContenedores();
    $("#ccont_tipoOperacion").val(1); // switch para cambiar a metodo de update
        $.ajax({
        url: "editActaControlContenedores",
        type: "get",
        data: {
            "data": id
        },
        dataType: "json",

        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
            } else {
                $("#idActaControlContenedores").val(data[0].id);
                $("#ccont_fecha").val(data[0].fecha.substring(0,10));
                $("#ccont_hora").val(data[0].fecha.substring(11,16));
                $("#ccont_idLugar").val(data[0].lugar_id.id);
                $("#ccont_nombreLugar").val(data[0].lugar_id.descripcion);
                $("#ccont_embarcacion").val(data[0].embarcacion).trigger('change');;
                $("#ccont_codigoContenedor").val(data[0].cod_contenedor);
                $("#ccont_numBultos").val(data[0].num_bultos); 
                $("#ccont_observaciones").val(data[0].observaciones);

                 /*Mostrar la foto*/
                if(data[0].foto != null){
                    $("#ccont_imagen").attr('src', 'data:image/png;base64, '+data[0].foto);
                    $("#ccont_divImagen").attr('rel', 'gallery');
                    $("#ccont_divImagen").addClass('fancybox');
                    $("#ccont_divImagen").attr('href', 'data:image/png;base64, '+data[0].foto);
                    $(".fancybox").fancybox();
                }     
            }
        },
        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
        },
    });
}

/*actualiza registros de actas de control de contenedores*/
function updateActaControlContenedores(){
    let id = $("#idActaControlContenedores").val();
    let id_padre = $('#contentActaControlContenedores').parent().attr('id');
    let datos = getDataFormControlContenedores();
    th_update(datos, "addActaControlContenedores", id_padre, "cininspeccioncontenedores", id,"",(data) => {
        datos = JSON.parse(datos);//convierte la cadena en objeto JS (para extraer el nombre de la foto)
        /*Actualiza el archivo fotografico en el servidor si el archivo nuevo existe en el input*/
        if (datos.foto)
            upload_file("frm_ctc_foto",path_fotos_ctc);

        updateTablaControlContenedores(data);//actauliza la tabla
    });    
}

function updateTablaControlContenedores(data){
    id = data.id;
    const embarcaciones = getEmbarcacionesContenedor();
    $("#td_ccont_fecha_" + id).html(data.fecha.substring(0,10));
    $("#td_ccont_hora_" + id).html(data.fecha.substring(11,16));
    $("#td_ccont_embarcacion_" + id).html(embarcaciones[data.embarcacion]); 
    $("#td_ccont_codContenedor_" + id).html(data.cod_contenedor);
    $("#td_ccont_numBultos_" + id).html(data.num_bultos);
    $("#td_ccont_observ_" + id).html(data.observaciones);
}

/*Elimina (actualiza el estado),registros de actas de control de contenedores*/
function deleteActaControlContenedores(id) {
    id_padre = $('#contentActaControlContenedores').parent().attr('id');
    datos = '{"estado":"I","eliminado":"t"}';
    th_delete(datos, "control_contenedores", id_padre, "cininspeccioncontenedores", id,"",deleteRowTablaControlContenedores);
}

function deleteRowTablaControlContenedores(data){
    idtabla = data.id;
    console.log(idtabla);
    $("#tr_ccont_fila_" + idtabla).remove();
}


/*----------------------------CRUD CONTROL AEROPUERTO IGUANAS------------------------------------*/
/*------------------------------------AEROPUERTO IGUANAS-----------------------------------------*/

function setInsertUpdateActaControlAeropIguanas() {
        valida = validaContenedor("addActaControlAeropIguanas");
        if (valida){
            if ($("#capi_tipoOperacion").val() == 0)
                insertActaControlAeropIguanas();
            else
                updateActaControlAeropIguanas();
        }
}

function getDataFormControlAeropIguanas(){
    funcionarios_id = new Array();
    funcionarios_nombre = new Array();    

    /*Datos Generales*/
    fecha = $("#capi_fecha").val() + ' ' + $("#capi_hora").val();
    lugar_id = $("#capi_idLugar").val();
    /*Personal DPNG*/
    $("#capi_funcionarios option:selected").each(function(){
        if ($(this).attr('value') != ""){
            funcionarios_id.push($(this).attr('value'));
            funcionarios_nombre.push($(this).text());
        }
    });
    personal_otro = $("#capi_personalOtro").val();
    cantidad_mov  = $("#capi_cantidadMov").val();
    observaciones = $("#capi_observaciones").val();

    /*Diccionario*/
    datos  = '{'
    datos += '"fecha":"' + fecha + '",'
    datos += '"lugar_id":"' + lugar_id + '",'
    datos += '"funcionarios_id":"' + funcionarios_id.join('|') +  '",'
    datos += '"funcionarios_nombre":"' + funcionarios_nombre.join('|') + '",'
    datos += '"personal_otro":"' + personal_otro + '",'
    datos += '"cantidad_mov":"' + cantidad_mov + '",'
    datos += '"observaciones":"' + observaciones + '"'
    datos += '}';

    return datos;
}

/*insertar registro actas de control patrullaje bares*/
function insertActaControlAeropIguanas() {
    id_padre = $('#contentActaControlAeropIguanas').parent().attr('id');
    datos = getDataFormControlAeropIguanas(); 
    th_insert(datos,"control_iguanas", id_padre, "cincontrolaeropuertoiguanas"); 
}


function getActaControlAeropIguanas(){
    
    fecha_desde = $("#capi_fechaDesde").val();
    fecha_hasta = $("#capi_fechahasta").val();
    
    data = "";
    
    if (fecha_desde != "" && fecha_hasta != "")
        data = "fecha__range=" + fecha_desde + ',' + fecha_hasta + "&";

    $.ajax({
        url: "data_ParamActaControlAeropuertoIguanas",
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
                        if(data[i].estado == 'A'){

                            fecha = (data[i].fecha.substring(0,10));
                            hora  = (data[i].fecha.substring(11,16));

                            tabla += "<tr id='tr_capi_fila_" + data[i].id + "'>";
                            tabla += "<td align='center' id='td_capi_fecha_" + data[i].id + "'>" + fecha + "</td>";
                            tabla += "<td align='center' id='td_capi_hora_" + data[i].id + "'>" + hora + "</td>";
                            tabla += "<td align='center' id='td_capi_personalDPNG_" + data[i].id + "'>" +  data[i].funcionarios_nombre.split("|") + "</td>";
                            tabla += "<td align='center' id='td_capi_personalOtro_" + data[i].id + "'>" + data[i].personal_otro + "</td>";
                            tabla += "<td align='center' id='td_capi_cantidadMov_" + data[i].id + "'>" + data[i].cantidad_mov + "</td>";
                            tabla += "<td align='center' id='td_capi_observ_" + data[i].id + "'>" + data[i].observaciones + "</td>";
                            
                            tabla += "<td align='center'><a href='#addActaControlAeropIguanas' data-stackbox='true' data-stackbox-position='absolute' onclick='getByIdActaControlAeropIguanas(\"" + data[i].id + "\")'><i class='fa fa-edit text-green'></i></a></td>";
                            tabla += "<td align='center'><a style='cursor: pointer;' onclick='deleteModal(\"" + data[i].id + "\",\"ActaControlAeropIguanas\");'><i class='fa fa-trash text-green' title='Eliminar'></i></a></td>";
                            tabla += "</tr>";
                        }
                    }
                }

                $('#tabla_ActaControlAeropIguanas').dataTable().fnClearTable();
                $('#tabla_ActaControlAeropIguanas').dataTable().fnDestroy();

                $("#bodytabla_ActaControlAeropIguanas").html("");
                $("#bodytabla_ActaControlAeropIguanas").append(tabla);

                $('#tabla_ActaControlAeropIguanas').DataTable();
            }
        },

        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
            //console.log( JSON.stringify(data));
        },
    });
}

function getByIdActaControlAeropIguanas(id){
    limpiarFormControlAeropIguanas();
    
    $("#capi_tipoOperacion").val(1); // switch para cambiar a metodo de update
        $.ajax({
        url: "editActaControlAeropuertoIguana",
        type: "get",
        data: {
            "data": id
        },
        dataType: "json",

        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
            } else {
                
                $("#idActaControlAeropIguanas").val(data[0].id);
                $("#capi_fecha").val(data[0].fecha.substring(0,10));
                $("#capi_hora").val(data[0].fecha.substring(11,16));
                $("#capi_idLugar").val(data[0].lugar_id.id);
                $("#capi_nombreLugar").val(data[0].lugar_id.descripcion);
                $("#capi_funcionarios").val(data[0].funcionarios_nombre).trigger('change');
                $("#capi_personalOtro").val(data[0].personal_otro);
                $("#capi_cantidadMov").val(data[0].cantidad_mov);
                $("#capi_observaciones").val(data[0].observaciones);                                 
                
                if (data[0].funcionarios_id != null) {
                    funcionarios = data[0].funcionarios_id.split("|");
                    $("#capi_funcionarios").val(funcionarios).trigger('change');
                } 

                if(data[0].foto != null){
                    $("#capi_imagen").attr('src', 'data:image/png;base64, '+data[0].foto);
                    $("#capi_divImagen").attr('rel', 'gallery');
                    $("#capi_divImagen").addClass('fancybox');
                    $("#capi_divImagen").attr('href', 'data:image/png;base64, '+data[0].foto);
                    $(".fancybox").fancybox();
                }   
            }
        },
        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
        },
    });
}

/*actualiza registros de actas de control de contenedores*/
function updateActaControlAeropIguanas(){
    let id = $("#idActaControlAeropIguanas").val();
    let id_padre = $('#contentActaControlAeropIguanas').parent().attr('id');
    let datos = getDataFormControlAeropIguanas();
    th_update(datos, "control_iguanas", id_padre, "cincontrolaeropuertoiguanas", id,"",updateTablaControlAeropIguanas);    
}

function updateTablaControlAeropIguanas(data){
    id = data.id;
    const regex = /|/;

    $("#td_capi_fecha_" + id).html(data.fecha.substring(0,10));
    $("#td_capi_hora_" + id).html(data.fecha.substring(11,16));
    $("#td_capi_lugar_" + id).html($("#capi_nombreLugar").val()); 
    $("#td_capi_personalDPNG_" + id).html(data.funcionarios_nombre.replace(/[|]/gi,','));//reemplaza el "|" por ","
    $("#td_capi_personalOtro_" + id).html(data.personal_otro);
    $("#td_capi_cantidadMov_" + id).html(data.cantidad_mov);
    $("#td_capi_observ_" + id).html(data.observaciones);
}

/*Elimina (actualiza el estado),registros de actas de control de contenedores*/
function deleteActaControlAeropIguanas(id) {
    id_padre = $('#contentActaControlAeropIguanas').parent().attr('id');
    datos = '{"estado":"I","eliminado":"t"}';
    th_delete(datos, "control_iguanas", id_padre, "cincontrolaeropuertoiguanas", id,"",deleteRowTablaControlAeropIguanas);
}

function deleteRowTablaControlAeropIguanas(data){
    idtabla = data.id;
    console.log(idtabla);
    $("#tr_capi_fila_" + idtabla).remove();
}
/*----------------------------------------------------------------------------------*/

/*----------------------------CRUD CONTROL AEROPUERTO RECORRIDOS------------------------------------*/
/*------------------------------------AEROPUERTO RECORRIDOS-----------------------------------------*/
function validaSelectCaprFuncionarios(){
    let count = 0;
    $("#capr_funcionarios option:selected").each(function(){
        if ($(this).attr('value') != "")
            count++;
    });
    if (count > 0){
        return true;
    }
    else{
        validaContenedorExt("addActaControlAeropRecorridos","Seleccione Funcionario"); 
        return false;    
    }
}



function setInsertUpdateActaControlAeropRecorridos() {
        valida_select_funcionario = validaSelectCaprFuncionarios();
        valida = validaContenedor("addActaControlAeropRecorridos");
        
        if (valida==true && valida_select_funcionario==true){
            if ($("#capr_tipoOperacion").val() == 0)
                insertActaControlAeropRecorridos();
            else
                updateActaControlAeropRecorridos();
        }
}

function getDataFormControlAeropRecorridos(){
    funcionarios_id = new Array();
    funcionarios_nombre = new Array();

    /*Datos Generales*/
    fecha = $("#capr_fecha").val() + ' ' + $("#capr_hora").val();
    
    $("#capr_funcionarios option:selected").each(function(){
        if ($(this).attr('value') != ""){
            funcionarios_id.push($(this).attr('value'));
            funcionarios_nombre.push($(this).text());
        }
    });

    sitio_id = $("#capr_idSitio").val();
    area_pista = $("#capr_pista").prop('checked');
    area_via = $("#capr_via").prop('checked');
    observaciones = $("#capr_observaciones").val();

    /*Diccionario*/
    datos  = '{'
    datos += '"fecha":"' + fecha + '",'
    datos += '"funcionarios_id":"' + funcionarios_id.join('|') +  '",'
    datos += '"funcionarios_nombre":"' + funcionarios_nombre.join('|') + '",'
    datos += '"sitio_id":"' + sitio_id + '",'
    datos += '"area_pista":"' + area_pista + '",'
    datos += '"area_via":"' + area_via + '",'
    datos += '"observaciones":"' + observaciones + '"'
    datos += '}';

    return datos;
}

/*insertar registro actas de control patrullaje bares*/
function insertActaControlAeropRecorridos() {
    id_padre = $('#contentActaControlAeropRecorridos').parent().attr('id');
    datos = getDataFormControlAeropRecorridos(); 
    th_insert(datos,"control_aerop_recorrido", id_padre, "cincontrolaeropuertorecorridos"); 
}


function getActaControlAeropRecorridos(){
    
    fecha_desde = $("#capr_fechaDesde").val();
    fecha_hasta = $("#capr_fechaHasta").val();
    
    data = "";
    
    if (fecha_desde != "" && fecha_hasta != "")
        data = "fecha__range=" + fecha_desde + ',' + fecha_hasta + "&";

    $.ajax({
        url: "data_ParamActaControlAeropuertoRecorridos",
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
                        if(data[i].estado == 'A'){

                            fecha = (data[i].fecha.substring(0,10));
                            hora  = (data[i].fecha.substring(11,16));

                            area_recorrido = "";
                            if(data[i].area_pista == true)
                                area_recorrido += 'PISTA '

                            if(data[i].area_via == true)
                                area_recorrido += 'VIA'


                            tabla += "<tr id='tr_capr_fila_" + data[i].id + "'>";
                            tabla += "<td align='center' id='td_capr_fecha_" + data[i].id + "'>" + fecha + "</td>";
                            tabla += "<td align='center' id='td_capr_hora_" + data[i].id + "'>" + hora + "</td>";
                            tabla += "<td align='center' id='td_capr_sitio_" + data[i].id + "'>" + data[i].sitio_id.descripcion + "</td>";
                            tabla += "<td align='center' id='td_capr_personalDPNG_" + data[i].id + "'>" + data[i].funcionarios_nombre.split("|") + "</td>";
                            tabla += "<td align='center' id='td_capr_area_" + data[i].id + "'>" + area_recorrido + "</td>";
                            tabla += "<td align='center' id='td_capr_observ_" + data[i].id + "'>" + data[i].observaciones + "</td>";
                            
                            tabla += "<td align='center'><a href='#addActaControlAeropRecorridos' data-stackbox='true' data-stackbox-position='absolute' onclick='getByIdActaControlAeropRecorridos(\"" + data[i].id + "\")'><i class='fa fa-edit text-green'></i></a></td>";
                            tabla += "<td align='center'><a style='cursor: pointer;' onclick='deleteModal(\"" + data[i].id + "\",\"ActaControlAeropRecorridos\");'><i class='fa fa-trash text-green' title='Eliminar'></i></a></td>";
                            tabla += "</tr>";
                        }
                    }
                }

                $('#tabla_ActaControlAeropRecorridos').dataTable().fnClearTable();
                $('#tabla_ActaControlAeropRecorridos').dataTable().fnDestroy();

                $("#bodytabla_ActaControlAeropRecorridos").html("");
                $("#bodytabla_ActaControlAeropRecorridos").append(tabla);

                $('#tabla_ActaControlAeropRecorridos').DataTable();
            }
        },

        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
            //console.log( JSON.stringify(data));
        },
    });
}

function getByIdActaControlAeropRecorridos(id){
    limpiarFormControlAeropRecorridos();
    
    $("#capr_tipoOperacion").val(1); // switch para cambiar a metodo de update
        $.ajax({
        url: "editActaControlAeropuertoRecorridos",
        type: "get",
        data: {
            "data": id
        },
        dataType: "json",

        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
            } else {
                $("#idActaControlAeropRecorridos").val(data[0].id);
                $("#capr_fecha").val(data[0].fecha.substring(0,10));
                $("#capr_hora").val(data[0].fecha.substring(11,16));
                $('#capr_funcionarios').val(data[0].funcionarios_nombre).trigger("change");
                $("#capr_idSitio").val(data[0].sitio_id.id);
                $("#capr_nombreSitio").val(data[0].sitio_id.descripcion);
                $("#capr_pista").prop('checked', data[0].area_pista);
                $("#capr_via").prop('checked', data[0].area_via);
                $("#capr_observaciones").val(data[0].observaciones);                                 
                if (data[0].funcionarios_id != null) {
                    funcionarios = data[0].funcionarios_id.split("|");
                    $("#capr_funcionarios").val(funcionarios).trigger('change');
                }    

            }
        },
        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
        },
    });
}

/*actualiza registros de actas de control de contenedores*/
function updateActaControlAeropRecorridos(){
    let id = $("#idActaControlAeropRecorridos").val();
    let id_padre = $('#contentActaControlAeropRecorridos').parent().attr('id');
    let datos = getDataFormControlAeropRecorridos();
    th_update(datos, "control_aerop_recorrido", id_padre, "cincontrolaeropuertorecorridos", id,"",updateTablaControlAeropRecorridos);    
}

function updateTablaControlAeropRecorridos(data){
    id = data.id;
    area_recorrido = "";
    if(data.area_pista == true)
        area_recorrido += 'PISTA '
    if(data.area_via == true)
        area_recorrido += 'VIA'

    $("#td_capr_fecha_" + id).html(data.fecha.substring(0,10));
    $("#td_capr_hora_" + id).html(data.fecha.substring(11,16));
    $("#td_capr_sitio_" + id).html($("#capr_nombreSitio").val()); 
    //$("#td_capr_personalDPNG_" + id).html(data.personal_dpng);
    $("#td_capr_area_" + id).html(area_recorrido);
    $("#td_capr_observ_" + id).html(data.observaciones);    
}

/*Elimina (actualiza el estado),registros de actas de control de contenedores*/
function deleteActaControlAeropRecorridos(id) {
    id_padre = $('#contentActaControlAeropRecorridos').parent().attr('id');
    datos = '{"estado":"I","eliminado":"t"}';
    th_delete(datos, "control_aerop_recorrido", id_padre, "cincontrolaeropuertorecorridos", id,"",deleteRowTablaControlAeropRecorridos);
}

function deleteRowTablaControlAeropRecorridos(data){
    idtabla = data.id;
    console.log(idtabla);
    $("#tr_capr_fila_" + idtabla).remove();
}





//----------------------------AEROPUERTO PRINCIPAL------------------------------------------//
//----------------------------AEROPUERTO PRINCIPAL------------------------------------------//
//----------------------------AEROPUERTO PRINCIPAL------------------------------------------//

//====================================GUIA==================================================
//====================================GUIA==================================================

//Control de aeropuerto, guias, muestras, vuelos (principal)
function limpiaPopupAeropGuia(){
    let numero_guia = $("#capp_letrGuia option:selected").html() + '_' + $("#capp_letrNumGuia option:selected").html() + '_' + $("#capp_anioGuia").val() + '_' + $("#capp_numsGuia").val();
    let tipo_guia = $("#capp_selectTipoGuia option:selected").html();
    let idTipoGuia= $("#capp_selectTipoGuia").val();
    $("#capp_guia").val(numero_guia);
    $("#capp_idTipoGuia").val(idTipoGuia);
    $("#capp_tipoGuia").val(tipo_guia);
    $("#capp_tipoPesca").val("0").trigger('change');
    $("#capp_peso").val("");
    $("#indiceRegAeropGuia").val("");
    $("#opRegAeropGuia").val("0");   
}

function validarSelectTipoPesca(){
    if (($("#capp_tipoPesca").val())>0){
        return true
    }
    else{
        validaContenedorExt("popupAddAeropGuia","Seleccione tipo de pesca");  
        return false
    }
}

function validarNumeroGuia(){
    numero_guia = $("#capp_guia").val();
    if(numero_guia.length < 17){
        validaContenedorExt("popupAddAeropGuia","Numero de Guia Incorrecto");
        return false;
    }
    else{
        return true;
    }
}

function addDataAeropGuia(){
   valida_contenedor = validaContenedor('popupAddAeropGuia')
   valida_tipo_pesca = validarSelectTipoPesca();
   valida_guia = validarNumeroGuia();

   indice = $("#indiceRegAeropGuia").val();
   operacion = $("#opRegAeropGuia").val(); 
   

    if(valida_contenedor==true && valida_tipo_pesca==true && valida_guia==true){
       if (operacion==0){
            insertRegistroGuias();
        }else{
            updateRegistroGuias(indice);
        }
        contarGuias();
        contarPesoEspecie();
        refreshTablaRegistroGuias();
    }    
}

function validarRegistroGuias(registro_guia){
    const tipos_pesca = ['','Pesca Blanca','Langosta','Langostino'];
    for (let i = 0; i < registro_aerop_guias.length; i++) {       
        if (registro_aerop_guias[i]['num_guia']==registro_guia['num_guia'] && registro_aerop_guias[i]['tipo_pesca']==registro_guia['tipo_pesca'] && registro_aerop_guias[i]['tipo_guia']==registro_guia['tipo_guia']){
            validaContenedorExt("popupAddAeropGuia","Ya existe un registro de" + ' ' + registro_guia['num_guia'] + '-' + tipos_pesca[registro_guia['tipo_pesca']]); 
            return false;
        }
    }
    return true;
}

function validarEditRegistroGuias(registro_guia, indice){
    const tipos_pesca = ['','Pesca Blanca','Langosta','Langostino'];
    for (let i = 0; i < registro_aerop_guias.length; i++) {       
        if ((registro_aerop_guias[i]['num_guia']==registro_guia['num_guia']) && (registro_aerop_guias[i]['tipo_pesca']==registro_guia['tipo_pesca']) && (registro_aerop_guias[i]['tipo_guia']==registro_guia['tipo_guia']) && (i!=indice)){
            validaContenedorExt("popupAddAeropGuia","Ya existe un registro de" + ' ' + registro_guia['num_guia'] + '-' + tipos_pesca[registro_guia['tipo_pesca']]); 
            return false;
        }
    }
    return true;
}

function contarGuias(){
    arrayGuias = new Array();

    //El bucle extrae solo las guias en un nuevo arreglo
    for (let i = 0; i < registro_aerop_guias.length; i++) {       
            arrayGuias[i] = registro_aerop_guias[i]['num_guia'];
    }
    //Con la funcion reduce se obtiene un object con cada guia y
    //el numero de veces que se repite
    const contadorGuias = arrayGuias.reduce((contadorGuias, guia)=>{
        contadorGuias[guia] = (contadorGuias[guia] || 0) + 1;
        return contadorGuias;
    },{});

    //contamos el numero de guias
    total_guias = (Object.values(contadorGuias).length);
    $("#capp_totalGuias").val(total_guias);
    //console.log(total_guias);
}

function contarPesoEspecie(){
    const tipos_pesca = ['','Pesca Blanca','Langosta','Langostino','Pulpo']
    let total_pescaBlanca = 0;
    let total_langosta = 0;
    let total_langostino = 0;
    let total_pulpo = 0;
    
    for (let i = 0; i < registro_aerop_guias.length; i++) {       
        if(registro_aerop_guias[i]['tipo_pesca'] == 1)
            total_pescaBlanca += parseFloat(registro_aerop_guias[i]['peso']);

        if(registro_aerop_guias[i]['tipo_pesca'] == 2)
            total_langosta += parseFloat(registro_aerop_guias[i]['peso']);

        if(registro_aerop_guias[i]['tipo_pesca'] == 3)
            total_langostino += parseFloat(registro_aerop_guias[i]['peso']);

        if(registro_aerop_guias[i]['tipo_pesca'] == 4)
            total_pulpo += parseFloat(registro_aerop_guias[i]['peso']);
    }

    $("#capp_totalPescaBlanca").val(total_pescaBlanca);
    $("#capp_totalLangosta").val(total_langosta);
    $("#capp_totalLangostino").val(total_langostino);
    $("#capp_totalPulpo").val(total_pulpo);

    console.log('pesca blanca' + ' ' + total_pescaBlanca.toFixed(2));
    console.log('Langosta' + ' ' + total_langosta.toFixed(2));
    console.log('Langostino' + ' ' + total_langostino.toFixed(2)); 
}

function getDataRegistroGuia(indice){
    tipo_guia  = registro_aerop_guias[indice]['tipo_guia'];
 

    $("#opRegAeropGuia").val("1"); 
    $("#indiceRegAeropGuia").val(indice);
    $("#capp_idTipoGuia").val(registro_aerop_guias[indice]['tipo_guia']);
    $("#capp_tipoGuia").val(getTipoGuiaAerop(tipo_guia));
    $("#capp_guia").val(registro_aerop_guias[indice]['num_guia']);
    $("#capp_tipoPesca").val(registro_aerop_guias[indice]['tipo_pesca']).trigger('change');
    $("#capp_peso").val(registro_aerop_guias[indice]['peso']);
}

function insertRegistroGuias(){
    const registro_guia = {
            tipo_guia:$("#capp_idTipoGuia").val(),
            num_guia:$("#capp_guia").val(), 
            tipo_pesca:$("#capp_tipoPesca").val(),
            peso:$("#capp_peso").val(),
    }
    //si el nuevo registro es valido y no es duplicado lo inserta en el array.
    if(validarRegistroGuias(registro_guia)){
        registro_aerop_guias.push(registro_guia);
        console.log(registro_aerop_guias);
        $("#btnCloseAeropGuia").trigger("click");
    }
}

function updateRegistroGuias(indice){
    const edit_registro_guia = {
            tipo_guia:$("#capp_idTipoGuia").val(),
            num_guia:$("#capp_guia").val(), 
            tipo_pesca:$("#capp_tipoPesca").val(),
            peso:$("#capp_peso").val(),
    }
    //si el registro editado es valido y no es duplicado lo actualiza en el array
    if(validarEditRegistroGuias(edit_registro_guia,indice)){
        registro_aerop_guias[indice]['num_guia'] = edit_registro_guia['num_guia'];
        registro_aerop_guias[indice]['tipo_pesca'] = edit_registro_guia['tipo_pesca'];
        registro_aerop_guias[indice]['peso'] = edit_registro_guia['peso'];
       
        $("#btnCloseAeropGuia").trigger("click");
    }
}

function deleteDataRegistroGuia(indice){
    registro_aerop_guias.splice(indice,1);
    refreshTablaRegistroGuias();
}

function limpiarArregloRegistroGuias(){ 
    if (registro_aerop_guias.length > 0)
        registro_aerop_guias.splice(0,registro_aerop_guias.length);

    //if (copy_sitios_patrullaje.length > 0)
       //copy_sitios_patrullaje.splice(0,copy_sitios_patrullaje.length);
    
}

function getTipoGuiaAerop(indice){
    let label = "";
    $('#capp_selectTipoGuia').find('option').each(function(index,element){
        if(element.value==indice)
            label = element.text;     
    });
    return label;
}

function getTipoPescaAerop(indice){
    let label = "";
    $('#capp_tipoPesca').find('option').each(function(index,element){
        if(element.value==indice)
            label = element.text;     
    });
    return label;
}

function refreshTablaRegistroGuias(){
    let tabla="";
    let ord = 0;
   
    for (let i = 0; i < registro_aerop_guias.length; i++) {
        ord = i+1;
        tabla += "<tr>";
        tabla += "<td align='center'>" + ord + "</td>";
        tabla += "<td align='center'>" + getTipoGuiaAerop(registro_aerop_guias[i]['tipo_guia']) + "</td>";
        tabla += "<td align='center'>" + registro_aerop_guias[i]['num_guia'] + "</td>";
        tabla += "<td align='center'>" + getTipoPescaAerop(registro_aerop_guias[i]['tipo_pesca']) + "</td>";
        tabla += "<td align='center'>" + registro_aerop_guias[i]['peso'] + "</td>";
        tabla += "<td align='center'><a href='#popupAddAeropGuia' data-stackbox='true' data-stackbox-position='absolute' onclick='getDataRegistroGuia(\"" + i + "\")'><i class='fa fa-edit text-green'></i></a></td>";             
        tabla += '<td align="center"><a style="cursor: pointer; font-size: 15x;" title="Buscar" data-close-stackbox="true" onClick="deleteDataRegistroGuia(' + i + ')"><i class="fa fa-trash text-green"></i></a></td>';
        tabla += "</tr>";
    }

    $("#body_tablaAeropGuias").html("");
    $("#body_tablaAeropGuias").append(tabla);
}

//====================================END GUIA==================================================
//====================================END GUIA==================================================




//====================================AEROP MUESTRAS==================================================
//====================================AEROP MUESTRAS==================================================

//Control de aeropuerto, guias, muestras, vuelos (principal)
function limpiaPopupAeropMuestra(){
    $("#capp_muestra").val("");
    $("#capp_tipoMuestra").val("0");
    $("#capp_observacionMuestras").val("");
    $("#indiceRegAeropMuestra").val("");
    $("#opRegAeropMuestra").val("0");   
}

function validarSelectTipoMuestra(){
    if (($("#capp_tipoMuestra").val())>0){
        return true
    }
    else{
        validaContenedorExt("popupAddAeropMuestra","Seleccione tipo de muestra");  
        return false
    }
}

function addDataAeropMuestra(){
   valida_contenedor = validaContenedor('popupAddAeropMuestra')
   valida_tipo_muestra = validarSelectTipoMuestra();

   indice = $("#indiceRegAeropMuestra").val();
   operacion = $("#opRegAeropMuestra").val(); 
   

    if(valida_contenedor==true && valida_tipo_muestra==true){
       if (operacion==0){
            insertRegistroMuestras();
        }else{
            updateRegistroMuestras(indice);
        }
        refreshTablaRegistroMuestras();
    }    
}

function validarRegistroMuestras(registro_muestra){
    //const tipos_muestra = ['','Roca','Agua','Otros'];
    for (let i = 0; i < registro_aerop_muestras.length; i++) {       
        if (registro_aerop_muestras[i]['num_muestra']==registro_muestra['num_muestra']){
            validaContenedorExt("popupAddAeropMuestra","Ya existe un registro de" + ' ' + registro_muestra['num_muestra']); 
            return false;
        }
    }
    return true;
}


function validarEditRegistroMuestras(registro_muestra, indice){
    for (let i = 0; i < registro_aerop_muestras.length; i++) {       
        if ((registro_aerop_muestras[i]['num_muestra']==registro_muestra['num_muestra']) && (i!=indice)){
            validaContenedorExt("popupAddAeropMuestra","Ya existe un registro de" + ' ' + registro_muestra['num_muestra']); 
            return false;
        }
    }
    return true;
}

function getDataRegistroMuestra(indice){
    $("#opRegAeropMuestra").val("1"); 
    $("#indiceRegAeropMuestra").val(indice);
    $("#capp_muestra").val(registro_aerop_muestras[indice]['num_muestra']);
    $("#capp_tipoMuestra").val(registro_aerop_muestras[indice]['tipo_muestra']).trigger('change');
    $("#capp_observacionMuestras").val(registro_aerop_muestras[indice]['observaciones']);
}

function insertRegistroMuestras(){
    const registro_muestra = {
            num_muestra:$("#capp_muestra").val(), 
            tipo_muestra:$("#capp_tipoMuestra").val(),
            observaciones:$("#capp_observacionMuestras").val(),
    }
    //si el nuevo registro es valido y no es duplicado lo inserta en el array.
    if(validarRegistroMuestras(registro_muestra)){
        registro_aerop_muestras.push(registro_muestra);
        console.log(registro_aerop_muestras);
        $("#btnCloseAeropMuestra").trigger("click");
    }
}

function updateRegistroMuestras(indice){
    const edit_registro_muestra = {
            num_muestra:$("#capp_muestra").val(), 
            tipo_muestra:$("#capp_tipoMuestra").val(),
            observaciones:$("#capp_observacionMuestras").val(),
    }
    //si el registro editado es valido y no es duplicado lo actualiza en el array
    if(validarEditRegistroMuestras(edit_registro_muestra,indice)){
        registro_aerop_muestras[indice]['num_muestra'] = edit_registro_muestra['num_muestra'];
        registro_aerop_muestras[indice]['tipo_muestra'] = edit_registro_muestra['tipo_muestra'];
        registro_aerop_muestras[indice]['observaciones'] = edit_registro_muestra['observaciones'];
       
        $("#btnCloseAeropMuestra").trigger("click");
    }
}

function deleteDataRegistroMuestra(indice){
    registro_aerop_muestras.splice(indice,1);
    refreshTablaRegistroMuestras();
}

function limpiarArregloRegistroMuestras(){ 
    if (registro_aerop_muestras.length > 0)
        registro_aerop_muestras.splice(0,registro_aerop_muestras.length);

    //if (copy_sitios_patrullaje.length > 0)
       //copy_sitios_patrullaje.splice(0,copy_sitios_patrullaje.length);
}


function getTipoMuestraAerop(indice){
    let label = "";
    $('#capp_tipoMuestra').find('option').each(function(index,element){
        if(element.value==indice)
            label = element.text;     
    });
    return label;
}


function refreshTablaRegistroMuestras(){
    let tabla="";
    let ord = 0;
   
    for (let i = 0; i < registro_aerop_muestras.length; i++) {
        ord = i+1;
        tabla += "<tr>";
        tabla += "<td align='center'>" + ord + "</td>";
        tabla += "<td align='center'>" + registro_aerop_muestras[i]['num_muestra'] + "</td>";
        tabla += "<td align='center'>" + getTipoMuestraAerop(registro_aerop_muestras[i]['tipo_muestra']) + "</td>";
        tabla += "<td align='center'>" + registro_aerop_muestras[i]['observaciones'] + "</td>";
        tabla += "<td align='center'><a href='#popupAddAeropMuestra' data-stackbox='true' data-stackbox-position='absolute' onclick='getDataRegistroMuestra(\"" + i + "\")'><i class='fa fa-edit text-green'></i></a></td>";             
        tabla += '<td align="center"><a style="cursor: pointer; font-size: 15x;" title="Buscar" data-close-stackbox="true" onClick="deleteDataRegistroMuestra(' + i + ')"><i class="fa fa-trash text-green"></i></a></td>';
        tabla += "</tr>";
    }

    $("#body_tablaAeropMuestras").html("");
    $("#body_tablaAeropMuestras").append(tabla);
}

//====================================END MUESTRAS==================================================
//====================================END MUESTRAS==================================================



//====================================AEROP VUELOS=================================================
//====================================AEROP VUELOS==================================================

//Control de aeropuerto, guias, muestras, vuelos (principal)
function limpiaPopupAeropVuelos(){
    $("#capp_aerolinea").val("0").trigger('change');
    $("#capp_cantidadVuelos").val("");
    $("#capp_observacionVuelos").val("");
    $("#indiceRegAeropVuelo").val("");
    $("#opRegAeropVuelo").val("0");   
}

function validarSelectTipoAerolinea(){
    if (($("#capp_aerolinea").val())>0){
        return true
    }
    else{
        validaContenedorExt("popupAddAeropVuelo","Seleccione Aerolinea");  
        return false
    }
}


function addDataAeropVuelo(){
   valida_contenedor = validaContenedor('popupAddAeropVuelo');
   valida_aerolinea = validarSelectTipoAerolinea();

   indice = $("#indiceRegAeropVuelo").val();
   operacion = $("#opRegAeropVuelo").val(); 
   
    if(valida_contenedor==true && valida_aerolinea==true){
       if (operacion==0){
            insertRegistroVuelos();
        }else{
            updateRegistroVuelos(indice);
        }
        refreshTablaRegistroVuelos();
    }    
}

function validarRegistroVuelos(registro_vuelos){
    const aerolineas = ['','LATAM','AVIANCA','Otros'];
    for (let i = 0; i < registro_aerop_vuelos.length; i++) {       
        if (registro_aerop_vuelos[i]['aerolinea']==registro_vuelos['aerolinea']){
            validaContenedorExt("popupAddAeropVuelo","Ya existe un registro de" + ' ' + aerolineas[registro_vuelos['aerolinea']]); 
            return false;
        }
    }
    return true;
}

function validarEditRegistroVuelos(registro_vuelos, indice){
    const aerolineas = ['','LATAM','AVIANCA','Otros'];
    for (let i = 0; i < registro_aerop_vuelos.length; i++) {       
        if ((registro_aerop_vuelos[i]['aerolinea']==registro_vuelos['aerolinea']) && (i!=indice)){
            validaContenedorExt("popupAddAeropVuelo","Ya existe un registro de" + ' ' + aerolineas[registro_vuelos['aerolinea']]); 
            return false;
        }
    }
    return true;
}

function getDataRegistroVuelo(indice){
    $("#opRegAeropVuelo").val("1"); 
    $("#indiceRegAeropVuelo").val(indice);
    $("#capp_aerolinea").val(registro_aerop_vuelos[indice]['aerolinea']).trigger('change');
    $("#capp_cantidadVuelos").val(registro_aerop_vuelos[indice]['cantidad']);
    $("#capp_observacionVuelos").val(registro_aerop_vuelos[indice]['observaciones']);
}

function insertRegistroVuelos(){
    const registro_vuelo = {
            aerolinea:$("#capp_aerolinea").val(), 
            cantidad:$("#capp_cantidadVuelos").val(),
            observaciones:$("#capp_observacionVuelos").val(),
    }
    //si el nuevo registro es valido y no es duplicado lo inserta en el array.
    if(validarRegistroVuelos(registro_vuelo)){
        registro_aerop_vuelos.push(registro_vuelo);
        console.log(registro_aerop_vuelos);
        $("#btnCloseAeropVuelo").trigger("click");
    }
}

function updateRegistroVuelos(indice){
    const edit_registro_vuelo = {
            aerolinea:$("#capp_aerolinea").val(), 
            cantidad:$("#capp_cantidadVuelos").val(),
            observaciones:$("#capp_observacionVuelos").val(),
    }
    //si el registro editado es valido y no es duplicado lo actualiza en el array
    if(validarEditRegistroVuelos(edit_registro_vuelo,indice)){
        registro_aerop_vuelos[indice]['aerolinea'] = edit_registro_vuelo['aerolinea'];
        registro_aerop_vuelos[indice]['cantidad'] = edit_registro_vuelo['cantidad'];
        registro_aerop_vuelos[indice]['observaciones'] = edit_registro_vuelo['observaciones'];
       
        $("#btnCloseAeropVuelo").trigger("click");
    }
}

function deleteDataRegistroVuelo(indice){
    registro_aerop_vuelos.splice(indice,1);
    refreshTablaRegistroVuelos();
}

function limpiarArregloRegistroVuelos(){ 
    if (registro_aerop_vuelos.length > 0)
        registro_aerop_vuelos.splice(0,registro_aerop_vuelos.length);

    //if (copy_sitios_patrullaje.length > 0)
       //copy_sitios_patrullaje.splice(0,copy_sitios_patrullaje.length);
}

function getAerolineaAerop(indice){
    let label = "";
    $('#capp_aerolinea').find('option').each(function(index,element){
        if(element.value==indice)
            label = element.text;     
    });
    return label;
}

function refreshTablaRegistroVuelos(){
    let tabla="";
    let ord = 0;

    for (let i = 0; i < registro_aerop_vuelos.length; i++) {
        ord = i+1;
        tabla += "<tr>";
        tabla += "<td align='center'>" + ord + "</td>";
        tabla += "<td align='center'>" + getAerolineaAerop(registro_aerop_vuelos[i]['aerolinea']) + "</td>";
        tabla += "<td align='center'>" + registro_aerop_vuelos[i]['cantidad'] + "</td>";
        tabla += "<td align='center'>" + registro_aerop_vuelos[i]['observaciones'] + "</td>";
        tabla += "<td align='center'><a href='#popupAddAeropVuelo' data-stackbox='true' data-stackbox-position='absolute' onclick='getDataRegistroVuelo(\"" + i + "\")'><i class='fa fa-edit text-green'></i></a></td>";             
        tabla += '<td align="center"><a style="cursor: pointer; font-size: 15x;" title="Buscar" data-close-stackbox="true" onClick="deleteDataRegistroVuelo(' + i + ')"><i class="fa fa-trash text-green"></i></a></td>';
        tabla += "</tr>";
    }

    $("#body_tablaAeropVuelos").html("");
    $("#body_tablaAeropVuelos").append(tabla);
}

//====================================END VUELOS==================================================
//====================================END VUELOS==================================================




//====================================AEROP CRUD=================================================
//====================================AEROP CRUD==================================================

function setInsertUpdateActaControlAeropuerto() {
        valida = validaContenedor("addActaControlAeropuerto");
        if (valida){
            if ($("#capp_tipoOperacion").val() == 0)
                insertActaControlAeropuerto();
            else
                updateActaControlAeropuerto();
        }
}

function getDataFormControlAeropuerto(){
    let funcionarios_id = new Array();
    let funcionarios_nombre = new Array();
    
    /*Datos Generales*/
    fecha = $("#capp_fecha").val() + ' ' + $("#capp_hora").val();
    lugar_id = $("#capp_idLugar").val();
     /*Personal DPNG*/
    $("#capp_funcionarios option:selected").each(function(){
        if ($(this).attr('value') != ""){
            funcionarios_id.push($(this).attr('value'));
            funcionarios_nombre.push($(this).text());
        }
    });

    personal_otro = $("#capp_personalOtro").val();
    area_trabajo = $("#capp_areaTrabajo").val();
    num_equipajes_inspec = $("#capp_totalEquipajes").val();
    num_cargas_inspec = $("#capp_totalCargas").val();


    /*Diccionario*/
    datos  = '{'
    datos += '"fecha":"' + fecha + '",'
    datos += '"lugar_id":"' + lugar_id + '",'
    datos += '"funcionarios_id":"' + funcionarios_id.join('|') +  '",'
    datos += '"funcionarios_nombre":"' + funcionarios_nombre.join('|') + '",'
    datos += '"personal_otro":"' + personal_otro + '",'
    datos += '"area_trabajo":"' + area_trabajo + '",'
    datos += '"num_equipajes_inspec":"' + num_equipajes_inspec + '",'
    datos += '"num_cargas_inspec":"' + num_cargas_inspec + '"'
    datos += '}';

    return datos;
}

function getActaControlAeropuerto(){
    fecha_desde = $("#capp_fechaDesde").val();
    fecha_hasta = $("#capp_fechaHasta").val();
    
    data = "";
    
    if (fecha_desde != "" && fecha_hasta != "")
        data = "fecha__range=" + fecha_desde + ',' + fecha_hasta + "&";

    $.ajax({
        url: "data_ParamActaControlAeropuerto",
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
                const areas = ['','Area de carga','Revision de equipaje','sala de pre-embarque'];
                if (data.length > 0) {
                
                    for (i = 0; i < data.length; i++) {
                        if(data[i].estado == 'A'){

                            fecha = (data[i].fecha.substring(0,10));
                            hora  = (data[i].fecha.substring(11,16));


                            tabla += "<tr id='tr_capp_fila_" + data[i].id + "'>";
                            tabla += "<td align='center' id='td_capp_fecha_" + data[i].id + "'>" + fecha + "</td>";
                            tabla += "<td align='center' id='td_capp_hora_" + data[i].id + "'>" + hora + "</td>";
                            tabla += "<td align='center' id='td_capp_personalDPNG_" + data[i].id + "'>" +  data[i].funcionarios_nombre.split("|") + "</td>";
                            tabla += "<td align='center' id='td_capp_personalOtro_" + data[i].id + "'>" + data[i].personal_otro + "</td>";
                            
                            tabla += "<td align='center' id='td_capp_area_" + data[i].id + "'>" + areas[data[i].area_trabajo] + "</td>";
                            tabla += "<td align='center' id='td_capp_equipajes_" + data[i].id + "'>" + data[i].num_equipajes_inspec + "</td>";
                            tabla += "<td align='center' id='td_capp_cartones_" + data[i].id + "'>" + data[i].num_cargas_inspec + "</td>";
                            
                            tabla += "<td align='center'><a href='#addActaControlAeropuerto' data-stackbox='true' data-stackbox-position='absolute' onclick='getByIdActaControlAeropuerto(\"" + data[i].id + "\")'><i class='fa fa-edit text-green'></i></a></td>";
                            tabla += "<td align='center'><a style='cursor: pointer;' onclick='deleteModal(\"" + data[i].id + "\",\"ActaControlAeropuerto\");'><i class='fa fa-trash text-green' title='Eliminar'></i></a></td>";
                            tabla += "</tr>";
                        }
                    }
                }

                $('#tabla_ActaControlAeropuerto').dataTable().fnClearTable();
                $('#tabla_ActaControlAeropuerto').dataTable().fnDestroy();

                $("#bodytabla_ActaControlAeropuerto").html("");
                $("#bodytabla_ActaControlAeropuerto").append(tabla);

                $('#tabla_ActaControlAeropuerto').DataTable();
            }
        },

        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
            //console.log( JSON.stringify(data));
        },
    });
}

function getByIdActaControlAeropuerto(id){
    limpiarFormControlAeropuerto();//Limpia ademas de los inputs los arreglos para el control de guias
    
    $("#capp_tipoOperacion").val(1); // switch para cambiar a metodo de update
        $.ajax({
        url: "editActaControlAeropuerto",
        type: "get",
        data: {
            "data": id
        },
        dataType: "json",

        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
            } else {
                $("#idActaControlAeropuerto").val(data[0].id);
                $("#capp_fecha").val(data[0].fecha.substring(0,10));
                $("#capp_hora").val(data[0].fecha.substring(11,16));
                $("#capp_idLugar").val(data[0].lugar_id.id);
                $("#capp_nombreLugar").val(data[0].lugar_id.descripcion);
                $("#capp_funcionarios").val(data[0].funcionarios_nombre).trigger('change');
                $("#capp_personalOtro").val(data[0].personal_otro);
                $("#capp_areaTrabajo").val(data[0].area_trabajo).trigger('change');
                $("#capp_totalEquipajes").val(data[0].num_equipajes_inspec);
                $("#capp_totalCargas").val(data[0].num_cargas_inspec);

                if (data[0].funcionarios_id != null) {
                    funcionarios = data[0].funcionarios_id.split("|");
                    $("#capp_funcionarios").val(funcionarios).trigger('change');
                } 
                         
            }
        },
        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
        },
    });

    //consulta de guias de un control de aeropuerto
    $.ajax({
        url: "editActaControlAeropuertoGuias",
        type: "get",
        data: {
            "data": id
        },
        dataType: "json",

        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
            } else {
                if (data.length > 0) {
                    copy_registro_aerop_guias[0] = new Array();
                    copy_registro_aerop_guias[1] = new Array();
                    
                    for (i = 0; i < data.length; i++) {
                        if(data[i].estado == 'A'){ //Solo registros activas
                            
                            datos_guia = {
                                    tipo_guia:data[i].tipo_guia,
                                    num_guia:data[i].guia, 
                                    tipo_pesca:data[i].tipo_pesca,
                                    peso:data[i].peso
                            };
                            copy_registro_aerop_guias[0][i] = data[i].id;
                            registro_aerop_guias[i] = datos_guia;  
                        }
                    }
                    copy_registro_aerop_guias[1] = JSON.parse(JSON.stringify(registro_aerop_guias));
                }
                refreshTablaRegistroGuias();
                contarGuias();
                contarPesoEspecie();                                    
            }
        },
        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
            //console.log( JSON.stringify(data));
        },
    });


    //consulta de muestras de un control de aeropuerto
    $.ajax({
        url: "editActaControlAeropuertoMuestras",
        type: "get",
        data: {
            "data": id
        },
        dataType: "json",

        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
            } else {
                if (data.length > 0) {
                    copy_registro_aerop_muestras[0] = new Array();
                    copy_registro_aerop_muestras[1] = new Array();
                    
                    for (i = 0; i < data.length; i++) {
                        if(data[i].estado == 'A'){ //Solo registros activas
                            
                            datos_muestra = {
                                    num_muestra:data[i].muestra, 
                                    tipo_muestra:data[i].tipo_muestra,
                                    observaciones:data[i].observaciones
                            };
                            copy_registro_aerop_muestras[0][i] = data[i].id;
                            registro_aerop_muestras[i] = datos_muestra;  
                        }
                    }
                    copy_registro_aerop_muestras[1] = JSON.parse(JSON.stringify(registro_aerop_muestras));
                }
                refreshTablaRegistroMuestras();                                    
            }
        },
        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
            //console.log( JSON.stringify(data));
        },
    });

    //consulta de muestras de un control de aeropuerto
    $.ajax({
        url: "editActaControlAeropuertoVuelos",
        type: "get",
        data: {
            "data": id
        },
        dataType: "json",

        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
            } else {
                if (data.length > 0) {
                    copy_registro_aerop_vuelos[0] = new Array();
                    copy_registro_aerop_vuelos[1] = new Array();
                    
                    for (i = 0; i < data.length; i++) {
                        if(data[i].estado == 'A'){ //Solo registros activas
                            
                            datos_vuelo = {
                                    aerolinea:data[i].aerolinea, 
                                    cantidad:data[i].cantidad,
                                    observaciones:data[i].observaciones
                            };
                            copy_registro_aerop_vuelos[0][i] = data[i].id;
                            registro_aerop_vuelos[i] = datos_vuelo;  
                        }
                    }
                    copy_registro_aerop_vuelos[1] = JSON.parse(JSON.stringify(registro_aerop_vuelos));
                }
                refreshTablaRegistroVuelos();                                    
            }
        },
        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
            //console.log( JSON.stringify(data));
        },
    });
}

/*insertar registro actas de control patrullaje bares*/
function insertActaControlAeropuerto() {
    id_padre = $('#contentActaControlAeropuerto').parent().attr('id');
    datos = getDataFormControlAeropuerto(); 
    th_insert(datos,"control_aerop_principal", id_padre, "cincontrolaeropuerto",1,"",insertTablasAeropuerto); 
    //th_insert(datos,"control_aerop_principal", id_padre, "cincontrolaeropuerto"); 
}


function insertTablasAeropuerto(controlaerop_id){
    let datosGuias = "";
    let datosMuestras = "";
    let datosVuelos = "";
    let id_padre = $('#contentActaControlAeropuerto').parent().attr('id');
    
    //Guarda las guias asociados al control de aeropuerto p.
    for (let i = 0; i < registro_aerop_guias.length; i++) {    
        datosGuias +=  '{'
        datosGuias += '"controlaerop_id":"' + controlaerop_id + '",'
        datosGuias += '"tipo_guia":"' + registro_aerop_guias[i]['tipo_guia'] + '",'
        datosGuias += '"guia":"' + registro_aerop_guias[i]['num_guia'] + '",'
        datosGuias += '"tipo_pesca":"' + registro_aerop_guias[i]['tipo_pesca'] + '",'
        datosGuias += '"peso":"' + registro_aerop_guias[i]['peso'] + '"'
        datosGuias +=  '}'

        if ((i + 1) < registro_aerop_guias.length)
            datosGuias +=  ','
    }

    console.log(datosGuias);
    th_insert(datosGuias,"control_aerop_principal", id_padre, "cincontrolaeropuertoguias",1);
    //=========================================================.

    //Guarda las muestras asociados al control de aeropuerto p.
    for (let l = 0; l < registro_aerop_muestras.length; l++) {    
        datosMuestras +=  '{'
        datosMuestras += '"controlaerop_id":"' + controlaerop_id + '",'
        datosMuestras += '"muestra":"' + registro_aerop_muestras[l]['num_muestra'] + '",'
        datosMuestras += '"tipo_muestra":"' + registro_aerop_muestras[l]['tipo_muestra'] + '",'
        datosMuestras += '"observaciones":"' + registro_aerop_muestras[l]['observaciones'] + '"'
        datosMuestras +=  '}'

        if ((l + 1) < registro_aerop_muestras.length)
            datosMuestras +=  ','
    }


    console.log(datosMuestras);
    th_insert(datosMuestras,"control_aerop_principal", id_padre, "cincontrolaeropuertomuestras",1);
    //=========================================================.

    //Guarda las muestras asociados al control de aeropuerto p.
    for (let l = 0; l < registro_aerop_vuelos.length; l++) {    
        datosVuelos +=  '{'
        datosVuelos += '"controlaerop_id":"' + controlaerop_id + '",'
        datosVuelos += '"aerolinea":"' + registro_aerop_vuelos[l]['aerolinea'] + '",'
        datosVuelos += '"cantidad":"' + registro_aerop_vuelos[l]['cantidad'] + '",'
        datosVuelos += '"observaciones":"' + registro_aerop_vuelos[l]['observaciones'] + '"'
        datosVuelos +=  '}'

        if ((l + 1) < registro_aerop_vuelos.length)
            datosVuelos +=  ','
    }


    console.log(datosVuelos);
    th_insert(datosVuelos,"control_aerop_principal", id_padre, "cincontrolaeropuertovuelos");
    //=========================================================.
}

/*actualiza registros de actas de control de contenedores*/
function updateActaControlAeropuerto(){
    let id = $("#idActaControlAeropuerto").val();
    let id_padre = $('#contentActaControlAeropuerto').parent().attr('id');
    let datos = getDataFormControlAeropuerto();
    th_update(datos, "control_aerop_principal", id_padre, "cincontrolaeropuerto", id,"",updateTablaControlAeropuerto);    
    
    let existe_guia;
    let datosGuia = "";
    for (let x = 0; x < registro_aerop_guias.length; x++) {    
        existe_guia = 0;
        for (let y = 0; y < copy_registro_aerop_guias[1].length; y++) {    
            //si el registro existe y hay cambios, actualiza el registro
            if ((registro_aerop_guias[x]['num_guia'] == copy_registro_aerop_guias[1][y]['num_guia']) && (registro_aerop_guias[x]['tipo_pesca'] == copy_registro_aerop_guias[1][y]['tipo_pesca']) && (registro_aerop_guias[x]['tipo_guia'] == copy_registro_aerop_guias[1][y]['tipo_guia'])){
                if(registro_aerop_guias[x]['peso'] != copy_registro_aerop_guias[1][y]['peso']){
                    console.log('verificado');
                    datosGuia =  '{'
                    datosGuia += '"controlaerop_id":"' + id + '",'
                    datosGuia += '"tipo_guia":"' + registro_aerop_guias[x]['tipo_guia'] + '",'
                    datosGuia += '"guia":"' + registro_aerop_guias[x]['num_guia'] + '",'
                    datosGuia += '"tipo_pesca":"' + registro_aerop_guias[x]['tipo_pesca'] + '",'
                    datosGuia += '"peso":"' + registro_aerop_guias[x]['peso'] + '"'
                    datosGuia +=  '}'
                    
                    id_registro_guia = copy_registro_aerop_guias[0][y];
                    th_update(datosGuia,"control_aerop_principal", id_padre,"cincontrolaeropuertoguias",id_registro_guia);
                }
                existe_guia = 1;
            }
        }
        
        datosGuia = "";
        if(existe_guia == 0){
            datosGuia =  '{'
            datosGuia += '"controlaerop_id":"' + id + '",'
            datosGuia += '"tipo_guia":"' + registro_aerop_guias[x]['tipo_guia'] + '",'
            datosGuia += '"guia":"' + registro_aerop_guias[x]['num_guia'] + '",'
            datosGuia += '"tipo_pesca":"' + registro_aerop_guias[x]['tipo_pesca'] + '",'
            datosGuia += '"peso":"' + registro_aerop_guias[x]['peso'] + '"'
            datosGuia +=  '}'
            
            th_insert(datosGuia,"control_aerop_principal", id_padre, "cincontrolaeropuertoguias",1);
        }
    }


   
    let existe_muestra;
    let datosMuestra = "";
    for (let i = 0; i < registro_aerop_muestras.length; i++) {    
        existe_muestra = 0;
        for (let k = 0; k < copy_registro_aerop_muestras[1].length; k++) {    
            
            if (registro_aerop_muestras[i]['num_muestra'] == copy_registro_aerop_muestras[1][k]['num_muestra']){
                if((registro_aerop_muestras[i]['tipo_muestra'] != copy_registro_aerop_muestras[1][k]['tipo_muestra']) || (registro_aerop_muestras[i]['observaciones'] != copy_registro_aerop_muestras[1][k]['observaciones'])){
                    console.log('verificado');
                    datosMuestra =  '{'
                    datosMuestra += '"controlaerop_id":"' + id + '",'
                    datosMuestra += '"muestra":"' + registro_aerop_muestras[i]['num_muestra'] + '",'
                    datosMuestra += '"tipo_muestra":"' + registro_aerop_muestras[i]['tipo_muestra'] + '",'
                    datosMuestra += '"observaciones":"' + registro_aerop_muestras[i]['observaciones'] + '"'
                    datosMuestra +=  '}'
                    
                    id_registro_muestra = copy_registro_aerop_muestras[0][k];
                    th_update(datosMuestra,"control_aerop_principal", id_padre,"cincontrolaeropuertomuestras",id_registro_muestra);
                }
                existe_muestra = 1;
            }
        }
      
        datosMuestra = "";
        if(existe_muestra == 0){
            datosMuestra =  '{'
            datosMuestra += '"controlaerop_id":"' + id + '",'
            datosMuestra += '"muestra":"' + registro_aerop_muestras[i]['num_muestra'] + '",'
            datosMuestra += '"tipo_muestra":"' + registro_aerop_muestras[i]['tipo_muestra'] + '",'
            datosMuestra += '"observaciones":"' + registro_aerop_muestras[i]['observaciones'] + '"'
            datosMuestra +=  '}'
            
            th_insert(datosMuestra,"control_aerop_principal", id_padre, "cincontrolaeropuertomuestras",1);
        }
    }


  
    let existe_vuelo;
    let datosVuelo = "";
    for (let a = 0; a < registro_aerop_vuelos.length; a++) {    
        existe_vuelo = 0;
        for (let b = 0; b < copy_registro_aerop_vuelos[1].length; b++) {    
         
            if (registro_aerop_vuelos[a]['aerolinea'] == copy_registro_aerop_vuelos[1][b]['aerolinea']){
                if((registro_aerop_vuelos[a]['cantidad'] != copy_registro_aerop_vuelos[1][b]['cantidad']) || (registro_aerop_vuelos[a]['observaciones'] != copy_registro_aerop_vuelos[1][b]['observaciones'])){
                    console.log('verificado');
                    datosVuelo =  '{'
                    datosVuelo += '"controlaerop_id":"' + id + '",'
                    datosVuelo += '"aerolinea":"' + registro_aerop_vuelos[a]['aerolinea'] + '",'
                    datosVuelo += '"cantidad":"' + registro_aerop_vuelos[a]['cantidad'] + '",'
                    datosVuelo += '"observaciones":"' + registro_aerop_vuelos[a]['observaciones'] + '"'
                    datosVuelo +=  '}'
                    
                    id_registro_vuelo = copy_registro_aerop_vuelos[0][b];
                    th_update(datosVuelo,"control_aerop_principal", id_padre,"cincontrolaeropuertovuelos",id_registro_vuelo);
                }
                existe_vuelo = 1;
            }
        }
        
        datosVuelo = "";
        if(existe_vuelo == 0){
            datosVuelo =  '{'
            datosVuelo += '"controlaerop_id":"' + id + '",'
            datosVuelo += '"aerolinea":"' + registro_aerop_vuelos[a]['aerolinea'] + '",'
            datosVuelo += '"cantidad":"' + registro_aerop_vuelos[a]['cantidad'] + '",'
            datosVuelo += '"observaciones":"' + registro_aerop_vuelos[a]['observaciones'] + '"'
            datosVuelo +=  '}'
            
            th_insert(datosVuelo,"control_aerop_principal", id_padre, "cincontrolaeropuertovuelos",1);
        }
    }


    guiaEliminada = "";
    for (let m = 0; m < copy_registro_aerop_guias[1].length; m++) {    
        existe_guia_del = 1;
        for (let n = 0; n < registro_aerop_guias.length; n++) {   
            if ((copy_registro_aerop_guias[1][m]['num_guia'] == registro_aerop_guias[n]['num_guia']) &&  (copy_registro_aerop_guias[1][m]['tipo_pesca'] == registro_aerop_guias[n]['tipo_pesca']))
                existe_guia_del = 0; // encontro el registro y no es necesario eliminarlos
        }
      
        if(existe_guia_del == 1){
            id_registro_guia = copy_registro_aerop_guias[0][m];
            guiaEliminada = '{"estado":"I","eliminado":"t"}';
            th_delete(guiaEliminada,"control_aerop_principal", id_padre, "cincontrolaeropuertoguias",id_registro_guia,1);
        }
    }

    muestraEliminada = "";
    for (let c = 0; c < copy_registro_aerop_muestras[1].length; c++) {    
        existe_muestra_del = 1;
        for (let d = 0; d < registro_aerop_muestras.length; d++) {   
            if (copy_registro_aerop_muestras[1][c]['num_muestra'] == registro_aerop_muestras[d]['num_muestra'])
                existe_muestra_del = 0; 
        }
        
        if(existe_muestra_del == 1){
            id_registro_muestra = copy_registro_aerop_muestras[0][c];
            muestraEliminada = '{"estado":"I","eliminado":"t"}';
            th_delete(muestraEliminada,"control_aerop_principal", id_padre, "cincontrolaeropuertomuestras",id_registro_muestra,1);
        }
    }


    vueloEliminado = "";
    for (let e = 0; e < copy_registro_aerop_vuelos[1].length; e++) {    
        existe_vuelo_del = 1;
        for (let f = 0; f < registro_aerop_vuelos.length; f++) {   
            if (copy_registro_aerop_vuelos[1][e]['aerolinea'] == registro_aerop_vuelos[f]['aerolinea'])
                existe_vuelo_del = 0; // encontro el registro y no es necesario eliminarlos
        }
       
        if(existe_vuelo_del == 1){
            id_registro_vuelo = copy_registro_aerop_vuelos[0][e];
            vueloEliminado = '{"estado":"I","eliminado":"t"}';
            th_delete(vueloEliminado,"control_aerop_principal", id_padre, "cincontrolaeropuertovuelos",id_registro_vuelo,1);
        }
    }
}

function getTipoAreaAerop(indice){
    let label = "";
    $('#capp_areaTrabajo').find('option').each(function(index,element){
        if(element.value==indice)
            label = element.text;     
    });
    return label;
}

function updateTablaControlAeropuerto(data){
    id = data.id;
    $("#td_capp_fecha_" + id).html(data.fecha.substring(0,10));
    $("#td_capp_hora_" + id).html(data.fecha.substring(11,16));
    $("#td_capp_personalDPNG_" + id).html(data.funcionarios_nombre);
    $("#td_capp_personalOtro_" + id).html(data.personal_otro);
    $("#td_capp_area_" + id).html(getTipoAreaAerop(data.area_trabajo));
    $("#td_capp_equipajes_" + id).html(data.num_equipajes_inspec);
    $("#td_capp_cartones_" + id).html(data.num_cargas_inspec);   
}

/*Elimina (actualiza el estado),registros de actas de control de contenedores*/
function deleteActaControlAeropuerto(id) {
    //console.log('Eliminar');
    id_padre = $('#contentActaControlAeropuerto').parent().attr('id');
    datos = '{"estado":"I","eliminado":"t"}';
    th_delete(datos, "control_aerop_principal", id_padre, "cincontrolaeropuerto", id,"",deleteRowTablaControlAeropuerto);
}

function deleteRowTablaControlAeropuerto(data){
    idtabla = data.id;
    console.log(idtabla);
    $("#tr_capp_fila_" + idtabla).remove();
}


/*********************************FUNCIONES HITOS*********************************/
/*********************************FUNCIONES HITOS*********************************/
function limpiarPopupHito(){
    $("#cth_selectIsla").val("0");
    $('#cth_selectIsla').change();//actualiza option
    $("#cth_selectArea").val("0");
    $('#cth_selectArea').change();//actualiza option
    $("#cth_numHito").val("");

    $("#indiceRegistroHito").val("");
    $("#opRegistroHito").val("");
    $("#cth_hito_id").val("");
    $("#cth_isla").val("");
    $("#cth_area").val("");
    $("#cth_hito").val("");
    $("#cth_latitud").val("");
    $("#cth_longitud").val("");
    $("#cth_sitio_ref").val("");
    $("#cth_estado").val("0");
    $('#cth_estado').change();//actualiza option
}

/*Validar seleccion de hito*/
function validaSelectIslaHito(){
    select_isla = $("#cth_selectIsla").val();
    return (select_isla > 0) ? true : false;
}
/*Validar seleccion de zona*/
function validaSelectAreaHito(){
    select_area = $("#cth_selectArea").val();
    return (select_area > 0) ? true : false;
}
/*valida el ingreso de un hito*/
function validaNumHito(){
    num_hito = $("#cth_numHito").val();
    return (num_hito != "") ? true : false;
}

function varificarHito(){
    valida_isla = validaSelectIslaHito();
    valida_area = validaSelectAreaHito();
    valida_hito = validaNumHito();

    console.log(valida_isla + ' ' + valida_area + ' ' + valida_hito);
 
    if(valida_isla==true && valida_area==true && valida_hito==true){

      
        isla = $("#cth_selectIsla option:selected").text();
        area = $("#cth_selectArea option:selected").text(); 
        hito = $("#cth_numHito").val(); 

        dataC  = "";
        dataC += "isla__in=" + isla + "&";
        dataC += "area__in=" + area + "&";
        dataC += "punto__in=" + hito + "&";
        dataC = dataC.substring(0, dataC.length - 1);

        $.ajax({
            url: "data_ParamHito",
            type: "get",
            data: {
                "data": dataC
            },
            async: false,
            success: function(data) {
                if (data['non_field_errors']) {
                    console.log(data['non_field_errors']);
                } else {
                    
                    if (data.length > 0) {
                        for (i = 0; i < data.length; i++) {
                            if(data[i].estado == 'A'){ //Solo hitos activos
                                $("#cth_isla").val(data[i].isla);
                                $("#cth_area").val(data[i].area);
                                $("#cth_hito").val(data[i].punto);
                                $("#cth_latitud").val(data[i].x);
                                $("#cth_longitud").val(data[i].y);
                                $("#cth_sitio_ref").val(data[i].sitio_referencia);
                                $("#cth_hito_id").val(data[i].id); 
                            }    
                        }
                            $("#cth_selectIsla").val("0");
                            $('#cth_selectIsla').change();//actualiza option
                            $("#cth_selectArea").val("0");
                            $('#cth_selectArea').change();//actualiza option
                            $("#cth_numHito").val("");
                    }
                    else{
                        validaContenedorExt("popupAddHito","No se encontraron resultados");
                        limpiarPopupHito();
                    }
                }
            },
            error: function(data) {
                swal("", "Error: " + JSON.stringify(data), "error");
                console.log(JSON.stringify(data));
                //console.log( JSON.stringify(data));
            },
        });
    }else{
        validaContenedorExt("popupAddHito","Faltan datos")
    }
}

function validarSelectEstadoHito(){
    select_estado = $("#cth_estado").val();
    return (select_estado > 0) ? true :validaContenedorExt("popupAddHito","Seleccione Estado");
}

function validarRegistroHito(hito){
    for (let i = 0; i < registro_hitos.length; i++) {       
        if (registro_hitos[i]['hito_id']==hito['hito_id']){
            validaContenedorExt("popupAddHito","Ya existe un registro del hito Nro." + " " + hito['num_hito'] + "-" + hito['isla'] + "-" + hito['area']); 
            return false;
        }
    }
    return true;
}

function validarEditRegistroHito(edit_hito, indice){
    for (let i = 0; i < registro_hitos.length; i++) {       
        if ((registro_hitos[i]['hito_id']==edit_hito['hito_id']) && (i!=indice)){
            validaContenedorExt("popupAddHito","Ya existe un registro del hito Nro." + " " + edit_hito['num_hito'] + "-" + edit_hito['isla'] + "-" + edit_hito['area']); 
            return false;
        }
    }
    return true;
}

function addDataHitoPatrullaje(){
   valida_contenedor = validaContenedor('popupAddHito');
   valida_estado = validarSelectEstadoHito();

   indice = $("#indiceRegistroHito").val();
   operacion = $("#opRegistroHito").val(); 
   
    if(valida_contenedor==true && valida_estado==true){
       if (operacion==0){
            insertRegistroHito();
        }else{
            updateRegistroHito(indice);
        }
        refreshTablaRegistroHitos();
    }    
}

function getDataRegistroHito(indice){
    $("#cth_selectIsla").val("0");
    $('#cth_selectIsla').change();//actualiza option
    $("#cth_selectArea").val("0");
    $('#cth_selectArea').change();//actualiza option
    $("#cth_numHito").val("");

    $("#opRegistroHito").val("1"); 
    $("#indiceRegistroHito").val(indice);
    
    $("#cth_hito_id").val(registro_hitos[indice]['hito_id']);
    $("#cth_isla").val(registro_hitos[indice]['isla']);
    $("#cth_area").val(registro_hitos[indice]['area']);
    $("#cth_hito").val(registro_hitos[indice]['num_hito']);
    $("#cth_latitud").val(registro_hitos[indice]['latitud']);
    $("#cth_longitud").val(registro_hitos[indice]['longitud']);
    $("#cth_sitio_ref").val(registro_hitos[indice]['sitio_referencia']);
    $("#cth_estado").val(registro_hitos[indice]['estado']);
    $('#cth_estado').change();//actualiza option
}

function insertRegistroHito(){
    const hito = {
        hito_id:$("#cth_hito_id").val(),
        isla:$("#cth_isla").val(), 
        area:$("#cth_area").val(),
        num_hito:$("#cth_hito").val(),
        latitud:$("#cth_latitud").val(),
        longitud:$("#cth_longitud").val(),
        sitio_referencia:$("#cth_sitio_ref").val(),
        estado:$("#cth_estado").val()   
    }

    //si el nuevo registro es valido y no es duplicado lo inserta en el array.
    if(validarRegistroHito(hito)){
        registro_hitos.push(hito);
        console.log(registro_hitos);
        $("#btnClosePopupHito").trigger("click");
    }
}

function updateRegistroHito(indice){
    const edit_hito = {
        hito_id:$("#cth_hito_id").val(),
        isla:$("#cth_isla").val(), 
        area:$("#cth_area").val(),
        num_hito:$("#cth_hito").val(),
        latitud:$("#cth_latitud").val(),
        longitud:$("#cth_longitud").val(),
        sitio_referencia:$("#cth_sitio_ref").val(),
        estado:$("#cth_estado").val()   
    }
    //si el registro editado es valido y no es duplicado lo actualiza en el array
    if(validarEditRegistroHito(edit_hito,indice)){
        registro_hitos[indice]['hito_id'] = edit_hito['hito_id'];
        registro_hitos[indice]['isla'] = edit_hito['isla'];
        registro_hitos[indice]['area'] = edit_hito['area'];
        registro_hitos[indice]['num_hito'] = edit_hito['num_hito'];
        registro_hitos[indice]['latitud'] = edit_hito['latitud'];
        registro_hitos[indice]['longitud'] = edit_hito['longitud'];
        registro_hitos[indice]['sitio_referencia'] = edit_hito['sitio_referencia'];
        registro_hitos[indice]['estado'] = edit_hito['estado'];
        $("#btnClosePopupHito").trigger("click");
    }
}

function deleteRegistroHito(indice){
    registro_hitos.splice(indice,1);
    refreshTablaRegistroHitos();
}

function getEstadoHito(indice){
    let label = "";
    $('#cth_estado').find('option').each(function(index,element){
        if(element.value==indice)
            label = element.text;     
    });
    return label;
}


function refreshTablaRegistroHitos(){
    let tabla="";
    let ord = 0;
   
    for (let i = 0; i < registro_hitos.length; i++) {
        ord = i+1;
        tabla += "<tr>";
        tabla += "<td align='center'>" + ord + "</td>";
        tabla += "<td align='center'>" + registro_hitos[i]['isla'] + "</td>";
        tabla += "<td align='center'>" + registro_hitos[i]['area'] + "</td>";
        tabla += "<td align='center'>" + registro_hitos[i]['sitio_referencia'] + "</td>";
        tabla += "<td align='center'>" + registro_hitos[i]['num_hito'] + "</td>";
        tabla += "<td align='center'>" + getEstadoHito(registro_hitos[i]['estado']) + "</td>";
        
        tabla += "<td align='center'><a href='#popupAddHito' data-stackbox='true' data-stackbox-position='absolute' onclick='getDataRegistroHito(\"" + i + "\")'><i class='fa fa-edit text-green'></i></a></td>";             
        tabla += '<td align="center"><a style="cursor: pointer; font-size: 15x;" title="Buscar" data-close-stackbox="true" onClick="deleteRegistroHito(' + i + ')"><i class="fa fa-trash text-green"></i></a></td>';
        tabla += "</tr>";
    }

    $("#body_tablaHitos").html("");
    $("#body_tablaHitos").append(tabla);
    $("#cpa_total_hitos").val(registro_hitos.length);
}

function limpiarArregloHitos(){ 
    if (registro_hitos.length > 0)
        registro_hitos.splice(0,registro_hitos.length);

    //if (copy_sitios_patrullaje.length > 0)
       //copy_sitios_patrullaje.splice(0,copy_sitios_patrullaje.length);
}
/*********************************************************************************/
/*********************************************************************************/


/*********************************FUNCIONES NOVEDADES PATRULLAJE*********************************/
/*********************************FUNCIONES NOVEDADES PATRULLAJE*********************************/
function limpiarPopupNovedad(){
    $("#ctpa_selectNovedad").val("0");
    $('#ctpa_selectNovedad').change();//actualiza option
    $("#ctpa_cantidad").val("");
    $("#ctpa_observacion").val("");
    $("#opRegistroNovedadPatrullaje").val("0"); 
    $("#indiceRegistroNovedadPatrullaje").val("");
}

/*Validar seleccion de Descripcion - Novedad*/
function validaSelectNovedad(){
    select_isla = $("#ctpa_selectNovedad").val();
    return (select_isla > 0) ? true : validaContenedorExt("popupAddNovedadPatrullaje","Seleccione Descripcion");
}

function validarRegistroNovedad(novedad){
    let descripcion = ['','ANIMALES DOMESTICOS','TALA DE MADERA','TROCHA','BASURA','ESPECIES ATROPELLADAS','INVACIONES','MOVILIZACION DE ESPECIES PROTEGIDAS'];

    for (let i = 0; i < registro_novedades.length; i++) {       
        if (registro_novedades[i]['descripcion']==novedad['descripcion']){
            validaContenedorExt("popupAddNovedadPatrullaje","Ya existe un registro de " + " " + descripcion[novedad['descripcion']]); 
            return false;
        }
    }
    return true;
}

function validarEditRegistroNovedad(edit_novedad, indice){
    
    for (let i = 0; i < registro_novedades.length; i++) {       
        if ((registro_novedades[i]['descripcion']==edit_novedad['descripcion']) && (i!=indice)){
            validaContenedorExt("popupAddNovedadPatrullaje","Ya existe un registro de " + " " + getNovedadPatrullaje(edit_novedad['descripcion'])); 
            return false;
        }
    }
    return true;
}

function addDataNovedadPatrullaje(){
   valida_contenedor = validaContenedor('popupAddNovedadPatrullaje');
   valida_novedad = validaSelectNovedad();

   indice = $("#indiceRegistroNovedadPatrullaje").val();
   operacion = $("#opRegistroNovedadPatrullaje").val(); 
   
    if(valida_contenedor==true && valida_novedad==true){
       if (operacion==0){
            insertRegistroNovedad();
        }else{
            updateRegistroNovedad(indice);
        }
        refreshTablaRegistroNovedades();
    }    
}

function getDataRegistroNovedad(indice){
    $("#opRegistroNovedadPatrullaje").val("1"); 
    $("#indiceRegistroNovedadPatrullaje").val(indice);
    
    $("#ctpa_selectNovedad").val(registro_novedades[indice]['descripcion']);
    $('#ctpa_selectNovedad').change();//actualiza option
    $("#ctpa_cantidad").val(registro_novedades[indice]['cantidad']);
    $("#ctpa_observacion").val(registro_novedades[indice]['observacion']);
}

function insertRegistroNovedad(){
    const novedad = {
        descripcion:$("#ctpa_selectNovedad").val(),
        cantidad:$("#ctpa_cantidad").val(), 
        observacion:$("#ctpa_observacion").val() 
    }

    //si el nuevo registro es valido y no es duplicado lo inserta en el array.
    if(validarRegistroNovedad(novedad)){
        registro_novedades.push(novedad);
        console.log(registro_novedades);
        $("#btnClosePopupNovedad").trigger("click");
    }
}

function updateRegistroNovedad(indice){
    const edit_novedad = {
        descripcion:$("#ctpa_selectNovedad").val(),
        cantidad:$("#ctpa_cantidad").val(), 
        observacion:$("#ctpa_observacion").val() 
    }
    //si el registro editado es valido y no es duplicado lo actualiza en el array
    if(validarEditRegistroNovedad(edit_novedad,indice)){
        registro_novedades[indice]['descripcion'] = edit_novedad['descripcion'];
        registro_novedades[indice]['cantidad'] = edit_novedad['cantidad'];
        registro_novedades[indice]['observacion'] = edit_novedad['observacion'];
        console.log(registro_novedades);
        $("#btnClosePopupNovedad").trigger("click");
    }
}

function deleteRegistroNovedad(indice){
    registro_novedades.splice(indice,1);
    refreshTablaRegistroNovedades();
}

function getNovedadPatrullaje(indice){
    let label = "";
    $('#ctpa_selectNovedad').find('option').each(function(index,element){
        if(element.value==indice)
            label = element.text;     
    });
    return label;
}


function refreshTablaRegistroNovedades(){
    let tabla="";
    let ord = 0;
    
    for (let i = 0; i < registro_novedades.length; i++) {
        ord = i+1;
        tabla += "<tr>";
        tabla += "<td align='center'>" + ord + "</td>";
        tabla += "<td align='center'>" + getNovedadPatrullaje(registro_novedades[i]['descripcion']) + "</td>";
        tabla += "<td align='center'>" + registro_novedades[i]['cantidad'] + "</td>";
        tabla += "<td align='center'>" + registro_novedades[i]['observacion'] + "</td>";
       
        tabla += "<td align='center'><a href='#popupAddNovedadPatrullaje' data-stackbox='true' data-stackbox-position='absolute' onclick='getDataRegistroNovedad(\"" + i + "\")'><i class='fa fa-edit text-green'></i></a></td>";             
        tabla += '<td align="center"><a style="cursor: pointer; font-size: 15x;" title="Buscar" data-close-stackbox="true" onClick="deleteRegistroNovedad(' + i + ')"><i class="fa fa-trash text-green"></i></a></td>';
        tabla += "</tr>";
    }

    $("#body_tablaNovedadesPatrullaje").html("");
    $("#body_tablaNovedadesPatrullaje").append(tabla);
}

function limpiarArregloNovedad(){ 
    if (registro_novedades.length > 0)
        registro_novedades.splice(0,registro_novedades.length);
}

/*********************************FUNCIONES SITIO PATRULLAJE*********************************/
/*********************************FUNCIONES SITIO PATRULLAJE*********************************/

function limpiarpopupAddSitioPatrullaje(){
    $("#ctpa_idSitio").val("");
    $("#ctpa_nombreIsla").val("");
    $("#ctpa_nombreSitio").val("");
    $("#ctpa_optVehiculo").prop('checked', false);
    $("#ctpa_optPie").prop('checked', false);
    $("#ctpa_optCemila").prop('checked', false);
    $("#ctpa_Otro").prop('checked', false);
    $("#ctpa_otraMovilizacion").val("");
    $("#ctpa_otraMovilizacion").prop('readonly', true);
    $("#ctpa_existe_novedad").prop('checked', false);
    $('div[id="ctpa_novedadesPatrullaje"]').hide();
    
    $("#opRegistroSitioPatrullaje").val("0");
    $("#indiceRegistroSitioPatrullaje").val("");
    limpiarArregloNovedad();
    refreshTablaRegistroNovedades();
}


function validarNumSitiosPatrullaje(){
    if (sitios_patrullaje.length > 0)
        return true;
    else
        validaContenedorExt("addActaControlPatrullaje","Registre al menos 1 sitio");
}

function addDataSitiosPatrullaje(){

    operacion = $("#opRegistroSitioPatrullaje").val();
    indice = $("#indiceRegistroSitioPatrullaje").val();
    if(validaContenedor('popupAddSitioPatrullaje')){
       if (operacion==0){
            insertRegistroSitioPatrullaje();
        }else{
            console.log("actualizar")
            updateRegistroTablaSitioPatrullaje(indice);
        }
        refreshTablaSitioPatrullaje();
   }    
}

function validarRegSitioPatrullaje(reg_sitio){
    for (let i = 0; i < sitios_patrullaje.length; i++) {       
        if (sitios_patrullaje[i]['id_sitio']==reg_sitio['id_sitio']){
            validaContenedorExt("popupAddSitioPatrullaje","Ya existe un registro de" + ' ' + reg_sitio['nombre_sitio']); 
            return false;
        }
    }
    return true;
}

function validarEditRegSitioPatrullaje(reg_sitio, indice){
    for (let i = 0; i < sitios_patrullaje.length; i++) {       
        if ((sitios_patrullaje[i]['id_sitio']==reg_sitio['id_sitio']) && (i!=indice)){
            validaContenedorExt("popupAddSitioPatrullaje","Ya existe un registro de" + ' ' + reg_sitio['nombre_sitio']); 
            return false;
        }
    }
    return true;
}

function getRegistroSitioPatrullaje(indice){
    $("#opRegistroSitioPatrullaje").val("1"); 
    $("#indiceRegistroSitioPatrullaje").val(indice);
    

    $("#ctpa_idSitio").val(sitios_patrullaje[indice]['id_sitio']);
    $("#ctpa_nombreSitio").val(sitios_patrullaje[indice]['nombre_sitio']);
    $("#ctpa_nombreIsla").val(sitios_patrullaje[indice]['nombre_isla']);
    $("#ctpa_optVehiculo").prop('checked',sitios_patrullaje[indice]['mov_vehiculo']);
    $("#ctpa_optPie").prop('checked',sitios_patrullaje[indice]['mov_pie']);
    $("#ctpa_optCemila").prop('checked',sitios_patrullaje[indice]['mov_cemila']);

    if (sitios_patrullaje[indice]['mov_otro']==true) {
        $("#ctpa_Otro").prop('checked',sitios_patrullaje[indice]['mov_otro']);
        $("#ctpa_otraMovilizacion").val(sitios_patrullaje[indice]['mov_otro_descripcion']);
        $("#ctpa_otraMovilizacion").prop('readonly', false);
    }

    $("#ctpa_existe_novedad").prop('checked',sitios_patrullaje[indice]['existe_novedad'])

    if(sitios_patrullaje[indice]['existe_novedad']==true){
        $('div[id="ctpa_novedadesPatrullaje"]').show();
        limpiarArregloNovedad();
        
        for (i = 0; i < sitios_patrullaje[indice]['novedades'].length; i++) {
            const novedad = {
                descripcion:sitios_patrullaje[indice]['novedades'][i]['descripcion'],
                cantidad:sitios_patrullaje[indice]['novedades'][i]['cantidad'], 
                observacion:sitios_patrullaje[indice]['novedades'][i]['observacion'] 
            }
            registro_novedades.push(novedad);
        }
        //registro_novedades = JSON.parse(JSON.stringify(sitios_patrullaje[indice]['novedades']))
        refreshTablaRegistroNovedades();
    }else{
        $('div[id="ctpa_novedadesPatrullaje"]').hide();
        limpiarArregloNovedad();
    }
}

function insertRegistroSitioPatrullaje(){
    const regSitio = {
            id_sitio:$("#ctpa_idSitio").val(), 
            nombre_sitio:$("#ctpa_nombreSitio").val(),
            nombre_isla:$("#ctpa_nombreIsla").val(),
            mov_vehiculo:$("#ctpa_optVehiculo").prop('checked'),
            mov_pie:$("#ctpa_optPie").prop('checked'),
            mov_cemila:$("#ctpa_optCemila").prop('checked'),
            mov_otro:$("#ctpa_Otro").prop('checked'),
            mov_otro_descripcion:$("#ctpa_otraMovilizacion").val(),
            existe_novedad: $("#ctpa_existe_novedad").prop('checked'),
            novedades:JSON.parse(JSON.stringify(registro_novedades))
    }
    //si el nuevo registro es valido y no es duplicado lo inserta en el array.
    if(validarRegSitioPatrullaje(regSitio)){
        sitios_patrullaje.push(regSitio);
        console.log(sitios_patrullaje)
        $("#btnClosePopupSitioPatrullaje").trigger("click");
    }
}

function updateRegistroTablaSitioPatrullaje(indice){
    const edit_regSitio = {
            id_sitio:$("#ctpa_idSitio").val(), 
            nombre_sitio:$("#ctpa_nombreSitio").val(),
            nombre_isla:$("#ctpa_nombreIsla").val(),
            mov_vehiculo:$("#ctpa_optVehiculo").prop('checked'),
            mov_pie:$("#ctpa_optPie").prop('checked'),
            mov_cemila:$("#ctpa_optCemila").prop('checked'),
            mov_otro:$("#ctpa_Otro").prop('checked'),
            mov_otro_descripcion:$("#ctpa_otraMovilizacion").val(),
            existe_novedad: $("#ctpa_existe_novedad").prop('checked'),
            novedades:JSON.parse(JSON.stringify(registro_novedades))
    }
    //si el registro editado es valido y no es duplicado lo actualiza en el array
    if(validarEditRegSitioPatrullaje(edit_regSitio,indice)){
        sitios_patrullaje[indice]['id_sitio'] = edit_regSitio['id_sitio'];
        sitios_patrullaje[indice]['nombre_sitio'] = edit_regSitio['nombre_sitio'];
        sitios_patrullaje[indice]['nombre_isla'] = edit_regSitio['nombre_isla'];
        sitios_patrullaje[indice]['mov_vehiculo'] = edit_regSitio['mov_vehiculo'];
        sitios_patrullaje[indice]['mov_pie'] = edit_regSitio['mov_pie'];
        sitios_patrullaje[indice]['mov_cemila'] = edit_regSitio['mov_cemila'];
        sitios_patrullaje[indice]['mov_otro'] = edit_regSitio['mov_otro'];
        sitios_patrullaje[indice]['mov_otro_descripcion'] = edit_regSitio['mov_otro_descripcion'];
        sitios_patrullaje[indice]['existe_novedad'] = edit_regSitio['existe_novedad'];
        sitios_patrullaje[indice]['novedades'] = JSON.parse(JSON.stringify(edit_regSitio['novedades']))
        $("#btnClosePopupSitioPatrullaje").trigger("click");
    }
}

function refreshTablaSitioPatrullaje(){
    let tabla="";
    let ord = 0;
    for (let i = 0; i < sitios_patrullaje.length; i++) {
        ord = i+1;
        tabla += "<tr>";
        tabla += "<td align='center'>" + ord + "</td>";
        tabla += "<td align='center'>" + sitios_patrullaje[i]['nombre_sitio'] + "</td>";
        tabla += "<td align='center'>" + sitios_patrullaje[i]['nombre_isla'] + "</td>";
        tabla += "<td align='center'><a href='#popupAddSitioPatrullaje' data-stackbox='true' data-stackbox-position='absolute' onclick='getRegistroSitioPatrullaje(\"" + i + "\")'><i class='fa fa-edit text-green'></i></a></td>";             
        tabla += '<td align="center"><a style="cursor: pointer; font-size: 15x;" title="Buscar" data-close-stackbox="true" onClick="deleteDataSitioPatrullajeTabla(' + i + ')"><i class="fa fa-trash text-green"></i></a></td>';
        tabla += "</tr>";
    }

    $("#body_tablaSitiosPatrullaje").html("");
    $("#body_tablaSitiosPatrullaje").append(tabla);
}


function limpiarArregloSitiosPatrullaje(){ 
    if (sitios_patrullaje.length > 0)
        sitios_patrullaje.splice(0,sitios_patrullaje.length);

    if (copy_sitios_patrullaje.length > 0)
       copy_sitios_patrullaje.splice(0,copy_sitios_patrullaje.length);
}



/*********************************FUNCIONES CRUD PATRULLAJE*********************************/
/*********************************FUNCIONES CRUD PATRULLAJE*********************************/
function validarCtpaSelectFuncionarios(){
    let count = 0;
    $("#ctpa_funcionarios option:selected").each(function(){
        if ($(this).attr('value') != "")
            count++;
    });
    if (count > 0){
        return true;
    }
    else{
        validaContenedorExt("addActaControlPatrullaje","Seleccione Funcionario"); 
        return false;    
    }
}

function setInsertUpdateActaControlPatrullaje(){
    valida_select_funcionario = validarCtpaSelectFuncionarios();
    if(valida_select_funcionario){
        if ($("#ctpa_tipoOperacion").val() == 0){
            insertActaControlPatrullaje();
        }
        else{
            updateActaControlPatrullaje();
        }
    }          
}

function getDataFormPatrullaje(){
    let funcionarios_id = new Array();
    let funcionarios_nombre = new Array();

    /*Datos Generales*/
    fecha = $("#ctpa_fecha").val() + ' ' + $("#ctpa_hora").val();
    policia = $("#ctpa_policia").val();

    /*Personal DPNG*/
    $("#ctpa_funcionarios option:selected").each(function(){
        if ($(this).attr('value') != ""){
            funcionarios_id.push($(this).attr('value'));
            funcionarios_nombre.push($(this).text());
        }
    });

    datos  = '{'
    datos += '"fecha":"' + fecha + '",'
    datos += '"funcionarios_id":"' + funcionarios_id.join('|') +  '",'
    datos += '"funcionarios_nombre":"' + funcionarios_nombre.join('|') + '",'
    datos += '"policia":"' + policia + '"'
    datos += '}';

    return datos;
}

/*insertar registro actas de control patrullaje*/
function insertActaControlPatrullaje() {
    datos = getDataFormPatrullaje();
    id_padre = $('#contentActaControlPatrullaje').parent().attr('id');
    th_insert(datos,"control_patrullaje", id_padre, "cincontrolpatrullaje",1,"",insertDetallePatrullaje);
    //th_insert(datos,"control_patrullaje", id_padre, "cincontrolpatrullaje");
}


/*Insertar detalle control patrullaje*/
function insertDetallePatrullaje(controlpatrullaje_id){
    insertHitosPatrullaje(controlpatrullaje_id);
    insertSitiosPatrullaje(controlpatrullaje_id);
}

/*insertar registrode hitos verificados*/
function insertHitosPatrullaje(controlpatrullaje_id){
    datosHitoPatrullaje = "";

    for (let i = 0; i < registro_hitos.length; i++) {    
        datosHitoPatrullaje +=  '{'
        datosHitoPatrullaje += '"controlpatrullaje_id":"' + controlpatrullaje_id + '",'
        datosHitoPatrullaje += '"hito_id":"' + registro_hitos[i]['hito_id'] + '",'
        datosHitoPatrullaje += '"estado_hito":"' + registro_hitos[i]['estado'] + '"'
        datosHitoPatrullaje +=  '}'
        
        if ((i + 1) < registro_hitos.length)
            datosHitoPatrullaje +=  ','
    }

    let id_padre = $('#contentActaControlPatrullaje').parent().attr('id');
    th_insert(datosHitoPatrullaje,"control_patrullaje", id_padre, "cincontrolhitopatrullaje");
}

function insertSitiosPatrullaje(controlpatrullaje_id){
    let datosSitios = "";
    let id_padre = $('#contentActaControlPatrullaje').parent().attr('id');

    for (let i = 0; i < sitios_patrullaje.length; i++) {    
        
        datosSitio =  "";
        datosSitio +=  '{'
        datosSitio += '"controlpatrullaje_id":"' + controlpatrullaje_id + '",'
        datosSitio += '"sitio_id":"' + sitios_patrullaje[i]['id_sitio'] + '",'
        datosSitio += '"mov_vehiculo":"' + sitios_patrullaje[i]['mov_vehiculo'] + '",'
        datosSitio += '"mov_pie":"' + sitios_patrullaje[i]['mov_pie'] + '",'
        datosSitio += '"mov_cemila":"' + sitios_patrullaje[i]['mov_cemila'] + '",'
        datosSitio += '"mov_otro":"' + sitios_patrullaje[i]['mov_otro'] + '",'
        datosSitio += '"mov_otro_descripcion":"' + sitios_patrullaje[i]['mov_otro_descripcion'] + '",'
        datosSitio += '"existe_novedad":"' + sitios_patrullaje[i]['existe_novedad'] + '"'
        datosSitio += '}'
        //console.log(datosSitios);
        //th_insert(datosSitios,"control_patrullaje", id_padre, "cincontrolsitiopatrullaje",1);
        th_insert(datosSitio,"control_patrullaje", id_padre, "cincontrolsitiopatrullaje",1,"",insertNovedadSitioPatrullaje = (sitiopatrullaje_id) => {

            datosNovedad =  "";
            for (let x = 0; x < sitios_patrullaje[i]['novedades'].length; x++){
                datosNovedad +=  '{'
                datosNovedad += '"sitiopatrullaje_id":"' + sitiopatrullaje_id + '",'
                datosNovedad += '"descripcion":"' + sitios_patrullaje[i]['novedades'][x]['descripcion'] + '",'
                datosNovedad += '"cantidad":"' + sitios_patrullaje[i]['novedades'][x]['cantidad'] + '",'
                datosNovedad += '"observaciones":"' + sitios_patrullaje[i]['novedades'][x]['observacion'] + '"'
                datosNovedad += '}'
                
                if ((x + 1) < sitios_patrullaje[i]['novedades'].length)
                    datosNovedad +=  ','
            }
            console.log(datosNovedad);   
            th_insert(datosNovedad,"control_patrullaje", id_padre, "cincontrolnovedadpatrullaje");
             
        });
        
    }   
}

/*Consulta actas de control-patrullaje por parametros*/
function getActaControlPatrullaje(){
    data = '';
    fecha = $("#ctpa_fechaActa").val();
    
    if (fecha != "")
            data = "fecha__icontains=" + fecha + "&";
    
    $.ajax({
        url: "data_ParamActaControlPatrullaje",
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
                        if(data[i].estado == 'A'){
                            fecha = (data[i].fecha.substring(0,10));
                            hora  = (data[i].fecha.substring(11,16));

                            tabla += "<tr id='tr_cpag_fila_" + data[i].id + "'>";
                            tabla += "<td align='center' id='td_ctpa_fecha_" + data[i].id + "'>" + fecha + "</td>";
                            tabla += "<td align='center' id='td_ctpa_hora_" + data[i].id + "'>" + hora + "</td>";
                            tabla += "<td align='center' id='td_ctpa_personalDPNG_" + data[i].id + "'>" + data[i].funcionarios_nombre.split("|")+ "</td>";
                            tabla += "<td align='center' id='td_ctpa_policia_" + data[i].id + "'>" + data[i].policia + "</td>";
                            tabla += "<td align='center'><a href='#addActaControlPatrullaje' data-stackbox='true' data-stackbox-position='absolute' onclick='getByIdActaControlPatrullaje(\"" + data[i].id + "\")'><i class='fa fa-edit text-green'></i></a></td>";
                            tabla += "<td align='center'><a style='cursor: pointer;' onclick='deleteModal(\"" + data[i].id + "\",\"ActaControlPatrullajeGeneral\");'><i class='fa fa-trash text-green' title='Eliminar'></i></a></td>";
                            tabla += "</tr>";
                        }
                    }
                }


                $('#tabla_ActaControlPatrullaje').dataTable().fnClearTable();
                $('#tabla_ActaControlPatrullaje').dataTable().fnDestroy();

                $("#bodytabla_ActaControlPatrullaje").html("");
                $("#bodytabla_ActaControlPatrullaje").append(tabla);

                $('#tabla_ActaControlPatrullaje').DataTable();
            }
        },

        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
            //console.log( JSON.stringify(data));
        },
    });
}

function getByIdActaControlPatrullaje(id){
    limpiarFormActaControlPatrullaje();
    $("#ctpa_tipoOperacion").val(1); // switch para cambiar a metodo de update
        $.ajax({
        url: "editActaControlPatrullaje",
        type: "get",
        data: {
            "data": id
        },
        dataType: "json",

        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
            } else {
                $("#idActaControlPatrullaje").val(data[0].id);
                $("#ctpa_fecha").val(data[0].fecha.substring(0,10));
                $("#ctpa_hora").val(data[0].fecha.substring(11,16));
                $('#ctpa_funcionarios').val(data[0].funcionarios_nombre).trigger("change");
                $("#ctpa_policia").val(data[0].policia);
                
                if (data[0].funcionarios_id != null) {
                    funcionarios = data[0].funcionarios_id.split("|");
                    $("#ctpa_funcionarios").val(funcionarios).trigger('change');
                }

                if(data[0].foto != null){
                    $("#ctpa_imagen").attr('src', 'data:image/png;base64, '+data[0].foto);
                    $("#ctpa_divImagen").attr('rel', 'gallery');
                    $("#ctpa_divImagen").addClass('fancybox');
                    $("#ctpa_divImagen").attr('href', 'data:image/png;base64, '+data[0].foto);
                    $(".fancybox").fancybox();
                }   

            }
        },
        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
            //console.log( JSON.stringify(data));
        },
    });

    $.ajax({
        url: "editActaControlPatrullajeHito",
        type: "get",
        data: {
            "data": id
        },
        dataType: "json",

        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
            } else {
                if (data.length > 0) {
                    copy_registro_hitos[0] = new Array();
                    copy_registro_hitos[1] = new Array();
                    
                    for (i = 0; i < data.length; i++) {
                        if(data[i].estado == 'A'){ //Solo registros activas 
                            datos_hito = {
                                    hito_id:data[i].hito_id.id, 
                                    isla:data[i].hito_id.isla,
                                    area:data[i].hito_id.area,
                                    num_hito:data[i].hito_id.punto,
                                    latitud:data[i].hito_id.x,
                                    longitud:data[i].hito_id.y,
                                    sitio_referencia:data[i].hito_id.sitio_referencia,
                                    estado:data[i].estado_hito
                            };
                            copy_registro_hitos[0][i] = data[i].id;
                            registro_hitos[i] = datos_hito;  
                        }
                    }
                    copy_registro_hitos[1] = JSON.parse(JSON.stringify(registro_hitos));
                }
                console.log(registro_hitos);
                refreshTablaRegistroHitos();                                    
            }
        },
        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
            //console.log( JSON.stringify(data));
        },
    });

    $.ajax({
        url: "editActaControlPatrullajeSitio",
        type: "get",
        data: {
            "data": id
        },
        dataType: "json",

        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
            } else {
                if (data.length > 0) {
                    copy_sitios_patrullaje[0] = new Array();
                    copy_sitios_patrullaje[1] = new Array();
                    arr_novedades = new Array();

                    for (i = 0; i < data.length; i++) {
                        if(data[i].estado == 'A'){ //Solo registros activas 

                            if(data[i].existe_novedad){
                                arr_novedades = convertToRegNovedad(data[i].ctp_sitiopatrullaje_id);
                            }
                            
                            datos_sitio = {
                                    id_sitio:data[i].sitio_id.id, 
                                    nombre_sitio:data[i].sitio_id.descripcion,
                                    nombre_isla:data[i].sitio_id.isla_id.descripcion,
                                    mov_vehiculo:data[i].mov_vehiculo,
                                    mov_pie:data[i].mov_pie,
                                    mov_cemila:data[i].mov_cemila,
                                    mov_otro:data[i].mov_otro,
                                    mov_otro_descripcion:data[i].mov_otro_descripcion,
                                    existe_novedad:data[i].existe_novedad,
                                    novedades:JSON.parse(JSON.stringify(arr_novedades))
                            };

                            copy_sitios_patrullaje[0][i] = data[i].id;
                            sitios_patrullaje[i] = datos_sitio;  
                        }
                    }
                    copy_sitios_patrullaje[1] = JSON.parse(JSON.stringify(sitios_patrullaje));
                }
                console.log(sitios_patrullaje);
                refreshTablaSitioPatrullaje();                                    
            }
        },
        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
            //console.log( JSON.stringify(data));
        },
    });
}

/*Convierte el array de novedades (cadenas) a un array(formato JSON)*/
function convertToRegNovedad(novedades){
    let novedad = new Array();
    let arr_novedades = new Array();

    for (x = 0; x < novedades.length; x++) {
        novedad = novedades[x].split(",");
        if(novedad[4]=="A"){
            registro_novedad = {
                novedad_id:novedad[0],
                descripcion:novedad[1],
                cantidad:novedad[2], 
                observacion:novedad[3] 
            }
            arr_novedades.push(registro_novedad);
        }
    }
    return arr_novedades;
}


function updateActaControlPatrullaje(){
    let datos = getDataFormPatrullaje();
    id = $("#idActaControlPatrullaje").val();
    id_padre = $('#contentActaControlPatrullaje').parent().attr('id');
    //th_update(datos, "control_patrullaje", id_padre, "cincontrolpatrullaje", id,"",updateTablaControlPatrullajeGeneral);
    th_update(datos, "control_patrullaje", id_padre, "cincontrolpatrullaje", id);

    
    /*Actualizacion de registros de hitos (insertar nuevos, editar cambios, eliminar)*/
    let existe_hito;
    let datosHitoPatrullaje = "";
    for (let i = 0; i < registro_hitos.length; i++) {    
        existe_hito = 0;
        for (let k = 0; k < copy_registro_hitos[1].length; k++) {    
            //si el registro existe y hay cambios, actualiza el registro
            if (registro_hitos[i]['hito_id'] == copy_registro_hitos[1][k]['hito_id']){
                if((registro_hitos[i]['estado'] != copy_registro_hitos[1][k]['estado'])){
                    console.log('verificado');
                    
                    datosHitoPatrullaje +=  '{'
                    datosHitoPatrullaje += '"controlpatrullaje_id":"' + id + '",'
                    datosHitoPatrullaje += '"hito_id":"' + registro_hitos[i]['hito_id'] + '",'
                    datosHitoPatrullaje += '"estado_hito":"' + registro_hitos[i]['estado'] + '"'
                    datosHitoPatrullaje +=  '}'
                    
                    id_registro = copy_registro_hitos[0][k];
                    th_update(datosHitoPatrullaje,"control_patrullaje", id_padre,"cincontrolhitopatrullaje",id_registro);
                }
                existe_hito = 1;
            }
        }
        //si el registro no existe, entonces lo inserta
        datosHitoPatrullaje = "";
        if(existe_hito == 0){
            
            datosHitoPatrullaje +=  '{'
            datosHitoPatrullaje += '"controlpatrullaje_id":"' + id + '",'
            datosHitoPatrullaje += '"hito_id":"' + registro_hitos[i]['hito_id'] + '",'
            datosHitoPatrullaje += '"estado_hito":"' + registro_hitos[i]['estado'] + '"'
            datosHitoPatrullaje +=  '}'
                    
            th_insert(datosHitoPatrullaje,"control_patrullaje", id_padre, "cincontrolhitopatrullaje",1);
        }
    }
    
    //Verifica los registros de hitos eliminados
    datosHitoPatrullaje = "";
    for (let i = 0; i < copy_registro_hitos[1].length; i++) {    
        existe_data_del = 1;
        for (let k = 0; k < registro_hitos.length; k++) {   
            if (copy_registro_hitos[1][i]['hito_id'] == registro_hitos[k]['hito_id'])
                existe_data_del = 0;
        }

        if(existe_data_del == 1){
            id_registro = copy_registro_hitos[0][i];
            datosHitoPatrullaje = '{"estado":"I","eliminado":"t"}';
            th_delete(datosHitoPatrullaje,"control_patrullaje", id_padre, "cincontrolhitopatrullaje",id_registro,1);
        }
    }

    /*Actualizacion de registros de sitios (insertar nuevos, editar cambios, eliminar)*/
    let existe_sitio;
    let datosSitioPatrullaje = "";
    for (let i = 0; i < sitios_patrullaje.length; i++) {     
        existe_sitio = 0;
        for (let k = 0; k < copy_sitios_patrullaje[1].length; k++) {    
            //si el registro existe y hay cambios, actualiza el registro
            if (sitios_patrullaje[i]['id_sitio'] == copy_sitios_patrullaje[1][k]['id_sitio']){
                if((sitios_patrullaje[i]['mov_vehiculo'] != copy_sitios_patrullaje[1][k]['mov_vehiculo']) || (sitios_patrullaje[i]['mov_pie'] != copy_sitios_patrullaje[1][k]['mov_pie']) || (sitios_patrullaje[i]['mov_cemila'] != copy_sitios_patrullaje[1][k]['mov_cemila']) || (sitios_patrullaje[i]['mov_otro'] != copy_sitios_patrullaje[1][k]['mov_otro']) || (sitios_patrullaje[i]['mov_otro_descripcion'] != copy_sitios_patrullaje[1][k]['mov_otro_descripcion'])){
                    console.log('verificado');
                    
                    datosSitioPatrullaje +=  '{'
                    datosSitioPatrullaje += '"controlpatrullaje_id":"' + id + '",'
                    datosSitioPatrullaje += '"sitio_id":"' + sitios_patrullaje[i]['id_sitio'] + '",'
                    datosSitioPatrullaje += '"mov_vehiculo":"' + sitios_patrullaje[i]['mov_vehiculo'] + '",'
                    datosSitioPatrullaje += '"mov_pie":"' + sitios_patrullaje[i]['mov_pie'] + '",'
                    datosSitioPatrullaje += '"mov_cemila":"' + sitios_patrullaje[i]['mov_cemila'] + '",'
                    datosSitioPatrullaje += '"mov_otro":"' + sitios_patrullaje[i]['mov_otro'] + '",'
                    datosSitioPatrullaje += '"mov_otro_descripcion":"' + sitios_patrullaje[i]['mov_otro_descripcion'] + '",'
                    datosSitioPatrullaje += '"existe_novedad":"' + sitios_patrullaje[i]['existe_novedad'] + '"'
                    datosSitioPatrullaje += '}'

                    id_registro = copy_sitios_patrullaje[0][k];
                    th_update(datosSitioPatrullaje,"control_patrullaje", id_padre,"cincontrolsitiopatrullaje",id_registro);
                }
                existe_sitio = 1;
                
               actualizar_novedades(sitios_patrullaje[i]['novedades'],copy_sitios_patrullaje[1][k]['novedades'],copy_sitios_patrullaje[0][k]);
            }           
        }

        //si el registro no existe, entonces lo inserta
        datosSitioPatrullaje = "";
        if(existe_sitio == 0){
            datosSitioPatrullaje +=  '{'
            datosSitioPatrullaje += '"controlpatrullaje_id":"' + id + '",'
            datosSitioPatrullaje += '"sitio_id":"' + sitios_patrullaje[i]['id_sitio'] + '",'
            datosSitioPatrullaje += '"mov_vehiculo":"' + sitios_patrullaje[i]['mov_vehiculo'] + '",'
            datosSitioPatrullaje += '"mov_pie":"' + sitios_patrullaje[i]['mov_pie'] + '",'
            datosSitioPatrullaje += '"mov_cemila":"' + sitios_patrullaje[i]['mov_cemila'] + '",'
            datosSitioPatrullaje += '"mov_otro":"' + sitios_patrullaje[i]['mov_otro'] + '",'
            datosSitioPatrullaje += '"mov_otro_descripcion":"' + sitios_patrullaje[i]['mov_otro_descripcion'] + '",'
            datosSitioPatrullaje += '"existe_novedad":"' + sitios_patrullaje[i]['existe_novedad'] + '"'
            datosSitioPatrullaje += '}'
            
            th_insert(datosSitioPatrullaje,"control_patrullaje", id_padre, "cincontrolsitiopatrullaje",1,"",insertNovedadSitioPatrullaje = (sitiopatrullaje_id) => {

                datosNovedad =  "";
                for (let x = 0; x < sitios_patrullaje[i]['novedades'].length; x++){
                    datosNovedad +=  '{'
                    datosNovedad += '"sitiopatrullaje_id":"' + sitiopatrullaje_id + '",'
                    datosNovedad += '"descripcion":"' + sitios_patrullaje[i]['novedades'][x]['descripcion'] + '",'
                    datosNovedad += '"cantidad":"' + sitios_patrullaje[i]['novedades'][x]['cantidad'] + '",'
                    datosNovedad += '"observaciones":"' + sitios_patrullaje[i]['novedades'][x]['observacion'] + '"'
                    datosNovedad += '}'
                    
                    if ((x + 1) < sitios_patrullaje[i]['novedades'].length)
                        datosNovedad +=  ','
                }
                console.log(datosNovedad);   
                th_insert(datosNovedad,"control_patrullaje", id_padre, "cincontrolnovedadpatrullaje",1);
             
            });
        }
    }//end for actualizacion sitio


    //Verifica registro de sitios que hayan sido eliminados
    datosSitioPatrullaje = "";
    for (let i = 0; i < copy_sitios_patrullaje[1].length; i++) {    
        existe_data_del = 1;
        for (let k = 0; k < sitios_patrullaje.length; k++) {   
            if (copy_sitios_patrullaje[1][i]['id_sitio'] == sitios_patrullaje[k]['id_sitio'])
                existe_data_del = 0;
        }

        if(existe_data_del == 1){
            id_registro = copy_sitios_patrullaje[0][i];
            datosSitioPatrullaje = '{"estado":"I","eliminado":"t"}';
            th_delete(datosSitioPatrullaje,"control_patrullaje", id_padre, "cincontrolsitiopatrullaje",id_registro,1);
        }
    }
}


function actualizar_novedades(novedades, copy_novedades, sitiopatrullaje_id){
    let existe_novedad="";
    let datosNovedad = "";
    for (let a = 0; a < novedades.length; a++) { 
        existe_novedad=0;
        for(let b = 0; b < copy_novedades.length; b++){
            if (novedades[a]['descripcion'] == copy_novedades[b]['descripcion']){
                if((novedades[a]['cantidad'] != copy_novedades[b]['cantidad']) || (novedades[a]['observacion'] != copy_novedades[b]['observacion'])){
                    novedad_id = copy_novedades[b]['novedad_id'];
                    datosNovedad +=  '{'
                    datosNovedad += '"sitiopatrullaje_id":"' + sitiopatrullaje_id + '",'
                    datosNovedad += '"descripcion":"' + novedades[a]['descripcion'] + '",'
                    datosNovedad += '"cantidad":"' + novedades[a]['cantidad'] + '",'
                    datosNovedad += '"observaciones":"' + novedades[a]['observacion'] + '"'
                    datosNovedad += '}'
                    th_update(datosNovedad,"control_patrullaje", id_padre, "cincontrolnovedadpatrullaje",novedad_id);
                    datosNovedad = "";
                }
            existe_novedad = 1
            }
        }
        /*Si no existe la novedad, la inserta*/
        if(existe_novedad==0){
            datosNovedad = '';
            datosNovedad +=  '{'
            datosNovedad += '"sitiopatrullaje_id":"' + sitiopatrullaje_id + '",'
            datosNovedad += '"descripcion":"' + novedades[a]['descripcion'] + '",'
            datosNovedad += '"cantidad":"' + novedades[a]['cantidad'] + '",'
            datosNovedad += '"observaciones":"' + novedades[a]['observacion'] + '"'
            datosNovedad += '}'
            th_insert(datosNovedad,"control_patrullaje", id_padre, "cincontrolnovedadpatrullaje",1);
        }        
    }

    //Verifica registro de novedadas que hayan sido eliminadass
    datosNovedad = "";
    for (let a = 0; a < copy_novedades.length; a++) {   
        existe_data_del = 1;
        for(let b = 0; b < novedades.length; b++){ 
            if (copy_novedades[a]['descripcion'] == novedades[b]['descripcion'])
                existe_data_del = 0;
        }

        if(existe_data_del == 1){
            novedad_id = copy_novedades[a]['novedad_id'];
            datosNovedad = '{"estado":"I","eliminado":"t"}';
            //console.log("eliminar:" + novedad_id);
            th_delete(datosNovedad,"control_patrullaje", id_padre, "cincontrolnovedadpatrullaje",novedad_id,1);
        }
    }
}
   

/*cronograma*/
function getDataFuncionariosActividadTabla(){

    f1 = $('#FdesdeCr').val();
    f1Arr = f1.split("-");
    console.log(f1);
    console.log(lastday(f1Arr[1],f1Arr[0]));
    lastday1= lastday(f1Arr[1],f1Arr[0]);
    var tabla = "";
    $.ajax({
            url: "data_funcionariosactividades",
            type: "get",
            data: {
                "data": "anio="+f1Arr[1]+"&mes="+f1Arr[0]
            },
            dataType: "json",

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
                        nombre = json[i].actividad_id.valor;
                        if(nombre != nombre_aux){
                            tabla+="<tr><td colspan='"+(lastday1+2)+"' align='center' style='background-color:#005196; color: white;font-weight:bold;font-size:12px;'>"+json[i].actividad_id.nombre+"</td></tr>";
                            cont = 1;
                        }
                        tabla+="<tr>";
                        tabla+="<td style='background-color:#005196; color: white;font-weight:bold;font-size:12px;'>"+cont+"</td>";
                        tabla+="<td style='background-color:#005196; color: white;font-weight:bold;font-size:12px;' href='#popupdias' data-stackbox='true' data-stackbox-width='1300px' data-stackbox-height='500px' data-stackbox-position='absolute' onClick='getDataDiasActFun(\"" + json[i].id + "\",\"" + json[i].funcionario_id.persona_id.nombre_completo + "\",\"" + json[i].actividad_id.nombre + "\",\"" + f1Arr[1] + "\",\"" + f1Arr[0] + "\");'>"+json[i].funcionario_id.persona_id.nombre_completo+"</td>";
                        
                        arrayDias = [];
                        datadias  = [];
                        if(json[i].actividades_dias.length > 0){
                            arrayDias = json[i].actividades_dias[0].dias_actividad.split(";");
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
                            head2+="<td style='text-transform:uppercase;font-weight:bold;font-size:12px;text-align:center;"+color+"' id=''>"+valorDia+"</td>";
                        } 
                        tabla+=head2;
                        nombre_aux = json[i].actividad_id.valor;
                        cont++;
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


function lastday(y,m){
return  new Date(y, m , 0).getDate();
}

function getDataDiasActFun(id,funcionario, actividad,anio,mes){
console.log(333);
    $("#popupFuncionario").html(funcionario);
    $("#popupActividad").html(actividad);
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
        }
        else{
            color = 'background-color:#005196; color: white;font-weight:bold;';
            color2 = '';
        }
        head+="<th style='"+color+"'>"+i+"</th>";
        head1+="<th style='"+color+"'>"+weekday+"</th>";
        body+="<td style='"+color2+"'><input type='text' id='dia_"+i+"' style='width: 20px;text-transform: uppercase; font-size: 16px;text-align:center;'/></td>";
    } 

    cabecera ="<table style='width:100%' class='table table-striped table-bordered'>";
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
        url: "data_diasfuncionariosactividades",
        type: "get",
        data: {
            "data": "actividad_funcionario_id="+id+"&anio="+anio+"&mes="+mes
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
                        $("#dia_"+(i+1)).val(arrarRes[1]);
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


function setinsertupdateDiasActFunc(){

    f1 = $('#FdesdeCr').val();
    f1Arr = f1.split("-");

    lastday1 = $("#lastday").val();
    idtrx = $("#idtrx").val();
    actividad_funcionario_id = $("#actividad_funcionario_id").val();

    cadenaDias = '';
    for (i = 1; i <= lastday1; i++) {
        
        cadenaDias += i+":"+$("#dia_"+i).val()+";";
    }
    cadenaDias = cadenaDias.substring(0, cadenaDias.length - 1);

    datos = '{';
    datos += ' "actividad_funcionario_id":"' + actividad_funcionario_id + '",';
    datos += ' "anio":"' + f1Arr[1] + '",';
    datos += ' "mes":"' + f1Arr[0] + '",';
    datos += ' "dias_actividad":"' +cadenaDias + '"';
    datos += '}';

    if($("#tipoCronFun").val()=="0")
        insertDiasActFunc(datos);
    else
        updateDiasActFunc(datos);
}



function insertDiasActFunc(datos){
    $("#modalLoadin").show();
    dj_url = "cmndiasactividadfuncionarios";
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
                validaContenedorExt("popupdias", "Error al Actualizar el Registro");
                console.log("data---->" + datos + "--->" + "cmndiasactividadfuncionarios" + "Error--->" + data);
            } else {
                validaContenedorExt2("popupdias", "Registro Insertado con exito");
                getDataFuncionariosActividadTabla();
                $('#modalLoadin').hide();
            }
        },
        error: function(data) {
            $('#modalLoadin').hide();
            validaContenedorExt("popupdias", "Error al Actualizar el Registro");
            console.log("data---->" + datos + "--->" + "cmndiasactividadfuncionarios" + "Error--->" + data);
        },
    });
}

function updateDiasActFunc(datos){
    $("#modalLoadin").show();
    console.log($("#idAVCUSO").val());
    dj_url = "cmndiasactividadfuncionarios";
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
                getDataFuncionariosActividadTabla();
            }
        },
        error: function(data) {
            $("#modalLoadin").hide();
            validaContenedorExt("popupdias", "Error al Actualizar el Registro");
            console.log("data---->" + datos + "--->" + "cmndiasactividadfuncionarios" + "Error--->" + data);
        },
    });
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


function getDataActividadesXperiodo(){
    anio = $('#SanioConf').val();
    mes  = $('#SmesConf').val();

    $.ajax({
            url: "data_parametrosconfig",
            type: "get",
            data: {
                "data": "anio="+anio+"&mes="+mes
            },
            dataType: "json",

            success: function(json) {
                $("#modalLoadin").hide();
                if (json['non_field_errors'])
                    console.log(json['non_field_errors']);
                else {
                    li = "";
                    div = "";
                    for (i = 0; i < json.length; i++) {
                        li+="<li class=''>";
                        li+="<a href='#tab_actividad"+json[i].valor+"' onclick='getDataFuncionariosActividad(\"" + json[i].id + "\",\"" + json[i].valor + "\",\"" + anio + "\",\"" + mes + "\");' data-toggle='tab' aria-expanded='true' style='font-weight: bold; font-size: 12px;'>" + json[i].descripcion + "</a>";
                        li+="</li>";


                        div+='<div class="tab-pane " id="tab_actividad'+json[i].valor+'" style="border: 2px solid;height: 480px;">';
                        div+='<div class="col-xs-9" style="margin-top: 50px;">';
                        div+='<fieldset>';
                        div+='<legend style="font-size: 12px; text-align: left;border-bottom: 1px solid;background-color: #005196;color: white;padding: 5px; width: 100%;">'+json[i].nombre+'</legend>';
                        div+=' <table>';
                        div+='<tr>';
                        div+='<td align="right"  style="font-size: 12px;font-weight:bold;">Agregar Funcionario</td>';
                        div+='<td width="20px;"></td>';
                        div+='<td>';
                        div+='<a style="cursor: pointer; font-size: 16px;float: right;" title="Buscar Funionario" href="#popupFuncionarios" onclick="limpiaPopupFuncionario(\'cronograma_cuso\');" data-stackbox="true" data-stackbox-width="1000px" data-stackbox-height="300px" data-stackbox-position="absolute"><i class="fa fa-search-plus text-green"></i>';
                        div+='</a>';
                        div+='</td>';
                        div+='</tr>';
                        div+='</table>';
                        div+='<div id="content_bodyFcuso" align="center" style="box-shadow: 5px 10px #888888;width: 600px;">';
                        div+='<table id="tabla_PopupFuncAct'+json[i].valor+'" style="font-size: 12px; text-transform: uppercase;" class="display table table-striped table-bordered" width="100%" cellspacing="0">';
                        div+='<thead>';
                        div+='<tr style="background-color: #3c8dbc;color: white;"> ';
                        div+='<th>IDENTIFICACION</th>';
                        div+='<th>NOMBRE</th>';
                        div+='<th></th>';
                        div+='</tr>';
                        div+='</thead>';
                        div+='<tbody class="botonera1" id="body_tabla_PopupFuncAct'+json[i].valor+'">';
                          
                        div+='</tbody>';
                        div+='</table>';
                        div+='</div>';
                        div+='</fieldset>';
                        div+='</div>';
                        div+='</div>';
                    }

                    $("#tabsIng").html("");
                    $("#tabsIng").append(li);

                    $("#div_content").html("");
                    $("#div_content").append(div);
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



function getDataFuncionariosActividad(id,valor,anio,mes){
    $('#actividad_valor').val(valor);
    $('#actividad_id').val(id);

    $.ajax({
            url: "data_funcionariosactividades",
            type: "get",
            data: {
                "data": "actividad_id="+id+"&anio="+anio+"&mes="+mes
            },
            dataType: "json",

            success: function(json) {
                $("#modalLoadin").hide();
                if (json['non_field_errors'])
                    console.log(json['non_field_errors']);
                else {
                    tabla = "";
                    for (i = 0; i < json.length; i++) {
                        tabla+="<tr>";
                        tabla+="<td>"+json[i].funcionario_id.persona_id.nombre_completo+"</td>";
                        tabla+="<td>"+json[i].funcionario_id.persona_id.identificacion+"</td>";
                        tabla+="<td><a class='delete' id_detalle='" + json[i].id + "'  onclick='deleteTablaFuncAct(this,\"" + valor + "\");'><i class='fa fa-trash text-green btn_edit'></i></a></td>";
                    }
                }

                $('#tabla_PopupFuncAct'+valor).dataTable().fnClearTable();
                $('#tabla_PopupFuncAct'+valor).dataTable().fnDestroy();

                $("#body_tabla_PopupFuncAct"+valor).html("");
                $("#body_tabla_PopupFuncAct"+valor).append(tabla);

                var table = $('#tabla_PopupFuncAct'+valor).DataTable({

                    orderCellsTop: true
                });
            },
            error: function(json) {
                $("#modalLoadin").hide();
                swal("", "Error: " + JSON.stringify(json), "error");
                console.log(JSON.stringify(json));
                //console.log( JSON.stringify(data));
            },
        });
}


function getDataFuncionarioActividad(json){
    valor = $('#actividad_valor').val();
    id    = $('#actividad_id').val();

    anio = $('#SanioConf').val();
    mes  = $('#SmesConf').val();

    datos = '{';
    datos += ' "actividad_id":"' + id + '",';
    datos += ' "anio":"' + anio + '",';
    datos += ' "mes":"' + mes + '",';
    datos += ' "funcionario_id":"' + json[0].id + '"';
    datos += '}';

    dj_url = "cmnactividadfuncionarios";
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
                validaContenedorExt("window", "Error al Insertar el registro");
                console.log("data---->" + datos + "--->" + "cusocabdetcmnactavisitainspecembpesca" + "Error--->" + data);
            } else {
                validaContenedorExt2("window", "Registro Insertado con Exito");
                datosDet = '';

                datosDet  += '{';
                datosDet  += '"nombre":"' + json[0].persona_id.apellidos+ " " + json[0].persona_id.nombres + '", ';
                datosDet  += '"cedula":"'+json[0].persona_id.identificacion+'", ';

                eliminar  = "<a class='delete' id_detalle='" + data['results'][0].id + "'  onclick='deleteTablaFuncAct(this," + valor + ");'><i class='fa fa-trash text-green btn_edit'></i></a>";
                datosDet  += '"eliminar":"' + eliminar  +'"';
                datosDet  += '}'; 

                datosDet = "["+datosDet+"]";
                camposJson = JSON.parse(datosDet);
    //console.log( camposJson["orden"]);
                var dTable = $('#tabla_PopupFuncAct'+valor).DataTable({"destroy": true,});
                dTable.row.add([
                        camposJson[0].nombre,
                        camposJson[0].cedula,
                        camposJson[0].eliminar
                ]).draw();
            }
        },
        error: function(data) {
            //$('#modalLoadin').hide();
            validaContenedorExt("window", "Error al Insertar el registro");
            console.log("data---->" + datos + "--->" + "cusocabdetcmnactavisitainspecembpesca" + "Error--->" + data);
        },
    });
}

function deleteTablaFuncAct(trthis,valor){
    console.log(222);
    var pageParamTable = $('#tabla_PopupFuncAct'+valor).DataTable();
    var tableRow = pageParamTable.row($(trthis).parents('tr'));
    id    = $(trthis).attr("id_detalle");

        datos = '{"estado":"I","eliminado":"t"}';
        $.ajax({
            url: "update_General",
            type: "get",
            cache: 'false',
            data: {
                "dj_url": "cmnactividadfuncionarios",
                "idtabla": id,
                "data": JSON.stringify(datos)
            },
            dataType: "json",

            success: function(data) {
                if (data.id == undefined) {
                    $('#modalLoadin').hide();
                    validaContenedorExt("window", "Error al Insertar el registro");
                    console.log("idtabla---->" + id_detalle + "--->" + "data---->" + datos + "--->" + "cmnactividadfuncionarios" + "Error--->" + data);
                } else {
                    validaContenedorExt2("window", "Registro eliminado con exito");
                    pageParamTable.row( tableRow ).remove().draw();
                }
            },
            error: function(data) {
                $('#modalLoadin').hide();
                validaContenedorExt("window", "Error al Insertar el registro");
                console.log("idtabla---->" + id_detalle + "--->" + "data---->" + datos + "--->" + "cmnactividadfuncionarios" + "Error--->" + data);
            },
        });
}