const factory = require('./handlerFactory');
const Post = require('../models/Post');

exports.getPosts = factory.getAll(Post);

exports.createPost = factory.createOne(Post);

exports.getPost = factory.getOne(Post);

exports.updatePost = factory.updateOne(Post);

exports.deletePost = factory.deleteOne(Post);