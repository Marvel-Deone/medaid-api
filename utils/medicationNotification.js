const cron = require('node-cron');
const medicationModel = require('../models/MedicationModel');
const UserModel = require('../models/UserModel');
const nodemailer = require('nodemailer');
require('dotenv');

const setupMedicationNotification=()=>{
    cron.schedule('0 8 * * *', async () => {
      try {
        const medications = await medicationModel.find({'medication.interval.is_morning': true}).exec();
        medications.forEach(medication => {
          const mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.GMAIL_ACCOUNT,
              pass: process.env.GMAIL_PASSWORD,
            },
          });
      
          const mailOptions = {
            from: process.env.GMAIL_ACCOUNT,
            to: medication.email,
            subject: 'MedAid Medication Reminder',
            html: `
                    <div style="background-color: #f8f8f8; padding: 20px;">
                      <h1 style="color: #0072c6; text-align: center;">MedAid Verification Code</h1>
                      <p style="font-size: 16px;">Dear ${medication.username},</p>
                      <p style="font-size: 16px;">You have a medication to use by 8:00am today, details: </p>
                      <p>Drug name: ${medication.medication.drug_name},</p>
                      <p>Dose: ${medication.medication.dose}</p>
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
        });
      }
      catch(err) {
        console.log('whala ti wa oo', err);
      }
      });
    cron.schedule('0 1 2 * *', async () => {
      try {
        const medications = await medicationModel.find({'medication.interval.is_afternoon': true}).exec();
        medications.forEach(medication => {
          const mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.GMAIL_ACCOUNT,
              pass: process.env.GMAIL_PASSWORD,
            },
          });
      
          const mailOptions = {
            from: process.env.GMAIL_ACCOUNT,
            to: medication.email,
            subject: 'MedAid Medication Reminder',
            html: `
                    <div style="background-color: #f8f8f8; padding: 20px;">
                      <h1 style="color: #0072c6; text-align: center;">MedAid Verification Code</h1>
                      <p style="font-size: 16px;">Dear ${medication.username},</p>
                      <p style="font-size: 16px;">You have a medication to use by 12:00pm today, details: </p>
                      <p>Drug name: ${medication.medication.drug_name},</p>
                      <p>Dose: ${medication.medication.dose}</p>
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
        });
      }
      catch(err) {
        console.log('whala ti wa oo', err);
      }
      });
    cron.schedule('0 1 9 * *', async () => {
      try {
        const medications = await medicationModel.find({'medication.interval.is_night': true}).exec();
        medications.forEach(medication => {
          const mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.GMAIL_ACCOUNT,
              pass: process.env.GMAIL_PASSWORD,
            },
          });
      
          const mailOptions = {
            from: process.env.GMAIL_ACCOUNT,
            to: medication.email,
            subject: 'MedAid Medication Reminder',
            html: `
                    <div style="background-color: #f8f8f8; padding: 20px;">
                      <h1 style="color: #0072c6; text-align: center;">MedAid Verification Code</h1>
                      <p style="font-size: 16px;">Dear ${medication.username},</p>
                      <p style="font-size: 16px;">You have a medication to use by 7:00pm today, details: </p>
                      <p>Drug name: ${medication.medication.drug_name},</p>
                      <p>Dose: ${medication.medication.dose}</p>
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
        });
      }
      catch(err) {
        console.log('whala ti wa oo', err);
      }
      });
}

module.exports = setupMedicationNotification;