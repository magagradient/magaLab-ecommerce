const express = require('express');
const router = express.Router();

// controllers
const index = require("../controllers/productImages/get/index");
const create = require("../controllers/productImages/post/create");
const destroy = require("../controllers/productImages/delete/destroy");
const clear = require("../controllers/productImages/delete/clear");


// rutas
router.get("/:id/images", index);
router.post("/:id/images", create);
router.delete("/:id/images/:imageId", destroy);
router.delete("/:id/images", clear);


module.exports = router; 