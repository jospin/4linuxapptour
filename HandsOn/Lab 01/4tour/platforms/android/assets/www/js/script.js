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
		app.closeSplashScreen();
		app.statusBarBg();
		app.dialogo();
		app.linkInBrowser();
		app.geolocalizacao();
		app.globalizacao();
		app.motion();
		app.orientacao();
		app.bussula();
		app.camera();
		app.audio();
		app.backButton();
		app.contatos();
		app.fileSystem();
	},
	receivedEvent: function(id, elemento) {
		var pronto = document.getElementById(id).querySelector(elemento);

		pronto.setAttribute('style', 'text-align:center;');
		pronto.innerHTML = 'Dispositivo pronto!';
	},
	onPause: function(){
		//alert("Enviado para background");
	},
	onResume: function(){
		//alert("Trazido do background");
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
		//alert('Online');
	},
	changeOffline: function(){
		//alert('Offline');
	},
	vibrate: function(){
		document.getElementById('button_vibra').addEventListener("click", function(){
			navigator.vibrate([350,10,350, 400, 350,10,350, 400, 350,10,350, 400, 350,10,350, 400, 350,10,350, 400, 350,10,350, 400, 350,10,350, 400, 350,10,350, 400]);
		}, false);

		document.getElementById('button_nao_vibra').addEventListener("click", function(){
			navigator.vibrate(0);
		}, false);
		
	},
	closeSplashScreen: function(){
		setTimeout(function() {
			navigator.splashscreen.hide();
		}, 2000);
	},
	statusBarBg: function(){
		StatusBar.backgroundColorByHexString("#000000");
		setTimeout(function() {
			StatusBar.hide();
		}, 10000);
	},
	dialogo: function(){
		document.getElementById('button_alert').addEventListener("click", function(){
			navigator.notification.alert(
				"Área restrita",					// mensagem
				function(){ alert('callback'); },	// callback
				"Cuidado",							// titulo
				"OK"								// nome do botão
			);
		}, false);

		document.getElementById('button_confirm').addEventListener("click", function(){
			navigator.notification.confirm(
				"Deseja realmente sair do aplicativo?",	// mensagem
				function(buttonIndex){		// callback
					if(buttonIndex === 1){
						navigator.app.exitApp();
					}
				},
				"Sair do aplicativo",		// titulo
				["Sim", "Não"]				// botões
			);
		}, false);

		document.getElementById('button_prompt').addEventListener("click", function(){
			navigator.notification.prompt(
				"Qual a sua idade?",		// mensagem
				function(args){				// callback
					if(args.buttonIndex === 1){
						window.age = args.input1;
						alert("Sua idade é: "+args.input1);
					}
				},
				"Idade",					// titulo
				["Enviar!"],				// botões
				"18"						// Texto Padrão
			);
		}, false);

		document.getElementById('button_beep').addEventListener("click", function(){
			navigator.notification.beep(5);	// quantidade
		}, false);		
	},
	linkInBrowser: function(){
		document.getElementById('button_linkbrowser1').addEventListener("click", function(){
			window.open = cordova.InAppBrowser.open('http://www.4linux.com.br', '_blank', 'location=no');
		}, false);
		
		document.getElementById('button_linkbrowser2').addEventListener("click", function(){
			window.open = cordova.InAppBrowser.open('http://www.4linux.com.br', '_blank', 'location=yes');
		}, false);
	},
	geolocalizacao: function(){
		var page_geo = document.getElementById('page_geolocalizacao');
		var geo = navigator.geolocation;
		
		geo.getCurrentPosition(
			function(position){
				var data = converteData(position.timestamp);
				page_geo.querySelector('#inicial').innerHTML = "<p>Posição Inicial<br/>" +
																"Latitude: "+position.coords.latitude+"<br/>" +
																"Longitude: "+position.coords.longitude+"<br/>" +
																"Precisão: "+position.coords.accuracy+"<br/>" +
																"Data: "+data+"</p>";
			},
			function(error){
				page_geo.querySelector('#inicial').innerHTML = "<p>Não foi possível carregar sua posição inicial<br/>" +
																"Código do erro: "+error.code+"<br/>" +
																"Mensagem: "+error.message+"</p>";
			}
		);

		geo.watchPosition(
			function(position){
				var data = converteData(position.timestamp);
				page_geo.querySelector('#atual').innerHTML = "<br/><p>Posição Atual<br/>" +
																"Latitude: "+position.coords.latitude+"<br/>" +
																"Longitude: "+position.coords.longitude+"<br/>" +
																"Precisão: "+position.coords.accuracy+"<br/>" +
																"Data: "+data+"</p>";
			},
			function(error){
				page_geo.querySelector('#atual').innerHTML = "<br/><p>Não foi possível carregar sua posição atual<br/>" +
																"Código do erro: "+error.code+"<br/>" +
																"Mensagem: "+error.message+"</p>";
			}, { timeout: 1000 }
		);
	},
	globalizacao: function(){
		var globalizacao = document.getElementById('globalizacao');
		navigator.globalization.getPreferredLanguage(
			function (language) {
				globalizacao.innerHTML = "Língua: " + language.value + "<br/>";
			},
			function () {
				alert('Error getting language\n');
			}
		);

		navigator.globalization.getLocaleName(
			function (locale) {
				globalizacao.innerHTML += "Local: " + locale.value + "<br/>";
			},
			function () {
				alert('Error getting locale\n');
			}
		);

		navigator.globalization.getDatePattern(
			function (date) {
				globalizacao.innerHTML += "Padrão de Data: " + date.pattern + "<br/>";
			},
			function () {
				alert('Error getting pattern\n');
			},
			{
				formatLength: 'short',
				selector: 'date and time'
			}
		);

		navigator.globalization.dateToString(
			new Date(),
			function (date) {
				globalizacao.innerHTML += "Data em string: " + date.value + "<br/>";
			},
			function () {
				alert('Error getting dateString\n');
			},
			{
				formatLength: 'short',
				selector: 'date and time'
			}
		);
		
		navigator.globalization.getDateNames(
			function (names) {
				for (var i = 0; i < names.value.length; i++) {
					globalizacao.innerHTML += "Mês: " + names.value[i] + "<br/>";
				}
			},
			function () { alert('Error getting names\n'); },
			{ type: 'wide', item: 'months' }
		);

		navigator.globalization.getFirstDayOfWeek(
			function (day) {
				var weekDay = day.value;
				var dayWeek;

				switch(weekDay){
					case 1:
						dayWeek = 'Domingo';
					break;
					case 2:
						dayWeek = 'Segunda';
					break;
					case 3:
						dayWeek = 'Terça';
					break;
					case 4:
						dayWeek = 'Quarta';
					break;
					case 5:
						dayWeek = 'Quinta';
					break;
					case 6:
						dayWeek = 'Sexta';
					break;
					case 7:
						dayWeek = 'Sábado';
					break;
				}
				globalizacao.innerHTML += "Primeiro dia da semana: " + dayWeek + "<br/>";
			},
			function () {alert('Error getting day\n');}
		);

		navigator.globalization.isDayLightSavingsTime(
			new Date(),
			function (date) {
				var horarioVerao = (date.dst) ? 'Sim' : 'Não';
				globalizacao.innerHTML += "Está em horário de verão? " + horarioVerao + "<br/>";
			},
			function () {
				alert('Error getting names\n');
			}
		);
	},
	motion: function(){
		var page_acelerometro = document.getElementById('page_acelerometro');
		var acelerometro = navigator.accelerometer;

		acelerometro.getCurrentAcceleration(
			function(acceleration) {
				var data = converteData(acceleration.timestamp);
				page_acelerometro.querySelector('#inicial').innerHTML = '<p>Acelerômetro Inicial<br/>' +
																		'Ponto X: ' + acceleration.x + '<br/>' +
																		'Ponto Y: ' + acceleration.y + '<br/>' +
																		'Ponto Z: ' + acceleration.z + '<br/>' +
																		'Data: ' + data + '</p>';
			}, function() {
				page_acelerometro.querySelector('#inicial').innerHTML = "Acelerômetro não pôde ser carregado";
			}
		);

		acelerometro.watchAcceleration(
			function(acceleration) {
				var data = converteData(acceleration.timestamp);
				page_acelerometro.querySelector('#atual').innerHTML = '<br/><p>Atualização do Acelerômetro<br/>' +
																		'Ponto X: ' + acceleration.x + '<br/>' +
																		'Ponto Y: ' + acceleration.y + '<br/>' +
																		'Ponto Z: ' + acceleration.z + '<br/>' +
																		'Data: ' + data + '</p>';
			}, function() {
				page_acelerometro.querySelector('#atual').innerHTML = "<br/>Acelerômetro não pôde ser atualizado";
			}, { frequency: 1000 }
		);
	},
	orientacao: function(){
		var page_orientacao = document.getElementById('page_orientacao');
		var orientacao = navigator.compass;

		orientacao.getCurrentHeading(
			function(heading) {
				var data = converteData(heading.timestamp);
				page_orientacao.querySelector('#inicial').innerHTML = '<p>Orientação Inicial<br/>' +
																	'Grau de Orientação: ' + heading.magneticHeading + '<br/>' +
																	'Data: ' + data + '</p>';
			}, function() {
				page_orientacao.querySelector('#inicial').innerHTML = "Orientação não pôde ser carregado";
			}
		);

		orientacao.watchHeading(
			function(heading) {
				var data = converteData(heading.timestamp);
				page_orientacao.querySelector('#atual').innerHTML = '<br/><p>Atualização da Orientação<br/>' +
																	'Grau de Orientação: ' + heading.magneticHeading + '<br/>' +
																	'Data: ' + data + '</p>';
			}, function() {
				page_orientacao.querySelector('#atual').innerHTML = "<br/>Orientação não pôde ser atualizado";
			}, { frequency: 1000 }
		);
	},
	bussula: function(){
		navigator.compass.watchHeading(
			function(heading){
				var grau = Math.round(heading.magneticHeading);
				document.getElementById('posicao_bussula').innerHTML = grau+"°";
				document.getElementById("bussula").style.transform = "rotate(-"+heading.magneticHeading+"deg)";
			},
			function(compassError){
				alert('Erro ao carregar a bússula');
			},
			{ frequency: 100 }
		);
	},
	camera: function(){
		document.getElementById('tirar_foto').addEventListener("click", function(){
			navigator.camera.getPicture(
				function(imageData) {
					var i = document.getElementById('foto');
					i.src = imageData;
				},
				function(message) {
					console.log(message);
				},
				{
					correctOrientation: true,
					saveToPhotoAlbum: true
				}
			);
		}, false);
	},
	audio: function(){
		var mediaTimer = null;
		var src = "http://audio.ibeat.org/content/p1rj1s/p1rj1s_-_rockGuitar.mp3";

		var media = new Media(
			src,
			function() {
				mediaTimer = null;
				var dur = media.getDuration();

				if(dur > 0){
					d = dur;
					dur = Math.round(dur);
					if(dur < 60){
						duracao = (dur < 10) ? "0"+dur : dur;
						duracao = "00:"+duracao;
					}
					info_execucao.innerHTML = "Tempo total do áudio: "+duracao+"s";
				}
			},
			function(err) {
				info_execucao.innerHTML = "Erro código: "+ err.code+" ("+ err.message+"). Áudio não foi executado.";
			}
		);

		document.getElementById('exec_audio').addEventListener("click", function(){
			var info_execucao = document.getElementById('info_execucao');

			media.play();

			if (mediaTimer == null) {
				mediaTimer = setInterval(function() {
					media.getCurrentPosition(
						function(pos) {
							if (pos > 0) {
								p = pos;
								pos = Math.round(pos);
								if(pos < 60){
									position = (pos < 10) ? "0"+pos : pos;
									position = "00:"+position;
								}
								document.getElementById('audio_position').innerHTML = "Tempo do áudio: "+position+"s";
							}
						},
						function(e) {
							document.getElementById('audio_position').innerHTML = "Erro ao mostrar tempo do áudio: " + e;
						}
					);
				}, 1);
			}
		}, false);

		document.getElementById('pause_audio').addEventListener("click", function(){
			if (media) {
				media.pause();
			}
		});

		document.getElementById('stop_audio').addEventListener("click", function(){
			if (media) {
				media.stop();
			}
			clearInterval(mediaTimer);
			mediaTimer = null;
		});

		document.getElementById('mute_audio').addEventListener("click", function(){
			if (media) {
				media.setVolume('0.0');
			}
		})

		document.getElementById('unmute_audio').addEventListener("click", function(){
			if (media) {
				media.setVolume('1.0');
			}
		})

		var mediaRec = new Media(
			"audio.mp3",
			function() {
				info_gravacao.innerHTML = "Gravou";
			},
			function(err) {
				info_gravacao.innerHTML = "Erro código: "+ err.code+". Áudio não foi gravado.";
			}
		);

		document.getElementById('gravar_audio').addEventListener("click", function(){
			var info_gravacao = document.getElementById('info_gravacao');

			mediaRec.startRecord();
			info_gravacao.innerHTML = "Gravando...<br/>";

			setTimeout(function(){
				mediaRec.stopRecord();
			}, 50000);
		}, false);

		document.getElementById('stop_gravar').addEventListener('click', function(){
			mediaRec.stopRecord();
		}, false);
	},
	backButton: function(){
		document.addEventListener('backbutton', function() {
			var activePage = $.mobile.activePage.attr('id');
			if (activePage !== 'page_inicial') {
				navigator.app.backHistory();
			} else {
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
			}
		}, false);
	},
	contatos: function() {
		document.getElementById('save_contato')
			.addEventListener("click", function() {
			var info_save_contato = document.getElementById("info_save_contato");
			info_save_contato.innerHTML = "Informações sendo salvas...";

			var save_nome_exibicao_contato 	= document.getElementById("save_nome_exibicao_contato").value;
			var save_nome_contato 			= document.getElementById("save_nome_contato").value;
			var save_nome_meio_contato 		= document.getElementById("save_nome_meio_contato").value;
			var save_sobrenome_contato 		= document.getElementById("save_sobrenome_contato").value;
			var save_prefixo_contato 		= document.getElementById("save_prefixo_contato").value;
			var save_sufixo_contato 		= document.getElementById("save_sufixo_contato").value;
			var save_apelido_contato 		= document.getElementById("save_apelido_contato").value;

			var nome_completo = new ContactName();
			nome_completo.givenName = save_nome_contato;
			nome_completo.familyName = save_sobrenome_contato;
			nome_completo.formatted = save_nome_exibicao_contato;
			nome_completo.middleName = save_nome_meio_contato;
			nome_completo.honorificPrefix = save_prefixo_contato;
			nome_completo.honorificSuffix = save_sufixo_contato;

			var save_tel_contato 	= document.getElementById("save_tel_contato").value;
			var save_cel_contato 	= document.getElementById("save_cel_contato").value;
			var save_trab_contato 	= document.getElementById("save_trab_contato").value;

			var phoneNumbers = [];
			phoneNumbers[0] = new ContactField('mobile', save_cel_contato, true); // preferred number
			phoneNumbers[1] = new ContactField('home', save_tel_contato, false);
			phoneNumbers[2] = new ContactField('work', save_trab_contato, false);

			var save_email_contato 		= document.getElementById("save_email_contato").value;
			var save_emailtrab_contato 	= document.getElementById("save_emailtrab_contato").value;

			var emails = [];
			emails[0] = new ContactField('home', save_email_contato, true); // preferred number
			emails[1] = new ContactField('work', save_emailtrab_contato, false);

			var save_endres_contato 		= document.getElementById("save_endres_contato").value;
			var save_endres_num_contato 	= document.getElementById("save_endres_num_contato").value;
			var save_endres_cidade_contato 	= document.getElementById("save_endres_cidade_contato").value;
			var save_endres_estado_contato 	= document.getElementById("save_endres_estado_contato").value;
			var save_endres_cep_contato 	= document.getElementById("save_endres_cep_contato").value;
			var save_endres_pais_contato 	= document.getElementById("save_endres_pais_contato").value;
			var save_endres_total 			= (save_endres_contato != "" && save_endres_num_contato != "") ? save_endres_contato+", "+save_endres_num_contato : "";

			var save_endtrab_contato 		= document.getElementById("save_endtrab_contato").value;
			var save_endtrab_num_contato 	= document.getElementById("save_endtrab_num_contato").value;
			var save_endtrab_cidade_contato = document.getElementById("save_endtrab_cidade_contato").value;
			var save_endtrab_estado_contato = document.getElementById("save_endtrab_estado_contato").value;
			var save_endtrab_cep_contato 	= document.getElementById("save_endtrab_cep_contato").value;
			var save_endtrab_pais_contato 	= document.getElementById("save_endtrab_pais_contato").value;

			var save_endtrab_total 			= (save_endtrab_contato != "" && save_endtrab_num_contato != "") ? save_endtrab_contato+", "+save_endtrab_num_contato : "";

			var enderecos = [];
			enderecos[0] = new ContactAddress(
				true,
				'home',
				save_endres_contato,
				save_endres_total,
				save_endres_cidade_contato,
				save_endres_estado_contato,
				save_endres_cep_contato,
				save_endres_pais_contato
			);
			enderecos[1] = new ContactAddress(
				false,
				'work',
				save_endtrab_contato,
				save_endtrab_total,
				save_endtrab_cidade_contato,
				save_endtrab_estado_contato,
				save_endtrab_cep_contato,
				save_endtrab_pais_contato
			);

			var save_work_empresa 		= document.getElementById("save_work_empresa").value;
			var save_work_departamento 	= document.getElementById("save_work_departamento").value;
			var save_work_cargo 		= document.getElementById("save_work_cargo").value;

			var organizations = [];
			organizations[0] = new ContactOrganization(false, 'work', save_work_empresa, save_work_departamento, save_work_cargo);

			var save_url1_contato = document.getElementById("save_url1_contato").value;
			var save_url2_contato = document.getElementById("save_url2_contato").value;
			var save_url3_contato = document.getElementById("save_url3_contato").value;
			var save_url4_contato = document.getElementById("save_url4_contato").value;
			var save_url5_contato = document.getElementById("save_url5_contato").value;

			var urls = [];
			urls[0] = new ContactField('',save_url1_contato);
			urls[1] = new ContactField('',save_url2_contato);
			urls[2] = new ContactField('',save_url3_contato);
			urls[3] = new ContactField('',save_url4_contato);
			urls[4] = new ContactField('',save_url5_contato);

			var save_im1_contato = document.getElementById("save_im1_contato").value;
			var save_im2_contato = document.getElementById("save_im2_contato").value;
			var save_im3_contato = document.getElementById("save_im3_contato").value;
			var save_im4_contato = document.getElementById("save_im4_contato").value;
			var save_im5_contato = document.getElementById("save_im5_contato").value;

			var ims = [];
			ims[0] = new ContactField('',save_im1_contato);
			ims[1] = new ContactField('',save_im2_contato);
			ims[2] = new ContactField('',save_im3_contato);
			ims[3] = new ContactField('',save_im4_contato);
			ims[4] = new ContactField('',save_im5_contato);

			var save_foto_contato = document.getElementById("save_foto_contato").value;

			var photos = [];
			photos[0] = new ContactField('url', save_foto_contato, true);


			var save_info_details = document.getElementById("save_info_details").value;

			var contato 			= navigator.contacts.create();
			contato.displayName 	= save_nome_exibicao_contato;
			contato.name 			= nome_completo;
			contato.nickname 		= save_apelido_contato;
			contato.phoneNumbers 	= phoneNumbers;
			contato.addresses 		= enderecos;
			contato.emails 			= emails;
			contato.organizations 	= organizations;
			contato.urls 			= urls;
			contato.ims 			= ims;
			contato.photos 			= photos;
			contato.note 			= save_info_details;

			contato.save(
				function(contact){
					info_save_contato.innerHTML = "Contato salvo com sucesso";
				},
				function(){
					info_save_contato.innerHTML = "Erro ao salvar o "+contact;
				}
			);
		});

		document.getElementById("find_contato")
			.addEventListener("click", function() {
			var find_nome_contato = document.getElementById("find_nome_contato").value;
			var info_find_contato = document.getElementById("info_find_contato");
			info_find_contato.innerHTML = 'Buscando...';
			var options      		= new ContactFindOptions();
			options.filter   		= find_nome_contato;
			options.multiple 		= true;
			options.desiredFields 	= [navigator.contacts.fieldType.id];
			options.hasPhoneNumber 	= true;
			var fields       		= [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name];
			navigator.contacts.find(
				fields,
				function(contatos) {
					info_find_contato.innerHTML = 'Encontrado '
						+ contatos.length 
						+ 'Contatos';
					var html = null;;
					contatos.forEach(function(c){
						html = html + c.id + 'Nome: ' + c.displayName + '<br />';
					});
					info_find_contato.innerHTML = html;
				},
				function(contactError) {
					info_find_contato.innerHTML = 'Erro ao procurar os contatos.';
				},
				options
			);

		});
	},
	fileSystem: function() {
		var type = window.TEMPORARY;
		var size = 10*1024*1024;
		window.requestFileSystem(
			type,
			size,
			function(fs){
				alert('Repositorio de arquivo requisitado com suceso' + fs.name);
			},
			function(error){
				alert('Erro na requisicao do arquivo' + error.code);
			}
		);
	}
}

function converteData(date){
	var d = new Date(date);
	var day = d.getDate();
	var dia = (day < 10) ? "0"+day : day;
	var mon = d.getMonth()+1;
	var mes = (mon < 10) ? "0"+mon : mon;
	var ano = d.getFullYear();

	var hour = d.getHours();
	var hora = (hour < 10) ? "0"+hour : hour;
	var min = d.getMinutes();
	var minuto = (min < 10) ? "0"+min : min;
	var sec = d.getSeconds();
	var segundo = (sec < 10) ? "0"+sec : sec;

	var data = dia + '/' + mes + '/' + ano + " às " + hora + ":" + minuto + ":" + segundo;
	return data;
}

if(navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/))
{
	app.init();
}
else{
	app.onDeviceReady();
}