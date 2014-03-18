define(['jquery', 'user', 'bootstrap'], function ($, user) {
  "use strict";

	$('#modalFight').modal({
    backdrop: 'static',
    keyboard: false,
    show: true
  });

  $('#modalPools').modal({
    backdrop: 'static',
    keyboard: false,
    show: false
  });

  $('#modalReady').modal({
    backdrop: 'static',
    keyboard: false,
    show: false
  });

  $('#modalGameAcceptance').modal({
    backdrop: 'static',
    keyboard: false,
    show: false
  });

  var socket;

  socket = io.connect('127.0.0.1:1337');
  $('#console').append('Connected<br>');

  socket.emit('auth', { username: user.name , token: 'abc' }, function(success) {
    console.log("auth ->" + success);
  });

  // In
  socket.on('welcome', function (data) {
    console.log(data);
    $('#console').append('Server has send welcome message. Your name is : ' + data + '<br />');
  });

  socket.on('service', function (data) {
    console.log(data);
    $('#console').append('Service message : ' + data.msg + '<br />');
  });

  socket.on('players', function (data) {
    console.log('players ->' + data);
    $('#console').append('Current players : ' + data.players + '<br />');
  });

  socket.on('search-started', function (data) {
    console.log('search-started ->' + data);
    $('#console').append('La recherche de partie a commencé : ' + data + '<br />');
    $('#modalReady .modal-footer').prepend('<p>The server is looking for another player inside that pool,<br> to play with you</p>');
  });

  socket.on('search-restarted', function (data) {
    console.log('search-restarted ->' + data);
    $('#console').append('La recherche de partie a recommencé : ' + data + '<br />');
    $('#modalGameAcceptance').modal('hide');
    $('#modalReady').modal('show');
    /*remise à jours du modal acceptance */
    $('#modalGameAcceptance #p_name').empty();
    $('#modalGameAcceptance #p_side').empty();
    $('#modalGameAcceptance #p_value1').empty();
  });

  // the server send a player to fight with
  socket.on('battle-found', function (data) {
    console.log(data);
    $('#modalGameAcceptance #p_name').append(data.player);
    $('#modalGameAcceptance #p_side').append(data.side);
    $('#modalGameAcceptance #p_value1').append(data.value1);
    $('#modalReady').modal('hide');
    $('#modalGameAcceptance').modal('show');
  });

  socket.on('placement-started', function (data) {
    console.log(data);
    $('#console').append('Service message : placement started <br />');
    // We redirect the player to the game page !
    redirect();
    });

  // Out
  $('#join').click(function () {
    //we take the value of the selected pool
    var pool_selected = $("#modalPools .modal-body .active .input").attr("value");
    $('#console').append('<strong>Trying to join pool...</strong><br>');
    $('#join').button('loading');

    socket.emit('join', {pool: pool_selected}, function (data) {
      /*When we are sure the player is resgistered inside a pool*/
      if(data === true) {
        $('#modalPools').modal('hide');
        $('#modalReady').modal('show');
      }
      else
      {
        $('#join').button('reset');
      }
    });
  });

  $('#ready').click(function () {
    $('#ready').button('loading');
    $('#console').append('<strong>Ready to fight !</strong><br>');
    socket.emit('ready', null, function (data) {
      /* Waiting to receive a proposal of another player to fight*/
      if(data === true)
      {
        $('#console').append('<strong>Looking for a game...</strong><br>');
      }
      else
      {
        $('#ready').button('reset');
        $('#console').append('<strong>You cannot search for another player !</strong><br>');
        $('#console').append('Wait and retry later ...<br>');
      }
    });
  });

  $('#fight').click(function () {
    $('#fight').button('loading');
    $('#console').append('<strong>Loading ...</strong><br>');

    socket.emit('get-pools', null, function (data) {
      console.log(data);
      var size = data.length;
      var div_labels = $('#modalPools .modal-body .btn-group');
      for(var i = 0 ; i < size ; i=i+1 )
      {
        div_labels.append("<label class=\"btn btn-primary\"><input class=\"input\" type=\"radio\" name=\"options\" value=\""+i+"\"><h4>"+data[i].name+"</h4><p>Nombre de points "+data[i].points+"</p><p>"+data[i].playerCount+" joueurs en attente</p></input></label>");
      }
      $('#modalFight').modal('hide');
      $('#modalPools').modal('show');
    });
    
  });

  $('#modalPools .modal-body div').click(function () {
    $('#join').removeAttr('disabled');
  });

  $('#Acceptance_YES').click(function() {
    $('#Acceptance_NO').prop('disabled',true);
    $('#Acceptance_YES').prop('disabled',true);
    socket.emit('accept-player', true, function (data) {
      console.log(data);
      // Callback
      // the player accept to fight this enemy
      // now you have to hide this area and let the page with the map to load !
    });
  });

  $('#Acceptance_NO').click(function() {
    $('#Acceptance_NO').prop('disabled',true);
    $('#Acceptance_YES').prop('disabled',true);
    socket.emit('accept-player', false, function (data) {
      console.log(data);
      // Callback
      // the server has to found another enemy
      // and we ask him to send another
    });
  });
});
