const { Themes } = require("../database/indexModels");

const index = async (req, res) => {
    try {
        const themes = await Themes.findAll();

        return res.status(200).json({
            total: themes.length,
            timestamp: new Date(),
            data: themes,
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
        const theme = await Themes.findByPk(id);

        if (!theme) {
            return res.status(404).json({
                error: "Tema no encontrado",
                description: `No existe un tema con el id ${id}`,
            });
        }

        return res.status(200).json({
            timestamp: new Date(),
            data: theme,
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
        const newTheme = await Themes.create({ name });

        return res.status(201).json({
            message: "Tema creado correctamente",
            timestamp: new Date(),
            data: newTheme,
        });
    } catch (error) {
        return res.status(500).json({
            error: "Error al crear el tema",
            description: error.message,
        });
    }
};

const update = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const theme = await Themes.findByPk(id);

        if (!theme) {
            return res.status(404).json({
                error: "Tema no encontrado",
                description: `No existe un tema con el id ${id}`,
            });
        }

        if (name && typeof name !== "string") {
            return res.status(400).json({
                error: "El campo 'name' debe ser un string.",
            });
        }

        theme.name = name || theme.name;
        await theme.save();

        return res.status(200).json({
            message: "Tema actualizado correctamente",
            timestamp: new Date(),
            data: theme,
        });
    } catch (error) {
        return res.status(500).json({
            error: "Error al actualizar el tema",
            description: error.message,
        });
    }
};

const destroy = async (req, res) => {
    const { id } = req.params;

    try {
        const theme = await Themes.findByPk(id);

        if (!theme) {
            return res.status(404).json({
                error: "Tema no encontrado",
                description: `No existe un tema con el id ${id}`,
            });
        }

        await theme.destroy();

        return res.status(200).json({
            message: "Tema eliminado correctamente",
            timestamp: new Date(),
            data: theme,
        });
    } catch (error) {
        return res.status(500).json({
            error: "Error al eliminar el tema",
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



