const express = require('express');
const router = express.Router();

const validateSchema = require("../middlewares/validateSchema");
const { productThemesCreateSchema } = require("../validators/productThemes");

// controllers
const list = require("../controllers/productThemes/get/list");
const create = require("../controllers/productThemes/post/create");
const destroy = require("../controllers/productThemes/delete/destroy");

// rutas
router.get("/:id/themes", list);

router.post("/:id/themes",
    validateSchema(productThemesCreateSchema, "body"),
    create
);

router.delete("/:id/themes/:id_theme", destroy);

module.exports = router;

