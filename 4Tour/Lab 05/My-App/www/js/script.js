var app = {
	init: function(){
		this.deviceReady();
	},
	deviceReady: function(){
		document.addEventListener('deviceready', this.onDeviceReady, false);
	},
	onDeviceReady: function(){
		app.receivedEvent('page_inicial', '#ready');
        document.addEventListener("pause",  app.onPause,  false);
        document.addEventListener("resume", app.onResume, false);
        app.deviceInfo('page_dispositivo', '#device');
        window.addEventListener("batterystatus", app.onBatteryStatus, false);
		app.checkConnection('page_rede', '#network');
        window.addEventListener("online", app.changeOnline, false);
        window.addEventListener("offline", app.changeOffline, false);
        app.vibrate();
	},
	receivedEvent: function(id, elemento) {
        var pronto = document.getElementById(id).querySelector(elemento);

        pronto.setAttribute('style', 'text-align:center;');
        pronto.innerHTML = 'Dispositivo pronto!';
    },
	onPause: function(){
		alert("Enviado para background");
	},
	onResume: function(){
		alert("Trazido do background");
	},
    deviceInfo: function(id, elemento){
        var dispositivo = document.getElementById(id).querySelector(elemento);

        dispositivo.innerHTML = "Nome: "+device.name+"<br/>\
        						Cordova: "+device.cordova+"<br/>\
        						Plataforma: "+device.platform+"<br/>\
        						UUID: "+device.uuid+"<br/>\
        						Versão: "+device.version+"<br/>\
        						Modelo: "+device.model;
    },
    onBatteryStatus: function(info){
        var parentElement = document.getElementById('page_bateria');
        var status_bateria = parentElement.querySelector('#battery');
        var plugado = (info.isPlugged) ? '<br/>Carregando...' : '<br/>[Sem carregamento]';
        status_bateria.innerHTML = "Porcentagem da bateria: " + info.level + "%"+plugado;
    },
	checkConnection: function(id, elemento) {
		var networkState = navigator.connection.type;
		var states = {};
		states[Connection.UNKNOWN]  = 'Desconhecida';
		states[Connection.ETHERNET] = 'Ethernet';
		states[Connection.WIFI]     = 'WiFi';
		states[Connection.CELL_2G]  = 'Cel 2G';
		states[Connection.CELL_3G]  = 'Cel 3G';
		states[Connection.CELL_4G]  = 'Cel 4G';
		states[Connection.CELL]     = 'Cel genérico';
		states[Connection.NONE]     = 'Sem conexão';
		document.getElementById(id).querySelector(elemento).innerHTML = "Tipo de conexão: "+states[networkState];
	},
	changeOnline: function(){
		alert('Online');
	},
	changeOffline: function(){
		alert('Offline');
	},
	vibrate: function(){
		navigator.vibrate([350,10,350, 400, 350,10,350, 400, 350,10,350, 400, 350,10,350, 400, 350,10,350, 400, 350,10,350, 400, 350,10,350, 400, 350,10,350, 400]);
	}
}

if(navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/))
{
    app.init();
}
else{
    app.onDeviceReady();
}