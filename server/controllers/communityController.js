const factory = require('./handlerFactory');
const Community = require('../models/Community');

exports.getCommunitys = factory.getAll(Community);

exports.createCommunity = factory.createOne(Community);

exports.getCommunity = factory.getOne(Community);

exports.updateCommunity = factory.updateOne(Community);

exports.deleteCommunity = factory.deleteOne(Community);