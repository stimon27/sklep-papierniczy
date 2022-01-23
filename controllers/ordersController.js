import dbConnection from '../db.js';

export const createOrder = async (req, res) => {
    dbConnection('Zamowienia')
        .insert({
            'id_zamowienia': Number(req.body.id_zamowienia),
            'id_klienta': Number(req.body.id_klienta),
            'status_zamowienia': req.body.status_zamowienia,
            'data_zamowienia': req.body.data_zamowienia,
            'data_dostawy': req.body.data_dostawy,
            'sposob_dostawy': req.body.sposob_dostawy,
            'koszt_zamowienia': Number(req.body.koszt_zamowienia),
            'sposob_platnosci': req.body.sposob_platnosci,
            'faktura': !!req.body.faktura
        })
        .then(() => {
            res.json({ message: 'Order created successfully' });
        })
        .catch((err) => {
            res.json({ message: err.message });
        })
}

export const getAllOrdersForCustomerId = async (req, res) => {
    dbConnection
        .select('*')
        .from('Zamowienia')
        .where({ 'id_klienta': Number(req.body.id_klienta) })
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json({ message: err.message });
        })
}

export const getOrderById = async (req, res) => {
    dbConnection
        .select('*')
        .from('Zamowienia')
        .where({ 'id_zamowienia': Number(req.body.id_zamowienia)})
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json({ message: err.message });
        })
}