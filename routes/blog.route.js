const express = require('express')
const router = express.Router()

const BlogController = require('../controllers/BlogController')
const { verifyToken } = require('../middleware/validate_user_token')

router.post('/', verifyToken, BlogController.postBlog);
router.get('/', verifyToken, BlogController.getBlog);

module.exports = router