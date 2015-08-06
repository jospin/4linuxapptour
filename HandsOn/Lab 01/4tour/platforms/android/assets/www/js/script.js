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
		// app.dispositivo();
		// app.battery();
		// app.checkNetwork();
		// app.checkOnline();
		app.vibration();
		// app.resume();
		// app.pause();
	},
	vibration: function() {
		document.getElementById("vibrar")
			.addEventListener('click', function(){
				navigator.vibrate(
					[350,10,350,400,350,10,350,400,350,10,350,400,350,10,350,400,350,10,350,400,350,10,350,400,350,10,350,400]
				);
			});
		document.getElementById	("nao-vibrar")
			.addEventListener('click', function(){
				navigator.vibrate(0);
			});
		//navigator.vibrate([5000,100,500,100]);
	}
	// checkNetwork: function() {
	// 	var networkState = navigator.connection.type;
	// 	var states = {};
	// 	states[Connection.CELL_3G] = '3G';
	// 	states[Connection.WIFI] = 'Wi-Fi';
	// 	alert("Conectado em: " + states[networkState]);
	// },
	// checkOnline: function() {
	// 	window.addEventListener('online', function(){alert("onLine");}, false);
	// 	window.addEventListener('ofline', function(){alert("ofline");}, false);		
	// },
	// battery: function() {
	// 	window.addEventListener(
	// 		"batterystatus",
	// 		function(info) {
	// 			alert(info.level);
	// 			var carregando = (info.isPLugged)?"Carregando":"Sem caregar";
	// 			alert('Carregando?' + carregando);
	// 		},
	// 		false
	// 	);
	// },
	// // escreve: function() {
	// // 	alert('dispositivo pronto');
	// // },
	// // resume: function(){
	// // 	document.addEventListener(
	// // 		'resume',
	// // 		function() {
	// // 			alert("Voltou ao aplicativo");
	// // 		},
	// // 		false
	// // 	)

	// // },
	// // pause: function() {
	// // 	document.addEventListener(
	// // 		"pause", 
	// // 		function(){
	// // 			alert("Aplicativo pausado"); 
	// // 		},
	// // 		false
	// // 	)
	// // },
	// dispositivo: function() {
	// 	alert("Versao: " + device.cordova);
	// 	alert("NUMERO: " + device.uuid);
	// 	console.log(device);
	// }
};
if(navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)){
	app.init();
} else {
 	app.onDeviceReady();
}