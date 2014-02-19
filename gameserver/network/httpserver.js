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

function handler (req, res) {
  fs.readFile(__dirname + '/../index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(data);
  });
}

module.exports.init = function () {
	// Create server
	http = http.createServer(this.handler);
	http.listen(config.get('app:httpport'));

	logger.info('HTTP Server loaded.');
}

