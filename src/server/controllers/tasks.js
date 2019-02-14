const Tasks = require('../models/Task');
const User = require('../models/User');

const STATUS_ASSIGNED = 'Assigned';
const STATUS_IN_PROCESS = 'In Process';
const STATUS_FINISHED = 'Finished';

exports.fetchTasks = function(req, res, next) {
  const username = req.params.username;

  Tasks.find({username: username }, (err, tasks) => {
    if (err) return next(err);
    res.send(tasks);
  });
}

exports.openTask = function(req, res, next) {
  const { id } = req.body;

  Tasks.findById(id, (err1, task) => {
    if (err1) res.send({"message": 'Error fetching task'});

    if (task) {
      if (task.status == STATUS_ASSIGNED) {
        task.startDate = Date.now();
        task.status = STATUS_IN_PROCESS;

        task.save((err2, updatedTask) => {
          if (err2) res.send({"message": 'Error updating task'});
          res.send({
            'currentTask': updatedTask,
            'message': 'Task fetched'
          });
        });
      } else {
        res.send({
          'currentTask': task,
          'message': 'Task fetched'
        });
      }
    } else {
      res.status(422).send({ 'message': 'Task not found'});
    }
  })
}

exports.fetchTask = function(req, res, next) {
  const { id } = req.params;

  Tasks.findById(id, (err1, task) => {
    if (err1) res.send({"message": 'Error fetching task'});
    if (task) {
      res.send({
        'currentTask': task,
        'message': 'Task fetched'
      });
    } else {
      res.status(422).send({ 'message': 'Task not found'});
    }
  })
}

exports.finishTask = function(req, res, next) {
  const { task, username, userId } = req.body;

  Tasks.findById(task._id, (err1, userTask) => {
    if (err1) res.send({"message": 'Error fetching task'});
    userTask.endDate = Date.now();
    userTask.taskPerformer = username;
    userTask.status = STATUS_FINISHED;

    userTask.save((err2, savedTask) => {
      if (err2) res.send({'message': 'Error saving task'});

      // now reduce the number of tasks by 1
      User.findById(userId, (err3, user) => {
        if (err3) res.send({'message': 'Error retrieving user'});

        user.numberTasks -= 1;
        user.save((err4, savedUser) => {
          if (err4) res.send({'message': 'Error updating user tasks'});
          res.send({
            'currentTask': savedTask,
            'message': 'Task finished'
          });
        });

      });
    });
  });
}
