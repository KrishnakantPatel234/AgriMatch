const express = require('express');
const Farmer = require('../models/Farmer');
const User = require('../models/User');
const router = express.Router();

// Get all farmers with filters
router.get('/', async (req, res) => {
  try {
    const {
      state,
      city,
      crop,
      organic,
      minRating,
      page = 1,
      limit = 12
    } = req.query;

    let filter = { isVerified: true };

    // Apply filters
    if (state) filter['location.state'] = new RegExp(state, 'i');
    if (city) filter['location.city'] = new RegExp(city, 'i');
    if (crop) filter['crops.name'] = new RegExp(crop, 'i');
    if (organic === 'true') filter['crops.isOrganic'] = true;
    if (minRating) filter['rating.average'] = { $gte: parseFloat(minRating) };

    const farmers = await Farmer.find(filter)
      .populate('userId', 'name profileImage email')
      .sort({ 'rating.average': -1, createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Farmer.countDocuments(filter);

    res.json({
      success: true,
      farmers,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get farmers error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get single farmer by ID
router.get('/:id', async (req, res) => {
  try {
    const farmer = await Farmer.findById(req.params.id)
      .populate('userId', 'name profileImage email');

    if (!farmer) {
      return res.status(404).json({ success: false, message: 'Farmer not found' });
    }

    res.json({ success: true, farmer });
  } catch (error) {
    console.error('Get farmer error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Create/Update farmer profile
router.post('/profile', async (req, res) => {
  try {
    const {
      userId,
      farmName,
      farmImage,
      state,
      city,
      pincode,
      crops,
      farmSize,
      certifications,
      description,
      phone
    } = req.body;

    let farmer = await Farmer.findOne({ userId });

    if (farmer) {
      // Update existing profile
      farmer = await Farmer.findOneAndUpdate(
        { userId },
        {
          farmName,
          farmImage,
          'location.state': state,
          'location.city': city,
          'location.pincode': pincode,
          crops,
          farmSize,
          certifications,
          description,
          'contact.phone': phone
        },
        { new: true }
      ).populate('userId', 'name profileImage email');
    } else {
      // Create new profile
      farmer = new Farmer({
        userId,
        farmName,
        farmImage,
        location: { state, city, pincode },
        crops,
        farmSize,
        certifications,
        description,
        contact: { phone }
      });
      await farmer.save();
      farmer = await farmer.populate('userId', 'name profileImage email');
    }

    res.json({ success: true, farmer });
  } catch (error) {
    console.error('Save farmer profile error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Search farmers
router.get('/search/:query', async (req, res) => {
  try {
    const { query } = req.params;
    const farmers = await Farmer.find({
      $or: [
        { farmName: new RegExp(query, 'i') },
        { 'crops.name': new RegExp(query, 'i') },
        { 'location.city': new RegExp(query, 'i') },
        { 'location.state': new RegExp(query, 'i') }
      ],
      isVerified: true
    })
    .populate('userId', 'name profileImage email')
    .limit(10);

    res.json({ success: true, farmers });
  } catch (error) {
    console.error('Search farmers error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;