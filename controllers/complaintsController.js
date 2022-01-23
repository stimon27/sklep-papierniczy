export const createComplaint = async (req, res) => {
    dbConnection('Reklamacje')
        .insert({
            'id_reklamacji': Number(req.body.id_reklamacji),
            'id_klienta': Number(req.body.id_klienta),
            'id_pracownika': Number(req.body.id_pracownika),
            'id_zamowienia': Number(req.body.id_zamowienia),
            'tresc': req.body.tresc,
            'data_reklamacji': req.body.data_reklamacji,
            'data_rozpatrzenia': req.body.data_rozpatrzenia,
            'status_reklamacji': req.body.status_reklamacji
        })
        .then(() => {
            res.json({ message: 'Complaint created successfully' });
        })
        .catch((err) => {
            res.json({ message: err.message });
        })
}