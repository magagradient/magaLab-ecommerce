const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multerConfig");

// get
const index = require("../controllers/users/get/index");
const status = require("../controllers/users/get/status");
const show = require("../controllers/users/get/show");
const passwordChangesIndex = require("../controllers/passwordChanges/get/index"); 

// post
const create = require("../controllers/users/post/create");

// put
const update = require("../controllers/users/put/update");

// patch
const updateAvatar = require("../controllers/users/patch/updateAvatar");
const updateRole = require("../controllers/users/patch/updateRole");

// delete
const destroy = require("../controllers/users/delete/destroy");

/*-------------------------------------------------*/

// get
router.get("/", index);
router.get("/status", status);
router.get("/:id", show);
router.get("/:id/password-changes", passwordChangesIndex); 

// post
router.post("/", create);

// put
router.put("/:id", update);

// patch
router.patch("/:id/avatar", upload.single("avatar"), updateAvatar);
router.patch("/:id/role", updateRole);

// delete
router.delete("/:id", destroy);

module.exports = router;
