/* Mapudungun app */

/* Load libraries */
var express = require('express');
var app = express();
var fs = require('fs');

/* Consts */
const $PARAM_SPANISH = 'spanish';
const $PARAM_MAPUDUNGUN = 'mapudungun';
const $ERROR_MISS_PARAMS = 'Require from and to parameters';
const $ERROR_MISS_WORD = 'Require word to translate';
const $ERROR_LENGUAGE = 'Only spanish and mapudungun';
const $ERROR_NO_TRANSLATION = 'No translation';

/* Load words db */
var db;
fs.readFile( __dirname + '/db.json', function (err, data) {
	db = JSON.parse(data.toString());
	console.log(db.length + ' words in the db.');
});

/* Route root */
app.get('/', function(req, res) {
	res.redirect('https://github.com/pabloaraya/mapudungun-backend');
});

/* Route api REST */
app.get('/api', function(req, res) {

	/* Params to translate */
	var from = req.query.from;
	var to = req.query.to;
	var word = req.query.word;

	/* Verify the word to translate */
	if(word == null){
		responseError(res, $ERROR_MISS_WORD);
		return;
	}
	/* Verify the params aren't null */
	if((from != null && to != null) && (from.length > 0 && to.length > 0)){
		
		/* Translate from Spanish */	
		if(from.toLowerCase() == $PARAM_SPANISH && to.toLowerCase() == $PARAM_MAPUDUNGUN){

			/* Loop words */			
			for(var i = 0; i < db.length; i++){
			
				/* Get key (mapudungun word) */
				var key = Object.keys(db[i])[0];

				/* get spanish words */	
				var spanish_words = db[i][key];
				for(var w = 0; w < spanish_words.length; w++){

					/* spanish word */
					var spanish_word = spanish_words[w];

					/* Verify if exits */
					if(spanish_word.indexOf(word) > -1){

						/* Response the word */
						responseSuccess(res, key);
						return;
					}
				}
			}

			/* Response if can't find the translation */
			res.status(400).send($ERROR_NO_TRANSLATION);

		/* Translate from Mapudungun */
		}else if(from.toLowerCase() == $PARAM_MAPUDUNGUN && to.toLowerCase() == $PARAM_SPANISH){

			for(var i = 0; i < db.length; i++){
	
				/* Get key (mapudungun word) */
				var key = Object.keys(db[i])[0];

				/* Verify if exits */
				if(key.indexOf(word) > -1){

					/* Response words */
					responseSuccess(res, db[i][key]);
					return;
				}
			}

			/* Response if can't find the translation */
			responseFail(res, $ERROR_NO_TRANSLATION);
		/* Other lenguage return error */
		}else{
			/* Return error */
			responseFail(res, $ERROR_LENGUAGE);
		}
	}else{
		/* Return error */
		responseError(res, $ERROR_MISS_PARAMS);
	}
});

/* Starting server */
var server = app.listen(3000, function () {

	/* Setup server */
	var host = server.address().address;
	var port = server.address().port;

	console.log('Mapudungun app listening at http://%s:%s', host, port);
});

/* Response success message */
var responseSuccess = function(context, message){
	format = {
		'statusCode': 200,
		'status'		: 'success',
		'message'		: message
	}
	context.status(200).json(format);
}

/* Response fail message */
var responseFail = function(context, message){
	format = {
		'statusCode': 200,
		'status'		: 'fail',
		'message'		: message
	}
	context.status(200).json(format);
}

/* Response error message */
var responseError = function(context, message){
	format = {
		'statusCode': 400,
		'status'		: 'error',
		'message'		: message
	}
	context.status(400).json(format);
}
