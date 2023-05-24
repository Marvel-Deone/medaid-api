const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const selfAssessmentAnswerSchema = new Schema({
    user_id : {
        type: String,
        required: true
    },
    username : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    questionsAnswers: {
        type: [],
        required: true
    }
}, {timestamps: true});

const selfAssessmentAnswer = mongoose.model('SelfAssessmentAnswer', selfAssessmentAnswerSchema)

module.exports = selfAssessmentAnswer;