import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './PlaceOrder.css';
import OrderContentsList from './OrderContentsList.js';
import OrderTotal from './OrderTotal.js';
import PaymentMethods from './PaymentMethods.js';
import DeliveryOptions from './DeliveryOptions.js';
import ProofOfPurchase from './ProofOfPurchase.js';
import ButtonsContainer from './ButtonsContainer.js';
import Button from './Button.js'
import InputComponent from './InputComponent.js';
import OrderContentsListItem from './OrderContentsListItem.js'
import SelectComponent from './SelectComponent.js';

const PlaceOrder = (props) => {
    const PAYMENT_METHODS = {
        WITH_CARD: "Kartą",
        TRANSFER: "Przelew",
        CASH_ON_ARRIVAL: "Za pobraniem"
    }
    
    const DELIVERY_OPTIONS = {
        BY_POST: "Poczta",
        BY_COURIER: "Kurier",
        PARCEL_LOCKER: "Paczkomat",
        SELF_PICKUP: "Odbiór osobisty"
    }
    
    const PROOFS_OF_PURCHASE = {
        RECEIPT: "Paragon",
        INVOICE: "Faktura"
    }

    const [ isLoading, setIsLoading ] = useState(true);
    const [ basketRecords, setBasketRecords ] = useState([]);
    const [ basketRecordsAlreadyFetched, setBasketRecordsAlreadyFetched ] = useState(false);
    const [ currentRecordsDetails, setCurrentRecordsDetails ] = useState([]);
    const [ total, setTotal ] = useState(0);
    const [ chosenPaymentMethod, setChosenPaymentMethod ] = useState(PAYMENT_METHODS.WITH_CARD);
    const [ chosenDeliveryOption, setChosenDeliveryOption ] = useState(PAYMENT_METHODS.TRANSFER);
    const [ deliveryAddress, setDeliveryAddress ] = useState({
        ulica: '',
        numer: '',
        miasto: '',
        zip: ''
    })
    const [ chosenProofOfPurchase, setChosenProofOfPurchase ] = useState(PROOFS_OF_PURCHASE.RECEIPT);
    const [ nipNumber, setNipNumber ] = useState('');

    const fetchBasketRecords = async () => {
        axios
            .get('http://localhost:5000/basketRecords/getAll', { params: { id_klienta: Number(props.customerId) } })
            .then((response) => {
                setBasketRecords(response.data.sort((a, b) => a.id_produktu - b.id_produktu)) 
                setBasketRecordsAlreadyFetched(true);              
            })
            .catch((error) => {
                console.error(error);
            })
    }

    const fetchCurrentRecordsDetails = async () => {
        const current_product_ids = [];
        basketRecords.forEach((basketRecord) => { current_product_ids.push(basketRecord.id_produktu); })

        current_product_ids.forEach((product_id) => {
            axios
                .get('http://localhost:5000/products/get', { params: { id_produktu: Number(product_id) } })
                .then((response) => {
                    setCurrentRecordsDetails((prev_current_records) => {
                        return [...prev_current_records, response.data[0]];
                    });
                })
                .catch((error) => {
                    console.error(error);
                })
        })

        setCurrentRecordsDetails((prev_current_records) => {
            return prev_current_records.sort((a, b) => a.id_produktu - b.id_produktu);
        })
    }

    const calculateTotal = () => {
        let total = 0;
        for(let i = 0; i < basketRecords.length; i++) {
            total += Number(basketRecords[i].liczba_produktu) * Number(currentRecordsDetails[i].cena_brutto);
        }
        total = Math.round(total * 100) / 100;
        setTotal(total);
    }

    useEffect(() => {
        fetchBasketRecords()
    }, []);

    useEffect(() => {
        if(basketRecordsAlreadyFetched) 
        {   
            fetchCurrentRecordsDetails();     
        }
    }, [basketRecordsAlreadyFetched]);

    useEffect(() => {
        if(basketRecords.length === currentRecordsDetails.length && basketRecords.length !== 0) {
            setIsLoading(false);
            calculateTotal();
        }
    }, [currentRecordsDetails])

    const handlePlaceOrder = (event) => {

    }

    if(isLoading) {
        return (
            <div id='loadingContainer'>
                <h3>Ładowanie zamówienia...</h3>
            </div>
        )
    } else {
        return (
            <div id='placeOrderContainer'>
                <OrderContentsList>
                    {basketRecords.map((basketRecord, index) => (
                        <OrderContentsListItem 
                        key={basketRecord.id_produktu}
                        number={index}
                        basketRecord={basketRecord}
                        recordDetails={currentRecordsDetails[index]}
                        />
                    ))}
                </OrderContentsList>
                <OrderTotal total={total}/>
                <PaymentMethods 
                    paymentMethods={PAYMENT_METHODS} 
                    chosenPaymentMethod={chosenPaymentMethod}
                    setChosenPaymentMethod={setChosenPaymentMethod}
                />
                <DeliveryOptions 
                    deliveryOptions={DELIVERY_OPTIONS} 
                    chosenDeliveryOption={chosenDeliveryOption}
                    setChosenDeliveryOption={setChosenDeliveryOption}
                    deliveryAddress={deliveryAddress}
                    setDeliveryAddress={setDeliveryAddress}
                />
                <ProofOfPurchase 
                    proofsOfPurchase={PROOFS_OF_PURCHASE} 
                    chosenProofOfPurchase={chosenProofOfPurchase}
                    setChosenProofOfPurchase={setChosenProofOfPurchase}
                    nipNumber={nipNumber}
                    setNipNumber={setNipNumber}
                />
                <ButtonsContainer>
                    <Button text='Złóż zamówienie' onClick={handlePlaceOrder} buttonId='placeOrderButton'/>
                    <Link to='/browseBasket'><Button text='Powrót' buttonId='exitButton'/></Link>
                </ButtonsContainer>
            </div>
        )
    }
}

export default PlaceOrder;