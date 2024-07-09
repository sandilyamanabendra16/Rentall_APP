const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Changed to ObjectId
  title: { type: String, required: true },
  description: { type: String, required: true },
  images: [String],
  status: { type: String, enum: ['pending', 'approved', 'rented', 'available'], default: 'pending' },
  price: { type: Number, required: true }, // Changed to Number
  renter: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rentDate: { type: Date, default: Date.now }
  }],
}, { timestamps: true }); // Added timestamps

module.exports = mongoose.model('Item', itemSchema);