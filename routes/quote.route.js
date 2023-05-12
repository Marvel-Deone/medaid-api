const express = require('express')
const router = express.Router()

const QuoteController = require('../controllers/QuoteController')
const { verifyToken } = require('../middleware/validate_user_token')

router.post('/', verifyToken, QuoteController.postquote);
router.get('/', QuoteController.getQuote);

module.exports = router