const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    
    lastName: {
        type: String,
        required: true
    },

    middleName: {
        type: String
    },

    username: {
        type: String,
        unique: true,
        required: true
    },

    email: {
        type: String,
        unique: true,
        required: true
    },

    phone: {
        type: String,
        unique: true
    },

    address: {
        type: String,
        required: true
    },

    dob: {
        type: String,
        required: true
    },

    gender: {
        type: String,
        required: true
    },

    blood_group: {
        type: String
    },

    genotype: {
        type: String
    },

    current_medical_condition: {
        type: String
    },

    past_medical_condition: {
        type: String
    },

    password: {
        type: String,
        required: true
    }
}, {timestamps: true}); 

const user = mongoose.model('User', userSchema)

module.exports = user;