// models/Rental.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rentalSchema = new Schema({
  item: { type: Schema.Types.ObjectId, ref: 'Item', required: true },
  renter: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  deliverySchedule: { type: Date, required: true },
  pickupSchedule: { type: Date, required: true },
});

module.exports = mongoose.model('Rental', rentalSchema);
