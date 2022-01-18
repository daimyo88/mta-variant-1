const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
  email: { type: String, required: true, unique: true },
  password: { type: String, minlength: 8 },
  role: { type: String, required: true },
  auth2f: { type:Boolean, required: true, default: false },
  auth2fSecret: { type: Schema.Types.Mixed, required: true },
  auth2fConfirmed: { type:Boolean, required: true, default: false },
  confirmedEmail: { type: Boolean, required: true, default: false },
  status: { type: Boolean, default: true },
  ships: [{ type: mongoose.Types.ObjectId, ref: 'Ship' }],
  dataEntries: [{ type: mongoose.Types.ObjectId, ref: 'DataEntry' }],
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    {
      _id: this._id
    },
    process.env.JWT_SECRET,
    { expiresIn: "72h" }
  );
  return token;
};

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);