const express = require('express')
const router = express.Router()

const MessagesController = require('../controllers/MessagesController')
router.post('/addmessage', MessagesController.addMessage);






module.exports = router