const express = require("express");
const router = express.Router();

// get
const index = require("../controllers/favoriteSeries/get/index");
const show = require("../controllers/favoriteSeries/get/show");

// post
const create = require("../controllers/favoriteSeries/post/create");

// delete
const destroy = require("../controllers/favoriteSeries/delete/destroy");
const byUserAndSeries = require("../controllers/favoriteSeries/delete/byUserAndSeries");

/* ------------------------------- */

// get
router.get("/", index);
router.get("/:id", show);

// post
router.post("/", create);

// delete
router.delete("/:id", destroy);
router.delete("/user/:id_user/serie/:id_series", byUserAndSeries);


module.exports = router;
