    const express = require('express')
    const router = express.Router()

    const UserController = require('../controllers/UserCotroller')
    const { verifyToken } = require('../middleware/validate_user_token')


    router.get('/dashboard', UserController.getDashboard);
    router.get('/currentuser/:currentUser', UserController.getCurrentUser)
    router.get('/allUsers/:currentUser', UserController.getAllUsers)
    router.get('/profile', verifyToken, UserController.getProfile)
    router.get('/dashboard', verifyToken, UserController.getDashboardDetails)
    router.get('/expertprofile', verifyToken, UserController.getProfileExpert)
    router.post('/updateProfile', verifyToken, UserController.updateProfile)
    router.get('/getNotification',  UserController.getNotification)
    //  router.post('/keepUpWith', UserController.getKeepUpWith);
    //  router.post('/looseTrack', UserController.getLooseTrack);




    module.exports = router