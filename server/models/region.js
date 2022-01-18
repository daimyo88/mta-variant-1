const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

require('dotenv').config();

const Schema = mongoose.Schema;

const regionSchema = new Schema({
  name: { type: String, default: '', required: true, unique: true },
  cities: [{ type: mongoose.Types.ObjectId, required: true, ref: 'City' }],
});

regionSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Region', regionSchema);