var db2 = require('neo4j');
exports.createAll = function(req, res){
	for(var i=0;i<db.length;i++){
		var key = Object.keys(db[i])[0];
		var values = db[i][key];
		for(var x=0;x<values.length;x++){
			var query = 'START n=node(*), m=node(*) ' +
			'where has(n.word) and has(m.word) ' +
			'and n.word="'+key+'" ' +
			'and m.word="'+values[x]+'" ' +
			'create (n)-[:MEANS {value:1}]->(m)';
			db2.cypher({query: query}, function (err, results) {
				if(err == null){
					res.sendStatus(200);
				}else{
					res.sendStatus(400);
				}
			});
		}
	}
};

exports.deleteAll = function(req, res){
	db2.cypher({query: "start r=relationship(*) delete r"}, function(err, results){
		if(err == null){
			res.sendStatus(200);
		}else{
			res.sendStatus(400);
		}   
	});
};

exports.count = function(req, res){

};
