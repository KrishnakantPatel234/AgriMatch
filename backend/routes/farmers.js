const express = require('express');
const router = express.Router();
const farmerController = require('../controllers/farmerController');
const authMiddleware = require('../middleware/auth');

// All routes require authentication
router.use(authMiddleware);

// Farmer profile routes
router.get('/:id', farmerController.getFarmData);
router.put('/:id', farmerController.updateProfile);

// Crop management
router.get('/:id/crops', farmerController.getCrops);
router.post('/:id/crops', farmerController.addCrop);
router.put('/:id/crops/:cropId', farmerController.updateCrop);
router.delete('/:id/crops/:cropId', farmerController.deleteCrop);

// Stats and insights
router.get('/:id/stats', farmerController.getStats);
router.get('/:id/market-insights', farmerController.getMarketInsights);

module.exports = router;