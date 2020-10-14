/*codigo para agregar pestañas al contenedor*/
var tabs = $("#tabs").tabs();

//tabCounter = 0;
//const ESTADO_INICIAL_TRAMITE = "BORRADOR";

// ACCION DE PERSONAL
var path_archivos_accper = 'static/media/talentohumano/accionpersonal/';


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



/*personas*/
/*funcion para limpiar formulario de ingreso y actualizacion de personas*/
function limpiarFormPersonasP() {
    clearForm(frm_personasP);
    $("#tipoInsert_personaP").val(0); /*se usa en el popup persona para agregar nueva persona desde ahi*/
    $("#tituloPer").html("Ingresar");
    $('#idpersonaPer').val();
    $('#tipot_personaP').val(0);
    $("#btn_cedulaPerP").show();
    $('.nav-tabs a[href="#tab_personaP"]').tab('show'); //para q cuando se abra el popup aparezca en la primera pestaña
}

/*funcion para asignar los datos de la persona en el formulario*/
/*parametros cedula ---> cedula del usuario*/
function editPersona(cedula) {

    limpiarFormPersonasP();
    $("#modalLoadin").show();
    $("#btn_cedulaPerP").hide();

    $("#tipot_personaP").val(1);
    $("#tituloPer").html("Editar");

    $('.nav-tabs a[href="#tab_personaP"]').tab('show');

    $.ajax({
        url: "persona_data",
        type: "get",
        data: {
            "data": cedula
        },
        dataType: "json",

        success: function(json) {
            $("#modalLoadin").hide();
            if (json['non_field_errors']) {
                console.log(json['non_field_errors']);
            } else {
                $("#idpersonaPer").val(json[0].id);
                $('#SpaisPersP').val(json[0].pais_nacimiento_id).trigger("change");
                $("#nombrepersonaPer").val(json[0].nombre_completo);
                $("#num_cedpersP").val(json[0].identificacion);
                $("#nombres_persP").val(json[0].nombres);
                $("#apellidos_persP").val(json[0].apellidos);
                $('#StipoIdPersP [valor="' + json[0].tipo_identificacion + '"]').prop("selected", true).trigger("change");
                $('#STipoPersP [valor="' + json[0].tipo_persona + '"]').prop("selected", true).trigger("change");
                $('#SsexoPersP [valor="' + json[0].sexo + '"]').prop("selected", true).trigger("change");
                $("#telefono_persP").val(json[0].telefono_convencional);
                $("#celular_persP").val(json[0].telefono_celular);
                $("#StipoResPersP").val(json[0].tipo_residencia).trigger("change");
                $("#numIess_persP").val(json[0].num_iess);
                $("#SEtniasPersP").val(json[0].etnias).trigger("change");
                $("#numRes_persP").val(json[0].numero_residencia);
                $('#SEstCivilPersP [valor="' + json[0].estado_civil + '"]').prop("selected", true).trigger("change");
                $('#SciudadPersP').val(json[0].ciudad_nacimiento_id).trigger("change");
                $("#fechaNac_persP").val(json[0].fecha_nacimiento);

                $('#StipoSangrePersP [valor="' + json[0].tipo_sangre + '"]').prop("selected", true).trigger("change");
                $('#SnivelPersP [valor="' + json[0].nivel_escolaridad + '"]').prop("selected", true).trigger("change");
                $('#SgradoPersP [valor="' + json[0].grado_academico + '"]').prop("selected", true).trigger("change");
                $("#titulo1PersP").val(json[0].formacion_academica);
                $("#titulo2PersP").val(json[0].formacion_academica_opcional);
                $("#libretaPersP").val(json[0].libreta_militar);
                /*direccion domiciliaria*/
                $('#SprovPersP').val(json[0].provincia_residencia_id).trigger("change");
                $('#ScantonPersP').val(json[0].canton_residencia_id).trigger("change");
                $('#SparroqPersP').val(json[0].parroquia_residencia_id).trigger("change");
                $("#barrioPersP").val(json[0].barrio);
                $("#callepPersP").val(json[0].calle_principal);
                $("#callesPersP").val(json[0].calle_secundaria);
                $("#calleRefPersP").val(json[0].referencia);
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
function setInsertUpdatePersona(tipo) {
    if ($("#tipot_personaP").val() == 0)
        insertarTablaPersona();
    else
        editTablaPersona();
}

/*funcion para insertar en la base de datos*/
function insertarTablaPersona() {

    dato_insert = $("#tipoInsert_personaP").val();

    datos = '{';
    datos += ' "nombre_completo":"' + $("#apellidos_persP").val() + ' ' + $("#nombres_persP").val() + '",';
    if ($("#num_cedpersP").val() != "") datos += ' "identificacion":"' + $("#num_cedpersP").val() + '",';
    if ($("#nombres_persP").val() != "") datos += ' "nombres":"' + $("#nombres_persP").val() + '",';
    if ($("#apellidos_persP").val() != "") datos += ' "apellidos":"' + $("#apellidos_persP").val() + '",';
    if ($("#StipoIdPersP").val() != "") datos += ' "tipo_identificacion":"' + $("#StipoIdPersP option:selected").attr("valor") + '",';
    if ($("#STipoPersP").val() != "") datos += ' "tipo_persona":"' + $("#STipoPersP option:selected").attr("valor") + '",';
    if ($("#SsexoPersP").val() != "") datos += ' "sexo":"' + $("#SsexoPersP option:selected").attr("valor") + '",';
    if ($("#telefono_persP").val() != "") datos += ' "telefono_convencional":"' + $("#telefono_persP").val() + '",';
    if ($("#celular_persP").val() != "") datos += ' "telefono_celular":"' + $("#celular_persP").val() + '",';
    if ($("#StipoResPersP").val() != "") datos += ' "tipo_residencia":"' + $("#StipoResPersP").val() + '",';
    if ($("#SEtniasPersP").val() != "") datos += ' "etnias":"' + $("#SEtniasPersP").val() + '",';
    if ($("#numRes_persP").val() != "") datos += ' "numero_residencia":"' + $("#numRes_persP").val() + '",';
    if ($("#SEstCivilPersP").val() != "") datos += ' "estado_civil":"' + $("#SEstCivilPersP option:selected").attr("valor") + '",';
    if ($("#SpaisPersP").val() != "") datos += ' "pais_nacimiento_id":"' + $('#SpaisPersP').val() + '",';
    if ($("#SciudadPersP").val() != "") datos += ' "ciudad_nacimiento_id":"' + $('#SciudadPersP').val() + '",';
    if ($("#fechaNac_persP").val() != "") datos += ' "fecha_nacimiento":"' + $("#fechaNac_persP").val() + '",';
    if ($("#StipoSangrePersP").val() != "") datos += ' "tipo_sangre":"' + $("#StipoSangrePersP option:selected").attr("valor") + '",';
    if ($("#SnivelPersP").val() != "") datos += ' "nivel_escolaridad":"' + $("#SnivelPersP option:selected").attr("valor") + '",';
    if ($("#SgradoPersP").val() != "") datos += ' "grado_academico":"' + $("#SgradoPersP option:selected").attr("valor") + '",';
    if ($("#titulo1PersP").val() != "") datos += ' "formacion_academica":"' + $("#titulo1PersP").val() + '",';
    if ($("#titulo2PersP").val() != "") datos += ' "formacion_academica_opcional":"' + $("#titulo2PersP").val() + '",';
    if ($("#libretaPersP").val() != "") datos += ' "libreta_militar":"' + $("#libretaPersP").val() + '",';
    if ($("#SprovPersP").val() != "") datos += ' "provincia_residencia_id":"' + $('#SprovPersP').val() + '",';
    if ($("#ScantonPersP").val() != "") datos += ' "canton_residencia_id":"' + $('#ScantonPersP').val() + '",';
    if ($("#SparroqPersP").val() != "") datos += ' "parroquia_residencia_id":"' + $('#SparroqPersP').val() + '",';
    if ($("#barrioPersP").val() != "") datos += ' "barrio":"' + $("#barrioPersP").val() + '",';
    if ($("#callepPersP").val() != "") datos += ' "calle_principal":"' + $("#callepPersP").val() + '",';
    if ($("#callesPersP").val() != "") datos += ' "calle_secundaria":"' + $("#callesPersP").val() + '",';
    if ($("#calleRefPersP").val() != "") datos += ' "referencia":"' + $("#calleRefPersP").val() + '",';

    datos = datos.substring(0, datos.length - 1); //se le quita el ultimo caracter ya q puede ser un ,
    datos += '}';



    $.ajax({
        url: "persona_data",
        type: "get",
        data: {
            "data": $("#num_cedpersP").val()
        },
        dataType: "json",

        success: function(data) {
            if (data.length > 0) {
                //$('#modalLoadin').hide();
                validaContenedorExt("addPersonaP", "Ya existe Persona con esa identificación");
                return 0;
            } else {
                id_padre = $('#content_persona').parent().attr('id');
                th_insert(datos, "personas", id_padre, "perpersona", dato_insert);
                //console.log("idtabla---->"+id+"--->"+"data---->"+datos+"--->"+"perpersonacuenta"+"Error--->"+data);
            }
        },
        error: function(data) {
            $('#modalLoadin').hide();
            validaContenedorExt("addPersona", "Error al Insertar el registro");
            console.log("idtabla---->" + id + "--->" + "data---->" + datos + "--->" + "perpersonacuenta" + "Error--->" + data);
        },
    });

}

/*funcion para editar en la base de datos*/
/*el id se lo guarda en un campo oculto al momento de dar clik en editar*/
function editTablaPersona() {

    id = $("#idpersonaPer").val();

    datos = '{';
    datos += ' "nombre_completo":"' + $("#apellidos_persP").val() + ' ' + $("#nombres_persP").val() + '",';
    if ($("#num_cedpersP").val() != "") datos += ' "identificacion":"' + $("#num_cedpersP").val() + '",';
    if ($("#nombres_persP").val() != "") datos += ' "nombres":"' + $("#nombres_persP").val() + '",';
    if ($("#apellidos_persP").val() != "") datos += ' "apellidos":"' + $("#apellidos_persP").val() + '",';
    if ($("#StipoIdPersP").val() != "") datos += ' "tipo_identificacion":"' + $("#StipoIdPersP option:selected").attr("valor") + '",';
    if ($("#STipoPersP").val() != "") datos += ' "tipo_persona":"' + $("#STipoPersP option:selected").attr("valor") + '",';
    if ($("#SsexoPersP").val() != "") datos += ' "sexo":"' + $("#SsexoPersP option:selected").attr("valor") + '",';
    if ($("#telefono_persP").val() != "") datos += ' "telefono_convencional":"' + $("#telefono_persP").val() + '",';
    if ($("#celular_persP").val() != "") datos += ' "telefono_celular":"' + $("#celular_persP").val() + '",';
    if ($("#StipoResPersP").val() != "") datos += ' "tipo_residencia":"' + $("#StipoResPersP").val() + '",';
    if ($("#SEtniasPersP").val() != "") datos += ' "etnias":"' + $("#SEtniasPersP").val() + '",';
    if ($("#numRes_persP").val() != "") datos += ' "numero_residencia":"' + $("#numRes_persP").val() + '",';
    if ($("#SEstCivilPersP").val() != "") datos += ' "estado_civil":"' + $("#SEstCivilPersP option:selected").attr("valor") + '",';
    if ($("#SpaisPersP").val() != "") datos += ' "pais_nacimiento_id":"' + $('#SpaisPersP').val() + '",';
    if ($("#SciudadPersP").val() != "") datos += ' "ciudad_nacimiento_id":"' + $('#SciudadPersP').val() + '",';
    if ($("#fechaNac_persP").val() != "") datos += ' "fecha_nacimiento":"' + $("#fechaNac_persP").val() + '",';
    if ($("#StipoSangrePersP").val() != "") datos += ' "tipo_sangre":"' + $("#StipoSangrePersP option:selected").attr("valor") + '",';
    if ($("#SnivelPersP").val() != "") datos += ' "nivel_escolaridad":"' + $("#SnivelPersP option:selected").attr("valor") + '",';
    if ($("#SgradoPersP").val() != "") datos += ' "grado_academico":"' + $("#SgradoPersP option:selected").attr("valor") + '",';
    if ($("#titulo1PersP").val() != "") datos += ' "formacion_academica":"' + $("#titulo1PersP").val() + '",';
    if ($("#titulo2PersP").val() != "") datos += ' "formacion_academica_opcional":"' + $("#titulo2PersP").val() + '",';
    if ($("#libretaPersP").val() != "") datos += ' "libreta_militar":"' + $("#libretaPersP").val() + '",';
    if ($("#SprovPersP").val() != "") datos += ' "provincia_residencia_id":"' + $('#SprovPersP').val() + '",';
    if ($("#ScantonPersP").val() != "") datos += ' "canton_residencia_id":"' + $('#ScantonPersP').val() + '",';
    if ($("#SparroqPersP").val() != "") datos += ' "parroquia_residencia_id":"' + $('#SparroqPersP').val() + '",';
    if ($("#barrioPersP").val() != "") datos += ' "barrio":"' + $("#barrioPersP").val() + '",';
    if ($("#callepPersP").val() != "") datos += ' "calle_principal":"' + $("#callepPersP").val() + '",';
    if ($("#callesPersP").val() != "") datos += ' "calle_secundaria":"' + $("#callesPersP").val() + '",';
    if ($("#calleRefPersP").val() != "") datos += ' "referencia":"' + $("#calleRefPersP").val() + '",';

    datos = datos.substring(0, datos.length - 1); //se le quita el ultimo caracter ya q puede ser un ,
    datos += '}';

    /*pendiente titulo agregar en la base*/
    id_padre = $('#content_persona').parent().attr('id');

    $("#td_nombre_" + id).html($("#nombres_persP").val());
    $("#td_apellido_" + id).html($("#apellidos_persP").val());
    $("#td_cedula_" + id).html($("#num_cedpersP").val());

    salida = th_update(datos, "personas", id_padre, "perpersona", id);
}

/*funcion para eliminar(cambio de estado en la base de datos)*/
function deletePersonas(id) {
    id_padre = $('#content_persona').parent().attr('id');
    datos = '{"estado":"I","eliminado":"t"}';
    th_delete(datos, "personas", id_padre, "perpersona", id);
}


/*funcioanrios*/
/*funcion para limpiar formulario de ingreso y actualizacion de Funcionario*/
function limpiarFormPersona() {
    clearForm(frm_personas);
    $("#tituloP").html("Crear");
    $('#idfuncionarioP').val("");
    $('#idpersonaP').val("");
    $('#tipotFun').val(0);
    $("#btn_cedulaP").show();
    $("#imgContentFileFot").attr("src", "");
    $("#Sestado_ff").val("A").trigger("change");

}

/*funcion para verificar si se realiza una insercion o una actualizacion*/
/*el valor del if se llena con 0 cuando se da click en el boton nuevo y con 1 cuando se da clik en editar*/
function setInsertUpdateFuncionario(tipo) {
    if ($("#tipotFun").val() == 0)
        insertarTablaFuncionario();
    else
        editTablaFuncionario();
}

/*funcion para asignar los datos del funcionario al formulario*/
/*parametros cedula ---> cedula del usuario*/
function editFuncionario(cedula) {
    console.log("******* editFuncionario *******");

    limpiarFormPersona();
    $("#modalLoadin").show();
    $("#btn_cedulaP").hide();

    $("#tipotFun").val(1);

    $("#tituloP").html("Editar");

    $('.nav-tabs a[href="#tab_general"]').tab('show');
    $('.nav-tabs a[href="#tab_persona"]').tab('show');

    dataP = "persona_id__identificacion__in=" + cedula;

    $.ajax({
        url: "data_funcionarioParam",
        type: "get",
        data: {
            "data": dataP
        },
        dataType: "json",

        success: function(json) {
            $("#modalLoadin").hide();
            if (json['non_field_errors']) {
                console.log(json['non_field_errors']);
            } else {
                if (json.length == 0)
                    return 0;
                $("#idpersonaP").val(json[0].persona_id.id);
                $("#nombrepersonaP").val(json[0].persona_id.nombre_completo);
                $("#idfuncionarioP").val(json[0].id);

                $("#num_cedpers").val(json[0].persona_id.identificacion);
                $("#nombres_pers").val(json[0].persona_id.nombres);
                $("#apellidos_pers").val(json[0].persona_id.apellidos);

                $('#StipoIdPers [valor="' + json[0].persona_id.tipo_identificacion + '"]').prop("selected", true).trigger("change");
                $('#STipoPers [valor="' + json[0].persona_id.tipo_persona + '"]').prop("selected", true).trigger("change");
                $('#SsexoPers [valor="' + json[0].persona_id.sexo + '"]').prop("selected", true).trigger("change");

                $("#telefono_pers").val(json[0].persona_id.telefono_convencional);
                $("#celular_pers").val(json[0].persona_id.telefono_celular);
                $("#email_pers").val(json[0].persona_id.email);

                $("#StipoResPers").val(json[0].persona_id.tipo_residencia).trigger("change");
                $("#numIess_pers").val(json[0].num_iess);
                $("#SEtniasPers").val(json[0].persona_id.etnias).trigger("change");
                console.log(json[0].persona_id.estado_embarazo);
                if (json[0].persona_id.estado_embarazo == true)
                    $("#embarazoPers").prop('checked', true);
                else
                    $("#embarazoPers").prop('checked', false);

                $("#numRes_pers").val(json[0].persona_id.numero_residencia);
                $('#SEstCivilPers [valor="' + json[0].persona_id.estado_civil + '"]').prop("selected", true).trigger("change");
                /*nacimineto*/

                $('#SpaisPers').val(json[0].persona_id.pais_nacimiento_id).trigger("change");
                $('#SciudadPers').val(json[0].persona_id.ciudad_nacimiento_id).trigger("change");
                $("#fechaNac_pers").val(json[0].persona_id.fecha_nacimiento);
                $("#edad_pers").val(calcularEdad(json[0].persona_id.fecha_nacimiento));
                $('#StipoSangrePers [valor="' + json[0].persona_id.tipo_sangre + '"]').prop("selected", true).trigger("change");

                /*escolaridad*/
                $('#SnivelPers [valor="' + json[0].persona_id.nivel_escolaridad + '"]').prop("selected", true).trigger("change");
                $('#SgradoPers [valor="' + json[0].persona_id.grado_academico + '"]').prop("selected", true).trigger("change");

                if (json[0].func_carnet_id != "")
                    $("#imgContentFileFot").attr("src", "static/media/talentohumano/carnetizacion/" + json[0].func_carnet_id[0].foto + "");
                else
                    $("#imgContentFileFot").attr("src", "static/media/talentohumano/carnetizacion/prueba.png");

                if (json[0].rol_profesional == null)
                    $("#SrolProPers").val("").trigger("change");
                if (json[0].rol_profesional == true)
                    $("#SrolProPers").val("t").trigger("change");
                if (json[0].rol_profesional == false)
                    $("#SrolProPers").val("f").trigger("change");

                $("#titulo1Pers").val(json[0].persona_id.formacion_academica);
                $("#titulo2Pers").val(json[0].persona_id.formacion_academica_opcional);
                $("#libretaPers").val(json[0].persona_id.libreta_militar);

                /*direccion domiciliaria*/
                $('#SprovPers').val(json[0].persona_id.provincia_residencia_id).trigger("change");
                $('#ScantonPers').val(json[0].persona_id.canton_residencia_id).trigger("change");
                $('#SparroqPers').val(json[0].persona_id.parroquia_residencia_id).trigger("change");

                $("#barrioPers").val(json[0].persona_id.barrio);
                $("#callepPers").val(json[0].persona_id.calle_principal);
                $("#callesPers").val(json[0].persona_id.calle_secundaria);
                $("#calleRefPers").val(json[0].persona_id.referencia);

                if (json[0].modalidad_laboral_id != null) $("#SmodalidadPer").val(json[0].modalidad_laboral_id.id).trigger("change");
                $("#numPartIPer").val(json[0].partida_individual);
                $("#numPartGPer").val(json[0].partida_general);

                // DIRECCION
                if (json[0].direccion_estatuto_id != null)
                    $("#SsitdireSA_ff").val(json[0].direccion_estatuto_id.id).trigger("change");
                else
                    $("#direccionPer").val("");

                // PROCESO
                if (json[0].proceso_estatuto_id != null)
                    $("#SsitprocSA_ff").val(json[0].proceso_estatuto_id.id).trigger("change");
                else
                    $("#SsitprocSA_ff").val("");

                // SUBPROCESO
                if (json[0].subproceso_estatuto_id != null)
                    $("#SsitsubprocSA_ff").val(json[0].subproceso_estatuto_id.id).trigger("change");
                else
                    $("#SsitsubprocSA_ff").val("");

                // CARGO OCUPACIONAL
                if (json[0].cargo_ocupacional_id != null)
                    $("#SsitgrupoSA_ff").val(json[0].cargo_ocupacional_id.id).trigger("change");
                else
                    $("#SsitgrupoSA_ff").val("");

                // CARGO DISTRIBUTIVO
                if (json[0].cargo_distributivo_id != null)
                    $("#SsitpuestDistSA_ff").val(json[0].cargo_distributivo_id.id).trigger("change");
                else
                    $("#SsitpuestDistSA_ff").val("");

                // CARGO INSTITUCIONAL
                if (json[0].cargo_institucional_id != null)
                    $("#SsitpuestInst_ff").val(json[0].cargo_institucional_id.id).trigger("change");
                else
                    $("#SsitpuestInst_ff").val("");

                // ISLA TRABAJA
                if (json[0].isla_trabaja_id != null)
                    $("#SsitislaSA_ff").val(json[0].isla_trabaja_id.id).trigger("change");
                else
                    $("#SsitislaSA_ff").val("");

                // RMU
                $("#SsRmu_ff").val(json[0].rmu);
                $("#SsfechaIng_ff").val(json[0].fecha_ingreso_png);
                $("#Sestado_ff").val(json[0].estado).trigger("change");
                $("#telinstPer").val(json[0].telefono_institucional);
                $("#extTelPer").val(json[0].extension_telefonica);
                $("#emailPer").val(json[0].email);
                $("#anioNomPer").val(json[0].anio_nombramiento);
                if (json[0].base_nombramiento_id != null) $("#SbaseLegalPer").val(json[0].base_nombramiento_id.id).trigger("change");
                else $("#SbaseLegalPer").val("").trigger("change");

                /*enfermedades*/
                $("#SdiscapacidadPers").val(json[0].tipo_discapacidad).trigger("change");
                $("#carnetDisPer").val(json[0].num_carnet_discapacidad);
                $("#gradoDisPer").val(json[0].grado_discapacidad);

                $("#StipoEnfPers option:selected").val();
                $('#StipoEnfPers [valor="' + json[0].tipo_enfemedad + '"]').prop("selected", true).trigger("change");
                $("#SdescEnfPers").val(json[0].descripcion_enfermedad_id).trigger("change");

            }
        },
        error: function(json) {
            $("#modalLoadin").hide();
            swal("", "Error: " + JSON.stringify(json), "error");
            console.log(JSON.stringify(json));
            //console.log( JSON.stringify(data));
        },
    });
    //pendientes
    //foto
    //firma
}


/*funcion para editar en la base de datos*/
/*el id se lo guarda en un campo oculto al momento de dar clik en editar*/
function editTablaFuncionario() {

    idFuncionario = $("#idfuncionarioP").val();
    idpersona = $("#idpersonaP").val();

    datosF = '{';
    datosF += ' "anio_nombramiento":"' + $("#anioNomPer").val() + '",';
    datosF += ' "telefono_institucional":"' + $("#telinstPer").val() + '",';
    datosF += ' "extension_telefonica":"' + $("#extTelPer").val() + '",';
    datosF += ' "email":"' + $("#emailPer").val() + '",';
    datosF += ' "modalidad_laboral_id":"' + $("#SmodalidadPer").val() + '",';
    datosF += ' "partida_individual":"' + $("#numPartIPer").val() + '",';
    datosF += ' "partida_general":"' + $("#numPartGPer").val() + '",';

    datosF += ' "direccion_estatuto_id":"' + $("#SsitdireSA_ff").val() + '",';
    datosF += ' "proceso_estatuto_id":"' + $("#SsitprocSA_ff").val() + '",';
    datosF += ' "subproceso_estatuto_id":"' + $("#SsitsubprocSA_ff").val() + '",';
    datosF += ' "cargo_ocupacional_id":"' + $("#SsitgrupoSA_ff").val() + '",';
    datosF += ' "cargo_distributivo_id":"' + $("#SsitpuestDistSA_ff").val() + '",';
    datosF += ' "cargo_institucional_id":"' + $("#SsitpuestInst_ff").val() + '",';
    datosF += ' "isla_trabaja_id":"' + $("#SsitislaSA_ff").val() + '",';
    datosF += ' "num_iess":"' + $("#numIess_pers").val() + '",';
    datosF += ' "fecha_ingreso_png":"' + $("#SsfechaIng_ff").val() + '",';
    datosF += ' "estado":"' + $("#Sestado_ff").val() + '",';

    rmu = $("#SsRmu_ff");

    if ((rmu === "") || (rmu === null))
        datosF += ' "rmu": null,';
    else
        datosF += ' "rmu":"' + $("#SsRmu_ff").val() + '",';

    tipo_disc = $("#SdiscapacidadPers").val()

    if ((tipo_disc === "") || (tipo_disc === null))
        datosF += ' "tipo_discapacidad":null,';
    else
        datosF += ' "tipo_discapacidad":"' + tipo_disc + '",';

    datosF += ' "num_carnet_discapacidad":"' + $("#carnetDisPer").val() + '",';
    datosF += ' "grado_discapacidad":"' + $("#gradoDisPer").val() + '",';

    if (($("#StipoEnfPers").val() === "") || ($("#StipoEnfPers").val() === null))
        datosF += ' "tipo_enfemedad":null,';
    else
        datosF += ' "tipo_enfemedad":"' + $("#StipoEnfPers option:selected").attr("valor") + '",';

    if (($("#SdescEnfPers").val() === "") || ($("#SdescEnfPers").val() === null))
        datosF += ' "descripcion_enfermedad_id":null,';
    else
        datosF += ' "descripcion_enfermedad_id":"' + $("#SdescEnfPers").val() + '",';

    if (($("#SbaseLegalPer").val() === "") || ($("#SbaseLegalPer").val() === null))
        datosF += ' "base_nombramiento_id":null,';
    else
        datosF += ' "base_nombramiento_id":"' + $("#SbaseLegalPer").val() + '",';

    if (($("#SrolProPers").val() == "") || ($("#SrolProPers").val() === null)) datosF += ' "rol_profesional":null,';
    else datosF += ' "rol_profesional":"' + $("#SrolProPers").val() + '",';


    datosF = datosF.substring(0, datosF.length - 1);

    datosF += '}';

    datosF = datosF.replace(/\"\"/g, null);

    datosP = '{';
    datosP += ' "nombre_completo":"' + $("#apellidos_pers").val() + ' ' + $("#nombres_pers").val() + '",';
    datosP += ' "identificacion":"' + $("#num_cedpers").val() + '",';
    datosP += ' "nombres":"' + $("#nombres_pers").val() + '",';
    datosP += ' "apellidos":"' + $("#apellidos_pers").val() + '",';

    if (($("#tipo_persona").val() === "") || ($("#tipo_persona").val() === null))
        datosP += ' "tipo_persona":null,';
    else
        datosP += ' "tipo_persona":"' + $("#STipoPers option:selected").attr("valor") + '",';

    if (($("#StipoIdPers").val() == "") || ($("#StipoIdPers").val() === null)) datosP += ' "tipo_identificacion":null,';
    else datosP += ' "tipo_identificacion":"' + $("#StipoIdPers option:selected").attr("valor") + '",';
    if (($("#SsexoPers").val() == "") || ($("#SsexoPers").val() === null)) datosP += ' "sexo":null,';
    else datosP += ' "sexo":"' + $("#SsexoPers option:selected").attr("valor") + '",';
    if (($("#StipoResPers").val() == "") || ($("#StipoResPers").val() === null)) datosP += ' "tipo_residencia":null,';
    else datosP += ' "tipo_residencia":"' + $("#StipoResPers").val() + '",';
    if (($("#SEtniasPers").val() == "") || ($("#SEtniasPers").val() === null)) datosP += ' "etnias":null,';
    else datosP += ' "etnias":"' + $("#SEtniasPers").val() + '",';
    if (($("#SEstCivilPers").val() == "") || ($("#SEstCivilPers").val() === null)) datosP += ' "estado_civil":null,';
    else datosP += ' "estado_civil":"' + $("#SEstCivilPers option:selected").attr("valor") + '",';
    if (($("#SpaisPers").val() == "") || ($("#SpaisPers").val() === null)) datosP += ' "pais_nacimiento_id":null,';
    else datosP += ' "pais_nacimiento_id":"' + $('#SpaisPers').val() + '",';
    if (($("#SciudadPers").val() == "") || ($("#SciudadPers").val() === null)) datosP += ' "ciudad_nacimiento_id":null,';
    else datosP += ' "ciudad_nacimiento_id":"' + $('#SciudadPers').val() + '",';
    if (($("#StipoSangrePers").val() == "") || ($("#StipoSangrePers").val() === null)) datosP += ' "tipo_sangre":null,';
    else datosP += ' "tipo_sangre":"' + $("#StipoSangrePers option:selected").attr("valor") + '",';
    if (($("#SnivelPers").val() == "") || ($("#SnivelPers").val() === null)) datosP += ' "nivel_escolaridad":null,';
    else datosP += ' "nivel_escolaridad":"' + $("#SnivelPers option:selected").attr("valor") + '",';

    if (($("#SgradoPers").val() == "") || ($("#SgradoPers").val() === null)) datosP += ' "grado_academico":null,';
    else datosP += ' "grado_academico":"' + $("#SgradoPers option:selected").attr("valor") + '",';
    if (($("#SprovPers").val() == "") || ($("#SprovPers").val() === null)) datosP += ' "provincia_residencia_id":null,';
    else datosP += ' "provincia_residencia_id":"' + $('#SprovPers').val() + '",';
    if (($("#ScantonPers").val() == "") || ($("#ScantonPers").val() === null)) datosP += ' "canton_residencia_id":null,';
    else datosP += ' "canton_residencia_id":"' + $('#ScantonPers').val() + '",';
    if (($("#SparroqPers").val() == "") || ($("#SparroqPers").val() === null)) datosP += ' "parroquia_residencia_id":null,';
    else datosP += ' "parroquia_residencia_id":"' + $('#SparroqPers').val() + '",';

    datosP += ' "telefono_convencional":"' + $("#telefono_pers").val() + '",';
    datosP += ' "telefono_celular":"' + $("#celular_pers").val() + '",';
    datosP += ' "email":"' + $("#email_pers").val() + '",';
    // datosP+=' "num_iess":"'+$("#numIess_pers").val()+'",';
    datosP += ' "numero_residencia":"' + $("#numRes_pers").val() + '",';
    console.log($("#fechaNac_pers").val() + "****");
    if (($("#fechaNac_pers").val() === "") || ($("#fechaNac_pers").val() === null)) datosP += ' "fecha_nacimiento":null,';
    else datosP += ' "fecha_nacimiento":"' + $("#fechaNac_pers").val() + '",';
    //datosP+=' "fecha_nacimiento":"'+$("#fechaNac_pers").val()+'",';
    datosP += ' "formacion_academica":"' + $("#titulo1Pers").val() + '",';
    datosP += ' "formacion_academica_opcional":"' + $("#titulo2Pers").val() + '",';
    datosP += ' "libreta_militar":"' + $("#libretaPers").val() + '",';
    datosP += ' "barrio":"' + $("#barrioPers").val() + '",';
    datosP += ' "calle_principal":"' + $("#callepPers").val() + '",';
    datosP += ' "calle_secundaria":"' + $("#callesPers").val() + '",';
    datosP += ' "referencia":"' + $("#calleRefPers").val() + '",';

    estado_embarazo = $('#embarazoPers').prop('checked');
    if (estado_embarazo)
        embarazo = 't';
    else
        embarazo = 'f';

    datosP += ' "estado_embarazo":"' + embarazo + '",';

    datosP += ' "perfuncionario":[' + datosF + ']';
    datosP += '}';

    /*pendiente titulo2 agregar en la base*/
    id_padre = $('#content_funcionario').parent().attr('id');
    datosP = datosP.replace(/\"\"/g, null);
    salida = th_update(datosP, "SP_funcionarios", id_padre, "perpersonafuncionario", idpersona)

    $("#td_nombre_" + id).html($("#nombres_persP").val());
    $("#td_apellido_" + id).html($("#apellidos_persP").val());
    $("#td_cedula_" + id).html($("#num_cedpersP").val());
}

/*funcion para insertar en la base de datos*/
function insertarTablaFuncionario() {

    idFuncionario = $("#idfuncionarioP").val();
    idpersona = $("#idpersonaP").val();
    datosF = '{';
    datosF += ' "anio_nombramiento":"' + $("#anioNomPer").val() + '",';
    datosF += ' "telefono_institucional":"' + $("#telinstPer").val() + '",';
    datosF += ' "extension_telefonica":"' + $("#extTelPer").val() + '",';
    datosF += ' "modalidad_laboral_id":"' + $("#SmodalidadPer").val() + '",';
    datosF += ' "partida_individual":"' + $("#numPartIPer").val() + '",';
    datosF += ' "partida_general":"' + $("#numPartGPer").val() + '",';

    datosF += ' "direccion_estatuto_id":"' + $("#SsitdireSA_ff").val() + '",';
    datosF += ' "proceso_estatuto_id":"' + $("#SsitprocSA_ff").val() + '",';
    datosF += ' "subproceso_estatuto_id":"' + $("#SsitsubprocSA_ff").val() + '",';
    datosF += ' "cargo_ocupacional_id":"' + $("#SsitgrupoSA_ff").val() + '",';
    datosF += ' "cargo_distributivo_id":"' + $("#SsitpuestDistSA_ff").val() + '",';
    datosF += ' "cargo_institucional_id":"' + $("#SsitpuestInst_ff").val() + '",';
    datosF += ' "isla_trabaja_id":"' + $("#SsitislaSA_ff").val() + '",';
    datosF += ' "num_iess":"' + $("#numIess_pers").val() + '",';
    datosF += ' "rmu":' + $("#SsRmu_ff").val() + ',';
    datosF += ' "fecha_ingreso_png":"' + $("#SsfechaIng_ff").val() + '",';
    datosF += ' "estado":"' + $("#Sestado_ff").val() + '",';

    if (($("#SdiscapacidadPers").val() === "") || ($("#SdiscapacidadPers").val() === null)) datosF += '';
    else datosF += ' "tipo_discapacidad":"' + $("#SdiscapacidadPers").val() + '",';
    if ($("#carnetDisPer").val() != "") datosF += ' "num_carnet_discapacidad":"' + $("#carnetDisPer").val() + '",';
    if ($("#gradoDisPer").val() != "") datosF += ' "grado_discapacidad":"' + $("#gradoDisPer").val() + '",';
    if ($("#StipoEnfPers").val() != "") datosF += ' "tipo_enfemedad":"' + $("#StipoEnfPers option:selected").attr("valor") + '",';
    if ($("#SdescEnfPers").val() != "") datosF += ' "descripcion_enfermedad_id":"' + $("#SdescEnfPers").val() + '",';

    if ($("#SbaseLegalPer").val() === "") datosF += ' "base_nombramiento_id":"' + $("#SbaseLegalPer").val() + '",';
    if ($("#SrolProPers").val() != "") datosF += ' "rol_profesional":"' + $("#SrolProPers").val() + '",';


    if ((idFuncionario == "") && (idpersona != ""))
        datosF += ' "persona_id":"' + idpersona + '",';

    datosF += ' "email":"' + $("#emailPer").val() + '"';
    datosF += '}';

    datosP = '{';
    datosP += ' "nombre_completo":"' + $("#apellidos_pers").val() + ' ' + $("#nombres_pers").val() + '",';
    datosP += ' "identificacion":"' + $("#num_cedpers").val() + '",';
    datosP += ' "nombres":"' + $("#nombres_pers").val() + '",';

    if ($("#StipoIdPers").val() != "") datosP += ' "tipo_identificacion":"' + $("#StipoIdPers option:selected").attr("valor") + '",';
    if ($("#tipo_persona").val() != "") datosP += ' "tipo_persona":"' + $("#STipoPers option:selected").attr("valor") + '",';
    if ($("#SsexoPers").val() != "") datosP += ' "sexo":"' + $("#SsexoPers option:selected").attr("valor") + '",';
    if ($("#telefono_pers").val() != "") datosP += ' "telefono_convencional":"' + $("#telefono_pers").val() + '",';
    if ($("#celular_pers").val() != "") datosP += ' "telefono_celular":"' + $("#celular_pers").val() + '",';
    if ($("#StipoResPers").val() != "") datosP += ' "tipo_residencia":"' + $("#StipoResPers").val() + '",';
    if ($("#email_pers").val() != "") datosP += ' "email":"' + $("#email_pers").val() + '",';

    //if($("#numIess_pers").val()!="")  datosP+=' "num_iess":"'+$("#numIess_pers").val()+'",';
    if ($("#SEtniasPers").val() != "") datosP += ' "etnias":"' + $("#SEtniasPers").val() + '",';
    if ($("#numRes_pers").val() != "") datosP += ' "numero_residencia":"' + $("#numRes_pers").val() + '",';
    if ($("#SEstCivilPers").val() != "") datosP += ' "estado_civil":"' + $("#SEstCivilPers option:selected").attr("valor") + '",';
    if ($("#SpaisPers").val() != "") datosP += ' "pais_nacimiento_id":"' + $('#SpaisPers').val() + '",';
    if ($("#SciudadPers").val() != "") datosP += ' "ciudad_nacimiento_id":"' + $('#SciudadPers').val() + '",';

    if (($("#fechaNac_pers").val() === "") || ($("#fechaNac_pers").val() === null)) datosP += ' "fecha_nacimiento":null,';
    else datosP += ' "fecha_nacimiento":"' + $("#fechaNac_pers").val() + '",';
    if ($("#StipoSangrePers").val() != "") datosP += ' "tipo_sangre":"' + $("#StipoSangrePers option:selected").attr("valor") + '",';
    if ($("#SnivelPers").val() != "") datosP += ' "nivel_escolaridad":"' + $("#SnivelPers option:selected").attr("valor") + '",';
    if ($("#SgradoPers").val() != "") datosP += ' "grado_academico":"' + $("#SgradoPers option:selected").attr("valor") + '",';
    if ($("#titulo1Pers").val() != "") datosP += ' "formacion_academica":"' + $("#titulo1Pers").val() + '",';
    if ($("#titulo2Pers").val() != "") datosP += ' "formacion_academica_opcional":"' + $("#titulo2Pers").val() + '",';
    if ($("#libretaPers").val() != "") datosP += ' "libreta_militar":"' + $("#libretaPers").val() + '",';
    if ($("#SprovPers").val() != "") datosP += ' "provincia_residencia_id":"' + $('#SprovPers').val() + '",';
    if ($("#ScantonPers").val() != "") datosP += ' "canton_residencia_id":"' + $('#ScantonPers').val() + '",';
    if ($("#SparroqPers").val() != "") datosP += ' "parroquia_residencia_id":"' + $('#SparroqPers').val() + '",';
    if ($("#barrioPers").val() != "") datosP += ' "barrio":"' + $("#barrioPers").val() + '",';
    if ($("#callepPers").val() != "") datosP += ' "calle_principal":"' + $("#callepPers").val() + '",';
    if ($("#callesPers").val() != "") datosP += ' "calle_secundaria":"' + $("#callesPers").val() + '",';
    if ($("#calleRefPers").val() != "") datosP += ' "referencia":"' + $("#calleRefPers").val() + '",';

    estado_embarazo = $('#embarazoPers').prop('checked');
    if (estado_embarazo)
        embarazo = 't';
    else
        embarazo = 'f';

    datosP += ' "estado_embarazo":"' + embarazo + '",';

    if ((idFuncionario == "") && (idpersona == ""))
        datosP += ' "perfuncionario":[' + datosF + '],';

    datosP += ' "apellidos":"' + $("#apellidos_pers").val() + '"';
    datosP += '}';

    /*pendiente titulo agregar en la base*/
    id_padre = $('#content_funcionario').parent().attr('id');

    if ((idFuncionario == "") && (idpersona == "")) {
        th_insert(datosP, "SP_funcionarios", id_padre, "perpersonafuncionario")
    } else {

        salida = th_update(datosP, "SP_funcionarios", id_padre, "perpersona", idpersona)
        th_insert(datosF, "SP_funcionarios", id_padre, "perfuncionario");
    }

}

/*funcion para eliminar(cambio de estado en la base de datos)*/
function deleteFuncionario(id) {
    id_padre = $('#content_funcionario').parent().attr('id');
    datos = '{"estado":"I","eliminado":"t"}';
    th_delete(datos, "SP_funcionarios", id_padre, "perfuncionario", id);
}


/*fn funcionario*/

/*funcion para limpiar formulario de ingreso y actualizacion de PersonaCuenta*/
function limpiarFormPersonaCuenta() {
    clearForm(frm_cuentaBancP);
    console.log(111);
    //$('#idfuncionarioP').val();
    id_persona = $('#idpersonaP').val();
    nombre_persona = $('#nombrepersonaP').val();
    iniciarCombo('SbancoP', 'f', 'bancos');

    $('#funcionarioBancidP').val(id_persona);
    $('#funcionarioBancP').val(nombre_persona);
    $('#tipot_bancFun').val(0);
    $('#SestadoBancP').val("A").trigger("change");
}


/*fin personas*/


/*cuenta bancaria*/
/*funcion para limpiar formulario de ingreso y actualizacion de CuentaBanco*/
function limpiarFormCuentaBanco() {
    formulario = $("#cont_form_cuenta").val();
    $(".bodypopupGeneral").attr('id', 'bodyaddCuenta');
    $("#content_body").html("");
    $("#content_body").append(formulario);
    $("#stackbox_save").attr('onClick', 'setInsertUpdateCuentaBanc();');

    $("#tituloPopup").html("Registrar Cuenta Bancaria");
    $('#id').val();
    $('#tipot_banc').val(0);
    clearForm(frm_cuentaBanc);
    iniciarCombo('Sbanco', 'f', 'bancos');
    $("#SestadoBanc").val("A").trigger("change");
}

/*funcion para verificar si se realiza una insercion o una actualizacion*/
/*el valor del if se llena con 0 cuando se da click en el boton nuevo y con 1 cuando se da clik en editar*/
function setInsertUpdateCuentaBanc() {
    //console.log(11);
    valida = validaContenedor("addCuenta");
    if (valida) {
        if ($("#tipot_banc").val() == 0)
            insertarTablaCuentaBanco();
        else
            saveEditCuentaBanco();
    }
}

/*funcion para asignar los datos de cuenta bancaria al formulario*/
/*parametros id ---> id tabla*/
function editCuentaBanco(id) {
    formulario = $("#cont_form_cuenta").val();
    $(".bodypopupGeneral").attr('id', 'bodyaddCuenta');
    $("#content_body").html("");
    $("#content_body").append(formulario);
    $("#stackbox_save").attr('onClick', 'setInsertUpdateCuentaBanc();');

    $("#tipot_banc").val(1);
    $("#tituloPopup").html("Editar Cuenta Bancaria");
    $("#idcuentabanc").val(id);

    iniciarCombo('Sbanco', 'f', 'bancos');

    id_persona = $("#td_nombre_" + id).attr("persona_id");
    nombre_persona = $("#td_nombre_" + id).attr("persona_nombre");

    id_banco = $("#td_banco_" + id).attr("banco_id");

    tipo_cuenta = $("#td_tipo_cuenta_" + id).html();
    estado = $("#td_estado_" + id).html();

    if (estado = 'ACTIVO')
        estado_aux = 'A';
    else
        estado_aux = 'I';

    num_cuenta = $("#td_numero_cuenta_" + id).html();

    //$("#SpersonaBanco").val(id_persona).trigger("change");
    $("#funcionarioBancid").val(id_persona);
    $("#funcionarioBanc").val(nombre_persona);
    $("#Sbanco").val(id_banco).trigger("change");
    $("#Stipo_cuenta").val(tipo_cuenta).trigger("change");
    $("#SestadoBanc").val(estado_aux).trigger("change");

    $("#numero_cuenta").val(num_cuenta);
}

/*funcion para insertar en la base de datos*/
function insertarTablaCuentaBanco() {
    id_persona = $('#funcionarioBancid').val(); //idpersona
    id_banco = $('#Sbanco').val();
    tipo_cuenta = $('#Stipo_cuenta').val();
    numero_cuenta = $('#numero_cuenta').val();
    estado = $('#SestadoBanc').val();

    id_padre = $('#content_cuentaBanc').parent().attr('id');
    datos = '{"persona_id":"' + id_persona + '", "banco_id":"' + id_banco + '", "tipo_cuenta":"' + tipo_cuenta + '", "numero_cuenta":"' + numero_cuenta + '"}';
    th_insert(datos, "cuentaBan", id_padre, "perpersonacuenta");
}

/*funcion para editar en la base de datos*/
/*el id se lo guarda en un campo oculto al momento de dar clik en editar*/
function saveEditCuentaBanco() {

    id_persona = $('#funcionarioBancid').val();
    id_banco = $('#Sbanco').val();
    tipo_cuenta = $('#Stipo_cuenta').val();
    numero_cuenta = $('#numero_cuenta').val();
    estado = $('#SestadoBanc').val();

    id = $("#idcuentabanc").val();

    id_padre = $('#content_cuentaBanc').parent().attr('id');

    datos = '{"persona_id":"' + id_persona + '", "banco_id":"' + id_banco + '", "tipo_cuenta":"' + tipo_cuenta + '", "numero_cuenta":"' + numero_cuenta + '", "estado":"' + estado + '"}';

    $("#td_nombre_" + id).html($('#funcionarioBanc').val());
    $("#td_banco_" + id).html($("#Sbanco option:selected").text());
    $("#td_tipo_cuenta_" + id).html($("#Stipo_cuenta option:selected").text());
    $("#td_numero_cuenta_" + id).html($("#numero_cuenta").val());
    $("#td_estado_" + id).html($("#SestadoBanc").val());

    $("#td_nombre_" + id).attr("persona_id", $("#funcionarioBancid").val());
    $("#td_banco_" + id).attr("banco_id", $("#Sbanco").val());

    salida = th_update(datos, "cuentaBan", id_padre, "perpersonacuenta", id);
}

/*funcion para eliminar(cambio de estado en la base de datos)*/
function deleteCuentaBanco(id) {
    id_padre = $('#content_cuentaBanc').parent().attr('id');
    datos = '{"estado":"I","eliminado":"t"}';
    salida = th_delete(datos, "cuentaBan", id_padre, "perpersonacuenta", id);
}

/*fin bancos*/

/*accidentes*/

/*funcion para limpiar formulario de ingreso y actualizacion de Accidentes*/
function limpiarFormAccidentes() {
    formulario = $("#cont_form_acc").val();
    $(".bodypopupGeneral").attr('id', 'bodyaddAccidente');
    $("#content_body").html("");
    $("#content_body").append(formulario);
    $("#stackbox_save").attr('onClick', 'setInsertUpdateAccidentes();');

    $("#tituloPopup").html("Registrar Accidente");
    $('#idaccidente').val();
    $('#tipot_acc').val(0);
    clearForm(frm_accidente);
    iniciarCombo('Stipo_acc', 'ACCIDENTES_TIPO', 'catalogos');
    $("#SestadoAcc").val("A").trigger("change");
}

/*funcion para verificar si se realiza una insercion o una actualizacion*/
/*el valor del if se llena con 0 cuando se da click en el boton nuevo y con 1 cuando se da clik en editar*/
function setInsertUpdateAccidentes() {
    valida = validaContenedor("addAccidente");

    if (valida) {
        if ($("#tipot_acc").val() == 0)
            insertarTablaAccidentes();
        else
            saveEditAccidentes();
    }
}

/*funcion para asignar los datos al formulario*/
/*parametros id ---> id tabla*/
function editAccidentes(id) {
    formulario = $("#cont_form_acc").val();
    $(".bodypopupGeneral").attr('id', 'bodyaddAccidente');
    $("#content_body").html("");
    $("#content_body").append(formulario);
    $("#stackbox_save").attr('onClick', 'setInsertUpdateAccidentes();');

    $("#tipot_acc").val(1);
    $("#tituloPopup").html("Editar Accidente");
    $("#idaccidente").val(id);

    iniciarCombo('Stipo_acc', 'ACCIDENTES_TIPO', 'catalogos');

    id_cat = $("#td_tipo_" + id).attr("id_cat");
    estado = $("#td_estado_" + id).html();
    descripcion = $("#td_desc_" + id).html();
    observacion = $("#td_observacion_" + id).val();

    $("#desc_acc").val(descripcion);
    $("#Stipo_acc").val(id_cat).trigger("change");
    $("#SestadoAcc").val(estado).trigger("change");
    $("#Observacion").val(observacion);

}

/*funcion para insertar en la base de datos*/
function insertarTablaAccidentes() {
    tipo_acc = $('#Stipo_acc').val();
    desc_acc = $('#desc_acc').val();
    estado = $('#SestadoAcc').val();
    observacion = $('#Observacion').val();

    id_padre = $('#content_accidentes').parent().attr('id');
    datos = '{"descripcion":"' + desc_acc + '", "categoria_id":"' + tipo_acc + '", "observaciones":"' + observacion + '"}';
    th_insert(datos, "accidentes", id_padre, "peraccidentes")
}

/*funcion para editar en la base de datos*/
/*el id se lo guarda en un campo oculto al momento de dar clik en editar*/
function saveEditAccidentes() {

    tipo_acc = $('#Stipo_acc').val();
    desc_acc = $('#desc_acc').val();
    estado = $('#SestadoAcc').val();
    observacion = $('#Observacion').val();

    id = $("#idaccidente").val();

    id_padre = $('#content_accidentes').parent().attr('id');

    datos = '{"descripcion":"' + desc_acc + '", "categoria_id":"' + tipo_acc + '", "observaciones":"' + observacion + '", "estado":"' + estado + '"}';

    $("#td_tipo_" + id).html($("#Stipo_acc option:selected").text());
    $("#td_desc_" + id).html(desc_acc);
    $("#td_estado_" + id).html($("#SestadoAcc").val());
    $("#td_observacion_" + id).val($("#Observacion").val());

    $("#td_tipo_" + id).attr("id_cat", $("#Stipo_acc").val());

    salida = th_update(datos, "accidentes", id_padre, "peraccidentes", id);
}

/*funcion para eliminar(cambio de estado en la base de datos)*/
function deleteAccidentes(id) {
    id_padre = $('#content_accidentes').parent().attr('id');
    datos = '{"estado":"I","eliminado":"t"}';
    th_delete(datos, "accidentes", id_padre, "peraccidentes", id);
}


/*Enfermedades*/

/*funcion para limpiar formulario de ingreso y actualizacion de Enfermedad*/
function limpiarFormEnfermedad() {
    formulario = $("#cont_form_enfer").val();
    $(".bodypopupGeneral").attr('id', 'bodyaddEnfermedad');
    $("#content_body").html("");
    $("#content_body").append(formulario);
    $("#stackbox_save").attr('onClick', 'setInsertUpdateEnfermedad();');

    $("#tituloPopup").html("Registrar Enfermedad");
    $('#idenfermedad').val();
    $('#tipot_enf').val(0);
    clearForm(frm_enfermedad);
    iniciarCombo('Scategoria', 'ENFERMEDADES', 'catalogos');
    iniciarCombo('Stipo_enf', 'GRADO_ENFERMEDAD', 'catalogos');
    $("#SestadoEnf").val("A").trigger("change");
}

/*funcion para verificar si se realiza una insercion o una actualizacion*/
/*el valor del if se llena con 0 cuando se da click en el boton nuevo y con 1 cuando se da clik en editar*/
function setInsertUpdateEnfermedad() {
    valida = validaContenedor("addEnfermedad");

    if (valida) {
        if ($("#tipot_enf").val() == 0)
            insertarTablaEnfermedad();
        else
            saveEditEnfermedad();
    }
}

/*funcion para asignar los datos al formulario*/
/*parametros id ---> id tabla*/
function editEnfermedad(id) {
    formulario = $("#cont_form_enfer").val();
    $(".bodypopupGeneral").attr('id', 'bodyaddEnfermedad');
    $("#content_body").html("");
    $("#content_body").append(formulario);
    $("#stackbox_save").attr('onClick', 'setInsertUpdateEnfermedad();');

    $("#tipot_enf").val(1);
    $("#tituloPopup").html("Editar Enfermedad");
    $("#idenfermedad").val(id);

    iniciarCombo('Scategoria', 'ENFERMEDADES', 'catalogos');
    iniciarCombo('Stipo_enf', 'GRADO_ENFERMEDAD', 'catalogos');

    id_cat = $("#td_cat_" + id).attr("id_cat");
    id_tipo = $("#td_tipo_" + id).attr("id_tipo");
    estado = $("#td_estado_" + id).html();
    descripcion = $("#td_desc_" + id).html();
    observacion = $("#td_observacion_" + id).val();

    $("#desc_enf").val(descripcion);
    $("#Scategoria").val(id_cat).trigger("change");
    $("#Stipo_enf").val(id_tipo).trigger("change");
    $("#SestadoEnf").val(estado).trigger("change");
    $("#Observacion_enf").val(observacion);

}

/*funcion para insertar en la base de datos*/
function insertarTablaEnfermedad() {
    categoria = $('#Scategoria').val();
    tipo_enf = $('#Stipo_enf').val();
    desc_enf = $('#desc_enf').val();
    observacion = $('#Observacion_enf').val();

    id_padre = $('#content_enfermedad').parent().attr('id');
    datos = '{"descripcion":"' + desc_enf + '", "categoria_id":"' + categoria + '", "tipo_id":"' + tipo_enf + '", "observaciones":"' + observacion + '"}';
    th_insert(datos, "enfermedades", id_padre, "perenfermedades")
}

/*funcion para editar en la base de datos*/
/*el id se lo guarda en un campo oculto al momento de dar clik en editar*/
function saveEditEnfermedad() {

    categoria = $('#Scategoria').val();
    tipo_enf = $('#Stipo_enf').val();
    desc_enf = $('#desc_enf').val();
    estado = $('#SestadoEnf').val();
    observacion = $('#Observacion_enf').val();

    id = $("#idenfermedad").val();

    id_padre = $('#content_enfermedad').parent().attr('id');

    datos = '{"descripcion":"' + desc_enf + '", "categoria_id":"' + categoria + '", "tipo_id":"' + tipo_enf + '", "observaciones":"' + observacion + '", "estado":"' + estado + '"}';

    $("#td_cat_" + id).html($("#Scategoria option:selected").text());
    $("#td_tipo_" + id).html($("#Stipo_enf option:selected").text());
    $("#td_desc_" + id).html(desc_enf);
    $("#td_estado_" + id).html($("#SestadoEnf").val());

    $("#td_tipo_" + id).attr("id_tipo", $("#Stipo_enf").val());
    $("#td_cat_" + id).attr("id_cat", $("#Scategoria").val());
    $("#td_observacion_" + id).val($("#Observacion_enf").val());


    salida = th_update(datos, "enfermedades", id_padre, "perenfermedades", id);
}

/*funcion para eliminar(cambio de estado en la base de datos)*/
function deleteEnfermedad(id) {
    id_padre = $('#content_enfermedad').parent().attr('id');
    datos = '{"estado":"I","eliminado":"t"}';
    th_delete(datos, "enfermedades", id_padre, "perenfermedades", id);
}


/*discapacidades*/

/*funcion para limpiar formulario de ingreso y actualizacion de Discapacidad*/
function limpiarFormDiscapacidad() {
    formulario = $("#cont_form_disc").val();
    $(".bodypopupGeneral").attr('id', 'bodyaddDiscapacidad');
    $("#content_body").html("");
    $("#content_body").append(formulario);
    $("#stackbox_save").attr('onClick', 'setInsertUpdateDiscapacidad();');

    $("#tituloPopup").html("Registrar Discapacidad");
    $('#iddiscapacidad').val();
    $('#tipot_disc').val(0);
    clearForm(frm_discapacidad);
    $("#SestadoDisc").val("A").trigger("change");
}

/*funcion para verificar si se realiza una insercion o una actualizacion*/
/*el valor del if se llena con 0 cuando se da click en el boton nuevo y con 1 cuando se da clik en editar*/
function setInsertUpdateDiscapacidad() {
    valida = validaContenedor("addDiscapacidad");
    if (valida) {
        if ($("#tipot_disc").val() == 0)
            insertarTablaDiscapacidad();
        else
            saveEditDiscapacidad();
    }
}

/*funcion para asignar los datos al formulario*/
/*parametros id ---> id tabla*/
function editDiscapacidad(id) {
    formulario = $("#cont_form_disc").val();
    $(".bodypopupGeneral").attr('id', 'bodyaddDiscapacidad');
    $("#content_body").html("");
    $("#content_body").append(formulario);
    $("#stackbox_save").attr('onClick', 'setInsertUpdateDiscapacidad();');

    $("#tipot_disc").val(1);
    $("#tituloPopup").html("Editar Discapacidad");
    $("#iddiscapacidad").val(id);

    estado = $("#td_estado_" + id).html();
    descripcion = $("#td_desc_" + id).html();
    observacion = $("#td_observacion_" + id).val();

    $("#desc_dis").val(descripcion);
    $("#SestadoDisc").val(estado).trigger("change");
    $("#Observacion_dis").val(observacion);
}

/*funcion para insertar en la base de datos*/
function insertarTablaDiscapacidad() {

    desc_disc = $('#desc_dis').val();
    estado = $('#SestadoDisc').val();
    observacion = $('#Observacion_dis').val();

    id_padre = $('#content_discapacidad').parent().attr('id');
    datos = '{"descripcion":"' + desc_disc + '", "observaciones":"' + observacion + '"}';
    th_insert(datos, "discapacidades", id_padre, "perdiscapacidades")
}

/*funcion para editar en la base de datos*/
/*el id se lo guarda en un campo oculto al momento de dar clik en editar*/
function saveEditDiscapacidad() {

    desc_dis = $('#desc_dis').val();
    estado = $('#SestadoDisc').val();
    observacion = $('#Observacion_dis').val();

    id = $("#iddiscapacidad").val();

    id_padre = $('#content_discapacidad').parent().attr('id');

    datos = '{"descripcion":"' + desc_dis + '", "observaciones":"' + observacion + '", "estado":"' + estado + '"}';

    $("#td_desc_" + id).html(desc_dis);
    $("#td_estado_" + id).html($("#SestadoDisc").val());
    $("#td_observacion_" + id).val($("#Observacion_dis").val());

    salida = th_update(datos, "discapacidades", id_padre, "perdiscapacidades", id);
}

/*funcion para eliminar(cambio de estado en la base de datos)*/
function deleteDiscapacidad(id) {
    id_padre = $('#content_discapacidad').parent().attr('id');
    datos = '{"estado":"I","eliminado":"t"}';
    th_delete(datos, "discapacidades", id_padre, "perdiscapacidades", id);
}


/*cargo distributivo*/

/*funcion para limpiar formulario de ingreso y actualizacion de Distributivo*/
function limpiarFormDistributivo() {
    formulario = $("#cont_form_dist").val();
    $(".bodypopupGeneral").attr('id', 'bodyaddDistributivo');
    $("#content_body").html("");
    $("#content_body").append(formulario);
    $("#stackbox_save").attr('onClick', 'setInsertUpdateDistributivo();');

    $("#tituloDist").html("Registar Distributivo");
    $('#iddistributivo').val();
    $('#tipot_dist').val(0);
    clearForm(frm_distributivo);
    $("#SestadoDist").val("A").trigger("change");
}

/*funcion para verificar si se realiza una insercion o una actualizacion*/
/*el valor del if se llena con 0 cuando se da click en el boton nuevo y con 1 cuando se da clik en editar*/
function setInsertUpdateDistributivo() {
    valida = validaContenedor("addDistributivo");
    if (valida) {
        if ($("#tipot_dist").val() == 0)
            insertarTablaDistributivo();
        else
            saveEditDistributivo();
    }
}

/*funcion para asignar los datos al formulario*/
/*parametros id ---> id tabla*/
function editDistributivo(id) {
    formulario = $("#cont_form_dist").val();
    $(".bodypopupGeneral").attr('id', 'bodyaddDistributivo');
    $("#content_body").html("");
    $("#content_body").append(formulario);
    $("#stackbox_save").attr('onClick', 'setInsertUpdateDistributivo();');

    $("#tipot_dist").val(1);
    $("#tituloPopup").html("Editar Distributivo");
    $("#iddistributivo").val(id);

    estado = $("#td_estado_" + id).html();
    descripcion = $("#td_desc_" + id).html();
    observacion = $("#td_observacion_" + id).val();

    $("#desc_dist").val(descripcion);
    $("#SestadoDist").val(estado).trigger("change");
    $("#Observacion_dist").val(observacion);
}

/*funcion para insertar en la base de datos*/
function insertarTablaDistributivo() {

    desc_disc = $('#desc_dist').val();
    estado = $('#SestadoDist').val();
    observacion = $('#Observacion_dist').val();

    id_padre = $('#content_distributivo').parent().attr('id');
    datos = '{"nombre":"' + desc_disc + '", "observaciones":"' + observacion + '"}';
    th_insert(datos, "distributivo", id_padre, "gthcargodistributivo")
}

/*funcion para editar en la base de datos*/
/*el id se lo guarda en un campo oculto al momento de dar clik en editar*/
function saveEditDistributivo() {

    desc_dis = $('#desc_dist').val();
    estado = $('#SestadoDist').val();
    observacion = $('#Observacion_dist').val();

    id = $("#iddistributivo").val();

    id_padre = $('#content_distributivo').parent().attr('id');

    datos = '{"nombre":"' + desc_dis + '", "estado":"' + estado + '", "observaciones":"' + observacion + '"}';

    $("#td_desc_" + id).html(desc_dis);
    $("#td_estado_" + id).html($("#SestadoDist").val());
    $("#td_observacion_" + id).val($("#Observacion_dist").val());

    salida = th_update(datos, "distributivo", id_padre, "gthcargodistributivo", id);
}

/*funcion para eliminar(cambio de estado en la base de datos)*/
function deleteDistributivo(id) {
    id_padre = $('#content_distributivo').parent().attr('id');
    datos = '{"estado":"I","eliminado":"t"}';
    th_delete(datos, "distributivo", id_padre, "gthcargodistributivo", id);
}


/*cargo funcional*/

/*funcion para limpiar formulario de ingreso y actualizacion de Funcional*/
function limpiarFormFuncional() {
    formulario = $("#cont_form_func").val();
    $(".bodypopupGeneral").attr('id', 'bodyaddFuncional');
    $("#content_body").html("");
    $("#content_body").append(formulario);
    $("#stackbox_save").attr('onClick', 'setInsertUpdateFuncional();');

    $("#tituloPopup").html("Registrar Cargo funcional");
    $('#idfuncional').val();
    $('#tipot_func').val(0);
    clearForm(frm_funcional);
    $('#SestadoFunc').val("A").trigger("change");
}

/*funcion para verificar si se realiza una insercion o una actualizacion*/
/*el valor del if se llena con 0 cuando se da click en el boton nuevo y con 1 cuando se da clik en editar*/
function setInsertUpdateFuncional() {
    valida = validaContenedor("addFuncional");
    if (valida) {
        if ($("#tipot_func").val() == 0)
            insertarTablaFuncional();
        else
            saveEditFuncional();
    }
}

/*funcion para asignar los datos al formulario*/
/*parametros id ---> id tabla*/
function editFuncional(id) {
    formulario = $("#cont_form_func").val();
    $(".bodypopupGeneral").attr('id', 'bodyaddFuncional');
    $("#content_body").html("");
    $("#content_body").append(formulario);
    $("#stackbox_save").attr('onClick', 'setInsertUpdateFuncional();');

    $("#tipot_func").val(1);
    $("#tituloPopup").html("Editar Cargo funcional");
    $("#idfuncional").val(id);

    estado = $("#td_estado_" + id).html();
    descripcion = $("#td_desc_" + id).html();
    observacion = $("#td_observacion_" + id).val();
    identificador = $("#td_iden_" + id).html();

    $("#desc_func").val(descripcion);
    $('#identificador').val(identificador);
    $("#SestadoFunc").val(estado).trigger("change");
    $("#observacion_func").val(observacion);
}

/*funcion para insertar en la base de datos*/
function insertarTablaFuncional() {

    desc_func = $('#desc_func').val();
    identificador = $('#identificador').val();
    estado = $('#SestadoFunc').val();
    observacion = $('#observacion_func').val();

    id_padre = $('#content_funcional').parent().attr('id');
    datos = '{"nombre":"' + desc_func + '", "identificador":"' + identificador + '", "observaciones":"' + observacion + '"}';
    th_insert(datos, "funcional", id_padre, "gthcargofuncional")
}

/*funcion para editar en la base de datos*/
/*el id se lo guarda en un campo oculto al momento de dar clik en editar*/
function saveEditFuncional() {

    desc_dis = $('#desc_func').val();
    estado = $('#SestadoFunc').val();
    observacion = $('#observacion_func').val();
    identificador = $("#identificador").val();

    id = $("#idfuncional").val();

    id_padre = $('#content_funcional').parent().attr('id');

    datos = '{"nombre":"' + desc_dis + '", "identificador":"' + identificador + '", "observaciones":"' + observacion + '", "estado":"' + estado + '"}';

    $("#td_desc_" + id).html(desc_dis);
    $("#td_estado_" + id).html($("#SestadoFunc").val());
    $("#td_iden_" + id).html(identificador);
    $("#td_observacion_" + id).val($("#observacion_func").val());

    salida = th_update(datos, "funcional", id_padre, "gthcargofuncional", id);
}

/*funcion para eliminar(cambio de estado en la base de datos)*/
function deleteFuncional(id) {
    id_padre = $('#content_funcional').parent().attr('id');
    datos = '{"estado":"I","eliminado":"t"}';
    th_delete(datos, "funcional", id_padre, "gthcargofuncional", id);
}


/*cargo institucional*/

/*funcion para limpiar formulario de ingreso y actualizacion de Institucional*/
function limpiarFormInstitucional() {
    formulario = $("#cont_form_inst").val();
    $(".bodypopupGeneral").attr('id', 'bodyaddInstitucional');
    $("#content_body").html("");
    $("#content_body").append(formulario);
    $("#stackbox_save").attr('onClick', 'setInsertUpdateInstitucional();');

    $("#tituloPopup").html("Registar Cargo Institucional");
    $('#idinstitucional').val();
    $('#tipot_inst').val(0);
    clearForm(frm_institucional);
    $("#SestadoInst").val("A").trigger("change");
}

/*funcion para verificar si se realiza una insercion o una actualizacion*/
/*el valor del if se llena con 0 cuando se da click en el boton nuevo y con 1 cuando se da clik en editar*/
function setInsertUpdateInstitucional() {
    valida = validaContenedor("addInstitucional");
    if (valida) {
        if ($("#tipot_inst").val() == 0)
            insertarTablaInstitucional();
        else
            saveEditInstitucional();
    }
}

/*funcion para asignar los datos al formulario*/
/*parametros id ---> id tabla*/
function editInstitucional(id) {
    formulario = $("#cont_form_inst").val();
    $(".bodypopupGeneral").attr('id', 'bodyaddInstitucional');
    $("#content_body").html("");
    $("#content_body").append(formulario);
    $("#stackbox_save").attr('onClick', 'setInsertUpdateInstitucional();');

    $("#tipot_inst").val(1);
    $("#tituloPopup").html("Editar Cargo Institucional");
    $("#idinstitucional").val(id);

    estado = $("#td_estado_" + id).html();
    descripcion = $("#td_desc_" + id).html();
    observacion = $("#td_observacion_" + id).val();

    $("#desc_inst").val(descripcion);
    $("#SestadoInst").val(estado).trigger("change");
    $("#observacion_inst").val(observacion);
}

/*funcion para insertar en la base de datos*/
function insertarTablaInstitucional() {

    desc_func = $('#desc_inst').val();
    estado = $('#SestadoInst').val();
    observacion = $('#observacion_inst').val();

    id_padre = $('#content_institucional').parent().attr('id');
    datos = '{"nombre":"' + desc_func + '", "observaciones":"' + observacion + '"}';
    th_insert(datos, "institucional", id_padre, "gthcargoinstitucional")
}

/*funcion para editar en la base de datos*/
/*el id se lo guarda en un campo oculto al momento de dar clik en editar*/
function saveEditInstitucional() {

    desc_dis = $('#desc_inst').val();
    estado = $('#SestadoInst').val();
    observacion = $('#observacion_inst').val();

    id = $("#idinstitucional").val();

    id_padre = $('#content_institucional').parent().attr('id');

    datos = '{"nombre":"' + desc_dis + '", "observaciones":"' + observacion + '", "estado":"' + estado + '"}';

    $("#td_desc_" + id).html(desc_dis);
    $("#td_estado_" + id).html($("#SestadoInst").val());
    $("#td_observacion_" + id).val($("#observacion_inst").val());

    salida = th_update(datos, "institucional", id_padre, "gthcargoinstitucional", id);
}

/*funcion para eliminar(cambio de estado en la base de datos)*/
function deleteInstitucional(id) {
    id_padre = $('#content_institucional').parent().attr('id');
    datos = '{"estado":"I","eliminado":"t"}';
    th_delete(datos, "institucional", id_padre, "gthcargoinstitucional", id);
}


/*cargo ocupacional*/

/*funcion para limpiar formulario de ingreso y actualizacion de Ocupacional*/
function limpiarFormOcupacional() {
    formulario = $("#cont_form_ocup").val();
    $(".bodypopupGeneral").attr('id', 'bodyaddOcupacional');
    $("#content_body").html("");
    $("#content_body").append(formulario);
    $("#stackbox_save").attr('onClick', 'setInsertUpdateOcupacional();');

    $("#tituloPopup").html("Registrar Cargo Ocupacional");
    $('#idocupacional').val();
    $('#tipot_ocup').val(0);
    clearForm(frm_ocupacional);
    $("#SestadoOcup").val("A").trigger("change");
}

/*funcion para verificar si se realiza una insercion o una actualizacion*/
/*el valor del if se llena con 0 cuando se da click en el boton nuevo y con 1 cuando se da clik en editar*/
function setInsertUpdateOcupacional() {
    valida = validaContenedor("addOcupacional");
    if (valida) {
        if ($("#tipot_ocup").val() == 0)
            insertarTablaOcupacional();
        else
            saveEditOcupacional();
    }
}

/*funcion para asignar los datos al formulario*/
/*parametros id ---> id tabla*/
function editOcupacional(id) {
    formulario = $("#cont_form_ocup").val();
    $(".bodypopupGeneral").attr('id', 'bodyaddOcupacional');
    $("#content_body").html("");
    $("#content_body").append(formulario);
    $("#stackbox_save").attr('onClick', 'setInsertUpdateOcupacional();');

    $("#tipot_ocup").val(1);
    $("#tituloPopup").html("Editar Cargo Ocupacional");
    $("#idocupacional").val(id);

    estado = $("#td_estado_" + id).html();
    descripcion = $("#td_desc_" + id).html();
    observacion = $("#td_observacion_" + id).val();
    nombre_corto = $("#td_ncorto_" + id).html();

    $('#ncorto_ocup').val(nombre_corto);
    $("#desc_ocup").val(descripcion);
    $("#SestadoOcup").val(estado).trigger("change");
    $("#observacion_ocup").val(observacion);
}

/*funcion para insertar en la base de datos*/
function insertarTablaOcupacional() {

    desc_func = $('#desc_ocup').val();
    nombre_corto = $('#ncorto_ocup').val();
    estado = $('#SestadoOcup').val();
    observacion = $('#observacion_ocup').val();

    id_padre = $('#content_ocupacional').parent().attr('id');
    datos = '{"nombre":"' + desc_func + '","nombre_corto":"' + nombre_corto + '", "observaciones":"' + observacion + '"}';
    th_insert(datos, "ocupacional", id_padre, "gthcargoocupacional")
}

/*funcion para editar en la base de datos*/
/*el id se lo guarda en un campo oculto al momento de dar clik en editar*/
function saveEditOcupacional() {

    desc_dis = $('#desc_ocup').val();
    nombre_corto = $('#ncorto_ocup').val();
    estado = $('#SestadoOcup').val();
    observacion = $('#observacion_ocup').val();

    id = $("#idocupacional").val();

    id_padre = $('#content_ocupacional').parent().attr('id');

    datos = '{"nombre":"' + desc_dis + '", "nombre_corto":"' + nombre_corto + '", "observaciones":"' + observacion + '", "estado":"' + estado + '"}';

    $("#td_desc_" + id).html(desc_dis);
    $("#td_estado_" + id).html($("#SestadoOcup").val());
    $("#td_ncorto_" + id).html(nombre_corto);
    $("#td_observacion_" + id).val($("#observacion_ocup").val());

    salida = th_update(datos, "ocupacional", id_padre, "gthcargoocupacional", id);
}

/*funcion para eliminar(cambio de estado en la base de datos)*/
function deleteOcupacional(id) {
    id_padre = $('#content_ocupacional').parent().attr('id');
    datos = '{"estado":"I","eliminado":"t"}';
    th_delete(datos, "ocupacional", id_padre, "gthcargoocupacional", id);
}

//otros 
//rol laboral

/*funcion para limpiar formulario de ingreso y actualizacion de Rol*/
function limpiarFormRol() {

    formulario = $("#cont_form_rol").val();

    $(".bodypopupGeneral").attr('id', 'bodyaddRolLaboral');
    $("#tituloPopup").html("Registrar Rol Laboral");
    $("#content_body").html("");
    $("#content_body").append(formulario);

    $("#stackbox_save").attr('onClick', 'setInsertUpdateRol();');

    $('#idrollaboral').val();
    $('#tipot_rol').val(0);
    clearForm(frm_rol_laboral[0]);
    $("#SestadoRol").val("A").trigger("change");
}

/*funcion para verificar si se realiza una insercion o una actualizacion*/
/*el valor del if se llena con 0 cuando se da click en el boton nuevo y con 1 cuando se da clik en editar*/
function setInsertUpdateRol() {
    valida = validaContenedor("addRolLaboral");
    if (valida) {
        if ($("#tipot_rol").val() == 0)
            insertarTablaRol();
        else
            saveEditRol();
    }
}

/*funcion para asignar los datos al formulario*/
/*parametros id ---> id tabla*/
function editRol(id) {

    formulario = $("#cont_form_rol").val();
    $(".bodypopupGeneral").attr('id', 'bodyaddRolLaboral');
    $("#tituloPopup").html("Editar Rol Laboral");
    $("#content_body").html("");
    $("#content_body").append(formulario);
    $("#stackbox_save").attr('onClick', 'setInsertUpdateRol();');

    $("#tipot_rol").val(1);

    $("#idrollaboral").val(id);

    estado = $("#td_estado_" + id).html();
    descripcion = $("#td_desc_" + id).html();
    observacion = $("#td_observacion_" + id).val();

    $("#desc_rol").val(descripcion);
    $("#SestadoRol").val(estado).trigger("change");
    $("#observacion_rol").val(observacion);

}

/*funcion para insertar en la base de datos*/
function insertarTablaRol() {

    desc_func = $('#desc_rol').val();
    estado = $('#SestadoRol').val();
    observacion = $('#observacion_rol').val();

    id_padre = $('#content_rol_laboral').parent().attr('id');
    datos = '{"descripcion":"' + desc_func + '", "observaciones":"' + observacion + '"}';
    th_insert(datos, "rol_laboral", id_padre, "gthrollaboral")
}

/*funcion para editar en la base de datos*/
/*el id se lo guarda en un campo oculto al momento de dar clik en editar*/
function saveEditRol() {

    desc_dis = $('#desc_rol').val();
    estado = $('#SestadoRol').val();
    observacion = $('#observacion_rol').val();

    id = $("#idrollaboral").val();

    id_padre = $('#content_rol_laboral').parent().attr('id');

    datos = '{"descripcion":"' + desc_dis + '", "observaciones":"' + observacion + '", "estado":"' + estado + '"}';

    $("#td_desc_" + id).html(desc_dis);
    $("#td_estado_" + id).html($("#SestadoRol").val());
    $("#td_observacion_" + id).val($("#observacion_rol").val());

    salida = th_update(datos, "rol_laboral", id_padre, "gthrollaboral", id);
}

/*funcion para eliminar(cambio de estado en la base de datos)*/
function deleteRollaboral(id) {
    id_padre = $('#content_rol_laboral').parent().attr('id');
    datos = '{"estado":"I","eliminado":"t"}';
    th_delete(datos, "rol_laboral", id_padre, "gthrollaboral", id);
}

//comision
/*funcion para limpiar formulario de ingreso y actualizacion de Comision*/
function limpiarFormComision() {

    formulario = $("#cont_form_comi").val();
    $(".bodypopupGeneral").attr('id', 'bodyaddComision');
    $("#content_body").html("");
    $("#content_body").append(formulario);
    $("#stackbox_save").attr('onClick', 'setInsertUpdateComision();');

    $("#tituloPopup").html("Registrar Comision");
    $('#idcomision').val();
    $('#tipot_comi').val(0);
    clearForm(frm_comision);
    $("#SestadoComi").val("A").trigger("change");
}

/*funcion para verificar si se realiza una insercion o una actualizacion*/
/*el valor del if se llena con 0 cuando se da click en el boton nuevo y con 1 cuando se da clik en editar*/
function setInsertUpdateComision() {
    valida = validaContenedor("addComision");
    if (valida) {
        if ($("#tipot_comi").val() == 0)
            insertarTablaComision();
        else
            saveEditComision();
    }
}

/*funcion para asignar los datos al formulario*/
/*parametros id ---> id tabla*/
function editComision(id) {
    formulario = $("#cont_form_comi").val();
    $(".bodypopupGeneral").attr('id', 'bodyaddComision');
    $("#content_body").html("");
    $("#content_body").append(formulario);
    $("#stackbox_save").attr('onClick', 'setInsertUpdateComision();');

    $("#tipot_comi").val(1);
    $("#tituloPopup").html("Editar Comision");
    $("#idcomision").val(id);

    estado = $("#td_estado_" + id).html();
    descripcion = $("#td_desc_" + id).html();
    remuneracion = $("#td_remu_" + id).html();
    observacion = $("#td_observacion_" + id).val();

    if (remuneracion == 'SI')
        valRemu = 1;
    else
        valRemu = 0;

    $("#desc_comi").val(descripcion);
    //$("#SConRemu").val(valRemu).attr('selected','selected');
    $("#SConRemu").val(valRemu).trigger("change");
    //$("#SestadoComi").val(estado).attr('selected','selected');
    $("#SestadoComi").val(estado).trigger("change");
    $("#observacion_comi").val(observacion);
}

/*funcion para insertar en la base de datos*/
function insertarTablaComision() {

    desc_func = $('#desc_comi').val();
    remuneracion = $('#SConRemu').val();
    estado = $('#SestadoComi').val();
    observacion = $('#observacion_comi').val();

    id_padre = $('#content_comision').parent().attr('id');
    datos = '{"descripcion":"' + desc_func + '", "con_remuneracion":"' + remuneracion + '", "observaciones":"' + observacion + '", "accion_id":"220d4e36-2e2c-4885-bd33-5e6e75f35896", "tipo":"O"}';
    th_insert(datos, "comision", id_padre, "gthaccionpersonal")
}

/*funcion para editar en la base de datos*/
/*el id se lo guarda en un campo oculto al momento de dar clik en editar*/
function saveEditComision() {

    desc_dis = $('#desc_comi').val();
    remuneracion = $('#SConRemu').val();
    estado = $('#SestadoComi').val();
    observacion = $('#observacion_comi').val();

    id = $("#idcomision").val();

    id_padre = $('#content_comision').parent().attr('id');

    datos = '{"descripcion":"' + desc_dis + '", "con_remuneracion":"' + remuneracion + '", "observaciones":"' + observacion + '", "estado":"' + estado + '" , "accion_id":"220d4e36-2e2c-4885-bd33-5e6e75f35896"}';

    if (remuneracion == "1")
        valRemu = "SI";
    else
        valRemu = "NO";


    $("#td_desc_" + id).html(desc_dis);
    $("#td_remu_" + id).html(valRemu);
    $("#td_estado_" + id).html($("#SestadoComi").val());
    $("#td_observacion_" + id).val($("#observacion_comi").val());

    salida = th_update(datos, "comision", id_padre, "gthaccionpersonal", id);

}

/*funcion para eliminar(cambio de estado en la base de datos)*/
function deleteComisiones(id) {
    id_padre = $('#content_comision').parent().attr('id');
    datos = '{"estado":"I","eliminado":"t","accion_id":"220d4e36-2e2c-4885-bd33-5e6e75f35896"}';
    th_delete(datos, "comision", id_padre, "gthaccionpersonal", id);
}

//etnias
/*funcion para limpiar formulario de ingreso y actualizacion de Etnias*/
function limpiarFormEtnias() {
    formulario = $("#cont_form_etnia").val();
    $(".bodypopupGeneral").attr('id', 'bodyaddEtnias');
    $("#content_body").html("");
    $("#content_body").append(formulario);
    $("#stackbox_save").attr('onClick', 'setInsertUpdateEtnia();');

    $("#tituloPopup").html("Registar Etnia");
    $('#idetnia').val();
    $('#tipot_etnia').val(0);
    clearForm(frm_etnias);
    $("#SestadoEtnia").val("A").trigger("change");
}

/*funcion para verificar si se realiza una insercion o una actualizacion*/
/*el valor del if se llena con 0 cuando se da click en el boton nuevo y con 1 cuando se da clik en editar*/
function setInsertUpdateEtnia() {
    valida = validaContenedor("addEtnias");

    if (valida) {
        if ($("#tipot_etnia").val() == 0)
            insertarTablaEtnia();
        else
            saveEditEtnia();
    }
}

/*funcion para asignar los datos al formulario*/
/*parametros id ---> id tabla*/
function editEtnia(id) {
    formulario = $("#cont_form_etnia").val();
    $(".bodypopupGeneral").attr('id', 'bodyaddEtnias');
    $("#content_body").html("");
    $("#content_body").append(formulario);
    $("#stackbox_save").attr('onClick', 'setInsertUpdateEtnia();');

    $("#tipot_etnia").val(1);
    $("#tituloPopup").html("Editar Etnia");
    $("#idetnia").val(id);

    estado = $("#td_estado_" + id).html();
    descripcion = $("#td_desc_" + id).html();
    observacion = $("#td_observacion_" + id).val();

    $("#desc_etnia").val(descripcion);
    $("#SestadoEtnia").val(estado).trigger("change");
    $("#observacion_etnia").val(observacion);
}

/*funcion para insertar en la base de datos*/
function insertarTablaEtnia() {
    desc_func = $('#desc_etnia').val();
    estado = $('#SestadoEtnia').val();
    observacion = $('#observacion_etnia').val();

    id_padre = $('#content_etnias').parent().attr('id');
    datos = '{"descripcion":"' + desc_func + '", "observaciones":"' + observacion + '"}';
    th_insert(datos, "etnias", id_padre, "peretnias")
}

/*funcion para editar en la base de datos*/
/*el id se lo guarda en un campo oculto al momento de dar clik en editar*/
function saveEditEtnia() {

    desc_dis = $('#desc_etnia').val();
    estado = $('#SestadoEtnia').val();
    observacion = $('#observacion_etnia').val();

    id = $("#idetnia").val();

    id_padre = $('#content_etnias').parent().attr('id');

    datos = '{"descripcion":"' + desc_dis + '", "observaciones":"' + observacion + '", "estado":"' + estado + '"}';

    $("#td_desc_" + id).html(desc_dis);
    $("#td_estado_" + id).html($("#SestadoEtnia").val());
    $("#td_observacion_" + id).val($("#observacion_etnia").val());

    salida = th_update(datos, "etnias", id_padre, "peretnias", id);
}

/*funcion para eliminar(cambio de estado en la base de datos)*/
function deleteEtnias(id) {
    id_padre = $('#content_etnias').parent().attr('id');
    datos = '{"estado":"I","eliminado":"t"}';
    th_delete(datos, "etnias", id_padre, "peretnias", id);
}


//licencias

/*funcion para limpiar formulario de ingreso y actualizacion de Licencia*/
function limpiarFormLicencia() {
    formulario = $("#cont_form_licen").val();
    $(".bodypopupGeneral").attr('id', 'bodyaddLicencia');
    $("#content_body").html("");
    $("#content_body").append(formulario);
    $("#stackbox_save").attr('onClick', 'setInsertUpdateLicencia();');

    $("#tituloPopup").html("Registar Licencia");
    $('#idlicencia').val();
    $('#tipot_lice').val(0);
    clearForm(frm_licencia);
}

/*funcion para verificar si se realiza una insercion o una actualizacion*/
/*el valor del if se llena con 0 cuando se da click en el boton nuevo y con 1 cuando se da clik en editar*/
function setInsertUpdateLicencia() {
    valida = validaContenedor("addLicencia");

    if (valida) {
        if ($("#tipot_lice").val() == 0)
            insertarTablaLicencia();
        else
            saveEditLicencia();
    }
}

/*funcion para asignar los datos al formulario*/
/*parametros id ---> id tabla*/
function editLicencia(id) {
    formulario = $("#cont_form_licen").val();
    $(".bodypopupGeneral").attr('id', 'bodyaddLicencia');
    $("#content_body").html("");
    $("#content_body").append(formulario);
    $("#stackbox_save").attr('onClick', 'setInsertUpdateLicencia();');

    $("#tipot_lice").val(1);
    $("#tituloPopup").html("Editar Licencia");
    $("#idlicencia").val(id);

    estado = $("#td_estado_" + id).html();
    descripcion = $("#td_desc_" + id).html();
    remuneracion = $("#td_remu_" + id).html();
    observacion = $("#td_observacion_" + id).val();

    if (remuneracion == 'SI')
        valRemu = 1;
    else
        valRemu = 0;

    $("#desc_lice").val(descripcion);
    $("#SConRemuLice").val(valRemu).trigger("change");
    $("#SestadoLice").val(estado).trigger("change");
    $("#observacion_Lice").val(observacion);
}

/*funcion para insertar en la base de datos*/
function insertarTablaLicencia() {
    desc_func = $('#desc_lice').val();
    remuneracion = $('#SConRemuLice').val();
    estado = $('#SestadoLice').val();
    observacion = $('#observacion_Lice').val();
    accion = $('#accion_Lice').val();

    id_padre = $('#content_licencia').parent().attr('id');
    datos = '{"descripcion":"' + desc_func + '", "con_remuneracion":"' + remuneracion + '", "observaciones":"' + observacion + '", "accion_id":"1a7c2e1d-bd87-4f49-ba2b-2f9bf0788f0b", "tipo":"O"}';
    th_insert(datos, "licencias", id_padre, "gthaccionpersonal")
}

/*funcion para editar en la base de datos*/
/*el id se lo guarda en un campo oculto al momento de dar clik en editar*/
function saveEditLicencia() {

    desc_dis = $('#desc_lice').val();
    remuneracion = $('#SConRemuLice').val();
    estado = $('#SestadoLice').val();
    observacion = $('#observacion_Lice').val();

    id = $("#idlicencia").val();

    id_padre = $('#content_licencia').parent().attr('id');

    datos = '{"descripcion":"' + desc_dis + '", "con_remuneracion":"' + remuneracion + '", "observaciones":"' + observacion + '", "accion_id":"1a7c2e1d-bd87-4f49-ba2b-2f9bf0788f0b", "estado":"' + estado + '"}';

    if ($("#SConRemu").val() == 1)
        valRemu = "SI";
    else
        valRemu = "NO";

    $("#td_desc_" + id).html(desc_dis);
    $("#td_remu_" + id).html(valRemu);
    $("#td_estado_" + id).html($("#SestadoLice").val());
    $("#td_observacion_" + id).val($("#observacion_Lice").val());

    salida = th_update(datos, "licencias", id_padre, "gthaccionpersonal", id);
}

/*funcion para eliminar(cambio de estado en la base de datos)*/
function deleteLicencias(id) {
    id_padre = $('#content_licencia').parent().attr('id');
    datos = '{"estado":"I","eliminado":"t","accion_id":"1a7c2e1d-bd87-4f49-ba2b-2f9bf0788f0b"}';
    th_delete(datos, "licencias", id_padre, "gthaccionpersonal", id);
}

//modalidad

/*funcion para limpiar formulario de ingreso y actualizacion de Modalidad*/
function limpiarFormModalidad() {
    formulario = $("#cont_form_moda").val();
    $(".bodypopupGeneral").attr('id', 'bodyaddModalidad');
    $("#content_body").html("");
    $("#content_body").append(formulario);
    $("#stackbox_save").attr('onClick', 'setInsertUpdateModalidad();');

    $("#tituloPopup").html("Registrar Modalidad Laboral");
    $('#idmodalidad').val();
    $('#tipot_moda').val(0);
    clearForm(frm_modalidad);
    $("#SestadoModa").val("A").trigger("change");
}

/*funcion para verificar si se realiza una insercion o una actualizacion*/
/*el valor del if se llena con 0 cuando se da click en el boton nuevo y con 1 cuando se da clik en editar*/
function setInsertUpdateModalidad() {
    valida = validaContenedor("addModalidad");

    if (valida) {
        if ($("#tipot_moda").val() == 0)
            insertarTablaModalidad();
        else
            saveEditModalidad();
    }
}

/*funcion para asignar los datos al formulario*/
/*parametros id ---> id tabla*/
function editModalidad(id) {
    formulario = $("#cont_form_moda").val();
    $(".bodypopupGeneral").attr('id', 'bodyaddModalidad');
    $("#content_body").html("");
    $("#content_body").append(formulario);
    $("#stackbox_save").attr('onClick', 'setInsertUpdateModalidad();');

    $("#tipot_moda").val(1);
    $("#tituloPopup").html("Editar Modalidad Laboral");
    $("#idmodalidad").val(id);

    estado = $("#td_estado_" + id).html();
    descripcion = $("#td_desc_" + id).html();
    observacion = $("#td_observacion_" + id).val();

    $("#desc_moda").val(descripcion);
    $("#SestadoModa").val(estado).trigger("change");
    $("#observacion_moda").val(observacion);
}

/*funcion para insertar en la base de datos*/
function insertarTablaModalidad() {

    desc_func = $('#desc_moda').val();
    estado = $('#SestadoModa').val();
    observacion = $('#observacion_moda').val();

    id_padre = $('#content_modalidad').parent().attr('id');
    /*, "usuario_ingreso":"ADM", "fecha_ingreso":"'+getToday()+'","eliminado":"f"*/
    datos = '{"nombre":"' + desc_func + '", "observaciones":"' + observacion + '"}';
    th_insert(datos, "modalidad", id_padre, "gthmodalidadlaboral")
}

/*funcion para editar en la base de datos*/
/*el id se lo guarda en un campo oculto al momento de dar clik en editar*/
function saveEditModalidad() {
    desc_dis = $('#desc_moda').val();
    estado = $('#SestadoModa').val();
    observacion = $('#observacion_moda').val();

    id = $("#idmodalidad").val();

    id_padre = $('#content_modalidad').parent().attr('id');

    datos = '{"nombre":"' + desc_dis + '", "observaciones":"' + observacion + '", "estado":"' + estado + '"}';


    $("#td_desc_" + id).html(desc_dis);
    $("#td_estado_" + id).html($("#SestadoModa").val());
    $("#td_observacion_" + id).val($("#observacion_moda").val());

    salida = th_update(datos, "modalidad", id_padre, "gthmodalidadlaboral", id);
}

/*funcion para eliminar(cambio de estado en la base de datos)*/
function deleteModalidad(id) {
    id_padre = $('#content_modalidad').parent().attr('id');
    datos = '{"estado":"I","eliminado":"t"}';
    th_delete(datos, "modalidad", id_padre, "gthmodalidadlaboral", id);
}


//regimen

/*funcion para limpiar formulario de ingreso y actualizacion de Regimen*/
function limpiarFormRegimen() {
    formulario = $("#cont_form_regim").val();
    $(".bodypopupGeneral").attr('id', 'bodyaddRegimen');
    $("#content_body").html("");
    $("#content_body").append(formulario);
    $("#stackbox_save").attr('onClick', 'setInsertUpdateRegimen();');

    $("#tituloPopup").html("Registrar Regimen Laboral");
    $('#idregimen').val();
    $('#tipot_reg').val(0);
    clearForm(frm_regimen);
    $("#SestadoReg").val("A").trigger("change");
}

/*funcion para verificar si se realiza una insercion o una actualizacion*/
/*el valor del if se llena con 0 cuando se da click en el boton nuevo y con 1 cuando se da clik en editar*/
function setInsertUpdateRegimen() {
    valida = validaContenedor("addRegimen");

    if (valida) {
        if ($("#tipot_reg").val() == 0)
            insertarTablaRegimen();
        else
            saveEditRegimen();
    }
}

/*funcion para asignar los datos al formulario*/
/*parametros id ---> id tabla*/
function editRegimen(id) {
    formulario = $("#cont_form_regim").val();
    $(".bodypopupGeneral").attr('id', 'bodyaddRegimen');
    $("#content_body").html("");
    $("#content_body").append(formulario);
    $("#stackbox_save").attr('onClick', 'setInsertUpdateRegimen();');


    $("#tipot_reg").val(1);
    $("#tituloPopup").html("Editar Regimen Laboral");
    $("#idregimen").val(id);

    estado = $("#td_estado_" + id).html();
    descripcion = $("#td_desc_" + id).html();
    observacion = $("#td_observacion_" + id).val();

    $("#desc_reg").val(descripcion);
    $("#SestadoReg").val(estado).trigger("change");
    $("#observacion_reg").val(observacion);
}

/*funcion para insertar en la base de datos*/
function insertarTablaRegimen() {

    desc_func = $('#desc_reg').val();
    estado = $('#SestadoReg').val();
    observacion = $('#observacion_reg').val();

    id_padre = $('#content_regimen').parent().attr('id');

    datos = '{"descripcion":"' + desc_func + '", "observaciones":"' + observacion + '"}';
    th_insert(datos, "regimen", id_padre, "gthregimenlaboral")
}

/*funcion para editar en la base de datos*/
/*el id se lo guarda en un campo oculto al momento de dar clik en editar*/
function saveEditRegimen() {
    desc_dis = $('#desc_reg').val();
    estado = $('#SestadoReg').val();
    observacion = $('#observacion_reg').val();

    id = $("#idregimen").val();

    id_padre = $('#content_regimen').parent().attr('id');

    datos = '{"descripcion":"' + desc_dis + '", "observaciones":"' + observacion + '", "estado":"' + estado + '"}';

    $("#td_desc_" + id).html(desc_dis);
    $("#td_estado_" + id).html($("#SestadoReg").val());
    $("#td_observacion_" + id).val($("#observacion_reg").val());

    salida = th_update(datos, "regimen", id_padre, "gthregimenlaboral", id);
}

/*funcion para eliminar(cambio de estado en la base de datos)*/
function deleteRegimen(id) {
    id_padre = $('#content_regimen').parent().attr('id');
    datos = '{"estado":"I","eliminado":"t"}';
    th_delete(datos, "regimen", id_padre, "gthregimenlaboral", id);
}

/*sanciones*/

/*funcion para limpiar formulario de ingreso y actualizacion de Sancion*/
function limpiarFormSancion() {
    formulario = $("#cont_form_sanc").val();
    $(".bodypopupGeneral").attr('id', 'bodyaddSancion');
    $("#content_body").html("");
    $("#content_body").append(formulario);
    $("#stackbox_save").attr('onClick', 'setInsertUpdateSancion();');

    clearForm(frm_sancion);
    $("#tituloPopup").html("Registar Sancion");
    $('#idsancion').val();
    $('#tipot_sanc').val(0);
    iniciarCombo('StipoSan', 'TIPO_FALTA', 'catalogos');
    $("#SestadoSanc").val("A").trigger("change");

}

/*funcion para verificar si se realiza una insercion o una actualizacion*/
/*el valor del if se llena con 0 cuando se da click en el boton nuevo y con 1 cuando se da clik en editar*/
function setInsertUpdateSancion() {
    valida = validaContenedor("addSancion");

    if (valida) {
        if ($("#tipot_sanc").val() == 0)
            insertarTablaSancion();
        else
            saveEditSancion();
    }
}

/*funcion para asignar los datos al formulario*/
/*parametros id ---> id tabla*/
function editSancion(id) {
    formulario = $("#cont_form_sanc").val();
    $(".bodypopupGeneral").attr('id', 'bodyaddSancion');
    $("#content_body").html("");
    $("#content_body").append(formulario);
    $("#stackbox_save").attr('onClick', 'setInsertUpdateSancion();');

    $("#tipot_sanc").val(1);
    $("#tituloPopup").html("Editar Sancion");
    $("#idsancion").val(id);

    iniciarCombo('StipoSan', 'TIPO_FALTA', 'catalogos');

    id_tipo = $("#td_tipo_" + id).attr("id_tipo");
    estado = $("#td_estado_" + id).html();
    descripcion = $("#td_desc_" + id).html();
    observacion = $("#td_observacion_" + id).val();

    $("#desc_sanc").val(descripcion);
    $("#StipoSan").val(id_tipo).trigger("change");
    $("#SestadoSanc").val(estado).trigger("change");
    $("#observacion_sanc").val(observacion);

}

/*funcion para insertar en la base de datos*/
function insertarTablaSancion() {
    tipo_acc = $('#StipoSan').val();
    desc_acc = $('#desc_sanc').val();
    estado = $('#SestadoSanc').val();
    observacion = $('#observacion_sanc').val();

    id_padre = $('#content_sancion').parent().attr('id');
    datos = '{"descripcion":"' + desc_acc + '", "tipo_id":"' + tipo_acc + '", "observaciones":"' + observacion + '"}';
    th_insert(datos, "sanciones", id_padre, "gthsanciones")
}

/*funcion para editar en la base de datos*/
/*el id se lo guarda en un campo oculto al momento de dar clik en editar*/
function saveEditSancion() {

    tipo_acc = $('#StipoSan').val();
    desc_acc = $('#desc_sanc').val();
    estado = $('#SestadoSanc').val();
    observacion = $('#observacion_sanc').val();

    id = $("#idsancion").val();

    id_padre = $('#content_sancion').parent().attr('id');

    datos = '{"descripcion":"' + desc_acc + '", "tipo_id":"' + tipo_acc + '", "observaciones":"' + observacion + '", "estado":"' + estado + '"}';

    $("#td_tipo_" + id).html($("#StipoSan option:selected").text());
    $("#td_desc_" + id).html(desc_acc);
    $("#td_estado_" + id).html($("#SestadoSanc").val());
    $("#td_observacion_" + id).val($("#observacion_sanc").val());

    $("#td_tipo_" + id).attr("id_tipo", $("#StipoSan").val());

    salida = th_update(datos, "sanciones", id_padre, "gthsanciones", id);
}

/*funcion para eliminar(cambio de estado en la base de datos)*/
function deleteSanciones(id) {
    id_padre = $('#content_sancion').parent().attr('id');
    datos = '{"estado":"I","eliminado":"t"}';
    th_delete(datos, "sanciones", id_padre, "gthsanciones", id);
}

/*configuracion accion personal*/

/*funcion para limpiar formulario de ingreso y actualizacion de Accion*/
function limpiarFormAccion() {
    formulario = $("#cont_form_accion").val();
    $(".bodypopupGeneral").attr('id', 'bodyaddAccion');
    $("#content_body").html("");
    $("#content_body").append(formulario);
    $("#stackbox_save").attr('onClick', 'setInsertUpdateAccion();');

    $("#tituloPopup").html("Registrar Accion Personal");
    $('#idaccion').val("");
    $('#tipot_acc').val(0);
    clearForm(frm_accion);
    $("#SestadoAcc").val("A").trigger("change");


}

/*funcion para verificar si se realiza una insercion o una actualizacion*/
/*el valor del if se llena con 0 cuando se da click en el boton nuevo y con 1 cuando se da clik en editar*/
function setInsertUpdateAccion() {
    valida = validaContenedor("addAccion");

    if (valida) {
        if ($("#tipot_acc").val() == 0)
            insertarTablaAccion();
        else
            saveEditAccion();
    }
}

/*funcion para asignar los datos al formulario*/
/*parametros id ---> id tabla*/
function editAccion(id) {
    console.log("****** editAccion *****");
    formulario = $("#cont_form_accion").val();
    $(".bodypopupGeneral").attr('id', 'bodyaddAccion');
    $("#content_body").html("");
    $("#content_body").append(formulario);
    $("#stackbox_save").attr('onClick', 'setInsertUpdateAccion();');
    $("#id_row_general").css("width", "104%");

    $("#tipot_acc").val(1);
    $("#tituloPopup").html("Editar Accion Personal");
    $("#idaccion").val(id);

    if ($("#td_rigehasta_" + id).val() == "True") {
        $('#accp_rige_hasta_si').prop('checked', true);
    } else {
        if ($("#td_rigehasta_" + id).val() == "False") {
            $('#accp_rige_hasta_no').prop('checked', true);
        }
    }

    if ($("#td_posesion_cargo_" + id).val() == "True") {
        $('#accp_posesion_cargo_si').prop('checked', true);
    } else {
        if ($("#td_posesion_cargo_" + id).val() == "False") {
            $('#accp_posesion_cargo_no').prop('checked', true);
        }
    }

    if ($("#td_solo_fechavigencia_" + id).val() == "True") {
        $('#accp_fecha_vigencia_si').prop('checked', true);
    } else {
        if ($("#td_solo_fechavigencia_" + id).val() == "False") {
            $('#accp_fecha_vigencia_no').prop('checked', true);
        }
    }

    tipoAcc = $("#td_tipoAcc_" + id).val();
    tipo = $("#tipoAcc_" + id).val();

    id_tipo = $("#td_tipo_" + id).html();
    estado = $("#td_estado_" + id).html();
    descripcion = $("#td_desc_" + id).html();
    observacion = $("#td_observacion_" + id).val();

    $("#nombre_acc").val(descripcion);
    if (tipo == "P")
        tipoAcc = "1";
    if (tipo == "PO")
        tipoAcc = "2";

    $("#Stipo_acc").val(tipoAcc).trigger("change");
    $("#SestadoAcc").val(estado).trigger("change");
    $("#Observacion_acc").val(observacion);

}

/*funcion para insertar en la base de datos*/
function insertarTablaAccion() {
    console.log("******* insertarTablaAccion *******");

    tipo_acc = $('#Stipo_acc').val();
    desc_acc = $('#nombre_acc').val();
    estado = $('#SestadoAcc').val();
    observacion = $('#Observacion_acc').val();

    accp_rige_hasta = accp_posesion_cargo = accp_fecha_vigencia = ""
    if (valor_nulo_str(document.querySelector('input[name=accp_rige_hasta]:checked')) != "") {
        accp_rige_hasta = document.querySelector('input[name=accp_rige_hasta]:checked').value;
    }
    if (valor_nulo_str(document.querySelector('input[name=accp_posesion_cargo]:checked')) != "") {
        accp_posesion_cargo = document.querySelector('input[name=accp_posesion_cargo]:checked').value;
    }
    if (valor_nulo_str(document.querySelector('input[name=accp_fecha_vigencia]:checked')) != "") {
        accp_fecha_vigencia = document.querySelector('input[name=accp_fecha_vigencia]:checked').value;
    }

    tipo = "O";
    accion_id = '"accion_id":"' + tipo_acc + '",';

    if (tipo_acc == 1) {
        tipo = "P";
        accion_id = "";
    }
    if (tipo_acc == 2) {
        tipo = "PO";
        accion_id = "";
    }

    id_padre = $('#content_accion').parent().attr('id');
    datos = '{"descripcion":"' + desc_acc + '", "tipo":"' + tipo + '", ' + accion_id + ' "observaciones":"' + observacion + '","flag_rige_hasta_pdf": "' + accp_rige_hasta + '","flag_posesion_cargo_pdf":"' + accp_posesion_cargo + '","flag_solo_fechavigencia":"' + accp_fecha_vigencia + '"}';
    datos = datos.replace(/\"\"/g, null);
    th_insert(datos, "accion_personal", id_padre, "gthaccionpersonal");
}

/*funcion para editar en la base de datos*/
/*el id se lo guarda en un campo oculto al momento de dar clik en editar*/
function saveEditAccion() {
    console.log("******** saveEditAccion *********");

    tipo_acc = $('#Stipo_acc').val();
    desc_acc = $('#nombre_acc').val();
    estado = $('#SestadoAcc').val();
    observacion = $('#Observacion_acc').val();

    accp_rige_hasta = accp_posesion_cargo = accp_fecha_vigencia = ""
    if (valor_nulo_str(document.querySelector('input[name=accp_rige_hasta]:checked')) != "") {
        accp_rige_hasta = document.querySelector('input[name=accp_rige_hasta]:checked').value;
    }
    if (valor_nulo_str(document.querySelector('input[name=accp_posesion_cargo]:checked')) != "") {
        accp_posesion_cargo = document.querySelector('input[name=accp_posesion_cargo]:checked').value;
    }
    if (valor_nulo_str(document.querySelector('input[name=accp_fecha_vigencia]:checked')) != "") {
        accp_fecha_vigencia = document.querySelector('input[name=accp_fecha_vigencia]:checked').value;
    }

    accp_rige_hasta = String(accp_rige_hasta).replace('true', 'True');
    accp_rige_hasta = String(accp_rige_hasta).replace('false', 'False');
    accp_posesion_cargo = String(accp_posesion_cargo).replace('true', 'True');
    accp_posesion_cargo = String(accp_posesion_cargo).replace('false', 'False');
    accp_fecha_vigencia = String(accp_fecha_vigencia).replace('true', 'True');
    accp_fecha_vigencia = String(accp_fecha_vigencia).replace('false', 'False');


    tipo = "O";
    accion_id = '"accion_id":"' + tipo_acc + '",';

    if (tipo_acc == 1) {
        tipo = "P";
        accion_id = "";
    }
    if (tipo_acc == 2) {
        tipo = "PO";
        accion_id = "";
    }

    id = $("#idaccion").val();

    id_padre = $('#content_accion').parent().attr('id');

    datos = '{"descripcion":"' + desc_acc + '", "tipo":"' + tipo + '", ' + accion_id + ' "observaciones":"' + observacion + '","flag_rige_hasta_pdf": "' + accp_rige_hasta + '","flag_posesion_cargo_pdf":"' + accp_posesion_cargo + '","flag_solo_fechavigencia":"' + accp_fecha_vigencia + '"}';
    datos = datos.replace(/\"\"/g, null);

    $("#td_tipo_" + id).html($("#Stipo_acc option:selected").text());
    $("#td_desc_" + id).html(desc_acc);
    $("#td_estado_" + id).html($("#SestadoAcc").val());
    $("#td_observacion_" + id).val($("#Observacion_acc").val());
    $("#td_rigehasta_" + id).val(accp_rige_hasta);
    $("#td_posesion_cargo_" + id).val(accp_posesion_cargo);
    $("#td_solo_fechavigencia_" + id).val(accp_fecha_vigencia);

    salida = th_update(datos, "accion_personal", id_padre, "gthaccionpersonal", id);
}

/*funcion para eliminar(cambio de estado en la base de datos)*/
function deleteAccion(id) {
    id_padre = $('#content_accion').parent().attr('id');
    datos = '{"estado":"I","eliminado":"t"}';
    th_delete(datos, "accion_personal", id_padre, "gthaccionpersonal", id);
}

/*accion personal*/

/*funcion para limpiar formulario de ingreso y actualizacion de AccionPersonal*/
function limpiarFormAccionPersonal() {
    $('.nav-tabs a[href="#tab_funcionario"]').tab('show');
    clearForm(frm_accionper);
    $("#tituloAccP").html("Crear");
    $('#idaccPersonal').val("");
    $('#tipot_accP').val(0);
    $('#SitemActivos_descripcion').html("");


    var $el = $('#doc_anexo');
    $el.wrap('<form>').closest('form').get(0).reset();
    $el.unwrap();

    $("#nombreFileAcc").html("");
    $("#imgContentFileAcc").attr("src", "");
    $('#SEstadoAcc [valor="C"]').prop("selected", true).trigger("change");
    $("#SEstado").val("A").trigger("change");
    $("#btn_accPersonal").show();

    $("#SactaAutor").val($("#aut_nominadora_id").val()).trigger("change");
    $("#Sactaresprrhh").val($("#rrhhresps_id").val()).trigger("change");
    $("#SitemAcc").val('7837bf73-175e-41bc-b66b-f10b65b2f056').trigger("change"); //SET DEFAULT 'OTRO'

    var today = moment().format('YYYY-MM-DD');
    document.getElementById("fec_acc_pers").value = today;

    id = uuidv4();
    $("#idaccPersonal").val(id);
}

function accp_ocultar_fecha_hasta() {

}

/*funcion para verificar si se realiza una insercion o una actualizacion*/
/*el valor del if se llena con 0 cuando se da click en el boton nuevo y con 1 cuando se da clik en editar*/
function setInsertUpdateAccionPersonal() { // 0 = insertar, 1 = editar
    valida = validaContenedor("addAccPersonal");
    if (valida) {

        if ($("#accp_bandera_SitProp").val() == 1) {
            validaContenedorExt("addAccPersonal", "El Puesto Propuesto ya esta asignado a el/los funcionario(s)<br>" + dataFun);
            return 0;
        }

        if ($("#tipot_accP").val() == 0)
            insertarTablaAccionPer();
        else
            saveEditAccionPer();
    }
}

/*funcion para editar en la base de datos*/
/*el id se lo guarda en un campo oculto al momento de dar clik en editar*/
function editAccionPer(id, tipoAccion, est_eje, isla_record) { // D = duplicar, E = editar, Isla = Isla de Usuario de Ingreso
    console.log(">> editAccionPer <<");
    limpiarFormAccionPersonal();
    path_archivos_accper = 'static/media/talentohumano/accionpersonal/'+ id + '/';

    isla_trabaja_user_id = $('#accp_isla_trabaja_user_id').val();
    es_responsable = $('#accp_es_responsable').val();
    es_root = $('#accp_es_root').val();

    
    /*
    if (es_root == 'True')
        $("#btn_accPersonal").show();
    else
    if ((est_eje == "P") || (est_eje == "F")) {
        $("#btn_accPersonal").hide();
    } else
    if (es_responsable == 'True')
        $("#btn_accPersonal").show();
    else
    if (isla_record == isla_trabaja_user_id)
        $("#btn_accPersonal").show();
    else
        $("#btn_accPersonal").hide();

    */


    $('.nav-tabs a[href="#tab_funcionario"]').tab('show');
    $("#tituloAccP").html("Editar");
    $("#idaccPersonal").val(id);

    $("#num_diasAccPer").val("");

    var items = JSON.parse(sessionStorage.getItem("catalogos"));
    var data_filter = items.filter(element => element.categoria == "PARTIDA_GENERAL");

    partida = data_filter[0].valor;

    if (tipoAccion == 'E')
        $("#tipot_accP").val(1);
    else {
        $("#tipot_accP").val(0);
        $("#tituloAccP").html("Replicar");
        idnew = uuidv4();
        $("#idaccPersonal").val(idnew);
    }

    $.ajax({
        url: "data_accionPer",
        type: "get",
        cache: 'false',
        data: {
            "data": id
        },
        dataType: "json",
        async: false,

        success: function(json) {
            $("#modalLoadin").hide();
            if (json['error']) {
                if (json['error']['context'])
                    var salida = json['error']['context']['resource'][0].message;
                else
                    var salida = json['error']['message']
            } else {

                $("#funcionaioAcc").val(json[0].funcionario_id.persona_id.nombre_completo);
                $("#funcionaioAccid").val(json[0].funcionario_id.id);
                $("#funcionaioAccced").val(json[0].funcionario_id.persona_id.identificacion);

                $('#SEstadoAcc [valor="' + json[0].estado_ejecucion + '"]').prop("selected", true).trigger("change");
                $("#SEstado").val(json[0].estado).trigger("change");
                $("#SEstado").val(json[0].estado).trigger("change");
                $("#num_acc_pers").val(json[0].num_accion_personal);
                $("#fec_acc_pers").val(json[0].fecha_accionpersonal);
                $("#fec_vigencia").val(json[0].fecha_rige_accpersonal);
                $("#fec_hasta").val(json[0].fecha_hasta_accpersonal);

                $("#num_diasAccPer").val(json[0].num_dias);

                var difM = new Date($("#fec_hasta").val()) - new Date($("#fec_vigencia").val()); // diferencia en milisegundos
                var difD = difM / (1000 * 60 * 60 * 24) // diferencia en dias

                $("#diasLic_accOld").val(difD);
                if(json[0].descripcion_motivo != null)
                    tinymce.get("doc_descripcion").setContent(json[0].descripcion_motivo);
                else
                    tinymce.get("doc_descripcion").setContent("");

                //$("#doc_descripcion").val(json[0].descripcion_motivo);
                $("#num_memoAcc").val(json[0].num_memo);

                if (json[0].accionpersonal_id != null) {
                    $("#SitemAcc").val(json[0].accionpersonal_id.id).trigger("change");
                    if (json[0].accionpersonal_id.id == "cbcbb10d-09af-1755-baba-284501a0e103") {
                        $("#SitemActivos").val(json[0].accion_precedente).trigger("change");
                    }
                } else {
                    $("#SitemAcc").val("").trigger("change");
                }
                if (json[0].accionpersonal_otros != null) {
                    $("#SitemAcc").val("7837bf73-175e-41bc-b66b-f10b65b2f056").trigger("change");
                    $("#SitemAccOtro").val(json[0].accionpersonal_otros.id).trigger("change");
                    $("#diasItem_accP").val($("#SitemAccOtro option[value='" + $("#SitemAccOtro").val() + "']").attr("max_dias"));
                } else {

                    diasItem = $("#SitemAcc option[value='" + $("#SitemAcc").val() + "']").attr("max_dias");

                    if (diasItem == "")
                        diasItem = 0;
                    $("#diasItem_accP").val(diasItem);

                }


                if ((json[0].funcionario_id.partida_individual == null) || (json[0].funcionario_id.partida_individual == ""))
                    num_partida = "";
                else
                    num_partida = json[0].funcionario_id.partida_individual;
                console.log(json);
                // SITUACION ACTUAL 
                $("#SsitdireSA").val(json[0].actual_dir_estatuto_id).trigger("change");
                $("#SsitprocSA").val(json[0].actual_proc_estatuto_id).trigger("change");
                $("#SsitsubprocSA").val(json[0].actual_subprc_estatuto_id).trigger("change");
                $("#SsitgrupoSA").val(json[0].actual_cargo_ocupacional_id).trigger("change");
                //$("#SsitpuestoSA").val(json[0].actual_cargo_institucional_id).trigger("change");
                $("#SsitpuestDistSA").val(json[0].actual_puesto_id).trigger("change");
                $("#SsitpuestInstSA").val(json[0].actual_cargo_institucional_id);
                $("#SsitislaSA").val(json[0].actual_isla_trabaja_id).trigger("change");
                $("#TrmuSA").val(json[0].actual_rmu);
                $("#TppresupSA").val(json[0].actual_nro_presupuestaria);

                // SITUACION PROPUESTA 
                $("#SsitdireSP").val(json[0].nuevo_dir_estatuto_id).trigger("change");
                $("#SsitprocSP").val(json[0].nuevo_proc_estatuto_id).trigger("change");
                $("#SsitsubprocSP").val(json[0].nuevo_subprc_estatuto_id).trigger("change");
                $("#SsitgrupoSP").val(json[0].nuevo_cargo_ocupacional_id).trigger("change");
                //$("#SsitpuestoSP").val(json[0].nuevo_cargo_institucional_id).trigger("change");
                $("#SsitpuestDistSP").val(json[0].nuevo_puesto_id).trigger("change", true);
                $("#SsitislaSP").val(json[0].nuevo_isla_trabaja_id).trigger("change");
                $("#TrmuSP").val(json[0].nuevo_rmu);
                $("#TppresupSP").val(json[0].nuevo_nro_presupuestaria);


                /*fin datos situacion propuesta*/
                $("#acta_no_doc").val(json[0].no_acta_final);
                $("#fecha_acta").val(json[0].fecha_actafinal);
                $("#Sactaresprrhh").val(json[0].resp_rrhh_id).trigger("change");
                $("#SactaAutor").val(json[0].autoridad_nominadora_id).trigger("change");
                $("#obser_obser").val(json[0].observaciones);

                // Se elimina los enlaces a los archivos adjuntos del memo
                // Get the <a> element with class="link_accionpersonal_memo"
                var list = document.getElementById("contentFileAcc");

                // As long as <ul> has a child node, remove it
                while (list.hasChildNodes()) {
                    list.removeChild(list.firstChild);
                }



                if (json[0].anexo_motivo != null && tipoAccion == 'E' ) {

                    archivos = json[0].anexo_motivo.split(';')

                    console.log("-------> ARCHIVOS!!! ")
                    for (i = 0; i < archivos.length; i++) {

                        console.log(archivos[i]);

                        fileExtension = archivos[i].split('.').pop();
                        fileExtension = fileExtension.toLowerCase();

                        if ((fileExtension == 'txt') || (fileExtension == 'log'))
                            $("#imgContentFileAcc").attr("src", "static/image/txt.png");
                        if ((fileExtension == 'doc') || (fileExtension == 'docx'))
                            $("#imgContentFileAcc").attr("src", "static/image/word.png");
                        if ((fileExtension == 'xls') || (fileExtension == 'xls'))
                            $("#imgContentFileAcc").attr("src", "static/image/excel.png");
                        if (fileExtension == 'pdf')
                            $("#imgContentFileAcc").attr("src", "static/image/pdf2.png");

                        // Se agregan los enlaces a los archivos adjuntos del memo

                        var links_archivos = document.createElement("a");
                        links_archivos.setAttribute('style', 'margin-left: 10px; color: black; cursor: pointer;');
                        links_archivos.setAttribute('id', 'nombreFileAcc_' + i);
                        links_archivos.setAttribute('class', 'link_accionpersonal_memo');
                        links_archivos.setAttribute('href', path_archivos_accper + archivos[i] + "");
                        links_archivos.setAttribute('target', "_blank");
                        links_archivos.innerHTML = archivos[i];
                        document.getElementById("contentFileAcc").appendChild(links_archivos);
                    }
                } else {
                    $("#nombreFileAcc").html("");
                    $("#imgContentFileAcc").attr("src", "");
                }
            }
        },
        error: function(data) {
            $("#modalLoadin").hide();
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));

        },
    });
}

/*funcion para calcular el numero de dias de una accion de personal*/
function actNumDiasAccPersonal() {
    console.log("***** actNumDiasAccPersonal ******");
    //validar fechas vigencia y hasta
    set_validacion_fecha("#fec_vigencia", "#fec_hasta");


    var fecha_desde = $("#fec_vigencia").val();
    var fecha_hasta = $("#fec_hasta").val();

    $("#fec_hasta").attr("min", fecha_desde);

    if (Date.parse(fecha_desde) && Date.parse(fecha_hasta)) {
        var difM = new Date($("#fec_hasta").val()) - new Date($("#fec_vigencia").val()); // diferencia en milisegundos
        var difD = (difM / (1000 * 60 * 60 * 24)) + 1 // diferencia en dias

        $("#num_diasAccPer").val(difD)
        return 0;

    } else {
        console.log("Fecha Invalida!");
        $("#num_diasAccPer").val(0)
        return 1;
    }
    return 0;
}

/*funcion para insertar en la base de datos*/
function insertarTablaAccionPer() {

    max_dias = $("#diasItem_accP").val();
    fecha1 = $("#fec_vigencia").val();
    fecha2 = $("#fec_hasta").val();
    fecha3 = $("#fec_acc_pers").val();
    //descripcion_motivo = $('#doc_descripcion').val().replace(/\n\r?/g, '\\n');
    descripcion_motivo = tinyMCE.get('doc_descripcion').getContent();
    descripcion_motivo = descripcion_motivo.replace(/\n\r?/g, '\\n');
    descripcion_motivo = descripcion_motivo.replace(/"/g,"%%");
    descripcion_motivo = descripcion_motivo.replace(/'/g,"%%");

    observacion = $("#obser_obser").val().replace(/\n\r?/g, '\\n');
    observacion = observacion.replace(/"/g,"%%");
    observacion = observacion.replace(/'/g,"%%");

    var difM = new Date(fecha2) - new Date(fecha1); // diferencia en milisegundos
    var difD = difM / (1000 * 60 * 60 * 24) // diferencia en dias

    if ($("#SitemAccOtro").val() == "1a7c2e1d-bd87-4f49-ba2b-2f9bf0783336") {
        if (difD > 15) {
            validaContenedorExt("addAccPersonal", "Numero de dias(" + difD + ") mayor a los permitidos en la accion(15)");
            return 0;
        }
    }

    if (max_dias > 0) {
        dias_lic = $("#diasLic_accP").val();
        dias_tot = parseInt(dias_lic) + parseInt(difD);
        console.log(dias_lic + "+" + difD + "=" + dias_tot);
        if (dias_tot > max_dias) {
            validaContenedorExt("addAccPersonal", "Numero de dias(" + dias_tot + ") mayor a los permitidos en la accion(" + max_dias + ")");
            return 0;
        }
    }

    id = $('#idaccPersonal').val(); 

    /*se genera la cadena para el insert*/
    datos = '{';
    datos += ' "id":"'+ id +'", ';
    datos += ' "funcionario_id":"' + $("#funcionaioAccid").val() + '",';
    datos += ' "estado_ejecucion":"' + $("#SEstadoAcc option[value='" + $("#SEstadoAcc").val() + "']").attr("valor") + '",';
    datos += ' "num_accion_personal":"' + $("#num_acc_pers").val() + '",';
    datos += ' "fecha_accionpersonal":"' + fecha3 + '",';
    datos += ' "fecha_rige_accpersonal":"' + fecha1 + '",';

    if (fecha2 != "")
        datos += ' "fecha_hasta_accpersonal":"' + fecha2 + '",';

    //si item otro es diferente de nulo entonces obtengo la accion padre y verifico si actualiza en la tabla funcionario
    //caso contrario actualiza 1(valor x defecto para actualizar en funcionario)
    if ($("#SitemAccOtro").val() != "") {
        actualiza = $("#SitemAccOtro option[value='" + $("#SitemAccOtro").val() + "']").attr("actualiza");
        acc_padre = $("#SitemAccOtro option[value='" + $("#SitemAccOtro").val() + "']").attr("padre");
        req_fecha = $("#SitemAccOtro option[value='" + $("#SitemAccOtro").val() + "']").attr("req_fechaFin");
        tipoTrx = acc_padre;
    } else {
        actualiza = 1;
        tipoTrx = $("#SitemAcc").val();
        req_fecha = $("#SitemAcc option[value='" + $("#SitemAcc").val() + "']").attr("req_fechaFin");
    }

    datos += ' "tipo_trx":"' + tipoTrx + '",';

    if (descripcion_motivo != "") datos += ' "descripcion_motivo":"' + descripcion_motivo + '",';
    if ($("#num_memoAcc").val() != "") datos += ' "num_memo":"' + $("#num_memoAcc").val() + '",';
    if ($("#SitemAcc").val() != "") datos += ' "accionpersonal_id":"' + $("#SitemAcc").val() + '",';
    if ($("#SitemAccOtro").val() != "") datos += ' "accionpersonal_otros":"' + $("#SitemAccOtro").val() + '",';

    /* SITUACION ACTUAL */
    if (($("#SsitdireSA").val() == "") || ($("#SsitdireSA").val() == null)) datos += '';
    else datos += ' "actual_dir_estatuto_id":"' + $("#SsitdireSA").val() + '",';
    if (($("#SsitprocSA").val() == "") || ($("#SsitprocSA").val() == null)) datos += '';
    else datos += ' "actual_proc_estatuto_id":"' + $("#SsitprocSA").val() + '",';
    if (($("#SsitsubprocSA").val() == "") || ($("#SsitsubprocSA").val() == null)) datos += '';
    else datos += ' "actual_subprc_estatuto_id":"' + $("#SsitsubprocSA").val() + '",';
    if (($("#SsitgrupoSA").val() == "") || ($("#SsitgrupoSA").val() == null)) datos += '';
    else datos += ' "actual_cargo_ocupacional_id":"' + $("#SsitgrupoSA").val() + '",';
    if (($("#SsitpuestDistSA").val() == "") || ($("#SsitpuestDistSA").val() == null)) datos += '';
    else datos += ' "actual_puesto_id":"' + $("#SsitpuestDistSA").val() + '",';
    if (($("#SsitpuestInstSA").val() == "") || ($("#SsitpuestInstSA").val() == null)) datos += '';
    else datos += ' "actual_cargo_institucional_id":"' + $("#SsitpuestInstSA").val() + '",';
    if (($("#SsitislaSA").val() == "") || ($("#SsitislaSA").val() == null)) datos += '';
    else datos += ' "actual_isla_trabaja_id":"' + $("#SsitislaSA").val() + '",';
    if ($("#TrmuSA").val() != "") datos += ' "actual_rmu":"' + $("#TrmuSA").val() + '",';
    if ($("#TppresupSA").val() != "") datos += ' "actual_nro_presupuestaria":"' + $("#TppresupSA").val() + '",';

    /* SITUACION PROPUESTA */
    if (($("#SsitdireSP").val() == "") || ($("#SsitdireSP").val() == null)) datos += '';
    else datos += ' "nuevo_dir_estatuto_id":"' + $("#SsitdireSP").val() + '",';
    if (($("#SsitprocSP").val() == "") || ($("#SsitprocSP").val() == null)) datos += '';
    else datos += ' "nuevo_proc_estatuto_id":"' + $("#SsitprocSP").val() + '",';
    if (($("#SsitsubprocSP").val() == "") || ($("#SsitsubprocSP").val() == null)) datos += '';
    else datos += ' "nuevo_subprc_estatuto_id":"' + $("#SsitsubprocSP").val() + '",';
    if (($("#SsitgrupoSP").val() == "") || ($("#SsitgrupoSP").val() == null)) datos += '';
    else datos += ' "nuevo_cargo_ocupacional_id":"' + $("#SsitgrupoSP").val() + '",';
    if (($("#SsitpuestDistSP").val() == "") || ($("#SsitpuestDistSP").val() == null)) datos += '';
    else datos += ' "nuevo_puesto_id":"' + $("#SsitpuestDistSP").val() + '",';
    if (($("#SsitislaSP").val() == "") || ($("#SsitislaSP").val() == null)) datos += '';
    else datos += ' "nuevo_isla_trabaja_id":"' + $("#SsitislaSP").val() + '",';
    if ($("#TrmuSP").val() != "") datos += ' "nuevo_rmu":"' + $("#TrmuSP").val() + '",';
    if ($("#TppresupSP").val() != "") datos += ' "nuevo_nro_presupuestaria":"' + $("#TppresupSP").val() + '",';

    /*fin datos situacion propuesta*/
    /*si trx es traslado traspaso o ingreso*/
    if ($("#num_diasAccPer").val() == "") {
        if (req_fecha == 0) {
            datos += ' "num_dias":0,';
        } else {
            datos += ' "num_dias":"' + difD + '",';
        }
    } else {
        datos += ' "num_dias":"' + $("#num_diasAccPer").val() + '",';
    }

    if ($("#acta_no_doc").val() != "") datos += ' "no_acta_final":"' + $("#acta_no_doc").val() + '",';
    if ($("#fecha_acta").val() != "") datos += ' "fecha_actafinal":"' + $("#fecha_acta").val() + '",';
    if ($("#Sactaresprrhh").val() != "") datos += ' "resp_rrhh_id":"' + $("#Sactaresprrhh").val() + '",';
    if ($("#SactaAutor").val() != "") datos += ' "autoridad_nominadora_id":"' + $("#SactaAutor").val() + '",';
    if ($("#obser_obser").val() != "") datos += ' "observaciones":"' + observacion + '",';


    /*
    if(tipoTrx == "cbcbb10d-09af-1755-baba-284501a0e103"){
      trxActivas = $("#SitemActivos").val();
      datos+=' "accion_precedente":"'+trxActivas+'",';
    }
    */

    if ($("#SitemActivos").val() != null && $("#SitemActivos").val() != "" && $("#SitemActivos").val() != undefined && $("#SitemActivos").val() != "None") {
        trxActivas = $("#SitemActivos").val();
        datos += ' "accion_precedente":"' + trxActivas + '",';
    }


    file = $('#doc_anexo')[0].files[0];

    var files = $("#doc_anexo")[0].files;
    if (!file) {
        fileExtension = "";
        salida = 1;
        cadenaImg = '';
    } else {
        fileExtension = file.name.split('.').pop();
        salida = ValidateExt(fileExtension);
        datos += ' "anexo_motivo":"' + file.name + '",';
    }


    datos = datos.substring(0, datos.length - 1);

    datos += '}';

    if (salida == 0) {
        validaContenedorExt("addAccPersonal", "Extension de archivo no valida");
        var $el = $('#doc_anexo');
        $el.wrap('<form>').closest('form').get(0).reset();
        $el.unwrap();
        return 0;
    }

    path_archivos_accper = path_archivos_accper + id;
    if (file)
        upload_file("frm_accionper");

    id_padre = $('#content_AccPersonal').parent().attr('id');

    datos = datos.replace(/undefined/g, null);
    datos = datos.replace(/None/g,null);
    datos = datos.replace(/False/g,"'false'");
    datos = datos.replace(/True/g,"'true'");
    datos = datos.replace(/'/g,'"');
    datos = datos.replace(/"null"/g, null);
    datos = datos.replace(/\"\"/g, null);
    datos = datos.replace(/%%/g, "'");


    th_insert(datos, "SP_accPersonal", id_padre, "perfuncionarioaccionpersonal",0,false);

}

/*funcion para editar en la base de datos*/
/*el id se lo guarda en un campo oculto al momento de dar clik en editar*/
function saveEditAccionPer() {
    console.log("****** saveEditAccionPer ******");
    path_archivos_accper = 'static/media/talentohumano/accionpersonal/'
    id = $("#idaccPersonal").val();
    max_dias = $("#diasItem_accP").val();
    dias_lic = $("#diasLic_accP").val();

    fecha1 = $("#fec_vigencia").val();
    fecha2 = $("#fec_hasta").val();
    fecha3 = $("#fec_acc_pers").val();
    descripcion_motivo = tinyMCE.get('doc_descripcion').getContent();
    descripcion_motivo = descripcion_motivo.replace(/\n\r?/g, '\\n');
    descripcion_motivo = descripcion_motivo.replace(/"/g,"%%");
    descripcion_motivo = descripcion_motivo.replace(/'/g,"%%");

    observacion = $("#obser_obser").val().replace(/\n\r?/g, '\\n');
    observacion = observacion.replace(/"/g,"%%");
    observacion = observacion.replace(/'/g,"%%");

    var difM = new Date(fecha2) - new Date(fecha1); // diferencia en milisegundos
    var difD = difM / (1000 * 60 * 60 * 24) // diferencia en dias

    if ($("#SitemAccOtro").val() == "1a7c2e1d-bd87-4f49-ba2b-2f9bf0783336") {
        if (difD > 15) {
            validaContenedorExt("addAccPersonal", "Numero de dias(" + difD + ") mayor a los permitidos en la accion(15)");
            return 0;
        }
    }

    if (max_dias > 0) {

        diasSin = $("#diasLic_accOld").val();
        console.log(diasSin + '---' + dias_lic);
        dias_totSinAct = parseInt(dias_lic) - parseInt(diasSin); //obtiene el total de dias sin los dias de la accion actual
        console.log(dias_totSinAct + '*dias sin accion actual');
        dias_tot = parseInt(dias_totSinAct) + parseInt(difD);
        console.log(dias_totSinAct + "+" + difD + "=" + dias_tot + " dias con la actualizaxion de la fecha");
        if (dias_tot > max_dias) {
            validaContenedorExt("addAccPersonal", "Numero de dias(" + dias_tot + ") mayor a los permitidos en la accion(" + max_dias + ")");
            return 0;
        }
    }

    /*se arma la cadena datos*/
    datos = '{';
    datos += ' "funcionario_id":"' + $("#funcionaioAccid").val() + '",';
    datos += ' "estado_ejecucion":"A",';
    datos += ' "estado":"' + $("#SEstado").val() + '",';
    datos += ' "num_accion_personal":"' + $("#num_acc_pers").val() + '",';
    datos += ' "fecha_accionpersonal":"' + fecha3 + '",';
    datos += ' "fecha_rige_accpersonal":"' + fecha1 + '",';
    if (fecha2 != "")
        datos += ' "fecha_hasta_accpersonal":"' + fecha2 + '",';

    //si item otro es diferente de nulo entonces obtengo la accion padre y verifico si actualiza en la tabla funcionario
    //caso contrario actualiza 1(valor x defecto para actualizar en funcionario)
    if ($("#SitemAccOtro").val() != "") {
        actualiza = $("#SitemAccOtro option[value='" + $("#SitemAccOtro").val() + "']").attr("actualiza");
        acc_padre = $("#SitemAccOtro option[value='" + $("#SitemAccOtro").val() + "']").attr("padre");
        req_fecha = $("#SitemAccOtro option[value='" + $("#SitemAccOtro").val() + "']").attr("req_fechaFin");
        tipoTrx = acc_padre;
    } else {
        actualiza = 1;
        tipoTrx = $("#SitemAcc").val();
        req_fecha = $("#SitemAcc option[value='" + $("#SitemAcc").val() + "']").attr("req_fechaFin");
    }

    if (descripcion_motivo != "") datos += ' "descripcion_motivo":"' + descripcion_motivo + '",';
    else datos += ' "descripcion_motivo":null,';
    if ($("#num_memoAcc").val() != "") datos += ' "num_memo":"' + $("#num_memoAcc").val() + '",';
    else datos += ' "num_memo":null,';
    if ($("#SitemAcc").val() != "") datos += ' "accionpersonal_id":"' + $("#SitemAcc").val() + '",';
    else datos += ' "accionpersonal_id":null,';
    if ($("#SitemAccOtro").val() != "") datos += ' "accionpersonal_otros":"' + $("#SitemAccOtro").val() + '",';
    else datos += ' "accionpersonal_otros":null,';

    /* SITUACION ACTUAL */
    if ($("#SsitdireSA").val() != "") datos += ' "actual_dir_estatuto_id":"' + $("#SsitdireSA").val() + '",';
    else datos += ' "actual_dir_estatuto_id":null,';
    if ($("#SsitprocSA").val() != "") datos += ' "actual_proc_estatuto_id":"' + $("#SsitprocSA").val() + '",';
    else datos += ' "actual_proc_estatuto_id":null,';
    if ($("#SsitsubprocSA").val() != "") datos += ' "actual_subprc_estatuto_id":"' + $("#SsitsubprocSA").val() + '",';
    else datos += ' "actual_subprc_estatuto_id":null,';
    if ($("#SsitgrupoSA").val() != "") datos += ' "actual_cargo_ocupacional_id":"' + $("#SsitgrupoSA").val() + '",';
    else datos += ' "actual_cargo_ocupacional_id":null,';
    if ($("#SsitpuestDistSA").val() != "") datos += ' "actual_puesto_id":"' + $("#SsitpuestDistSA").val() + '",';
    else datos += ' "actual_puesto_id":null,';
    if ($("#SsitpuestInstSA").val() != "") datos += ' "actual_cargo_institucional_id":"' + $("#SsitpuestInstSA").val() + '",';
    else datos += ' "actual_cargo_institucional_id":null,';
    if ($("#SsitislaSA").val() != "") datos += ' "actual_isla_trabaja_id":"' + $("#SsitislaSA").val() + '",';
    else datos += ' "actual_isla_trabaja_id":null,';
    if ($("#TrmuSA").val() != "") datos += ' "actual_rmu":"' + $("#TrmuSA").val() + '",';
    else datos += ' "actual_rmu":null,';
    if ($("#TppresupSA").val() != "") datos += ' "actual_nro_presupuestaria":"' + $("#TppresupSA").val() + '",';
    else datos += ' "actual_nro_presupuestaria":null,';

    /* SITUACION PROPUESTA */
    if ($("#SsitdireSP").val() != "") datos += ' "nuevo_dir_estatuto_id":"' + $("#SsitdireSP").val() + '",';
    else datos += ' "nuevo_dir_estatuto_id":null,';
    if ($("#SsitprocSP").val() != "") datos += ' "nuevo_proc_estatuto_id":"' + $("#SsitprocSP").val() + '",';
    else datos += ' "nuevo_proc_estatuto_id":null,';
    if ($("#SsitsubprocSP").val() != "") datos += ' "nuevo_subprc_estatuto_id":"' + $("#SsitsubprocSP").val() + '",';
    else datos += ' "nuevo_subprc_estatuto_id":null,';
    if ($("#SsitgrupoSP").val() != "") datos += ' "nuevo_cargo_ocupacional_id":"' + $("#SsitgrupoSP").val() + '",';
    else datos += ' "nuevo_cargo_ocupacional_id":null,';
    if ($("#SsitpuestDistSP").val() != "") datos += ' "nuevo_puesto_id":"' + $("#SsitpuestDistSP").val() + '",';
    else datos += ' "nuevo_puesto_id":null,';
    if ($("#SsitislaSP").val() != "") datos += ' "nuevo_isla_trabaja_id":"' + $("#SsitislaSP").val() + '",';
    else datos += ' "nuevo_isla_trabaja_id":null,';
    if ($("#TrmuSP").val() != "") datos += ' "nuevo_rmu":"' + $("#TrmuSP").val() + '",';
    else datos += ' "nuevo_rmu":null,';
    if ($("#TppresupSP").val() != "") datos += ' "nuevo_nro_presupuestaria":"' + $("#TppresupSP").val() + '",';
    else datos += ' "nuevo_nro_presupuestaria":null,';

    /*si trx es traslado traspaso o ingreso*/
    if ($("#num_diasAccPer").val() == "") {
        if (req_fecha == 0) {
            datos += ' "num_dias":0,';
        } else {
            datos += ' "num_dias":"' + difD + '",';
        }
    } else {
        datos += ' "num_dias":"' + $("#num_diasAccPer").val() + '",';
    }

    if ($("#acta_no_doc").val() != "") datos += ' "no_acta_final":"' + $("#acta_no_doc").val() + '",';
    else datos += ' "no_acta_final":null,';
    if ($("#fecha_acta").val() != "") datos += ' "fecha_actafinal":"' + $("#fecha_acta").val() + '",';
    else datos += ' "fecha_actafinal":null,';
    if ($("#Sactaresprrhh").val() != "") datos += ' "resp_rrhh_id":"' + $("#Sactaresprrhh").val() + '",';
    else datos += ' "resp_rrhh_id":null,';
    if ($("#SactaAutor").val() != "") datos += ' "autoridad_nominadora_id":"' + $("#SactaAutor").val() + '",';
    else datos += ' "autoridad_nominadora_id":null,';

    if ($("#SitemActivos").val() != null && $("#SitemActivos").val() != "" && $("#SitemActivos").val() != undefined && $("#SitemActivos").val() != "None") {
        trxActivas = $("#SitemActivos").val();
        datos += ' "accion_precedente":"' + trxActivas + '",';
    }

    file = $('#doc_anexo')[0].files[0];

    if (!file) {
        fileExtension = "";
        salida = 1;
        cadenaImg = '';
    }

    files = $("#doc_anexo")[0].files;
    files_name = "";

    for (var i = 0; i < files.length; i++) {
        files_name += files[i].name + ";";

        fileExtension = files[i].name.split('.').pop();
        salida = ValidateExt(fileExtension);

        if (salida == 0) {
            validaContenedorExt("addAccPersonal", "Extension de archivo no valida");
            var $el = $('#doc_anexo');
            $el.wrap('<form>').closest('form').get(0).reset();
            $el.unwrap();
            return 0;
        }

    }

    datos += ' "anexo_motivo":"' + files_name + '",';
    datos += ' "observaciones":"' + observacion + '"}';

    id_padre = $('#content_AccPersonal').parent().attr('id');

    datos = datos.replace(/undefined/g, null);
    datos = datos.replace(/None/g,null);
    datos = datos.replace(/False/g,"'false'");
    datos = datos.replace(/True/g,"'true'");
    datos = datos.replace(/'/g,'"');
    datos = datos.replace(/"null"/g, null);
    datos = datos.replace(/\"\"/g, null);
    datos = datos.replace(/%%/g, "'");

    salida = th_update(datos, "SP_accPersonal", id_padre, "perfuncionarioaccionpersonal", id,false);

    path_archivos_accper = path_archivos_accper + id;
    if (file)
        upload_file("frm_accionper", path_archivos_accper);

    /*se actualizan los campos que se muestran en la tabla*/
    $("#td_ident_" + id).html($("#funcionaioAccced").val());
    $("#td_nombre_" + id).html($("#funcionaioAcc").val());

    $("#td_accion_" + id).html($("#num_acc_pers").val());

    if ($("#SitemAccOtro").val() != "")
        $("#td_tipo_" + id).html($("#SitemAccOtro option:selected").text());
    else
        $("#td_tipo_" + id).html($("#SitemAcc option:selected").text());

    $("#td_fecharige_" + id).html($("#fec_vigencia").val());

    var difM = new Date($("#fec_hasta").val()) - new Date(getToday()); // diferencia en milisegundos
    var difD = difM / (1000 * 60 * 60 * 24) // diferencia en dias

    if (difD <= 0)
        $("#td_fechahasta_" + id).html('<span class="badge bg-red">' + $("#fec_hasta").val() + '</span><span class="CellComment">' + difD + '</span>');

    if ((difD > 0) && (difD <= 10))
        $("#td_fechahasta_" + id).html('<span class="badge bg-yellow">' + $("#fec_hasta").val() + '</span><span class="CellComment">' + difD + '</span>');

    if (difD > 10)
        $("#td_fechahasta_" + id).html('<span class="badge bg-green">' + $("#fec_hasta").val() + '</span><span class="CellComment">' + difD + '</span>');

}


/*funcion para eliminar(cambio de estado en la base de datos)*/
function deleteAccionPer(id, fechaI, fechaF) {

    tipoTrx = $("#td_tipo_" + id).html();
    id_fun = $("#td_nombre_" + id).attr("id_fun");
    id_padre = $('#content_AccPersonal').parent().attr('id');
    datos = '{"estado":"I","eliminado":"t","estado_ejecucion":"F"}';
    th_delete(datos, "SP_accPersonal", id_padre, "perfuncionarioaccionpersonal", id);
}


/*metodo para buscar datos en tabla funcionario segun el parametro que se envie cedula/nombre /apellido*/
function buscarAcionesParametros(dataIni) {
    console.log(11);
    $("#SitemAcc").select2({
        sorter: data => data.sort((a, b) => a.text.localeCompare(b.text)),
    });
    data = '';
    if (dataIni) {
        data = data += "fecha_rige_accpersonal__range=" + dataIni;
    } else {
        desde = $("#FdesdeParam").val();
        hasta = $("#FhastaParam").val();

        if ((desde == "") || (hasta == ""))
            cadenaFecha = "";
        else
            cadenaFecha = "1";

        nombre = $("#nombreParam").val();
        cedula = $("#cedParam").val();
        estadoAcc = $("#SestadoFilterAcc").val();

        if (cadenaFecha != "") {
            desdeArr = desde.split('/');
            hastaArr = hasta.split('/');

            fdesde = desdeArr[2] + "-" + desdeArr[0] + "-" + desdeArr[1];
            fhasta = hastaArr[2] + "-" + hastaArr[0] + "-" + hastaArr[1];
        }
        data = '';

        if (nombre != "")
            data = "funcionario_id__persona_id__nombre_completo__icontains=" + nombre + "&";

        if (cedula != "")
            data += "funcionario_id__persona_id__identificacion__icontains=" + cedula + "&";

        if (cadenaFecha != "")
            data += "fecha_rige_accpersonal__range=" + fdesde + "," + fhasta + "&";

        if (estadoAcc != "")
            data += "estado__in=" + estadoAcc + "&";

        data = data.substring(0, data.length - 1);
    }


    $.ajax({
        url: "data_accionesParam",
        type: "get",
        data: {
            "data": data
        },
        async: false,
        dataType: "json",

        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
            } else {
                dataArray = "";
                dataArray2 = "";
                tabla = "";
                if (data.length > 0) {
                    for (i = 0; i < data.length; i++) {
                        if (data[i].accionpersonal_id.id != '3eb27e5f-fff8-47c4-a8a6-20593915aa8e') {
                            /*validacion ingreso sin accion*/
                            accionAux = '';
                            if (data[i].accionpersonal_otros != null) {
                                if (data[i].accionpersonal_otros.accion_id == null) {
                                    accionAux = "OTROS";
                                } else {
                                    accionAux = $("#SitemAcc").children("option[value='" + data[i].accionpersonal_otros.accion_id + "']").first().html();
                                }

                                dataArray += '{"' + data[i].accionpersonal_otros.accion_id + '":"1"},';
                                dataArray2 += '{"Accion":"' + accionAux + '","Otros":"' + data[i].accionpersonal_otros.descripcion + '","Isla":"' + data[i].funcionario_id.isla_trabaja_id.descripcion + '"},';
                            } else {
                                dataArray += '{"' + data[i].accionpersonal_id.id + '":"1"},';
                                dataArray2 += '{"Accion":"' + data[i].accionpersonal_id.descripcion + '","Otros":"","Isla":"' + data[i].funcionario_id.isla_trabaja_id.descripcion + '"},';
                            }

                            num_acciones = data[i].num_accion_personal;



                            tabla += "<tr>";
                            //tabla+="<td id='td_sancionFechaCreacion_"+data[i].id+"'>"+data[i].fecha_ingreso+"</td>";
                            tabla += "<td align='center' id='td_fechaingreso_" + data[i].id + "'>" + data[i].fecha_ingreso + "</td>";
                            if (num_acciones == null) {
                                tabla += "<td align='center' id='td_accion_" + data[i].id + "'> </td>";
                            } else {
                                tabla += "<td align='center' id='td_accion_" + data[i].id + "'>" + data[i].descripcion + "</td>";
                            }
                            tabla += "<td align='center' id='td_ident_" + data[i].id + "'>" + data[i].funcionario_id.persona_id.identificacion + "</td>";
                            tabla += "<td align='left' id='td_nombre_" + data[i].id + "' nombre='" + data[i].funcionario_id.persona_id.nombres + "' apellido='" + data[i].funcionario_id.persona_id.apellidos + "' >" + data[i].funcionario_id.persona_id.nombre_completo + "</td>";

                            if (data[i].accionpersonal_otros != null)
                                tabla += "<td align='left' id='td_tipo_" + data[i].id + "'>" + data[i].accionpersonal_otros.descripcion + "</td>";
                            else
                                tabla += "<td align='left' id='td_tipo_" + data[i].id + "'>" + data[i].accionpersonal_id.descripcion + "</td>";

                            tabla += "<td align='center' id='td_isla_" + data[i].id + "'>" + data[i].funcionario_id.isla_trabaja_id.descripcion + "</td>";
                            tabla += "<td align='center' id='td_fecharige_" + data[i].id + "'>" + data[i].fecha_rige_accpersonal + "</td>";
                            if (data[i].alertaDiasrestantes == 'R')
                                span = '<span class="badge bg-red">' + data[i].fecha_hasta_accpersonal + '</span>'
                            if (data[i].alertaDiasrestantes == 'V')
                                span = '<span class="badge bg-green">' + data[i].fecha_hasta_accpersonal + '</span>'
                            if (data[i].alertaDiasrestantes == 'A')
                                span = '<span class="badge bg-yellow">' + data[i].fecha_hasta_accpersonal + '</span>'
                            if (data[i].alertaDiasrestantes == 'N')
                                span = '<span></span>'
                            tabla += "<td align='center' id='td_fechahasta_{{ accion.id }}' class='CellWithComment'>" + span + "<span class='CellComment'>" + data[i].diasrestantes + "</span></td>";

                            var std_ejecucion = "";
                            if (data[i].estado_ejecucion == "C") {
                                span2 = '<span class="badge bg-gray">' + 'CREADO' + '</span>'
                            } else if (data[i].estado_ejecucion == "A") {
                                span2 = '<span class="badge bg-gray">' + 'ACTUALIZADO' + '</span>'
                            } else if (data[i].estado_ejecucion == "P") {
                                span2 = '<span class="badge bg-green">' + 'EN EJECUCION' + '</span>'
                            } else if (data[i].estado_ejecucion == "F") {
                                span2 = '<span class="badge bg-red">' + 'FINALIZADO' + '</span>'
                            }

                            tabla += "<td align='center' id='td_accion_estadosync_" + data[i].id + "'>" + span2 + "</td>";


                            if ($("#perm_change_perfuncionarioaccionpersonal").val() == "1") {

                                tabla += "<td align='center'><a style='font-size: 18px; cursor: pointer;' onclick='openModel(\"addAccPersonal\");editAccionPer(\"" + data[i].id + "\",\"E\",\"" + data[i].estado_ejecucion + "\")' title='Editar Acción Personal'><i class='fa fa-edit text-green'></i></a></td>";
                                tabla += "<td align='center'><a style='font-size: 18px; cursor: pointer;' href='#pdfaccion' data-stackbox-width='1000' data-stackbox-heigth='600' data-stackbox='true' data-stackbox-position='absolute' onclick='verPdfAccion(\"" + data[i].id + "\");'><i class='fa fa-file-pdf-o text-green' title='Ver Acción Personal'></i></a></td>";

                            } else {
                                tabla += "<td> </td>";
                                tabla += "<td> </td>";
                            }

                            // REPLICAR ACC. PERSONAL
                            if ($("#perm_add_perfuncionarioaccionpersonal").val() == "1") {
                                tabla += "<td align='center'><a style='font-size: 18px; cursor: pointer;' href='#addAccPersonal' data-stackbox-width='1000' data-stackbox-heigth='600' data-stackbox='true' data-stackbox-position='absolute' onclick='editAccionPer(\"" + data[i].id + "\",\"D\")'><i class='fa fa-files-o text-green' title='Replicar Acción Personal'></i></a></td>";
                            } else {
                                tabla += "<td> </td>";
                            }

                            // ELIMINAR                 
                            if ($("#perm_delete_perfuncionarioaccionpersonal").val() == "1") {
                                tabla += "<td align='center'><a style='font-size: 18px; cursor: pointer;' onclick='deleteModal(\"" + data[i].id + "\",\"SP_accPersonal\");'><i class='fa fa-trash text-green' title='Eliminar Acción Personal'></i></a></td>";
                            } else {
                                tabla += "<td> </td>";
                            }

                            tabla += "</tr>";
                        } /*fin if validacion ingreso sin accion*/
                    } /*fin for*/
                } /*fin if length*/

                $('#tabla_accPers').dataTable().fnClearTable();
                $('#tabla_accPers').dataTable().fnDestroy();

                $("#bodytabla_accPers").html("");
                $("#bodytabla_accPers").append(tabla);

                var table = $('#tabla_accPers').DataTable({
                    //searching: false,
                    orderCellsTop: true,
                    order: [
                        [0],
                        [5],
                        [4]
                    ]
                });

                if (dataArray != "") {
                    dataArray = dataArray.substring(0, dataArray.length - 1);
                    dataArray = "[" + dataArray + "]";
                    jasonData = jQuery.parseJSON(dataArray);
                    var keyCounts = {};

                    for (var i = 0; i < jasonData.length; i++) {
                        var key = Object.keys(jasonData[i])[0];
                        if (typeof(keyCounts[key]) == 'undefined') {
                            keyCounts[key] = 1;
                        } else {
                            keyCounts[key] += 1;
                        }
                    }
                    result = [];
                    var out = Object.keys(keyCounts).map(function(data) {
                        aux = [$("#SitemAcc").children("option[value='" + data + "']").first().html(), keyCounts[data]];
                        result.push(aux)
                    });

                    //console.log(result);

                    //var highchartsOptions = Highcharts.setOptions(themeDataH);  
                    chart = new Highcharts.Chart({
                        chart: {
                            renderTo: 'containerAccP',
                            type: 'column'
                        },
                        title: {
                            text: 'Gráfico Totales Acciones'
                        },
                        subtitle: {
                            text: 'Periodo: ' + dataIni + ''
                        },
                        xAxis: {
                            type: 'category',
                            labels: {
                                rotation: -45,
                                style: {
                                    fontSize: '13px',
                                    fontFamily: 'Verdana, sans-serif'
                                }
                            }
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
                            enabled: false
                        },
                        tooltip: {
                            headerFormat: '<b>{point.x}</b><b>{series.stack}</b><br/>',
                            pointFormat: 'Total: {point.stackTotal}'
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
                            name: '',
                            data: result

                        }]
                    });

                    dataArray2 = dataArray2.substring(0, dataArray2.length - 1);
                    dataArray2 = "[" + dataArray2 + "]";
                    jasonData2 = jQuery.parseJSON(dataArray2);

                    var derivers = $.pivotUtilities.derivers;
                    var renderers = $.extend($.pivotUtilities.renderers,
                        $.pivotUtilities.c3_renderers);
                    $("#outputAccP").pivotUI(jasonData2, {
                        renderers: renderers,
                        rows: ["Isla", "Accion"],
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
                } /*fin if data array*/
            }
        },
        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
            //console.log( JSON.stringify(data));
        },
    });
}


function openModel(nombre){
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


/*metodo para buscar cuantos lleva acumulado en el año el funcionario segun la accion personal q selecciona(OTROS) */
function buscarDiasAccionesParametros(id, padre) {
    if (padre != "59918445-f38d-4c70-868c-51521f1480c2") {
        if (id != "") {
            var d = new Date();
            var n = d.getFullYear();
            desde = n + '-01' + '-01';
            hasta = n + '-12' + '-31';

            item = id;
            funcioanrio = $("#funcionaioAccid").val();

            dataF = "funcionario_id__id__in=" + funcioanrio + "&accionpersonal_otros__id__in=" + item + "&fecha_rige_accpersonal__range=" + desde + "," + hasta;
            $.ajax({
                url: "data_accionesParam",
                type: "get",
                data: {
                    "data": dataF
                },
                dataType: "json",
                async: false,

                success: function(data) {
                    if (data['non_field_errors']) {
                        console.log(data['non_field_errors']);
                    } else {
                        dias_acum = 0;
                        if (data.length > 0) {
                            for (i = 0; i < data.length; i++) {
                                dias_acum += data[i].num_dias;
                            }
                        }
                        $("#dias_disponibles_acc").html("el funcionario tiene " + dias_acum + " dias de " + $('#SitemAccOtro option:selected').text() + " en el año");
                        $("#diasLic_accP").val(dias_acum);
                        $("#diasItem_accP").val($("#SitemAccOtro option[value='" + id + "']").attr("max_dias"));
                    }
                },
                error: function(data) {
                    swal("", "Error: " + JSON.stringify(data), "error");
                    console.log(JSON.stringify(data));
                },
            });
        }
    } else {
        $("#dias_disponibles_acc").html("");
    }
}

/*cambia la etiqueta del campo fecha vigencia*/
function ocultarAccionesFechaFin(solo_fechaVigencia) {
    console.log("****** ocultarAccionesFechaFin *******");
    if (solo_fechaVigencia == "True") {
        $("#accp_fecha_vigencia").html("*Fecha Vigencia");

        $("#cont_accp_fecha_hasta_lbl").css("display", "None");
        $("#cont_accp_fecha_hasta_valor").css("display", "None");
        $("#num_diasAccPer").css("display", "None");
    } else {
        $("#accp_fecha_vigencia").html("*Fecha Vigencia ");

        $("#cont_accp_fecha_hasta_lbl").css("display", "block");
        $("#cont_accp_fecha_hasta_valor").css("display", "block");
        $("#num_diasAccPer").css("display", "block");
    }
}

/*oculta la situacion propuesta dependiendo de la accion personal q se seleccione*/
function ocultarSitPropuesta(tipoTrx) {
    if ((tipoTrx == '2b6be56b-aef5-4eef-8a31-9090d7fb8d66') || (tipoTrx == 'b8bb4fde-28a6-41ff-9838-09b8c7e70843') || (tipoTrx == '59918445-f38d-4c70-868c-51521f1480c2') || (tipoTrx == '2c27f7da-d578-4c33-ba43-1c8cbbcfa8d4') || (tipoTrx == '6bed0559-5d87-46aa-a42a-42caab5b421b') || (tipoTrx == '9d5ed44e-864f-41d9-9dbe-1862863e1ced') || (tipoTrx == '5bec1ac6-ecca-4b49-bf3f-dfdd690cda94')) {
        $("#div_sitPro").show();
        console.log("OCULTAR!!!");
    } else {
        $("#div_sitPro").hide();
    }
}

/*oculta la situacion propuesta dependiendo de la accion personal q se seleccione*/
function ocultarSitPropuestaOtro(tipoTrx) {
    /*encargo de responsabilidades*/
    if (tipoTrx == '75c8bce8-187a-4b7d-998e-f21507a26dfb') {
        $("#div_sitPro").show();
    } else {
        $("#div_sitPro").hide();
    }
}

/*oculta el item otro dependiendo de la accion padre q se seleccione*/
function ocultarItemOtro(tipoTrx) {
    if (tipoTrx == "7837bf73-175e-41bc-b66b-f10b65b2f056") {
        $("#tr_itemotro").show();
        $("#tr_itemotroL").show();
        $("#div_sitAct").hide();
    } else {
        $("#tr_itemotro").hide();
        $("#tr_itemotroL").hide();
        $("#SitemAccOtro").val("").trigger('change');
    }

    if ((tipoTrx == "2b6be56b-aef5-4eef-8a31-9090d7fb8d66") || (tipoTrx == "b8bb4fde-28a6-41ff-9838-09b8c7e70843")) {
        $("#div_sitAct").hide();
    } else {
        $("#div_sitAct").show();
    }
}

/*vista preliminar del documento de accion personal*/
function verPdfAccion(id) {
    /*se limpia el formulario del pdf*/

    $(".pdf").each(function() {
        console.log($(this).attr("type"));
        if ($(this).attr("type") == 'checkbox')
            $("#" + $(this).attr("id")).prop('checked', false);
        $("#" + $(this).attr("id")).html("");
    });

    var items = JSON.parse(sessionStorage.getItem("catalogos"));
    var data_filter = items.filter(element => element.categoria == "PARTIDA_GENERAL");
    partida = data_filter[0].valor;

    $.ajax({
        url: "data_accionPer",
        type: "get",
        cache: 'false',
        data: {
            "data": id
        },
        dataType: "json",

        success: function(json) {
            $("#modalLoadin").hide();
            if (json['error']) {
                if (json['error']['context'])
                    var salida = json['error']['context']['resource'][0].message;
                else
                    var salida = json['error']['message']
            } else {
                //Refresca data del reverso de la pagina
                $("#for_numaccper").html(json[0].num_accion_personal);
                fecha1 = json[0].fecha_accionpersonal;
                if (fecha1 != null) {
                    arrfecha = fecha1.split('-');
                    $("#for_fechaaccper").html(getMes(arrfecha[1]) + ' ' + arrfecha[2] + ' de ' + arrfecha[0]);
                } else {
                    $("#for_fechaaccper").html("");
                }

                $("#for_apellidos").html($("#td_nombre_" + id).attr("apellido"));
                $("#for_nombres").html($("#td_nombre_" + id).attr("nombre"));

                fecha3 = json[0].fecha_rige_accpersonal;
                if (fecha3 != null) {
                    arrfecha3 = fecha3.split('-');
                    $("#for_fecharige").html(getMes(arrfecha3[1]) + ' ' + arrfecha3[2] + ' de ' + arrfecha3[0]);
                } else {
                    $("#for_fecharige").html("");
                }

                $("#for_numiess").html(json[0].num_iess);
                $("#for_cedula").html(json[0].funcionario_id.persona_id.identificacion);

                $("#for_explicacion").html(json[0].descripcion_motivo);


                if (json[0].accionpersonal_otros == null) {

                    if (json[0].accionpersonal_id.descripcion == "INGRESO")
                        $('#for_accper1').prop('checked', true);
                    if (json[0].accionpersonal_id.descripcion == "NOMBRAMIENTO") {
                        $('#for_accper2').prop('checked', true);
                    }

                    if (json[0].accionpersonal_id.descripcion == "ASCENSO")
                        $('#for_accper3').prop('checked', true);
                    if (json[0].accionpersonal_id.descripcion == "SUBROGACION")
                        $('#for_accper4').prop('checked', true);
                    if (json[0].accionpersonal_id.descripcion == "ENCARGO")
                        $('#for_accper5').prop('checked', true);
                    if (json[0].accionpersonal_id.descripcion == "VACACIONES")
                        $('#for_accper6').prop('checked', true);
                    if (json[0].accionpersonal_id.descripcion == "TRASLADO")
                        $('#for_accper7').prop('checked', true);
                    if (json[0].accionpersonal_id.descripcion == "TRASPASO")
                        $('#for_accper8').prop('checked', true);
                    if (json[0].accionpersonal_id.descripcion == "CAMBIO ADMINISTRATIVO")
                        $('#for_accper9').prop('checked', true);
                    if (json[0].accionpersonal_id.descripcion == "INTERCAMBIO")
                        $('#for_accper10').prop('checked', true);
                    if (json[0].accionpersonal_id.descripcion == "COMISION DE SERVICIOS")
                        $('#for_accper11').prop('checked', true);
                    if (json[0].accionpersonal_id.descripcion == "LICENCIA")
                        $('#for_accper12').prop('checked', true);
                    if (json[0].accionpersonal_id.descripcion == "REVALORIZACION")
                        $('#for_accper13').prop('checked', true);
                    if (json[0].accionpersonal_id.descripcion == "RECLASIFICACION")
                        $('#for_accper14').prop('checked', true);
                    if (json[0].accionpersonal_id.descripcion == "UBICACION")
                        $('#for_accper15').prop('checked', true);
                    if (json[0].accionpersonal_id.descripcion == "REINTEGRO")
                        $('#for_accper16').prop('checked', true);
                    if (json[0].accionpersonal_id.descripcion == "RESTITUCION")
                        $('#for_accper17').prop('checked', true);
                    if (json[0].accionpersonal_id.descripcion == "RENUNCIA")
                        $('#for_accper18').prop('checked', true);
                    if (json[0].accionpersonal_id.descripcion == "SUPRESION")
                        $('#for_accper19').prop('checked', true);
                    if (json[0].accionpersonal_id.descripcion == "DESTITUCION")
                        $('#for_accper20').prop('checked', true);
                    if (json[0].accionpersonal_id.descripcion == "REMOCION")
                        $('#for_accper21').prop('checked', true);
                    if (json[0].accionpersonal_id.descripcion == "JUBILACION")
                        $('#for_accper22').prop('checked', true);
                    if (json[0].accionpersonal_id.descripcion == "OTRO")
                        $('#for_accper23').prop('checked', true);

                } else
                    $('#tipoOtro').html(toTitleCase(json[0].accionpersonal_otros.descripcion));

                if ((json[0].funcionario_id.partida_individual == null) || (json[0].funcionario_id.partida_individual == ""))
                    num_partida = "";
                else
                    num_partida = json[0].funcionario_id.partida_individual;

                /*  DIRECCION-PUESTO ACTUAL*/

                $("#for_procesoact").html(toTitleCase($("#SsitdireSA option[value='" + json[0].actual_dir_estatuto_id + "']").text()));
                if ($("#SsitpuestDistSA option[value='" + json[0].actual_puesto_id + "']").text() != "") {
                    $("#for_puestoact").html($("#SsitgrupoSA option[value='" + json[0].actual_cargo_ocupacional_id + "']").attr("ncorto") + ' - ' + toTitleCase($("#SsitpuestDistSA option[value='" + json[0].actual_puesto_id + "']").text()));
                } else {
                    $("#for_puestoact").html("");
                }
                $("#for_lugaract").html(toTitleCase($("#SsitislaSA option[value='" + json[0].actual_isla_trabaja_id + "']").text()));


                $("#for_rmuact").html(json[0].actual_rmu);
                $("#for_partpresact").html(json[0].actual_nro_presupuestaria);

                /*ingreso ENCARGO TRASLADO*/
                /*5bec1ac6-ecca-4b49-bf3f-dfdd690cda94*/
                if (json[0].nuevo_dir_estatuto_id == null)
                    $("#for_partpresnew").html("");
                else
                    $("#for_partpresnew").html(json[0].nuevo_nro_presupuestaria);

                /*  DIRECCION-PUESTO PROPUESTO*/
                $("#for_procesonew").html(toTitleCase($("#SsitdireSA option[value='" + json[0].nuevo_dir_estatuto_id + "']").text()));
                //$("#for_subprocesonew").html($("#SsitprocSA option[value='"+json[0].nuevo_proc_estatuto_id+"']").text().toLowerCase().replace(/\b(\w)/g, x => { return x.toUpperCase(); }));
                if ($("#SsitpuestDistSP option[value='" + json[0].nuevo_puesto_id + "']").text() != "") {
                    $("#for_puestonew").html($("#SsitgrupoSA option[value='" + json[0].nuevo_cargo_ocupacional_id + "']").attr("ncorto") + ' - ' + toTitleCase($("#SsitpuestDistSP option[value='" + json[0].nuevo_puesto_id + "']").text()));
                } else {
                    $("#for_puestonew").html("");
                }

                $("#for_lugarnew").html(toTitleCase($("#SsitislaSA option[value='" + json[0].nuevo_isla_trabaja_id + "']").text()));
                if (json[0].nuevo_rmu != null) $("#for_rmunew").html("US $ " + json[0].nuevo_rmu);
                else $("#for_rmunew").html("");

                $("#for_numactafinal").html(json[0].no_acta_final);
                fecha4 = json[0].fecha_actafinal;
                if (fecha4 != null) {
                    arrfecha4 = fecha4.split('-');
                    $("#for_fechaactafinal").html(getMes(arrfecha4[1]) + ' ' + arrfecha4[2] + ' de ' + arrfecha4[0]);
                } else {
                    $("#for_fechaactafinal").html("");
                }

                $("#for_tituloprcrrhh").html($("#Sactaresprrhh option[value='" + json[0].resp_rrhh_id + "']").attr("titulo") == "None" ? "" : $("#Sactaresprrhh option[value='" + json[0].resp_rrhh_id + "']").attr("titulo"));
                $("#for_nombreprcrrhh").html(toTitleCase($("#Sactaresprrhh option[value='" + json[0].resp_rrhh_id + "']").text()));
                $("#for_tituloautnom").html($("#SactaAutor option[value='" + json[0].autoridad_nominadora_id + "']").attr("titulo") == "None" ? "" : toTitleCase($("#SactaAutor option[value='" + json[0].autoridad_nominadora_id + "']").attr("titulo") )  );
                $("#for_nombreautnom").html(toTitleCase($("#SactaAutor option[value='" + json[0].autoridad_nominadora_id + "']").text()));

                $("#for_numrrhh").html(json[0].num_accion_personal);
                $("#for_fecharrhh").html(getMes(arrfecha[1]) + ' ' + arrfecha[2] + ' de ' + arrfecha[0]);
                $("#num_accion_personal").html(json[0].descripcion);

                //NOMBRAMIENTOS, SE LLENAN DATOS DE LA PARTE REVERSA DE LA HOJA
                texto_reversohoja_posesioncargo(json[0]);

                // RIGE HASTA ante OTROS ITEMS
                texto_rige_hasta(json[0]);
            }
        },
        error: function(data) {
            $("#modalLoadin").hide();
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));

        },

    });
}

/*cambia el texto del pdf segun los valores configurados*/
function texto_rige_hasta(obj) {
    console.log("***** texto_rige_hasta *****");

    var flag_rige_hasta_pdf = false;
    if (obj.accionpersonal_otros != null) {
        flag_rige_hasta_pdf = obj.accionpersonal_otros.flag_rige_hasta_pdf;
    }

    $('#for_accp_rige_fecha').html('Rige a partir de: ');
    if (obj.accionpersonal_id.flag_rige_hasta_pdf == true || flag_rige_hasta_pdf == true) {
        $('#for_accp_rige_fecha').html('Rige Hasta: ');
    }

}

/*muestra la segunda hoja del pdf segun la accion personal seleccionada*/
function texto_reversohoja_posesioncargo(obj) {
    console.log("***** texto_reverso_hoja *****");
    var flag_posesion_cargo_pdf = false;
    if (obj.accionpersonal_otros != null) {
        flag_posesion_cargo_pdf = obj.accionpersonal_otros.flag_posesion_cargo_pdf;
    }
    //SE LLENAN DATOS DE LA PARTE REVERSA DE LA HOJA
    if (obj.accionpersonal_id.flag_posesion_cargo_pdf == true || flag_posesion_cargo_pdf == true) {
        $('#for_accp_cargo_pers_nombre').html(obj.funcionario_id.persona_id.nombre_completo);
        $('#for_accp_cargo_pers_identif').html(obj.funcionario_id.persona_id.identificacion);
        $('#for_accp_lugar').html(obj.isla_usuario_ingreso_id.descripcion);
        $('#for_accp_fecha').html(obj.fecha_accionpersonal);
    } else {
        $('#for_accp_cargo_pers_nombre').html("");
        $('#for_accp_cargo_pers_identif').html("");
        $('#for_accp_lugar').html("");
        $('#for_accp_fecha').html("");
    }
}


function ocultarNombreProyecto(id) {
    if (id != "") {
        $('#tr_nombreProyecto').show();
        $('#tr_labelnombreProyecto').show();
    } else {
        $('#tr_nombreProyecto').hide();
        $('#tr_labelnombreProyecto').hide();
    }
}


/*ingresos y salidas*/
/*funcion para limpiar formulario de ingreso y actualizacion de Ingreso_SP*/
function limpiarFormIngreso_SP() {
    $('.nav-tabs a[href="#tab_funcionarioI"]').tab('show');
    clearForm(frm_ingresoSp);
    $("#verifica_init").val(1);
    $('#idIngresoI').val();
    $('#tipot_IngI').val(0);
    $("#bodyHist").html("");
    $("#idFuncionarioI").val("");
}

/*setea los datos del funcionario en el formulario luego de haber seleccionado uno*/
function setDatosFuncionario(id) {
    var init = $("#verifica_init").val();
    if (init > 0) {
        funcionario = $("#SfuncionarioI option:selected").attr("modalidad");
        newF = funcionario.replace(/None/g, null)
        newF = newF.replace(/False/g, "'false'")
        newF = newF.replace(/True/g, "'true'")
        newF = newF.replace(/'/g, '"')
        var json = JSON.parse("[" + newF + "]");
        $("#ced_funcI").val(json[0].per_persona_by_persona_id["identificacion"]);
        $("#SmodalidadI").val(json[0].modalidad_laboral_id.nombre);
    }
}

/*funcion para verificar si se realiza una insercion o una actualizacion*/
/*el valor del if se llena con 0 cuando se da click en el boton nuevo y con 1 cuando se da clik en editar*/
function setInsertUpdateIngreso(tipo) {
    if ($("#tipot_IngI").val() == 0)
        insertarIngreso_SP();
    else
        saveEditIngreso_SP();
}

/*funcion para asignar los datos al formulario*/
/*parametros id ---> id tabla*/
function editIngresoSP(id, est_eje) {
    console.log("**** editIngresoSP ****")

    limpiarFormIngreso_SP();
    $('#tipot_IngI').val(1);
    $('.nav-tabs a[href="#tab_funcionarioI"]').tab('show');
    $("#idaccPerI").val(id);

    $.ajax({
        url: "data_ingreso",
        type: "get",
        cache: 'false',
        data: {
            "data": id
        },
        dataType: "json",

        success: function(jsonA) {
            if (jsonA['error']) {
                if (jsonA['error']['context'])
                    var salida = jsonA['error']['context']['resource'][0].message;
                else
                    var salida = jsonA['error']['message']
            } else {
                if (jsonA.length > 0) {
                    $("#idFuncionarioI").val(jsonA[0].funcionario_id.id);
                    /*datos funcionario*/
                    $("#nombre_funcI").val(jsonA[0].funcionario_id.persona_id.apellidos + ' ' + jsonA[0].funcionario_id.persona_id.nombres);
                    $("#ced_funcI").val(jsonA[0].funcionario_id.persona_id.identificacion);
                    /*de sis catalogo se toma este valor*/
                    var items = JSON.parse(sessionStorage.getItem("catalogos"));
                    var data_filter = items.filter(element => element.categoria == "PARTIDA_GENERAL");
                    partida = data_filter[0].valor;

                    $("#numPartI").val(partida);
                    /*datos accion personal*/
                    if ((jsonA[0].nuevo_isla_trabaja_id != "") || (jsonA[0].nuevo_isla_trabaja_id != "")) $("#SislaI").val(jsonA[0].nuevo_isla_trabaja_id).trigger("change");
                    else $("#SislaI").val("");
                    if (jsonA[0].modalidad_laboral_id != null) $("#SmodalidadI").val(jsonA[0].modalidad_laboral_id.id).trigger("change");
                    else $("#SmodalidadI").val("").trigger("change");
                    $("#rmuI").val(jsonA[0].nuevo_rmu);


                    $("#fechainiI").val(jsonA[0].fecha_rige_accpersonal);
                    if (jsonA[0].fecha_hasta_accpersonal != null) $("#fechafinI").val(jsonA[0].fecha_hasta_accpersonal);
                    else $("#fechafinI").val("");

                    $("#observacion_Ing").val(jsonA[0].observaciones);
                    /*se verifica si exsite registro en ingreso acciones*/
                    if (jsonA[0].accpersonal_ingresos.length > 0) {
                        /*se setean los valores en los campos correspondientes de la tabla ingreso acciones*/
                        if ((jsonA[0].accpersonal_ingresos[0].estado_ejecucion == "P") || (jsonA[0].accpersonal_ingresos[0].estado_ejecucion == "F"))
                            $("#btn_accIngreso").hide();
                        else
                            $("#btn_accIngreso").show();

                        $("#bandIngSP").val(1);
                        $("#idIngAccI").val(jsonA[0].accpersonal_ingresos[0].id);
                        $("#gradoI").val(jsonA[0].accpersonal_ingresos[0].grado);
                        $("#escalaI").val(jsonA[0].accpersonal_ingresos[0].escala);
                        $("#numPartIndI").val(jsonA[0].accpersonal_ingresos[0].num_partidaInd);
                        $("#nomProyectoI").val(jsonA[0].accpersonal_ingresos[0].nombre_proyecto);
                        if (jsonA[0].accpersonal_ingresos[0].tipo_gasto_id != null) $("#STipoGasto").val(jsonA[0].accpersonal_ingresos[0].tipo_gasto_id).trigger("change");
                        else $("#STipoGasto").val("").trigger("change");
                        if (jsonA[0].accpersonal_ingresos[0].parroquia_id != null) $("#SparrI").val(jsonA[0].accpersonal_ingresos[0].parroquia_id).trigger("change");
                        else $("#SparrI").val("").trigger("change");
                        if (jsonA[0].accpersonal_ingresos[0].base_legal != null) $("#SbaseLegalI").val(jsonA[0].accpersonal_ingresos[0].base_legal).trigger("change");
                        else $("#SbaseLegalI").val("").trigger("change");
                        if (jsonA[0].accpersonal_ingresos[0].tipo_actividad != null) $('#StipoAct [valor="' + jsonA[0].accpersonal_ingresos[0].tipo_actividad + '"]').prop("selected", true).trigger("change");
                        else $('#StipoAct').val("").trigger("change");
                        if ((jsonA[0].accpersonal_ingresos[0].cargo_funcional_id != null) || (jsonA[0].accpersonal_ingresos[0].cargo_funcional_id != "")) $("#ScargoI").val(jsonA[0].accpersonal_ingresos[0].cargo_funcional_id).trigger("change");
                        else $("#ScargoI").val("");
                        if (jsonA[0].accpersonal_ingresos[0].clasificacion_proceso_id != null) $("#ScprocesoI").val(jsonA[0].accpersonal_ingresos[0].clasificacion_proceso_id).trigger("change");
                        else $("#ScprocesoI").val("").trigger("change");

                        $("#observacion_razon").val(jsonA[0].accpersonal_ingresos[0].razon_salida);

                    } else {
                        /*caso contrario se limpian los campos del formulario de la tabla ingreso acciones*/
                        $("#bandIngSP").val(0);
                        $("#idIngAccI").val(0);
                        $("#STipoGasto").val("").trigger("change");
                        $("#nomProyectoI").val("");
                        $("#gradoI").val("");
                        $("#escalaI").val("");
                        $("#numPartIndI").val("");
                        $("#SparrI").val("").trigger("change");
                        $("#SbaseLegalI").val("").trigger("change");
                        $('#StipoAct').val("").trigger("change");
                        $("#fechafinI").val("");
                        $("#observacion_razon").val("");
                        $("#observacion_Ing").val("");
                        $("#ScprocesoI").val("").trigger("change");
                    }

                    /*laboral*/
                    if (jsonA[0].nuevo_dir_estatuto_id != null) $("#SdireccionI").val(jsonA[0].nuevo_dir_estatuto_id).trigger("change");
                    if (jsonA[0].nuevo_proc_estatuto_id != null) $("#SprocesoI").val(jsonA[0].nuevo_proc_estatuto_id).trigger("change");
                    if (jsonA[0].nuevo_subprc_estatuto_id != null) $("#SsubprocesoI").val(jsonA[0].nuevo_subprc_estatuto_id).trigger("change");
                    if (jsonA[0].nuevo_puesto_id != null) $("#SpuestoI").val(jsonA[0].nuevo_puesto_id).trigger("change");
                    if (jsonA[0].nuevo_cargo_ocupacional_id != null) $("#SgrupoI").val(jsonA[0].nuevo_cargo_ocupacional_id).trigger("change");
                    if (jsonA[0].actual_puesto_id != null) $("#SpuestoDistI").val(jsonA[0].actual_puesto_id).trigger("change");
                }
            }
        },
        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
        },
    });
}

/*funcion para insertar en la base de datos*/
function insertarIngreso_SP() {
    console.log(">> insertarIngreso_SP <<")

    datos = '{';
    datos += ' "funcionario_id":"' + $("#idFuncionarioI").val() + '",';
    datos += ' "estado_ejecucion":"C",';
    datos += ' "num_accion_personal":"",';
    datos += ' "fecha_accionpersonal":"' + $("#fechainiI").val() + '",';

    if ($("#fechainiI").val() != "" && $("#fechainiI").val() != undefined && $("#fechainiI").val() != "None") {
        datos += ' "fecha_rige_accpersonal":"' + $("#fechainiI").val() + '",';
    }
    if ($("#fechafinI").val() != "" && $("#fechafinI").val() != undefined && $("#fechafinI").val() != "None") {
        datos += ' "fecha_hasta_accpersonal":"' + $("#fechafinI").val() + '",';
    }
    datos += ' "accionpersonal_id":"3eb27e5f-fff8-47c4-a8a6-20593915aa8e",';

    /*datos situacion propuesta traslados traspasos cambios adm subrrogaciones ingreso*/
    if (($("#SdireccionI").val() == "") || ($("#SdireccionI").val() == null)) datos += '';
    else datos += ' "nuevo_dir_estatuto_id":"' + $("#SdireccionI").val() + '",';
    if (($("#SprocesoI").val() == "") || ($("#SprocesoI").val() == null)) datos += '';
    else datos += ' "nuevo_proc_estatuto_id":"' + $("#SprocesoI").val() + '",';
    if (($("#SsubprocesoI").val() == "") || ($("#SsubprocesoI").val() == null)) datos += '';
    else datos += ' "nuevo_subprc_estatuto_id":"' + $("#SsubprocesoI").val() + '",';
    if (($("#SpuestoI").val() == "") || ($("#SpuestoI").val() == null)) datos += '';
    else datos += ' "nuevo_puesto_id":"' + $("#SpuestoI").val() + '",';
    if (($("#SgrupoI").val() == "") || ($("#SgrupoI").val() == null)) datos += '';
    else datos += ' "nuevo_cargo_ocupacional_id":"' + $("#SgrupoI").val() + '",';
    if (($("#SpuestoDistI").val() == "") || ($("#SpuestoDistI").val() == null)) datos += '';
    else datos += ' "actual_puesto_id":"' + $("#SpuestoDistI").val() + '",';
    if (($("#SislaI").val() == "") || ($("#SislaI").val() == null)) datos += '';
    else datos += ' "nuevo_isla_trabaja_id":"' + $("#SislaI").val() + '",';
    if ($("#rmuI").val() != "") datos += ' "nuevo_rmu":"' + $("#rmuI").val() + '",';

    datos += ' "num_dias":0,';
    datos += ' "no_acta_final":null,';
    datos += ' "fecha_actafinal":null,';
    datos += ' "resp_rrhh_id":null,';
    datos += ' "autoridad_nominadora_id":null,';
    datos += ' "observaciones":"' + $("#observacion_Ing").val() + '",';
    datos += ' "modalidad_laboral_id":"' + $("#SmodalidadI").val() + '",';

    datos = datos.substring(0, datos.length - 1);
    datos += '}';

    id_padre = "";
    th_insert(datos, "SP_accPersonal", id_padre, "perfuncionarioaccionpersonal", 1);
    /*tabla ingresos*/
    id_accion = $("#idauxinsert").val()
    console.log(id_accion);

    /*se obtienen los campos del formulario que se actualizaran en la tabla per_funcionario*/
    parroquia = $('#SparrI').val();
    cproceso = $('#ScprocesoI').val();
    cprocesot = $("#ScprocesoI option:selected").text();
    cargof = $('#ScargoI').val();

    /*se obtienen los campos ids de las tablas que se actualizaran per_formulario y per_ingresos_acciones*/
    id_funcionario = $("#idFuncionarioI").val();
    id_padre = $('#content_ingresos').parent().attr('id');

    if (($("#SbaseLegalI").val() === "") || ($("#SbaseLegalI").val() === null)) {
        base_legalI = ' "base_legal":null,';
    } else {
        base_legalI = ' "base_legal":"' + $("#SbaseLegalI").val() + '",';
    }

    if ((parroquia === "") || (parroquia === null)) {
        parroquiaCI = ' "parroquia_id":null,';
    } else {
        parroquiaCI = ' "parroquia_id":"' + parroquia + '",';
    }

    if (($("#StipoAct").val() === "") || ($("#StipoAct").val() === null)) {
        tipo_actividadI = ' "tipo_actividad":null,';
    } else {
        tipo_actividadI = ' "tipo_actividad":"' + $("#StipoAct option:selected").attr("valor") + '",';
    }

    datos1 = '{';
    datos1 += '"accionpersonal_id":"' + id_accion + '",';
    datos1 += base_legalI;
    datos1 += '"grado":"' + $("#gradoI").val() + '",';
    datos1 += '"escala":"' + $("#escalaI").val() + '",';
    datos1 += '"num_partidaInd":"' + $("#numPartIndI").val() + '",';
    datos1 += '"rmu":"' + $("#rmuI").val() + '",';
    datos1 += parroquiaCI;
    datos1 += tipo_actividadI;

    if ((cargof === "") || (cargof === null))
        datos1 += '"cargo_funcional_id":null,';
    else
        datos1 += '"cargo_funcional_id":"' + cargof + '",';

    if (($("#STipoGasto").val() == "") || ($("#STipoGasto").val() == null)) {
        datos1 += '"tipo_gasto_id":"",';
        datos1 += '"nombre_proyecto":"",';
    } else {
        datos1 += '"tipo_gasto_id":"' + $("#STipoGasto").val() + '",';
        datos1 += '"nombre_proyecto":"' + $("#nomProyectoI").val() + '",';
    }

    if (($("#ScprocesoI").val() === "") || ($("#ScprocesoI").val() === null)) datos1 += '"clasificacion_proceso_id":null,';
    else datos1 += '"clasificacion_proceso_id":"' + $("#ScprocesoI").val() + '",';
    if (($("#SmodalidadI").val() === "") || ($("#SmodalidadI").val() === null)) datos1 += '"modalidad_laboral_id":null,';
    else datos1 += '"modalidad_laboral_id":"' + $("#SmodalidadI").val() + '",';

    if ($("#fechainiI").val() != "") datos1 += '"fecha_desde":"' + $("#fechainiI").val() + '",';
    else datos1 += '"fecha_desde":null,';
    if ($("#fechafinI").val() != "") datos1 += '"fecha_hasta":"' + $("#fechafinI").val() + '",';
    else datos1 += '"fecha_hasta":null,';
    if ($("#observacion_razon").val() != "") datos1 += '"razon_salida":"' + $("#observacion_razon").val() + '",';
    else datos1 += '"razon_salida":null,';
    if ($("#observacion_Ing").val() != "") datos1 += '"observaciones":"' + $("#observacion_Ing").val() + '",';
    else datos1 += '"observaciones":null,';
    if ($("#SislaI").val() != "") datos1 += '"isla_id":"' + $("#SislaI").val() + '",';
    else datos1 += '"isla_id":null,';

    datos1 += '"estado_ejecucion":"C",';

    datos1 = datos1.substring(0, datos1.length - 1);
    datos1 += '}';

    salida = th_insert(datos1, "SP_ingresos", id_padre, "peringresosacciones");

}

/*funcion para editar en la base de datos*/
/*el id se lo guarda en un campo oculto al momento de dar clik en editar*/
function saveEditIngreso_SP() {

    /*actualizacion de datos de tabla funcionario accion personal*/
    id_funcionario = $("#idFuncionarioI").val();
    id_accion = $("#idaccPerI").val();
    id_padre = $('#content_ingresos').parent().attr('id');

    datos = '{';
    datos += ' "funcionario_id":"' + id_funcionario + '",';
    datos += ' "estado_ejecucion":"P",';
    datos += ' "fecha_accionpersonal":"' + $("#fechainiI").val() + '",';
    datos += ' "fecha_rige_accpersonal":"' + $("#fechainiI").val() + '",';
    if (($("#fechafinI").val() == "") || ($("#SdireccionI").val() == null)) datos += '';
    else datos += ' "fecha_hasta_accpersonal":"' + $("#fechafinI").val() + '",';

    /*datos situacion propuesta traslados traspasos cambios adm subrrogaciones ingreso*/
    if (($("#SdireccionI").val() == "") || ($("#SdireccionI").val() == null)) datos += '';
    else datos += ' "nuevo_dir_estatuto_id":"' + $("#SdireccionI").val() + '",';
    if (($("#SprocesoI").val() == "") || ($("#SprocesoI").val() == null)) datos += '';
    else datos += ' "nuevo_proc_estatuto_id":"' + $("#SprocesoI").val() + '",';
    if (($("#SsubprocesoI").val() == "") || ($("#SsubprocesoI").val() == null)) datos += '';
    else datos += ' "nuevo_subprc_estatuto_id":"' + $("#SsubprocesoI").val() + '",';
    if (($("#SpuestoI").val() == "") || ($("#SpuestoI").val() == null)) datos += '';
    else datos += ' "nuevo_puesto_id":"' + $("#SpuestoI").val() + '",';
    if (($("#SgrupoI").val() == "") || ($("#SgrupoI").val() == null)) datos += '';
    else datos += ' "nuevo_cargo_ocupacional_id":"' + $("#SgrupoI").val() + '",';
    if (($("#SpuestoDistI").val() == "") || ($("#SpuestoDistI").val() == null)) datos += '';
    else datos += ' "actual_puesto_id":"' + $("#SpuestoDistI").val() + '",';
    if (($("#SislaI").val() == "") || ($("#SislaI").val() == null)) datos += '';
    else datos += ' "nuevo_isla_trabaja_id":"' + $("#SislaI").val() + '",';
    if ($("#rmuI").val() != "") datos += ' "nuevo_rmu":"' + $("#rmuI").val() + '",';

    datos += ' "observaciones":"' + $("#observacion_Ing").val() + '",';
    datos += ' "modalidad_laboral_id":"' + $("#SmodalidadI").val() + '",';

    datos = datos.substring(0, datos.length - 1);
    datos += '}';

    salida = th_update(datos, "SP_accPersonal", id_padre, "perfuncionarioaccionpersonal", id_accion);


    /*actualizacion de tabla ingresos*/
    /*se obtienen los campos del formulario que se actualizaran en la tabla per_funcionario*/
    parroquia = $('#SparrI').val();
    cproceso = $('#ScprocesoI').val();
    cprocesot = $("#ScprocesoI option:selected").text();
    cargof = $('#ScargoI').val();

    /*se obtienen los campos ids de las tablas que se actualizaran per_formulario y per_ingresos_acciones*/
    if (($("#SbaseLegalI").val() === "") || ($("#SbaseLegalI").val() === null)) {
        base_legal = ' "base_nombramiento_id":null,';
        base_legalI = ' "base_legal":null,';
    } else {
        base_legal = ' "base_nombramiento_id":"' + $("#SbaseLegalI").val() + '",';
        base_legalI = ' "base_legal":"' + $("#SbaseLegalI").val() + '",';
    }

    if ((parroquia === "") || (parroquia === null)) {
        parroquiaC = ' "parroquia_trabaja_id":null,';
        parroquiaCI = ' "parroquia_id":null,';
    } else {
        parroquiaC = ' "parroquia_trabaja_id":"' + parroquia + '",';
        parroquiaCI = ' "parroquia_id":"' + parroquia + '",';
    }

    if (($("#StipoAct").val() === "") || ($("#StipoAct").val() === null)) {
        tipo_actividad = ' "tipo_actividad":null,';
        tipo_actividadI = ' "tipo_actividad":null,';
    } else {
        tipo_actividad = ' "tipo_actividad":"' + $("#StipoAct option:selected").attr("valor") + '",';
        tipo_actividadI = ' "tipo_actividad":"' + $("#StipoAct option:selected").attr("valor") + '",';
    }

    datos1 = '{';
    datos1 += '"accionpersonal_id":"' + id_accion + '",';
    datos1 += base_legalI;
    datos1 += '"grado":"' + $("#gradoI").val() + '",';
    datos1 += '"escala":"' + $("#escalaI").val() + '",';
    datos1 += '"num_partidaInd":"' + $("#numPartIndI").val() + '",';
    datos1 += '"rmu":"' + $("#rmuI").val() + '",';
    datos1 += parroquiaCI;
    datos1 += tipo_actividadI;

    if ((cargof === "") || (cargof === null))
        datos1 += '"cargo_funcional_id":null,';
    else
        datos1 += '"cargo_funcional_id":"' + cargof + '",';

    if (($("#STipoGasto").val() == "") || ($("#STipoGasto").val() == null)) {
        datos1 += '"tipo_gasto_id":"",';
        datos1 += '"nombre_proyecto":"",';
    } else {
        datos1 += '"tipo_gasto_id":"' + $("#STipoGasto").val() + '",';
        datos1 += '"nombre_proyecto":"' + $("#nomProyectoI").val() + '",';
    }

    if (($("#ScprocesoI").val() === "") || ($("#ScprocesoI").val() === null)) datos1 += '"clasificacion_proceso_id":null,';
    else datos1 += '"clasificacion_proceso_id":"' + $("#ScprocesoI").val() + '",';
    if (($("#SmodalidadI").val() === "") || ($("#SmodalidadI").val() === null)) datos1 += '"modalidad_laboral_id":null,';
    else datos1 += '"modalidad_laboral_id":"' + $("#SmodalidadI").val() + '",';

    if ($("#fechainiI").val() != "") datos1 += '"fecha_desde":"' + $("#fechainiI").val() + '",';
    else datos1 += '"fecha_desde":null,';
    if ($("#fechafinI").val() != "") datos1 += '"fecha_hasta":"' + $("#fechafinI").val() + '",';
    else datos1 += '"fecha_hasta":null,';
    if ($("#observacion_razon").val() != "") datos1 += '"razon_salida":"' + $("#observacion_razon").val() + '",';
    else datos1 += '"razon_salida":null,';
    if ($("#observacion_Ing").val() != "") datos1 += '"observaciones":"' + $("#observacion_Ing").val() + '",';
    else datos1 += '"observaciones":null,';
    if ($("#SislaI").val() != "") datos1 += '"isla_id":"' + $("#SislaI").val() + '",';
    else datos1 += '"isla_id":null,';

    if ($("#bandIngSP").val() == 0)
        datos1 += '"estado_ejecucion":"C",';
    else
        datos1 += '"estado_ejecucion":"A",';

    datos1 = datos1.substring(0, datos1.length - 1);
    datos1 += '}';

    id = $("#idIngAccI").val();

    /*se verifica si es insert o update*/
    if ($("#bandIngSP").val() == 0)
        salida = th_insert(datos1, "SP_ingresos", id_padre, "peringresosacciones");
    else
        salida = th_update(datos1, "SP_ingresos", id_padre, "peringresosacciones", id);

}

/*metodo para buscar datos en tabla funcionario segun el parametro que se envie cedula/nombre /apellido*/
/*parametro dataIni rango de fechas para busqueda*/
function buscarIngresosParametros(dataIni) {

    data = '';
    if (dataIni) {
        data = data += "fecha_rige_accpersonal__range=" + dataIni;
    } else {
        desde = $("#FdesdeParamIng").val();
        hasta = $("#FhastaParamIng").val();

        if ((desde == "") || (hasta == ""))
            cadenaFecha = "";
        else
            cadenaFecha = "1";

        nombre = $("#nombreParamIng").val();
        cedula = $("#cedParamIng").val();

        if (cadenaFecha != "") {
            desdeArr = desde.split('/');
            hastaArr = hasta.split('/');

            fdesde = desdeArr[2] + "-" + desdeArr[0] + "-" + desdeArr[1];
            fhasta = hastaArr[2] + "-" + hastaArr[0] + "-" + hastaArr[1];
        }
        data = '';

        if (nombre != "")
            data = "funcionario_id__persona_id__nombre_completo__icontains=" + nombre + "&";

        if (cedula != "")
            data += "funcionario_id__persona_id__identificacion__icontains=" + cedula + "&";

        if (cadenaFecha != "")
            data += "fecha_rige_accpersonal__range=" + fdesde + "," + fhasta + "&";

        data = data.substring(0, data.length - 1);
    }

    $.ajax({
        url: "data_ingresosParam",
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
                    for (i = 0; i < data.length; i++) {
                        //console.log(data[i]);  // (o el campo que necesites)
                        tabla += "<tr>";
                        //tabla+="<td id='td_sancionFechaCreacion_"+data[i].id+"'>"+data[i].fecha_ingreso+"</td>";
                        tabla += "<td align='center' >" + data[i].fecha_ingreso + "</td>";

                        if (data[i].accionpersonal_otros != null)
                            tabla += "<td align='center' id='td_tipo_" + data[i].id + "'>" + data[i].accionpersonal_otros.descripcion + "</td>";
                        else
                            tabla += "<td align='center' id='td_tipo_" + data[i].id + "'>" + data[i].accionpersonal_id.descripcion + "</td>";

                        if (data[i].modalidad_laboral_id != null)
                            tabla += "<td align='left'   >" + data[i].modalidad_laboral_id.nombre + "</td>";
                        else
                            tabla += "<td align='left'   ></td>";

                        if (data[i].num_accion_personal == null)
                            tabla += "<td align='center' >NA</td>";
                        else
                            tabla += "<td align='center' >" + data[i].num_accion_personal + "</td>";

                        tabla += "<td align='center' >" + data[i].funcionario_id.persona_id.identificacion + "</td>";
                        tabla += "<td align='left'   >" + data[i].funcionario_id.persona_id.nombre_completo + "</td>";
                        tabla += "<td align='center' >" + data[i].funcionario_id.isla_trabaja_id.descripcion + "</td>";

                        tabla += "<td align='center' id='td_fecharige_" + data[i].id + "'>" + data[i].fecha_rige_accpersonal + "</td>";
                        if ($("#perm_change_peringresosacciones").val() == "1") {
                            tabla += "<td align='center'><a style='font-size: 18px; cursor: pointer;' href='#addEnIngresoI' data-stackbox='true' data-stackbox-width='800' data-stackbox-position='absolute' onclick='editIngresoSP(\"" + data[i].id + "\",\"" + data[i].estado_ejecucion + "\")' title='Editar Acción Personal'><i class='fa fa-edit text-green'></i></a></td>";
                        } else {
                            tabla += "<td> </td>";
                        }
                        tabla += "</tr>";
                    }
                }

                $('#tabla_ingreso_SP').dataTable().fnClearTable();
                $('#tabla_ingreso_SP').dataTable().fnDestroy();

                $("#bodytabla_ingreso_SP").html("");
                $("#bodytabla_ingreso_SP").append(tabla);

                var table = $('#tabla_ingreso_SP').DataTable({
                    //searching: false,
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

/*funcion para visualizar el historial de ingresos y salidas del funcionario*/
function verHistorialFunc() {
    id_funcionario = $("#idFuncionarioI").val();

    $("#tipot").val(1);

    $("#tituloP").html("Editar");

    $.ajax({
        url: "historial_ingreso",
        type: "get",
        cache: 'false',
        data: {
            "data": id_funcionario
        },
        dataType: "json",

        success: function(data) {
            if (data['error']) {
                if (data['error']['context'])
                    var salida = data['error']['context']['resource'][0].message;
                else
                    var salida = data['error']['message']
            } else {
                tabla = "";
                if (data.length > 0) {
                    for (i = 0; i < data.length; i++) {
                        //console.log(data['resource'][i].id);  // (o el campo que necesites)
                        fecha_finI = data[i].funcionario_id.fecha_hasta;
                        if (fecha_finI == null)
                            fecha_finI = '';

                        if (data[i].accionpersonal_id.descripcion == "INGRESO") {
                            fecha_iniI = data[i].fecha_rige_accpersonal;
                            fecha_finI = "";
                        } else {
                            fecha_finI = data[i].fecha_rige_accpersonal;
                            fecha_iniI = "";
                        }

                        if (data[i].modalidad_laboral_id != null)
                            modalidad = data[i].modalidad_laboral_id.nombre;
                        else
                            modalidad = "";

                        if (data[i].observaciones != null)
                            observaciones = data[i].observaciones;
                        else
                            observaciones = "";

                        if (data[i].nuevo_rmu != null)
                            nuevo_rmu = data[i].nuevo_rmu;
                        else
                            nuevo_rmu = "";

                        tabla += "<tr>";
                        tabla += "<td align='left' style='border: 1px solid black;'>" + modalidad + "</td>";
                        tabla += "<td align='left' style='border: 1px solid black;'>" + data[i].accionpersonal_id.descripcion + "</td>";
                        tabla += "<td align='center' style='border: 1px solid black;'>" + nuevo_rmu + "</td>";
                        tabla += "<td align='center' style='border: 1px solid black;'>" + fecha_iniI + "</td>";
                        tabla += "<td align='center' style='border: 1px solid black;'>" + fecha_finI + "</td>";
                        tabla += "<td align='center' style='border: 1px solid black;'>" + getDataArraySession('islas', '' + data[i].nuevo_isla_trabaja_id + '') + "</td>";
                        tabla += "<td align='left' style='border: 1px solid black;'>" + observaciones + "</td>";
                        tabla += "</tr>";
                    }
                }
                $("#bodyHist").html("");
                $("#bodyHist").append(tabla);
                $("#cont_hist").val(1);
            }
        },
        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
        },
    });

}

/* traslado */
/*funcion para limpiar formulario de ingreso y actualizacion de Traslado_SP*/
function limpiarFormTraslado_SP() {
    $("#verifica_init_traslado").val(1);
    $("#tituloTras").html("Crear");
    $('#idTraslado').val();
    $('#tipot_tras').val(0);
}

/*setea los datos del funcionario luego de seleccionar uno*/
function setDatosFuncionariTraslado(id) {
    var init = $("#verifica_init_traslado").val();
    if (init > 0) {
        funcionario = $("#SfuncionarioT option:selected").attr("funcionario");
        newF = funcionario.replace(/None/g, null)
        newF = newF.replace(/False/g, "'false'")
        newF = newF.replace(/True/g, "'true'")
        newF = newF.replace(/'/g, '"')

        var json = JSON.parse("[" + newF + "]");

        $("#ced_funcT").val(json[0].per_persona_by_persona_id["identificacion"]);

        body = " <tr>";
        body += " <td style='border: 1px solid black;'>" + json[0].direccion_estatuto + "</td>";
        body += " <td style='border: 1px solid black;'>" + json[0].proceso_estatuto + "</td>";
        body += " <td style='border: 1px solid black;'>" + json[0].subproceso_estatuto + "</td>";
        body += " <td style='border: 1px solid black;'>" + json[0].cargo_institucional + "</td>";
        body += " <td style='border: 1px solid black;'>" + json[0].cargo_funcionario + "</td>";
        body += "  <td style='border: 1px solid black;'>" + json[0].cargo_distributivo + "</td>";
        body += " </tr>";
        $("#tbody_puesto_act_trasp").html("");
        $("#tbody_puesto_act_trasp").append(body);
    }
}

/*funcion para asignar los datos al formulario*/
/*parametros id ---> id tabla , est_eje-->estado de ejecucion de la transaccion*/
function editTrasladoSP(id, est_eje) {

    if ((est_eje == "P") || (est_eje == "F"))
        $("#btn_accTraslado").hide();
    else
        $("#btn_accTraslado").show();
    /*inicializa los combos select*/
    iniciarComboDirecciones('SdireccionT', 'DIR', 'direcciones');
    iniciarComboDirecciones('SprocesoT', 'PRC', 'direcciones');
    iniciarComboDirecciones('SsubprocesoT', 'SPC', 'direcciones');
    iniciarCombo('SrolT', 'f', 'roles');
    iniciarCombo('ScargoT', 'f', 'cargos');

    $('.nav-tabs a[href="#tab_funcionarioT"]').tab('show');

    /*funcionario*/
    $("#idaccPerT").val(id);

    $.ajax({
        url: "data_traslados",
        type: "get",
        cache: 'false',
        data: {
            "data": id
        },
        dataType: "json",

        success: function(jsonA) {
            $("#modalLoadin").hide();
            if (jsonA['error']) {
                if (jsonA['error']['context'])
                    var salida = jsonA['error']['context']['resource'][0].message;
                else
                    var salida = jsonA['error']['message']
            } else {
                $("#idFuncionarioT").val(jsonA[0].funcionario_id.id);
                $("#nombre_funcT").val(jsonA[0].funcionario_id.persona_id.apellidos + ' ' + jsonA[0].funcionario_id.persona_id.nombres);
                $("#ced_funcT").val(jsonA[0].funcionario_id.persona_id.identificacion);
                $("#tipomovT").val(jsonA[0].accionpersonal_id.descripcion);
                $("#acc_PerT").val(jsonA[0].num_accion_personal);
                $("#fecha_accPerT").val(jsonA[0].fecha_accionpersonal);
                $("#num_memoT").val(jsonA[0].num_memo);

                if (jsonA[0].anexo_motivo != null) {
                    fileExtension2 = jsonA[0].anexo_motivo.split('.').pop();
                    fileExtension2 = fileExtension2.toLowerCase();
                    $("#nombreFile2SP").html(jsonA[0].anexo_motivo);
                    $("#nombreFile2SP").attr("href", path_archivos_accper + jsonA[0].anexo_motivo + "");
                    $("#nombreFile2SP").attr("target", "_blank");
                    if ((fileExtension2 == 'txt') || (fileExtension2 == 'log'))
                        $("#imgContentFile2SP").attr("src", "static/image/txt.png");
                    if ((fileExtension2 == 'doc') || (fileExtension2 == 'docx'))
                        $("#imgContentFile2SP").attr("src", "static/image/word.png");
                    if ((fileExtension2 == 'xls') || (fileExtension2 == 'xls'))
                        $("#imgContentFile2SP").attr("src", "static/image/excel.png");
                    if (fileExtension2 == 'pdf')
                        $("#imgContentFile2SP").attr("src", "static/image/pdf2.png");
                } else {
                    $("#nombreFile2SP").html("");
                    $("#imgContentFile2SP").attr("src", "");
                }
                /*datos generales*/
                tabla = '';
                tabla += "<tr>";
                tabla += "<td align='left' style='border: 1px solid black;background-color: #3c8dbc;color:white;'>Situacion<br>Actual</td>"
                tabla += "<td align='left' style='border: 1px solid black;'>" + $("#SdireccionT option[value='" + jsonA[0].actual_dir_estatuto_id + "']").text() + "</td>";
                tabla += "<td align='left' style='border: 1px solid black;'>" + $("#SprocesoT option[value='" + jsonA[0].actual_proc_estatuto_id + "']").text() + "</td>";
                tabla += "<td align='left' style='border: 1px solid black;'>" + $("#SsubprocesoT option[value='" + jsonA[0].actual_subprc_estatuto_id + "']").text() + "</td>";
                tabla += "<td align='left' style='border: 1px solid black;'>" + $("#SpuestoT option[value='" + jsonA[0].actual_puesto_id + "']").text() + "</td>";
                tabla += "<td align='left' style='border: 1px solid black;'>" + $("#SpuestoDistT option[value='" + jsonA[0].actual_cargo_ocupacional_id + "']").text() + "</td>";
                tabla += "</tr>";
                tabla += "<tr>";
                tabla += "<td align='left' style='border: 1px solid black;background-color: #3c8dbc;color:white;'>Situacion<br>Propuesta</td>"
                tabla += "<td align='left' style='border: 1px solid black;'>" + $("#SdireccionT option[value='" + jsonA[0].nuevo_dir_estatuto_id + "']").text() + "</td>";
                tabla += "<td align='left' style='border: 1px solid black;'>" + $("#SprocesoT option[value='" + jsonA[0].nuevo_proc_estatuto_id + "']").text() + "</td>";
                tabla += "<td align='left' style='border: 1px solid black;'>" + $("#SsubprocesoT option[value='" + jsonA[0].nuevo_subprc_estatuto_id + "']").text() + "</td>";
                tabla += "<td align='left' style='border: 1px solid black;'>" + $("#SpuestoT option[value='" + jsonA[0].nuevo_puesto_id + "']").text() + "</td>";
                tabla += "<td align='left' style='border: 1px solid black;'>" + $("#SpuestoDistT option[value='" + jsonA[0].nuevo_cargo_ocupacional_id + "']").text() + "</td>";
                tabla += "</tr>";

                $("#tbody_puesto_act_trasp").html("");
                $("#tbody_puesto_act_trasp").append(tabla);

                /*nuevo puesto*/
                $("#SdireccionT").val(jsonA[0].nuevo_dir_estatuto_id).trigger("change");
                $("#SprocesoT").val(jsonA[0].nuevo_proc_estatuto_id).trigger("change");
                $("#SsubprocesoT").val(jsonA[0].nuevo_subprc_estatuto_id).trigger("change");
                $("#SpuestoDistT").val(jsonA[0].nuevo_cargo_ocupacional_id).trigger("change");
                $("#SpuestoT").val(jsonA[0].nuevo_puesto_id).trigger("change");

                /*periodo*/
                /*se verifica si exsite registro en ingreso acciones*/
                if (jsonA[0].accpersonal_traspasos.length > 0) {
                    /*se setean los valores en los campos correspondientes de la tabla ingreso acciones*/
                    $("#bandTrasSP").val(1);
                    $("#idTrasAcc").val(jsonA[0].accpersonal_traspasos[0].id);
                    $("#ScargoT").val(jsonA[0].accpersonal_traspasos[0].id_cargo).trigger("change");
                    $("#observacion_tras").val(jsonA[0].accpersonal_traspasos[0].observaciones);
                } else {
                    /*caso contrario se limpian los campos del formulario de la tabla ingreso acciones*/
                    $("#bandIngSP").val(0);
                    $("#idIngAccI").val(0);

                    $("#num_memoT").val("");
                    $("#observacion_tras").val("");

                    $("#ScargoT").val("").trigger("change");
                    $("#nombreFile2SP").html("");
                    $("#imgContentFile2SP").attr("src", "");
                }
            }
        },
        error: function(data) {
            $("#modalLoadin").hide();
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
        },
    });
}

/*funcion para editar en la base de datos*/
/*el id se lo guarda en un campo oculto al momento de dar clik en editar*/
function saveEditTraslado_SP() {
    /*se obtienen los campos del formulario que se actualizaran en la tabla per_funcionario*/
    direccion = $('#SdireccionT').val();
    proceso = $('#SprocesoT').val();
    subproceso = $('#SsubprocesoT').val();
    puesto = $('#SpuestoT').val();
    ocupacional = $('#SpuestoDistT').val();
    cargo = $('#ScargoT').val();

    direccionT = $('#SdireccionT option:selected').text();
    procesoT = $('#SprocesoT option:selected').text();
    subprocesoT = $('#SsubprocesoT option:selected').text();

    /*se obtienen los campos ids de las tablas que se actualizaran per_formulario y per_ingresos_acciones*/
    id_funcionario = $("#idFuncionarioT").val();
    id_accion = $("#idaccPerT").val();

    id_padre = $('#content_traslado').parent().attr('id');

    /*se arma la cadena para actualizar per_funcionario*/
    datos = '{"cargo_funcional_id":"' + cargo + '"}';

    /*ingreso_acciones*/
    /*se obtienen los datos del formulario que se insertara o actualizara en la tabla per_ingresos_acciones*/
    num_memoT = $("#num_memoT").val();
    observacion = $("#observacion_tras").val();

    /*si == 0 se genera el id caso contratio se lo obtiene del campo oculto idIngAccI*/
    if ($("#bandTrasSP").val() == 0)
        id = uuidv4();
    else
        id = $("#idTrasAcc").val();

    id_padre = $('#content_traslado').parent().attr('id');

    datos1 = '{';
    datos1 += ' "accionpersonal_id":"' + id_accion + '",';
    if (num_memoT != "") datos1 += ' "num_memo":"' + num_memoT + '",';
    if (observacion != "") datos1 += ' "observaciones":"' + observacion + '",';
    if (cargo != "") datos1 += ' "id_cargo":"' + cargo + '",';


    if ($("#bandTrasSP").val() == 0)
        datos1 += ' "estado_ejecucion":"C",';
    else
        datos1 += ' "estado_ejecucion":"A",';

    datos1 = datos1.substring(0, datos1.length - 1);
    datos1 += '}';

    /*se verifica si es insert o update*/
    if ($("#bandTrasSP").val() == 0)
        salida = th_insert(datos1, "SP_traslados", id_padre, "pertraspasoacciones");
    else
        salida = th_update(datos1, "SP_traslados", id_padre, "pertraspasoacciones", id);
}


/*metodo para buscar datos en tabla funcionario segun el parametro que se envie cedula/nombre /apellido*/
function buscarTraspasoParametros(dataIni) {
    data = '';
    if (dataIni) {
        data = data += "fecha_rige_accpersonal__range=" + dataIni;
    } else {
        desde = $("#FdesdeParamTra").val();
        hasta = $("#FhastaParamTra").val();

        if ((desde == "") || (hasta == ""))
            cadenaFecha = "";
        else
            cadenaFecha = "1";

        nombre = $("#nombreParamTra").val();
        cedula = $("#cedParamTra").val();

        if (cadenaFecha != "") {
            desdeArr = desde.split('/');
            hastaArr = hasta.split('/');

            fdesde = desdeArr[2] + "-" + desdeArr[0] + "-" + desdeArr[1];
            fhasta = hastaArr[2] + "-" + hastaArr[0] + "-" + hastaArr[1];
        }
        data = '';

        if (nombre != "")
            data = "funcionario_id__persona_id__nombre_completo__icontains=" + nombre + "&";

        if (cedula != "")
            data += "funcionario_id__persona_id__identificacion__icontains=" + cedula + "&";

        if (cadenaFecha != "")
            data += "fecha_rige_accpersonal__range=" + fdesde + "," + fhasta + "&";

        data = data.substring(0, data.length - 1);
    }

    console.log(data);

    $.ajax({
        url: "data_trasladosParam",
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
                    for (i = 0; i < data.length; i++) {
                        num_accp_trasp = data[i].num_accion_personal;

                        tabla += "<tr>";
                        tabla += "<td align='center' >" + data[i].fecha_ingreso + "</td>";
                        if (num_accp_trasp == null) {
                            tabla += "<td align='center' > </td>";
                        } else {
                            tabla += "<td align='center' >" + data[i].num_accion_personal + "</td>";
                        }
                        tabla += "<td align='center' >" + data[i].funcionario_id.persona_id.identificacion + "</td>";
                        tabla += "<td align='left'   >" + data[i].funcionario_id.persona_id.nombre_completo + "</td>";
                        tabla += "<td align='center' >" + data[i].accionpersonal_id.descripcion + "</td>";
                        tabla += "<td align='center' >" + data[i].funcionario_id.isla_trabaja_id.descripcion + "</td>";
                        estado = "";
                        if (data[i].estado_ejecucion == 'C')
                            estado = "CREADA";
                        if ((data[i].estado_ejecucion == 'A') || (data[i].estado_ejecucion == 'P'))
                            estado = "EN EJECUCION";
                        if (data[i].estado_ejecucion == 'F')
                            estado = "FINALIZADA";

                        tabla += "<td align='center' >" + estado + "</td>";
                        tabla += "<td align='center' id='td_fecharige_" + data[i].id + "'>" + data[i].fecha_rige_accpersonal + "</td>";
                        if (data[i].alertaDiasrestantes == 'R')
                            span = '<span class="badge bg-red">' + data[i].fecha_hasta_accpersonal + '</span>'
                        if (data[i].alertaDiasrestantes == 'V')
                            span = '<span class="badge bg-green">' + data[i].fecha_hasta_accpersonal + '</span>'
                        if (data[i].alertaDiasrestantes == 'A')
                            span = '<span class="badge bg-yellow">' + data[i].fecha_hasta_accpersonal + '</span>'
                        if (data[i].alertaDiasrestantes == 'N')
                            span = '<span></span>'
                        tabla += "<td align='center'></td>";
                        tabla += "<td align='center' id='td_fechahasta_{{ accion.id }}' class='CellWithComment'>" + span + "<span class='CellComment'>" + data[i].diasrestantes + "</span></td>";

                        if (data[i].actual_puesto_id != null)
                            tabla += "<td align='center' >" + $("#SpuestoT option[value='" + data[i].actual_puesto_id + "']").text() + "</td>";
                        else
                            tabla += "<td align='center' ></td>";

                        if (data[i].nuevo_puesto_id != null)
                            tabla += "<td align='center' >" + $("#SpuestoT option[value='" + data[i].nuevo_puesto_id + "']").text() + "</td>";
                        else
                            tabla += "<td align='center' ></td>";

                        if (data[i].observacion != null) observ = data[i].observacion;
                        else observ = "";
                        tabla += "<td align='center' >" + observ + "</td>";

                        tabla += "<td align='center'><a style='font-size: 18px; cursor: pointer;' href='#addTraslado' data-stackbox='true' data-stackbox-width='800' data-stackbox-position='absolute' onclick='editTrasladoSP(\"" + data[i].id + "\",\"" + data[i].estado_ejecucion + "\")' title='Editar Acción Personal'><i class='fa fa-edit text-green'></i></a></td>";
                        tabla += "</tr>";
                    }
                }

                $('#tabla_traslado_SP').dataTable().fnClearTable();
                $('#tabla_traslado_SP').dataTable().fnDestroy();

                $("#bodytabla_traslado_SP").html("");
                $("#bodytabla_traslado_SP").append(tabla);

                var table = $('#tabla_traslado_SP').DataTable({
                    orderCellsTop: true,
                    "columnDefs": [{
                        "targets": [8, 10, 11, 12],
                        "visible": false
                    }]
                });

                $('#collapseTableT .toggle-vis').on('click', function(e) {
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
        },
    });
}

datosFuncPop = '';

/*Limpiar popup de funcionarios*/
function limpiaPopupFuncionario(pagina) {
    $("#nombresPopup").val("");
    document.getElementById('pagina_enviaPop').value = pagina;
    $('#tabla_PopupPersona').dataTable().fnClearTable();
    $('#tabla_PopupPersona').dataTable().fnDestroy();
    $("#body_PopupPersona").html("");
}

/*funcion para obtener los funcionarios en el popup*/
function getDataPersonaP() {
    nombre = $("#nombresPopup").val();
    pagina = $("#pagina_enviaPop").val();
    $.ajax({
        url: "funcionario_data",
        type: "get",
        data: {
            "data": nombre
        },
        dataType: "json",

        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
            } else {
                tabla = "";
                if (data.length > 0) {
                    for (i = 0; i < data.length; i++) {
                        if(data[i].estado == 'A'){ //Solo funcionarios Activos
                            tabla += "<tr>";
                            tabla += "<td align='left'>" + data[i].persona_id.identificacion + "</td>";
                            tabla += "<td align='left'>" + data[i].persona_id.nombre_completo + "</td>";
                            tabla += '<td align="center"><textarea id="td_funcionario_' + i + '" hidden>' + JSON.stringify(data[i]) + '</textarea> <a style="cursor: pointer; font-size: 20px;" title="Buscar" data-close-stackbox="true" onClick="getDataPersonaFuncionario(' + i + ',\'' + pagina + '\');"><i class="fa fa-plus-circle text-blue"></i></a></td>';
                            tabla += "</tr>";
                        }
                        
                    }
                }

                $('#tabla_PopupPersona').dataTable().fnClearTable();
                $('#tabla_PopupPersona').dataTable().fnDestroy();

                $("#body_PopupPersona").html("");
                $("#body_PopupPersona").append(tabla);

                var table = $('#tabla_PopupPersona').DataTable({
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
function getDataPersonaFuncionario(idx, pagina) {
    console.log(1223);
    funcionario = $("#td_funcionario_" + idx).val();
    newF = funcionario.replace(/None/g, null)
    newF = newF.replace(/False/g, "'false'")
    newF = newF.replace(/True/g, "'true'")
    newF = newF.replace(/'/g, '"')

    var json = JSON.parse("[" + newF + "]");
    if (pagina == 'SP_accPersonal')
        getDataSituacion(json);
    if (pagina == 'SP_sanciones')
        getDataSancion(json);
    if (pagina == 'cuentaBan')
        getDataCuentaBanc(json);
    if (pagina == 'personas')
        getDataPersonasFunc(json);
    if (pagina == 'personas2')
        getDataFuncFamiliar(json);
    if (pagina == 'SP_iniciarTramite')
        getDataFuncSolicitud(json);
    if (pagina == 'SP_asistencia')
        getDataFuncAsistencia(json);
    if (pagina == 'SP_ingresos')
        getDataFuncIngresos(json);
    if (pagina == 'solserv')
        getDataFuncSolserv(json);
    if (pagina == 'solserv2')
        getDataFuncSolservCustodio(json);
    if (pagina == 'solicitante_solserv')
        getDataFuncSolicitanteSolserv(json);
    if (pagina == 'administrador_equipo')
        getDataFuncEquipo(json);
    if (pagina == 'dueno_equipo')
        getDataFuncDuenoEquipo(json);
    if (pagina == 'newcustodio_solserv')
        getDataFuncNuevoCustodio(json);
    if (pagina == 'infobajasFunc')
        getDataFuncInfoBajas(json);
    if (pagina == 'infobajasFuncA')
        getDataFuncInfoBajasA(json);
    if (pagina == 'acta_visita')
        getDataFuncActaVisita(json);
    if (pagina == 'acta_Inspec')
        getDataFuncActa_Inspec(json);
    if (pagina == 'infonov_cuso')
        getDataFuncInfoNov_cuso(json);
    if (pagina == 'infomon_cuso')
        getDataFuncInfoMon_cuso(json);
    if (pagina == 'acta_retencion')
        insertDataFunActaRetencion(json);
    if (pagina == 'planpatrulla_resp1_cuso')
        getDataFuncElab1PP_cuso(json);
    if (pagina == 'planpatrulla_resp2_cuso')
        getDataFuncElab2PP_cuso(json);
    if (pagina == 'planpatrulla_aut_cuso')
        getDataFuncAutPP_cuso(json);
    if (pagina == 'planpatrulla_asig_cuso')
        getDataFuncAsigPP_cuso(json);
    if (pagina == 'cronograma_cuso')
        getDataFuncionarioActividad(json);
    if (pagina == 'controlper_cuso')
        getDataCronoActividadFuncionario(json);
    if (pagina == 'infodiario1_cuso')
        getDataFuncionarioInfoDiario(json,1);
    if (pagina == 'infodiario2_cuso')
        getDataFuncionarioInfoDiario(json,2);
    if (pagina == 'infodiario3_cuso')
        getDataFuncionarioInfoDiario(json,3);
    if (pagina == 'infodiario4_cuso')
        getDataFuncionarioInfoDiario(json,4);
    
    if (pagina == 'espIntro')
        getDataFuncionarioEspintro(json,"");
    if (pagina == 'espIntro2')
        getDataFuncionarioEspintro(json,2);
    if (pagina == 'espIntro3')
        getDataFuncionarioEspintro(json,3);
    if (pagina == 'espIntro4')
        getDataFuncionarioEspintro(json,4);
    if (pagina == 'espIntro5')
        getDataFuncionarioEspintro(json,5);
}


/*funcion para mapear los datos del funcionario en el formulario de ingresos*/
function getDataFuncSolserv(json) {
    $("#asignSolservST").val(json[0].persona_id.apellidos + ' ' + json[0].persona_id.nombres);
    $('#idasignSolservST').val(json[0].id);
    $("#cedasignSolservST").val(json[0].persona_id.identificacion);
}

/*funcion para mapear los datos del funcionario en el formulario de ingresos*/
function getDataFuncActaVisita(json) {
    $("#guardaparqueCUSO").val(json[0].persona_id.apellidos + ' ' + json[0].persona_id.nombres);
    $('#idguardaparqueCUSO').val(json[0].id);
    //$("#cedasignSolservST").val(json[0].persona_id.identificacion);
}

function getDataFuncActa_Inspec(json) {
    $("#guardaparqueCUSO").val(json[0].persona_id.apellidos + ' ' + json[0].persona_id.nombres);
    $('#idguardaparqueCUSO').val(json[0].id);
    //$("#cedasignSolservST").val(json[0].persona_id.identificacion);
}
function getDataFuncInfoBajas(json) {
    $("#funcIBST").val(json[0].persona_id.apellidos + ' ' + json[0].persona_id.nombres);
    $('#idfuncIBST').val(json[0].id);
    //$("#cedfuncIBST").val(json[0].persona_id.identificacion);
}

function getDataFuncInfoMon_cuso(json) {
    $("#funcionarioIM").val(json[0].persona_id.apellidos + ' ' + json[0].persona_id.nombres);
    $('#idfuncionarioIM').val(json[0].id);
    //$("#cedasignSolservST").val(json[0].persona_id.identificacion);
}
function getDataFuncInfoBajasA(json) {
    $("#funcAIBST").val(json[0].persona_id.apellidos + ' ' + json[0].persona_id.nombres);
    $('#idfuncAIBST').val(json[0].id);
    //$("#cedfuncIBST").val(json[0].persona_id.identificacion);
}

/*funcion para mapear los datos del funcionario en el formulario de ingresos*/
function getDataFuncSolservCustodio(json) {
    $("#cusSolservST").val(json[0].persona_id.apellidos + ' ' + json[0].persona_id.nombres);
    $('#idcusSolservST').val(json[0].id);
    $("#cedcusSolservST").val(json[0].persona_id.identificacion);
}

/*funcion para mapear los datos del funcionario en el formulario de ingresos*/
function getDataFuncEquipo(json) {
    $("#administradorEquipoST").val(json[0].persona_id.apellidos + ' ' + json[0].persona_id.nombres);
    $('#idadministradorEquipoST').val(json[0].id);
    $("#cedadministradorEquipoST").val(json[0].persona_id.identificacion);
}

function getDataFuncNuevoCustodio(json) {
    $("#ncusSolservST").val(json[0].persona_id.apellidos + ' ' + json[0].persona_id.nombres);
    $('#idncusSolservST').val(json[0].id);
    //$("#emailSolicSolservST").val(json[0].persona_id.identificacion);
}

/*funcion para mapear los datos del funcionario en el formulario de ingresos*/
function getDataFuncDuenoEquipo(json) {
    $("#duenoEquipoST").val(json[0].persona_id.apellidos + ' ' + json[0].persona_id.nombres);
    $('#idduenoEquipoST').val(json[0].id);
    $("#cedduenoEquipoST").val(json[0].persona_id.identificacion);
}

function getDataFuncSolicitanteSolserv(json) {
    $("#userSolicSolservST").val(json[0].persona_id.apellidos + ' ' + json[0].persona_id.nombres);
    $('#iduserSolicSolservST').val(json[0].id);
    $("#emailSolicSolservST").val(json[0].persona_id.identificacion);
}

function getDataFuncElab1PP_cuso(json) {
    $("#repon1PP").val(json[0].persona_id.apellidos + ' ' + json[0].persona_id.nombres);
    $('#idrepon1PP').val(json[0].id);
    //$("#cedasignSolservST").val(json[0].persona_id.identificacion);
}

function getDataFuncElab2PP_cuso(json) {
    $("#repon2PP").val(json[0].persona_id.apellidos + ' ' + json[0].persona_id.nombres);
    $('#idrepon2PP').val(json[0].id);
    //$("#cedasignSolservST").val(json[0].persona_id.identificacion);
}

function getDataFuncAutPP_cuso(json) {
    $("#autorizaPP").val(json[0].persona_id.apellidos + ' ' + json[0].persona_id.nombres);
    $('#idautorizaPP').val(json[0].id);
    //$("#cedasignSolservST").val(json[0].persona_id.identificacion);
}

function getDataFuncAsigPP_cuso(json) {
    $("#asignadoPP").val(json[0].persona_id.apellidos + ' ' + json[0].persona_id.nombres);
    $('#idasignadoPP').val(json[0].id);
    //$("#cedasignSolservST").val(json[0].persona_id.identificacion);
}




/*funcion para mapear los datos de la situacion actual del funcionario*/
function getDataSituacion(json) {

    var items = JSON.parse(sessionStorage.getItem("catalogos"));
    var data_filter = items.filter(element => element.categoria == "PARTIDA_GENERAL");
    partida = data_filter[0].valor;

    /*situacion Actual*/
    $("#funcionaioAcc").val(json[0].persona_id.nombre_completo);
    $("#funcionaioAccid").val(json[0].id);
    $("#funcionaioAccced").val(json[0].persona_id.identificacion)
    if (json[0].direccion_estatuto_id != null) $("#SsitdireSA").val(json[0].direccion_estatuto_id.id).trigger("change");
    if (json[0].proceso_estatuto_id != null) $("#SsitprocSA").val(json[0].proceso_estatuto_id.id).trigger("change");
    if (json[0].subproceso_estatuto_id != null) $("#SsitsubprocSA").val(json[0].subproceso_estatuto_id.id).trigger("change");
    if (json[0].cargo_ocupacional_id != null) $("#SsitgrupoSA").val(json[0].cargo_ocupacional_id.id).trigger("change");
    if (json[0].cargo_distributivo_id != null) $("#SsitpuestDistSA").val(json[0].cargo_distributivo_id.id).trigger("change");
    if (json[0].cargo_institucional_id != null) $("#SsitpuestInstSA").val(json[0].cargo_institucional_id.id).trigger("change");
    if (json[0].isla_trabaja_id != null) $("#SsitislaSA").val(json[0].isla_trabaja_id.id).trigger("change");
    if (json[0].rmu != null) $("#TrmuSA").val(json[0].rmu);
    if (json[0].partida_general != null && json[0].partida_individual != null) $("#TppresupSA").val(json[0].partida_general + "." + json[0].partida_individual);
    else $("#TppresupSA").val(partida + ".");

}

/*funcion para limpiar formulario de ingreso y actualizacion de SituacionActual*/
function limpiarDataSituacionActual(json) {

    /*situacion Actual*/
    $("#SsitdireSA").val("").trigger("change");
    $("#SsitprocSA").val("").trigger("change");
    $("#SsitsubprocSA").val("").trigger("change");
    $("#SsitgrupoSA").val("").trigger("change");
    $("#SsitpuestDistSA").val("").trigger("change");
    $("#SsitislaSA").val("").trigger("change");
    $("#TrmuSA").val("");
    $("#TppresupSA").val("");

}

/*funcion para limpiar formulario de ingreso y actualizacion de SituacionPropuesta*/
function limpiarDataSituacionPropuesta() {

    /*situacion Propuesta*/
    $("#SsitdireSP").val("").trigger("change");
    $("#SsitprocSP").val("").trigger("change");
    $("#SsitsubprocSP").val("").trigger("change");
    $("#SsitgrupoSP").val("").trigger("change");
    $("#SsitpuestDistSP").val("").trigger("change");
    $("#SsitislaSP").val("").trigger("change");
    $("#TrmuSP").val("");
    $("#TppresupSP").val("");

}


function copiarSituacionActual(json) {
    // Copia la situacion actual hacia la situacion propuesta

    limpiarDataSituacionPropuesta();
    /*situacion Propuesta*/
    $("#SsitdireSP").val($("#SsitdireSA").val()).trigger("change");
    $("#SsitprocSP").val($("#SsitprocSA").val()).trigger("change");
    $("#SsitsubprocSP").val($("#SsitsubprocSA").val()).trigger("change");
    $("#SsitgrupoSP").val($("#SsitgrupoSA").val()).trigger("change");
    $("#SsitpuestDistSP").val($("#SsitpuestDistSA").val()).trigger("change");
    $("#SsitislaSP").val($("#SsitislaSA").val()).trigger("change");
    $("#TrmuSP").val($("#TrmuSA").val());
    $("#TppresupSP").val($("#TppresupSA").val());

}

/*funcion para mapear los datos del funcionario en el formulario de ingresos*/
function getDataFuncIngresos(json) {
    $("#nombre_funcI").val(json[0].persona_id.apellidos + ' ' + json[0].persona_id.nombres);
    $('#idFuncionarioI').val(json[0].id);
    $("#ced_funcI").val(json[0].persona_id.identificacion)
}

/*funcion para mapear los datos del funcionario en el formulario de sanciones*/
function getDataSancion(json) {
    $("#funcionaioSanc").val(json[0].persona_id.apellidos + ' ' + json[0].persona_id.nombres);
    $('#funcionaioSanid').val(json[0].id);
    $("#funcionaioSanced").val(json[0].persona_id.identificacion)
}

/*funcion para mapear los datos del funcionario en el formulario de cuentas bancarias*/
function getDataCuentaBanc(json) {
    $("#funcionarioBanc").val(json[0].persona_id.apellidos + ' ' + json[0].persona_id.nombres);
    $("#funcionarioBancid").val(json[0].persona_id.id);
}

/*funcion para mapear los datos del funcionario en el formulario de solicitud*/
function getDataFuncSolicitud(json) {
    $("#nombrefuncionarioTra").val(json[0].persona_id.nombres + ' ' + json[0].persona_id.apellidos);
    $("#cedfuncionarioTrx").val(json[0].persona_id.identificacion);
    $("#idFunSolTramite").val(json[0].id);
}





/*funcion para ver el historial de traslados de un funcionario*/
function verHistorialTras() {
    id_funcionario = $("#idFuncionarioT").val();

    $("#tipot_tras").val(1);

    $.ajax({
        url: "historial_traspasos",
        type: "get",
        cache: 'false',
        data: {
            "data": id_funcionario
        },
        dataType: "json",

        success: function(data) {
            if (data['error']) {
                if (data['error']['context'])
                    var salida = data['error']['context']['resource'][0].message;
                else
                    var salida = data['error']['message']
            } else {
                tabla = "";
                if (data.length > 0) {
                    for (i = 0; i < data.length; i++) {
                        tabla += "<tr>";
                        tabla += "<td align='left' style='border: 1px solid black;'>" + $("#SdireccionT option[value='" + data[i].nuevo_dir_estatuto_id + "']").text() + "</td>";
                        tabla += "<td align='left' style='border: 1px solid black;'>" + $("#SprocesoT option[value='" + data[i].nuevo_proc_estatuto_id + "']").text() + "</td>";
                        tabla += "<td align='left' style='border: 1px solid black;'>" + $("#SsubprocesoT option[value='" + data[i].nuevo_subprc_estatuto_id + "']").text() + "</td>";
                        tabla += "<td align='left' style='border: 1px solid black;text-transform:uppercase;'>" + $("#SpuestoT option[value='" + data[i].nuevo_puesto_id + "']").text() + "</td>";
                        tabla += "<td align='left' style='border: 1px solid black;text-transform:uppercase;'>" + $("#SpuestoDistT option[value='" + data[i].nuevo_cargo_ocupacional_id + "']").text() + "</td>";
                        tabla += "<td align='left' style='border: 1px solid black;'>" + data[i].fecha_accionpersonal + "</td>";
                        tabla += "</tr>";
                    }
                }
                $("#bodyHistTr").html("");
                $("#bodyHistTr").append(tabla);
                $("#cont_histTr").val(1);
            }
        },
        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "Danger");
            console.log(JSON.stringify(data));
        },
    });

}

/* sanciones SP */
/*ocultar datos dependiendo del tipo de sancion q se seleccione*/
function ocultarEstadoSancion(id) {
    valor = $("#Stipo_faltaS option:selected").attr("valor");
    if (valor == "GRAVE") {
        if (id != "") {
            $('#trestadoSumario').show();
            $('#trlabelestadoSumario').show();

            dataIWantToShow = id;

            $('#SestadosumarioS').select2({
                templateResult: function(option) {
                    var myOption = $('#SestadosumarioS').find('option[value="' + option.id + '"]');
                    if (myOption.data('show') == dataIWantToShow) {
                        return option.text;
                    }
                    return false;
                }
            });
            $('#SestadosumarioS').val("").trigger("change");
        } else {
            $('#trestadoSumario').hide();
            $('#trlabelestadoSumario').hide();
        }
    }
}

/*ocultar datos dependiendo del tipo de sancion q se seleccione*/
function ocultarSumario(id) {
    valor = $("#Stipo_faltaS option:selected").attr("valor");
    if (valor == "GRAVE") {
        $("#SsumarioS").val("").trigger("change");
        $("#tdSsumarioS").show();
        $("#tdSsumarioSLabel").show();
    } else {
        $("#tdSsumarioS").hide();
        $("#tdSsumarioSLabel").hide();
        $('#trestadoSumario').hide();
        $('#trlabelestadoSumario').hide();
    }
}

/*funcion para limpiar formulario de ingreso y actualizacion de SancionS*/
function limpiarFormSancionS() {
    clearForm(frm_sancionS);
    $("#verifica_init_sancion").val(1);
    $("#tituloSanS").html("Crear");
    $('#idsancionS').val();
    $('#tipot_sancS').val(0);
    $("#nombreFileSP").html("");
    $("#imgContentFileSP").attr("src", "");

    iniciarCombo('SsancionS', 'f', 'sanciones');
    $("#anioSP").val(currentYear = (new Date).getFullYear());
    var d = new Date();
    var n = d.getMonth();
    $("#SmesS").val((n + 1)).trigger("change");
}

/*funcion para verificar si se realiza una insercion o una actualizacion*/
/*el valor del if se llena con 0 cuando se da click en el boton nuevo y con 1 cuando se da clik en editar*/
function setInsertUpdateSancion_SP() {
    valida = validaContenedor("addSancionSP");
    if (valida) {
        if ($("#tipot_sancS").val() == 0)
            insertarTablaSancion_SP();
        else
            saveEditSancion_SP();
    }
}


/*Muestra datos sancion en formulario*/
/*funcion para asignar los datos al formulario*/
/*parametros id ---> id tabla*/
function editSancion_SP(id) {

    $("#tipot_sancS").val(1);
    $("#tituloSanS").html("Editar");
    $("#idsancionS").val(id);

    iniciarCombo('SsancionS', 'f', 'sanciones');

    $.ajax({
        url: "data_sanciones",
        type: "get",
        cache: 'false',
        data: {
            "data": id
        },
        dataType: "json",

        success: function(json) {
            $("#modalLoadin").hide();
            if (json['error']) {
                if (json['error']['context'])
                    var salida = json['error']['context']['resource'][0].message;
                else
                    var salida = json['error']['message']
            } else {
                $("#funcionaioSanc").val(json[0].funcionario_id.persona_id.nombre_completo);
                $("#funcionaioSanid").val(json[0].funcionario_id.id);
                $("#funcionaioSanced").val(json[0].funcionario_id.persona_id.identificacion);
                $("#anioSP").val(json[0].anio_sancion);
                $("#SmesS").val(json[0].mes_sancion).trigger("change");
                if (json[0].regimen_laboral_id != "") $("#SregimenS").val(json[0].regimen_laboral_id.id).trigger("change");
                else $("#SregimenS").val();
                if (json[0].tipo_falta_id != "") $("#Stipo_faltaS").val(json[0].tipo_falta_id.id).trigger("change");
                else $("#Stipo_faltaS").val();
                if (json[0].sancion_id != "") $("#SsancionS").val(json[0].sancion_id.id).trigger("change");
                else $("#SsancionS").val();

                /*codigo usado para mostrar icono de archivo en caso de tener*/
                if (json[0].file_memo != null) {
                    fileExtension = json[0].file_memo.split('.').pop();
                    fileExtension = fileExtension.toLowerCase();
                    /*verificsa la extension del archivo*/
                    $("#link_sanciones").html(json[0].file_memo);
                    $("#link_sanciones").attr("href", path_archivos_accper + json[0].file_memo + "");
                    $("#link_sanciones").attr("target", "_blank");
                    if ((fileExtension == 'txt') || (fileExtension == 'log'))
                        $("#imgContentFileSP").attr("src", "static/image/txt.png");
                    if ((fileExtension == 'doc') || (fileExtension == 'docx'))
                        $("#imgContentFileSP").attr("src", "static/image/word.png");
                    if ((fileExtension == 'xls') || (fileExtension == 'xls'))
                        $("#imgContentFileSP").attr("src", "static/image/excel.png");
                    if (fileExtension == 'pdf')
                        $("#imgContentFileSP").attr("src", "static/image/pdf2.png");
                } else {
                    $("#link_sanciones").html("");
                    $("#imgContentFileSP").attr("src", "");
                }

                if (json[0].aplica_sumario_adm == false)
                    sumarioVal = 'f';
                else
                    sumarioVal = 't';

                $("#SsumarioS").val(sumarioVal).trigger("change");
                $("#SestadosumarioS").val(json[0].estado_sumario_adm).trigger("change");
                $("#num_memoS").val(json[0].num_memo);
                $("#observacion_SP").val(json[0].observaciones);
            }
        },
        error: function(data) {
            $("#modalLoadin").hide();
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));

        },
    });
}

/*funcion para editar en la base de datos*/
/*el id se lo guarda en un campo oculto al momento de dar clik en editar*/
function saveEditSancion_SP() {

    funcionario = $('#funcionaioSanid').val();
    anio = $('#anioSP').val();
    mes = $('#SmesS').val();
    regimenLab = $('#SregimenS').val();
    tipoFalta = $('#Stipo_faltaS').val();
    sancion = $('#SsancionS').val();
    SsumarioS = $('#SsumarioS').val();
    num_memo = $('#num_memoS').val();
    observacion = $('#observacion_SP').val();
    estado_sumario_adm = $("#SestadosumarioS").val();

    fecha_sancion = anio + '-' + mes + '-01';

    file = $('#memoSP')[0].files[0];

    if (!file) {
        fileExtension = "";
        salida = 1;
        cadenaImg = '';
    } else {
        fileExtension = file.name.split('.').pop();
        salida = ValidateExt(fileExtension);
        cadenaImg = '"file_memo":"' + file.name + '",';
    }

    fileExtension = fileExtension.toLowerCase();

    id = $("#idsancionS").val();

    id_padre = $('#content_sancionS').parent().attr('id');

    if (salida == 0) {
        validaContenedorExt("addSancionSP", "Extension de archivo no valida");
        var $el = $('#memoSP');
        $el.wrap('<form>').closest('form').get(0).reset();
        $el.unwrap();
        return 0;
    }

    valor = $("#Stipo_faltaS option:selected").attr("valor");
    dataSumario = "";
    if (valor == 'GRAVE') {
        dataSumario = ',"aplica_sumario_adm":"' + SsumarioS + '"';
        dataSumario += ',"estado_sumario_adm":"' + estado_sumario_adm + '"';
    } else {
        dataSumario = ',"aplica_sumario_adm":null';
        dataSumario += ',"estado_sumario_adm":null';
    }

    /*se arma la cadena y se envia al metodo ws*/
    datos = '{"funcionario_id":"' + funcionario + '", "tipo_falta_id":"' + tipoFalta + '", ' + cadenaImg + ' "sancion_id":"' + sancion + '", "regimen_laboral_id":"' + regimenLab + '", "anio_sancion":"' + anio + '", "mes_sancion":"' + mes + '", "num_memo":"' + num_memo + '","observaciones":"' + observacion + '" ,"fecha_sancion":"' + fecha_sancion + '" ' + dataSumario + '}';
    salida = th_update(datos, "SP_sanciones", id_padre, "perfuncionariosanciones", id);

    /*se actualiza los datos del objeto $("#td_datos_"+id) para no refrescar la pagina*/
    if (file)
        upload_file("frm_sancionS");

    $("#td_tipo_" + id).html($("#Stipo_faltaS option:selected").text());
    $("#td_sancion_" + id).html($("#SsancionS option:selected").text());
    $("#td_anio_" + id).html($("#anioSP").val());
    $("#td_mes_" + id).html($("#SmesS").val());
}

/*funcion para insertar en la base de datos*/
function insertarTablaSancion_SP() {

    funcionario = $('#funcionaioSanid').val();
    anio = $('#anioSP').val();
    mes = $('#SmesS').val();
    regimenLab = $('#SregimenS').val();
    tipoFalta = $('#Stipo_faltaS').val();
    sancion = $('#SsancionS').val();
    SsumarioS = $('#SsumarioS').val();
    estadoSsumarioS = $('#SestadosumarioS').val();
    num_memo = $('#num_memoS').val();
    observacion = $('#observacion_SP').val();

    fecha_sancion = anio + '-' + mes + '-01';

    //agregar el campo estado sumario  validar q solo inserte esos campos cuando es grave la sancion

    valor = $("#Stipo_faltaS option:selected").attr("valor");
    dataSumario = "";
    if (valor == 'GRAVE') {
        dataSumario = ',"aplica_sumario_adm":"' + SsumarioS + '"';
        dataSumario += ',"estado_sumario_adm":"' + estadoSsumarioS + '"';
    } else {
        dataSumario = '';
    }

    file = $('#memoSP')[0].files[0];

    if (!file) {
        fileExtension = "";
        salida = 1;
        cadenaImg = '';
    } else {
        fileExtension = file.name.split('.').pop();
        salida = ValidateExt(fileExtension);
        cadenaImg = '"file_memo":"' + file.name + '",';
    }

    if (salida == 0) {
        validaContenedorExt("addSancionSP", "Extension de archivo no valida");
        var $el = $('#memoSP');
        $el.wrap('<form>').closest('form').get(0).reset();
        $el.unwrap();
        return 0;
    }

    id_padre = $('#content_sancionS').parent().attr('id');
    datos = '{"funcionario_id":"' + funcionario + '", "tipo_falta_id":"' + tipoFalta + '", ' + cadenaImg + ' "sancion_id":"' + sancion + '", "regimen_laboral_id":"' + regimenLab + '", "anio_sancion":"' + anio + '", "mes_sancion":"' + mes + '", "num_memo":"' + num_memo + '", "observaciones":"' + observacion + '" ,"fecha_sancion":"' + fecha_sancion + '" ' + dataSumario + '}';

    if (file)
        upload_file("frm_sancionS");

    th_insert(datos, "SP_sanciones", id_padre, "perfuncionariosanciones");

}

/*funcion para eliminar(cambio de estado en la base de datos)*/
function deleteSancionesSP(id) {
    id_padre = $('#content_sancionS').parent().attr('id');
    datos = '{"estado":"I","eliminado":"t"}';
    th_delete(datos, "SP_sanciones", id_padre, "perfuncionariosanciones", id);
}


/*metodo para buscar datos en tabla funcionario sanciones segun el parametro que se envie cedula/nombre /apellido*/
function buscarSancionesParametros(dataIni) {
    $("#modalLoadin").show();
    data = '';
    if (dataIni) {
        //data = data+= "fecha_ingreso__range="+dataIni;
        data = data += "fecha_sancion__range=" + dataIni;
    } else {
        desde = $("#FdesdeParamSan").val();
        hasta = $("#FhastaParamSan").val();

        if ((desde == "") || (hasta == ""))
            cadenaFecha = "";
        else
            cadenaFecha = "1";

        nombre = $("#nombreParamSan").val();
        cedula = $("#cedParamSan").val();

        if (cadenaFecha != "") {
            desdeArr = desde.split('-');
            hastaArr = hasta.split('-');

            fdesde = desdeArr[1] + "-" + desdeArr[0] + "-01";
            fhasta = hastaArr[1] + "-" + hastaArr[0] + "-28";
        }
        data = '';

        if (nombre != "")
            data = "funcionario_id__persona_id__nombre_completo__icontains=" + nombre + "&";

        if (cedula != "")
            data += "funcionario_id__persona_id__identificacion__icontains=" + cedula + "&";

        if (cadenaFecha != "")
            data += "fecha_sancion__range=" + fdesde + "," + fhasta + "&";

        data = data.substring(0, data.length - 1);
    }

    console.log(data);

    $.ajax({
        url: "data_sancionesParam",
        type: "get",
        data: {
            "data": data
        },
        dataType: "json",

        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
                $("#modalLoadin").hide();
            } else {

                tabla = "";
                if (data.length > 0) {
                    for (i = 0; i < data.length; i++) {
                        tabla += "<tr>";
                        tabla += "<td>2060002010001</td>";
                        tabla += "<td>Ejecutiva</td>";
                        tabla += "<td>Dirección Parque Nacional Galápagos</td>";
                        tabla += "<td id='td_nombre_" + data[i].id + "'>" + data[i].funcionario_id.persona_id.identificacion + "</td>";
                        tabla += "<td id='td_ident_" + data[i].id + "'>" + data[i].funcionario_id.persona_id.nombre_completo + "</td>";
                        tabla += "<td id='td_tipo_" + data[i].id + "'>" + data[i].tipo_falta_id.label + "</td>";
                        tabla += "<td id='td_sancion_" + data[i].id + "'>" + data[i].sancion_id.descripcion + "</td>";
                        if (data[i].funcionario_id.modalidad_laboral_id != null)
                            tabla += "<td>" + data[i].funcionario_id.modalidad_laboral_id.nombre + "</td>";
                        else
                            tabla += "<td></td>";
                        tabla += "<td id='td_anio_" + data[i].id + "'>" + data[i].anio_sancion + "</td>";
                        tabla += "<td id='td_mes_" + data[i].id + "'>" + data[i].mes_sancion + "</td>";
                        if (data[i].tipo_falta_id.label == 'LEVE') {
                            tabla += "<td>NO</td>";
                            tabla += "<td>NO APLICA</td>";
                        } else {
                            if (data[i].aplica_sumario_adm == "true")
                                tabla += "<td>SI</td>";
                            else
                                tabla += "<td>NO</td>";

                            if (data[i].estado_sumario_adm == "0")
                                tabla += "<td>NO APLICA</td>";
                            else if (data[i].estado_sumario_adm == "1")
                                tabla += "<td>EN TRAMITE</td>";
                            else if (data[i].estado_sumario_adm == "2")
                                tabla += "<td>CULMINADO</td>";
                            else
                                tabla += "<td></td>";
                        }

                        if ($("#perm_change_perfuncionariosanciones").val() == "1") {
                            tabla += "<td align='center'><a href='#addSancionSP' data-stackbox='true' data-stackbox-position='absolute' data-stackbox-width='800' onclick='editSancion_SP(\"" + data[i].id + "\")'><i class='fa fa-edit text-green'></i></a> </td>";
                        } else {
                            tabla += "<td> </td>";
                        }

                        if ($("#perm_delete_perfuncionariosanciones").val() == "1") {
                            tabla += "<td align='center'><a onclick='deleteModal(\"" + data[i].id + "\",\"SP_sanciones\");'><i class='fa fa-trash text-green'></i></a></td>";
                        } else {
                            tabla += "<td> </td>";
                        }


                        tabla += "</tr>";
                    }
                }

                $('#tabla_sancionesS').dataTable().fnClearTable();
                $('#tabla_sancionesS').dataTable().fnDestroy();

                $("#bodytabla_sancionesS").html("");
                $("#bodytabla_sancionesS").append(tabla);

                var table = $('#tabla_sancionesS').DataTable({
                    orderCellsTop: true,
                    "columnDefs": [{
                        "targets": [0, 1, 2],
                        "visible": false
                    }]
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

//Licencia SP
/*funcion para asignar los datos al formulario*/
/*parametros id ---> id tabla , est_eje-->estado de ejecucion de la transaccion*/
function editLicenciaSP(id, est_eje) {

    if ((est_eje == "P") || (est_eje == "F"))
        $("#btn_accLicencia").hide();
    else
        $("#btn_accLicencia").show();

    $("#bandLicSP").val(1);
    $("#idaccPerL").val(id);

    $.ajax({
        url: "data_licencias",
        type: "get",
        cache: 'false',
        data: {
            "data": id
        },
        dataType: "json",

        success: function(jsonA) {
            $("#modalLoadin").hide();
            if (jsonA['error']) {
                if (jsonA['error']['context'])
                    var salida = jsonA['error']['context']['resource'][0].message;
                else
                    var salida = jsonA['error']['message']
            } else {
                $("#idFuncionarioL").val(jsonA[0].funcionario_id.id);
                $("#nombre_funcLic").val(jsonA[0].funcionario_id.persona_id.apellidos + ' ' + jsonA[0].funcionario_id.persona_id.nombres);
                $("#fecha_accPL").val(jsonA[0].fecha_accionpersonal);
                $("#num_accPerL").val(jsonA[0].descripcion);

                $("#fechaDesdeL").val(jsonA[0].fecha_rige_accpersonal);
                $("#fechaFinL").val(jsonA[0].fecha_hasta_accpersonal);
                $("#memoL").val(jsonA[0].num_memo);

                arrFecha = jsonA[0].fecha_rige_accpersonal.split('-');
                //$("#infTecL").val('GTH-'+jsonA[0].num_accion_personal+'-'+arrFecha[0]);

                if (jsonA[0].anexo_motivo != null) {
                    fileExtension = jsonA[0].anexo_motivo.split('.').pop();
                    fileExtension = fileExtension.toLowerCase();

                    //$("#nombreFileLicSP").html(jsonA[0].accpersonal_licencias[0].archivo_accpersonal);
                    $("#nombreFileLic1SP").html(jsonA[0].anexo_motivo);
                    $("#nombreFileLic1SP").attr("href", path_archivos_accper + jsonA[0].anexo_motivo + "");
                    $("#nombreFileLic1SP").attr("target", "_blank");

                    if ((fileExtension == 'txt') || (fileExtension == 'log') || (fileExtension == 'TXT'))
                        $("#imgContentFileLic1SP").attr("src", "static/image/txt.png");
                    if ((fileExtension == 'doc') || (fileExtension == 'docx'))
                        $("#imgContentFileLic1SP").attr("src", "static/image/word.png");
                    if ((fileExtension == 'xls') || (fileExtension == 'xls'))
                        $("#imgContentFileLic1SP").attr("src", "static/image/excel.png");
                    if (fileExtension == 'pdf')
                        $("#imgContentFileLic1SP").attr("src", "static/image/pdf2.png");
                } else {
                    $("#nombreFileLic1SP").html("");
                    $("#imgContentFileLic1SP").attr("src", "");
                }

                $('#estadoEjeL [valor="' + jsonA[0].estado_ejecucion + '"]').prop("selected", true).trigger("change");
                $("#obser_lic").val(jsonA[0].descripcion_motivo);

                if (jsonA[0].accionpersonal_otros != null) {
                    $("#SmotivoL").html(jsonA[0].accionpersonal_otros.descripcion.toUpperCase());
                    $("#textmotivoL").val(jsonA[0].accionpersonal_otros.id);
                } else {
                    $("#SmotivoL").html(jsonA[0].accionpersonal_id.descripcion.toUpperCase());
                    $("#textmotivoL").val(jsonA[0].accionpersonal_id.id);
                }

                if (jsonA[0].accionpersonal_otros != null) {
                    if (jsonA[0].accionpersonal_otros.con_remuneracion == 1)
                        con_remun = 'SI';
                    else
                        con_remun = 'NO';
                } else con_remun = 'SI';

                $("#SconRemL").html(con_remun);

                if (jsonA[0].accionpersonal_otros != null) {
                    if ((jsonA[0].accionpersonal_otros.id == "7f286668-a587-422b-bbab-d7aa92408df9") || (jsonA[0].accionpersonal_otros.id == "7f286668-a587-422b-bbab-d7aa92408d10")) {
                        $("#div_enfAccLic").show();
                        if (jsonA[0].accionpersonal_otros.id == "7f286668-a587-422b-bbab-d7aa92408df9") {
                            $("#div_licEnf").show();
                            $("#div_licAcc").hide();
                        } else {
                            $("#div_licEnf").hide();
                            $("#div_licAcc").show();
                        }
                    } else
                        $("#div_enfAccLic").hide();
                }

                if (jsonA[0].accpersonal_licencias.length > 0) {
                    $("#idlicenciaL").val(jsonA[0].accpersonal_licencias[0].id);
                    $("#infTecL").val(jsonA[0].accpersonal_licencias[0].num_informe_tec);
                    $("#enfermedadL").val(jsonA[0].accpersonal_licencias[0].enfermedad);
                    $("#Stipo_enfL").val(jsonA[0].accpersonal_licencias[0].enfermedad_tipo_id).trigger("change");
                    $("#accidenteL").val(jsonA[0].accpersonal_licencias[0].accidente);
                    $("#Stipo_accL").val(jsonA[0].accpersonal_licencias[0].accidente_tipo_id).trigger("change");
                }
            }
        },
        error: function(data) {
            $("#modalLoadin").hide();
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));

        },
    });
}

/*funcion para verificar si se realiza una insercion o una actualizacion*/
/*el valor del if se llena con 0 cuando se da click en el boton nuevo y con 1 cuando se da clik en editar*/
function setInsertUpdateLicencia_SP() {

    /*se obtienen los datos del formulario que se insertara o actualizara en la tabla per_ingresos_acciones*/
    infTec = $("#infTecL").val();
    memo = $("#memoL").val();
    conRemu = $("#SconRemL").html();

    if (conRemu == 'SI')
        conRemu = "true";
    else
        conRemu = "false";

    enfermedad = $("#enfermedadL").val();
    enfermedad_tipo = $("#Stipo_enfL").val();
    accidente = $("#accidenteL").val();
    accidente_tipo = $("#Stipo_accL").val();

    /*en elk caso de vacio se asigna nulo para q no de error al insertar en el webservice*/
    cadenaEnf = '';
    cadenaEnfT = '';
    cadenaAcc = '';
    cadenaAccT = '';

    if (enfermedad != "") cadenaEnf = '"enfermedad":"' + enfermedad + '",';
    else cadenaEnf = '"enfermedad":"",';
    if (enfermedad_tipo != "") cadenaEnfT = '"enfermedad_tipo_id":"' + enfermedad_tipo + '",';
    else cadenaEnfT = '"enfermedad_tipo_id":null,';
    if (accidente != "") cadenaAcc = '"accidente":"' + accidente + '",';
    else cadenaAcc = '"accidente":"",';
    if (accidente_tipo != "") cadenaAccT = '"accidente_tipo_id":"' + accidente_tipo + '",';
    else cadenaAccT = '"accidente_tipo_id":null,';

    id_accion = $("#idaccPerL").val();

    id = $("#idlicenciaL").val();

    id_padre = $('#content_licenciaL').parent().attr('id');

    datos1 = '{';
    datos1 += ' "accpersonal_id":"' + id_accion + '",';
    if (infTec != "") datos1 += ' "num_informe_tec":"' + infTec + '",';
    else datos1 += ' "num_informe_tec":"",';
    if (memo != "") datos1 += ' "num_memo":"' + memo + '",';
    else datos1 += ' "num_memo":"",';
    if (conRemu != "") datos1 += ' "con_remuneracion":"' + conRemu + '",';
    else datos1 += ' "con_remuneracion":null,';

    datos1 += ' "motivo_lic":"' + $("#textmotivoL").val() + '",';
    datos1 += cadenaEnf;
    datos1 += cadenaEnfT;
    datos1 += cadenaAcc;
    datos1 += cadenaAccT;

    datos1 = datos1.substring(0, datos1.length - 1);
    datos1 += '}';

    /*se verifica si es insert o update*/
    if (id == "")
        salida = th_insert(datos1, "SP_licencias", id_padre, "perlicenciaacciones");
    else
        salida = th_update(datos1, "SP_licencias", id_padre, "perlicenciaacciones", id);

    $("#td_informeLic_" + id_accion).html(infTec);
}

/*metodo para buscar datos en tabla funcionario segun el parametro que se envie cedula/nombre /apellido*/
/*dataIni rango de fechas a buscar*/
function buscarLicenciaParametros(dataIni) {
    data = '';
    if (dataIni) {
        data = data += "fecha_rige_accpersonal__range=" + dataIni;
    } else {
        desde = $("#FdesdeParamLic").val();
        hasta = $("#FhastaParamLic").val();

        if ((desde == "") || (hasta == ""))
            cadenaFecha = "";
        else
            cadenaFecha = "1";

        nombre = $("#nombreParamLic").val();
        cedula = $("#cedParamLic").val();

        if (cadenaFecha != "") {
            desdeArr = desde.split('/');
            hastaArr = hasta.split('/');

            fdesde = desdeArr[2] + "-" + desdeArr[0] + "-" + desdeArr[1];
            fhasta = hastaArr[2] + "-" + hastaArr[0] + "-" + hastaArr[1];
        }
        data = '';

        if (nombre != "")
            data = "funcionario_id__persona_id__nombre_completo__icontains=" + nombre + "&";

        if (cedula != "")
            data += "funcionario_id__persona_id__identificacion__icontains=" + cedula + "&";

        if (cadenaFecha != "")
            data += "fecha_rige_accpersonal__range=" + fdesde + "," + fhasta + "&";

        data = data.substring(0, data.length - 1);
    }

    console.log(data);

    $.ajax({
        url: "data_licenciasParam",
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
                    for (i = 0; i < data.length; i++) {

                        fdesde_arr = data[i].fecha_rige_accpersonal;
                        desdeArr_aux = fdesde_arr.split('-');
                        num_accp = data[i].num_accion_personal;

                        tabla += "<tr>";
                        if (num_accp == null) {
                            tabla += "<td align='center' > </td>";
                        } else {
                            tabla += "<td align='center' >" + data[i].num_accion_personal + "</td>";
                        }

                        if (data[i].accpersonal_licencias.length > 0)
                            tabla += "<td align='center' id='td_informeLic_" + data[i].id + "'>" + data[i].accpersonal_licencias[0].num_informe_tec + "</td>";
                        else
                            tabla += "<td align='center' id='td_informeLic_" + data[i].id + "'></td>";

                        tabla += "<td align='center' >" + data[i].funcionario_id.persona_id.identificacion + "</td>";
                        tabla += "<td align='left'   >" + data[i].funcionario_id.persona_id.nombre_completo + "</td>";
                        if (data[i].accionpersonal_otros != null) {
                            if (data[i].accionpersonal_otros.con_remuneracion == "1")
                                tabla += "<td align='center'>SI</td>";
                            else
                                tabla += "<td align='center'>NO</td>";
                            tabla += "<td align='left' id='td_motivoLic_" + data[i].id + "'>" + data[i].accionpersonal_otros.descripcion + "</td>";
                        } else {
                            tabla += "<td align='center'>SI</td>";
                            tabla += "<td align='left' id='td_motivoLic_" + data[i].id + "'></td>";
                        }

                        //tabla+="<td align='left' id='td_motivoLic_"+data[i].id+"'>"+data[i].accionpersonal_otros.descripcion+"</td>";

                        estado = "";
                        if (data[i].estado_ejecucion == 'C')
                            estado = "CREADA";
                        if ((data[i].estado_ejecucion == 'A') || (data[i].estado_ejecucion == 'P'))
                            estado = "EN EJECUCION";
                        if (data[i].estado_ejecucion == 'F')
                            estado = "FINALIZADA";

                        tabla += "<td align='center' >" + estado + "</td>";
                        tabla += "<td align='center' >" + data[i].funcionario_id.isla_trabaja_id.descripcion + "</td>";
                        tabla += "<td align='center' id='td_fecharige_" + data[i].id + "'>" + data[i].fecha_rige_accpersonal + "</td>";
                        if (data[i].alertaDiasrestantes == 'R')
                            span = '<span class="badge bg-red">' + data[i].fecha_hasta_accpersonal + '</span>'
                        if (data[i].alertaDiasrestantes == 'V')
                            span = '<span class="badge bg-green">' + data[i].fecha_hasta_accpersonal + '</span>'
                        if (data[i].alertaDiasrestantes == 'A')
                            span = '<span class="badge bg-yellow">' + data[i].fecha_hasta_accpersonal + '</span>'
                        if (data[i].alertaDiasrestantes == 'N')
                            span = '<span></span>'
                        tabla += "<td align='center' id='td_fechahasta_{{ accion.id }}' class='CellWithComment'>" + span + "<span class='CellComment'>" + data[i].diasrestantes + "</span></td>";
                        tabla += "<td align='center'>" + data[i].observaciones + "</td>";
                        tabla += "<td align='center'><a style='font-size: 18px; cursor: pointer;' href='#addLicenciaL' data-stackbox='true' data-stackbox-position='absolute' onclick='editLicenciaSP(\"" + data[i].id + "\",\"" + data[i].estado_ejecucion + "\")' title='Editar Acción Personal'><i class='fa fa-edit text-green'></i></a></td>";
                        tabla += "</tr>";
                    }
                }

                $('#tabla_licencia_SP').dataTable().fnClearTable();
                $('#tabla_licencia_SP').dataTable().fnDestroy();

                $("#bodytabla_licencia_SP").html("");
                $("#bodytabla_licencia_SP").append(tabla);

                var table = $('#tabla_licencia_SP').DataTable({
                    orderCellsTop: true,
                    "columnDefs": [{
                        "targets": [10],
                        "visible": false
                    }],
                    "order": [
                        [0, "desc"]
                    ]
                });
            }
        },
        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
        },
    });
}

/*encargos SP*/
/*funcion para asignar los datos al formulario*/
/*parametros id ---> id tabla , est_eje-->estado de ejecucion de la transaccion*/
function editEncargoSP(id) {
    $('.nav-tabs a[href="#tab_funcionarioE"]').tab('show');
    $("#idaccPerE").val(id);

    $.ajax({
        url: "data_encargos",
        type: "get",
        cache: 'false',
        data: {
            "data": id
        },
        dataType: "json",

        success: function(jsonA) {
            $("#modalLoadin").hide();
            if (jsonA['error']) {
                if (jsonA['error']['context'])
                    var salida = jsonA['error']['context']['resource'][0].message;
                else
                    var salida = jsonA['error']['message']
            } else {
                $("#idFuncionarioE").val(jsonA[0].funcionario_id.id);
                $("#funcionarioE").val(jsonA[0].funcionario_id.persona_id.apellidos + ' ' + jsonA[0].funcionario_id.persona_id.nombres);
                $("#fecha_funcE").val(jsonA[0].fecha_accionpersonal);
                $("#tipoEnc").val(jsonA[0].accionpersonal_id.descripcion).trigger("change");
                $("#SestadoEnc").val(jsonA[0].estado).trigger("change");

                tabla = '';
                tabla += "<tr>";
                tabla += "<td align='left' style='border: 1px solid black;background-color: #3c8dbc;color:white;'>Situacion<br>Actual</td>"
                tabla += "<td align='left' style='border: 1px solid black;'>" + getDataArraySession('direcciones', '' + jsonA[0].actual_dir_estatuto_id + '') + "</td>";
                tabla += "<td width='200px' align='left' style='border: 1px solid black;'>" + getDataArraySession('direcciones', '' + jsonA[0].actual_proc_estatuto_id + '') + "</td>";
                tabla += "<td align='left' style='border: 1px solid black;'>" + getDataArraySession('direcciones', '' + jsonA[0].actual_subprc_estatuto_id + '') + "</td>";
                tabla += "<td style='border: 1px solid black;text-transform: uppercase;'>" + $("#SpuestoDistEn option[value='" + jsonA[0].actual_cargo_institucional_id + "']").text() + "</td>";
                tabla += "<td style='border: 1px solid black;text-transform: uppercase;'>" + $("#SpuestoEn option[value='" + jsonA[0].actual_puesto_id + "']").text() + "</td>";
                tabla += "</tr>";
                tabla += "<tr>";
                tabla += "<td align='left' style='border: 1px solid black;background-color: #3c8dbc;color:white;'>Situacion<br>Propuesta</td>"
                tabla += "<td align='left' style='border: 1px solid black;'>" + $("#SdireccionEn option[value='" + jsonA[0].nuevo_dir_estatuto_id + "']").text() + "</td>";
                tabla += "<td width='200px' align='left' style='border: 1px solid black;'>" + $("#SprocesoEn option[value='" + jsonA[0].nuevo_proc_estatuto_id + "']").text() + "</td>";
                tabla += "<td align='left' style='border: 1px solid black;'>" + $("#SsubprocesoEn option[value='" + jsonA[0].nuevo_subprc_estatuto_id + "']").text() + "</td>";
                tabla += "<td style='border: 1px solid black;text-transform: uppercase;'>" + $("#SpuestoDistEn option[value='" + jsonA[0].nuevo_cargo_ocupacional_id + "']").text() + "</td>";
                tabla += "<td style='border: 1px solid black;text-transform: uppercase;'>" + $("#SpuestoEn option[value='" + jsonA[0].nuevo_puesto_id + "']").text() + "</td>";
                tabla += "</tr>";

                $("#tbody_puesto_act_enc").html("");
                $("#tbody_puesto_act_enc").append(tabla);

                /*nuevo encargo*/
                $("#SdireccionEn").val(jsonA[0].nuevo_dir_estatuto_id).trigger("change");
                $("#SprocesoEn").val(jsonA[0].nuevo_proc_estatuto_id).trigger("change");
                $("#SsubprocesoEn").val(jsonA[0].nuevo_subprc_estatuto_id).trigger("change");
                $("#SpuestoDistEn").val(jsonA[0].nuevo_cargo_ocupacional_id).trigger("change");
                $("#SpuestoEn").val(jsonA[0].nuevo_puesto_id).trigger("change");

                /*Periodo*/
                $("#fechaDesdeE").val(jsonA[0].fecha_rige_accpersonal);
                $("#fechaHastaE").val(jsonA[0].fecha_hasta_accpersonal);

                $('#estadoEjeE [valor="' + jsonA[0].estado_ejecucion + '"]').prop("selected", true).trigger("change");

                $("#num_memoE").val(jsonA[0].num_memo);
                $("#obser_Enc").val(jsonA[0].descripcion_motivo);

                if (jsonA[0].anexo_motivo != null) {
                    fileExtension = jsonA[0].anexo_motivo.split('.').pop();
                    fileExtension = fileExtension.toLowerCase();
                    $("#nombreFileEncSP").html(jsonA[0].anexo_motivo);
                    $("#nombreFileEncSP").attr("href", path_archivos_accper + jsonA[0].anexo_motivo + "");
                    $("#nombreFileEncSP").attr("target", "_blank");
                    if ((fileExtension == 'txt') || (fileExtension == 'log'))
                        $("#imgContentFileEncSP").attr("src", "static/image/txt.png");
                    if ((fileExtension == 'doc') || (fileExtension == 'docx'))
                        $("#imgContentFileEncSP").attr("src", "static/image/word.png");
                    if ((fileExtension == 'xls') || (fileExtension == 'xls'))
                        $("#imgContentFileEncSP").attr("src", "static/image/excel.png");
                    if (fileExtension == 'pdf')
                        $("#imgContentFileEncSP").attr("src", "static/image/pdf2.png");
                } else {
                    $("#nombreFileEncSP").html("");
                    $("#imgContentFileEncSP").attr("src", "");
                    $("#contentFileEnc").attr("src", "");
                }
            }
        },
        error: function(data) {
            $("#modalLoadin").hide();
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));

        },
    });
}

/*metodo para buscar datos en tabla funcionario segun el parametro que se envie cedula/nombre /apellido*/
/*dataIni rango de fechas a buscar*/
function buscarEncargosParametros(dataIni) {
    data = '';
    if (dataIni) {
        data = data += "fecha_rige_accpersonal__range=" + dataIni;
    } else {
        desde = $("#FdesdeParamEnc").val();
        hasta = $("#FhastaParamEnc").val();

        if ((desde == "") || (hasta == ""))
            cadenaFecha = "";
        else
            cadenaFecha = "1";

        nombre = $("#nombreParamEnc").val();
        cedula = $("#cedParamEnc").val();

        if (cadenaFecha != "") {
            desdeArr = desde.split('/');
            hastaArr = hasta.split('/');

            fdesde = desdeArr[2] + "-" + desdeArr[0] + "-" + desdeArr[1];
            fhasta = hastaArr[2] + "-" + hastaArr[0] + "-" + hastaArr[1];
        }
        data = '';

        if (nombre != "")
            data = "funcionario_id__persona_id__nombre_completo__icontains=" + nombre + "&";

        if (cedula != "")
            data += "funcionario_id__persona_id__identificacion__icontains=" + cedula + "&";

        if (cadenaFecha != "")
            data += "fecha_rige_accpersonal__range=" + fdesde + "," + fhasta + "&";

        data = data.substring(0, data.length - 1);
    }

    $.ajax({
        url: "data_encargosParam",
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
                    for (i = 0; i < data.length; i++) {
                        num_accp_enc = data[i].num_accion_personal;

                        tabla += "<tr>";
                        tabla += "<td align='center' >" + data[i].fecha_ingreso + "</td>";
                        if (num_accp_enc == null) {
                            tabla += "<td align='center' > </td>";
                        } else {
                            tabla += "<td align='center' >" + data[i].num_accion_personal + "</td>";
                        }
                        tabla += "<td align='center' >" + data[i].funcionario_id.persona_id.identificacion + "</td>";
                        tabla += "<td align='left'   >" + data[i].funcionario_id.persona_id.nombre_completo + "</td>";
                        tabla += "<td align='center' >" + data[i].accionpersonal_id.descripcion + "</td>";
                        estado = "";
                        if (data[i].estado_ejecucion == 'C')
                            estado = "CREADA";
                        if ((data[i].estado_ejecucion == 'A') || (data[i].estado_ejecucion == 'P'))
                            estado = "EN EJECUCION";
                        if (data[i].estado_ejecucion == 'F')
                            estado = "FINALIZADA";

                        tabla += "<td align='center' >" + estado + "</td>";
                        tabla += "<td align='center' >" + data[i].funcionario_id.isla_trabaja_id.descripcion + "</td>";
                        tabla += "<td align='center' id='td_fecharige_" + data[i].id + "'>" + data[i].fecha_rige_accpersonal + "</td>";
                        if (data[i].alertaDiasrestantes == 'R')
                            span = '<span class="badge bg-red">' + data[i].fecha_hasta_accpersonal + '</span>'
                        if (data[i].alertaDiasrestantes == 'V')
                            span = '<span class="badge bg-green">' + data[i].fecha_hasta_accpersonal + '</span>'
                        if (data[i].alertaDiasrestantes == 'A')
                            span = '<span class="badge bg-yellow">' + data[i].fecha_hasta_accpersonal + '</span>'
                        if (data[i].alertaDiasrestantes == 'N')
                            span = '<span></span>'
                        tabla += "<td align='center' id='td_fechahasta_{{ accion.id }}' class='CellWithComment'>" + span + "<span class='CellComment'>" + data[i].diasrestantes + "</span></td>";

                        tabla += "<td align='center'><a style='font-size: 16px; cursor: pointer;' href='#addEncargoE' data-stackbox='true' data-stackbox-width='800' data-stackbox-position='absolute' onclick='editEncargoSP(\"" + data[i].id + "\")' title='Editar Acción Personal'><i class='fa fa-search text-green'></i></a></td>";
                        tabla += "</tr>";
                    }
                }

                $('#tabla_encargo_SP').dataTable().fnClearTable();
                $('#tabla_encargo_SP').dataTable().fnDestroy();

                $("#bodytabla_encargo_SP").html("");
                $("#bodytabla_encargo_SP").append(tabla);

                var table = $('#tabla_encargo_SP').DataTable({
                    orderCellsTop: true
                });
            }
        },
        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
        },
    });
}


/*obtiene las cuentas que tiene registrada el funcionario*/
function getCuentaXfun() {
    $("#tbody_cuenta_pers").html("");

    id_funcionario = $("#idfuncionarioP").val();
    id_persona = $("#idpersonaP").val();

    if (id_funcionario != "") {
        $("#boton_cuentaPersona").show();
        //$("#modalLoadin").show();
        $.ajax({
            url: "/get_bancoFunc/",
            type: "get",
            cache: 'false',
            data: {
                "id": id_persona
            },
            dataType: "json",

            success: function(data) {
                //$("#modalLoadin").hide();
                if (data['error']) {
                    if (data['error']['context'])
                        var salida = data['error']['context']['resource'][0].message;
                    else
                        var salida = data['error']['message']
                } else {
                    tabla = "";
                    if (data.length > 0) {
                        for (i = 0; i < data.length; i++) {
                            tabla += "<tr>";
                            tabla += "<td align='center' style='border: 1px solid black;'>" + (i + 1) + "</td>";
                            if (data[i].banco_id != null)
                                tabla += "<td align='center' style='border: 1px solid black;'>" + data[i].banco_id.nombre_comercial + "</td>";
                            else
                                tabla += "<td align='center' style='border: 1px solid black;'></td>";

                            tabla += "<td align='center' style='border: 1px solid black;'>" + data[i].tipo_cuenta + "</td>";
                            tabla += "<td align='center' style='border: 1px solid black;'>" + data[i].numero_cuenta + "</td>";

                            if ($("#perm_change_perfuncionario").val() == "1") {
                                tabla += "<td align='center' style='border: 1px solid black;'><a href='#popupPersonaBanco' data-stackbox='true' data-stackbox-position='absolute' onclick='editCuentaBanco2(\"" + data[i].id + "\",\"" + data[i].banco_id.id + "\",\"" + data[i].tipo_cuenta + "\",\"" + data[i].numero_cuenta + "\");' ><i class='fa fa-edit text-green'></i></a></td>";
                            } else {
                                tabla += "<td> </td>";
                            }

                            if ($("#perm_delete_perfuncionario").val() == "1") {
                                tabla += "<td align='center' style='border: 1px solid black;' onclick='deleteCuentaBanco2(\"" + data[i].id + "\",this);'><a class='delete' ><i class='fa fa-trash text-green'></i></a></td>";
                            } else {
                                tabla += "<td> </td>";
                            }


                            tabla += "</tr>";
                        }
                    }
                    $("#tbody_cuenta_pers").html("");
                    $("#tbody_cuenta_pers").append(tabla);
                }
            },
            error: function(data) {
                //$("#modalLoadin").hide();
                swal("", "Error: " + JSON.stringify(data), "error");
                console.log(JSON.stringify(data));
            },
        });
    } else $("#boton_cuentaPersona").hide();
}

/*funcion para asignar los datos al formulario*/
/*parametros id ---> id tabla , banco-->banco , cuenta-->cuenta , cuenta-->cuenta*/
function editCuentaBanco2(id, banco, cuenta, numcuenta) {
    $("#tipot_bancFun").val(1);
    $("#idcuentabancFun").val(id);

    id_persona = $('#idpersonaP').val();
    nombre_persona = $('#nombrepersonaP').val();
    iniciarCombo('SbancoP', 'f', 'bancos');

    $('#funcionarioBancidP').val(id_persona);
    $('#funcionarioBancP').val(nombre_persona);

    $("#SestadoBancP").val("A").trigger("change");
    $("#SbancoP").val(banco).trigger("change");
    $("#Stipo_cuentaP").val(cuenta).trigger("change");
    $("#numero_cuentaP").val(numcuenta);
}

/*funcion para eliminar(cambio de estado en la base de datos)*/
/*id id_tabla, td td de la tabla(para remover el registro)*/
function deleteCuentaBanco2(id, td) {
    var bool = confirm("Seguro de eliminar el dato?");
    if (bool) {
        datos = '{"estado":"I","eliminado":"t"}';
        $.ajax({
            url: "update_General",
            type: "get",
            cache: 'false',
            data: {
                "dj_url": "perpersonacuenta",
                "idtabla": id,
                "data": JSON.stringify(datos)
            },
            dataType: "json",

            success: function(data) {
                if (data.id == undefined) {
                    $('#modalLoadin').hide();
                    validaContenedorExt("addPersona", "Error al Insertar el registro");
                    console.log("idtabla---->" + id + "--->" + "data---->" + datos + "--->" + "perpersonacuenta" + "Error--->" + data);
                } else {
                    validaContenedorExt2("addPersona", "Registro eliminado con exito");
                    $(td).parents('tr').remove();
                }
            },
            error: function(data) {
                $('#modalLoadin').hide();
                validaContenedorExt("addPersona", "Error al Insertar el registro");
                console.log("idtabla---->" + id + "--->" + "data---->" + datos + "--->" + "perpersonacuenta" + "Error--->" + data);
            },
        });
    } else {
        return 0;
    }
}

/*funcion para verificar si se realiza una actualizacion o una insercion*/
function setInserUpdateCtaBanFunc() {
    tipo = $("#tipot_bancFun").val();
    //console.log(tipo);
    if (tipo == 0)
        addCtaBanTabFunc();
    else
        updateCtaBanTabFunc();
};

/*funcion para insertar cuenta bancaria en la base de datos*/
function addCtaBanTabFunc() {

    row_count = $('#table_tabcuentaFun').find('tr').length;
    id_persona = $('#funcionarioBancidP').val(); //idpersona
    id_banco = $('#SbancoP').val();
    tipo_cuenta = $('#Stipo_cuentaP').val();
    numero_cuenta = $('#numero_cuentaP').val();
    estado = $('#SestadoBancP').val();

    datos = '{"persona_id":"' + id_persona + '", "banco_id":"' + id_banco + '", "tipo_cuenta":"' + tipo_cuenta + '", "numero_cuenta":"' + numero_cuenta + '"}';

    $.ajax({
        url: "insert_General",
        type: 'get',
        cache: 'false',
        data: {
            "dj_url": "perpersonacuenta",
            "data": JSON.stringify("[" + datos + "]")
        },
        async: false,
        dataType: "json",
        success: function(data) {
            if (!data['results']) {
                $('#modalLoadin').hide();
                validaContenedorExt("addPersona", 'Error Insertando el Registro');
                console.log("data---->" + datos + "--->perpersonacuenta--->Error--->" + data);
            } else {
                $('#modalLoadin').hide();
                validaContenedorExt2("addPersona", 'Registro insertado con exito');
                getCuentaXfun();
            }
        },
        error: function(data) {
            $('#modalLoadin').hide();
            validaContenedorExt(paginaBody, "Error al Insertar el registro");
            console.log("data---->" + datos + "--->perpersonacuenta--->Error--->" + data);
        },
    });
}

/*funcion para actualizar cuenta bancaria en la base de datos*/
function updateCtaBanTabFunc() {

    id = $("#idcuentabancFun").val();
    id_banco = $('#SbancoP').val();
    tipo_cuenta = $('#Stipo_cuentaP').val();
    numero_cuenta = $('#numero_cuentaP').val();

    datos = '{"banco_id":"' + id_banco + '", "tipo_cuenta":"' + tipo_cuenta + '", "numero_cuenta":"' + numero_cuenta + '"}';

    $.ajax({
        url: "update_General",
        type: 'get',
        cache: 'false',
        data: {
            "dj_url": "perpersonacuenta",
            "idtabla": id,
            "data": JSON.stringify(datos)
        },
        async: false,
        dataType: "json",
        success: function(data) {
            if (data.id == undefined) {
                $('#modalLoadin').hide();
                validaContenedorExt("addPersona", 'Error al actualizar el registro');
                console.log("idtabla---->" + id + "--->" + "data---->" + datos + "--->" + "perpersonacuenta" + "Error--->" + data);
            } else {
                $('#modalLoadin').hide();
                validaContenedorExt2("addPersona", 'Registro Actualizado con exito');
                getCuentaXfun();
            }
        },
        error: function(data) {
            $('#modalLoadin').hide();
            validaContenedorExt(paginaBody, "Error al Insertar el registro");
            console.log("idtabla---->" + id + "--->" + "data---->" + datos + "--->" + "perpersonacuenta" + "Error--->" + data);
        },
    });
}

/*funcion para ver el historia de ingresos y salidas del funcionario*/
function verHistorialFunc2() {

    id_funcionario = $("#idfuncionarioP").val();
    id_persona = $("#idpersonaP").val();

    if (id_funcionario != "") {
        //$("#modalLoadin").show();
        $.ajax({
            url: "historial_ingreso",
            type: "get",
            cache: 'false',
            data: {
                "data": id_funcionario
            },
            dataType: "json",

            success: function(data) {
                //$("#modalLoadin").hide();
                if (data['error']) {
                    if (data['error']['context'])
                        var salida = data['error']['context']['resource'][0].message;
                    else
                        var salida = data['error']['message']
                } else {
                    tabla = "";
                    if (data.length > 0) {
                        for (i = 0; i < data.length; i++) {
                            if (data[i].accionpersonal_id.descripcion != "INGRESO") {
                                fecha_finI = data[i].fecha_rige_accpersonal;
                                fecha_iniI = "";

                            } else {
                                fecha_finI = "";
                                fecha_iniI = data[i].fecha_rige_accpersonal;
                            }

                            if (data[i].modalidad_laboral_id != null)
                                modalidad = data[i].modalidad_laboral_id.nombre;
                            else
                                modalidad = "";

                            if (data[i].observaciones != null)
                                observaciones = data[i].observaciones;
                            else
                                observaciones = "";

                            tabla += "<tr>";
                            tabla += "<td align='center' style='border: 1px solid black;'>" + (i + 1) + "</td>";
                            tabla += "<td align='center' style='border: 1px solid black;'>" + data[i].accionpersonal_id.descripcion + "</td>";
                            tabla += "<td align='left' style='border: 1px solid black;'>" + modalidad + "</td>";
                            tabla += "<td align='center' style='border: 1px solid black;'>" + data[i].nuevo_rmu + "</td>";
                            tabla += "<td align='center' style='border: 1px solid black;'>" + fecha_iniI + "</td>";
                            tabla += "<td style='border: 1px solid black;'>" + fecha_finI + "</td>";
                            tabla += "<td style='border: 1px solid black;'>" + getDataArraySession('islas', '' + data[i].nuevo_isla_trabaja_id + '') + "</td>";
                            tabla += "<td style='border: 1px solid black;'>" + observaciones + "</td>";
                            tabla += "</tr>";
                        }
                    }
                    $("#tbody_ingreso_pers").html("");
                    $("#tbody_ingreso_pers").append(tabla);
                }
            },
            error: function(data) {
                //$("#modalLoadin").hide();
                swal("", "Error: " + JSON.stringify(data), "error");
                console.log(JSON.stringify(data));

            },
        });
    }
}

/*funcion para revissar el historial de traslados de un funcionario*/
function verHistorialTras2() {
    id_funcionario = $("#idfuncionarioP").val();

    if (id_funcionario != "") {
        //$("#modalLoadin").show();
        $.ajax({
            url: "historial_traspasos",
            type: "get",
            cache: 'false',
            data: {
                "data": id_funcionario
            },
            dataType: "json",

            success: function(data) {
                //$("#modalLoadin").show();
                if (data['error']) {
                    if (data['error']['context'])
                        var salida = data['error']['context']['resource'][0].message;
                    else
                        var salida = data['error']['message']
                } else {
                    tabla = "";
                    if (data.length > 0) {
                        for (i = 0; i < data.length; i++) {
                            fecha_desde_accp = data[i].fecha_accionpersonal;
                            fecha_hasta_accp = data[i].fecha_hasta_accpersonal;

                            tabla += "<tr>";
                            tabla += "<td align='left' style='border: 1px solid black;'>" + (i + 1) + "</td>";
                            if (data[i].accionpersonal_otros != null)
                                tabla += "<td align='left' style='border: 1px solid black;'>" + data[i].accionpersonal_otros.descripcion + "</td>";
                            else
                                tabla += "<td align='left' style='border: 1px solid black;'>" + data[i].accionpersonal_id.descripcion + "</td>";

                            tabla += "<td align='left' style='border: 1px solid black;'>" + getDataArraySession('direcciones', '' + data[i].nuevo_dir_estatuto_id + '') + "</td>";
                            tabla += "<td align='center' style='border: 1px solid black;'>" + getDataArraySession('direcciones', '' + data[i].nuevo_proc_estatuto_id + '') + "</td>";
                            tabla += "<td align='center' style='border: 1px solid black;'>" + getDataArraySession('direcciones', '' + data[i].nuevo_subprc_estatuto_id + '') + "</td>";
                            tabla += "<td style='border: 1px solid black;'>" + $("#SsitpuestInst_ff option[value='" + data[i].nuevo_puesto_id + "']").text() + "</td>";
                            tabla += "<td style='border: 1px solid black;'>" + $("#SsitgrupoSA_ff option[value='" + data[i].nuevo_cargo_ocupacional_id + "']").text() + "</td>";
                            if (fecha_desde_accp == null) {
                                tabla += "<td style='border: 1px solid black;'> </td>";
                            } else {
                                tabla += "<td style='border: 1px solid black;'>" + data[i].fecha_accionpersonal + "</td>";
                            }
                            if (fecha_hasta_accp == null) {
                                tabla += "<td style='border: 1px solid black;'> </td>";
                            } else {
                                tabla += "<td style='border: 1px solid black;'>" + data[i].fecha_hasta_accpersonal + "</td>";
                            }
                            tabla += "</tr>";
                        }
                    }

                    $("#tbody_tralado_pers").html("");
                    $("#tbody_tralado_pers").append(tabla);
                    //$("#modalLoadin").show();
                    $.ajax({
                        url: "historial_encargos",
                        type: "get",
                        cache: 'false',
                        data: {
                            "data": id_funcionario
                        },
                        dataType: "json",

                        success: function(data) {
                            //$("#modalLoadin").hide();
                            if (data['error']) {
                                if (data['error']['context'])
                                    var salida = data['error']['context']['resource'][0].message;
                                else
                                    var salida = data['error']['message']
                            } else {
                                tabla = "";
                                if (data.length > 0) {
                                    for (i = 0; i < data.length; i++) {
                                        //console.log(data['resource'][i].id);  // (o el campo que necesites)
                                        fecha_regi_accp = data[i].fecha_rige_accpersonal;
                                        fecha_hasta_accp = data[i].fecha_hasta_accpersonal;

                                        tabla += "<tr>";
                                        tabla += "<td align='left' style='border: 1px solid black;'>" + (i + 1) + "</td>";
                                        if (data[i].accionpersonal_otros != null)
                                            tabla += "<td align='left' style='border: 1px solid black;'>" + data[i].accionpersonal_otros.descripcion + "</td>";
                                        else
                                            tabla += "<td align='left' style='border: 1px solid black;'>" + data[i].accionpersonal_id.descripcion + "</td>";
                                        if (fecha_regi_accp == null) {
                                            tabla += "<td align='center' style='border: 1px solid black;'> </td>";
                                        } else {
                                            tabla += "<td align='center' style='border: 1px solid black;'>" + data[i].fecha_rige_accpersonal + "</td>";
                                        }
                                        if (fecha_hasta_accp == null) {
                                            tabla += "<td align='center' style='border: 1px solid black;'> </td>";
                                        } else {
                                            tabla += "<td align='center' style='border: 1px solid black;'>" + data[i].fecha_hasta_accpersonal + "</td>";
                                        }
                                        tabla += "<td style='border: 1px solid black;'>" + $("#SsitpuestInst_ff option[value='" + data[i].nuevo_puesto_id + "']").text() + "</td>";
                                        tabla += "</tr>";
                                    }
                                }
                                $("#tbody_encargo_pers").html("");
                                $("#tbody_encargo_pers").append(tabla);
                            }
                        },
                        error: function(data) {
                            //$("#modalLoadin").hide();
                            swal("", "Error: " + JSON.stringify(data), "error");
                            console.log(JSON.stringify(data));
                        },
                    });
                }
            },
            error: function(data) {
                //$("#modalLoadin").hide();
                swal("", "Error: " + JSON.stringify(data), "error");
                console.log(JSON.stringify(data));
            },
        });
    }
}

/*funcion para ver el historial de licencias y sanciones de un funcionario*/
function verHistorialLicSan() {
    id_funcionario = $("#idfuncionarioP").val();
    if (id_funcionario != "") {
        $.ajax({
            url: "historial_sanciones",
            type: "get",
            cache: 'false',
            data: {
                "data": id_funcionario
            },
            dataType: "json",

            success: function(data) {
                //$("#modalLoadin").hide();
                if (data['error']) {
                    if (data['error']['context'])
                        var salida = data['error']['context']['resource'][0].message;
                    else
                        var salida = data['error']['message']
                } else {
                    tabla = "";
                    if (data.length > 0) {
                        for (i = 0; i < data.length; i++) {

                            tabla += "<tr>";
                            tabla += "<td align='center' style='border: 1px solid black;'>" + (i + 1) + "</td>";
                            tabla += "<td align='center' style='border: 1px solid black;'>" + data[i].sancion_id.descripcion + "</td>";
                            tabla += "<td align='center' style='border: 1px solid black;'>" + data[i].anio_sancion + "-" + getMes(data[i].mes_sancion) + "</td>";
                            tabla += "</tr>";
                        }
                    }
                    $("#tbody_sancion_pers").html("");
                    $("#tbody_sancion_pers").append(tabla);
                    //$("#modalLoadin").show();
                    $.ajax({
                        url: "historial_licencias",
                        type: "get",
                        cache: 'false',
                        data: {
                            "data": id_funcionario
                        },
                        dataType: "json",

                        success: function(data) {
                            //$("#modalLoadin").hide();
                            if (data['error']) {
                                if (data['error']['context'])
                                    var salida = data['error']['context']['resource'][0].message;
                                else
                                    var salida = data['error']['message']
                            } else {
                                tabla = "";
                                if (data.length > 0) {
                                    for (i = 0; i < data.length; i++) {
                                        //console.log(data['resource'][i].id);  // (o el campo que necesites)

                                        if (data[i].accpersonal_licencias.length > 0)
                                            num_informe_tec = data[i].accpersonal_licencias[0].num_informe_tec;
                                        else
                                            num_informe_tec = "";
                                        tabla += "<tr>";
                                        tabla += "<td align='center' style='border: 1px solid black;'>" + (i + 1) + "</td>";
                                        tabla += "<td align='center' style='border: 1px solid black;'>" + num_informe_tec + "</td>";
                                        tabla += "<td align='center' style='border: 1px solid black;'>" + data[i].fecha_rige_accpersonal + "</td>";
                                        tabla += "<td align='center' style='border: 1px solid black;'>" + data[i].fecha_hasta_accpersonal + "</td>";
                                        tabla += "</tr>";
                                    }
                                }
                                $("#tbody_licencia_pers").html("");
                                $("#tbody_licencia_pers").append(tabla);
                            }
                        },
                        error: function(data) {
                            //$("#modalLoadin").hide();
                            swal("", "Error: " + JSON.stringify(data), "error");
                            console.log(JSON.stringify(data));
                        },
                    });
                }
            },
            error: function(data) {
                //$("#modalLoadin").hide();
                swal("", "Error: " + JSON.stringify(data), "error");
                console.log(JSON.stringify(data));
            },
        });
    }
}

/*funcion para ver el historial de enfermedades y accidentes de un funcionario*/
function historial_EnfermedadAccidente() {

    $("#tbody_licenciaEnf_pers").html("");
    $("#tbody_licenciaAcc_pers").html("");
    id_funcionario = $("#idfuncionarioP").val();
    id_persona = $("#idpersonaP").val();

    if (id_funcionario != "") {
        //$("#modalLoadin").show();
        $.ajax({
            url: "historial_licencias",
            type: "get",
            cache: 'false',
            data: {
                "data": id_funcionario
            },
            dataType: "json",

            success: function(data) {
                //$("#modalLoadin").hide();
                if (data['error']) {
                    if (data['error']['context'])
                        var salida = data['error']['context']['resource'][0].message;
                    else
                        var salida = data['error']['message']
                } else {
                    tabla = "";
                    tabla2 = "";
                    cont1 = 0;
                    cont2 = 0;
                    if (data.length > 0) {
                        for (i = 0; i < data.length; i++) {
                            if (data[i].accpersonal_licencias[0].enfermedad != null) {
                                cont1++;
                                tabla += "<tr>";
                                tabla += "<td align='center' style='border: 1px solid black;'>" + cont1 + "</td>";
                                tabla += "<td align='center' style='border: 1px solid black;'>" + data[i].accpersonal_licencias[0].enfermedad + "</td>";
                                tabla += "<td align='center' style='border: 1px solid black;'>" + data[i].fecha_accionpersonal + "</td>";
                                tabla += "</tr>";
                            }
                            if (data[i].accpersonal_licencias[0].accidente != null) {
                                cont2++;
                                tabla2 += "<tr>";
                                tabla2 += "<td align='center' style='border: 1px solid black;'>" + cont2 + "</td>";
                                tabla2 += "<td align='center' style='border: 1px solid black;'>" + data[i].accpersonal_licencias[0].accidente + "</td>";
                                tabla2 += "<td align='center' style='border: 1px solid black;'>" + data[i].fecha_accionpersonal + "</td>";
                                tabla2 += "</tr>";
                            }
                        }
                    }
                    $("#tbody_licenciaEnf_pers").append(tabla);
                    $("#tbody_licenciaAcc_pers").append(tabla2);
                }
            },
            error: function(data) {
                swal("", "Error: " + JSON.stringify(data), "error");
                console.log(JSON.stringify(data));
            },
        });
    }
}

/*funcion para obtener los datos del registro civil*/
function getDatosRegistroCivil() {
    $("#modalLoadin").show();
    cedula = $("#num_cedpers").val();
    sexo = '';
    pais_nacimiento_id = '';
    estadoCivil = '';

    $.ajax({
        url: "get_DatosRegistroCivil",
        type: "get",
        cache: 'false',
        data: {
            "data": cedula
        },
        dataType: "json",

        success: function(data) {
            $("#modalLoadin").hide();
            if (data.Retorno == 'OK') {
                //console.log(data.cedula);
                var res = data.nombre.split(" ");
                if (res.length == 4) {
                    $("#nombres_pers").val(res[2] + " " + res[3]);
                    $("#apellidos_pers").val(res[0] + " " + res[1]);
                } else
                    $("#nombres_pers").val(data.nombre);

                //FECHA FORMATO
                var fecha = convertDateFormat(data.fechaNacimiento);

                //NACIONALIDAD
                if (data.nacionalidad == 'ECUATORIANA') {
                    pais_nacimiento_id = 'ca3acd56-a1f2-11e6-92c2-000c29e38a2f';
                } else {
                    pais_nacimiento_id = '';
                }
                //SEXO
                if (data.sexo == 'MUJER' || data.sexo == 'FEMENINO') {
                    sexo = 'F';
                } else {
                    if (data.sexo == 'HOMBRE' || data.sexo == 'MASCULINO') {
                        sexo = 'M';
                    } else {
                        sexo = '';
                    }
                }

                //ESTADO CIVIL
                if (data.estadoCivil == 'SOLTERO' || data.estadoCivil == 'SOLTERA') {
                    estadoCivil = 'S';
                } else {
                    if (data.estadoCivil == 'CASADO' || data.estadoCivil == 'CASADA') {
                        estadoCivil = 'C';
                    } else {
                        if (data.estadoCivil == 'VIUDO' || data.estadoCivil == 'VIUDA') {
                            estadoCivil = 'V';
                        } else {
                            if (data.estadoCivil == 'UNION LIBRE') {
                                estadoCivil = 'U';
                            } else {
                                if (data.estadoCivil == 'UNIÓN DE HECHO' || data.estadoCivil == 'EN UNION DE HECHO') {
                                    estadoCivil = 'UH';
                                } else {
                                    if (data.estadoCivil == 'DIVORCIADO' || data.estadoCivil == 'DIVORCIADA') {
                                        estadoCivil = 'D';
                                    } else {
                                        console.log("NO EXISTE ESTADO CIVIL");
                                        estadoCivil = '';
                                    }
                                }
                            }
                        }

                    }
                }

                var domicilio = data.domicilio.split("/");

                $('#SciudadPers option:contains(' + domicilio[1] + ')').attr('selected', 'selected').trigger("change");
                $('#SprovPers   option:contains(' + domicilio[0] + ')').attr('selected', 'selected').trigger("change");
                $('#ScantonPers option:contains(' + domicilio[1] + ')').attr('selected', 'selected').trigger("change");
                $('#SparroqPers option:contains(' + domicilio[2] + ')').attr('selected', 'selected').trigger("change");
                $('#StipoIdPers [valor="C"]').prop("selected", true).trigger("change");
                $('#STipoPers [valor="N"]').prop("selected", true).trigger("change");
                $('#SsexoPers [valor="' + sexo + '"]').prop("selected", true).trigger("change");
                $('#SEstCivilPers [valor="' + estadoCivil + '"]').prop("selected", true).trigger("change");
                $('#SpaisPers').val(pais_nacimiento_id).trigger("change");
                $("#fechaNac_pers").val(fecha);
            } else {
                validaContenedorExt("TabFunc", "Error al Consultar en el Registro Civil");
            }
        },
        error: function(data) {
            $("#modalLoadin").hide();
            validaContenedorExt("TabFunc", "Error:" + JSON.stringify(data));
            console.log(JSON.stringify(data));

        },
    });
}

/*funcion para obtener los datos del registro civil*/
function getDatosRegistroCivil2() {
    $("#modalLoadin").show();
    cedula = $("#num_cedpers2").val();
    sexo = '';
    pais_nacimiento_id = '';

    $.ajax({
        url: "get_DatosRegistroCivil",
        type: "get",
        cache: 'false',
        data: {
            "data": cedula
        },
        dataType: "json",

        success: function(data) {
            $("#modalLoadin").hide();
            if (data.Retorno == 'OK') {
                //console.log(data.cedula);
                var res = data.nombre.split(" ");
                if (res.length == 4) {
                    $("#nombres_pers2").val(res[2] + " " + res[3]);
                    $("#apellidos_pers2").val(res[0] + " " + res[1]);
                } else
                    $("#nombres_pers2").val(data.nombre);

                //FECHA FORMATO
                var fecha = convertDateFormat(data.fechaNacimiento);
                //SEXO
                if (data.sexo == 'MUJER' || data.sexo == 'FEMENINO') {
                    sexo = 'F';
                } else {
                    if (data.sexo == 'HOMBRE' || data.sexo == 'MASCULINO') {
                        sexo = 'M';
                    } else {
                        sexo = '';
                    }

                }

                $('#StipoIdPers2 [valor="C"]').prop("selected", true).trigger("change");
                $('#STipoPers2 [valor="N"]').prop("selected", true).trigger("change");
                $('#SsexoPers2 [valor="' + sexo + '"]').prop("selected", true).trigger("change");
                $("#fechaNac_pers2").val(fecha);
            } else {
                //console.log(data);
                validaContenedorExt("addPersona2", "Error al Consultar en el Registro Civil");
            }
        },
        error: function(data) {
            $("#modalLoadin").hide();
            validaContenedorExt("addPersona2", "Error:" + JSON.stringify(data));
            console.log(JSON.stringify(data));

        },
    });
}


/*funcion para limpiar formulario de ingreso y actualizacion de FamiliarFun*/
function limpiarFormFamiliarFun() {
    clearForm(frm_personas2);
    $('#idFamiliarFun').val("");
    $('#tipot_FamFun').val(0);
}

/*funcion para asignar los datos al formulario*/
/*parametros idfamFun ---> id tabla*/
function editFamiliarFuncionario(idfamFun) {

    limpiarFormFamiliarFun();
    $("#modalLoadin").show();

    $('#idFamiliarFun').val(idfamFun);
    $('#tipot_FamFun').val(1);

    $.ajax({
        url: "famFun_data",
        type: "get",
        data: {
            "data": idfamFun
        },
        dataType: "json",

        success: function(data) {
            $("#modalLoadin").hide();
            if (data.length > 0) {
                console.log(data[0].es_discapacitado);
                es_discapacitado = '';
                if (data[0].es_discapacitado == false) es_discapacitado = 'f';
                if (data[0].es_discapacitado == true) es_discapacitado = 't';
                es_sustituto = '';
                if (data[0].es_sustituto == false) es_sustituto = 'f';
                if (data[0].es_sustituto == true) es_sustituto = 't';
                es_carga_familiar = '';
                if (data[0].es_carga_familiar == false) es_carga_familiar = 'f';
                if (data[0].es_carga_familiar == true) es_carga_familiar = 't';


                $('#idFamiliarFun').val(data[0].id);
                $("#idpersonaP2").val(data[0].familiar_id.id);
                $('#STipoPers2 [valor="' + data[0].familiar_id.tipo_persona + '"]').prop("selected", true).trigger("change");
                $('#StipoIdPers2 [valor="' + data[0].familiar_id.tipo_identificacion + '"]').prop("selected", true).trigger("change");
                $('#num_cedpers2').val(data[0].familiar_id.identificacion);
                $('#nombres_pers2').val(data[0].familiar_id.nombres);
                $('#apellidos_pers2').val(data[0].familiar_id.apellidos);
                $('#SsexoPers2 [valor="' + data[0].familiar_id.sexo + '"]').prop("selected", true).trigger("change");
                $('#fechaNac_pers2').val(data[0].familiar_id.fecha_nacimiento);

                $('#StipoResPers2 [valor="' + data[0].familiar_id.tipo_residencia + '"]').prop("selected", true).trigger("change");
                $('#num_residenpers2').val(data[0].familiar_id.numero_residencia);

                $('#SparentescoPers2').val(data[0].parentesco.id).trigger("change");
                $('#SdiscaPers2').val(es_discapacitado).trigger("change");
                $('#SsustiPers2').val(es_sustituto).trigger("change");
                $('#ScargaPers2').val(es_carga_familiar).trigger("change");
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
function setInsertUpdateFamiliaresFun() {
    if ($("#tipot_FamFun").val() == 0)
        addFamiliarFunTab();
    else
        updateFamiliarFunTab();
}

/*funcion para agregar familiares a un funcionario*/
function addFamiliarFunTab() {

    row_count = $('#tabla_familiar_pers').find('tr').length;

    id_persona = $('#idpersonaP2').val();
    funcionario = $('#idfuncionarioP').val();

    parentesco = $('#SparentescoPers2').val();
    es_discapa = $('#SdiscaPers2').val();
    es_sustitu = $('#SsustiPers2').val();
    es_cargaFa = $('#ScargaPers2').val();
    tipo_persona = $('#STipoPers2').val();
    tipo_identificacion = $('#StipoIdPers2').val();
    cedula = $('#num_cedpers2').val();
    nombres = $('#nombres_pers2').val();
    apellidos = $('#apellidos_pers2').val();

    datos = '{"parentesco":"' + parentesco + '", "familiar_id":"' + id_persona + '", "funcionario_id":"' + funcionario + '", "es_carga_familiar":"' + es_cargaFa + '", "es_discapacitado":"' + es_discapa + '", "es_sustituto":"' + es_sustitu + '"}';

    $.ajax({
        url: "insert_General",
        type: 'get',
        cache: 'false',
        data: {
            "dj_url": "perfuncionariofamiliares",
            "data": JSON.stringify("[" + datos + "]")
        },
        async: false,
        dataType: "json",
        success: function(data) {
            if (!data['results']) {
                $('#modalLoadin').hide();
                validaContenedorExt("addPersona", "Error al Insertar el registro");
                console.log("data---->" + datos + "--->perfuncionariofamiliares--->Error--->" + data);
            } else {
                $('#modalLoadin').hide();
                validaContenedorExt2("addPersona", "Registro insertado con exito");
                getFamiliaresXfun();
            }
        },
        error: function(data) {
            $('#modalLoadin').hide();
            validaContenedorExt(paginaBody, "Error al Insertar el registro");
            console.log("data---->" + datos + "--->perfuncionariofamiliares--->Error--->" + data);
        },
    });
}

/*actualizar datos de los familiares del funcionario*/
function updateFamiliarFunTab() {

    id_persona = $('#idpersonaP2').val();
    funcionario = $('#idfuncionarioP').val();

    id = $("#idFamiliarFun").val();

    parentesco = $('#SparentescoPers2').val();
    es_discapa = $('#SdiscaPers2').val();
    es_sustitu = $('#SsustiPers2').val();
    es_cargaFa = $('#ScargaPers2').val();
    tipo_persona = $('#STipoPers2').val();
    tipo_identificacion = $('#StipoIdPers2').val();
    cedula = $('#num_cedpers2').val();
    nombres = $('#nombres_pers2').val();
    apellidos = $('#apellidos_pers2').val();

    datos = '{"parentesco":"' + parentesco + '", "familiar_id":"' + id_persona + '", "funcionario_id":"' + funcionario + '", "es_carga_familiar":"' + es_cargaFa + '", "es_discapacitado":"' + es_discapa + '", "es_sustituto":"' + es_sustitu + '"}';

    $.ajax({
        url: "update_General",
        type: 'get',
        cache: 'false',
        data: {
            "dj_url": "perfuncionariofamiliares",
            "idtabla": id,
            "data": JSON.stringify(datos)
        },
        async: false,
        dataType: "json",
        success: function(data) {
            if (data.id == undefined) {
                $('#modalLoadin').hide();
                validaContenedorExt("addPersona", "Error al actualizar el registro");
                console.log("idtabla---->" + id + "--->" + "data---->" + datos + "--->" + "perfuncionariofamiliares" + "Error--->" + data);
            } else {
                $('#modalLoadin').hide();
                validaContenedorExt2("addPersona", "Registro actualizado con exito");
                getFamiliaresXfun();
            }
        },
        error: function(data) {
            $('#modalLoadin').hide();
            validaContenedorExt(paginaBody, "Error al Insertar el registro");
            console.log("idtabla---->" + id + "--->" + "data---->" + datos + "--->" + "perfuncionariofamiliares" + "Error--->" + data);
        },
    });
}

/*funcion para eliminar(cambio de estado en la base de datos)*/
function deleteFamiliarFuncionario(id, td) {
    var bool = confirm("Seguro de eliminar el dato?");
    if (bool) {
        datos = '{"estado":"I","eliminado":"t"}';

        $.ajax({
            url: "update_General",
            type: "get",
            cache: 'false',
            data: {
                "dj_url": "perfuncionariofamiliares",
                "idtabla": id,
                "data": JSON.stringify(datos)
            },
            dataType: "json",

            success: function(data) {
                if (data.id == undefined) {
                    $('#modalLoadin').hide();
                    validaContenedorExt("addPersona", "Error al Insertar el registro");
                    console.log("idtabla---->" + id + "--->" + "data---->" + datos + "--->" + "perfuncionariofamiliares" + "Error--->" + data);
                } else {
                    validaContenedorExt2("addPersona", "Registro eliminado con exito");
                    getFamiliaresXfun();
                }
            },
            error: function(data) {
                $('#modalLoadin').hide();
                validaContenedorExt("addPersona", "Error al Insertar el registro");
                console.log("idtabla---->" + id + "--->" + "data---->" + datos + "--->" + "perfuncionariofamiliares" + "Error--->" + data);
            },
        });
    } else {
        return 0;
    }
}

/*obtener los familiares del funcionario*/
function getFamiliaresXfun() {
    $("#tbody_familiar_pers").html("");

    id_funcionario = $("#idfuncionarioP").val();
    id_persona = $("#idpersonaP").val();

    if (id_funcionario != "") {
        $("#botonFamiliares").show();
        $.ajax({
            url: "/get_FamiliaresFunc/",
            type: "get",
            cache: 'false',
            data: {
                "id": id_funcionario
            },
            dataType: "json",

            success: function(data) {
                if (data['error']) {
                    if (data['error']['context'])
                        var salida = data['error']['context']['resource'][0].message;
                    else
                        var salida = data['error']['message']
                } else {
                    tabla = "";
                    if (data.length > 0) {
                        for (i = 0; i < data.length; i++) {
                            tabla += "<tr>";
                            tabla += "<td align='center' style='border: 1px solid black;'>" + data[i].familiar_id.identificacion + "</td>";
                            tabla += "<td align='center' style='border: 1px solid black;'>" + data[i].familiar_id.nombre_completo + "</td>";
                            tabla += "<td align='center' style='border: 1px solid black;'>" + data[i].parentesco.label + "</td>";

                            if ($("#perm_change_perfuncionario").val() == "1") {
                                tabla += "<td align='center' style='border: 1px solid black;'><a href='#addPersona2' data-stackbox='true' data-stackbox-width='1000px' data-stackbox-height='800px' data-stackbox-position='absolute' onclick='editFamiliarFuncionario(\"" + data[i].id + "\");'><i class='fa fa-edit text-green'></i></a></td>";
                            } else {
                                tabla += "<td> </td>";
                            }

                            if ($("#perm_delete_perfuncionario").val() == "1") {
                                tabla += "<td align='center' style='border: 1px solid black;' onclick='deleteFamiliarFuncionario(\"" + data[i].id + "\",this);'><a><i class='fa fa-trash text-green'></i></a></td>";
                            } else {
                                tabla += "<td> </td>";
                            }
                            tabla += "</tr>";
                        }
                    }
                    $("#tbody_familiar_pers").html("");
                    $("#tbody_familiar_pers").append(tabla);
                }
            },
            error: function(data) {
                swal("", "Error: " + JSON.stringify(data), "Danger");
                console.log(JSON.stringify(data));

            },
        });
    } else $("#botonFamiliares").hide();
}

/*metodo para buscar datos en tabla funcionario segun el parametro que se envie cedula/nombre /apellido*/
function getDataPersonaFuncionarioP(inicio) {
    $("#modalLoadin").show();
    data = '';
    if (inicio != 1) {
        nombre = $("#nombresfilter").val();
        cedula = $("#cedulafilter").val();
        estado = $("#SestadoFilter").val();
        estado_emb = "";
        if (valor_nulo_str(document.querySelector('input[name=estado_emb]:checked')) != "") {
            estado_emb = document.querySelector('input[name=estado_emb]:checked').value;
        }

        if (estado_emb == 1)
            dataParam = 'persona_id__estado_embarazo__in=true&';
        else
            dataParam = '';

        if (nombre != "")
            data = "persona_id__nombre_completo__icontains=" + nombre + "&";

        if (cedula != "")
            data += "persona_id__identificacion__icontains=" + cedula + "&";

        if (estado != "")
            data += "estado__in=" + estado + "&";

        if (dataParam != "")
            data += dataParam;

        data = data.substring(0, data.length - 1);
    } else {
        data = "persona_id__apellidos__startswith=A";
    }

    $.ajax({
        //url: "funcionario_data",
        url: "data_funcionarioParam",
        type: "get",
        data: {
            "data": data
        },
        dataType: "json",

        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
                $("#modalLoadin").hide();
            } else {

                tabla = "";
                if (data.length > 0) {
                    for (i = 0; i < data.length; i++) {
                        tabla += "<tr>";
                        if (data[i].estado == 'A')
                            color = '';
                        else
                            color = 'background-color:red';

                        tabla += "<td align='center' style='" + color + "'><img src='/static/image/favicon.ico' style='width: 20px;'></td>";
                        tabla += "<td id='td_cedula_" + data[i].id + "'>" + data[i].persona_id.identificacion + "</td>";
                        tabla += "<td id='td_nombre_" + data[i].id + "'>" + data[i].persona_id.nombre_completo + "</td>";
                        if (data[i].direccion_estatuto_id != null) tabla += "<td >" + data[i].direccion_estatuto_id.name + "</td>";
                        else tabla += "<td ></td>";
                        if (data[i].cargo_distributivo_id != null) tabla += "<td >" + data[i].cargo_distributivo_id.nombre + "</td>";
                        else tabla += "<td ></td>";
                        if (data[i].cargo_ocupacional_id != null) tabla += "<td >" + data[i].cargo_ocupacional_id.nombre + "</td>";
                        else tabla += "<td ></td>";
                        if (data[i].modalidad_laboral_id != null) tabla += "<td >" + data[i].modalidad_laboral_id.nombre + "</td>";
                        else tabla += "<td ></td>";
                        if (data[i].isla_trabaja_id != null) tabla += "<td >" + data[i].isla_trabaja_id.descripcion + "</td>";
                        else tabla += "<td ></td>";

                        if ($("#perm_change_perfuncionario").val() == "1") {
                            tabla += "<td align='center'><a href='#verFicha' data-stackbox='true' data-stackbox-position='absolute' data-stackbox-width='1000' onclick='verFichaFuncionario(\"" + data[i].persona_id.identificacion + "\")'><i class='fa fa-user text-green btn_edit'></i></a> </td>";
                            tabla += "<td align='center'><a href='#addPersona' data-stackbox='true' data-stackbox-position='absolute' onclick='editFuncionario(\"" + data[i].persona_id.identificacion + "\")'><i class='fa fa-edit text-green btn_edit'></i></a> </td>";
                        } else {
                            tabla += "<td> </td>";
                            tabla += "<td> </td>";
                        }

                        if ($("#perm_delete_perfuncionario").val() == "1") {
                            tabla += "<td align='center'><a onclick='deleteModal(\"" + data[i].id + "\",\"funcionario\");'><i class='fa fa-trash text-green btn_edit'></i></a></td>";

                        } else {
                            tabla += "<td> </td>";
                        }
                        tabla += "</tr>";
                    }
                }

                $('#tabla_personas').dataTable().fnClearTable();
                $('#tabla_personas').dataTable().fnDestroy();

                $("#bodytabla_personas").html("");
                $("#bodytabla_personas").append(tabla);

                var table = $('#tabla_personas').DataTable({
                    orderCellsTop: true
                });

                // Apply the search
                table.columns().eq(0).each(function(colIdx) {
                    $('input', $('#ftper th')[colIdx]).on('keyup change', function() {
                        table
                            .column(colIdx)
                            .search(this.value)
                            .draw();
                    });
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

/*metodo para buscar datos en tabla persona segun el parametro que se envie cedula/nombre /apellido*/
function getDataPersonaPer() {

    nombre = $("#nombresfilterPer").val();

    $('#tabla_personasP').dataTable().fnClearTable();
    $('#tabla_personasP').dataTable().fnDestroy();
    $("#bodytabla_personasP").html("");

    var table = $('#tabla_personasP').DataTable({
        orderCellsTop: true
    });

    // Apply the search
    table.columns().eq(0).each(function(colIdx) {
        $('input', $('#ftperP th')[colIdx]).on('keyup change', function() {
            table
                .column(colIdx)
                .search(this.value)
                .draw();
        });
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

                tabla = "";
                if (data.length > 0) {
                    for (i = 0; i < data.length; i++) {

                        tabla += "<tr>";
                        if (data[i].perfuncionario.length > 0)
                            tabla += "<td align='center'><img src='/static/image/favicon.ico' style='width: 20px;'></td>";
                        else
                            tabla += "<td align='center'></td>";
                        tabla += "<td id='td_nombre_" + data[i].id + "'>" + data[i].nombres + "</td>";
                        tabla += "<td id='td_apellido_" + data[i].id + "'>" + data[i].apellidos + "</td>";
                        tabla += "<td id='td_cedula_" + data[i].id + "'>" + data[i].identificacion + "</td>";
                        if ($("#perm_change_perfuncionario").val() == "1") {
                            tabla += "<td align='center'><a href='#addPersonaP' data-stackbox='true' data-stackbox-position='absolute' onclick='editPersona(\"" + data[i].identificacion + "\")'><i class='fa fa-edit text-green'></i></a> </td>";
                        } else {
                            tabla += "<td> </td>";
                        }
                        if ($("#perm_delete_perfuncionario").val() == "1") {
                            tabla += "<td align='center'><a onclick='deleteModal(\"" + data[i].id + "\",\"personas\");'><i class='fa fa-trash text-green'></i></a></td>";
                        } else {
                            tabla += "<td> </td>";
                        }

                        tabla += "</tr>";
                    }
                }

                $('#tabla_personasP').dataTable().fnClearTable();
                $('#tabla_personasP').dataTable().fnDestroy();

                $("#bodytabla_personasP").html("");
                $("#bodytabla_personasP").append(tabla);

                var table = $('#tabla_personasP').DataTable({
                    orderCellsTop: true
                });

                // Apply the search
                table.columns().eq(0).each(function(colIdx) {
                    $('input', $('#ftperP th')[colIdx]).on('keyup change', function() {
                        table
                            .column(colIdx)
                            .search(this.value)
                            .draw();
                    });
                });
            }
        },
        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
        },
    });
}



/*para generar excel de lista de personal*/
function getDataPersonaFuncionarioExcel() {
    nombre = $("#nombresfilter").val();

    tableC = "<tr style='background-color: #ccc; text-transform:uppercase; text-align:center; font-weight:bold;'>";
    tableC += "<td style='border: 1px solid black;'>No.</td>";
    tableC += "<td style='border: 1px solid black;'>NOMBRE</td>";
    tableC += "<td style='border: 1px solid black;'>SEXO</td>";
    tableC += "<td style='border: 1px solid black;'>CEDULA</td>";
    tableC += "<td style='border: 1px solid black;'>AÑO DE NOMBRAMIENTO PROVISIONAL / PROCESO DE CONCURSO/ OTROS</td>";
    tableC += "<td style='border: 1px solid black;'>MODALIDAD LABORAL</td>";
    tableC += "<td style='border: 1px solid black;'>BASE LEGAL  NOMBRAMIENTO</td>";
    tableC += "<td style='border: 1px solid black;'>PROVINCIA</td>";
    tableC += "<td style='border: 1px solid black;'>RESIDENTES TEMPORALES</td>";
    tableC += "<td style='border: 1px solid black;'>CARNET DE RESIDENCIA TEMPORAL</td>";
    tableC += "<td style='border: 1px solid black;'>ISLA DONDE TRABAJAN</td>";
    tableC += "<td style='border: 1px solid black;'>PARROQUIA</td>";
    tableC += "<td style='border: 1px solid black;'>NRO. LIBRETA MILITAR</td>";
    tableC += "<td style='border: 1px solid black;'>TIPO DE SANGRE</td>";
    tableC += "<td style='border: 1px solid black;'>ESTADO CIVIL</td>";
    tableC += "<td style='border: 1px solid black;'>NOMBRE</td>";
    tableC += "<td style='border: 1px solid black;'>PUESTOS INSTITUCIONALES POR ENCARGOS, MOVIMIENTOS O ROLES MÁS ESPECÍFICOS</td>";
    tableC += "<td style='border: 1px solid black;'>PUESTOS INSTITUCIONALES CONFORME DISTRIBUTIVO</td>";
    tableC += "<td style='border: 1px solid black;'>CARGOS OCUPACIONALES</td>";
    tableC += "<td style='border: 1px solid black;'>RMU</td>";
    tableC += "<td style='border: 1px solid black;'>DIRECCIÓN</td>";
    tableC += "<td style='border: 1px solid black;'>PROCESOS SEGÚN ESTATUTO ORGÁNICO</td>";
    tableC += "<td style='border: 1px solid black;'>SUBPROCESOS</td>";
    tableC += "<td style='border: 1px solid black;'>FECHA INGRESO AL PNG</td>";
    tableC += "<td style='border: 1px solid black;'>AÑOS DE GESTIÓN</td>";
    tableC += "<td style='border: 1px solid black;'>MÁS EL NUMERO DE MESES</td>";
    tableC += "<td style='border: 1px solid black;'>SALIDA</td>";
    tableC += "<td style='border: 1px solid black;'>RAZÓN SALIDA</td>";
    tableC += "<td style='border: 1px solid black;'>INICIO</td>";
    tableC += "<td style='border: 1px solid black;'>FIN</td>";
    tableC += "<td style='border: 1px solid black;'>MES NACIMIENTO</td>";
    tableC += "<td style='border: 1px solid black;'>FECHA NACIMIENTO</td>";
    tableC += "<td style='border: 1px solid black;'>EDAD</td>";
    tableC += "<td style='border: 1px solid black;'>LUGAR NACIMIENTO</td>";
    tableC += "<td style='border: 1px solid black;'>RÉGIMEN LABORAL</td>";
    tableC += "<td style='border: 1px solid black;'>GRADO</td>";
    tableC += "<td style='border: 1px solid black;'>ESCALA</td>";
    tableC += "<td style='border: 1px solid black;'>ROL NO PROFESIONAL CON TÍTULO</td>";
    tableC += "<td style='border: 1px solid black;'>ROL PROFESIONAL SIN TÍTULO</td>";
    tableC += "<td style='border: 1px solid black;'>SERVIDORES CON RÉGIMEN DISCIPLINARIO</td>";
    tableC += "<td style='border: 1px solid black;'>CLASIFICACIÓN DE LOS PROCESOS</td>";
    tableC += "<td style='border: 1px solid black;'>FORMACIÓN  ACADÁMICA (TÍTULOS)</td>";
    tableC += "<td style='border: 1px solid black;'>INSTRUCCIÓN FORMAL</td>";
    tableC += "<td style='border: 1px solid black;'>CAMPO/    ADMINISTRATIVO</td>";
    tableC += "<td style='border: 1px solid black;'>SERVIDORES CON DISCAPACIDAD</td>";
    tableC += "<td style='border: 1px solid black;'>NUMERO DE HIJOS</td>";
    tableC += "<td style='border: 1px solid black;'>HIJOS MENORES DE 5 AÑOS</td>";
    tableC += "<td style='border: 1px solid black;'>MAYORES DE 5 AÑOS</td>";
    tableC += "<td style='border: 1px solid black;'>DIRECCION</td>";
    tableC += "<td style='border: 1px solid black;'>TELEFONO INSTITUCIONAL</td>";
    tableC += "<td style='border: 1px solid black;'>EXTENSION TELEFONICA</td>";
    tableC += "<td style='border: 1px solid black;'>TELÉFONOS / CONTACTOS</td>";
    tableC += "<td style='border: 1px solid black;'>E-MAIL</td>";
    tableC += "<td style='border: 1px solid black;'>OBSERVACIONES </td>";
    tableC += "<td style='border: 1px solid black;'>ESTADO EMBARAZO </td>";

    nombre = $("#nombresfilter").val();
    cedula = $("#cedulafilter").val();
    estado_emb = "";
    if (valor_nulo_str(document.querySelector('input[name=estado_emb]:checked')) != "") {
        estado_emb = document.querySelector('input[name=estado_emb]:checked').value;
    }

    data = '';

    if (estado_emb == 1)
        dataParam = 'persona_id__estado_embarazo__in=true&';
    else
        dataParam = '';

    if (nombre != "")
        data = "persona_id__nombre_completo__icontains=" + nombre + "&";

    if (cedula != "")
        data += "persona_id__identificacion__icontains=" + cedula + "&";

    if (dataParam != "")
        data += dataParam;

    data = data.substring(0, data.length - 1);

    console.log(data);

    $.ajax({
        //url: "funcionario_data",
        url: "data_funcionarioParam",
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
                    for (i = 0; i < data.length; i++) {
                        resultIngPng = restarFechas(new Date(data[i].fecha_ingreso_png), new Date());
                        datoFechaPng = resultIngPng.split("-");
                        tipo_res = 0;
                        if (data[i].persona_id.tipo_residencia != null) {
                            if (data[i].persona_id.tipo_residencia == "f7f68165-a30a-4dbe-b9b1-b3a6a3ad7bdb")
                                tipo_res = 1;
                            else
                                tipo_res = 0;
                        }


                        tabla += "<tr>";
                        tabla += "<td style='border: 1px solid black;'>" + (i + 1) + "</td>";

                        tabla += "<td style='border: 1px solid black;'>" + data[i].persona_id.nombre_completo + "</td>";
                        tabla += "<td style='border: 1px solid black;text-align:center;'>" + data[i].persona_id.sexo + "</td>";
                        tabla += "<td style='border: 1px solid black;text-align:center;'>" + data[i].persona_id.identificacion + "</td>";
                        tabla += "<td style='border: 1px solid black;text-align:center;'>" + data[i].anio_nombramiento + "</td>";
                        if (data[i].modalidad_laboral_id != null) tabla += "<td style='border: 1px solid black;text-align:center;'>" + data[i].modalidad_laboral_id.nombre + "</td>";
                        else tabla += "<td style='border: 1px solid black;'></td>";
                        if (data[i].base_nombramiento_id != null) tabla += "<td style='border: 1px solid black;'>" + data[i].base_nombramiento_id.nombre + "</td>";
                        else tabla += "<td style='border: 1px solid black;'></td>";
                        if (data[i].provincia_id != null) tabla += "<td style='border: 1px solid black;'>" + data[i].provincia_id.descripcion + "</td>";
                        else tabla += "<td style='border: 1px solid black;'></td>";
                        if (tipo_res == 1) tabla += "<td style='border: 1px solid black;'>X</td>";
                        else tabla += "<td style='border: 1px solid black;'></td>";
                        if ((data[i].persona_id.numero_residencia != null) && (tipo_res == 1)) tabla += "<td style='border: 1px solid black;'>" + data[i].persona_id.numero_residencia + "</td>";
                        else tabla += "<td style='border: 1px solid black;'></td>";
                        if (data[i].isla_trabaja_id != null) tabla += "<td style='border: 1px solid black;'>" + data[i].isla_trabaja_id.descripcion + "</td>";
                        else tabla += "<td style='border: 1px solid black;'></td>";
                        if (data[i].parroquia_trabaja_id != null) tabla += "<td style='border: 1px solid black;'>" + data[i].parroquia_trabaja_id.nombre + "</td>";
                        else tabla += "<td style='border: 1px solid black;'></td>";
                        if (data[i].persona_id.libreta_militar != null) tabla += "<td style='border: 1px solid black;text-align:center;'>" + data[i].persona_id.libreta_militar + "</td>";
                        else tabla += "<td style='border: 1px solid black;'></td>";
                        if (data[i].persona_id.tipo_sangre != null) tabla += "<td style='border: 1px solid black;'>" + data[i].persona_id.tipo_sangre + "</td>";
                        else tabla += "<td style='border: 1px solid black;'></td>";
                        if (data[i].persona_id.estado_civil != null) tabla += "<td style='border: 1px solid black;'>" + data[i].persona_id.estado_civil + "</td>";
                        else tabla += "<td style='border: 1px solid black;'></td>";

                        acumMayor5 = 0;
                        acumMenor5 = 0;
                        acumHijos = 0;
                        nombre_conyugue = "";

                        if (data[i].perfuncionariofamiliar_id.length > 0) {
                            for (x = 0; x < data[i].perfuncionariofamiliar_id.length; x++) {
                                if (data[i].perfuncionariofamiliar_id[x].parentesco.valor == "ESPOSO")
                                    nombre_conyugue = data[i].perfuncionariofamiliar_id[x].familiar_id.nombre_completo;
                                if (data[i].perfuncionariofamiliar_id[x].parentesco.valor == "HIJO") {
                                    if (data[i].perfuncionariofamiliar_id[x].familiar_id.fecha_nacimiento != null) {
                                        resultIngPngH = restarFechas(new Date(data[i].perfuncionariofamiliar_id[x].familiar_id.fecha_nacimiento), new Date());
                                        datoFechaNacH = resultIngPngH.split("-");
                                        edadH = datoFechaNacH[0];

                                        acumHijos = acumHijos + 1;
                                        if (edadH > 5)
                                            acumMayor5 = acumMayor5 + 1;
                                        else
                                            acumMenor5 = acumMenor5 + 1;
                                        data[i].perfuncionariofamiliar_id[x].parentesco.valor
                                    }
                                }
                            }
                        }

                        if ((data[i].persona_id.estado_civil == "C") || (data[i].persona_id.estado_civil == "UH")) {
                            tabla += "<td style='border: 1px solid black;'>" + nombre_conyugue + "</td>";
                        } else tabla += "<td style='border: 1px solid black;'></td>"; /*nombre del conyugue*/

                        if (data[i].cargo_institucional_id != null) tabla += "<td style='border: 1px solid black;'>" + data[i].cargo_institucional_id.nombre + "</td>";
                        else tabla += "<td style='border: 1px solid black;'></td>";
                        if (data[i].cargo_distributivo_id != null) tabla += "<td style='border: 1px solid black;'>" + data[i].cargo_distributivo_id.nombre + "</td>";
                        else tabla += "<td style='border: 1px solid black;'></td>";
                        if (data[i].cargo_ocupacional_id != null) tabla += "<td style='border: 1px solid black;'>" + data[i].cargo_ocupacional_id.nombre + "</td>";
                        else tabla += "<td style='border: 1px solid black;'></td>";
                        if (data[i].rmu != null) tabla += "<td style='border: 1px solid black;text-align:center;'>" + data[i].rmu + "</td>";
                        else tabla += "<td style='border: 1px solid black;'></td>";
                        if (data[i].direccion_estatuto_id != null) tabla += "<td style='border: 1px solid black;'>" + data[i].direccion_estatuto_id.name + "</td>";
                        else tabla += "<td style='border: 1px solid black;'></td>";
                        if (data[i].proceso_estatuto_id != null) tabla += "<td style='border: 1px solid black;'>" + data[i].proceso_estatuto_id.name + "</td>";
                        else tabla += "<td style='border: 1px solid black;'></td>";
                        if (data[i].subproceso_estatuto_id != null) tabla += "<td style='border: 1px solid black;'>" + data[i].subproceso_estatuto_id.name + "</td>";
                        else tabla += "<td style='border: 1px solid black;'></td>";
                        if (data[i].fecha_ingreso_png != null) tabla += "<td style='border: 1px solid black;text-align:center;'>" + data[i].fecha_ingreso_png + "</td>";
                        else tabla += "<td style='border: 1px solid black;'></td>";

                        tabla += "<td style='border: 1px solid black;text-align:center;'>" + datoFechaPng[0] + "</td>"; /*anios gestion*/
                        tabla += "<td style='border: 1px solid black;text-align:center;'>" + datoFechaPng[1] + "</td>"; /*#meses gestion*/
                        tabla += "<td style='border: 1px solid black;text-align:center;'></td>"; /*salida*/
                        tabla += "<td style='border: 1px solid black;'></td>"; /*razon salida*/
                        tabla += "<td style='border: 1px solid black;text-align:center;'></td>"; /*inicio*/
                        tabla += "<td style='border: 1px solid black;text-align:center;'></td>"; /*fin*/

                        if (data[i].persona_id.fecha_nacimiento != null) {
                            dataFecNac = data[i].persona_id.fecha_nacimiento.split("-");
                            mesNac = getMes(dataFecNac[1]);
                        } else {
                            mesNac = "";
                        }

                        tabla += "<td style='border: 1px solid black;text-align:center;'>" + mesNac + "</td>"; /*mes nacimineto*/


                        if (data[i].persona_id.fecha_nacimiento != null) {
                            tabla += "<td style='border: 1px solid black;text-align:center;'>" + data[i].persona_id.fecha_nacimiento + "</td>";
                            resultIngPng = restarFechas(new Date(data[i].persona_id.fecha_nacimiento), new Date());
                            datoFechaNac = resultIngPng.split("-");
                            edad = datoFechaNac[0];
                        } else {
                            tabla += "<td style='border: 1px solid black;'></td>";
                            edad = "";
                        }

                        tabla += "<td style='border: 1px solid black;text-align:center;'>" + edad + "</td>"; /*edad*/
                        if (data[i].persona_id.lugar_nacimiento != null) tabla += "<td style='border: 1px solid black;'>" + data[i].persona_id.lugar_nacimiento + "</td>";
                        else tabla += "<td style='border: 1px solid black;'></td>"; /*lugar nacimiento*/
                        if (data[i].regimen_laboral != null) tabla += "<td style='border: 1px solid black;text-align:center;'>" + data[i].regimen_laboral + "</td>";
                        else tabla += "<td style='border: 1px solid black;'></td>";
                        if (data[i].grado != null) tabla += "<td style='border: 1px solid black;text-align:center;'>" + data[i].grado + "</td>";
                        else tabla += "<td style='border: 1px solid black;'></td>";
                        if (data[i].escala != null) tabla += "<td style='border: 1px solid black;text-align:center;'>" + data[i].escala + "</td>";
                        else tabla += "<td style='border: 1px solid black;'></td>";
                        if (data[i].rol_profesional == true) tabla += "<td style='border: 1px solid black;'>x</td>";
                        else tabla += "<td style='border: 1px solid black;'></td>";
                        if (data[i].rol_profesional == false) tabla += "<td style='border: 1px solid black;'>x</td>";
                        else tabla += "<td style='border: 1px solid black;'></td>"; /*rol profesional sin titulo*/
                        tabla += "<td style='border: 1px solid black;'></td>"; /*servidores con regiomen disciplinario*/
                        if (data[i].clasificacion_proceso != null) tabla += "<td style='border: 1px solid black;'>" + data[i].clasificacion_proceso + "</td>";
                        else tabla += "<td style='border: 1px solid black;'></td>";
                        if (data[i].persona_id.formacion_academica != null) tabla += "<td style='border: 1px solid black;'>" + data[i].persona_id.formacion_academica + "</td>";
                        else tabla += "<td style='border: 1px solid black;'></td>";
                        if (data[i].persona_id.grado_academico != null) tabla += "<td style='border: 1px solid black;'>" + data[i].persona_id.grado_academico + "</td>";
                        else tabla += "<td style='border: 1px solid black;'></td>";
                        if (data[i].modalidad_laboral_id != null) tabla += "<td style='border: 1px solid black;'>" + data[i].modalidad_laboral_id.nombre + "</td>";
                        else tabla += "<td style='border: 1px solid black;'></td>";
                        if (data[i].discapacitado == true) tabla += "<td style='border: 1px solid black;text-align:center;'>X</td>";
                        else tabla += "<td style='border: 1px solid black;'></td>"; /*servidor con discapacidad*/
                        tabla += "<td style='border: 1px solid black;text-align:center;'>" + acumHijos + "</td>"; /*num hijos*/
                        tabla += "<td style='border: 1px solid black;text-align:center;'>" + acumMenor5 + "</td>"; /*num hijos menores edad*/
                        tabla += "<td style='border: 1px solid black;text-align:center;'>" + acumMayor5 + "</td>"; /*num hijos mayores edad*/
                        if (data[i].direccion_domicilio != null) tabla += "<td style='border: 1px solid black;'>" + data[i].direccion_domicilio + "</td>";
                        else tabla += "<td style='border: 1px solid black;'></td>";
                        if (data[i].telefono_institucional != null) tabla += "<td style='border: 1px solid black;text-align:center;'>" + data[i].telefono_institucional + "</td>";
                        else tabla += "<td style='border: 1px solid black;'></td>";
                        if (data[i].extension_telefonica != null) tabla += "<td style='border: 1px solid black;text-align:center;'>" + data[i].extension_telefonica + "</td>";
                        else tabla += "<td style='border: 1px solid black;'></td>";
                        if (data[i].telefonos_contacto != null) tabla += "<td style='border: 1px solid black;text-align:center;'>" + data[i].telefonos_contacto + "</td>";
                        else tabla += "<td style='border: 1px solid black;'></td>";
                        if (data[i].email != null) tabla += "<td style='border: 1px solid black;text-align:center;'>" + data[i].email + "</td>";
                        else tabla += "<td style='border: 1px solid black;'></td>";
                        if (data[i].observaciones != null) tabla += "<td style='border: 1px solid black;'>" + data[i].observaciones + "</td>";
                        else tabla += "<td style='border: 1px solid black;'></td>";
                        if (data[i].persona_id.estado_embarazo == true) tabla += "<td style='border: 1px solid black;'>x</td>";
                        else tabla += "<td style='border: 1px solid black;'></td>";
                        tabla += "</tr>";
                    }
                }

                tablaP = "<table>"
                tablaP += tableC;
                tablaP += "<body>";
                tablaP += tabla;
                tablaP += "</body>";
                tablaP += "</table>";

                var uri = 'data:application/vnd.ms-excel;base64; charset=UTF-8,',
                    template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8"></head><body><table>{table}</table></body></html>',
                    base64 = function(s) {
                        return window.btoa(unescape(encodeURIComponent(s)))
                    },
                    format = function(s, c) {
                        return s.replace(/{(\w+)}/g, function(m, p) {
                            return c[p];
                        })
                    }

                var ctx = {
                    worksheet: name || 'Worksheet',
                    table: tablaP
                }
                window.location.href = uri + base64(format(template, ctx))
            }
        },
        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
            //console.log( JSON.stringify(data));
        },
    });
}

/*solicitud Permiso*/
/*funcion para limpiar formulario de ingreso y actualizacion de SolicitudPermiso*/
function limpiarFormSolicitudPermiso() {
    formulario = $("#content_TramiteSP").val();

    $("#tituloTraSol").html("Registrar ");
    $('#idSolTramite').val();
    $('#tipot_Sol').val(0);
    $('#idFunSolTramite').val(0);

    clearForm(frm_TramiteSol);

    $('#nombrefuncionarioTra').val($('#slt_persona_nombres').val());
    $('#idFunSolTramite').val($('#slt_funcionario_id').val());
    $('#slt_isla_trabaja_nm').val($('#slt_isla_trabaja_nm_tmp').val());
    $('#cedfuncionarioTrx').val('0');
    $('#nombrefuncionarioTra').val('');
}

/*funcion para verificar si se realiza una insercion o una actualizacion*/
/*el valor del if se llena con 0 cuando se da click en el boton nuevo y con 1 cuando se da clik en editar*/
function setInsertUpdateSolicitudPermiso(param) {

    if (param == "BORRADOR") {
        $('#slt_estado_tramite').val("BORRADOR");
    } else {
        $('#slt_estado_tramite').val('TRAMITE');
    }

    valida = validaContenedor("addTramiteSP");
    if (valida) {
        if ($("#tipot_Sol").val() == 0)
            insertarTablaSolicitudPermiso();
        else
            saveEditSolicitudPermiso();
    }
}

/*funcion para asignar los datos al formulario*/
/*parametros id ---> id tabla*/
function editSolicitudPermiso(id) {
    limpiarFormSolicitudPermiso();
    formulario = $("#content_TramiteSP").val();

    $("#tipot_Sol").val(1);
    $("#tituloTraSol").html("Editar ");
    $("#idSolTramite").val(id);

    $.ajax({
        url: "solicitud_data",
        type: "get",
        data: {
            "data": id
        },
        dataType: "json",

        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
            } else {

                fecha1 = data[0].fecha_desde.split(' ');
                fechaDesde = fecha1[0];
                horaDesde = fecha1[1].split(':');
                hora1 = horaDesde[0] + ':' + horaDesde[1];
                fecha2 = data[0].fecha_hasta.split(' ');
                fechaHasta = fecha2[0];
                horaHasta = fecha2[1].split(':');
                hora2 = horaHasta[0] + ':' + horaHasta[1];

                fechaAux = fechaDesde;
                fechaAuxArr = fechaAux.split('-');

                cadenaNumSol = "";
                if (data[0].num_solicitud < 1000000)
                    cadenaNumSol = fechaAuxArr[0] + '-0' + data[0].num_solicitud;
                if (data[0].num_solicitud < 100000)
                    cadenaNumSol = fechaAuxArr[0] + '-00' + data[0].num_solicitud;
                if (data[0].num_solicitud < 10000)
                    cadenaNumSol = fechaAuxArr[0] + '-000' + data[0].num_solicitud;
                if (data[0].num_solicitud < 1000)
                    cadenaNumSol = fechaAuxArr[0] + '-0000' + data[0].num_solicitud;
                if (data[0].num_solicitud < 100)
                    cadenaNumSol = fechaAuxArr[0] + '-00000' + data[0].num_solicitud;
                if (data[0].num_solicitud < 10)
                    cadenaNumSol = fechaAuxArr[0] + '-000000' + data[0].num_solicitud;

                $('#numsolicitudTra').val(cadenaNumSol);
                $('#idFunSolTramite').val(data[0].funcionario_id.id);
                $('#nombrefuncionarioTra').val(data[0].funcionario_id.persona_id.nombre_completo);
                $('#SmotivoTrx').val(data[0].motivo_id.id).trigger("change");
                $('#fdesdetramite').val(fechaDesde);
                $('#hdesdetramite').val(hora1);
                $('#fhastatramite').val(fechaHasta);
                $('#hhastatramite').val(hora2);
                $('#observacion_SolTra').val(data[0].observaciones);
                $("#pms_revisor_id").val(data[0].revisor_id.id).trigger("change");
                $('#slt_isla_trabaja_nm').val(data[0].funcionario_id.isla_trabaja_id.descripcion);
                $('#slt_estado_tramite').val(data[0].estado_tramite);

                $('#slt_observacion_revisor').val(data[0].observaciones_revisor);
                $('#slt_observacion_aprobador').val(data[0].observaciones_aprobador);

                $('#slt_estado_aprobador').val(data[0].estado_aprobador);

                if (data[0].estado_revisor == 'A')
                    document.getElementById("slt_estado_revisorA").checked = true;
                if (data[0].estado_revisor == 'R')
                    document.getElementById("slt_estado_revisorR").checked = true;
            }
        },
        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
            //console.log( JSON.stringify(data));
        },
    });


}

/*funcion para insertar en la base de datos*/
function insertarTablaSolicitudPermiso() {

    funcionario_id = $('#idFunSolTramite').val();
    funcionario_id = $('#idFunSolTramite').val();
    motivo = $('#SmotivoTrx').val();
    fechadesde = $('#fdesdetramite').val().toString("yy-mm-dd");
    horadesde = $('#hdesdetramite').val().toString("HH:mm");
    fechahasta = $('#fdesdetramite').val().toString("yy-mm-dd");
    horahasta = $('#hhastatramite').val().toString("HH:mm");
    observacion = $('#observacion_SolTra').val();

    estado_tramite = $('#slt_estado_tramite').val();
    revisor_id = $("#pms_revisor_id option:selected").val()

    fecha_aux = fechadesde;
    fecha_auxArr = fecha_aux.split('-');

    fecha1 = fechadesde + " " + horadesde;
    fecha2 = fechahasta + " " + horahasta;

    $.ajax({
        url: "data_secuencia",
        type: "get",
        data: {
            "data": "SP_" + fecha_auxArr[0]
        },
        dataType: "json",
        async: false,
        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
            } else {

                codigo_secuencia = data[0].id;
                valor_secuencia = data[0].valor;
                console.log(codigo_secuencia + '*******' + valor_secuencia);
            }
        },
        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
            //console.log( JSON.stringify(data));
        },
    });

    id_padre = $('#content_TramiteSP').parent().attr('id');
    datos = '{"funcionario_id":"' + funcionario_id + '", "motivo_id":"' + motivo + '", "fecha_desde":"' + fecha1 + '", "fecha_hasta":"' + fecha2 + '", "observaciones":"' + observacion + '","num_solicitud":"' + valor_secuencia + '","estado_tramite":"' + estado_tramite + '","revisor_id":"' + revisor_id + '" }';
    th_insert(datos, "SP_iniciarTramite", id_padre, "perfuncionariopermisos");
    datosSec = '{"valor":"' + (valor_secuencia + 1) + '"}';
    th_update(datosSec, "", "", "sissecuencia", codigo_secuencia);

}

/*funcion para editar en la base de datos*/
/*el id se lo guarda en un campo oculto al momento de dar clik en editar*/
function saveEditSolicitudPermiso() {

    funcionario_id = $('#idFunSolTramite').val();
    motivo = $('#SmotivoTrx').val();
    fechadesde = $('#fdesdetramite').val();
    horadesde = $('#hdesdetramite').val();
    fechahasta = $('#fhastatramite').val();
    horahasta = $('#hhastatramite').val();
    observacion = $('#observacion_SolTra').val();
    revisor_id = $("#pms_revisor_id option:selected").val()
    estado_tramite = $('#slt_estado_tramite').val();


    fecha1 = fechadesde + " " + horadesde;
    fecha2 = fechahasta + " " + horahasta;

    id = $('#idSolTramite').val();

    id_padre = $('#content_TramiteSP').parent().attr('id');

    datos = '{"funcionario_id":"' + funcionario_id + '", "motivo_id":"' + motivo + '", "fecha_desde":"' + fecha1 + '", "fecha_hasta":"' + fecha2 + '", "observaciones":"' + observacion + '","revisor_id":"' + revisor_id + '","estado_tramite":"' + estado_tramite + '"}';

    $("#td_tipo_" + id).html($("#SmotivoTrx option:selected").text());
    $("#td_fechad_" + id).html(fecha1);
    $("#td_fechah_" + id).html(fecha2);
    $("#td_estadotramite_" + id).html(estado_tramite);

    salida = th_update(datos, "SP_iniciarTramite", id_padre, "perfuncionariopermisos", id);
}

/*funcion para eliminar(cambio de estado en la base de datos)*/
function deleteSolicitudPermiso(id) {
    id_padre = $('#content_TramiteSP').parent().attr('id');
    datos = '{"estado":"I","eliminado":"t"}';
    th_delete(datos, "SP_iniciarTramite", id_padre, "perfuncionariopermisos", id);
}

/*funcion para generar pdf de la solicitud*/
function verPdfSolicitud(id) {

    $(".pdf").each(function() {
        console.log($(this).attr("type"));
        if ($(this).attr("type") == 'checkbox')
            $("#" + $(this).attr("id")).prop('checked', false);
        $("#" + $(this).attr("id")).html("");
    });

    $.ajax({
        url: "solicitud_data",
        type: "get",
        data: {
            "data": id
        },
        dataType: "json",

        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
            } else {

                fecha1 = data[0].fecha_desde.split('T');
                fechaDesde = fecha1[0];
                horaDesde = fecha1[1].split(':');
                hora1 = horaDesde[0] + ':' + horaDesde[1];
                fecha2 = data[0].fecha_hasta.split('T');
                fechaHasta = fecha2[0];
                horaHasta = fecha2[1].split(':');
                hora2 = horaHasta[0] + ':' + horaHasta[1];

                fechaAux = fechaDesde;
                fechaAuxArr = fechaAux.split('-');

                f1 = new Date(fechaDesde + ' ' + hora1)
                f2 = new Date(fechaHasta + ' ' + hora2)
                diff = f2 - f1;

                var HH = Math.floor(diff / 3600000);
                var MM = Math.floor(diff % 3600000) / 60000;


                cadenaHora = "";
                dd = Math.trunc(HH / 24);
                console.log(dd);

                if (dd > 0) {
                    HH = Math.trunc(HH % 24);
                    cadenaHora = dd + ' dia(s) ';
                } else {
                    cadenaHora = "";
                }
                console.log(cadenaHora);
                var formatted = ((HH < 10) ? ("0" + HH) : HH) + ":" + ((MM < 10) ? ("0" + MM) : MM)

                $('#for_totalh').html(cadenaHora + "&nbsp;" + formatted);

                fechaIni = fechaDesde.split('-');

                if (data[0].motivo_id.valor == 1)
                    $('#for_asunto').html('X');
                if (data[0].motivo_id.valor == 2)
                    $('#for_enfermedad').html('X');
                if (data[0].motivo_id.valor == 3)
                    $('#for_calamidad').html('X');
                if (data[0].motivo_id.valor == 4)
                    $('#for_particular').html('X');

                cadenaNumSol = "";
                if (data[0].num_solicitud < 1000000)
                    cadenaNumSol = fechaAuxArr[0] + '-0' + data[0].num_solicitud;
                if (data[0].num_solicitud < 100000)
                    cadenaNumSol = fechaAuxArr[0] + '-00' + data[0].num_solicitud;
                if (data[0].num_solicitud < 10000)
                    cadenaNumSol = fechaAuxArr[0] + '-000' + data[0].num_solicitud;
                if (data[0].num_solicitud < 1000)
                    cadenaNumSol = fechaAuxArr[0] + '-0000' + data[0].num_solicitud;
                if (data[0].num_solicitud < 100)
                    cadenaNumSol = fechaAuxArr[0] + '-00000' + data[0].num_solicitud;
                if (data[0].num_solicitud < 10)
                    cadenaNumSol = fechaAuxArr[0] + '-000000' + data[0].num_solicitud;

                $('#for_numSol').html(cadenaNumSol);
                $('#for_lugar').html(data[0].funcionario_id.isla_trabaja_id.descripcion + ", " + fechaIni[2] + ' de ' + getMes(fechaIni[1]) + ' del ' + fechaIni[0]);
                $('#for_nombreFun').html(data[0].funcionario_id.persona_id.nombre_completo);
                if (data[0].funcionario_id.proceso_estatuto_id != null)
                    $('#for_proceso').html(data[0].funcionario_id.proceso_estatuto_id.name);
                else
                    $('#for_proceso').html("");
                $('#for_hdesde').html(hora1);
                $('#for_hhasta').html(hora2);
                $('#for_fechas').html(fechaDesde + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + fechaHasta);
                $('#for_observacion').html(data[0].observaciones);

            }
        },
        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
        },
    });
}

/*funcion para actualizar el estado de la solicitud de permiso*/
function setUpdateSolicitudPermiso_aprobacion() {
    id = $('#idSolTramite').val();
    id_padre = $('#content_TramiteSP').parent().attr('id');
    slt_perfil = $('#slt_perfil').val();

    slt_estado_revisor = slt_estado_aprobador = "";
    slt_observacion_revisor = slt_observacion_aprobador = "";

    if (slt_perfil == "REVISOR") {
        slt_observacion_revisor = $('#slt_observacion_revisor').val();
        if (document.querySelector('input[name=slt_estado_revisor]:checked') != null) {
            slt_estado_revisor = document.querySelector('input[name=slt_estado_revisor]:checked').value
        }

        datos = '{"observaciones_revisor":"' + slt_observacion_revisor + '","estado_revisor":"' + slt_estado_revisor + '"}';

    } else {
        if (slt_perfil == "APROBADOR") {
            aprobador_id = $('#slt_aprobador_id').val();
            slt_observacion_aprobador = $('#slt_observacion_aprobador').val();
            if (document.querySelector('input[name=slt_estado_aprobador]:checked') != null) {
                slt_estado_aprobador = document.querySelector('input[name=slt_estado_aprobador]:checked').value
            }

            datos = '{"observaciones_aprobador":"' + slt_observacion_aprobador + '","estado_aprobador":"' + slt_estado_aprobador + '","aprobador_id":"' + aprobador_id + '"}';

        }
    }

    datos = datos.replace(/\"\"/g, null);
    salida = th_update(datos, "SP_iniciarTramite", id_padre, "perfuncionariopermisos", id);

    band = 0;
    if ($("#slt_observacion_revisor").hasClass("revisado")) {
        band = 0;
    } else {
        if ((document.querySelector('input[name=slt_estado_revisor]:checked') != null)) {
            band = 1;
        }
    }
    if ((document.querySelector('input[name=slt_estado_aprobador]:checked') != null)) {
        band = 1;
    }

    console.log(band + '-----band');
    if (band == 1) {
        var pos = document.getElementById("idx_tabla_tramites").value;
        var table = $('#tabla_tramitesS').dataTable();
        table.fnDeleteRow(parseInt(pos), null, true);
    }
}


/*asistencia*/
/*obtener datos de la asistencia*/
function getDataFuncAsistencia(json) {
    $("#nombrefuncionarioCont").val(json[0].persona_id.apellidos + ' ' + json[0].persona_id.nombres);
    $("#funcionariocedCont").val(json[0].persona_id.identificacion);
    $("#funcionarioidCont").val(json[0].id);
}

/*funcion para limpiar formulario de ingreso y actualizacion de ControlS*/
function limpiarFormControlS() {
    clearForm(frm_controlS);
    $("#tituloContS").html("Ingresar");
    $('#funcionarioidCont').val();
    $('#tipot_contS').val(0);
    var today = moment().format('YYYY-MM-DD');
    document.getElementById("fec_control").value = today;
}

/*Muestra datos sancion en formulario*/
/*funcion para asignar los datos al formulario*/
/*parametros id ---> id tabla*/
function editControl_SP(id) {
    clearForm(frm_controlS);
    $("#tipot_contS").val(1);
    $("#tituloContS").html("Editar");
    $("#idcontrolS").val(id);

    $.ajax({
        url: "data_control",
        type: "get",
        cache: 'false',
        data: {
            "data": id
        },
        dataType: "json",

        success: function(json) {
            $("#modalLoadin").hide();
            if (json['error']) {
                if (json['error']['context'])
                    var salida = json['error']['context']['resource'][0].message;
                else
                    var salida = json['error']['message']
            } else {
                $("#nombrefuncionarioCont").val(json[0].funcionario_id.persona_id.nombre_completo);
                $("#funcionarioidCont").val(json[0].funcionario_id.id);
                $("#funcionariocedCont").val(json[0].funcionario_id.persona_id.identificacion);
                $("#fec_control").val(json[0].fecha);

                tipoArr = json[0].tipo.split('|');
                for (i = 0; i < tipoArr.length; i++) {
                    if (tipoArr[i] == 1)
                        document.getElementById("inlineCheckbox1").checked = true;
                    if (tipoArr[i] == 2)
                        document.getElementById("inlineCheckbox2").checked = true;
                    if (tipoArr[i] == 3)
                        document.getElementById("inlineCheckbox3").checked = true;
                }
                $("#observacion_control").val(json[0].observaciones);
            }
        },
        error: function(data) {
            $("#modalLoadin").hide();
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
        },
    });
}

/*Actualiza los datos sancion*/
/*funcion para editar en la base de datos*/
/*el id se lo guarda en un campo oculto al momento de dar clik en editar*/
function saveEditAsistencia_SP() {
    valida = validaContenedor("addControlSP");
    if (valida) {
        tipoTrx = $("#tipot_contS").val();

        if (tipoTrx == 1)
            id = $("#idcontrolS").val();

        funcionario = $('#funcionarioidCont').val();
        fecha = $('#fec_control').val();
        observacion = $('#observacion_control').val().replace(/\n\r?/g, '\\n');
        observacion = observacion.replace(/"/g,"%%");
        observacion = observacion.replace(/'/g,"%%");

        tipos = getchecked("optionTipo");
        console.log(tipos);

        if (tipos == "") {
            validaContenedorExt("addControlSP", "Error: Tipo de incidencia obligatoria");
            return 0;
        }

        datos = "{";
        datos += '"funcionario_id":"' + funcionario + '",';
        datos += '"fecha":"' + fecha + '",';
        datos += '"tipo":"' + tipos + '",';
        if (tipoTrx == 0)
            datos += '"estado_notificacion":"CREADO",';
        datos += '"observaciones":"' + observacion + '"';
        datos += "}";

        datos = datos.replace(/undefined/g, null);
        datos = datos.replace(/None/g,null);
        datos = datos.replace(/False/g,"'false'");
        datos = datos.replace(/True/g,"'true'");
        datos = datos.replace(/'/g,'"');
        datos = datos.replace(/"null"/g, null);
        datos = datos.replace(/\"\"/g, null);
        datos = datos.replace(/%%/g, "'");

        id_padre = $('#content_controlS').parent().attr('id');

        if (tipoTrx == 0)
            salida = th_insert(datos, "SP_asistencia", id_padre, "perfuncionariocontrolesrrhh",0,false);
        else
            salida = th_update(datos, "SP_asistencia", id_padre, "perfuncionariocontrolesrrhh", id);

        if (tipoTrx == 1) {
            tipoArr = tipos.split('|');
            cadenaTipo = "";
            for (i = 0; i < tipoArr.length; i++) {
                if (tipoArr[i] == "1")
                    cadenaTipo += "CARNET,";
                if (tipoArr[i] == "2")
                    cadenaTipo += "UNIFORME,";
                if (tipoArr[i] == "3")
                    cadenaTipo += "EN SITIO,";
            }
            cadenaTipo = cadenaTipo.substring(0, cadenaTipo.length - 1);

            $("#td_tipo_" + id).html(cadenaTipo);
            $("#td_fecha_" + id).html(fecha);
        }
    }
}

/*funcion para eliminar(cambio de estado en la base de datos)*/
function deleteControlAsistencia(id) {
    id_padre = $('#content_controlS').parent().attr('id');
    datos = '{"estado":"I","eliminado":"t"}';
    th_delete(datos, "SP_asistencia", id_padre, "perfuncionariocontrolesrrhh", id);
    /*eliminar funcionario*/
}

//CarnetizCargos

/*funcion para limpiar formulario de ingreso y actualizacion de CarnetizCargos*/
function limpiarFormCarnetizCargos() {
    formulario = $("#cont_form_ctnzcargos").val();
    $(".bodypopupGeneral").attr('id', 'bodyaddctnzcargos');
    $("#content_body").html("");
    $("#content_body").append(formulario);
    $("#stackbox_save").attr('onClick', 'setInsertUpdateCntzCargo();');

    $("#tituloPopup").html("Registrar Cargo Carnetización");
    $('#cntzcargo_id').val("");
    $('#cntzcargo_tipo').val(0);
    clearForm(frm_cntz_cargos);
}

/*funcion para verificar si se realiza una insercion o una actualizacion*/
/*el valor del if se llena con 0 cuando se da click en el boton nuevo y con 1 cuando se da clik en editar*/
function setInsertUpdateCntzCargo() {
    valida = validaContenedor("addctnzcargos");

    if (valida) {
        if ($("#cntzcargo_tipo").val() == 0)
            insertarTablaCntzCargo();
        else
            saveEditCntzCargo();
    }
}

/*funcion para asignar los datos al formulario*/
/*parametros id ---> id tabla*/
function editCntzCargo(id) {
    formulario = $("#cont_form_ctnzcargos").val();
    $(".bodypopupGeneral").attr('id', 'bodyaddctnzcargos');
    $("#content_body").html("");
    $("#content_body").append(formulario);
    $("#stackbox_save").attr('onClick', 'setInsertUpdateCntzCargo();');

    $("#cntzcargo_tipo").val(1);
    $("#tituloPopup").html("Editar Cargo Carnetización");
    $("#cntzcargo_id").val(id);

    estado = $("#td_estado_" + id).html();
    descripcion = $("#td_label_" + id).html();
    observacion = $("#td_observacion_" + id).val();

    $("#cntzcargo_descrip").val(descripcion);
    $("#cntzcargo_estado").val(estado).trigger("change");
    $("#cntzcargo_observacion").val(observacion);
}

/*funcion para insertar en la base de datos*/
function insertarTablaCntzCargo() {

    desc_cargo = $('#cntzcargo_descrip').val();
    estado = $('#cntzcargo_estado').val();
    observacion = $('#cntzcargo_observacion').val();

    id_padre = $('#content_cntz_cargos').parent().attr('id');
    datos = '{"categoria":"CARGO_CARNET","label":"' + desc_cargo + '","valor":"' + desc_cargo + '", "observacionesdba":"' + observacion + '"}';
    th_insert(datos, "CZ_carnetizacionCargos", id_padre, "siscatalogo")
}

/*funcion para editar en la base de datos*/
/*el id se lo guarda en un campo oculto al momento de dar clik en editar*/
function saveEditCntzCargo() {
    desc_cargo = $('#cntzcargo_descrip').val();
    estado = $('#cntzcargo_estado').val();
    observacion = $('#cntzcargo_observacion').val();
    id = $("#cntzcargo_id").val();

    id_padre = $('#content_cntz_cargos').parent().attr('id');

    datos = '{"categoria":"CARGO_CARNET","label":"' + desc_cargo + '","valor":"' + desc_cargo + '", "observacionesdba":"' + observacion + '", "estado":"' + estado + '"}';

    $("#td_label_" + id).html(desc_cargo);
    $("#td_estado_" + id).html(estado);
    $("#td_observacion_" + id).val(observacion);

    salida = th_update(datos, "CZ_carnetizacionCargos", id_padre, "siscatalogo", id);
}

/*funcion para eliminar(cambio de estado en la base de datos)*/
function deleteCntzCargo(id) {
    id_padre = $('#content_cntz_cargos').parent().attr('id');
    datos = '{"categoria":"CARGO_CARNET","estado":"I","eliminado":"t"}';
    th_delete(datos, "CZ_carnetizacionCargos", id_padre, "siscatalogo", id);
}


// Accion Personal Notificaciones

/*funcion para limpiar formulario de ingreso y actualizacion de PersonalNotificacion*/
function limpiarFormAccionPersonalNotificacion() {
    formulario = $("#cont_form_accperNotif").val();
    $(".bodypopupGeneral").attr('id', 'bodyaddAccionPersonalNotificacion');
    $("#content_body").html("");
    $("#content_body").append(formulario);
    $("#stackbox_save").attr('onClick', 'setInsertUpdateAccionPersonalNotificacion();');

    $("#tituloPopup").html("Registrar Acción Personal - Notificaciones");
    $('#accperNotif_id').val("");
    $('#accperNotif_tipo').val(0);
    clearForm(frm_accperNotif);


    
}

/*funcion para verificar si se realiza una insercion o una actualizacion*/
/*el valor del if se llena con 0 cuando se da click en el boton nuevo y con 1 cuando se da clik en editar*/
function setInsertUpdateAccionPersonalNotificacion() {
    valida = validaContenedor("addAccionPersonalNotificacion");

    if (valida) {
        if ($("#accperNotif_tipo").val() == 0)
            insertarTablaAccionPersonalNotificacion();
        else
            saveEditAccionPersonalNotificacion();
    }
}

/*funcion para asignar los datos al formulario*/
/*parametros id ---> id tabla*/
function editAccionPersonalNotificacion(id) {
    formulario = $("#cont_form_ctnzcargos").val();
    $(".bodypopupGeneral").attr('id', 'bodyaddAccionPersonalNotificacion');
    $("#content_body").html("");
    $("#content_body").append(formulario);
    $("#stackbox_save").attr('onClick', 'setInsertUpdateCntzCargo();');

    $("#cntzcargo_tipo").val(1);
    $("#tituloPopup").html("Editar Acción Personal - Notificaciones");
    $("#cntzcargo_id").val(id);

    estado = $("#td_estado_" + id).html();
    descripcion = $("#td_label_" + id).html();
    observacion = $("#td_observacion_" + id).val();

    $("#cntzcargo_descrip").val(descripcion);
    $("#cntzcargo_estado").val(estado).trigger("change");
    $("#cntzcargo_observacion").val(observacion);
}

/*funcion para insertar en la base de datos*/
function insertarTablaAccionPersonalNotificacion() {

    desc_cargo = $('#cntzcargo_descrip').val();
    estado = $('#cntzcargo_estado').val();
    observacion = $('#cntzcargo_observacion').val();

    id_padre = $('#content_cntz_cargos').parent().attr('id');

    datos = '{"categoria":"CARGO_CARNET","label":"' + desc_cargo + '","valor":"' + desc_cargo + '", "observacionesdba":"' + observacion + '"}';
    th_insert(datos, "CZ_carnetizacionCargos", id_padre, "siscatalogo")
}

/*funcion para editar en la base de datos*/
/*el id se lo guarda en un campo oculto al momento de dar clik en editar*/
function saveEditAccionPersonalNotificacion() {
    desc_cargo = $('#cntzcargo_descrip').val();
    estado = $('#cntzcargo_estado').val();
    observacion = $('#cntzcargo_observacion').val();

    id = $("#cntzcargo_id").val();

    id_padre = $('#content_cntz_cargos').parent().attr('id');

    datos = '{"categoria":"CARGO_CARNET","label":"' + desc_cargo + '","valor":"' + desc_cargo + '", "observacionesdba":"' + observacion + '", "estado":"' + estado + '"}';


    $("#td_label_" + id).html(desc_cargo);
    $("#td_estado_" + id).html(estado);
    $("#td_observacion_" + id).val(observacion);

    salida = th_update(datos, "CZ_carnetizacionCargos", id_padre, "siscatalogo", id);
}

/*funcion para eliminar(cambio de estado en la base de datos)*/
function deleteAccionPersonalNotificacion(id) {
    id_padre = $('#content_cntz_cargos').parent().attr('id');
    datos = '{"categoria":"CARGO_CARNET","estado":"I","eliminado":"t"}';
    th_delete(datos, "CZ_carnetizacionCargos", id_padre, "siscatalogo", id);
}

/*funcion para asignar funcionarios a las acciones de personal*/
arrayFunc = [];

function asignarfuncAccion(id, funcionarios) {
    $("#idaccionPer_aux").val(id);
    arrayFunc = [];
    $("#listFunc").multiSelect('destroy');
    /*remover los selected*/
    $("#listFunc option:selected").each(function() {
        $(this).removeAttr('selected');
    });
    if (funcionarios != "None") {
        arrayFunc = funcionarios.split('|');
        console.log(id + '****' + funcionarios);
        $("#listFunc option").each(function() {
            resp = $.inArray($(this).val(), arrayFunc);
            if (resp != -1) {
                console.log("si****" + $(this).text());
                $(this).prop('selected', true);
            }
        });
    }
    $("#listFunc").multiSelect({
        afterSelect: function(values) {
            arrayFunc.push(values[0]);
            console.log(arrayFunc);
        },
        afterDeselect: function(values) {
            var indice = arrayFunc.indexOf(values[0]); // obtenemos el indice
            arrayFunc.splice(indice, 1); // 1 es la cantidad de elemento a eliminar

            console.log(arrayFunc);
        }
    });
}

/*funcion para actualizar rn la base de datos*/
function asignarfuncAccionTable() {
    console.log(arrayFunc.join('|'));
    id = $("#idaccionPer_aux").val();

    id_padre = $('#content_accion').parent().attr('id');

    datos = '{"funcionarios":"' + arrayFunc.join('|') + '"}';
    console.log(datos);

    salida = th_update(datos, "accion_personal", id_padre, "gthaccionpersonal", id);
    $('#btnAccionFun_' + id).attr('onclick', '');
    $('#btnAccionFun_' + id).attr('onclick', 'asignarfuncAccion("' + id + '","' + arrayFunc.join('|') + '")');
}

/*funcion para obtener los datos de funcionarios y generar los graficos*/
function getDataFuncionarioGra() {
    $("#modalLoadin").show();
    dataArray = [];
    $.ajax({
        url: "funcionario_data",
        type: "get",
        data: {
            "data": ""
        },
        dataType: "json",

        success: function(json) {
            $("#modalLoadin").hide();
            for (i = 0; i < json.length; i++) {

                if (json[i].modalidad_laboral_id != null) modalidad_laboral = json[i].modalidad_laboral_id.nombre;
                else modalidad_laboral = "";
                if (json[i].proceso_estatuto_id != null) proceso = json[i].proceso_estatuto_id.name;
                else proceso = "";
                if (json[i].subproceso_estatuto_id != null) subproceso = json[i].subproceso_estatuto_id.name;
                else subproceso = "";
                if (json[i].direccion_estatuto_id != null) direccion = json[i].direccion_estatuto_id.name;
                else direccion = "";
                if (json[i].cargo_ocupacional_id != null) cargo_ocupacional = json[i].cargo_ocupacional_id.nombre;
                else cargo_ocupacional = "";
                if (json[i].cargo_distributivo_id != null) cargo_distributivo = json[i].cargo_distributivo_id.nombre;
                else cargo_distributivo = "";
                if (json[i].cargo_institucional_id != null) cargo_institucional = json[i].cargo_institucional_id.nombre;
                else cargo_institucional = "";
                if (json[i].isla_trabaja_id != null) isla = json[i].isla_trabaja_id.descripcion;
                else isla = "";

                dataArray += "{";
                dataArray += '"Tipo_persona":"' + json[i].persona_id.tipo_persona + '",';
                dataArray += '"Sexo":"' + json[i].persona_id.sexo + '",';
                dataArray += '"Tipo_Residencia":"' + json[i].persona_id.tipo_residencia + '",';
                dataArray += '"Etnias":"' + json[i].persona_id.etnias + '",';
                dataArray += '"Estado_Civil":"' + json[i].persona_id.estado_civil + '",';

                dataArray += '"Tipo_Sangre":"' + json[i].persona_id.tipo_sangre + '",';
                dataArray += '"Nivel_Escolaridad":"' + json[i].persona_id.nivel_escolaridad + '",';
                dataArray += '"Grado_Academico":"' + json[i].persona_id.grado_academico + '",';

                if (json[i].persona_id.estado_embarazo == true)
                    dataEmb = 'Si';
                else
                    dataEmb = 'No';
                dataArray += '"Estado_embarazo":"' + dataEmb + '",';
                dataArray += '"Nombre":"' + json[i].persona_id.nombre_completo + '",';
                //dataArray+='"Provincia_Residencia":"'+json[i].persona_id.provincia_residencia_id+'",';
                //dataArray+='"Canton_Residencia":"'+getDataArraySession('cantones',''+json[i].persona_id.canton_residencia_id+'')+'",';
                //dataArray+='"Parroquia_Residencia":"'+getDataArraySession('parroquias',''+json[i].persona_id.parroquia_residencia_id+'')+'",';
                dataArray += '"Modalidad_Laboral":"' + modalidad_laboral + '",';
                dataArray += '"Direccion":"' + direccion + '",';
                dataArray += '"Proceso":"' + proceso + '",';
                dataArray += '"SubProceso":"' + subproceso + '",';
                dataArray += '"Cargo_Ocupacional":"' + cargo_ocupacional + '",';
                dataArray += '"Cargo_Distributivo":"' + cargo_distributivo + '",';
                dataArray += '"Cargo_Institucional":"' + cargo_institucional + '",';
                dataArray += '"Isla":"' + isla + '"';
                dataArray += "},";
            }

            dataArray = dataArray.substring(0, dataArray.length - 1);
            dataArray = "[" + dataArray + "]";
            jdataArray = jQuery.parseJSON(dataArray);

            var resultS = [];
            jdataArray.reduce(function(res, value) {
                if (!res[value.Sexo]) {
                    res[value.Sexo] = {
                        name: value.Sexo,
                        y: 0,
                        sliced: true,
                        selected: true
                    };
                    resultS.push(res[value.Sexo])
                }

                res[value.Sexo].y += 1;
                return res;
            }, {});

            var resultI = [];
            jdataArray.reduce(function(res, value) {
                if (!res[value.Isla]) {
                    res[value.Isla] = {
                        name: value.Isla,
                        y: 0,
                        sliced: true,
                        selected: true
                    };
                    resultI.push(res[value.Isla])
                }

                res[value.Isla].y += 1;
                return res;
            }, {});

            var resultD = [];
            jdataArray.reduce(function(res, value) {
                if (!res[value.Direccion]) {
                    res[value.Direccion] = {
                        name: value.Direccion,
                        y: 0,
                        sliced: true,
                        selected: true
                    };
                    resultD.push(res[value.Direccion])
                }

                res[value.Direccion].y += 1;
                return res;
            }, {});

            var resultO = [];
            jdataArray.reduce(function(res, value) {
                if (!res[value.Cargo_Ocupacional]) {
                    res[value.Cargo_Ocupacional] = {
                        name: value.Cargo_Ocupacional,
                        y: 0,
                        sliced: true,
                        selected: true
                    };
                    resultO.push(res[value.Cargo_Ocupacional])
                }

                res[value.Cargo_Ocupacional].y += 1;
                return res;
            }, {});

            Highcharts.chart('containerGrF1', {
                chart: {
                    type: 'pie',
                    options3d: {
                        enabled: true,
                        alpha: 45,
                        beta: 0
                    }
                },
                title: {
                    text: 'Funcionarios Por Genero'
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
                    name: 'Total',
                    data: resultS
                }]
            })

            Highcharts.chart('containerGrF2', {
                chart: {
                    type: 'pie',
                    options3d: {
                        enabled: true,
                        alpha: 45,
                        beta: 0
                    }
                },
                title: {
                    text: 'Funcionarios Por Isla'
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
                    name: 'Total',
                    data: resultI
                }]
            })

            Highcharts.chart('containerGrF3', {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie',
                    options3d: {
                        enabled: true,
                        alpha: 45,
                        beta: 0
                    }
                },
                title: {
                    text: 'Funcionarios Por Direccion'
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
                    name: 'Total',
                    data: resultD
                }]
            })

            Highcharts.chart('containerGrF4', {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie',
                    options3d: {
                        enabled: true,
                        alpha: 45,
                        beta: 0
                    }
                },
                title: {
                    text: 'Funcionarios Por Grupo Ocupacional'
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
                    name: 'Total',
                    data: resultO
                }]
            })
        },
        error: function(json) {
            $("#modalLoadin").hide();
            swal("", "Error: " + JSON.stringify(json), "error");
            console.log(JSON.stringify(json));
        },
    });
}

/*funcion para actualizar las tablas de las pestañas abiertas segun la accion que se realize en accion de personal*/
function verTabs(cadena) {
    var json = JSON.parse("[" + cadena + "]");
    dataTab = '';
    if ((json[0].tipo_trx == '6bed0559-5d87-46aa-a42a-42caab5b421b') || (json[0].tipo_trx == '2c27f7da-d578-4c33-ba43-1c8cbbcfa8d4') || (json[0].tipo_trx == '220d4e36-2e2c-4885-bd33-5e6e75f35896'))
        dataTab = 'SP_traslados';
    if ((json[0].tipo_trx == '59918445-f38d-4c70-868c-51521f1480c2') || (json[0].tipo_trx == '9d5ed44e-864f-41d9-9dbe-1862863e1ced'))
        dataTab = 'SP_encargos';
    if ((json[0].tipo_trx == '1a7c2e1d-bd87-4f49-ba2b-2f9bf0788f0b'))
        dataTab = 'SP_licencias';
    if ((json[0].tipo_trx == 'b8bb4fde-28a6-41ff-9838-09b8c7e70843'))
        dataTab = 'SP_ingresos';

    if (dataTab != "") {
        $("#tabs_ul li").each(function() {
            if ($(this).attr("tab_name") == dataTab) {
                if (dataTab == 'SP_traslados')
                    buscarTraspasoParametros();
                if (dataTab == 'SP_encargos')
                    buscarEncargosParametros();
                if (dataTab == 'SP_licencias')
                    buscarLicenciaParametros();
                if (dataTab == 'SP_ingresos')
                    buscarIngresosParametros();
            }
            return 0;
        });
    }
}


/*funcion para indicar que un puesto ya esta siendo ocupado por un funcionario al momento de realizar una accion de personal*/
$("#SsitpuestDistSP").change(function(e, data) {
    accion = $("#SitemAcc option:selected").text();
    otro = $("#SitemAccOtro option:selected").text();
    if ((accion.indexOf("ENCARGO") != -1) || (otro.indexOf("ENCARGO") != -1)) {

        if (data) {
            return 0;
        } else {
            data = "nuevo_puesto_id=" + this.value + "&estado_ejecucion__in=A,C,P";
            dataFun = "";
            $.ajax({
                url: "data_encargosParam",
                type: "get",
                data: {
                    "data": data
                },
                dataType: "json",
                async: true,

                success: function(json) {
                    if (json.length > 0) {
                        $("#accp_bandera_SitProp").val(1);
                        for (i = 0; i < json.length; i++) {
                            dataFun += 'Funcionario:' + json[i].funcionario_id.persona_id.nombre_completo + '<br>';
                        }
                        validaContenedorExt("addAccPersonal", "El Puesto Propuesto ya esta asignado a el/los funcionario(s)<br>" + dataFun);
                    } else {
                        $("#accp_bandera_SitProp").val(0);
                        return 0;
                    }
                },
                error: function(json) {
                    $("#modalLoadin").hide();
                    swal("", "Error: " + JSON.stringify(json), "error");
                    console.log(JSON.stringify(json));
                },
            });
        }
    } else return 0;
})



/*metodo para buscar datos en tabla funcionario segun el parametro que se envie cedula/nombre /apellido*/
function buscarAccionesParametrosRep() {

    desde = $("#FdesdeParamAcc").val();
    hasta = $("#FhastaParamAcc").val();

    if ((desde == "") || (hasta == ""))
        cadenaFecha = "";
    else
        cadenaFecha = "1";

    accion = $("#SaccionParamRep").val();

    if (cadenaFecha != "") {
        desdeArr = desde.split('/');
        hastaArr = hasta.split('/');

        fdesde = desdeArr[2] + "-" + desdeArr[0] + "-" + desdeArr[1];
        fhasta = hastaArr[2] + "-" + hastaArr[0] + "-" + hastaArr[1];
    }
    data = '';

    if (cadenaFecha != "")
        data += "fecha_rige_accpersonal__range=" + fdesde + "," + fhasta + "&estado_ejecucion__in=A,C,P";

    if (accion == 1)
        url = "data_encargosParam";
    if (accion == 2)
        url = "data_licenciasParam";
    if (accion == 3)
        url = "data_trasladosParam";


    $.ajax({
        url: url,
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
                dataArray = "";
                if (data.length > 0) {
                    for (i = 0; i < data.length; i++) {
                        num_accP = data[i].num_accion_personal;

                        tabla += "<tr>";
                        tabla += "<td align='center' >" + data[i].fecha_ingreso + "</td>";
                        if (num_accP == null) {
                            tabla += "<td align='center' > </td>";
                        } else {
                            tabla += "<td align='center' >" + data[i].num_accion_personal + "</td>";
                        }
                        tabla += "<td align='center' >" + data[i].funcionario_id.persona_id.identificacion + "</td>";
                        tabla += "<td align='left'   >" + data[i].funcionario_id.persona_id.nombre_completo + "</td>";


                        if (data[i].accionpersonal_otros != null) {
                            tabla += "<td align='center'>" + data[i].accionpersonal_otros.descripcion + "</td>";
                            accion = data[i].accionpersonal_otros.descripcion;
                        } else {
                            tabla += "<td align='center'>" + data[i].accionpersonal_id.descripcion + "</td>";
                            accion = data[i].accionpersonal_id.descripcion
                        }
                        dataArray += '{"Isla":"' + data[i].funcionario_id.isla_trabaja_id.descripcion + '","Accion":"' + accion + '"},';

                        estado = "";
                        if (data[i].estado_ejecucion == 'C')
                            estado = "CREADA";
                        if ((data[i].estado_ejecucion == 'A') || (data[i].estado_ejecucion == 'P'))
                            estado = "EN EJECUCION";
                        if (data[i].estado_ejecucion == 'F')
                            estado = "FINALIZADA";

                        tabla += "<td align='center' >" + estado + "</td>";
                        tabla += "<td align='center' >" + data[i].funcionario_id.isla_trabaja_id.descripcion + "</td>";
                        tabla += "<td align='center' id='td_fecharige_" + data[i].id + "'>" + data[i].fecha_rige_accpersonal + "</td>";
                        if (data[i].alertaDiasrestantes == 'R')
                            span = '<span class="badge bg-red">' + data[i].fecha_hasta_accpersonal_final + '</span>'
                        if (data[i].alertaDiasrestantes == 'V')
                            span = '<span class="badge bg-green">' + data[i].fecha_hasta_accpersonal_final + '</span>'
                        if (data[i].alertaDiasrestantes == 'A')
                            span = '<span class="badge bg-yellow">' + data[i].fecha_hasta_accpersonal_final + '</span>'
                        if (data[i].alertaDiasrestantes == 'N')
                            span = '<span></span>'
                        tabla += "<td align='center' id='td_fechahasta_{{ accion.id }}' class='CellWithComment'>" + span + "<span class='CellComment'>" + data[i].diasrestantes + "</span></td>";
                        tabla += "</tr>";
                    }
                }

                $('#tabla_repAcc_SP').dataTable().fnClearTable();
                $('#tabla_repAcc_SP').dataTable().fnDestroy();

                $("#bodytabla_repAcc_SP").html("");
                $("#bodytabla_repAcc_SP").append(tabla);

                var table = $('#tabla_repAcc_SP').DataTable();

                result = [];

                dataArray = dataArray.substring(0, dataArray.length - 1);
                dataArray = "[" + dataArray + "]";
                jasonData = jQuery.parseJSON(dataArray);

                var derivers = $.pivotUtilities.derivers;
                var renderers = $.extend($.pivotUtilities.renderers,
                    $.pivotUtilities.plotly_renderers);
                $("#outputAccRep").pivotUI(jasonData, {
                    renderers: renderers,
                    rows: ["Isla"],
                    cols: [],
                    rendererName: "Multiple Pie Chart",
                    rowOrder: "value_z_to_a",
                    colOrder: "value_z_to_a",
                    rendererOptions: {
                        plotly: {
                            width: 800,
                            height: 400
                        }
                    }

                });
            }
        },
        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
        },
    });
}

/*funcion para actualizar el dashboard acciones de personal y sanciones segun las fechas que se seleccionen*/
$('input[id="reservation"]').on('apply.daterangepicker', function(ev, picker) {
    $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
    fechaA = picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY');
    fechaArr = fechaA.split("-");
    fecha1 = fechaArr[0];
    fecha2 = fechaArr[1];

    fecha1Arr = fecha1.split("/");
    fecha2Arr = fecha2.split("/");

    f1 = fecha1Arr[2].trim() + "-" + fecha1Arr[0].trim() + "-" + fecha1Arr[1].trim();
    f2 = fecha2Arr[2].trim() + "-" + fecha2Arr[0].trim() + "-" + fecha2Arr[1].trim();
    dataini = f1 + "," + f2;
    buscarAcionesParametrosDash(dataini);
});

$('input[id="reservation"]').on('cancel.daterangepicker', function(ev, picker) {
    $(this).val('');
});

/*funcion para actualizar el dashboard acciones de personal y sanciones segun las fechas que se seleccionen*/
$('input[id="reservationS"]').on('apply.daterangepicker', function(ev, picker) {
    $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
    fechaA = picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY');
    fechaArr = fechaA.split("-");
    fecha1 = fechaArr[0];
    fecha2 = fechaArr[1];

    fecha1Arr = fecha1.split("/");
    fecha2Arr = fecha2.split("/");

    f1 = fecha1Arr[2].trim() + "-" + fecha1Arr[0].trim() + "-" + fecha1Arr[1].trim();
    f2 = fecha2Arr[2].trim() + "-" + fecha2Arr[0].trim() + "-" + fecha2Arr[1].trim();
    dataini = f1 + "," + f2;
    buscarSancionesParametrosDash(dataini);
});

$('input[id="reservationS"]').on('cancel.daterangepicker', function(ev, picker) {
    $(this).val('');
});

/*funcion para obtener las acciones de personal en un rango de fechas y generar los respectivos graficos*/
function buscarAcionesParametrosDash(dataIni) {

    date_range = $('#reservation').val();
    $("#cuadroIslaSantaCruz").html("0");
    $("#cuadroIslaSanCristobal").html("0");
    $("#cuadroIslaIsabela").html("0");

    data = '';
    data = data += "fecha_rige_accpersonal__range=" + dataIni;

    $.ajax({
        url: "data_accionesParam",
        type: "get",
        data: {
            "data": data
        },
        async: false,
        dataType: "json",

        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
            } else {
                dataArray = "";
                dataArray2 = "";
                dataArrayIsla = "";
                dataArrayIslaAcc = "";
                tabla = "";
                if (data.length > 0) {
                    for (i = 0; i < data.length; i++) {
                        accionAux = '';
                        if (data[i].accionpersonal_otros != null) {
                            if (data[i].accionpersonal_otros.accion_id == null) {
                                accionAux = "OTROS";
                            } else {
                                accionAux = $("#SAccDash").children("option[value='" + data[i].accionpersonal_otros.accion_id + "']").first().html();
                            }

                            dataArray += '{"' + data[i].accionpersonal_otros.accion_id + '":"1"},';
                            dataArray2 += '{"Accion":"' + accionAux + '","Otros":"' + data[i].accionpersonal_otros.descripcion + '","Isla":"' + data[i].funcionario_id.isla_trabaja_id.descripcion + '"},';
                            console.log(accionAux + '++++++');
                        } else {
                            dataArray += '{"' + data[i].accionpersonal_id.id + '":"1"},';
                            dataArray2 += '{"Accion":"' + data[i].accionpersonal_id.descripcion + '","Otros":"","Isla":"' + data[i].funcionario_id.isla_trabaja_id.descripcion + '"},';
                            console.log(data[i].accionpersonal_id.descripcion + '*****');
                        }
                        dataArrayIsla += '{"Isla":"' + data[i].funcionario_id.isla_trabaja_id.descripcion + '"},';

                    } /*fin for*/

                    dataArray2 = dataArray2.substring(0, dataArray2.length - 1);
                    dataArray2 = "[" + dataArray2 + "]";
                    jdataArray2 = jQuery.parseJSON(dataArray2);
                    jdataArray4 = jQuery.parseJSON(dataArray2);

                    acciones = [];
                    $.each(jdataArray2, function(index, value) {
                        if ($.inArray(value.Accion, acciones) == -1) {
                            acciones.push(value.Accion);
                        }
                    });
                    accOtros = [];
                    $.each(jdataArray2, function(index, value) {
                        if ($.inArray(value.Otros, accOtros) == -1) {
                            accOtros.push(value.Otros);
                        }
                    });

                    var result2 = [];
                    jdataArray2.reduce(function(res, value) {

                        if (!res[value.Isla]) {

                            res[value.Isla] = {
                                name: value.Isla,
                                data: []
                            };

                            result2.push(res[value.Isla])
                        }

                        $.each(acciones, function(index, valueA) {
                            if (!res[value.Isla].data[index])
                                res[value.Isla].data[index] = 0;
                            if (value.Accion == valueA)
                                res[value.Isla].data[index] += 1;
                            else
                                res[value.Isla].data[index] += 0;
                        });

                        return res;
                    }, {});

                    var result3 = [];
                    console.log(acciones);
                    console.log(jdataArray2);
                    jdataArray2.reduce(function(res, value) {
                        if (value.Otros == "")
                            accAux = value.Accion + value.Isla
                        else
                            accAux = value.Otros + value.Isla
                        if (!res[accAux]) {
                            res[accAux] = {
                                name: value.Isla,
                                accion: value.Accion,
                                Otros: "",
                                y: 0
                            };
                            result3.push(res[accAux]);
                        }

                        $.each(acciones, function(index, valueA) {
                            if (value.Accion == valueA) {
                                if (value.Otros != "") {
                                    $.each(accOtros, function(index, valueO) {
                                        if (value.Otros == valueO) {
                                            res[accAux].Otros = valueO;
                                            res[accAux].y += 1;
                                        }
                                    });
                                } else {
                                    //res[value.Otros].Otros = valueA;
                                    res[accAux].y += 1;
                                }
                            }

                        });

                        return res;
                    }, {});
                    console.log(result3);

                    for (i = 0; i < result3.length; i++) {
                        tabla += "<tr>";
                        tabla += "<td align='left' >" + result3[i].name + "</td>";
                        tabla += "<td align='left' >" + result3[i].accion + "</td>";
                        tabla += "<td align='left' >" + result3[i].Otros + "</td>";
                        tabla += "<td align='center'>" + result3[i].y + "</td>";
                        tabla += "</tr>";
                    }

                    $('#tabla_accDet').dataTable().fnClearTable();
                    $('#tabla_accDet').dataTable().fnDestroy();

                    $("#bodytabla_accDet").html("");
                    $("#bodytabla_accDet").append(tabla);

                    var table = $('#tabla_accDet').DataTable({
                        orderCellsTop: true,
                        order: [
                            [0],
                            [1],
                            [2]
                        ]
                    });


                    dataArrayIsla = dataArrayIsla.substring(0, dataArrayIsla.length - 1);
                    dataArrayIsla = "[" + dataArrayIsla + "]";
                    jdataArrayIsla = jQuery.parseJSON(dataArrayIsla);
                    var result = [];
                    var zonaArr = [];
                    jdataArrayIsla.reduce(function(res, value) {
                        if (!res[value.Isla]) {
                            res[value.Isla] = {
                                name: value.Isla,
                                y: 0,
                                sliced: true,
                                selected: true
                            };
                            result.push(res[value.Isla])
                            //zonaArr.push(value.Isla);
                        }

                        res[value.Isla].y += 1;

                        return res;
                    }, {});

                    $.each(result, function(index, value) {
                        nombre = "cuadroIsla" + toTitleCase(normalize(value.name)).replace(/ /g, "");
                        $("#" + nombre).html(value.y);
                        acciones.push(value.Accion);
                    });

                    Highcharts.chart('containerGr1', {
                        chart: {

                            plotBackgroundColor: null,
                            plotBorderWidth: null,
                            plotShadow: false,
                            type: 'pie',
                            options3d: {
                                enabled: true,
                                alpha: 45,
                                beta: 0
                            }
                        },
                        title: {
                            text: 'Acciones de Personal por Islas,<br>Periodo: ' + dataIni + ''
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
                                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                    connectorColor: 'silver'
                                }
                            }
                        },
                        series: [{
                            name: 'Share',
                            data: result
                        }]
                    })

                    if (dataArray != "") {
                        Highcharts.chart('containerGr2', {
                            chart: {
                                type: 'column',
                                options3d: {
                                    enabled: true,
                                    alpha: 10,
                                    beta: 10,
                                    viewDistance: 40,
                                    depth: 20
                                }
                            },

                            title: {
                                text: 'Total Acciones por Islas'
                            },

                            xAxis: {
                                categories: acciones
                            },

                            yAxis: {
                                allowDecimals: false,
                                min: 0,
                                title: {
                                    text: 'Numero de Acciones'
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
                                column: {
                                    stacking: 'normal',
                                    dataLabels: {
                                        enabled: true
                                    }
                                }
                            },

                            series: result2
                        });
                    }


                } /*si data es > 0*/
                else {
                    $("#containerGr1").html("");
                    $("#containerGr2").html("");
                    $("#bodytabla_accDet").html("");
                    $("#cuadroIslaSantaCruz").html("0");
                    $("#cuadroIslaSanCristobal").html("0");
                    $("#cuadroIslaIsabela").html("0");
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

var normalize = (function() {
    var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç",
        to = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
        mapping = {};

    for (var i = 0, j = from.length; i < j; i++)
        mapping[from.charAt(i)] = to.charAt(i);

    return function(str) {
        var ret = [];
        for (var i = 0, j = str.length; i < j; i++) {
            var c = str.charAt(i);
            if (mapping.hasOwnProperty(str.charAt(i)))
                ret.push(mapping[c]);
            else
                ret.push(c);
        }
        return ret.join('');
    }

})();

/*funcion para buscar las saciones en un rango de fechas y genrar los graficos*/
function buscarSancionesParametrosDash(dataIni) {
    $("#modalLoadin").show();
    data = '';
    data = data += "fecha_sancion__range=" + dataIni;
    $("#cuadroIslaS1").html("0");
    $("#cuadroIslaS2").html("0");
    $("#cuadroIslaS3").html("0");

    $.ajax({
        url: "data_sancionesParam",
        type: "get",
        data: {
            "data": data
        },
        dataType: "json",

        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
                $("#modalLoadin").hide();
            } else {
                tabla = "";
                if (data.length > 0) {
                    dataArray = "";
                    for (i = 0; i < data.length; i++) {
                        if (data[i].funcionario_id.modalidad_laboral_id != null)
                            modalidad = data[i].funcionario_id.modalidad_laboral_id.nombre;
                        else
                            modalidad = "";

                        if (data[i].funcionario_id.isla_trabaja_id != null)
                            isla = data[i].funcionario_id.isla_trabaja_id.descripcion;
                        else
                            isla = "";

                        if (data[i].tipo_falta_id != null)
                            sancionT = data[i].tipo_falta_id.label;
                        else
                            sancionT = "";

                        if (data[i].sancion_id != null)
                            sancion = data[i].sancion_id.descripcion;
                        else
                            sancion = "";

                        dataArray += '{"Isla":"' + isla + '","tipo":"' + sancionT + '","sancion":"' + sancion + '","modalidad":"' + modalidad + '","anio":"' + data[i].anio_sancion + '","mes":"' + data[i].mes_sancion + '"},';
                    }

                    dataArray = dataArray.substring(0, dataArray.length - 1);
                    dataArray = "[" + dataArray + "]";
                    jdatadataArray = jQuery.parseJSON(dataArray);
                    var result = [];
                    jdatadataArray.reduce(function(res, value) {
                        if (!res[value.Isla]) {
                            res[value.Isla] = {
                                name: value.Isla,
                                y: 0,
                                sliced: true,
                                selected: true
                            };
                            result.push(res[value.Isla])
                            //zonaArr.push(value.Isla);
                        }
                        res[value.Isla].y += 1;

                        return res;
                    }, {});

                    tipoA = [];
                    tipoA.push("LEVE");
                    tipoA.push("GRAVE");

                    modalidad = [];
                    $.each(jdatadataArray, function(index, value) {
                        if ($.inArray(value.modalidad, modalidad) == -1) {
                            modalidad.push(value.modalidad);
                        }
                    });
                    console.log(modalidad)
                    sancion = [];
                    $.each(jdatadataArray, function(index, value) {
                        if ($.inArray(value.sancion, sancion) == -1) {
                            sancion.push(value.sancion);
                        }
                    });


                    $.each(result, function(index, value) {
                        if (value.name == "SANTA CRUZ")
                            $("#cuadroIslaS1").html(value.y);
                        if (value.name == "SAN CRISTOBAL")
                            $("#cuadroIslaS2").html(value.y);
                        if (value.name == "ISABELA")
                            $("#cuadroIslaS3").html(value.y);
                    });


                    var result3 = [];
                    jdatadataArray.reduce(function(res, value) {
                        if (!res[value.Isla + "-" + value.tipo + "-" + value.sancion + "-" + value.modalidad]) {
                            res[value.Isla + "-" + value.tipo + "-" + value.sancion + "-" + value.modalidad] = {
                                name: value.Isla,
                                tipo: value.tipo,
                                sancion: value.sancion,
                                modalidad: value.modalidad,
                                y: 0
                            };
                            result3.push(res[value.Isla + "-" + value.tipo + "-" + value.sancion + "-" + value.modalidad])
                        }

                        $.each(sancion, function(index, valueO) {
                            if (value.sancion == valueO) {
                                $.each(modalidad, function(index, valueM) {
                                    if (value.modalidad == valueM) {
                                        $.each(tipoA, function(index, valueA) {
                                            if (value.tipo == valueA)
                                                res[value.Isla + "-" + value.tipo + "-" + value.sancion + "-" + value.modalidad].y += 1;
                                        });
                                    }
                                });
                            }
                        });

                        return res;
                    }, {});

                    for (i = 0; i < result3.length; i++) {
                        tabla += "<tr>";
                        tabla += "<td align='left' >" + result3[i].name + "</td>";
                        tabla += "<td align='left' >" + result3[i].tipo + "</td>";
                        tabla += "<td align='left' >" + result3[i].sancion + "</td>";
                        tabla += "<td align='left' >" + result3[i].modalidad + "</td>";
                        tabla += "<td align='center'>" + result3[i].y + "</td>";
                        tabla += "</tr>";
                    }

                    $('#tabla_sanDet').dataTable().fnClearTable();
                    $('#tabla_sanDet').dataTable().fnDestroy();

                    $("#bodytabla_sanDet").html("");
                    $("#bodytabla_sanDet").append(tabla);

                    var table = $('#tabla_sanDet').DataTable({
                        orderCellsTop: true,
                        order: [
                            [0],
                            [1],
                            [2],
                            [3]
                        ]
                    });

                    /*categorias grafico*/
                    anio = 2020;
                    meses = [];
                    dataL = [];
                    dataG = [];
                    for (i = 1; i <= 12; i++) {
                        meses.push(anio + '-' + i);
                        dataL.push(null);
                        dataG.push(null);
                    }


                    var result4 = [];
                    jdatadataArray.reduce(function(res, value) {
                        if (!res[value.tipo + "-" + value.anio + "-" + value.mes]) {
                            res[value.tipo + "-" + value.anio + "-" + value.mes] = {
                                tipo: value.tipo,
                                periodo: value.anio + "-" + value.mes,
                                y: 0
                            };
                            result4.push(res[value.tipo + "-" + value.anio + "-" + value.mes])
                        }

                        res[value.tipo + "-" + value.anio + "-" + value.mes].y += 1;

                        return res;
                    }, {});


                    for (i = 0; i < meses.length; i++) {
                        for (j = 0; j < result4.length; j++) {
                            if ((meses[i] == result4[j].periodo) && (result4[j].tipo == 'LEVE'))
                                dataL[i] = result4[j].y
                            if ((meses[i] == result4[j].periodo) && (result4[j].tipo == 'GRAVE'))
                                dataG[i] = result4[j].y
                        }
                    }

                    Highcharts.chart('containerGrS1', {
                        chart: {
                            type: 'pie',
                            options3d: {
                                enabled: true,
                                alpha: 45,
                                beta: 0
                            }
                        },
                        title: {
                            text: 'Sanciones por Islas,<br>Periodo: ' + dataIni + ''
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
                                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                    connectorColor: 'silver'
                                }
                            }
                        },
                        series: [{
                            name: 'Share',
                            data: result
                        }]
                    })

                    Highcharts.chart('containerGrS2', {
                        chart: {
                            type: 'line',
                            options3d: {
                                enabled: true,
                                alpha: 15,
                                beta: 15,
                                viewDistance: 25,
                                depth: 40
                            }
                        },
                        title: {
                            text: 'Total de sanciones por meses'
                        },
                        subtitle: {
                            text: ''
                        },
                        xAxis: {
                            categories: meses
                        },
                        yAxis: {
                            title: {
                                text: 'Cantidad'
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
                            name: 'LEVE',
                            data: dataL
                        }, {
                            name: 'GRAVE',
                            data: dataG
                        }]
                    });
                    $("#modalLoadin").hide();
                } else {
                    $("#containerGrS1").html("");
                    $("#containerGrS2").html("");
                    $("#bodytabla_sanDet").html("");
                    $("#cuadroIslaS1").html(0);
                    $("#cuadroIslaS2").html(0);
                    $("#cuadroIslaS3").html(0);
                    $("#modalLoadin").hide();
                }
            }
        },
        error: function(data) {
            $("#modalLoadin").hide();
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
            //console.log( JSON.stringify(data));
        },
    });
}

/*funcion para ver la ficha de un funcionario*/
function verFichaFuncionario(cedula) {
    console.log("******* fichaFuncionario *******");
    $.ajax({
        url: "funcionario_data",
        type: "get",
        data: {
            "data": cedula
        },
        dataType: "json",

        success: function(json) {
            $("#modalLoadin").hide();
            if (json['non_field_errors']) {
                console.log(json['non_field_errors']);
            } else {

                if (json[0].persona_id.telefono_convencional == null) tel1 = "";
                else tel1 = json[0].persona_id.telefono_convencional;
                if (json[0].persona_id.telefono_celular == null) tel2 = "";
                else tel2 = json[0].persona_id.telefono_celular;

                if (json[0].direccion_estatuto_id == null) dire = 0;
                else dire = json[0].direccion_estatuto_id.id;
                if (json[0].proceso_estatuto_id == null) proc = 0;
                else proc = json[0].proceso_estatuto_id.id;
                if (json[0].subproceso_estatuto_id == null) sprc = 0;
                else sprc = json[0].subproceso_estatuto_id.id;
                if (json[0].cargo_ocupacional_id == null) gocu = 0;
                else gocu = json[0].cargo_ocupacional_id.id;
                if ((json[0].cargo_distributivo_id == null || json[0].cargo_distributivo_id == "")) dist = 0;
                else dist = json[0].cargo_distributivo_id.id;

                if (json[0].func_carnet_id.length > 0)
                    $("#imgContentFileFotF").attr("src", "static/media/talentohumano/carnetizacion/" + json[0].func_carnet_id[0].foto + "");
                else
                    $("#imgContentFileFotF").attr("src", "static/media/talentohumano/carnetizacion/prueba.png");

                $("#td_fnombre").html(json[0].persona_id.nombre_completo);
                $("#td_fced").html(json[0].persona_id.identificacion);
                $("#td_ffecnac").html(json[0].persona_id.fecha_nacimiento);
                $("#td_festcivil").html(json[0].persona_id.estado_civil);
                $("#td_fdir").html(json[0].persona_id.direccion);
                $("#td_ftel").html(tel1 + "-" + tel2);
                $("#td_femail").html(json[0].email);

                $("#td_fdireccion").html($("#SsitdireSA_ff option[value='" + dire + "']").text());
                $("#td_fproc").html($("#SsitprocSA_ff option[value='" + proc + "']").text());
                $("#td_fsubp").html($("#SsitsubprocSA_ff option[value='" + sprc + "']").text());
                $("#td_fgocu").html($("#SsitgrupoSA_ff option[value='" + gocu + "']").text());
                $("#td_fdist").html($("#SsitpuestDistSA_ff option[value='" + dist + "']").text());
                $("#td_fisla").html($("#SsitislaSA_ff option[value='" + json[0].isla_trabaja_id.id + "']").text());
                $("#td_frmu").html(json[0].rmu);

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

/*funcion para generar pdf de la ficha de un funcionario*/
function generarPdfFicha() {
    const element = document.getElementById("bodyverFicha");
    filename = 'ficha_funcionario.pdf'

    html2pdf(element, {
        margin: [0.20, 0.05, 0.05, 0.05],
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

/*funcion para ver las acciones de personal activas*/
function verAccionesActivas(idaccion) {
    console.log(" >> verAccionesActivas <<");
    var accionpredecesora_id = "";
    accionpredecesora_id = $("#SitemAccOtro option:selected").attr("accionpredecesora_id");

    if (accionpredecesora_id != null && accionpredecesora_id != "" && accionpredecesora_id != undefined && accionpredecesora_id != "None") {
        $("#tr_itemactL").show();
        $("#tr_itemact").show();
        $(".tr_item_predente").show();

        //data = "funcionario_id__id__in="+$("#funcionaioAccid").val()+"&accionpersonal_id__id__in="+accionpredecesora_id+"5bec1ac6-ecca-4b49-bf3f-dfdd690cda94&estado_ejecucion__in=A,C,P";
        data = "funcionario_id__id__in=" + $("#funcionaioAccid").val() + "&accionpersonal_id__id__in=" + accionpredecesora_id + "&estado_ejecucion__in=A,C,P";
        console.log(data);
        $.ajax({
            url: "data_itemPerFuncionarioAccionPer",
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

                        option = '<option value=""> Seleccione una opcion</option>';
                        option_descrp = '';
                        if (data.length > 0) {
                            for (i = 0; i < data.length; i++) {
                                option += "<option value='" + data[i].id + "'>" + data[i].descripcion + " </option>";
                                option_descrp = "<textarea rows='4' cols='50'>ACCION PERSONAL PREVIA: " + data[i].accionpersonal_id["descripcion"] + "\nFECHA VIGENCIA: " + data[i].fecha_rige_accpersonal + "\nFECHA HASTA: " + data[i].fecha_hasta_accpersonal + "</textarea>";
                            }
                        }
                        $('#SitemActivos_descripcion option').remove();
                        $("#SitemActivos_descripcion").append(option_descrp);
                        $("#SitemActivos").select2('destroy');
                        $('#SitemActivos option').remove();
                        $("#SitemActivos").append(option);
                        $("#SitemActivos").select2({
                            sorter: data => data.sort((a, b) => a.text.localeCompare(b.text)),
                        });
                        if (data[0] != null && data[0] != undefined) {
                            $("#SitemActivos").val(data[0].id).trigger("change");
                        }


                    } else {
                        console.log("NO DATA ACCION...");

                        data = "funcionario_id__id__in=" + $("#funcionaioAccid").val() + "&accionpersonal_otros__id__in=" + accionpredecesora_id + "&estado_ejecucion__in=A,C,P";
                        console.log(data);
                        $.ajax({
                            url: "data_itemPerFuncionarioAccionPer",
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

                                        option = '<option value=""> Seleccione una opcion</option>';
                                        option_descrp = '';
                                        if (data.length > 0) {
                                            for (i = 0; i < data.length; i++) {
                                                option += "<option value='" + data[i].id + "'>" + data[i].descripcion + " </option>";
                                                option_descrp = "<textarea rows='4' cols='50'>ACCION PERSONAL PREVIA: " + data[i].accionpersonal_id["descripcion"] + "\nFECHA VIGENCIA: " + data[i].fecha_rige_accpersonal + "\nFECHA HASTA: " + data[i].fecha_hasta_accpersonal + "</textarea>";
                                            }
                                        }
                                        $('#SitemActivos_descripcion option').remove();
                                        $("#SitemActivos_descripcion").append(option_descrp);
                                        $("#SitemActivos").select2('destroy');
                                        $('#SitemActivos option').remove();
                                        $("#SitemActivos").append(option);
                                        $("#SitemActivos").select2({
                                            sorter: data => data.sort((a, b) => a.text.localeCompare(b.text)),
                                        });
                                        if (data[0] != null && data[0] != undefined) {
                                            $("#SitemActivos").val(data[0].id).trigger("change");
                                        }


                                    } else {
                                        console.log("NO DATA OTRA ACCION...");

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
        $("#tr_itemactL").hide();
        $("#tr_itemact").hide();
        $(".tr_item_predente").hide();
    }
}

/*funcion para obtener los datos de funcionarios y generar los graficos*/
function getDataFuncionarioGraTab() {
    $("#modalLoadin").show();
    dataArray = [];
    $.ajax({
        url: "funcionario_data",
        type: "get",
        data: {
            "data": ""
        },
        dataType: "json",

        success: function(json) {
            $("#modalLoadin").hide();
            for (i = 0; i < json.length; i++) {

                if (json[i].modalidad_laboral_id != null) modalidad_laboral = json[i].modalidad_laboral_id.nombre;
                else modalidad_laboral = "";
                if (json[i].proceso_estatuto_id != null) proceso = json[i].proceso_estatuto_id.name;
                else proceso = "";
                if (json[i].subproceso_estatuto_id != null) subproceso = json[i].subproceso_estatuto_id.name;
                else subproceso = "";
                if (json[i].direccion_estatuto_id != null) direccion = json[i].direccion_estatuto_id.name;
                else direccion = "";
                if (json[i].cargo_ocupacional_id != null) cargo_ocupacional = json[i].cargo_ocupacional_id.nombre;
                else cargo_ocupacional = "";
                if (json[i].cargo_distributivo_id != null) cargo_distributivo = json[i].cargo_distributivo_id.nombre;
                else cargo_distributivo = "";
                if (json[i].cargo_institucional_id != null) cargo_institucional = json[i].cargo_institucional_id.nombre;
                else cargo_institucional = "";
                if (json[i].isla_trabaja_id != null) isla = json[i].isla_trabaja_id.descripcion;
                else isla = "";

                dataArray += "{";
                dataArray += '"Tipo_persona":"' + json[i].persona_id.tipo_persona + '",';
                dataArray += '"Sexo":"' + json[i].persona_id.sexo + '",';
                dataArray += '"Tipo_Residencia":"' + json[i].persona_id.tipo_residencia + '",';
                dataArray += '"Etnias":"' + json[i].persona_id.etnias + '",';
                dataArray += '"Estado_Civil":"' + json[i].persona_id.estado_civil + '",';

                dataArray += '"Tipo_Sangre":"' + json[i].persona_id.tipo_sangre + '",';
                dataArray += '"Nivel_Escolaridad":"' + json[i].persona_id.nivel_escolaridad + '",';
                dataArray += '"Grado_Academico":"' + json[i].persona_id.grado_academico + '",';

                if (json[i].persona_id.estado_embarazo == true)
                    dataEmb = 'Si';
                else
                    dataEmb = 'No';
                dataArray += '"Estado_embarazo":"' + dataEmb + '",';
                dataArray += '"Nombre":"' + json[i].persona_id.nombre_completo + '",';
                //dataArray+='"Provincia_Residencia":"'+json[i].persona_id.provincia_residencia_id+'",';
                //dataArray+='"Canton_Residencia":"'+getDataArraySession('cantones',''+json[i].persona_id.canton_residencia_id+'')+'",';
                //dataArray+='"Parroquia_Residencia":"'+getDataArraySession('parroquias',''+json[i].persona_id.parroquia_residencia_id+'')+'",';
                dataArray += '"Modalidad_Laboral":"' + modalidad_laboral + '",';
                dataArray += '"Direccion":"' + direccion + '",';
                dataArray += '"Proceso":"' + proceso + '",';
                dataArray += '"SubProceso":"' + subproceso + '",';
                dataArray += '"Cargo_Ocupacional":"' + cargo_ocupacional + '",';
                dataArray += '"Cargo_Distributivo":"' + cargo_distributivo + '",';
                dataArray += '"Cargo_Institucional":"' + cargo_institucional + '",';
                dataArray += '"Isla":"' + isla + '"';
                dataArray += "},";
            }

            dataArray = dataArray.substring(0, dataArray.length - 1);
            dataArray = "[" + dataArray + "]";
            jdataArray = jQuery.parseJSON(dataArray);

            var derivers = $.pivotUtilities.derivers;
            var renderers = $.extend($.pivotUtilities.renderers,
                $.pivotUtilities.plotly_renderers);
            $("#outputFun").pivotUI(jdataArray, {
                renderers: renderers,
                rows: ["Direccion"],
                cols: ["Isla"],
                rendererName: "Table",
                rowOrder: "value_z_to_a",
                colOrder: "value_z_to_a",
            });
        },
        error: function(json) {
            $("#modalLoadin").hide();
            swal("", "Error: " + JSON.stringify(json), "error");
            console.log(JSON.stringify(json));
        },
    });
}


/*funcion para obteenr las acciones de personal en un rango de fechas y generar los respectivos graficos*/
function buscarTramitesParametros(dataIni) {

    date_range = $('#reservationT').val();
    $("#cuadroIslaTSantaCruz").html("0");
    $("#cuadroIslaTSanCristobal").html("0");
    $("#cuadroIslaTIsabela").html("0");

    data = '';
    data = data += "fecha_desde__range=" + dataIni;

    $.ajax({
        url: "data_tramitesParam",
        type: "get",
        data: {
            "data": data
        },
        async: false,
        dataType: "json",

        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
            } else {
                dataArray = "";
                dataArray2 = "";
                dataArrayIsla = "";
                dataArrayIslaAcc = "";
                tabla = "";
                if (data.length > 0) {
                    for (i = 0; i < data.length; i++) {

                        dataArray += '{"' + data[i].estado_tramite + '":"1"},';
                        dataArray2 += '{"Estado":"' + data[i].estado_tramite + '","Isla":"' + data[i].funcionario_id.isla_trabaja_id.descripcion + '"},';
                        dataArrayIsla += '{"Isla":"' + data[i].funcionario_id.isla_trabaja_id.descripcion + '"},';

                    } /*fin for*/

                    dataArray2 = dataArray2.substring(0, dataArray2.length - 1);
                    dataArray2 = "[" + dataArray2 + "]";
                    jdataArray2 = jQuery.parseJSON(dataArray2);
                    jdataArray4 = jQuery.parseJSON(dataArray2);


                    var result3 = [];
                    console.log(jdataArray2);
                    jdataArray2.reduce(function(res, value) {

                        accAux = value.Estado + value.Isla
                        if (!res[accAux]) {
                            res[accAux] = {
                                name: value.Isla,
                                estado: value.Estado,
                                y: 0
                            };
                            result3.push(res[accAux]);
                        }

                        res[accAux].y += 1;

                        return res;
                    }, {});
                    console.log(result3);

                    for (i = 0; i < result3.length; i++) {
                        tabla += "<tr>";
                        tabla += "<td align='left' >" + result3[i].name + "</td>";
                        tabla += "<td align='left' >" + result3[i].estado + "</td>";
                        tabla += "<td align='center'>" + result3[i].y + "</td>";
                        tabla += "</tr>";
                    }

                    $('#tabla_traDet').dataTable().fnClearTable();
                    $('#tabla_traDet').dataTable().fnDestroy();

                    $("#bodytabla_traDet").html("");
                    $("#bodytabla_traDet").append(tabla);

                    var table = $('#tabla_traDet').DataTable({
                        orderCellsTop: true,
                        order: [
                            [0],
                            [1]
                        ]
                    });


                    dataArrayIsla = dataArrayIsla.substring(0, dataArrayIsla.length - 1);
                    dataArrayIsla = "[" + dataArrayIsla + "]";
                    jdataArrayIsla = jQuery.parseJSON(dataArrayIsla);
                    var result = [];
                    var zonaArr = [];
                    jdataArrayIsla.reduce(function(res, value) {
                        if (!res[value.Isla]) {
                            res[value.Isla] = {
                                name: value.Isla,
                                y: 0,
                                sliced: true,
                                selected: true
                            };
                            result.push(res[value.Isla])
                            //zonaArr.push(value.Isla);
                        }

                        res[value.Isla].y += 1;

                        return res;
                    }, {});

                    $.each(result, function(index, value) {
                        nombre = "cuadroIslaT" + toTitleCase(normalize(value.name)).replace(/ /g, "");
                        $("#" + nombre).html(value.y);
                    });

                    Highcharts.chart('containerGr1T', {
                        chart: {

                            plotBackgroundColor: null,
                            plotBorderWidth: null,
                            plotShadow: false,
                            type: 'pie',
                            options3d: {
                                enabled: true,
                                alpha: 45,
                                beta: 0
                            }
                        },
                        title: {
                            text: 'Tramites por Islas,<br>Periodo: ' + dataIni + ''
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
                                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                    connectorColor: 'silver'
                                }
                            }
                        },
                        series: [{
                            name: 'Share',
                            data: result
                        }]
                    })




                } /*si data es > 0*/
                else {
                    $("#containerGr1T").html("");
                    //$("#containerGr2T").html("");
                    $("#bodytabla_traDet").html("");
                    $("#cuadroIslaTSantaCruz").html("0");
                    $("#cuadroIslaTSanCristobal").html("0");
                    $("#cuadroIslaTIsabela").html("0");
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

/*funcion para actualizar el dashboard acciones de personal y sanciones segun las fechas que se seleccionen*/
$('input[id="reservationT"]').on('apply.daterangepicker', function(ev, picker) {
    $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
    fechaA = picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY');
    fechaArr = fechaA.split("-");
    fecha1 = fechaArr[0];
    fecha2 = fechaArr[1];

    fecha1Arr = fecha1.split("/");
    fecha2Arr = fecha2.split("/");

    f1 = fecha1Arr[2].trim() + "-" + fecha1Arr[0].trim() + "-" + fecha1Arr[1].trim();
    f2 = fecha2Arr[2].trim() + "-" + fecha2Arr[0].trim() + "-" + fecha2Arr[1].trim();
    dataini = f1 + "," + f2;
    buscarTramitesParametros(dataini);
});

$('input[id="reservationT"]').on('cancel.daterangepicker', function(ev, picker) {
    $(this).val('');
});

/*funcion para calcular la edad segun la fecha de nacimiento*/
function calcularEdad(fecha) {
    if ((fecha == "") || (fecha == null))
        return 0;

    var values = fecha.split("-");
    var dia = values[2];
    var mes = values[1];
    var ano = values[0];

    // cogemos los valores actuales
    var fecha_hoy = new Date();
    var ahora_ano = fecha_hoy.getYear();
    var ahora_mes = fecha_hoy.getMonth() + 1;
    var ahora_dia = fecha_hoy.getDate();

    // realizamos el calculo
    var edad = (ahora_ano + 1900) - ano;
    if (ahora_mes < mes) {
        edad--;
    }
    if ((mes == ahora_mes) && (ahora_dia < dia)) {
        edad--;
    }
    if (edad > 1900) {
        edad -= 1900;
    }

    // calculamos los meses
    var meses = 0;

    if (ahora_mes > mes && dia > ahora_dia)
        meses = ahora_mes - mes - 1;
    else if (ahora_mes > mes)
        meses = ahora_mes - mes
    if (ahora_mes < mes && dia < ahora_dia)
        meses = 12 - (mes - ahora_mes);
    else if (ahora_mes < mes)
        meses = 12 - (mes - ahora_mes + 1);
    if (ahora_mes == mes && dia > ahora_dia)
        meses = 11;

    // calculamos los dias
    var dias = 0;
    if (ahora_dia > dia)
        dias = ahora_dia - dia;
    if (ahora_dia < dia) {
        ultimoDiaMes = new Date(ahora_ano, ahora_mes - 1, 0);
        dias = ultimoDiaMes.getDate() - (dia - ahora_dia);
    }

    return edad + " años";
}


/*para generar excel de lista de personal*/
function getDataPersonaFuncionarioFam(inicio) {
    data = '';
    if (inicio != 1) {
        nombre = $("#nombresfilterR").val();
        cedula = $("#cedulafilterR").val();
        if (nombre != "")
            data = "persona_id__nombre_completo__icontains=" + nombre + "&";

        if (cedula != "")
            data += "persona_id__identificacion__icontains=" + cedula + "&";

        data = data.substring(0, data.length - 1);
    } else {
        data = "persona_id__apellidos__startswith=A";
    }

    $.ajax({
        //url: "funcionario_data",
        url: "data_funcionarioParam",
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
                    for (i = 0; i < data.length; i++) {

                        tabla += "<tr>";
                        tabla += "<td style='border: 1px solid black;'>" + data[i].persona_id.nombre_completo + "</td>";
                        tabla += "<td style='border: 1px solid black;text-align:center;'>" + data[i].persona_id.identificacion + "</td>";
                        tabla += "<td style='border: 1px solid black;text-align:center;'></td>";
                        tabla += "<td style='border: 1px solid black;text-align:center;'></td>";
                        tabla += "<td style='border: 1px solid black;text-align:center;'></td>";
                        tabla += "<td style='border: 1px solid black;text-align:center;'></td>";
                        tabla += "<td style='border: 1px solid black;text-align:center;'></td>";
                        tabla += "<td style='border: 1px solid black;text-align:center;'></td>";
                        tabla += "<td style='border: 1px solid black;text-align:center;'></td>";
                        tabla += "</tr>";


                        if (data[i].perfuncionariofamiliar_id.length > 0) {
                            for (x = 0; x < data[i].perfuncionariofamiliar_id.length; x++) {
                                if (data[i].perfuncionariofamiliar_id[x].familiar_id.es_carga_familiar == true)
                                    icono1 = 'SI';
                                else
                                    icono1 = 'NO';
                                if (data[i].perfuncionariofamiliar_id[x].familiar_id.es_carga_familiar == true)
                                    icono2 = 'SI';
                                else
                                    icono2 = 'NO';
                                if (data[i].perfuncionariofamiliar_id[x].familiar_id.es_carga_familiar == true)
                                    icono3 = 'SI';
                                else
                                    icono3 = 'NO';
                                tabla += "<td style='border: 1px solid black;'>" + data[i].persona_id.nombre_completo + "</td>";
                                tabla += "<td style='border: 1px solid black;text-align:center;'>" + data[i].persona_id.identificacion + "</td>";
                                tabla += "<td style='border: 1px solid black;text-align:center;'>" + data[i].perfuncionariofamiliar_id[x].familiar_id.nombre_completo + "</td>";
                                tabla += "<td style='border: 1px solid black;text-align:center;'>" + data[i].perfuncionariofamiliar_id[x].familiar_id.identificacion + "</td>";
                                tabla += "<td style='border: 1px solid black;text-align:center;'>" + data[i].perfuncionariofamiliar_id[x].parentesco.valor + "</td>";
                                tabla += "<td style='border: 1px solid black;text-align:center;'>" + data[i].perfuncionariofamiliar_id[x].familiar_id.fecha_nacimiento + "</td>";
                                tabla += "<td style='border: 1px solid black;text-align:center;'>" + icono1 + "</td>";
                                tabla += "<td style='border: 1px solid black;text-align:center;'>" + icono2 + "</td>";
                                tabla += "<td style='border: 1px solid black;text-align:center;'>" + icono3 + "</td>";

                                tabla += "</tr>";
                            }
                        }
                    } /*for*/

                    $('#tabla_repFun').dataTable().fnClearTable();
                    $('#tabla_repFun').dataTable().fnDestroy();

                    $("#bodytabla_repFun").html("");
                    $("#bodytabla_repFun").append(tabla);

                    var table = $('#tabla_repFun').DataTable();
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

