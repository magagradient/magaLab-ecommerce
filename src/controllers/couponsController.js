const { Coupons } = require("../database/indexModels");
const { Op } = require("sequelize");

// Listar todos los cupones
const index = async (req, res) => {
    try {
        const allCoupons = await Coupons.findAll({
            include: [], // ← preparado para asociaciones futuras
        });

        if (allCoupons.length > 0) {
            return res.status(200).json({
                results: allCoupons,
                total: allCoupons.length,
                status: "success",
                source: "coupons",
                timestamp: new Date().toISOString(),
            });
        }

        return res.status(404).json({ error: "No se encontraron cupones para listar." });
    } catch (error) {
        console.error("Error al obtener los cupones:", error);
        return res.status(500).json({
            error: "Error interno del servidor",
            description: error.message,
        });
    }
};

// Buscar cupones por código
const search = async (req, res) => {
    try {
        const { query } = req.params;

        if (!query) {
            return res.status(400).json({ error: "Debes ingresar un término de búsqueda." });
        }

        const results = await Coupons.findAll({
            where: {
                code: { [Op.like]: `%${query}%` },
            },
            include: [], // ← preparado para asociaciones futuras
        });

        if (results.length === 0) {
            return res.status(404).json({ error: "No se encontraron resultados." });
        }

        return res.status(200).json({
            results,
            total: results.length,
            status: "success",
            source: "coupons_search",
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error("Error en la búsqueda de cupones:", error);
        return res.status(500).json({
            error: "Error interno del servidor",
            description: error.message,
        });
    }
};

// Mostrar un cupón por ID
const show = async (req, res) => {
    try {
        const coupon = await Coupons.findByPk(req.params.id, {
            include: [], // ← preparado para asociaciones futuras
        });

        if (!coupon) {
            return res.status(404).json({ error: "Cupón no encontrado." });
        }

        return res.status(200).json(coupon);
    } catch (error) {
        console.error("Error al obtener el cupón:", error);
        return res.status(500).json({
            error: "Error interno del servidor",
            description: error.message,
        });
    }
};

// Crear un nuevo cupón
const create = async (req, res) => {
    try {
        const { code, discount, expiration_date, max_uses, type } = req.body;

        if (!code || !discount || !expiration_date || !max_uses || !type) {
            return res.status(400).json({ error: "Todos los campos son obligatorios." });
        }

        const existing = await Coupons.findOne({ where: { code } });
        if (existing) {
            return res.status(409).json({ error: "El código de cupón ya existe." });
        }

        const newCoupon = await Coupons.create({ code, discount, expiration_date, max_uses, type });

        const fullCoupon = await Coupons.findByPk(newCoupon.id_coupon, {
            include: [], // ← preparado para asociaciones futuras
        });

        return res.status(201).json({
            result: fullCoupon,
            status: "success",
            message: "Cupón creado correctamente.",
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error("Error al crear el cupón:", error);
        return res.status(500).json({
            error: "Error interno del servidor",
            description: error.message,
        });
    }
};

// Actualizar un cupón
const update = async (req, res) => {
    try {
        const { code, discount, expiration_date, max_uses, type } = req.body;
        const coupon = await Coupons.findByPk(req.params.id);

        if (!coupon) {
            return res.status(404).json({ error: "Cupón no encontrado." });
        }

        // Verificar duplicado de código (excepto si es el mismo cupón)
        if (code && code !== coupon.code) {
            const exists = await Coupons.findOne({ where: { code } });
            if (exists) {
                return res.status(409).json({ error: "Ese código ya está en uso." });
            }
        }

        if (code) coupon.code = code;
        if (discount) coupon.discount = discount;
        if (expiration_date) coupon.expiration_date = expiration_date;
        if (max_uses) coupon.max_uses = max_uses;
        if (type) coupon.type = type;

        await coupon.save();

        const updatedCoupon = await Coupons.findByPk(req.params.id, {
            include: [], // ← preparado para asociaciones futuras
        });

        return res.status(200).json({
            result: updatedCoupon,
            status: "success",
            message: "Cupón actualizado correctamente.",
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error("Error al actualizar el cupón:", error);
        return res.status(500).json({
            error: "Error interno del servidor",
            description: error.message,
        });
    }
};

// Eliminar un cupón
const destroy = async (req, res) => {
    try {
        const coupon = await Coupons.findByPk(req.params.id, {
            include: [], // ← preparado para asociaciones futuras
        });

        if (!coupon) {
            return res.status(404).json({ error: "Cupón no encontrado." });
        }

        await coupon.destroy();

        return res.status(200).json({
            result: coupon,
            status: "success",
            message: "Cupón eliminado correctamente.",
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error("Error al eliminar el cupón:", error);
        return res.status(500).json({
            error: "Error interno del servidor",
            description: error.message,
        });
    }
};

module.exports = { index, search, show, create, update, destroy };
