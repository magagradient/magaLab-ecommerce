const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multerConfig");
const authMiddleware = require("../middlewares/authMiddleware");
const validateSchema = require("../middlewares/validateSchema");

const updateUserSchema = require('../validators/users/updateUserSchema');
const registerSchema = require('../validators/users/registerSchema');
const loginSchema = require('../validators/users/loginSchema');
const idParamSchema = require('../validators/shared/idParamSchema');

// controllers
const index = require("../controllers/users/get/index");
const status = require("../controllers/users/get/status");
const show = require("../controllers/users/get/show");
const passwordChangesIndex = require("../controllers/passwordChanges/get/index");
const getProfile = require("../controllers/users/get/profile");

// post
const create = require("../controllers/users/post/create");
const login = require("../controllers/users/post/login");

// put
const update = require("../controllers/users/put/update");

// patch
const updateAvatar = require("../controllers/users/patch/updateAvatar");
const updateRole = require("../controllers/users/patch/updateRole");

// delete
const destroy = require("../controllers/users/delete/destroy");

/*-------------------------------------------------*/

// get (protegidas)
router.get("/", authMiddleware, index);
router.get("/status", authMiddleware, status);
router.get("/profile", authMiddleware, getProfile);
router.get("/:id", authMiddleware, validateSchema(idParamSchema, "params"), show);
router.get("/:id/password-changes", authMiddleware, validateSchema(idParamSchema, "params"), passwordChangesIndex);

// post (pública, para crear usuario)
router.post("/login", validateSchema(loginSchema, "body"), login);
router.post("/",
    validateSchema(registerSchema, "body"),
    create
);

// put (protegida)
router.put("/:id", authMiddleware, validateSchema(idParamSchema, "params"), validateSchema(updateUserSchema, "body"), update);

// patch (protegidas)
router.patch("/:id/avatar", authMiddleware, validateSchema(idParamSchema, "params"), upload.single("avatar"), updateAvatar);
router.patch("/:id/role", authMiddleware, validateSchema(idParamSchema, "params"), updateRole);

// delete (protegida)
router.delete("/:id", authMiddleware, destroy);

module.exports = router;
