/*accion personal*/

function getDataSituacion(funcionario){
  //console.log(1);
  funcionario = $("#SfuncionaioAcc option:selected").attr("dataFuncionario");
  newF = funcionario.replace(/None/g,null)
  newF = newF.replace(/False/g,"'false'")
  newF = newF.replace(/True/g,"'true'")
  newF = newF.replace(/'/g,'"')
  //var json = JSON.stringify(eval("(" + newF + ")"));
  var json = JSON.parse("[" + newF + "]");
  //console.log(json[0].modalidad_laboral_id);
  $("#SsitdireSA").val(json[0].direccion_estatuto_id).trigger("change");
  $("#SsitprocSA").val(json[0].proceso_estatuto_id).trigger("change");
  $("#SsitsubprocSA").val(json[0].subproceso_estatuto_id).trigger("change");
  $("#SsitgrupoSA").val(json[0].cargo_ocupacional_id).trigger("change");
  $("#SsitpuestoSA").val(json[0].cargo_institucional_id).trigger("change");
  $("#SsitpuestDistSA").val(json[0].cargo_distributivo_id).trigger("change");
  $("#SsitislaSA").val(json[0].isla_trabaja_id).trigger("change");
  $("#TrmuSA").val(json[0].rmu);

}