const express = require('express');

const { applyGenericMiddleware } = require("./middleware/genericMiddleware");
const { applyRouteMiddleware } = require("./middleware/routeMiddleware");
const { applyAuthMiddleware } = require("./middleware/authMiddleware");

const server = () => {
    const app = express();

    applyGenericMiddleware(app);
    // comment next line if authentication is not required
    applyAuthMiddleware(app);
    applyRouteMiddleware(app);

    return app;
}


module.exports = server;