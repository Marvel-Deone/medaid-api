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
    questions: {
        type: [],
        required: true
    },
    answers: {
        type: [],
        required: true
    }
});

const selfAssessmentAnswer = mongoose.model('SelfAssessmentAnswer', selfAssessmentAnswerSchema)

module.exports = selfAssessmentAnswer;