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
		//app.battery();
		//app.checkNetwork();
		//app.checkOnline();
		//app.statusBar();
		app.vibration();
		app.alerta();
		app.browser();
		// app.resume();
		// app.pause();
	},
	// statusBar: function() {
	// 	StatusBar.hide();
	// 	// setTimeout(
	// 	// 	function(){StatusBar.hide();},10000);
	// },
	browser: function() {
		document.getElementById('gogle')
			.addEventListener('click', function(){
				window.open = cordova.InAppBrowser.open(
						'http://google.com',
						'_blank',
						'location=no'
					)
			});
		document.getElementById('gogle2')
			.addEventListener('click', function(){
				window.open = cordova.InAppBrowser.open(
						'http://google.com',
						'_blank',
						'location=yes'
					)
			});
		document.getElementById('gogle3')
			.addEventListener('click', function(){
				window.open = cordova.InAppBrowser.open(
						'http://google.com'
					)
			});
	},
	alerta: function() {
		document.getElementById('alertar')
			.addEventListener('click', function(){
				navigator.notification.alert(
					"Area Restrita",
					function(){alert("Ola!")},
					"Cuidado",
					"Ok"
				);
			});
		document.getElementById('bipar')
			.addEventListener('click', function(){
				navigator.notification.beep(4);
			});
		document.getElementById('sair')
			.addEventListener('click', function(){
				navigator.notification.confirm(
					"Realmente deseja sair?",
					function(buttonIndex) {
						if (buttonIndex === 1) {
							navigator.app.exitApp();
						}
					},
					"Sair",
					["Sim","Nao"]
				);

			});
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
	// }
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
};
if(navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)){
	app.init();
} else {
 	app.onDeviceReady();
}