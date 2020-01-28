// const path = require("path");
// const { getSpikeAuthMiddleWare } = require("spike-auth-middleware");

// const configuration = {
//     audience: 'very-important-audience',
//     allowedScopes: ["READ"],
//     secretOrKey: 'key'
// };

//const allowForReadScopeOnly = getSpikeAuthMiddleWare(configuration);

const applyRouteMiddleware = app => {
    app.get('/', (req, res, next) => {
        res.status(200).send('allowed for read scope');
    })
}

module.exports = { applyRouteMiddleware };