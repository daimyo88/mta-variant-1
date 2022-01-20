const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
  email: { type: String, required: true, unique: true },
  password: { type: String, minlength: 8 },
  role: { type: String, required: true },
  confirmedEmail: { type: Boolean, required: true, default: false },
  transports: [{ type: mongoose.Types.ObjectId, ref: 'Transport' }],
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

module.exports = mongoose.model('User', userSchema);