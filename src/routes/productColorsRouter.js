const express = require('express');
const router = express.Router();

const validateSchema = require("../middlewares/validateSchema");

// Esquemas de validación
const idParamSchema = require("../validators/shared/idParamSchema"); // para :id

const {
    createProductColorSchema,
    deleteProductColorSchema,
    productColorParamsSchema
} = require("../validators/productColor");

/* --------------------------------------------- */

// Controladores
const index = require("../controllers/productColors/get/index");
const create = require("../controllers/productColors/post/create");
const destroy = require("../controllers/productColors/delete/destroy");
const clear = require("../controllers/productColors/delete/clear");

/* --------------------------------------------- */

// Obtener todos los colores asociados a un producto
router.get("/:id/colors",
    validateSchema(idParamSchema, "params"),
    index
);

// Asociar uno o más colores a un producto
router.post("/:id/colors",
    validateSchema(idParamSchema, "params"),
    create
);

// Eliminar una relación específica producto-color
router.delete("/:id/colors/:id_color",
    validateSchema(productColorParamsSchema, "params"),
    destroy
);

// Eliminar todas las relaciones de colores del producto
router.delete("/:id/colors",
    validateSchema(idParamSchema, "params"),
    clear
);

module.exports = router; 