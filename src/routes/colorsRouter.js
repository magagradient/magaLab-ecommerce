const express = require('express');
const router = express.Router();

// IMPORTACIONES VALIDACIONES
const validateSchema = require("../middlewares/validateSchema");
const {
    colorCreateSchema,
    colorUpdateSchema,
} = require("../validators");
const idParamSchema = require("../validators/shared/idParamSchema"); 

/* ----------------------------------- */
// IMPORTACIONES CONTROLLERS
// get
const productsByColor = require("../controllers/colors/get/productsByColor");
const index = require("../controllers/colors/get/index");
const show = require("../controllers/colors/get/show");

// post
const create = require("../controllers/colors/post/create");

// put
const update = require("../controllers/colors/put/update");

// delete
const destroy = require("../controllers/colors/delete/destroy");

/*-------------------------------------------*/
//RUTAS
// get
router.get("/", index);
router.get("/:id", validateSchema(idParamSchema, "params"), show);
router.get("/:id/products", validateSchema(idParamSchema, "params"), productsByColor);

// post
router.post("/", validateSchema(colorCreateSchema, "body"), create);

// put
router.put("/:id", validateSchema(idParamSchema, "params"), validateSchema(colorUpdateSchema, "body"), update);

// delete
router.delete("/:id", validateSchema(idParamSchema, "params"), destroy);

module.exports = router; 
