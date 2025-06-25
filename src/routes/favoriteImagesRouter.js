const express = require("express");
const router = express.Router();

const validateSchema = require("../middlewares/validateSchema");
const idParamSchema = require('../validators/shared/idParamSchema');
const userIdParamSchema = require('../validators/shared/userIdParamSchema');
const deleteByUserAndImageParamsSchema = require("../validators/favoriteImages/deleteByUserAndImageParamsSchema");
const {
    createFavoriteImageSchema,
} = require("../validators/favoriteImages");

/* ------------------------------------------ */

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
router.get("/user/:id_user",
    validateSchema(userIdParamSchema, "params"),
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

router.delete("/user/:id_user/image/:id_image",
    validateSchema(deleteByUserAndImageParamsSchema, "params"),
    byUserAndImage
);

module.exports = router;
