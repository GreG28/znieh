
module.exports = waitingController = function(world, player) {

	


    player.socket.on("join", function(data) {

    	var poolId = parseInt(data.pool);

    	// If the pool really exists
		if(poolId >= world.config.get('pool:count')) {
			player.socket.emit("service", { msg: 'Bad pool ID.' });
			return;
		}

		// If the player is not already registred in this pool
		if(world.pool[poolId].hasPlayer(player)) {
			player.socket.emit("service", { msg: 'Already registred in this pool.' });
			return;
		}

		// If the player is not already registred in another pool
		if(world.pool.hasPlayer(player)) {
			player.socket.emit("service", { msg: 'Already registred in a pool.' });
			return;
		}

		world.pool[poolId].addPlayer(player);

		player.socket.emit("service", { msg: 'Added to pool #' + data.pool + '.' });

    });

    player.socket.on("ready", function(data) {
    	if(!world.pool.hasPlayer(player)) {
			player.socket.emit("service", { msg: 'You must be in a pool.' });
			return;
		}

		player.status = 'ready';
		player.socket.emit("service", { msg: 'Set as ready. Searching...' });
		player.pool.notifyPlayerReady(player);
		
    });
}
