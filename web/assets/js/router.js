// backendRouter.js
define(['fos_routing', 'json!fos_routing_data'], function (router, routes) {
	fos.Router.setData(routes);
    return router;
});
