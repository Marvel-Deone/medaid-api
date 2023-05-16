const express = require('express')
const router = express.Router()

const ExpertController = require('../controllers/ExpertController')
router.post('/sendpin', ExpertController.getSendPin);
router.post('/signup', ExpertController.getSignup);
router.post('/login', ExpertController.getlogin);
router.get('/allExpert/:currentuser', ExpertController.getAllExpert);

router.post('/getconsultrequest', ExpertController.getConsultRequest);
router.post('/getPostAccept', ExpertController.getAcceptRequest);

module.exports = router