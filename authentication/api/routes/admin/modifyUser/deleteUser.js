const express = require("express");
const router = express.Router();
const deleteUser = require("../../../../services/admin/userUpdate/deleteUser");
const verifyAdmin = require("../../../../middlewares/verifyAdmin")

router.delete("/", verifyAdmin, async (req, res) => {
  const { UserID, Email} = req.query;

  try {
    const result = await deleteUser(UserID, Email);
    const { status, message } = result;
    res.status(status).json(result);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

module.exports = router;