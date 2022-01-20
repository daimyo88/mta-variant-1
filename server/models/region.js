const mongoose = require('mongoose');

require('dotenv').config();

const Schema = mongoose.Schema;

const regionSchema = new Schema({
  name: { type: String, default: '', required: true, unique: true },
  cities: [{ type: mongoose.Types.ObjectId, required: true, ref: 'City' }],
});

module.exports = mongoose.model('Region', regionSchema);