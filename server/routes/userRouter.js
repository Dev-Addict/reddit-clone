const express = require('express');

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const upload = require('../utils/upload');

const router = express.Router();

router.route('/auth/checktoken').post(authController.protect, authController.isSignedIn);
router.route('/auth/logout').get(authController.logOut);
router.route('/auth/signin').post(authController.signIn);
router.route('/auth/signup').post(authController.signUp);
router.route('/auth/forgotpassword').post(authController.forgotPassword);
router.route('/auth/resetpassword/:resetToken').patch(authController.resetPassword);
router.route('/auth/verifyemail').post(authController.verifyEmailToken);

router.route('/')
    .get(userController.getUsers)
    .post(authController.protect, authController.restrictTo('admin'), upload.fields([
        {
            name: 'avatarImage',
            maxCount: 1
        },
        {
            name: 'bannerImage',
            maxCount: 1
        }
    ]), userController.saveUserImages, userController.createUser);
router.route('/:id')
    .get(userController.getUser)
    .patch(authController.protect, authController.restrictTo('admin', 'selfUser'), upload.fields([
        {
            name: 'avatarImage',
            maxCount: 1
        },
        {
            name: 'bannerImage',
            maxCount: 1
        }
    ]), userController.saveUserImages, userController.updateUser)
    .delete(authController.protect, authController.restrictTo('admin', 'selfUser'), userController.deleteUser);

module.exports = router;