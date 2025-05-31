const express = require("express");
const router = express.Router();

const validateSchema = require("../middlewares/validateSchema");

// IMPORTACIONES VALIDACIONES
const {
    idParamSchema,
    categoryCreateSchema,
    categoryUpdateSchema
} = require("../validators");

/* ------------------------------- */

// IMPORTACIONES CONTROLLERS
// get
const index = require("../controllers/categories/get/index");
const show = require("../controllers/categories/get/show");
const productsByCategory = require("../controllers/categories/get/productsByCategory");

// post
const create = require("../controllers/categories/post/create");

// put
const update = require("../controllers/categories/put/update");

// delete
const destroy = require("../controllers/categories/delete/destroy");

/* ------------------------------- */

//RUTAS
// get
router.get("/:id", validateSchema(idParamSchema, "params"), show);
router.get('/:id/products', validateSchema(idParamSchema, 'params'), productsByCategory);
router.get("/", index);

// post
router.post("/", validateSchema(categoryCreateSchema, "body"), create);

// put
router.put('/:id', 
    validateSchema(idParamSchema, 'params'), 
    validateSchema(categoryUpdateSchema, 'body'), 
    update);

// delete
router.delete('/:id', validateSchema(idParamSchema, 'params'), destroy);

module.exports = router;
