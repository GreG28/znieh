/**
 * httpserver.js
 *
 * Network using HTTP server
 *
 * @author alfo
 */

var http = require('http');
var config = require('../util/config');
var logger = require('../util/logger');
var fs = require('fs');

module.exports = http;

module.exports.init = function () {

	http.createServer(function (req, res) {
		fs.readFile(__dirname + '/../index.html',
			function (err, data) {
				if (err) {
					res.writeHead(500);
					return res.end('Error loading index.html');
				}
				res.writeHead(200, {'Content-Type': 'text/html'});
				res.end(data);
		});
	}).listen(config.get('app:httpport'));

	logger.info('HTTP Server loaded.');
	logger.info('Listening on http://0.0.0.0:' + config.get('app:httpport'));
}

