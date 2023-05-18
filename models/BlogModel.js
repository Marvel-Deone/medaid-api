const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true
    },

    position: {
        type: String,
        default: ''
    },

    article: {
        type: String,
        required: true,
        default: ''
    },
}, {timestamps: true});

const blog = mongoose.model('Blog', BlogSchema)

module.exports =  blog;