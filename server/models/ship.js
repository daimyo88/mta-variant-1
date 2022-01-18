const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

require('dotenv').config();

const Schema = mongoose.Schema;

const shipSchema = new Schema({
  title: { type: String, default: '', required: true },
  shipLength: { type: Number, default: '' },
  shipWidth: { type: Number, default: '' },
  shipVolume: { type: Number, default: '' },
  productGroup: { type: String, default: '' },
  coated: { type: Boolean, default: false },
  piping: { type: String, default: '' },
  heated: { type: Boolean, default: false },
  shipProfile: { type: String, default: ''},
  flag: { type: String, default: ''},
  tanksQuantity: { type: Number },
  dwt: { type: Number, required: true },
  shipCategory: { type: String, default: '', required: true },
  user: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
});


shipSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Ship', shipSchema);