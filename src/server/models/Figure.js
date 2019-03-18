const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const modalitySchema = require('../models/Modality');

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
    modality1: {
      type: String,
      "default": "",
    },
    modality2: {
      type: String,
      "default": ""
    },
    modality3: {
      type: String,
      "default": "",
    },
    modality4: {
      type: String,
      "default": ""
    },
    otherModality1: { type: String },
    state: {
      type: String,
      required: true,
    },
    lastUpdate: {
      type: Date,
      "default": null
    },
    lastModifier: {
      type: String,
      "default": "",
    },
    caption: {
      type: String,
      "default": ""
    },
    observations: {
      type: String,
      "default": ""
    },
    needsCropping: {
      type: Boolean,
      "default": false
    },
    isCompound: {
      type: Boolean,
      "default": false
    },
    docId: {
      type: Schema.ObjectId,
      required: true,
      auto: false,
    },
    figureId: {
      type: Schema.ObjectId,
      auto: false,
      "default": null
    },
    uri: {
      type: String,
      required: true,
    },
    subfigures: {
      type: Array, "default": [],
    },
    modalities: [modalitySchema],
});

const FigureModel = mongoose.model('figure', figureSchema);
module.exports = FigureModel;
