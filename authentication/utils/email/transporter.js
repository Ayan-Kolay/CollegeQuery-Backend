const nodemailer = require("nodemailer");
const config = require("../../config/components/email");
const { email_host, email_user, email_pass } = config.secrets;


let transporter = nodemailer.createTransport({
  host: email_host,
  auth: {
    user: email_user,
    pass: email_pass,
  },
});


module.exports = transporter;