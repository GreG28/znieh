var gameSocket = undefined;

gameSocket = io.connect('127.0.0.1:1337');

gameSocket.emit('auth', { username: '{{ app.user.username }}' , token: '{{ app.user.token }}' });



// In
gameSocket.on('connecting', function () {
  $('#console').append('Connecting...<br />');
});

gameSocket.on('connect', function () {
  $('#console').append('Connected<br>');
});

gameSocket.on('disconnect', function () {
  $('#console').append('<strong>You got disconnected from server.</strong><br />');
});

gameSocket.on('connect_failed', function () {
  $('#console').append('<strong>Cannot establish connection to server.</strong><br />');
});

gameSocket.on('reconnect_failed', function () {
  $('#console').append('<strong>Cannot establish connection to server.</strong><br />');
});

gameSocket.on('reconnect', function () {
  $('#console').append('Sucessfully reconnected to server.<br>');
});

gameSocket.on('reconnecting', function () {
  $('#console').append('Reconnecting to server...<br />');
});


gameSocket.on('error', function () {
  $('#console').append('An error has occured: server is offline.<br />');
});

gameSocket.on('welcome', function (data) {
  console.log(data);
  $('#console').append('Server has send welcome message. Your name is : ' + data + '<br />');
});

gameSocket.on('service', function (data) {
  console.log(data);
  $('#console').append('Service message : ' + data.msg + '<br />');
});

gameSocket.on('players', function (data) {
  console.log(data);
  $('#console').append('Current players : ' + data.players + '<br />');
});

gameSocket.on('pools-list', function (data) {
  console.log(data);
  $('#pools').html(JSON.stringify(data));
});


// Out
$('#join').click(function () {
  gameSocket.emit('join', {pool: 1}, function (data) {
    $('#console').append('<strong>Callback</strong><br>');
  });
  $('#console').append('<strong>Trying to join pool...</strong><br>');
});

$('#auth').click(function () {
  gameSocket.emit('auth', { username: '{{ app.user.username }}' , token: '{{ app.user.token }}' });
  $('#console').append('<strong>Trying to auth...</strong><br>');
});

$('#ready').click(function () {
  gameSocket.emit('ready', null);
  $('#console').append('<strong>Ready to fight. Looking for a game...</strong><br>');
});

$('#fight').click(function () {
  gameSocket.emit('get-pools', null);
  $('#pools').html('<strong>Loading ...</strong><br>');
});

 $('#next-turn').click(function () {
  gameSocket.emit('next-turn', null);
});
