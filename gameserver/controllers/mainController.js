/**
 * mainController.js
 *
 * Main controller of the gameserver
 *
 * @author alfo
 */

var socketio = require('../network/socketio');
var config = require('../util/config');
var logger = require('../util/logger');
var world = require('../model/world');
var player = require('../model/player');
var pools = require('../model/pools');

module.exports.init = function() {
  "use strict";
  
  socketio.sockets.on('connection', function (socket) {

    logger.verbose('Websocket connection from: ' + socket.handshake.address.address);

    var authController = require('./authController')(socket, function(player){

      socket.on('disconnect', function () {
        logger.info('Socket of player "' + player.name + '" is now disconnected. Waiting 30 seconds before deleting player instance.')
        
        player.disconnectTimeout = setTimeout(function() {
          world.broadcast("service", { msg: 'player ' + player.name + ' is now disconnected.' });
          world.removePlayer(player);
          pools.removePlayer(player);
          world.broadcastUserList();

          logger.verbose('User "' + player.name + '" disconnected (Timeout expired).');
        }, config.get('disconnect:timeout') * 1000);
        
        
      });

      var chatController = require('./chatController')(player);
      var fightController = require('./fightController')(player);
      var waitingController = require('./waitingController')(player);

      require('./chatController').sendPendingMessages(player);

    });


  });

  logger.info('Main controller started. Server is ready!');

}
