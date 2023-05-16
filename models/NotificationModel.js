const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
    message: {
        type: String,
    
        
    },
    
    senderId:  {
        type: String,
     
    },
   
    senderUserName: {
        type: String,
     
    },
     receiverId:{
        type: String,
     }

   

   
}, {timestamps: true}); 

const notification= mongoose.model('Notification', NotificationSchema)

module.exports = notification;
