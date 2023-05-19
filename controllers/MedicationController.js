const MedicationModel = require('../models/MedicationModel');
const { login } = require('./AuthController');


const getMedication = async(req, res,next) => {
    let id = req.uid;
    console.log('id: ' + id);

    await MedicationModel.find({ user_id: id }).exec().then(result => {
        return (res.json({ message: "Fetched Successfully", medications: result, success: true }));
      }).catch(err => {
        return res.json({ message: err.message, success: false });
      });
}

    const getSingleMedication = async(req, res,next) => {
        
        await MedicationModel.findById(req.params.id).exec().then(result => {
            return (res.status(200).json({ message: "Fetched Successfully", medication: result, success: true }));
        }).catch(err => {
            return res.status(503).json({ message: err.message, success: false });
        });
    }

    const addMedication = async(req, res, next) => {
    let id = req.uid;

    const { user_id, username, email,  medication } = req.body;

    const data = await MedicationModel.create({
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

    const updateMedication = async(req, res, next) => {
        let { username, email, medication } = req.body;
        await MedicationModel.findByIdAndUpdate(req.params.id, { username, email, medication }).exec().then(result => {
            if (!result) return res.status(200).json({ message: "Unable to update", result: result, success: false})
            return res.status(200).json({ message: "Updated successfully", result: result, success: true})
        }).catch((err) => {
            return res.status(503).json({ message: err.message, success: false });
          })
    }

    const deleteMedication = async(req, res, next) => {
        await MedicationModel.findByIdAndDelete(req.params.id).exec().then(result => {
            if (!result) return res.status(200).json({ message: "Unable to delete", result: result, success: false})
            return res.status(200).json({ message: "Deleted successfully", result: result, success: true})
        }).catch((err) => {
            return res.status(503).json({ message: err.message, success: false });
          })
    }

module.exports = {
    getMedication,
    getSingleMedication,
    addMedication,
    updateMedication,
    deleteMedication
}