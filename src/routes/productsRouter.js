const express = require("express");
const router = express.Router();

const validateSchema = require("../middlewares/validateSchema");
const validateCategoryAndSeriesExist = require('../middlewares/validateCategoryAndSeriesExist');
const upload = require("../middlewares/multerConfig");

const {
    productCreateSchema,
    productUpdateSchema,
    updateRelationsSchema,
    productFilterSchema,
    productSearchSchema,
    idParamSchema,
    deleteRelationSchema,
    assignRelationParamsSchema,
    assignRelationSchema,
    productsArraySchema
} = require("../validators");

// get
const index = require("../controllers/products/get/index");
const filter = require("../controllers/products/get/filter");
const show = require("../controllers/products/get/show");
const status = require("../controllers/products/get/status");
const getRelations = require("../controllers/products/get/getRelations");
const search = require("../controllers/products/get/search");
const related = require("../controllers/products/get/related");

// patch
const toggleSold = require("../controllers/products/patch/toggleSold");
const softDelete = require("../controllers/products/patch/softDelete");

// post
const create = require("../controllers/products/post/create");
const bulkCreateProducts = require("../controllers/products/post/bulkCreateProducts");
const uploadImage = require("../controllers/products/post/uploadImage");


// put
const assignRelation = require("../controllers/products/put/assignRelation")
const update = require("../controllers/products/put/update")
const updateRelations = require("../controllers/products/put/updateRelations")

// delete
const destroy = require("../controllers/products/delete/destroy")
const removeRelation = require("../controllers/products/delete/removeRelation");


/*-------------------------------------------------*/


//get
router.get("/filter", validateSchema(productFilterSchema, 'query'), filter);
router.get("/search", validateSchema(productSearchSchema, 'query'), search);
router.get("/status/:type", status);
router.get("/:id/related", related);
router.get("/:id/relations", getRelations);
router.get("/:id", validateSchema(idParamSchema, "params"), show);
router.get("/", index);

// patch
router.patch("/:id/toggle-sold", validateSchema(idParamSchema, "params"), toggleSold);
router.patch("/:id/soft-delete", validateSchema(idParamSchema, "params"), softDelete);

// post
router.post(
    '/',
    validateSchema(productCreateSchema),  // valida tipos y estructura con Joi
    validateCategoryAndSeriesExist,       // valida existencia en DB
    create                         
);
router.post('/bulk-create', validateSchema(productsArraySchema), bulkCreateProducts);
router.post("/:id/upload-image", upload.single("image"), uploadImage);

// put
router.put(
    '/:id/assign/:relationType',
    validateSchema(assignRelationParamsSchema, 'params'),
    validateSchema(assignRelationSchema, 'body'),
    assignRelation
);
router.put(
    '/:id',
    validateSchema(idParamSchema, 'params'),
    validateSchema(productUpdateSchema, 'body'),
    update
);
router.put("/:id/relations", validateSchema(idParamSchema, "params"), validateSchema(updateRelationsSchema), updateRelations);

// delete
router.delete("/:id", validateSchema(idParamSchema, "params"), destroy);
router.delete("/:idProduct/remove/:relationType/:relationId", validateSchema(deleteRelationSchema, "params"), removeRelation);


module.exports = router;
