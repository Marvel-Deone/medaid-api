const QuoteModel = require('../models/QuoteModel')

const postquote = async(req, res, next) => {
    try {
        const checkUser = await QuoteModel.findOne({ quote: req.body.quote })

        if(checkUser) {
            return res.status(409).send({status: false, message: 'Quote already exists'})
        }else {
            const newQuote = new QuoteModel(req.body);
            await newQuote.save()

            return res.status(200).send({status: true, message: 'Quote added successfully'})
        }
    }
    catch(err) {
        return next(err)
    }
};

const getQuote = async(req, res, next) => {
   await QuoteModel.find().exec().then(quotes => {
    return res.status(200).json({success: true, message: 'Fetched successfully', quotes});
   }).catch(err => {
        return res.status(400).json({ message: err.message, success: false });
   })
}

module.exports ={
    postquote,
    getQuote
}