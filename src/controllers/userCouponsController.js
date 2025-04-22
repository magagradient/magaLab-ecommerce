const { UserCoupons, Users, Coupons } = require("../database/indexModels");


const index = async (req, res) => {
    try {
        const data = await UserCoupons.findAll({
            include: [
                { model: Users, as: "user" },
                { model: Coupons, as: "coupon" }
            ]
        });

        return res.status(200).json({
            total: data.length,
            timestamp: new Date(),
            data
        });
    } catch (error) {
        return res.status(500).json({
            error: "Error al obtener los cupones de usuarios",
            description: error.message
        });
    }
};


const show = async (req, res) => {
    const { id_user_coupon } = req.params;

    try {
        const data = await UserCoupons.findByPk(id_user_coupon, {
            include: [
                { model: Users, as: "user" },
                { model: Coupons, as: "coupon" }
            ]
        });

        if (!data) {
            return res.status(404).json({
                error: "Cupón de usuario no encontrado"
            });
        }

        return res.status(200).json({
            timestamp: new Date(),
            data
        });
    } catch (error) {
        return res.status(500).json({
            error: "Error al buscar cupón",
            description: error.message
        });
    }
};


const create = async (req, res) => {
    const { id_user, id_coupon, used, granted_date } = req.body;

    if (!id_user || !id_coupon) {
        return res.status(400).json({
            error: "Faltan campos obligatorios: id_user e id_coupon"
        });
    }

    try {
        const newCoupon = await UserCoupons.create({
            id_user,
            id_coupon,
            used: used || 0,
            granted_date: granted_date || new Date()
        });

        return res.status(201).json({
            message: "Cupón otorgado correctamente",
            timestamp: new Date(),
            data: newCoupon
        });
    } catch (error) {
        return res.status(500).json({
            error: "Error al otorgar cupón",
            description: error.message
        });
    }
};


const update = async (req, res) => {
    const { id_user_coupon } = req.params;
    const { used, granted_date } = req.body;

    try {
        const coupon = await UserCoupons.findByPk(id_user_coupon);

        if (!coupon) {
            return res.status(404).json({
                error: "Cupón no encontrado"
            });
        }

        coupon.used = used !== undefined ? used : coupon.used;
        coupon.granted_date = granted_date || coupon.granted_date;

        await coupon.save();

        return res.status(200).json({
            message: "Cupón actualizado correctamente",
            timestamp: new Date(),
            data: coupon
        });
    } catch (error) {
        return res.status(500).json({
            error: "Error al actualizar cupón",
            description: error.message
        });
    }
};


const destroy = async (req, res) => {
    const { id_user_coupon } = req.params;

    try {
        const coupon = await UserCoupons.findByPk(id_user_coupon, {
            include: [
                { model: Users, as: "user" },
                { model: Coupons, as: "coupon" }
            ]
        });

        if (!coupon) {
            return res.status(404).json({
                error: "Cupón no encontrado"
            });
        }

        await coupon.destroy();

        return res.status(200).json({
            message: "Cupón eliminado correctamente",
            timestamp: new Date(),
            data: coupon
        });
    } catch (error) {
        return res.status(500).json({
            error: "Error al eliminar cupón",
            description: error.message
        });
    }
};

module.exports = {
    index,
    show,
    create,
    update,
    destroy
};
