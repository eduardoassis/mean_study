var mongodb = require('mongodb');

var uri = 'mongodb://localhost:27017/example';

mongodb.MongoClient.connect(uri, function(error, db) { 

	db.collection('movies').remove({}, function(error){

		if (error) {
			console.log(error);
			process.exit(1);
		};

		console.log("Cleaning the collection ... ");
		process.exit(0);
	});
	
});

