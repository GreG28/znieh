var http = require('http');
var Battle = {};
module.exports = Battle;

Battle.init = function() {

}

Battle.new = function(p1, p2) {
	return {
		player1: p1,
		player2: p2,
		turn: 1,
		map: undefined,

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

