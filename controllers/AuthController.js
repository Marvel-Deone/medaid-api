const UserModel = require('../models/UserModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');
require('dotenv');

const JWT_KEY = process.env.JWT_KEY


const register = async (req, res) => {
  console.log("hello");
  const { firstName, lastName, username, email, gender, address, dob, password, phone } = req.body;

  if (!(username && email && phone && password)) {
    return res.status(400).send({ message: "All input is required" });
  }

  const checkUser = await UserModel.findOne({ email });
  const checkUserUsername = await UserModel.findOne({ username });
  const checkUserPhone = await UserModel.findOne({ phone });

  if (checkUser) {
    return res.status(409).send({
      success: false,

      message: "Email already exist"
    });
  } else if (checkUserUsername) {
    return res.status(409).send({
      success: false,
      message: "Username already exist"
    });
  } else if (checkUserPhone) {
    return res.status(409).send({
      success: false,
      message: "Phone Number already exist"
    });
  }

  bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "An error has occurred while registering the user, please try again!"
      });
    }


    let user = new UserModel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      middleName: req.body.middleName,
      username: req.body.username,
      email: req.body.email.toLowerCase(),
      phone: req.body.phone,
      address: req.body.address,
      dob: req.body.dob,
      gender: req.body.gender,
      blood_group: req.body.blood_group,
      genotype: req.body.genotype,
      current_medical_condition: req.body.current_medical_condition,
      past_medical_condition: req.body.past_medical_condition,
      password: hashedPass,
      confirm_email_pin: Math.floor(100000 + Math.random() * 900000),
    });

    user.save()
      .then(user => {
        verifyEmail(req.body.email, res);
        return res.json({
          success: true,
          message: 'Registered successfully!'
        });
      })
      .catch(err => {

        if (err.keyPattern) {
          return res.status(500).json({
            success: false,
            error: "Email, Phone Number and username must be unique"
          });
        } else {
          return res.status(400).json({
            success: false,
            message: 'An error has occurred while registering the user, please try again!'
          });
        }
      });
  });
};

const verifyEmail = async (email, res) => {
  try {
    const user = await UserModel.findOne({ email: email });
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
                <h1 style="color: #0072c6; text-align: center;">MedAid Verification Code</h1>
                <p style="font-size: 16px;">Dear ${user.username},</p>
                <p style="font-size: 16px;">Your verification code is:</p>
                <h2 style="color: #0072c6; text-align: center;">${user.confirm_email_pin}</h2>
                <p style="font-size: 16px;">Please enter this code to verify your email address.</p>
              </div>
            `,
    };

    const info = await mailTransporter.sendMail(mailOptions);
    console.log('Verification email sent: ' + info.response);
   res.status(200).json({ message: 'Verification email sent successfully', status: true });
  } catch (err) {

       res.status(500).send({ message: 'Error sending verification email', status: false });
  }
}; 

const confirmPin = async (req, res) =>  {
  try {
    const user = await UserModel.findOne({ email: req.body.email })
    if (!user) {
      return res.status(404).send({ message: 'User not found', status: false });
    }
    if (req.body.userpin != user.confirm_email_pin) {
      return res.send({ message: 'Invalid Code', status: false });
    } else {
      welcomeEmail(req.body.email)
      
      console.log("Confirm");
      return res.send({ message: 'Valid Code, A welcoming email has been sent to your email.', status: true });
    }
    
    
  } catch (err) {
    console.error(err);
  
    return res.status(500).send({ message: 'Internal Server Error', status: false });
    
  }
}

const welcomeEmail = async (email) => {
  try {
    const user = await UserModel.findOne({ email: email });
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
      console.log(err);
    //   res.status(500).send({ message: 'Error sending verification email', status: false });
  }


}

const login = (req, res) => {
  let { email, password, phone } = req.body;
  if (!(email && password)) {
    res.status(400).send({ message: "All input is required" })
  }
  UserModel.findOne({ $or: [{ email: email.toLowerCase() }, { email: phone }] }).then(user => {
    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
          res.json({
            error: err
          })
        }
        if (result) {
          let token = jwt.sign({ user_id: user._id, email }, JWT_KEY, { expiresIn: '2h' });
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

// const changePassword = async (req, res) => {
//   let { email, password, old_password, new_password } = req.body;
//   let id = req.uid;
//   if (!email, !password, !old_password, !new_password) {
//     return res.status(401).json({ message: "All fields must be filled", success: false });
//   }

//   UserModel.findOne({ _id: id }).then(user => {
//     if (user) {
//       bcrypt.compare(old_password, user.password, function (err, result) {
//         if (err) {
//           return res.json({ message: err.message, success: false });
//         }

//         if (result) {
//           UserModel.updateOne({ _id: id }, { password: new_password }).exec().then(result => {
//             console.log('result:', result);
//           }).catch(err => {
//             return res.json({ message: err.message, success: false });
//           })
//         }

//       })
//     } else {
//       res.status(400).send({
//         success: false,
//         message: 'User does not exist'
//       })
//     }
//   })

// }



module.exports = {
  register,
  login,
  confirmPin,
  // changePassword
}
