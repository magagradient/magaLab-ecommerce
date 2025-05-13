const express = require("express");
const router = express.Router();

// get
const allFavorites = require("../controllers/favoriteImages/get/allFavorites");
const byUser = require("../controllers/favoriteImages/get/byUser");

// post
const create = require("../controllers/favoriteImages/post/create");

// delete
const byId = require("../controllers/favoriteImages/delete/byId");
const byUserAndImage = require("../controllers/favoriteImages/delete/byUserAndImage");

/* ------------------------------------------ */

// GET
router.get("/", allFavorites);
router.get("/user/:userId", byUser);

// POST
router.post("/", create);

// DELETE
router.delete("/:id", byId);
router.delete("/user/:userId/image/:imageId", byUserAndImage);

module.exports = router;
