const User = require('../models/UserModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv');

const JWT_KEY = process.env.JWT_KEY

const getDashboard = async (req, res) => {   
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.JWT_KEY, async (err, result) => {
        if (err) {
            res.status(500).send({ message: 'Timed out', err, status: false });
        } else {
            const email = result.email;
           
            try {
                const user = await User.findOne({ email: email }).exec();
                res.send({ message: 'Welcome', status: true, result: user });
            } catch (error) {
                res.status(500).send({ message: 'Error finding user', error, status: false });
            }
        }
    });
};
 const getCurrentUser= async (req,res)=>{
    try {
        const currentUser = await User.findOne({ email: req.params.currentUser });
        res.send({ status: true, currentUser });
      } catch (err) {
        res.status(500).send({ message: 'Internal server error', status: false });
      }
 }
const getAllUsers= async (req, res) => {
    
        try {
          const users = await User.find({ email: { $ne: req.params.currentUser } });
        
          res.send({ status: true, users });
        } catch (err) {
          res.status(500).send({ message: 'Internal server error', status: false });
        }
      };
      



    //   const getKeepUpWith = async (req, res) => {
    //     console.log(req.body);
    //     try {
    //       const {  currentUserId, userId, userName } = req.body;
    //       const updatedUser = await User.findByIdAndUpdate(
    //         currentUserId,
    //         { $push: { connections: {userId, userName} } },
    //         { new: true }
    //       );
      
          
    //       res.status(200).send({message:'New Inspirer added!',status:true });
    //     } catch (error) {
    //       console.error(error);
    //       res.status(500).send({message:'Server error',status:false });
         
    //     }
    //   };
      
    // //   const getLooseTrack = async (req, res) => {
    // //     try {
    // //       const { userId, connectionId } = req.body;
    // //       const updatedUser = await User.updateOne(
    // //         { _id: userId },
    // //         { $pull: { connections: { userId: connectionId } } }
    // //       );
      
    // //       console.log(updatedUser);
    // //       res.status(200).json({ updatedUser });
    // //     } catch (error) {
    // //       console.error(error);
    // //       res.status(500).json({ error: 'Server error' });
    // //     }
    // //   };
      




module.exports = {
     getDashboard ,
     getAllUsers,
    //  getKeepUpWith,
     getCurrentUser
   
}
