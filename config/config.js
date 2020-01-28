require('dotenv').config();

const config = () => ({
    redisOptions: {
        redisHost: process.env.REDIS_HOST || 'redis://localhost'
    },
    mongoOptions: {
        mongoUrl: process.env.MONGO_URL || 'mongodb://localhost'
    },
    shragaConfig: {
        shragaURL: process.env.SHRAGA_URL || 'http://localhost:3000',
        callbackURL: process.env.SHRAGA_CALLBACK_URL || '/auth/shraga'
    },
    sessionConfig: {
        secret: process.env.SESSION_SECRET || 'secret',
        store: process.env.SESSION_STORE || false
    }
})

module.exports = config;