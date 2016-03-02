var MongoClient = require('mongodb').MongoClient,
	assert = require('assert'),
	ObjectId = require('mongodb').ObjectID,
	url = 'mongodb://localhost:27017/test';

var insertDocument = function(db, collectionName, document, callback) {

	db.collection(collectionName).insertOne(document, function(error, result) {

		assert.equal(error, null, "The error should be null, but it's: \n" + error);

		console.log('Inserted a document into the ' + collectionName + ' collection.');

		if (callback) {

			callback();

		};

	});

};

var restaurant = {
	"address" : {
		"street" : "2 Avenue",
		"zipcode" : "10075",
		"building" : "1480",
		"coord" : [ -73.9557413, 40.7720266 ]
	},
	"borough" : "Manhattan",
	"cuisine" : "Italian",
	"grades" : [
		{
			"date" : new Date("2014-10-01T00:00:00Z"),
			"grade" : "A",
			"score" : 11
		},
		{
			"date" : new Date("2014-01-16T00:00:00Z"),
			"grade" : "B",
			"score" : 17
		}
	],
	"name" : "Vella",
	"restaurant_id" : "41704620"
};

MongoClient.connect(url, function(error, db) {

	assert.equal(error, null, "The error should be null, but it's: \n" + error);

	insertDocument(db, 'restaurants', restaurant, function(){
		db.close();
	});

});