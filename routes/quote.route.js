const express = require('express')
const router = express.Router()

const QuoteController = require('../controllers/QuoteController')

router.post('/postquote', QuoteController.postquote);
router.get('/getpost', QuoteController.getQuote);



const { verifyToken } = require('../middleware/validate_user_token')

router.post('/', verifyToken, QuoteController.postquote);
router.get('/', QuoteController.getQuote);

module.exports = router