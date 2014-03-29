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

        $('.game-object').popover();
        $('.container-case').popover();
        var form = $('#znieh_unitgamebundle_weapon').parent();

        function isWeaponBuilding() {

        }

        /* Unlock object */
        $('body').on('click', '.unlock-object', function(e) {
            e.preventDefault();
            var id = $(this).data("id");
            var text = $(this).html();
            var obj = $(this);
            var img = $('body').find("[data-id='" + id + "']");
            var popover = img.parent();
            obj.button('loading');
            $.get(Routing.generate('znieh_villagegame_public_unlock', {object : id}))
            .done(function(data) {
              obj.button('reset');
              obj.text('Débloqué');
              popover.attr("data-content", popover.attr("data-content").replace(text, "Débloqué"));
              img.addClass('unlocked');
            })
            .fail(function(e) {
              console.log('fail');
              obj.button('reset');
            });
         });

        /* Select component */
         $('.draggable').on('click', function(e){
             e.preventDefault();
             if ($(this).hasClass('unlocked')) {
                var root = $(this).closest('.root');
                var previous = $(root).find('.selected');
                /* remove previous selection and un weapon-container */
                previous.removeClass('selected');
                $("#weapon-container").find("[data-id='" + $(previous).data("id") +"']").remove();

                var checkBox = $('#znieh_unitgamebundle_weapon_parts_' + $(this).data("id"));
                $(this).toggleClass('selected');
                checkBox.prop('checked', !checkBox.attr('checked'));
                //console.log($(this).parent());
                $(this).parent().clone().appendTo("#weapon-container");
             } else {
              $('.modal').modal('show');
             }
         });

         /* Validate Weapon creation */
         $('#create-weapon').on('click', function(){
            // console.og($().children());
            $("#weapon-container").children().fadeOut("slow");
            $('.draggable').removeClass('selected');
            $.ajax({
                 type     : "POST",
                 cache    : false,
                 url      : $(form).attr('action'),
                 data     : $(form).serialize(),
                 success  : function(data) {
                     $("#save-weapon-container").find('.empty:first').append('<img src="/znieh/web/img/weapons/' + data.img + '.png" class="img-responsive">');
                     $(form)[0].reset();
                 },
                 error  : function(data) {
                     alert(data);
                     $(form)[0].reset();
                 }
             });
         });

         /* Allow drag and drop of component */
         $( ".draggable" ).draggable({ cursor: "move", helper: "clone", revert: "invalid" });
         $("#droppable").droppable({
              drop: function( event, ui ) {
                  console.log($('#znieh_unitgamebundle_weapon_parts_' + ui.draggable.data("id")));
                  $('#znieh_unitgamebundle_weapon_parts_' + ui.draggable.data("id")).prop('checked', true);
              }
         });
     });
 });
