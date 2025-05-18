const express = require('express');
const router = express.Router();

// Controllers
const index = require("../controllers/payments/get/index");
const create = require("../controllers/payments/post/create");
const update = require("../controllers/payments/put/update");
const destroy = require("../controllers/payments/delete/destroy");


// Rutas
router.get("/", index);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", destroy);

module.exports = router;