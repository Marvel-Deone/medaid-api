const express = require('express')
const router = express.Router()

const SelfAssessmentController = require('../controllers/SelfAssessmentController')
const SelfAssessmentAnswerController = require('../controllers/SelfAssessmentAnswerController')
const { verifyToken } = require('../middleware/validate_user_token')

router.post('/', verifyToken, SelfAssessmentController.postSelfAssessement);
router.get('/', verifyToken, SelfAssessmentController.getSelfAssessment);
router.get('/selfAssessmentAnswer', verifyToken, SelfAssessmentAnswerController.getSelfAssessmentAnswer);
router.get('/selfAssessmentAnswer/:id', verifyToken, SelfAssessmentAnswerController.getSingleSelfAssessmentAnswer);
router.post('/answer', verifyToken, SelfAssessmentAnswerController.saveSelfAssessementAnswer);

module.exports = router