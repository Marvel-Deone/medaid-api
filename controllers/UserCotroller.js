const UserModel = require("../models/UserModel");
const MedicationModel = require("../models/MedicationModel");
const bcrypt = require("bcryptjs");
const ExpertModel = require("../models/ExpertModel");
const NotificationModel = require("../models/NotificationModel");
const jwt = require("jsonwebtoken");
require("dotenv");

const JWT_KEY = process.env.JWT_KEY;
let mergedUsers = [];
const getDashboard = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.JWT_KEY, async (err, result) => {
    if (err) {
      res.status(500).send({ message: "Timed out", err, status: false });
    } else {
      const email = result.email;
      try {
        const user = await UserModel.findOne({ email: email }).exec();
        res.send({ message: "Welcome", status: true, result: user });
      } catch (error) {
        res
          .status(500)
          .send({ message: "Error finding user", error, status: false });
      }
    }
  });
};

getDashboardDetails = async (req, res, next) => {
  let id = req.uid;
  await MedicationModel.find({ user_id: id })
    .exec()
    .then((result) => {
      return res.json({
        message: "Fetched Successfully",
        medications: result,
        success: true,
      });
    })
    .catch((err) => {
      return res.json({ message: err.message, success: false });
    });
};

const getProfile = async (req, res) => {
  try {
    let id = req.uid;

    const userProfiile = await UserModel.findOne({ _id: id });

    const expertProfiile = await ExpertModel.findOne({ _id: id });

    const mergedProfile = { ...userProfiile, ...expertProfiile };

    if (mergedProfile._doc.firstName !== '' && mergedProfile._doc.lastName !== '') mergedProfile._doc.is_profileComplete = true;

    return res.json({
      message: "Fetched Successfully",
      profile: mergedProfile._doc,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};
const getProfileExpert = async (req, res) => {
  let id = req.uid;


  await ExpertModel.findOne({ _id: id })
    .exec()
    .then((result) => {
      return res.json({
        message: "Fetched Successfully",
        profile: result,
        success: true,
      });
    })
    .catch((err) => {
      return res.json({ message: err.message, success: false });
    });
};

const updateProfile = async (req, res) => {
  let {
    firstName,
    lastName,
    middleName,
    phone,
    dob,
    address,
    gender,
    blood_group,
    genotype,
    current_medical_condition,
    past_medical_condition,
    allergies,
    medication,
    medical_note,
    sosContact,
    role_id,
    selectedJob,
    placeofwork,
    bio,
  } = req.body;

  let id = req.uid;

  if (!phone) {
    return res
      .status(401)
      .json({ message: "Phone number must be filled", success: false });
  }

  if (role_id == 1) {
    await UserModel.updateOne(
      { _id: id },
      {
        firstName,
        lastName,
        middleName,
        phone,
        dob,
        address,
        gender,
        blood_group,
        genotype,
        current_medical_condition,
        past_medical_condition,
        allergies,
        medication,
        medical_note,
        sosContact,
      }
    )
      .exec()
      .then((result) => {
        if (!result)
          return res
            .status(403)
            .json({ message: "Unable to update user info", success: false });
        return res
          .status(200)
          .json({ message: "Profile updated", success: true, error: null });
      })
      .catch((err) => {
        return res.status(503).json({ message: err, success: false });
      });
  } else if (role_id == 2) {
    await ExpertModel.updateOne(
      { _id: id },
      {
        firstName,
        lastName,
        middleName,
        phone,
        dob,
        address,
        gender,
        blood_group,
        genotype,
        current_medical_condition,
        past_medical_condition,
        allergies,
        medication,
        medical_note,
        sosContact,
        selectedJob,
        placeofwork,
        bio,
      }
    )
      .exec()
      .then((result) => {
        if (!result)
          return res
            .status(403)
            .json({ message: "Unable to update user info", success: false });
        return res
          .status(200)
          .json({ message: "Profile updated", success: true, error: null });
      })
      .catch((err) => {
        return res.status(503).json({ message: err, success: false });
      });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const currentUser = await UserModel.findOne({
      email: req.params.currentUser,
    });
    res.send({ status: true, currentUser });
  } catch (err) {
    res.status(500).send({ message: "Internal server error", status: false });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({
      email: { $ne: req.params.currentUser },
    });
    const experts = await ExpertModel.find({
      email: { $ne: req.params.currentUser },
    });
    let mergedUsers = [...users, ...experts];

    res.send({ status: true, users: mergedUsers });
  } catch (err) {
    res.status(500).send({ message: "Internal server error", status: false });
  }
};
const getNotification = async (req, res) => {
  try {
    const notifications = await NotificationModel.find({}).exec();

    return res.json({
      message: "Fetched Successfully",
      notifications,
      success: true,
    });
  } catch (error) {
    return res.json({ message: error.message, success: false });
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
  getDashboardDetails,
  getAllUsers,
  //  getKeepUpWith,
  getCurrentUser,
  getProfile,
  updateProfile,
  getNotification,
  getProfileExpert,
};