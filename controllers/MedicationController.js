const medicationModel = require('../models/MedicationModel')

const addMedication = async(req, res, next) => {
    let id = req.uid;

    const { user_id, username, email,  medication } = req.body;

    const data = await medicationModel.create({
            user_id: id, 
            username,
            email,
            medication
        });
        
        if(data) res.status(200).json({ message: "Successful", success: true, error: null });
        else {
        return res.status(403).json({ message: "Unable to add medication", success: false });
    }
}

const getMedication = async(req, res,next) => {
    let id = req.uid;

    await medicationModel.find({ user_id: id }).exec().then(result => {
        return (res.json({ message: "Fetched Successfully", medications: result, success: true }));
      }).catch(err => {
        return res.json({ message: err.message, success: false });
      });
}

module.exports = {
    addMedication,
    getMedication
}