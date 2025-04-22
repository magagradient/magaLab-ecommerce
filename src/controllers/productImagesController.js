const { ProductImages, Products } = require("../database/indexModels");

// Obtener todas las imágenes
const index = async (req, res) => {
    try {
        const images = await ProductImages.findAll({
            include: [{ model: Products, as: "product" }]
        });

        return res.status(200).json({
            total: images.length,
            timestamp: new Date(),
            data: images,
        });
    } catch (error) {
        return res.status(500).json({
            error: "Error al obtener las imágenes",
            description: error.message,
        });
    }
};

// Obtener una imagen por ID
const show = async (req, res) => {
    const { id } = req.params;

    try {
        const image = await ProductImages.findByPk(id, {
            include: [{ model: Products, as: "product" }]
        });

        if (!image) {
            return res.status(404).json({
                error: "Imagen no encontrada",
                description: `No existe una imagen con el id ${id}`,
            });
        }

        return res.status(200).json({
            timestamp: new Date(),
            data: image,
        });
    } catch (error) {
        return res.status(500).json({
            error: "Error al obtener la imagen",
            description: error.message,
        });
    }
};

// Crear una nueva imagen
const create = async (req, res) => {
    const { id_product, image_url } = req.body;

    if (!id_product || !image_url) {
        return res.status(400).json({
            error: "Faltan campos obligatorios",
            required: ["id_product", "image_url"]
        });
    }

    try {
        const newImage = await ProductImages.create({ id_product, image_url });

        const fullImage = await ProductImages.findByPk(newImage.id_image, {
            include: [{ model: Products, as: "product" }]
        });

        return res.status(201).json({
            message: "Imagen creada correctamente",
            timestamp: new Date(),
            data: fullImage,
        });
    } catch (error) {
        return res.status(500).json({
            error: "Error al crear la imagen",
            description: error.message,
        });
    }
};

// Actualizar una imagen
const update = async (req, res) => {
    const { id } = req.params;
    const { id_product, image_url } = req.body;

    try {
        const image = await ProductImages.findByPk(id);

        if (!image) {
            return res.status(404).json({
                error: "Imagen no encontrada",
                description: `No existe una imagen con el id ${id}`,
            });
        }

        if (id_product !== undefined) image.id_product = id_product;
        if (image_url !== undefined) image.image_url = image_url;

        await image.save();

        const updatedImage = await ProductImages.findByPk(id, {
            include: [{ model: Products, as: "product" }]
        });

        return res.status(200).json({
            message: "Imagen actualizada correctamente",
            timestamp: new Date(),
            data: updatedImage,
        });
    } catch (error) {
        return res.status(500).json({
            error: "Error al actualizar la imagen",
            description: error.message,
        });
    }
};

// Eliminar una imagen
const destroy = async (req, res) => {
    const { id } = req.params;

    try {
        const image = await ProductImages.findByPk(id, {
            include: [{ model: Products, as: "product" }]
        });

        if (!image) {
            return res.status(404).json({
                error: "Imagen no encontrada",
                description: `No existe una imagen con el id ${id}`,
            });
        }

        await image.destroy();

        return res.status(200).json({
            message: "Imagen eliminada correctamente",
            timestamp: new Date(),
            data: image,
        });
    } catch (error) {
        return res.status(500).json({
            error: "Error al eliminar la imagen",
            description: error.message,
        });
    }
};

module.exports = {
    index,
    show,
    create,
    update,
    destroy,
};
