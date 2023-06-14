const express = require('express')
const router = express.Router()

const SelfAssessmentController = require('../controllers/SelfAssessmentController')
const SelfAssessmentAnswerController = require('../controllers/SelfAssessmentAnswerController')
const downloadPDFController = require('../controllers/DownloadPDFController')
const { verifyToken } = require('../middleware/validate_user_token')

router.post('/', verifyToken, SelfAssessmentController.postSelfAssessement);
router.get('/', verifyToken, SelfAssessmentController.getSelfAssessment);
router.get('/answer', verifyToken, SelfAssessmentAnswerController.getSelfAssessmentAnswer);
router.get('/answer/:id', verifyToken, SelfAssessmentAnswerController.getSingleSelfAssessmentAnswer);
router.post('/answer', verifyToken, SelfAssessmentAnswerController.saveSelfAssessementAnswer);

router.get('/downloadResult/:id', downloadPDFController.downloadResult);

module.exports = router