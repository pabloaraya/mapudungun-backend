var db2 = require('neo4j');
exports.createMapudungun = function(req, res){
	var query_const = "CREATE CONSTRAINT ON (word:Spanish) ASSERT word.word IS UNIQUE";
	db2.cypher({query: query_const}, function(err, results){
		if(err == null){
			for(var i=0; i<db.length;i++){
				var key = Object.keys(db[i])[0];
				var props_map = 'word:"' + key + '", language: "mapudungun"'; 
				var query_map = 'CREATE (word:Mapudungun {'+props_map+'}) RETURN word';
				db2.cypher({query: query_map}, function (err, results) {
					if(err == null){
						console.log(results[0].word.properties.word + ' mapundungun word added');
					}else{
						console.log(err);
					}
				});
			}
		}
	});
	res.sendStatus(200);
};

exports.createSpanish = function(req, res){
	var query_const = "CREATE CONSTRAINT ON (word:Spanish) ASSERT word.word IS UNIQUE";
	db2.cypher({query: query_const}, function(err, results){
		if(err == null){
			for(var i=0; i<db.length;i++){
				var key = Object.keys(db[i])[0];
				var values = db[i][key];
				for(var x=0;x<values.length;x++){
					var props_spa = 'word:"' + values[x] + '", language: "spanish"';
					var query_spa = 'CREATE (word:Spanish {'+props_spa+'}) RETURN word';
					db2.cypher({query: query_spa}, function (err, results){
						if(err == null){
							console.log(results[0].word.properties.word + ' spanish word added');  
						}else{
							console.log(err);
						}
					});
				}
			}
		}
	});
};

exports.deleteAll = function(req, res){
	db2.cypher({query: "match (n) delete n"}, function(err, results){
		if(err == null){
			res.sendStatus(200);
		}else{
			res.sendStatus(400);
		}   
	});
};
exports.count = function(req, res){
	db2.cypher({query: "start n=node(*) return count(n)"}, function(err, results){
		if(err == null){
			res.status(200).json({ count: results[0]["count(n)"]});
		}else{
			res.status(400).send('Error message');
		}   
	}); 
};
