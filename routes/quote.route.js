const express = require('express')
const router = express.Router()

const QuoteController = require('../controllers/QuoteController')



router.post('/postquote', QuoteController.getPostquote);
router.get('/getpost', QuoteController.getQuote);




module.exports = router