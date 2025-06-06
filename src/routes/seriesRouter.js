const express = require("express");
const router = express.Router();

const validateSchema = require("../middlewares/validateSchema");

// Schemas
const {
    createSeriesSchema,
    updateSeriesSchema,
} = require("../validators");
const idParamSchema = require("../validators/shared/idParamSchema"); 

// controllers:
const index = require("../controllers/series/get/index");
const show = require("../controllers/series/get/show");

const create = require("../controllers/series/post/create");

const update = require("../controllers/series/put/update");

const destroy = require("../controllers/series/delete/destroy");


// Rutas
router.get("/", index);
router.get("/:id", validateSchema(idParamSchema, "params"), show);

router.post("/", validateSchema(createSeriesSchema, "body"), create);

router.put(
    "/:id",
    validateSchema(idParamSchema, "params"),
    validateSchema(updateSeriesSchema, "body"),
    update
);

router.delete("/:id", validateSchema(idParamSchema, "params"), destroy);

module.exports = router;
