const express = require('express');
const router = express.Router();

// get
const passwordResetsByUser = require("../controllers/passwordResets/get/byUser");
const verifyToken = require("../controllers/passwordResets/get/verifyToken");

// post
const request = require("../controllers/passwordResets/post/request");
const confirm = require("../controllers/passwordResets/post/confirm");

// patch
const invalidateToken = require("../controllers/passwordResets/patch/invalidate");

/////////////////////////////////////////////// 

// get
router.get("/user/:id", passwordResetsByUser);
router.get("/verify/:token", verifyToken);

// post
router.post("/request", request);
router.post("/confirm", confirm);

//patch
router.patch("/invalidate/:token", invalidateToken);


module.exports = router; 