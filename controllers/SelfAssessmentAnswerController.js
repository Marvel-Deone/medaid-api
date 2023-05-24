const selfAssessmentAnswerModel = require('../models/SelfAssessmentAnswerModel');

const saveSelfAssessementAnswer = async(req, res) => {
    let id = req.uid;

    const { user_id, username, email, category, questions, questionsAnswers } = req.body;

    const data = await selfAssessmentAnswerModel.create({
        user_id: id,
        username,
        email,
        category,
        questionsAnswers
    });

    if(data) return (res.status(200).json({ message: "Self assessment submitted successfully", data, success: true }));
    return res.status(503).json({ message: err.message, success: false });
}

const getSelfAssessmentAnswer = async(req, res) => {
    let id = req.uid;

    await selfAssessmentAnswerModel.find({user_id: id}).exec().then(result => {
        return (res.status(200).json({ message: "Fetched Successfully", selfAssessments: result, success: true }));
    }).catch(err => {
        return res.status(403).json({ message: err.message, success: false });
    });
}

const getSingleSelfAssessmentAnswer = async(req, res) => {
    let id = req.uid;

    await selfAssessmentAnswerModel.findById(req.params.id).exec().then(result => {
        return (res.status(200).json({ message: "Fetched Successfully", selfAssessment: result, success: true }));
    }).catch(err => {
        return res.status(403).json({ message: err.message, success: false });
    });
}

module.exports = {
    saveSelfAssessementAnswer,
    getSelfAssessmentAnswer,
    getSingleSelfAssessmentAnswer
}