const pool = require("./../../utils/db/mysql");
const generateOTP = require("./utils/generateOTP");
const otpEmailSender = require("./utils/OTPEmailSender");

const { v4: uuidv4 } = require("uuid");

async function main(data) {
  const { FirstName, LastName, Email, Phone_no, Password } = data;

  const query1 = `SELECT * FROM userAuthTable WHERE Email = ?`;
  const query2 = `INSERT INTO userAuthTable (UserID, FirstName, LastName, Email, Phone_no, Password, OTP, OTP_limit, OTP_timestamp, verified) VALUES  (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  let [rows, fields] = await pool.query(query1, [Email]);

  // console.log(rows);

  if (rows.length > 0) {
    return {
      status: 409,
      message: "Email already exists",
    };
  } else {
    const userID = uuidv4().split('-')[0];
    const { otp, otp_limit, otp_timestamp } = await generateOTP();
      otpEmailSender(Email, otp);

    [rows, fields] = await pool.query(query2, [
      userID,
      FirstName,
      LastName,
      Email,
      Phone_no,
      Password,
      otp,
      otp_limit,
      otp_timestamp,
      false,
    ]);
    return {
      status: 200,
      message: "User created",
      userID: userID
    };
  }

  // console.log(rows);
  // console.log(fields);
  // pool.end();
}

module.exports = main;
