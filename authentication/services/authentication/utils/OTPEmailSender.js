"use strict";
const nodemailer = require("nodemailer");
const transporter = require("./../../../utils/email/transporter");
const template = require("./../../../utils/email/templates/otp");

async function main(email, otp) {
  const mailTemplate = await template(otp);
  try {
    let info = await transporter.sendMail({
      from: "NFC card 🪪 otp.devflyer@gmail.com",
      to: email,
      subject: "otp for your card account",
      text: "",
      html: mailTemplate,
    });

    // console.log("Message sent: %s", info.messageId);
  } catch (err) {
    console.error(err);
  }
}

module.exports = main;
