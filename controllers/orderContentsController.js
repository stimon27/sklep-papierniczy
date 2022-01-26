import dbConnection from '../db.js';

export const createOrderContents = async (req, res) => {
    dbConnection('Zawartosc_zamowien')
        .insert({
            'id_zamowienia': Number(req.body.id_zamowienia),
            'id_produktu': Number(req.body.id_produktu),
            'liczba_produktu': Number(req.body.liczba_produktu)
        })
        .then(() => {
            res.json({ message: 'Order contents created successfully' });
        })
        .catch((err) => {
            res.json({ message: err.message });
        })
}

export const getAllOrderContentsForOrderId = async (req, res) => {
    dbConnection('Zawartosc_zamowien')
        .where({ 'id_zamowienia': Number(req.query.id_zamowienia) })
        .select('*')
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json({ message: err.message });
        })
}