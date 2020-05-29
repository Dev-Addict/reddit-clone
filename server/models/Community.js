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
    },
    image: {
        type: String,
        default: 'default.jpg'
    }
});

communitySchema.pre('save', function (next) {
    this.slug = this.name.toLowerCase().replace(/ /g, "_");
    next();
});

const Community = mongoose.model('Community', communitySchema);

module.exports = Community;