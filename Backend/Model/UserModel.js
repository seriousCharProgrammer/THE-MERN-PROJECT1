const { Timestamp } = require('bson');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
dotenv.config({ path: '../Backend/config.env' });

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'please add a name'],
      trim: true,
    },
    email: {
      type: String,
      trim: true,

      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      select: false,
      required: [true, 'Password is required'], // Ensures the field is presen
    },
    isAdmin: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  { timestamps: true }
);
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_EXP,
  });
};
UserSchema.methods.matchPassword = async function (enteredpassword) {
  return await bcrypt.compare(enteredpassword, this.password);
};
module.exports = mongoose.model('User', UserSchema);
