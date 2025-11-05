const mongoose = require('mongoose');

const transportSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  vehicleType: {
    type: String,
    enum: ['truck', 'tempo', 'container', 'refrigerated'],
    required: true
  },
  vehicleNumber: {
    type: String,
    required: true
  },
  capacity: {
    weight: Number, // in tons
    volume: Number, // in cubic feet
  },
  location: {
    state: String,
    city: String,
    pincode: String
  },
  services: [{
    type: String // perishable, grains, equipment, etc.
  }],
  availability: {
    type: String,
    enum: ['available', 'on_trip', 'maintenance'],
    default: 'available'
  },
  pricePerKm: Number,
  rating: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 }
  },
  documents: [{
    name: String,
    url: String,
    verified: { type: Boolean, default: false }
  }],
  isVerified: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Transport', transportSchema);