const express = require("express");
const router = express.Router();
const verifyAdmin = require("./../../../middlewares/verifyAdmin");

router.get("/", verifyAdmin, (req, res) => res.json({ msg: "admin is verified", metadata: req.body }));

router.use("/login", require("./auth/login"));
router.use("/updatepassword", require("./auth/updatePassword"));


router.use("/updateuser/verify", require("./modifyUser/verifyUser"));
router.use("/updateuser/suspend", require("./modifyUser/suspendUser"));
router.use("/updateuser/delete", require("./modifyUser/deleteUser"));



module.exports = router;