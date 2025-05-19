const express = require("express");
const router = express.Router();

// controllers:
const index = require("../controllers/styles/get/index");
const show = require("../controllers/styles/get/show");

const create = require("../controllers/styles/post/create");

const update = require("../controllers/styles/put/update");

const destroy = require("../controllers/styles/delete/destroy");


// rutas:
router.get("/", index);
router.get("/:id", show);

router.post("/", create);

router.put("/:id", update);

router.delete("/:id", destroy);

module.exports = router;
