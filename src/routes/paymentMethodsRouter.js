const express = require('express');
const router = express.Router();

// Controladores:
const index = require("../controllers/paymentMethods/get/index");
const create = require("../controllers/paymentMethods/post/create");
const update = require("../controllers/paymentMethods/put/update");
const destroy = require("../controllers/paymentMethods/delete/destroy");

// Rutas:
router.get("/", index);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", destroy);

module.exports = router;