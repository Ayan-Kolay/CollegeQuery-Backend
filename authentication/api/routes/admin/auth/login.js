const router = require("express").Router();
const jwt = require("jsonwebtoken");
const loginUser = require("./../../../../services/admin/auth/login");
const userSecrets = require("./../../../../config/components/admin").secrets;

const { jwt_admin, jwtExp_admin, jwtAlgorithm } = userSecrets;

router.post("/", async (req, res) => {
  // res.redirect("https://www.google.com/")

  const { data } = req.body;

  if (!data || (!data.Email && !data.Password && !data.Username)) {
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
      Role: "admin",
      iat: Math.floor(Date.now() / 1000) - jwtExp_admin,
    };

      var token = jwt.sign(payload, jwt_admin, {
        algorithm: jwtAlgorithm,
      });

    res
      .cookie("jwt", token, {
        expires: new Date(Date.now() + jwtExp_admin * 1000), // cookie will be removed after 8 hours
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
