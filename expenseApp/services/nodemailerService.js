const nodemailer = require('nodemailer');

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
};

const sendForgotPasswordEmail = async (toEmail, resetRequestId) => {
  const transporter = createTransporter();
  const fromEmail = process.env.EMAIL_FROM || process.env.SMTP_USER;
  const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/password/resetpassword/${resetRequestId}`;

  const mailOptions = {
    from: fromEmail,
    to: toEmail,
    subject: 'Reset your password',
    text: `We received a request to reset your password. Use the link below to complete the reset process:\n${resetUrl}\n\nIf you did not request a reset, please ignore this email.`,
    html: `
      <p>We received a request to reset your password.</p>
      <p><a href="${resetUrl}">Click here to reset your password</a></p>
      <p>If you did not request this, ignore this email.</p>
    `
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendForgotPasswordEmail };