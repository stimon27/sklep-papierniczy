import ButtonsContainer from './ButtonsContainer.js';
import Button from './Button.js';

import './OrderHistoryListItem.css'

const OrderHistoryListItem = (props) => {
    const order_contents = [];

    props.orderDetails.forEach((orderDetail) => {
        const product_name = props.productNames[orderDetail.id_produktu];
        const product_quantity = orderDetail.liczba_produktu;

        order_contents.push([product_name, product_quantity]);
    })

    return (
        <div className='orderHistoryListItem'>
            <div className='infoBox'>
                <h3 className='orderId'>Numer zamówienia: {props.order.id_zamowienia}</h3>
                <h4 className='orderProductsHeader'>Zakupione produkty:</h4>
                <ul>
                    {order_contents.map((order_content) => (
                        <li key={`${props.order.id_zamowienia}, ${order_content[0]}`}>{order_content[0]}, liczba sztuk: {order_content[1]}</li>
                     ))}
                </ul>
                <h5 className='orderTotal'>Łączna wartość zamówienia: {props.order.koszt_zamowienia} zł</h5>
            </div>
            <div className='infoBox'>
                <h5 className='orderDate'>Data zamówienia: {props.order.data_zamowienia.substring(0, 10)}</h5>
                <h5 className='orderPaymentMethod'>Sposób płatności: {props.order.sposob_platnosci}</h5>
                <h5 className='orderDeliveryOption'>Sposób dostawy: {props.order.sposob_dostawy}</h5>
                <h5 className='orderProofOfPurchase'>Rodzaj dowodu zakupu: {props.order.faktura ? 'Faktura' : 'Paragon'}</h5>
                <h5 className='orderStatus'>Status zamówienia: {props.order.status_zamowienia}</h5>
            </div>
            <ButtonsContainer>
                <Button text='Złóż reklamację' id='complaintButton'/>
            </ButtonsContainer>
        </div>
    )
}

export default OrderHistoryListItem;