/* Neo4j connection */
var neo4j = require('neo4j');
var graph = new neo4j.GraphDatabase('http://localhost:7474');

exports.addNode = function(word, label, lenguage){
	var query_match = 'MATCH (word:'+ label +' {word: "'+ word.toLowerCase() +'"}) RETURN word';
	graph.cypher({query: query_match}, function(err, matched){
		if(err == null){
			if(matched.length == 0){
				var props_map = 'word:"' + word.toLowerCase() + '", language: "'+ lenguage +'"';
				var query_map = 'CREATE (word:'+ label +' {'+props_map+'}) RETURN word';
				graph.cypher({query: query_map}, function (err, results) {
					if(err == null){
						console.log(results[0].word.properties.word + ' mapundungun word added');
					}else{
						console.log(err);
					}
				});
			}
		}
	});
}
