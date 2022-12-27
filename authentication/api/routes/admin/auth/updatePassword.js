const express = require("express");
const router = express.Router();
const updatePassword = require("./../../../../services/admin/auth/updatePassword");
const verifyAdmin = require("./../../../../middlewares/verifyAdmin")

router.put("/", async (req, res) => {
  try {
    const { Email, Username, Password, NewPassword } = req.body;
    const data = { Email, Username, Password, NewPassword };
    const result = await updatePassword(data);
    const { status, message } = result;
    res.status(status).json(result);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

module.exports = router;
