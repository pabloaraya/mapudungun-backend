/* Mapudungun app */

/* Load libraries */
var express = require('express');
var app = express();
var fs = require('fs');

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
	var from = req.query.from;
	var to = req.query.to;
	var word = req.query.word;

	/* Verify the params aren't null */
	if((from != null && to != null) && (from.length > 0 && to.length > 0)){
		
		/* Translate from Spanish */	
		if(from.toLowerCase() == $PARAM_SPANISH){
			
			for(var i = 0; i < db.length; i++){
			
				var key = Object.keys(db[i])[0];	
				var spanish_words = db[i][key];
				for(var w = 0; w < spanish_words.length; w++){

					var spanish_word = spanish_words[w];
					if(spanish_word.indexOf(word) > -1){
						console.log(spanish_words[w] + ' -> ' + key);
						res.send(key);
						break;
					}
				}
			}
		/* Translate from Mapudungun */
		}else if(from.toLowerCase() == $PARAM_MAPUDUNGUN){

			res.send('from mapudungun');
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
