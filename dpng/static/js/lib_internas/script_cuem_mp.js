/*CUEM MANEJO PESQUERO*/

var path_archivos_cert_ = 'static/media/cuem_mpesq/';  

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
/* fin codigo para agregar pestañas al contenedor*/

/*
* Funcion: limpiarFormPescador
* Descripcion: Borra contenido de todos los campos del formulario.
* Parametros:
*   - formulario(String): Nombre del formulario.              
*/
function limpiarFormPescador() {
    console.log("********** limpiarFormPescador **********");
    $("#tipotPescador").val(0); // bandera -> 0 Insertar, 1 Actualizar

    $("#fld_identificacion").val("");
    $("#fld_nombres").val("");
    $("#fld_apellidos").val("");
    $("#fld_sexo").val("");
    $("#fld_fecha_nac").val("");
    $("#fld_instruc_academ").val("");
    $("#fld_c_nresidencia").val("");
    $("#fld_c_nhijos").val("");
    $("#fld_c_apodo").val("");
    $("#fld_pais").val("");
    $("#fld_provincia").val("");
    $("#fld_ciudadnacimiento").val("");
    $("#fld_islaresidencia").val("");
    $("#fld_direccion").val("");
    $("#fld_telefono").val("");
    $("#fld_celular").val("");
    $("#fld_email").val("");
    $("#fld_matricula_digmer").val("");
    $("#fld_cargo_matricula").val("");
    $("#fld_ingreso_motivo").val("");
    $("#fld_cooperativa").val("");
    $("#fld_categoriaP").val("");
    $("#fld_esp_laboral").val("");
    $("#fld_pesc_ante_ident").val("");
    $("#fld_pesc_ante_nombres").val("");
    $("#fld_pesc_ante_apellidos").val("");
    $("#fld_cooperativa_anterior").val("");
    $("#fld_licParma").val("");
    $("#fld_licParma_anter").val("");
    $("#fld_no_proceso").val("");
    $("#fld_tipolicenciaguia").val("");
    $("#fld_estado_pescador").val("");
    $("#fld_fechaemision").val("");
    $("#fld_fechacaducidad").val("");
    $("#fld_tipoemision").val("");
    $("#fld_observacion").val("");
    $("#parm_aprobacionparmaSI").prop("checked", false);
    $("#parm_aprobacionNO").prop("checked", false);
    $("#parm_noaprobacion").val("");

    $('#dv_foto').css('visibility', "hidden"); //Ocular foto de pescador
    $("#foto_personal").attr('src', '');
    $("#foto_personal").attr('style', "width:193px;height:237px;");
    $("#link_foto_personal").attr('href', '');


    // Mostrar/ocultar
    $("#tabdatoslicenciaparma").hide();
    $("#tablicencias").show();
    $("#tituloP").show();
    $("#tituloLicencia").hide();
    $("#td_tiposangre").hide();
    $("#lbl_tiposangre").hide();
    $("#lbl_nlicenciaguia").hide();
    $("#td_nlicenciaguia").hide();
    $("#dv_fallecimiento").hide();
    $("#dv_aprobacionparma").hide();
    $("#btns_guardarcerrrar").show();
    $("#btn_borrador").hide();


    cargarDatosMaestrosPescadores();

}

function buscarPescadoresParam() {
    console.log("********** buscarPescadoresParam ********** ");
    
    $("#modalLoadin").show();
    data = '';

    cedula = $("#cedulafilter").val();
    nombres = $("#nombresfilter").val();
    isla = $("#SislaFilter").val();
    estado = $("#SestadoFilter").val();

    if(cedula != "")
        data = "c_cedula=" + cedula + "&";

    if(nombres != "")
        data += "c_nombres=" + nombres + "&";

    if(isla != "")
        data += "c_isla=" + isla + "&";

    if(estado != "")
        data += "c_estado=" + estado + "&";

    data = data.substring(0, data.length - 1);

    console.log(data);


    $.ajax({
        url: "get_lista_pescadores",
        type: "get",
        data: {
            "data": data,
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

                        tabla += "<tr>";
                        tabla += "<td align='center' id='td_identificacion_"+ data[i].id + "'>" + data[i].c_cedula + "</td>";
                        tabla += "<td align='center' id='td_nombres_"+ data[i].id + "'>" + valor_nulo_str(data[i].c_nombres) + "</td>";
                        tabla += "<td align='center' id='td_apellidos_" + data[i].id + "'>" + valor_nulo_str(data[i].c_apellidos) + "</td>";
                        tabla += "<td align='center' id='td_isla_" + data[i].id + "'>" + valor_nulo_str(data[i].c_isla) + "</td>";
                        tabla += "<td align='center' id='td_estado_" + data[i].id + "'>" + valor_nulo_str(data[i].c_estado)  + "</td>";
                        tabla += "<td align='center'><a href='#verFicha' data-stackbox='true' data-stackbox-position='absolute' data-stackbox-width='1000' onclick='verFichaPescador(\"" + data[i].id + "\")'><i class='fa fa-user text-green btn_edit'></i></a> </td>";
                        tabla += "<td align='center'><a style='font-size: 18px; cursor: pointer;' href='#addPescador' data-stackbox='true' data-stackbox-position='absolute' data-stackbox-width='75%' onclick='editPescador(\"" + data[i].id +"\")' title='Editar Pescador'><i class='fa fa-edit text-green'></i></a></td>";
                        tabla += "<td align='center'><a style='font-size: 18px; cursor: pointer;' href='#addPescador' data-stackbox='true' data-stackbox-position='absolute' data-stackbox-width='75%' onclick='emitirLicenciaParma(\"" + data[i].id +"\")' title='Emitir Licencia PARMA'><i class='fa fa-send text-blue'></i></a></td>";
                        tabla += "<td align='center'><a style='font-size: 18px; cursor: pointer;' onclick='deleteModal(\"" + data[i].id + "\",\"SL_daf_certificaciones\");'><i class='fa fa-trash text-green' title='Eliminar Pescador'></i></a></td>";
                        tabla += "</tr>";

                    } /*fin for*/
                } /*fin if length*/

                $('#tabla_pescadores').dataTable().fnClearTable();
                $('#tabla_pescadores').dataTable().fnDestroy();

                $("#bodytabla_pescadores").html("");
                $("#bodytabla_pescadores").append(tabla);

                var table = $('#tabla_pescadores').DataTable( {
                    orderCellsTop: true,
                    "order": [[ 1, "asc" ]],
                    responsive: true
                } );

                $('#tabla_pescadores thead .filters th').each(function() {
                    //var title = $(this).text();
                    var title = $('#tabla_pescadores thead tr:eq(0) th').eq($(this).index()).text();

                  if ((title == "")) {
                    $(this).html('');
                  }else{
                      $(this).html('<input type="text" placeholder="Buscar ' + title + '" style="color:black;"/>');
                  }
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
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
            $("#modalLoadin").hide();
            //console.log( JSON.stringify(data));
        },
    });
}

/*funcion para ver la ficha del pescador*/
function verFichaPescador(id) {
    console.log("******* fichaFuncionario *******");

    var path_foto_pescadores = 'static/media/cuem_mpesq/pescadores/'+id+"/";

    //$("#modalLoadin").show();
    $.ajax({
        url: "get_data_pescador",
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

                if (valor_nulo_str(json.c_fotopescador) != "")
                    $("#imgContentFileFotF").attr("src", path_foto_pescadores + json.c_fotopescador+"?timestamp="+ new Date().getTime() );
                else
                    $("#imgContentFileFotF").attr("src", "static/media/talentohumano/carnetizacion/prueba.png");

                nombres = valor_nulo_str(json.c_nombres) + valor_nulo_str(json.c_apellidos);
                if(json.c_fechanacimiento!=null && json.c_fechanacimiento!= undefined){
                    f_nac = json.c_fechanacimiento;
                    f_nac = f_nac.split('/').reverse().join("-");
                }
                $("#td_fnombre").html(nombres);
                $("#td_fced").html(valor_nulo_str(json.c_cedula));
                $("#td_ffecnac").html(valor_nulo_str(f_nac) );
                $("#td_fdir").html(valor_nulo_str(json.c_direccion));
                $("#td_ftel").html(valor_nulo_str(json.c_telefono) + " / " + valor_nulo_str(json.c_celular) );
                $("#td_femail").html(valor_nulo_str(json.c_email) );
                

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



/*
* Funcion: editPescador.
* Descripcion: Carga los campos en memoria en el formulario.
* Parametros:
*   - id(String): id del modelo/tabla Pescador.
*   - formulario(String): Nombre del formulario.              
*/
function editPescador(id) {
    console.log(">> editPescador <<");
    var path_foto_pescadores = 'static/media/cuem_mpesq/pescadores/'+id+"/";

    limpiarFormPescador();

    $('.nav-tabs a[href="#tab_persona"]').tab('show');
    $("#tipotPescador").val(1);
    $("#idPescadorP").val(id);
    $("#modalLoadin").show();

    $.ajax({
        url: "get_data_pescador",
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

                $("#fld_identificacion").val(valor_nulo_str(json.c_cedula));
                $("#fld_nombres").val(valor_nulo_str(json.c_nombres));
                $("#fld_apellidos").val(valor_nulo_str(json.c_apellidos));
                $("#fld_sexo").val(valor_nulo_str(json.c_sexo)).trigger("change");
                if(json.c_fechanacimiento!=null && json.c_fechanacimiento!= undefined){
                    f_nac = json.c_fechanacimiento;
                    f_nac = f_nac.split('/').reverse().join("-");
                    $("#fld_fecha_nac").val(f_nac);
                }
                $("#fld_estado_pescador").val(valor_nulo_str(json.c_estado)).trigger("change");
                $("#fld_instruc_academ").val(valor_nulo_str(json.c_instruccionacademica)).trigger("change");
                $("#fld_c_nresidencia").val(valor_nulo_str(json.c_nresidencia));
                $("#fld_c_nhijos").val(valor_nulo_str(json.c_nhijos));
                $("#fld_c_apodo").val(valor_nulo_str(json.c_apodo));

                $("#fld_pais").val(valor_nulo_str(json.c_paisnacimiento)).trigger("change");
                $("#fld_provincia").val(valor_nulo_str(json.c_provincia)).trigger("change");
                $("#fld_ciudadnacimiento").val(valor_nulo_str(json.c_ciudad)).trigger("change");
                $("#fld_islaresidencia").val(valor_nulo_str(json.c_isla)).trigger("change");
                $("#fld_tipolicenciaguia").val(valor_nulo_str(json.c_tipolicenciaguia)).trigger("change");
                $("#fld_direccion").val(valor_nulo_str(json.c_direccion)).trigger("change");
                //$("#fld_referencia").val(valor_nulo_str(json.c_isla)).trigger("change");
                $("#fld_telefono").val(valor_nulo_str(json.c_telefono));
                $("#fld_celular").val(valor_nulo_str(json.c_celular));
                $("#fld_email").val(valor_nulo_str(json.c_email));

                $("#fld_matricula_digmer").val(valor_nulo_str(json.c_matriculadigmer)).trigger("change");
                $("#fld_cargo_matricula").val(valor_nulo_str(json.c_cargomatriculadigmer)).trigger("change");
                $("#fld_ingreso_motivo").val(valor_nulo_str(json.c_motivoingreso)).trigger("change");
                $("#fld_cooperativa").val(valor_nulo_str(json.c_cooperativa)).trigger("change");
                $("#fld_categoriaP").val(valor_nulo_str(json.c_categoriapescador)).trigger("change");
                $("#fld_licParma").val(valor_nulo_str(json.c_licenciaparma));

                $("#fld_pesc_ante_ident").val(valor_nulo_str(json.c_cedulaanterior));
                $("#fld_pesc_ante_nombres").val(valor_nulo_str(json.c_nombrepescadoranterior));
                $("#fld_pesc_ante_apellidos").val(valor_nulo_str(json.c_apellidospescadoranterior));
                $("#fld_cooperativa_anterior").val(valor_nulo_str(json.c_cooperativaembarcacion)).trigger("change");
                $("#fld_licParma_anter").val(valor_nulo_str(json.c_parmaanterior));
                $("#fld_no_proceso").val(valor_nulo_str(json.c_nproceso));

                //$("#lbl_foto_pescador").html('<input type="image" name="imageprev" id="imageprev" style="width: 193px; height: 237px;"/>');
                //$("#lbl_foto_pescador").val(valor_nulo_str(json.c_fotopescador));
                $('#dv_foto').css('visibility', "visible");
                $("#foto_personal").attr('src', path_foto_pescadores+json.c_fotopescador+"?timestamp="+ new Date().getTime());
                $("#foto_personal").attr('style', "width:193px;height:237px;");
                $("#link_foto_personal").attr('href', path_foto_pescadores+json.c_fotopescador+"?timestamp="+ new Date().getTime());

                // Historial Licencia Parma
                $.ajax({
                    url: "get_historialparma",
                    type: "get",
                    cache: 'false',
                    data: {
                        "cedula": json.c_cedula
                    },
                    dataType: "json",
                    async: false,

                    success: function(json) {
                        option = "";
                        num = 0;

                        if (json['error']) {
                            if (json['error']['context'])
                                var salida = json['error']['context']['resource'][0].message;
                            else
                                var salida = json['error']['message']
                        } else {

                            
                            for(i = 0; i < json["hist_parmas"].length; i++){
                                num = num+1;
                                option += '<tr class="odd">';
                                option += '<td valign="center" class="dataTables_empty">'+num+'</td>';
                                option += '<td valign="center" class="dataTables_empty">'+json["hist_parmas"][i][1]+'</td>';
                                option += '<td valign="center" class="dataTables_empty">'+json["hist_parmas"][i][2]+'</td>';
                                option += '<td valign="center" class="dataTables_empty">'+json["hist_parmas"][i][3]+'</td>';
                                //option += '<td valign="center" class="dataTables_empty">'+valor_nulo_str(json["hist_parmas"][i][4])+'</td>';
                                option += '</tr>';
                            }
                           

                            $("#bodytabla_historialparama").html(option);

                        }
                    },
                    error: function(data) {
                        $("#modalLoadin").hide(); 
                        swal("", "Error: " + JSON.stringify(data), "error");
                        console.log(JSON.stringify(data));
                    },
                });


            }
        },
        error: function(data) {
            $("#modalLoadin").hide(); 
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
        },
    });
}

function setInsertUpdatePescador() {
    console.log("******** setInsertUpdatePescador **********");
    valida = validaContenedor("addPescador");
    var bool = false;
    
    if(valida){
        if($("#tipotPescador").val() == 0)
            insertarTablaPescador();
        else if($("#tipotPescador").val() == 1)
            saveEditPescador();
        else if($("#tipotPescador").val() == 2)
            insertarLicenciaParma();
    }
    
}

function insertarTablaPescador() {
    console.log("******* insertarTablaPescador *******");
    datos = get_json_pescadores();
    datos += '}';

    /*id_padre = $('#content_Pescador').parent().attr('id');
    th_insert(datos, "SL_cuem_pescadores", id_padre, "appfdtdatospescador");
    buscarPescadoresParam();*/

    $.ajax({
        url: "insert_General",
        type: 'get',
        cache: 'false',
        data: {
            "dj_url": 'appfdtdatospescador',
            "data": JSON.stringify("[" + datos + "]")
        },
        dataType: "json",
        success: function(data) {
            if (!data['results']) {
                $('#modalLoadin').hide();
                swal("", "Error al Insertar el registro: " + data['non_field_errors'][0], "error");
                console.log("data---->" + datos + "--->" + "appfdtdatospescador" + "Error--->" + data);
            } else {
                //console.log(data);
                $('#modalLoadin').hide();
                swal("", "Registro insertado con exito", "success");

                buscarPescadoresParam();
            }
        },
        error: function(data) {
            $('#modalLoadin').hide();
            swal("", "Error al Insertar el registro", "error");
            console.log("data---->" + datos + "--->" + "appfdtdatospescador" + "Error--->" + data);
        },
    });

}

function saveEditPescador() {
    console.log("******* saveEditPescador *******");
    id = $("#idPescadorP").val();
    var path_foto_pescadores = 'static/media/cuem_mpesq/pescadores/';
    var filename;
    path_foto_pescadores = path_foto_pescadores + id + '/';

    var x1 =$("#imageprev").attr('src');

    datos = get_json_pescadores();
    datos += '}';

    id_padre = $('#content_Pescador').parent().attr('id');
    th_update(datos, "SL_cuem_pescadores", id_padre, "appfdtdatospescador",id);
    buscarPescadoresParam();

    filename = $('#lbl_foto_pescador').val();
    if (filename.substring(3,11) == 'fakepath')
        filename = filename.substring(12);
    saveSnap("imageprev", filename, path_foto_pescadores);

    buscarPescadoresParam();
    

}

function cargarDatosMaestrosPescadores(){
    console.log("******** cargarDatosMaestrosPescadores ************** ");

    $.ajax({
        url: "data_cuem_masters_pescadores",
        type: "get",
        data: {"data": ""},
        dataType: "json",
        async:false,

        success: function(data) {
            console.log(data);
            if(data['non_field_errors']){
              console.log(data['non_field_errors']);
            }else{
                console.log(data);
                if(data){
                    option = '<option value=""> Seleccione una opcion</option>';
                    optionT = "";
                    option_descrp = '';
                    cargo_institucional= '';
                    direccion= '';
                    isla= '';
                    identificacion= '';
                    nombre_completo= '';
                    
                    // PAIS
                    for(i = 0; i < data["pais"].length; i++){
                        optionT+="<option value='"+data["pais"][i][0]+"'>"+data["pais"][i][0]+" </option>";
                    }
                    $("#option_pais").val(optionT);
                    $("#fld_pais").html(option + optionT);
                    $("#fld_pais").select2({
                      sorter: data => data.sort((a, b) => a.text.localeCompare(b.text)),
                    });

                    // PROVINCIA
                    optionT="";
                    for(i = 0; i < data["provincia"].length; i++){
                        optionT+="<option value='"+data["provincia"][i][1]+"' pais='"+data["provincia"][i][2]+"'>"+data["provincia"][i][1]+" </option>";
                    }
                    $("#option_provincia").val(optionT);
                    $("#fld_provincia").html(option + optionT);
                    $("#fld_provincia").select2({
                      sorter: data => data.sort((a, b) => a.text.localeCompare(b.text)),
                    });

                    // CIUDAD
                    optionT="";
                    for(i = 0; i < data["ciudad"].length; i++){
                        optionT+="<option value='"+data["ciudad"][i][0]+"' provincia='"+data["ciudad"][i][2]+"'>"+data["ciudad"][i][1]+" </option>";
                    }
                    $("#option_ciudad").val(optionT);
                    $("#fld_ciudadnacimiento").html(option + optionT);
                    $("#fld_ciudadnacimiento").select2({
                      sorter: data => data.sort((a, b) => a.text.localeCompare(b.text)),
                    });

                    // ISLA
                    optionT="";
                    for(i = 0; i < data["isla"].length; i++){
                        optionT+="<option value='"+data["isla"][i][0]+"'>"+data["isla"][i][0]+" </option>";
                    }
                    //$("#option_isla").val(optionT);
                    $("#fld_islaresidencia").html(option + optionT);
                    $("#fld_islaresidencia").select2({
                      sorter: data => data.sort((a, b) => a.text.localeCompare(b.text)),
                    });

                    // INSTRUCCION ACADEMICA
                    optionT="";
                    for(i = 0; i < data["instruc_academ"].length; i++){
                        optionT+="<option value='"+data["instruc_academ"][i][0]+"'>"+data["instruc_academ"][i][0]+" </option>";
                    }
                    $("#option_instruc_academ").val(optionT);
                    $("#fld_instruc_academ").html(option + optionT);
                    $("#fld_instruc_academ").select2({
                      sorter: data => data.sort((a, b) => a.text.localeCompare(b.text)),
                    });

                    // COOPERATIVA
                    optionT="";
                    for(i = 0; i < data["cooperativas"].length; i++){
                        optionT+="<option value='"+data["cooperativas"][i][0]+"'>"+data["cooperativas"][i][0]+" </option>";
                    }
                    $("#option_cooperativa").val(optionT);
                    $("#fld_cooperativa").html(option + optionT);
                    $("#fld_cooperativa_anterior").html(option + optionT);
                    
                    $("#fld_cooperativa").select2({
                      sorter: data => data.sort((a, b) => a.text.localeCompare(b.text)),
                    });
                    $("#fld_cooperativa_anterior").select2({
                      sorter: data => data.sort((a, b) => a.text.localeCompare(b.text)),
                    });

                    // CATEGORIA
                    optionT="";
                    for(i = 0; i < data["categoria"].length; i++){
                        optionT+="<option value='"+data["categoria"][i][0]+"'>"+data["categoria"][i][0]+" </option>";
                    }
                    $("#option_categoria").val(optionT);
                    $("#fld_categoriaP").html(option + optionT);
                    $("#fld_categoriaP").select2({
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

function get_json_pescadores(){

    /*se arma la cadena datos*/
    datos = '{';

    //SOLICITANTE
    if (valor_nulo_str($("#fld_identificacion").val()) != "") 
        datos += ' "c_cedula":"' + $("#fld_identificacion").val() + '",';

    if (valor_nulo_str($("#fld_nombres").val()) != "") 
        datos += ' "c_nombres":"' + $("#fld_nombres").val() + '",';

    if (valor_nulo_str($("#fld_apellidos").val()) != "") 
        datos += ' "c_apellidos":"' + $("#fld_apellidos").val() + '",';

    if (valor_nulo_str($("#fld_sexo").val()) != "") 
        datos += ' "c_sexo":"' + $("#fld_sexo").val() + '",';

    if (valor_nulo_str($("#fld_fecha_nac").val()) != "") 
        datos += ' "c_fechanacimiento":"' + $("#fld_fecha_nac").val() + '",';

    if (valor_nulo_str($("#fld_instruc_academ").val()) != "") 
        datos += ' "c_instruccionacademica":"' + $("#fld_instruc_academ").val() + '",';

    if (valor_nulo_str($("#fld_c_nresidencia").val()) != "") 
        datos += ' "c_nresidencia":"' + $("#fld_c_nresidencia").val() + '",';
    else
        datos += ' "c_nresidencia": null,';

    if (valor_nulo_str($("#fld_c_nhijos").val()) != "") 
        datos += ' "c_nhijos":"' + $("#fld_c_nhijos").val() + '",';

    if (valor_nulo_str($("#fld_c_apodo").val()) != "") 
        datos += ' "c_apodo":"' + $("#fld_c_apodo").val() + '",';

    
    if (valor_nulo_str($("#fld_estado_pescador").val()) != "") 
        datos += ' "c_estado":"' + $("#fld_estado_pescador").val() + '",';
    

    if (valor_nulo_str($("#fld_pais").val()) != "") 
        datos += ' "c_paisnacimiento":"' + $("#fld_pais").val() + '",';
    else
        datos += ' "c_paisnacimiento": null,';

    if (valor_nulo_str($("#fld_provincia").val()) != "") 
        datos += ' "c_provincia":"' + $("#fld_provincia").val() + '",';
    else
        datos += ' "c_provincia": null,';

    if (valor_nulo_str($("#fld_ciudadnacimiento").val()) != "") 
        datos += ' "c_ciudad":"' + $("#fld_ciudadnacimiento").val() + '",';
    else
        datos += ' "c_ciudad": null,';

    if (valor_nulo_str($("#fld_islaresidencia").val()) != "") 
        datos += ' "c_isla":"' + $("#fld_islaresidencia").val() + '",';
    else
        datos += ' "c_isla": null,';

    if (valor_nulo_str($("#fld_direccion").val()) != "") 
        datos += ' "c_direccion":"' + $("#fld_direccion").val() + '",';
    else
        datos += ' "c_direccion": null,';

    if (valor_nulo_str($("#fld_tipolicenciaguia").val()) != "") 
        datos += ' "c_tipolicenciaguia":"' + $("#fld_tipolicenciaguia").val() + '",';
    else
        datos += ' "c_tipolicenciaguia": null,';

    if (valor_nulo_str($("#fld_c_nlicenciaguia").val()) != "") 
        datos += ' "c_nlicenciaguia":"' + $("#fld_c_nlicenciaguia").val() + '",';
    else
        datos += ' "c_nlicenciaguia": null,';

    /*
    if (valor_nulo_str($("#fld_referencia").val()) != "") 
        datos += ' "c_instruccionacademica":"' + $("#fld_referencia").val() + '",';
    */

    if (valor_nulo_str($("#fld_telefono").val()) != "") 
        datos += ' "c_telefono":"' + $("#fld_telefono").val() + '",';
    else
        datos += ' "c_telefono": null,';

    if (valor_nulo_str($("#fld_celular").val()) != "") 
        datos += ' "c_celular":"' + $("#fld_celular").val() + '",';
    else
        datos += ' "c_celular": null,';

    if (valor_nulo_str($("#fld_email").val()) != "") 
        datos += ' "c_email":"' + $("#fld_email").val() + '",';
    else
        datos += ' "c_email": null,';

    if (valor_nulo_str($("#fld_matricula_digmer").val()) != "") 
        datos += ' "c_matriculadigmer":"' + $("#fld_matricula_digmer").val() + '",';
    else
        datos += ' "c_matriculadigmer": null,';

    if (valor_nulo_str($("#fld_cargo_matricula").val()) != "") 
        datos += ' "c_cargomatriculadigmer":"' + $("#fld_cargo_matricula").val() + '",';
    else
        datos += ' "c_cargomatriculadigmer": null,';

    if (valor_nulo_str($("#fld_ingreso_motivo").val()) != "") 
        datos += ' "c_motivoingreso":"' + $("#fld_ingreso_motivo").val() + '",';
    else
        datos += ' "c_motivoingreso": null,';

    if (valor_nulo_str($("#fld_cooperativa").val()) != "") 
        datos += ' "c_cooperativa":"' + $("#fld_cooperativa").val() + '",';
    else
        datos += ' "c_cooperativa": null,';

    if (valor_nulo_str($("#fld_categoriaP").val()) != "") 
        datos += ' "c_categoriapescador":"' + $("#fld_categoriaP").val() + '",';
    else
        datos += ' "c_categoriapescador": null,';

    if (valor_nulo_str($("#fld_esp_laboral").val()) != "") 
        datos += ' "c_especificacionlaboral":"' + $("#fld_esp_laboral").val() + '",';
    else
        datos += ' "c_especificacionlaboral": null,';

    if (valor_nulo_str($("#fld_fechafallecimiento").val()) != "") 
        datos += ' "c_fechafallecimiento":"' + $("#fld_fechafallecimiento").val() + '",';
    else
        datos += ' "c_fechafallecimiento": null,';

    if (valor_nulo_str($("#fld_codigoreferencia").val()) != "") 
        datos += ' "c_codigoreferencia":"' + $("#fld_codigoreferencia").val() + '",';
    else
        datos += ' "c_codigoreferencia": null,';

    if (valor_nulo_str($("#fld_documentodefuncion").val()) != "") 
        datos += ' "c_documentodefuncion":"' + $("#fld_documentodefuncion").val() + '",';
    else
        datos += ' "c_documentodefuncion": null,';


    if (valor_nulo_str($("#fld_pesc_ante_ident").val()) != "") 
        datos += ' "c_cedulaanterior":"' + $("#fld_pesc_ante_ident").val() + '",';
    else
        datos += ' "c_cedulaanterior": null,';
    
    if (valor_nulo_str($("#fld_pesc_ante_nombres").val()) != "") 
        datos += ' "c_nombrepescadoranterior":"' + $("#fld_pesc_ante_nombres").val() + '",';
    else
        datos += ' "c_nombrepescadoranterior": null,';
    
    if (valor_nulo_str($("#fld_pesc_ante_apellidos").val()) != "") 
        datos += ' "c_apellidospescadoranterior":"' + $("#fld_pesc_ante_apellidos").val() + '",';
    else
        datos += ' "c_apellidospescadoranterior": null,';

    if (valor_nulo_str($("#fld_cooperativa_anterior").val()) != "") 
        datos += ' "c_cooperativaembarcacion":"' + $("#fld_cooperativa_anterior").val() + '",';
    else
        datos += ' "c_cooperativaembarcacion": null,';

    if (valor_nulo_str($("#fld_licParma_anter").val()) != "") 
        datos += ' "c_parmaanterior":"' + $("#fld_licParma_anter").val() + '",';
    else
        datos += ' "c_parmaanterior": null,';

    if (valor_nulo_str($("#fld_no_proceso").val()) != "") 
        datos += ' "c_nproceso":"' + $("#fld_no_proceso").val() + '",';
    else
        datos += ' "c_nproceso": null,';


    filename = $('#lbl_foto_pescador').val();
    if (filename.substring(3,11) == 'fakepath')
        filename = filename.substring(12);

    if (valor_nulo_str($("#lbl_foto_pescador").val()) != "") 
        datos += ' "c_fotopescador":"' + filename + '",';
    else
        datos += ' "c_fotopescador": null,';


    if (valor_nulo_str($("#fld_licParma").val()) != "") 
        datos += ' "c_licenciaparma":"' + $("#fld_licParma").val() + '"';
    else
        datos += ' "c_licenciaparma": null';


    /*
    if (valor_nulo_str($("#fld_licParma_anter").val()) != "") 
        datos += ' "c_licenciaparma":"' + $("#fld_licParma_anter").val() + '",';
    */

    //datos += '}';

    datos = datos.replace(/undefined/g, null);
    datos = datos.replace(/None/g,null);
    datos = datos.replace(/False/g,null);
    datos = datos.replace(/True/g,"'true'");
    datos = datos.replace(/'/g,'"');
    datos = datos.replace(/"null"/g, null);

    return datos;
}

function getDatosPescadorRegistroCivil() {
    $("#modalLoadin").show();
    cedula = $("#fld_identificacion").val();
    sexo = '';
    pais_nacimiento = '';
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
                    $("#fld_nombres").val(res[2] + " " + res[3]);
                    $("#fld_apellidos").val(res[0] + " " + res[1]);
                } else
                    $("#fld_nombres").val(data.nombre);

                //FECHA FORMATO
                var fecha = convertDateFormat(data.fechaNacimiento);

                //NACIONALIDAD
                if (data.nacionalidad == 'ECUATORIANA') {
                    pais_nacimiento = 'Ecuador';
                } else {
                    pais_nacimiento = '';
                }
                //SEXO
                if (data.sexo == 'MUJER' || data.sexo == 'FEMENINO') {
                    sexo = 'FEMENINO';
                } else {
                    if (data.sexo == 'HOMBRE' || data.sexo == 'MASCULINO') {
                        sexo = 'MASCULINO';
                    } else {
                        sexo = '';
                    }
                }

                $("#fld_pais").val(pais_nacimiento).trigger("change");;
                $("#fld_sexo").val(sexo).trigger("change");;

                
            } else {
                validaContenedorExt("bodyaddPescador", "Error al Consultar en el Registro Civil");
            }
        },
        error: function(data) {
            $("#modalLoadin").hide();
            validaContenedorExt("bodyaddPescador", "Error:" + JSON.stringify(data));
            console.log(JSON.stringify(data));

        },
    });
}



// Licencia PARMA
function buscarLicenciaParma() {
    console.log("********** buscarLicenciaParma ********** ");
    
    $("#modalLoadin").show();
    data = '';

    cedulapescador = $("#cedulaciafilter").val();
    licenciaparma = $("#licenciafilter").val();
    estado = $("#SestadoFilter").val();

    if(cedulapescador != "")
        data += "c_cedula=" + cedulapescador + "&";

    if(licenciaparma != "")
        data = "c_licenciaparma=" + licenciaparma + "&";

    if(estado != "")
        data += "c_estado=" + estado + "&";

    data = data.substring(0, data.length - 1);

    console.log(data);

    $.ajax({
        url: "get_lista_licenciaparma",
        type: "get",
        data: {
            "data": data,
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

                        if(data[i].c_fechaemision!=null && data[i].c_fechaemision!= undefined){
                            f_emi = data[i].c_fechaemision;
                            f_emi = f_emi.split('-').reverse().join("/");
                        }else
                            f_emi = "";

                        if(data[i].c_fechacaducidad!=null && data[i].c_fechacaducidad!= undefined){
                            f_cad = data[i].c_fechacaducidad;
                            f_cad = f_cad.split('-').reverse().join("/");
                        }else
                            f_cad = "";

                        tabla += "<tr>";
                        tabla += "<td align='center' id='td_matricula_"+ data[i].id + "'>" + data[i].c_cedula + "</td>";
                        tabla += "<td align='center' id='td_emb_"+ data[i].id + "'>" + valor_nulo_str(data[i].c_nombres) + "</td>";
                        tabla += "<td align='center' id='td_emb_"+ data[i].id + "'>" + valor_nulo_str(data[i].c_apellidos) + "</td>";
                        tabla += "<td align='center' id='td_estado_" + data[i].id + "'>" + valor_nulo_str(data[i].c_licenciaparma)  + "</td>";
                        //tabla += "<td align='center' id='td_tipoemb_" + data[i].id + "'>" + valor_nulo_str(f_emi) + "</td>";
                        //tabla += "<td align='center' id='td_isla_" + data[i].id + "'>" + valor_nulo_str(f_cad) + "</td>";
                        tabla += "<td align='center'><a style='font-size: 18px; cursor: pointer;' href='#addPescador' data-stackbox='true' data-stackbox-position='absolute' data-stackbox-width='80%' onclick='verLicenciaParma(\"" + data[i].id +"\")' title='Ver Licencia PARMA'><i class='fa fa-search text-green'></i></a></td>";
                        //tabla += "<td align='center' id='td_permission_"+ data[i].id + "' descripcion='"+data[i].permiso_session_nm+" ' hidden>" + data[i].permiso_session + "</td>";
                        tabla += "</tr>";

                    } /*fin for*/
                } /*fin if length*/

                $('#tabla_licenciaparma').dataTable().fnClearTable();
                $('#tabla_licenciaparma').dataTable().fnDestroy();

                $("#bodytabla_licenciaparma").html("");
                $("#bodytabla_licenciaparma").append(tabla);

                var table = $('#tabla_licenciaparma').DataTable( {
                    orderCellsTop: true,
                    "order": [[ 1, "asc" ]],
                    responsive: true
                } );

                $('#tabla_licenciaparma thead .filters th').each(function() {
                    //var title = $(this).text();
                    var title = $('#tabla_licenciaparma thead tr:eq(0) th').eq($(this).index()).text();

                  if ((title == "")) {
                    $(this).html('');
                  }else{
                      $(this).html('<input type="text" placeholder="Buscar ' + title + '" style="color:black;"/>');
                  }
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
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
            $("#modalLoadin").hide();
            //console.log( JSON.stringify(data));
        },
    });
}

function emitirLicenciaParma(id){
    console.log(">> emitirLicenciaParma <<");
    var path_foto_pescadores = 'static/media/cuem_mpesq/pescadores/'+id+"/";

    limpiarFormPescador();

    $('.nav-tabs a[href="#tab_persona"]').tab('show');
    $("#tipotPescador").val(2);
    $("#idPescadorP").val(id);
    $("#modalLoadin").show();
    $("#tabdatoslicenciaparma").show();
    $("#tablicencias").hide();
    $("#td_tiposangre").show();
    $("#lbl_tiposangre").show();
    $("#tituloP").hide();
    $("#tituloLicencia").show();
    $("#btn_borrador").show();

    $.ajax({
        url: "get_data_pescador",
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

                $("#fld_identificacion").val(valor_nulo_str(json.c_cedula));
                $("#fld_nombres").val(valor_nulo_str(json.c_nombres));
                $("#fld_apellidos").val(valor_nulo_str(json.c_apellidos));
                $("#fld_sexo").val(valor_nulo_str(json.c_sexo)).trigger("change");
                if(json.c_fechanacimiento!=null && json.c_fechanacimiento!= undefined){
                    f_nac = json.c_fechanacimiento;
                    f_nac = f_nac.split('/').reverse().join("-");
                    $("#fld_fecha_nac").val(f_nac);
                }
                $("#fld_estado_pescador").val(valor_nulo_str(json.c_estado)).trigger("change");
                $("#fld_instruc_academ").val(valor_nulo_str(json.c_instruccionacademica)).trigger("change");
                $("#fld_c_nresidencia").val(valor_nulo_str(json.c_nresidencia));
                $("#fld_c_nhijos").val(valor_nulo_str(json.c_nhijos));
                $("#fld_c_apodo").val(valor_nulo_str(json.c_apodo));

                $("#fld_pais").val(valor_nulo_str(json.c_paisnacimiento)).trigger("change");
                $("#fld_provincia").val(valor_nulo_str(json.c_provincia)).trigger("change");
                $("#fld_ciudadnacimiento").val(valor_nulo_str(json.c_ciudad)).trigger("change");
                $("#fld_islaresidencia").val(valor_nulo_str(json.c_isla)).trigger("change");
                $("#fld_tipolicenciaguia").val(valor_nulo_str(json.c_tipolicenciaguia)).trigger("change");
                $("#fld_direccion").val(valor_nulo_str(json.c_direccion)).trigger("change");
                //$("#fld_referencia").val(valor_nulo_str(json.c_isla)).trigger("change");
                $("#fld_telefono").val(valor_nulo_str(json.c_telefono));
                $("#fld_celular").val(valor_nulo_str(json.c_celular));
                $("#fld_email").val(valor_nulo_str(json.c_email));

                $("#fld_matricula_digmer").val(valor_nulo_str(json.c_matriculadigmer)).trigger("change");
                $("#fld_cargo_matricula").val(valor_nulo_str(json.c_cargomatriculadigmer)).trigger("change");
                $("#fld_ingreso_motivo").val(valor_nulo_str(json.c_motivoingreso)).trigger("change");
                $("#fld_cooperativa").val(valor_nulo_str(json.c_cooperativa)).trigger("change");
                $("#fld_categoriaP").val(valor_nulo_str(json.c_categoriapescador)).trigger("change");
                $("#fld_esp_laboral").val(valor_nulo_str(json.c_especificacionlaboral)).trigger("change");

                $("#fld_pesc_ante_ident").val(valor_nulo_str(json.c_cedulaanterior));
                $("#fld_pesc_ante_nombres").val(valor_nulo_str(json.c_nombrepescadoranterior));
                $("#fld_pesc_ante_apellidos").val(valor_nulo_str(json.c_apellidospescadoranterior));
                $("#fld_cooperativa_anterior").val(valor_nulo_str(json.c_cooperativaembarcacion)).trigger("change");
                $("#fld_licParma").val(valor_nulo_str(json.c_parmaanterior));
                $("#fld_licParma_anter").val(valor_nulo_str(json.c_parmaanterior));
                $("#fld_no_proceso").val(valor_nulo_str(json.c_nproceso));

                //$("#lbl_foto_pescador").html('<input type="image" name="imageprev" id="imageprev" style="width: 193px; height: 237px;"/>');
                //$("#lbl_foto_pescador").val(valor_nulo_str(json.c_fotopescador));
                $('#dv_foto').css('visibility', "visible");
                $("#foto_personal").attr('src', path_foto_pescadores+json.c_fotopescador+"?timestamp="+ new Date().getTime());
                $("#foto_personal").attr('style', "width:193px;height:237px;");
                $("#link_foto_personal").attr('href', path_foto_pescadores+json.c_fotopescador+"?timestamp="+ new Date().getTime());

            }
        },
        error: function(data) {
            $("#modalLoadin").hide(); 
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
        },
    });
}

function verLicenciaParma(id){
    console.log(">> verLicenciaParma <<");
    //var path_foto_pescadores = 'static/media/cuem_mpesq/pescadores/'+id+"/";

    limpiarFormPescador();

    $('.nav-tabs a[href="#tab_persona"]').tab('show');
    $("#tipotPescador").val(2);
    $("#idPescadorP").val(id);
    $("#modalLoadin").show();
    $("#tabdatoslicenciaparma").show();
    $("#tablicencias").hide();
    $("#td_tiposangre").show();
    $("#lbl_tiposangre").show();
    $("#tituloP").hide();
    $("#tituloLicencia").show();
    $("#dv_aprobacionparma").show();
    $("#dv_motivonoaprobacion").hide();
    $("#btns_guardarcerrrar").hide();

    $.ajax({
        url: "get_data_licenciaparma",
        type: "get",
        cache: 'false',
        data: {
            "data": id
        },
        dataType: "json",
        async: false,

        success: function(json) {

            json = json["results"][0]
                        
            $("#modalLoadin").hide();

            if (json['error']) {
                if (json['error']['context'])
                    var salida = json['error']['context']['resource'][0].message;
                else
                    var salida = json['error']['message']
            } else {

                console.log("Nombres: "+json.c_cedula);
                $("#fld_identificacion").val(valor_nulo_str(json.c_cedula));
                $("#fld_nombres").val(valor_nulo_str(json.c_nombres));
                $("#fld_apellidos").val(valor_nulo_str(json.c_apellidos));
                $("#fld_sexo").val(valor_nulo_str(json.c_sexo)).trigger("change");
                if(json.c_fechanacimiento!=null && json.c_fechanacimiento!= undefined){
                    f_nac = json.c_fechanacimiento;
                    f_nac = f_nac.split('/').reverse().join("-");
                    $("#fld_fecha_nac").val(f_nac);
                }
                $("#fld_estado_pescador").val(valor_nulo_str(json.c_estado)).trigger("change");
                $("#fld_instruc_academ").val(valor_nulo_str(json.c_instruccionacademica)).trigger("change");
                $("#fld_c_nresidencia").val(valor_nulo_str(json.c_nresidencia));
                $("#fld_c_nhijos").val(valor_nulo_str(json.c_nhijos));
                $("#fld_c_apodo").val(valor_nulo_str(json.c_apodo));

                $("#fld_pais").val(valor_nulo_str(json.c_paisnacimiento)).trigger("change");
                $("#fld_provincia").val(valor_nulo_str(json.c_provincia)).trigger("change");
                $("#fld_ciudadnacimiento").val(valor_nulo_str(json.c_ciudad)).trigger("change");
                $("#fld_islaresidencia").val(valor_nulo_str(json.c_isla)).trigger("change");
                $("#fld_tipolicenciaguia").val(valor_nulo_str(json.c_tipolicenciaguia)).trigger("change");
                $("#fld_direccion").val(valor_nulo_str(json.c_direccion)).trigger("change");
                //$("#fld_referencia").val(valor_nulo_str(json.c_isla)).trigger("change");
                $("#fld_telefono").val(valor_nulo_str(json.c_telefono));
                $("#fld_celular").val(valor_nulo_str(json.c_celular));
                $("#fld_email").val(valor_nulo_str(json.c_email));

                $("#fld_matricula_digmer").val(valor_nulo_str(json.c_matriculadigmer)).trigger("change");
                $("#fld_cargo_matricula").val(valor_nulo_str(json.c_cargomatriculadigmer)).trigger("change");
                $("#fld_ingreso_motivo").val(valor_nulo_str(json.c_motivoingreso)).trigger("change");
                $("#fld_cooperativa").val(valor_nulo_str(json.c_cooperativa)).trigger("change");
                $("#fld_categoriaP").val(valor_nulo_str(json.c_categoriapescador)).trigger("change");
                $("#fld_esp_laboral").val(valor_nulo_str(json.c_especificacionlaboral)).trigger("change");

                $("#fld_c_nlicenciaguia").val(valor_nulo_str(json.c_nlicenciaguia));
                /*if(json.c_fechafallecimiento!=null && json.c_fechafallecimiento!= undefined){
                    f_falle = json.c_fechafallecimiento;
                    f_falle = f_falle.split('/').reverse().join("-");
                    $("#fld_fechafallecimiento").val(f_falle);
                }
                $("#fld_codigoreferencia").val(valor_nulo_str(json.c_codigoreferencia));*/

                $("#fld_pesc_ante_ident").val(valor_nulo_str(json.c_cedulaanterior));
                $("#fld_pesc_ante_nombres").val(valor_nulo_str(json.c_nombrepescadoranterior));
                $("#fld_pesc_ante_apellidos").val(valor_nulo_str(json.c_apellidospescadoranterior));
                $("#fld_cooperativa_anterior").val(valor_nulo_str(json.c_cooperativaembarcacion)).trigger("change");
                $("#fld_licParma").val(valor_nulo_str(json.c_parmaanterior));
                $("#fld_licParma_anter").val(valor_nulo_str(json.c_parmaanterior));
                $("#fld_no_proceso").val(valor_nulo_str(json.c_nproceso));

                if(json.c_fechaemision!=null && json.c_fechaemision!= undefined){
                    f_emi = json.c_fechaemision;
                    f_emi = f_emi.split('/').reverse().join("-");
                    $("#fld_fechaemision").val(f_emi);
                }

                if(json.c_fechacaducidad!=null && json.c_fechacaducidad!= undefined){
                    f_cad = json.c_fechacaducidad;
                    f_cad = f_cad.split('/').reverse().join("-");
                    $("#fld_fechacaducidad").val(f_cad);
                }

                if(json.c_tipoemisionsancristobal!=null){
                    $("#fld_tipoemision").val(valor_nulo_str(json.c_tipoemisionsancristobal)).trigger("change");
                }else if(json.c_tipoemisionsancruz!=null){
                    $("#fld_tipoemision").val(valor_nulo_str(json.c_tipoemisionsancruz)).trigger("change");
                }else if(json.c_tipoemisionisabela!=null){
                    $("#fld_tipoemision").val(valor_nulo_str(json.c_tipoemisionisabela)).trigger("change");
                }

                $("#fld_observacion").val(valor_nulo_str(json.c_observacion));

                //$("#lbl_foto_pescador").html('<input type="image" name="imageprev" id="imageprev" style="width: 193px; height: 237px;"/>');
                //$("#lbl_foto_pescador").val(valor_nulo_str(json.c_fotopescador));
                /*$('#dv_foto').css('visibility', "visible");
                $("#foto_personal").attr('src', path_foto_pescadores+json.c_fotopescador+"?timestamp="+ new Date().getTime());
                $("#foto_personal").attr('style', "width:193px;height:237px;");
                $("#link_foto_personal").attr('href', path_foto_pescadores+json.c_fotopescador+"?timestamp="+ new Date().getTime());*/

            }
        },
        error: function(data) {
            $("#modalLoadin").hide(); 
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
        },
    });
}

function insertarLicenciaParma(){
    console.log("******* insertarLicenciaParma *******");
    datos = get_json_licenciaparma();
    datos += '}';

    $.ajax({
            url: "insert_General",
            type: 'get',
            cache: 'false',
            data: {
                "dj_url": 'appfdtlicenciaparma',
                "data": JSON.stringify("[" + datos + "]")
            },
            dataType: "json",
            success: function(data) {
                if (!data['results']) {
                    $('#modalLoadin').hide();
                    swal("", "Error al Insertar el registro: " + data['non_field_errors'][0], "error");
                    console.log("data---->" + datos + "--->" + "appfdtlicenciaparma" + "Error--->" + data);
                } else {
                    //console.log(data);
                    $('#modalLoadin').hide();
                    swal("", "Registro insertado con exito", "success");

                    buscarPescadoresParam();
                }
            },
            error: function(data) {
                $('#modalLoadin').hide();
                swal("", "Error al Insertar el registro", "error");
                console.log("data---->" + datos + "--->" + "appfdtlicenciaparma" + "Error--->" + data);
            },
        });
}

function get_json_licenciaparma(){

    /*se arma la cadena datos*/
    datos = '{';

    //SOLICITANTE
    if (valor_nulo_str($("#fld_identificacion").val()) != "") 
        datos += ' "c_cedula":"' + $("#fld_identificacion").val() + '",';

    if (valor_nulo_str($("#fld_nombres").val()) != "") 
        datos += ' "c_nombres":"' + $("#fld_nombres").val() + '",';

    if (valor_nulo_str($("#fld_apellidos").val()) != "") 
        datos += ' "c_apellidos":"' + $("#fld_apellidos").val() + '",';

    if (valor_nulo_str($("#fld_sexo").val()) != "") 
        datos += ' "c_sexo":"' + $("#fld_sexo").val() + '",';

    if (valor_nulo_str($("#fld_c_nhijos").val()) != "") 
        datos += ' "c_nhijos":"' + $("#fld_c_nhijos").val() + '",';

    if (valor_nulo_str($("#fld_tiposangre").val()) != "") 
        datos += ' "c_tipo_sangre":"' + $("#fld_tiposangre").val() + '",';

    if (valor_nulo_str($("#fld_fecha_nac").val()) != "") 
        datos += ' "c_fechanacimiento":"' + $("#fld_fecha_nac").val() + '",';

    if (valor_nulo_str($("#fld_islaresidencia").val()) != "") 
        datos += ' "c_isla":"' + $("#fld_islaresidencia").val() + '",';
    else
        datos += ' "c_isla": null,';

    if (valor_nulo_str($("#fld_c_nresidencia").val()) != "") 
        datos += ' "c_nresidencia":"' + $("#fld_c_nresidencia").val() + '",';

    if (valor_nulo_str($("#fld_estado_pescador").val()) != "") 
        datos += ' "c_estado":"' + $("#fld_estado_pescador").val() + '",';
    else
        datos += ' "c_estado": null,';

    if (valor_nulo_str($("#fld_pais").val()) != "") 
        datos += ' "c_paisnacimiento":"' + $("#fld_pais").val() + '",';
    else
        datos += ' "c_paisnacimiento": null,';

    if (valor_nulo_str($("#fld_provincia").val()) != "") 
        datos += ' "c_provincia":"' + $("#fld_provincia").val() + '",';
    else
        datos += ' "c_provincia": null,';

    if (valor_nulo_str($("#fld_ciudadnacimiento").val()) != "") 
        datos += ' "c_ciudad":"' + $("#fld_ciudadnacimiento").val() + '",';
    else
        datos += ' "c_ciudad": null,';

    if (valor_nulo_str($("#fld_tipolicenciaguia").val()) != "") 
        datos += ' "c_tipolicenciaguia":"' + $("#fld_tipolicenciaguia").val() + '",';
    else
        datos += ' "c_tipolicenciaguia": null,';

    if (valor_nulo_str($("#fld_c_nlicenciaguia").val()) != "") 
        datos += ' "c_nlicenciaguia":"' + $("#fld_c_nlicenciaguia").val() + '",';
    else
        datos += ' "c_nlicenciaguia": null,';

    if (valor_nulo_str($("#fld_c_apodo").val()) != "") 
        datos += ' "c_apodo":"' + $("#fld_c_apodo").val() + '",';

    if (valor_nulo_str($("#fld_direccion").val()) != "") 
        datos += ' "c_direccion":"' + $("#fld_direccion").val() + '",';
    else
        datos += ' "c_direccion": null,';

    if (valor_nulo_str($("#fld_instruc_academ").val()) != "") 
        datos += ' "c_instruccionacademica":"' + $("#fld_instruc_academ").val() + '",';

    if (valor_nulo_str($("#fld_telefono").val()) != "") 
        datos += ' "c_telefono":"' + $("#fld_telefono").val() + '",';
    else
        datos += ' "c_telefono": null,';

    if (valor_nulo_str($("#fld_celular").val()) != "") 
        datos += ' "c_celular":"' + $("#fld_celular").val() + '",';
    else
        datos += ' "c_celular": null,';

    if (valor_nulo_str($("#fld_email").val()) != "") 
        datos += ' "c_email":"' + $("#fld_email").val() + '",';
    else
        datos += ' "c_email": null,';



    if (valor_nulo_str($("#fld_matricula_digmer").val()) != "") 
        datos += ' "c_matriculadigmer":"' + $("#fld_matricula_digmer").val() + '",';
    else
        datos += ' "c_matriculadigmer": null,';

    if (valor_nulo_str($("#fld_cargo_matricula").val()) != "") 
        datos += ' "c_cargomatriculadigmer":"' + $("#fld_cargo_matricula").val() + '",';
    else
        datos += ' "c_cargomatriculadigmer": null,';

    if (valor_nulo_str($("#fld_ingreso_motivo").val()) != "") 
        datos += ' "c_motivoingreso":"' + $("#fld_ingreso_motivo").val() + '",';
    else
        datos += ' "c_motivoingreso": null,';

    if (valor_nulo_str($("#fld_cooperativa").val()) != "") 
        datos += ' "c_cooperativa":"' + $("#fld_cooperativa").val() + '",';
    else
        datos += ' "c_cooperativa": null,';

    if (valor_nulo_str($("#fld_categoriaP").val()) != "") 
        datos += ' "c_categoriapescador":"' + $("#fld_categoriaP").val() + '",';
    else
        datos += ' "c_categoriapescador": null,';

    if (valor_nulo_str($("#fld_esp_laboral").val()) != "") 
        datos += ' "c_especificacionlaboral":"' + $("#fld_esp_laboral").val() + '",';
    else
        datos += ' "c_especificacionlaboral": null,';

    if (valor_nulo_str($("#fld_fechafallecimiento").val()) != "") 
        datos += ' "c_fechafallecimiento":"' + $("#fld_fechafallecimiento").val() + '",';
    else
        datos += ' "c_fechafallecimiento": null,';

    if (valor_nulo_str($("#fld_codigoreferencia").val()) != "") 
        datos += ' "c_codigoreferencia":"' + $("#fld_codigoreferencia").val() + '",';
    else
        datos += ' "c_codigoreferencia": null,';

    if (valor_nulo_str($("#fld_documentodefuncion").val()) != "") 
        datos += ' "c_documentodefuncion":"' + $("#fld_documentodefuncion").val() + '",';
    else
        datos += ' "c_documentodefuncion": null,';

    if (valor_nulo_str($("#fld_pesc_ante_ident").val()) != "") 
        datos += ' "c_cedulaanterior":"' + $("#fld_pesc_ante_ident").val() + '",';
    else
        datos += ' "c_cedulaanterior": null,';
    
    if (valor_nulo_str($("#fld_pesc_ante_nombres").val()) != "") 
        datos += ' "c_nombrepescadoranterior":"' + $("#fld_pesc_ante_nombres").val() + '",';
    else
        datos += ' "c_nombrepescadoranterior": null,';
    
    if (valor_nulo_str($("#fld_pesc_ante_apellidos").val()) != "") 
        datos += ' "c_apellidospescadoranterior":"' + $("#fld_pesc_ante_apellidos").val() + '",';
    else
        datos += ' "c_apellidospescadoranterior": null,';

    if (valor_nulo_str($("#fld_cooperativa_anterior").val()) != "") 
        datos += ' "c_cooperativaembarcacion":"' + $("#fld_cooperativa_anterior").val() + '",';
    else
        datos += ' "c_cooperativaembarcacion": null,';

    if (valor_nulo_str($("#fld_licParma_anter").val()) != "") 
        datos += ' "c_parmaanterior":"' + $("#fld_licParma_anter").val() + '",';
    else
        datos += ' "c_parmaanterior": null,';

    if (valor_nulo_str($("#fld_no_proceso").val()) != "") 
        datos += ' "c_nproceso":"' + $("#fld_no_proceso").val() + '",';
    else
        datos += ' "c_nproceso": null,';


    filename = $('#lbl_foto_pescador').val();
    if (filename.substring(3,11) == 'fakepath')
        filename = filename.substring(12);

    if (valor_nulo_str($("#lbl_foto_pescador").val()) != "") 
        datos += ' "c_fotopescador":"' + filename + '",';
    else
        datos += ' "c_fotopescador": null,';


    if (valor_nulo_str($("#fld_licParma").val()) != "") 
        datos += ' "c_licenciaparma":"' + $("#fld_licParma").val() + '",';
    else
        datos += ' "c_licenciaparma": null,';



    if (valor_nulo_str($("#fld_fechaemision").val()) != "") 
        datos += ' "c_fechaemision":"' + $("#fld_fechaemision").val() + '",';
    else
        datos += ' "c_fechaemision": null,';

    if (valor_nulo_str($("#fld_fechacaducidad").val()) != "") 
        datos += ' "c_fechacaducidad":"' + $("#fld_fechacaducidad").val() + '",';
    else
        datos += ' "c_fechacaducidad": null,';

    if($("#fld_islaresidencia").val() == 'Isla Santa Cruz'){
        if(valor_nulo_str($("#fld_tipoemision").val()) != "")
            datos += ' "c_tipoemisionsancruz":"' + $("#fld_tipoemision").val() + '",';
        else
            datos += ' "c_tipoemisionsancruz": null,';
    }else if($("#fld_islaresidencia").val() == 'Isla San Cristobal'){
        if(valor_nulo_str($("#fld_tipoemision").val()) != "")
            datos += ' "c_tipoemisionsancristobal":"' + $("#fld_tipoemision").val() + '",';
        else
            datos += ' "c_tipoemisionsancristobal": null,';
    }else if($("#fld_islaresidencia").val() == 'Isla Isabela'){
        if(valor_nulo_str($("#fld_tipoemision").val()) != "")
            datos += ' "c_tipoemisionisabela":"' + $("#fld_tipoemision").val() + '",';
        else
            datos += ' "c_tipoemisionisabela": null,';
    }

    if (valor_nulo_str($("#fld_observacion").val()) != "") 
        datos += ' "c_observacion":"' + $("#fld_observacion").val() + '"';
    else
        datos += ' "c_observacion": null';


    /*
    if (valor_nulo_str($("#fld_licParma_anter").val()) != "") 
        datos += ' "c_licenciaparma":"' + $("#fld_licParma_anter").val() + '",';
    */

    //datos += '}';

    datos = datos.replace(/undefined/g, null);
    datos = datos.replace(/None/g,null);
    datos = datos.replace(/False/g,null);
    datos = datos.replace(/True/g,"'true'");
    datos = datos.replace(/'/g,'"');
    datos = datos.replace(/"null"/g, null);

    return datos;
}



// Embarcacion pesca
function limpiarFormEmbarcacionpesca() {
    console.log("********** limpiarFormEmbarcacionpesca **********");
    $("#tipotEmbarcacionpesca").val(0); // bandera -> 0 Insertar, 1 Actualizar

    $("#fld_matricula").val("");
    $("#fld_nombre_embarcacion").val("");
    $("#fld_tipoembarcacion").val("");
    $("#ins_fechainspeccion").val("");
    $("#fld_categoria").val("");
    $("#fld_isla").val("");
    $("#fld_puerto_registro").val("");
    $("#fld_estado").val("");
    $("#fld_eslora").val("");
    $("#fld_manga").val("");
    $("#fld_puntal").val("");
    $("#fld_calado").val("");
    $("#ins_esloravigente").val("");
    $("#ins_mangavigente").val("");
    $("#ins_puntalvigente").val("");
    $("#fld_ciudad").val("");
    $("#fld_anioconstruccion").val("");
    $("#fld_material").val("");
    $("#fld_ntripulantes").val("");
    $("#fld_tonelajeneto").val("");
    $("#fld_autonomia").val("");
    $("#fld_conservacion").val("");
    $("#fld_motorunohp").val("");
    $("#fld_marcaMotor1").val("");
    $("#fld_tiempomotor1").val("");
    $("#fld_motordoshp").val("");
    $("#fld_marcaMotor2").val("");
    $("#fld_tiempomotor2").val("");
    $("#fld_c_armadorunocedula").val("");
    $("#fld_c_armadorunonombres").val("");
    $("#fld_c_armadorunoapellidos").val("");
    $("#fld_c_armadorunoparma").val("");
    $("#fld_c_armadordoscedula").val("");
    $("#fld_c_armadordosnombres").val("");
    $("#fld_c_armadordosapellidos").val("");
    $("#fld_c_armadordosparma").val("");
    $("#ins_modificacionembarcacion").val("");
    $("#ins_estapintado").val("");
    $("#ins_tienepintadomatricula").val("");
    $("#ins_coincidenmatricula").val("");
    $("#ins_coincidefotografia").val("");
    $("#ins_inspeccion").val("");
    $("#ins_observaciones").val("");
    $("#ins_guardaparqueresponsable").val("");
    $("#ins_armadorpresente").val("");
    $("#ins_cambiarfotografiaSi").prop("checked", false);
    $("#ins_cambiarfotografiaNo").prop("checked", false);
    $("#bodytabla_historialpermisopesca").html("");

    $("#psc_fechaemision").val("");
    $("#psc_fechacaducidad").val("");
    $("#psc_tipoemision").val("");
    $("#psc_fechainspecciontecnica").val("");
    $("#psc_permisopesca").val("");
    $("#psc_aprobadaecosistemasSi").val("");
    $("#psc_aprobadaecosistemasNO").val("");
    $("#psc_operacionaltura").prop("checked", false);
    $("#psc_operacioncostera").prop("checked", false);
    $("#psc_especies_crustaceo").prop("checked", false);
    $("#psc_especies_molusco").prop("checked", false);
    $("#psc_especies_pepinomar").prop("checked", false);
    $("#psc_especies_pescablanca").prop("checked", false);
    $("#psc_artes_caña").prop("checked", false);
    $("#psc_artes_chinchorro").prop("checked", false);
    $("#psc_artes_redes").prop("checked", false);
    $("#psc_artes_empatefondo").prop("checked", false);
    $("#psc_artes_empateoceanico").prop("checked", false);
    $("#psc_artes_trasmallo").prop("checked", false);
    $("#psc_artes_lineaarrastre").prop("checked", false);
    $("#psc_artes_lineaarrastresenielo").prop("checked", false);
    $("#psc_artes_varahawaiana").prop("checked", false);
    $("#psc_artes_manos").prop("checked", false);
    $("#psc_artes_otros").prop("checked", false);
    $("#psc_aprobadaecosistemas").val("");


    // mostrar y ocultar 

    $("#tabobservaciones").hide();
    $("#tabpermisopesca").hide();
    $("#tabdatospesca").hide();
	$("#tituloE").show();
	$("#tituloInspeccion").hide();
    $("#tituloPermiso").hide();
	$("#lbl_reglamento").hide();
	$("#med_matriculavigente").hide();
    $("#lbl_actualinspeccion").hide();
    $("#dv_categoria").show();
    $("#lbl_categoria").show();
    $("#dv_islapuerto").show();
    $("#lbl_estado").show();
    $("#dv_estado").show();
    $("#dv_fechainspeccion").hide();
    $("#fld_calado").show();
    $("#lbl_calado").show();
    $("#lbl_datostecnicos").show();
    $("#dv_datostecnicos").show();
    $("#lbl_tonelajebruto").hide();
    $("#fld_tonelajebruto").hide();
    $("#dv_tabobservaciones").hide();
    $("#dv_tabdatospesca").hide();
    $("#dv_responsables").hide();
    $("#dv_fotoembarcacion").show();
    $("#fld_consultararmador1").show();
    $("#fld_consultararmador2").show();

    $("#fld_matricula").prop('disabled', false);
    $("#fld_nombre_embarcacion").prop('disabled', false);
    $("#fld_tipoembarcacion").prop('disabled', false);
    $("#fld_categoria").prop('disabled', false);
    $("#fld_isla").prop('disabled', false);
    $("#fld_puerto_registro").prop('disabled', false);
    $("#fld_eslora").prop('disabled', false);
    $("#fld_manga").prop('disabled', false);
    $("#fld_puntal").prop('disabled', false);
    $("#fld_calado").prop('disabled', false);
    $("#fld_ciudad").prop('disabled', false);
    $("#fld_anioconstruccion").prop('disabled', false);
    $("#fld_material").prop('disabled', false);
    $("#fld_ntripulantes").prop('disabled', false);
    $("#fld_tonelajeneto").prop('disabled', false);
    $("#fld_tonelajebruto").prop('disabled', false);
    $("#fld_autonomia").prop('disabled', false);
    $("#fld_conservacion").prop('disabled', false);
    $("#fld_motorunohp").prop('disabled', false);
    $("#fld_marcaMotor1").prop('disabled', false);
    $("#fld_tiempomotor1").prop('disabled', false);


	$('#dv_foto').css('visibility', "hidden"); //Ocular foto de pescador
    $("#foto_personal").attr('src', '');
    $("#foto_personal").attr('style', "width:193px;height:237px;");
    $("#link_foto_personal").attr('href', '');


    cargarDatosMaestrosEmbarcaciones();

}

function cargarDatosMaestrosEmbarcaciones(){
    console.log("******** cargarDatosMaestrosEmbarcaciones ************** ");

    $.ajax({
        url: "data_cuem_masters_embarcaciones",
        type: "get",
        data: {"data": ""},
        dataType: "json",
        async:false,

        success: function(data) {
            console.log(data);
            if(data['non_field_errors']){
              console.log(data['non_field_errors']);
            }else{
                console.log(data);
                if(data){
                    option = '<option value=""> Seleccione una opcion</option>';
                    optionT = "";
                    option_descrp = '';
                    cargo_institucional= '';
                    direccion= '';
                    isla= '';
                    identificacion= '';
                    nombre_completo= '';
                    
                    // CIUDAD
                    optionT="";
                    for(i = 0; i < data["ciudad"].length; i++){
                        optionT+="<option value='"+data["ciudad"][i][0]+"'>"+data["ciudad"][i][0]+" </option>";
                    }
                    //$("#option_ciudad").val(optionT);
                    $("#fld_ciudad").html(option + optionT);
                    $("#fld_ciudad").select2({
                      sorter: data => data.sort((a, b) => a.text.localeCompare(b.text)),
                    });

                    // ISLA
                    optionT="";
                    for(i = 0; i < data["isla"].length; i++){
                        optionT+="<option value='"+data["isla"][i][0]+"'>"+data["isla"][i][0]+" </option>";
                    }
                    //$("#option_isla").val(optionT);
                    $("#fld_isla").html(option + optionT);
                    $("#fld_isla").select2({
                      sorter: data => data.sort((a, b) => a.text.localeCompare(b.text)),
                    });

                    // PUERTO 
                    optionT="";
                    for(i = 0; i < data["puerto"].length; i++){
                        optionT+="<option value='"+data["puerto"][i][0]+"'>"+data["puerto"][i][0]+" </option>";
                    }
                    //$("#option_cooperativa").val(optionT);
                    $("#fld_puerto_registro").html(option + optionT);
                    $("#fld_puerto_registro").select2({
                      sorter: data => data.sort((a, b) => a.text.localeCompare(b.text)),
                    });

                    // MATERIALES EMBARCACION
                    optionT="";
                    for(i = 0; i < data["materiales_emb"].length; i++){
                        optionT+="<option value='"+data["materiales_emb"][i][0]+"'>"+data["materiales_emb"][i][0]+" </option>";
                    }
                    //$("#option_cooperativa").val(optionT);
                    $("#fld_material").html(option + optionT);
                    $("#fld_material").html(option + optionT);
                    
                    $("#fld_material").select2({
                      sorter: data => data.sort((a, b) => a.text.localeCompare(b.text)),
                    });
                   
                    // MARCA MOTORES
                    optionT="";
                    for(i = 0; i < data["marca_motores"].length; i++){
                        optionT+="<option value='"+data["marca_motores"][i][0]+"'>"+data["marca_motores"][i][0]+" </option>";
                    }
                    //$("#option_categoria").val(optionT);
                    $("#fld_marcaMotor1").html(option + optionT);
                    $("#fld_marcaMotor2").html(option + optionT);

                    $("#fld_marcaMotor1").select2({
                      sorter: data => data.sort((a, b) => a.text.localeCompare(b.text)),
                    });
                    $("#fld_marcaMotor2").select2({
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

function buscarEmbarcacionesPesca() {
    console.log("********** buscarEmbarcacionesPesca ********** ");
    
    $("#modalLoadin").show();
    data = '';

    matricula = $("#matriculafilter").val();
    nombreembarcacion = $("#nombresfilter").val();
    puertoregistro = $("#SpuertoregistroFilter").val();
    estado = $("#SestadoFilter").val();

    if(nombreembarcacion != "")
        data += "c_nombreembarcacion=" + nombreembarcacion + "&";

    if(matricula != "")
        data = "c_matriculadigmer=" + matricula + "&";

    if(puertoregistro != "")
        data = "c_puertoregistro=" + puertoregistro + "&";

    if(estado != "")
        data += "c_estado=" + estado + "&";

    data = data.substring(0, data.length - 1);

    console.log(data);

    $.ajax({
        url: "get_lista_embarcacionesPesca",
        type: "get",
        data: {
            "data": data,
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

                        tabla += "<tr>";
                        tabla += "<td align='center' id='td_matricula_"+ data[i].id + "'>" + data[i].c_matriculadigmer + "</td>";
                        tabla += "<td align='center' id='td_emb_"+ data[i].id + "'>" + valor_nulo_str(data[i].c_nombreembarcacion) + "</td>";
                        tabla += "<td align='center' id='td_tipoemb_" + data[i].id + "'>" + valor_nulo_str(data[i].c_tipoembarcacion) + "</td>";
                        tabla += "<td align='center' id='td_isla_" + data[i].id + "'>" + valor_nulo_str(data[i].c_islaorigen) + "</td>";
                        tabla += "<td align='center' id='td_estado_" + data[i].id + "'>" + valor_nulo_str(data[i].c_estado)  + "</td>";
                        tabla += "<td align='center'><a href='#verFicha' data-stackbox='true' data-stackbox-position='absolute' data-stackbox-width='1000' onclick='verFichaEmbarcacion(\"" + data[i].id + "\")' title='Ver Embarcacion Pesca'><i class='fa fa-user text-green btn_edit'></i></a> </td>";
                        tabla += "<td align='center'><a style='font-size: 18px; cursor: pointer;' href='#addEmbarcaciones' data-stackbox='true' data-stackbox-position='absolute' data-stackbox-width='75%' onclick='editEmbarcacionpesca(\"" + data[i].id +"\")' title='Editar Embarcacion Pesca'><i class='fa fa-edit text-green'></i></a></td>";
                        tabla += "<td align='center'><a style='font-size: 18px; cursor: pointer;' href='#addEmbarcaciones' data-stackbox='true' data-stackbox-position='absolute' data-stackbox-width='75%' onclick='addInspeccionTecnicaOcularEmbarcacionpesca(\"" + data[i].id +"\")' title='Inpección Técnica'><i class='fa fa-eye text-blue'></i></a></td>";
                        tabla += "<td align='center'><a style='font-size: 18px; cursor: pointer;' href='#addEmbarcaciones' data-stackbox='true' data-stackbox-position='absolute' data-stackbox-width='75%' onclick='addPermisoPescaEmbarcacion(\"" + data[i].id +"\")' title='Emitir Permiso Pesca'><i class='fa fa-send text-blue'></i></a></td>";
                        tabla += "<td align='center'><a style='font-size: 18px; cursor: pointer;' onclick='deleteModal(\"" + data[i].id + "\",\"embarcacionespesca\");'><i class='fa fa-trash text-green' title='Eliminar Embarcacion'></i></a></td>";
                        tabla += "</tr>";

                    } /*fin for*/
                } /*fin if length*/

                $('#tabla_embarcaciones').dataTable().fnClearTable();
                $('#tabla_embarcaciones').dataTable().fnDestroy();

                $("#bodytabla_embarcaciones").html("");
                $("#bodytabla_embarcaciones").append(tabla);

                var table = $('#tabla_embarcaciones').DataTable( {
			        orderCellsTop: true,
			        "order": [[ 1, "asc" ]],
			        responsive: true
			    } );

			    $('#tabla_embarcaciones thead .filters th').each(function() {
			        //var title = $(this).text();
			        var title = $('#tabla_embarcaciones thead tr:eq(0) th').eq($(this).index()).text();

			      if ((title == "")) {
			        $(this).html('');
			      }else{
			          $(this).html('<input type="text" placeholder="Buscar ' + title + '" style="color:black;"/>');
			      }
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
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
            $("#modalLoadin").hide();
            //console.log( JSON.stringify(data));
        },
    });
}
/*funcion para ver la ficha de la embarcacion*/
function verFichaEmbarcacion(id) {
    console.log("******* verFichaEmbarcacion *******");

    var path_foto_embarcaciones = 'static/media/cuem_mpesq/pescadores/'+id+"/";

    //$("#modalLoadin").show();
    $.ajax({
        url: "get_data_embarcacionpesca",
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

            	
                if (valor_nulo_str(json.c_fotoembarcacion) != "")
                    $("#imgContentFileFotF").attr("src", path_foto_embarcaciones + json.c_fotoembarcacion+"?timestamp="+ new Date().getTime() );
                else
                    $("#imgContentFileFotF").attr("src", "static/media/talentohumano/carnetizacion/prueba.png");
				

                //$("#imgContentFileFotF").attr("src", json.c_fotoembarcacion);
                
                $("#td_c_nombreembarcacion").html(json.c_nombreembarcacion);
                $("#td_c_matricula").html(valor_nulo_str(json.c_matriculadigmer));
                $("#td_c_tipoembarcacion").html(valor_nulo_str(json.c_tipoembarcacion));
                $("#td_c_categoria").html(valor_nulo_str(json.c_categoria));
                $("#td_c_islaorigen").html(valor_nulo_str(json.c_islaorigen));
                $("#td_c_puertoregistro").html(valor_nulo_str(json.c_puertoregistro));
                $("#td_c_permiso").html(valor_nulo_str(json.c_permisopesca));

                $("#td_c_eslora").html(json.c_eslora);
                $("#td_c_manga").html(valor_nulo_str(json.c_manga));
                $("#td_c_puntal").html(valor_nulo_str(json.c_puntal));
                $("#td_c_calado").html(valor_nulo_str(json.c_calado));
                $("#td_c_lugarconstruccion").html(valor_nulo_str(json.c_lugarconstruccion));
                $("#td_c_anioconstruccion").html(valor_nulo_str(json.c_anioconstruccion));
                $("#td_c_tripulantes").html(valor_nulo_str(json.c_ntripulantes));
                $("#td_c_tonelaje").html(valor_nulo_str(json.c_tonelajeneto));
                $("#td_c_motoruno").html(valor_nulo_str(json.c_motorunohp));
                $("#td_c_marcauno").html(valor_nulo_str(json.c_marcauno));
                $("#td_c_motordos").html(valor_nulo_str(json.c_motordoshp));
                $("#td_c_marcados").html(valor_nulo_str(json.c_marcados));

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

function editEmbarcacionpesca(id) {
    console.log(">> editEmbarcacionpesca <<");
    limpiarFormEmbarcacionpesca();

    $('.nav-tabs a[href="#tab_datosgenerales"]').tab('show');
    $("#tipotEmbarcacionpesca").val(1);
    $("#idEmbarcacionesP").val(id);
    $("#modalLoadin").show();
    $("#tabpermisopesca").show();


    $.ajax({
        url: "get_data_embarcacionpesca",
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

                $("#fld_matricula").val(valor_nulo_str(json.c_matriculadigmer));
                $("#fld_nombre_embarcacion").val(valor_nulo_str(json.c_nombreembarcacion));
                $("#fld_tipoembarcacion").val(valor_nulo_str(json.c_tipoembarcacion)).trigger("change");
                $("#fld_categoria").val(valor_nulo_str(json.c_categoria)).trigger("change");
                $("#fld_isla").val(valor_nulo_str(json.c_islaorigen)).trigger("change");
                $("#fld_puerto_registro").val(valor_nulo_str(json.c_puertoregistro)).trigger("change");
                $("#fld_estado").val(valor_nulo_str(json.c_estado)).trigger("change");
                $("#fld_eslora").val(valor_nulo_str(json.c_eslora));
                $("#fld_manga").val(valor_nulo_str(json.c_manga));
                $("#fld_puntal").val(valor_nulo_str(json.c_puntal));
                $("#fld_calado").val(valor_nulo_str(json.c_calado));

                $("#fld_ciudad").val(valor_nulo_str(json.c_lugarconstruccion)).trigger("change");
                $("#fld_anioconstruccion").val(valor_nulo_str(json.c_anioconstruccion));
                $("#fld_material").val(valor_nulo_str(json.c_materialcasco)).trigger("change");
                $("#fld_ntripulantes").val(valor_nulo_str(json.c_ntripulantes));
                $("#fld_tonelajeneto").val(valor_nulo_str(json.c_tonelajeneto));
                $("#fld_autonomia").val(valor_nulo_str(json.c_autonomia));
                $("#fld_conservacion").val(valor_nulo_str(json.c_conservacion));
                $("#fld_motorunohp").val(valor_nulo_str(json.c_motorunohp));
                $("#fld_marcaMotor1").val(valor_nulo_str(json.c_marcauno)).trigger("change");
                $("#fld_tiempomotor1").val(valor_nulo_str(json.c_tiempomotoruno)).trigger("change");
                $("#fld_motordoshp").val(valor_nulo_str(json.c_motordoshp));
                $("#fld_marcaMotor2").val(valor_nulo_str(json.c_marcados)).trigger("change");
                $("#fld_tiempomotor2").val(valor_nulo_str(json.c_tiempomotordos)).trigger("change")

                $("#fld_c_armadorunocedula").val(valor_nulo_str(json.c_armadorunocedula));
                $("#fld_c_armadorunonombres").val(valor_nulo_str(json.c_armadorunonombres));
                $("#fld_c_armadorunoapellidos").val(valor_nulo_str(json.c_armadorunoapellidos));
                $("#fld_c_armadorunoparma").val(valor_nulo_str(json.c_armadorunoparma));
                $("#fld_c_armadordoscedula").val(valor_nulo_str(json.c_armadordoscedula));
                $("#fld_c_armadordosnombres").val(valor_nulo_str(json.c_armadordosnombres));
                $("#fld_c_armadordosapellidos").val(valor_nulo_str(json.c_armadordosapellidos));
                $("#fld_c_armadordosparma").val(valor_nulo_str(json.c_armadordosparma));

                $('#dv_foto').css('visibility', "visible");
                $("#foto_personal").attr('src', json.c_fotoembarcacion);
                $("#foto_personal").attr('style', "width:193px;height:237px;");
                $("#link_foto_personal").attr('href',json.c_fotoembarcacion);


                // Historial Permiso Pesca
                $.ajax({
                    url: "get_historialpermisopesca",
                    type: "get",
                    cache: 'false',
                    data: {
                        "matricula": json.c_matriculadigmer
                    },
                    dataType: "json",
                    async: false,

                    success: function(json) {
                        option = "";
                        num = 0;

                        if (json['error']) {
                            if (json['error']['context'])
                                var salida = json['error']['context']['resource'][0].message;
                            else
                                var salida = json['error']['message']
                        } else {

                            
                            for(i = 0; i < json["hist_permiso"].length; i++){
                                num = num+1;
                                option += '<tr class="odd">';
                                option += '<td valign="center" class="dataTables_empty">'+num+'</td>';
                                option += '<td valign="center" class="dataTables_empty">'+json["hist_permiso"][i][1]+'</td>';
                                option += '<td valign="center" class="dataTables_empty">'+json["hist_permiso"][i][2]+'</td>';
                                option += '<td valign="center" class="dataTables_empty">'+json["hist_permiso"][i][3]+'</td>';
                                //option += '<td valign="center" class="dataTables_empty">'+valor_nulo_str(json["hist_permiso"][i][4])+'</td>';
                                option += '</tr>';
                            }
                           

                            $("#bodytabla_historialpermisopesca").html(option);

                        }
                    },
                    error: function(data) {
                        $("#modalLoadin").hide(); 
                        swal("", "Error: " + JSON.stringify(data), "error");
                        console.log(JSON.stringify(data));
                    },
                });


            }
        },
        error: function(data) {
            $("#modalLoadin").hide();
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
        },
    });
}

function setInsertUpdateEmbarcacionpesca() {
    console.log("******** setInsertUpdateEmbarcacionpesca **********");
    valida = validaContenedor("addEmbarcaciones");
    var bool = false;

    if(valida){
    	if($("#tipotEmbarcacionpesca").val() == 0)
	        insertarTablaEmbarcacionpesca();
	    else if($("#tipotEmbarcacionpesca").val() == 1)
	        saveEditEmbarcacionpesca();
	    else if($("#tipotEmbarcacionpesca").val() == 2)
	    	insertarInspeccionTecnicaEmbarcacion();
        else if($("#tipotEmbarcacionpesca").val() == 3)
            insertarPermisoPesca();
    }
    
}

function insertarTablaEmbarcacionpesca() {
    console.log("******* insertarTablaEmbarcacionpesca *******");
    datos = get_json_embarcacionpesca();
    datos += '}';

    //id_padre = $("#content_Embarcacionpesca").parent().attr('id');
    //th_insert(datos, "SL_cuem_embarcacionespescaPesca", id_padre, "appfdtembarcacionpesca");

    $.ajax({
            url: "insert_General",
            type: 'get',
            cache: 'false',
            data: {
                "dj_url": 'appfdtembarcacionpesca',
                "data": JSON.stringify("[" + datos + "]")
            },
            dataType: "json",
            success: function(data) {
                if (!data['results']) {
                    $('#modalLoadin').hide();
                    swal("", "Error al Insertar el registro: " + data['non_field_errors'][0], "error");
                    console.log("data---->" + datos + "--->" + "appfdtembarcacionpesca" + "Error--->" + data);
                } else {
                    //console.log(data);
                    $('#modalLoadin').hide();
                    swal("", "Registro insertado con exito", "success");

                   	buscarEmbarcacionesPesca();
                }
            },
            error: function(data) {
                $('#modalLoadin').hide();
                swal("", "Error al Insertar el registro", "error");
                console.log("data---->" + datos + "--->" + "appfdtembarcacionpesca" + "Error--->" + data);
            },
        });
}

function saveEditEmbarcacionpesca() {
    console.log("******* saveEditEmbarcacionpesca *******");
    id = $("#idEmbarcacionesP").val();
    datos = get_json_embarcacionpesca();
    datos += '}';

    id_padre = $('#content_Embarcacionpesca').parent().attr('id');
    th_update(datos, "SL_cuem_embarcacionespescaPesca", id_padre, "appfdtembarcacionpesca",id);
    buscarEmbarcacionesPesca();

}

function deleteEmbarcacionPesca(id) {
    id_padre = $('#content_Embarcacionpesca').parent().attr('id');
    datos = '{"estado":"I","eliminado":"t"}';
    th_delete(datos, "SL_cuem_embarcacionespescaPesca", id_padre, "appfdtembarcacionpesca",id);
}

function get_json_embarcacionpesca(){

    /*se arma la cadena datos*/
    datos = '{';

    //SOLICITANTE
    if (valor_nulo_str($("#fld_matricula").val()) != "") 
        datos += ' "c_matriculadigmer":"' + $("#fld_matricula").val() + '",';

    if (valor_nulo_str($("#fld_nombre_embarcacion").val()) != "") 
        datos += ' "c_nombreembarcacion":"' + $("#fld_nombre_embarcacion").val() + '",';

    if (valor_nulo_str($("#fld_tipoembarcacion").val()) != "") 
        datos += ' "c_tipoembarcacion":"' + $("#fld_tipoembarcacion").val() + '",';

    if (valor_nulo_str($("#fld_categoria").val()) != "") 
        datos += ' "c_categoria":"' + $("#fld_categoria").val() + '",';

    if (valor_nulo_str($("#fld_isla").val()) != "") 
        datos += ' "c_islaorigen":"' + $("#fld_isla").val() + '",';
    else
        datos += ' "c_islaorigen": null,';

    if (valor_nulo_str($("#fld_puerto_registro").val()) != "") 
        datos += ' "c_puertoregistro":"' + $("#fld_puerto_registro").val() + '",';
    else
        datos += ' "c_puertoregistro": null,';

    if (valor_nulo_str($("#fld_estado").val()) != "") 
        datos += ' "c_estado":"' + $("#fld_estado").val() + '",';
    else
        datos += ' "c_estado": null,';

    filename = $('#lbl_foto_Embarcaciones').val();
    if (filename.substring(3,11) == 'fakepath')
        filename = filename.substring(12);

    if (valor_nulo_str($("#lbl_foto_Embarcaciones").val()) != "") 
        datos += ' "c_fotoembarcacion":"' + filename + '",';
    else
        datos += ' "c_fotoembarcacion": null,';

    if (valor_nulo_str($("#fld_eslora").val()) != "") 
        datos += ' "c_eslora":"' + $("#fld_eslora").val() + '",';

    if (valor_nulo_str($("#fld_manga").val()) != "") 
        datos += ' "c_manga":"' + $("#fld_manga").val() + '",';

    if (valor_nulo_str($("#fld_puntal").val()) != "") 
        datos += ' "c_puntal":"' + $("#fld_puntal").val() + '",';

    if (valor_nulo_str($("#fld_calado").val()) != "") 
        datos += ' "c_calado":"' + $("#fld_calado").val() + '",';

    /*
    if (valor_nulo_str($("#fld_estado_pescador").val()) != "") 
        datos += ' "c_instruccionacademica":"' + $("#fld_estado_pescador").val() + '",';
    */

    if (valor_nulo_str($("#fld_ciudad").val()) != "") 
        datos += ' "c_lugarconstruccion":"' + $("#fld_ciudad").val() + '",';
    else
        datos += ' "c_lugarconstruccion": null,';

    if (valor_nulo_str($("#fld_anioconstruccion").val()) != "") 
        datos += ' "c_anioconstruccion":"' + $("#fld_anioconstruccion").val() + '",';
    else
        datos += ' "c_anioconstruccion": null,';

    if (valor_nulo_str($("#fld_material").val()) != "") 
        datos += ' "c_materialcasco":"' + $("#fld_material").val() + '",';
    else
        datos += ' "c_materialcasco": null,';

    if (valor_nulo_str($("#fld_ntripulantes").val()) != "") 
        datos += ' "c_ntripulantes":"' + $("#fld_ntripulantes").val() + '",';
    else
        datos += ' "c_ntripulantes": null,';

    if (valor_nulo_str($("#fld_tonelajeneto").val()) != "") 
        datos += ' "c_tonelajeneto":"' + $("#fld_tonelajeneto").val() + '",';
    else
        datos += ' "c_tonelajeneto": null,';

    if (valor_nulo_str($("#fld_autonomia").val()) != "") 
        datos += ' "c_autonomia":"' + $("#fld_autonomia").val() + '",';
    else
        datos += ' "c_autonomia": null,';

    if (valor_nulo_str($("#fld_conservacion").val()) != "") 
        datos += ' "c_conservacion":"' + $("#fld_conservacion").val() + '",';
    else
        datos += ' "c_conservacion": null,';

    if (valor_nulo_str($("#fld_motorunohp").val()) != "") 
        datos += ' "c_motorunohp":"' + $("#fld_motorunohp").val() + '",';
    else
        datos += ' "c_motorunohp": null,';

    if (valor_nulo_str($("#fld_marcaMotor1").val()) != "") 
        datos += ' "c_marcauno":"' + $("#fld_marcaMotor1").val() + '",';
    else
        datos += ' "c_marcauno": null,';

    if (valor_nulo_str($("#fld_tiempomotor1").val()) != "") 
        datos += ' "c_tiempomotoruno":"' + $("#fld_tiempomotor1").val() + '",';
    else
        datos += ' "c_tiempomotoruno": null,';

    if (valor_nulo_str($("#fld_motordoshp").val()) != "") 
        datos += ' "c_motordoshp":"' + $("#fld_motordoshp").val() + '",';
    else
        datos += ' "c_motordoshp": null,';

    if (valor_nulo_str($("#fld_marcaMotor2").val()) != "") 
        datos += ' "c_marcados":"' + $("#fld_marcaMotor2").val() + '",';
    else
        datos += ' "c_marcados": null,';

    if (valor_nulo_str($("#fld_tiempomotor2").val()) != "") 
        datos += ' "c_tiempomotordos":"' + $("#fld_tiempomotor2").val() + '",';
    else
        datos += ' "c_tiempomotordos": null,';

    /*
    if (valor_nulo_str($("#fld_referencia").val()) != "") 
        datos += ' "c_instruccionacademica":"' + $("#fld_referencia").val() + '",';
    */

    if (valor_nulo_str($("#fld_c_armadorunocedula").val()) != "") 
        datos += ' "c_armadorunocedula":"' + $("#fld_c_armadorunocedula").val() + '",';
    else
        datos += ' "c_armadorunocedula": null,';

    if (valor_nulo_str($("#fld_c_armadorunonombres").val()) != "") 
        datos += ' "c_armadorunonombres":"' + $("#fld_c_armadorunonombres").val() + '",';
    else
        datos += ' "c_armadorunonombres": null,';

    if (valor_nulo_str($("#fld_c_armadorunoapellidos").val()) != "") 
        datos += ' "c_armadorunoapellidos":"' + $("#fld_c_armadorunoapellidos").val() + '",';
    else
        datos += ' "c_armadorunoapellidos": null,';

    if (valor_nulo_str($("#fld_c_armadorunoparma").val()) != "") 
        datos += ' "c_armadorunoparma":"' + $("#fld_c_armadorunoparma").val() + '",';
    else
        datos += ' "c_armadorunoparma": null,';

    if (valor_nulo_str($("#fld_c_armadordoscedula").val()) != "") 
        datos += ' "c_armadordoscedula":"' + $("#fld_c_armadordoscedula").val() + '",';
    else
        datos += ' "c_armadordoscedula": null,';

    if (valor_nulo_str($("#fld_c_armadordosnombres").val()) != "") 
        datos += ' "c_armadordosnombres":"' + $("#fld_c_armadordosnombres").val() + '",';
    else
        datos += ' "c_armadordosnombres": null,';

    if (valor_nulo_str($("#fld_c_armadordosapellidos").val()) != "") 
        datos += ' "c_armadordosapellidos":"' + $("#fld_c_armadordosapellidos").val() + '",';
    else
        datos += ' "c_armadordosapellidos": null,';

    if (valor_nulo_str($("#fld_c_armadordosparma").val()) != "") 
        datos += ' "c_armadordosparma":"' + $("#fld_c_armadordosparma").val() + '"';
    else
        datos += ' "c_armadordosparma": null';



    //datos += '}';

    datos = datos.replace(/undefined/g, null);
    datos = datos.replace(/None/g,null);
    datos = datos.replace(/False/g,null);
    datos = datos.replace(/True/g,"'true'");
    datos = datos.replace(/'/g,'"');
    datos = datos.replace(/"null"/g, null);

    return datos;
}



// Inspeccion Tecnica Ocular Embarcacion pesca
function buscarInspeccionTecnicaEmbarcacion() {
    console.log("********** buscarInspeccionTecnicaEmbarcacion ********** ");
    
    $("#modalLoadin").show();
    data = '';

    matricula = $("#matriculafilter").val();
    nombreembarcacion = $("#nombresfilter").val();
    inspeccion = $("#SinspeccionFilter").val();

    if(nombreembarcacion != "")
        data += "c_nombreembarcacion=" + nombreembarcacion + "&";

    if(matricula != "")
        data = "c_matriculadigmer=" + matricula + "&";

    if(inspeccion != "")
        data += "c_inspeccion=" + inspeccion + "&";

    data = data.substring(0, data.length - 1);

    $.ajax({
        url: "get_lista_inspecciontecnicaembarcacion",
        type: "get",
        data: {
            "data": data,
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

                        f_ins = data[i].c_fechainspeccion;
                        f_ins = f_ins.split('-').reverse().join("/");

                        tabla += "<tr>";
                        tabla += "<td align='center' id='td_matricula_"+ data[i].id + "'>" + data[i].c_matriculadigmer + "</td>";
                        tabla += "<td align='center' id='td_emb_"+ data[i].id + "'>" + valor_nulo_str(data[i].c_nombreembarcacion) + "</td>";
                        tabla += "<td align='center' id='td_tipoemb_" + data[i].id + "'>" + valor_nulo_str(data[i].c_tipoembarcacion) + "</td>";
                        tabla += "<td align='center' id='td_isla_" + data[i].id + "'>" + valor_nulo_str(f_ins) + "</td>";
                        tabla += "<td align='center' id='td_estado_" + data[i].id + "'>" + valor_nulo_str(data[i].c_inspeccion)  + "</td>";
                        tabla += "<td align='center'><a style='font-size: 18px; cursor: pointer;' href='#addEmbarcaciones' data-stackbox='true' data-stackbox-position='absolute' data-stackbox-width='80%' onclick='verInspeccionTecnicaEmbarcacion(\"" + data[i].id +"\")' title='Ver Inspeccion Tecnica Embarcacion Pesca'><i class='fa fa-search text-green'></i></a></td>";
                        tabla += "</tr>";

                    } /*fin for*/
                } /*fin if length*/

                $('#tabla_inspecciotecnicanembarcacion').dataTable().fnClearTable();
                $('#tabla_inspecciotecnicanembarcacion').dataTable().fnDestroy();

                $("#bodytabla_inspecciotecnicanembarcacion").html("");
                $("#bodytabla_inspecciotecnicanembarcacion").append(tabla);

                var table = $('#tabla_inspecciotecnicanembarcacion').DataTable( {
                    orderCellsTop: true,
                    "order": [[ 1, "asc" ]],
                    responsive: true
                } );

                $('#tabla_inspecciotecnicanembarcacion thead .filters th').each(function() {
                    //var title = $(this).text();
                    var title = $('#tabla_inspecciotecnicanembarcacion thead tr:eq(0) th').eq($(this).index()).text();

                  if ((title == "")) {
                    $(this).html('');
                  }else{
                      $(this).html('<input type="text" placeholder="Buscar ' + title + '" style="color:black;"/>');
                  }
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
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
            $("#modalLoadin").hide();
            //console.log( JSON.stringify(data));
        },
    });
}

function addInspeccionTecnicaOcularEmbarcacionpesca(id){
    console.log(">> verInspeccionTecnicaOcularEmbarcacionpesca <<");
    limpiarFormEmbarcacionpesca();

    $('.nav-tabs a[href="#tab_datosgenerales"]').tab('show');
    $("#tipotEmbarcacionpesca").val(2);
    $("#idEmbarcacionesP").val(id);
    $("#modalLoadin").show();
    $("#tabobservaciones").show();
    $("#tabdatospesca").hide();
    $("#tabpermisopesca").hide();
    $("#dv_categoria").hide();
    $("#lbl_categoria").hide();
    $("#dv_islapuerto").hide();
    $("#dv_fechainspeccion").show();
    $("#fld_calado").hide();
    $("#lbl_calado").hide();
    $("#lbl_actualinspeccion").show();
    $("#med_matriculavigente").show();
    $("#lbl_datostecnicos").hide();
    $("#dv_datostecnicos").hide();
    $("#tituloInspeccion").show();
    $("#tituloE").hide();
    $("#lbl_reglamento").show();
    $("#dv_tabobservaciones").show();
    $("#dv_responsables").show();
    $("#dv_fotoembarcacion").hide();
    $("#fld_consultararmador1").hide();
    $("#fld_consultararmador2").hide();
    $("#fld_matricula").prop('disabled', true);
    $("#fld_nombre_embarcacion").prop('disabled', true);
    $("#fld_tipoembarcacion").prop('disabled', true);
    $("#fld_eslora").prop('disabled', true);
    $("#fld_manga").prop('disabled', true);
    $("#fld_puntal").prop('disabled', true);
    $("#fld_motorunohp").prop('disabled', true);
    $("#fld_marcaMotor1").prop('disabled', true);
    $("#fld_tiempomotor1").prop('disabled', true);


    $.ajax({
        url: "get_data_embarcacionpesca",
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

                $("#fld_matricula").val(valor_nulo_str(json.c_matriculadigmer));
                $("#fld_nombre_embarcacion").val(valor_nulo_str(json.c_nombreembarcacion));
                $("#fld_tipoembarcacion").val(valor_nulo_str(json.c_tipoembarcacion)).trigger("change");
                $("#ins_fechainspeccion").val(valor_nulo_str(json.c_fechainspeccion));

                $("#fld_eslora").val(valor_nulo_str(json.c_eslora));
                $("#fld_manga").val(valor_nulo_str(json.c_manga));
                $("#fld_puntal").val(valor_nulo_str(json.c_puntal));
                $("#ins_esloravigente").val(valor_nulo_str(json.c_esloravigente));
                $("#ins_mangavigente").val(valor_nulo_str(json.c_mangavigente));
                $("#ins_puntalvigente").val(valor_nulo_str(json.c_puntalvigente));

                $("#fld_motorunohp").val(valor_nulo_str(json.c_motorunohp));
                $("#fld_marcaMotor1").val(valor_nulo_str(json.c_marcauno)).trigger("change");
                $("#fld_tiempomotor1").val(valor_nulo_str(json.c_tiempomotoruno)).trigger("change");
                $("#fld_motordoshp").val(valor_nulo_str(json.c_motordoshp));
                $("#fld_marcaMotor2").val(valor_nulo_str(json.c_marcados)).trigger("change");
                $("#fld_tiempomotor2").val(valor_nulo_str(json.c_tiempomotordos)).trigger("change")                

                $("#fld_c_armadorunocedula").val(valor_nulo_str(json.c_armadorunocedula));
                $("#fld_c_armadorunonombres").val(valor_nulo_str(json.c_armadorunonombres));
                $("#fld_c_armadorunoapellidos").val(valor_nulo_str(json.c_armadorunoapellidos));
                $("#fld_c_armadorunoparma").val(valor_nulo_str(json.c_armadorunoparma));
                $("#fld_c_armadordoscedula").val(valor_nulo_str(json.c_armadordoscedula));
                $("#fld_c_armadordosnombres").val(valor_nulo_str(json.c_armadordosnombres));
                $("#fld_c_armadordosapellidos").val(valor_nulo_str(json.c_armadordosapellidos));
                $("#fld_c_armadordosparma").val(valor_nulo_str(json.c_armadordosparma));

                $("#ins_modificacionembarcacion").val(valor_nulo_str(json.c_modificacionembarcacion));
                $("#ins_estapintado").val(valor_nulo_str(json.c_estapintado));
                $("#ins_tienepintadomatricula").val(valor_nulo_str(json.c_tienepintadomatricula));
                $("#ins_coincidenmatricula").val(valor_nulo_str(json.c_coincidenmatricula));
                $("#ins_coincidefotografia").val(valor_nulo_str(json.c_coincidefotografia));
                $("#ins_inspeccion").val(valor_nulo_str(json.c_inspeccion));
                $("#ins_observaciones").val(valor_nulo_str(json.c_observaciones));
                $("#ins_guardaparqueresponsable").val(valor_nulo_str(json.c_guardaparqueresponsable));
                $("#ins_armadorpresente").val(valor_nulo_str(json.c_armadorpresente));

                $('#dv_foto').css('visibility', "visible");
                $("#foto_personal").attr('src', json.c_fotoembarcacion);
                $("#foto_personal").attr('style', "width:193px;height:237px;");
                $("#link_foto_personal").attr('href',json.c_fotoembarcacion);

            }
        },
        error: function(data) {
            $("#modalLoadin").hide();
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
        },
    });
}

function verInspeccionTecnicaEmbarcacion(id){
    console.log(">> verInspeccionTecnicaEmbarcacion <<");
    cargarDatosMaestrosEmbarcaciones();
    limpiarFormEmbarcacionpesca();

    $('.nav-tabs a[href="#tab_datosgenerales"]').tab('show');
    $("#idEmbarcacionesP").val(id);
    $("#modalLoadin").show();
    $("#tabobservaciones").show();
    $("#tabdatospesca").hide();
    $("#dv_categoria").hide();
    $("#lbl_categoria").hide();
    $("#dv_islapuerto").hide();
    $("#dv_fechainspeccion").show();
    $("#fld_calado").hide();
    $("#lbl_calado").hide();
    $("#lbl_actualinspeccion").show();
    $("#med_matriculavigente").show();
    $("#lbl_datostecnicos").hide();
    $("#dv_datostecnicos").hide();
    $("#tituloInspeccion").show();
    $("#tituloE").hide();
    $("#lbl_reglamento").show();
    $("#dv_tabobservaciones").show();
    $("#dv_tabdatospesca").hide();
    $("#dv_responsables").show();
    $("#fld_consultararmador1").hide();
    $("#fld_consultararmador2").hide();
    $("#btnGrabar").hide();


    $.ajax({
        url: "get_data_inspecciontecnicaembarcacion",
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

                $("#fld_matricula").val(valor_nulo_str(json.c_matriculadigmer));
                $("#fld_nombre_embarcacion").val(valor_nulo_str(json.c_nombreembarcacion));
                $("#fld_tipoembarcacion").val(valor_nulo_str(json.c_tipoembarcacion)).trigger("change");
                $("#ins_fechainspeccion").val(valor_nulo_str(json.c_fechainspeccion));
                if(json.c_fechainspeccion!=null && json.c_fechainspeccion!= undefined){
                    f_ins = json.c_fechainspeccion;
                    f_ins = f_ins.split('/').reverse().join("-");
                    $("#ins_fechainspeccion").val(f_ins);
                }
                if(json.c_cambiarfotografia == 'SI')
                    $("#ins_cambiarfotografiaSi").prop("checked", true);
                else if(json.c_cambiarfotografia == 'NO'){
                    $("#ins_cambiarfotografiaNo").prop("checked", true);
                    $("#dv_fotoembarcacion").hide();
                }

                $("#fld_eslora").val(valor_nulo_str(json.c_eslora));
                $("#fld_manga").val(valor_nulo_str(json.c_manga));
                $("#fld_puntal").val(valor_nulo_str(json.c_puntal));
                $("#ins_esloravigente").val(valor_nulo_str(json.c_esloravigente));
                $("#ins_mangavigente").val(valor_nulo_str(json.c_mangavigente));
                $("#ins_puntalvigente").val(valor_nulo_str(json.c_puntalvigente));

                $("#fld_motorunohp").val(valor_nulo_str(json.c_motorunohp));
                $("#fld_marcaMotor1").val(valor_nulo_str(json.c_marcauno)).trigger("change");
                $("#fld_tiempomotor1").val(valor_nulo_str(json.c_tiempomotoruno)).trigger("change");
                $("#fld_motordoshp").val(valor_nulo_str(json.c_motordoshp));
                $("#fld_marcaMotor2").val(valor_nulo_str(json.c_marcados)).trigger("change");
                $("#fld_tiempomotor2").val(valor_nulo_str(json.c_tiempomotordos)).trigger("change")                

                $("#fld_c_armadorunocedula").val(valor_nulo_str(json.c_armadorunocedula));
                $("#fld_c_armadorunonombres").val(valor_nulo_str(json.c_armadorunonombres));
                $("#fld_c_armadorunoapellidos").val(valor_nulo_str(json.c_armadorunoapellidos));
                $("#fld_c_armadorunoparma").val(valor_nulo_str(json.c_armadorunoparma));
                $("#fld_c_armadordoscedula").val(valor_nulo_str(json.c_armadordoscedula));
                $("#fld_c_armadordosnombres").val(valor_nulo_str(json.c_armadordosnombres));
                $("#fld_c_armadordosapellidos").val(valor_nulo_str(json.c_armadordosapellidos));
                $("#fld_c_armadordosparma").val(valor_nulo_str(json.c_armadordosparma));

                $("#ins_modificacionembarcacion").val(valor_nulo_str(json.c_modificacionembarcacion)).trigger("change");
                $("#ins_estapintado").val(valor_nulo_str(json.c_estapintado)).trigger("change");
                $("#ins_tienepintadomatricula").val(valor_nulo_str(json.c_tienepintadomatricula)).trigger("change");
                $("#ins_coincidenmatricula").val(valor_nulo_str(json.c_coincidenmatricula)).trigger("change");
                $("#ins_coincidefotografia").val(valor_nulo_str(json.c_coincidefotografia)).trigger("change");
                $("#ins_inspeccion").val(valor_nulo_str(json.c_inspeccion)).trigger("change");
                $("#ins_observaciones").val(valor_nulo_str(json.c_observaciones));
                $("#ins_guardaparqueresponsable").val(valor_nulo_str(json.c_guardaparqueresponsable));
                $("#ins_armadorpresente").val(valor_nulo_str(json.c_armadorpresente)).trigger("change");

                $('#dv_foto').css('visibility', "visible");
                $("#foto_personal").attr('src', json.c_fotoembarcacion);
                $("#foto_personal").attr('style', "width:193px;height:237px;");
                $("#link_foto_personal").attr('href',json.c_fotoembarcacion);

            }
        },
        error: function(data) {
            $("#modalLoadin").hide();
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
        },
    });
}

function insertarInspeccionTecnicaEmbarcacion(){
	console.log("******* insertarInspeccionTecnicaEmbarcacion *******");
    datos = get_json_inspecciontecnica();
    datos += '}';

    //id_padre = $("#content_Embarcacionpesca").parent().attr('id');
    //th_insert(datos, "SL_cuem_embarcacionespescaPesca", id_padre, "appfdtembarcacionpesca");

    $.ajax({
            url: "insert_General",
            type: 'get',
            cache: 'false',
            data: {
                "dj_url": 'appfdtinspecciontecnica',
                "data": JSON.stringify("[" + datos + "]")
            },
            dataType: "json",
            success: function(data) {
                if (!data['results']) {
                    $('#modalLoadin').hide();
                    swal("", "Error al Insertar el registro: " + data['non_field_errors'][0], "error");
                    console.log("data---->" + datos + "--->" + "appfdtinspecciontecnica" + "Error--->" + data);
                } else {
                    //console.log(data);
                    $('#modalLoadin').hide();
                    swal("", "Registro insertado con exito", "success");

                   	buscarEmbarcacionesPesca();
                }
            },
            error: function(data) {
                $('#modalLoadin').hide();
                swal("", "Error al Insertar el registro", "error");
                console.log("data---->" + datos + "--->" + "appfdtinspecciontecnica" + "Error--->" + data);
            },
        });
}

function get_json_inspecciontecnica(){

    /*se arma la cadena datos*/
    datos = '{';

    //SOLICITANTE
    if (valor_nulo_str($("#fld_matricula").val()) != "") 
        datos += ' "c_matriculadigmer":"' + $("#fld_matricula").val() + '",';

    if (valor_nulo_str($("#fld_nombre_embarcacion").val()) != "") 
        datos += ' "c_nombreembarcacion":"' + $("#fld_nombre_embarcacion").val() + '",';

    if (valor_nulo_str($("#fld_tipoembarcacion").val()) != "") 
        datos += ' "c_tipoembarcacion":"' + $("#fld_tipoembarcacion").val() + '",';

    if (valor_nulo_str($("#ins_fechainspeccion").val()) != "") 
        datos += ' "c_fechainspeccion":"' + $("#ins_fechainspeccion").val() + '",';

    if($("#ins_cambiarfotografiaSi").prop('checked'))
        datos += ' "c_cambiarfotografia":"' + $("#ins_cambiarfotografiaSi").val() + '",';
    else if($("#ins_cambiarfotografiaNo").prop('checked'))
        datos += ' "c_cambiarfotografia":"' + $("#ins_cambiarfotografiaNo").val() + '",';
    else
        datos += ' "c_cambiarfotografia": null,';

    filename = $('#lbl_foto_Embarcaciones').val();
    if (filename.substring(3,11) == 'fakepath')
        filename = filename.substring(12);

    if (valor_nulo_str($("#lbl_foto_Embarcaciones").val()) != "") 
        datos += ' "c_fotoembarcacion":"' + filename + '",';
    else
        datos += ' "c_fotoembarcacion": null,';

    if (valor_nulo_str($("#fld_eslora").val()) != "") 
        datos += ' "c_eslora":"' + $("#fld_eslora").val() + '",';

    if (valor_nulo_str($("#fld_manga").val()) != "") 
        datos += ' "c_manga":"' + $("#fld_manga").val() + '",';

    if (valor_nulo_str($("#fld_puntal").val()) != "") 
        datos += ' "c_puntal":"' + $("#fld_puntal").val() + '",';

    if (valor_nulo_str($("#ins_esloravigente").val()) != "") 
        datos += ' "c_esloravigente":"' + $("#ins_esloravigente").val() + '",';
    else
        datos += ' "c_esloravigente": null,';

    if (valor_nulo_str($("#ins_mangavigente").val()) != "") 
        datos += ' "c_mangavigente":"' + $("#ins_mangavigente").val() + '",';
    else
        datos += ' "c_mangavigente": null,';

    if (valor_nulo_str($("#ins_puntalvigente").val()) != "") 
        datos += ' "c_puntalvigente":"' + $("#ins_puntalvigente").val() + '",';
    else
        datos += ' "c_puntalvigente": null,';


    if (valor_nulo_str($("#fld_motorunohp").val()) != "") 
        datos += ' "c_motorunohp":"' + $("#fld_motorunohp").val() + '",';
    else
        datos += ' "c_motorunohp": null,';

    if (valor_nulo_str($("#fld_marcaMotor1").val()) != "") 
        datos += ' "c_marcauno":"' + $("#fld_marcaMotor1").val() + '",';
    else
        datos += ' "c_marcauno": null,';

    if (valor_nulo_str($("#fld_tiempomotor1").val()) != "") 
        datos += ' "c_tiempomotoruno":"' + $("#fld_tiempomotor1").val() + '",';
    else
        datos += ' "c_tiempomotoruno": null,';

    if (valor_nulo_str($("#fld_motordoshp").val()) != "") 
        datos += ' "c_motordoshp":"' + $("#fld_motordoshp").val() + '",';
    else
        datos += ' "c_motordoshp": null,';

    if (valor_nulo_str($("#fld_marcaMotor2").val()) != "") 
        datos += ' "c_marcados":"' + $("#fld_marcaMotor2").val() + '",';
    else
        datos += ' "c_marcados": null,';

    if (valor_nulo_str($("#fld_tiempomotor2").val()) != "") 
        datos += ' "c_tiempomotordos":"' + $("#fld_tiempomotor2").val() + '",';
    else
        datos += ' "c_tiempomotordos": null,';


    if (valor_nulo_str($("#fld_c_armadorunocedula").val()) != "") 
        datos += ' "c_armadorunocedula":"' + $("#fld_c_armadorunocedula").val() + '",';
    else
        datos += ' "c_armadorunocedula": null,';

    if (valor_nulo_str($("#fld_c_armadorunonombres").val()) != "") 
        datos += ' "c_armadorunonombres":"' + $("#fld_c_armadorunonombres").val() + '",';
    else
        datos += ' "c_armadorunonombres": null,';

    if (valor_nulo_str($("#fld_c_armadorunoapellidos").val()) != "") 
        datos += ' "c_armadorunoapellidos":"' + $("#fld_c_armadorunoapellidos").val() + '",';
    else
        datos += ' "c_armadorunoapellidos": null,';

    if (valor_nulo_str($("#fld_c_armadorunoparma").val()) != "") 
        datos += ' "c_armadorunoparma":"' + $("#fld_c_armadorunoparma").val() + '",';
    else
        datos += ' "c_armadorunoparma": null,';

    if (valor_nulo_str($("#fld_c_armadordoscedula").val()) != "") 
        datos += ' "c_armadordoscedula":"' + $("#fld_c_armadordoscedula").val() + '",';
    else
        datos += ' "c_armadordoscedula": null,';

    if (valor_nulo_str($("#fld_c_armadordosnombres").val()) != "") 
        datos += ' "c_armadordosnombres":"' + $("#fld_c_armadordosnombres").val() + '",';
    else
        datos += ' "c_armadordosnombres": null,';

    if (valor_nulo_str($("#fld_c_armadordosapellidos").val()) != "") 
        datos += ' "c_armadordosapellidos":"' + $("#fld_c_armadordosapellidos").val() + '",';
    else
        datos += ' "c_armadordosapellidos": null,';

    if (valor_nulo_str($("#fld_c_armadordosparma").val()) != "") 
        datos += ' "c_armadordosparma":"' + $("#fld_c_armadordosparma").val() + '",';
    else
        datos += ' "c_armadordosparma": null,';


    if (valor_nulo_str($("#ins_modificacionembarcacion").val()) != "") 
        datos += ' "c_modificacionembarcacion":"' + $("#ins_modificacionembarcacion").val() + '",';
    else
        datos += ' "c_modificacionembarcacion": null,';

    if (valor_nulo_str($("#ins_estapintado").val()) != "") 
        datos += ' "c_estapintado":"' + $("#ins_estapintado").val() + '",';
    else
        datos += ' "c_estapintado": null,';

    if (valor_nulo_str($("#ins_tienepintadomatricula").val()) != "") 
        datos += ' "c_tienepintadomatricula":"' + $("#ins_tienepintadomatricula").val() + '",';
    else
        datos += ' "c_tienepintadomatricula": null,';

    if (valor_nulo_str($("#ins_coincidenmatricula").val()) != "") 
        datos += ' "c_coincidenmatricula":"' + $("#ins_coincidenmatricula").val() + '",';
    else
        datos += ' "c_coincidenmatricula": null,';

    if (valor_nulo_str($("#ins_coincidefotografia").val()) != "") 
        datos += ' "c_coincidefotografia":"' + $("#ins_coincidefotografia").val() + '",';
    else
        datos += ' "c_coincidefotografia": null,';

    if (valor_nulo_str($("#ins_inspeccion").val()) != "") 
        datos += ' "c_inspeccion":"' + $("#ins_inspeccion").val() + '",';
    else
        datos += ' "c_inspeccion": null,';

    if (valor_nulo_str($("#ins_observaciones").val()) != "") 
        datos += ' "c_observaciones":"' + $("#ins_observaciones").val() + '",';
    else
        datos += ' "c_observaciones": null,';

    if (valor_nulo_str($("#ins_guardaparqueresponsable").val()) != "") 
        datos += ' "c_guardaparqueresponsable":"' + $("#ins_guardaparqueresponsable").val() + '",';
    else
        datos += ' "c_guardaparqueresponsable": null,';

    if (valor_nulo_str($("#ins_armadorpresente").val()) != "") 
        datos += ' "c_armadorpresente":"' + $("#ins_armadorpresente").val() + '"';
    else
        datos += ' "c_armadorpresente": null';


    //datos += '}';

    datos = datos.replace(/undefined/g, null);
    datos = datos.replace(/None/g,null);
    datos = datos.replace(/False/g,null);
    datos = datos.replace(/True/g,"'true'");
    datos = datos.replace(/'/g,'"');
    datos = datos.replace(/"null"/g, null);

    return datos;
}



// Permiso Pesca
function buscarPermisoPesca() {
    console.log("********** buscarPermisoPesca ********** ");
    
    $("#modalLoadin").show();
    data = '';

    matricula = $("#matriculafilter").val();
    nombreembarcacion = $("#nombresfilter").val();
    permiso = $("#permisofilter").val();

    if(nombreembarcacion != "")
        data += "c_nombreembarcacion=" + nombreembarcacion + "&";

    if(matricula != "")
        data = "c_matriculadigmer=" + matricula + "&";

    if(permiso != "")
        data = "c_permisopesca=" + permiso + "&";

    data = data.substring(0, data.length - 1);

    $.ajax({
        url: "get_lista_permisopesca",
        type: "get",
        data: {
            "data": data,
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

                        if(data[i].c_fechaemision!=null && data[i].c_fechaemision!= undefined){
                            f_emi = data[i].c_fechaemision;
                            f_emi = f_emi.split('-').reverse().join("/");
                        }else
                            f_emi = "";

                        if(data[i].c_fechacaducidad!=null && data[i].c_fechacaducidad!= undefined){
                            f_cad = data[i].c_fechacaducidad;
                            f_cad = f_cad.split('-').reverse().join("/");
                        }else
                            f_cad = "";

                        tabla += "<tr>";
                        tabla += "<td align='center' id='td_matricula_"+ data[i].id + "'>" + data[i].c_matriculadigmer + "</td>";
                        tabla += "<td align='center' id='td_emb_"+ data[i].id + "'>" + valor_nulo_str(data[i].c_nombreembarcacion) + "</td>";
                        tabla += "<td align='center' id='td_emb_"+ data[i].id + "'>" + valor_nulo_str(data[i].c_tipoembarcacion) + "</td>";
                        tabla += "<td align='center' id='td_estado_" + data[i].id + "'>" + valor_nulo_str(data[i].c_permisopesca)  + "</td>";
                        tabla += "<td align='center' id='td_tipoemb_" + data[i].id + "'>" + valor_nulo_str(f_emi) + "</td>";
                        tabla += "<td align='center' id='td_isla_" + data[i].id + "'>" + valor_nulo_str(f_cad) + "</td>";
                        tabla += "<td align='center'><a style='font-size: 18px; cursor: pointer;' href='#addEmbarcaciones' data-stackbox='true' data-stackbox-position='absolute' data-stackbox-width='80%' onclick='verPermisoPesca(\"" + data[i].id +"\")' title='Ver Permiso de Pesca'><i class='fa fa-search text-green'></i></a></td>";
                        tabla += "</tr>";

                    } /*fin for*/
                } /*fin if length*/

                $('#tabla_permisopesca').dataTable().fnClearTable();
                $('#tabla_permisopesca').dataTable().fnDestroy();

                $("#bodytabla_permisopesca").html("");
                $("#bodytabla_permisopesca").append(tabla);

                var table = $('#tabla_permisopesca').DataTable( {
                    orderCellsTop: true,
                    "order": [[ 1, "asc" ]],
                    responsive: true
                } );

                $('#tabla_permisopesca thead .filters th').each(function() {
                    //var title = $(this).text();
                    var title = $('#tabla_permisopesca thead tr:eq(0) th').eq($(this).index()).text();

                  if ((title == "")) {
                    $(this).html('');
                  }else{
                      $(this).html('<input type="text" placeholder="Buscar ' + title + '" style="color:black;"/>');
                  }
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
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
            $("#modalLoadin").hide();
            //console.log( JSON.stringify(data));
        },
    });
}

function addPermisoPescaEmbarcacion(id){
    console.log(">> addPermisoPescaEmbarcacion <<");
    limpiarFormEmbarcacionpesca();

    $('.nav-tabs a[href="#tab_datosgenerales"]').tab('show');
    $("#tipotEmbarcacionpesca").val(3);
    $("#idEmbarcacionesP").val(id);
    $("#modalLoadin").show();
    $("#tituloInspeccion").hide();
    $("#tituloE").hide();
    $("#tituloPermiso").show();
    $("#tabdatospesca").show();
    $("#dv_tabdatospesca").show();
    $("#lbl_tonelajebruto").show();
    $("#fld_tonelajebruto").show();
    $("#lbl_estado").hide();
    $("#dv_estado").hide();
    $("#fld_consultararmador1").hide();
    $("#fld_consultararmador2").hide();
    $("#fld_matricula").prop('disabled', true);
    $("#fld_nombre_embarcacion").prop('disabled', true);
    $("#fld_tipoembarcacion").prop('disabled', true);
    $("#fld_categoria").prop('disabled', true);
    $("#fld_isla").prop('disabled', true);
    $("#fld_puerto_registro").prop('disabled', true);
    $("#fld_eslora").prop('disabled', true);
    $("#fld_manga").prop('disabled', true);
    $("#fld_puntal").prop('disabled', true);
    $("#fld_calado").prop('disabled', true);
    $("#fld_ciudad").prop('disabled', true);
    $("#fld_anioconstruccion").prop('disabled', true);
    $("#fld_material").prop('disabled', true);
    $("#fld_ntripulantes").prop('disabled', true);
    $("#fld_tonelajeneto").prop('disabled', true);
    $("#fld_tonelajebruto").prop('disabled', true);
    $("#fld_autonomia").prop('disabled', true);
    $("#fld_conservacion").prop('disabled', true);
    $("#fld_motorunohp").prop('disabled', true);
    $("#fld_marcaMotor1").prop('disabled', true);
    $("#fld_tiempomotor1").prop('disabled', true);


    $.ajax({
        url: "get_data_embarcacionpesca",
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

                $("#fld_matricula").val(valor_nulo_str(json.c_matriculadigmer));
                $("#fld_nombre_embarcacion").val(valor_nulo_str(json.c_nombreembarcacion));
                $("#fld_tipoembarcacion").val(valor_nulo_str(json.c_tipoembarcacion)).trigger("change");
                $("#fld_categoria").val(valor_nulo_str(json.c_categoria)).trigger("change");
                $("#fld_isla").val(valor_nulo_str(json.c_islaorigen)).trigger("change");
                $("#fld_puerto_registro").val(valor_nulo_str(json.c_puertoregistro)).trigger("change");
                $("#fld_eslora").val(valor_nulo_str(json.c_eslora));
                $("#fld_manga").val(valor_nulo_str(json.c_manga));
                $("#fld_puntal").val(valor_nulo_str(json.c_puntal));
                $("#fld_calado").val(valor_nulo_str(json.c_calado));

                $("#fld_ciudad").val(valor_nulo_str(json.c_lugarconstruccion)).trigger("change");
                $("#fld_anioconstruccion").val(valor_nulo_str(json.c_anioconstruccion));
                $("#fld_material").val(valor_nulo_str(json.c_materialcasco)).trigger("change");
                $("#fld_ntripulantes").val(valor_nulo_str(json.c_ntripulantes));
                $("#fld_tonelajeneto").val(valor_nulo_str(json.c_tonelajeneto));
                $("#fld_tonelajebruto").val(valor_nulo_str(json.c_tonelajebruto));
                $("#fld_autonomia").val(valor_nulo_str(json.c_autonomia));
                $("#fld_conservacion").val(valor_nulo_str(json.c_conservacion));
                $("#fld_motorunohp").val(valor_nulo_str(json.c_motorunohp));
                $("#fld_marcaMotor1").val(valor_nulo_str(json.c_marcauno)).trigger("change");
                $("#fld_tiempomotor1").val(valor_nulo_str(json.c_tiempomotoruno)).trigger("change");
                $("#fld_motordoshp").val(valor_nulo_str(json.c_motordoshp));
                $("#fld_marcaMotor2").val(valor_nulo_str(json.c_marcados)).trigger("change");
                $("#fld_tiempomotor2").val(valor_nulo_str(json.c_tiempomotordos)).trigger("change");

                $("#fld_c_armadorunocedula").val(valor_nulo_str(json.c_armadorunocedula));
                $("#fld_c_armadorunonombres").val(valor_nulo_str(json.c_armadorunonombres));
                $("#fld_c_armadorunoapellidos").val(valor_nulo_str(json.c_armadorunoapellidos));
                $("#fld_c_armadorunoparma").val(valor_nulo_str(json.c_armadorunoparma));
                $("#fld_c_armadordoscedula").val(valor_nulo_str(json.c_armadordoscedula));
                $("#fld_c_armadordosnombres").val(valor_nulo_str(json.c_armadordosnombres));
                $("#fld_c_armadordosapellidos").val(valor_nulo_str(json.c_armadordosapellidos));
                $("#fld_c_armadordosparma").val(valor_nulo_str(json.c_armadordosparma));



                $('#dv_foto').css('visibility', "visible");
                $("#foto_personal").attr('src', json.c_fotoembarcacion);
                $("#foto_personal").attr('style', "width:193px;height:237px;");
                $("#link_foto_personal").attr('href',json.c_fotoembarcacion);

            }
        },
        error: function(data) {
            $("#modalLoadin").hide();
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
        },
    });
}

function verPermisoPesca(id){
    console.log(">> verPermisoPesca <<");
    limpiarFormEmbarcacionpesca();

    $('.nav-tabs a[href="#tab_datosgenerales"]').tab('show');
    $("#tipotEmbarcacionpesca").val(3);
    $("#idEmbarcacionesP").val(id);
    $("#modalLoadin").show();
    $("#tituloInspeccion").hide();
    $("#tituloE").hide();
    $("#tituloPermiso").show();
    $("#tabdatospesca").show();
    $("#dv_tabdatospesca").show();
    $("#lbl_tonelajebruto").show();
    $("#fld_tonelajebruto").show();
    $("#fld_consultararmador1").hide();
    $("#fld_consultararmador2").hide();
    $("#lbl_estado").hide();
    $("#dv_estado").hide();
    $("#btnGrabar").hide();


    $.ajax({
        url: "get_data_permisopesca",
        type: "get",
        cache: 'false',
        data: {
            "data": id
        },
        dataType: "json",
        async: false,

        success: function(json) {
            console.log(json.results[0]);
            json = json.results[0];
            
            $("#modalLoadin").hide();

            if (json['error']) {
                if (json['error']['context'])
                    var salida = json['error']['context']['resource'][0].message;
                else
                    var salida = json['error']['message']
            } else {

                $("#fld_matricula").val(valor_nulo_str(json.c_matriculadigmer));
                $("#fld_nombre_embarcacion").val(valor_nulo_str(json.c_nombreembarcacion));
                $("#fld_tipoembarcacion").val(valor_nulo_str(json.c_tipoembarcacion)).trigger("change");
                $("#fld_categoria").val(valor_nulo_str(json.c_categoria)).trigger("change");
                $("#fld_isla").val(valor_nulo_str(json.c_islaorigen)).trigger("change");
                $("#fld_puerto_registro").val(valor_nulo_str(json.c_puertoregistro)).trigger("change");
                $("#fld_eslora").val(valor_nulo_str(json.c_eslora));
                $("#fld_manga").val(valor_nulo_str(json.c_manga));
                $("#fld_puntal").val(valor_nulo_str(json.c_puntal));
                $("#fld_calado").val(valor_nulo_str(json.c_calado));

                $("#fld_ciudad").val(valor_nulo_str(json.c_lugarconstruccion)).trigger("change");
                $("#fld_anioconstruccion").val(valor_nulo_str(json.c_anioconstruccion));
                $("#fld_material").val(valor_nulo_str(json.c_materialcasco)).trigger("change");
                $("#fld_ntripulantes").val(valor_nulo_str(json.c_ntripulantes));
                $("#fld_tonelajeneto").val(valor_nulo_str(json.c_tonelajeneto));
                $("#fld_tonelajebruto").val(valor_nulo_str(json.c_tonelajebruto));
                $("#fld_autonomia").val(valor_nulo_str(json.c_autonomia));
                $("#fld_conservacion").val(valor_nulo_str(json.c_conservacion));
                $("#fld_motorunohp").val(valor_nulo_str(json.c_motorunohp));
                $("#fld_marcaMotor1").val(valor_nulo_str(json.c_marcauno)).trigger("change");
                $("#fld_tiempomotor1").val(valor_nulo_str(json.c_tiempomotoruno)).trigger("change");
                $("#fld_motordoshp").val(valor_nulo_str(json.c_motordoshp));
                $("#fld_marcaMotor2").val(valor_nulo_str(json.c_marcados)).trigger("change");
                $("#fld_tiempomotor2").val(valor_nulo_str(json.c_tiempomotordos)).trigger("change");

                $("#fld_c_armadorunocedula").val(valor_nulo_str(json.c_armadorunocedula));
                $("#fld_c_armadorunonombres").val(valor_nulo_str(json.c_armadorunonombres));
                $("#fld_c_armadorunoapellidos").val(valor_nulo_str(json.c_armadorunoapellidos));
                $("#fld_c_armadorunoparma").val(valor_nulo_str(json.c_armadorunoparma));
                $("#fld_c_armadordoscedula").val(valor_nulo_str(json.c_armadordoscedula));
                $("#fld_c_armadordosnombres").val(valor_nulo_str(json.c_armadordosnombres));
                $("#fld_c_armadordosapellidos").val(valor_nulo_str(json.c_armadordosapellidos));
                $("#fld_c_armadordosparma").val(valor_nulo_str(json.c_armadordosparma));

                $("#psc_permisopesca").val(valor_nulo_str(json.c_permisopesca));
                $("#psc_aprobadaecosistemas").val(valor_nulo_str(json.c_aprobadaecosistemas)).trigger("change");

                if(json.c_fechaemision!=null && json.c_fechaemision!= undefined){
                    f_emi = json.c_fechaemision;
                    f_emi = f_emi.split('/').reverse().join("-");
                    $("#psc_fechaemision").val(f_emi);
                }
                if(json.c_fechacaducidad!=null && json.c_fechacaducidad!= undefined){
                    f_cad = json.c_fechacaducidad;
                    f_cad = f_cad.split('/').reverse().join("-");
                    $("#psc_fechacaducidad").val(f_cad);
                }
                if(json.c_fechainspecciontecnica!=null && json.c_fechainspecciontecnica!= undefined){
                    f_ins = json.c_fechainspecciontecnica;
                    f_ins = f_ins.split('/').reverse().join("-");
                    $("#psc_fechainspecciontecnica").val(f_ins);
                }

                if(json.c_tipoemisionsancristobal!=null){
                    $("#psc_tipoemision").val(valor_nulo_str(json.c_tipoemisionsancristobal)).trigger("change");
                }else if(json.c_tipoemisionsancruz!=null){
                    $("#psc_tipoemision").val(valor_nulo_str(json.c_tipoemisionsancruz)).trigger("change");
                }else if(json.c_tipoemisionisabela!=null){
                    $("#psc_tipoemision").val(valor_nulo_str(json.c_tipoemisionisabela)).trigger("change");
                }

                if(json.c_operacion!=null){
                    operacion = json.c_operacion.split(';');
                    for(i = 0; i < operacion.length; i++){
                        if(operacion[i] == 'ALTURA')
                            $("#psc_operacionaltura").prop("checked", true);
                        else if(operacion[i] == 'COSTERA')
                            $("#psc_operacioncostera").prop("checked", true);
                    }
                }

                if(json.c_especiesautorizadas!=null){
                    especies = json.c_especiesautorizadas.split(';');
                    for(i = 0; i < especies.length; i++){
                        if(especies[i] == 'Crustáseo')
                            $("#psc_especies_crustaceo").prop("checked", true);
                        if(especies[i] == 'Molusco')
                            $("#psc_especies_molusco").prop("checked", true);
                        if(especies[i] == 'Pepino de Mar')
                            $("#psc_especies_pepinomar").prop("checked", true);
                        if(especies[i] == 'Pesca Blanca')
                            $("#psc_especies_pescablanca").prop("checked", true);
                    }
                }

                if(json.c_artesdepesca!=null){
                    artes = json.c_artesdepesca.split(';');
                    for(i = 0; i < artes.length; i++){
                        if(artes[i] == 'CAÑA')
                            $("#psc_artes_caña").prop("checked", true);
                        if(artes[i] == 'CHINCHORRO')
                            $("#psc_artes_chinchorro").prop("checked", true);
                        if(artes[i] == 'REDES')
                            $("#psc_artes_redes").prop("checked", true);
                        if(artes[i] == 'EMPATE DE FONDO')
                            $("#psc_artes_empatefondo").prop("checked", true);
                        if(artes[i] == 'EMPATE OCEANICO')
                            $("#psc_artes_empateoceanico").prop("checked", true);
                        if(artes[i] == 'TRASMALLO')
                            $("#psc_artes_trasmallo").prop("checked", true);
                        if(artes[i] == 'LINEA DE ARRASTRE')
                            $("#psc_artes_lineaarrastre").prop("checked", true);
                        if(artes[i] == 'LINEA DE ARRASTRE CON SEÑUELO/PLUMA')
                            $("#psc_artes_lineaarrastresenielo").prop("checked", true);
                        if(artes[i] == 'VARA HAWAIANA')
                            $("#psc_artes_varahawaiana").prop("checked", true);
                        if(artes[i] == 'MANOS')
                            $("#psc_artes_manos").prop("checked", true);
                        if(artes[i] == 'OTROS')
                            $("#psc_artes_otros").prop("checked", true);
                    }
                }


                $('#dv_foto').css('visibility', "visible");
                $("#foto_personal").attr('src', json.c_fotoembarcacion);
                $("#foto_personal").attr('style', "width:193px;height:237px;");
                $("#link_foto_personal").attr('href',json.c_fotoembarcacion);

            }
        },
        error: function(data) {
            $("#modalLoadin").hide();
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
        },
    });
}

function insertarPermisoPesca(){
    console.log("******* insertarPermisoPesca *******");
    datos = get_json_permisopesca();
    datos += '}';

    //id_padre = $("#content_Embarcacionpesca").parent().attr('id');
    //th_insert(datos, "SL_cuem_embarcacionespescaPesca", id_padre, "appfdtembarcacionpesca");

    $.ajax({
            url: "insert_General",
            type: 'get',
            cache: 'false',
            data: {
                "dj_url": 'appfdtpermisopesca',
                "data": JSON.stringify("[" + datos + "]")
            },
            dataType: "json",
            success: function(data) {
                if (!data['results']) {
                    $('#modalLoadin').hide();
                    swal("", "Error al Insertar el registro: " + data['non_field_errors'][0], "error");
                    console.log("data---->" + datos + "--->" + "appfdtpermisopesca" + "Error--->" + data);
                } else {
                    //console.log(data);
                    $('#modalLoadin').hide();
                    swal("", "Registro insertado con exito", "success");

                    buscarEmbarcacionesPesca();
                }
            },
            error: function(data) {
                $('#modalLoadin').hide();
                swal("", "Error al Insertar el registro", "error");
                console.log("data---->" + datos + "--->" + "appfdtpermisopesca" + "Error--->" + data);
            },
        });
}

function get_json_permisopesca(){

    /*se arma la cadena datos*/
    datos = '{';

    //SOLICITANTE
    if (valor_nulo_str($("#fld_matricula").val()) != "") 
        datos += ' "c_matriculadigmer":"' + $("#fld_matricula").val() + '",';

    if (valor_nulo_str($("#fld_nombre_embarcacion").val()) != "") 
        datos += ' "c_nombreembarcacion":"' + $("#fld_nombre_embarcacion").val() + '",';

    if (valor_nulo_str($("#fld_tipoembarcacion").val()) != "") 
        datos += ' "c_tipoembarcacion":"' + $("#fld_tipoembarcacion").val() + '",';

    if (valor_nulo_str($("#fld_categoria").val()) != "") 
        datos += ' "c_categoria":"' + $("#fld_categoria").val() + '",';

    if (valor_nulo_str($("#fld_isla").val()) != "") 
        datos += ' "c_islaorigen":"' + $("#fld_isla").val() + '",';
    else
        datos += ' "c_islaorigen": null,';

    if (valor_nulo_str($("#fld_puerto_registro").val()) != "") 
        datos += ' "c_puertoregistro":"' + $("#fld_puerto_registro").val() + '",';
    else
        datos += ' "c_puertoregistro": null,';

    filename = $('#lbl_foto_Embarcaciones').val();
    if (filename.substring(3,11) == 'fakepath')
        filename = filename.substring(12);

    if (valor_nulo_str($("#lbl_foto_Embarcaciones").val()) != "") 
        datos += ' "c_fotoembarcacion":"' + filename + '",';
    else
        datos += ' "c_fotoembarcacion": null,';

    if (valor_nulo_str($("#fld_eslora").val()) != "") 
        datos += ' "c_eslora":"' + $("#fld_eslora").val() + '",';

    if (valor_nulo_str($("#fld_manga").val()) != "") 
        datos += ' "c_manga":"' + $("#fld_manga").val() + '",';

    if (valor_nulo_str($("#fld_puntal").val()) != "") 
        datos += ' "c_puntal":"' + $("#fld_puntal").val() + '",';

    if (valor_nulo_str($("#fld_calado").val()) != "") 
        datos += ' "c_calado":"' + $("#fld_calado").val() + '",';


    if (valor_nulo_str($("#fld_ciudad").val()) != "") 
        datos += ' "c_lugarconstruccion":"' + $("#fld_ciudad").val() + '",';
    else
        datos += ' "c_lugarconstruccion": null,';

    if (valor_nulo_str($("#fld_anioconstruccion").val()) != "") 
        datos += ' "c_anioconstruccion":"' + $("#fld_anioconstruccion").val() + '",';
    else
        datos += ' "c_anioconstruccion": null,';

    if (valor_nulo_str($("#fld_material").val()) != "") 
        datos += ' "c_materialcasco":"' + $("#fld_material").val() + '",';
    else
        datos += ' "c_materialcasco": null,';

    if (valor_nulo_str($("#fld_ntripulantes").val()) != "") 
        datos += ' "c_ntripulantes":"' + $("#fld_ntripulantes").val() + '",';
    else
        datos += ' "c_ntripulantes": null,';

    if (valor_nulo_str($("#fld_tonelajeneto").val()) != "") 
        datos += ' "c_tonelajeneto":"' + $("#fld_tonelajeneto").val() + '",';
    else
        datos += ' "c_tonelajeneto": null,';

    if (valor_nulo_str($("#fld_tonelajebruto").val()) != "") 
        datos += ' "c_tonelajebruto":"' + $("#fld_tonelajebruto").val() + '",';
    else
        datos += ' "c_tonelajebruto": null,';

    if (valor_nulo_str($("#fld_autonomia").val()) != "") 
        datos += ' "c_autonomia":"' + $("#fld_autonomia").val() + '",';
    else
        datos += ' "c_autonomia": null,';

    if (valor_nulo_str($("#fld_conservacion").val()) != "") 
        datos += ' "c_conservacion":"' + $("#fld_conservacion").val() + '",';
    else
        datos += ' "c_conservacion": null,';

    if (valor_nulo_str($("#fld_motorunohp").val()) != "") 
        datos += ' "c_motorunohp":"' + $("#fld_motorunohp").val() + '",';
    else
        datos += ' "c_motorunohp": null,';

    if (valor_nulo_str($("#fld_marcaMotor1").val()) != "") 
        datos += ' "c_marcauno":"' + $("#fld_marcaMotor1").val() + '",';
    else
        datos += ' "c_marcauno": null,';

    if (valor_nulo_str($("#fld_tiempomotor1").val()) != "") 
        datos += ' "c_tiempomotoruno":"' + $("#fld_tiempomotor1").val() + '",';
    else
        datos += ' "c_tiempomotoruno": null,';

    if (valor_nulo_str($("#fld_motordoshp").val()) != "") 
        datos += ' "c_motordoshp":"' + $("#fld_motordoshp").val() + '",';
    else
        datos += ' "c_motordoshp": null,';

    if (valor_nulo_str($("#fld_marcaMotor2").val()) != "") 
        datos += ' "c_marcados":"' + $("#fld_marcaMotor2").val() + '",';
    else
        datos += ' "c_marcados": null,';

    if (valor_nulo_str($("#fld_tiempomotor2").val()) != "") 
        datos += ' "c_tiempomotordos":"' + $("#fld_tiempomotor2").val() + '",';
    else
        datos += ' "c_tiempomotordos": null,';


    if (valor_nulo_str($("#fld_c_armadorunocedula").val()) != "") 
        datos += ' "c_armadorunocedula":"' + $("#fld_c_armadorunocedula").val() + '",';
    else
        datos += ' "c_armadorunocedula": null,';

    if (valor_nulo_str($("#fld_c_armadorunonombres").val()) != "") 
        datos += ' "c_armadorunonombres":"' + $("#fld_c_armadorunonombres").val() + '",';
    else
        datos += ' "c_armadorunonombres": null,';

    if (valor_nulo_str($("#fld_c_armadorunoapellidos").val()) != "") 
        datos += ' "c_armadorunoapellidos":"' + $("#fld_c_armadorunoapellidos").val() + '",';
    else
        datos += ' "c_armadorunoapellidos": null,';

    if (valor_nulo_str($("#fld_c_armadorunoparma").val()) != "") 
        datos += ' "c_armadorunoparma":"' + $("#fld_c_armadorunoparma").val() + '",';
    else
        datos += ' "c_armadorunoparma": null,';

    if (valor_nulo_str($("#fld_c_armadordoscedula").val()) != "") 
        datos += ' "c_armadordoscedula":"' + $("#fld_c_armadordoscedula").val() + '",';
    else
        datos += ' "c_armadordoscedula": null,';

    if (valor_nulo_str($("#fld_c_armadordosnombres").val()) != "") 
        datos += ' "c_armadordosnombres":"' + $("#fld_c_armadordosnombres").val() + '",';
    else
        datos += ' "c_armadordosnombres": null,';

    if (valor_nulo_str($("#fld_c_armadordosapellidos").val()) != "") 
        datos += ' "c_armadordosapellidos":"' + $("#fld_c_armadordosapellidos").val() + '",';
    else
        datos += ' "c_armadordosapellidos": null,';

    if (valor_nulo_str($("#fld_c_armadordosparma").val()) != "") 
        datos += ' "c_armadordosparma":"' + $("#fld_c_armadordosparma").val() + '",';
    else
        datos += ' "c_armadordosparma": null,';


    
    if (valor_nulo_str($("#psc_fechaemision").val()) != "") 
        datos += ' "c_fechaemision":"' + $("#psc_fechaemision").val() + '",';
    else
        datos += ' "c_fechaemision": null,';

    if (valor_nulo_str($("#psc_fechacaducidad").val()) != "") 
        datos += ' "c_fechacaducidad":"' + $("#psc_fechacaducidad").val() + '",';
    else
        datos += ' "c_fechacaducidad": null,';

    if (valor_nulo_str($("#psc_tipoemision").val()) != "") 
        datos += ' "c_tipoemision":"' + $("#psc_tipoemision").val() + '",';
    else
        datos += ' "c_tipoemision": null,';

    if (valor_nulo_str($("#psc_fechainspecciontecnica").val()) != "") 
        datos += ' "c_fechainspecciontecnica":"' + $("#psc_fechainspecciontecnica").val() + '",';
    else
        datos += ' "c_fechainspecciontecnica": null,';

    if (valor_nulo_str($("#psc_permisopesca").val()) != "") 
        datos += ' "c_permisopesca":"' + $("#psc_permisopesca").val() + '",';
    else
        datos += ' "c_permisopesca": null,';

    
    if($("#fld_isla").val() == 'Isla Santa Cruz'){
        if(valor_nulo_str($("#psc_tipoemision").val()) != "")
            datos += ' "c_tipoemisionsancruz":"' + $("#psc_tipoemision").val() + '",';
        else
            datos += ' "c_tipoemisionsancruz": null,';
    }else if($("#fld_isla").val() == 'Isla San Cristobal'){
        if(valor_nulo_str($("#psc_tipoemision").val()) != "")
            datos += ' "c_tipoemisionsancristobal":"' + $("#psc_tipoemision").val() + '",';
        else
            datos += ' "c_tipoemisionsancristobal": null,';
    }else if($("#fld_isla").val() == 'Isla Isabela'){
        if(valor_nulo_str($("#psc_tipoemision").val()) != "")
            datos += ' "c_tipoemisionisabela":"' + $("#psc_tipoemision").val() + '",';
        else
            datos += ' "c_tipoemisionisabela": null,';
    }


    datos += ' "c_operacion":"';

    if($("#psc_operacionaltura").prop('checked') )
        datos += $("#psc_operacionaltura").val() + ";";

    if($("#psc_operacioncostera").prop('checked') )
        datos += $("#psc_operacioncostera").val() + ";";

    datos += '",';



    datos += ' "c_especiesautorizadas":"';

    if($("#psc_especies_crustaceo").prop('checked') )
        datos += $("#psc_especies_crustaceo").val() + ";";

    if($("#psc_especies_molusco").prop('checked') )
        datos += $("#psc_especies_molusco").val() + ";";

    if($("#psc_especies_pepinomar").prop('checked') )
        datos += $("#psc_especies_pepinomar").val() + ";";

    if($("#psc_especies_pescablanca").prop('checked') )
        datos += $("#psc_especies_pescablanca").val() + ";";

    datos += '",';


    
    datos += ' "c_artesdepesca":"';

    if($("#psc_artes_caña").prop('checked'))
        datos += $("#psc_artes_caña").val() + ";";

    if($("#psc_artes_chinchorro").prop('checked'))
        datos += $("#psc_artes_chinchorro").val() + ";";

    if($("#psc_artes_redes").prop('checked'))
        datos += $("#psc_artes_redes").val() + ";";

    if($("#psc_artes_empatefondo").prop('checked'))
        datos += $("#psc_artes_empatefondo").val() + ";";

    if($("#psc_artes_empateoceanico").prop('checked'))
        datos += $("#psc_artes_empateoceanico").val() + ";";

    if($("#psc_artes_trasmallo").prop('checked'))
        datos += $("#psc_artes_trasmallo").val() + ";";

    if($("#psc_artes_lineaarrastre").prop('checked'))
        datos += $("#psc_artes_lineaarrastre").val() + ";";

    if($("#psc_artes_lineaarrastresenielo").prop('checked'))
        datos += $("#psc_artes_lineaarrastresenielo").val() + ";";

    if($("#psc_artes_varahawaiana").prop('checked'))
        datos += $("#psc_artes_varahawaiana").val() + ";";

    if($("#psc_artes_manos").prop('checked'))
        datos += $("#psc_artes_manos").val() + ";";

    if($("#psc_artes_otros").prop('checked'))
        datos += $("#psc_artes_otros").val() + ";";

    datos += '",';



    if (valor_nulo_str($("#psc_aprobadaecosistemas").val()) != "") 
        datos += ' "c_aprobadaecosistemas":"' + $("#psc_aprobadaecosistemas").val() + '"';
    else
        datos += ' "c_aprobadaecosistemas": null';



    //datos += '}';

    datos = datos.replace(/undefined/g, null);
    datos = datos.replace(/None/g,null);
    datos = datos.replace(/False/g,null);
    datos = datos.replace(/True/g,"'true'");
    datos = datos.replace(/'/g,'"');
    datos = datos.replace(/"null"/g, null);

    return datos;
}



function cargarFoto(input) {
  console.log("**** cargarFoto ****");
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    var filename = "";

    reader.onload = function(e) {
      //$('#foto_personal').attr('src', e.target.result);
        $('#dv_foto').css('visibility', "visible");
        document.getElementById('dv_foto').innerHTML = '<input type="image" name="imageprev" id="imageprev" style="width: 193px; height: 237px;" src="'+e.target.result+'"/>';
        filename = $('#lbl_foto_pescador').val();
        if (filename.substring(3,11) == 'fakepath') {
            filename = filename.substring(12);
            //$("label[for='file_name'] b").html(filename);
        }
        
    }
    $('#imageprev').attr('file_name',input.files[0].name);
    reader.readAsDataURL(input.files[0]);
  }
}

function generarPdfFicha() {
    const element = document.getElementById("bodyverFicha");
    filename = 'ficha_cuem.pdf'

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

// Popup para armadores-pescadores
function cleanBodyTableArmador() {
    $('#tabla_PopupPescador').dataTable().fnClearTable();
    $('#tabla_PopupPescador').dataTable().fnDestroy();
    $("#body_PopupPescador").html("");
    $("#nombresPopupPescador").val("");

}

function getDataPescadorPop() {
    nombre = $("#nombresPopupPescador").val();
    pagina = $("#pagina_enviaPopPescador").val();

    $('#tabla_PopupPescador').dataTable().fnClearTable();
    $('#tabla_PopupPescador').dataTable().fnDestroy();

    $("#body_PopupPescador").html("");
    var table = $('#tabla_PopupPescador').DataTable({

        orderCellsTop: true
    });

    $.ajax({
        url: "pescador_data",
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
                            //if (data[i].pescador.length == 0) {
                                tabla += "<tr>";
                                tabla += "<td align='left'>" + data[i].c_cedula + "</td>";
                                tabla += "<td align='left'>" + data[i].c_apellidos + "</td>";
                                tabla += "<td align='left'>" + data[i].c_nombres + "</td>";
                                tabla += "<td align='left'>" + data[i].c_licenciaparma + "</td>";
                                tabla += '<td align="center"><textarea id="td_perfuncionario_' + i + '" hidden>' + JSON.stringify(data[i]) + '</textarea> <a style="cursor: pointer; font-size: 15px;" title="Buscar" data-close-stackbox="true" onClick="getDataPescador(' + i + ',\'' + pagina + '\');"><i class="fa fa-plus-circle text-blue"></i></a></td>';
                                tabla += "</tr>";
                    }
                }

                $('#tabla_PopupPescador').dataTable().fnClearTable();
                $('#tabla_PopupPescador').dataTable().fnDestroy();

                $("#body_PopupPescador").html("");
                $("#body_PopupPescador").append(tabla);

                var table = $('#tabla_PopupPescador').DataTable( {
                    orderCellsTop: true,
                    "order": [[ 1, "asc" ]],
                    responsive: true
                } );
            }
        },
        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
            //console.log( JSON.stringify(data));
        },
    });
}

function getDataPescador(idx, pagina) {
    armador = $("#td_perfuncionario_" + idx).val();
    newF = armador.replace(/None/g, null)
    newF = newF.replace(/False/g, "'false'")
    newF = newF.replace(/True/g, "'true'")
    newF = newF.replace(/'/g, '"')
    var json = JSON.parse("[" + newF + "]");

    if (pagina == 'armador1'){
        $("#fld_c_armadorunocedula").val(json[0].c_cedula);
        $("#fld_c_armadorunonombres").val(json[0].c_nombres);
        $("#fld_c_armadorunoapellidos").val(json[0].c_apellidos);
        $("#fld_c_armadorunoparma").val(json[0].c_licenciaparma);
    }
    if (pagina == 'armador2'){
        $("#fld_c_armadordoscedula").val(json[0].c_cedula);
        $("#fld_c_armadordosnombres").val(json[0].c_nombres);
        $("#fld_c_armadordosapellidos").val(json[0].c_apellidos);
        $("#fld_c_armadordosparma").val(json[0].c_licenciaparma);
    }
    if (pagina == 'pescadoranterior'){
        $("#fld_pesc_ante_ident").val(json[0].c_cedula);
        $("#fld_pesc_ante_nombres").val(json[0].c_nombres);
        $("#fld_pesc_ante_apellidos").val(json[0].c_apellidos);
        $("#fld_licParma_anter").val(json[0].c_licenciaparma);
    }
}

