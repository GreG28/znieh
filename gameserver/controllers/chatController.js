/**
 * chatController.js
 *
 * Chat server
 *
 * @author alfo
 */

 var socketio = require('../network/socketio');
 var logger = require('../util/logger');
 var db = require('../util/db');
 var world = require('../model/world');

 module.exports = function(player) {

 	player.socket.on("message", function(data) {
	    // If user is connected
	    isOnline = false;
	    for(var i=0; i < world.players.length; i++) {
	    	if(world.players[i].name == data.target) {
	    		world.players[i].socket.emit("message", {
	    			from: player.name,
	    			to: data.target,
	    			msg: data.msg,
	    			connected: true,
	    			date: Date.now() / 1000
	    		});

	    		isOnline = true;
	    		break;
	    	}
	    }

	    // Is user is not connected
	    if(!isOnline) {
	    	var message = db.PendingMessage.build({
	    		from: player.name,
	    		to: data.target,
	    		msg: data.msg,
	    		date: Date.now()
	    	});

	    	message
	    	.save()
	    	.complete(function(err) {
	    		if(!!err) {
	    			logger.error('Error while saving message: ', err);
	    		}
	    	});
	    }
 	});

 	player.socket.on("friends-list", function(data) {
 		//TODO: Waiting for @onedkr API implementation
 		var friends = ["test", "test2", "test3"];

 		player.socket.emit("friends-list", friends);
 		
 	});
}

module.exports.sendPendingMessages = function(player) {
	db.PendingMessage
	.findAll({ where: {to: player.name } })
	.complete(function(err, messages) {
		if(!!err) {
			logger.error('Error while reading pending messages: ', err);
		} else {
			for (var i = 0; i < messages.length; i++) {
				player.socket.emit("message", {
					from: messages[i].from,
					to: messages[i].to,
					msg: messages[i].msg,
					date: messages[i].date / 1000
				});

				messages[i].destroy();
			}
		}
	});
}