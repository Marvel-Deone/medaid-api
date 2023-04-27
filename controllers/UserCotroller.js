  const UserModel = require('../models/UserModel')
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
          const user = await UserModel.findOne({ email: email }).exec();
          res.send({ message: 'Welcome', status: true, result: user });
        } catch (error) {
          res.status(500).send({ message: 'Error finding user', error, status: false });
        }
      }
    });
  };

  const getProfile = async (req, res) => {
    let id = req.uid;
    console.log('id: ' + id);
       await UserModel.findOne({ _id: id }).exec().then(result => {
        return ( res.json({ message: "Fetched Successfully", profile:result ,success: true }));
      }).catch(err => {
      return res.json({ message: err.message, success: false });
      });
  };

  const updateProfile = async (req, res) => {
    let { firstName, lastName, middleName, phone, dob, address, gender, blood_group, genotype, current_medical_condition, past_medical_condition, allergies, medication, medical_note } = req.body;

    let id = req.uid;
    console.log('id', id);
    
    if (!firstName) {
      return res.status(401).json({ message: "First name must be filled", success: false });
    }else if (!lastname) {
      return res.status(401).json({ message: "Last name must be filled", success: false });
    }else if (!phone) {
      return res.status(401).json({ message: "Phone number must be filled", success: false });
    }else if (!dob) {
      return res.status(401).json({ message: "Date of birth must be filled", success: false });
    }else if (!address) {
      return res.status(401).json({ message: "Address must be filled", success: false });
    }else if (!gender) {
      return res.status(401).json({ message: "Gender must be filled", success: false });
    }

    await UserModel.updateOne({ _id: id }, { firstName, lastName, middleName, phone, dob, address, gender, blood_group, genotype, current_medical_condition, past_medical_condition, allergies, medication, medical_note }).exec().then(result => {
      if (!result) return res.status(403).json({ message: "Unable to update user info", success: false })
      return res.status(200).json({ message: "Profile updated", success: true, error: null })
    }).catch((err) => {
      return res.status(503).json({ message: "Service unavailable", success: false });
    })

  //  await UserModel.updateOne({ _id: id }, { firstName, lastName, phone, dob, address, gender, blood_group, genotype, current_medical_condition, past_medical_condition }, (err, result) => {
  //     if (!result) return res.status(403).json({ message: "Unable to update user info", success: false })
  //     if (err) return res.status(503).json({ message: "Service unavailable", success: false })
  
  //     return res.status(200).json({ message: "Profile updated", success: true, error: null })
  //   })
  }
  const getCurrentUser = async (req, res) => {
    try {
      const currentUser = await UserModel.findOne({ email: req.params.currentUser });
      res.send({ status: true, currentUser });
    } catch (err) {
      res.status(500).send({ message: 'Internal server error', status: false });
    }
  }

  const getAllUsers = async (req, res) => {

    try {
      const users = await UserModel.find({ email: { $ne: req.params.currentUser } });

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
    getDashboard,
    getAllUsers,
    //  getKeepUpWith,
    getCurrentUser,
    getProfile,
    updateProfile
  }
