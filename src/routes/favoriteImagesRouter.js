const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const validateSchema = require("../middlewares/validateSchema");

const idParamSchema = require("../validators/shared/idParamSchema");
const userIdParamSchema = require("../validators/shared/userIdParamSchema");
const deleteByUserAndImageParamsSchema = require("../validators/favoriteImages/deleteByUserAndImageParamsSchema");
const {
    createFavoriteImageSchema,
} = require("../validators/favoriteImages");

/* ------------------------------------------ */

// Controllers
const allFavorites = require("../controllers/favoriteImages/get/allFavorites");
const byUser = require("../controllers/favoriteImages/get/byUser");
const create = require("../controllers/favoriteImages/post/create");
const byId = require("../controllers/favoriteImages/delete/byId");
const byUserAndImage = require("../controllers/favoriteImages/delete/byUserAndImage");

/* ------------------------------------------ */

// GET
router.get("/",
    authMiddleware,
    allFavorites
);

router.get("/user/:id_user",
    authMiddleware,
    validateSchema(userIdParamSchema, "params"),
    byUser
);

// POST
router.post("/",
    authMiddleware,
    validateSchema(createFavoriteImageSchema, "body"),
    create
);

// DELETE
router.delete("/:id",
    authMiddleware,
    validateSchema(idParamSchema, "params"),
    byId
);

router.delete("/user/:id_user/image/:id_image",
    authMiddleware,
    validateSchema(deleteByUserAndImageParamsSchema, "params"),
    byUserAndImage
);

module.exports = router;
