const Tasks = require('../models/Task');

exports.fetchTasks = function(req, res, next) {
  const username = req.params.username;

  Tasks.find({username: username }, (err, tasks) => {
    if (err) return next(err);
    res.send(tasks);
  });
}

exports.openTask = function(req, res, next) {
  const { taskId } = req.body;

  Tasks.findById(taskId, (err1, task) => {
    if (err1) return next(err1);

    if (task) {
      if (task.status == 'Assigned') {
        task.startDate = Date.now();
        task.status = 'In Process';

        task.save((err2, updatedTask) => {
          if (err2) return next(err2);
          res.send(updatedTask.url);
        });
      } else {
        res.send(task.url);
      }
    } else {
      return res.status(422).send({ error: 'Task not found'});
    }
  })
}