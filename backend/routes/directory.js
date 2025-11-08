const express = require('express');
const router = express.Router();
const directoryController = require('../controllers/directoryController');
const authMiddleware = require('../middleware/auth');

router.get('/farmers', authMiddleware, directoryController.getFarmers);
router.get('/buyers', authMiddleware, directoryController.getBuyers);
router.get('/transport', authMiddleware, directoryController.getTransport);
router.get('/storage', authMiddleware, directoryController.getStorage);

module.exports = router;