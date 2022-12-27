const pool = require("./../../utils/db/mysql");

async function main(data) {
  const { Email, Password } = data;
  const [rows, fields] = await pool.query(
    "SELECT * FROM `userAuthTable` WHERE `Email` = ?",
    [Email]
  );

  if (rows.length > 0) {
    if (rows[0].Password === Password) {
      if (rows[0].Suspended === 1) {
        return {
          status: 401,
          message: "User suspended",
        };
      } else {
        return {
          status: 200,
          message: "User logged in",
          verified: rows[0].verified,
          userID: rows[0].UserID,
        };
      }
    } else {
      return {
        status: 401,
        message: "Incorrect password",
      };
    }
  } else {
    return {
      status: 409,
      message: "Email is not registered",
    };
  }

}

module.exports = main;
