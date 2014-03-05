/**
 * pools.js
 *
 * Pools instances
 *
 * @author alfo
 */

var config = require('../util/config');
var logger = require('../util/logger');
var battle = require('../model/battle');

var pools = [];
var size = 0;

module.exports.init = function() {
	size = config.get('pool:count');

	// Init each pool with default arrays and functions
	for(var i = 0; i < config.get('pool:count'); i++) {

		pools[i] = {
			players: [],
			hasPlayer: function(player) {
				for(var i=0; i < this.players.length; i++)
					if(player.name === this.players[i].name) return true;
			    return false;
			},
			addPlayer: function(player) {
				player.pool = this;
				this.players.push(player);
			},
			notifyPlayerReady: function(player) {
				for(var i=0; i < this.players.length; i++) {
					if(this.players[i].status == 'ready' && this.players[i].name != player.name) {
						player.socket.emit("service", { msg: 'Game found! Other player is: ' + this.players[i].name });
						this.players[i].socket.emit("service", { msg: 'Game found! Other player is: ' + player.name });

						var leftOrRight = Math.round(Math.random());

						if(leftOrRight) {
							player.socket.emit("service", { msg: 'You are playing on the left side.' });
							this.players[i].socket.emit("service", { msg: 'You are playing on the right side.' });
						} else {
							player.socket.emit("service", { msg: 'You are playing on the right side.' });
							this.players[i].socket.emit("service", { msg: 'You are playing on the left side.' });
						}
					
						// TODO: Yes/No
						player.status = 'fighting';
						this.players[i].status = 'fighting';

						player.battle = battle.new(player, this.players[i]);
						this.players[i].battle = battle;

						return;
					}
				}

				player.socket.emit("service", { msg: 'No other player available. Waiting...' });
			}
		};
	}

	module.exports = pools;

	module.exports.hasPlayer = function(player) {
		for(var i = 0; i < size; i++)
			for(var j=0; j < pools[i].players.length; j++)
				if(player.name === pools[i].players[j].name)
					return true;
		
		return false;
	}

	// When a player get disconnected
	module.exports.removePlayer = function(player) {

		// TODO: Check when player is in a game.

		for(var i = 0; i < size; i++)
			for(var j=0; j < pools[i].players.length; j++)
				if(player.name === pools[i].players[j].name) {
					pools[i].players.splice(j, 1);
		    		return;
				}
	}

	logger.info('Pools initiated.');
}

