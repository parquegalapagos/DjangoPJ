$(document).keydown(function(e) {
    if (e.keyCode == 27) return false;
});
/*codigo para agregar pestañas al contenedor*/
var tabs = $("#tabs").tabs();
//tabCounter = 0;

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

                if(result.indexOf("PaginaLogin") > -1){
                    location.href = 'logout';
                    return 0;
                }else
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
}

/*fin codigo para agregar pestañas al contenedor*/

/*funcion para obtener el nombre del mes*/
function getMes(mes) {
    if (mes == 1)
        return 'Enero';
    if (mes == 2)
        return 'Febrero';
    if (mes == 3)
        return 'Marzo';
    if (mes == 4)
        return 'Abril';
    if (mes == 5)
        return 'Mayo';
    if (mes == 6)
        return 'Junio';
    if (mes == 7)
        return 'Julio';
    if (mes == 8)
        return 'Agosto';
    if (mes == 9)
        return 'Septiembre';
    if (mes == 10)
        return 'Octubre';
    if (mes == 11)
        return 'Noviembre';
    if (mes == 12)
        return 'Diciembre';
}

/*funcion para lanzar mensajes de notificaciones dentro del formulario*/
function Notification(htmlElement) {

    this.htmlElement = htmlElement;
    this.icon = htmlElement.querySelector('.icon > i');
    this.text = htmlElement.querySelector('.text');
    this.close = htmlElement.querySelector('.close');
    this.isRunning = false;
    this.timeout;

    this.bindEvents();
};

Notification.prototype.bindEvents = function() {
    var self = this;
    this.close.addEventListener('click', function() {
        window.clearTimeout(self.timeout);
        self.reset();
    });
}

Notification.prototype.info = function(message) {
    if (this.isRunning) return false;

    this.text.innerHTML = message;
    this.htmlElement.className = 'notification info';
    this.icon.className = 'fa fa-2x fa-info-circle';

    this.show();
}

Notification.prototype.success = function(message) {
    if (this.isRunning) return false;

    this.text.innerHTML = message;
    this.htmlElement.className = 'notification success';
    this.icon.className = 'fa fa-2x fa-info-circle';

    this.show();
}

Notification.prototype.warning = function(message) {
    if (this.isRunning) return false;

    this.text.innerHTML = message;
    this.htmlElement.className = 'notification warning';
    this.icon.className = 'fa fa-2x fa-exclamation-triangle';

    this.show();
}

Notification.prototype.error = function(message) {
    if (this.isRunning) return false;

    this.text.innerHTML = message;
    this.htmlElement.className = 'notification error';
    this.icon.className = 'fa fa-2x fa-exclamation-circle';

    this.show();
}

Notification.prototype.show = function() {
    if (!this.htmlElement.classList.contains('visible'))
        this.htmlElement.classList.add('visible');

    this.isRunning = true;
    this.autoReset();
};

Notification.prototype.autoReset = function() {
    var self = this;
    this.timeout = window.setTimeout(function() {
        self.reset();
    }, 5000);
}

Notification.prototype.reset = function() {
    this.htmlElement.className = "notification";
    this.icon.className = "";
    this.isRunning = false;
};


/*crud general*/
//cadena json
//pagina pagina que envia la transaccion
//id_padre nombre del contenedor donde se recarga la pagina
//dj_url nombre de la tabla a la q se le realizara la accion
//recarga indica si la pagina se va a recargar despues de hacer una insercion (recarga == "" --> recarga la pagina)
//replace_token: si recibe false no reemplaza la cadena. 
function th_insert(cadena, pagina, id_padre, dj_url, recarga, replace_token, callback) {

    paginaBody = retornaBodyPagina(pagina);
    
    if(replace_token==false){
        // Recibe la cadena de texto ya depurada. No es necesario hacer el replace del text. 
    }else{
        cadena = cadena.replace(/None/g, null)
        cadena = cadena.replace(/"null"/g, null)
        cadena = cadena.replace(/'/g, '"')
        cadena = cadena.replace(/\"\"/g, null);
    }
    
    console.log(cadena);

    $('#modalLoadin').show();
    $.ajax({
        url: "insert_General",
        type: 'get',
        cache: 'false',
        data: {
            "dj_url": dj_url,
            "data": JSON.stringify("[" + cadena + "]")
        },
        async: false,
        dataType: "json",
        success: function(data) {
            $('#modalLoadin').hide();
            //if(data['non_field_errors']){
            if (!data['results']) {
                $('#modalLoadin').hide();
                validaContenedorExt(paginaBody, "Error al Insertar el registro");
                console.log("data---->" + cadena + "--->" + dj_url + "Error--->" + data);
            } else {

                if (recarga == 2) {
                    validaContenedorExt2("addPersonaP", "Registro insertado con exito");
                    return 0;
                }

                if (recarga != 1) {
                    swal("", "Registro Insertado con éxito!", "success");

                    if (pagina == "SP_accPersonal") {
                        verTabs(cadena);
                    }
                    
                    $.fn.extend({
                        syncLoad: function(url) {
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
                    $("#" + id_padre).syncLoad(pagina);
                } else {
                    $('#modalLoadin').hide();
                    $("#idauxinsert").val(data.results[0].id);
                }
                if (callback)//Freddy Lituma
                    callback(data.results[0].id);//Freddy Lituma

            }
        },
        error: function(data) {
            $('#modalLoadin').hide();
            validaContenedorExt(paginaBody, "Error al Insertar el registro");
            console.log("data---->" + cadena + "--->" + dj_url + "Error--->" + data);
        },
    });
}

/*metodo para insertar en bitacora de error*/
//cadena cadena que da error al ser insertada
//pagina pagina que envia la transaccion
//tabla  nombre de la tabla de error
//trx    transaccion que dio el error(insert/update/delete)

function th_insert_error(cadena, pagina, tabla, error, trx) {

    cadena = cadena.replace(/"null"/g, null)
    cadena = cadena.replace(/None/g, null)
    cadena = cadena.replace(/'/g, '"')
    cadena = cadena.replace(/\"\"/g, null);

    datos = '{"resource": [{"id":"' + uuidv4() + '", "cadena":"' + cadena + '", "pagina":"' + pagina + '", "error":"' + error + '", "transaccion":"' + trx + '"}]}';

    $.ajax({
        url: "insert_General",
        type: 'get',
        cache: 'false',
        data: {
            "tabla": tabla,
            "data": JSON.stringify(datos)
        },
        dataType: "json",
        success: function(data) {
            return 1;
        },
        error: function(data) {
            return 1;
        },
    });
}

/*funcion para realizar las actualizaciones de estado a las tablas*/
//cadena json
//pagina pagina que envia la transaccion
//id_padre nombre del contenedor donde se recarga la pagina
//dj_url nombre de la tabla a la q se le realizara la accion
//idtabla id de la tabla a realizar la accion
function th_delete(cadena, pagina, id_padre, dj_url, idtabla, recarga, callback) {
    $('#modalLoadin').show();
    paginaBody = retornaBodyPagina(pagina);

    cadena = cadena.replace(/"null"/g, null)
    cadena = cadena.replace(/None/g, null)
    cadena = cadena.replace(/'/g, '"')
    cadena = cadena.replace(/\"\"/g, null);

    $.ajax({
        url: "update_General",
        type: "get",
        cache: 'false',
        data: {
            "dj_url": dj_url,
            "idtabla": idtabla,
            "data": JSON.stringify(cadena)
        },
        dataType: "json",

        success: function(data) {
            if (data.id == undefined) {
                $('#modalLoadin').hide();
                validaContenedorExt(paginaBody, "Error al Insertar el registro");
                console.log("idtabla---->" + idtabla + "--->" + "data---->" + cadena + "--->" + dj_url + "Error--->" + data);
                return 0;
            } else {
                if (recarga == 1) {
                    $('#modalLoadin').hide();
                    //swal("", "Registro Eliminado con éxito!", "success");
                    //$("#idauxinsert").val(data.results[0].id);
                    return 1;

                }else {
                    swal("", "Registro Eliminado con éxito!", "success");

                    if (callback)//Freddy Lituma
                        callback(data);//Freddy Lituma
                    
                    $.fn.extend({
                        syncLoad: function(url) {

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
                    $("#" + id_padre).syncLoad(pagina);
                }
                
            }
        },
        error: function(data) {
            $('#modalLoadin').hide();
            validaContenedorExt(paginaBody, "Error al Insertar el registro");
            console.log("idtabla---->" + idtabla + "--->" + "data---->" + cadena + "--->" + dj_url + "Error--->" + data);
        },
    });
}

/*funcion para realizar las actualizaciones a las tablas*/
//cadena json
//pagina pagina que envia la transaccion
//id_padre nombre del contenedor donde se recarga la pagina
//dj_url nombre de la tabla a la q se le realizara la accion
//idtabla id de la tabla a realizar la accion
//replace_token: si recibe false no reemplaza la cadena. 
function th_update(cadena, pagina, id_padre, dj_url,idtabla,replace_token, callback) {
    paginaBody = retornaBodyPagina(pagina);

    if(replace_token==false){
        // Recibe la cadena de texto ya depurada. No es necesario hacer el replace del text. 
    }else{
        cadena = cadena.replace(/"null"/g, null)
        cadena = cadena.replace(/None/g, null)
        cadena = cadena.replace(/'/g, '"')
        cadena = cadena.replace(/\"\"/g, null);
    }

    $.ajax({
        url: "update_General",
        data: {
            "dj_url": dj_url,
            "idtabla": idtabla,
            "data": JSON.stringify(cadena)
        },
        type: "get",
        cache: 'false',
        async: true,
        dataType: "json",

        success: function(data) {
            if (data.id == undefined) {
                $('#modalLoadin').hide();
                validaContenedorExt(paginaBody, "Error al Actualizar el registro");
                console.log("idtabla---->" + idtabla + "--->" + "data---->" + cadena + "--->" + dj_url + "Error--->" + data);
                return 0;
            } else {
                //var salida = data['resource'][0].id;
                swal("", "Registro Actualizado con éxito!", "success");
                if (callback)//Freddy Lituma
                    callback(data);//Freddy Lituma
                return 1;
            }
        },
        error: function(data) {
            $('#modalLoadin').hide();
            validaContenedorExt(paginaBody, "Error al Actualizar el registro");
            console.log("idtabla---->" + idtabla + "--->" + "data---->" + cadena + "--->" + dj_url + "Error--->" + data);
            return 0;
        },
    });
}

//genera una notificacion y la muestra en el contenedor q se envia por parametro
function validaContenedor(contenedor) {
    var notificator = new Notification(document.getElementById('body' + contenedor).querySelector('.notification'));
    //imput = $('#addComision');
    salida = true;
    cont = 0;
    $('#body' + contenedor + ' .requerido').each(function() {
        //console.log($(this).attr('id'));
        if ($(this).val() == "") {
            //swal("Campo Obligatorio");
            id = $(this).attr('id');
            $("#" + $(this).attr('id')).focus();
            notificator.error("Campo " + $("#" + id).attr('text') + " obligatorio");
            //console.log(cont);
            salida = false;
            return salida;
            cont++;
        }
    });
    return salida;
}

//genera una notificacion y la muestra en el contenedor el mensaje q se envia por parametro(error)
function validaContenedorExt(contenedor, mensaje) {
    var notificator = new Notification(document.getElementById('body' + contenedor).querySelector('.notification'));
    //imput = $('#addComision');
    salida = true;
    cont = 0;

    notificator.error(mensaje);
    //console.log(cont);
    salida = false;
    return salida;
}


//genera una notificacion y la muestra en el contenedor q se envia por parametro (OK)
function validaContenedorExt2(contenedor, mensaje) {
    var notificator = new Notification(document.getElementById('body' + contenedor).querySelector('.notification'));
    //imput = $('#addComision');
    salida = true;
    cont = 0;

    notificator.success(mensaje);
    //console.log(cont);
    salida = false;
    return salida;
}

/*funcion para subir archivos*/
function upload_file(formulario, file_path) {
    console.log("******** upload_file *********");
    var data1 = new FormData($('#' + formulario).get(0));
    data1.append("file_path", file_path)

    $.ajax({
        type: 'POST',
        url: 'upload_files',
        data: data1,
        contentType: 'multipart/form-data',
        processData: false,
        contentType: false,
        success: function(data) {
            console.log(data);
            //Cuando la interacción sea exitosa, se ejecutará esto.
        },
        error: function(data) {
            console.log(data);
            //Cuando la interacción retorne un error, se ejecutará esto.
        }
    })
}

/*validar extensiones de los archivos*/
var _validFileExtensions = ["jpg", "jpeg", "bmp", "gif", "png", "ico"];

function ValidateExt(extension) {

    var blnValid = true;
    for (var j = 0; j < _validFileExtensions.length; j++) {
        var sCurExtension = _validFileExtensions[j];
        if (extension.toLowerCase() != sCurExtension.toLowerCase()) {
            blnValid = true;
        } else {
            blnValid = false;
            break;
        }
    }
    if (!blnValid) {

        return 0;
    }
    return 1;
}

/**/

/*ordena los datos de un select*/
function sortSelect(select, attr, order) {
    if (attr === 'text') {
        if (order === 'asc') {
            $(select).html($(select).children('option').sort(function(x, y) {
                return $(x).text().toUpperCase() < $(y).text().toUpperCase() ? -1 : 1;
            }));
            $(select).select2().select2('val', '');
            //$(select).get(0).selectedIndex = 2;
            $(select).trigger("change");
            //e.preventDefault();
        } // end asc
        if (order === 'desc') {
            $(select).html($(select).children('option').sort(function(y, x) {
                return $(x).text().toUpperCase() < $(y).text().toUpperCase() ? -1 : 1;
            }));
            $(select).get(0).selectedIndex = 2;
            $(select).val("").trigger("change");
            //e.preventDefault();
        } // end desc
    }

};

/* funciones generales*/
/*obtener la fecha actual*/
function getToday() {
    var today = new Date();
    var dd = today.getDate();

    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }
    today = yyyy + '-' + mm + '-' + dd;
    return today;
}

/*para campos numericos*/
$('input.floatNumber').on('input', function() {
    this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
});

/*genera id*/
function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
}

/*para filtrar dentro del menu*/
$("#search").keyup(function() {

    // Retrieve the input field text and reset the count to zero
    var filter = $(this).val(),
        count = 0;

    // Loop through the comment list
    $("ul li").each(function() {

        // If the list item does not contain the text phrase fade it out
        if ($(this).text().search(new RegExp(filter, "i")) < 0) {
            $(this).fadeOut();

            // Show the list item if the phrase matches and increase the count by 1
        } else {
            $(this).show();
            count++;
        }
    });
});

/*genera un token de session*/
function generarSessionkeyInit() {
    var obj = {
        "username": "admin",
        "password": "admin"
    };
    //obj: {};
    datos = JSON.stringify(obj);
    $.ajax({
        url: "/generarSessionToken/",
        type: "get",
        cache: 'false',
        dataType: "json",
        data: {
            "data": JSON.stringify(datos)
        },
        success: function(data) {
            if (data['error']) {
                if (data['error']['context'])
                    var salida = data['error']['context']['resource'][0].message;
                else
                    var salida = data['error']['message']
                swal("", "Error al generar el token: " + salida, "Danger");
            } else {
                //console.log(data['session_token']);
                sessionStorage.setItem('session_token', data['session_token']);
                //cargarTablaMuelles();               
            }
        },
        error: function(data) {
            swal("", "Error al generar el token: " + data.error.context.message, "Danger");
            console.log(JSON.stringify(data));
        },
    });
}

/*inicializar el model para eliminar registro*/
function deleteModal(id, pagina) { //id_registro tabla, pagina que envia
    $('#id').val(id);
    $('#id_tabla').val(id);
    $('#pagina_envia').val(pagina);
    $("#myModalLabel").html("");
    $("#myModalBody").html("");
    $("#myModalLabel").append("Eliminar Registro");
    $("#myModalBody").append("Estas seguro de eliminar este registro?");
    $("#mi-modal").modal('show');
}

/*invoca el metodo eliminar cuando se realiza el confirm*/
function confirmdelete() {
    $("#mi-modal").modal('hide');
    //id   = $('#id').val();

    id = $('#id_tabla').val();
    pagina = $('#pagina_envia').val();

    if (pagina == 'personas')
        deletePersonas(id)
    if (pagina == 'funcionario')
        deleteFuncionario(id)
    if (pagina == 'cuentaBanco')
        deleteCuentaBanco(id)
    if (pagina == 'accidentes')
        deleteAccidentes(id)
    if (pagina == 'enfermedades')
        deleteEnfermedad(id)
    if (pagina == "discapacidades")
        deleteDiscapacidad(id)
    if (pagina == "distributivo")
        deleteDistributivo(id)
    if (pagina == "funcional")
        deleteFuncional(id)
    if (pagina == "institucional")
        deleteInstitucional(id)
    if (pagina == "ocupacional")
        deleteOcupacional(id)
    if (pagina == "rol_laboral")
        deleteRollaboral(id)
    if (pagina == "comision")
        deleteComisiones(id)
    if (pagina == "etnias")
        deleteEtnias(id)
    if (pagina == "licencias")
        deleteLicencias(id)
    if (pagina == "modalidad")
        deleteModalidad(id)
    if (pagina == "regimen")
        deleteRegimen(id)
    if (pagina == "sanciones")
        deleteSanciones(id)
    if (pagina == "SP_sanciones")
        deleteSancionesSP(id)
    if (pagina == "SP_accPersonal")
        deleteAccionPer(id)
    if (pagina == "SP_iniciarTramite")
        deleteSolicitudPermiso(id)
    if (pagina == "accion_personal")
        deleteAccion(id);
    if (pagina == "SP_asistencia")
        deleteControlAsistencia(id);
    if (pagina == "carnetCargo")
        deleteCntzCargo(id);
    if (pagina == "cc")
        deleteCC(id);
    if (pagina == "poblacion")
        deletePob(id);
    if (pagina == "TorAdul")
        deleteTorAdul(id);
    if (pagina == "TorNido")
        deleteTorNido(id);
    if (pagina == "PetNido")
        deletePetNido(id);
    if (pagina == "Nidos")
        deleteNido(id);
    if (pagina == "Fla")
        deleteFla(id);
    if (pagina == "Especies")
        deleteEspecies(id);
    if (pagina == "carnetizacion")
        deleteCarnetizacion(id);
    if (pagina == "SL_daf_certificaciones")
        deleteDafCertificaciones(id);
    if (pagina == "marca")
        deleteMarca(id);
    if (pagina == "Ubicacion")
        deleteUbicacion(id);
    if (pagina == "producto")
        deleteProducto(id);
    if (pagina == "tipoequipo")
        deleteTipoEquipo(id);
    if (pagina == "unidamedida")
        deleteUnidadMedida(id);
    if (pagina == "equipo")
        deleteEquipo(id);
    if (pagina == "vehiculo")
        deleteVehiculo(id);
    if (pagina == "vehiculotipo")
        deleteVehiculoTipo(id); 
    if (pagina == "tipousuario")
        deleteTipoUsuario(id); 
    if (pagina == "bsaparametrosconfig")
        deleteBsaParametrosConfig(id);
    if (pagina == "infpetreos")
        deleteinfoTecGestPet(id);
    if (pagina == "preguntas")
        deletePregunta(id);

    // CUEM-MANEJO PESQUERO
   
    //CIN - CONTROL TURISTAS
    if (pagina == "ActaControlTuristas")
        deleteActaControlTurista(id);

    if (pagina == "ActaControlPesca")
        deleteActaControlPesca(id);

    if (pagina == "ActaControlCombustible")
        deleteActaControlCombustible(id);

    if (pagina == "ActaControlNocturno")
        deleteActaControlNocturno(id);

    if (pagina == "ActaControlContenedores")
        deleteActaControlContenedores(id);

    if (pagina == "ActaControlPatrullajeGeneral")
        deleteActaControlPatrullajeGeneral(id);

     if (pagina == "ActaControlPatrullajeTortuga")
        deleteActaControlPatrullajeTortuga(id);

    if (pagina == "ActaControlPatrullajeBares")
        deleteActaControlPatrullajeBares(id);

    if (pagina == "ActaControlAeropuerto")
        deleteActaControlAeropuerto(id);
    
    if (pagina == "ActaControlAeropIguanas")
        deleteActaControlAeropIguanas(id);

    if (pagina == "ActaControlAeropRecorridos")
        deleteActaControlAeropRecorridos(id);
    
    
    
}


/*retorna el nombre del body pagina*/
function retornaBodyPagina(pagina) {

    if (pagina == 'personas')
        return 'addPersona';
    if (pagina == 'cuentaBan')
        return 'addCuenta';
    if (pagina == 'accidentes')
        return 'addAccidente';
    if (pagina == 'enfermedades')
        return 'addEnfermedad';
    if (pagina == "discapacidades")
        return 'addDiscapacidad';
    if (pagina == "distributivo")
        return 'addDistributivo';
    if (pagina == "funcional")
        return 'addFuncional';
    if (pagina == "institucional")
        return 'addInstitucional';
    if (pagina == "ocupacional")
        return 'addOcupacional';
    if (pagina == "rol_laboral")
        return 'addRolLaboral';
    if (pagina == "comision")
        return 'addComision';
    if (pagina == "etnias")
        return 'addEtnias';
    if (pagina == "licencias")
        return 'addLicencia';
    if (pagina == "modalidad")
        return 'addModalidad';
    if (pagina == "regimen")
        return 'addRegimen';
    if (pagina == "sanciones")
        return 'addSancion';

    if (pagina == "SP_ingresos")
        return 'addEnIngresoI';
    if (pagina == "SP_accPersonal")
        return 'addAccPersonal';
    if (pagina == "personas")
        return 'addPersona';
    if (pagina == "SP_licencias")
        return 'addLicenciaL';
    if (pagina == "SP_sanciones")
        return 'addSancionSP';
    if (pagina == "SP_traslados")
        return 'addTraslado';
    if (pagina == "SP_asistencia")
        return 'addControlSP';

    if (pagina == "carnetizacion")
        return 'addCarnetizacion';
    if (pagina == "carnetCargo")
        return 'addctnzcargos';
    if (pagina == "sitios")
        return 'addModuloSitio';

    // SPT
    if (pagina == "SL_daf_certificaciones")
        return 'addDafCertificaciones';
    if (pagina == "marca")
        return 'addMarca';
    if (pagina == "Ubicacion")
        return 'addUbicacion';
    if (pagina == "producto")
        return 'addProducto';
    if (pagina == "tipoequipo")
        return 'addTipoEquipo';
    if (pagina == "unidadmedida")
        return 'addUnidadMedida';
    if (pagina == "equipo")
        return 'addEquipo';
 
    // BSA
    if (pagina == "vehiculo")
        return 'addVehiculo';
    if (pagina == "vehiculotipo")
        return 'addVehiculoTipo';
    if (pagina == "tipousuario")
        return 'addTipoUsuario';

    if (pagina == "bsaparametrosconfig")
        return 'addBsaParametrosConfig';


    // CUEM-MANEJO PESQUERO
    if (pagina == "appfdtdatospescador")
        return 'addPescador';
    if (pagina == "SL_cuem_manejopesquero")
        return 'addcuemManejopesquero';
    if (pagina == "infpetreos")
        return 'addinfoTecGestPet';
    if (pagina == "preguntas")
         return 'addpreguntas';

}

/*close modal*/
$("#modal-btn-no").on("click", function() {
    $("#mi-modal").modal('hide');
    return 0;
});

/*limpiar formulario*/
function clearForm(myFormElement) {

    var elements = myFormElement.elements;

    //myFormElement.reset();

    for (i = 0; i < elements.length; i++) {

        field_type = elements[i].type.toLowerCase();

        switch (field_type) {

            case "text":
            case "date":
            case "time":
            case "password":
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
}


/*validar password*/
$("input[type=password]").keyup(function() {
    var ucase = new RegExp("[A-Z]+");
    var lcase = new RegExp("[a-z]+");
    var num = new RegExp("[0-9]+");

    if ($("#password1").length) {
        if ($("#password1").val().length >= 8) {
            $("#8char").removeClass("glyphicon-remove");
            $("#8char").addClass("glyphicon-ok");
            $("#8char").css("color", "#00A41E");
        } else {
            $("#8char").removeClass("glyphicon-ok");
            $("#8char").addClass("glyphicon-remove");
            $("#8char").css("color", "#FF0004");
        }

        if (ucase.test($("#password1").val())) {
            $("#ucase").removeClass("glyphicon-remove");
            $("#ucase").addClass("glyphicon-ok");
            $("#ucase").css("color", "#00A41E");
        } else {
            $("#ucase").removeClass("glyphicon-ok");
            $("#ucase").addClass("glyphicon-remove");
            $("#ucase").css("color", "#FF0004");
        }

        if (lcase.test($("#password1").val())) {
            $("#lcase").removeClass("glyphicon-remove");
            $("#lcase").addClass("glyphicon-ok");
            $("#lcase").css("color", "#00A41E");
        } else {
            $("#lcase").removeClass("glyphicon-ok");
            $("#lcase").addClass("glyphicon-remove");
            $("#lcase").css("color", "#FF0004");
        }

        if (num.test($("#password1").val())) {
            $("#num").removeClass("glyphicon-remove");
            $("#num").addClass("glyphicon-ok");
            $("#num").css("color", "#00A41E");
        } else {
            $("#num").removeClass("glyphicon-ok");
            $("#num").addClass("glyphicon-remove");
            $("#num").css("color", "#FF0004");
        }

        if ($("#password1").val() == $("#password2").val()) {
            $("#pwmatch").removeClass("glyphicon-remove");
            $("#pwmatch").addClass("glyphicon-ok");
            $("#pwmatch").css("color", "#00A41E");
        } else {
            $("#pwmatch").removeClass("glyphicon-ok");
            $("#pwmatch").addClass("glyphicon-remove");
            $("#pwmatch").css("color", "#FF0004");
        }

    } else {
        if ($("#password12").val().length >= 8) {
            $("#8char").removeClass("glyphicon-remove");
            $("#8char").addClass("glyphicon-ok");
            $("#8char").css("color", "#00A41E");
        } else {
            $("#8char").removeClass("glyphicon-ok");
            $("#8char").addClass("glyphicon-remove");
            $("#8char").css("color", "#FF0004");
        }

        if (ucase.test($("#password12").val())) {
            $("#ucase").removeClass("glyphicon-remove");
            $("#ucase").addClass("glyphicon-ok");
            $("#ucase").css("color", "#00A41E");
        } else {
            $("#ucase").removeClass("glyphicon-ok");
            $("#ucase").addClass("glyphicon-remove");
            $("#ucase").css("color", "#FF0004");
        }

        if (lcase.test($("#password12").val())) {
            $("#lcase").removeClass("glyphicon-remove");
            $("#lcase").addClass("glyphicon-ok");
            $("#lcase").css("color", "#00A41E");
        } else {
            $("#lcase").removeClass("glyphicon-ok");
            $("#lcase").addClass("glyphicon-remove");
            $("#lcase").css("color", "#FF0004");
        }

        if (num.test($("#password12").val())) {
            $("#num").removeClass("glyphicon-remove");
            $("#num").addClass("glyphicon-ok");
            $("#num").css("color", "#00A41E");
        } else {
            $("#num").removeClass("glyphicon-ok");
            $("#num").addClass("glyphicon-remove");
            $("#num").css("color", "#FF0004");
        }

        if ($("#password12").val() == $("#password22").val()) {
            $("#pwmatch").removeClass("glyphicon-remove");
            $("#pwmatch").addClass("glyphicon-ok");
            $("#pwmatch").css("color", "#00A41E");
        } else {
            $("#pwmatch").removeClass("glyphicon-ok");
            $("#pwmatch").addClass("glyphicon-remove");
            $("#pwmatch").css("color", "#FF0004");
        }
    }
});

/*actualizar password app*/
function guardarPass() {
    cont = 0;
    $('.glyphicon-remove').each(function() {
        cont++;
    });
    //console.log(cont);
    if (cont > 0) {
        $("#validacionPass").show();
        $("#validacionPass").html();
        $("#validacionPass").html("Por favor Verifique su contraseña");
        $("#validacionPass").css("color", "#FF0004");
        return 0;
    } else {

        console.log("change pass");
        //datos ='{"usuario":"admin","pass":"'+$("#password1").val()+'"}';
        $.ajax({
            type: "POST",
            url: "change_password",
            data: {
                "usuario": $("#user").val(),
                "pass": $("#password1").val()
            },
            success: function(salida) {
                if (salida == "OK") {
                    $("#validacionPass").show();
                    $("#validacionPass").html();
                    $("#validacionPass").html("Contraseña Actualizada con Exito");
                    $("#validacionPass").css("color", "rgb(0, 164, 30)");
                    window.location.href = '/logout';
                } else {
                    $("#validacionPass").show();
                    $("#validacionPass").html();
                    $("#validacionPass").html("Error: " + salida);
                    $("#validacionPass").css("color", "red");
                    return 0;
                }
            },
            error: function(salida) {
                $("#validacionPass").show();
                $("#validacionPass").html();
                $("#validacionPass").html("Error: Por favor Verifique los datos");
                $("#validacionPass").css("color", "red");
                return 0;
            },
        });

    }

}
/*actualizar password home*/
function guardarPass2() {
    cont = 0;
    $('.glyphicon-remove').each(function() {
        cont++;
    });
    //console.log(cont);
    if (cont > 0) {
        $("#validacionPass").show();
        $("#validacionPass").html();
        $("#validacionPass").html("Por favor Verifique su contraseña");
        $("#validacionPass").css("color", "#FF0004");
        return 0;
    } else {

        console.log("change pass");
        //datos ='{"usuario":"admin","pass":"'+$("#password1").val()+'"}';
        $.ajax({
            type: "POST",
            url: "change_password",
            data: {
                "usuario": $("#user2").val(),
                "pass": $("#password12").val()
            },
            success: function(salida) {
                if (salida == "OK") {
                    $("#validacionPass").show();
                    $("#validacionPass").html();
                    $("#validacionPass").html("Contraseña Actualizada con Exito");
                    $("#validacionPass").css("color", "rgb(0, 164, 30)");
                    window.location.href = '/logout';
                } else {
                    $("#validacionPass").show();
                    $("#validacionPass").html();
                    $("#validacionPass").html("Error: " + salida);
                    $("#validacionPass").css("color", "red");
                    return 0;
                }
            },
            error: function(salida) {
                $("#validacionPass").show();
                $("#validacionPass").html();
                $("#validacionPass").html("Error: Por favor Verifique los datos");
                $("#validacionPass").css("color", "red");
                return 0;
            },
        });

    }

}

function cambiarPassword(){
    console.log(">>>>>>>> cambiarPassword");
    name = $("#nombre_usuario").html();
    console.log("nombre de usuario: " + name);

    cont = 0;
    $('.glyphicon-remove').each(function() {
        cont++;
    });
    //console.log(cont);
    if (cont > 0) {
        $("#validacionPassw").show();
        $("#validacionPassw").html();
        $("#validacionPassw").html("Por favor Verifique su contraseña");
        $("#validacionPassw").css("color", "#FF0004");
        return 0;
    } else {
        $.ajax({
            type: "POST",
            url: "cambiar_password",
            data: {
                "nombreusuario": name,
                "pass": $("#password1").val()
            },
            success: function(salida) {
                if (salida == "OK") {
                    $("#validacionPassw").show();
                    $("#validacionPassw").html();
                    $("#validacionPassw").html("Contraseña Actualizada con Exito");
                    $("#validacionPassw").css("color", "rgb(0, 164, 30)");
                    window.location.href = '/password_reset_done';
                } else {
                    $("#validacionPassw").show();
                    $("#validacionPassw").html();
                    $("#validacionPassw").html("Error: " + salida);
                    $("#validacionPassw").css("color", "red");
                    return 0;
                }
            },
            error: function(salida) {
                $("#validacionPassw").show();
                $("#validacionPassw").html();
                $("#validacionPassw").html("Error: Por favor Verifique los datos");
                $("#validacionPassw").css("color", "red");
                return 0;
            },
        });
    }
}

/*limpiar form pass app*/
function limpiarFormPass(usuario) {
    $("#validacionPass").hide();
    clearForm(frm_pass);
    $("#user").val(usuario);
}

/*limpiar form pass home*/
function limpiarFormPass2(usuario) {
    $("#validacionPass").hide();
    clearForm(frm_pass);
    $("#user2").val(usuario);
}
/**/

/*funcion para generar las tablas en excel botones de las paaginas*/
function generarExcel(tabla, num_colum, textoCab) {
    tablaC = "";
    if (textoCab)
        textoCab = textoCab;
    else
        textoCab = 'DPNG';

    var data = $('#' + tabla).DataTable().rows().data();
    data.each(function(value, index) {

        tablaC += "<tr>";
        for (i = 0; i < num_colum; i++) {
            tablaC += "<td style='border: 1px solid black;'>" + value[i] + "</td>";
        }
        tablaC += "</tr>";
    });

    //tablaC = tablaC.replace("<i class='fa fa-check'></i>", "<p>&#10003;</p>");<i class="fa fa-check"></i>

    //var cadreplace = /<i class='fa fa-check'><\/i>/g; 
    tablaC = tablaC.replace(/<i class="fa fa-check"><\/i>/g, '1');

    //console.log(tablaC);

    tablaF = "<table>";
    tablaF += "<tr style='background-color:#3c8dbc;color: white;'>";
    for (i = 0; i < num_colum; i++) {
        var title = $('#' + tabla).DataTable().column(i).header();
        tablaF += "<th style='text-align:center;'>" + $(title).html() + "</th>";
    }
    tablaF += "</tr>";
    tablaF += "<tbody>";
    tablaF += tablaC;
    tablaF += "</tbody>";
    tablaF += "</table>";

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

    //if (!table.nodeType) table = document.getElementById(table)
    //var ctx = {worksheet: name || 'Worksheet', table: '<table style="border: 1px solid black;"><tr style="height:60px;text-align:center;"><th style=""position:fixed;rigth:0%;margin-left:30px;text-align:center;"><img src="image/favicon.ico" style="position:fixed;rigth:0%;" width="5%"></th><th colspan="'+(num_colum-1)+'">'+textoCab+'</th></table>'+"<a></a>"+tablaF}
    var ctx = {
        worksheet: name || 'Worksheet',
        table: '<table style="border: 1px solid black;"><tr style="height:60px;text-align:center;"><th style=""position:fixed;rigth:0%;margin-left:30px;text-align:center;"> </th> <th colspan="' + (num_colum - 1) + '">' + textoCab + '</th></table>' + "<a></a>" + tablaF
    }
    window.location.href = uri + base64(format(template, ctx))
}

/*funcion para generar pdf boton de la pagina*/
function generarPdf(tabla, num_colum, orientacion) {

    if (orientacion)
        ori = "landscape";
    else
        ori = "portrait";
    //var tablaC = $('#'+tabla).prop('outerHTML');
    tablaC = "";
    var data = $('#' + tabla).DataTable().rows().data();
    data.each(function(value, index) {

        tablaC += "<tr>";
        for (i = 0; i < num_colum; i++) {
            tablaC += "<td style='border: 1px solid black;'>" + value[i] + "</td>";
        }
        //tablaC += "<td style='border: 1px solid black;'>"+value[1]+"</td>";
        tablaC += "</tr>";
    });

    tablaF = "<table>";
    tablaF += "<tr style='background-color:#3c8dbc;color: white;'>";
    for (i = 0; i < num_colum; i++) {
        var title = $('#' + tabla).DataTable().column(i).header();
        tablaF += "<th style='text-align:center;'>" + $(title).html() + "</th>";
    }
    tablaF += "</tr>";
    tablaF += "<tbody>";
    tablaF += tablaC;
    tablaF += "</tbody>";
    tablaF += "</table>";
    filename = 'report.pdf';
    html2pdf('<div><table style="width:100%;"><tr style="height:60px;text-align:center;"><th style="text-align:center;"><img src="static/image/reportes/cabecera.jpg" width="100%"></th></table></div><br><br><div style="" align="center">' + tablaF + '</div>', {
        margin: [0.20, 0.40, 0.20, 0.20],
        filename: filename,
        html2canvas: {
            scale: 2,
            letterRendering: true
        },
        jsPDF: {
            unit: 'in',
            format: 'a4',
            orientation: ori
        }
    });
}

/*funcion para generar las tablas en pdf botones de las paaginas*/
function generarPdf2() {
    const element = document.getElementById("section_rep");
    filename = 'report_accionPer.pdf'

    html2pdf(element, {
        margin: [0.20, 0.40, 0.20, 0.20],
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


/*cambiar el valor del select dependiendo del padre*/
function cambiarComboPaisBase(idselect, pais) {
    /*idselect = objeto al q se le realizara la actualizacion de los option*/
    console.log("base");
    $.ajax({
        url: "getCiudadXpais",
        type: "get",
        data: {
            "data": pais
        },
        dataType: "json",
        async: false,

        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
            } else {

                option = '<option value=""> Seleccione una opcion</option>';
                if (data.length > 0) {
                    for (i = 0; i < data.length; i++) {
                        option += "<option value='" + data[i].id + "'>" + data[i].ciudad + "</option>";
                    }
                }

                $("#" + idselect).select2('destroy');
                $('#' + idselect + ' option').remove();
                $("#" + idselect).append(option);
                $("#" + idselect).select2({
                    sorter: data => data.sort((a, b) => a.text.localeCompare(b.text)),
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

/*cambiar el valor del select dependiendo del padre*/
function cambiarComboPais(idselect, pais) {
    /*idselect = objeto al q se le realizara la actualizacion de los option*/
    var ciudades = JSON.parse(sessionStorage.getItem("ciudades"));
    var data_filter = ciudades.filter(element => element.pais_id == pais);
    option = '<option value=""> Seleccione una opcion</option>';
    $.each(data_filter, function(i, item) {
        option += "<option value='" + data_filter[i].id + "'>" + data_filter[i].ciudad + "</option>";
    })
    $("#" + idselect).select2('destroy');
    $('#' + idselect + ' option').remove();
    $("#" + idselect).append(option);
    $("#" + idselect).select2();
}

/*cambiar el valor del select dependiendo del padre*/
function cambiarComboCantones(idselect, provincia) {
    var cantones = JSON.parse(sessionStorage.getItem("cantones"));
    var data_filter = cantones.filter(element => element.provincia_id == provincia);
    option = '<option value=""> Seleccione una opcion</option>';
    $.each(data_filter, function(i, item) {
        option += "<option value='" + data_filter[i].id + "'>" + data_filter[i].nombre + "</option>";
    })
    $("#" + idselect).select2('destroy');
    $('#' + idselect + ' option').remove();
    $("#" + idselect).append(option);
    $("#" + idselect).select2();
}

/*cambiar el valor del select dependiendo del padre*/
function cambiarComboParroquias(idselect, canton) {
    var parroquias = JSON.parse(sessionStorage.getItem("parroquiasT"));
    var data_filter = parroquias.filter(element => element.canton_id == canton);
    option = '<option value=""> Seleccione una opcion</option>';
    $.each(data_filter, function(i, item) {
        option += "<option value='" + data_filter[i].id + "'>" + data_filter[i].nombre + "</option>";
    })
    $("#" + idselect).select2('destroy');
    $('#' + idselect + ' option').remove();
    $("#" + idselect).append(option);
    $("#" + idselect).select2();
}

/*iniciar el combo*/
function iniciarCombo(combo, compara, itemSession) {
    /*compara t = padre f = n/a(ambas acciones se usa cuando no se necesita filtrar el arreglo) */

    var items = JSON.parse(sessionStorage.getItem(itemSession));
    if ((compara == "f") || (compara == "t"))
        var data_filter = items;
    else
        var data_filter = items.filter(element => element.categoria == compara);

    var idx = 1; // key2
    var idx2 = 2; // key2

    option = '<option value=""> Seleccione una Opcion</option>';

    $.each(data_filter, function(i, item) {
        var key = Object.keys(data_filter[i])[idx];
        var key2 = Object.keys(data_filter[i])[idx2];
        if (compara == "t")
            option += "<option value='" + data_filter[i].id + "' padre='" + data_filter[i][key2] + "'>" + data_filter[i][key] + "</option>";
        else {
            if (itemSession == 'catalogos')
                option += "<option value='" + data_filter[i].id + "' valor='" + data_filter[i].valor + "'>" + data_filter[i].label + "</option>";
            else if (itemSession == 'enfermedades')
                option += "<option value='" + data_filter[i].id + "'>" + data_filter[i].descripcion + "</option>";
            else
                option += "<option value='" + data_filter[i].id + "'>" + data_filter[i][key] + "</option>";
        }
    })

    $('#' + combo + ' option').remove();
    $("#" + combo).append(option);
    $("#" + combo).select2();
}

/*iniciar el combo*/
function iniciarComboDirecciones(combo, compara, item) {
    var items = JSON.parse(sessionStorage.getItem(item));
    var data_filter = items.filter(element => element.tipo == compara);
    option = '<option value=""> Seleccione una Opcion</option>';
    $.each(data_filter, function(i, item) {
        option += "<option value='" + data_filter[i].id + "' padre='" + data_filter[i].parentid + "'>" + data_filter[i].name + "</option>";
    })

    $('#' + combo + ' option').remove();
    $("#" + combo).append(option);
    $("#" + combo).select2();
}

/*cambiar el valor del select dependiendo del padre*/
function cambiarComboinfo(idselect, valor, item, padre, campoLabel) {
    /*padre es el nombre del key dentro del json*/
    var items = JSON.parse(sessionStorage.getItem(item));
    if (item == 'direcciones')
        var data_filter = items.filter(element => element.parentid == valor);
    else
        var data_filter = items.filter(element => element[padre].id == valor);

    var idx = 1; // key2

    option = '<option value=""> Seleccione una Opcion</option>';

    $.each(data_filter, function(i, item) {
        var key = Object.keys(data_filter[i])[idx];
        option += "<option value='" + data_filter[i].id + "'>" + data_filter[i][campoLabel] + "</option>";
    })

    $('#' + idselect + ' option').remove();
    $("#" + idselect).append(option);
    $("#" + idselect).select2();

}

/*cambiar el valor del select dependiendo del padre*/
function cambiarComboinfo2(idselect, valor, item, padre, campoLabel) {
    /*padre es el nombre del key dentro del json*/
    var items = JSON.parse(sessionStorage.getItem(item));

    var data_filter = items.filter(element => element[padre] == valor);

    var idx = 1; // key2

    option = '<option value=""> Seleccione una Opcion</option>';

    $.each(data_filter, function(i, item) {
        var key = Object.keys(data_filter[i])[idx];
        option += "<option value='" + data_filter[i].id + "'>" + data_filter[i][campoLabel] + "</option>";
    })

    $('#' + idselect + ' option').remove();
    $("#" + idselect).append(option);
    $("#" + idselect).select2();

}

/*cambiar el valor del select dependiendo del padre*/
function cambiarComboinfoParr(idselect, id, item, selectP) {

    direccion = $("#" + selectP + " option[value='" + id + "']").attr('padre');
    var items = JSON.parse(sessionStorage.getItem(item));
    var data_filter = items.filter(element => element.canton_id == direccion);
    option = '';
    $.each(data_filter, function(i, item) {
        option += "<option value='" + data_filter[i].id + "'>" + data_filter[i].nombre + "</option>";
    })

    $('#' + idselect + ' option').remove();
    $("#" + idselect).append(option);
    $("#" + idselect).select2();
}

/*obtiene los datos del session storage*/
function getDataArraySession(itemSession, idCompara) {
    if (idCompara != "null") {
        var items = JSON.parse(sessionStorage.getItem(itemSession));
        var data_filter = items.filter(element => element.id == idCompara);
        if (data_filter.length > 0) {
            var idx = 1; // key2
            var key = Object.keys(data_filter[0])[idx];
            return data_filter[0][key];
        } else return '';
    } else return '';
}

/*limpiar tabla del popup de funcionario personas*/
function cleanBodyTablePersona() {
    $('#tabla_PopupPersonaF').dataTable().fnClearTable();
    $('#tabla_PopupPersonaF').dataTable().fnDestroy();
    $("#body_PopupPersonaF").html("");
}


/*funcion para realizar las restas de fechas*/
function restarFechas(fecha_pasada, fecha_futura) { //función calcular

    var total_dias = 0;
    var total_meses = 0;
    var total_anhos = 0;
    var b = 0; //variable para finales de mes

    if (fecha_pasada.getMonth() == 2) { //mes de febrero
        //if para saber si el año es bisiesto
        if ((fecha_futura.getYear() % 4 == "" && fecha_futura.getYear() % 100 != "") || fecha_futura.getYear() % 400 == "") {
            b = 29; //año bisiesto
        } else {
            b = 28; //año no bisiesto
        }
    } else if (fecha_pasada.getMonth() <= 7) { //meses hasta julio
        if (fecha_pasada.getMonth() == "") {
            b = 31;
        } else if (fecha_pasada.getMonth() % 2 == "") {
            b = 30;
        } else {
            b = 31;
        }
    } else if (fecha_pasada.getMonth() > 7) { //meses de Agosto a diciembre
        if (fecha_pasada.getMonth() % 2 == "") { //si el més es divisible entre dos tiene 31 dias
            b = 31;
        } else {
            b = 30;
        }
    }

    //controlamos que la fecha de inicio no sea mayor que la fecha final
    if (fecha_pasada.getYear() > fecha_futura.getYear() || (fecha_pasada.getYear() == fecha_futura.getYear() && fecha_pasada.getMonth() > fecha_futura.getMonth) || (fecha_pasada.getYear() == fecha_futura.getYear() && fecha_pasada.getMonth() == fecha_futura.getMonth() && fecha_futura.getDate() == fecha_pasada.getDate())) {
        $('#total').html("La fecha de inicio ha de ser anterior a la fecha Actual");
        return false;
    } else {
        //si la fecha es correcta
        if (fecha_pasada.getMonth() <= fecha_futura.getMonth()) {
            total_anhos = fecha_futura.getYear() - fecha_pasada.getYear();
            if (fecha_pasada.getDate() <= fecha_futura.getDate()) {
                total_meses = fecha_futura.getMonth() - fecha_pasada.getMonth();
                total_dias = fecha_futura.getDate() - fecha_pasada.getDate();
            } else {
                if (fecha_futura.getMonth() == fecha_pasada.getMonth()) {
                    total_anhos = total_anhos - 1;
                }
                total_meses = (fecha_futura.getMonth() - fecha_pasada.getMonth() - 1 + 12) % 12;
                total_dias = b - (fecha_pasada.getDate() - fecha_futura.getDate());
            }
        } else {
            total_anhos = fecha_futura.getYear() - fecha_pasada.getYear() - 1;
            if (fecha_pasada.getDate() > fecha_futura.getDate()) {
                total_meses = fecha_futura.getMonth() - fecha_pasada.getMonth() - 1 + 12;
                total_dias = b - (fecha_pasada.getDate() - fecha_futura.getDate());
            } else {
                total_meses = fecha_futura.getMonth() - fecha_pasada.getMonth() + 12;
                total_dias = fecha_futura.getDate() - fecha_pasada.getDate();
            }
        }

    }
    return total_anhos + "-" + total_meses;
}

/*funcion para obtener los chek input checked*/
function getchecked(mydiv) {
    // Get checked values
    var selected = new Array();
    $("#" + mydiv + " input:checked").each(function() {
        selected.push($(this).val());
    });
    // convert to a string
    var mystring = selected.join("|");
    return mystring;
}

/*funcion para verificar un campo nulo string*/
function valor_nulo_str(arg) {
    if (arg == null || arg == undefined || arg == "") {
        return "";
    } else {
        return arg.toString();
    }
}



/*funcion para verificar un campo nulo int*/
function valor_nulo_int(valor) {
    var txt = "";

    if (valor == null || valor == undefined || valor == "") {
        txt = 0;

    } else {
        txt = valor;
    }
    return txt;
}

/*funcion para configurar formato de una fecha*/
function set_format_date(fecha) {

    if (fecha == null || fecha == undefined || fecha == "") {
        return null;

    } else {
        var d = new Date(fecha);

        var date = d.getDate() + 1;
        var month = d.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
        var year = d.getFullYear();

        return year + "-" + month + "-" + date;

    }

}

/*funcion para configurar valor maximo de una fecha*/
function set_config_fecha(fecha) {
    console.log(" ******* set_config_fecha ******");
    try {
        $(fecha).attr("max", "9999-01-01");

    } catch (e) {
        console.log("error set_config_fecha: " + e);
    }

}

/*funcion para validar q la fecha 1 sea mayor a fecha 2*/
function set_validacion_fecha(id_fecha_desde, id_fecha_hasta) {
    console.log(" ******* set_validacion_fecha ******");
    try {
        f1 = $(id_fecha_desde).val();
        f2 = $(id_fecha_hasta).val();

        f1_label = $(id_fecha_desde).attr("text");
        f2_label = $(id_fecha_hasta).attr("text");

        if (Date.parse(f1) && Date.parse(f2)) {
            var fe_desde = new Date(f1);
            var fe_hasta = new Date(f2);

            if (fe_desde > fe_hasta) {
                alert("Error: " + f2_label + " debe ser mayor a " + f1_label);
                $(id_fecha_hasta).val("");
                $(id_fecha_hasta).focus();
            }

        }
    } catch (e) {
        console.log("error set_validacion_fecha: " + e);
    }

}

/*funcion para cambiar el formato de una fecha*/
function convertDateFormat(string) {
    var info = string.split('/').reverse().join('-');
    return info;
}

/*funcion para convertir letras a formato titulo*/
function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

function intFilterTabla(id, data, dataDisable) {
    div = '';
    for (i = 0; i < data.length; i++) {
        console.log(data[i]);
        resp = $.inArray(i, dataDisable);
        div += '<label class="toggle-vis" data-column="' + i + '">';
        if (resp == -1) {
            div += '<div class="icheckbox_flat-green checked" aria-checked="true" aria-disabled="false" style="position: relative;">';
            div += '<input type="checkbox" class="flat-red" data-column="0" checked="" style="position: absolute; opacity: 0;"><ins class="iCheck-helper" style="position: absolute; top: 0%; left: 0%; display: block; width: 100%; height: 100%; margin: 0px; padding: 0px; background: rgb(255, 255, 255); border: 0px; opacity: 0;"></ins></div>';
        } else {
            div += '<div class="icheckbox_flat-green " aria-checked="false" style="position: relative;">';
            div += '<input type="checkbox" class="flat-red" style="position: absolute; opacity: 0;"><ins class="iCheck-helper" style="position: absolute; top: 0%; left: 0%; display: block; width: 100%; height: 100%; margin: 0px; padding: 0px; background: rgb(255, 255, 255); border: 0px; opacity: 0;"></ins></div>';
        }
        div += data[i];
        div += '</label><br>';
    }
    $("#" + id).append(div);
}

/*funcion para validar que solo se ingrese  numeros en el input*/
function isNumberKey(event) {
    //var charCode = (evt.which) ? evt.which : evt.keyCode
    //return !(charCode > 31 && (charCode < 48 || charCode > 57));
    var key = window.event ? event.keyCode : event.which;
    if (event.keyCode === 8 || event.keyCode === 46) {
        return true;
    } else if (key < 48 || key > 57) {
        return false;
    } else {
        return true;
    }
}


/*Freddy Lituma
/*funcion para validar que solo se ingrese  letras en el input*/
function isletterKey(event) {
    var key = window.event ? event.keyCode : event.which;
    if (event.keyCode === 8) {
        return true;
    } else if ((key < 65 || key > 90) && (key < 97 || key > 122)) {
        return false;
    } else {
        return true;
    }
}

/*Freddy Lituma
/*funcion para validar que solo se ingrese numeros sin el punto en el input*/
function isOnlyNumberKey(event) {
    var key = window.event ? event.keyCode : event.which;
    if (event.keyCode === 8) {
        return true;
    } else if (key < 48 || key > 57) {
        return false;
    } else {
        return true;
    }
}

/*funcion para completar ceros a la izquierda*/
function completarConCeros(number, width) {
    var numberOutput = Math.abs(number); /* Valor absoluto del número */
    var length = number.toString().length; /* Largo del número */ 
    var zero = "0"; /* String de cero */  
    
    if (width <= length) {
        if (number < 0) {
             return ("-" + numberOutput.toString()); 
        } else {
             return numberOutput.toString(); 
        }
    } else {
        if (number < 0) {
            return ("-" + (zero.repeat(width - length)) + numberOutput.toString()); 
        } else {
            return ((zero.repeat(width - length)) + numberOutput.toString()); 
        }
    } 
    
    return true;
    

}

/*
* Funcion: mask_money.
* Descripcion:  Coloca una mascara de dinero al campo que se envia.
* Parametros:
*   - param(String): B(Borrador),INICIAR_TRAMITE(Inicia el tramite).
*   - prefijo(String): Prefijo del formulario ''(IniciarTramite), BE(BandejaEntrada),ET(Estado Tramite)     
*/
function mask_money(item,id_valor, id_etiqueta){
    console.log("******** mask_money ******* ");
    valor = parseFloat(item.replace(/,/g, ""))
                    .toFixed(2)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    $('#'+id_etiqueta).val(valor);
    
    document.getElementById(id_valor).value = valor.replace(/,/g, "")

}


/*obtine los funcionarios segun el nombre de busqueda y la pagina que envia la solicitud*/
function getDataPersonaFuncionarioPop() {
    nombre = $("#nombresPopupPer").val();
    pagina = $("#pagina_enviaPopPer").val();

    $('#tabla_PopupPersonaF').dataTable().fnClearTable();
    $('#tabla_PopupPersonaF').dataTable().fnDestroy();

    $("#body_PopupPersonaF").html("");
    var table = $('#tabla_PopupPersonaF').DataTable({

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
                        //if (pagina == "personas") {
                            if (data[i].perfuncionario.length == 0) {
                                tabla += "<tr>";
                                tabla += "<td align='left'>" + data[i].identificacion + "</td>";
                                tabla += "<td align='left'>" + data[i].nombre_completo + "</td>";
                                tabla += '<td align="center"><textarea id="td_perfuncionario_' + i + '" hidden>' + JSON.stringify(data[i]) + '</textarea> <a style="cursor: pointer; font-size: 15px;" title="Buscar" data-close-stackbox="true" onClick="getDataPersonaFuncionario2(' + i + ',\'' + pagina + '\');"><i class="fa fa-plus-circle text-blue"></i></a></td>';
                                tabla += "</tr>";
                          /*  }
                        }
                        if (pagina == "personas2") {
                            tabla += "<tr>";
                            tabla += "<td align='left'>" + data[i].identificacion + "</td>";
                            tabla += "<td align='left'>" + data[i].nombre_completo + "</td>";
                            tabla += '<td align="center"><textarea id="td_perfuncionario_' + i + '" hidden>' + JSON.stringify(data[i]) + '</textarea> <a style="cursor: pointer; font-size: 15px;" title="Buscar" data-close-stackbox="true" onClick="getDataPersonaFuncionario2(' + i + ',\'' + pagina + '\');"><i class="fa fa-plus-circle text-blue"></i></a></td>';
                            tabla += "</tr>";
                        }
                        if (pagina == "mpetreo") {
                            tabla += "<tr>";
                            tabla += "<td align='left'>" + data[i].identificacion + "</td>";
                            tabla += "<td align='left'>" + data[i].nombre_completo + "</td>";
                            tabla += '<td align="center"><textarea id="td_perfuncionario_' + i + '" hidden>' + JSON.stringify(data[i]) + '</textarea> <a style="cursor: pointer; font-size: 15px;" title="Buscar" data-close-stackbox="true" onClick="getDataPersonaFuncionario2(' + i + ',\'' + pagina + '\');"><i class="fa fa-plus-circle text-blue"></i></a></td>';
                            tabla += "</tr>";
                        }*/}
                    }
                }

                $('#tabla_PopupPersonaF').dataTable().fnClearTable();
                $('#tabla_PopupPersonaF').dataTable().fnDestroy();

                $("#body_PopupPersonaF").html("");
                $("#body_PopupPersonaF").append(tabla);

                var table = $('#tabla_PopupPersonaF').DataTable({

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
function getDataPersonaFuncionario2(idx, pagina) {
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
    if (pagina == 'proveedor_equipos')
        getDataProvEquipos(json);
    if (pagina == 'dueno_equipos')
        getDataDuenoEquipos(json);
    if (pagina == 'proveedor_mantenimiento')
        getDataProveedorMantenimiento(json);

    
}

/*Datos de Material Petreo*/
function getDataProvEquipos(json) { 
    console.log(111);
    $("#idproveedorEquipoST").val(json[0].id);
    $("#proveedorEquipoST").val(json[0].nombre_completo);
    $("#cedproveedorEquipoST").val(json[0].identificacion);

}

function getDataProveedorMantenimiento(json) { 
    console.log(111);
    $("#idprovmanSolservST").val(json[0].id);
    $("#provmanSolservST").val(json[0].nombre_completo);
    $("#cedprovmanSolservST").val(json[0].identificacion);

}

/*Datos de Material Petreo*/
function getDataDuenoEquipos(json) { 
    console.log(111);
    $("#idduenoEquipoST").val(json[0].id);
    $("#duenoEquipoST").val(json[0].nombre_completo);
    $("#cedduenoEquipoST").val(json[0].identificacion);

}

/*funcion para mapear los datos del funcionario en el formulario de personas*/
function getDataPersonasFunc(json) {

    if (json[0].perfuncionario.length > 0) $("#idfuncionarioP").val(json[0].perfuncionario[0].id);
    else $("#idfuncionarioP").val("");
    $("#idpersonaP").val(json[0].id);

    $("#num_cedpers").val(json[0].identificacion);
    $("#nombres_pers").val(json[0].nombres);
    $("#apellidos_pers").val(json[0].apellidos);

    $('#StipoIdPers [valor="' + json[0].tipo_identificacion + '"]').prop("selected", true).trigger("change");
    $('#STipoPers [valor="' + json[0].tipo_persona + '"]').prop("selected", true).trigger("change");
    $('#SsexoPers [valor="' + json[0].sexo + '"]').prop("selected", true).trigger("change");

    $("#telefono_pers").val(json[0].telefono_convencional);
    $("#celular_pers").val(json[0].telefono_celular);

    $("#numRes_pers").val(json[0].numero_residencia);
    $('#SEstCivilPers [valor="' + json[0].estado_civil + '"]').prop("selected", true).trigger("change");
    /*nacimineto*/

    $('#SpaisPers').val(json[0].pais_nacimiento_id).trigger("change");
    $('#SciudadPers').val(json[0].ciudad_nacimiento_id).trigger("change");
    $("#fechaNac_pers").val(json[0].fecha_nacimiento);
    $('#StipoSangrePers [valor="' + json[0].tipo_sangre + '"]').prop("selected", true).trigger("change");

    /*escolaridad*/
    $('#SnivelPers [valor="' + json[0].nivel_escolaridad + '"]').prop("selected", true).trigger("change");
    $('#SgradoPers [valor="' + json[0].grado_acedemico + '"]').prop("selected", true).trigger("change");
    $("#titulo1Pers").val(json[0].formacion_academica);
    $("#titulo2Pers").val(json[0].formacion_academica_opcional);
    $("#libretaPers").val(json[0].libreta_militar);

    /*direccion domiciliaria*/
    $('#SprovPers').val(json[0].provincia_residencia_id).trigger("change");
    $('#ScantonPers').val(json[0].canton_residencia_id).trigger("change");
    $('#SparroqPers').val(json[0].parroquia_residencia_id).trigger("change");

    $("#barrioPers").val(json[0].barrio);
    $("#callepPers").val(json[0].calle_principal);
    $("#callesPers").val(json[0].calle_secundaria);
    $("#calleRefPers").val(json[0].referencia);

    if (json[0].perfuncionario.length > 0) {
        if (json[0].perfuncionario[0].direccion_estatuto_id != null)
            $("#direccionPer").val(json[0].perfuncionario[0].direccion_estatuto_id.name);
        else
            $("#direccionPer").val("");
        if (json[0].perfuncionario[0].proceso_estatuto_id != null)
            $("#procesoPer").val(json[0].perfuncionario[0].proceso_estatuto_id.name);
        else
            $("#procesoPer").val("");
        if (json[0].perfuncionario[0].subproceso_estatuto_id != null)
            $("#subprocesoPer").val(json[0].perfuncionario[0].subproceso_estatuto_id.name);
        else
            $("#subprocesoPer").val("");

        $("#telinstPer").val(json[0].perfuncionario[0].telefono_institucional);
        $("#extTelPer").val(json[0].perfuncionario[0].extension_telefonica);
        $("#emailPer").val(json[0].perfuncionario[0].email);
        $("#anioNomPer").val(json[0].perfuncionario[0].anio_nombramiento);
    }
}


/*funcion para mapear los datos del funcionario en el formulario de funcionario familiares*/
function getDataFuncFamiliar(json) {
    $("#idpersonaP2").val(json[0].id);
    $("#num_cedpers2").val(json[0].identificacion);
    $("#nombres_pers2").val(json[0].nombres);
    $("#apellidos_pers2").val(json[0].apellidos);

    $('#StipoIdPers2 [valor="' + json[0].tipo_identificacion + '"]').prop("selected", true).trigger("change");
    $('#STipoPers2 [valor="' + json[0].tipo_persona + '"]').prop("selected", true).trigger("change");
    $('#SsexoPers2 [valor="' + json[0].sexo + '"]').prop("selected", true).trigger("change");
    $("#fechaNac_pers2").val(json[0].fecha_nacimiento);

    $("#num_residenpers2").val(json[0].numero_residencia);
}


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

/*fin generales*/