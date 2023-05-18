const SosContactModel = require('../models/SosContactModel');

const getSosContact = async(req, res,next) => {
    let id = req.uid;

    await SosContactModel.find({ user_id: id }).exec().then(result => {
        return (res.json({ message: "Fetched Successfully", sosContacts: result, success: true }));
      }).catch(err => {
        return res.json({ message: err.message, success: false });
      });
}

const getSingleSosContact = async(req, res,next) => {
        
    await SosContactModel.findById(req.params.id).exec().then(result => {
        return (res.status(200).json({ message: "Fetched Successfully", sosConatct: result, success: true }));
    }).catch(err => {
        return res.status(503).json({ message: err.message, success: false });
    });
}

const addSosContact = async(req, res, next) => {
    let id = req.uid;

    const { user_id, username, email, sosContact } = req.body;

    const data = await SosContactModel.create({
            user_id: id, 
            username,
            email,
            sosContact
        });
        
        if(data) res.status(200).json({ message: "Sos Contact added successfully", success: true, error: null });
        else {
        return res.status(403).json({ message: "Unable to add sos contact", success: false });
    }
}

const updateSosContact = async(req, res, next) => {
    let { username, email, sosContact } = req.body;
    await SosContactModel.findByIdAndUpdate(req.params.id, { username, email, reminder }).exec().then(result => {
        if (!result) return res.status(200).json({ message: "Unable to update", result: result, success: false})
        return res.status(200).json({ message: "Updated successfully", result: result, success: true})
    }).catch((err) => {
        return res.status(503).json({ message: err.message, success: false });
      })
}

const deleteSosContact = async(req, res, next) => {
    await ReminderModel.findByIdAndDelete(req.params.id).exec().then(result => {
        if (!result) return res.status(200).json({ message: "Unable to delete", result: result, success: false})
        return res.status(200).json({ message: "Deleted successfully", result: result, success: true})
    }).catch((err) => {
        return res.status(503).json({ message: err.message, success: false });
      })
}

module.exports = {
    getSosContact,
    getSingleSosContact,
    addSosContact,
    updateSosContact,
    deleteSosContact
}