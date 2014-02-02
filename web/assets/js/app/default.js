/**
 * The default module that's run on every page
 */
define(['jquery'], function ($) {
    console.log('loaded');
    $('body').on('click', function() {
        console.log('cc');
    });
});
