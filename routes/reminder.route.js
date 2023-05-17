const express = require('express')
const router = express.Router()

const ReminderController = require('../controllers/ReminderController')
const { verifyToken } = require('../middleware/validate_user_token')

router.post('/', verifyToken, ReminderController.addReminder);
router.get('/', verifyToken, ReminderController.getReminder);
router.patch('/updateReminder/:id', verifyToken, ReminderController.updateReminder);
router.delete('/deleteReminder/:id', verifyToken, ReminderController.deleteReminder);

module.exports = router