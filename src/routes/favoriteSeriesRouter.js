const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const validateSchema = require("../middlewares/validateSchema");

// Esquemas de validación
const {
    favoriteSeriesCreateSchema,
    favoriteSeriesParamsSchema,
    idParamSchema
} = require("../validators/favoriteSeries");

// Controllers
const index = require("../controllers/favoriteSeries/get/index");
const show = require("../controllers/favoriteSeries/get/show");

const create = require("../controllers/favoriteSeries/post/create");

const destroy = require("../controllers/favoriteSeries/delete/destroy");
const byUserAndSeries = require("../controllers/favoriteSeries/delete/byUserAndSeries");

/* ------------------------------- */

// GET
router.get("/",
    authMiddleware,
    index
);

router.get("/:id",
    authMiddleware,
    validateSchema(idParamSchema, "params"),
    show
);

// POST
router.post("/",
    authMiddleware,
    validateSchema(favoriteSeriesCreateSchema, "body"),
    create
);

// DELETE
router.delete("/:id",
    authMiddleware,
    validateSchema(idParamSchema, "params"),
    destroy
);

router.delete("/user/:id_user/serie/:id_series",
    authMiddleware,
    validateSchema(favoriteSeriesParamsSchema, "params"),
    byUserAndSeries
);

module.exports = router;
