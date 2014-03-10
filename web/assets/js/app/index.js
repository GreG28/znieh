define(['jquery'], function ($) {
  console.log('index loaded');

  $('document').ready(function() {
    $('img.village').on({
      'mouseover' : function() {
        $(this).attr('src','/znieh/web/img/village.png');
      },
      mouseout : function() {
        $(this).attr('src','/znieh/web/img/villageombre.png');
      }
    });
    $('img.arene').on({
      'mouseover' : function() {
        $(this).attr('src','/znieh/web/img/arene.png');
      },
      mouseout : function() {
        $(this).attr('src','/znieh/web/img/areneombre.png');
      }
    });
  });
});