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
		app.geolocation();
		app.globalization();
		//app.acelerometro();
		app.orientacao()
		// app.resume();
		// app.pause();
	},
	// statusBar: function() {
	// 	StatusBar.hide();
	// 	// setTimeout(
	// 	// 	function(){StatusBar.hide();},10000);
	// },
	orientacao: function() {
		var orienta = document.getElementById('orienta');
		alert(navigator.compass);
		navigator.compass.getCurrentHeading(
			function(heading) {
				alert(heading);
				var html = 'Orienta<br />'
				+ "heading: " 
				+ heading.magneticHeading;
				orienta.innerHTML = html;
			},
			function(error){alert('erro'+erro.mesage);}
		);
		navigator.compass.watchHeading(
			function(heading) {
				var html = 'Orienta<br />'
				+ "heading: " 
				+ heading.magneticHeading;
				orienta.innerHTML = html;
			},
			function(error){alert('erro'+erro.mesage);}
		);
	},
	acelerometro: function() {
		var acel = document.getElementById('acelerometro');
		navigator.accelerometer.getCurrentAcceleration(
			function(aceleration) {
				var html = '<br />Aceleration X: '
					+ aceleration.X
					+ '<br />Aceleration Y: ' 
					+ aceleration.Y
					+ '<br />Aceleration z: '
					+ aceleration.z
					+ '<br />Timestamp' 
					+ aceleration.timestamp;
				acel.innerHTML = html;
			},
			function(erro){alert(erro.mesage);}
		);
		navigator.accelerometer.watchAcceleration(
			function(aceleration) {
				html = '<br />Aceleration X: '
					+ aceleration.X
					+ '<br />Aceleration Y: '
					+ aceleration.Y
					+ '<br />Aceleration z: '
					+ aceleration.z
					+ '<br />Timestamp' 
					+ aceleration.timestamp;
				acel.innerHTML = html;
			},
			function(){alert('erro');},
			{frequency:3000}
		);

	},
	globalization: function() {
		document.getElementById('globalizacao')
			.addEventListener('click', function(){
			navigator.globalization.getPreferredLanguage(
				function(language) {
					alert('Language: ' + language.value);
				},
				function(){alert('erro na linguagem');}
			);
			navigator.globalization.getLocaleName(
				function(locale) {
					alert('locale' + locale.value);
				},
				function(){alert('Erro no locale');}
			);
			navigator.globalization.dateToString(
				new Date,
				function(date){alert('data: ' + date.value);},
				function(){alert('erro ao pegar data');}

			);
			navigator.globalization.isDayLightSavingsTime(
				new Date,
				function(date){alert('dst: ' + date.dst)},
				function(){alert('Erro no dst');}
			)
		});
	},
	geolocation: function() {
		var localizacao = false;
			navigator.geolocation.getCurrentPosition(
				function(position){
					var html = "Posicao incial<br />"
						+ "Latitude: " + position.coords.latitude
						+ "<br /> Longitude: " + position.coords.longitude;
					var localizacao = document.getElementById("localizacao-inicial");
					localizacao.innerHTML = html;
				},
				function(){
					alert("Ero de geolocalizacao: " + error.mesage);
				},
				{enableHighAccurancy:true}
			);


		geo = navigator.geolocation;
		geo.watchPosition(
			function(position) {
				var html = "Posicao atual<br />"
					+ "Latitude: " + position.coords.latitude
					+ "<br /> Longitude: " 
					+ position.coords.longitude;
				var localizacao = document.getElementById("localizacao-final");
				localizacao.innerHTML = html;
			}
		);
	},
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