const express = require('express');

const postController = require('../controllers/postController');
const authController = require('../controllers/authController');
const upload = require('../utils/upload');

const router = express.Router();

router.route('/')
    .get(postController.getPosts)
    .post(authController.protect, postController.createPost);
router.route('/:id')
    .get(postController.getPost)
    .patch(authController.protect, authController.restrictTo('admin'), postController.updatePost)
    .delete(authController.protect, authController.restrictTo('admin'), postController.deletePost);

module.exports = router;