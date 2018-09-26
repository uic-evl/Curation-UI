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

        validation_images.forEach(image => {
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