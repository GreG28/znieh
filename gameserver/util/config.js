/**
 * config.js
 *
 * Main configuration of the game server
 *
 * @author alfo
 */

var config = require('nconf');
var logger = require('../util/logger');

module.exports = config;

module.exports.init = function () {
	// Setup nconf to use (in-order):
	//   1. Command-line arguments
	//   2. Environment variables
	//   3. A file located at 'config.json'
	config.argv()
    .env()
    .file({ file: 'config.json' })
    .file({ file: 'config.user.json'});


	logger.info('Configuration loaded.');
}

module.exports.save = function(filename) {
	filename = filename || 'config.user.json';

	config.save(function (err) {
	    fs.readFile(filename, function (err, data) {
	        console.dir(JSON.parse(data.toString()))
	    });
	});

	logger.info("Configuration saved to " + filename);
}