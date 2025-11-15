const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },

  email: {
    type: String,
    unique: true,         // <-- unique index (keep this)
    sparse: true,         // allows null emails
    lowercase: true,
    validate: {
      validator: function(v) {
        if (!v) return true; // Email optional
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: 'Please provide a valid email'
    }
  },

  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },

  role: {
    type: String,
    enum: ['farmer', 'buyer', 'transport', 'storage', 'admin'],
    default: 'farmer'
  },

  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    unique: true,        // <-- unique index (keep this)
    validate: {
      validator: function(v) {
        return /^\+?[\d\s\-\(\)]{10,}$/.test(v);
      },
      message: 'Please provide a valid phone number'
    }
  },

  // Address
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: { type: String, default: 'India' }
  },

  profileImage: String,
  isVerified: { type: Boolean, default: false },
  rating: { type: Number, default: 4.5, min: 1, max: 5 },

  // Farmer fields
  farmName: String,
  landArea: String,
  landAreaUnit: {
    type: String,
    enum: ['acres', 'hectares', 'bigha'],
    default: 'acres'
  },
  farmLocation: String,
  mainCrops: [{ type: String, trim: true }],
  farmingExperience: {
    type: String,
    enum: ['Less than 1 year', '1-5 years', '5-10 years', '10-20 years', '20+ years']
  },
  irrigationType: {
    type: String,
    enum: ['Rain-fed', 'Well', 'Canal', 'Drip', 'Sprinkler', 'Tube Well', 'Other']
  },
  soilType: {
    type: String,
    enum: ['Black Soil', 'Red Soil', 'Alluvial', 'Laterite', 'Mountain', 'Desert', 'Other']
  },

  certification: [String],
  isOrganic: { type: Boolean, default: false },

  // Buyer
  businessDetails: {
    businessName: String,
    businessType: {
      type: String,
      enum: ['Retail Store', 'Restaurant', 'Export Company', 'Processing Unit', 'Wholesaler', 'Supermarket', 'Other']
    },
    gstNumber: String,
    purchaseVolume: String,
    businessLocation: String
  },

  // Transport Provider
  transportDetails: {
    companyName: String,
    vehicleTypes: [{
      type: String,
      enum: ['Truck', 'Tempo', 'Refrigerated Van', 'Tractor Trailer', 'Mini Truck', 'Container', 'Other']
    }],
    serviceAreas: [String],
    capacity: String,
    vehicleCount: Number
  },

  // Storage Provider
  storageDetails: {
    storageName: String,
    storageType: {
      type: String,
      enum: ['Cold Storage', 'Warehouse', 'Controlled Atmosphere', 'Silo', 'Godown', 'Other']
    },
    capacity: String,
    facilities: [String],
    storageLocation: String
  },

  // Stats
  stats: {
    totalPosts: { type: Number, default: 0 },
    activePosts: { type: Number, default: 0 },
    completedTransactions: { type: Number, default: 0 },
    monthlyRevenue: { type: Number, default: 0 }
  },

  // Preferences
  preferences: {
    notifications: {
      email: { type: Boolean, default: true },
      sms: { type: Boolean, default: true },
      push: { type: Boolean, default: true }
    },
    language: {
      type: String,
      enum: ['en', 'hi', 'mr'],
      default: 'en'
    }
  },

  lastLogin: Date,
  loginAttempts: { type: Number, default: 0 },
  lockUntil: Date,

  profileCompletion: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  }

}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual
userSchema.virtual('displayLocation').get(function() {
  if (this.role === 'farmer' && this.farmLocation) return this.farmLocation;
  if (this.businessDetails?.businessLocation) return this.businessDetails.businessLocation;
  if (this.address?.city && this.address?.state)
    return `${this.address.city}, ${this.address.state}`;
  return 'Location not specified';
});

// ❗ KEEP ONLY THIS INDEX
userSchema.index({ role: 1, createdAt: -1 });

// Password hashing
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Profile completion logic
userSchema.pre('save', function(next) {
  let completion = 0;

  const requiredFields = {
    name: 10,
    phone: 10,
    role: 5
  };

  const roleSpecificFields = {
    farmer: { farmLocation: 15, landArea: 10, mainCrops: 10, farmingExperience: 10 },
    buyer: { 'businessDetails.businessName': 15, 'businessDetails.businessType': 10, 'businessDetails.businessLocation': 10 },
    transport: { 'transportDetails.companyName': 15, 'transportDetails.vehicleTypes': 10, 'transportDetails.serviceAreas': 10 },
    storage: { 'storageDetails.storageName': 15, 'storageDetails.storageType': 10, 'storageDetails.storageLocation': 10 }
  };

  Object.keys(requiredFields).forEach(field => {
    if (this[field]) completion += requiredFields[field];
  });

  if (roleSpecificFields[this.role]) {
    Object.keys(roleSpecificFields[this.role]).forEach(field => {
      const value = field.includes('.')
        ? field.split('.').reduce((obj, key) => obj && obj[key], this)
        : this[field];

      if (value && (Array.isArray(value) ? value.length > 0 : value.toString().trim() !== '')) {
        completion += roleSpecificFields[this.role][field];
      }
    });
  }

  if (this.profileImage) completion += 5;

  this.profileCompletion = Math.min(completion, 100);
  next();
});

// Compare password
userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Account lock check
userSchema.methods.isLocked = function() {
  return !!(this.lockUntil && this.lockUntil > Date.now());
};

// Remove sensitive fields
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  delete user.loginAttempts;
  delete user.lockUntil;
  return user;
};

module.exports = mongoose.model('User', userSchema);
