const express = require('express');
const router = express.Router();

// get
const index = require("../controllers/passwordChanges/get/index");
const search = require("../controllers/passwordChanges/get/search");
const show = require("../controllers/passwordChanges/get/show");

// post
const create = require("../controllers/passwordChanges/post/create");

// put
const update = require("../controllers/passwordChanges/put/update");

// delete 
const destroy = require("../controllers/passwordChanges/delete/destroy");

/*-------------------------------------------------*/ 


// get
router.get("/", index);
router.get("/", search);
router.get("/:id", show);

// post
router.post("/", create);

// put
router.put("/:id", update);

// delete 
router.delete("/:id", destroy);


module.exports = router; 
