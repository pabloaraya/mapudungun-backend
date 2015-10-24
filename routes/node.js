/* Neo4j connection */
var neo4j = require('neo4j');
var graph = new neo4j.GraphDatabase('http://localhost:7474');
var util = require(__dirname + '/../util/node');
/* Load words db */
var fs = require('fs');
var db; 
console.log(__dirname + '/../db.json');
fs.readFile( __dirname + '/../db.json', function (err, data) {
	db = JSON.parse(data.toString());
}); 
exports.createMapudungun = function(req, res){
	for(var i=0; i<db.length;i++){
		//var word = Object.keys(db[i])[0];
		util.addNode(Object.keys(db[i])[0], 'Mapudungun', 'mapudungun');
		//var query_match = 'MATCH (word:Mapudungun {word: "'+ word +'"}) RETURN word';
		/*graph.cypher({query: query_match}, function(err, matched){
			if(err == null){
				if(matched.length == 0){
					var props_map = 'word:"' + word.toLowerCase() + '", language: "mapudungun"';
					var query_map = 'CREATE (word:Mapudungun {'+props_map+'}) RETURN word';
					graph.cypher({query: query_map}, function (err, results) {
						if(err == null){
							console.log(results[0].word.properties.word + ' mapundungun word added');
						}else{
							console.log(err);
						}
					});
				}
			}
		});*/
	}
	res.sendStatus(200);
};

exports.createAll = function(req, res){
	for(var i=0; i<db.length;i++){
		var word = Object.keys(db[i])[0];
		graph.createNode({word: word, lenguage: 'mapudungun', index: i}).save(function(err_map, node_map){
			if(err_map == null){
				console.log(node_map.data.word + ' mapudungun word added');
				var values = db[node_map.data.index][node_map.data.word];
				for(var x=0; x<values.length; x++){
					graph.createNode({word: values[x], lenguage: 'spanish'}).save(function(err_spa, node_spa){
						if(err_spa == null){
							console.log(node_spa.data.word + ' spanish word added');
							node_map.createRelationshipTo(node_spa, 'means', {value: 1}, function(err, relation){

							});
						}else{
							console.log(err_spa);
						}
					});
				}
			}else{
				console.log(err_map);
			}
		});

		//for(var x=0;x<values.length;x++){

			//util.addNode(values[x], 'Spanish', 'mapudungun');
			/*var query_match = 'MATCH (word:Mapudungun {word: "'+ values[x] +'"}) RETURN word';
			graph.cypher({query: query_match}, function(err, matched){
				if(err == null){
					if(matched.length == 0){
						var spanish = values[x];
						console.log(spanish);	
						var props_map = 'word:"' + spanish.toLowerCase() + '", language: "spanish"';
						var query_map = 'CREATE (word:Spanish {'+props_map+'}) RETURN word';
						graph.cypher({query: query_map}, function (err, results) {
							if(err == null){
								console.log(results[0].word.properties.word + ' spanish word added');
							}else{
								console.log(err);
							}
						});
					}
				}
			});*/
		//}
	}
	res.sendStatus(200);
};

exports.deleteAll = function(req, res){
	graph.cypher({query: "match (n) delete n"}, function(err, results){
		if(err == null){
			res.sendStatus(200);
		}else{
			res.sendStatus(400);
		}   
	});
};
exports.count = function(req, res){
	graph.cypher({query: "start n=node(*) return count(n)"}, function(err, results){
		if(err == null){
			res.status(200).json({ count: results[0]["count(n)"]});
		}else{
			res.status(400).send('Error message');
		}   
	}); 
};
