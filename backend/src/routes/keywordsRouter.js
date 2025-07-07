const express = require("express");
const router = express.Router();

// Middleware de validación
const validateSchema = require("../middlewares/validateSchema");

// Schemas
const {
    createKeywordSchema,
    updateKeywordSchema,
} = require("../validators");
const idParamSchema = require("../validators/shared/idParamSchema"); 


// Controllers
const index = require("../controllers/keywords/get/index");
const show = require("../controllers/keywords/get/show");

const create = require("../controllers/keywords/post/create");

const update = require("../controllers/keywords/put/update");

const destroy = require("../controllers/keywords/delete/destroy");

// Rutas
router.get("/", index);
router.get("/:id", validateSchema(idParamSchema, "params"), show);

router.post("/", validateSchema(createKeywordSchema, "body"), create);

router.put(
    "/:id",
    validateSchema(idParamSchema, "params"),
    validateSchema(updateKeywordSchema, "body"),
    update
);

router.delete("/:id", validateSchema(idParamSchema, "params"), destroy);

module.exports = router;
