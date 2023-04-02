const User = require('../models/UserModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const register = async (req, res) => {
    // res.json(req.body);
    const { firstName, lastName, username, email, gender, address, dob, password, phone } = req.body;


    if(!(username && firstName && lastName && email && phone && address && dob && gender && password)) {
        res.status(400).send({ message: "All input is required"})
    }

    const checkUser = await User.findOne({email})
    const checkUserUsername = await User.findOne({username})
    const checkUserPhone = await User.findOne({phone})

    if(checkUser) {
        res.status(409).send({ 
            success: false,
            message: "Email already exist"
        })
    }else if(checkUserUsername) {
        res.status(409).send({ 
            success: false,
            message: "Username already exist"
        })
    }else if(checkUserPhone) {
        res.status(409).send({ 
            success: false,
            message: "Phone Number already exist"
        })
    }else {
        bcrypt.hash(req.body.password, 10, function(err, hashedPass) {
            if(err) {
                res.json({
                    error: err
                })
            }
    
            let user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                middleName: req.body.middleName,
                username: req.body.username,
                email: req.body.email,
                phone: req.body.phone,
                address: req.body.address,
                dob: req.body.dob,
                gender: req.body.gender,
                blood_group: req.body.blood_group,
                genotype: req.body.genotype,
                current_medical_condition: req.body.current_medical_condition,
                past_medical_condition: req.body.past_medical_condition,
                password: hashedPass
            });
        
            user.save().then( user => {
                res.json({
                    success: true,
                    message: 'Registered successfully!'
                })
            })
            .catch(err => {
                if (err.keyPattern) return res.status(500).json({ success: false, error: "Email, Phone Number and username must be unique" })
                res.status(400).send({
                    success: false,
                    message: 'An error has occurred while registering the user, please try again!'
                })
            });
        });

    }


}

const login = (req, res) => {
    let { email, password, phone } = req.body;
    if(!(email && password)) {
        res.status(400).send({ message: "All input is required"})
    }
    User.findOne({$or: [{email: email}, {email: phone}]}).then( user => {
        if (user) {
            bcrypt.compare(password, user.password, function (err, result) {
                if (err) {
                    res.json({
                        error: err
                    })
                }
                if(result) {
                    let token = jwt.sign({user_id: user._id, email}, "hawdgawjhdjwrrreewvbahfYT#&*&&&", {expiresIn: '2h'});
                    res.status(200).send({
                        success: true,
                        message: 'Login successful',
                        token
                    })
                }else {
                    res.status(400).send({ 
                        success: false,
                        message: 'Incorrect Password'
                    });
                }

            })
        }else {
            res.status(400).send({
                success: false,
                message: 'Invalid Credentials'
            })
        }
    })
}

module.exports = {
    register,
    login
}