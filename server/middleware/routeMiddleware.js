const path = require("path");
const { cacheWrapper } = require(path.resolve(__dirname, "../utils/cacheHandler"));

const getPerson = async (req, res, next) => {

};

const applyRouteMiddleware = (app) => {
    app.use('/persons/domainUser/:id', cacheWrapper(getPerson));
}

module.exports = { applyRouteMiddleware };