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
  status: String,
  verificationToken: String,
});

/* replacing function(next) by (next) =>, loses
the reference to the context *this* */
// Before saving encrypt the password 
userSchema.pre('save', function(next) {
  const user = this;

  if (this.isNew || this.isModified('password')) {

    if (this.isNew) this.status = 'unverified';

    bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, null, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        console.log('hashing password');

        if (this.isNew) {
          const randToken = Date.now().toString();
          bcrypt.hash(randToken, salt, null, (err, hash2) => {
            if (err) return next(err);
            console.log(hash2);
            console.log(hash2.split("/").join(""));
            user.verificationToken = hash2.split("/").join("");
            console.log("hashing verification token");
            next();
          });
        } else {
          next();
        }
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
