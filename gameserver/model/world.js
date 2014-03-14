/**
 * world.js
 *
 * World: contains all methods concerning the world
 *
 * @author alfo
 */
var socketio = undefined;
var logger = require('../util/logger');

module.exports.init = function() {
	this.handlers = [];
	this.players = [];
	this.battle = undefined;
	socketio = require('../network/socketio');

	logger.info('World initiated.');
}


module.exports.broadcast = function(key, value) {
	socketio.sockets.emit(key, value);
}

module.exports.broadcastUserList = function() {
    var str = '';

    for(var i=0; i < this.players.length; i++) {
		var player = this.players[i];
		str += player.name + ', ';
    }
    socketio.sockets.emit("players", { players: str });
}

module.exports.removePlayer = function(player) {
    for(var i=0; i < this.players.length; i++) {
		if(player.name === this.players[i].name) {
		    this.players.splice(i, 1);
		    return;
		}
    }
}
