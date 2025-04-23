const express = require('express');
const router = express.Router();

// get
const index = require("../controllers/passwordResets/get/index");
const search= require("../controllers/passwordResets/get/search");
const show = require("../controllers/passwordResets/get/show");

// post
const create = require("../controllers/passwordResets/post/create");

// put
const update = require("../controllers/passwordResets/put/update");

//delete
const destroy = require("../controllers/passwordResets/delete/destroy");

/*-------------------------------------------------*/ 

// get
router.get("/", index);
router.get('/search/:query', search);
router.get("/:id", show);

// post
router.post("/", create);

//put
router.put("/:id", update);

// delete
router.delete("/:id", destroy);

module.exports = router; 