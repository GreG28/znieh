/**
 * The module loaded on the building page
 */
define(['jquery', 'jqueryui', 'router', 'bootstrap', 'collection'], function ($) {
   console.log('unit create module loaded');

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

    
    });
});
