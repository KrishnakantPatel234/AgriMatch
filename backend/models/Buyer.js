const mongoose = require('mongoose');

const buyerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  businessName: {
    type: String,
    required: true
  },
  businessType: {
    type: String,
    enum: ['retailer', 'wholesaler', 'exporter', 'processor', 'restaurant'],
    required: true
  },
  location: {
    state: String,
    city: String,
    pincode: String
  },
  requirements: [{
    product: String,
    quantity: Number,
    frequency: String, // daily, weekly, monthly
    quality: String // premium, standard, etc.
  }],
  paymentTerms: {
    type: String,
    default: 'advance'
  },
  rating: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 }
  },
  isVerified: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Buyer', buyerSchema);