const medicationModel = require('../models/MedicationModel')

const checkMedicationInterval = async(req, res, next)=> {
    let id = req.uid;

    await medicationModel.find({ user_id: id }).exec().then(medications => {
        for (let i = 0; i < medications.length; i++) {
            if (medications[i].medication.interval.is_morning == true) {
                console.log('message:', `You have a medication to use by 8:00am today, details: drug name: ${medications[i].medication.drug_name}, dose: ${medications[i].medication.dose}`);
            }
            if (medications[i].medication.interval.is_afternoon == true) {
                console.log('message:', `You have a medication to use by 12:00pm today, details: drug name: ${medications[i].medication.drug_name}, dose: ${medications[i].medication.dose}`);
            }
            if (medications[i].medication.interval.is_night == true) {
                console.log('message:', `You have a medication to use by 7:00pm today, details: drug name: ${medications[i].medication.drug_name}, dose: ${medications[i].medication.dose}`);
            }
        }
    }).catch(err => {
        return next(err);
    })
}

module.exports = {
    checkMedicationInterval
}