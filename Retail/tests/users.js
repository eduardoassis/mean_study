var assert = require('assert');
var express = require('express');
var superagent = require('superagent');
var wagner = require('wagner-core');

var URL_ROOT = 'http://localhost:3000';

describe('User API', function() {
  var server;
  var User;

  before(function() {
    var app = express();

    // Bootstrap server
    models = require('../models/models')(wagner);
    app.use(require('../controllers')(wagner));

    server = app.listen(3000);

    // Make User model available in tests
    User = models.User;
  });

  after(function() {
    // Shut the server down when we're done
    server.close();
  });

  beforeEach(function(done) {
    // Make sure users are empty before each test
    User.remove({}, function(error) {
      assert.ifError(error);
      done();
    });
  });

  it('can load a user by id', function(done) {
    // Create a single user
    var username = "eduardoassis";

    var u = {
    	profile: {
    		username: username,
    		picture: "http://www.ronitbaras.com/wp-content/uploads/2009/05/clip-image0032.gif"
    	},
    	data: {
    		oauth: "teste"
    	}
    };

    User.create(u, function(error, doc) {

      assert.ifError(error);

      var url = URL_ROOT + '/users/' + username;

      superagent.get(url, function(error, res) {
    	assert.ifError(error);
        var result;

        assert.doesNotThrow(function() {
          result = JSON.parse(res.text);
        });
        assert.ok(result.user);
        assert.equal(result.user.profile.username, username);
        done();

      });
    });
  });

  it('should load all users in data base', function (done) {
  	
  	var users = [
  		{	profile: {	username: "user1",	picture: "http://teste.teste.png"	},	data: {	oauth: "teste1"	}	},
  		{	profile: {	username: "user2",	picture: "http://teste.teste.png"	},	data: {	oauth: "teste2"	}	},
  		{	profile: {	username: "user3",	picture: "http://teste.teste.png"	},	data: {	oauth: "teste3"	}	},
  		{	profile: {	username: "user4",	picture: "http://teste.teste.png"	},	data: {	oauth: "teste4"	}	},
		{	profile: {	username: "user5",	picture: "http://teste.teste.png"	},	data: {	oauth: "teste5"	}	}
  	];

  	User.create(users, function (error, users) {

  		var url = URL_ROOT + '/users';

  		superagent.get(url, function (error, res) {
			assert.ifError(error);

			var result;
			assert.doesNotThrow(function () {
				result = JSON.parse(res.text);
			});

			assert.equal(result.length, 5);
			done();
  		});
  		
  	})

  });

});