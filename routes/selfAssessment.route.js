const express = require('express')
const router = express.Router()

const SelfAssessmentController = require('../controllers/SelfAssessmentController')
const { verifyToken } = require('../middleware/validate_user_token')

router.post('/', verifyToken, SelfAssessmentController.postSelfAssessement);
router.get('/', verifyToken, SelfAssessmentController.getSelfAssessment);

module.exports = router