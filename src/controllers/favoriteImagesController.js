const { FavoriteImages, Users, ProductImages } = require("../database/indexModels");

const index = async (req, res) => {
    try {
        const favorites = await FavoriteImages.findAll({
            include: [
                { model: Users, as: "user" },
                { model: ProductImages, as: "image" }
            ],
            order: [["created_at", "DESC"]]
        });

        return res.status(200).json({
            success: true,
            timestamp: new Date(),
            data: favorites
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching favorites",
            error: error.message
        });
    }
};

const show = async (req, res) => {
    try {
        const favorite = await FavoriteImages.findByPk(req.params.id, {
            include: [
                { model: Users, as: "user" },
                { model: ProductImages, as: "image" }
            ]
        });

        if (!favorite) {
            return res.status(404).json({
                success: false,
                message: "Favorite not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: favorite
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error retrieving favorite",
            error: error.message
        });
    }
};

const create = async (req, res) => {
    const { id_user, id_image } = req.body;

    if (!id_user || !id_image) {
        return res.status(400).json({
            success: false,
            message: "id_user and id_image are required"
        });
    }

    try {
        const newFavorite = await FavoriteImages.create({ id_user, id_image });

        const fullFavorite = await FavoriteImages.findByPk(newFavorite.id_favorite_image, {
            include: [
                { model: Users, as: "user" },
                { model: ProductImages, as: "image" }
            ]
        });

        return res.status(201).json({
            success: true,
            message: "Favorite created successfully",
            data: fullFavorite
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error creating favorite",
            error: error.message
        });
    }
};

const destroy = async (req, res) => {
    try {
        const favorite = await FavoriteImages.findByPk(req.params.id, {
            include: [
                { model: Users, as: "user" },
                { model: ProductImages, as: "image" }
            ]
        });

        if (!favorite) {
            return res.status(404).json({
                success: false,
                message: "Favorite not found"
            });
        }

        await favorite.destroy();

        return res.status(200).json({
            success: true,
            message: "Favorite deleted successfully",
            data: favorite
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error deleting favorite",
            error: error.message
        });
    }
};

module.exports = {
    index,
    show,
    create,
    destroy
};
