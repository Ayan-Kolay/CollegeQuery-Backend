const router = require("express").Router();
const jwt = require("jsonwebtoken");
// const createUser = require("./../../../services/authentication/createUser");
const verifyEmail = require("../../../../services/authentication/verifyEmail");
const verifyReq = require("../../../../middlewares/verifyReq");

const userSecrets = require("../../../../config/components/user").secrets;

const { jwt_verified, jwt_unverified, jwtExp, jwtAlgorithm } = userSecrets;

router.post("/", verifyReq, async (req, res) => {
  // res.redirect("https://www.google.com/")

  const { data } = req.body;
  const Email = req.body.email || req.body.Email;

  if ((!Email && !data) || !data.otp) {
    return res.status(400).send({
      status: 400,
      message: "Bad request",
    });
  }

  const result = await verifyEmail(data, Email);
  const { userID } = result;

  if (result.status === 200) {
    const payload = {
      Email,
      userID,
      iat: Math.floor(Date.now() / 1000) - jwtExp,
    };

    const token = jwt.sign(payload, jwt_verified, {
      algorithm: jwtAlgorithm,
    });

    res
      .cookie("jwt", token, {
        expires: new Date(Date.now() + jwtExp * 1000), // cookie will be removed after 8 hours
      })
      .send({
        status: 200,
        message: "Email verified",
        data: {
          token,
        },
      });
  } else {
    res.status(result.status).send(result);
  }
});

module.exports = router;
