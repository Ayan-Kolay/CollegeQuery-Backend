const pool = require("./../../utils/db/mysql");
const verifyOTP = require("./utils/verifyOTP");

async function main(data, Email) {
  const { otp } = data;

  const query1 = `SELECT * FROM userAuthTable WHERE Email = ?`;
  const query2 = `UPDATE userAuthTable SET OTP = ?, OTP_limit = ?, OTP_timestamp = ?, verified = ? WHERE Email = ?`;

  let [rows, fields] = await pool.query(query1, [Email]);
  const { userID } = rows[0];

  if (rows.length > 0) {
    const response = await verifyOTP(rows, otp);
    if (response.status === 200) {
      [rows, fields] = await pool.query(query2, [
        null,
        null,
        null,
        true,
        Email,
      ]);
      return {
        status: 200,
        userID: userID,
        message: "User verified",
      };
    } else {
      return response;
    }
  } else {
    return {
      status: 409,
      message: "Email is not registered",
    };
  }
}

module.exports = main;
