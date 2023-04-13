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
module.exports ={
    addMessage
}