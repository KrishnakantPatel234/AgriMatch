const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const authMiddleware = require('../middleware/auth');

router.get('/:role/stats', authMiddleware, dashboardController.getStats);
router.get('/:role/activity', authMiddleware, dashboardController.getRecentActivity);

module.exports = router;