const router = require("express").Router();
const jwt = require("jsonwebtoken");
const createUser = require("./../../../../services/authentication/createUser");
const userSecrets = require("./../../../../config/components/user").secrets;

const { jwt_verified, jwt_unverified, jwtExp, jwtAlgorithm } = userSecrets;

router.post("/", async (req, res) => {
  // res.redirect("https://www.google.com/")

  const { data } = req.body;

  if (
    !data ||
    !data.FirstName ||
    !data.LastName ||
    !data.Email ||
    !data.Password
  ) {
    return res.status(400).send({
      status: 400,
      message: "some fields are missing",
    });
  }

  const result = await createUser(data);

  if (result.status === 200) {
    const { Email } = data;
    const { userID } = result;
    const payload = {
      Email,
      userID,
      iat: Math.floor(Date.now() / 1000) - jwtExp,
    };

    const token = jwt.sign(payload, jwt_unverified, {
      algorithm: jwtAlgorithm,
    });

    res
      .cookie("jwt", token, {
        expires: new Date(Date.now() + jwtExp * 1000), // cookie will be removed after 8 hours
      })
      .send({
        status: 200,
        message: "User created",
        data: {
          token,
        },
      });
  } else {
    res.send(result);
  }
});

module.exports = router;
