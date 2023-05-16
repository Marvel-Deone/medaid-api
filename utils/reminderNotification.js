const cron = require('node-cron');
const reminderModel = require('../models/ReminderModel');
const nodemailer = require('nodemailer');
require('dotenv');

const setupReminderNotification= () => {
  cron.schedule('* * * * *', async () => {
      // const dateTimeObject = new Date();
      let currentDate = dateTimeObject.toISOString().replace(/T/, " ").replace(/:00.000Z/, "").slice(0, -14);
      console.log('currentDate: ', currentDate);
      // currentLocaleTime = dateTimeObject.toLocaleTimeString([], {
      //   year: 'numeric',
      //   month: '2-digit',
      //   day: '2-digit',
      //   hour: '2-digit',
      //   minute: '2-digit',
      // });
      myTime = new Date();
      console.log(`Time: ${myTime}`, `LocaleTime: ${currentLocaleTime}`);
      try {
        await reminderModel.find().exec().then(reminders => {
          reminders.forEach(reminder => {
            currentTime = new Date().toTimeString().slice(0, -40);
            console.log(`currentTime:' ${currentTime} `)
            if (reminder.reminder.time == currentTime && reminder.reminder.date == currentDate) {
              console.log('reminder:', reminder);
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
                        subject: 'MedAid Reminder',
                        html: `
                                <div style="background-color: #f8f8f8; padding: 20px;">
                                  <h1 style="color: #0072c6; text-align: center;">MedAid Reminder</h1>
                                  <p style="font-size: 16px;">Dear ${reminder.username},</p>
                                  <p style="font-size: 16px;">You have a reminder message from Medaid, details: </p>
                                  <p>Title: ${reminder.reminder.title},</p>
                                  <p>Date: ${reminder.reminder.date},</p>
                                  <p>Time: ${reminder.reminder.time}</p>
                                  <p style="font-size: 16px;">Thank you for using Medaid App.</p>
                                </div>
                              `,
                      };
                      mailTransporter.sendMail(mailOptions).then(info => {
                        console.log('sent:', info);
                      }).catch(err => {
                        console.log('unable to send', err);
                      });
                      console.log('reminder', reminder);
            }else {
              console.log('No reminder for this time');
            }
          })
        }).catch(err => {
          return console.log(err);;
        });
      }
      catch(err) {
        console.log('whala ti wa oo', err);
      }
      });
    // console.log('reminder:', reminders);
}

module.exports = setupReminderNotification