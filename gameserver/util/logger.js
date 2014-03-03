/**
 * logger.js
 *
 * Logger based on Winston
 *
 * @author alfo
 */

var winston = require('winston');

module.exports = winston;

module.exports.init = function() {

	winston.remove(winston.transports.Console);

	winston.add(winston.transports.File, { 
		filename: 'logs/server.log'
	});

	winston.add(winston.transports.Console, {
		level: 'verbose',
		colorize: true
	});

	//winston.handleExceptions(new winston.transports.File({ filename: 'logs/exceptions.log' }))

	winston.info('Logger loaded.');
}