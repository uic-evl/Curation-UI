const _ = require('lodash');
const HumanErrorImage = require('../models/HumanErrorImage');
const Task = require('../models/Task');
const User = require('../models/User');
const Group = require('../models/Group');
const { validation_images } = require('../preprocessing/validation_images');

function createClassificationTask(userid, username) {
  return new Task({
    username: username,
    assignedTo: [username],
    userId: userid,
    status: 'Assigned',
    creationDate: Date.now(),
    startDate: null,
    endDate: null,
    type: 'Classification Test',
    url: '/classificationTest',
  });
}

function createHumanErrorTestImage(task, image, username) {
  return new HumanErrorImage({
    test_id: task._id,
    name: image.name,
    folder: image.folder,
    modality1: image.modality1,
    modality2: image.modality2,
    modality3: image.modality3,
    modality4: image.modality4,
    other_modality1: image.other_modality1,
    state: image.state,
    last_update: image.last_update,
    last_modifier: image.last_modifier,
    observations: image.observations,
    is_compound: image.is_compound,
    shared_modality: image.shared_modality,
    needs_cropping: image.needs_cropping,
    curator: username,
  });
}

exports.fetchTests = function(req, res, next) {
  Task.find({type: 'Classification Test'}, (err, tests) => {
    if (err) return next(err);
    res.send(tests);
  });
}

exports.createTest = function(req, res, next) {
  const { curator } = req.body;
  if (!curator) {
    return res.status(422).send({ error: 'Curator cannot be empty'});
  }

  User.findOne({username: curator}, (err1, existingUser) => {
    if (err1) return next(err1);

    if (existingUser) {
      const newTask = createClassificationTask(existingUser._id, existingUser.username);
      newTask.save((err2, createdTask) => {
        if (err2) return next(err2);

        const test_image_set = validation_images.slice(0,5);
        test_image_set.forEach(image => {
          let _image = createHumanErrorTestImage(createdTask, image, existingUser.username);
          _image.save();
        });
        res.send({ message: "ok" });
      });

    } else {
      return res.status(422).send({ error: 'User not found'});
    }
  });
}

exports.getNext = function (req, res, next) {
  const { username, taskId } = req.body;
  let result = {
    status: 'in process',
  };

  // Find the previous image, because it's needed in both cases
  HumanErrorImage.find( { $and: 
    [
      { $or: [{state: 'reviewed'}, {state: 'skipped'}] },
      { curator:username, test_id: taskId }
    ]}).sort({last_update: -1}).limit(1).then(prevImage => {
      if (prevImage && prevImage.length > 0) {
        result.previous = prevImage[0];
      } else {
        result.previous = null;
      }

      // Now find the next image to label
      HumanErrorImage.findOne({ curator: username, state: 'to review', test_id: taskId }, (err1, image) => {
        if (err1) return next(err1);

        if (image) {
          result.image = image;
          res.send(result);
        } else {
          // look for pending skipped images
          HumanErrorImage.findOne({ curator: username, state: 'skipped', test_id: taskId }, (err2, skippedImage) => {
            if (err2) return next(err2);

            if (skippedImage) {
              result.image = skippedImage;
              res.send(result);
            } else {
              // update task to Done if not updated before
              result.status = 'done';
              Task.findById(taskId, (err3, userTask) => {
                if (err3) return next(err3);

                if (userTask) {
                  if (userTask.status == 'In Process') {
                    userTask.status = 'Done';
                    userTask.endDate = Date.now();
                    userTask.save((err3, saveTask) => {
                      res.send(result);
                    });
                  } else {
                    res.send(result);
                  }
                } else {
                  return res.status(422).send({ error: 'Task not found'});
                }
              })
            }
            
          });
        }
      });
  }, e => {
    return next(e);
  })
}

exports.getPrevious = function (req, res, next) {
  const { previous_id } = req.body;
  let result = {
    status: 'in process',
  }

  HumanErrorImage.findById( previous_id, (err1, image) => {
    if (err1) return next(err1);

    result.previous = null;
    thr_date = image.last_update;
    if (!thr_date) {
      thr_date = Date.now();
    }

    HumanErrorImage.find({ $and: [ 
      { $or: [{state: 'reviewed'}, {state: 'skipped'}]}, 
      { last_update: { $lt: thr_date } } ]}).sort({last_update: -1}).limit(2).then(prevImage => {
      if (prevImage && prevImage.length > 0) {
        result.image = prevImage[0];
        if (prevImage.length > 1) {
          result.previous = prevImage[1];
        }
      } else {
        result.image = null;
        result.previous = null;
      }
      res.send(result);
    }, (err2) => {
      return next(err2);
    });
  });
}

exports.updateImage = function (req, res, next) {
  const { image } = req.body;
  const body = _.pick(image, ['modality1', 'modality2', 'modality3', 'modality4', 'state', 'last_update']);
  body.last_update = Date.now();

  HumanErrorImage.findByIdAndUpdate(image._id, {$set: body}, {new: true}, (err, updatedImage) => {
    if (err) return res.status(500).send(err);
    return res.send(updatedImage);
  });

}