const { Products, Categories, Series } = require("../../../database/indexModels");

const status = async (req, res) => {
    const { type } = req.params;

    if (!["sold", "available"].includes(type)) {
        return res.status(400).json({
            status: "error",
            message: "Parámetro inválido. Usá 'sold' o 'available'.",
            timestamp: new Date().toISOString()
        });
    }

    const isSold = type === "sold";

    try {
        const products = await Products.findAll({
            where: { is_sold: isSold },
            attributes: { exclude: ['created_at', 'updated_at'] },
            include: [
                { model: Categories, as: "category" },
                { model: Series, as: "series" }
            ],
            order: isSold
                ? [["sold_at", "DESC"]]
                : [["createdAt", "DESC"]]
        });

        return res.status(200).json({
            status: "success",
            results: products,
            total: products.length,
            filter: type,
            ordered_by: isSold ? "sold_at DESC" : "createdAt DESC",
            source: "/products/status/:type",
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error("Error al filtrar productos por estado:", error);
        return res.status(500).json({
            status: "error",
            message: "Error interno del servidor",
            error: error.message,
            timestamp: new Date().toISOString()
        });
    }
};

module.exports = status;
