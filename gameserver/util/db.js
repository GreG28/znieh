/*
 * db.js
 *
 * ORM for Znieh server
 *
 * @author alfo
 */

var crypto = require('crypto');
var Sequelize = require('sequelize');
var config = require('./config');
var logger = require('../util/logger');

var orm = undefined;

module.exports.init = function () {
	orm = new Sequelize(config.get('db:database'), config.get('db:username'), config.get('db:password'), {
	host: config.get('db:host'),
	port: config.get('db:port'),
	dialect: config.get('db:dialect'),

	define: {
		charset: 'utf8',
		collate: 'utf8_general_ci'
	},

	sync: { force: true },
	pool: { maxConnections: config.get('db:maxConnections'), maxIdleTime: 30 },
	language: 'en'
	});


	logger.info('Database loaded.');
}

module.exports.initTables = function () {

	// Users
	module.exports.User = orm.define('User', {
		username: Sequelize.STRING,
		password: {
			type: Sequelize.STRING,
			allowNull: false,
			set: function (p) {
				var sha512 = crypto.createHash('sha512');
				sha512.update(p);
				return sha512.digest('hex');
			}
		},
		email: {
			type: Sequelize.STRING,
			validate: { isEmail: true }
		},
		description: Sequelize.TEXT,
		firstname: Sequelize.STRING,
		lastname: Sequelize.STRING,
		role: Sequelize.ENUM('ROLE_ADMIN', 'ROLE_USER')
	}, {
		tableName: 'fos_user'
	});

	module.exports.PendingMessage = orm.define('PendingMessage', {
		from: Sequelize.STRING,
		to: Sequelize.STRING,
		msg: Sequelize.STRING,
		date: Sequelize.DATE
	}, {
		tableName: 'PendingMessage'
	});


	logger.info('Database schemas loaded.');
}

module.exports.testConnection = function () {
	/*orm.query('SELECT 1', null, {
    	logging: console.log,
    	plain: false,
    	raw: false
  	}).success(function(data) {
  		console.log(data);
		logger.info('Database connection a.');
  	}).error(function(err) {
  		console.log(err);
  	});
	

	orm.authenticate().complete(function (err)
	{
		if(!!err) logger.error('Database connection failed.');
		else logger.info('Database connection succeeded.');
	});*/
}