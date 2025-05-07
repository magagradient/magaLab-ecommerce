const express = require('express');
const router = express.Router();

// get
const index = require("../controllers/blogPosts/get/index");
const show = require("../controllers/blogPosts/get/show");
const byAuthor = require("../controllers/blogPosts/get/byAuthor");
const search = require("../controllers/blogPosts/get/search");

// post
const create = require("../controllers/blogPosts/post/create");

// put
const update = require("../controllers/blogPosts/put/update");

// delete
const destroy = require("../controllers/blogPosts/delete/destroy")

/* --------------------------------------- */

// get
router.get("/author/:authorId", byAuthor); 
router.get("/:id", show); 
router.get('/search/:query', search);
router.get('/', index);

// post
router.post("/", create); 

// put
router.put("/:id", update);   

//delete
router.delete("/:id", destroy);

module.exports = router; 