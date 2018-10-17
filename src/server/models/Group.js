const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: { type: Schema.ObjectId, auto: true },
  name: {
    type: String,
    unique: true,
    lowercase: true,
  },
  users: { type: Array, "default": [] },
  supervisor: { type: String, },
  type: { type: String, lowercase: true },
  organization: { type: String, lowercase: true },
});

const ModelClass = mongoose.model('group', userSchema);
module.exports = ModelClass;