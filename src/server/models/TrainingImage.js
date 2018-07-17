const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: { type: String },
    modality1: { type: String },
    modality2: { type: String },
    modality3: { type: String },
    modality4: { type: String },
    observations: { type: String },
    state: { type: String },
    last_update: { type: Date },
    is_compound: { type: Boolean },
    shared_modality: { type: Boolean },
});

const TrainingImage = mongoose.model('training', schema, 'training');
module.exports = { TrainingImage };