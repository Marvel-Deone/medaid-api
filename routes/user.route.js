const express = require('express')
const router = express.Router()

const UserController = require('../controllers/UserCotroller')
router.get('/dashboard', UserController.getDashboard);
router.get('/currentuser/:currentUser', UserController.getCurrentUser);

 router.get('/allUsers/:currentUser', UserController.getAllUsers);
//  router.post('/keepUpWith', UserController.getKeepUpWith);

//  router.post('/looseTrack', UserController.getLooseTrack);




module.exports = router