const express = require('express');
const router = express.Router();

// controllers
const list = require("../controllers/productThemes/get/list");
const create = require("../controllers/productThemes/post/create");
const destroy = require("../controllers/productThemes/delete/destroy");

// rutas
router.get("/:id/themes", list);
router.post("/:id/themes", create);
router.delete("/:id/themes/:themeId", destroy);

module.exports = router;

