/**
 * mainController.js
 *
 * Main controller of the gameserver
 *
 * @author alfo
 */

var socketio = require('../network/socketio');
var logger = require('../util/logger');
var world = require('../model/world');
var player = require('../model/player');

module.exports.init = function() {

  socketio.sockets.on('connection', function (socket) {

    logger.verbose('Websocket connection from: ' + socket.handshake.address.address);

    var authController = require('./authController')(socket, function(player){

      socket.on('disconnect', function () {
        world.broadcast("service", { msg: 'player ' + player.name + ' is now disconnected.' });
        world.removePlayer(player);
        //world.pool.removePlayer(player);
        world.broadcastUserList();

        logger.verbose('User "' + player.name + '" disconnected from: ' + socket.handshake.address.address);
      });

      var chatController = require('./chatController')(player);
      var fightController = require('./fightController')(player);
      var waitingController = require('./waitingController')(player);

      require('./chatController').sendPendingMessages(player);

    });


  });

  logger.info('Main controller started. Server is ready!');

}
