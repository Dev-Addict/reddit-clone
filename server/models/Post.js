const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, 'A Post Must Have A content']
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    community: {
        type: [mongoose.Schema.ObjectId],
        ref: 'Community',
        maxLength: 5
    }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;