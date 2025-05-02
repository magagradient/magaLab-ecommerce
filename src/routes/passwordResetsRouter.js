const express = require('express');
const router = express.Router();

// get
const passwordResetsByUser = require("../controllers/passwordResets/get/passwordResetsByUser");
const verifyToken = require("../controllers/passwordResets/get/verifyToken");

// post
const request = require("../controllers/passwordResets/post/request");

// patch
const invalidateToken = require("../controllers/passwordResets/patch/invalidateToken");


/*-------------------------------------------------*/ 

// get
router.get("/:id", passwordResetsByUser);
router.get("/verify/:token", verifyToken);

// post
router.post("/request", request);

//patch
router.patch("/invalidate/:token", invalidateToken);


module.exports = router; 