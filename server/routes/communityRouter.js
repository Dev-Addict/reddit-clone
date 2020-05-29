const express = require('express');

const communityController = require('../controllers/communityController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/')
    .get(communityController.getCommunitys)
    .post(authController.protect, communityController.createCommunity);
router.route('/:id')
    .get(communityController.getCommunity)
    .patch(authController.protect, authController.restrictTo('admin'), communityController.updateCommunity)
    .delete(authController.protect, authController.restrictTo('admin'), communityController.deleteCommunity);

module.exports = router;