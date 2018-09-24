const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    _id: { type: Schema.ObjectId, auto: true },
    test_id: { type: Schema.ObjectId },
    name: { type: String },
    folder: { type: String},
    modality1: { type: String },
    modality2: { type: String },
    modality3: { type: String },
    modality4: { type: String },
    other_modality1: { type: String },
    observations: { type: String },
    state: { type: String },
    last_update: { type: Date },
    is_compound: { type: Boolean },
    shared_modality: { type: Boolean },
    needs_cropping: { type: Boolean },
    curator: { type: String },
});

const ModelClass = mongoose.model('human_error_image', schema);
module.exports = ModelClass;