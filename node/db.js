/*
 * ORM for Znieh server
 *
 * @author alfo
 */

var crypto = require('crypto');
var Sequelize = require('sequelize');

var orm = new Sequelize('DATABASE', 'USERNAME', 'PASSWORD', {
	host: 'localhost',
	port: 3306,
	dialect: 'mysql',

	define: {
		charset: 'utf8',
		collate: 'utf8_general_ci'
	},

	sync: { force: true },
	pool: { maxConnections: 5, maxIdleTime: 30 },
	language: 'en'
});

var User = orm.define('User', {
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
	tableName: 'User'
});


// Create tables
//orm.sync();



	

// For require.js
module.exports = orm;
module.exports.User = User;

