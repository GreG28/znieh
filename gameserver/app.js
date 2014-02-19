/**
 * server.js
 * 
 * Main file for Znieh game.
 *
 * @author alfo
 * @version 0.1.2
 */
"use strict";

var serverLoadStart = new Date();
var os = require('os');
var util = require('util');
//var process = require('process');
console.log('Server is starting...');
console.log('Load start is at: ' + serverLoadStart.toString())
console.log('Available memory: ' + Math.round(os.freemem()/1048576) + 'M, total memory: ' + Math.round(os.totalmem()/1048576) + 'M');
console.log('Used memory: ' + (process.memoryUsage().rss/1048576).toFixed(2) + "M");

/*
 * Loading dependencies
 */
var logger = require('./util/logger');
var config = require('./util/config');
var db = require('./util/db');
var httpserver = require('./network/httpserver');
var socketio = require('./network/socketio');

var port = 1337;

/*
 * Librairies configuration
 */
logger.init();
config.init();
db.init();
db.initTables();
db.testConnection();
httpserver.init();
socketio.init();


console.log('Server loaded in: ' + Math.abs(new Date() - serverLoadStart) + 'ms');
console.log('Used memory: ' + (process.memoryUsage().rss/1048576).toFixed(2) + "M");

// World

var world = require('./model/world');

var skillHandler = require('./skillHandler');
var battle = require('./battle');

world.init();

// Database
world.db.init(world.config);
world.db.initTables();

// Pools
world.pool.init(world);

// Battle
world.battle = battle;

// Player class
var Player = require('./player');

// Handler test
world.handlers.skills = skillHandler;
world.handlers.skills.loadSpells();
world.handlers.skills.loadSkills();

/*
 * Controller
 */
socketio.on('connection', function (socket) {

  var authController = require('./authController')(socket, world, function(user){
    var player = new Player(user.username, socket);
    world.players.push(player);

    socket.emit("welcome", player.name);
    world.broadcast("service", { msg: 'Player ' + player.name + ' is now connected.' });
    world.broadcastUserList();
    

    socket.on('disconnect', function () {
      world.broadcast("service", { msg: 'player ' + player.name + ' is now disconnected.' });
      world.removePlayer(player);
      world.pool.removePlayer(player);
      world.broadcastUserList();
      console.log("User " + player.name + " is now disconnected.");
    });

    var waitingController = require('./waitingController')(world, player);
    var fightController = require('./fightController')(world, player);

  });

  
});





