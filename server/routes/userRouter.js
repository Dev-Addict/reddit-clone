const express = require('express');

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/auth/checktoken').post(authController.protect, authController.isSignedIn);
router.route('/auth/logout').get(authController.logOut);
router.route('/auth/signin').post(authController.signIn);
router.route('/auth/signup').post(authController.signUp);

router.route('/')
    .get(userController.getUsers)
    .post(authController.protect, authController.restrictTo('admin'), userController.createUser);
router.route('/:id')
    .get(userController.getUser)
    .patch(authController.protect, authController.restrictTo('admin', 'selfUser'), userController.updateUser)
    .delete(authController.protect, authController.restrictTo('admin', 'selfUser'), userController.deleteUser);

module.exports = router;