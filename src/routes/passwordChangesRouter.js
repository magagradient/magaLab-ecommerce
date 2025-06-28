const express = require('express');
const router = express.Router();

// get
const index = require("../controllers/passwordChanges/get/index");

// post
const create = require("../controllers/passwordChanges/post/create");

/*-------------------------------------------------*/

// get
router.get("/:id", index);

// post
router.post("/", create);

module.exports = router;
