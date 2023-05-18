const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sosContactSchema = new Schema({
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

    sosContact: {
        contact_name: {
            type: String,
            required: true
        },
        contact_number: {
            type: String,
            required: true
        }
    }
}, {timestamps: true});

const sosContact = mongoose.model('SosContact', sosContactSchema)

module.exports =  sosContact;