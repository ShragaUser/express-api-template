const path = require("path");
const passport = require("passport");
const session = require('express-session');
const { configurePassport } = require(path.resolve(__dirname, '../passport.js'));
const { sessionConfig, shragaConfig } = require(path.resolve(__dirname, '../../config/config'))();
const { getClient: getRedisClient } = require(path.resolve(__dirname, '../utils/redisHandler'));
const { getClient: getMongoClient } = require(path.resolve(__dirname, '../utils/mongoHandler'));


const configureSession = () => {
    const { secret, store } = sessionConfig;
    const sessionConfiguration = {
        secret,
        resave: false,
        saveUninitialized: false
    };
    if (store && store === "redis") {
        const redisStore = require('connect-redis')(session);
        const client = getRedisClient();
        sessionConfiguration.store = new redisStore({ client })
    }
    else if (store && store === "mongo") {
        const mongoStore = require('connect-mongo')(session);
        const clientPromise = getMongoClient();
        sessionConfiguration.store = new mongoStore({
            clientPromise,
            dbName: 'sessions'
        })
    }
    return sessionConfiguration;
}

const authenticateWithShraga = passport.authenticate("shraga");

const applyAuthMiddleware = app => {

    // configures passport and session
    configurePassport();
    app.use(session(configureSession()));
    app.use(passport.initialize());
    app.use(passport.session());

    // uses shraga auth method
    app.use("/auth/shraga", authenticateWithShraga, (req, res) => {
        const { RelayState } = req.user;
        res.redirect(`${RelayState || "/"}`);
    })

    // redirects all requests to shraga if not authenticated
    app.use((req, res, next) => {
        if (!req.user)
            res.redirect(`${shragaConfig.callbackURL}?RelayState=${req.path}`);
        else
            next();
    });
}

module.exports = { applyAuthMiddleware };