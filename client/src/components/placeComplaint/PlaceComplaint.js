import { useState } from 'react';
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios';

import ButtonsContainer from './ButtonsContainer.js';
import Button from './Button.js';

import './PlaceComplaint.css';

const PlaceComplaint = (props) => {
    const [reason, setReason] = useState('');
    const [complaintComplete, setComplaintComplete] = useState(false);

    const handlePlaceComplaint = async () => {
        const complaint_id = Math.floor(Math.random() * 1000);
        const customer_id = props.customerId;
        const employee_id = Math.floor(Math.random() * 10);
        const order_id = props.match.params.orderId

        axios.
            post('http://localhost:5000/complaints/create', {
                id_reklamacji: complaint_id,
                id_klienta: customer_id,
                id_pracownika: employee_id,
                id_zamowienia: order_id,
                tresc: reason,
                data_reklamacji: new Date().toISOString(),
                data_rozpatrzenia: null,
                status_reklamacji: "Złożona"
            })
            .then((response) => {
                setComplaintComplete(true);
            })
            .catch((err) => {
                console.error(err);
            })
    }

    if (complaintComplete) {
        return (
            <div id='complaintCompleteContainer'>
                <h3>Reklamacja została złożona</h3>
                <Link to='/'><Button text='Powrót do menu' buttonId='exitButton'/></Link>
            </div>
        )
    } else {
        return (
            <div id='placeComplaintContainer'>
                <div id='placeComplaintHeader'>
                    <h2>Reklamowanie zamówienia nr {props.match.params.orderId}</h2>
                </div>
                <div id='placeComplaintBox'>
                    <label htmlFor='reasonInput'>Wprowadź treść reklamacji:</label>
                    <textarea 
                        id='reasonInput' 
                        value={reason} 
                        onChange={(event) => {setReason(event.target.value)}}
                        rows="8"
                        cols="64"
                        ></textarea>
                </div>
                <ButtonsContainer>
                    <Button text='Złóż reklamację' buttonId='complaintButton' onClick={handlePlaceComplaint}/>
                    <Link to='/'><Button text='Powrót' buttonId='exitButton'/></Link>
                </ButtonsContainer>
            </div>
        );
    }
}

export default withRouter(PlaceComplaint);