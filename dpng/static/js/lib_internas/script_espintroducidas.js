
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

/****************************************************especies introducidas*****************************************************************/

function limpiarFormEspeciIntro(){
    jQuery('#addEspecie').find(':input').each(function() {
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
        case 'time':
            jQuery(this).val('');
            break;
        case 'checkbox':
        case 'radio':
            this.checked = false;
            break;
    }
    });
    $('.nav-tabs a[href="#tab_GenE"]').tab('show');
    $("#tipotrxEI").val(0);
    $(".select2").val("").trigger("change");
    $('#tabladet1').dataTable().fnClearTable();
    $('#tabladet1').dataTable().fnDestroy();
    $("#bodytabladet1").html("");
    $('#tabladet1').DataTable();
    $('#tabladet2').dataTable().fnClearTable();
    $('#tabladet2').dataTable().fnDestroy();
    $("#bodytabladet2").html("");
    $('#tabladet2').DataTable();
    $('#tabladet3').dataTable().fnClearTable();
    $('#tabladet3').dataTable().fnDestroy();
    $("#bodytabladet3").html("");
    $('#tabladet3').DataTable();
    $('#tabladet4').dataTable().fnClearTable();
    $('#tabladet4').dataTable().fnDestroy();
    $("#bodytabladet4").html("");
    $('#tabladet4').DataTable();
    $('#tabladet5').dataTable().fnClearTable();
    $('#tabladet5').dataTable().fnDestroy();
    $("#bodytabladet5").html("");
    $('#tabladet5').DataTable();
}

function getDataTablaEspecieIntro(especieid, tipo){
    $("#especieid").val(especieid);
    if(especieid == "6da62d60-d3ac-11e6-8df9-000c29e38a2f"){//gato
        $("#cabespecie1").show();
        $("#detespecie1").show();
        $("#detdatosespecie1").show();
        $("#cabespecie2").hide();
        $("#detespecie2").hide();
        $("#detdatosespecie2").hide();
        $("#cabespecie3").hide();
        $("#detespecie3").hide();
        $("#detdatosespecie3").hide();
        $("#cabespecie4").hide();
        $("#detespecie4").hide();
        $("#detdatosespecie4").hide();
        $("#cabespecie5").hide();
        $("#detespecie5").hide();
        $("#detdatosespecie5").hide();
        $("#cabespecie6").hide();
        $("#detespecie6").hide();
        $("#detdatosespecie6").hide();
        $("#legend1").html($("#SespeciesIntro option:selected").text());
        
    }
    if(especieid == "8c0da5f4-6e81-410c-9c88-bdf1cfa6b1b6"){//caracoles
        $("#cabespecie1").hide();
        $("#detespecie1").hide();
        $("#detdatosespecie1").hide();
        $("#cabespecie2").show();
        $("#detespecie2").show();
        $("#detdatosespecie2").show();
        $("#cabespecie3").hide();
        $("#detespecie3").hide();
        $("#detdatosespecie3").hide();
        $("#cabespecie4").hide();
        $("#detespecie4").hide();
        $("#detdatosespecie4").hide();
        $("#cabespecie5").hide();
        $("#detespecie5").hide();
        $("#detdatosespecie5").hide();
        $("#cabespecie6").hide();
        $("#detespecie6").hide();
        $("#detdatosespecie6").hide();
        $("#legend2").html($("#SespeciesIntro option:selected").text());
    }
    if(especieid == "0a40a0fa-7f00-0010-1180-00023a496b77"){//garza
        $("#cabespecie1").hide();
        $("#detespecie1").hide();
        $("#detdatosespecie1").hide();
        $("#cabespecie2").hide();
        $("#detespecie2").hide();
        $("#detdatosespecie2").hide();
        $("#cabespecie3").show();
        $("#detespecie3").show();
        $("#detdatosespecie3").show();
        $("#cabespecie4").hide();
        $("#detespecie4").hide();
        $("#detdatosespecie4").hide();
        $("#cabespecie5").hide();
        $("#detespecie5").hide();
        $("#detdatosespecie5").hide();
        $("#cabespecie6").hide();
        $("#detespecie6").hide();
        $("#detdatosespecie6").hide();
        $("#legend3").html($("#SespeciesIntro option:selected").text());
    }

    if(especieid == "0a40a0fa-7f00-0010-1180-00033a496b77"){//garrapatero
        $("#cabespecie1").hide();
        $("#detespecie1").hide();
        $("#detdatosespecie1").hide();
        $("#cabespecie2").hide();
        $("#detespecie2").hide();
        $("#detdatosespecie2").hide();
        $("#cabespecie3").hide();
        $("#detespecie3").hide();
        $("#detdatosespecie3").hide();
        $("#cabespecie4").show();
        $("#detespecie4").show();
        $("#detdatosespecie4").show();
        $("#cabespecie5").hide();
        $("#detespecie5").hide();
        $("#detdatosespecie5").hide();
        $("#cabespecie6").hide();
        $("#detespecie6").hide();
        $("#detdatosespecie6").hide();
        $("#legend4").html($("#SespeciesIntro option:selected").text());
    }

    if(especieid == "0a40a0fa-7f00-0010-1180-00099a496b77"){//hormiga
        $("#cabespecie1").hide();
        $("#detespecie1").hide();
        $("#detdatosespecie1").hide();
        $("#cabespecie2").hide();
        $("#detespecie2").hide();
        $("#detdatosespecie2").hide();
        $("#cabespecie3").hide();
        $("#detespecie3").hide();
        $("#detdatosespecie3").hide();
        $("#cabespecie4").hide();
        $("#detespecie4").hide();
        $("#detdatosespecie4").hide();
        $("#cabespecie5").show();
        $("#detespecie5").show();
        $("#detdatosespecie5").show();
        $("#cabespecie6").hide();
        $("#detespecie6").hide();
        $("#detdatosespecie6").hide();
        $("#legend5").html($("#SespeciesIntro option:selected").text());
    }
    if(especieid == "0a40a0fa-7f00-0010-1180-00099a496b78"){//hormiga
        $("#cabespecie1").hide();
        $("#detespecie1").hide();
        $("#detdatosespecie1").hide();
        $("#cabespecie2").hide();
        $("#detespecie2").hide();
        $("#detdatosespecie2").hide();
        $("#cabespecie3").hide();
        $("#detespecie3").hide();
        $("#detdatosespecie3").hide();
        $("#cabespecie4").hide();
        $("#detespecie4").hide();
        $("#detdatosespecie4").hide();
        $("#cabespecie5").hide();
        $("#detespecie5").hide();
        $("#detdatosespecie5").hide();
        $("#cabespecie6").show();
        $("#detespecie6").show();
        $("#detdatosespecie6").show();
        $("#legend6").html($("#SespeciesIntro option:selected").text());
    }
    if(tipo)
        buscarEspecieIntroParametros(especieid);
}


function adddetalleHormiga(){


    id_cab = $("#idcabespecie").val();
    
    ptogps = $('#ptogpsdet5IE').val();
    if($('#hormiga1det5IE').is(':checked')){
        valor1 = "&#10003;";
    }
    else{
        valor1 = "";
    }

    if($('#hormiga2det5IE').is(':checked')){
        valor2 = "&#10003;";
    }
    else{
        valor2 = "";
    }

    if($('#hormiga3det5IE').is(':checked')){
        valor3 = "&#10003;";
    }
    else{
        valor3 = "";
    }

    if($('#hormiga4det5IE').is(':checked')){
        valor4 = "&#10003;";
    }
    else{
        valor4 = "";
    }
    if($('#hormiga5det5IE').is(':checked')){
        valor5 = "&#10003;";
    }
    else{
        valor5 = "";
    }
    if($('#hormiga6det5IE').is(':checked')){
        valor6 = "&#10003;";
    }
    else{
        valor6 = "";
    }
    if($('#hormiga7det5IE').is(':checked')){
        valor7 = "&#10003;";
    }
    else{
        valor7 = "";
    }
    if($('#hormiga8det5IE').is(':checked')){
        valor8 = "&#10003;";
    }
    else{
        valor8 = "";
    }

    datosDet = '';
    datosDet  += '{';
    datosDet  += '"dato":"' + ptogps + '", ';
    datosDet  += '"dato1":"' + valor1 + '", ';
    datosDet  += '"dato2":"' + valor2 + '", ';
    datosDet  += '"dato3":"' + valor3 + '", ';
    datosDet  += '"dato4":"' + valor4 + '", ';
    datosDet  += '"dato5":"' + valor5 + '", ';
    datosDet  += '"dato6":"' + valor6 + '", ';
    datosDet  += '"dato7":"' + valor7 + '", ';
    datosDet  += '"dato8":"' + valor8 + '", ';
   
    //console.log( camposJson["orden"]);

    if( $("#trxcabespecie5").val() == 0){
        eliminar  = "<a class='delete' id_detalle='' id_cabecera='"+id_cab+"' onclick='deletedetalleHormiga(this);'><i class='fa fa-trash text-green btn_edit'></i></a>";
        editar    = "<a class='' id_detalle='' id_cabecera='"+id_cab+"' onclick='editdetalleHormiga(this);'><i class='fa fa-edit text-green btn_edit'></i></a>";

        datosDet  += '"editar":"' + editar + '", ';
        datosDet  += '"eliminar":"' + eliminar  +'"';
        datosDet  += '}'; 

        datosDet = "["+datosDet+"]";
        camposJson = JSON.parse(datosDet);

        var dTable = $('#tabladet5').DataTable({"destroy": true,"order": [[ 1, 'asc' ]],"columnDefs": [{ className: 'text-right', targets: [0, 1, 2, 3, 4,5,6,7] }]});
        dTable.row.add([
                1,
                camposJson[0].dato,
                camposJson[0].dato1,
                camposJson[0].dato2,
                camposJson[0].dato3,
                camposJson[0].dato4,
                camposJson[0].dato5,
                camposJson[0].dato6,
                camposJson[0].dato7,
                camposJson[0].dato8,
                camposJson[0].editar,
                camposJson[0].eliminar
        ]).draw();
        dTable.on( 'order.dt search.dt', function () {
            dTable.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                cell.innerHTML = i+1;
            } );
        } ).draw();
    }else{
        iddetalle = $("#iddetespecie").val();
        eliminar  = "<a class='delete' id_detalle='"+iddetalle+"' id_cabecera='"+id_cab+"' onclick='deletedetalleHormiga(this);'><i class='fa fa-trash text-green btn_edit'></i></a>";
        editar    = "<a class='' id_detalle='"+iddetalle+"' id_cabecera='"+id_cab+"' onclick='editdetalleHormiga(this);'><i class='fa fa-edit text-green btn_edit'></i></a>";

        datosDet  += '"editar":"' + editar + '", ';
        datosDet  += '"eliminar":"' + eliminar  +'"';
        datosDet  += '}'; 

        datosDet = "["+datosDet+"]";
        camposJson = JSON.parse(datosDet);

        indice = $("#idxTrxcabespecie5").val();
        var dTable = $('#tabladet5').DataTable({"destroy": true,"columnDefs": [{ className: 'text-center', targets: [0, 1, 2, 3, 4,5,6,7,8] }]});
        console.log(indice)
        dTable.row(indice).data( [
                (parseInt(indice)+1),
                camposJson[0].dato,
                camposJson[0].dato1,
                camposJson[0].dato2,
                camposJson[0].dato3,
                camposJson[0].dato4,
                camposJson[0].dato5,
                camposJson[0].dato6,
                camposJson[0].dato7,
                camposJson[0].dato8,
                camposJson[0].editar,
                camposJson[0].eliminar
        ] ).draw();
    }
   

    validaContenedorExt2("addEspecie", "Registro insertado con exito");
    $('.nav-tabs a[href="#tab_detE"]').tab('show');
}

function deletedetalleHormiga(trthis){

    var pageParamTable = $('#tabladet5').DataTable();
    var tableRow = pageParamTable.row($(trthis).parents('tr'));
    id_detalle = $(trthis).attr("id_detalle");
    
    if(id_detalle){
        datos = '{"estado":"I","eliminado":"t"}';
        $.ajax({
        url: "update_General",
        type: "get",
        cache: 'false',
        data: {
            "dj_url": "spiespeciesintroducidashormigas",
            "idtabla": id_detalle,
            "data": JSON.stringify(datos)
        },
        dataType: "json",

        success: function(data) {
            if (data.id == undefined) {
                $('#modalLoadin').hide();
                validaContenedorExt("addEspecie", "Error al Insertar el registro");
                console.log("idtabla---->" + id + "--->" + "data---->" + datos + "--->" + "cmncmonitreportediariosistema" + "Error--->" + data);
            } else {
                validaContenedorExt2("addEspecie", "Registro eliminado con exito");
                pageParamTable.row( tableRow ).remove().draw();
            }
        },
        error: function(data) {
            $('#modalLoadin').hide();
            validaContenedorExt("addEspecie", "Error al Insertar el registro");
            console.log("idtabla---->" + id + "--->" + "data---->" + datos + "--->" + "cmncmonitreportediariosistema" + "Error--->" + data);
        },
    });
    }else
        pageParamTable.row( tableRow ).remove().draw();
}

function addnewdetalleCaceria(){
    limpiarFormEspecieIntro(6);
    $('.nav-tabs a[href="#tab_detdatosE"]').tab('show');
}

function adddetalleCaceria(){
    id_cab = $("#idcabespecie").val();
    
    codigogps   = $('#codgpsdet6EI').val();
    esp1h    = $('#cabrah6EI').val();
    esp1m    = $('#cabram6EI').val();
    esp1j    = $('#cabraj6EI').val();
    esp2h    = $('#asnoh6EI').val();
    esp2m    = $('#asnom6EI').val();
    esp2j    = $('#asnoj6EI').val();    
    esp3h    = $('#cerdoh6EI').val();
    esp3m    = $('#cerdom6EI').val();
    esp3j    = $('#cerdoj6EI').val();
    esp4h    = $('#vacunoh6EI').val();
    esp4m    = $('#vacunom6EI').val();
    esp4j    = $('#vacunoj6EI').val();
    observacion  = $('#observdet6EI').val();

    datosDet = '';
    datosDet  += '{';
    datosDet  += '"dato1":"' + codigogps + '", ';
    datosDet  += '"dato2":"' + esp1h + '", ';
    datosDet  += '"dato3":"' + esp1m + '", ';
    datosDet  += '"dato4":"' + esp1j + '", ';
    datosDet  += '"dato5":"' + esp2h + '", ';
    datosDet  += '"dato6":"' + esp2m + '", ';
    datosDet  += '"dato7":"' + esp2j + '", ';
    datosDet  += '"dato8":"' + esp3h + '", ';
    datosDet  += '"dato9":"' + esp3m + '", ';
    datosDet  += '"dato10":"' + esp3j + '", ';
    datosDet  += '"dato11":"' + esp4h + '", ';
    datosDet  += '"dato12":"' + esp4m + '", ';
    datosDet  += '"dato13":"' + esp4j + '", ';
    datosDet  += '"dato14":"' + observacion + '", ';
    
    //console.log( camposJson["orden"]);
    if( $("#trxcabespecie6").val() == 0){
        eliminar  = "<a class='delete' id_detalle='' id_cabecera='"+id_cab+"' onclick='deletedetalleCaceria(this);'><i class='fa fa-trash text-green btn_edit'></i></a>";
        editar    = "<a class='' id_detalle='' id_cabecera='"+id_cab+"' onclick='editdetalleCaceria(this);'><i class='fa fa-edit text-green btn_edit'></i></a>";
        datosDet  += '"editar":"' + editar + '", ';
        datosDet  += '"eliminar":"' + eliminar  +'"';
        datosDet  += '}'; 

        datosDet = "["+datosDet+"]";
        camposJson = JSON.parse(datosDet);

        var dTable = $('#tabladet6').DataTable({"destroy": true,"order": [[ 1, 'asc' ]],"columnDefs": [{ className: 'text-center', targets: [4,5,6,7,8,9] }]});
        dTable.row.add([
                1,
                camposJson[0].dato1,
                camposJson[0].dato2,
                camposJson[0].dato3,
                camposJson[0].dato4,
                camposJson[0].dato5,
                camposJson[0].dato6,
                camposJson[0].dato7,
                camposJson[0].dato8,
                camposJson[0].dato9,
                camposJson[0].dato10,
                camposJson[0].dato11,
                camposJson[0].dato12,
                camposJson[0].dato13,
                camposJson[0].dato14,
                camposJson[0].editar,
                camposJson[0].eliminar
        ]).draw();
        dTable.on( 'order.dt search.dt', function () {
            dTable.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                cell.innerHTML = i+1;
            } );
        } ).draw();
    }else{
        iddetalle = $("#iddetespecie").val();
        eliminar  = "<a class='delete' id_detalle='"+iddetalle+"' id_cabecera='"+id_cab+"' onclick='deletedetalleCaceria(this);'><i class='fa fa-trash text-green btn_edit'></i></a>";
        editar    = "<a class='' id_detalle='"+iddetalle+"' id_cabecera='"+id_cab+"' onclick='editdetalleCaceria(this);'><i class='fa fa-edit text-green btn_edit'></i></a>";
        datosDet  += '"editar":"' + editar + '", ';
        datosDet  += '"eliminar":"' + eliminar  +'"';
        datosDet  += '}'; 

        datosDet = "["+datosDet+"]";
        camposJson = JSON.parse(datosDet);
        indice = $("#idxTrxcabespecie6").val();
        var dTable = $('#tabladet6').DataTable({"destroy": true,"columnDefs": [{ className: 'text-center', targets: [4,5,6,7,8,9] }]});
        console.log(indice)
        dTable.row(indice).data( [
            (parseInt(indice)+1),
                camposJson[0].dato1,
                camposJson[0].dato2,
                camposJson[0].dato3,
                camposJson[0].dato4,
                camposJson[0].dato5,
                camposJson[0].dato6,
                camposJson[0].dato7,
                camposJson[0].dato8,
                camposJson[0].dato9,
                camposJson[0].dato10,
                camposJson[0].dato11,
                camposJson[0].dato12,
                camposJson[0].dato13,
                camposJson[0].dato14,
                camposJson[0].editar,
                camposJson[0].eliminar
        ] ).draw();
    }

    validaContenedorExt2("addEspecie", "Registro insertado con exito");
    $('.nav-tabs a[href="#tab_detE"]').tab('show');
}

function deletedetalleCaceria(trthis){

    var pageParamTable = $('#tabladet6').DataTable();
    var tableRow = pageParamTable.row($(trthis).parents('tr'));
    id_detalle = $(trthis).attr("id_detalle");
    
    if(id_detalle){
        datos = '{"estado":"I","eliminado":"t"}';
        $.ajax({
            url: "update_General",
            type: "get",
            cache: 'false',
            data: {
                "dj_url": "spiespeciesintroducidascaceria",
                "idtabla": id_detalle,
                "data": JSON.stringify(datos)
            },
            dataType: "json",

            success: function(data) {
                if (data.id == undefined) {
                    $('#modalLoadin').hide();
                    validaContenedorExt("addEspecie", "Error al Insertar el registro");
                    console.log("idtabla---->" + id + "--->" + "data---->" + datos + "--->" + "spiespeciesintroducidascaceria" + "Error--->" + data);
                } else {
                    validaContenedorExt2("addEspecie", "Registro eliminado con exito");
                    pageParamTable.row( tableRow ).remove().draw();
                }
            },
            error: function(data) {
                $('#modalLoadin').hide();
                validaContenedorExt("addEspecie", "Error al Insertar el registro");
                console.log("idtabla---->" + id + "--->" + "data---->" + datos + "--->" + "spiespeciesintroducidascaceria" + "Error--->" + data);
            },
        });
    }else
        pageParamTable.row( tableRow ).remove().draw();
}


function adddetalleGato(){
    id_cab = $("#idcabespecie").val();
    
    codigogps   = $('#codgpsdetIE').val();
    fecha1      = $('#fechacebo1IE').val();
    fecha2      = $('#fechacebo2IE').val();
    cantidad    = $('#cantidaddetEI').val();
    sexo        = $('#SsexodetEI').val();
    

    if($('#capturadetIE').is(':checked')){
        captura = true;
        valor1 = "&#10003;";
    }
    else{
        captura = false;
        valor1 = "";
    }
    if($('#nocapturadetIE').is(':checked')){
        nocaptura = true;
        valor2 = "&#10003;";
    }
    else{
        nocaptura = false;
        valor2 = "";
    }

    if($('#escapadodetIE').is(':checked')){
        escapados = true;
        valor3 = "&#10003;";
    }
    else{
        escapados = false;
        valor3 = "";
    }
    if($('#eliminadodetIE').is(':checked')){
        eliminados = true;
        valor4 = "&#10003;";
    }
    else{
        eliminados = false;
        valor4 = "";
    }

    if($('#consumidodetIE').is(':checked')){
        consumido = true;
        valor5 = "&#10003;";
    }
    else{
        consumido = false;
        valor5 = "";
    }

    if($('#noconsumidodetIE').is(':checked')){
        noconsumido = true;
        valor6 = "&#10003;";
    }
    else{
        noconsumido = false;
        valor6 = "";
    }

    

    datosDet = '';
    datosDet  += '{';
    datosDet  += '"dato1":"' + codigogps + '", ';
    datosDet  += '"dato2":"' + fecha1 + '", ';
    datosDet  += '"dato3":"' + fecha2 + '", ';
    datosDet  += '"dato4":"' + valor1 + '", ';
    datosDet  += '"dato5":"' + valor2 + '", ';
    datosDet  += '"dato6":"' + valor3 + '", ';
    datosDet  += '"dato7":"' + valor4 + '", ';
    datosDet  += '"dato8":"' + valor5 + '", ';
    datosDet  += '"dato9":"' + valor6 + '", ';
    datosDet  += '"dato10":"' + cantidad + '", ';
    datosDet  += '"dato11":"' + sexo + '", ';

    
    //console.log( camposJson["orden"]);
    if( $("#trxcabespecie1").val() == 0){
        eliminar  = "<a class='delete' id_detalle='' id_cabecera='"+id_cab+"' onclick='deletedetalleGato(this);'><i class='fa fa-trash text-green btn_edit'></i></a>";
        editar    = "<a class='' id_detalle='' id_cabecera='"+id_cab+"' onclick='editdetalleGato(this);'><i class='fa fa-edit text-green btn_edit'></i></a>";
        datosDet  += '"editar":"' + editar + '", ';
        datosDet  += '"eliminar":"' + eliminar  +'"';
        datosDet  += '}'; 

        datosDet = "["+datosDet+"]";
        camposJson = JSON.parse(datosDet);

        var dTable = $('#tabladet1').DataTable({"destroy": true,"order": [[ 1, 'asc' ]],"columnDefs": [{ className: 'text-center', targets: [4,5,6,7,8,9] }]});
        dTable.row.add([
                1,
                camposJson[0].dato1,
                camposJson[0].dato2,
                camposJson[0].dato3,
                camposJson[0].dato4,
                camposJson[0].dato5,
                camposJson[0].dato6,
                camposJson[0].dato7,
                camposJson[0].dato8,
                camposJson[0].dato9,
                camposJson[0].dato10,
                camposJson[0].dato11,
                camposJson[0].editar,
                camposJson[0].eliminar
        ]).draw();
        dTable.on( 'order.dt search.dt', function () {
            dTable.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                cell.innerHTML = i+1;
            } );
        } ).draw();
    }else{
        iddetalle = $("#iddetespecie").val();
        eliminar  = "<a class='delete' id_detalle='"+iddetalle+"' id_cabecera='"+id_cab+"' onclick='deletedetalleGato(this);'><i class='fa fa-trash text-green btn_edit'></i></a>";
        editar    = "<a class='' id_detalle='"+iddetalle+"' id_cabecera='"+id_cab+"' onclick='editdetalleGato(this);'><i class='fa fa-edit text-green btn_edit'></i></a>";
        datosDet  += '"editar":"' + editar + '", ';
        datosDet  += '"eliminar":"' + eliminar  +'"';
        datosDet  += '}'; 

        datosDet = "["+datosDet+"]";
        camposJson = JSON.parse(datosDet);
        indice = $("#idxTrxcabespecie1").val();
        var dTable = $('#tabladet1').DataTable({"destroy": true,"columnDefs": [{ className: 'text-center', targets: [4,5,6,7,8,9] }]});
        console.log(indice)
        dTable.row(indice).data( [
            (parseInt(indice)+1),
                camposJson[0].dato1,
                camposJson[0].dato2,
                camposJson[0].dato3,
                camposJson[0].dato4,
                camposJson[0].dato5,
                camposJson[0].dato6,
                camposJson[0].dato7,
                camposJson[0].dato8,
                camposJson[0].dato9,
                camposJson[0].dato10,
                camposJson[0].dato11,
                camposJson[0].editar,
                camposJson[0].eliminar
        ] ).draw();
    }

    validaContenedorExt2("addEspecie", "Registro insertado con exito");
    $('.nav-tabs a[href="#tab_detE"]').tab('show');
}

function deletedetalleGato(trthis){

    var pageParamTable = $('#tabladet1').DataTable();
    var tableRow = pageParamTable.row($(trthis).parents('tr'));
    id_detalle = $(trthis).attr("id_detalle");
    
    if(id_detalle){
        datos = '{"estado":"I","eliminado":"t"}';
        $.ajax({
            url: "update_General",
            type: "get",
            cache: 'false',
            data: {
                "dj_url": "spiespeciesintroducidasgatos",
                "idtabla": id_detalle,
                "data": JSON.stringify(datos)
            },
            dataType: "json",

            success: function(data) {
                if (data.id == undefined) {
                    $('#modalLoadin').hide();
                    validaContenedorExt("addEspecie", "Error al Insertar el registro");
                    console.log("idtabla---->" + id + "--->" + "data---->" + datos + "--->" + "cmncmonitreportediariosistema" + "Error--->" + data);
                } else {
                    validaContenedorExt2("addEspecie", "Registro eliminado con exito");
                    pageParamTable.row( tableRow ).remove().draw();
                }
            },
            error: function(data) {
                $('#modalLoadin').hide();
                validaContenedorExt("addEspecie", "Error al Insertar el registro");
                console.log("idtabla---->" + id + "--->" + "data---->" + datos + "--->" + "cmncmonitreportediariosistema" + "Error--->" + data);
            },
        });
    }else
        pageParamTable.row( tableRow ).remove().draw();
}

function adddetalleGarza(){


    id_cab = $("#idcabespecie").val();
    
    sitio       = $('#Ssitio3EI').val();
    sitiotext   = $('#Ssitio3EI option:selected').text();
    codigogps   = $('#codgpsdet3IE').val();
    eliminadas  = $('#eliminadasdet3IE').val();
    escapadas   = $('#escapadasdet3IE').val();
    numnidos    = $('#numnidosdet3IE').val();
    numhuevos   = $('#numhuevosdet3IE').val();
    observacion = $('#observdet3IE').val();

   
    datosDet = '';
    datosDet  += '{';
    datosDet  += '"dato1":"' + sitiotext + '", ';
    datosDet  += '"dato2":"' + codigogps + '", ';
    datosDet  += '"dato7":"' + observacion + '", ';
    datosDet  += '"dato3":"' + eliminadas + '", ';
    datosDet  += '"dato4":"' + escapadas + '", ';
    datosDet  += '"dato5":"' + numnidos + '", ';
    datosDet  += '"dato6":"' + numhuevos + '", ';
    
    //console.log( camposJson["orden"]);

    if( $("#trxcabespecie3").val() == 0){
        eliminar  = "<a class='delete' id_detalle='' id_sitio='"+sitio+"' id_cabecera='"+id_cab+"' onclick='deletedetalleGarza(this);'><i class='fa fa-trash text-green btn_edit'></i></a>";
        editar    = "<a class='' id_detalle='' id_sitio='"+sitio+"' id_cabecera='"+id_cab+"' onclick='editdetalleGarza(this);'><i class='fa fa-edit text-green btn_edit'></i></a>";

        datosDet  += '"editar":"' + editar + '", ';
        datosDet  += '"eliminar":"' + eliminar  +'"';
        datosDet  += '}'; 

        datosDet = "["+datosDet+"]";
        camposJson = JSON.parse(datosDet);

        var dTable = $('#tabladet3').DataTable({"destroy": true,"order": [[ 1, 'asc' ]],"columnDefs": [{ className: 'text-right', targets: [1,2,3,4,5,6] }]});
        dTable.row.add([
                1,
                camposJson[0].dato1,
                camposJson[0].dato2,
                camposJson[0].dato3,
                camposJson[0].dato4,
                camposJson[0].dato5,
                camposJson[0].dato6,
                camposJson[0].dato7,
                camposJson[0].editar,
                camposJson[0].eliminar
        ]).draw();
        dTable.on( 'order.dt search.dt', function () {
            dTable.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                cell.innerHTML = i+1;
            } );
        } ).draw();
    }else{
        iddetalle = $("#iddetespecie").val();
        eliminar  = "<a class='delete' id_detalle='"+iddetalle+"' id_sitio='"+sitio+"' id_cabecera='"+id_cab+"' onclick='deletedetalleGarza(this);'><i class='fa fa-trash text-green btn_edit'></i></a>";
        editar    = "<a class='' id_detalle='"+iddetalle+"' id_sitio='"+sitio+"' id_cabecera='"+id_cab+"' onclick='editdetalleGarza(this);'><i class='fa fa-edit text-green btn_edit'></i></a>";

        datosDet  += '"editar":"' + editar + '", ';
        datosDet  += '"eliminar":"' + eliminar  +'"';
        datosDet  += '}'; 

        datosDet = "["+datosDet+"]";
        camposJson = JSON.parse(datosDet);

        indice = $("#idxTrxcabespecie3").val();
        var dTable = $('#tabladet3').DataTable({"destroy": true,"columnDefs": [{ className: 'text-right', targets: [1,2,3,4,5,6] }]});
        console.log(indice)
        dTable.row(indice).data( [
                (parseInt(indice)+1),
                camposJson[0].dato1,
                camposJson[0].dato2,
                camposJson[0].dato3,
                camposJson[0].dato4,
                camposJson[0].dato5,
                camposJson[0].dato6,
                camposJson[0].dato7,
                camposJson[0].editar,
                camposJson[0].eliminar
        ] ).draw();
    }
   
    validaContenedorExt2("addEspecie", "Registro insertado con exito");
    $('.nav-tabs a[href="#tab_detE"]').tab('show');
}

function deletedetalleGarza(trthis){

    var pageParamTable = $('#tabladet3').DataTable();
    var tableRow = pageParamTable.row($(trthis).parents('tr'));
    id_detalle = $(trthis).attr("id_detalle");
    
    if(id_detalle){
        datos = '{"estado":"I","eliminado":"t"}';
        $.ajax({
            url: "update_General",
            type: "get",
            cache: 'false',
            data: {
                "dj_url": "spiespeciesintroducidasaves",
                "idtabla": id_detalle,
                "data": JSON.stringify(datos)
            },
            dataType: "json",

            success: function(data) {
                if (data.id == undefined) {
                    $('#modalLoadin').hide();
                    validaContenedorExt("addEspecie", "Error al Insertar el registro");
                    console.log("idtabla---->" + id + "--->" + "data---->" + datos + "--->" + "cmncmonitreportediariosistema" + "Error--->" + data);
                } else {
                    validaContenedorExt2("addEspecie", "Registro eliminado con exito");
                    pageParamTable.row( tableRow ).remove().draw();
                }
            },
            error: function(data) {
                $('#modalLoadin').hide();
                validaContenedorExt("addEspecie", "Error al Insertar el registro");
                console.log("idtabla---->" + id + "--->" + "data---->" + datos + "--->" + "cmncmonitreportediariosistema" + "Error--->" + data);
            },
        });
    }else
        pageParamTable.row( tableRow ).remove().draw();
}

function adddetalleGarrapatero(){
    id_cab = $("#idcabespecie").val();
    
    sitio       = $('#Ssitio4EI').val();
    sitiotext   = $('#Ssitio4EI option:selected').text();
    codigogps   = $('#codgpsdet4IE').val();
    eliminadas  = $('#eliminadasdet4IE').val();
    escapadas   = $('#escapadasdet4IE').val();
    numnidos    = $('#numnidosdet4IE').val();
    numhuevos   = $('#numhuevosdet4IE').val();
    observacion = $('#observdet4IE').val();

   
    datosDet = '';
    datosDet  += '{';
    datosDet  += '"dato1":"' + sitiotext + '", ';
    datosDet  += '"dato2":"' + codigogps + '", ';
    datosDet  += '"dato7":"' + observacion + '", ';
    datosDet  += '"dato3":"' + eliminadas + '", ';
    datosDet  += '"dato4":"' + escapadas + '", ';
    datosDet  += '"dato5":"' + numnidos + '", ';
    datosDet  += '"dato6":"' + numhuevos + '", ';
    
    //console.log( camposJson["orden"]);

    if( $("#trxcabespecie4").val() == 0){
        eliminar  = "<a class='delete' id_detalle='' id_sitio='"+sitio+"' id_cabecera='"+id_cab+"' onclick='deletedetalleGarza(this);'><i class='fa fa-trash text-green btn_edit'></i></a>";
        editar    = "<a class='' id_detalle='' id_sitio='"+sitio+"' id_cabecera='"+id_cab+"' onclick='editdetalleGarza(this);'><i class='fa fa-edit text-green btn_edit'></i></a>";

        datosDet  += '"editar":"' + editar + '", ';
        datosDet  += '"eliminar":"' + eliminar  +'"';
        datosDet  += '}'; 

        datosDet = "["+datosDet+"]";
        camposJson = JSON.parse(datosDet);

        var dTable = $('#tabladet4').DataTable({"destroy": true,"order": [[ 1, 'asc' ]],"columnDefs": [{ className: 'text-right', targets: [1,2,3,4,5,6] }]});
        dTable.row.add([
                1,
                camposJson[0].dato1,
                camposJson[0].dato2,
                camposJson[0].dato3,
                camposJson[0].dato4,
                camposJson[0].dato5,
                camposJson[0].dato6,
                camposJson[0].dato7,
                camposJson[0].editar,
                camposJson[0].eliminar
        ]).draw();
        dTable.on( 'order.dt search.dt', function () {
            dTable.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                cell.innerHTML = i+1;
            } );
        } ).draw();
    }else{
        iddetalle = $("#iddetespecie").val();
        eliminar  = "<a class='delete' id_detalle='"+iddetalle+"' id_sitio='"+sitio+"' id_cabecera='"+id_cab+"' onclick='deletedetalleGarza(this);'><i class='fa fa-trash text-green btn_edit'></i></a>";
        editar    = "<a class='' id_detalle='"+iddetalle+"' id_sitio='"+sitio+"' id_cabecera='"+id_cab+"' onclick='editdetalleGarza(this);'><i class='fa fa-edit text-green btn_edit'></i></a>";

        datosDet  += '"editar":"' + editar + '", ';
        datosDet  += '"eliminar":"' + eliminar  +'"';
        datosDet  += '}'; 

        datosDet = "["+datosDet+"]";
        camposJson = JSON.parse(datosDet);

        indice = $("#idxTrxcabespecie4").val();
        var dTable = $('#tabladet4').DataTable({"destroy": true,"columnDefs": [{ className: 'text-right', targets: [1,2,3,4,5,6] }]});
        console.log(indice)
        dTable.row(indice).data( [
                (parseInt(indice)+1),
                camposJson[0].dato1,
                camposJson[0].dato2,
                camposJson[0].dato3,
                camposJson[0].dato4,
                camposJson[0].dato5,
                camposJson[0].dato6,
                camposJson[0].dato7,
                camposJson[0].editar,
                camposJson[0].eliminar
        ] ).draw();
    }
   
    validaContenedorExt2("addEspecie", "Registro insertado con exito");
    $('.nav-tabs a[href="#tab_detE"]').tab('show');
}

function deletedetalleGarrapatero(trthis){

    var pageParamTable = $('#tabladet4').DataTable();
    var tableRow = pageParamTable.row($(trthis).parents('tr'));
    id_detalle = $(trthis).attr("id_detalle");
    
    if(id_detalle){
        datos = '{"estado":"I","eliminado":"t"}';
        $.ajax({
            url: "update_General",
            type: "get",
            cache: 'false',
            data: {
                "dj_url": "spiespeciesintroducidasaves",
                "idtabla": id_detalle,
                "data": JSON.stringify(datos)
            },
            dataType: "json",

            success: function(data) {
                if (data.id == undefined) {
                    $('#modalLoadin').hide();
                    validaContenedorExt("addEspecie", "Error al Insertar el registro");
                    console.log("idtabla---->" + id + "--->" + "data---->" + datos + "--->" + "cmncmonitreportediariosistema" + "Error--->" + data);
                } else {
                    validaContenedorExt2("addEspecie", "Registro eliminado con exito");
                    pageParamTable.row( tableRow ).remove().draw();
                }
            },
            error: function(data) {
                $('#modalLoadin').hide();
                validaContenedorExt("addEspecie", "Error al Insertar el registro");
                console.log("idtabla---->" + id + "--->" + "data---->" + datos + "--->" + "cmncmonitreportediariosistema" + "Error--->" + data);
            },
        });
    }else
        pageParamTable.row( tableRow ).remove().draw();
}

function addnewdetalleCaracol(){
    limpiarFormEspecieIntro(2);
    $('.nav-tabs a[href="#tab_detdatosE"]').tab('show');
}

function adddetalleCaracol(){


    id_cab = $("#idcabespecie").val();
    
    codigogps   = $('#codgpsdet2EI').val();
    adultos     = $('#adultodet2EI').val();
    juveniles   = $('#juvenildet2EI').val();
    huevos      = $('#huevosdet2EI').val();
    muertas     = $('#muertodet2EI').val();
    total       = $('#totaldet2EI').val();

    if($('#limpiezamandet2EI').is(':checked')){
        limpieza1 = true;
        valor1 = "&#10003;";
    }
    else{
        limpieza1 = false;
        valor1 = "";
    }

    if($('#limpiezamecdet2EI').is(':checked')){
        limpieza2 = true;
        valor2 = "&#10003;";
    }
    else{
        limpieza2 = false;
        valor2 = "";
    }

    if($('#controlquidet2EI').is(':checked')){
        control = true;
        valor3 = "&#10003;";
    }
    else{
        control = false;
        valor3 = "";
    }


    datosDet = '';
    datosDet  += '{';
    datosDet  += '"dato1":"' + codigogps + '", ';
    datosDet  += '"dato2":"' + adultos + '", ';
    datosDet  += '"dato3":"' + juveniles + '", ';
    datosDet  += '"dato4":"' + huevos + '", ';
    datosDet  += '"dato5":"' + muertas + '", ';
    datosDet  += '"dato6":"' + total + '", ';
    datosDet  += '"dato7":"' + valor1 + '", ';
    datosDet  += '"dato8":"' + valor2 + '", ';
    datosDet  += '"dato9":"' + valor3 + '",';
    
    //console.log( camposJson["orden"]);

    if( $("#trxcabespecie2").val() == 0){

        eliminar  = "<a class='delete' id_detalle='' id_cabecera='"+id_cab+"' onclick='deletedetalleCaracol(this);'><i class='fa fa-trash text-green btn_edit'></i></a>";
        editar    = "<a class='' id_detalle='' id_cabecera='"+id_cab+"' onclick='editdetalleCaracol(this);'><i class='fa fa-edit text-green btn_edit'></i></a>";

        datosDet  += '"editar":"' + editar + '", ';
        datosDet  += '"eliminar":"' + eliminar  +'"';
        datosDet  += '}'; 

        datosDet = "["+datosDet+"]";
        camposJson = JSON.parse(datosDet);
   
        var dTable = $('#tabladet2').DataTable({"destroy": true,"order": [[ 1, 'asc' ]],"columnDefs": [{ className: 'text-center', targets: [0,2,3,4,5,6,7,8,9,10,11] }]});
        dTable.row.add([
            1,
                camposJson[0].dato1,
                camposJson[0].dato2,
                camposJson[0].dato3,
                camposJson[0].dato4,
                camposJson[0].dato5,
                camposJson[0].dato6,
                camposJson[0].dato7,
                camposJson[0].dato8,
                camposJson[0].dato9,
                camposJson[0].editar,
                camposJson[0].eliminar
        ]).draw();
        dTable.on( 'order.dt search.dt', function () {
            dTable.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                cell.innerHTML = i+1;
            } );
        } ).draw();
    }else{
        iddetalle = $("#iddetespecie").val();
        eliminar  = "<a class='delete' id_detalle='"+iddetalle+"' id_cabecera='"+id_cab+"' onclick='deletedetalleCaracol(this);'><i class='fa fa-trash text-green btn_edit'></i></a>";
        editar    = "<a class='' id_detalle='"+iddetalle+"' id_cabecera='"+id_cab+"' onclick='editdetalleCaracol(this);'><i class='fa fa-edit text-green btn_edit'></i></a>";
        datosDet  += '"editar":"' + editar + '", ';
        datosDet  += '"eliminar":"' + eliminar  +'"';
        datosDet  += '}'; 

        datosDet = "["+datosDet+"]";
        camposJson = JSON.parse(datosDet);
        indice = $("#idxTrxcabespecie2").val();
        var dTable = $('#tabladet2').DataTable({"destroy": true,"columnDefs": [{ className: 'text-center', targets: [0,2,3,4,5,6,7,8,9,10,11] }]});
        console.log(indice)
        dTable.row(indice).data( [
            (parseInt(indice)+1),
            camposJson[0].dato1,
            camposJson[0].dato2,
            camposJson[0].dato3,
            camposJson[0].dato4,
            camposJson[0].dato5,
            camposJson[0].dato6,
            camposJson[0].dato7,
            camposJson[0].dato8,
            camposJson[0].dato9,
            camposJson[0].editar,
            camposJson[0].eliminar
        ] ).draw();
    }

    validaContenedorExt2("addEspecie", "Registro insertado con exito");
    $('.nav-tabs a[href="#tab_detE"]').tab('show');
}


function deletedetalleCaracol(trthis){

    var pageParamTable = $('#tabladet2').DataTable();
    var tableRow = pageParamTable.row($(trthis).parents('tr'));
    id_detalle = $(trthis).attr("id_detalle");
    
    if(id_detalle){
        datos = '{"estado":"I","eliminado":"t"}';
        $.ajax({
            url: "update_General",
            type: "get",
            cache: 'false',
            data: {
                "dj_url": "spiespeciesintroducidascaracol",
                "idtabla": id_detalle,
                "data": JSON.stringify(datos)
            },
            dataType: "json",

            success: function(data) {
                if (data.id == undefined) {
                    $('#modalLoadin').hide();
                    validaContenedorExt("addEspecie", "Error al Insertar el registro");
                    console.log("idtabla---->" + id + "--->" + "data---->" + datos + "--->" + "cmncmonitreportediariosistema" + "Error--->" + data);
                } else {
                    validaContenedorExt2("addEspecie", "Registro eliminado con exito");
                    pageParamTable.row( tableRow ).remove().draw();
                }
            },
            error: function(data) {
                $('#modalLoadin').hide();
                validaContenedorExt("addEspecie", "Error al Insertar el registro");
                console.log("idtabla---->" + id + "--->" + "data---->" + datos + "--->" + "cmncmonitreportediariosistema" + "Error--->" + data);
            },
        });
    }else
        pageParamTable.row( tableRow ).remove().draw();
}


/*funcion para mapear los datos del funcionario en el formulario de ingresos*/
function getDataFuncionarioEspintro(json,num) {
    $("#encargado"+num+"EI").val(json[0].persona_id.apellidos + ' ' + json[0].persona_id.nombres);
    $("#idencargado"+num+"EI").val(json[0].id);
}


function editdetalleCaracol(trthis){
    $("#trxcabespecie2").val(1);
    $("#idxTrxcabespecie2").val($(trthis).parents('tr').index());
    var pageParamTable = $('#tabladet2').DataTable();
    var tableRow = $(trthis).parents('tr');
    id_detalle = $(trthis).attr("id_detalle");

    $("#iddetespecie").val(id_detalle);
    
            console.log(tableRow.length);
            var celdas = $(tableRow).find("td"); //devolverá las celdas de una fila
            codigogps  = $(celdas[1]).html();
            adultos    = $(celdas[2]).html();
            juveniles  = $(celdas[3]).html();
            huevos     = $(celdas[4]).html();
            muertos    = $(celdas[5]).html();
            total      = $(celdas[6]).html();
            
            lman = $(celdas[7]).html();
            lmec = $(celdas[8]).html();
            cqui = $(celdas[9]).html();

            $("#codgpsdet2EI").val(codigogps);
            $("#adultodet2EI").val(adultos);
            $("#juvenildet2EI").val(juveniles);
            $("#huevosdet2EI").val(huevos);
            $("#muertodet2EI").val(muertos);
            $("#totaldet2EI").val(total);


            if(lman != "")  $("#limpiezamandet2EI").prop('checked', true); else $("#limpiezamandet2EI").prop('checked', false);
            if(lmec != "")  $("#limpiezamecdet2EI").prop('checked', true); else $("#limpiezamecdet2EI").prop('checked', false);
            if(cqui != "")  $("#controlquidet2EI").prop('checked', true);  else $("#controlquidet2EI").prop('checked', false);
    //}
    $('.nav-tabs a[href="#tab_detdatosE"]').tab('show');      
}

function limpiarFormEspecieIntro(especie){
    jQuery('#detdatosespecie'+especie).find(':input').each(function() {
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
    $("#trxcabespecie"+especie).val(0);
    $("#idxTrxcabespecie"+especie).val("");
}

function addnewdetalleGato(){
     limpiarFormEspecieIntro(1);
    $('.nav-tabs a[href="#tab_detdatosE"]').tab('show'); 
}

function editdetalleGato(trthis){
    $("#trxcabespecie1").val(1);
    $("#idxTrxcabespecie1").val($(trthis).parents('tr').index());
    var pageParamTable = $('#tabladet1').DataTable();
    var tableRow = $(trthis).parents('tr');
    id_detalle = $(trthis).attr("id_detalle");

    $("#iddetespecie").val(id_detalle);
    
            console.log(tableRow.length);
            var celdas = $(tableRow).find("td"); //devolverá las celdas de una fila
            codigopto  = $(celdas[1]).html();
            fecha1     = $(celdas[2]).html();
            fecha2     = $(celdas[3]).html();
            captura     = $(celdas[4]).html();
            nocaptura     = $(celdas[5]).html();
            escapados  = $(celdas[6]).html();
            eliminados = $(celdas[7]).html();
            consumido  = $(celdas[8]).html();
            noconsumido= $(celdas[9]).html();
            cantidad   = $(celdas[10]).html();
            sexo       = $(celdas[11]).html();
           

            $("#codgpsdetIE").val(codigopto);
            arrayI = fecha1.split("T");
            array1Hora = arrayI[1].split(":");
            arrayF = fecha2.split("T");
            array2Hora = arrayF[1].split(":");
            $("#fechacebo1IE").val(arrayI[0]+"T"+array1Hora[0]+":"+array1Hora[1]);
            $("#fechacebo2IE").val(arrayF[0]+"T"+array2Hora[0]+":"+array2Hora[1]);
            

            if(captura != "")  $("#capturadetIE").prop('checked', true); else $("#capturadetIE").prop('checked', false);
            if(nocaptura != "")  $("#nocapturadetIE").prop('checked', true); else $("#nocapturadetIE").prop('checked', false);
            if(escapados != "")  $("#escapadodetIE").prop('checked', true); else $("#escapadodetIE").prop('checked', false);
            if(eliminados != "")  $("#eliminadodetIE").prop('checked', true); else $("#eliminadodetIE").prop('checked', false);
            if(consumido != "")  $("#consumidodetIE").prop('checked', true);  else $("#consumidodetIE").prop('checked', false);
            if(noconsumido != "")  $("#noconsumidodetIE").prop('checked', true);  else $("#noconsumidodetIE").prop('checked', false);

    $('.nav-tabs a[href="#tab_detdatosE"]').tab('show');      
}

function addnewdetalleGarza(){
     limpiarFormEspecieIntro(3);
    $('.nav-tabs a[href="#tab_detdatosE"]').tab('show'); 
}

function editdetalleGarza(trthis){
    $("#trxcabespecie3").val(1);
    $("#idxTrxcabespecie3").val($(trthis).parents('tr').index());
    var pageParamTable = $('#tabladet3').DataTable();
    var tableRow = $(trthis).parents('tr');
    id_detalle = $(trthis).attr("id_detalle");
    id_sitio = $(trthis).attr("id_sitio");

    $("#iddetespecie").val(id_detalle);

        console.log(tableRow.length);
        var celdas = $(tableRow).find("td"); //devolverá las celdas de una fila
        codigogps  = $(celdas[2]).html();
        geliminada = $(celdas[3]).html();
        gescapadas = $(celdas[4]).html();
        numnido    = $(celdas[5]).html();
        numhuevos  = $(celdas[6]).html();
        observacion  = $(celdas[7]).html();
       
        $("#Ssitio3EI").val(id_sitio).trigger("change");
        $("#codgpsdet3IE").val(codigogps);
        $("#eliminadasdet3IE").val(geliminada);
        $("#escapadasdet3IE").val(gescapadas);
        $("#numnidosdet3IE").val(numnido);
        $("#numhuevosdet3IE").val(numhuevos);
        $("#observdet3IE").val(observacion);
    //}
    $('.nav-tabs a[href="#tab_detdatosE"]').tab('show');      
}

function addnewdetalleGarrapatero(){
     limpiarFormEspecieIntro(4);
    $('.nav-tabs a[href="#tab_detdatosE"]').tab('show'); 
}

function editdetalleGarrapatero(trthis){
    $("#trxcabespecie4").val(1);
    $("#idxTrxcabespecie4").val($(trthis).parents('tr').index());
    var pageParamTable = $('#tabladet4').DataTable();
    var tableRow = $(trthis).parents('tr');
    id_detalle = $(trthis).attr("id_detalle");
    id_sitio = $(trthis).attr("id_sitio");

    $("#iddetespecie").val(id_detalle);
    
    
        console.log(tableRow.length);
        var celdas = $(tableRow).find("td"); //devolverá las celdas de una fila
        codigogps  = $(celdas[2]).html();
        geliminada = $(celdas[3]).html();
        gescapadas = $(celdas[4]).html();
        numnido    = $(celdas[5]).html();
        numhuevos  = $(celdas[6]).html();
        observacion  = $(celdas[7]).html();
       
        $("#Ssitio4EI").val(id_sitio).trigger("change");
        $("#codgpsdet4IE").val(codigogps);
        $("#eliminadasdet4IE").val(geliminada);
        $("#escapadasdet4IE").val(gescapadas);
        $("#numnidosdet4IE").val(numnido);
        $("#numhuevosdet4IE").val(numhuevos);
        $("#observdet4IE").val(observacion);
    //}
    $('.nav-tabs a[href="#tab_detdatosE"]').tab('show');      
}

function addnewdetalleHormiga(){
     limpiarFormEspecieIntro(5);
    $('.nav-tabs a[href="#tab_detdatosE"]').tab('show'); 
}

function editdetalleHormiga(trthis){
    $("#trxcabespecie5").val(1);
    $("#idxTrxcabespecie5").val($(trthis).parents('tr').index());
    var pageParamTable = $('#tabladet5').DataTable();
    var tableRow = $(trthis).parents('tr');
    id_detalle = $(trthis).attr("id_detalle");

    $("#iddetespecie").val(id_detalle);
    
    console.log(tableRow.length);
    var celdas = $(tableRow).find("td"); //devolverá las celdas de una fila
    ptogps   = $(celdas[1]).html();
    hormiga1 = $(celdas[2]).html();
    hormiga2 = $(celdas[3]).html();
    hormiga3 = $(celdas[4]).html();
    hormiga4 = $(celdas[5]).html();
    hormiga5 = $(celdas[6]).html();
    hormiga6 = $(celdas[7]).html();
    hormiga7 = $(celdas[8]).html();
    hormiga8 = $(celdas[9]).html();
   
    $("#ptogpsdet5IE").val(ptogps);$("#dia2IE").prop('checked', true);

    if((hormiga1 == null)||(hormiga1 == "")) $("#hormiga1det5IE").prop('checked', false); else $("#hormiga1det5IE").prop('checked', true);
    if((hormiga2 == null)||(hormiga2 == "")) $("#hormiga2det5IE").prop('checked', false); else $("#hormiga2det5IE").prop('checked', true);
    if((hormiga3 == null)||(hormiga3 == "")) $("#hormiga3det5IE").prop('checked', false); else $("#hormiga3det5IE").prop('checked', true);
    if((hormiga4 == null)||(hormiga4 == "")) $("#hormiga4det5IE").prop('checked', false); else $("#hormiga4det5IE").prop('checked', true);
    if((hormiga5 == null)||(hormiga5 == "")) $("#hormiga5det5IE").prop('checked', false); else $("#hormiga5det5IE").prop('checked', true);
    if((hormiga6 == null)||(hormiga6 == "")) $("#hormiga6det5IE").prop('checked', false); else $("#hormiga6det5IE").prop('checked', true);
    if((hormiga7 == null)||(hormiga7 == "")) $("#hormiga7det5IE").prop('checked', false); else $("#hormiga7det5IE").prop('checked', true);
    if((hormiga8 == null)||(hormiga8 == "")) $("#hormiga8det5IE").prop('checked', false); else $("#hormiga8det5IE").prop('checked', true);

    $('.nav-tabs a[href="#tab_detdatosE"]').tab('show');      
}


function editdetalleCaceria(trthis){
    $("#trxcabespecie6").val(1);
    $("#idxTrxcabespecie6").val($(trthis).parents('tr').index());
    var pageParamTable = $('#tabladet6').DataTable();
    var tableRow = $(trthis).parents('tr');
    id_detalle = $(trthis).attr("id_detalle");

    $("#iddetespecie").val(id_detalle);
    
    console.log(tableRow.length);
    var celdas = $(tableRow).find("td"); //devolverá las celdas de una fila
    ptogps   = $(celdas[1]).html();
    esp1h = $(celdas[2]).html();
    esp1m = $(celdas[3]).html();
    esp1j = $(celdas[4]).html();
    esp2h = $(celdas[5]).html();
    esp2m = $(celdas[6]).html();
    esp2j = $(celdas[7]).html();
    esp3h = $(celdas[8]).html();
    esp3m = $(celdas[9]).html();
    esp3j = $(celdas[10]).html();
    esp4h = $(celdas[11]).html();
    esp4m = $(celdas[12]).html();
    esp4j = $(celdas[13]).html();
    observacion = $(celdas[14]).html();
   
    $("#codgpsdet6EI").val(ptogps);
    $("#cabrah6EI").val(esp1h);
    $("#cabram6EI").val(esp1m);
    $("#cabraj6EI").val(esp1j);
    $("#asnoh6EI").val(esp2h);
    $("#asnom6EI").val(esp2m);
    $("#asnoj6EI").val(esp2j);
    $("#cerdoh6EI").val(esp3h);
    $("#cerdom6EI").val(esp3m);
    $("#cerdoj6EI").val(esp3j);
    $("#vacunoh6EI").val(esp4h);
    $("#vacunom6EI").val(esp4m);
    $("#vacunoj6EI").val(esp4j);
    $("#observdet6EI").val(observacion);

    $('.nav-tabs a[href="#tab_detdatosE"]').tab('show');      
}


function sumar() {
  var total = 0;
  $(".monto").each(function() {
    if (isNaN(parseFloat($(this).val()))) {
      total += 0;
    } else {
      total += parseFloat($(this).val());
    }
  });
  //alert(total);
  document.getElementById('spTotal').innerHTML = total;
}

function sumar2() {
  var total = 0;
  $(".montoC").each(function() {
    if (isNaN(parseFloat($(this).val()))) {
      total += 0;
    } else {
      total += parseFloat($(this).val());
    }
  });
  //alert(total);
  document.getElementById('totaldet2EI').value = total;
}

function cambiarTab(){
     $('.nav-tabs a[href="#tab_detE"]').tab('show');      
}

function setInsertUpdateEspecieIntro(){
    especieid = $("#SespeciesIntro").val();
    if(especieid == "")
        especieid = $("#especieid").val();
    if(especieid == "6da62d60-d3ac-11e6-8df9-000c29e38a2f"){//gato
        json = getDataEspIntroGato();
    }
    if(especieid == "8c0da5f4-6e81-410c-9c88-bdf1cfa6b1b6"){//caracol
        json = getDataEspIntroCaracol();
    }
    if(especieid == "0a40a0fa-7f00-0010-1180-00023a496b77"){//garza
        json = getDataEspIntroAves(1);
    }
    if(especieid == "0a40a0fa-7f00-0010-1180-00033a496b77"){//garrapatero
        json = getDataEspIntroAves(2);
    }
    if(especieid == "0a40a0fa-7f00-0010-1180-00099a496b77"){//hormigas
        json = getDataEspIntroHormigas();
    }
    if(especieid == "0a40a0fa-7f00-0010-1180-00099a496b78"){//caceria
        json = getDataEspIntroCaceria();
    }
}

function getDataEspIntroGato(){
    encargado = $("#encargadoEI").val();
    invitado = $("#invitadoEI").val();
    isla      = $("#SislaEI").val();
    sitio     = $("#SsitioEI").val();
    fecha     = $("#fechaEI").val();
    fecha_col = $("#fechacolceboEI").val();
    fecha_rev = $("#fecharevceboEI").val();
    especieid = $("#especieid").val();
    horaini   = $("#horaIniEI").val();
    horafin   = $("#horaFinEI").val();
    metodo    = $("#SmetodoEI").val();
    producto  = $("#productoEI").val();

    console.log(encargado);

    datosGato = '';
    var filas = $("#tabladet1").find("tr"); //devulve las filas del body de tu tabla segun el ejemplo que brindaste
    var resultado = "";
    for(i=1; i<filas.length; i++){ //Recorre las filas 1 a 1
        var celdas = $(filas[i]).find("td"); //devolverá las celdas de una fila
        
        console.log(celdas.length);
        if(celdas.length > 1){
            id_detalle  = $($(celdas[13]).children("a")[0]).attr("id_detalle");
            codigogps  = $(celdas[1]).html();
            fecha1     = $(celdas[2]).html();
            fecha2     = $(celdas[3]).html();
            captura     = $(celdas[4]).html();
            nocaptura      = $(celdas[5]).html();
            escapados      = $(celdas[6]).html
            eliminados  = $(celdas[7]).html();
            consumido  = $(celdas[8]).html();
            noconsumido= $(celdas[9]).html();
            cantidad= $(celdas[10]).html();
            sexo= $(celdas[11]).html();      

            if(captura != "")  capturaB = true; else capturaB = false;
            if(nocaptura != "")   nocapturaB  = true; else nocapturaB  = false;
            if(escapados != "")   escapadosB  = true; else escapadosB  = false;
            if(eliminados != "")   eliminadosB  = true; else eliminadosB  = false;
            if(consumido != "")  consumidoB  = true; else consumidoB  = false;
            if(noconsumido != "")  noconsumidoB  = true; else noconsumidoB  = false;

            datosGato  += '{"codigo_gps":"' + codigogps + '",';
            datosGato  += '"fecha_coloca":"' + fecha1 + '",';
            datosGato  += '"fecha_revisa":"' + fecha2 + '",';
            datosGato  += '"capturado":"' + capturaB + '",';
            datosGato  += '"no_capturado":"' + nocapturaB + '",';
            datosGato  += '"escapados":"' + escapadosB + '",';
            datosGato  += '"eliminados":"' + eliminadosB + '",';
            datosGato  += '"consumido":"' + consumidoB + '",';
            datosGato  += '"no_consumido":"' + noconsumidoB + '",';
            datosGato  += '"cantidad":"' + cantidad + '",';
            datosGato  += '"sexo":"' + sexo + '"';
            

            if($("#tipotrxEI").val() == 1){
                datosGato  += ',"cab_especieintro_id":"' + $("#idcabespecie").val() + '"';
                if((id_detalle == null)||(id_detalle == ""))
                    datosGato  += '';
                else
                    datosGato  += ',"id":"' + id_detalle + '"';
            }
            datosGato  += '},';
        }            
    }

    datosGato = datosGato.substring(0, datosGato.length - 1);

    datos = '{';
    datos += ' "especie_id":"' + $("#SespeciesIntro").val() + '",';
    datos += ' "encargado_id":"' + encargado.join("|") + '", ';
    datos += ' "metodo_control":"' + (metodo == null ? "" : metodo.join("|")) + '", ';
    datos += ' "invitado":"' + invitado + '", ';
    datos += ' "producto":"' + producto + '", ';
    datos += ' "sitio_id":"' + sitio + '", ';
    datos += ' "isla_id":"' + isla + '", ';
    datos += ' "fecha":"' + fecha + '", ';
    datos += ' "hora_inicio":"' + horaini + '", ';
    datos += ' "hora_fin":"' + horafin + '", ';
    datos += ' "fecha_coloca_cebo":"' + fecha_col + '", ';
    datos += ' "fecha_revisa_cebo":"' + fecha_rev + '", ';
    datos += ' "det_gatos":[' + datosGato + '],';
    datos += ' "det_caracoles":[],';
    datos += ' "det_aves":[],';
    datos += ' "det_hormigas":[],';
    datos += ' "det_caceria":[]';
    datos += '}';
   
    datos = datos.replace(/undefined/g, null);
    datos = datos.replace(/None/g,null);
    datos = datos.replace(/False/g,"'false'");
    datos = datos.replace(/True/g,"'true'");
    datos = datos.replace(/"null"/g, null);
    datos.replace(/(\r\n\t|\n|\r\t)/gm,"").trim();

    console.log(datos);

    if ($("#tipotrxEI").val() == 0)
        insertarCabDetEspeciesIntro(datos);
    else
        saveEditCabDetEspeciesIntro(datos);
}

function getDataEspIntroCaracol(){
    encargado = $("#encargado2EI").val();
    invitado  = $("#invitado2EI").val();
    isla      = $("#Sisla2EI").val();
    sitio     = $("#Ssitio2EI").val();
    fecha     = $("#fecha2EI").val();
    horaini   = $("#horaIni2EI").val();
    horafin   = $("#horaFin2EI").val();
    area      = $("#area2EI").val();
    /*zona      = $("#zona2IE").val();
    lote      = $("#lote2IE").val();
    dia       = $("#dia2IE").val();
    noche     = $("#noche2IE").val();*/

    metodo    = $("#Smetodo2EI").val();

    /*if(dia != null)
        horario = "D";
    if(noche != null)
        horario = "N";*/


    datosCaracol = '';
    var filas = $("#tabladet2").find("tr"); //devulve las filas del body de tu tabla segun el ejemplo que brindaste
    var resultado = "";
    for(i=1; i<filas.length; i++){ //Recorre las filas 1 a 1
        var celdas = $(filas[i]).find("td"); //devolverá las celdas de una fila
        console.log(celdas.length);
        if(celdas.length > 1){
        
            id_detalle  = $($(celdas[11]).children("a")[0]).attr("id_detalle");
            codigogps  = $(celdas[1]).html();
            adultos    = $(celdas[2]).html();
            juveniles  = $(celdas[3]).html();
            huevos     = $(celdas[4]).html();
            muertos    = $(celdas[5]).html();
            total      = $(celdas[6]).html();

            lmanual    = $(celdas[7]).html();
            lmecanica  = $(celdas[8]).html();
            cquimico   = $(celdas[9]).html();

            if(lmanual != "")  lmanualB = true; else lmanualB = false;
            if(lmecanica != "")   lmecanicaB  = true; else lmecanicaB  = false;
            if(cquimico != "")  cquimicoB  = true; else cquimicoB  = false;

            datosCaracol  += '{';
            datosCaracol  += '"codigo_gps":"' + codigogps + '",';
            datosCaracol  += '"adultos":"' + adultos + '",';
            datosCaracol  += '"juveniles":"' + juveniles + '",';
            datosCaracol  += '"huevos":"' + huevos + '",';
            datosCaracol  += '"muertos":"' + muertos + '",';
            datosCaracol  += '"total":"' + total + '",';
            datosCaracol  += '"limpieza_manual":"' + lmanualB + '",';
            datosCaracol  += '"limpieza_mecanica":"' + lmecanicaB + '",';
            datosCaracol  += '"contorl_quimico":"' + cquimicoB + '"';

            if($("#tipotrxEI").val() == 1){
                datosCaracol  += ',"cab_especieintro_id":"' + $("#idcabespecie").val() + '"';
                if((id_detalle == null)||(id_detalle == ""))
                    datosCaracol  += '';
                else
                    datosCaracol  += ',"id":"' + id_detalle + '"';
            }
            datosCaracol  += '},';  
        }          
    }

    datosCaracol = datosCaracol.substring(0, datosCaracol.length - 1);

    datos = '{';
        //datos += ' "numero":"", ';
    datos += ' "encargado_id":"' + encargado.join("|") + '", ';
    datos += ' "invitado":"' + invitado + '", ';
    datos += ' "metodo_control":"' + (metodo == null ? "" : metodo.join("|")) + '", ';
    datos += ' "especie_id":"' + $("#SespeciesIntro").val() + '",';
    datos += ' "isla_id":"' + isla + '", ';
    datos += ' "sitio_id":"' + sitio + '", ';
    datos += ' "fecha":"' + fecha + '", ';
    datos += ' "area":"' + area + '", ';
    //datos += ' "propietario":"' + lote + '", ';
    datos += ' "hora_inicio":"' + horaini + '", ';
    datos += ' "hora_fin":"' + horafin + '", ';
    //datos += ' "horario":"' + horario + '", ';
    datos += ' "det_gatos":[],';
    datos += ' "det_caracoles":[' + datosCaracol + '],';
    datos += ' "det_aves":[],';
    datos += ' "det_hormigas":[],';
    datos += ' "det_caceria":[]';
    datos += '}';
   
    datos = datos.replace(/undefined/g, null);
    datos = datos.replace(/None/g,null);
    datos = datos.replace(/False/g,"'false'");
    datos = datos.replace(/True/g,"'true'");
    datos = datos.replace(/"null"/g, null);
    datos.replace(/(\r\n\t|\n|\r\t)/gm,"").trim();

    console.log(datos);

    if ($("#tipotrxEI").val() == 0)
        insertarCabDetEspeciesIntro(datos);
    else
        saveEditCabDetEspeciesIntro(datos);
}

function getDataEspIntroAves(tipoave){
    if(tipoave == 1)
        numero = '3';
    if(tipoave == 2)
        numero = '4';

    encargado = $("#encargado"+numero+"EI").val();
    isla      = $("#Sisla"+numero+"EI").val();
    fecha     = $("#fecha"+numero+"EI").val();
    umunicion = $("#umuniciones"+numero+"EI").val();
    invitado  = $("#invitado"+numero+"EI").val();
    trifle    = $("#tipoRifle"+numero+"EI").val();
    metodo    = $("#Smetodo"+numero+"EI").val();

    datosAves = '';
    var filas = $("#tabladet"+numero).find("tr"); //devulve las filas del body de tu tabla segun el ejemplo que brindaste
    var resultado = "";
    for(i=1; i<filas.length; i++){ //Recorre las filas 1 a 1
        var celdas = $(filas[i]).find("td"); //devolverá las celdas de una fila

        console.log(celdas.length);
        if(celdas.length > 1){    
            id_detalle  = $($(celdas[9]).children("a")[0]).attr("id_detalle");
            sitio      = $($(celdas[9]).children("a")[0]).attr("id_sitio");
            codigogps  = $(celdas[2]).html();
            geliminada = $(celdas[3]).html();
            gescapada  = $(celdas[4]).html();
            numnidos   = $(celdas[5]).html();
            numhuevos  = $(celdas[6]).html();
            observacion  = $(celdas[7]).html();

            datosAves  += '{"sitio_id":"' + sitio + '",';
            datosAves  += '"codigo_gps":"' + codigogps + '",';
            datosAves  += '"eliminadas":"' + geliminada + '",';
            datosAves  += '"escapadas":"' + gescapada + '",';
            datosAves  += '"num_nidos":"' + numnidos + '",';
            datosAves  += '"num_huevos":"' + numhuevos + '",';
            datosAves  += '"observacion":"' + observacion + '",';
            datosAves  += '"tipo_ave":"'+tipoave+'"';

            if($("#tipotrxEI").val() == 1){
                datosAves  += ',"cab_especieintro_id":"' + $("#idcabespecie").val() + '"';
                if((id_detalle == null)||(id_detalle == ""))
                    datosAves  += '';
                else
                    datosAves  += ',"id":"' + id_detalle + '"';
            }
            datosAves  += '},';    
        }        
    }

    datosAves = datosAves.substring(0, datosAves.length - 1);

    datos = '{';
    datos += '"especie_id":"' + $("#SespeciesIntro").val() + '",';
    datos += ' "encargado_id":"' + encargado.join("|") + '", ';
    datos += ' "invitado":"' + invitado + '", ';
    datos += ' "isla_id":"' + isla + '", ';
    datos += ' "fecha":"' + fecha + '", ';
    datos += ' "municiones_usadas":"' + (umunicion=="" ? 0 : umunicion) + '", ';
    datos += ' "metodo_control":"' + (metodo == null ? "" : metodo.join("|")) + '", ';
    datos += ' "tipo_rifle":"' + trifle + '", ';
    datos += ' "det_gatos":[],';
    datos += ' "det_caracoles":[],';
    datos += ' "det_aves":[' + datosAves + '],';
    datos += ' "det_hormigas":[],';
    datos += ' "det_caceria":[]';
    datos += '}';
   
    datos = datos.replace(/undefined/g, null);
    datos = datos.replace(/None/g,null);
    datos = datos.replace(/False/g,"'false'");
    datos = datos.replace(/True/g,"'true'");
    datos = datos.replace(/"null"/g, null);
    datos.replace(/(\r\n\t|\n|\r\t)/gm,"").trim();

    console.log(datos);

    if ($("#tipotrxEI").val() == 0)
        insertarCabDetEspeciesIntro(datos);
    else
        saveEditCabDetEspeciesIntro(datos);
}

function getDataEspIntroHormigas(){

    encargado = $("#encargado5EI").val();
    invitado  = $("#invitado5EI").val();
    isla      = $("#Sisla5EI").val();
    sitio     = $("#Ssitio5EI").val();
    fecha     = $("#fecha5EI").val();
    area      = $("#area5EI").val();
    horaini   = $("#horaIni5EI").val();
    horafin   = $("#horaFin5EI").val();

    metodo    = $("#Smetodo5EI").val();
    producto  = $("#producto5EI").val();

    datoshormiga = '';
    var filas = $("#tabladet5").find("tr"); //devulve las filas del body de tu tabla segun el ejemplo que brindaste
    var resultado = "";
    for(i=1; i<filas.length; i++){ //Recorre las filas 1 a 1
        var celdas = $(filas[i]).find("td"); //devolverá las celdas de una fila
        console.log(celdas.length);
        if(celdas.length > 1){  
            id_detalle  = $($(celdas[11]).children("a")[0]).attr("id_detalle");
            ptogps    = $(celdas[1]).html();
            hormiga1  = $(celdas[2]).html();
            hormiga2  = $(celdas[3]).html();
            hormiga3  = $(celdas[4]).html();
            hormiga4  = $(celdas[5]).html();
            hormiga5  = $(celdas[6]).html();
            hormiga6  = $(celdas[7]).html();
            hormiga7  = $(celdas[8]).html(); 
            hormiga8  = $(celdas[9]).html();    

            datoshormiga  += '{"hormiga_was":"' + (hormiga1=="" ? null : true) + '",';
            datoshormiga  += '"hormiga_phe":"' + (hormiga2=="" ? null : true) + '",';
            datoshormiga  += '"hormiga_sol":"' + (hormiga3=="" ? null : true) + '",';
            datoshormiga  += '"hormiga_car":"' + (hormiga4=="" ? null : true) + '",';
            datoshormiga  += '"hormiga_tap":"' + (hormiga5=="" ? null : true) + '",';
            datoshormiga  += '"hormiga_mon":"' + (hormiga6=="" ? null : true) + '",';
            datoshormiga  += '"hormiga_end":"' + (hormiga7=="" ? null : true) + '",';
            datoshormiga  += '"hormiga_otra":"' + (hormiga8=="" ? null : true) + '",';
            datoshormiga  += '"pto_gps":"' + ptogps + '"';
            //datoshormiga  += '"area":"' + area + '"';

            if($("#tipotrxEI").val() == 1){
                datoshormiga  += ',"cab_especieintro_id":"' + $("#idcabespecie").val() + '"';
                if((id_detalle == null)||(id_detalle == ""))
                    datoshormiga  += '';
                else
                    datoshormiga  += ',"id":"' + id_detalle + '"';
            }
            datoshormiga  += '},'; 
        }           
    }

    datoshormiga = datoshormiga.substring(0, datoshormiga.length - 1);

    datos = '{';
    datos += ' "especie_id":"' + $("#SespeciesIntro").val() + '",';
    datos += ' "metodo_control":"' + (metodo == null ? "" : metodo.join("|")) + '", ';
    datos += ' "encargado_id":"' + encargado.join("|") + '", ';
    datos += ' "invitado":"' + invitado + '",';
    datos += ' "sitio_id":"' + sitio + '", ';
    datos += ' "isla_id":"' + isla + '", ';
    datos += ' "fecha":"' + fecha + '", ';
    datos += ' "area":"' + area + '", ';
    datos += ' "producto":"' + producto + '", ';
    datos += ' "hora_inicio":"' + horaini + '", ';
    datos += ' "hora_fin":"' + horafin + '", ';
    datos += ' "det_gatos":[],';
    datos += ' "det_caracoles":[],';
    datos += ' "det_aves":[],';
    datos += ' "det_hormigas":[' + datoshormiga + '],';
    datos += ' "det_caceria":[]';
    datos += '}';
   
    datos = datos.replace(/undefined/g, null);
    datos = datos.replace(/None/g,null);
    datos = datos.replace(/False/g,"'false'");
    datos = datos.replace(/True/g,"'true'");
    datos = datos.replace(/"null"/g, null);
    datos.replace(/(\r\n\t|\n|\r\t)/gm,"").trim();

    console.log(datos);

    if ($("#tipotrxEI").val() == 0)
        insertarCabDetEspeciesIntro(datos);
    else
        saveEditCabDetEspeciesIntro(datos);
}

function getDataEspIntroCaceria(){

    encargado = $("#encargado6EI").val();
    isla      = $("#Sisla6EI").val();
    sitio     = $("#Ssitio6EI").val();
    fecha     = $("#fecha6EI").val();
    //area      = $("#area6IE").val();
    horaini   = $("#horaIni6EI").val();
    horafin   = $("#horaFin6EI").val();

    metodo    = $("#Smetodo6EI").val();
    invitado  = $("#invitado6EI").val();

    datoscaceria = '';
    var filas = $("#tabladet6").find("tr"); //devulve las filas del body de tu tabla segun el ejemplo que brindaste
    var resultado = "";
    for(i=1; i<filas.length; i++){ //Recorre las filas 1 a 1
        var celdas = $(filas[i]).find("td"); //devolverá las celdas de una fila
        console.log(celdas.length);
        if(celdas.length > 1){  
            id_detalle  = $($(celdas[16]).children("a")[0]).attr("id_detalle");
            ptogps    = $(celdas[1]).html();
            esp1h  = $(celdas[2]).html();
            esp1m  = $(celdas[3]).html();
            esp1j  = $(celdas[4]).html();
            esp2h  = $(celdas[5]).html();
            esp2m  = $(celdas[6]).html();
            esp2j  = $(celdas[7]).html();
            esp3h  = $(celdas[8]).html(); 
            esp3m  = $(celdas[9]).html();
            esp3j  = $(celdas[10]).html();
            esp4h  = $(celdas[11]).html();    
            esp4m  = $(celdas[12]).html();
            esp4j  = $(celdas[13]).html();
            observacion = $(celdas[14]).html();

            if(esp1h == "") esp1h = 0;
            if(esp1m == "") esp1m = 0;
            if(esp1j == "") esp1j = 0;
            if(esp2h == "") esp2h = 0;
            if(esp2m == "") esp2m = 0;
            if(esp2j == "") esp2j = 0;
            if(esp3h == "") esp3h = 0;
            if(esp3m == "") esp3m = 0;
            if(esp3j == "") esp3j = 0;
            if(esp4h == "") esp4h = 0;
            if(esp4m == "") esp4m = 0;
            if(esp4j == "") esp4j = 0;
 
console.log(esp1h);
            datoscaceria  += '{"cabra_h":"' + esp1h + '",';
            datoscaceria  += '"cabra_m":"' + esp1m + '",';
            datoscaceria  += '"cabra_j":"' + esp1j + '",';
            datoscaceria  += '"asno_h":"' + esp2h + '",';
            datoscaceria  += '"asno_m":"' + esp2m + '",';
            datoscaceria  += '"asno_j":"' + esp2j + '",';
            datoscaceria  += '"cerdo_h":"' + esp3h + '",';
            datoscaceria  += '"cerdo_m":"' + esp3m + '",';
            datoscaceria  += '"cerdo_j":"' + esp3j + '",';
            datoscaceria  += '"vacuno_h":"' + esp4h + '",';
            datoscaceria  += '"vacuno_m":"' + esp4m + '",';
            datoscaceria  += '"vacuno_j":"' + esp4j + '",';
            datoscaceria  += '"observacion":"' + observacion + '",';
            datoscaceria  += '"pto_gps":"' + ptogps + '"';
            //datoshormiga  += '"area":"' + area + '"';

            if($("#tipotrxEI").val() == 1){
                datoscaceria  += ',"cab_especieintro_id":"' + $("#idcabespecie").val() + '"';
                if((id_detalle == null)||(id_detalle == ""))
                    datoscaceria  += '';
                else
                    datoscaceria  += ',"id":"' + id_detalle + '"';
            }
            datoscaceria  += '},'; 
        }           
    }

    datoscaceria = datoscaceria.substring(0, datoscaceria.length - 1);

    datos = '{';
    datos += ' "especie_id":"' + $("#SespeciesIntro").val() + '",';
    datos += ' "metodo_control":"' + (metodo == null ? "" : metodo.join("|")) + '", ';
    datos += ' "encargado_id":"' + encargado.join("|") + '", ';
    datos += ' "sitio_id":"' + sitio + '", ';
    datos += ' "isla_id":"' + isla + '", ';
    datos += ' "fecha":"' + fecha + '", ';
    datos += ' "invitado":"' + invitado + '", ';
    datos += ' "hora_inicio":"' + horaini + '", ';
    datos += ' "hora_fin":"' + horafin + '", ';
    datos += ' "det_gatos":[],';
    datos += ' "det_caracoles":[],';
    datos += ' "det_aves":[],';
    datos += ' "det_hormigas":[],';
    datos += ' "det_caceria":[' + datoscaceria + ']';
    datos += '}';
   
    datos = datos.replace(/undefined/g, null);
    datos = datos.replace(/None/g,null);
    datos = datos.replace(/False/g,"'false'");
    datos = datos.replace(/True/g,"'true'");
    datos = datos.replace(/"null"/g, null);
    datos.replace(/(\r\n\t|\n|\r\t)/gm,"").trim();

    console.log(datos);

    if ($("#tipotrxEI").val() == 0)
        insertarCabDetEspeciesIntro(datos);
    else
        saveEditCabDetEspeciesIntro(datos);
}

function insertarCabDetEspeciesIntro(datos){

    dj_url = 'spicabdetespeciesintroducidas';
    $.ajax({
        url: "insert_General_mediciones",
        type: 'post',
        cache: 'false',
        data: {
            "dj_url": dj_url,
            "data": JSON.stringify("[" + datos + "]")
        },
        dataType: "json",
        success: function(data2) {
            if (!data2['results']) {
                $('#modalLoadin').hide();
                validaContenedorExt("addEspecie", "Error al Insertar el registro");
                console.log("data---->" + datos + "--->" + "spicabdetespeciesintroducidas" + "Error--->" + data2);
            } else {
                $('#modalLoadin').hide();
                swal("", "Registro insertado con exito", "success");
                //buscarMedicionesParametros();
            }
        },
        error: function(data2) {
            $('#modalLoadin').hide();
            validaContenedorExt("addEspecie", "Error al Insertar el registro");
            console.log("data---->" + datos + "--->" + "spicabdetespeciesintroducidas" + "Error--->" + data2);
        },
    });
}


function saveEditCabDetEspeciesIntro(datos){
    //sacar la cabecera
    cabecera = $("#idcabespecie").val();
    dj_url = 'spicabdetespeciesintroducidas';
    $.ajax({
        url: "update_General_mediciones",
        type: 'post',
        cache: 'false',
        data: {
            "dj_url": dj_url,
            "idtabla": cabecera,
            "data": JSON.stringify(datos)
        },
        dataType: "json",
        async: false,
        success: function(data2) {
            if (data2.id == undefined) {
                $('#modalLoadin').hide();
                validaContenedorExt("addEspecie", "Error al Actualizar el registro");
                console.log("idtabla---->" + cabecera + "--->" + "spicabdetespeciesintroducidas" + "Error---> UpdateMedicionesParametros");
            } else {
                $('#modalLoadin').hide();
                swal("", "Registros Actualizdos con exito", "success");
                //buscarMedicionesParametros();
            }
        },
        error: function(data2) {
            $('#modalLoadin').hide();
            validaContenedorExt("addEspecie", "Error al Actualizar el registro");
            console.log("idtabla---->" + cabecera + "--->" + "data---->" + "spicabdetespeciesintroducidas" + "Error---> UpdateMedicionesParametros");
        },
    });
}


function buscarEspecieIntroParametros(especieid){
    console.log(">>>>>>> buscarSolServParametros <<<<");
    dataC = "";
    if(especieid != ""){
        especieid = $("#SespeciesIntro").val();
        
        if(especieid != "")
            dataC += "especie_id__id__in=" + especieid + "";
    }

     $.ajax({
        url: "data_especieintrocab",
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
                        if(data[i].especie_id != null)
                            especieid = data[i].especie_id.id;
                        else
                            especieid = '';
                        if(especieid == "6da62d60-d3ac-11e6-8df9-000c29e38a2f")//gato
                            editar = "<a href='#addEspecie' data-stackbox='true' data-stackbox-position='absolute' data-stackbox-width='1100' onclick='getDataTablaEspecieIntro(\"" + especieid + "\");editEspecieIntroGato(\"" + data[i].id + "\")'><i class='fa fa-edit text-green btn_edit'></i></a>";
                        if(especieid == "8c0da5f4-6e81-410c-9c88-bdf1cfa6b1b6")//caracoles
                            editar = "<a href='#addEspecie' data-stackbox='true' data-stackbox-position='absolute' data-stackbox-width='1100' onclick='getDataTablaEspecieIntro(\"" + especieid + "\");editEspecieIntroCaracol(\"" + data[i].id + "\")'><i class='fa fa-edit text-green btn_edit'></i></a>";
                        if(especieid == "0a40a0fa-7f00-0010-1180-00023a496b77")//garza
                            editar = "<a href='#addEspecie' data-stackbox='true' data-stackbox-position='absolute' data-stackbox-width='1100' onclick='getDataTablaEspecieIntro(\"" + especieid + "\");editEspecieIntroAves(\"" + data[i].id + "\",1)'><i class='fa fa-edit text-green btn_edit'></i></a>";
                        if(especieid == "0a40a0fa-7f00-0010-1180-00033a496b77")//garrapatero
                            editar = "<a href='#addEspecie' data-stackbox='true' data-stackbox-position='absolute' data-stackbox-width='1100' onclick='getDataTablaEspecieIntro(\"" + especieid + "\");editEspecieIntroAves(\"" + data[i].id + "\",2)'><i class='fa fa-edit text-green btn_edit'></i></a>";
                        if(especieid == "0a40a0fa-7f00-0010-1180-00099a496b77")//hormiga
                            editar = "<a href='#addEspecie' data-stackbox='true' data-stackbox-position='absolute' data-stackbox-width='1100' onclick='getDataTablaEspecieIntro(\"" + especieid + "\");editEspecieIntroHormiga(\"" + data[i].id + "\")'><i class='fa fa-edit text-green btn_edit'></i></a>";
                        if(especieid == "0a40a0fa-7f00-0010-1180-00099a496b78")//hormiga
                            editar = "<a href='#addEspecie' data-stackbox='true' data-stackbox-position='absolute' data-stackbox-width='1100' onclick='getDataTablaEspecieIntro(\"" + especieid + "\");editEspecieIntroCaceria(\"" + data[i].id + "\")'><i class='fa fa-edit text-green btn_edit'></i></a>";

                        arryRespNombre = [];
                        if (data[i].encargado_id != null) {
                            
                            arryRespRg = data[i].encargado_id.split("|");
                            for(j=0 ; j < arryRespRg.length; j++){
                                arryRespNombre.push($("#encargadoEI option[value='" + arryRespRg[j] + "']").text());
                            }
                            
                        }

                        tabla += "<tr>";
                        tabla += "<td>1</td>";
                        tabla += "<td align='left' id='td_encargado_"+data[i].id+"'>" + arryRespNombre.join(" , ")  + "</td>";                       
                        tabla += "<td align='left' id='td_isla_"+data[i].id+"'>" + data[i].isla_id.descripcion + "</td>";
                        tabla += "<td align='center' id='td_fecha_"+data[i].id+"'>" + data[i].fecha + "</td>";
                        tabla += "<td align='left' id='td_especie_"+data[i].id+"'>" + data[i].especie_id.nombre_comun + "</td>";
                        tabla += "<td align='center'>"+editar+"</td>";
                        tabla += "<td align='center'><a onclick='deleteModal(\"" + data[i].id + "\",\"especieintro\");'><i class='fa fa-trash text-green btn_edit'></i></a></td>";
                        tabla += "</tr>";        
                    }
                }

                $('#tabla_especiesintro').dataTable().fnClearTable();
                $('#tabla_especiesintro').dataTable().fnDestroy();

                $("#bodytabla_especiesintro").html("");
                $("#bodytabla_especiesintro").append(tabla);

                var dTable = $('#tabla_especiesintro').DataTable({"order": [[ 4, "asc" ], [ 1, "asc" ]]});
                dTable.on( 'order.dt search.dt', function () {
                    dTable.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                        cell.innerHTML = i+1;
                    } );
                } ).draw();
                        }
        },
        error: function(data) {
            swal("", "Error: " + JSON.stringify(data), "error");
            console.log(JSON.stringify(data));
        },
    });
} 

function editEspecieIntroGato(idCab){
    //limpiarFormInfoNovedades();
    $("#modalLoadin").show();
    //initTinymce();
    $('.nav-tabs a[href="#tab_GenE"]').tab('show'); //para q cuando se abra el popup aparezca en la primera pestaña

    console.log(idCab);
    $.ajax({
        url: "data_infoCabEspIntro",
        type: "get",
        data: {
            "data": idCab
        },
        dataType: "json",

        success: function(json) {
            $("#modalLoadin").hide();
            if (json['non_field_errors']) {
                console.log(json['non_field_errors']);
            } else {
                

                $("#tipotrxEI").val(1);
                $("#idcabespecie").val(json[0].id);
                $("#iddetespecie").val("");
                arryEncargados = [];
                if((json[0].encargado_id == null)||(json[0].encargado_id == ""))
                    arryEncargados = [];
                else
                    arryEncargados = json[0].encargado_id.split("|");

                arrayMetodos = [];
                if((json[0].metodo_control == null)||(json[0].metodo_control == ""))
                    arrayMetodos = [];
                else
                    arrayMetodos = json[0].metodo_control.split("|");
                $("#encargadoEI").val(arryEncargados).trigger("change");
                $("#SmetodoEI").val(arrayMetodos).trigger("change");
                $("#productoEI").val(json[0].producto);
                $("#SislaEI").val(json[0].isla_id.id).trigger("change");
                $("#SsitioEI").val(json[0].sitio_id.id).trigger("change");
                $("#fechaEI").val(json[0].fecha);
                $("#fechacolceboEI").val(json[0].fecha_coloca_cebo);
                $("#fecharevceboEI").val(json[0].fecha_revisa_cebo);
                $("#horaIniEI").val(json[0].hora_inicio);
                $("#horaFinEI").val(json[0].hora_fin);
                $("#invitadoEI").val(json[0].invitado);

                $("#legend1").html("");
                $("#legend1").html("GATOS");

                tabla = '';
                if(json[0].det_gatos.length > 0){
                    datosDet = '';
                    for(i=0; i< json[0].det_gatos.length; i++){                        
                        if(json[0].det_gatos[i].estado == 'A'){

                            if(json[0].det_gatos[i].capturado == true)
                                valor1 = "&#10003;";
                            else
                                valor1 = "";

                            if(json[0].det_gatos[i].no_capturado == true)
                                valor2 = "&#10003;";
                            else
                                valor2 = "";

                            if(json[0].det_gatos[i].escapados == true)
                                valor3 = "&#10003;";
                            else
                                valor3 = "";

                            if(json[0].det_gatos[i].eliminados == true)
                                valor4 = "&#10003;";
                            else
                                valor4 = "";

                            if(json[0].det_gatos[i].consumido == true)
                                valor5 = "&#10003;";
                            else
                                valor5 = "";

                            if(json[0].det_gatos[i].noconsumido == true)
                                valor6 = "&#10003;";
                            else
                                valor6 = "";
                            
                            eliminar  = "<a class='delete' id_detalle='"+ json[0].det_gatos[i].id +"' id_cabecera='"+idCab+"' onclick='deletedetalleGato(this);'><i class='fa fa-trash text-green btn_edit'></i></a>";
                            editar    = "<a id_detalle='"+ json[0].det_gatos[i].id +"' id_cabecera='"+idCab+"' onclick='editdetalleGato(this);'><i class='fa fa-edit text-green btn_edit'></i></a>";

                            tabla += "<tr>";
                            tabla += "<td>" + (i+1) + "</td>";
                            tabla += "<td>" + json[0].det_gatos[i].codigo_gps  + "</td>";
                            tabla += "<td align='left'>" + json[0].det_gatos[i].fecha_coloca  + "</td>";                      
                            tabla += "<td align='left'>" + json[0].det_gatos[i].fecha_revisa + "</td>";
                            tabla += "<td align='center'>" + valor1 + "</td>";
                            tabla += "<td align='center'>" + valor2 + "</td>";
                            tabla += "<td align='center'>" + valor3 + "</td>";
                            tabla += "<td align='center'>" + valor4 + "</td>";
                            tabla += "<td align='center'>" + valor5 + "</td>";
                            tabla += "<td align='center'>" + valor6 + "</td>";
                            tabla += "<td align='center'>" + json[0].det_gatos[i].cantidad + "</td>";
                            tabla += "<td align='center'>" + json[0].det_gatos[i].sexo + "</td>";
                            tabla += "<td align='center'>"+editar+"</td>";
                            tabla += "<td align='center'>"+eliminar+"</td>";
                            tabla += "</tr>";                
                        }
                    }                    
                }
                $('#tabladet1').dataTable().fnClearTable();
                $('#tabladet1').dataTable().fnDestroy();

                $("#bodytabladet1").html("");
                $("#bodytabladet1").append(tabla);

                var table = $('#tabladet1').DataTable();
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

function editEspecieIntroCaracol(idCab){
    //limpiarFormInfoNovedades();
    $("#modalLoadin").show();
    //initTinymce();
    $('.nav-tabs a[href="#tab_GenE"]').tab('show'); //para q cuando se abra el popup aparezca en la primera pestaña

    console.log(idCab);
    $.ajax({
        url: "data_infoCabEspIntro",
        type: "get",
        data: {
            "data": idCab
        },
        dataType: "json",

        success: function(json) {
            $("#modalLoadin").hide();
            if (json['non_field_errors']) {
                console.log(json['non_field_errors']);
            } else {
                                
                $("#tipotrxEI").val(1);
                $("#idcabespecie").val(json[0].id);
                $("#iddetespecie").val("");
                arryEncargados = [];
                if((json[0].encargado_id != null)||(json[0].encargado_id != "")){
                    arryEncargados = json[0].encargado_id.split("|");
                }
                arrayMetodos = [];
                if((json[0].metodo_control != null)||(json[0].metodo_control != "")){
                    arrayMetodos = json[0].metodo_control.split("|");
                }
                $("#encargado2EI").val(arryEncargados).trigger("change");
                $("#Smetodo2EI").val(arrayMetodos).trigger("change");
                $("#Sisla2EI").val(json[0].isla_id.id).trigger("change");
                $("#fecha2EI").val(json[0].fecha);
                $("#Ssitio2EI").val(json[0].sitio_id.id).trigger("change");
                $("#area2EI").val(json[0].area);
                $("#invitado2EI").val(json[0].invitado);
                $("#horaIni2EI").val(json[0].hora_inicio);
                $("#horaFin2EI").val(json[0].hora_fin);

                $("#legend2").html("");
                $("#legend2").html("CARACOL");

                tabla = '';
                if(json[0].det_caracoles.length > 0){
                    datosDet = '';
                    for(i=0; i< json[0].det_caracoles.length; i++){                        
                        if(json[0].det_caracoles[i].estado == 'A'){

                            if(json[0].det_caracoles[i].limpieza_manual == true)
                                valor1 = "&#10003;";
                            else
                                valor1 = "";

                            if(json[0].det_caracoles[i].limpieza_mecanica == true)
                                valor2 = "&#10003;";
                            else
                                valor2 = "";

                            if(json[0].det_caracoles[i].contorl_quimico == true)
                                valor3 = "&#10003;";
                            else
                                valor3 = "";

                            
                            eliminar  = "<a class='delete' id_detalle='"+ json[0].det_caracoles[i].id +"' id_cabecera='"+idCab+"' onclick='deletedetalleCaracol(this);'><i class='fa fa-trash text-green btn_edit'></i></a>";
                            editar    = "<a id_detalle='"+ json[0].det_caracoles[i].id +"' id_cabecera='"+idCab+"' onclick='editdetalleCaracol(this);'><i class='fa fa-edit text-green btn_edit'></i></a>";

                            tabla += "<tr>";
                            tabla += "<td>" + (i+1) + "</td>";
                            tabla += "<td align='left'>" + json[0].det_caracoles[i].codigo_gps  + "</td>";                      
                            tabla += "<td align='center'>" + json[0].det_caracoles[i].adultos + "</td>";
                            tabla += "<td align='center'>" + json[0].det_caracoles[i].juveniles + "</td>";
                            tabla += "<td align='center'>" + json[0].det_caracoles[i].huevos + "</td>";
                            tabla += "<td align='center'>" + json[0].det_caracoles[i].muertos + "</td>";
                            tabla += "<td align='center'>" + json[0].det_caracoles[i].total + "</td>";
                            tabla += "<td align='center'>" + valor1 + "</td>";
                            tabla += "<td align='center'>" + valor2 + "</td>";
                            tabla += "<td align='center'>" + valor3 + "</td>";
                            tabla += "<td align='center'>"+editar+"</td>";
                            tabla += "<td align='center'>"+eliminar+"</td>";
                            tabla += "</tr>";                
                        }
                    }                    
                }
                $('#tabladet2').dataTable().fnClearTable();
                $('#tabladet2').dataTable().fnDestroy();

                $("#bodytabladet2").html("");
                $("#bodytabladet2").append(tabla);

                var table = $('#tabladet2').DataTable();
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

function editEspecieIntroAves(idCab,tipoave){

    if(tipoave == 1)  num = 3;
    if(tipoave == 2)  num = 4;
    //limpiarFormInfoNovedades();
    $("#modalLoadin").show();
    //initTinymce();
    $('.nav-tabs a[href="#tab_GenE"]').tab('show'); //para q cuando se abra el popup aparezca en la primera pestaña

    console.log(idCab);
    $.ajax({
        url: "data_infoCabEspIntro",
        type: "get",
        data: {
            "data": idCab
        },
        dataType: "json",

        success: function(json) {
            $("#modalLoadin").hide();
            if (json['non_field_errors']) {
                console.log(json['non_field_errors']);
            } else {
                
                $("#tipotrxEI").val(1);
                $("#idcabespecie").val(json[0].id);
                $("#iddetespecie").val("");
                arryEncargados = [];
                if((json[0].encargado_id == null)||(json[0].encargado_id == ""))
                    arryEncargados = [];
                else
                    arryEncargados = json[0].encargado_id.split("|");

                arrayMetodos = [];
                if((json[0].metodo_control == null)||(json[0].metodo_control == ""))
                    arrayMetodos = [];
                else
                    arrayMetodos = json[0].metodo_control.split("|");

                $("#encargado"+num+"EI").val(arryEncargados).trigger("change");
                $("#Smetodo"+num+"EI").val(arrayMetodos).trigger("change");
                $("#Sisla"+num+"EI").val(json[0].isla_id.id).trigger("change");
                $("#fecha"+num+"EI").val(json[0].fecha);
                $("#invitado"+num+"IE").val(json[0].invitado);
                $("#umuniciones"+num+"EI").val(json[0].municiones_usadas);
                $("#tipoRifle"+num+"EI").val(json[0].tipo_rifle);

                if(tipoave == 1){
                    $("#legend3").html("");
                    $("#legend3").html("GARZAS");
                }
                if(tipoave == 2){
                    $("#legend4").html("");
                    $("#legend4").html("GARRAPATEROS");
                }

                tabla = '';
                if(json[0].det_aves.length > 0){
                    datosDet = '';
                    for(i=0; i< json[0].det_aves.length; i++){                        
                        if(json[0].det_aves[i].estado == 'A'){

                            if(json[0].det_aves[i].sitio_id != null){
                                sitioid  = json[0].det_aves[i].sitio_id.id;
                                sitiodet = json[0].det_aves[i].sitio_id.descripcion;
                            }else{
                                sitioid  = "";
                                sitiodet = "";
                            }

                            if(tipoave == 1){
                                editar    = "<a id_sitio='"+sitioid+"' id_detalle='"+ json[0].det_aves[i].id +"' id_cabecera='"+idCab+"' onclick='editdetalleGarza(this);'><i class='fa fa-edit text-green btn_edit'></i></a>";
                                eliminar  = "<a class='delete' id_sitio='"+sitioid+"' id_detalle='"+ json[0].det_aves[i].id +"' id_cabecera='"+idCab+"' onclick='deletedetalleGarza(this);'><i class='fa fa-trash text-green btn_edit'></i></a>";

                            }
                            if(tipoave == 2){
                                editar    = "<a id_sitio='"+sitioid+"' id_detalle='"+ json[0].det_aves[i].id +"' id_cabecera='"+idCab+"' onclick='editdetalleGarrapatero(this);'><i class='fa fa-edit text-green btn_edit'></i></a>";
                                eliminar  = "<a class='delete' id_sitio='"+sitioid+"' id_detalle='"+ json[0].det_aves[i].id +"' id_cabecera='"+idCab+"' onclick='deletedetalleGarrapatero(this);'><i class='fa fa-trash text-green btn_edit'></i></a>";
                            }
                            

                            tabla += "<tr>";
                            tabla += "<td>" + (i+1) + "</td>";
                            tabla += "<td>" + sitiodet + "</td>";
                            tabla += "<td align='left'>" + json[0].det_aves[i].codigo_gps  + "</td>";
                            tabla += "<td align='center'>" + json[0].det_aves[i].eliminadas + "</td>";
                            tabla += "<td align='center'>" + json[0].det_aves[i].escapadas + "</td>";
                            tabla += "<td align='center'>" + json[0].det_aves[i].num_nidos + "</td>";
                            tabla += "<td align='center'>" + json[0].det_aves[i].num_huevos + "</td>";
                            tabla += "<td align='center'>" + json[0].det_aves[i].observacion + "</td>";
                            tabla += "<td align='center'>"+editar+"</td>";
                            tabla += "<td align='center'>"+eliminar+"</td>";
                            tabla += "</tr>";                
                        }
                    }                    
                }
                $('#tabladet'+num).dataTable().fnClearTable();
                $('#tabladet'+num).dataTable().fnDestroy();

                $("#bodytabladet"+num).html("");
                $("#bodytabladet"+num).append(tabla);

                var table = $('#tabladet'+num).DataTable();
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


function editEspecieIntroHormiga(idCab){

    //limpiarFormInfoNovedades();
    $("#modalLoadin").show();
    //initTinymce();
    $('.nav-tabs a[href="#tab_GenE"]').tab('show'); //para q cuando se abra el popup aparezca en la primera pestaña

    console.log(idCab);
    $.ajax({
        url: "data_infoCabEspIntro",
        type: "get",
        data: {
            "data": idCab
        },
        dataType: "json",

        success: function(json) {
            $("#modalLoadin").hide();
            if (json['non_field_errors']) {
                console.log(json['non_field_errors']);
            } else {
                
                $("#tipotrxEI").val(1);
                $("#idcabespecie").val(json[0].id);
                $("#iddetespecie").val("");
                arryEncargados = [];
                if((json[0].encargado_id != null)||(json[0].encargado_id != "")){
                    arryEncargados = json[0].encargado_id.split("|");
                }
                arrayMetodos = [];
                if((json[0].metodo_control != null)||(json[0].metodo_control != "")){
                    arrayMetodos = json[0].metodo_control.split("|");
                }
                $("#encargado5EI").val(arryEncargados).trigger("change");
                $("#Smetodo5EI").val(arrayMetodos).trigger("change");
                $("#Sisla5EI").val(json[0].isla_id.id).trigger("change");
                $("#Ssitio5EI").val(json[0].sitio_id.id).trigger("change");
                $("#fecha5EI").val(json[0].fecha);
                
                $("#horaIni5EI").val(json[0].hora_inicio);
                $("#horaFin5EI").val(json[0].hora_fin);
                $("#producto5EI").val(json[0].producto);
                $("#area5EI").val(json[0].area);
                $("#invitado5EI").val(json[0].invitado);

                $("#legend5").html("");
                $("#legend5").html("HORMIGAS");
               
                tabla = '';
                if(json[0].det_hormigas.length > 0){
                    datosDet = '';
                    for(i=0; i< json[0].det_hormigas.length; i++){                        
                        if(json[0].det_hormigas[i].estado == 'A'){
                            
                            eliminar  = "<a class='delete' id_detalle='"+ json[0].det_hormigas[i].id +"' id_cabecera='"+idCab+"' onclick='deletedetalleHormiga(this);'><i class='fa fa-trash text-green btn_edit'></i></a>";
                            editar    = "<a id_detalle='"+ json[0].det_hormigas[i].id +"' id_cabecera='"+idCab+"' onclick='editdetalleHormiga(this);'><i class='fa fa-edit text-green btn_edit'></i></a>";

                            if(json[0].det_hormigas[i].hormiga_was == true) h1 = '&#10003;'; else h1 = '';
                            if(json[0].det_hormigas[i].hormiga_phe == true) h2 = '&#10003;'; else h2 = '';
                            if(json[0].det_hormigas[i].hormiga_sol == true) h3 = '&#10003;'; else h3 = '';
                            if(json[0].det_hormigas[i].hormiga_car == true) h4 = '&#10003;'; else h4 = '';
                            if(json[0].det_hormigas[i].hormiga_tap == true) h5 = '&#10003;'; else h5 = '';
                            if(json[0].det_hormigas[i].hormiga_mon == true) h6 = '&#10003;'; else h6 = '';
                            if(json[0].det_hormigas[i].hormiga_end == true) h7 = '&#10003;'; else h7 = '';
                            if(json[0].det_hormigas[i].hormiga_otra == true) h8 = '&#10003;'; else h8 = '';

                            tabla += "<tr>";
                            tabla += "<td align='center'>" + (i+1) + "</td>";
                            tabla += "<td align='center'>" + json[0].det_hormigas[i].pto_gps + "</td>";
                            tabla += "<td align='center'>" + h1 + "</td>";                      
                            tabla += "<td align='center'>" + h2 + "</td>";
                            tabla += "<td align='center'>" + h3 + "</td>";
                            tabla += "<td align='center'>" + h4 + "</td>";
                            tabla += "<td align='center'>" + h5 + "</td>";
                            tabla += "<td align='center'>" + h6 + "</td>";
                            tabla += "<td align='center'>" + h7 + "</td>";
                            tabla += "<td align='center'>" + h8 + "</td>";
                            tabla += "<td align='center'>"+editar+"</td>";
                            tabla += "<td align='center'>"+eliminar+"</td>";
                            tabla += "</tr>";                
                        }
                    }                    
                }
                $('#tabladet5').dataTable().fnClearTable();
                $('#tabladet5').dataTable().fnDestroy();

                $("#bodytabladet5").html("");
                $("#bodytabladet5").append(tabla);

                var table = $('#tabladet5').DataTable();
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

function editEspecieIntroCaceria(idCab){
    //limpiarFormInfoNovedades();
    $("#modalLoadin").show();
    //initTinymce();
    $('.nav-tabs a[href="#tab_GenE"]').tab('show'); //para q cuando se abra el popup aparezca en la primera pestaña

    console.log(idCab);
    $.ajax({
        url: "data_infoCabEspIntro",
        type: "get",
        data: {
            "data": idCab
        },
        dataType: "json",

        success: function(json) {
            $("#modalLoadin").hide();
            if (json['non_field_errors']) {
                console.log(json['non_field_errors']);
            } else {
                                
                $("#tipotrxEI").val(1);
                $("#idcabespecie").val(json[0].id);
                $("#iddetespecie").val("");
                arryEncargados = [];
                if((json[0].encargado_id != null)||(json[0].encargado_id != "")){
                    arryEncargados = json[0].encargado_id.split("|");
                }
                arrayMetodos = [];
                if((json[0].metodo_control != null)||(json[0].metodo_control != "")){
                    arrayMetodos = json[0].metodo_control.split("|");
                }
                $("#encargado6EI").val(arryEncargados).trigger("change");
                $("#Smetodo6EI").val(arrayMetodos).trigger("change");
                $("#Sisla6EI").val(json[0].isla_id.id).trigger("change");
                $("#fecha6EI").val(json[0].fecha);
                $("#Ssitio6EI").val(json[0].sitio_id.id).trigger("change");
                $("#invitado6EI").val(json[0].invitado);
                $("#horaIni6EI").val(json[0].hora_inicio);
                $("#horaFin6EI").val(json[0].hora_fin);

                $("#legend6").html("");
                $("#legend6").html("CACERIA");

                tabla = '';
                if(json[0].det_caceria.length > 0){
                    datosDet = '';
                    for(i=0; i< json[0].det_caceria.length; i++){                        
                        if(json[0].det_caceria[i].estado == 'A'){
                            
                            eliminar  = "<a class='delete' id_detalle='"+ json[0].det_caceria[i].id +"' id_cabecera='"+idCab+"' onclick='deletedetalleCaceria(this);'><i class='fa fa-trash text-green btn_edit'></i></a>";
                            editar    = "<a id_detalle='"+ json[0].det_caceria[i].id +"' id_cabecera='"+idCab+"' onclick='editdetalleCaceria(this);'><i class='fa fa-edit text-green btn_edit'></i></a>";

                            tabla += "<tr>";
                            tabla += "<td>" + (i+1) + "</td>";
                            tabla += "<td align='left'>" + json[0].det_caceria[i].pto_gps  + "</td>";                      
                            tabla += "<td align='center'>" + (json[0].det_caceria[i].cabra_h == 0 ? "" : json[0].det_caceria[i].cabra_h) + "</td>";
                            tabla += "<td align='center'>" + (json[0].det_caceria[i].cabra_m == 0 ? "" : json[0].det_caceria[i].cabra_m) + "</td>";
                            tabla += "<td align='center'>" + (json[0].det_caceria[i].cabra_j == 0 ? "" : json[0].det_caceria[i].cabra_j) + "</td>";
                            tabla += "<td align='center'>" + (json[0].det_caceria[i].asno_h == 0 ? "" : json[0].det_caceria[i].asno_h) + "</td>";
                            tabla += "<td align='center'>" + (json[0].det_caceria[i].asno_m == 0 ? "" : json[0].det_caceria[i].asno_m) + "</td>";
                            tabla += "<td align='center'>" + (json[0].det_caceria[i].asno_j == 0 ? "" : json[0].det_caceria[i].asno_j) + "</td>";
                            tabla += "<td align='center'>" + (json[0].det_caceria[i].cerdo_h == 0 ? "" : json[0].det_caceria[i].cerdo_h) + "</td>";
                            tabla += "<td align='center'>" + (json[0].det_caceria[i].cerdo_m == 0 ? "" : json[0].det_caceria[i].cerdo_m) + "</td>";
                            tabla += "<td align='center'>" + (json[0].det_caceria[i].cerdo_j == 0 ? "" : json[0].det_caceria[i].cerdo_j) + "</td>";
                            tabla += "<td align='center'>" + (json[0].det_caceria[i].vacuno_h == 0 ? "" : json[0].det_caceria[i].vacuno_h) + "</td>";
                            tabla += "<td align='center'>" + (json[0].det_caceria[i].vacuno_m == 0 ? "" : json[0].det_caceria[i].vacuno_m) + "</td>";
                            tabla += "<td align='center'>" + (json[0].det_caceria[i].vacuno_j == 0 ? "" : json[0].det_caceria[i].vacuno_j) + "</td>";
                            tabla += "<td align='center'>" + json[0].det_caceria[i].observacion + "</td>";
                            tabla += "<td align='center'>"+editar+"</td>";
                            tabla += "<td align='center'>"+eliminar+"</td>";
                            tabla += "</tr>";                
                        }
                    }                    
                }
                $('#tabladet6').dataTable().fnClearTable();
                $('#tabladet6').dataTable().fnDestroy();

                $("#bodytabladet6").html("");
                $("#bodytabladet6").append(tabla);
                var table = $('#tabladet6').DataTable();
            }
        },
        error: function(json) {
            $("#modalLoadin").hide();
            swal("", "Error: " + JSON.stringify(json), "error");
            console.log(JSON.stringify(json));
        },
    });
}


function getSitioXisla(isla_id,num){
    //console.log(data);
    $.ajax({
        url: "data_sitioXisla",
        type: "get",
        data: {
            "data": isla_id
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
                            option += "<option value='" + data[i].id + "'>" + data[i].descripcion + " </option>";
                        }
                    }
                    
                    $("#Ssitio"+num+"EI").select2('destroy');
                    $("#Ssitio"+num+"EI option").remove();
                    $("#Ssitio"+num+"EI").append(option);
                    $("#Ssitio"+num+"EI").select2({
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


function getDataMetodoControl (especieid){
    if(especieid == "6da62d60-d3ac-11e6-8df9-000c29e38a2f")
        num = '';
    if(especieid == "8c0da5f4-6e81-410c-9c88-bdf1cfa6b1b6")
        num = '2';
    if(especieid == "0a40a0fa-7f00-0010-1180-00023a496b77")
        num = '3';
    if(especieid == "0a40a0fa-7f00-0010-1180-00033a496b77")
        num = '4';
    if(especieid == "0a40a0fa-7f00-0010-1180-00099a496b77")
        num = '5';
    if(especieid == "0a40a0fa-7f00-0010-1180-00099a496b78")
        num = '6';
    $.ajax({
        url: "data_metodoXespecie",
        type: "get",
        data: {
            "data": especieid
        },
        dataType: "json",
        async: false,

        success: function(data) {
            if (data['non_field_errors']) {
                console.log(data['non_field_errors']);
            } else {
                console.log(data);
                if (data.length != 0) {

                    option = '';
                    option_descrp = '';
                    if (data.length > 0) {
                        for (i = 0; i < data.length; i++) {
                            option += "<option value='"+data[i].metodo_id.valor.trim()+"'>" + data[i].metodo_id.metodo + " </option>";
                        }
                    }
                    
                    $("#Smetodo"+num+"EI").select2('destroy');
                    $("#Smetodo"+num+"EI option").remove();
                    $("#Smetodo"+num+"EI").append(option);
                    $("#Smetodo"+num+"EI").select2({
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


function bloquearMetodo(){
    metodo = $("#SmetodoEI").val();
    $("#trtrampa").addClass("disabled-select");
    $("#trrifle").addClass("disabled-select");
    $("#trcebo").addClass("disabled-select");

    for(i=0; i< metodo.length; i++){
        if(metodo[i] == 'T'){
            $("#trtrampa").removeClass("disabled-select");
        }
        if(metodo[i] == 'R'){
            $("#trrifle").removeClass("disabled-select");
        }
        if(metodo[i] == 'C'){
            $("#trcebo").removeClass("disabled-select");
        }
        if(metodo[i] == 'O'){
            $("#trtrampa").addClass("disabled-select");
            $("#trrifle").addClass("disabled-select");
            $("#trcebo").addClass("disabled-select");
        }
    }
}