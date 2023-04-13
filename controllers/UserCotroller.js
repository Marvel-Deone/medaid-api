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

const getAllUsers= async (req, res) => {
    
        try {
          const users = await User.find({ email: { $ne: req.params.currentUser } });
          console.log(users)
          res.send({ status: true, users });
        } catch (err) {
          res.status(500).send({ message: 'Internal server error', status: false });
        }
      };
      






module.exports = {
     getDashboard ,
     getAllUsers
}
