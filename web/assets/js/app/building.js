 /**
  * The module loaded on the building page
  */
 define(['jquery', 'jqueryui', 'router', 'bootstrap'], function ($) {
    console.log('building module loaded');

    $('.unlock-object').on('click', function(e){
         e.preventDefault();
         var id = $(this).data("id");
         var obj = $(this);
         $.get(Routing.generate('znieh_villagegame_public_unlock', {object : id}))
         .done(function(data) {
           console.log('done');
           obj.children().attr("src", 'img/icons/accept.png');
         })
         .fail(function(e) {
           console.log('fail');
         });
    });

    $(document).ready(function(){
         $('.game-object').popover();
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
