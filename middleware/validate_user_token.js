const jwt = require('jsonwebtoken')
require('dotenv').config()
const JWT_KEY = process.env.JWT_KEY

const verifyToken = (req,res,next) => {
    try {
        let token = req.headers['authorization']; 

        if (!token) {
            return res.status(401).json({ success: false, message:"No token in the request" });
        }

        const { user_id } = jwt.verify(token, process.env.JWT_KEY);
        req.uid = user_id;
        console.log('req.uid',req.uid, {user_id});

        next();

    }catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
 }

 module.exports = {verifyToken};