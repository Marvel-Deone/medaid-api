const express = require('express')
const router = express.Router()

const SosContactController = require('../controllers/SosContactController')
const { verifyToken } = require('../middleware/validate_user_token')

router.get('/', verifyToken, SosContactController.getSosContact);
router.get('/:id', verifyToken, SosContactController.getSingleSosContact);
router.post('/', verifyToken, SosContactController.addSosContact);
router.patch('/updateSosContact/:id', verifyToken, SosContactController.updateSosContact);
router.delete('/deleteSosContact/:id', verifyToken, SosContactController.deleteSosContact);

module.exports = router