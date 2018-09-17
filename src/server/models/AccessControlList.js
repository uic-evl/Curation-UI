const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  functionality: { type: String },
  roles: { type: Array },
});

const AccessControlLists = mongoose.model('accessControlList', schema, 'accessControlList');
module.exports = AccessControlLists;