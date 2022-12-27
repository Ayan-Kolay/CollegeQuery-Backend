const pool = require("./../../../utils/db/mysql");

async function main(data) {
  const { Email, Username, Password } = data;
  const query1 =
    "SELECT * FROM adminPannel WHERE `Email` = ? AND `Username` = ?";
  const query2 =
    "UPDATE adminPannel SET `login_attempt` = 0 WHERE `Email` = ? AND `Username` = ?";

  const [rows, fields] = await pool.query(query1, [Email, Username]);
//   console.log(Email, Username, Password);
//   console.log(rows);
  if (rows.length > 0) {
    if (rows[0].login_attempt > 10) {
      return {
        status: 401,
        message: "Too many login attempts",
      };
    }

    if (rows[0].Password === Password) {
      return {
        status: 200,
        message: "Admin logged in",
        role: rows[0].role,
        Email: rows[0].Email,
      };
    } else {
      const [rows, fields] = await pool.query(query2, [Email, Username]);
      return {
        status: 401,
        message: "Incorrect Credentials",
      };
    }
  } else {
    return {
      status: 401,
      message: "Account does not exist",
    };
  }
}

module.exports = main;
