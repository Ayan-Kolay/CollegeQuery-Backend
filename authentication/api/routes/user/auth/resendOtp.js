const router = require("express").Router();
const jwt = require("jsonwebtoken");
const resetOTP = require("./../../../../services/authentication/resetOTP");
const userSecrets = require("./../../../../config/components/user").secrets;
const verifyReq = require("../../../../middlewares/verifyReq");

const { jwt_verified, jwt_unverified, jwtExp, jwtAlgorithm } = userSecrets;

router.post("/", verifyReq, async (req, res) => {
  const Email = req.body.email || req.body.Email;

  if (Email) {
    const result = await resetOTP(Email);
    res.status(200).send(result);
  } else {
    res.status(400).json({
      message: "Email is required",
    });
  }
});

module.exports = router;
