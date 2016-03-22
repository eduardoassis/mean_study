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

var insertDocuments = function(db, collectionName, documents, callback) {

	db.collection(collectionName).insertMany(documents, function(error, result){

		assert.equal(error, null, "The error it should have been null, but it's: \n" + error);
		assert.equal(documents.length, result.insertedCount, "It should have been inserted " + documents.length + " but was inserted " + result.insertedCount);

		console.log('Inserted a batch of documents into the ' + collectionName + ' collection.');

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

var restaurants = [

	{"address": {"building": "1007", "coord": [-73.856077, 40.848447], "street": "Morris Park Ave", "zipcode": "10462"}, "borough": "Bronx", "cuisine": "Bakery", 
	"grades": [{"date": new Date(1393804800000), "grade": "A", "score": 2},
	{"date": new Date(1378857600000), "grade": "A", "score": 6},
	{"date": new Date(1358985600000), "grade": "A", "score": 10},
	{"date": new Date(1322006400000), "grade": "A", "score": 9},
	{"date": new Date(1299715200000), "grade": "B", "score": 14}], "name": "Morris Park Bake Shop", "restaurant_id": "30075445"},

	{"address": {"building": "469", "coord": [-73.961704, 40.662942], "street": "Flatbush Avenue", "zipcode": "11225"}, "borough": "Brooklyn", "cuisine": "Hamburgers", 
	"grades": [{"date": new Date(1419897600000), "grade": "A", "score": 8},
	{"date": new Date(1404172800000), "grade": "B", "score": 23},
	{"date": new Date(1367280000000), "grade": "A", "score": 12},
	{"date": new Date(1336435200000), "grade": "A", "score": 12}], "name": "Wendy'S", "restaurant_id": "30112340"},

	{"address": {"building": "351", "coord": [-73.98513559999999, 40.7676919], "street": "West   57 Street", "zipcode": "10019"}, "borough": "Manhattan", "cuisine": "Irish", 
	"grades": [{"date": new Date(1409961600000), "grade": "A", "score": 2},
	{"date": new Date(1374451200000), "grade": "A", "score": 11},
	{"date": new Date(1343692800000), "grade": "A", "score": 12},
	{"date": new Date(1325116800000), "grade": "A", "score": 12}], "name": "Dj Reynolds Pub And Restaurant", "restaurant_id": "30191841"},

	{"address": {"building": "2780", "coord": [-73.98241999999999, 40.579505], "street": "Stillwell Avenue", "zipcode": "11224"}, "borough": "Brooklyn", "cuisine": "American ", 
	"grades": [{"date": new Date(1402358400000), "grade": "A", "score": 5},
	{"date": new Date(1370390400000), "grade": "A", "score": 7},
	{"date": new Date(1334275200000), "grade": "A", "score": 12},
	{"date": new Date(1318377600000), "grade": "A", "score": 12}], "name": "Riviera Caterer", "restaurant_id": "40356018"},

	{"address": {"building": "97-22", "coord": [-73.8601152, 40.7311739], "street": "63 Road", "zipcode": "11374"}, "borough": "Queens", "cuisine": "Jewish/Kosher", 
	"grades": [{"date": new Date(1416787200000), "grade": "Z", "score": 20},
	{"date": new Date(1358380800000), "grade": "A", "score": 13},
	{"date": new Date(1343865600000), "grade": "A", "score": 13},
	{"date": new Date(1323907200000), "grade": "B", "score": 25}], "name": "Tov Kosher Kitchen", "restaurant_id": "40356068"},

	{"address": {"building": "8825", "coord": [-73.8803827, 40.7643124], "street": "Astoria Boulevard", "zipcode": "11369"}, "borough": "Queens", "cuisine": "American ", 
	"grades": [{"date": new Date(1416009600000), "grade": "Z", "score": 38},
	{"date": new Date(1398988800000), "grade": "A", "score": 10},
	{"date": new Date(1362182400000), "grade": "A", "score": 7},
	{"date": new Date(1328832000000), "grade": "A", "score": 13}], "name": "Brunos On The Boulevard", "restaurant_id": "40356151"},

	{"address": {"building": "2206", "coord": [-74.1377286, 40.6119572], "street": "Victory Boulevard", "zipcode": "10314"}, "borough": "Staten Island", "cuisine": "Jewish/Kosher", 
	"grades": [{"date": new Date(1412553600000), "grade": "A", "score": 9},
	{"date": new Date(1400544000000), "grade": "A", "score": 12},
	{"date": new Date(1365033600000), "grade": "A", "score": 12},
	{"date": new Date(1327363200000), "grade": "A", "score": 9}], "name": "Kosher Island", "restaurant_id": "40356442"},

	{"address": {"building": "7114", "coord": [-73.9068506, 40.6199034], "street": "Avenue U", "zipcode": "11234"}, "borough": "Brooklyn", "cuisine": "Delicatessen", 
	"grades": [{"date": new Date(1401321600000), "grade": "A", "score": 10},
	{"date": new Date(1389657600000), "grade": "A", "score": 10},
	{"date": new Date(1375488000000), "grade": "A", "score": 8},
	{"date": new Date(1342569600000), "grade": "A", "score": 10},
	{"date": new Date(1331251200000), "grade": "A", "score": 13},
	{"date": new Date(1318550400000), "grade": "A", "score": 9}], "name": "Wilken'S Fine Food", "restaurant_id": "40356483"},

	{"address": {"building": "6409", "coord": [-74.00528899999999, 40.628886], "street": "11 Avenue", "zipcode": "11219"}, "borough": "Brooklyn", "cuisine": "American ", 
	"grades": [{"date": new Date(1405641600000), "grade": "A", "score": 12},
	{"date": new Date(1375142400000), "grade": "A", "score": 12},
	{"date": new Date(1360713600000), "grade": "A", "score": 11},
	{"date": new Date(1345075200000), "grade": "A", "score": 2},
	{"date": new Date(1313539200000), "grade": "A", "score": 11}], "name": "Regina Caterers", "restaurant_id": "40356649"},

	{"address": {"building": "1839", "coord": [-73.9482609, 40.6408271], "street": "Nostrand Avenue", "zipcode": "11226"}, "borough": "Brooklyn", "cuisine": "Ice Cream, Gelato, Yogurt, Ices", 
	"grades": [{"date": new Date(1405296000000), "grade": "A", "score": 12},
	{"date": new Date(1373414400000), "grade": "A", "score": 8},
	{"date": new Date(1341964800000), "grade": "A", "score": 5},
	{"date": new Date(1329955200000), "grade": "A", "score": 8}], "name": "Taste The Tropics Ice Cream", "restaurant_id": "40356731"},

	{"address": {"building": "2300", "coord": [-73.8786113, 40.8502883], "street": "Southern Boulevard", "zipcode": "10460"}, "borough": "Bronx", "cuisine": "American ", 
	"grades": [{"date": new Date(1401235200000), "grade": "A", "score": 11},
	{"date": new Date(1371600000000), "grade": "A", "score": 4},
	{"date": new Date(1339718400000), "grade": "A", "score": 3}], "name": "Wild Asia", "restaurant_id": "40357217"}

];

MongoClient.connect(url, function(error, db) {

	assert.equal(error, null, "The error should be null, but it's: \n" + error);

	insertDocument(db, 'restaurants', restaurant, function(){
		db.close();
	});

});

MongoClient.connect(url, function(error, db) {

	assert.equal(error, null, "The error should be null, but it's: \n" + error);

	insertDocuments(db, 'restaurants', restaurants, function(){
		db.close();
	});

});