const selfAssessmentModel = require('../models/SelfAssessmentModel');

const postSelfAssessement = async(req, res) => {
    let id = req.uid;

    const { category, question } = req.body;

    const data = await selfAssessmentModel.create({
       category,
       question
    });

    if(data) return (res.json({ message: "Self assessment posted successfully", success: true }));
    return res.json({ message: err.message, success: false });
}

const getSelfAssessment = async(req, res) => {
    let id = req.uid;

    await selfAssessmentModel.find().exec().then(result => {
        return (res.status(200).json({ message: "Fetched Successfully", selfAssessment: result, success: true }));
    }).catch(err => {
        return res.status(403).json({ message: err.message, success: false });
    });
}

module.exports = {
    postSelfAssessement,
    getSelfAssessment
}