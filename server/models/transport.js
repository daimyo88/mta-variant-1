const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

require('dotenv').config();

const Schema = mongoose.Schema;

const transportSchema = new Schema({
  model: { type: String, default: '', required: true },
  maxWeight: { type: Number, default: '' },
  height: { type: Number, default: '' },
  volume: { type: Number, default: '' },
  productGroup: { type: String, default: '' },
  coated: { type: Boolean, default: true },
  category: { type: String, default: '', required: true },
  user: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
});

transportSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Transport', transportSchema);