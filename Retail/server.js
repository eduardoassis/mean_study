var express = require('express')
	, router = express.Router();

module.exports = function() {

	var app = express();

	app.use(require('./controllers'));

	app.get('/', function(req, res){
		res.send('Home page');
	});


	return app;
};