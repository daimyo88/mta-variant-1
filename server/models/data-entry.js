const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

require('dotenv').config();

const Schema = mongoose.Schema;

const dataEntrySchema = new Schema({
  createdAt: { type: Date },
  freightType: { type: String, required: true  },
  comment: { type: String, default: '' },
  dateNomination: { type: Date, default: '' },
  shipTitle: { type: String, default: '' },
  shipLength: { type: String, default: '' },
  dwt: { type: Number, default: 0 },
  shipCategory: { type: String, default: '' },
  shipWidth: { type: String, default: '' },
  shipVolume: { type: String, default: '' },
  shipProductGroup: { type: String, default: '' },
  shipPiping: { type: String, default: '' },
  shipCoated: { type: Boolean, default: false },
  shipHeated: { type: Boolean, default: false },
  shipProfile: { type: String, default: '' },
  tanksQuantity: { type: String, default: '' },
  shipFlag: { type: String, default: '' },
  freightData: { type: Schema.Types.Mixed },
  user: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
});


dataEntrySchema.plugin(uniqueValidator);

module.exports = mongoose.model('DataEntry', dataEntrySchema);