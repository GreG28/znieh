/**
 * battle.js
 *
 * Battle instance
 *
 * @author alfo
 */

var http = require('http');
var logger = require('../util/logger');


module.exports.init = function() {

	logger.info('Battle factory initiated.');
}

module.exports.new = function(p1, p2) {
	return {
		player1: p1,
		player2: p2,

		player1accepted: undefined,
		player2accepted: undefined,

		mapSelected: false,
		map: undefined,
		
		turn: 1,
		map: undefined,

		log: {
			data = [];

			append: function(type, content) {
				// type is 'attack', 'death', ...
				// content is an array: 'target', 'damages', ...
				var entry = {
					date: new Date(),
					type: type,
					content: content
				}
			}
		}

		victory: function(winner) {
			// TODO: Set Symfony URL
			http.get("###", function(res) {
			 	console.log("Got response: " + res.statusCode);
			}).on('error', function(e) {
			  	console.log("Got error: " + e.message);
			}); 

			if(winner == 1) {
				this.player1.socket.emit("service", { msg: 'You are successful!'});
				this.player2.socket.emit("service", { msg: 'Game over!'});
			} else {
				this.player1.socket.emit("service", { msg: 'Game over!'});
				this.player2.socket.emit("service", { msg: 'You are successful!'});
			}

			player1.status = 'init';
			player2.status = 'init';
		}


	};
}

