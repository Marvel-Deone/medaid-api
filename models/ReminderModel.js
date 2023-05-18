const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const reminderSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    reminder: {
        title: {
            type: String,
            required: true
        },
        date: {
            type: String,
            required: true
        },
        time: {
            type: String,
            required: true
        }
    }
},  {timestamps: true});

const reminder = mongoose.model('Reminder', reminderSchema)

module.exports = reminder;