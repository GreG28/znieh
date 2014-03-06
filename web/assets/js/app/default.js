/**
 * The default module that's run on every page
 */
define(['jquery', 'router', 'app/chat'], function ($) {
    console.log('default module loaded');
    console.log(Routing.generate('znieh_villagegame_public_unlock', {object : 1}));
});
