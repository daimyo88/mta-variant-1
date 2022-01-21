const mongoose = require('mongoose');

require('dotenv').config();

const Schema = mongoose.Schema;

const dataEntrySchema = new Schema({
  createdAt: { type: Date },
  comment: { type: String, default: '' },
  dateNomination: { type: Date, default: '' },
  freightData: { type: Schema.Types.Mixed },
  user: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
});

module.exports = mongoose.model('DataEntry', dataEntrySchema);