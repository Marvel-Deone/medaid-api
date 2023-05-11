const QuoteModel= require('../models/QuoteModel')


const getPostquote = async (req, res, next) => {
    
  
    try {
      
      const checkUser = await QuoteModel.findOne({ quote: req.body.quote });
  
      if (checkUser) {
        
        return res
          .status(409)
          .send({ status: false, message: "Quote already exists" });
      } else {
       const newQuote = new QuoteModel(req.body);
        await newQuote.save();
  
        
        return res.status(201).send({
          status: true,
          message: "Quote added successfully",
       
        });
      }
    } catch (error) {
     
      return next(error);
    }
  };
  const getQuote = async (req, res, next) => {
   
    try {
      const quotes = await QuoteModel.find({});
      return res.status(200).send({
        status: true,
        
        data: quotes,
      });
    } catch (error) {
      return next(error);
    }
  };


  module.exports ={
    getPostquote,
    getQuote
}