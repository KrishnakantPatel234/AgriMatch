const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authMiddleware = require('../middleware/auth');

// Public routes
router.get('/', postController.getAllPosts);
router.get('/search', postController.searchPosts);
router.get('/:id', postController.getPostById);
router.get('/farmer/:farmerId', postController.getFarmerPosts);

// Protected routes (require authentication)
router.use(authMiddleware);

router.post('/', postController.createPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);
router.patch('/:id/sold', postController.markAsSold);

module.exports = router;