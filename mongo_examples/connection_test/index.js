var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var uri = 'mongodb://localhost:27017/test';

MongoClient.connect(uri, function(error, db) {

	assert.equal(null, error, "The error should be null! But it's: \n" + error );
	console.log("Connected correctly to server.");
	db.close();
});