const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const figureSchema = new Schema({
    name: {
      type: String,
      lowercarse: true,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    modality1: { type: String },
    modality2: { type: String },
    modality3: { type: String },
    modality4: { type: String },
    otherModality1: { type: String },
    state: {
      type: String,
      required: true,
    },
    lastUpdate: { type: Date },
    lastModifier: { type: String },
    caption: { type: String },
    observations: { type: String },
    needsCropping: { type: Boolean },
    isCompound: { type: Boolean },
    docId: {
      type: Schema.ObjectId,
      required: true,
      auto: false,
    },
    figureId: {
      type: Schema.ObjectId,
      auto: false,
    },
    uri: {
      type: String,
      required: true,
    },
    subfigures: {
      type: Array, "default": [],
    }
});

const FigureModel = mongoose.model('figure', figureSchema);
module.exports = FigureModel;
