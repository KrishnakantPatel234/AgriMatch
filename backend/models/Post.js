// backend/models/Post.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userType: {
    type: String,
    enum: ['farmer', 'buyer', 'transport', 'storage'],
    required: true
  },
  type: {
    type: String,
    required: true // crop, requirement, transport, storage
  },
  title: String,
  description: String,
  
  // Farmer posts (Crops)
  cropDetails: {
    cropName: String,
    quantity: Number,
    unit: String,
    price: Number,
    quality: String,
    harvestDate: Date,
    isOrganic: Boolean
  },
  
  // Buyer posts (Requirements)
  requirementDetails: {
    product: String,
    quantity: Number,
    quality: String,
    budget: Number,
    deliveryDate: Date
  },
  
  // Transport posts
  transportDetails: {
    vehicleType: String,
    capacity: Number,
    fromLocation: String,
    toLocation: String,
    availableDate: Date,
    price: Number
  },
  
  // Storage posts
  storageDetails: {
    spaceAvailable: Number,
    temperature: String,
    pricePerKg: Number,
    location: String,
    availableTill: Date
  },
  
  images: [String],
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Post', postSchema);