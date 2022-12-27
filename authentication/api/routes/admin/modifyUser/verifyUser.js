const express = require("express");
const router = express.Router();
const verifyUser = require("../../../../services/admin/userUpdate/verifyUser");
const verifyAdmin = require("../../../../middlewares/verifyAdmin")

router.put("/", verifyAdmin, async (req, res) => {
  const { UserID, Email, verification } = req.body;
  const data = { UserID, Email, verification };

  try {
    const result = await verifyUser(data);
    const { status, message } = result;
    res.status(status).json(result);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

module.exports = router;
