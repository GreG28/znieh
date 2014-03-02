/**
 * The chat module
 */
define(['jquery', 'socketio', 'user'], function ($, io, user) {
  console.log('chat module loaded');

  var socket = io.connect('127.0.0.1:1338');
  socket.emit('auth', {username: user.name, token: 'abc'});

  var conversations = [];

  var addConversation = function(from) {
    conversations[conversations.length] = from;
    var index = conversations.length - 1;

    $('#chat-conversations')
      .append('<li class="chat-conversation"><a href="#tab' + index + '" data-toggle="tab">' + from + '</a></li>');
    $('#chat-messages').append('<div class="tab-pane" id="tab' + index + '"><p class="chat-message"></p><input type="text" class="form-control chat-input" id="chat-input-' + index + '" placeholder="Entrez votre message..."/></div>');

    if(conversations.length == 1) {
      $('#chat-conversations > li').addClass('active');
      /*$('#chat-conversations > li > a').each(function() {
      var elem = $(this);
      setInterval(function() {
          if (elem.css('background-color') == 'rgb(66, 139, 202)') {
              elem.css('background-color', 'rgb(255, 255, 255)');
              elem.css('color', 'rgb(0, 0, 0)');
          } else {
              elem.css('background-color', 'rgb(66, 139, 202)');
              elem.css('color', 'rgb(255, 255, 255)');
          }
        }, 200);
      });*/
      $('#chat-messages > div').addClass('active');
    }

    $('#chat-input-' + index).keyup(function(e){
      if(e.keyCode == 13)
      {
        var date = moment().calendar();
        $('#tab' + index + ' > p').append('['+date+'] -> '+conversations[index]+': '+$('#chat-input-' + index).val()+'<br />');
        socket.emit('message', {target: conversations[index], msg: $('#chat-input-' + index).val()});
        $('#chat-input-' + index).val('');
      }
    });

    return index;
  };

  // In
  socket.on('service', function (data) {
    console.log(data);
    $('#console').append('Service message: ' + data.msg + '<br />');
  });

  socket.on('message', function (data) {
    var index = undefined;

    for (var i = 0; i < conversations.length; i++) {
      if(conversations[i] == data.from) index = i;
    }

    if(index == undefined) index = addConversation(data.from);

    date = moment(data.date, "X").calendar();
    $('#tab' + index + ' > p').append('['+date+'] '+data.from+' -> '+data.to+': '+data.msg+'<br />');

    $('#console').append('<strong>['+date+'] '+data.from+' -> '+data.to+': '+data.msg+'</strong><br />');

  });




    // Out
    $('#send').click(function () {
      var index = undefined;

      for (var i = 0; i < conversations.length; i++) {
        if(conversations[i] == $('#target').val()) index = i;
      }

      if(index == undefined) index = addConversation($('#target').val());

      date = moment().calendar();
      $('#tab' + index + ' > p').append('['+date+'] -> '+$('#target').val()+': '+$('#msg').val()+'<br />');

      socket.emit('message', {target: $('#target').val(), msg: $('#msg').val()});
      $('#msg').val('');
    });





    $('#send-group').click(function () {
      socket.emit('message-group', {target: $('#target').val(), msg: $('#msg').val()});
    });

});
