var express = require('express');

module.exports = function (wagner) {

	var api = express.Router();

	api.use(require('./users')(wagner));

	return api;
};