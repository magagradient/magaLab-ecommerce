const express = require('express');
const router = express.Router();

const validateSchema = require("../middlewares/validateSchema");

const {
    createAuthorSchema,
    updateAuthorSchema,
} = require("../validators/authors");
const idParamSchema = require("../validators/shared/idParamSchema"); 


// get
const index = require("../controllers/authors/get/index")
const show = require("../controllers/authors/get/show")
const search = require("../controllers/authors/get/search")

// post
const create = require("../controllers/authors/post/create")

// put
const update = require("../controllers/authors/put/update")

// delete
const destroy = require("../controllers/authors/delete/destroy")


/* ---------------------------------------------- */

//get
router.get("/search", search);
router.get('/', index);
router.get("/:id", validateSchema(idParamSchema, "params"), show);

// post
router.post("/", validateSchema(createAuthorSchema, "body"), create);

// put
router.put("/:id",
    validateSchema(idParamSchema, "params"),
    validateSchema(updateAuthorSchema, "body"),
    update);

// delete
router.delete("/:id", validateSchema(idParamSchema, "params"), destroy);

module.exports = router;





