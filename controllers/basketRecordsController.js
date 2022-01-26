import dbConnection from '../db.js';

export const createBasketRecord = async (req, res) => {
    dbConnection('Pozycje_w_koszykach')
        .insert({
            'id_klienta': Number(req.body.id_klienta),
            'id_produktu': Number(req.body.id_produktu),
            'liczba_produktu': Number(req.body.liczba_produktu)
        })
        .then(() => {
            res.json({ message: 'Basket record created successfully' });
        })
        .catch((err) => {
            res.json({ message: err.message });
        })
}

export const getBasketRecordForParams = async (req, res) => {
    dbConnection('Pozycje_w_koszykach')
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

export const getAllBasketRecordsForCustomerId = async (req, res) => {
    dbConnection
        .select('*')
        .from('Pozycje_w_koszykach')
        .where({ 'id_klienta': Number(req.query.id_klienta) })
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json({ message: err.message });
        })
}

export const updateBasketRecord = async (req, res) => {
    dbConnection('Pozycje_w_koszykach')
        .where({ 'id_klienta': Number(req.body.id_klienta), 'id_produktu': Number(req.body.id_produktu) })
        .update({
            'liczba_produktu': Number(req.body.liczba_produktu)
        })
        .then(() => {
            res.json({ message: 'Basket record updated successfully' });
        })
        .catch((err) => {
            res.json({ message: err.message});
        })
}

export const removeBasketRecord = async (req, res) => {
    console.log(req);
    dbConnection('Pozycje_w_koszykach')
        .where({ 'id_klienta': Number(req.body.id_klienta), 'id_produktu': Number(req.body.id_produktu) })
        .del()
        .then(() => {
            res.json({ message: 'Basket record removed successfully' });
        })
        .catch((err) => {
            res.json({ message: err.message });
        })
}