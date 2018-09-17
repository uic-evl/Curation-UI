const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
  _id: { type: Schema.ObjectId, auto: true },
  email: {
    type: String,
    unique: true,
    lowercase: true,
  },
  password: String,
  username: {
    type: String,
    unique: true,
    lowercase: true,
  },
  roles: { type: Array, "default": [] },
  access: { type: Array, "default": [] },
});

/* replacing function(next) by (next) =>, loses
the reference to the context *this* */
// Before saving encrypt the password 
userSchema.pre('save', function(next) {
  const user = this;

  if (this.isNew) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, null, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

// Create the model class and export the model
const ModelClass = mongoose.model('user', userSchema);
module.exports = ModelClass;
