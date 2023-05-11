const reminderModel = require('../models/ReminderModel');

const addReminder = async(req, res, next) => {
    let id = req.uid;

    const { user_id, username, reminder } = req.body;

    const data = await reminderModel.create({
            user_id: id, 
            username,
            reminder
        });
        
        if(data) res.status(200).json({ message: "Reminder added successfully", success: true, error: null });
        else {
        return res.status(403).json({ message: "Unable to add reminder", success: false });
    }
}

const getReminder = async(req, res,next) => {
    let id = req.uid;

    await reminderModel.find({ user_id: id }).exec().then(result => {
        return (res.json({ message: "Fetched Successfully", reminders: result, success: true }));
      }).catch(err => {
        return res.json({ message: err.message, success: false });
      });
}

module.exports = {
    addReminder,
    getReminder
}