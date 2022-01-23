import dbConnection from '../db.js';

export const createOrderAddress = async (req, res) => {
    dbConnection('Adresy_zamowien')
        .insert({
            'id_zamowienia': Number(req.body.id_zamowienia),
            'ulica': req.body.ulica,
            'numer': req.body.numer,
            'miasto': req.body.miasto,
            'zip': req.body.zip
        })
        .then(() => {
            res.json({ message: 'Order address created successfully' });
        })
        .catch((err) => {
            res.json({ message: err.message });
        })
}

export const getOrderAddressForOrderId = async (req, res) => {
    dbConnection
        .select('*')
        .from('Adresy_zamowien')
        .where({ 'id_zamowienia': Number(req.body.id_zamowienia) })
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json({ message: err.message });
        })
}