const express = require('express');
const router = express.Router();

// controllers
const list = require("../controllers/productStyles/get/list");
const create = require("../controllers/productStyles/post/create");
const destroy = require("../controllers/productStyles/delete/destroy");

// rutas
router.get("/:id/styles", list);
router.post("/:id/styles", create);
router.delete("/:id/styles/:styleId", destroy);

module.exports = router;
