import dbConnection from '../db.js';

export const createFavorite = async (req, res) => {
    dbConnection('Pozycje_w_ulubionych')
        .insert({
            'id_klienta': Number(req.body.id_klienta),
            'id_produktu': Number(req.body.id_produktu)
        })
        .then(() => {
            res.json({ message: 'Favorite created successfully' });
        })
        .catch((err) => {
            res.json({ message: err.message });
        })
}

export const getAllFavoritesForCustomerId = async (req, res) => {
    dbConnection
        .select('*')
        .from('Pozycje_w_ulubionych')
        .where({ 'id_klienta': Number(req.body.id_klienta) })
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json({ message: err.message });
        })
}

export const getFavoriteForParams = async (req, res) => {
    dbConnection('Pozycje_w_ulubionych')
        .where({
            id_klienta: Number(req.query.id_klienta),
            id_produktu: Number(req.query.id_produktu)
        })
        .select('*')
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json({ message: err.message });
        })
}

export const removeFavorite = async (req, res) => {
    dbConnection('Pozycje_w_ulubionych')
        .where({ 'id_klienta': req.body.id_klienta })
        .andWhere({ 'id_produktu': req.body.id_produktu })
        .del()
        .then(() => {
            res.json({ message: 'Favorite removed successfully' });
        })
        .catch((err) => {
            res.json({ message: err.message });
        })
}