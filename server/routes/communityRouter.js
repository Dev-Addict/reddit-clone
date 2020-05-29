const express = require('express');

const communityController = require('../controllers/communityController');
const authController = require('../controllers/authController');
const upload = require('../utils/upload');

const router = express.Router();

router.route('/')
    .get(communityController.getCommunities)
    .post(authController.protect, upload.single('image'), communityController.saveCommunityImage, communityController.createCommunity);
router.route('/:id')
    .get(communityController.getCommunity)
    .patch(authController.protect, authController.restrictTo('admin'), upload.single('image'), communityController.saveCommunityImage,  communityController.updateCommunity)
    .delete(authController.protect, authController.restrictTo('admin'), communityController.deleteCommunity);

module.exports = router;