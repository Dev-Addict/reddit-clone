const sharp = require('sharp');

const factory = require('./handlerFactory');
const Community = require('../models/Community');
const catchRequest = require('../utils/catchRequest');

exports.getCommunities = factory.getAll(Community);

exports.createCommunity = factory.createOne(Community);

exports.getCommunity = factory.getOne(Community);

exports.updateCommunity = factory.updateOne(Community);

exports.deleteCommunity = factory.deleteOne(Community);

exports.saveCommunityImage = catchRequest(
    async (req, res, next) => {
        const ext = req.file.mimetype.split('/')[1];
        req.file.filename = `community-image-${req.user.id}-${Date.now()}.${ext}`;
        req.body.image = req.file.filename;
        await sharp(req.file.buffer)
            .toFormat('jpeg')
            .jpeg({quality: 90})
            .toFile(`uploads/communityimage/${req.file.filename}`);
        next();
    }
);