/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
		navigator.splashscreen.hide();
		$("#btnTest").click(function(e){
			e.preventDefault();

			//var Ruta MAC http://localhost:8080/AplicacionReconocimiento/ControlJSP.jsp

			$.post('http://35.163.42.97:8080/web/ControlJSP.jsp',{
				Base64    : $('#Base64').html(),
				Extension : 'jpeg'
			},
			function(response) {
				alert(response);
			}).done(function(response) {
				//alert(response);
			});
		});
    },
	receivedEvent: function(id) {
		
    },
};

app.initialize();
function ObtenerValorBase64DeDataURL(DataUrl)
{
	var res = DataUrl.split(',');
    return res[1];
}
function camSuccess(imageData){
	$('#img_Campurada').attr('src','data:image/jpeg;base64,' + imageData);
	$('#Base64').html(''+imageData);
	//<img src="file://wherehpone/img"
}

function camError(error){
	alert("Error: "+error);
}

function accessCamera(){
	var options = {
        quality: 25,
        destinationType: Camera.DestinationType.DATA_URL,
        // In this app, dynamically set the picture source, Camera or photo gallery
        sourceType: Camera.PictureSourceType.CAMERA,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        allowEdit: true,
        correctOrientation: true  //Corrects Android orientation quirks
	}
	navigator.camera.getPicture(camSuccess,camError,options);
}
function TomarFoto(e)
{
	e.preventDefault();
	accessCamera();
}