/* Mapudungun app */

/* Load libraries */
var express = require('express');
var app = express();
var fs = require('fs');
var str2json = require('string-to-json');

/* Consts */
const $PARAM_SPANISH = 'spanish';
const $PARAM_MAPUDUNGUN = 'mapudungun';
const $ERROR_MISS_PARAMS = 'Require from and to parameters';
const $ERROR_LENGUAGE = 'Just spanish and mapudungun';

/* Load words db */
var db;
fs.readFile( __dirname + '/db.json', function (err, data) {
	db = JSON.parse(data.toString());
	console.log(db.length + ' words in the db.');
});

/* Route root */
app.get('/', function(req, res) {
	res.send('Hello World!');
});

/* Route api REST */
app.get('/api', function(req, res) {

	/* Params to translate */
	var from = req.params['from'];
	var to = req.params['to'];

	/* Verify the params aren't null */
	if((from != null && to != null) && (from.length > 0 && to.length > 0)){
		
		/* Translate from Spanish */	
		if(from.toLowerCase() == $PARAM_SPANISH){

		/* Translate from Mapudungun */
		}else if(from.toLowerCase() == $PARAM_MAPUDUNGUN){

		/* Other lenguage return error */
		}else{
			/* Return error */
			res.status(400).send($ERROR_LENGUAGE);
		}
	}else{
		/* Return error */
		res.status(400).send($ERROR_MISS_PARAMS);
	}
});

/* Starting server */
var server = app.listen(80, function () {

	/* Setup server */
	var host = server.address().address;
	var port = server.address().port;

	console.log('Mapudungun app listening at http://%s:%s', host, port);
});