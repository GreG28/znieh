
module.exports = fightController = function(world, player) {

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

}
