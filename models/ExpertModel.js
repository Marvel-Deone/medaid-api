const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExpertSchema = new Schema({
   
    role_id: {
        type: Number,
        default: '2',
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
    confirm_email_pin:{
        type: String,
        default: ''  
    },
    connections:{
        type:Array
    },
    sosContact: {
        type:Array,
        default: []
    },
    bio:{
        type: String,
        default: ''
    },
    selectedJob:{
        type: String,
       
        required: true
    },
    placeofwork:{
        type: String,
      
        required: true
    },
    yearofprac:{
        type: String,
     
        required: true
    },
    recordedvideo:{
        type: String,
   
        required: true
    }

   
   

   
}, {timestamps: true}); 

const expert= mongoose.model('Expert', ExpertSchema)

module.exports = expert;