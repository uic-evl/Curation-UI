const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  _id: { type: Schema.ObjectId, auto: true },
  description: { type: String, default: '' },
  username: { type: String, lowercase: true },
  userId: { type: Schema.ObjectId },
  creationDate: { type: Date, required: true },
  assignedDate: { type: Date },
  startDate: { type: Date },
  endDate: { type: Date, },
  status: { type: String, required: true },
  type: { type: String, required: true },
  assignedTo: { type: Array, required: true, },
  taskPerformer: { type: String, default: '' },
  url: { type: String }
});

const Task = mongoose.model('task', schema);
module.exports = Task;
