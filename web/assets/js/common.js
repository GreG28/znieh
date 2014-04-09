/**
 * The main requirejs configuration
 *
 * This file is included in ::_requirejs.html.twig and in Gruntfile.js.
 */
requirejs.config({
    urlArgs: "bust=" + (new Date()).getTime(),
    paths: {
        /**
         * Paths are relative to baseUrl, which should be set before including
         * this file to the web/assets directory.
         */
        domReady: '../vendor/requirejs-domready/domReady',
        /**
         * Things like this only work because the library has code in it to
         * detect if require.js is present, and manually register the module
         * if it is. Normally, if a library you're including doesn't support
         * AMD, you will likely need a paths entry and also an entry in
         * shim (beyond what you see for the bootstrap shim).
         */
        jquery: '../vendor/jquery/dist/jquery.min',
        jqueryui: '../libs/jquery-ui-1.10.4.custom.min',
        collection: '../libs/bootstrap-collection',
        bootstrap: '../vendor/bootstrap/dist/js/bootstrap.min',
        socketio: '../vendor/socket.io-client/dist/socket.io.min',
        moment: '../vendor/momentjs/min/moment-with-langs.min',
        fos_routing: '../../bundles/fosjsrouting/js/router',
        /*fos_routing_routes: '../../js/fos_js_routes'*/
    },
    shim: {
        /**
         * bootstrap does not support AMD. This means that require.js doesn't
         * now that jquery needs to be downloaded first, before bootstrap.
         * This accomplishes this.
         *
         * Unlike most modules, we don't actually care about receiving some
         * sort of "bootstrap" object, we simply require the "bootstrap"
         * module so that all of its jQuery plugins are available. If we
         * needed to capture some sort of return object (like the $ in jQuery,
         * except that it fortunately supports AMD), we would need to do
         * a little more work here.
         */
        bootstrap: ['jquery'],
        jqueryui: ['jquery'],
        collection: ['jquery']
    }
});
