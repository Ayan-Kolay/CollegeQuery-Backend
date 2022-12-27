const pool = require("../../../utils/db/mysql");

async function main(UserID, Email) {
    const query1 = "UPDATE userAuthTable SET Suspended = ? WHERE UserID = ? AND Email = ?";
    const [rows, fields] = await pool.query(query1, [1, Email, UserID]);
    
    if (rows.affectedRows > 0) {
        const query2 = `UPDATE userCardTable SET Published = ? WHERE UserID = ?`
        const [rows, fields] = await pool.query(query2, [0, UserID]);
    }

    if (rows.affectedRows > 0) {
        return { status: 200, message: "user suspended" };
    } else {
        return { status: 404, message: "user not found" };
    }
}

module.exports = main;
