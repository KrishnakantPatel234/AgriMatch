const mongoose = require('mongoose');

const coldStorageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  storageName: {
    type: String,
    required: true
  },
  location: {
    state: String,
    city: String,
    pincode: String,
    address: String
  },
  capacity: {
    total: Number, // in tons
    available: Number
  },
  temperatureZones: [{
    name: String, // frozen, chilled, etc.
    minTemp: Number,
    maxTemp: Number,
    capacity: Number
  }],
  services: [{
    type: String // fruits, vegetables, dairy, meat, etc.
  }],
  pricing: {
    perDayPerKg: Number,
    minimumCharge: Number
  },
  facilities: [String], // loading, packaging, etc.
  rating: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 }
  },
  isVerified: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('ColdStorage', coldStorageSchema);