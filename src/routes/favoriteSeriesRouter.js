const express = require("express");
const router = express.Router();

const validateSchema = require("../middlewares/validateSchema");

// Esquemas de validación
const {
    favoriteSeriesCreateSchema,
    favoriteSeriesParamsSchema,
    idParamSchema
} = require("../validators/favoriteSeries");

// get
const index = require("../controllers/favoriteSeries/get/index");
const show = require("../controllers/favoriteSeries/get/show");

// post
const create = require("../controllers/favoriteSeries/post/create");

// delete
const destroy = require("../controllers/favoriteSeries/delete/destroy");
const byUserAndSeries = require("../controllers/favoriteSeries/delete/byUserAndSeries");

/* ------------------------------- */

// GET
router.get("/", index);
router.get("/:id",
    validateSchema(idParamSchema, "params"),
    show
);

// POST
router.post("/",
    validateSchema(favoriteSeriesCreateSchema, "body"),
    create
);

// DELETE
router.delete("/:id",
    validateSchema(idParamSchema, "params"),
    destroy
);

router.delete("/user/:id_user/serie/:id_series",
    validateSchema(favoriteSeriesParamsSchema, "params"),
    byUserAndSeries
);


module.exports = router;
