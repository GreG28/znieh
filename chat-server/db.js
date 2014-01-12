/*
 * ORM for Znieh server
 *
 * @author alfo
 */

var crypto = require('crypto');
var Sequelize = require('sequelize');
var orm = undefined;

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
}
module.exports.orm = orm;

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
	tableName: 'User'
});

