const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multerConfig");
const authMiddleware = require("../middlewares/authMiddleware");

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
router.get("/:id", authMiddleware, show);
router.get("/:id/password-changes", authMiddleware, passwordChangesIndex);

// post (pública, para crear usuario)
router.post("/login", login);
router.post("/", create);

// put (protegida)
router.put("/:id", authMiddleware, update);

// patch (protegidas)
router.patch("/:id/avatar", authMiddleware, upload.single("avatar"), updateAvatar);
router.patch("/:id/role", authMiddleware, updateRole);

// delete (protegida)
router.delete("/:id", authMiddleware, destroy);

module.exports = router;
