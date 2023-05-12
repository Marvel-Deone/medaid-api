const express = require('express')
const router = express.Router()

const ExpertController = require('../controllers/ExpertController')
router.post('/sendpin', ExpertController.getSendPin);
router.post('/signup', ExpertController.getSignup);
router.post('/login', ExpertController.getlogin);


module.exports = router