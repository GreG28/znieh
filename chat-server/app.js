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
var config = require('nconf');



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
    .file({ file: 'config.json' });

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

var users = [];
var pendingMessages = [];

/*
 * Controller
 */
io.sockets.on('connection', function (socket) {

  var user = undefined;

  socket.on("auth", function(data) {

    socket.get('authenticated', function(err, value) {
      // If user is trying to auth a second time
      if(value == true) {
        var endpoint = socket.handshake.address;
        console.log('[INFO] Possible hack detected: Player connected from '+ endpoint.address + ' is trying to auth again -> player kicked.')
        socket.emit("service", { msg: 'Auth: Already authenticated' });
        socket.disconnect();
        return -1;
      }
    });

    if(data.token == undefined || data.token == '')
    {
      var endpoint = socket.handshake.address;
      console.log('[INFO] Possible hack detected: Player connected from '+ endpoint.address + ' has send an empty token -> player kicked.')
      socket.emit("service", { msg: 'Auth: Empty token' });
      socket.disconnect();
      return -2;
    }
    

    //world.db.User.find({where: {username: data.username, token: data.token}})
    //.success(function(user){

      user = {
        username: data.username,
        socket: socket
      };

      users.push(user);
      
      socket.set('authenticated', true);
      socket.emit("service", { msg: 'Auth: OK' });

      for(var i=0; i < pendingMessages.length; i++) {
        if(data.username === pendingMessages[i].to) {
            socket.emit("message", {
              from: pendingMessages[i].from,
              to: pendingMessages[i].to,
              msg: pendingMessages[i].msg,
              date: pendingMessages[i].date
            });
            pendingMessages.splice(i, 1);
            i--;
        }
      }

    //});

  });

  socket.on("message", function(data) {
    //TODO: On suppose que l'utilisateur existe

    // If user is connected
    isOnline = false;
    for(var i=0; i < users.length; i++) {
      if(users[i].username == data.target) {
        users[i].socket.emit("message", {
          from: user.username,
          to: data.target,
          msg: data.msg,
          connected: true,
          date: Date.now() / 1000
        });

        isOnline = true;
        break;
      }
    }

    if(!isOnline) {
      message = {
        from: user.username,
        to: data.target,
        msg: data.msg,
        date: Date.now() / 1000
      };
      pendingMessages.push(message);
    }



    socket.emit("message", {
          from: user.username,
          to: data.target,
          msg: data.msg,
          date: Date.now() / 1000
        });
  });

    

  socket.on('disconnect', function () {
    for(var i=0; i < users.length; i++) {
      if(socket === users[i].socket) {
          users.splice(i, 1);
          return;
      }
    }
  });

  
});





