var express = require('express')
	, router = express.Router(),
	wagner = require('wagner-core'),
	mongoose = require('mongoose');

module.exports = function() {

	var app = express();

	app.use('/api/v1', require('./controllers')(wagner));

	app.get('/', function(req, res){
		res.send('Home page');
	});

	return app;
};