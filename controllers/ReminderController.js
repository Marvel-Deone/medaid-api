const ReminderModel = require('../models/ReminderModel');

const getReminder = async(req, res,next) => {
    let id = req.uid;

    await ReminderModel.find({ user_id: id }).exec().then(result => {
        return (res.json({ message: "Fetched Successfully", reminders: result, success: true }));
      }).catch(err => {
        return res.json({ message: err.message, success: false });
      });
}

const addReminder = async(req, res, next) => {
    let id = req.uid;

    const { user_id, username, email, reminder } = req.body;

    const data = await ReminderModel.create({
            user_id: id, 
            username,
            email,
            reminder
        });
        
        if(data) res.status(200).json({ message: "Reminder added successfully", success: true, error: null });
        else {
        return res.status(403).json({ message: "Unable to add reminder", success: false });
    }
}

const updateReminder = async(req, res, next) => {
    let { username, email, medication } = req.body;
    await ReminderModel.findByIdAndUpdate(req.params.id, { username, email, reminder }).exec().then(result => {
        if (!result) return res.status(200).json({ message: "Unable to update", result: result, success: false})
        return res.status(200).json({ message: "Updated successfully", result: result, success: true})
    }).catch((err) => {
        return res.status(503).json({ message: err.message, success: false });
      })
}

const deleteReminder = async(req, res, next) => {
    await ReminderModel.findByIdAndDelete(req.params.id).exec().then(result => {
        if (!result) return res.status(200).json({ message: "Unable to delete", result: result, success: false})
        return res.status(200).json({ message: "Deleted successfully", result: result, success: true})
    }).catch((err) => {
        return res.status(503).json({ message: err.message, success: false });
      })
}

module.exports = {
    getReminder,
    addReminder,
    updateReminder,
    deleteReminder
}