/**
 * fightController.js
 *
 * Fight controller of the gameserver: pool list, join, ...
 *
 * @author alfo
 */

var socketio = require('../network/socketio');
var logger = require('../util/logger');
var map = require('../model/map');
var world = require('../model/world');

module.exports = function(player) {

	player.socket.on("next-turn", function(data) {
		if(player.status != "fighting") return -1;

		if(player.battle == undefined) return -2;

		if(player.battle.player1.name == player.name ^ player.battle.turn == 1) {
			player.socket.emit('service', { msg: 'Next turn!'});

			// Turn = !(Turn-1)+1
			player.battle.turn = (!(player.battle.turn - 1) + 1);
		} else {
			player.socket.emit('service', { msg: 'You are not allowed to change turn!'});
		}
	});

	player.socket.on('select-map', function(data, callback) {
		if(player.battle.map !== undefined) {
			player.battle.map = map.getRandomMap();
		}

		callback('map1.json');
		player.socket.emit('service', { msg: 'Map selected: map1.json'});

	});

	player.socket.on('get-units', function(data, callback) {
		//TODO: Fetch available units
		//TODO: Send available units
	});

	player.socket.on("place-unit", function(data, callback) {
		if(player.battle.mapSelected === false) {
			callback(false);
			player.socket.emit('service', { msg: 'Map is not selected.'});
			return -1;
		}

		if(player.status != "placement-started") {
			callback(false);
			player.socket.emit('service', { msg: 'Placement has not started yet.'});
			return -2;
		}

		if(player.battle == undefined) {
			callback(false);
			player.socket.emit('service', { msg: 'No battle found'});
			return -3;
		}

		if(player.battle.finishedUnitPlacement) {
			callback(false);
			player.socket.emit('service', { msg: 'Unit placement is over.'});
			return -4;
		}

		player.battle.map.layers[data.x][data.y] = data.unit;
	});

	player.socket.on("accept-player", function(data) {
		
		
		if(player.battle.player1.name == player.name) {
			player.battle.player1accepted = data;
		}
		else {
			player.battle.player2accepted = data;
		}

		// If both player have answered
		if(player.battle.player1accepted !== undefined && player.battle.player2accepted !== undefined) {
			// If at least one player have denied the battle
			if(player.battle.player1accepted === false || player.battle.player2accepted === false) {
				player.battle.player1.status = 'ready';
				player.battle.player2.status = 'ready';

				player.battle.player1.socket.emit("search-restarted", null);
				player.battle.player2.socket.emit("search-restarted", null);

				return;

			} else {
				player.battle.player1.status = 'placing-units';
				player.battle.player2.status = 'placing-units';

				player.battle.player1.socket.emit("placement-started", null);
				player.battle.player2.socket.emit("placement-started", null);

				return;
			}
		}


	});

}
