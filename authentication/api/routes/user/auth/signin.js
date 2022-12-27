const router = require("express").Router();
const jwt = require("jsonwebtoken");
const loginUser = require("./../../../../services/authentication/loginUser");
const userSecrets = require("./../../../../config/components/user").secrets;

const { jwt_verified, jwt_unverified, jwtExp, jwtAlgorithm } = userSecrets;

router.post("/", async (req, res) => {
  // res.redirect("https://www.google.com/")

  const { data } = req.body;

  if (!data || (!data.Email && !data.Password)) {
    return res.status(400).send({
      status: 400,
      message: "some fields are missing",
    });
  }

  const result = await loginUser(data);
  const { userID } = result;

  if (result.status === 200) {
    // console.log(result.verified);
    const { Email } = data;
    const payload = {
      Email,
      userID,
      iat: Math.floor(Date.now() / 1000) - jwtExp,
    };

    if (result.verified) {
      var token = jwt.sign(payload, jwt_verified, {
        algorithm: jwtAlgorithm,
      });
    } else {
      var token = jwt.sign(payload, jwt_unverified, {
        algorithm: jwtAlgorithm,
      });
    }

    res
      .cookie("jwt", token, {
        expires: new Date(Date.now() + jwtExp * 1000), // cookie will be removed after 8 hours
      })
      .send({
        status: 200,
        message: "Logged in successfully",
        data: {
          token,
        },
      });
  } else {
    const status = result.status;
    res.status(status).send(result);
  }
});

module.exports = router;
