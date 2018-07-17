const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  properties: {
    modality1: { type: String },
    modality2: { type: String },
    modality3: { type: String },
    modality4: { type: String },
  }
});

const Modality = mongoose.model('modalities', schema, 'modalities');
module.exports = { Modality };