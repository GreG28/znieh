 /**
  * The module loaded on the building page
  */
 define(['jquery', 'jqueryui', 'router', 'bootstrap'], function ($) {
    console.log('building module loaded');

    /** for popover stay on focus **/
    (function($) {
        var oldHide = $.fn.popover.Constructor.prototype.hide;

        $.fn.popover.Constructor.prototype.hide = function() {
            if (this.options.trigger === "hover" && this.tip().is(":hover")) {
                var that = this;
                // try again after what would have been the delay
                setTimeout(function() {
                    return that.hide.call(that, arguments);
                }, that.options.delay.hide);
                return;
            }
            oldHide.call(this, arguments);
        };

    })(jQuery);

    $(document).ready(function() {
        $('body').on('click', '.unlock-object', function(e) {
          e.preventDefault();
            var id = $(this).data("id");
            var obj = $(this);
            obj.button('loading');
            $.get(Routing.generate('znieh_villagegame_public_unlock', {object : id}))
            .done(function(data) {
              console.log('done');
              obj.button('reset');
              obj.text('Débloqué');
            })
            .fail(function(e) {
              console.log('fail');
            });
         });
         $('.game-object').popover().parent().on('click', '.unlock-object', function() {
              console.log('click');
          });
         var form = $('#znieh_unitgamebundle_weapon').parent();
         $(form).hide();
         $( ".draggable" ).draggable({ cursor: "move", helper: "clone", revert: "invalid" });
         $('#create-weapon').on('click', function(){
             $.ajax({
                 type     : "POST",
                 cache    : false,
                 url      : $(form).attr('action'),
                 data     : $(form).serialize(),
                 success  : function(data) {
                     alert(data);
                     $(form)[0].reset();
                 },
                 error  : function(data) {
                     alert(data);
                     $(form)[0].reset();
                 }
             });
         });
         $("#droppable").droppable({
              drop: function( event, ui ) {
                  console.log($('#znieh_unitgamebundle_weapon_parts_' + ui.draggable.data("id")));
                  $('#znieh_unitgamebundle_weapon_parts_' + ui.draggable.data("id")).prop('checked', true);
              }
         });
     });
 });
