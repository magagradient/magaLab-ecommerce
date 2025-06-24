const express = require("express");
const router = express.Router();

const validateSchema = require("../middlewares/validateSchema");

const {
    createFavoriteImageSchema,
    idParamSchema,
    imageIdParamSchema
} = require("../validators/favoriteImages");

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
router.get("/user/:userId",
    validateSchema(idParamSchema, "params"),
    byUser
);

// POST
router.post("/",
    validateSchema(createFavoriteImageSchema, "body"),
    create
);

// DELETE
router.delete("/:id",
    validateSchema(idParamSchema, "params"),
    byId
);

router.delete("/user/:userId/image/:imageId",
    validateSchema(idParamSchema, "params"),
    validateSchema(imageIdParamSchema, "params"),
    byUserAndImage
);


module.exports = router;
