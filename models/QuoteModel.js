const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuoteSchema = new Schema({
   

   
    nameOfAuthor: {
        type: String,
        unique: true,
        
    },

    quote: {
        type: String,
        unique: true,
        required: true
    },

   
}, {timestamps: true}); 

const quote= mongoose.model('Quote', QuoteSchema)

module.exports = quote;
