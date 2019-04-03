const mongoose = require('mongoose');

/*
  About columnName and simplify:
  Fields added to support the matrix view of the modalities during labeling.
  The Column name correspond to either the modality2 or modality3 or a simplified
  name. Therefore, columnName keeps the value shown as the left-most column.
  Simplify keeps the value of the simplified name for the modality hierarchy to
  be shown as the checkbox label.
*/

const schema = new mongoose.Schema({
  properties: {
    modality1: { type: String },
    modality2: { type: String },
    modality3: { type: String },
    modality4: { type: String },
    columnName: { type: String },
    simplify: { type: String },
  }
});

const Modality = mongoose.model('modalities', schema, 'modalities');
//const Modality = mongoose.model('modality', schema);
module.exports = { Modality };
