const express = require('express')
const router = express.Router()

const AuthController = require('../controllers/AuthController') 

router.post('/auth/register', AuthController.register)
router.post('/auth/login', AuthController.login)
router.post('/auth/verifyemail', AuthController.confirmPin)


module.exports = router