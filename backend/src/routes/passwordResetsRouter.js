const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');
const passwordResetLimiter = require("../middlewares/passwordResetLimiter");
const validateSchema = require('../middlewares/validateSchema');

const userIdParamSchema = require('../validators/shared/userIdParamSchema');
const confirmPasswordResetSchema = require('../validators/passwordResets/confirmPasswordResetSchema');
const requestPasswordResetSchema = require('../validators/passwordResets/requestPasswordResetSchema');
const tokenParamSchema = require('../validators/passwordResets/tokenParamSchema');
    

// controllers
const passwordResetsByUser = require("../controllers/passwordResets/get/byUser");
const verifyToken = require("../controllers/passwordResets/get/verifyToken");
const request = require("../controllers/passwordResets/post/request");
const confirm = require("../controllers/passwordResets/post/confirm");
const invalidateToken = require("../controllers/passwordResets/patch/invalidate");

/* ------------------------- Rutas ------------------------- */

// GET
router.get(
    "/user/:id",
    authMiddleware,
    validateSchema(userIdParamSchema, "params"),
    passwordResetsByUser
);

router.get(
    "/verify/:token",
    validateSchema(tokenParamSchema, "params"),
    verifyToken
);

// POST
router.post(
    "/request",
    passwordResetLimiter,
    validateSchema(requestPasswordResetSchema, "body"),
    request
);

router.post(
    "/confirm",
    validateSchema(confirmPasswordResetSchema, "body"),
    confirm
);

// PATCH
router.patch(
    "/invalidate/:token",
    validateSchema(tokenParamSchema, "params"),
    invalidateToken
);

module.exports = router;
