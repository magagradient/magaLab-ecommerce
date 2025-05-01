const express = require('express');
const router = express.Router();

// get
const index = require("../controllers/passwordChanges/get/index")
const verifyPasswordChange = require("../controllers/passwordChanges/get/verifyPasswordChange");

// post
const requestPasswordChange = require("../controllers/passwordChanges/post/request");


/*-------------------------------------------------*/ 

// get
router.get("/users/:id/password-changes", index);
router.get("/password-changes/verify/:token", verifyPasswordChange);

// post
router.post("/password-changes/request", requestPasswordChange);



module.exports = router; 
