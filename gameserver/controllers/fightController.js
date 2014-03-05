/**
 * fightController.js
 *
 * Fight controller of the gameserver: pool list, join, ...
 *
 * @author alfo
 */

var socketio = require('../network/socketio');
var logger = require('../util/logger');
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

	player.socket.on("place-unit", function(data) {
		if(player.status != "fighting") return -1;

		if(player.battle == undefined) return -2;

		if(player.battle.finishedUnitPlacement) return -3;

		player.battle.map[data.x][data.y] = data.unit;
	});

	player.socket.on("accept-player", function(data) {
		
		
		if(player.battle.player1.name == player.name)
			player.battle.player1accepted = data
	});

}
