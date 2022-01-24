const mongoose = require('mongoose');

require('dotenv').config();

const Schema = mongoose.Schema;

const dataEntrySchema = new Schema({
  createdAt: { type: Date, required: true },
  departureDate: { type: Date, required: true },
  freightData: { type: Schema.Types.Mixed },
  comment: { type: String, default: '' },
  user: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
});

module.exports = mongoose.model('DataEntry', dataEntrySchema);