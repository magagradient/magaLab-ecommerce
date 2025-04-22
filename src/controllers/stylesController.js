const { Styles } = require("../database/indexModels");


const index = async (req, res) => {
    try {
        const styles = await Styles.findAll();

        return res.status(200).json({
            total: styles.length,
            timestamp: new Date(),
            data: styles,
        });
    } catch (error) {
        return res.status(500).json({
            error: "Error interno del servidor",
            description: error.message,
        });
    }
};

const show = async (req, res) => {
    const { id } = req.params;

    try {
        const style = await Styles.findByPk(id);

        if (!style) {
            return res.status(404).json({
                error: "Estilo no encontrado",
                description: `No existe un estilo con el id ${id}`,
            });
        }

        return res.status(200).json({
            timestamp: new Date(),
            data: style,
        });
    } catch (error) {
        return res.status(500).json({
            error: "Error interno del servidor",
            description: error.message,
        });
    }
};

const create = async (req, res) => {
    const { name } = req.body;

    if (!name || typeof name !== "string") {
        return res.status(400).json({
            error: "El campo 'name' es obligatorio y debe ser un string.",
        });
    }

    try {
        const newStyle = await Styles.create({ name });

        return res.status(201).json({
            message: "Estilo creado correctamente",
            timestamp: new Date(),
            data: newStyle,
        });
    } catch (error) {
        return res.status(500).json({
            error: "Error al crear el estilo",
            description: error.message,
        });
    }
};

const update = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const style = await Styles.findByPk(id);

        if (!style) {
            return res.status(404).json({
                error: "Estilo no encontrado",
                description: `No existe un estilo con el id ${id}`,
            });
        }

        if (name && typeof name !== "string") {
            return res.status(400).json({
                error: "El campo 'name' debe ser un string.",
            });
        }

        style.name = name || style.name;
        await style.save();

        return res.status(200).json({
            message: "Estilo actualizado correctamente",
            timestamp: new Date(),
            data: style,
        });
    } catch (error) {
        return res.status(500).json({
            error: "Error al actualizar el estilo",
            description: error.message,
        });
    }
};

const destroy = async (req, res) => {
    const { id } = req.params;

    try {
        const style = await Styles.findByPk(id);

        if (!style) {
            return res.status(404).json({
                error: "Estilo no encontrado",
                description: `No existe un estilo con el id ${id}`,
            });
        }

        await style.destroy();

        return res.status(200).json({
            message: "Estilo eliminado correctamente",
            timestamp: new Date(),
            data: style,
        });
    } catch (error) {
        return res.status(500).json({
            error: "Error al eliminar el estilo",
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
