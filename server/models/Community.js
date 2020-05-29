const mongoose = require('mongoose');

const communitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A community needs a name.'],
        validate: {
            validator: value => /^[\w\-\s]+$/.test(value),
            message: ({value}) => `${value} is not a valid name.`
        }
    },
    slug: {
        type: String,
        lowercase: true,
        unique: true
    },
    parent: {
        type: mongoose.Schema.ObjectId,
        ref: 'Community'
    }
});

communitySchema.pre('save', function (next) {
    this.slug = name.toLowerCase().replace(/ /g, "_");
});

const Community = mongoose.model('Community', communitySchema);

module.exports = Community;