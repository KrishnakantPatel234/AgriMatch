const Post = require('../models/Post');
const User = require('../models/User');

class PostController {
  // Create a new post
  async createPost(req, res) {
  try {
    const {
      title,
      description,
      price,
      quantity,
      unit,
      media,
      category,
      cropType,
      qualityGrade,
      availableFrom,
      deliveryOptions,
      location
    } = req.body;

    // Required fields check
    if (!title || !description || !price || !quantity || !unit || !cropType || !location) {
      return res.status(400).json({
        message: "Missing required fields"
      });
    }

    // Fetch farmer
    const farmer = await User.findById(req.userId);
    if (!farmer) return res.status(404).json({ message: "Farmer not found" });

    const postData = {
      title,
      description,
      price,
      quantity,
      unit,
      media: Array.isArray(media) ? media : [],

      cropType,
      qualityGrade,
      availableFrom,
      deliveryOptions,

      location,
      category: category || "produce",

      farmerId: req.userId,
      farmerName: farmer.name,
      contactInfo: {
        phone: farmer.phone,
        email: farmer.email
      }
    };

    const post = await Post.create(postData);

    await post.populate("farmerId", "name phone email farmLocation");

    res.status(201).json({
      message: "Post created successfully",
      post
    });

  } catch (error) {
    console.error("Create post error:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
}


  // Get all posts (for farmers page)
  async getAllPosts(req, res) {
    try {
      const posts = await Post.find().sort({ createdAt: -1 });
      res.json({ success: true, posts });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to load posts" });
    }
    
  }

  // Get posts by specific farmer
  async getFarmerPosts(req, res) {
    try {
      const farmerId = req.params.farmerId;
      const { page = 1, limit = 10 } = req.query;

      // Verify the farmer exists
      const farmer = await User.findById(farmerId);
      if (!farmer) {
        return res.status(404).json({ message: 'Farmer not found' });
      }

      const posts = await Post.find({ farmerId })
        .populate('farmerId', 'name phone email farmLocation')
        .sort({ createdAt: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit);

      const total = await Post.countDocuments({ farmerId });

      res.json({
        posts,
        totalPages: Math.ceil(total / limit),
        currentPage: parseInt(page),
        total
      });

    } catch (error) {
      console.error('Get farmer posts error:', error);
      res.status(500).json({ 
        message: 'Internal server error',
        error: error.message 
      });
    }
  }

  // Get single post by ID
  async getPostById(req, res) {
    try {
      const post = await Post.findById(req.params.id)
        .populate('farmerId', 'name phone email farmLocation rating');

      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      res.json(post);

    } catch (error) {
      console.error('Get post by ID error:', error);
      res.status(500).json({ 
        message: 'Internal server error',
        error: error.message 
      });
    }
  }

  // Update post
  async updatePost(req, res) {
    try {
      const post = await Post.findById(req.params.id);

      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      // Check if user owns the post
      if (post.farmerId.toString() !== req.userId) {
        return res.status(403).json({ message: 'Access denied' });
      }

      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      ).populate('farmerId', 'name phone email farmLocation');

      res.json({
        message: 'Post updated successfully',
        post: updatedPost
      });

    } catch (error) {
      console.error('Update post error:', error);
      res.status(500).json({ 
        message: 'Internal server error',
        error: error.message 
      });
    }
  }

  // Delete post
  async deletePost(req, res) {
    try {
      const post = await Post.findById(req.params.id);

      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      // Check if user owns the post
      if (post.farmerId.toString() !== req.userId) {
        return res.status(403).json({ message: 'Access denied' });
      }

      await Post.findByIdAndDelete(req.params.id);

      res.json({ message: 'Post deleted successfully' });

    } catch (error) {
      console.error('Delete post error:', error);
      res.status(500).json({ 
        message: 'Internal server error',
        error: error.message 
      });
    }
  }

  // Mark post as sold
  async markAsSold(req, res) {
    try {
      const post = await Post.findById(req.params.id);

      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      if (post.farmerId.toString() !== req.userId) {
        return res.status(403).json({ message: 'Access denied' });
      }

      post.status = 'sold';
      await post.save();

      res.json({ 
        message: 'Post marked as sold', 
        post 
      });

    } catch (error) {
      console.error('Mark as sold error:', error);
      res.status(500).json({ 
        message: 'Internal server error',
        error: error.message 
      });
    }
  }

  // Search posts
  async searchPosts(req, res) {
    try {
      const { q, category, location, minPrice, maxPrice } = req.query;

      const filter = { status: 'active' };

      if (q) {
        filter.$or = [
          { title: { $regex: q, $options: 'i' } },
          { description: { $regex: q, $options: 'i' } },
          { farmerName: { $regex: q, $options: 'i' } }
        ];
      }

      if (category) filter.category = category;
      if (location) {
        filter.location = { $regex: location, $options: 'i' };
      }
      if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice) filter.price.$gte = parseFloat(minPrice);
        if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
      }

      const posts = await Post.find(filter)
        .populate('farmerId', 'name phone email farmLocation rating')
        .sort({ createdAt: -1 })
        .limit(20);

      res.json(posts);

    } catch (error) {
      console.error('Search posts error:', error);
      res.status(500).json({ 
        message: 'Internal server error',
        error: error.message 
      });
    }
  }
}

module.exports = new PostController();