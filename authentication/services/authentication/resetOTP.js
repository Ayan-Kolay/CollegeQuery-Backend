const pool = require("./../../utils/db/mysql");
const generateOTP = require("./utils/generateOTP");
const otpEmailSender = require("./utils/OTPEmailSender");

async function main(Email) {
  const query1 = `UPDATE userAuthTable SET OTP = ?, OTP_limit = ?, OTP_timestamp = ? WHERE Email = ?`;

  const { otp, otp_limit, otp_timestamp } = await generateOTP();
    otpEmailSender(Email, otp);

  let [rows, fields] = await pool.query(query1, [
    otp,
    otp_limit,
    otp_timestamp,
    Email,
  ]);

  return {
    status: 200,
    message: "OTP reset",
  };
}

module.exports = main;
