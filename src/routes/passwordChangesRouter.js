const express = require('express');
const router = express.Router();

// get
const verifyPasswordChange = require("../controllers/passwordChanges/get/verifyPasswordChange");

// post
const requestPasswordChange = require("../controllers/passwordChanges/post/request");

/*-------------------------------------------------*/

// get
router.get("/verify/:token", verifyPasswordChange);

// post
router.post("/request", requestPasswordChange);

module.exports = router;
