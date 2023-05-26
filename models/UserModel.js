const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    role_id: {
        type: Number,
        default: '1',
        required: true
    },
    firstName: {
        type: String,
        default: ''
    },
    
    lastName: {
        type: String,
        default: ''
    },

    middleName: {
        type: String,
        default: ''
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
        type: String,
        default: ''
    },

    dob: {
        type: String,
        default: ''
    },

    gender: {
        type: String,
        default: ''
    },

    blood_group: {
        type: String,
        default: ''
    },

    genotype: {
        type: String,
        default: ''
    },

    current_medical_condition: {
        type: String,
        default: ''
    },

    past_medical_condition: {
        type: String,
        default: ''
    },

    allergies: {
        type: String,
        default: ''
    },

    medication: {
        type: String,
        default: ''
    },

    medical_note: {
        type: String,
        default: ''
    },
    
    password: {
        type: String,
        required: true
    },
  
    connections:{
        type:Array
    },
    is_verified: {
        type: Boolean,
        required: true,
        default: false
    }
}, {timestamps: true}); 

const user = mongoose.model('User', userSchema)

module.exports = user;