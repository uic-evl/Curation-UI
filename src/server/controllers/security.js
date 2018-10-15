const _ = require('lodash');
const User = require('../models/User');
const Group = require('../models/Group');
const config = require('../config/config');

exports.getGroup = function(req, res, next) {
  const { groupName } = req.params;
  console.log(groupName);
  Group.findOne({ name: groupName }).then(group => {
    res.send(group);
  });
}

exports.createGroup = function(req, res, next) {
  const { name, users, supervisor } = req.body;

  if (!name) {
    return res.status(422).send({ error: 'Group name cannot be empty'});
  }

  const group = new Group({
    name, 
    users, 
    supervisor,
  });

  group.save((err) => {
    if (err) return next(err);
    res.send({ group });
  });
}

exports.editGroup = function(req, res, next) {
  const { _id, name, users, supervisor } = req.body;

  if (!_id || !name) {
    return res.status(422).send({ error: 'Group name and id cannot be empty'});
  }

  Group.findById(_id, (err, existingGroup) => {
    if (err) return next(err);

    if (existingGroup) {
      existingGroup.name = name;
      existingGroup.users = users;
      existingGroup.supervisor = supervisor;
    
      existingGroup.save((err1) => {
        if (err1) return next(err1);
        res.send({ existingGroup });
      });
    } else {
      return res.status(422).send({ error: 'Group not found'});
    }
  });
}

// Add user to a role
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

exports.fetchUsersByGroup = function(req, res, next) {
  const group = req.params.groupname;
  
  let result = [];
  User.find({ 'organization': group }, (err, users) => {
    if (err) return next(err);
    users.forEach((user) => {
      result.push(_.pick(user, ['username', 'email', 'status', '_id']));
    })
    res.send(result);
  })
}

exports.fetchUserById = function(req, res, next) {
  const id = req.params.id;
  User.findById(id, (err, user) => {
    if (err) return next(err);
    res.send(_.pick(user, ['username', 'email', 'organization', '_id', 'status', 'roles']));
  })
}