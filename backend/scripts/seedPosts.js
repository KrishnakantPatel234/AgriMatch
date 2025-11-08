// scripts/seedPosts.js
const mongoose = require('mongoose');
require('dotenv').config();

const Post = require('../models/Post');
const User = require('../models/User');

async function run() {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/agrimatch';
    await mongoose.connect(uri);

    // Ensure at least four demo users exist
    const users = {};
    const ensureUser = async (name, role, email, phone, password='demo123') => {
      let u = await User.findOne({ $or: [{ email }, { phone }] });
      if (!u) {
        u = await User.create({ name, role, email, phone, password });
      }
      users[role] = u;
      return u;
    };

    await ensureUser('Rajesh Kumar', 'farmer', 'farmer@example.com', '+919876543210');
    await ensureUser('FreshMart Stores', 'buyer', 'buyer@example.com', '+919876543211');
    await ensureUser('Swift Logistics', 'transport', 'transport@example.com', '+919876543212');
    await ensureUser('CoolStore Facilities', 'storage', 'storage@example.com', '+919876543213');

    // Seed posts
    await Post.deleteMany({});
    await Post.insertMany([
      {
        userId: users.farmer._id,
        userType: 'farmer',
        type: 'farmer',
        title: 'Fresh Tomatoes Next Week',
        description: 'Harvesting 2 tons of tomatoes. Organic, high quality.',
        cropDetails: { cropName: 'Tomatoes', quantity: 2000, unit: 'kg', price: 30, isOrganic: true }
      },
      {
        userId: users.buyer._id,
        userType: 'buyer',
        type: 'buyer',
        title: 'Looking for Potatoes',
        description: 'Requirement of 1500 kg potatoes, Nashik region.',
        requirementDetails: { product: 'Potatoes', quantity: 1500, budget: 18 }
      },
      {
        userId: users.transport._id,
        userType: 'transport',
        type: 'transport',
        title: 'Refrigerated Van Available',
        description: 'Pune → Mumbai, 5 tons capacity, tomorrow morning.',
        transportDetails: { vehicleType: 'Refrigerated Van', capacity: 5000, fromLocation: 'Pune', toLocation: 'Mumbai', price: 12000 }
      },
      {
        userId: users.storage._id,
        userType: 'storage',
        type: 'storage',
        title: 'Cold Storage Space Open',
        description: 'Nashik facility, 20 tons, 2 months.',
        storageDetails: { spaceAvailable: 20000, temperature: '4°C', pricePerKg: 1.2, location: 'Nashik' }
      }
    ]);

    console.log('✅ Seeded demo users and posts');
    await mongoose.disconnect();
  } catch (err) {
    console.error('❌ Seed error', err);
    process.exit(1);
  }
}

run();
