/**
 * The chat module
 */
 define(['jquery', 'socketio', 'moment', 'user', 'socketHandler'], function ($, io, moment, user, socket) {
  console.log('chat module loaded');

  // Initialisation
  //var socket = io.connect('127.0.0.1:1337');
  var conversations = [];

  // Utility functions
  var initChat = function() {
    socket.emit('friends-list');

    conversations[conversations.length] = "Friends list";

    $('#chat-conversations')
    .append('<li class="chat-conversation"><a href="#tab0" data-toggle="tab">Friends list</a></li>');
    $('#chat-messages').append('<div class="tab-pane" id="tab0"><ul class="chat-message"></ul></div>');

    $('#chat-conversations > li').addClass('active');
    $('#chat-messages > div').addClass('active');

    console.log('Chatbox initialized');

  };

  var addConversation = function(from) {
    conversations[conversations.length] = from;
    var index = conversations.length - 1;

    $('#chat-conversations')
    .append('<li class="chat-conversation" id="convers' + index + '"><a href="#tab' + index + '" data-toggle="tab">' + from + '</a></li>');
    $('#chat-messages').append('<div class="tab-pane" id="tab' + index + '"><ul class="chat-messages"></ul><input type="text" class="form-control chat-input" id="chat-input-' + index + '" placeholder="Entrez votre message..."/></div>');

    $('#chat-input-' + index).keyup(function(e){
      if(e.keyCode == 13)
      {
        var date = moment().calendar();
        $('#tab' + index + ' > ul').append('<li class="right clearfix">');
        //$('#tab' + index + ' > ul').append('<span class="chat-img pull-left"><img src="http://placehold.it/50/55C1E7/fff&text=You" alt="User Avatar" class="img-circle" /></span>');
        $('#tab' + index + ' > ul').append('<div class="chat-body clearfix">');
        $('#tab' + index + ' > ul').append('<div class="header">');
        $('#tab' + index + ' > ul').append('<strong class="primary-font">You</strong>');
        $('#tab' + index + ' > ul').append('<small class="pull-right text-muted"><span class="glyphicon glyphicon-time"></span>' + date + '</small>');
        $('#tab' + index + ' > ul').append('</div>');
        $('#tab' + index + ' > ul').append('<p>' + $('#chat-input-' + index).val() + '</p>');
        $('#tab' + index + ' > ul').append('</div>');
        $('#tab' + index + ' > ul').append('</li>');

        $('#chat-conversations > li.active').scrollTop($('#chat-conversations > li.active').scrollHeight);


        //$('#tab' + index + ' > p').append('<span class="msg">['+date+'] -> '+conversations[index]+': '+$('#chat-input-' + index).val()+'</span><br />');
        socket.emit('message', {target: conversations[index], msg: $('#chat-input-' + index).val()}); 
        $('#chat-input-' + index).val('');
      }
    });

    return index;
  };

  var handleFriendListClick = function(handler) {

    for (var i = 0; i < conversations.length; i++) {
      if(conversations[i] == $(handler.target).data('name')) index = i;
    }

    if(index === undefined) index = addConversation($(handler.target).data('name'));

    $('#chat-conversations > li').removeClass('active');
    $('#chat-messages > div').removeClass('active');
    $('#chat-conversations > li#convers' + index).addClass('active');
    $('#chat-messages > div#tab' + index).addClass('active');

  };



  

  //socket.emit('auth', {username: user.name, token: 'abc'}, function(success) {
    //if(success) {
     // console.log('Connected to chat server.');


      socket.on('message', function (data) {
        var index = null;
        for (var i = 0; i < conversations.length; i++) {
          if(conversations[i] == data.from) index = i;
        }

        if(index === null) index = addConversation(data.from);

        date = moment(data.date, "X").calendar();
        $('#tab' + index + ' > ul').append('<li class="left clearfix">');
        //$('#tab' + index + ' > ul').append('<span class="chat-img pull-right"><img src="http://placehold.it/50/55C1E7/fff&text=' + data.from + '" alt="User Avatar" class="img-circle" /></span>');
        $('#tab' + index + ' > ul').append('<div class="chat-body clearfix">');
        $('#tab' + index + ' > ul').append('<div class="header">');
        $('#tab' + index + ' > ul').append('<small class="text-muted"><span class="glyphicon glyphicon-time"></span>' + date + '</small>');
        $('#tab' + index + ' > ul').append('<strong class="pull-right primary-font">' + data.from + '</strong>');
        $('#tab' + index + ' > ul').append('</div>');
        $('#tab' + index + ' > ul').append('<p>' + data.msg + '</p>');
        $('#tab' + index + ' > ul').append('</div>');
        $('#tab' + index + ' > ul').append('</li>');

        //$('#tab' + index + ' > p').append('<span class="msg">['+date+'] '+data.from+' -> '+data.to+': '+data.msg+'</span><br />');
        
        $('#console').append('<strong>['+date+'] '+data.from+' -> '+data.to+': '+data.msg+'</strong><br />');

      });

      socket.on('friends-list', function (data) {

        for (var i = 0; i < data.length; i++) {
          $('#tab0 > ul').append('<li><a id="friend' + i + '" data-name="' + data[i] + '">' + data[i] + '</a></li>');

          $('#friend' + i).on('click', function(handler) {
            var index = null;

            for (var i = 0; i < conversations.length; i++) {
              if(conversations[i] == $(handler.target).data('name')) index = i;
            }

            if(index === null) index = addConversation($(handler.target).data('name'));

            $('#chat-conversations > li').removeClass('active');
            $('#chat-messages > div').removeClass('active');
            $('#chat-conversations > li#convers' + index).addClass('active');
            $('#chat-messages > div#tab' + index).addClass('active');

          });
        }

      });

      initChat();

      $('#close-chat').click(function() {
        $('#chat').css('display', 'none');
      });

      $('#open-chat').click(function() {
        $('#chat').css('display', 'inline');
      });

    //} else {
    //  console.log('Chat: connection error');
    //}
  //});



});
