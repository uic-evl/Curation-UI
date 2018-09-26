const Tasks = require('../models/Task');

exports.fetchTasks = function(req, res, next) {
  const username = req.params.username;

  Tasks.find({username: username }, (err, tasks) => {
    if (err) return next(err);
    res.send(tasks);
  });
}