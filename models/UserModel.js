const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String
    },
    
    lastName: {
        type: String
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
        unique: true,
        required: true
    },

    address: {
        type: String
    },

    dob: {
        type: String,
    },

    gender: {
        type: String
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
    },
    confirm_email_pin:{
        type: String,  
    },
    connections:{
        type:Array
    }
}, {timestamps: true}); 

const user = mongoose.model('User', userSchema)

module.exports = user;
