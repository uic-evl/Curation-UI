const User = require('../models/User');
const config = require('../config/config');

exports.addRole = function(req, res, next) {
  const { _id, roles } = req.body;
  
  User.findById(_id, (err, existingUser) => {
    if (err) return next(err);

    if (existingUser) {
      roles.forEach(role => {
        existingUser.roles.push(role);
      });
      
      existingUser.save((err) => {
        if (err) return next(err);
        res.send({ user: existingUser });
      });
    } else {
      return res.status(422).send({ error: 'User not found'});
    }
  });
}

exports.removeRole = function(req, res, next) {
  const { _id, roles } = req.body;

  User.findById(_id, (err, existingUser) => {
    if (err) return next(err);

    if (existingUser) {
      roles.forEach(roleToDelete => {
        idx = existingUser.roles.indexOf(roleToDelete);
        if (idx > -1) {
          existingUser.roles.splice(idx, 1);
        }
      });  

      existingUser.save((err) => {
        if (err) return next(err);
        res.send({ user: existingUser });
      });
    } else {
      return res.status(422).send({ error: 'User not found'});  
    }
  });
};