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
            var gameobj = $('.draggable').find("[data-id='" + id + "']");
            console.log(gameobj);
            obj.button('loading');
            $.get(Routing.generate('znieh_villagegame_public_unlock', {object : id}))
            .done(function(data) {
              console.log('done');
              obj.button('reset');
              console.log(gameobj);
              gameobj.parent().data('bs.popover').options.content = 'Débloqué';
              console.log(obj.closest('img.draggable'));
              obj.closest('img.draggable').addClass('unlocked');
            })
            .fail(function(e) {
              console.log('fail');
            });
         });
         $('.game-object').popover();
         var form = $('#znieh_unitgamebundle_weapon').parent();
         $(form).hide();
         $('.draggable').on('click', function(e){
             e.preventDefault();
             if ($(this).hasClass('unlocked')) {
                var checkBox = $('#znieh_unitgamebundle_weapon_parts_' + $(this).data("id"));
                $(this).toggleClass('selected');
                checkBox.prop('checked', !checkBox.attr('checked'));
                console.log($(this).parent());
                $(this).parent().clone().appendTo( "#weapon-container");
             } else {
              alert("Vous devez débloquer ce composant avant de pouvoir l'utiliser.");
             }
         });
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
