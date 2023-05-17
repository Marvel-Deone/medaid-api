const express = require('express')
const router = express.Router()

const MedicationController = require('../controllers/MedicationController')
const { verifyToken } = require('../middleware/validate_user_token')
// const CheckMedicationIntervalController = require('../utils/helpers')

router.post('/', verifyToken, MedicationController.addMedication);
router.get('/', verifyToken, MedicationController.getMedication);
router.patch('/updateMedication/:id', verifyToken, MedicationController.updateMedication);
router.delete('/deleteMedication/:id', verifyToken, MedicationController.deleteMedication);
// router.get('/checkMedicationInterval', verifyToken, CheckMedicationIntervalController.checkMedicationInterval);

module.exports = router