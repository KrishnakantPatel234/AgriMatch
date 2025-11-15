const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  url: { type: String, required: true },
  public_id: { type: String },
  resource_type: { type: String, enum: ['image', 'video'], default: 'image' }
}, { _id: false });

const postSchema = new mongoose.Schema({

  // Basic post info
  title: { type: String, required: true, trim: true, maxlength: 100 },
  description: { type: String, required: true, trim: true, maxlength: 500 },

  // Pricing
  price: { type: Number, required: true, min: 0 },
  quantity: { type: Number, required: true, min: 0 },
  unit: { type: String, required: true, enum: ['kg', 'ton', 'quintal', 'piece', 'bundle', 'acre'] },

  // Media
  media: { type: [mediaSchema], default: [] },

  // NEW FIELDS
  cropType: { type: String, required: true },
  qualityGrade: { type: String, enum: ['A', 'B', 'C'], default: 'A' },
  availableFrom: { type: Date },
  deliveryOptions: {
    type: String,
    enum: ['pickup', 'delivery', 'both'],
    default: 'pickup'
  },

  // Location
  location: { type: String, required: true },

  // Farmer info
  farmerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  farmerName: { type: String, required: true },

  // Category
  category: {
    type: String,
    default: 'produce',
    enum: ['produce', 'grains', 'vegetables', 'fruits', 'spices', 'organic', 'other']
  },

  status: { type: String, enum: ['active', 'sold', 'expired'], default: 'active' },

  contactInfo: {
    phone: String,
    email: String
  }

}, { timestamps: true });

postSchema.index({ farmerId: 1, createdAt: -1 });

module.exports = mongoose.model('Post', postSchema);
