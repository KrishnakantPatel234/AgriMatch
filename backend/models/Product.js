const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide product name'],
    trim: true,
    maxlength: [100, 'Product name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide product description'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Please provide product price'],
    min: [0, 'Price cannot be negative']
  },
  category: {
    type: String,
    required: [true, 'Please provide product category'],
    enum: ['vegetables', 'fruits', 'grains', 'dairy', 'poultry', 'spices', 'other']
  },
  quantity: {
    type: Number,
    required: [true, 'Please provide product quantity'],
    min: [0, 'Quantity cannot be negative']
  },
  unit: {
    type: String,
    required: [true, 'Please provide product unit'],
    enum: ['kg', 'gram', 'piece', 'dozen', 'litre', 'packet']
  },
  images: [{
    url: String,
    alt: String
  }],
  farmer: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  location: {
    type: String,
    required: [true, 'Please provide product location']
  },
  isOrganic: {
    type: Boolean,
    default: false
  },
  harvestDate: {
    type: Date
  },
  expiryDate: {
    type: Date
  },
  minOrder: {
    type: Number,
    default: 1
  },
  maxOrder: {
    type: Number
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true
});

// Index for better search performance
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ category: 1 });
productSchema.index({ farmer: 1 });
productSchema.index({ location: 1 });

module.exports = mongoose.model('Product', productSchema);