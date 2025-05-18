const express = require('express');
const router = express.Router();

// Controladores
const index = require("../controllers/productColors/get/index");
const create = require("../controllers/productColors/post/create");
const destroy = require("../controllers/productColors/delete/destroy");
const clear = require("../controllers/productColors/delete/clear");


router.get("/:id/colors", index);

// asociar colores a un producto (array de IDs)
router.post("/:id/colors", create);

// eliminar una relación producto-color específica
router.delete("/:id/colors/:colorId", destroy);

// eliminar todas las relaciones de colores del producto
router.delete("/:id/colors", clear);

module.exports = router; 