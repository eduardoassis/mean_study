var MongoClient = require('mongodb').MongoClient,
	assert = require('assert'),
	ObjectId = require('mongodb').ObjectID,
	url = 'mongodb://localhost:27017/test', 
	lineReader = require('line-reader'),
	Promise = require('bluebird');

var cleanCollection = function(db, collectionName, callback) {

	db.collection(collectionName).remove({}, function(error){

		assert.equal(error, null, "The error it should have been null, but it was: \n" + error);

		console.log("Collection " + collectionName + " cleaned! \n");
		
		if (callback) {
			callback();
		};

	});

};

var insertDocuments = function(db, collectionName, documents) {

	db.collection(collectionName).insertMany(documents, function(error, result){

		assert.equal(error, null, "The error it should have been null, but it's: \n" + error);
		assert.equal(documents.length, result.insertedCount, "It should have been inserted " + documents.length + " but was inserted " + result.insertedCount);

		console.log('Inserted a batch of documents into the ' + collectionName + ' collection.');

	});

};

var file_path = "../data/dataset.json";

var fillCollection = function(db, collectionName, file_path, callback) {

	var eachLine = Promise.promisify(lineReader.eachLine);
	var documents = [];

	eachLine(file_path, function(line) {

		var doc = JSON.parse(line);

		doc.grades.forEach(function(grade) {

			var date = grade["date"];
			var newDate = new Date(date["$date"]);
			grade["date"] = newDate;

		});

		documents.push(doc);

	}).then(function() {

		while(documents.length > 0) {
			insertDocuments(db, collectionName, documents.splice(0, 999));
		};


	}).then(function(){

		if (callback) {
			callback();
		};

	}).catch(function(err) {

		console.error(err);

	});

};


MongoClient.connect(url, function(error, db) {

	cleanCollection(db, "restaurants", function(){

		var setUpDB = Promise.promisify(fillCollection);

		setUpDB(db, "restaurants", file_path)
		.then(function(){

			console.log('Done already!!!');
			db.close();
			process.exit(0);

		}).catch(function(error){
			throw error;
		});

	});

});