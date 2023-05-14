const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
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

const notification = mongoose.model('Notification', NotificationSchema)

module.exports =  notification;