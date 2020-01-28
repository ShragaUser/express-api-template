const passport = require("passport");
const path = require("path");
const { Strategy } = require("passport-shraga");
const { shragaConfig } = require(path.resolve(__dirname, '../config/config'))();

passport.serializeUser((user, cb) => {
    cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
    // not to be used in production
    cb(null, { id });
});

passport.use(new Strategy(shragaConfig, (profile, done) => {
    console.log(`My Profile Is: ${profile}`);
    done(null, profile);
}))