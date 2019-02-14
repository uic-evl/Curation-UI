const _ = require('lodash');
const jwt = require('jwt-simple');
const validator = require('email-validator');
const sgMail = require('@sendgrid/mail');
const User = require('../models/User');
const config = require('../config/config');
const sgKey = process.env.SENDGRID_KEY;
const appHost = process.env.CURATION;

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({
    sub: user.id,
    iat: timestamp,
  }, config.secret);
}

function sendWelcomeEmail(email, token) {
  sgMail.setApiKey(sgKey);

  const url = `${appHost}verify/${token}`;
  const signInUrl = `${appHost}signin`;
  const msg = {
    to: email,
    from: 'no-reply@dev-curation.com',
    subject: 'Welcome to the curation website',
    text: `Verify your account by clicking in this URL: ${url}`,
    html: `<p>Hello curator!<br/>Verify your account by clicking in this URL:<br/>
    <a href=${url}>${url}</a><br />Proceed to update your password and then sign in using
    following link: ${signInUrl}</p>`,
  };

  sgMail.send(msg);
}

exports.signin = function(req, res, next) {
  // If user is authenticated, give them the token
  console.log(req.user);
  res.send({
    user_id: req.user._id,
    username: req.user.username,
    roles: req.user.roles,
    access: req.user.access,
    token: tokenForUser(req.user),
    organization: req.user.organization,
  });
}

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;
  const organization = req.body.organization || '';

  if (!email || !password || !username) {
    return res.status(422).send({ error: 'You must provide a valid username, email and password '});
  }

  if (!validator.validate(email)) {
    return res.status(422).send({ error: 'You must provide a valid email'});
  }

  User.findOne({ $or: [{email: email}, {username: username}] }, (err, existingUser) => {
    if (err) return next(err);

    if (existingUser) {
      return res.status(422).send({ error: 'Email or username is in use' });
    }

    const user = new User({ email, password, username, organization });
    user.save((err, newUser) => {
      if (err) return next(err);
      sendWelcomeEmail(newUser.email, newUser.verificationToken);
      newUser = _.pick(newUser, ['username', 'email', 'status', '_id', 'roles']);
      res.json({ user: newUser });
    });
  });
}

exports.verify = function(req, res, next) {
  const token = req.params.token;

  User.find({'verificationToken': token}, (err, users) => {
    if (err) return next(err);

    if (users.length > 1) {
      res.status(404).send({'error': 'More than one user share the token'});
    }

    if (users[0].status == 'unverified') {
      users[0].status = "verified";
      users[0].save(err1 => {
        if (err1) return next(err1);
        res.send({'message': 'user updated', 'id': users[0]._id });
      })
    } else {
      res.send({'message': 'redirect user', 'id': users[0]._id });
    }
  })
}

exports.updatePassword = function(req, res, next) {
  const id = req.body._id;
  const password = req.body.password;

  User.findById(id, (err, user) => {
    if (err) return next(err);
    if (!user) res.status(404).send({'error': 'user not found'});

    user.password = password;
    user.status = 'active';
    user.save(err1 => {
      if (err1) return next(err1);
      res.json({
        message: 'Password updated',
        token: tokenForUser(user)
      });
    })
  });
}
