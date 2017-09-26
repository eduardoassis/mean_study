var express = require('express'),
	status = require('http-status');

module.exports = function (wagner) {
	
	var api = express.Router();

	api.get('/users/:username', wagner.invoke(function (User) {

		return function (req, res) {

			User.findOne({ 'profile.username': req.params.username }, function (error, user) {

				if (error) {
				return res.
						status(status.INTERNAL_SERVER_ERROR).
						json({ error: error.toString() });
				}

				if (!user) {
					return res.
						status(status.NOT_FOUND).
						json({ error: 'Not found' });
				}
				res.json({ user: user });

			});

		};

	}));

	api.get('/users', wagner.invoke(function (User) {
		
		return function (req, res) {
			User.find({}, function (error, users) {
				if (error) {
					return res
							.status(status.INTERNAL_SERVER_ERROR)
							.json({error: error.toString() });
				}

				if (!users) {
					return res
							.status(status.NOT_FOUND)
							.json({error: 'Not found'});
				}
				res.json(users);
			});
		};
	}));

	return api;
};