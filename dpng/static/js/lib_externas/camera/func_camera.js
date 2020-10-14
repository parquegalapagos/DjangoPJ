/*
	DESCRIPCION: FUNCIONES BÁSICAS DE LA CAMARA.
*/

// preload shutter audio clip
/*
var shutter = new Audio('');
shutter.autoplay = false;
shutter.src = navigator.userAgent.match(/Firefox/) ? 'shutter.ogg' : './shutter.mp3';
*/
var today = new Date();


/*
function preview_snapshot() {
  // play sound effect
  try { shutter.currentTime = 0; } catch(e) {;} // fails in IE
  shutter.play();
  
  // freeze camera so user can preview current frame
  Webcam.freeze();
  
  // swap button sets
  document.getElementById('pre_take_buttons').style.display = 'none';
  document.getElementById('post_take_buttons').style.display = '';

  save_photo();
}
*/

function cancel_preview() {
  // cancel preview freeze and return to live camera view
  Webcam.unfreeze();
  
  // swap buttons back to first set
  document.getElementById('pre_take_buttons').style.display = '';
  document.getElementById('post_take_buttons').style.display = 'none';
}

function save_photo() {
  // actually snap photo (from preview freeze) and display it
  Webcam.snap( function(data_uri) {
    // display results in page
    document.getElementById('results').innerHTML = 
      '<h2>Here is your large, cropped image:</h2>' + 
      '<input id="imageprev" src="'+data_uri+'"/><br/></br>' + 
      '<a href="'+data_uri+'" target="_blank">Open image in new window...</a>';
    
    // shut down camera, stop capturing
    Webcam.reset();
    
    // show results, hide photo booth
    document.getElementById('results').style.display = '';
    document.getElementById('my_photo_booth').style.display = 'none';
  } );

  saveSnap();

}

function take_snapshot() {
  // play sound effect
  //shutter.play();

  // take snapshot and get image data
  Webcam.snap( function(data_uri) {
    // display results in page
    document.getElementById('results').innerHTML = 
    '<input type="image" name="imageprev" id="imageprev" src="'+data_uri+'"/>';
  } );
  //Webcam.reset();
  //saveSnap(); 

}

/*
* Funcion: saveSnap.
* Descripcion: Sube un archivo base64 en formato .jpeg
* Parametros:
*   - tag_id(String): Es el input de tipo image donde esta la imagen
*   - file_name(String): Nombre del archivo sin extension
*   - file_path(String): Ruta Completa donde se va a subir el archivo
*/
function saveSnap(tag_id,file_name,file_path){
  console.log("-----  saveSnap  -----");

  console.log(file_name);

  // Get base64 value from <img id='imageprev'> source
  if ( $("#"+tag_id).length > 0 ){
    var base64image = document.getElementById(tag_id).src;
    var time = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var formData = new FormData();
    
    formData.append("base64_img", base64image);
    formData.append("file_name", file_name);
    formData.append("file_path", file_path);

    $.ajax({
      type: 'POST',
      url:  'upload_image',
      data: formData,
      contentType: 'multipart/form-data',
      processData: false,
      contentType: false,
      success: function(data){
        console.log(data);
        //Cuando la interacción sea exitosa, se ejecutará esto.
      },
      error: function(data){
        console.log(data);
        //Cuando la interacción retorne un error, se ejecutará esto.
      }
    })
  }


}


