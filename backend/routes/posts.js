const express = require('express');
const Post = require('../models/Post');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Create a new post (protected)
router.post('/', protect, async (req, res) => {
  try {
    const {
      userType,
      type,
      title = '',
      description = '',
      cropDetails,
      requirementDetails,
      transportDetails,
      storageDetails,
      images = []
    } = req.body;

    if (!userType || !type) {
      return res.status(400).json({ success: false, message: 'userType and type are required' });
    }

    const post = await Post.create({
      userId: req.user.id,
      userType,
      type,
      title,
      description,
      cropDetails,
      requirementDetails,
      transportDetails,
      storageDetails,
      images
    });

    res.status(201).json({ success: true, data: post });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get posts, optionally filtered by userType (public)
router.get('/', async (req, res) => {
  try {
    const { userType } = req.query;
    const filter = { isActive: true };
    if (userType) filter.userType = userType;

    const posts = await Post.find(filter)
      .sort({ createdAt: -1 })
      .limit(100);

    res.json({ success: true, count: posts.length, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get posts by the current user (protected)
router.get('/my', protect, async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, count: posts.length, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get posts by a user id (protected)
router.get('/user/:userId', protect, async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.params.userId })
      .sort({ createdAt: -1 });
    res.json({ success: true, count: posts.length, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
