const pool = require("./../../../utils/db/mysql");

async function main() {
  const query2 = `UPDATE userAuthTable SET OTP = ?, OTP_limit = ?, OTP_timestamp = ?, verified = ? WHERE Email = ?`;
  const query3 = `UPDATE userAuthTable SET OTP_limit = ? WHERE Email = ?`;

  return new Promise((resolve, reject) => {
    const otp = Math.floor(1000 + Math.random() * 9000);
    const otp_limit = 0;
    const otp_timestamp = Math.floor(Date.now() / 1000);
    // console.log(otp + "\n" + otp_limit + "\n" + otp_timestamp);
    return resolve({ otp, otp_limit, otp_timestamp });
  });
}

module.exports = main;
