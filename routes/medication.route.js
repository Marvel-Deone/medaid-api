const express = require('express')
const router = express.Router()

const MedicationController = require('../controllers/MedicationController')
const { verifyToken } = require('../middleware/validate_user_token')

router.post('/', verifyToken, MedicationController.addMedication);
router.get('/', verifyToken, MedicationController.getMedication);

module.exports = router