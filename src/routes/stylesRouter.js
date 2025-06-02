const express = require('express');
const router = express.Router();

// IMPORTACIONES VALIDACIONES
const validateSchema = require("../middlewares/validateSchema");
const {
    createStyleSchema,
    updateStyleSchema,
    styleIdParamSchema,
} = require("../validators");

// Controllers
const index = require("../controllers/styles/get/index");
const show = require("../controllers/styles/get/show");

const create = require("../controllers/styles/post/create");

const update = require("../controllers/styles/put/update");

const destroy = require("../controllers/styles/delete/destroy");


// rutas:
router.get("/", index);
router.get("/:id", validateSchema(styleIdParamSchema, "params"), show);

router.post("/", validateSchema(createStyleSchema, "body"), create);

router.put("/:id", validateSchema(styleIdParamSchema, "params"), validateSchema(updateStyleSchema), update);

router.delete("/:id", validateSchema(styleIdParamSchema, "params"), destroy);

module.exports = router;
