/*Daf Certificaciones*/
var path_archivos_cert_ = 'static/media/daf_certificaciones/';

// Actual addTab function: adds new tab using the input from the form above
function addTab(titulo, contenido, idmenu) {
   console.log('addtab');
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
    console.log("aqui");
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

    //tinymce.remove();

});

$(".ui-icon-close").keyup(function(event) {
    if (event.altKey && event.keyCode === $.ui.keyCode.BACKSPACE) {
        var panelId = tabs.find(".ui-tabs-active").remove().attr("aria-controls");
        $("#" + panelId).remove();
        tabs.tabs("refresh");
    }
});

// Mask in monto field
/*
document.getElementById("fld_monto_lbl").onblur =function (){    
    this.value = parseFloat(this.value.replace(/,/g, ""))
                    .toFixed(2)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    
    document.getElementById("fld_monto").value = this.value.replace(/,/g, "")
    
}
*/




$('#table_files_proformasBE').on('click', '.delete_file', function(e) {
    console.log("--> Elim...");
    var bool = confirm("Esta seguro de eliminar este documento?");
    if (bool) {
        var data = $(this).parents('tr').find("td").find("a");
        var archivo0 = $(data).eq(0).text();
        var archivo1 = $(data).eq(1).text();
        id = $("#idDafCertificacionesBE").val();
        salidaError = '';
        for(i=0; i<=1; i++){
            if(i == 0)
                nombre_archivo = archivo0;
            else
                nombre_archivo = archivo1;
            respuesta = delete_file(nombre_archivo,id);
            if(respuesta != 1)
                salidaError+= nombre_archivo+'<br>';

            console.log(i);
        }
        if(salidaError != "")
            validaContenedorExt("addDafCertificacionesBE", "<p style='font-size:12px;'>Error al eliminar el archivo<br>"+salidaError+"</p>","error");
        else{
            $(this).parents('tr').remove();
            cadena_archivos = getCadenaArchivos('proformas','BE');
            datos = '{"archivos_proformas":"'+cadena_archivos+'"}';
            updateArchivoCertBase(datos,"BE",id);
        }
    }
})


$('#table_cert_otrosArchivosBE').on('click', '.delete_file', function(e) {
    var bool = confirm("Esta seguro de eliminar este documento?");
    if (bool) {
        var data = $(this).parents('tr').find("td").find("a");
        var nombre_archivo = $(data).eq(0).text();
        id = $("#idDafCertificacionesBE").val();
        respuesta = delete_file(nombre_archivo,id);
        if(respuesta != 1)
            validaContenedorExt("addDafCertificacionesBE", "<p style='font-size:12px;'>Error al eliminar el archivo<br>"+nombre_archivo+"</p>","error");
        else{
            $(this).parents('tr').remove();
            cadena_archivos = getCadenaArchivos('anexos','BE');
            datos = '{"archivos_otros":"'+cadena_archivos+'"}';
            updateArchivoCertBase(datos,"BE",id);
        }
    }
})

$('#table_files_certificaciones2BE').on('click', '.delete_file', function(e) {
    var bool = confirm("Esta seguro de eliminar este documento?");
    if (bool) {
        var data = $(this).parents('tr').find("td").find("a");
        var nombre_archivo = $(data).eq(0).text();
        id = $("#idDafCertificacionesBE").val();
        respuesta = delete_file(nombre_archivo,id);
        if(respuesta != 1)
            validaContenedorExt("addDafCertificacionesBE", "<p style='font-size:12px;'>Error al eliminar el archivo<br>"+nombre_archivo+"</p>","error");
        else{
            $(this).parents('tr').remove();
            cadena_archivos = getCadenaArchivos('certificacion','2BE');
            datos = '{"archivos_certificacion":"'+cadena_archivos+'"}';
            updateArchivoCertBase(datos,"BE",id);
        }        
    }
})

/* fin codigo para agregar pestañas al contenedor*/

/*
* Funcion: limpiarFormDafCertificaciones
* Descripcion: Borra contenido de todos los campos del formulario.
* Parametros:
*   - formulario(String): Nombre del formulario.              
*/
function limpiarFormDafCertificaciones(formulario) {
    console.log("********** limpiarFormDafCertificaciones **********");
    prefijo = "";
    if(formulario == 'frm_certif')
        prefijo = "";
    if(formulario == 'frm_certifBE')
        prefijo = 'BE'
    if(formulario == 'frm_certifET')
        prefijo = 'ET'
    $('.nav-tabs a[href="#tab_info'+prefijo+'"]').tab('show'); // Tab por defecto
    //clearForm(formulario);

    // Campos Solicitante
    $("#fld_func_solicitante_id"+prefijo).val($("#funcionario_session_id"+prefijo).val());
    $("#fld_func_solicitante_nm"+prefijo).val($("#funcionario_session_nm"+prefijo).val());
    $("#fld_cargo"+prefijo).val($("#puesto_institucional_nm_"+prefijo).val());
    $("#fld_email"+prefijo).val($("#email_institucional_"+prefijo).val());
    console.log($("#isla_trabajo_id"+prefijo).val())
    $("#fld_islatramite"+prefijo).val($("#isla_trabajo_id"+prefijo).val()).trigger("change");
    
    if(valor_nulo_str($("#telefono_celular_"+prefijo).val())!="None")
        $("#fld_telefono"+prefijo).val($("#telefono_celular_"+prefijo).val());
    
    // Campos Director Area
    $("#fld_func_dirarea_id"+prefijo).val($("#directorarea_id"+prefijo).val());
    $("#fld_func_dirarea_nm"+prefijo).val($("#directorarea_nombres"+prefijo).val());
    
    // Campos Info. contrato
    $('#fld_titulo'+prefijo).val("");
    $('#fld_descripcion'+prefijo).val("");
    $("#fld_tipo"+prefijo).val("").trigger("change");
    $("#fld_monto"+prefijo).val("");


    $('#fld_catalogo_elect'+prefijo).prop('checked', false);
    ocultarDocumentCert(false,formulario);

    
    
    // Campos tramite
    $("#fld_estado_tramite"+prefijo).val("B").trigger("change");

    //archivos
    for(file_id=1;file_id<=4;file_id++){
        $("#archivoCert"+file_id+prefijo).html("");
        $("#archivoCert"+file_id+prefijo).attr("href", ""); // Set herf value
        $("#archivoCert"+file_id+prefijo).attr("target", "_blank");   
        $("#archivoCert"+file_id+prefijo).css("color", "#262DCE");  
        $("#borrarCert"+file_id+prefijo).html("");      
    }

    $("#archivoCert99"+prefijo).html("");
    $("#archivoCert99"+prefijo).attr("href", ""); // Set herf value
    $("#archivoCert99"+prefijo).attr("target", "_blank");   
    $("#archivoCert99"+prefijo).css("color", "#262DCE");  
    $("#borrarCert99"+prefijo).html("");      

    // proformas
    $("#files_select"+prefijo).html(""); 
    // Anexos
    $("#files_selectAnexos"+prefijo).html(""); 

    var today = moment().format('YYYY-MM-DD');
    document.getElementById("fld_fecha_solicitud"+prefijo).value = today;

    id = uuidv4();
    $("#idDafCertificaciones"+prefijo).val(id);

    //Campo para insertar o editar
    $("#tipot_certif"+prefijo).val(0);

}

/*
* Funcion: editDafCertificaciones.
* Descripcion: Carga los campos en memoria en el formulario.
* Parametros:
*   - id(String): id del modelo/tabla DafCertificaciones.
*   - formulario(String): Nombre del formulario.              
*/
function editDafCertificaciones(id,formulario) {
    console.log(">> editDafCertificaciones <<");
    limpiarFormDafCertificaciones(formulario);

    var borrar = '';
    var path_archivos_cert = 'static/media/daf_certificaciones/'; 
    path_archivos_cert = path_archivos_cert + id + '/';

    if(formulario == 'frm_certif')
        prefijo = "";
    if(formulario == 'frm_certifBE'){
        prefijo = 'BE';
        accionesPorPermiso(id,formulario);
    }

    if(formulario == 'frm_certifET')
        prefijo = 'ET';

    

    $('.nav-tabs a[href="#tab_info'+prefijo+'"]').tab('show');
    $("#tituloDafCertf"+prefijo).html("Editar");
    $("#idDafCertificaciones"+prefijo).val(id);
    $("#tipot_certif"+prefijo).val(1);

    permiso = $("#td_permission_"+prefijo+id).html();

    $.ajax({
        url: "data_certificados",
        type: "get",
        cache: 'false',
        data: {
            "data": id
        },
        dataType: "json",
        async: false,

        success: function(json) {
            console.log(json[0]);
            
            $("#modalLoadin").hide();

            if (json['error']) {
                if (json['error']['context'])
                    var salida = json['error']['context']['resource'][0].message;
                else
                    var salida = json['error']['message']
            } else {
                // Permiso descripcion
                $("#fld_permiso_descrp"+prefijo).html($("#td_permission_"+prefijo+id).attr('descripcion'));
                // Clean Campos de la seccion "Solicitud Enviada Por"
                $("#fld_func_solicitante_id"+prefijo).val("").trigger("change");
                $("#fld_cargo"+prefijo).val($("").val());
                $("#fld_email"+prefijo).val($("").val());
                $("#fld_telefono"+prefijo).val($("").val());


                //Ocultar documentacion
                ocultarDocumentCert(json[0].catalogo_elect,formulario);

                // Cargar datos solicitantes
                if(json[0].func_solicitante_id != null){
                    $("#fld_func_solicitante_id"+prefijo).val(json[0].func_solicitante_id.id);

                    $("#fld_email"+prefijo).val(json[0].func_solicitante_id.email);
                    //console.log(json[0].func_solicitante_id.cargo_institucional_id);
                    if(json[0].func_solicitante_id.cargo_institucional_id == null){
                        $("#fld_cargo"+prefijo).val("");
                    }else{
                        $("#fld_cargo"+prefijo).val(json[0].func_solicitante_id.cargo_institucional_id.nombre);
                    }

                    if(json[0].func_solicitante_id.persona_id != null){
                        $("#fld_func_solicitante_nm"+prefijo).val(json[0].func_solicitante_id.persona_id.nombre_completo);
                        $("#fld_telefono"+prefijo).val(json[0].func_solicitante_id.persona_id.telefono_celular);
                    }else{
                        $("#fld_telefono"+prefijo).val("");
                    }

                }else{
                    $("#fld_email"+prefijo).val("");
                }

                
                // Cargar datos del Director Area
                if(json[0].func_dirarea_id != null){
                    $("#fld_func_dirarea_id"+prefijo).val(json[0].func_dirarea_id.id);

                    if(json[0].func_dirarea_id.persona_id != null){
                        $("#fld_func_dirarea_nm"+prefijo).val(json[0].func_dirarea_id.persona_id.nombre_completo);
                    }
                }

                // Isla Trabajo
                $("#fld_islatramite"+prefijo).val(json[0].isla_usuario_ingreso_id).trigger("change");


                
                // Otros campos
                $("#fld_secuencia"+prefijo).val(json[0].secuencia);
                $("#fld_fecha_solicitud"+prefijo).val(json[0].fecha_solicitud);
                $("#fld_titulo"+prefijo).val(json[0].titulo);
                $("#fld_descripcion"+prefijo).val(json[0].descripcion);
                $("#fld_tipo"+prefijo).val(json[0].tipo).trigger("change");
                $("#fld_tipo_revision"+prefijo).val(json[0].tipo_revision).trigger("change");
                $("#fld_monto"+prefijo).val(json[0].monto);
                $("#fld_monto_lbl"+prefijo).val(json[0].monto);
                $("#fld_estado_tramite"+prefijo).val(json[0].estado_tramite).trigger("change");
                $('#fld_catalogo_elect'+prefijo).prop('checked', json[0].catalogo_elect);

                if((json[0].monto != null)||(json[0].monto != ""))
                    mask_money($('#fld_monto_lbl'+prefijo).val(),'fld_monto'+prefijo,'fld_monto_lbl'+prefijo);

                tipo_requerimiento = json[0].tipo;

                if(tipo_requerimiento != 'B')
                    $("#tr_bien"+prefijo).hide();
                else
                    $("#tr_bien"+prefijo).show();


                // Proformas
                $("#files_select"+prefijo).html(""); 

                
                // Documentacion
                if((json[0].archivos != "")&&(json[0].archivos != null)){
                    dataFile1 = json[0].archivos.split("|");
                    borrar='<i class="fa fa-close text-red"></i>';

                    if(dataFile1.length > 0){
                        if((dataFile1[0] == null)||(dataFile1[0] == "")){
                            $("#archivoCert1"+prefijo).html("");
                            $("#borrarCert1"+prefijo).html("");
                        }else{
                            //$("#archivoCert1"+prefijo).html(imgpdf+dataFile1[0]);
                            $("#archivoCert1"+prefijo).html(dataFile1[0]);
                            $("#archivoCert1"+prefijo).attr("href", path_archivos_cert + dataFile1[0]);
                            $("#archivoCert1"+prefijo).css("color", "#262DCE");
                            $("#archivoCert1"+prefijo).css("padding-left", "5px");
                            $("#borrarCert1"+prefijo).html(borrar);

                        }
                        
                        if((dataFile1[1] == null)||(dataFile1[1] == "")){
                            $("#archivoCert2"+prefijo).html("");
                            $("#borrarCert2"+prefijo).html("");
                        }else{
                            $("#archivoCert2"+prefijo).html(dataFile1[1]);
                            $("#archivoCert2"+prefijo).attr("href", path_archivos_cert + dataFile1[1]);
                            $("#archivoCert2"+prefijo).css("color", "#262DCE");
                            $("#archivoCert2"+prefijo).css("padding-left", "5px");
                            $("#borrarCert2"+prefijo).html(borrar);
                        }

                        if(document.querySelector('input[name=fld_catalogo_elect'+prefijo+']:checked')==null){
                            if((dataFile1[2] == null)||(dataFile1[2] == "")){
                                $("#archivoCert3"+prefijo).html("");
                                $("#borrarCert3"+prefijo).html("");
                            }else{
                                $("#archivoCert3"+prefijo).html(dataFile1[2]);
                                $("#archivoCert3"+prefijo).attr("href", path_archivos_cert + dataFile1[2]);
                                $("#archivoCert3"+prefijo).css("color", "#262DCE");
                                $("#archivoCert3"+prefijo).css("padding-left", "5px");
                                $("#borrarCert3"+prefijo).html(borrar);
                            }
                            if((dataFile1[3] == null)||(dataFile1[3] == "")){
                                $("#archivoCert4"+prefijo).html("");
                                $("#borrarCert4"+prefijo).html("");
                            }else{
                                $("#archivoCert4"+prefijo).html(dataFile1[3]);
                                $("#archivoCert4"+prefijo).attr("href", path_archivos_cert + dataFile1[3]);
                                $("#archivoCert4"+prefijo).css("color", "#262DCE");
                                $("#archivoCert4"+prefijo).css("padding-left", "5px");
                                $("#borrarCert4"+prefijo).html(borrar);
                            }

                            if(tipo_requerimiento == 'B'){
                                if((dataFile1[4] == null)||(dataFile1[4] == "")){
                                    $("#archivoCert99"+prefijo).html("");
                                    $("#borrarCert99"+prefijo).html("");
                                }else{
                                    $("#archivoCert99"+prefijo).html(dataFile1[4]);
                                    $("#archivoCert99"+prefijo).attr("href", path_archivos_cert + dataFile1[4]);
                                    $("#archivoCert99"+prefijo).css("color", "#262DCE");
                                    $("#archivoCert99"+prefijo).css("padding-left", "5px");
                                    $("#borrarCert99"+prefijo).html(borrar);
                                }
                            }
                            
                        }else{
                            $("#archivoCert3"+prefijo).html("");
                            $("#borrarCert3"+prefijo).html("");

                            if((dataFile1[2] == null)||(dataFile1[2] == "")){
                                $("#archivoCert4"+prefijo).html("");
                                $("#borrarCert4"+prefijo).html("");
                            }else{
                                $("#archivoCert4"+prefijo).html(dataFile1[2]);
                                $("#archivoCert4"+prefijo).attr("href", path_archivos_cert + dataFile1[2]);
                                $("#archivoCert4"+prefijo).css("color", "#262DCE");
                                $("#archivoCert4"+prefijo).css("padding-left", "5px");
                                $("#borrarCert4"+prefijo).html(borrar);
                            }

                        }

                    }

                }

                // Informe tic
                if((json[0].doc_tic == null)||(json[0].doc_tic == "")){
                    $("#archivoCert5"+prefijo).html("");
                    $("#borrarCert5"+prefijo).html("");
                }else{
                    //$("#archivoCert1"+prefijo).html(imgpdf+dataFile1[0]);
                    $("#archivoCert5"+prefijo).html(json[0].doc_tic);
                    $("#archivoCert5"+prefijo).attr("href", path_archivos_cert + json[0].doc_tic);
                    $("#archivoCert5"+prefijo).css("color", "#262DCE");
                    $("#archivoCert5"+prefijo).css("padding-left", "5px");
                    $("#borrarCert5"+prefijo).html(borrar);

                    $("#v_archivoCert5"+prefijo).html(json[0].doc_tic);
                    $("#v_archivoCert5"+prefijo).attr("href", path_archivos_cert + json[0].doc_tic);
                    $("#v_archivoCert5"+prefijo).css("color", "#262DCE");
                    $("#v_archivoCert5"+prefijo).css("padding-left", "5px");
                }
                
                // Informe Mantenimiento
                if((json[0].doc_mantenimiento == null)||(json[0].doc_mantenimiento == "")){
                    $("#archivoCert6"+prefijo).html("");
                    $("#borrarCert6"+prefijo).html("");
                }else{
                    //$("#archivoCert1"+prefijo).html(imgpdf+dataFile1[0]);
                    $("#archivoCert6"+prefijo).html(json[0].doc_mantenimiento);
                    $("#archivoCert6"+prefijo).attr("href", path_archivos_cert + json[0].doc_mantenimiento);
                    $("#archivoCert6"+prefijo).css("color", "#262DCE");
                    $("#archivoCert6"+prefijo).css("padding-left", "5px");
                    $("#borrarCert6"+prefijo).html(borrar);

                    $("#v_archivoCert6"+prefijo).html(json[0].doc_mantenimiento);
                    $("#v_archivoCert6"+prefijo).attr("href", path_archivos_cert + json[0].doc_mantenimiento);
                    $("#v_archivoCert6"+prefijo).css("color", "#262DCE");
                    $("#v_archivoCert6"+prefijo).css("padding-left", "5px");
                }
                
                // Informe Obra Civil
                if((json[0].doc_obracivil == null)||(json[0].doc_obracivil == "")){
                        $("#archivoCert7"+prefijo).html("");
                        $("#borrarCert7"+prefijo).html("");
                }else{
                    //$("#archivoCert1"+prefijo).html(imgpdf+dataFile1[0]);
                    $("#archivoCert7"+prefijo).html(json[0].doc_obracivil);
                    $("#archivoCert7"+prefijo).attr("href", path_archivos_cert + json[0].doc_obracivil);
                    $("#archivoCert7"+prefijo).css("color", "#262DCE");
                    $("#archivoCert7"+prefijo).css("padding-left", "5px");
                    $("#borrarCert7"+prefijo).html(borrar);

                    $("#v_archivoCert7"+prefijo).html(json[0].doc_obracivil);
                    $("#v_archivoCert7"+prefijo).attr("href", path_archivos_cert + json[0].doc_obracivil);
                    $("#v_archivoCert7"+prefijo).css("color", "#262DCE");
                    $("#v_archivoCert7"+prefijo).css("padding-left", "5px");
                }


                // Si es formulario IniciarTramite o si es solicitante permitira eliminar los archivos, caso contrario no.
                clase = '';
                if(prefijo == "" || permiso=='s_solicitante' ){
                    clase = '';
                    style = '';
                }else{
                    style = 'display:none;';
                    clase = 'disabled-select';
                }

                // Proformas y ruc
                if((json[0].archivos_proformas != "")&&(json[0].archivos_proformas != null)){
                    tr='';
                    
                    dataFile = json[0].archivos_proformas.split("|"); //proforma;
                    
                    

                    for(i=0; i< dataFile.length; i++){    
                        dataFileP  = dataFile[i].split(":");
                        tr+='<tr>';
                        for(j=0; j< dataFileP.length; j++){
                            tr+='<td align="left" style="border: 2px solid; margin:15px 5px 15px 5px;padding-left:5px;"><a style="cursor:pointer; text-decoration:none;color:#262DCE;" href="'+path_archivos_cert+dataFileP[j]+'" target="_blank">'+dataFileP[j]+'</a></td>';
                        }
                        if(prefijo == "" || permiso =='s_solicitante' )
                            tr+='<td style="border: 2px solid" align="center" class="'+clase+'"><a class="delete_file" style="font-size: 20px;cursor:pointer;margin:15px;'+style+'"><i class="fa fa-close text-red"></i></a></td>';
                        tr+='</tr>';
                    }
                    $("#files_select"+prefijo).append(tr); //Proformas y ruc

                }

                // Certificacion Presupuesto
                if(json[0].archivos_certificacion!=null)
                    dataFileCert = json[0].archivos_certificacion.split("|");
                else
                    dataFileCert=""


                // Anexos
                if(json[0].archivos_otros != ""&&json[0].archivos_otros != null){
                    $("#files_selectAnexos"+prefijo).html("");
                    arr_archivos_otros = "";
                    arr_archivos_otros = json[0].archivos_otros.split("|");
                    
                    tr="";
                    for(i=0; i< arr_archivos_otros.length; i++){
                        tr+='<tr>';
                        tr+='<td align="left" style="border: 2px solid; margin:15px 5px 15px 5px;padding-left:5px;"><a style="cursor:pointer; text-decoration:none;color:#262DCE;" href="'+path_archivos_cert+arr_archivos_otros[i]+'" target="_blank">'+arr_archivos_otros[i]+'</a></td>';
                        if(prefijo == "" || permiso =='s_solicitante' )
                            tr+='<td style="border: 2px solid" align="center" class="'+clase+'"><a class="delete_file" style="font-size: 20px;cursor:pointer;margin:15px;'+style+'"><i class="fa fa-close text-red"></i></a></td>';
                        tr+='</tr>';
                    }
                    $("#files_selectAnexos"+prefijo).append(tr);

                }

                if(prefijo == 'BE'){
                    // Archivos Certificacion
                    $("#files_select2BE").html("");
                    $("#files_select").html("");

                    if((json[0].archivos_certificacion == "")||(json[0].archivos_certificacion == null)){
                        $("#files_select2BE").html("");
                    }else{
                        // Certificaciones
                        tr="";
                        if(dataFileCert!=""){
                            for(i=0; i< dataFileCert.length; i++){    
                                tr+='<tr>';
                                tr+='<td align="left" style="border: 2px solid; margin:15px 5px 15px 5px;padding-left:5px;"><a style="cursor:pointer; text-decoration:none;color:#262DCE;" href="'+path_archivos_cert+dataFileCert[i]+'" target="_blank">'+dataFileCert[i]+'</a></td>';
                                //tr+='<td style="border: 2px solid" align="center" class="'+clase+'"><a class="delete_file" style="font-size: 20px;cursor:pointer;margin:15px;'+style+'"><i class="fa fa-close text-red"></i></a></td>';
                                tr+='<td style="border: 2px solid" align="center"><a class="delete_file" style="font-size: 20px;cursor:pointer;"><i class="fa fa-close text-red"></i></a></td>';
                                tr+='</tr>';
                            }
                        }
     
                        $("#files_select2BE").html(tr);
                    }

                    


                }

                if(prefijo == 'ET'){
                    // Certificaciones
                    tr="";
                    $("#files_select2ET").html("");

                    if(dataFileCert!=""){
                        for(i=0; i< dataFileCert.length; i++){    
                            tr+='<tr>';
                            tr+='<td align="left" style="border: 2px solid; margin:15px 5px 15px 5px;padding-left:5px;"><a style="cursor:pointer; text-decoration:none;color:#262DCE;" href="'+path_archivos_cert+dataFileCert[i]+'" target="_blank">'+dataFileCert[i]+'</a></td>';
                            //tr+='<td style="border: 2px solid" align="center" class="'+clase+'"><a class="delete_file" style="font-size: 20px;cursor:pointer;margin:15px;'+style+'"><i class="fa fa-close text-red"></i></a></td>';
                            
                            tr+='</tr>';
                        }
                    }
            
                    $("#files_select2ET").html(tr);
                }

                // Lista Funcionario Reasignar
                if(json[0].func_solicitante_id.isla_trabaja_id != null)
                    cargaFuncionariosByRolSelect(permiso,json[0].func_solicitante_id.isla_trabaja_id.id);

                // Detalle Observaciones
                console.log("Detalles Observaciones..");
                var item = "";
                var tabla = "";
                var arrObs = [];
                var cont = json[0].det_certificaciones.length;
                
                //if(prefijo == 'ET')
                tabla += "<ul class='timeline'>";

                for(var i=0; i< json[0].det_certificaciones.length; i++){
                    item = json[0].det_certificaciones[i];


                        if(item.estado_tramite == 'A')
                            tabla += "<li class='time-label'><span class='bg-green'>" + item.fecha_ingreso + "</span></li>";
                        else
                            tabla += "<li class='time-label'><span class='bg-blue'>" + item.fecha_ingreso + "</span></li>";
                        tabla += "<li>";
                        if(item.estado_tramite == 'A')
                            tabla += "<i class='fa fa-comments bg-green'></i>";
                        else
                            tabla += "<i class='fa fa-comments bg-blue'></i>";
                        tabla += "<div class='timeline-item'>";
                        tabla += "<span class='time'><i class='fa fa-commenting'></i></span>";
                        tabla += "<h3 class='timeline-header><a 'style='color:#000000;font-size:14px;font-weight:bold;'>" +item.funcionario_id.persona_id.nombre_completo + "</a></h3>";
                        //tabla += "<div class='timeline-body' style='background-color:#dfdfdf;'>" +item.observacion + "</div>";
                        //tabla += "<textarea id='fld_observacion_"+item.id+"' class='timeline-body' rows='7' cols='110' style='width: 90%; background-color:#dfdfdf;font-style: normal;font-variant: normal; text-transform: none;'>" +item.observacion + "</textarea>";
                        tabla += "<div style='border: 1px solid black;background-color:#dfdfdf;height: auto;overflow: auto;width:100%; padding: 10px; font-size:14px;'>" +item.observacion + "</div>";
                        tabla += "</div>";
                        tabla += "</li>";
                    
                  
                }/*fin for*/
                
                tabla += "</ul>";

                $("#sec_obs"+prefijo).html("");
                $("#sec_obs"+prefijo).append(tabla);

                

                /*for(i=0; i<arrObs.length; i++){
                    if (tinyMCE.execCommand ('mceRemoveEditor', false, arrObs[i])) {
                        tinymce.init({selector:'#'+arrObs[i],menubar: false,statusbar: false,toolbar: false,width: '100%'});
                        tinyMCE.get(arrObs[i]).getBody().setAttribute('contenteditable', false);
                        tinyMCE.get(arrObs[i]).getBody().style.backgroundColor = '#DBE8FD';
                    }
                }*/
                

               
            }
        },
        error: function(data) {
            $("#modalLoadin").hide();
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));

        },
    });
}

/*
* Funcion: setInsertUpdateDafCertificaciones.
* Descripcion:  funcion para verificar si se realiza una insercion o una actualizacion. 
*               el valor del if se llena con 0 cuando se da click en el boton nuevo y con 1 cuando se da clik en editar.
* Parametros:
*   - param(String): B(Borrador),INICIAR_TRAMITE(Inicia el tramite).
*   - prefijo(String): Prefijo del formulario ''(IniciarTramite), BE(BandejaEntrada),ET(Estado Tramite)     
*/
function setInsertUpdateDafCertificaciones(param, prefijo) {
    console.log("******** setInsertUpdateDafCertificaciones **********");
    valida = validaContenedor("addDafCertificaciones");
    //if (valida) {
        var bool = false;

        if (param == "B") { //Borrador permite guardar sin validacion.
            $("#fld_estado_tramite").val("B").trigger("change");
            if ($("#tipot_certif").val() == 0)
                insertarTablaDafCertificaciones(param, prefijo);
            else
                saveEditDafCertificaciones(prefijo,param);
        }else{
            $("#fld_estado_tramite").val("T").trigger("change");
            if(validar_archivos_vacios(prefijo) != 0){
                if (valida) {
                    bool = confirm("Estas seguro de INICIAR el Tramite?");
                    if (bool) {
                        // Nueva Secuencia
                        nueva_secuencia = generar_secuencia_daf(prefijo);

                        if ($("#tipot_certif").val() == 0)
                            insertarTablaDafCertificaciones(param,prefijo,nueva_secuencia);
                        else
                            saveEditDafCertificaciones(prefijo,param,nueva_secuencia);
                    }
                }
            }
        }
    //} 
}


/*
* Funcion: generar_secuencia_daf
* Descripcion:  funcion para verificar si se realiza una insercion o una actualizacion. 
*               el valor del if se llena con 0 cuando se da click en el boton nuevo y con 1 cuando se da clik en editar.
* Parametros:
*   - prefijo(String): Prefijo del formulario ''(IniciarTramite), BE(BandejaEntrada),ET(Estado Tramite)     
*/
function generar_secuencia_daf(prefijo) {
    console.log(">>>> generar_secuencia_daf <<<<");

    isla_trabaja_user = $("#isla_trabaja_user"+prefijo).val();

    if (isla_trabaja_user=='SANTA CRUZ')
        codigo = 'daf_cp_sx';
    else if (isla_trabaja_user=='SAN CRISTÓBAL')
        codigo = 'daf_cp_sc';
    else if (isla_trabaja_user=='ISABELA')
        codigo = 'daf_cp_isa';
    else
        codigo = '';


    $.ajax({
        url: "data_secuencia",
        type: "get",
        data: {
            "data": codigo
        },
        dataType: "json",
        async: false,
        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
            } else {
                codigo_secuencia = data[0].id;
                nueva_secuencia = data[0].valor + 1;

                secuencia_zero = completarConCeros(nueva_secuencia,5);
                secuencia_text = data[0].prefijo + secuencia_zero;
                console.log(codigo_secuencia + '*******' + nueva_secuencia);

                dict = {
                    "codigo_secuencia": codigo_secuencia,
                    "secuencia": nueva_secuencia,
                    "secuencia_text": secuencia_text
                };
            }
        },
        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
            //console.log( JSON.stringify(data));
        },
    });


    return dict;

    

}

/*funcion para insertar en la base de datos*/
/*
* Funcion: validar_archivos_vacios.
* Descripcion: funcion para insertar en la base de datos
* Parametros:
*   - param(String): B(Borrador),INICIAR_TRAMITE(Inicia el tramite).
*   - prefijo(String): Prefijo del formulario ''(IniciarTramite), BE(BandejaEntrada),ET(Estado Tramite)   
*   - nueva_secuencia(dict): Diccionario el int de la nueva secuencia(1) y el text ya estructura con la secuencia(SX-00001)
*/
function insertarTablaDafCertificaciones(param,prefijo,nueva_secuencia) {
    console.log("******* insertarTablaDafCertificaciones *******");
    id = $("#idDafCertificaciones"+prefijo).val();
    titulo = $("#fld_titulo"+prefijo).val();
    
    console.log($("#fld_estado_tramite").val());

    datos = get_json_certificados(prefijo,id);

    
    // Agregar Secuencia a cadena de datos.
    if(nueva_secuencia!=null && nueva_secuencia!="") 
        datos += ',"secuencia":"'+nueva_secuencia["secuencia_text"]+'"';
    else
        datos += ',"secuencia":""';
   
    datos += '}';
    console.log(datos);
    id_padre = $('#content_DafCertificaciones'+prefijo).parent().attr('id');

    dj_url = "dafcertificaciones";
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
                swal("", "Registro Insertado con éxito", "success");
                // Actualizar numeracion Secuencia.
                /*if(nueva_secuencia!=null && nueva_secuencia!=""){
                    datosSec = '{"valor":"' + nueva_secuencia["secuencia"] + '"}'; 
                    th_update(datosSec, "", "", "sissecuencia", nueva_secuencia["codigo_secuencia"]);
                }*/
                
                if(param=='INICIAR_TRAMITE'){
                    var x = $("#idDafCertificaciones"+prefijo).val();
                    // Correo para Director Area
                    enviar_emailnotificacion('A',prefijo,id,titulo); 

                    // Correo para Solicitante
                    enviar_emailnotificacion('S',prefijo,id,titulo);
                }
                buscarCertificadosParametros('','frm_certif');
                //location.reload();       
            }
        },
        error: function(data) {
            $('#modalLoadin').hide();
            swal("", "Error al Insertar el registro", "error");
            console.log("data---->" + datos + "--->" + "spncontrolhuevos" + "Error--->" + data);
        },
    });
    //th_insert(datos, "SL_daf_certificacionesIniciarTramites", id_padre, "dafcertificaciones");
}


/*
* Funcion: saveEditDafCertificaciones.
* Descripcion: Actualiza el registro en la base de datos.
* Parametros:
*   - prefijo(String): Prefijo del formulario ''(IniciarTramite), BE(BandejaEntrada),ET(Estado Tramite)     
*   - param(String): B(Borrador),INICIAR_TRAMITE(Inicia el tramite).
*   - nueva_secuencia(dict): Diccionario el int de la nueva secuencia(1) y el text ya estructura con la secuencia(SX-00001)
*/
function saveEditDafCertificaciones(prefijo,param,nueva_secuencia) {
    console.log("****** saveEditDafCertificaciones ******");
    id = $("#idDafCertificaciones"+prefijo).val();
    //id_padre = $('#content_DafCertificaciones').parent().attr('id');
    titulo = $("#fld_titulo"+prefijo).val();
    /*se arma la cadena datos*/
    datos = get_json_certificados(prefijo);
   
    if(nueva_secuencia!=null && nueva_secuencia!="") 
        datos += ',"secuencia":"'+nueva_secuencia["secuencia_text"]+'"';

    datos += '}';
   console.log(datos);

    dj_url = "dafcertificaciones";
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
                //$('#modalLoadin').hide();
                swal("", "Error al Actualizar el registro", "error");
                console.log("data---->" + datos + "--->" + "trpcontrolmaterialpetreo" + "Error--->" + data);
            } else {
                swal("", "Registro Actualizados con éxito", "success");
                var d = new Date();
                var f1 = d.getFullYear() + "-01-01";
                var f2 = d.getFullYear() + "-12-31";
                var dataini = f1 + "," + f2;

                f1_aux = '01/01/' + d.getFullYear();
                f2_aux = '12/31/' + d.getFullYear();

                $("#FdesdeParam").val(f1_aux);
                $("#FhastaParam").val(f2_aux);

                if(param=='INICIAR_TRAMITE'){
                    // Correo para Director Area
                    enviar_emailnotificacion('A',prefijo,id,titulo); 
                    // Correo para SOlicitante
                    enviar_emailnotificacion('S',prefijo,id,titulo);
                }

                buscarCertificadosParametros(dataini,'frm_certif');             
            }
        },
        error: function(data) {
            swal("", "Error al Actualizar el registro", "error");
            console.log("data---->" + datos + "--->" + "trpcontrolmaterialpetreo" + "Error--->" + data);
        },
    });
    
    

}


/*
* Funcion: deleteDafCertificaciones.
* Descripcion: funcion para eliminar(cambio de estado en la base de datos)
* Parametros:
*   - id(String): Id del registro a eliminar.
*/
function deleteDafCertificaciones(id) {
    id_padre = $('#content_DafCertificaciones').parent().attr('id');
    datos = '{"estado":"I","eliminado":"t"}';
    th_delete(datos, "SL_daf_certificacionesIniciarTramites", id_padre, "dafcertificaciones", id);
}

/*
* Funcion: cargaFuncionariosSelect.
* Descripcion: Carga la lista de funcionarios en un select
* Parametros:
*   - prefijo(String): Prefijo del formulario ''(IniciarTramite), BE(BandejaEntrada),ET(Estado Tramite)     
*/
function cargaFuncionariosSelect(prefijo){
  
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

                $("#optionFuncS"+prefijo).val(option);
                
                // SELECT FUNCIONARIOS
                $("#fld_func_dirarea_id"+prefijo).html(option);
                $("#fld_func_dirarea_id"+prefijo).select2({
                  sorter: data => data.sort((a, b) => a.text.localeCompare(b.text)),
                });

                $("#fld_func_solicitante_id"+prefijo).html(option);
                $("#fld_func_solicitante_id"+prefijo).select2({
                  sorter: data => data.sort((a, b) => a.text.localeCompare(b.text)),
                });

                
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

/*
metodo para buscar datos en tabla funcionario segun el parametro que se envie cedula/nombre /apellido
Tipo: I=IniciarTramite, B= BandejaEntrada, T=Estado Solicitud
*/

/*
* Funcion: buscarCertificadosParametros.
* Descripcion: Realiza una busqueda de los certificados segun el parametro.
* Parametros:
*   - dataIni(String): Parametros Iniciales para fecha_solicitud__range
*   - formulario(String): Nombre del formulario.
*/
function buscarCertificadosParametros(dataIni,formulario) {
    console.log("********** buscarCertificadosParametros ********** ");
    $("#modalLoadin").show();
    data = prefijo = '';

    if(formulario == 'frm_certif')
        prefijo = "";
    
    if(formulario == 'frm_certifBE')
        prefijo = 'BE'
    
    if(formulario == 'frm_certifET')
        prefijo = 'ET'
    

    if(dataIni){
        data = data += "fecha_solicitud__range=" + dataIni;
        if(formulario == "frm_certif")
            data += "&estado_tramite__in=B";
    }else{
        desde = $("#FdesdeParam"+prefijo).val();
        hasta = $("#FhastaParam"+prefijo).val();

        if ((desde == "") || (hasta == ""))
            cadenaFecha = "";
        else
            cadenaFecha = "1";

        if (cadenaFecha != "") {
            desdeArr = desde.split('/');
            hastaArr = hasta.split('/');

            fdesde = desdeArr[2] + "-" + desdeArr[0] + "-" + desdeArr[1];
            fhasta = hastaArr[2] + "-" + hastaArr[0] + "-" + hastaArr[1];
        }


        if (cadenaFecha != "")
            data += "fecha_solicitud__range=" + fdesde + "," + fhasta + "&";

        if ( formulario == "frm_certif")
            data += "estado_tramite__in=B"+ "&";
        if ( formulario == "frm_certifET" && $("#SestadoFilterTramite"+prefijo).val() != "")
            data += "estado_tramite__in="+ $("#SestadoFilterTramite"+prefijo).val() + "&";

        data = data.substring(0, data.length - 1);
        
    }


    $.ajax({
        url: "data_certificadosParam",
        type: "get",
        data: {
            "data": data,
            "formulario": formulario
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
                        /*validacion ingreso sin accion*/
                        num_acciones = data[i].num_accion_personal;

                        tabla += "<tr>";
                        //tabla+="<td id='td_sancionFechaCreacion_"+data[i].id+"'>"+data[i].fecha_ingreso+"</td>";
                        
                        tabla += "<td align='center' id='td_fecha_solicitud_"+prefijo+ data[i].id + "'>" + data[i].fecha_solicitud + "</td>";
                        tabla += "<td align='center' id='td_num_solicitud_"+prefijo+ data[i].id + "'>" + data[i].secuencia + "</td>";

                        // TIPO
                        var texto = '';
                        //if(formulario != 'frm_certifET'){
                            if (data[i].tipo == "S") {
                                texto = 'SERVICIO';
                            } else if (data[i].tipo == "B") {
                                texto = 'BIEN';
                            } else if (data[i].tipo == "C") {
                                texto = 'CONSULTORIA';
                            } else if (data[i].tipo == "O") {
                                texto = 'OBRA CIVIL';
                            } else{
                                texto = '' + "</td>";
                            }
                            tabla += "<td align='center' id='td_tipo_"+prefijo + data[i].id + "'>" + texto + "</td>";
                        //}
                        
                        tabla += "<td align='center' id='td_titulo_"+prefijo + data[i].id + "'>" + data[i].titulo + "</td>";
                        //if(formulario != 'frm_certifET')
                        tabla += "<td align='center' id='td_monto_"+prefijo + data[i].id + "'>" + data[i].monto + "</td>";
                        
                        // CAMPOS ADICIONALES PARA DEL FORMULARIO ESTADO DE TRAMITES
                        if(formulario == 'frm_certifET'){

                            // DIRECTOR AREA
                            if (data[i].aprobar_dirarea == true) {
                                span = '<span style="font-size:10px;" class="badge bg-green">' + 'APROBADO' + '</span>'
                            }else{
                                span = '<span style="font-size:10px;" class="badge bg-silver">' + 'PENDIENTE' + '</span>'
                            }
                            tabla += "<td align='center' id='td_dirarea"+prefijo + data[i].id + "'>" + span + "</td>";

                            // TIC
                            if (data[i].aprobar_tic == true) {
                                span = '<span style="font-size:10px;" class="badge bg-green">' + 'APROBADO' + '</span>'
                            }else if (data[i].tipo_revision == 'T' && data[i].aprobar_tic == null) {
                                span = '<span style="font-size:10px;" class="badge bg-silver">' + 'PENDIENTE' + '</span>'
                            }else{
                                span = '<span style="font-size:10px;" class="badge bg-silver">' + 'N.A.' + '</span>'
                            }
                            tabla += "<td align='center' id='td_tic"+prefijo + data[i].id + "'>" + span + "</td>";

                            // MANTENIMIENTO
                            if (data[i].aprobar_mantenimiento == true) {
                                span = '<span style="font-size:10px;" class="badge bg-green">' + 'APROBADO' + '</span>'
                            }else if (data[i].tipo_revision == 'M' && data[i].aprobar_mantenimiento == null) {
                                span = '<span style="font-size:10px;" class="badge bg-silver">' + 'PENDIENTE' + '</span>'
                            }else{
                                span = '<span style="font-size:10px;" class="badge bg-silver">' + 'N.A.' + '</span>'
                            }
                            tabla += "<td align='center' id='td_mantenimiento"+prefijo + data[i].id + "'>" + span + "</td>";

                            // OBRA CIVIL
                            if (data[i].aprobar_obracivil == true) {
                                span = '<span style="font-size:10px;" class="badge bg-green">' + 'APROBADO' + '</span>'
                            }else if (data[i].tipo_revision == 'O' && data[i].aprobar_obracivil == null) {
                                span = '<span style="font-size:10px;" class="badge bg-silver">' + 'PENDIENTE' + '</span>'
                            }else if (data[i].tipo == 'O' && data[i].aprobar_obracivil == null) {
                                span = '<span style="font-size:10px;" class="badge bg-silver">' + 'PENDIENTE' + '</span>'
                            }else{
                                span = '<span style="font-size:10px;" class="badge bg-silver">' + 'N.A.' + '</span>'
                            }
                            tabla += "<td align='center' id='td_obracivil"+prefijo + data[i].id + "'>" + span + "</td>";

                            

                            // BODEGA
                            /*if (data[i].aprobar_bodega == true && data[i].tipo == 'B') {
                                span = '<span class="badge bg-green">' + 'APROBADO' + '</span>'
                            }else if(data[i].tipo == 'S'){
                                span = '<span class="badge bg-silver">' + 'N.A.' + '</span>'
                            }else{
                                span = '<span class="badge bg-silver">' + 'PENDIENTE' + '</span>'
                            }
                            tabla += "<td align='center' id='td_bodega"+prefijo + data[i].id + "'>" + span + "</td>";*/

                            /*
                            // COMPRAS PUBLICAS
                            if (data[i].aprobar_compraspub == true ) {
                                span = '<span class="badge bg-green">' + 'APROBADO' + '</span>'
                            }else{
                                span = '<span class="badge bg-silver">' + 'PENDIENTE' + '</span>'
                            }
                            tabla += "<td align='center' id='td_cpublicas"+prefijo + data[i].id + "'>" + span + "</td>";
                            */

                            // RESP. PAC
                            if (data[i].aprobar_respac == true ) {
                                span = '<span style="font-size:10px;" class="badge bg-green">' + 'APROBADO' + '</span>'
                            }else{
                                span = '<span style="font-size:10px;" class="badge bg-silver">' + 'PENDIENTE' + '</span>'
                            }
                            tabla += "<td align='center' id='td_respac"+prefijo + data[i].id + "'>" + span + "</td>";

                            // PLANIFICACION
                            if (data[i].aprobar_planificacion == true ) {
                                span = '<span style="font-size:10px;" class="badge bg-green">' + 'APROBADO' + '</span>'
                            }else{
                                span = '<span style="font-size:10px;" class="badge bg-silver">' + 'PENDIENTE' + '</span>'
                            }
                            tabla += "<td align='center' id='td_planifi"+prefijo + data[i].id + "'>" + span + "</td>";

                            // PRESUPUESTO
                            if (data[i].aprobar_presupuesto == true ) {
                                span = '<span style="font-size:10px;" class="badge bg-green">' + 'APROBADO' + '</span>'
                            }else{
                                span = '<span style="font-size:10px;" class="badge bg-silver">' + 'PENDIENTE' + '</span>'
                            }
                            tabla += "<td align='center' id='td_presupuesto"+prefijo + data[i].id + "'>" + span + "</td>";

                            // ADM. FINANCIERO
                            if (data[i].aprobar_adminfinanciero == true ) {
                                span = '<span style="font-size:10px;" class="badge bg-green">' + 'APROBADO' + '</span>'
                            }else{
                                span = '<span style="font-size:10px;" class="badge bg-silver">' + 'PENDIENTE' + '</span>'
                            }
                            tabla += "<td align='center' id='td_presupuesto"+prefijo + data[i].id + "'>" + span + "</td>";

                        }
                        
                        // ESTADO TRAMITE
                        if (data[i].estado_tramite == "B") {
                            span = '<span style="font-size:10px;" class="badge bg-gray">' + 'BORRADOR' + '</span>'
                        } else if (data[i].estado_tramite == "T") {
                            span = '<span style="font-size:10px;" class="badge bg-yellow">' + 'EN TRAMITE' + '</span>'
                        } else if (data[i].estado_tramite == "A") {
                            span = '<span style="font-size:10px;" class="badge bg-green">' + 'APROBADO' + '</span>'
                        } else if (data[i].estado_tramite == "D") {
                            span = '<span style="font-size:10px;" class="badge bg-red">' + 'DEVUELTO A<br>SOLICITANTE' + '</span>'
                        } else if (data[i].estado_tramite == "C") {
                            span = '<span style="font-size:10px;" class="badge bg-red">' + 'CANCELADO' + '</span>'
                        } else if (data[i].estado_tramite == "R") {
                            if(data[i].func_reasignado_id!=null)
                                span = '<span style="font-size:10px;" class="badge bg-orange" title="'+data[i].func_reasignado_id.persona_id.nombre_completo+'">' + 'REASIGNADO' + '</span>'
                            else
                                span = '<span style="font-size:10px;" class="badge bg-orange" title="Ninguno">' + 'REASIGNADO' + '</span>'
                        } else if (data[i].estado_tramite == "F") {
                            span = '<span style="font-size:10px;" class="badge bg-red">' + 'FINALIZADO' + '</span>'
                        } else{
                            span = '<span style="font-size:10px;" class="badge bg-red">' + '' + '</span>'
                        }
                        tabla += "<td align='center' id='td_estado_tramite"+prefijo + data[i].id + "'>" + span + "</td>";
                        if(formulario == 'frm_certif')
                            tabla += "<td align='center'><a style='font-size: 18px; cursor: pointer;' href='#addDafCertificaciones' data-stackbox='true' data-stackbox-position='absolute' data-stackbox-width='85%' onclick='editDafCertificaciones(\"" + data[i].id + "\","+"\""+formulario+"\")' title='Editar Certificado Presupuestario'><i class='fa fa-edit text-green'></i></a></td>";
                        else if (formulario == 'frm_certifBE')
                            tabla += "<td align='center'><a style='font-size: 18px; cursor: pointer;' onclick='openModelCertf(\"addDafCertificacionesBE\");editDafCertificaciones(\"" + data[i].id + "\","+"\""+formulario+"\")' title='Editar Certificado Presupuestario'><i class='fa fa-edit text-green'></i></a></td>";
                        else
                            tabla += "<td align='center'><a style='font-size: 18px; cursor: pointer;' href='#addDafCertificacionesET' data-stackbox='true' data-stackbox-position='absolute' data-stackbox-width='85%' onclick='editDafCertificaciones(\"" + data[i].id + "\","+"\""+formulario+"\")' title='Ver Certificado Presupuestario'><i class='fa fa-search text-green'></i></a></td>";

                        if(formulario == 'frm_certif')
                            tabla += "<td align='center'><a style='font-size: 18px; cursor: pointer;' onclick='deleteModal(\"" + data[i].id + "\",\"SL_daf_certificaciones\");'><i class='fa fa-trash text-green' title='Eliminar Certificado Presupuestario'></i></a></td>";

                        tabla += "<td align='center' id='td_permission_"+prefijo+ data[i].id + "' descripcion='"+data[i].permiso_session_nm+" ' hidden>" + data[i].permiso_session + "</td>";
                        tabla += "</tr>";

                    } /*fin for*/
                } /*fin if length*/

                $('#tabla_certif'+prefijo).dataTable().fnClearTable();
                $('#tabla_certif'+prefijo).dataTable().fnDestroy();

                $("#bodytabla_certif"+prefijo).html("");
                $("#bodytabla_certif"+prefijo).append(tabla);

                var table = "";
                if(formulario == "frm_certifET"){
                    table = $('#tabla_certif'+prefijo).DataTable({
                        //searching: false,
                        orderCellsTop: true,
                        order: [
                            [0],
                        ],
                        
                        "columnDefs": [{
                            "targets": [0, 1, 2, 4 ],
                            "visible": false
                        }]
                        
                    });
                }else{
                    table = $('#tabla_certif'+prefijo).DataTable({
                        //searching: false,
                        orderCellsTop: true,
                        order: [
                            [0],
                        ],
                        
                    });
                }

                $('#collapseTable .toggle-vis').on('click', function(e) {
                    e.preventDefault();
                    var column = table.column($(this).attr('data-column'));
                    // Toggle the visibility
                    column.visible(!column.visible());
                });

                $("#modalLoadin").hide();

            }
        },
        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
            $("#modalLoadin").hide();
            //console.log( JSON.stringify(data));
        },
    });
}

/*
* funcion: get_json_certificados   
* descripcion: Genera una cadena en forma String de los campos del formulario
* Parametros:
*   - prefijo(String): Prefijo del formulario ''(IniciarTramite), BE(BandejaEntrada),ET(Estado Tramite)     
*   - id(String): id de la tabla daf_certificaciones.
* Retorna: String
*/
function get_json_certificados(prefijo,id){
    console.log("********** get_json_certificados ********** ");
    var fecha_actual = moment().format('YYYY-MM-DD');

    var table = "";
    var cadenaArchivos = '';
    var cadenaFiles = '';
    var cadenaF = '';
    /*archivos*/
    var archivos = [];
    /*archivos proformas*/
    var salida = [];


    var fld_titulo = $('#fld_titulo'+prefijo).val().replace(/\n\r?/g, '\\n');
    fld_titulo = fld_titulo.replace(/"/g,"%%");
    fld_titulo = fld_titulo.replace(/'/g,"%%");

    var fld_descripcion = $('#fld_descripcion'+prefijo).val().replace(/\n\r?/g, '\\n');
    fld_descripcion = fld_descripcion.replace(/"/g,"%%");
    fld_descripcion = fld_descripcion.replace(/'/g,"%%");

    // Documentacion
    archivos.push($("#archivoCert1"+prefijo).html());
    archivos.push($("#archivoCert2"+prefijo).html());
    if(document.querySelector('input[name=fld_catalogo_elect'+prefijo+']:checked')==null)
        archivos.push($("#archivoCert3"+prefijo).html());
    archivos.push($("#archivoCert4"+prefijo).html());
    archivos.push($("#archivoCert99"+prefijo).html());

    cadenaArchivos = archivos.join('|');



    // Proformas y Ruc Proveedor
    if(document.querySelector('input[name=fld_catalogo_elect'+prefijo+']:checked')==null){
        table = $("#table_files_proformas"+ prefijo +" tbody");
        table.find('tr').each(function(i) {
            var data = $(this).find("td").find("a");
            var cad = $(data).eq(0).html() + ":" + $(data).eq(1).html();
            salida.push(cad);
        });

        if(salida.length > 0)
            cadenaFiles = salida.join('|');
        else
            cadenaFiles = '';

        //cadenaF = cadenaArchivos+";;"+cadenaFiles;
        cadenaF = cadenaArchivos;

    }else
        cadenaF = cadenaArchivos

    // Documentos Anexos
    salida = [];
    table="";
    cadena_archivos_otros="";

    table = $("#table_cert_otrosArchivos"+ prefijo +" tbody");
    table.find('tr').each(function(i) {
        var data = $(this).find("td").find("a");
        var cad = $(data).eq(0).html();
        salida.push(cad);
    });

    if(salida.length > 0)
        cadena_archivos_otros = salida.join('|');
    else
        cadena_archivos_otros = '';




    /*se arma la cadena datos*/
    datos = '{';

    if(id!=null && id!="") //Si se envia como parametro el id, se incluye en la cadena json
        datos += ' "id":"' + id + '",';

    //SOLICITANTE
    if (valor_nulo_str($("#fld_func_solicitante_id"+prefijo).val()) != "") 
        datos += ' "func_solicitante_id":"' + $("#fld_func_solicitante_id"+prefijo).val() + '",';
    else
        datos += ' "func_solicitante_id": null,';
    if (valor_nulo_str($("#fld_tipo"+prefijo).val()) != "") 
        datos += ' "tipo":"' + $("#fld_tipo"+prefijo).val() + '",';
    else
        datos += ' "tipo": null,';

    if ( valor_nulo_str($("#fld_titulo"+prefijo).val()) != "") 
        datos += ' "titulo":"' + fld_titulo + '",';
    else
        datos += ' "titulo": null,';

    if ( valor_nulo_str($("#fld_descripcion"+prefijo).val()) != "") 
        datos += ' "descripcion":"' + fld_descripcion + '",';
    else
        datos += ' "descripcion": null,';

    if (valor_nulo_str($("#fld_monto"+prefijo).val()) != "") 
        datos += ' "monto":"' + $("#fld_monto"+prefijo).val() + '",';
    else
        datos += ' "monto": null,';

    if (valor_nulo_str($("#fld_fecha_solicitud"+prefijo).val()) != "") 
        datos += ' "fecha_solicitud":"' + $("#fld_fecha_solicitud"+prefijo).val() + '",';
    else
        datos += ' "fecha_solicitud": null,';

    if (valor_nulo_str($("#fld_obs_solicitante"+prefijo).val()) != "") 
        datos += ' "obs_solicitante":"' + $("#fld_obs_solicitante"+prefijo).val() + '", ';
    else
        datos += ' "obs_solicitante": null,';


    fld_catalogo_elect = document.querySelector('input[name=fld_catalogo_elect'+prefijo+']:checked');
    if(fld_catalogo_elect==null)
        datos += ' "catalogo_elect":null, ';
    else
        datos += ' "catalogo_elect":"t", ';

    // DIR AREA
    if (valor_nulo_str($("#fld_func_dirarea_id"+prefijo).val()) != "") 
        datos += ' "func_dirarea_id":"' + $("#fld_func_dirarea_id"+prefijo).val() + '",';
    else
        datos += ' "func_dirarea_id": null,';


    // TIPO REVISION
    if (valor_nulo_str($("#fld_tipo_revision"+prefijo).val()) != "") 
        datos += ' "tipo_revision":"' + $("#fld_tipo_revision"+prefijo).val() + '", ';
    else
        datos += ' "tipo_revision": null,';


    // archivos Documentacion
    if(cadenaF!='')
        datos += ' "archivos":"'+cadenaF+'", ';
    // proformas
    if(cadenaFiles!='')
        datos += ' "archivos_proformas":"'+cadenaFiles+'", ';
    // archivos_otros
    if(cadena_archivos_otros!='')
        datos += ' "archivos_otros":"'+cadena_archivos_otros+'", ';


    

    // ESTADO TRAMITE
    if (valor_nulo_str($("#fld_estado_tramite"+prefijo).val()) != "") 
        datos += ' "estado_tramite":"' + $("#fld_estado_tramite"+prefijo).val() + '" ';
    

    //datos += '}';

    datos = datos.replace(/undefined/g, null);
    datos = datos.replace(/None/g,null);
    datos = datos.replace(/False/g,null);
    datos = datos.replace(/True/g,"'true'");
    datos = datos.replace(/'/g,'"');
    datos = datos.replace(/"null"/g, null);

    return datos;

}


/*
* Funcion: ocultarDocumentCert
* Descripcion: Si esta marcado, oculta campo de Estudio de Mercado y la seccion de Proformas Caso contrario no. 
* Parametros:
*   - item: Boolean, Envia un atributo this.checked indicado si esta o no marcado el checkbox.
*   - formulario: String, Nombre del formulario.              
*/
function ocultarDocumentCert(item,formulario){
    console.log("**** ocultarDocumentCert ****");

    prefijo="";
    if(formulario == 'frm_certifBE')
        prefijo = 'BE'
    else if (formulario == 'frm_certifET')
        prefijo = 'ET'

    if(item){
        $("#tr_estudiMercado"+prefijo).hide();
        $("#dv_cert_proformas"+prefijo).hide();
    }else{
        $("#tr_estudiMercado"+prefijo).show();
        $("#dv_cert_proformas"+prefijo).show();
    }
}

/*
* Funcion: ocultarOtrosTemas
* Descripcion: Oculta el campo "Temas" solo cuando el "Tipo de Requerimiento" es Obra Civil.  
* Parametros:
*   - item: String, valor del campo "Tipo de Requerimiento"
*   - formulario: String, Nombre del formulario.              
*/

function ocultarOtrosTemas(item, formulario){
    console.log("**** ocultarOtrosTemas ****");

    prefijo="";
    if(formulario == 'frm_certifBE')
        prefijo = 'BE'
    else if (formulario == 'frm_certifET')
        prefijo = 'ET'


    if(item == 'O'){
        $("#tr_label_temas"+prefijo).hide();
        $("#tr_select_temas"+prefijo).hide();
        $("#sec_stockbodega"+prefijo).hide();
        //$("#fld_tipo_revision"+prefijo).removeClass('requerido');
    }else if( item == "B"){

        $("#sec_stockbodega"+prefijo).show();

    }else{
        $("#tr_label_temas"+prefijo).show();
        $("#tr_select_temas"+prefijo).show();
        $("#sec_stockbodega"+prefijo).hide();
        //$("#fld_tipo_revision"+prefijo).addClass('requerido');
    }

}


/*
* Funcion: accionesPorPermiso
* Descripcion: Muestra u Oculta elementos botones, pestanias, campos dependiendo el permiso del usuario 
* Parametros:
*   - id: uuid, id del registro.
*   - formulario: String, Nombre del formulario.              
*/
function accionesPorPermiso(id,formulario){
    console.log("**** accionesPorPermiso ****");
    permission = "";
    permission = $("#td_permission_"+prefijo+id).html();

    prefijo="";
    if(formulario == 'frm_certifBE')
        prefijo = 'BE'
    else if (formulario == 'frm_certifET')
        prefijo = 'ET'


    // Hidden all buttons
    $("#btn_resp_a_soli"+prefijo).css("display","none");
    $("#btn_cancelar_tramite"+prefijo).css("display","none");
    $("#btn_devolver_solic"+prefijo).css("display","none");
    $("#btn_aprobar"+prefijo).css("display","none");
    $("#btn_regresar_tic"+prefijo).css("display","none");
    $("#btn_regresar_mant"+prefijo).css("display","none");
    $("#btn_regresar_obra"+prefijo).css("display","none");
    $("#btn_respon_revisor"+prefijo).css("display","none");

    $("#t_certificacion"+prefijo).css("display","none");
    $("#t_informes"+prefijo).css("display","none");
    $("#t_reasignar"+prefijo).css("display","none");

    $("#tab_certificacion"+prefijo).css("display","none");
    $("#tab_informes"+prefijo).css("display","none");
    $("#tab_reasignar"+prefijo).css("display","none");

    $("#doc_anexos2"+prefijo).css("display","none");
    $("#btn_doc_anexos2"+prefijo).css("display","none");
    $("#btn_borrarCert2"+prefijo).css("display","none");

    $(".doc_tic_"+prefijo).css("display","none");
    $(".doc_mantenimiento_"+prefijo).css("display","none");
    $(".doc_obracivil_"+prefijo).css("display","none");

    $(".btn_archivocertificacion"+prefijo).css("display","none");

    $("#tbl_informes"+prefijo).css("display","none");
    $("#tbl_input_informes"+prefijo).css("display","none");


    var doc_solicitante = `
        <div class="col-xs-12 callout sec_solicitante">
            <div class="divisor">Documentos</div>
            <div class="col-xs-12">
              <table style="width: 80%;">
                <tr style="height: 5px;"></tr>
                <tr>
                  <td align="left" style="color: #0073b7;">*Existe BIEN o SERVICIO en Catalogo Electronico?  
                    <input type="checkbox" id="fld_catalogo_electBE" name="fld_catalogo_electBE" text="Catalogo Electronico" onchange="ocultarDocumentCert(this.checked,'frm_certifBE');" class="requerido form-check-input" style="margin-left: 15px;"  />
                  </td>
                </tr>
                <tr style="height: 10px;"></tr>
              </table>
            </div>

            <div class="col-xs-12">
              <table style="width: 80%;">
                  <tr style="height: 20px;"></tr>

                  <tr>
                      <td style="margin-left: 5px;padding-left: 5px;">
                        Verificacion de catalogo electronico:
                        <input type="file" name="myfile1" id="doc_anexos1BE" class="form-control ">
                      </td>
                      <td>
                        
                        <a style="font-size: 20px; position: relative; left: 10px;" onclick="cargar_archivo('frm_certifBE','D','1');"><i class="fa fa-upload text-green"></i></a>
                        
                      </td>
                      <td width="60%" style="position: relative;left:5%;padding-left: 5px;">
                        <a id="archivoCert1BE" style="cursor:pointer; text-decoration:none;color:#262DCE;padding-left: 5px;" target="_blank"></a>
                      </td>
                      <td style="position: relative;left:5%;">
                        
                        <a id="borrarCert1BE" onclick="eliminarCert('1','BE');" style="font-size: 20px;cursor:pointer;"></a>
                        
                        
                      </td>
                  </tr>
                  <tr>
                      <td style="margin-left: 5px;padding-left: 5px;">
                        Solicitud Certificado de Actividad, recurso y presupuesto:
                        <input type="file" name="myfile2" id="doc_anexos2BE" class="form-control ">
                      </td>
                      <td>
                        
                        <a style="font-size: 20px; position: relative; left: 10px;" onclick="cargar_archivo('frm_certifBE','D','2');"><i class="fa fa-upload text-green"></i></a> 
                                                           
                      </td>
                      <td style="position: relative;left:5%;padding-left: 5px;">
                        <a id="archivoCert2BE" style="cursor:pointer; text-decoration:none;color:#262DCE;" target="_blank"></a>
                      </td>
                      <td style="position: relative;left:5%;">
                        
                        <a id="borrarCert2BE" onclick="eliminarCert('2','BE');" style="font-size: 20px;cursor:pointer;"></a>
                        
                      </td>
                  </tr>
                  <tr id="tr_estudiMercadoBE">
                      <td style="margin-left: 5px;padding-left: 5px;">
                        Estudio de Mercado:
                        <input type="file" name="myfile3" id="doc_anexos3BE" class="form-control ">
                      </td>
                      <td>
                        
                        <a style="font-size: 20px; position: relative; left: 10px;" onclick="cargar_archivo('frm_certifBE','D','3');"><i class="fa fa-upload text-green"></i></a>
                        
                        
                      </td>
                      <td style="position: relative;left:5%;padding-left: 5px;">
                        <a id="archivoCert3BE" style="cursor:pointer; text-decoration:none;color:#262DCE;" target="_blank"></a>
                      </td>
                      <td style="position: relative;left:5%;">
                        
                        <a id="borrarCert3BE" onclick="eliminarCert('3','BE');" style="font-size: 20px;cursor:pointer;"></a>
                        
                      </td>
                  </tr>
                  <tr>
                      <td style="margin-left: 5px;padding-left: 5px;">
                        <span id="spn_title4BE">TDR o Justificacion Tecnica:</span>
                        <input type="file" name="myfile4" id="doc_anexos4BE" class="form-control ">
                      </td>
                      <td>
                        
                        <a style="font-size: 20px; position: relative; left: 10px;" onclick="cargar_archivo('frm_certifBE','D','4');"><i class="fa fa-upload text-green"></i></a> 
                                                                   
                      </td>
                      <td style="position: relative;left:5%;padding-left: 5px;">
                        <a id="archivoCert4BE" style="cursor:pointer; text-decoration:none;color:#262DCE;" target="_blank"></a>
                      </td>
                      <td style="position: relative;left:5%;">
                        
                        <a id="borrarCert4BE" onclick="eliminarCert('4','BE');" style="font-size: 20px;cursor:pointer;"></a>
                        
                      </td>
                  </tr>
                  <tr id="tr_bienBE">
                      <td style="margin-left: 5px;padding-left: 5px;">
                        <span id="spn_titleBE">Verificacion de Stock en Bodega:</span>
                        <input type="file" name="myfile99" id="doc_anexos99BE" class="form-control ">
                      </td>
                      <td>
                        
                        <a style="font-size: 20px; position: relative; left: 10px;" onclick="cargar_archivo('frm_certifBE','D','99');"><i class="fa fa-upload text-green"></i></a> 
                                                                   
                      </td>
                      <td style="position: relative;left:5%;padding-left: 5px;">
                        <a id="archivoCert99BE" style="cursor:pointer; text-decoration:none;color:#262DCE;" target="_blank"></a>
                      </td>
                      <td style="position: relative;left:5%;">
                        
                        <a id="borrarCert99BE" onclick="eliminarCert('99','BE');" style="font-size: 20px;cursor:pointer;"></a>
                        
                      </td>
                  </tr>
              </table>
            </div>

            <div class="col-xs-12" id="dv_cert_proformasBE" style="position: relative; top: 30px;">

              <div class="col-xs-5" style="position: relative;left: -2%;">
                <table>
                  <tr>
                    <td>
                      Proforma:
                      <input type="file" name="myfile" id="doc_anexosBE" class="form-control ">
                      Ruc:
                      <input type="file" name="myfile" id="doc_anexos_rucBE" class="form-control ">
                    </td>
                    <td>
                      
                      <a style="font-size: 20px; position: relative; left: 10px;" onclick="cargar_archivo('frm_certifBE','P','');"><i class="fa fa-upload text-green"></i></a>
                                                              
                    </td>
                  </tr>
                </table>
              </div>
              <div class="col-xs-6" style="top:20px;">
                <table id="table_files_proformasBE">
                    <thead>
                    <tr style="border: 2px solid black;font-size: 14px;font-weight: bold;background-color: #3c8dbc; color: white;">
                        <th colspan="1" align="center" style="border: 2px solid black;">Proforma</th>
                        <th colspan="1" align="center">Ruc Proveedor</th>
                        <th colspan="1" align="center"></th>
                    </tr>
                    </thead>
                    <tbody id="files_selectBE">
                    </tbody>
                </table>
              </div>
            </div>
        </div>
        <div class="col-xs-12 callout sec_solicitante">
            <div class="divisor">Otros Documentos</div>
            <div class="col-xs-12" style="position: relative; top: 30px;">
              <div class="col-xs-5" style="position: relative;left: -2%;">
                <table>
                  <tr>
                    <td>
                      Anexo:
                      <input type="file" name="myfile9" id="doc_anexos_otrosBE" class="form-control ">
                    </td>
                    <td>
                      <a style="font-size: 20px; position: relative; left: 10px;" onclick="cargar_archivo('frm_certifBE','A','9');"><i class="fa fa-upload text-green"></i></a>                                             
                    </td>
                  </tr>
                </table>
              </div>
              <div class="col-xs-6">
                <table id="table_cert_otrosArchivosBE">
                  <thead>
                    <tr style="border: 2px solid black;font-size: 14px;font-weight: bold;background-color: #3c8dbc; color: white;">
                        <th colspan="1" align="center">Anexos</th>
                        <th colspan="1" align="center"></th>
                    </tr>
                  </thead>
                  <tbody id="files_selectAnexosBE">
                  </tbody>
                </table>
              </div>
            </div>
        </div>

    `;

    var doc_others = `
        <!-- DOCUMENTOS -->
        <div class="col-xs-12 sec_others">

            <div class="col-xs-12">
              <table style="width: 80%;">
                <tr style="height: 5px;"></tr>
                <tr>
                  <td align="left" style="color: #0073b7;">*Existe BIEN o SERVICIO en Catalogo Electronico?  
                    <input type="checkbox" id="fld_catalogo_electBE" name="fld_catalogo_electBE" text="Catalogo Electronico" onchange="ocultarDocumentCert(this.checked,'frm_certifBE');" class="requerido form-check-input" style="margin-left: 15px;" disabled="disabled"/>
                  </td>
                </tr>
                <tr style="height: 10px;"></tr>
              </table>
            </div>

            <div class="col-xs-12" style="padding-top: 20px;">
              <table style="width: 80%;">
                <tr>
                  <td style="margin-left: 5px;width:45%; padding-bottom:10px;">
                    Solicitud de certificado de Actividad, recurso y presupuesto:

                    <input type="file" name="myfile2" id="doc_anexos2BE" class="form-control " title="Volver a subir el archivo con su firma!">

                  </td>

                  
                  <td id="btn_doc_anexos2BE">
                    
                    <a style="font-size: 20px; position: relative; left: 10px;" onclick="cargar_archivo('frm_certifBE','D','2');"><i class="fa fa-upload text-green"></i></a> 
                                                       
                  </td>

                  <td style="position: relative;left:5%;">
                    <a id="archivoCert2BE" style="cursor:pointer; text-decoration:none;color:#262DCE;" target="_blank"></a>
                  </td>

                  <td id="btn_borrarCert2BE" style="position: relative;left:5%;">
                    <a id="borrarCert2BE" onclick="eliminarCert('2','BE');" style="font-size: 20px;cursor:pointer;"></a>
                    
                  </td>
                </tr>

              </table>
            </div>


            <table style="width: 95%;">
                <tr style="height: 20px;"></tr>
                <tr style="border: 2px solid black;font-size: 14px;font-weight: bold;background-color: #3c8dbc; color: white;">
                    <td colspan="2" align="center">Documentacion</td>
                </tr>

                <tr>
                    <td style="border: 2px solid; margin-left: 5px;padding-left: 5px;">
                      Verificacion de catalogo electronico:
                      
                    </td>
                   
                    <td width="60%" style="border: 2px solid">
                      <a id="archivoCert1BE" style="cursor:pointer; text-decoration:none;color:#262DCE;position: relative;" target="_blank"></a>
                    </td>
                    <td hidden style="position: relative;left:5%;">
                      <a id="borrarCert1BE" style="font-size: 20px;cursor:pointer;"></a>
                    </td>
                </tr>

                <tr id="tr_estudiMercadoBE">
                    <td style="border: 2px solid; margin-left: 5px;padding-left: 5px;">
                      Estudio de Mercado:
                      
                    </td>
                    
                    <td style="border: 2px solid">
                      <a id="archivoCert3BE" style="cursor:pointer; text-decoration:none;color:#262DCE;position: relative;" target="_blank"></a>
                    </td>
                    <td hidden style="position: relative;left:5%;">
                      <a id="borrarCert3BE" style="font-size: 20px;cursor:pointer;"></a>
                    </td>
                </tr>
                <tr>
                    <td style="border: 2px solid; margin-left: 5px;padding-left: 5px;">
                      <span id="spn_title4BE">TDR o Justificacion Tecnica:</span>
                    </td>
                    
                    <td style="border: 2px solid">
                      <a id="archivoCert4BE" style="cursor:pointer; text-decoration:none;color:#262DCE;position: relative;" target="_blank"></a>
                    </td>
                    <td hidden style="position: relative;left:5%;">
                      <a id="borrarCert4BE"  style="font-size: 20px;cursor:pointer;"></a>
                    </td>
                </tr>
                <tr id="tr_bienBE">
                    <td style="border: 2px solid; margin-left: 5px;padding-left: 5px;">
                      <span id="spn_title99BE">Verificacion de Stock en Bodega:</span>
                    </td>
                    
                    <td style="border: 2px solid">
                      <a id="archivoCert99BE" style="cursor:pointer; text-decoration:none;color:#262DCE;position: relative;" target="_blank"></a>
                    </td>
                    <td hidden style="position: relative;left:5%;">
                      <a id="borrarCert99BE"  style="font-size: 20px;cursor:pointer;"></a>
                    </td>
                </tr>
            </table>

        </div>

        <!-- PROFORMAS -->
        <div id="dv_cert_proformasBE" class="col-xs-12 sec_others" style="position: relative; top: 20px;">

          <table id="table_files_proformasBE" style="width: 95%;position: relative;">
              <thead>
              <tr style="border: 2px solid black;font-size: 14px;font-weight: bold;background-color: #3c8dbc; color: white;">
                  <td colspan="1" align="center">Proforma</td>
                  <td colspan="1" align="center" width="60%">Ruc Proveedor</td>
              </tr>
              </thead>
              <tbody id="files_selectBE">
              </tbody>
          </table>
        </div>

        <!-- DOCUMENTOS ANEXOS -->
        <div class="col-xs-12 sec_others" style="position: relative; top: 40px;">
            <table style="width: 95%;">
              <thead>
                <tr style="border: 2px solid black;font-size: 14px;font-weight: bold;background-color: #3c8dbc; color: white;">
                    <td colspan="2" align="center">Documentos Anexos</td>
                </tr>
              </thead>

              <tbody id="files_selectAnexosBE">
              </tbody>

            </table>
        </div>

    `;

    $("#tab_BodyDocumentacion"+prefijo).html("");

    // Show buttons by permission 
    if(permission == 's_solicitante'){
        $("#tab_BodyDocumentacion"+prefijo).append(doc_solicitante);

        $("#btn_resp_a_soli"+prefijo).css("display","");
        $("#btn_cancelar_tramite"+prefijo).css("display","");
        $("#doc_anexos2"+prefijo).css("display","");

        //info
        $("#fld_titulo"+prefijo).prop("disabled",false);
        $("#fld_descripcion"+prefijo).prop("disabled",false);
        $("#fld_tipo"+prefijo).prop("disabled",false);
        $("#fld_monto_lbl"+prefijo).prop("disabled",false);
        $("#fld_tipo_revision"+prefijo).prop("disabled",false);



    }else{

        $("#tab_BodyDocumentacion"+prefijo).append(doc_others);

        //info
        $("#fld_titulo"+prefijo).prop("disabled",true);
        $("#fld_descripcion"+prefijo).prop("disabled",true);
        $("#fld_tipo"+prefijo).prop("disabled",true);
        $("#fld_monto_lbl"+prefijo).prop("disabled",true);
        $("#fld_tipo_revision"+prefijo).prop("disabled",true);

    }
    if(permission == 's_tic_aprobador'  || permission == 's_mantenimiento_aprobador' || permission == 's_obracivil_aprobador'){
        $("#btn_devolver_solic"+prefijo).css("display","");
        $("#btn_aprobar"+prefijo).css("display","");
        $("#tbl_input_informes"+prefijo).css("display","");

        // Desact. btn solicitud cert. presup.
        $("#btn_doc_anexos2"+prefijo).css("display","none");
        $("#btn_borrarCert2"+prefijo).css("display","none");

        if(permission == 's_tic_aprobador'){
            $(".doc_tic_"+prefijo).css("display","");
        }
        else if(permission == 's_mantenimiento_aprobador'){
            $(".doc_mantenimiento_"+prefijo).css("display","");
        }
        else if(permission == 's_obracivil_aprobador'){
            $(".doc_obracivil_"+prefijo).css("display","");
        }
    }

    if(permission == 's_directorarea_aprobador' || permission == 's_respac_aprobador' || permission == 's_planificacion_aprobador' || permission == 's_presupuesto_aprobador'){
        $("#btn_regresar_tic"+prefijo).css("display","");
        $("#btn_regresar_mant"+prefijo).css("display","");
        $("#btn_regresar_obra"+prefijo).css("display","");

        $("#btn_devolver_solic"+prefijo).css("display","");
        $("#btn_aprobar"+prefijo).css("display","");
        $("#btn_cancelar_tramite"+prefijo).css("display","");

        // Archivo Solicitud de certificado de Actividad, recurso y presupuesto
        $("#doc_anexos2"+prefijo).css("display","");
        $("#btn_doc_anexos2"+prefijo).css("display","");
        $("#btn_borrarCert2"+prefijo).css("display","");


    }

    if(permission == 's_directorarea_revisor' || permission == 's_respac_revisor' || permission == 's_planificacion_revisor' || permission == 's_presupuesto_revisor'){
        $("#btn_respon_revisor"+prefijo).css("display","");
    }

    if(permission == 's_admin_financiero' ){
        // Desact. btn solicitud cert. presup.
        $("#btn_doc_anexos2"+prefijo).css("display","none");
        $("#btn_borrarCert2"+prefijo).css("display","none");




    }

    // Tab Certificacion
    if(permission == 's_presupuesto_aprobador' || permission == 's_admin_financiero'){
        $("#tab_certificacion"+prefijo).css("display","");
        $("#t_certificacion"+prefijo).css("display","");

        $(".btn_archivocertificacion"+prefijo).css("display","");

        if(permission == 's_admin_financiero'){
            $("#btn_aprobar"+prefijo).css("display","");
        }
    }
    // Tab Informes
    if( permission == 's_tic_aprobador' || permission == 's_mantenimiento_aprobador' || permission == 's_obracivil_aprobador' || permission == 's_respac_aprobador' || permission == 's_planificacion_aprobador' || permission == 's_presupuesto_aprobador' ){
        $("#t_informes"+prefijo).css("display","");
    }
    // Tab Reasignar
    if( permission == 's_directorarea_aprobador' || permission == 's_respac_aprobador' || permission == 's_planificacion_aprobador' || permission == 's_presupuesto_aprobador' ){
        $("#tab_reasignar"+prefijo).css("display","");
        $("#t_reasignar"+prefijo).css("display","");
        //Reasignar Option
        
    }

    // Tab Informes TIC, MANTENIMIENTO, OBRA CIVIL
    if(permission == 's_tic_aprobador'  || permission == 's_mantenimiento_aprobador' || permission == 's_obracivil_aprobador' || permission == 's_respac_aprobador' || permission == 's_planificacion_aprobador'|| permission == 's_presupuesto_aprobador'){
        $("#tab_informes"+prefijo).css("display","");
    }

    // Table Informes
    if( permission == 's_respac_aprobador' || permission == 's_planificacion_aprobador' || permission == 's_presupuesto_aprobador' ){
        $("#tbl_informes"+prefijo).css("display","");
    }


    $('#table_files_proformasBE').on('click', '.delete_file', function(e) {
        console.log("--> Elim...");
        var bool = confirm("Esta seguro de eliminar este documento?");
        if (bool) {
            var data = $(this).parents('tr').find("td").find("a");
            var archivo0 = $(data).eq(0).text();
            var archivo1 = $(data).eq(1).text();
            id = $("#idDafCertificacionesBE").val();
            salidaError = '';
            for(i=0; i<=1; i++){
                if(i == 0)
                    nombre_archivo = archivo0;
                else
                    nombre_archivo = archivo1;
                respuesta = delete_file(nombre_archivo,id);
                if(respuesta != 1)
                    salidaError+= nombre_archivo+'<br>';

                console.log(i);
            }
            if(salidaError != "")
                validaContenedorExt("addDafCertificacionesBE", "<p style='font-size:12px;'>Error al eliminar el archivo<br>"+salidaError+"</p>","error");
            else{
                $(this).parents('tr').remove();
                cadena_archivos = getCadenaArchivos('proformas','BE');
                datos = '{"archivos_proformas":"'+cadena_archivos+'"}';
                updateArchivoCertBase(datos,"BE",id);
            }
        }
    })


    $('#table_cert_otrosArchivosBE').on('click', '.delete_file', function(e) {
        var bool = confirm("Esta seguro de eliminar este documento?");
        if (bool) {
            var data = $(this).parents('tr').find("td").find("a");
            var nombre_archivo = $(data).eq(0).text();
            id = $("#idDafCertificacionesBE").val();
            respuesta = delete_file(nombre_archivo,id);
            if(respuesta != 1)
                validaContenedorExt("addDafCertificacionesBE", "<p style='font-size:12px;'>Error al eliminar el archivo<br>"+nombre_archivo+"</p>","error");
            else{
                $(this).parents('tr').remove();
                cadena_archivos = getCadenaArchivos('anexos','BE');
                datos = '{"archivos_otros":"'+cadena_archivos+'"}';
                updateArchivoCertBase(datos,"BE",id);
            }
        }
    })
    
}

/*
* Funcion: get_json_certificadosdetalles   
* Descripcion: Genera una cadena en forma String de los campos del formulario
* Parametros:
    - id_tbl_padre(String): Id de la tabla "daf_certificaciones".
    - estado_aprob_detalle(String): Es el ESTADO_TRAMITE. 
* Retorna: String en formato json del modelo DafCertificacionesDetalles.
*/

function get_json_certificadosdetalles(id_tbl_padre,estado_aprob_detalle){
    console.log("**** get_json_certificadosdetalles ****");

    var today = moment().format('YYYY-MM-DD');
    var preserved = "";
    if(estado_aprob_detalle == 'R') //Cuando envia una observacion al revisor
        //preserved = $('#fld_observacionBE2').val().replace(/\n\r?/g, '\\n');
        preserved = tinyMCE.get('fld_observacionBE2').getContent();
    else
        //preserved = $('#fld_observacionBE').val().replace(/\n\r?/g, '\\n');
        preserved = tinyMCE.get('fld_observacionBE').getContent();


    //preserved = preserved.replace(/"/g,"%%");
    //preserved = preserved.replace(/'/g,"%%");

    /*se arma la cadena datos*/
    datos = '{';
    datos += ' "daf_certificaciones_id":"' + id_tbl_padre + '", ';
    datos += ' "funcionario_id":"' + $("#funcionario_session_idBE").val() + '", ';
    datos += ' "fecha_observacion":"' + today + '", ';
    if(estado_aprob_detalle == 'A')
        datos += ' "estado_tramite":"' + 'A' + '", ';
    else if(estado_aprob_detalle == 'R')
        datos += ' "estado_tramite":"' + 'R' + '", ';
    else
        datos += ' "estado_tramite":"' + 'T' + '", ';
    datos += ' "observacion":"' + preserved.replace(/\n\r?/g, '').replace(/["]+/g, "'").replace(/\//g, "/") + '" ';
    datos += '}';
   
    datos = datos.replace(/undefined/g, null);
    datos = datos.replace(/None/g,null);
    datos = datos.replace(/False/g,"'false'");
    datos = datos.replace(/True/g,"'true'");
    //datos = datos.replace(/'/g,'"')replace(/['"]+/g, '');
    datos = datos.replace(/"null"/g, null);
    //datos = datos.replace(/\"\"/g, null);
    //datos = datos.replace(/%%/g, "'");

    datos.replace(/(\r\n\t|\n|\r\t)/gm,"").trim();

    console.log(datos);

    return datos;

}

function addnuevaObservacion(formulario){
    /*control de crecimiento tortugas encontradas*/
    console.log("**** addNewObservacion ****");
    var tabla = "";
    var cont="";
    
    prefijo="";
    if(formulario == 'frm_certifBE')
        prefijo = 'BE'
    else if (formulario == 'frm_certifET')
        prefijo = 'ET'
    
    tabla += "<div class='col-xs-12 callout' style='margin-bottom: 0px; padding-bottom: 0px;'>";
    tabla += "<div style='height: 35px;'></div>";
    tabla += "<div class='divisor'> Usuario: "+ $("#persona_nombres"+prefijo).val() +" - Nueva Observacion </div>";
    tabla += "<div class='col-xs-12'>";
    tabla += "<table>";
    tabla += "<tr style='height: 2px;'></tr>";
    tabla += "<tr> <td align='left' style='color: black;'>Observacion: </td> </tr> ";
    tabla += "<tr> <td><textarea id='fld_observacion' rows='7' cols='110' class='form-control'> </textarea></td> </tr>";
    tabla += "</table>";
    tabla += "</div>";
    tabla += "</div>";


    

    $("#sec_obs_newBE").html("");
    $("#sec_obs_newBE").append(tabla);

}

/*funcion apra actulaizar el campo aprobar dir area en el caso de que exista algun errop al insertar la observacion*/
function updateEstadoCabCertificacionError(idtabla,prefijo){

datos = '';
if($("#td_permission_"+prefijo+idtabla).html()=='s_directorarea_aprobador')
    datos = '"aprobar_dirarea":null';
if($("#td_permission_"+prefijo+idtabla).html()=='s_compraspub_aprobador')
    datos = '"aprobar_compraspub":null';
if($("#td_permission_"+prefijo+idtabla).html()=='s_respac_aprobador')
    datos = '"aprobar_respac":null';
if($("#td_permission_"+prefijo+idtabla).html()=='s_planificacion_aprobador')
    datos = '"aprobar_planificacion":null';
if($("#td_permission_"+prefijo+idtabla).html()=='s_presupuesto_aprobador')
    datos = '"aprobar_presupuesto":null';
if($("#td_permission_"+prefijo+idtabla).html()=='s_tic_aprobador')
    datos = '"aprobar_tic":null';
if($("#td_permission_"+prefijo+idtabla).html()=='s_mantenimiento_aprobador')
    datos = '"aprobar_mantenimiento":null';
if($("#td_permission_"+prefijo+idtabla).html()=='s_obracivil_aprobador')
    datos = '"aprobar_obracivil":null';

if(prefijo == 'R')
    datos = '"estado_tramite":"T"';


    datosD='';
    datosD += '{';
    datosD += datos;
    datosD += '}';
    $.ajax({
        url: "update_General",
        type: 'get',
        cache: 'false',
        data: {
            "dj_url": "dafcertificaciones",
            "idtabla": idtabla,
            "data": JSON.stringify(datosD)
        },
        dataType: "json",
        async: false,
        success: function(data2) {
            if (!data2['results']) {
                console.log("data---->" + datos + "--->" + "spncontrolhuevosresumen" + "Error--->" + data2);
            } else {
                
                console.log("reverso");
            }
        },
        error: function(data2) {
            console.log("data---->" + datos + "--->" + "spncontrolhuevosresumen" + "Error--->" + data2);
        },
    });
}

function insertCertificacionesDetalleAux(estado_aprob_detalle, prefijo){
    console.log("******* insertCertificacionesDetalle *******");

    datos = get_json_certificadosdetalles($("#idDafCertificacionesBE").val(), estado_aprob_detalle);
    id_padre = $('#content_DafCertificacionesBE').parent().attr('id');
    //th_insert(datos, "SL_daf_certificaciones", id_padre, "dafcertificacionesdetalles",2,false);
    dj_url = 'dafcertificacionesdetalles';
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
                console.log("data---->" + datos + "--->" + "spncontrolhuevosresumen" + "Error--->" + data2);
                updateEstadoCabCertificacionError($("#idDafCertificacionesBE").val(),prefijo);
                respuesta =  "-1";
            } else {
                respuesta = "1";
            }
        },
        error: function(data2) {
            updateEstadoCabCertificacionError($("#idDafCertificacionesBE").val(),prefijo);
            console.log("data---->" + datos + "--->" + "spncontrolhuevosresumen" + "Error--->" + data2);
            respuesta = -2;
        },
    });
    return respuesta;
}

function insertCertificacionesDetalle(estado_aprob_detalle){
    console.log("******* insertCertificacionesDetalle *******");

    datos = get_json_certificadosdetalles($("#idDafCertificacionesBE").val(), estado_aprob_detalle);
    id_padre = $('#content_DafCertificacionesBE').parent().attr('id');
    //th_insert(datos, "SL_daf_certificaciones", id_padre, "dafcertificacionesdetalles",2,false);
    dj_url = 'dafcertificacionesdetalles';
    $.ajax({
        url: "insert_General",
        type: 'get',
        cache: 'false',
        data: {
            "dj_url": dj_url,
            "data": JSON.stringify("[" + datos + "]")
        },
        async: false,
        dataType: "json",
        success: function(data2) {
            if (!data2['results']) {
                //salida1 = th_update(datos, "SL_daf_certificaciones", id_padre, "dafcertificaciones", id);
                //swal("", "Error al Insertar el Registro.", "error");
                respuesta = -1;
                console.log("data---->" + datos + "--->" + "spncontrolhuevosresumen" + "Error--->" + data2);
                //updateEstadoCabCertificacionError($("#idDafCertificacionesBE").val());
            } else {
                respuesta = 1;
                //swal("", "Datos Insertados Con Exito", "success");
                //buscarCertificadosParametros("",formulario);
            }
        },
        error: function(data2) {
            respuesta = -2;
            //updateEstadoCabCertificacionError($("#idDafCertificacionesBE").val());
            //swal("", "Error al Insertar el Registro.", "error");
            console.log("data---->" + datos + "--->" + "spncontrolhuevosresumen" + "Error--->" + data2);
        },
    });
    return respuesta;

    /*$.ajax({
        url: "data_certificados",
        type: "get",
        cache: 'false',
        data: {
            "data": $("#idDafCertificacionesBE").val()
        },
        dataType: "json",
        async: false,

        success: function(json) {
            console.log(json[0]);
            $("#modalLoadin").hide();
            if (json['error']) {
                if (json['error']['context'])
                    var salida = json['error']['context']['resource'][0].message;
                else
                    var salida = json['error']['message']
            } else {

                console.log("Detalles..");
                var item = "";
                var tabla = "";
                var cont = json[0].daf_certificaciones_id.length;

                // Detalle
                for(var i=0; i< json[0].daf_certificaciones_id.length; i++){

                    item = json[0].daf_certificaciones_id[i];
                    
                    //console.log(item);
                    tabla += "<div class='col-xs-12 callout' style='margin-bottom: 0px; padding-bottom: 0px;'>";
                    if(i==0)
                        tabla += "<div style='height: 35px;'></div>";
                    else
                        tabla += "<div style='height: 10px;'></div>";
                    //tabla += "<div class='divisor'> "+cont+". Usuario: "+ item.funcionario_id.persona_id.nombre_completo +"   -   Fecha: "+ item.fecha_ingreso +"</div>";
                    tabla += "<div class='divisor'>";
                    tabla += "<div style='display:inline;'> "+cont+". Usuario: "+ item.funcionario_id.persona_id.nombre_completo +"   -   Fecha: "+ item.fecha_ingreso +"</div>";
                    
                    if(item.estado_tramite == 'B'){
                        // DELETE BUTTON
                        if(i==0)
                            tabla += "<div class='btn-group' style='position: absolute; z-index: 99999; right: 2%; top:27%;'>";
                        else
                            tabla += "<div class='btn-group' style='position: absolute; z-index: 99999; right: 2%; top:15%;'>";
                        tabla += "<button type='button' class='btn btn-success' onclick='deletenuevaObservacion(\""+item.id+"\");'><i class='fa fa-trash' ></i></button>";
                        tabla += "</div>";
                    }
                    
                    
                    tabla += "</div>";
                    tabla += "<div class='col-xs-12'>";
                    tabla += "<table>";
                    tabla += "<tr style='height: 2px;'></tr>";
                    tabla += "<tr> <td align='left'>Observacion: </td> </tr> ";
                    tabla += "<tr> <td><textarea id='fld_observacion_"+item.id+"' rows='7' cols='110' class='form-control' disabled='disabled'>"+item.observacion+"</textarea></td> </tr>";
                    tabla += "</table>";
                    tabla += "</div>";
                    tabla += "</div>";

                    cont--;
                }

                $("#sec_obsBE").html("");
                $("#sec_obsBE").append(tabla);

                // Limpiar Observacion
                $("#fld_observacion").val("");
                

               
            }
        },
        error: function(data) {
            $("#modalLoadin").hide();
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));

        },
    });*/
    
    
}

/*
* Funcion: aprobar_devolver_Certificaciones   
* Descripcion: Realiza la accion de aprobar o devolver el tramite al solicitante.
* Parametros:
    - tipo(String): Indica la accion que se efectua: D(Devolver), A(Aprobar), R(Rechazar), C(Cancelar)
    - formulario(String): Nombre del formulario. 
*/
function aprobar_devolver_Certificaciones(tipo,formulario){
    console.log("******* aprobar_devolver_Certificaciones *******");
    var bool = false;
    var prefijo = "";
    var finalizar_proceso = false;
    var texto = "";
    var id = ""; 
    var titulo = "";
    var observacion = "";
    

    if(formulario == 'frm_certifBE')
        prefijo = 'BE'
    if(formulario == 'frm_certifET')
        prefijo = 'ET'

    titulo = $("#fld_titulo"+prefijo).val();
    id = $("#idDafCertificaciones"+prefijo).val();
    permission = $("#td_permission_"+prefijo+id).html();

    observacion = tinyMCE.get('fld_observacion'+prefijo).getContent();

    //if($.trim(valor_nulo_str($("#fld_observacion"+prefijo).val()))==""){
    if($.trim(valor_nulo_str(observacion))==""){
        validaContenedorExt("addDafCertificacionesBE", "Ingrese una observacion!");
    }else{

        if(validar_archivos_vacios(prefijo)!=0){

            // Valida que el archivo de certificacion no este vacio
            if(permission == "s_presupuesto_aprobador" || permission == "s_admin_financiero"){

                certi_pres = $("#files_select2"+prefijo).html();
                if(certi_pres == ""){
                    validaContenedorExt("addDafCertificaciones"+prefijo, "Subir archivo de Certificacion Presupuestaria con su Firma!");      
                    return 0;
                }

            }

            if(tipo == 'D')
                texto = 'Esta seguro de DEVOLVER el tramite?';
            else if(tipo == 'R')
                texto = 'Esta seguro de RESPONDER el tramite?';
            else if(tipo == 'C')
                texto = 'Esta seguro de CANCELAR el tramite?';
            else if(tipo == 'A'){
                if( permission == "s_admin_financiero" ){
                    texto = 'Esta seguro que firmó la CERTIFICACIÓN PRESUPUESTARIA?';
                    finalizar_proceso = true;

                }else if( permission == "s_presupuesto_aprobador" ){
                    texto = 'Esta seguro de APROBAR y de que subio el archivo de CERTIFICACIÓN DE ACTIVIDAD, RECURSO Y PRESUPUESTO con su FIRMA, y que subio TODAS las CERTIFICACIONES PRESUPUESTARIAS?';
                    //finalizar_proceso = true;
                }
                else if( permission =="s_solicitante" )
                    texto = "Esta Seguro de Responder el tramite?";
                else if( permission =="s_directorarea_aprobador" || permission=="s_respac_aprobador" || permission=="s_planificacion_aprobador" )
                    texto = 'Esta seguro de APROBAR el Tramite y de que subio el archivo de CERTIFICACIÓN DE ACTIVIDAD, RECURSO Y PRESUPUESTO con su FIRMA?';
                else
                    texto = "Esta seguro de APROBAR?";

            }
                

            bool = confirm(texto);

            if (bool) { 
                
                prefijo = ""
                if(formulario == 'frm_certifBE')
                    prefijo = 'BE'
                else if(formulario == 'frm_certifET')
                    prefijo = 'ET'

                // Formacion de cadena Json
                id_padre = $('#content_DafCertificaciones'+prefijo).parent().attr('id');
                id = $("#idDafCertificaciones"+prefijo).val();
                permission = $("#td_permission_"+prefijo+id).html();

                datos = '';
                estado_aprob_detalle="";

                datos = get_json_certificados(prefijo,id);

                if(tipo=='A'){ //aprobar
                    if(permission=='s_solicitante'){
                        datos += ',"estado_tramite":"T"';
                    }else if(permission=='s_directorarea_aprobador'){
                        datos += ',"aprobar_dirarea":true';
                    /*}else if($("#permiso_session"+prefijo).val()=='s_bodega_aprobador'){
                        datos += ',"aprobar_bodega":true';*/
                    }else if(permission=='s_compraspub_aprobador'){
                        datos += ',"aprobar_compraspub":true';
                    }else if(permission=='s_respac_aprobador'){
                        datos += ',"aprobar_respac":true';
                    }else if(permission=='s_planificacion_aprobador'){
                        datos += ',"aprobar_planificacion":true';
                    }else if(permission=='s_presupuesto_aprobador'){
                        datos += ',"aprobar_presupuesto":true';
                    }else if(permission=='s_admin_financiero'){
                        datos += ',"aprobar_adminfinanciero":true';

                    }else if(permission=='s_tic_aprobador'){
                        datos += ',"aprobar_tic":true';
                    }else if(permission=='s_mantenimiento_aprobador'){
                        datos += ',"aprobar_mantenimiento":true';
                    }else if(permission=='s_obracivil_aprobador'){
                        datos += ',"aprobar_obracivil":true';
                    }

                    estado_aprob_detalle="A";

                }

                if(tipo=='D'){ // devolver
                    datos += ',"estado_tramite":"D"';
                }

                if(tipo=='C'){ // cancelar
                    datos += ',"estado_tramite":"C"';
                }

                if(tipo=='R'){ // Responder
                    datos += ', "func_reasignado_id": null ';
                    datos += ', "estado_tramite": "T" ';
                }
        

                // doc informes
                if (valor_nulo_str( $("#archivoCert5"+prefijo).html() ) != "") 
                    datos += ', "doc_tic":"'+ $("#archivoCert5"+prefijo).html() +'" ';

                if (valor_nulo_str( $("#archivoCert6"+prefijo).html() ) != "") 
                    datos += ', "doc_mantenimiento":"'+ $("#archivoCert6"+prefijo).html() +'" ';
                
                if (valor_nulo_str( $("#archivoCert7"+prefijo).html() ) != "") 
                    datos += ', "doc_obracivil":"'+ $("#archivoCert7"+prefijo).html() +'" ';

                // doc Certificaciones
                cadenaFiles = ''; //Certificados
                archivos = [];  //archivos
                salida = []; //archivos proformas
                
                var table = $("#table_files_certificaciones2BE tbody");
                table.find('tr').each(function(i) {
                    var data = $(this).find("td").find("a");
                    var cad = $(data).eq(0).html();
                    salida.push(cad);
                });

                if(salida.length > 0){
                    cadenaFiles = salida.join('|');
                    datos += ', "archivos_certificacion":"'+cadenaFiles+'" }';
                }else
                    datos += '}';

                datos = datos.replace(/"null"/g, null);
                datos = datos.replace(/None/g, null);
                datos = datos.replace(/'/g, '"');
                datos = datos.replace(/\"\"/g, null);
                
                // Finalizar proceso cuando el ultimo perfil (Presupuesto) apruebe.
                if(finalizar_proceso){
                    paginaBody = retornaBodyPagina("SL_daf_certificaciones");
                    dj_url = "dafcertificaciones";

                    $.ajax({
                        url: "update_General",
                        data: {
                            "dj_url": dj_url,
                            "idtabla": id,
                            "data": JSON.stringify(datos)
                        },
                        type: "get",
                        cache: 'false',
                        async: true,
                        dataType: "json",

                        success: function(data) {
                            if (data.id == undefined) {
                                $('#modalLoadin').hide();
                                validaContenedorExt(paginaBody, "Error al Insertar el registro");
                                return 0;
                            } else {
                                swal("", "La certificacion "+$('#fld_titulo'+prefijo).val()+" fue APROBADO con éxito!", "success");
                                $('#addDafCertificaciones'+prefijo).modal('hide');
                                tipo = 'f'; //Bandera para envio de correo a solicitante
                                enviar_emailnotificacion(tipo,prefijo,id,titulo);
                                return 1;
                            }
                        },
                        error: function(data) {
                            $('#modalLoadin').hide();
                            validaContenedorExt(paginaBody, "Error al Insertar el registro");
                            return 0;
                        },
                    });

                }else{
                    dj_url = "dafcertificaciones";
                    $.ajax({
                        url: "update_General",
                        data: {
                            "dj_url": dj_url,
                            "idtabla": id,
                            "data": JSON.stringify(datos)
                        },
                        type: "get",
                        cache: 'false',
                        async: false,
                        dataType: "json",

                        success: function(data) {
                            if (data.id == undefined) {
                                $('#modalLoadin').hide();
                                validaContenedorExt(paginaBody, "Error al Insertar el registro");
                                return 0;
                            } else {
                                respuesta = insertCertificacionesDetalleAux(estado_aprob_detalle, prefijo);
                                if(respuesta == 1){
                                    swal("", "Registro Actualizado con éxito!", "success");
                                    $('#addDafCertificaciones'+prefijo).modal('hide');

                                    enviar_emailnotificacion(tipo,prefijo,id,titulo);
                                    buscarCertificadosParametros("",formulario);
                                    return 1;
                                }else{
                                    swal("", "Error al actualizar el registro", "error");
                                    return 0;
                                }
                                
                            }
                        },
                        error: function(data) {
                            $('#modalLoadin').hide();
                            validaContenedorExt(paginaBody, "Error al Insertar el registro");
                            return 0;
                        },
                    });  
                }                  
            }else{
                buscarCertificadosParametros("",formulario);
                return 0;
            }

        }

    }


}

/*
* Funcion: devolver_a_areas_revisoras   
* Descripcion: Devuelve el tramite a las areas revisoras como tic,mantenimiento u obra civil.
* Parametros:
*   - tipo(String): Indica la accion que se efectua: M(Mantenimiento), T(Tic), O(Obra Civil)
*   - formulario(String): Nombre del formulario. 
*/
function devolver_a_areas_revisoras(tipo,formulario){
    console.log("******* devolver_a_areas_revisoras *******");

    prefijo = ""
    

    if(formulario == 'frm_certifBE')
        prefijo = 'BE'
    if(formulario == 'frm_certifET')
        prefijo = 'ET'

    titulo = $("#fld_titulo"+prefijo).val();
    var observacion   = tinyMCE.get('fld_observacion'+prefijo).getContent();

    if(observacion ==""){
        validaContenedorExt("addDafCertificaciones"+prefijo, "Ingrese una observacion!");
    }else{
        if(tipo == 'M')
            texto = 'Mantenimineto';
        else if(tipo == 'T')
            texto = 'Tic';
        else if(tipo == 'O')
            texto = 'Obra Civil';
        
        var bool = confirm("Esta seguro de devolver el tramite a "+texto+"?");
        if (bool) {    

            id = $("#idDafCertificaciones"+prefijo).val();
            id_padre = $('#content_DafCertificaciones'+prefijo).parent().attr('id');
            datos = '';

            datos = get_json_certificados(prefijo,id);

            // Doc informes
            if (valor_nulo_str( $("#archivoCert5"+prefijo).html() ) != "") 
                datos += ', "doc_tic":"'+ $("#archivoCert5"+prefijo).html() +'" ';

            if (valor_nulo_str( $("#archivoCert6"+prefijo).html() ) != "") 
                datos += ', "doc_mantenimiento":"'+ $("#archivoCert6"+prefijo).html() +'" ';
            
            if (valor_nulo_str( $("#archivoCert7"+prefijo).html() ) != "") 
                datos += ', "doc_obracivil":"'+ $("#archivoCert7"+prefijo).html() +'" ';
            
            // Tipos
            if(tipo=='T'){ // devolver TIC
                datos += ',"tipo_revision":"T","aprobar_tic":null }';
            }

            if(tipo=='M'){ // devolver Mantenimiento
                datos += ',"tipo_revision":"M","aprobar_mantenimiento":null }';
            }

            if(tipo=='O'){ // devolver Obra Civil
                datos += ',"tipo_revision":"O","aprobar_obracivil":null }';
            }
            
            //salida1 = th_update(datos, "SL_daf_certificaciones", id_padre, "dafcertificaciones", id);

            dj_url = "dafcertificaciones";
            $.ajax({
                url: "update_General",
                data: {
                    "dj_url": dj_url,
                    "idtabla": id,
                    "data": JSON.stringify(datos)
                },
                type: "get",
                cache: 'false',
                async: false,
                dataType: "json",

                success: function(data) {
                    if (data.id == undefined) {
                        validaContenedorExt(paginaBody, "Error al Actualizar el registro");
                        return 0;
                    } else {
                        var respuesta = insertCertificacionesDetalle('');

                        if(respuesta == 1){
                            swal("", "Registro Actualizado con éxito!", "success");
                            $('#addDafCertificaciones'+prefijo).modal('hide');
                            var d = new Date();
                            var f1 = d.getFullYear() + "-01-01";
                            var f2 = d.getFullYear() + "-12-31";
                            var dataini = f1 + "," + f2;

                            f1_aux = '01/01/' + d.getFullYear();
                            f2_aux = '12/31/' + d.getFullYear();

                            $("#FdesdeParam"+prefijo).val(f1_aux);
                            $("#FhastaParam"+prefijo).val(f2_aux);
                         
                            enviar_emailnotificacion(tipo,prefijo,id,titulo);
                            buscarCertificadosParametros(dataini,'frm_certifBE');
                            return 1;
                        }else{
                            swal("", "Error al actualizar el registro", "error");
                            return 0;
                        }                        
                    }
                },
                error: function(data) {
                    $('#modalLoadin').hide();
                    validaContenedorExt(paginaBody, "Error al Actualizar el registro");
                    return 0;
                },
            });             
        }else{
            return 0;
        }
        
    }

}

/*
* Funcion: get_correo_destinatario   
* Descripcion: Devuelve el tramite a las areas revisoras como tic,mantenimiento u obra civil.
* Parametros:
*   - tipo(String): Indica el tipo de mensaje que se va a enviar en el texto del correo dependiendo el flujo del proceso. 
*                   Ejemplo S(Utilizado para el envio de correo al solicitante), A(Cuando se inicia o aprueba un tramite 
*                   por sus aprobadores), D(Cuando se devuelve un Tramite al solictante).
*   - prefijo(String): Prefijo de los campos del formulario. 
*   - id_table(String): Id del registro de daf_certificaciones.
* Retorno(Array): Retorna un array con formato json con el nombre y correo destinatario. 
*/
function get_correo_destinatario(tipo,prefijo,id_table) { 
    console.log(">> get_correo_destinatario <<");

    var mensaje="";
    var result = "";
    var id_padre = $('#content_DafCertificaciones'+prefijo).parent().attr('id');

    $.ajax({
        url: "get_correo_funcionario_tramite",
        type: "get",
        data: {
            "tipo": tipo,
            "id_table": id_table
        },
        dataType: "json",
        async: false,

        success: function(json) {
            console.log(">> test... ");

            if (json['non_field_errors']) {
                console.log(json['non_field_errors']);
            } else {
                result = json;
            }
        },
        error: function(data) {
            $("#modalLoadin").hide();
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));

        },
    });

    return result;

}

/*
* Funcion: enviar_emailnotificacion   
* Descripcion: Devuelve el tramite a las areas revisoras como tic,mantenimiento u obra civil.
* Parametros:
*   - tipo(String): Indica el tipo de mensaje que se va a enviar en el texto del correo dependiendo el flujo del proceso. 
*                   Ejemplo S(Utilizado para el envio de correo al solicitante), A(Cuando se inicia o aprueba un tramite 
*                   por sus aprobadores), D(Cuando se devuelve un Tramite al solictante), f(Cuando ya se aprobo el tramite y se notifica al sollicitante).
*   - prefijo(String): Prefijo de los campos del formulario. 
*   - id_rec(String): Id del registro de la tabla daf_certificaciones.
*   - titulo(String): Titulo del contrato.
*/
function enviar_emailnotificacion(tipo,prefijo,id_rec,titulo) { 
    console.log(">> enviar_emailnotificacion <<");

    var mensaje="";
    var correo="";
    var id_padre = $('#content_DafCertificaciones'+prefijo).parent().attr('id');

    if(tipo=='S'){
        mensaje = 'Se recibio su solicitud '+titulo+', puede verificar el progreso del trámite en el menu "Estado de Solicitud" en el sistema SIA.';
    }
    if(tipo=='A'){
        mensaje = 'Existe un trámite pendiente "'+titulo+'" en su bandeja del módulo de CERTIFICACIONES PRESUPUESTARIAS en el sistema SIA.';
    }
    if(tipo=='D'){
        mensaje = 'Se devolvio su trámite "'+ titulo + '". Por favor revisar su bandeja en el módulo de CERTIFICACIONES PRESUPUESTARIAS en el sistema SIA. ';
    }
    if(tipo=='T' || tipo=='M' || tipo=='O' || tipo=='RS'){
        mensaje = 'Revisar su bandeja del módulo de CERTIFICACIONES PRESUPUESTARIAS en el sistema SIA. ';
    }
    if(tipo=='f'){
        mensaje = 'Su trámite "'+ titulo + '" fue APROBADO con éxito. ';
    }

    info_persona = get_correo_destinatario(tipo,prefijo,id_rec);
    console.log(info_persona);
    for(i=0;i<info_persona.length;i++){
        console.log(">>>>> Correo"+i);
        console.log(info_persona[i].correo);
        console.log(info_persona[i].nombre_destinatario);
        $.ajax({
            url: "notificaciones_certificaciones",
            type: "get",
            cache: 'false',
            data: {
                "mensaje": mensaje,
                "titulo": titulo,
                "correo": info_persona[i].correo,
                "nombre_destinatario": info_persona[i].nombre_destinatario
            },
            dataType: "json",
            async: false,

            success: function(json) {
                console.log(json[0]);
                $("#modalLoadin").hide();
                if (json['error']) {
                    if (json['error']['context'])
                        var salida = json['error']['context']['resource'][0].message;
                    else
                        var salida = json['error']['message']
                } else {
                    
                    console.log(">> Se envio notificacion!..");

                   
                }
            },
            error: function(data) {
                $("#modalLoadin").hide();
                swal("", "Error: " + JSON.stringify(data), "error");
                console.log(JSON.stringify(data));

            },
        });
        

    }
    
}


/*
* Funcion: validarArchivo   
* Descripcion: Valida tamanio y extension del archivo.
* Parametros:
*   - fileName(String): Nombre del archivo. 
*   - fileSize(String): Tamanio del archivo.
*/
function validarArchivo(fileName, fileSize){
   
    if(fileSize > 2048000){
        //alert('El archivo no debe superar los 2MB');
        return 1;
        
    }else{
        // recuperamos la extensión del archivo
        var ext = fileName.split('.').pop();
        
        // Convertimos en minúscula porque 
        // la extensión del archivo puede estar en mayúscula
        ext = ext.toLowerCase();
    
        // console.log(ext);
        switch (ext) {
            case 'xls':
            case 'xlsx':
            case 'doc':
            case 'docx':
            case 'pdf': break;
            default:
                return 2;
                
        }
    }
    return 0;
}

/*
* Funcion: cargar_archivo   
* Descripcion: Sube archivos al servidor.
* Parametros:
*   - formulario(String): Nombre del formulario. 
*   - tipo(String): P(Proforma), A(Anexos), C(Certificaciones), D(Documentacion)
*   - file_id(String): numero del archivo.
*/
function cargar_archivo(formulario,tipo,file_id){
    console.log("************* cargar_archivo ***************** ");

    $("#modalLoadin").show();
    prefijo = '';
    

    if(formulario == 'frm_certifBE'){
        prefijo = 'BE';
    }
    else if (formulario == 'frm_certifET')
        prefijo = '';

    var path_archivos_cert = 'static/media/daf_certificaciones/'; 
    path_archivos_cert = path_archivos_cert + $("#idDafCertificaciones"+prefijo).val() + '/';

    if(($("#doc_anexos"+prefijo).val()=="" || $("#doc_anexos_ruc"+prefijo).val()=="") && tipo=='P'){
        validaContenedorExt("addDafCertificaciones"+prefijo, "PROFORMA y RUC OBLIGATORIOS!");
        $("#modalLoadin").hide();
        return 0;
    }else{
        file=""
        if(tipo == 'C')
            file = $('#doc_cert'+prefijo)[0].files[0];
        else if(tipo == 'P')
            file = $('#doc_anexos'+prefijo)[0].files[0];
        else if(tipo == 'A')
            file = $('#doc_anexos_otros'+prefijo)[0].files[0];
        else
            file = $('#doc_anexos'+file_id+prefijo)[0].files[0];

        if(file == undefined || file == null){
            $("#modalLoadin").hide();
            validaContenedorExt("addDafCertificaciones"+prefijo, "Seleccione un ARCHIVO!");
            return 0;
        }
        var fileName = file.name;
        //fileName = fileName.replace(/[^a-z0-9.\s]/gi, '').replace(/[_\s]/g, '_');
        var fileSize = file.size;
        salidaImg = validarArchivo(fileName,fileSize);
        if(salidaImg == 1){
            validaContenedorExt("addDafCertificaciones"+prefijo, "El archivo no debe superar los 2MB");
            $("#modalLoadin").hide();
            return 0;
        }

        if(salidaImg == 2){
            validaContenedorExt("addDafCertificaciones"+prefijo, "El archivo no tiene la extensión adecuada");
            $("#modalLoadin").hide();
            return 0;
        }
            

        //imgpdf='<i style="font-weight: bold;font-size: 16px;" class="fa fa-file-pdf-o text-red"></i>';

        if(salidaImg == 0){

            var data1 = new FormData($('#' + formulario).get(0));
            id = $("#idDafCertificaciones"+prefijo).val();

            // path_archivos_cert: Ya se carga en el editDafCertificaciones.
            data1.append("file_path", path_archivos_cert);
            data1.append("file_id", file_id);
            data1.append("id_table", id);

            $.ajax({
                type: 'POST',
                url: 'upload_files_json',
                data: data1,
                contentType: 'multipart/form-data',
                processData: false,
                contentType: false,
                success: function(data) {
                    console.log(data);
                    

                    if(tipo == 'A'){ //Anexos
                        tr='';
                        tr='<tr>';
                        tr+='<td align="left" style="border: 2px solid;padding-left:5px;"><a style="cursor:pointer; text-decoration:none;color:#262DCE;" href="'+path_archivos_cert+data.file0+'" target="_blank">'+data.file0+'</a></td>';
                        tr+='<td style="border: 2px solid" align="center"><a class="delete_file" style="font-size: 20px;cursor:pointer;"><i class="fa fa-close text-red"></i></a></td>';
                        tr+='</tr>';
                        $("#files_selectAnexos"+prefijo).append(tr);
                    }

                    if(tipo == 'P'){ //Proformas
                        tr='';
                        tr='<tr>';
                        tr+='<td align="left" style="border: 2px solid;padding-left:5px;"><a style="cursor:pointer; text-decoration:none;color:#262DCE;"" href="'+path_archivos_cert+data.file0+'" target="_blank">'+data.file0+'</a></td>';
                        tr+='<td align="left" style="border: 2px solid;padding-left:5px;"><a style="cursor:pointer; text-decoration:none;color:#262DCE;" href="'+path_archivos_cert+data.file1+'" target="_blank">'+data.file1+'</a></td>';
                        tr+='<td style="border: 2px solid" align="center"><a class="delete_file" style="font-size: 20px;cursor:pointer;"><i class="fa fa-close text-red"></i></a></td>';
                        tr+='</tr>';
                        $("#files_select"+prefijo).append(tr);
                    }

                    if(tipo=='C'){ //Certificados
                        if(prefijo == 'BE')
                            prefijo = '2BE';
                        tr='';
                        tr='<tr>';
                        tr+='<td align="left" style="border: 2px solid;padding-left:5px;"><a style="cursor:pointer; text-decoration:none;color:#262DCE;" href="'+path_archivos_cert+data.file0+'" target="_blank">'+data.file0+'</a></td>';
                        //tr+='<td align="left" style="border: 2px solid"><a style="cursor:pointer; text-decoration:none;color:#262DCE;" href="'+path_archivos_cert+'/'+data.file1+'" target="_blank">'+data.file1+'</a></td>';
                        tr+='<td style="border: 2px solid" align="center"><a class="delete_file" style="font-size: 20px;cursor:pointer;"><i class="fa fa-close text-red"></i></a></td>';
                        tr+='</tr>';
                        $("#files_select"+prefijo).append(tr);

                    }

                    if(tipo=='D'){ // Documentacion
                        borrar='<i class="fa fa-close text-red"></i>';
                
                        $("#archivoCert"+file_id+prefijo).html(data.file0);
                        $("#archivoCert"+file_id+prefijo).attr("href", path_archivos_cert+data.file0); // Set herf value
                        $("#archivoCert"+file_id+prefijo).attr("target", "_blank");   
                        $("#archivoCert"+file_id+prefijo).css("color", "#262DCE");  

                        $("#borrarCert"+file_id+prefijo).html(borrar);      
                        $("#modalLoadin").hide(); 

                    }

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
    
}

/*
* Funcion: eliminarCert   
* Descripcion: Elimina la documentacion
* Parametros:
*   - pos(String): numero del archivo. 
*   - prefijo(String): Prefijo del formulario ''(IniciarTramite), BE(BandejaEntrada),ET(Estado Tramite)
*/
function eliminarCert(pos,prefijo){
    if(prefijo==null){
        prefijo=""
    }
    id = $("#idDafCertificaciones"+prefijo).val();

    var bool = confirm("Esta seguro de eliminar este documento?");
    if (bool) {
        nombre_archivo =  $("#archivoCert"+pos+prefijo).text();
        respuesta = delete_file(nombre_archivo,id);
        if(respuesta == 1){
            $("#archivoCert"+pos+prefijo).html("");
            $("#borrarCert"+pos+prefijo).html("");
            if((pos == 5)||(pos == 6)||(pos == 7)){
                if (pos == 5)
                    datos = '{"doc_tic":""}';
                if (pos == 6)
                    datos = '{"doc_mantenimiento":""}';
                if (pos == 7)
                    datos = '{"doc_obracivil":""}';
            }else{
                cadena_archivos = getCadenaArchivos('documentos',prefijo);
                datos = '{"archivos":"'+cadena_archivos+'"}';
            }
            
            if($("#tipot_certif"+prefijo).val()!=0)
                updateArchivoCertBase(datos,prefijo,id);
            //console.log(cadena_archivos);
        }else
             validaContenedorExt("addDafCertificaciones"+prefijo, "Error al eliminar el archivo","error");
    }
}

function updateArchivoCertBase(datos,prefijo,id){
    $.ajax({
        url: "update_General",
        type: "get",
        cache: 'false',
        data: {
            "dj_url": "dafcertificaciones",
            "idtabla": id,
            "data": JSON.stringify(datos)
        },
        dataType: "json",
        success: function(data) {
            if (data.id == undefined) {
                validaContenedorExt("addDafCertificaciones"+prefijo, "Error al Elimianr el archivo en Base");
                console.log("idtabla---->" + id + "--->" + "data---->" + datos + "--->" + "dafcertificaciones" + "Error--->" + data);
            } else {
                validaContenedorExt2("addDafCertificaciones"+prefijo, "Archivo eliminado con éxito");
            }
        },
        error: function(data) {
            $('#modalLoadin').hide();
            validaContenedorExt("addDafCertificaciones"+prefijo, "Error al Elimianr el archivo en Base");
            console.log("idtabla---->" + id + "--->" + "data---->" + datos + "--->" + "dafcertificaciones" + "Error--->" + data);
        },
    });
}


function delete_file(nombre_archivo,id){
    //var path_archivos_cert = 'static/media/ser_ambientales/'; 

    var data1 = new FormData();
    var salida = 0;

    path_archivos_cert = path_archivos_cert_ + id + '/';

    // path_archivos_cert: Ya se carga en el editDafCertificaciones.
    data1.append("file_path", path_archivos_cert);
    data1.append("file_name", nombre_archivo);

    $.ajax({
        type: 'POST',
        url: 'delete_files_cert',
        data: data1,
        contentType: 'multipart/form-data',
        processData: false,
        contentType: false,
        async: false,
        success: function(data) {
            if(data == 'OK')
                salida = 1;
            else
                salida = -1;
        },
        error: function(data) {
            console.log(data);
            salida = -2;
            //Cuando la interacción retorne un error, se ejecutará esto.
        }
    })
    return salida;
}

/*
* Funcion: enviar_revisor   
* Descripcion: Envia el tramite al revisor que escoja el aprobador respectivo.
* Parametros:
*   - formulario(String): Nombre del formulario. 
*/
function enviar_revisor(formulario){
    console.log("**************** enviar_revisor ******************");
    var tipo = 'RS'; //Revisor
    var prefijo = "";

    if(formulario == 'frm_certifBE')
        prefijo = 'BE'
    if(formulario == 'frm_certifET')
        prefijo = 'ET'

    titulo = $("#fld_titulo"+prefijo).val();

    observacion = tinyMCE.get('fld_observacionBE2').getContent();

    if($("#fld_func_reasignado_id"+prefijo).children("option:selected").val()=="")
        validaContenedorExt("addDafCertificaciones"+prefijo, "Seleccione un Funcionario!");  
    else if($.trim(valor_nulo_str(observacion))=="")
        validaContenedorExt("addDafCertificaciones"+prefijo, "Ingrese una observacion!")
    else{
        var bool = confirm("Esta seguro de ENVIAR el tramite a "+ $("#fld_func_reasignado_id"+prefijo).children("option:selected").html() + "?"  );
        if (bool) {    

            id = $("#idDafCertificaciones"+prefijo).val();
            id_padre = $('#content_DafCertificaciones'+prefijo).parent().attr('id');

            datos = '';
            datos = '{';
            datos += ' "func_reasignado_id":"' + $("#fld_func_reasignado_id"+prefijo).val() + '", ';
            datos += ' "estado_tramite":"' + 'R' + '" ';
            datos += '}';

            
            //salida1 = th_update(datos, "SL_daf_certificaciones", id_padre, "dafcertificaciones", id);
            estado_aprob_detalle = 'R';

            $.ajax({
                url: "update_General",
                type: 'get',
                cache: 'false',
                data: {
                    "dj_url": "dafcertificaciones",
                    "idtabla": id,
                    "data": JSON.stringify(datos)
                },
                dataType: "json",
                async: false,
                success: function(data2) {
                    if (!data2.id == undefined) {
                        swal("", "Error al actualizar el registro", "error");
                        console.log("data---->" + datos + "--->" + "spncontrolhuevosresumen" + "Error--->" + data2);
                        return 0;
                    } else {
                        
                       var respuesta = insertCertificacionesDetalle(estado_aprob_detalle);

                        if(respuesta == 1){
                            swal("", "Registro Actualizado con éxito!", "success");
                            var d = new Date();
                            var f1 = d.getFullYear() + "-01-01";
                            var f2 = d.getFullYear() + "-12-31";
                            var dataini = f1 + "," + f2;

                            f1_aux = '01/01/' + d.getFullYear();
                            f2_aux = '12/31/' + d.getFullYear();

                            $("#FdesdeParam"+prefijo).val(f1_aux);
                            $("#FhastaParam"+prefijo).val(f2_aux);

                            enviar_emailnotificacion(tipo,prefijo,id,titulo);
                            buscarCertificadosParametros(dataini,'frm_certifBE');
                            return 1;
                        }else{
                            updateEstadoCabCertificacionError(id,'R');
                            swal("", "Error al actualizar el registro", "error");
                            return 0;
                        }
                    }
                },
                error: function(data2) {
                    swal("", "Error al actualizar el registro", "error");
                    console.log("data---->" + datos + "--->" + "spncontrolhuevosresumen" + "Error--->" + data2);
                    return 0; 
                },
            });

             

            /*insertCertificacionesDetalle(estado_aprob_detalle);

            var d = new Date();
            var f1 = d.getFullYear() + "-01-01";
            var f2 = d.getFullYear() + "-12-31";
            var dataini = f1 + "," + f2;

            f1_aux = '01/01/' + d.getFullYear();
            f2_aux = '12/31/' + d.getFullYear();

            $("#FdesdeParam"+prefijo).val(f1_aux);
            $("#FhastaParam"+prefijo).val(f2_aux);

            enviar_emailnotificacion(tipo,prefijo,id,titulo);
            buscarCertificadosParametros(dataini,'frm_certifBE');
            

            return false*/
        }else{
            return 0;
        }

    }

    
}


/*
* Funcion: validar_archivos_vacios.
* Descripcion: Valida que los archivos OBLIGATORIOS que este subidos al sistema.
* Parametros:
*   - prefijo(String): Prefijo del formulario ''(IniciarTramite), BE(BandejaEntrada),ET(Estado Tramite)     
*/
function validar_archivos_vacios(prefijo){
    var proformas = '';

    if($("#archivoCert1"+prefijo).html()==""){
        validaContenedorExt("addDafCertificaciones"+prefijo, "Certificaciones Electronicas OBLIGATORIAS! ");
        return 0;
    }


    if($("#archivoCert2"+prefijo).html()==""){
        validaContenedorExt("addDafCertificaciones"+prefijo, "Certificado de Actividad, recurso y presupuesto OBLIGATORIAS!");    
        return 0;
    }

    if(document.querySelector('input[name=fld_catalogo_elect'+prefijo+']:checked')==null){
        if($("#archivoCert3"+prefijo).html()==""){
            validaContenedorExt("addDafCertificaciones"+prefijo, "Estudio de Mercado OBLIGATORIAS!");     
            return 0;
        }
        
        // Validacion Proformas
        proformas= $("#files_select"+prefijo).html();
        if(proformas == ""){
            validaContenedorExt("addDafCertificaciones"+prefijo, "Proformas OBLIGATORIAS!");      
            return 0;
        }

    }
        
    if($("#archivoCert4"+prefijo).html()==""){
        validaContenedorExt("addDafCertificaciones"+prefijo, "Termino Referencia o Informe requerimiento OBLIGATORIAS!");      
        return 0;
    }

    if($("#fld_tipo").val() == 'B'){
        if($("#archivoCert99"+prefijo).html()==""){
            validaContenedorExt("addDafCertificaciones"+prefijo, "Verificacion de Stock en Bodega OBLIGATORIO!");      
            return 0;
        }
    }
    
    return 1;
}


function openModelCertf(nombre){
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


function cargaFuncionariosByRolSelect(permiso,isla_trabaja_id){
    console.log(">>>>>> cargaFuncionariosByRolSelect <<");
    
    $.ajax({
      url: "get_funcionarioByRol",
      type: "post",
      data: {
        "permiso_byuser": permiso,
        "isla_trabaja_id": isla_trabaja_id 
        },
      dataType: "json",
      async:false,

      success: function(data) {
         if(data['non_field_errors']){
              console.log(data['non_field_errors']);
         }else{
              console.log(data);
              if(data.length!=0){
                
                option = '<option value=""> Seleccione una opcion</option>';
                if(data.length > 0){
                    for(i = 0; i < data.length; i++) {
                        option+="<option value='"+data[i][0]+"'>"+data[i][1]+" </option>";
                    }
                }
                $("#fld_func_reasignado_idBE").html(option);

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




function initEditor(editor){
    if (tinyMCE.execCommand ('mceRemoveEditor', false, editor)){ 
        tinymce.remove();     
        tinymce.init(
            {
            selector:'#'+editor,
            height : "300",
            toolbar: "alignleft,aligncenter,alignright,|,forecolor, |,bullist,numlist,|,outdent,indent,|,bold,italic,underline,|,fontselect,fontsizeselect"
        });      
    }
}




function aprobar_devolver_Certificaciones_aux(tipo,formulario){
    console.log("******* aprobar_devolver_Certificaciones *******");
    var bool = false;
    var prefijo = "";
    var finalizar_proceso = false;
    var texto = "";
    var id = ""; 
    var titulo = "";
    var observacion = "";
    

    if(formulario == 'frm_certifBE')
        prefijo = 'BE'
    if(formulario == 'frm_certifET')
        prefijo = 'ET'

    titulo = $("#fld_titulo"+prefijo).val();
    id = $("#idDafCertificaciones"+prefijo).val();
    permission = $("#td_permission_"+prefijo+id).html();

    observacion = tinyMCE.get('fld_observacion'+prefijo).getContent();

    //if($.trim(valor_nulo_str($("#fld_observacion"+prefijo).val()))==""){
    if($.trim(valor_nulo_str(observacion))==""){
        validaContenedorExt("addDafCertificacionesBE", "Ingrese una observacion!");
    }else{

        if(validar_archivos_vacios(prefijo)!=0){

            // Valida que el archivo de certificacion no este vacio
            if(permission == "s_presupuesto_aprobador" || permission == "s_admin_financiero"){

                certi_pres = $("#files_select2"+prefijo).html();
                if(certi_pres == ""){
                    validaContenedorExt("addDafCertificaciones"+prefijo, "Subir archivo de Certificacion Presupuestaria con su Firma!");      
                    return 0;
                }

            }

            if(tipo == 'D')
                texto = 'Esta seguro de DEVOLVER el tramite?';
            else if(tipo == 'R')
                texto = 'Esta seguro de RESPONDER el tramite?';
            else if(tipo == 'C')
                texto = 'Esta seguro de CANCELAR el tramite?';
            else if(tipo == 'A'){
                if( permission == "s_admin_financiero" ){
                    texto = 'Esta seguro que firmó la CERTIFICACIÓN PRESUPUESTARIA?';
                    finalizar_proceso = true;

                }else if( permission == "s_presupuesto_aprobador" ){
                    texto = 'Esta seguro de APROBAR y de que subio el archivo de CERTIFICACIÓN DE ACTIVIDAD, RECURSO Y PRESUPUESTO con su FIRMA, y que subio TODAS las CERTIFICACIONES PRESUPUESTARIAS?';
                    //finalizar_proceso = true;
                }
                else if( permission =="s_solicitante" )
                    texto = "Esta Seguro de Responder el tramite?";
                else if( permission =="s_directorarea_aprobador" || permission=="s_respac_aprobador" || permission=="s_planificacion_aprobador" )
                    texto = 'Esta seguro de APROBAR el Tramite y de que subio el archivo de CERTIFICACIÓN DE ACTIVIDAD, RECURSO Y PRESUPUESTO con su FIRMA?';
                else
                    texto = "Esta seguro de APROBAR?";

            }
                
            bool = confirm(texto);

            if (bool) { 
                
                prefijo = ""
                if(formulario == 'frm_certifBE')
                    prefijo = 'BE'
                else if(formulario == 'frm_certifET')
                    prefijo = 'ET'

                // Formacion de cadena Json
                id_padre = $('#content_DafCertificaciones'+prefijo).parent().attr('id');
                id = $("#idDafCertificaciones"+prefijo).val();
                permission = $("#td_permission_"+prefijo+id).html();

                datos = '';
                estado_aprob_detalle="";

                datos = get_json_certificados(prefijo,id);

                if(tipo=='A'){ //aprobar
                    if(permission=='s_solicitante'){
                        datos += ',"estado_tramite":"T"';
                    }else if(permission=='s_directorarea_aprobador'){
                        datos += ',"aprobar_dirarea":true';
                    /*}else if($("#permiso_session"+prefijo).val()=='s_bodega_aprobador'){
                        datos += ',"aprobar_bodega":true';*/
                    }else if(permission=='s_compraspub_aprobador'){
                        datos += ',"aprobar_compraspub":true';
                    }else if(permission=='s_respac_aprobador'){
                        datos += ',"aprobar_respac":true';
                    }else if(permission=='s_planificacion_aprobador'){
                        datos += ',"aprobar_planificacion":true';
                    }else if(permission=='s_presupuesto_aprobador'){
                        datos += ',"aprobar_presupuesto":true';
                    }else if(permission=='s_admin_financiero'){
                        datos += ',"aprobar_adminfinanciero":true';

                    }else if(permission=='s_tic_aprobador'){
                        datos += ',"aprobar_tic":true';
                    }else if(permission=='s_mantenimiento_aprobador'){
                        datos += ',"aprobar_mantenimiento":true';
                    }else if(permission=='s_obracivil_aprobador'){
                        datos += ',"aprobar_obracivil":true';
                    }

                    estado_aprob_detalle="A";

                }

                if(tipo=='D'){ // devolver
                    datos += ',"estado_tramite":"D"';
                }

                if(tipo=='C'){ // cancelar
                    datos += ',"estado_tramite":"C"';
                }

                if(tipo=='R'){ // Responder
                    datos += ', "func_reasignado_id": null ';
                    datos += ', "estado_tramite": "T" ';
                }
        

                // doc informes
                if (valor_nulo_str( $("#archivoCert5"+prefijo).html() ) != "") 
                    datos += ', "doc_tic":"'+ $("#archivoCert5"+prefijo).html() +'" ';

                if (valor_nulo_str( $("#archivoCert6"+prefijo).html() ) != "") 
                    datos += ', "doc_mantenimiento":"'+ $("#archivoCert6"+prefijo).html() +'" ';
                
                if (valor_nulo_str( $("#archivoCert7"+prefijo).html() ) != "") 
                    datos += ', "doc_obracivil":"'+ $("#archivoCert7"+prefijo).html() +'" ';

                // doc Certificaciones
                cadenaFiles = ''; //Certificados
                archivos = [];  //archivos
                salida = []; //archivos proformas
                
                var table = $("#table_files_certificaciones2BE tbody");
                table.find('tr').each(function(i) {
                    var data = $(this).find("td").find("a");
                    var cad = $(data).eq(0).html();
                    salida.push(cad);
                });

                dataDetalle = get_json_certificadosdetalles_aux(id, estado_aprob_detalle);

                datos += ', "det_certificaciones":[' + dataDetalle + ']';

                if(salida.length > 0){
                    cadenaFiles = salida.join('|');
                    datos += ', "archivos_certificacion":"'+cadenaFiles+'" }';
                }else
                    datos += '}';

                datos = datos.replace(/"null"/g, null);
                datos = datos.replace(/None/g, null);
                //datos = datos.replace(/'/g, '"');
                datos = datos.replace(/\"\"/g, null);


                console.log(datos);
                paginaBody = retornaBodyPagina("SL_daf_certificaciones");
                dj_url = "dafcabdetcertificaciones";
                $.ajax({
                    url: "update_General",
                    data: {
                        "dj_url": dj_url,
                        "idtabla": id,
                        "data": JSON.stringify(datos)
                    },
                    type: "get",
                    cache: 'false',
                    async: false,
                    dataType: "json",

                    success: function(data) {
                        if (data.id == undefined) {
                            $('#modalLoadin').hide();
                            validaContenedorExt(paginaBody, "Error al Insertar el registro");
                            return 0;
                        } else {
                            if(finalizar_proceso){
                                 tipo = 'f';
                                swal("", "La certificacion "+$('#fld_titulo'+prefijo).val()+" fue APROBADO con éxito!", "success");
                            }
                            else
                                swal("", "Registro Actualizado con éxito!", "success");

                                $('#addDafCertificaciones'+prefijo).modal('hide');

                                enviar_emailnotificacion(tipo,prefijo,id,titulo);
                                buscarCertificadosParametros("",formulario);
                                return 1;                                
                        }
                    },
                    error: function(data) {
                        $('#modalLoadin').hide();
                        validaContenedorExt(paginaBody, "Error al Insertar el registro");
                        return 0;
                    },
                });
                                  
            }else{
                buscarCertificadosParametros("",formulario);
                return 0;
            }
        }
    }
}


function get_json_certificadosdetalles_aux(id_tbl_padre,estado_aprob_detalle){
    console.log("**** get_json_certificadosdetalles_aux ****");

    var today = moment().format('YYYY-MM-DD');
    var preserved = "";
    if(estado_aprob_detalle == 'R') //Cuando envia una observacion al revisor
        //preserved = $('#fld_observacionBE2').val().replace(/\n\r?/g, '\\n');
        preserved = tinyMCE.get('fld_observacionBE2').getContent();
    else
        //preserved = $('#fld_observacionBE').val().replace(/\n\r?/g, '\\n');
        preserved = tinyMCE.get('fld_observacionBE').getContent();

    /*se arma la cadena datos*/
    datosD = '{';
    datosD += ' "daf_certificaciones_id":"' + id_tbl_padre + '", ';
    datosD += ' "funcionario_id":"' + $("#funcionario_session_idBE").val() + '", ';
    datosD += ' "fecha_observacion":"' + today + '", ';
    if(estado_aprob_detalle == 'A')
        datosD += ' "estado_tramite":"' + 'A' + '", ';
    else if(estado_aprob_detalle == 'R')
        datosD += ' "estado_tramite":"' + 'R' + '", ';
    else
        datosD += ' "estado_tramite":"' + 'T' + '", ';
    datosD += ' "observacion":"' + preserved.replace(/\n\r?/g, '').replace(/["]+/g, "'").replace(/\//g, "/") + '" ';
    datosD += '}';
   
    datosD = datosD.replace(/undefined/g, null);
    datosD = datosD.replace(/None/g,null);
    datosD = datosD.replace(/False/g,"'false'");
    datosD = datosD.replace(/True/g,"'true'");
    //datos = datos.replace(/'/g,'"')replace(/['"]+/g, '');
    datosD = datosD.replace(/"null"/g, null);
    //datos = datos.replace(/\"\"/g, null);
    //datos = datos.replace(/%%/g, "'");

    datosD.replace(/(\r\n\t|\n|\r\t)/gm,"").trim();

    return datosD;
}


/*
* Funcion: devolver_a_areas_revisoras   
* Descripcion: Devuelve el tramite a las areas revisoras como tic,mantenimiento u obra civil.
* Parametros:
*   - tipo(String): Indica la accion que se efectua: M(Mantenimiento), T(Tic), O(Obra Civil)
*   - formulario(String): Nombre del formulario. 
*/
function devolver_a_areas_revisoras_aux(tipo,formulario){
    console.log("******* devolver_a_areas_revisoras *******");

    prefijo = ""
    

    if(formulario == 'frm_certifBE')
        prefijo = 'BE'
    if(formulario == 'frm_certifET')
        prefijo = 'ET'

    titulo = $("#fld_titulo"+prefijo).val();
    var observacion   = tinyMCE.get('fld_observacion'+prefijo).getContent();

    if(observacion ==""){
        validaContenedorExt("addDafCertificaciones"+prefijo, "Ingrese una observacion!");
    }else{
        if(tipo == 'M')
            texto = 'Mantenimineto';
        else if(tipo == 'T')
            texto = 'Tic';
        else if(tipo == 'O')
            texto = 'Obra Civil';
        
        var bool = confirm("Esta seguro de devolver el tramite a "+texto+"?");
        if (bool) {    

            id = $("#idDafCertificaciones"+prefijo).val();
            id_padre = $('#content_DafCertificaciones'+prefijo).parent().attr('id');
            datos = '';

            // Tipos
            if(tipo=='T') $("#fld_tipo_revision"+prefijo).val('T'); 

            if(tipo=='M') $("#fld_tipo_revision"+prefijo).val('M'); 

            if(tipo=='O') $("#fld_tipo_revision"+prefijo).val('O');             


            datos = get_json_certificados(prefijo,id);

            // Doc informes
            if (valor_nulo_str( $("#archivoCert5"+prefijo).html() ) != "") 
                datos += ', "doc_tic":"'+ $("#archivoCert5"+prefijo).html() +'" ';

            if (valor_nulo_str( $("#archivoCert6"+prefijo).html() ) != "") 
                datos += ', "doc_mantenimiento":"'+ $("#archivoCert6"+prefijo).html() +'" ';
            
            if (valor_nulo_str( $("#archivoCert7"+prefijo).html() ) != "") 
                datos += ', "doc_obracivil":"'+ $("#archivoCert7"+prefijo).html() +'" ';


            dataDetalle = get_json_certificadosdetalles_aux(id, "");

            datos += ', "det_certificaciones":[' + dataDetalle + ']';

            if(tipo=='T') datos += ',"aprobar_tic":null }';

            if(tipo=='M') datos += ',"aprobar_mantenimiento":null }';

            if(tipo=='O') datos += ',"aprobar_obracivil":null }';          

            datos = datos.replace(/"null"/g, null);
            datos = datos.replace(/None/g, null);
            //datos = datos.replace(/'/g, '"');
            datos = datos.replace(/\"\"/g, null);
            
            console.log(datos);
            paginaBody = retornaBodyPagina("SL_daf_certificaciones");
            dj_url = "dafcabdetcertificaciones";
            $.ajax({
                url: "update_General",
                data: {
                    "dj_url": dj_url,
                    "idtabla": id,
                    "data": JSON.stringify(datos)
                },
                type: "get",
                cache: 'false',
                async: false,
                dataType: "json",
                success: function(data) {
                        if (data.id == undefined) {
                            //validaContenedorExt(paginaBody+prefijo, "Error al Actualizar el registro");
                            swal("", "Error al Actualizar el registro", "error");
                            return 0;
                        } else {
                            swal("", "Registro Actualizado con éxito!", "success");
                            $('#addDafCertificaciones'+prefijo).modal('hide');
                            var d = new Date();
                            var f1 = d.getFullYear() + "-01-01";
                            var f2 = d.getFullYear() + "-12-31";
                            var dataini = f1 + "," + f2;

                            f1_aux = '01/01/' + d.getFullYear();
                            f2_aux = '12/31/' + d.getFullYear();

                            $("#FdesdeParam"+prefijo).val(f1_aux);
                            $("#FhastaParam"+prefijo).val(f2_aux);
                            $('#addDafCertificaciones'+prefijo).modal('hide');
                            enviar_emailnotificacion(tipo,prefijo,id,titulo);
                            buscarCertificadosParametros(dataini,'frm_certifBE');
                            return 1;          
                        }
                },
                error: function(data) {
                    $('#modalLoadin').hide();
                    //validaContenedorExt(paginaBody+prefijo, "Error al Insertar el registro");
                    swal("", "Error al Actualizar el registro", "error");
                    return 0;
                },
            });
        }else{
            return 0;
        }      
    }

}


function enviar_revisor_aux(formulario){
    console.log("**************** enviar_revisor ******************");
    var tipo = 'RS'; //Revisor
    var prefijo = "";

    if(formulario == 'frm_certifBE')
        prefijo = 'BE'
    if(formulario == 'frm_certifET')
        prefijo = 'ET'

    titulo = $("#fld_titulo"+prefijo).val();

    observacion = tinyMCE.get('fld_observacionBE2').getContent();

    if($("#fld_func_reasignado_id"+prefijo).children("option:selected").val()=="")
        validaContenedorExt("addDafCertificaciones"+prefijo, "Seleccione un Funcionario!");  
    else if($.trim(valor_nulo_str(observacion))=="")
        validaContenedorExt("addDafCertificaciones"+prefijo, "Ingrese una observacion!")
    else{
        var bool = confirm("Esta seguro de ENVIAR el tramite a "+ $("#fld_func_reasignado_id"+prefijo).children("option:selected").html() + "?"  );
        if (bool) {  

            estado_aprob_detalle = 'R';  

            id = $("#idDafCertificaciones"+prefijo).val();
            id_padre = $('#content_DafCertificaciones'+prefijo).parent().attr('id');

            datos = get_json_certificados(prefijo,id);
            datos += ',"func_reasignado_id":"' + $("#fld_func_reasignado_id"+prefijo).val() + '"';

            dataDetalle = get_json_certificadosdetalles_aux(id, estado_aprob_detalle);
            datos += ',"det_certificaciones":[' + dataDetalle + ']';

            datos += ',"estado_tramite":"' + 'R' + '" ';
            datos += '}';

            console.log(datos);
            //salida1 = th_update(datos, "SL_daf_certificaciones", id_padre, "dafcertificaciones", id);
            

            $.ajax({
                url: "update_General",
                type: 'get',
                cache: 'false',
                data: {
                    "dj_url": "dafcabdetcertificaciones",
                    "idtabla": id,
                    "data": JSON.stringify(datos)
                },
                dataType: "json",
                async: false,
                success: function(data2) {
                    if (!data2.id == undefined) {
                        swal("", "Error al actualizar el registro", "error");
                        console.log("data---->" + datos + "--->" + "spncontrolhuevosresumen" + "Error--->" + data2);
                        return 0;
                    } else {

                            swal("", "Registro Actualizado con éxito!", "success");
                            var d = new Date();
                            var f1 = d.getFullYear() + "-01-01";
                            var f2 = d.getFullYear() + "-12-31";
                            var dataini = f1 + "," + f2;

                            f1_aux = '01/01/' + d.getFullYear();
                            f2_aux = '12/31/' + d.getFullYear();

                            $("#FdesdeParam"+prefijo).val(f1_aux);
                            $("#FhastaParam"+prefijo).val(f2_aux);

                            enviar_emailnotificacion(tipo,prefijo,id,titulo);
                            buscarCertificadosParametros(dataini,'frm_certifBE');
                            return 1;
                    }
                },
                error: function(data2) {
                    swal("", "Error al actualizar el registro", "error");
                    console.log("data---->" + datos + "--->" + "spncontrolhuevosresumen" + "Error--->" + data2);
                    return 0; 
                },
            });
        }else{
            return 0;
        }

    }
}



function getCadenaArchivos(tipo,prefijo){

    if(tipo == 'documentos'){
        // Documentacion
        archivos = [];
        archivos.push($("#archivoCert1"+prefijo).html());
        archivos.push($("#archivoCert2"+prefijo).html());
        if(document.querySelector('input[name=fld_catalogo_elect'+prefijo+']:checked')==null)
            archivos.push($("#archivoCert3"+prefijo).html());
        archivos.push($("#archivoCert4"+prefijo).html());
        archivos.push($("#archivoCert99"+prefijo).html());

        cadenaArchivos = archivos.join('|');
        return cadenaArchivos;
    }

    if(tipo == 'proformas'){
        // Proformas y Ruc Proveedor
        if(document.querySelector('input[name=fld_catalogo_elect'+prefijo+']:checked')==null){
            table = $("#table_files_proformas"+ prefijo +" tbody");
            table.find('tr').each(function(i) {
                var data = $(this).find("td").find("a");
                var cad = $(data).eq(0).html() + ":" + $(data).eq(1).html();
                salida.push(cad);
            });

            if(salida.length > 0)
                cadenaFiles = salida.join('|');
            else
                cadenaFiles = '';

            //cadenaF = cadenaArchivos+";;"+cadenaFiles;
            cadenaF = cadenaArchivos;

        }else
            cadenaF = cadenaArchivos
        return cadenaF;
    }

    if(tipo == 'anexos'){
        // Documentos Anexos
        salida = [];
        table="";
        cadena_archivos_otros="";

        table = $("#table_cert_otrosArchivos"+ prefijo +" tbody");
        table.find('tr').each(function(i) {
            var data = $(this).find("td").find("a");
            var cad = $(data).eq(0).html();
            salida.push(cad);
        });

        if(salida.length > 0)
            cadena_archivos_otros = salida.join('|');
        else
            cadena_archivos_otros = '';

        return cadena_archivos_otros;
    }

    if( tipo == 'certificacion'){
        var table = $("#table_files_certificaciones"+ prefijo +" tbody");
        table.find('tr').each(function(i) {
            var data = $(this).find("td").find("a");
            var cad = $(data).eq(0).html();
            salida.push(cad);
        });

        if(salida.length > 0)
            cadena_archivos_cert = salida.join('|');
        else
            cadena_archivos_cert = '';

        return cadena_archivos_cert;
    }
}