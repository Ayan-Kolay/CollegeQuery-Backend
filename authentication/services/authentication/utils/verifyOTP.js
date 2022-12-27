const pool = require("./../../../utils/db/mysql");

async function main(rows, otp) {
  const query2 = `UPDATE userAuthTable SET OTP = ?, OTP_limit = ?, OTP_timestamp = ?, verified = ? WHERE Email = ?`;
  const query3 = `UPDATE userAuthTable SET OTP_limit = ? WHERE Email = ?`;

  if (
    rows[0].OTP_timestamp + 24 * 3600 <
    Math.floor(Date.now() / 1000)
  ) {
    return {
      status: 401,
      message: "OTP expired",
    };
  } else {
    if (rows[0].OTP_limit >= 5) {
      return {
        status: 401,
        message: "max OTP limit exceeded",
      };
    } else {
      if (rows[0].OTP === otp) {
        return {
          status: 200,
          message: "OTP matched",
        };
      } else {
        [rows, fields] = await pool.query(query3, [
          rows[0].OTP_limit + 1,
          rows[0].Email,
        ]);
        return {
          status: 401,
          message: "OTP incorrect",
        };
      }
    }
  }
}

module.exports = main;
