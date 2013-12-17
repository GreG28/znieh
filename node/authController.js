var db = require('./db');
var crypto = require('crypto');

module.exports = authController = function(socket, callback) {

	socket.on("auth", function(data) {
		//db.User.find({where: {username: data.username}}).success(function(user){
			//var hash = crypto.createHash('sha512').update(data.password + '{' + user.salt + '}');
			//hash = crypto.createHash('sha512').update(hash).digest('binary');
			//hash = crypto.createHash('sha512').update(hash);

			//var digest = hash.digest('base64');
			//if(digest == user.password) {
			//	socket.emit("service", { msg: 'OK' });
			//}

			user = {
				username: data.username
			};
			
			socket.emit("service", { msg: 'Auth: OK' });

			callback(user);

		//});
    });
}
