const env = require('dotenv');
env.config();
const nodemailer = require('nodemailer');
const logger = require('../config/logger/logger'); // Ensure logger is imported

const sendOtpOnEmail = async (userEmail, otp) => {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.TRANSPORTER_EMAIL,
                pass: process.env.TRANSPORTER_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.TRANSPORTER_EMAIL,
            to: userEmail,
            subject: 'Password reset request!',
            html: `<h2>Below is your OTP:</h2><br><h1>${otp}</h1>`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                logger.error("An error occurred while sending email: ", error);
                console.log(error);
                reject(error);
            } else {
                logger.info("Email sent successfully");
                console.log('Email sent: ' + info.response);
                resolve(info);
            }
        });
    });
}

module.exports = {
    sendOtpOnEmail
}
