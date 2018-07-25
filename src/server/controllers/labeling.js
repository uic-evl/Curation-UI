const _ = require('lodash');
const { ObjectID } = require('mongodb');
const { Modality } = require('../models/Modality');
const { TrainingImage } = require('../models/TrainingImage');

exports.getModalities = function(req, res, next) {
  Modality.find().then(modalities => {
    res.send(modalities);
  }, e => {
    res.status(404).send(e);
  })
}

/* 
   @param previous: 
    0, give me the current image to review 
    n, give me the n-th reviewed image in chronological order
   return @response:
    image: require image
    existsPrevious: indicates whether another image exists in 
     the reviewed queue.
*/
exports.getNextImage = function(req, res, next) {
  const previous = req.params.previous;
  const response = {
    image: null,
    existsPrevious: false,
  }

  if (previous == undefined || previous == null || previous == 0) {
    TrainingImage.find({state: 'to review'}).limit(2).then(images => {
      if (images) {
        response.existsPrevious = images.length === 2;
        response.image = images[0];
      }

      res.send(response);
    }, e => {
      res.status(404).send(e);
    })
  } else {
    TrainingImage.find({ $or: [{state: 'reviewed'}, {state: 'skipped'}]}).sort({last_update: -1}).then(images => {
      if (previous - 1 < images.length){
        response.existsPrevious = previous < images.length;
        response.image = images[previous - 1];
        res.send(response);
      }
      else
        res.send(null);
    }, e => {
      res.status(404).send(e);
    })
  }  
}

exports.updateImage = function(req, res, next) {
  const id = req.params.id;
  const body = _.pick(req.body, ['modality1', 'modality2', 'modality3', 'modality4', 'observations']);
  body.is_compound = req.body.isCompound;
  body.shared_modality = req.body.sharedModality;
  body.needs_cropping = req.body.needsCropping;
  body.other_modality1 = req.body.newModality1;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  body.last_update = Date.now();
  if (body.modality1 === '') {
    body.state = 'skipped';
  } else {
    body.state = "reviewed";    
  }
  
  TrainingImage.findByIdAndUpdate(id, {$set: body}, {new: true}, (err, image) => {
    if (err) return res.status(500).send(err);
    return res.send(image);
  });
}