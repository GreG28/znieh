/**
 * authController.js
 *
 * Authentication controller of the gameserver
 *
 * @author alfo
 */

var socketio = require('../network/socketio');
var logger = require('../util/logger');
var world = require('../model/world');
var player = require('../model/player');
var db = require('../util/db');
var crypto = require('crypto');

module.exports = function(socket, callback) {

	socket.on("auth", function(data) {

		logger.verbose('Authentication packet from: ' + socket.handshake.address.address);

		var isAuthenticated = false;

		socket.get('authenticated', function(err, value) {
			isAuthenticated = value;
		});

		// If user is trying to auth a second time
		if(isAuthenticated) {
			var endpoint = socket.handshake.address;
			logger.info('Possible hack detected from: '+ endpoint.address + ' (trying to auth again -> player kicked).');
			socket.emit("service", { msg: 'Auth: Already authenticated' });
			socket.disconnect();
			return -1;
		}

		// If no token is provided
		if(data.token == undefined || data.token == '')
		{
			var endpoint = socket.handshake.address;
			logger.info('Possible hack detected from: '+ endpoint.address + ' (has send an empty token -> player kicked).');
			socket.emit("service", { msg: 'Auth: Empty token' });
			socket.disconnect();
			return -2;
		}
		

		//world.db.User.find({where: {username: data.username, token: data.token}})
		db.User.find({where: {username: data.username}})
		.success(function(user){

			user = {
				username: data.username
			};
			
			socket.set('authenticated', true);
			socket.emit("service", { msg: 'Auth: OK' });
			logger.info("User " + data.username + " is now logged in.");

			var p = new player(user.username, socket);
    		world.players.push(p);
    		socket.emit("welcome", p.name);
		    world.broadcast("service", { msg: 'Player ' + p.name + ' is now connected.' });
		    world.broadcastUserList();

			callback(p);

		});
    });
}
