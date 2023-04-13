const express = require('express')
const router = express.Router()

const MessagesController = require('../controllers/MessagesController')
router.post('/addMessag', MessagesController.addMessage);
// router.post('/getAllMessage', MessagesController.getAllMessage);




module.exports = router