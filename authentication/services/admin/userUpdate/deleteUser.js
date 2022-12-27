const pool = require("../../../utils/db/mysql");

async function main(UserID, Email) {
    const query1 = "select * FROM userAuthTable WHERE UserID = ? AND Email = ?";
    const [rows, fields] = await pool.query(query1, [UserID, Email]);
    // console.log(rows);

    if (rows.length > 0) {
        const query2 = `DELETE FROM userCardTable WHERE UserID = ?;`
        const query3 = `DELETE FROM userAuthTable WHERE UserID = ? AND Email = ?;`
        const [rows, fields] = await pool.query(query2, [UserID]);
        if (rows) {
            const [rows, fields] = await pool.query(query3, [UserID, Email]);
        }

        return { status: 200, message: `user deleted and ${rows.affectedRows} cards deleted` };

    } else {
        return { status: 404, message: "user not found" };
    }
}

module.exports = main;
