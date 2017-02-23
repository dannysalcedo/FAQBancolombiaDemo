/*Declaracion de Librerias a Usar*/
var cfenv = require("cfenv");
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var watson = require('watson-developer-cloud');
var extend = require('util')._extend;
const
cons_ubicacion = "2";
const
cons_km = "2";

/* Se declara la variable para extraer la carga Util */
// fb04200f-257c-4863-8de5-00f94f30340d --id Banco FAQ

var payload = {
	workspace_id : '6170d843-b2fc-440d-b46a-9cbe9d4190f5',

	context : {
		timezone : "America/Bogota"
	},
	input : {},
	action : {},
	link : {}
};
const
urlApi = "http://bancolombia-georeferenciacion-dllo-api.azurewebsites.net/api/Channels";

/* Se inicializa Cliente para llamado de api rest */

var Client = require('./lib/node-rest-client').Client;
var client = new Client();

function LocationsQuery(sender, args) {

	client.post(urlApi, args, function(data, response) {
		sendtext = "el cajero mas cercano es: "
				+ JSON.stringify(data.channels[0].address);
		sendTextMessage(sender, sendtext);
	});

}

/*
 * Funcion para Inicializar servicios usando las variables declaradas en Vcap
 * Bluemix
 */
function getServiceCredentialsFromBluemix(name) {
	if (process.env.VCAP_SERVICES) {
		var services = JSON.parse(process.env.VCAP_SERVICES);
		for ( var service_name in services) {
			if (service_name.indexOf(name) === 0) {
				var service = services[service_name][0];
				return {
					url : service.credentials.url,
					username : service.credentials.username,
					password : service.credentials.password,
					version_date : service.credentials.version_date
				};
			}
		}
	}
	return {};
}

/* Declaracion de variables para inicializar el servicio de Conversation */
var watsonDialogCredentials = extend({
	url : 'https://gateway.watsonplatform.net/conversation/api',
	username : '575009bf-43de-41d2-9566-00e61466b570',
	password : 'UJ0dPhK81pN4',
	version : 'v1',
	version_date : '2016-12-01'
}, getServiceCredentialsFromBluemix('conversationDemo'));

/* Se instancia Conversation */
var conversation = watson.conversation(watsonDialogCredentials);
/* Variables de entorno Locales */
var token = process.env.TOKEN
		|| "EAAYY2wPd5bMBAGq82QPg1lmIV7DYmtDNtZBRhZBAnPLmZB00SemOdCpQMTeUWz7eyaPU1R5DRkUoVYQ4E8q51FHE2C9pP9epl8NjEFvqVrt3Xan1eARQgCYo9SmQHs3JlHcTLRX1y3VKEg6mMPQXivp7B7T2TIyaPX50Ji3eAZDZD";
var secret = process.env.SECRET || 'd7d21f9498392bf6836538ad5963cecb';
/* Inicializa servidor Node.js */
var appEnv = cfenv.getAppEnv();
var app = express();
app.use(bodyParser.json());
app.listen(appEnv.port, appEnv.bind, function() {
	console.log('listening on port ' + appEnv.port);
});

/* Se adiciona Path /webhook/ para integracion con Facebook */
app.get('/webhook/', function(req, res) {
	console.log("req:", req);
	if (req.query['hub.verify_token'] === secret) {
		res.send(req.query['hub.challenge']);
	}
	res.send('Error, wrong validation token');
});

/* la funcion que envia el mensaje a Facebook */
function sendTextMessage(recipient, text) {
	request({
		url : 'https://graph.facebook.com/v2.6/me/messages',
		qs : {
			access_token : token
		},
		method : 'POST',
		json : {
			recipient : {
				id : recipient
			},
			message : {
				text : text
			}
		}
	},

	function(error, response, body) {
		if (error) {
			console.log('Error sending message: ', error);
		} else if (response.body.error) {
			console.log('Error: ', response.body.error);
		}
	});
}

function sendButtonMessage(recipient, text, buttons) {
	request({
		url : 'https://graph.facebook.com/v2.6/me/messages',
		qs : {
			access_token : token
		},
		method : 'POST',
		json : {
			recipient : {
				id : recipient
			},
			message : {
				"attachment" : {
					"type" : "template",
					"payload" : {
						"template_type" : "button",
						"text" : text,
						"buttons" : buttons
					}
				}
			}
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending message: ', error);
		} else if (response.body.error) {
			console.log('Error: ', response.body.error);
		}
	});
}

function sendGenericTemplateMessageWithTweets(recipient, author, imageUrl,
		title, url) {
	request({
		url : 'https://graph.facebook.com/v2.6/me/messages',
		qs : {
			access_token : token
		},
		method : 'POST',
		json : {
			recipient : {
				id : recipient
			},
			message : {
				"attachment" : {
					"type" : "template",
					"payload" : {
						"template_type" : "generic",
						"elements" : [ {
							"title" : author,
							"image_url" : imageUrl,
							"subtitle" : title,
							"buttons" : [ {
								"type" : "web_url",
								"url" : url,
								"title" : "View Tweet"
							} ]
						} ]
					}
				}
			}
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending message: ', error);
		} else if (response.body.error) {
			console.log('Error: ', response.body.error);
		}
	});
}

function formatTextMessage(recipient, Objdata) {
	//Se carga el conexto de la conversacion
	payload.context = Objdata.context;
	payload.action = Objdata.output.action;
	//Se realiza la operacion con la cadena de caracteres para remover ["
	sendtext = JSON.stringify(Objdata.output.text);
	ad = JSON.parse(sendtext);
	sd = new Array(1);
	sd[0] = ad;
	var a = sd[0];
	var cas;
	aa = "" + a + "";
	console.log("intents[0].confidence>",Objdata.intents[0].confidence);
	console.log("payload Value-->",payload);
	console.log("sendText Value--->",sendtext);
	console.log("aa value--->",aa);
	console.log("link-->",Objdata.output.link);
	
	if (payload.action ==="action_saludo" ||  Objdata.output.link==="no_link" ) {
	console.log("Entre a sendTextMessage")	;
		sendTextMessage(recipient, aa);
	} else {
		console.log("Entre a sendButtonMessage")	;
		//Se crea arreglo para enviar el attributo URL Button
		button = [ {
			"type" : "web_url",
			"url" : Objdata.output.link,
			"title" : Objdata.output.title_link
		} ];
		sendButtonMessage(recipient, aa, button);
	};

}

/* la funcion que hace llamado de conversation */
function callConversation(args, sender) {
	conversation.message(args, function(err, data) {
		if (err) {
			console.log('error llamando el api de conversation', JSON
					.stringify(err));
			console.error(JSON.stringify(err));
			return res.status(err.code || 500).json(err);
		}
		console.log("Data: ", data);
		formatTextMessage(sender, data);
	});

}

/* La funcion que procesa lo que se envia desde facebook e invoca Conversation */
function processEvent(event) {
	var sender = event.sender.id;
	var text;
	if (event.message && event.message.attachments
			&& event.message.attachments.length > 0) {
		lat = event.message.attachments[0].payload.coordinates.lat;
		lng = event.message.attachments[0].payload.coordinates.long;
		args = {
			data : {
				latitude : lat,

				longitude : lng,

				idType : cons_ubicacion,

				radioInKms : cons_km
			},
			headers : {
				"Content-Type" : "application/json"
			}
		};
		LocationsQuery(sender, args);
	} else if (event.message && event.message.text) {
		text = event.message.text;
		payload.input = {
			text : text
		};

		callConversation(payload, sender);
	}
}

/* Script pra recibir los mensajes desde facebook en /webhook/ */
app.post('/webhook/', function(req, res) {
	console.log("entre a post del webhook");
	messaging_events = req.body.entry[0].messaging;
	for (i = 0; i < messaging_events.length; i++) {
		event = req.body.entry[0].messaging[i];
		processEvent(event);
	}
	res.sendStatus(200);
});
