const reminderModel = require('../models/ReminderModel');
const nodemailer = require('nodemailer');
require('dotenv');

const setupReminderNotification= () => {
    const dateTimeObject = new Date();
    console.log(`Time: ${dateTimeObject.toTimeString()}`);
    const reminders = reminderModel.find().exec();
    reminders.forEach(reminder => {
        const mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.GMAIL_ACCOUNT,
              pass: process.env.GMAIL_PASSWORD,
            },
          });
      
          const mailOptions = {
            from: process.env.GMAIL_ACCOUNT,
            to: reminder.email,
            subject: 'MedAid Medication Reminder',
            html: `
                    <div style="background-color: #f8f8f8; padding: 20px;">
                      <h1 style="color: #0072c6; text-align: center;">MedAid Verification Code</h1>
                      <p style="font-size: 16px;">Dear ${reminder.username},</p>
                      <p style="font-size: 16px;">You have a medication to use by 8:00am today, details: </p>
                      <p>Drug name: ${reminder.reminder.title},</p>
                      <p>Dose: ${reminder.reminder.time}</p>
                      <p style="font-size: 16px;">Thank you for using Medaid App.</p>
                    </div>
                  `,
          };
      
          mailTransporter.sendMail(mailOptions).then(info => {
            console.log('sent:', info);
          }).catch(err => {
            console.log('unable to send', err);
          });
          console.log('medication', medication);
    })
}