const mongoose = require('mongoose');
const Farmer = require('../models/Farmer');
const User = require('../models/User');
require('dotenv').config();

const sampleFarmers = [
  {
    farmName: "Green Valley Organics",
    location: {
      state: "Maharashtra",
      city: "Nashik",
      pincode: "422001"
    },
    crops: [
      { name: "Tomatoes", category: "vegetables", isOrganic: true, pricePerUnit: 25 },
      { name: "Grapes", category: "fruits", isOrganic: true, pricePerUnit: 60 }
    ],
    farmSize: 10,
    certifications: ["Organic"],
    description: "Family-owned organic farm specializing in premium vegetables and fruits.",
    rating: { average: 4.8, count: 45 }
  },
  {
    farmName: "Punjab Wheat Fields",
    location: {
      state: "Punjab", 
      city: "Amritsar",
      pincode: "143001"
    },
    crops: [
      { name: "Wheat", category: "grains", isOrganic: false, pricePerUnit: 22 },
      { name: "Basmati Rice", category: "grains", isOrganic: false, pricePerUnit: 45 }
    ],
    farmSize: 25,
    certifications: [],
    description: "Traditional wheat and rice farming with modern techniques.",
    rating: { average: 4.5, count: 32 }
  }
];

const seedFarmers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Get a user to associate with farmers
    const user = await User.findOne();
    if (!user) {
      console.log('No users found. Please create a user first.');
      return;
    }

    for (let farmerData of sampleFarmers) {
      const farmer = new Farmer({
        ...farmerData,
        userId: user._id
      });
      await farmer.save();
      console.log(`Created farmer: ${farmer.farmName}`);
    }

    console.log('Sample farmers added successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding farmers:', error);
    process.exit(1);
  }
};

seedFarmers();