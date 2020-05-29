const factory = require('./handlerFactory');
const Post = require('../models/Post');
const catchRequest = require('../utils/catchRequest');

exports.getPosts = factory.getAll(Post);

exports.createPost = factory.createOne(Post);

exports.getPost = factory.getOne(Post);

exports.updatePost = factory.updateOne(Post);

exports.deletePost = factory.deleteOne(Post);

exports.setAuthor = catchRequest(
    (req, res, next) => {
        req.body.author = req.user._id;
        next();
    }
);