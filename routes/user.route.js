const express = require('express')
const router = express.Router()

const UserController = require('../controllers/UserCotroller')
router.get('/dashboard', UserController.getDashboard);
 router.get('/allUsers/:currentUser', UserController.getAllUsers);




module.exports = router