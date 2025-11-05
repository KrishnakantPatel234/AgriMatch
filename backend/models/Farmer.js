const mongoose = require('mongoose');

const farmerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  farmName: {
    type: String,
    required: true,
    trim: true
  },
  farmImage: {
    type: String,
    default: ''
  },
  location: {
    state: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true },
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  crops: [{
    name: { type: String, required: true },
    category: { type: String, required: true }, // vegetables, fruits, grains, etc.
    isOrganic: { type: Boolean, default: false },
    harvestSeason: String,
    pricePerUnit: Number,
    unit: { type: String, default: 'kg' }
  }],
  farmSize: {
    type: Number, // in acres
    required: true
  },
  certifications: [{
    type: String // Organic, ISO, etc.
  }],
  description: {
    type: String,
    maxLength: 500
  },
  contact: {
    phone: String,
    whatsapp: String
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  rating: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 }
  },
  availability: {
    type: String,
    enum: ['available', 'busy', 'on_break'],
    default: 'available'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamp before saving
farmerSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Farmer', farmerSchema);