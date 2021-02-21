const nodemailer = require('nodemailer');
const transportOptions = require('./config').getMailerOptions();

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport(transportOptions);

  const mailOptions = {
    from: '<test@intouch.io>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
