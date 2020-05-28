const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'A user must have a email.'],
        validate: {
            validator: value => /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(value),
            message: ({value}) => `${value} is not a valid email.`
        },
        lowercase: true
    },
    username: {
        type: String,
        required: [true, 'A user must have a username'],
        validate: {
            validator: value => /^(?=[a-zA-Z0-9._]{4,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/.test(value),
            message: ({value}) => `${value} is not a valid username`
        }
    },
    usernameSlug: {
        type: String,
        unique: [true, 'Username is already taken.'],
        select: false
    },
    displayName: {
        type: String,
        maxLength: [20, 'User\'s display name\'s length must be lower than 20 or 20.'],
        minLength: [4, 'User\'s display name\'s length must be higher than 4 or 4.']
    },
    about: {
        type: String,
        maxLength: [20, 'User\'s about text\'s length must be lower than 200 or 200.'],
    },
    avatarImage: {
        type: String,
        default: 'default.jpg'
    },
    bannerImage: {
        type: String,
        default: 'default.jpg'
    },
    NSFW: {
        type: Boolean,
        default: false
    },
    private: {
        type: Boolean,
        default: false
    },
    showActivity: {
        type: Boolean,
        default: true
    },
    password: {
        type: String,
        required: [true, 'A User Must Have A password'],
        validate: {
            validator: value => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,100}$/.test(value),
            message: 'Invalid password.'
        },
        select: false
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    showInSearch: {
        type: Boolean,
        default: true
    },
    TFA: {
        type: Boolean,
        default: false
    },
    isEmailValidated: {
        type: Boolean,
        default: false
    },
    showAdultContent: {
        type: Boolean,
        default: false
    },
    safeBrowsing: {
        type: Boolean,
        default: false
    },
    autoplayMedia: {
        type: Boolean,
        default: true
    },
    inboxNotification: {
        type: Boolean,
        default: true
    },
    inboxMarkAsRead: {
        type: Boolean,
        default: true
    },
    mentionNotification: {
        type: Boolean,
        default: true
    },
    emailNotifications: {
        type: Boolean,
        default: true
    }
});

userSchema.methods.correctPassword = async function(
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.pre('save', function (next) {
    this.usernameSlug = (this.username || '').toLowerCase();
    this.isEmailValidated = false;
    if (this.validateEmail) {
        this.isEmailValidated = true;
    }
    if (!this.isEmailValidated) {
        this.TFA = false;
    }
    next();
});

userSchema.pre('findOneAndUpdate', function(next) {
    if (this._update.username) {
        this._update.usernameSlug = this._update.username.toLowerCase();
    }
    this._update.isEmailValidated = false;
    if (this.validateEmail) {
        this._update.isEmailValidated = true;
    }
    if (!this._update.isEmailValidated) {
        this._update.TFA = false;
    }
    next()
});

userSchema.pre('findOneAndUpdate', async function(next) {
    this._update.password = await bcrypt.hash(this._update.password, 12);
    next();
});

const User = mongoose.model('user', userSchema);

module.exports = User;