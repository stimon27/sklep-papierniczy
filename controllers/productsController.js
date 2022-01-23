import dbConnection from '../db';

export const createProduct = async (req, res) => {
    dbConnection('Produkty')
        .insert({
            'id_produktu': Number(req.body.id_produktu),
            'nazwa': req.body.nazwa,
            'opis': req.body.opis,
            'stan_magazynowy': Number(req.body.stan_magazynowy),
            'limit_magazynowy': Number(req.body.limit_magazynowy),
            'cena_netto': Number(req.body.cena_netto),
            'cena_brutto': Number(req.body.cena_brutto)
        })
        .then(() => {
            res.json({ message: 'Product created successfully'});
        })
        .catch((err) => {
            res.json({ message: err.message });
        })
}

export const getAllProducts = async (req, res) => {
    dbConnection
        .select('*')
        .from('Produkty')
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json({ message: err.message });
        })
}