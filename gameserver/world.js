
var World = {};
module.exports = World;


World.io = undefined;
World.config = undefined;
World.handlers = [];

World.players = [];
World.pool = require('./pool');

World.battle = undefined;

World.broadcast = function(key, value) {
	this.io.sockets.emit(key, value);
}

World.broadcastUserList = function() {
    var str = '';

    for(var i=0; i < this.players.length; i++) {
		var player = this.players[i];
		str += player.name + ', ';
    }
    this.io.sockets.emit("players", { players: str });
}

World.removePlayer = function(player) {
    for(var i=0; i < this.players.length; i++) {
		if(player.name === this.players[i].name) {
		    this.players.splice(i, 1);
		    return;
		}
    }
}
