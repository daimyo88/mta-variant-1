const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

require('dotenv').config();

const Schema = mongoose.Schema;

const citySchema = new Schema({
  name: { type: String, default: '', required: true, unique: true },
  region: { type: mongoose.Types.ObjectId, required: true, ref: 'Region' },
});

citySchema.plugin(uniqueValidator);

module.exports = mongoose.model('City', citySchema);