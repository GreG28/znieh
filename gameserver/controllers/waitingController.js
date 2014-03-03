/**
 * waitingController.js
 *
 * Waiting controller of the gameserver: pool list, join, ...
 *
 * @author alfo
 */

var socketio = require('../network/socketio');
var config = require('../util/config');
var logger = require('../util/logger');
var world = require('../model/world');
var pools = require('../model/pools');

module.exports = function(player) {

	/**
	 * Returns the lsit of the pools
	 */
	player.socket.on("get-pools", function(data, cb) {
    	
    	logger.verbose('Player "' + player.name + '"" is trying to get list of pools.');
		
		var pools = [];

		for (var i = 0; i < config.get('pool:count'); i++) {
			var pool = {
				'name': 'pool-' + i,
				'attribute1': 'value1',
				'attribute2': 'value2',
				'attribute3': 'value3'
			};

			pools[i] = pool;
		};

		cb(pools);
	});


	/**
	 * Adds a player to a specified pool
	 */
    player.socket.on("join", function(data) {

    	logger.verbose('Player "' + player.name + '" is trying join pool #' + data.pool + '.');

    	var poolId = parseInt(data.pool);

    	// If the pool really exists
		if(poolId >= config.get('pool:count')) {
			player.socket.emit("service", { msg: 'Bad pool ID.' });
			return;
		}

		// If the player is not already registred in this pool
		if(pools[poolId].hasPlayer(player)) {
			player.socket.emit("service", { msg: 'Already registred in this pool.' });
			return;
		}

		// If the player is not already registred in another pool
		if(pools.hasPlayer(player)) {
			player.socket.emit("service", { msg: 'Already registred in a pool.' });
			return;
		}

		pools[poolId].addPlayer(player);

		player.socket.emit("service", { msg: 'Added to pool #' + data.pool + '.' });
		logger.verbose('Player "' + player.name + '" has joined pool #' + data.pool);

    });

    /**
     * Starts the search of an available battle
     */
    player.socket.on("ready", function(data) {
    	if(!pools.hasPlayer(player)) {
			player.socket.emit("service", { msg: 'You must be in a pool.' });
			return;
		}

		player.status = 'ready';
		player.socket.emit("service", { msg: 'Set as ready. Searching...' });
		logger.verbose('Player "' + player.name + '" is ready to fight.');
		player.pool.notifyPlayerReady(player);
		
    });
}
