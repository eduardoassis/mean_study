var superagent = require('superagent'),
	assert = require('assert'),
	app = require('../server');

describe('server', function() {

	var server;

	beforeEach(function(){
		server = app().listen(3000);
	});

	afterEach(function () {
		server.close();
	});

	it('prints out "Home page" when user goes to /', function (done) {
		superagent.get("http://localhost:3000/", function (error, res) {
			assert.ifError(error);
			assert.equal(res.status, 200);
			assert.equal(res.text, "Home page");
			done();
		});
	});
});