const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const userSecrets = require("./../config/components/admin").secrets;

const { jwt_admin, jwtExp_admin, jwtAlgorithm } = userSecrets;

router.use("/", async (req, res, next) => {
  const { cookie } = req.headers;
  // ---------------------------------------
  // if (!cookie || !cookie.includes("jwt=")) {
  //   return res.status(403).send({
  //     status: 401,
  //     message: "Unauthorized",
  //   });
  // }
  // ----------------------------------------

  const cookie_token =
    cookie && cookie.includes("jwt=") && cookie.split("=")[1];
  // console.log(token);

  const token = cookie_token || req.headers.cki;

  if (!token) {
    return res.status(403).send({
      status: 401,
      message: "No token found",
    });
  }

  // ----------------------------------------
  try {
    var decoded = jwt.verify(token, jwt_admin);
    // console.log(decoded);
  } catch (err) {
    // err
  }

  // ------------------------------------------
  if (decoded) {
    req.body.role = decoded.Role;
    req.body.email = decoded.Email;

    req.headers["auth"] = {};
    req.headers["auth"]["role"] = decoded.Role;
    req.headers["auth"]["email"] = decoded.Email;
    return next();
  } else {
    // ------------------------------------------
    res.status(403).send({
      status: 401,
      message: "Unauthorized",
    });
  }
});

module.exports = router;
