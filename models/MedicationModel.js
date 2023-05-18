const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const medicationSchema = new Schema({
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
    medication: {
        drug_name: {
            type: String,
            required: true
        },
        dose: {
            type: String,
            required: true
        },
        daily: {
            type: String,
            required: true
        },
        interval: {
         is_morning: Boolean,
         is_afternoon: Boolean,
         is_night: Boolean
        },
    }
},  {timestamps: true});

const medication = mongoose.model('Medication', medicationSchema)

module.exports = medication;