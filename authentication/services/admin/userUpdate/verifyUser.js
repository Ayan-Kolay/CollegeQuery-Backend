const pool = require("./../../../utils/db/mysql");

async function main(data) {
  const { UserID, Email, verification } = data;
  const query2 = `UPDATE userAuthTable SET OTP = ?, OTP_limit = ?, OTP_timestamp = ?, verified = ? WHERE UserID = ? AND Email = ?`;

    let [rows, fields] = await pool.query(query2, [ null, null, null, verification, UserID, Email ]);

    if (rows.affectedRows > 0) {
        return { status: 200, message: "User updated successfully" };
    } else {
      return { status: 200, message: "No data changed" };
    }

}

module.exports = main;
