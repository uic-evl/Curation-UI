const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  properties: {
    name: { type: String },
    modality1: { type: String },
    modality2: { type: String },
    modality3: { type: String },
    modality4: { type: String },
    observations: { type: String },
  }
});

const TrainingImage = mongoose.model('training', schema, 'training');
module.exports = { TrainingImage };