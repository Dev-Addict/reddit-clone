const sharp = require('sharp');

const factory = require('./handlerFactory');
const User = require('../models/User');
const catchRequest = require('../utils/catchRequest');

exports.getUsers = factory.getAll(User);

exports.createUser = factory.createOne(User);

exports.getUser = factory.getOne(User);

exports.updateUser = factory.updateOne(User);

exports.deleteUser = factory.deleteOne(User);

exports.saveUserImages = catchRequest(
    async (req, res, next) => {
        if (req.files) {
            if (req.files.avatarImage && req.files.avatarImage.length === 1) {
                const ext = req.files.avatarImage[0].mimetype.split('/')[1];
                req.files.avatarImage[0].filename = `user-avatar-${req.user.id}-${Date.now()}.${ext}`;
                req.body.avatarImage = req.files.avatarImage[0].filename;
                await sharp(req.files.avatarImage[0].buffer)
                    .resize(500, 500)
                    .toFormat('jpeg')
                    .jpeg({ quality: 90 })
                    .toFile(`uploads/useravatar/${req.files.avatarImage[0].filename}`);
            }
            if (req.files.bannerImage && req.files.bannerImage.length === 1) {
                const ext = req.files.bannerImage[0].mimetype.split('/')[1];
                req.files.bannerImage[0].filename = `user-banner-${req.user.id}-${Date.now()}.${ext}`;
                req.body.bannerImage = req.files.bannerImage[0].filename;
                await sharp(req.files.bannerImage[0].buffer)
                    .toFormat('jpeg')
                    .jpeg({ quality: 90 })
                    .toFile(`uploads/userbanner/${req.files.bannerImage[0].filename}`);
            }
        }
        next();
    }
);