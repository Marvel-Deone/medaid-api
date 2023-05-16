const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const selfAssessmentSchema = new Schema({
    category: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    }
});

const selfAssessment = mongoose.model('SelfAssessment', selfAssessmentSchema)

module.exports = selfAssessment;