const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async ({ email, verificationToken }) => {
const config = {
  service: 'gmail',
  auth: {
    user: 'tataruda23@gmail.com',
    pass: process.env.EMAIL_PASSWORD,
  },
};

const baseURL = process.env.BASE_URL;

const transporter = nodemailer.createTransport(config);

const emailOptions = {
  from: 'tataruda23@gmail.com',
  to: email,
  subject: 'Verification (Nodemailer test)',
  html: `<a href="${baseURL}/users/verify/${verificationToken}" target="_blank">Please, confirm your registration </a>`,
};

await transporter.sendMail(emailOptions);
};

module.exports = {sendEmail};