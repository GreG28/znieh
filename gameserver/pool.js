
var Pool = {};
module.exports = Pool;

Pool.init = function(world) {

	// Init each pool with default arrays and functions
	for(var i = 0; i < world.config.get('pool:count'); i++) {

		this[i] = {
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

						var battle = world.battle.new(player, this.players[i]);

						player.battle = battle;
						this.players[i].battle = battle;

						return;
					}
				}

				player.socket.emit("service", { msg: 'No other player available. Waiting...' });
			}
		};
	}

	// Init vars and functions for every pools
	this.size = world.config.get('pool:count');

	this.hasPlayer = function(player) {
		for(var i = 0; i < this.size; i++)
			for(var j=0; j < this[i].players.length; j++)
				if(player.name === this[i].players[j].name)
					return true;
		
		return false;
	}

	// When a player get disconnected
	this.removePlayer = function(player) {

		// TODO: Check when player is in a game.

		for(var i = 0; i < this.size; i++)
			for(var j=0; j < this[i].players.length; j++)
				if(player.name === this[i].players[j].name) {
					this[i].players.splice(j, 1);
		    		return;
				}
	}
}

