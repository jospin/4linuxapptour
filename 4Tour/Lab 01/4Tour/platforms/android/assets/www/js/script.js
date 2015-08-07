var app = {

	init: function() {
		this.deviceReady();
	},
	deviceReady: function() {
		document.addEventListener(
			"deviceready",
			this.onDeviceReady(),
			false
		);
	},
	onDeviceReady: function() {
		document.getElementById("status").innerHTML = "Pronto";
		// Pause
		document.addEventListener(
			"pause",
			function(){
				document.getElementById("status").innerHTML = "pausado";
			},
			false
		);
		document.addEventListener(
			"resume",
			function(){
				document.getElementById("status").innerHTML = "Resume";
			},
			false
		);
		app.dispositivo();
		window.addEventListener('batterystatus', app.bateria(info), false);
		window.addEventListener('batterylow', alert('bateria baixa'), false);
		window.addEventListener('batterycritical', alert('bateria cr[itica'), false);
	},
	dispositivo: function() {
		document.getElementById("textoD").innerHTML = 
				device.cordova + "<br />"
				+ device.uuid + "<br />" 
				+ device.model + "<br />"
				+ device.platform + "<br />";

	},
	bateria: function(info) {
		if(info.isPlugged) {
			document.getElementByid('textoB').innerHTML = "Bateria Plugada";
		} else {
			document.getElementByid('textoB').innerHTML = "Bateria n'ao plugada";
		}

	}

}

if(navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)){
	app.init();
} else {
 	app.onDeviceReady();
}