
var path_archivos_cert_ = 'static/media/cuem_mpesq/'; 


//Limpia los campos nombres y apellidos
function limpiarCamposRegistro(){
    $("#userNombresAux").val("");
    $("#userApellidosAux").val("");
    $("#userFechaNaci").val("");
    $("#userEstadoCivil").val("");
    $("#userSexo").val("");
    $("#mensajeEmail").hide();
    $("#mensaje").hide();
    $("#mensajeCedIncorrecta").hide();
}

/*
* Funcion: enviar_emailinvitacion   
* Descripcion: Envia información para que el usuario se registre en el sistema.
*/
function enviar_emailinvitacion(){
	console.log(">> enviar_emailnotificacion <<");

    var correo="";

    correo = $("#userEmail").val();
    nombre = $("#userNombres").val();
    apellido = $("#userApellidos").val(); 

    if(correo != ""){
        $.ajax({
            url: "enviar_correo",
            type: "get",
            cache: 'false',
            data: {
                "correo": correo,
                "nombre": nombre,
                "apellido": apellido,
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
                        
                    console.log(">> Se envio correo!..");
                       
                }
            },
            error: function(data) {
                //swal("", "Error: " + JSON.stringify(data), "error");
                console.log(JSON.stringify(data));
            },
        });
    }else{
    }
    return false;
    
}


/*funcion para obtener los datos del registro civil*/
function getDatosRegistroCivil() {
    limpiarCamposRegistro();
    $("#modalLoadin").show();
    cedula = $("#userCedula").val();
    sexo = '';
    estadoCivil = '';

    $.ajax({
        url: "get_DatosRegistroCivil2",
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
                    $("#userNombres").val(res[2] + " " + res[3]);
                    $("#userApellidos").val(res[0] + " " + res[1]);
                    $("#userNombresAux").val(res[2] + " " + res[3]);
                    $("#userApellidosAux").val(res[0] + " " + res[1]);
                } else
                    $("#userNombres").val(data.nombre);

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

                $("#userFechaNaci").val(fecha);
                $("#userSexo").val(sexo);
                $("#userEstadoCivil").val(estadoCivil);

            } else {
                $("#modalLoadin").hide();
                $("#mensajeCedIncorrecta").show();
                    //validaContenedorExt("TabFunc", "Error al Consultar en el Registro Civil");
            }
        },
        error: function(data) {
            $("#modalLoadin").hide();
            //validaContenedorExt("TabFunc", "Error:" + JSON.stringify(data));
            console.log(JSON.stringify(data));
            $("#mensaje").show();
        },
    });
}


//SOLICITANTE INICIAR TRAMITE

function limpiarFormCuemIniciarTramite(formulario){
    prefijo = "";
    if(formulario == 'frm_certif')
        prefijo = "";
    if(formulario == 'frm_certifBE')
        prefijo = 'BE'
    if(formulario == 'frm_certifET')
        prefijo = 'ET'
    $('.nav-tabs a[href="#tab_documentacion'+prefijo+'"]').tab('show');


    $('#dv_foto').css('visibility', "hidden"); //Ocular foto de pescador
    $("#foto_personal").attr('src', '');
    $("#foto_personal").attr('style', "width:193px;height:237px;");
    $("#link_foto_personal").attr('href', '');

    //archivos
    for(file_id=1;file_id<=9;file_id++){
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

}

function buscarSolicitanteIniciarTramiteParametros(dataIni,formulario){
    console.log("********** buscarSolicitanteIniciarTramiteParametros ********** ");
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
    

    if(formulario == 'frm_tramiteBE'){
        prefijo = 'BE';
    }
    else if (formulario == 'frm_tramiteET')
        prefijo = '';

    var path_archivos_cert = 'static/media/cuem_mpesq/'; 
    path_archivos_cert = path_archivos_cert + $("#idCuemIniciarTramite"+prefijo).val() + '/';

    if(($("#doc_anexos"+prefijo).val()=="" || $("#doc_anexos_ruc"+prefijo).val()=="") && tipo=='P'){
        validaContenedorExt("addCuemIniciarTramite"+prefijo, "PROFORMA y RUC OBLIGATORIOS!");
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
            validaContenedorExt("addCuemIniciarTramite"+prefijo, "Seleccione un ARCHIVO!");
            return 0;
        }
        var fileName = file.name;
        //fileName = fileName.replace(/[^a-z0-9.\s]/gi, '').replace(/[_\s]/g, '_');
        var fileSize = file.size;
        salidaImg = validarArchivo(fileName,fileSize);
        if(salidaImg == 1){
            validaContenedorExt("addCuemIniciarTramite"+prefijo, "El archivo no debe superar los 2MB");
            $("#modalLoadin").hide();
            return 0;
        }

        if(salidaImg == 2){
            validaContenedorExt("addCuemIniciarTramite"+prefijo, "El archivo no tiene la extensión adecuada");
            $("#modalLoadin").hide();
            return 0;
        }
            

        //imgpdf='<i style="font-weight: bold;font-size: 16px;" class="fa fa-file-pdf-o text-red"></i>';

        if(salidaImg == 0){

            var data1 = new FormData($('#' + formulario).get(0));
            id = $("#idCuemIniciarTramite"+prefijo).val();

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
    id = $("#idCuemIniciarTramite"+prefijo).val();

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
             validaContenedorExt("addCuemIniciarTramite"+prefijo, "Error al eliminar el archivo","error");
    }
}

function delete_file(nombre_archivo,id){
    //var path_archivos_cert = 'static/media/cuem_mpesq/'; 

    var data1 = new FormData();
    var salida = 0;

    path_archivos_cert = path_archivos_cert_ + id + '/';

    // path_archivos_cert: Ya se carga en el editDafCertificaciones.
    data1.append("file_path", path_archivos_cert);
    data1.append("file_name", nombre_archivo);

    $.ajax({
        type: 'POST',
        url: 'delete_files_cueminiciartramite',
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
}
