const pool = require("./../../../utils/db/mysql");

async function main(data) {
  const { Email, Username, Password, NewPassword } = data;
  const query1 = "SELECT * FROM adminPannel WHERE `Email` = ? AND `Username` = ? AND `Password` = ?";
  const [rows, fields] = await pool.query(query1, [Email, Username, Password]);

  if (rows.length > 0) {
    const query2 = "UPDATE adminPannel SET `Password` = ? WHERE `Email` = ? AND `Username` = ? AND `Password` = ?";
    const [rows, fields] = await pool.query(query2, [NewPassword, Email, Username, Password]);

    if (rows.affectedRows > 0) {
      return { status: 200, message: "card updated successfully" };
    } else {
      return { status: 200, message: "no data is updated" };
    }
  } else {
    return {
      status: 401,
      message: "Incorrect Credentials",
    };
  }
}

module.exports = main;
