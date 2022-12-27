const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const userSecrets = require("./../config/components/user").secrets;

const { jwt_verified, jwt_unverified, jwtExp, jwtAlgorithm } = userSecrets;

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

  const cookie_token = cookie && cookie.includes("jwt=") && cookie.split("=")[1];
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
    var decoded = jwt.verify(token, jwt_verified);
    // console.log(decoded);
  } catch (err) {
    // err
  }

  // ------------------------------------------
  if (decoded) {
    req.body.emailVerified = true;
    req.body.email = decoded.Email;
    req.body.userID = decoded.userID;

    req.headers["auth"] = {};
    req.headers["auth"]["emailVerified"] = true;
    req.headers["auth"]["email"] = decoded.Email;
    req.headers["auth"]["userID"] = decoded.userID;
    return next();
  } else {
    // ------------------------------------------
    try {
      var decoded = jwt.verify(token, jwt_unverified);
      // console.log(decoded);
    } catch (err) {
      // err
    }

    // --------------------------------------------
    if (decoded) {
      req.body.emailVerified = false;
      req.body.email = decoded.Email;
      req.body.userID = decoded.userID;

      req.headers["auth"] = {};
      req.headers["auth"]["emailVerified"] = false;
      req.headers["auth"]["email"] = decoded.Email;
      req.headers["auth"]["userID"] = decoded.userID;
      return next();
      // ------------------------------------------
    } else {
      res.status(403).send({
        status: 401,
        message: "Unauthorized",
      });
    }
  }
});

module.exports = router;
