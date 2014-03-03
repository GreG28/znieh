/**
 * socketio.js
 *
 * Network using Socket.IO library
 *
 * @author alfo
 */

var io = require('socket.io');
var httpserver = require('./httpserver');
var config = require('../util/config');
var logger = require('../util/logger');

module.exports.init = function () {
	io = io.listen(config.get('app:port'), { log: false });
	module.exports = io;

	logger.info('Networking loaded.');
	logger.info('Listening on websocket://0.0.0.0:' + config.get('app:port'));
}
