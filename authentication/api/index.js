const express = require("express");
const router = express.Router();
const verifyReq = require("./../middlewares/verifyReq");

// @route   GET api/posts/test
// @desc    Tests posts route
// @access  Public
router.get("/", verifyReq, (req, res) => res.json({ msg: "user is valid", metadata: req.body }));


router.use("/auth/signup", require("./routes/user/auth/signup"));
router.use("/auth/signin", require("./routes/user/auth/signin"));
router.use("/auth/verifyEmail", require("./routes/user/auth/verifyEmail"));
router.use("/auth/resendOtp", require("./routes/user/auth/resendOtp"));


router.use("/admin", require("./routes/admin/index"));



module.exports = router;
