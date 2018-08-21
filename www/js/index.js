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
        app.receivedEvent('deviceready');
		app.pushNotification();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
	pushNotification: function(){
		FCMPlugin.getToken(function(token){
			//alert(token);
			$.ajax({
				url	:'http://35.163.42.97:8080/prueba/grabar_id_device.php',
				type:'POST',
				data:{
					Id_usuario	: 'demo',
					Plataforma	: 'android',
					Id_device	: token
				},
				async: false
			}). done(function(response) {
				alert(response);
			});
		});
		FCMPlugin.onNotification(function(data){
			if(data.wasTapped)
			{
				// La notificación se recibió en la bandeja del dispositivo y el usuario la tocó.
				alert('Tocada')
				alert(JSON.stringify(data));
				alert(data.param1);
			}
			else
			{
				// La notificación se recibió en primer plano.  Tal vez el usuario necesita ser notificado.
				alert('Primerplano')
				alert(JSON.stringify(data));
				alert(data.param1);
			}
		});
    }
};

app.initialize();
