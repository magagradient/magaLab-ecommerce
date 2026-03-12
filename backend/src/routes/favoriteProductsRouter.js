const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const validateSchema = require("../middlewares/validateSchema");

const {
    favoriteProductCreateSchema,
    favoriteProductParamsSchema
} = require("../validators/favoriteProducts");

// Controllers
const index = require("../controllers/favoriteProducts/get/index");
const create = require("../controllers/favoriteProducts/post/create");
const destroy = require("../controllers/favoriteProducts/delete/destroy");

// GET
router.get("/",
    authMiddleware,
    index
);

// POST
router.post("/",
    authMiddleware,
    validateSchema(favoriteProductCreateSchema, "body"),
    create
);

// DELETE
router.delete("/:id_product",
    authMiddleware,
    validateSchema(favoriteProductParamsSchema, "params"),
    destroy
);

module.exports = router;