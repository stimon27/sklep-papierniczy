import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './PlaceOrder.css';
import OrderContentsList from './OrderContentsList.js';
import OrderTotal from './OrderTotal.js';
import PaymentMethods from './PaymentMethods.js';
import DeliveryOptions from './DeliveryOptions.js';
import ProofOfPurchase from './ProofOfPurchase.js';
import ButtonsContainer from './ButtonsContainer.js';
import Button from './Button.js'

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
        RECEIPT: [false, "Paragon"],
        INVOICE: [true, "Faktura"]
    }

    const [ basketRecords, setBasketRecords ] = useState([]);
    const [ currentRecordsDetails, setCurrentRecordsDetails ] = useState([]);
    const [ total, setTotal ] = useState(0);
    const [ chosenPaymentMethod, setChosenPaymentMethod ] = useState(PAYMENT_METHODS.WITH_CARD);
    const [ chosenDeliveryOption, setChosenDeliveryOption ] = useState(PAYMENT_METHODS.TRANSFER);
    const [ chosenProofOfPurchase, setChosenProofOfPurchase ] = useState(PROOFS_OF_PURCHASE.RECEIPT[1]);

    const handlePlaceOrder = (event) => {

    }

    return (
        <div id='placeOrderContainer'>
            <OrderContentsList basketRecords={basketRecords} currentRecordsDetails={currentRecordsDetails}/>
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
            />
            <ProofOfPurchase 
                proofsOfPurchase={PROOFS_OF_PURCHASE} 
                chosenProofOfPurchase={chosenProofOfPurchase}
                setChosenProofOfPurchase={setChosenProofOfPurchase}
            />
            <ButtonsContainer>
                <Button text='Złóż zamówienie' onClick={handlePlaceOrder}/>
                <Link to='/'><Button text='Powrót' onClick={null}/></Link>
            </ButtonsContainer>
        </div>
    )
}

export default PlaceOrder;