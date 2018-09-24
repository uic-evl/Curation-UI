const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: { type: Schema.ObjectId, auto: true },
  username: {
    type: String,
    unique: true,
    lowercase: true,
  },
  creation_date: { type: Date },
  start_date: { type: Date },
  end_date: { type: Date, },
  status: { type: String },
});

const ModelClass = mongoose.model('classification_test', userSchema);
module.exports = ModelClass;