const express = require("express");
const router = express.Router();
const suspendUser = require("../../../../services/admin/userUpdate/suspendUser");
const verifyAdmin = require("../../../../middlewares/verifyAdmin")

router.put("/", verifyAdmin, async (req, res) => {
  const { UserID, Email} = req.body;

  try {
    const result = await suspendUser(UserID, Email);
    const { status, message } = result;
    res.status(status).json(result);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

module.exports = router;