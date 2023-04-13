const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    messages:{
        text:{
            type: String,
            required:true,
        },
        users:Array,
        sender:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        }
    }
  }, {timestamps: true}); 

const messages = mongoose.model('messages', messageSchema)

module.exports = messages;
