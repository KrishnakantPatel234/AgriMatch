const express = require('express');
const Buyer = require('../models/Buyer');
const router = express.Router();

// Get all buyers
router.get('/', async (req, res) => {
  try {
    const { state, city, businessType, minRating } = req.query;
    
    let filter = { isVerified: true };
    if (state) filter['location.state'] = new RegExp(state, 'i');
    if (city) filter['location.city'] = new RegExp(city, 'i');
    if (businessType) filter.businessType = businessType;
    if (minRating) filter['rating.average'] = { $gte: parseFloat(minRating) };

    const buyers = await Buyer.find(filter)
      .populate('userId', 'name profileImage email')
      .sort({ 'rating.average': -1 });

    res.json({ success: true, buyers });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Create/update buyer profile
router.post('/profile', async (req, res) => {
  try {
    const { userId, ...profileData } = req.body;
    
    let buyer = await Buyer.findOne({ userId });
    
    if (buyer) {
      buyer = await Buyer.findOneAndUpdate(
        { userId },
        profileData,
        { new: true }
      ).populate('userId', 'name profileImage email');
    } else {
      buyer = new Buyer({ userId, ...profileData });
      await buyer.save();
      buyer = await buyer.populate('userId', 'name profileImage email');
    }

    res.json({ success: true, buyer });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;