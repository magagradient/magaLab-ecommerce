const express = require('express');
const router = express.Router();

// validaciones
const validateSchema = require("../middlewares/validateSchema");
const {
    createThemeSchema,
    updateThemeSchema,
    themeIdParamSchema
} = require("../validators");

// controllers
const index = require("../controllers/themes/get/index");
const show = require("../controllers/themes/get/show");

const create = require("../controllers/themes/post/create");

const update = require("../controllers/themes/put/update");

const destroy = require("../controllers/themes/delete/destroy");

// rutas
router.get("/", index);
router.get("/:id", validateSchema(themeIdParamSchema, "params"), show);

router.post("/", validateSchema(createThemeSchema, "body"), create);

router.put(
    "/:id",
    validateSchema(themeIdParamSchema, "params"),
    validateSchema(updateThemeSchema, "body"),
    update
);

router.delete("/:id", validateSchema(themeIdParamSchema, "params"), destroy);

module.exports = router;
