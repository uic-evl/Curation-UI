const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const documentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  pubmedId: {
    type: String,
    required: true,
  },
  entityId: { type: Schema.ObjectId },
  uri: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    default: "",
  },
});

const DocumentModel = mongoose.model("document", documentSchema);
module.exports = DocumentModel;
