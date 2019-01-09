$(function(){
	
	navigator.splashscreen.hide();
	
	function camSuccess(imgData){
		$("#img_Campurada").attr("src",imgData);
		alert(imgData);
		//<img src="file://wherehpone/img"
	}
	
	function camError(error){
		alert("Error: "+error);
	}
	
	function accessCamera(){
		var options = {
			destinationType	  : Camera.DestinationType.FILE_URI,
			sourceType		  : Camera.PictureSourceType.CAMERA,
			correctOrientation: true
		}
		navigator.camera.getPicture(camSuccess,camError,options);
	}
  	
	$("#btn_camara").on("click",accessCamera);
});