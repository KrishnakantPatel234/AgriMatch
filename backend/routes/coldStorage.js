const express = require('express');
const ColdStorage = require('../models/ColdStorage');
const router = express.Router();

// Get all cold storage providers
router.get('/', async (req, res) => {
  try {
    const { state, city, service, minRating } = req.query;
    
    let filter = { isVerified: true };
    if (state) filter['location.state'] = new RegExp(state, 'i');
    if (city) filter['location.city'] = new RegExp(city, 'i');
    if (service) filter.services = new RegExp(service, 'i');
    if (minRating) filter['rating.average'] = { $gte: parseFloat(minRating) };

    const storages = await ColdStorage.find(filter)
      .populate('userId', 'name profileImage email')
      .sort({ 'rating.average': -1 });

    res.json({ success: true, storages });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Create/update cold storage profile
router.post('/profile', async (req, res) => {
  try {
    const { userId, ...profileData } = req.body;
    
    let storage = await ColdStorage.findOne({ userId });
    
    if (storage) {
      storage = await ColdStorage.findOneAndUpdate(
        { userId },
        profileData,
        { new: true }
      ).populate('userId', 'name profileImage email');
    } else {
      storage = new ColdStorage({ userId, ...profileData });
      await storage.save();
      storage = await storage.populate('userId', 'name profileImage email');
    }

    res.json({ success: true, storage });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;