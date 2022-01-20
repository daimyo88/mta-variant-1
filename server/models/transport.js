const mongoose = require('mongoose');

require('dotenv').config();

const Schema = mongoose.Schema;

const transportSchema = new Schema({
  vehicleModel: { type: String, default: '', required: true },
  maxWeight: { type: Number, required: true },
  volume: { type: Number, required: true },
  height: { type: Number, required: true },
  category: { type: String, default: '', required: true },
  coated: { type: Boolean, default: true, required: true },
  user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Transport', transportSchema);