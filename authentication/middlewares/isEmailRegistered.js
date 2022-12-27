const express = require("express");
const router = express.Router();

router.use("/", async (req, res, next) => {
  if (req.body && req.body.emailVerified) {
    next();
  } else {
    res.status(403).send({
      status: 403,
      message: "Email is not verified",
    });
  }
});

module.exports = router;
