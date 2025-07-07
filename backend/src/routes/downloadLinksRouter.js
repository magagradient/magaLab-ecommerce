const express = require('express');
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const validateSchema = require("../middlewares/validateSchema");
const idParamSchema = require('../validators/shared/idParamSchema');
const {
    userIdParamSchema,
    productIdParamSchema
} = require("../validators/downloadLinks/paramsSchema");

const createDownloadLinkSchema = require("../validators/downloadLinks/createDownloadLinkSchema");
const updateDownloadLinkSchema = require("../validators/downloadLinks/updateDownloadLinkSchema");

// controllers
const byUser = require("../controllers/downloadLinks/get/byUser");
const downloadLinkForProduct = require("../controllers/downloadLinks/get/downloadLinkForProduct");
const allDownloadLinks = require("../controllers/downloadLinks/get/allDownloadLinks");
const byId = require("../controllers/downloadLinks/get/byId");

const create = require("../controllers/downloadLinks/post/create");
const update = require("../controllers/downloadLinks/put/update");
const destroy = require("../controllers/downloadLinks/delete/destroy");

/* ------------------------------------------------------ */

// get
router.get('/user/:id_user',
    authMiddleware,
    validateSchema(userIdParamSchema, "params"),
    byUser
);

router.get('/product/:id_product',
    authMiddleware,
    validateSchema(productIdParamSchema, "params"),
    downloadLinkForProduct
);

router.get('/',
    authMiddleware,
    allDownloadLinks
);

router.get("/:id",
    authMiddleware,
    validateSchema(idParamSchema, "params"),
    byId
);

// post
router.post("/",
    authMiddleware,
    validateSchema(createDownloadLinkSchema),
    create
);

// put
router.put('/:id',
    authMiddleware,
    validateSchema(idParamSchema, "params"),
    validateSchema(updateDownloadLinkSchema),
    update
);

// delete
router.delete('/:id',
    authMiddleware,
    validateSchema(idParamSchema, "params"),
    destroy
);

module.exports = router;
