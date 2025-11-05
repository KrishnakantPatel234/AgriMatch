const express = require('express');
const Transport = require('../models/Transport');
const router = express.Router();

// Get all transport providers
router.get('/', async (req, res) => {
  try {
    const { state, city, vehicleType, service, minRating } = req.query;
    
    let filter = { isVerified: true };
    if (state) filter['location.state'] = new RegExp(state, 'i');
    if (city) filter['location.city'] = new RegExp(city, 'i');
    if (vehicleType) filter.vehicleType = vehicleType;
    if (service) filter.services = new RegExp(service, 'i');
    if (minRating) filter['rating.average'] = { $gte: parseFloat(minRating) };

    const transports = await Transport.find(filter)
      .populate('userId', 'name profileImage email')
      .sort({ 'rating.average': -1 });

    res.json({ success: true, transports });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Create/update transport profile
router.post('/profile', async (req, res) => {
  try {
    const { userId, ...profileData } = req.body;
    
    let transport = await Transport.findOne({ userId });
    
    if (transport) {
      transport = await Transport.findOneAndUpdate(
        { userId },
        profileData,
        { new: true }
      ).populate('userId', 'name profileImage email');
    } else {
      transport = new Transport({ userId, ...profileData });
      await transport.save();
      transport = await transport.populate('userId', 'name profileImage email');
    }

    res.json({ success: true, transport });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;