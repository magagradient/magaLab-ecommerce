const express = require("express");
const router = express.Router();

// controllers:
const index = require("../controllers/series/get/index");
const show = require("../controllers/series/get/show");

const create = require("../controllers/series/post/create");

const update = require("../controllers/series/put/update");

const destroy = require("../controllers/series/delete/destroy");


// rutas:
router.get("/", index);
router.get("/:id", show);

router.post("/", create);

router.put("/:id", update);

router.delete("/:id", destroy);

module.exports = router;
