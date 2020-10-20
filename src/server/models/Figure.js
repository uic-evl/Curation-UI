const mongoose = require("mongoose");

const { Schema } = mongoose;
const { Modality } = require("./Modality");

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
    default: "",
  },
  modality2: {
    type: String,
    default: "",
  },
  modality3: {
    type: String,
    default: "",
  },
  modality4: {
    type: String,
    default: "",
  },
  otherModality1: { type: String },
  state: {
    type: String,
    required: true,
  },
  lastUpdate: {
    type: Date,
    default: null,
  },
  lastModifier: {
    type: String,
    default: "",
  },
  caption: {
    type: String,
    default: "",
  },
  observations: {
    type: String,
    default: "",
  },
  needsCropping: {
    type: Boolean,
    default: false,
  },
  isCompound: {
    type: Boolean,
    default: false,
  },
  isOvercropped: {
    type: Boolean,
    default: false,
  },
  isMissingSubfigures: {
    type: Boolean,
    default: false,
  },
  isMissingPanels: {
    type: Boolean,
    default: false,
  },
  isOverfragmented: {
    type: Boolean,
    default: false,
  },
  closeUp: {
    type: Boolean,
    default: false,
  },
  numberSubpanes: {
    type: Number,
    default: 1,
  },
  docId: {
    type: Schema.ObjectId,
    required: true,
    auto: false,
  },
  figureId: {
    type: Schema.ObjectId,
    auto: false,
    default: null,
  },
  uri: {
    type: String,
    required: true,
  },
  subfigures: {
    type: Array,
    default: [],
  },
  composition: {
    type: String,
    default: null,
  },
  modalities: [Modality.schema],
  flag: {
    type: Boolean,
    default: false,
  },
  username: {
    type: String,
    default: "",
  },
});

const FigureModel = mongoose.model("figure", figureSchema);
module.exports = FigureModel;

//  modalities: [{type: mongoose.Schema.Types.Object, ref: 'modalities'}],
