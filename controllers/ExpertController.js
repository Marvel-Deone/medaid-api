const ExpertModel = require("../models/ExpertModel");
const NotificationModel = require("../models/NotificationModel"); 
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require('cloudinary').v2;
const nodemailer = require("nodemailer");
require("dotenv");

const JWT_KEY = process.env.JWT_KEY 

cloudinary.config({
    cloud_name: "dapoayodeji123",
    api_key: "528362254166623",
    api_secret: "mOGw9XSbNgeENRRgtFq4WLZRyMo"
  });

const getSendPin = async (req, res) => {
  try {
    const mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_ACCOUNT,
        pass: process.env.GMAIL_PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.GMAIL_ACCOUNT,
      to: req.body.email,
      subject: "MedAid Verification Code",
      html: `
                <div style="background-color: #f8f8f8; padding: 20px;">
                  <h1 style="color: #0072c6; text-align: center;">MedAid Verification Code</h1>
                  <p style="font-size: 16px;">Dear ${req.body.username},</p>
                  <p style="font-size: 16px;">Your verification code is:</p>
                  <h2 style="color: #0072c6; text-align: center;">${req.body.pin}</h2>
                  <p style="font-size: 16px;">Please enter this code to verify your email address.</p>
                </div>
              `,
    };
    const info = await mailTransporter.sendMail(mailOptions);
    console.log("Verification email sent: " + info.response);
    res
      .status(200)
      .send({ message: "Verification email sent successfully", status: true });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error sending verification email", status: false });
  }
};
const getSignup = async (req, res) => {
    try {
      const {
        username,
        email,
        phone,
        password,
        selectedJob,
        placeofwork,
        yearofprac,
        confirmPin,
        recordedvideo,
      } = req.body;
  
      const checkUser = await ExpertModel.findOne({ email });
      if (checkUser) {
        return res.status(409).json({
          success: false,
          message: "Email already exists",
        });
      }
  
      const checkUserUsername = await ExpertModel.findOne({ username });
      if (checkUserUsername) {
        return res.status(409).json({
          success: false,
          message: "Username already exists",
        });
      }
  
      const checkUserPhone = await ExpertModel.findOne({ phone });
      if (checkUserPhone) {
        return res.status(409).json({
          success: false,
          message: "Phone number already exists",
        });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const cloudinaryResponse = await cloudinary.uploader.upload(recordedvideo, {
        resource_type: "video",
      });
      const videoUrl = cloudinaryResponse.secure_url;
     
  
      const newExpert = new ExpertModel({
        username,

        email,
        phone,
        password: hashedPassword,
        selectedJob,
        placeofwork,
        yearofprac,
        confirmPin,
        recordedvideo: videoUrl,
      });
  
      await newExpert.save();
  
      res.status(201).json({ message: "Registration Successful", status:true });
      welcomeEmail(email)
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", status:false });
    }
  };


  const welcomeEmail = async (email) => {
    try {
      const user = await ExpertModel.findOne({ email: email });
      if (!user) {
        return res.status(404).send({ message: 'User not found', status: false });
      }
  
      const mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_ACCOUNT,
          pass: process.env.GMAIL_PASSWORD,
        },
      });
  
      const mailOptions = {
        from: process.env.GMAIL_ACCOUNT,
        to: email,
        subject: 'MedAid Verification Code',
        html: `
                <div style="background-color: #f8f8f8; padding: 20px;">
                <h1 style="color: #0072c6; text-align: center;">Welcome to MedAid!</h1>
                <p style="font-size: 16px;">Dear ${user.username},</p>
                <p style="font-size: 16px;">We're thrilled to have you join our community of healthcare innovators.</p>
                <p style="font-size: 16px;">At MedAid, we believe that healthcare is a basic human right, and we're committed to making high-quality healthcare accessible to everyone, regardless of their income or location.</p>
                <p style="font-size: 16px;">We're excited to introduce you to our platform, which offers a wide range of healthcare services, including self-assessment tools, journaling, virtual therapy, and more.</p>
                <p style="font-size: 16px;">As a user of MedAid, you'll have access to a range of resources and support, including our team of experienced healthcare providers and our emergency response system.</p>
                <p style="font-size: 16px;">We're proud to have Ayodeji Oyebanji and Folagbade Olowofela as co-founders of MedAid, and we're committed to upholding their vision of a world where healthcare is accessible to all.</p>
                <p style="font-size: 16px;">Thank you for choosing MedAid. We look forward to working with you to improve healthcare access and outcomes for all.</p>
            </div>
            
                `,
      };
  
      const info = await mailTransporter.sendMail(mailOptions);
      console.log('Verification email sent: ' + info.response);
      //   res.status(200).send({ message: 'Verification email sent successfully', status: true });
    } catch (err) {
  
      //   res.status(500).send({ message: 'Error sending verification email', status: false });
    }
  
  
  }

  const   getlogin= async (req, res) => {
    console.log(req.body);
    let { email, password, phone } = req.body;
  if (!(email && password)) {
    res.status(400).send({ message: "All input is required" })
  }
  ExpertModel.findOne({ $or: [{ email: email }, { email: phone }] }).then(user => {
    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
          res.json({
            error: err
          })
        }
        if (result) {
          let token = jwt.sign({ user_id: user._id, email },JWT_KEY, { expiresIn: '2h' });
          res.status(200).send({
            success: true,
            message: 'Login successful',
            token
          })
        } else {
          res.status(400).send({
            success: false,
            message: 'Incorrect Password'
          });
        }

      })
    } else {
      res.status(400).send({
        success: false,
        message: 'User does not exist'
      })
    }
  })
  }

  const getAllExpert = async (req, res) => {
   
    try {
      const users = await ExpertModel.find({ email: { $ne: req.params.currentUser } });

      res.send({ status: true, users });
    } catch (err) {
      res.status(500).send({ message: 'Internal server error', status: false });
    }


  }

 const getConsultRequest= async (req, res) => {
  const { message, senderId, senderUserName, receiverId } = req.body;

  NotificationModel.create({ message, senderId, senderUserName ,receiverId})
    .then(() => {
      res.status(200).json({ message: 'Consult request received' ,status:true});
    })
    .catch((error) => {
      console.error('Error saving notification:', error);
      res.status(500).json({ error: 'Failed to save notification' });
    });

 }

 const getAcceptRequest= async(req, res) => {
  const { message, senderId, senderUserName, receiverId } = req.body;
  NotificationModel.create({ message, senderId, senderUserName ,receiverId})
    .then(() => {
      res.status(200).json({ message: 'Consult request received' ,status:true});
    })
    .catch((error) => {
      console.error('Error saving notification:', error);
      res.status(500).json({ error: 'Failed to save notification' });
    });
 }
module.exports = {
  getSendPin,
  getSignup,
  getlogin,
  getAllExpert,
  getConsultRequest,
  getAcceptRequest,

};
