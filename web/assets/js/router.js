// backendRouter.js
define(['fos_routing'], function (router) {
    fos.Router.setData({"base_url":"","routes":{"api_get_user_team":{"tokens":[["variable",".","json|xml|html","_format"],["text","\/team"],["variable","\/","[^\/]++","user"],["text","\/api\/users"]],"defaults":{"_format":null},"requirements":{"_method":"GET","_format":"json|xml|html"},"hosttokens":[]},"znieh_villagegame_public_unlock":{"tokens":[["variable","\/","[^\/]++","object"],["text","\/village\/unlock"]],"defaults":[],"requirements":[],"hosttokens":[]}},"prefix":"","host":"localhost","scheme":"http"});
    return router;
});
