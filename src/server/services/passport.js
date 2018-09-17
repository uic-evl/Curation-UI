const passport = require('passport');
const User = require('../models/User');
const AccessControlLists = require('../models/AccessControlList');
const Security = require('../controllers/security');
const config = require('../config/config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// Create local strategy: auth with email and password
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  User.findOne({ email }, (err1, user) => {
    if (err1) return done(err1);
    if (!user) return done(null, false);

    user.comparePassword(password, (err2, isMatch) => {
      if (err2) return done(err2);
      if (!isMatch) return done(null, false);

      // get the functionalities available based on roles
      AccessControlLists.find({roles: {$in: user.roles }}, (err3, accesses) => {
        if (err3) return done(err3);
        result = [];

        accesses.forEach(access => {
          result.push(access.functionality);
        })
        user.access = result;

        return done(null, user);
      });
    });
  })
});

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret,
};

// Create JWT Strategy: auth with token
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  User.findById(payload.sub, (err, user) => {
    if (err) return done(err, false);

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  })
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
