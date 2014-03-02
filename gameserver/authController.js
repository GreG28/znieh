var crypto = require('crypto');

module.exports = authController = function(socket, world, callback) {

	socket.on("auth", function(data, cb) {

		var isAuthenticated = false;

		socket.get('authenticated', function(err, value) {
			isAuthenticated = value;
		});

		// If user is trying to auth a second time
		if(isAuthenticated) {
			var endpoint = socket.handshake.address;
			console.log('[INFO] Possible hack detected: Player connected from '+ endpoint.address + ' is trying to auth again -> player kicked.')
			socket.emit("service", { msg: 'Auth: Already authenticated' });
			cb(false);
			socket.disconnect();
			return -1;
		}

		// If no token is provided
		if(data.token == undefined || data.token == '')
		{
			var endpoint = socket.handshake.address;
			console.log('[INFO] Possible hack detected: Player connected from '+ endpoint.address + ' has send an empty token -> player kicked.')
			socket.emit("service", { msg: 'Auth: Empty token' });
			cb(false);
			socket.disconnect();
			return -2;
		}
		

		//world.db.User.find({where: {username: data.username, token: data.token}})
		world.db.User.find({where: {username: data.username}})
		.success(function(user){

			user = {
				username: data.username
			};
			
			socket.set('authenticated', true);
			cb(true);
			socket.emit("service", { msg: 'Auth: OK' });
			console.log("User " + data.username + " is now logged in.")

		});
    });
}
