const jwt = require('jwt-simple');
const validator = require('email-validator');

const User = require('../models/User');
const config = require('../config/config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({
    sub: user.id,
    iat: timestamp,
  }, config.secret);
}

exports.signin = function(req, res, next) {
  // If user is authenticated, give them the token
  res.send({ token: tokenForUser(req.user) });
}

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide a valid email and password '});
  }

  if (!validator.validate(email)) {
    return res.status(422).send({ error: 'You must provide a valid email'});
  }

  User.findOne({ email }, (err, existingUser) => {
    if (err) return next(err);

    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }

    const user = new User({ email, password });
    user.save((err) => {
      if (err) return next(err);
      res.json({ token: tokenForUser(user) });
    });
  });
}