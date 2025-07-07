const express = require('express');
const router = express.Router();

// IMPORTACIONES VALIDACIONES
const validateSchema = require("../middlewares/validateSchema");
const {
    createStyleSchema,
    updateStyleSchema,
    styleIdParamSchema,
} = require("../validators");
const idParamSchema = require("../validators/shared/idParamSchema"); 

// Controllers
const index = require("../controllers/styles/get/index");
const show = require("../controllers/styles/get/show");

const create = require("../controllers/styles/post/create");

const update = require("../controllers/styles/put/update");

const destroy = require("../controllers/styles/delete/destroy");


// rutas:
router.get("/", index);
router.get("/:id", validateSchema(idParamSchema, "params"), show);

router.post("/", validateSchema(createStyleSchema, "body"), create);

router.put("/:id", validateSchema(idParamSchema, "params"), validateSchema(updateStyleSchema), update);

router.delete("/:id", validateSchema(idParamSchema, "params"), destroy);

module.exports = router;
