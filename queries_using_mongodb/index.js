var mongodb = require('mongodb');

var uri = 'mongodb://localhost:27017/example';

mongodb.MongoClient.connect(uri, function(error, db){

	if (error) {
		console.log(error);
		process.exit(1);
	};

	var doc = {
		title : 'Jaws',
		year : 1975,
		director : 'Steven Spielberg',
		rating : 'PG',
		ratings : {
			critics: 80,
			audience: 97
		},
		screenplay : ['Peter Benchley', 'Carl Gotlieb']
	};

	var doc2 = {
		title : 'Jaws2',
		year : 1975,
		director : 'Steven Spielberg',
		rating : 'PG',
		ratings : {
			critics: 80,
			audience: 97
		},
		screenplay : ['Peter Benchley', 'Carl Gotlieb', 'Something else']
	};

	db.collection('movies').insert(doc, function(error, result) {

		if (error) {
			console.log(error);
			process.exit(1);
		};

		console.log('Insert done with success!');
		console.log('\n');

	});

	db.collection('movies').insert(doc2, function(error, result) {

		if (error) {
			console.log(error);
			process.exit(1);
		};

		console.log('Insert done with success!');
		console.log('\n');

	});

	var query = { year : 1975, rating : 'PG' }; // works like: select * from table where year = 1975 and rating = 'PG'
	var query2 = { screenplay : 'Something else' };

	db.collection('movies').find(query).toArray(function(error, docs){

		if (error) {
			console.log(error);
			process.exit(1);
		};

		console.log('Found docs with query: ' + JSON.stringify(query));
		console.log('\n');

		docs.forEach(function(doc) {
			console.log(JSON.stringify(doc));
			console.log('\n');
		});

		db.collection('movies').find(query2).toArray(function(error, docs){

			if (error) {
				console.log(error);
				process.exit(1);
			};

			console.log('\n');
			console.log('------------------------------- New query ----------------------------------------')
			console.log('\n');

			console.log('Found docs with query: ' + JSON.stringify(query2));
			console.log('\n');

			docs.forEach(function(doc) {
				console.log(JSON.stringify(doc));
				console.log('\n');
			});

			process.exit(0);

		});

	});


});