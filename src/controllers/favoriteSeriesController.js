const { FavoriteSeries } = require("../database/indexModels");

const index = async (req, res) => {
    try {
        const all = await FavoriteSeries.findAll({
            include: ["userFavoriteSeries", "seriesFavoriteSeries"]
        });
        res.status(200).json({ ok: true, data: all });
    } catch (error) {
        res.status(500).json({ ok: false, error: error.message });
    }
};

const show = async (req, res) => {
    try {
        const id = req.params.id;
        const item = await FavoriteSeries.findByPk(id, {
            include: ["userFavoriteSeries", "seriesFavoriteSeries"]
        });
        if (!item) {
            return res.status(404).json({ ok: false, message: "No se encontró el favorito" });
        }
        res.status(200).json({ ok: true, data: item });
    } catch (error) {
        res.status(500).json({ ok: false, error: error.message });
    }
};

const create = async (req, res) => {
    try {
        const { id_user, id_series } = req.body;
        if (!id_user || !id_series) {
            return res.status(400).json({ ok: false, message: "Faltan campos obligatorios" });
        }

        const nuevo = await FavoriteSeries.create({ id_user, id_series });
        const creado = await FavoriteSeries.findByPk(nuevo.id_favorite_series, {
            include: ["userFavoriteSeries", "seriesFavoriteSeries"]
        });

        res.status(201).json({ ok: true, data: creado });
    } catch (error) {
        res.status(500).json({ ok: false, error: error.message });
    }
};

const destroy = async (req, res) => {
    try {
        const id = req.params.id;
        const favorito = await FavoriteSeries.findByPk(id, {
            include: ["userFavoriteSeries", "seriesFavoriteSeries"]
        });

        if (!favorito) {
            return res.status(404).json({ ok: false, message: "No se encontró el favorito" });
        }

        await favorito.destroy();
        res.status(200).json({ ok: true, data: favorito });
    } catch (error) {
        res.status(500).json({ ok: false, error: error.message });
    }
};

module.exports = { index, show, create, destroy };
