/**
 * server.js
 * 
 * Main file for Znieh game.
 *
 * @author alfo
 * @version 0.1.2
 */


/*
 * Loading dependencies
 */
var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');
var db = require('./db');
var skillHandler = require('./skillHandler');
var battle = require('./battle');
var config = require('nconf');
var Moniker = require('moniker');
var port = 1337;



/*
 * Librairies configuration
 */

// Setup nconf to use (in-order):
//   1. Command-line arguments
//   2. Environment variables
//   3. A file located at 'config.json'
//
config.argv()
    .env()
    .file({ file: 'config.json' })
    .file({ file: 'config.user.json'});

// Reduce log level
io.set('log level', 1);


// used to dump config file
/*config.save(function (err) {
    fs.readFile('config.user.json', function (err, data) {
        console.dir(JSON.parse(data.toString()))
    });
});*/

/*
 * Beginning of app launch
 */


app.listen(config.get('app:port'));



function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(data);
  });
}

// World

var world = require('./world');
world.config = config;
world.io = io;
world.db = db;

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
io.sockets.on('connection', function (socket) {

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





