const messageModel= require('../models/MessageModel')

const addMessage =async(req,res,next)=>{
   
    try{
        const {from, to ,message}= req.body;
   
        const data= await  messageModel.create({
            message:{text:message},
            users:[from,to],
            sender:from,

        })

        
        if(data)return res.json({message:"Message added successfully"});
        return res.json({message:"Failed to add message into database"});
    }catch(ex){
        next(ex);
    }

}
const getAllMessages = async (req,res,next)=>{
  
    try{
        const {from, to}= req.body;
        const messages = await messageModel.find({
            users:{
                $all:[from,to]

            },

        }).sort({updatedAt:1});
        const projectedMessages = messages.map((msg)=>{
            return {
                fromSelf:msg.sender.toString()=== from,
                message:msg.message.text,    
                time: msg.updatedAt
                
            }
        });
        console.log(projectedMessages);

         res.json(projectedMessages)
    }catch(ex){

    }
}
module.exports ={
    addMessage,
    getAllMessages 
}