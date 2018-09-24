const HumanErrorImage = require('../models/HumanErrorImage');
const ClassificationTest = require('../models/ClassificationTest');
const Group = require('../models/Group');
const { validation_images } = require('../preprocessing/validation_images');

exports.fetchTests = function(req, res, next) {
  ClassificationTest.find({}, (err, tests) => {
    if (err) return next(err);
    res.send(tests);
  });
}

exports.createTest = function(req, res, next) {
  const { curator } = req.body;
  if (!curator) {
    return res.status(422).send({ error: 'Curator cannot be empty'});
  }

  const newTest = new ClassificationTest({
    username: curator,
    status: 'in process',
    creation_date: Date.now(),
    start_date: null,
    end_date: null,
  });

  newTest.save((err, createdTest) => {
    if (err) return next(err);

    validation_images.forEach(image => {
      let _image = new HumanErrorImage({
        test_id: createdTest._id,
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
        curator: curator,
      });

      _image.save();
    });
    res.send({ message: "ok" });
  });
}