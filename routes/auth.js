const express = require('express')
const router = express.Router()

const AuthController = require('../controllers/AuthController')
const { verifyToken } = require('../middleware/validate_user_token')

router.post('/auth/register', AuthController.register)
router.post('/auth/login', AuthController.login)
router.post('/auth/verifyemail', AuthController.confirmPin)
router.post('/auth/changePassword', verifyToken, AuthController.changePassword)



module.exports = router