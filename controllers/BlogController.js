const blogModel = require('../models/BlogModel');

const postBlog = async(req, res) => {
    let id = req.uid;

    const { user_id, username, position, article } = req.body;

    const data = await blogModel.create({
        user_id: id,
        username,
        position,
        article
    });

    if(data) return (res.json({ message: "Blog posted successfully", success: true }));
    return res.json({ message: err.message, success: false });
}

const getBlog = async(req, res) => {
    let id = req.uid;

    await blogModel.find().exec().then(result => {
        return (res.json({ message: "Fetched Successfully", blog: result, success: true }));
    }).catch(err => {
        return res.json({ message: err.message, success: false });
    });
}

module.exports = {
    postBlog,
    getBlog
}