const express = require('express')
const router = express.Router()

const MessagesController = require('../controllers/MessagesController')
router.post('/addmessage', MessagesController.addMessage);
router.post('/getallmessages', MessagesController.getAllMessages)






module.exports = router