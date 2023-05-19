const express = require('express')
const router = express.Router()

const ReminderController = require('../controllers/ReminderController')
const { verifyToken } = require('../middleware/validate_user_token')

router.get('/', verifyToken, ReminderController.getReminder);
router.get('/:id', verifyToken, ReminderController.getSingleReminder);
router.post('/', verifyToken, ReminderController.addReminder);
router.patch('/updateReminder/:id', verifyToken, ReminderController.updateReminder);
router.delete('/deleteReminder/:id', verifyToken, ReminderController.deleteReminder);

module.exports = router