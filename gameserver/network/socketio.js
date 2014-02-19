/**
 * socketio.js
 *
 * Network using Socket.IO library
 *
 * @author alfo
 */

var io = require('socket.io');
var config = require('../util/config');
var logger = require('../util/logger');

module.exports = io;

module.exports.init = function () {
	io.listen(config.get('app:port'), { log: false });

	logger.info('Networking loaded.');
}
