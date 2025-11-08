const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/me', authMiddleware, authController.getMe);
router.get('/validate', authMiddleware, authController.validateToken);
router.post('/logout', authMiddleware, authController.logout);

module.exports = router;