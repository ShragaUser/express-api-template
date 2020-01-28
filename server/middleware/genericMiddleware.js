const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const logger = require('morgan');
const passport = require('passport');
const { configurePassport } = require(path.resolve(__dirname, '../passport.js'));
const { sessionConfig } = require(path.resolve(__dirname, '../../config/config'))();
const { getClient: getRedisClient } = require(path.resolve(__dirname, '../utils/redisHandler'));
const { getClient: getMongoClient } = require(path.resolve(__dirname, '../utils/mongoHandler'));

const isAlive = (req, res) => res.status(200).send('Server Is Up');

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

const applyGenericMiddleware = app => {
    app.use('/IsAlive', isAlive);
    app.use('/health', isAlive);

    app.use(logger('dev'));

    app.use(helmet());
    app.use(cors({
        origin: '*'
    }));
    app.use(bodyParser.json());
    app.use(
        bodyParser.urlencoded({
            extended: true
        })
    );
    app.use(cookieParser());
    configurePassport();
    app.use(session(configureSession()));
    app.use(passport.initialize());
    app.use(passport.session());
}

module.exports = { applyGenericMiddleware };
