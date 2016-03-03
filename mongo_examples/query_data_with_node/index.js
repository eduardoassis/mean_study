// Obs.: Read the file 'import-data' to excute correctly this example

var MongoClient = require('mongodb').MongoClient,
	assert = require('assert'),
	ObjectId = require('mongodb').ObjectID,
	url = 'mongodb://localhost:27017/test';

var findRestaurants = function(db, callback) {

	var cursor = db.collection('restaurants').find();

	cursor.each(function(error, doc) {

		assert.equal(error, null);

		if (doc) {

			console.log(JSON.stringify(doc));

		} else {

			callback();

		}


	});

};

MongoClient.connect(url, function(error, db) {

	assert.equal(error, null);

	findRestaurants(db, function() {
		console.log('Done!');
		db.close();
	});

});