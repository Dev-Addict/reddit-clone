const express = require('express');

const postController = require('../controllers/postController');
const authController = require('../controllers/authController');
const upload = require('../utils/upload');

const router = express.Router();

router.route('/')
    .get(postController.getPosts)
    .post(authController.protect, postController.setAuthor, postController.createPost);
router.route('/:id')
    .get(postController.getPost)
    .patch(authController.protect, authController.restrictTo('admin', 'selfAuthor'), postController.setAuthor, postController.updatePost)
    .delete(authController.protect, authController.restrictTo('admin', 'selfAuthor'), postController.deletePost);

module.exports = router;