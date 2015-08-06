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
		app.dispositivo()

	},
	dispositivo: function() {
		alert("Versao: " + device.cordova);
		alert("NUMERO: " + device.uuid);
		console.log(device);
	}

}

if(navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)){
	app.init();
} else {
 	app.onDeviceReady();
}