const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');
const validateSchema = require('../middlewares/validateSchema');

const { createPasswordChangeSchema } = require('../validators/passwordChanges/createPasswordChangeSchema');
const { userIdParamSchema } = require('../validators/shared/userIdParamSchema');

// createPasswordChangeSchema

// get
const index = require("../controllers/passwordChanges/get/index");

// post
const create = require("../controllers/passwordChanges/post/create");

/*-------------------------------------------------*/

// GET /passwordChanges/:id  - protegido y validado
router.get("/:id",
    authMiddleware,
    validateSchema(userIdParamSchema, "params"),
    index
);


// POST /passwordChanges  - protegido y validado
router.post("/",
    authMiddleware,
    validateSchema(createPasswordChangeSchema, "body"),
    create
);


module.exports = router;
