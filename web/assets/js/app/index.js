define(['jquery'], function ($) {
  console.log('index loaded');

  $('document').ready(function() {
    $('img.village').on({
      'mouseover' : function() {
        $(this).attr('src','../img/village.png');
      },
      mouseout : function() {
        $(this).attr('src','../img/villageombre.png');
      }
    });
    $('img.arene').on({
      'mouseover' : function() {
        $(this).attr('src','../img/arene.png');
      },
      mouseout : function() {
        $(this).attr('src','../img/areneombre.png');
      }
    });
  });
});
