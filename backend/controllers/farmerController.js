const Farmer = require('../models/Farmer');
const Post = require('../models/Post');

class FarmerController {
  // Get complete farm data
  async getFarmData(req, res) {
    try {
      const farmerId = req.params.id;
      
      console.log('Fetching farmer with ID:', farmerId); // Debug log

      // Fix: Use mongoose.Types.ObjectId for proper ID handling
      const farmer = await Farmer.findById(farmerId).populate('userId', 'name email');
      
      if (!farmer) {
        console.log('Farmer not found with ID:', farmerId);
        return res.status(404).json({ message: 'Farmer not found' });
      }

      // Fix: Check if user has access to this farmer's data
      // Assuming req.user.id is the user's ID from auth middleware
      if (req.user.id !== farmer.userId.toString() && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
      }

      // Calculate real-time stats
      const posts = await Post.find({ farmerId: farmer._id });
      const monthlyRevenue = posts.reduce((sum, post) => {
        if (post.status === 'sold') {
          return sum + (post.price * post.quantity);
        }
        return sum;
      }, 0);

      const activeCrops = farmer.crops.length; // All crops in the array are considered active

      res.json({
        _id: farmer._id,
        farmName: farmer.farmName,
        farmImage: farmer.farmImage,
        location: farmer.location,
        crops: farmer.crops,
        farmSize: farmer.farmSize,
        certifications: farmer.certifications,
        description: farmer.description,
        contact: farmer.contact,
        isVerified: farmer.isVerified,
        rating: farmer.rating,
        availability: farmer.availability,
        userId: farmer.userId,
        stats: {
          activeCrops,
          monthlyRevenue,
          rating: farmer.rating.average,
          growthRate: await this.calculateGrowthRate(farmer._id)
        }
      });

    } catch (error) {
      console.error('Get farm data error:', error);
      // Check if it's a CastError (invalid ID format)
      if (error.name === 'CastError') {
        return res.status(400).json({ message: 'Invalid farmer ID format' });
      }
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Update farmer profile
  async updateProfile(req, res) {
    try {
      const farmerId = req.params.id;
      
      const farmer = await Farmer.findById(farmerId);
      
      if (!farmer) {
        return res.status(404).json({ message: 'Farmer not found' });
      }

      // Check if user owns this farmer profile
      if (req.user.id !== farmer.userId.toString()) {
        return res.status(403).json({ message: 'Access denied' });
      }

      const updatedFarmer = await Farmer.findByIdAndUpdate(
        farmerId,
        req.body,
        { new: true, runValidators: true }
      );

      res.json({
        message: 'Profile updated successfully',
        farmer: updatedFarmer
      });

    } catch (error) {
      console.error('Update profile error:', error);
      if (error.name === 'CastError') {
        return res.status(400).json({ message: 'Invalid farmer ID format' });
      }
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Get farmer's crops
  async getCrops(req, res) {
    try {
      const farmerId = req.params.id;
      const farmer = await Farmer.findById(farmerId);
      
      if (!farmer) {
        return res.status(404).json({ message: 'Farmer not found' });
      }

      res.json(farmer.crops);
    } catch (error) {
      console.error('Get crops error:', error);
      if (error.name === 'CastError') {
        return res.status(400).json({ message: 'Invalid farmer ID format' });
      }
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Add new crop
  async addCrop(req, res) {
    try {
      const farmerId = req.params.id;
      const cropData = req.body;

      const farmer = await Farmer.findById(farmerId);
      
      if (!farmer) {
        return res.status(404).json({ message: 'Farmer not found' });
      }

      // Check if user owns this farmer profile
      if (req.user.id !== farmer.userId.toString()) {
        return res.status(403).json({ message: 'Access denied' });
      }

      farmer.crops.push(cropData);
      await farmer.save();

      // Return the newly added crop
      const newCrop = farmer.crops[farmer.crops.length - 1];

      res.status(201).json({
        message: 'Crop added successfully',
        crop: newCrop
      });

    } catch (error) {
      console.error('Add crop error:', error);
      if (error.name === 'CastError') {
        return res.status(400).json({ message: 'Invalid farmer ID format' });
      }
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Update crop
  async updateCrop(req, res) {
    try {
      const { id: farmerId, cropId } = req.params;
      const cropData = req.body;

      const farmer = await Farmer.findById(farmerId);
      
      if (!farmer) {
        return res.status(404).json({ message: 'Farmer not found' });
      }

      // Check if user owns this farmer profile
      if (req.user.id !== farmer.userId.toString()) {
        return res.status(403).json({ message: 'Access denied' });
      }

      // Find and update the crop
      const cropIndex = farmer.crops.id(cropId);
      if (!cropIndex) {
        return res.status(404).json({ message: 'Crop not found' });
      }

      // Update crop fields
      Object.assign(cropIndex, cropData);
      await farmer.save();

      res.json({
        message: 'Crop updated successfully',
        crop: cropIndex
      });

    } catch (error) {
      console.error('Update crop error:', error);
      if (error.name === 'CastError') {
        return res.status(400).json({ message: 'Invalid farmer ID format' });
      }
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Delete crop
  async deleteCrop(req, res) {
    try {
      const { id: farmerId, cropId } = req.params;

      const farmer = await Farmer.findById(farmerId);
      
      if (!farmer) {
        return res.status(404).json({ message: 'Farmer not found' });
      }

      // Check if user owns this farmer profile
      if (req.user.id !== farmer.userId.toString()) {
        return res.status(403).json({ message: 'Access denied' });
      }

      // Remove the crop
      farmer.crops.pull(cropId);
      await farmer.save();

      res.json({
        message: 'Crop deleted successfully'
      });

    } catch (error) {
      console.error('Delete crop error:', error);
      if (error.name === 'CastError') {
        return res.status(400).json({ message: 'Invalid farmer ID format' });
      }
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Get farmer stats
  async getStats(req, res) {
    try {
      const farmerId = req.params.id;
      const farmer = await Farmer.findById(farmerId);
      
      if (!farmer) {
        return res.status(404).json({ message: 'Farmer not found' });
      }

      const posts = await Post.find({ farmerId: farmer._id });
      const monthlyRevenue = posts.reduce((sum, post) => {
        if (post.status === 'sold') {
          return sum + (post.price * post.quantity);
        }
        return sum;
      }, 0);

      const activeCrops = farmer.crops.length;

      res.json({
        activeCrops,
        monthlyRevenue,
        rating: farmer.rating.average,
        growthRate: await this.calculateGrowthRate(farmer._id)
      });

    } catch (error) {
      console.error('Get stats error:', error);
      if (error.name === 'CastError') {
        return res.status(400).json({ message: 'Invalid farmer ID format' });
      }
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Get market insights
  async getMarketInsights(req, res) {
    try {
      const farmerId = req.params.id;
      const farmer = await Farmer.findById(farmerId);
      
      if (!farmer) {
        return res.status(404).json({ message: 'Farmer not found' });
      }

      // Simple market insights based on farmer's crops
      const insights = farmer.crops.map(crop => ({
        crop: crop.name,
        category: crop.category,
        currentPrice: crop.pricePerUnit,
        demand: 'medium', // Placeholder
        recommendation: 'Consider expanding production' // Placeholder
      }));

      res.json(insights);

    } catch (error) {
      console.error('Get market insights error:', error);
      if (error.name === 'CastError') {
        return res.status(400).json({ message: 'Invalid farmer ID format' });
      }
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Calculate growth rate (placeholder)
  async calculateGrowthRate(farmerId) {
    // Simple growth rate calculation based on post activity
    const posts = await Post.find({ farmerId });
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const currentMonthPosts = posts.filter(post => {
      const postDate = new Date(post.createdAt);
      return postDate.getMonth() === currentMonth && postDate.getFullYear() === currentYear;
    });
    
    const lastMonthPosts = posts.filter(post => {
      const postDate = new Date(post.createdAt);
      return postDate.getMonth() === currentMonth - 1 && postDate.getFullYear() === currentYear;
    });

    if (lastMonthPosts.length === 0) return 0;
    
    return ((currentMonthPosts.length - lastMonthPosts.length) / lastMonthPosts.length) * 100;
  }
}

module.exports = new FarmerController();