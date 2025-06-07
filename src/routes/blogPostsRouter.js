const express = require('express');
const router = express.Router();

// Validaciones
const validateSchema = require("../middlewares/validateSchema");

const {
    createBlogPostSchema,
    updateBlogPostSchema
} = require("../validators/blogPost");

const idParamSchema = require("../validators/shared/idParamSchema");

/* --------------------------------------- */

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
router.get('/search', search);
router.get("/author/:authorId", validateSchema(idParamSchema, "params"), byAuthor);
router.get("/:id", validateSchema(idParamSchema, "params"), show);
router.get('/', index);

// post
router.post("/", validateSchema(createBlogPostSchema, "body"), create);

// put
router.put("/:id",
    validateSchema(idParamSchema, "params"),
    validateSchema(updateBlogPostSchema, "body"),
    update
);

//delete
router.delete("/:id", validateSchema(idParamSchema, "params"), destroy);

module.exports = router; 