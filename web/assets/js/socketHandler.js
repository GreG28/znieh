/**
 * The socket handler module
 */
define(['jquery', 'socketio', 'user'], function ($, io, user) {
  console.log('Socket Handler is loading');

  // Initialisation
  socket = io.connect('127.0.0.1:1337');

  socket.emit('auth', {username: user.name, token: 'abc'}, function(success) {
    if(success) {
      console.log('Socket: auth successful');
      require(['app/chat']);
    } else {
      console.log('Socket: connection error');
    }
  });

  window.socket = socket;
  return socket;
});
