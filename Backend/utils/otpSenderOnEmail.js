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
            html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: auto;
            background-color: #ffffff;
            padding: 20px;
            border: 1px solid #e0e0e0;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .email-header {
            background-color: #007bff;
            color: #ffffff;
            padding: 10px;
            text-align: center;
        }
        .email-content {
            padding: 20px;
            text-align: center;
        }
        .email-content h2 {
            color: #333333;
        }
        .email-content p {
            font-size: 16px;
            color: #666666;
            line-height: 1.5;
        }
        .otp {
            display: inline-block;
            padding: 10px 20px;
            margin: 20px 0;
            font-size: 24px;
            color: #ffffff;
            background-color: #28a745;
            border-radius: 5px;
        }
        .email-footer {
            padding: 10px;
            text-align: center;
            font-size: 12px;
            color: #aaaaaa;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h1>MART Private Limited</h1>
        </div>
        <div class="email-content">
            <h2>One-Time Password (OTP) for Your Account</h2>
            <p>Dear User,</p>
            <p>We received a request to reset the password for your account. Please use the OTP below to complete the process:</p>
            <div class="otp">${otp}</div>
            <p>If you did not request a password reset, please ignore this email or contact support if you have any questions.</p>
            <p>Thank you,<br>Your Company Name</p>
        </div>
        <div class="email-footer">
            <p>&copy; 2024 MART Private Limited. All rights reserved.</p>
            <p>This email was sent to ${userEmail}. If you no longer wish to receive these emails, you may <a href="#">unsubscribe</a> at any time.</p>
        </div>
    </div>
</body>
</html>
`
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
