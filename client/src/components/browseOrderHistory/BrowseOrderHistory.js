import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import ButtonsContainer from './ButtonsContainer.js';
import Button from './Button.js';
import './BrowseOrderHistory.css';

const BrowseOrderHistory = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const [ordersAlreadyFetched, setOrdersAlreadyFetched] = useState(false);
    const [isEmpty, setIsEmpty] = useState(true);
    const [ordersDetails, setOrdersDetails] = useState([]);
    const [ordersDetailsAlreadyFetched, setOrdersDetailsAlreadyFetched] = useState(false);
    const [productNames, setProductNames] = useState([]);

    const fetchOrders = async () => {
        axios
            .get('http://localhost:5000/orders/getAll', { params: { id_klienta: Number(props.customerId) } })
            .then((response) => {
                setOrders(response.data);
                setOrdersAlreadyFetched(true);
            })
            .catch((err) => {
                console.error(err);
            })
    }

    const fetchOrdersDetails = async () => {
        orders.forEach((order) => {
            axios
                .get('http://localhost:5000/orderContents/getAll', { params: {id_zamowienia: Number(order.id_zamowienia)} })
                .then((response) => {
                    setOrdersDetails((prevOrdersDetails) => {
                        return [...prevOrdersDetails, ...response.data];
                    })
                })
                .catch((err) => {
                    console.error(err);
                })
        })
        setOrdersDetailsAlreadyFetched(true);
    }

    const fetchProductInfo = async () => {
        ordersDetails.forEach((orderDetails) => {
            console.log('here');
            axios
                .get('http://localhost:5000/products/get', { params: {id_produktu: Number(orderDetails.id_produktu)} })
                .then((response) => {
                    setProductNames((prevProductNames) => {
                        return [...prevProductNames, response.data[0].nazwa];
                    })
                })
                .catch((err) => {
                    console.err(err);
                })
        })
        setIsLoading(false);
    }
    
    useEffect(() => {
        fetchOrders();
    }, [])

    useEffect(() => {
        if(orders.length > 0) {
            setIsEmpty(false);
        }
    }, [orders])
    
    useEffect(() => {
        if(ordersAlreadyFetched) {
            if(orders.length > 0) {
                fetchOrdersDetails();
            } else {
                setIsLoading(false);
            }
        }
    }, [ordersAlreadyFetched])

    useEffect(() => {
        if(ordersDetailsAlreadyFetched) {
            fetchProductInfo();
        }
    }, [ordersDetailsAlreadyFetched])

    console.log('---')
    console.log('isLoading: ' + isLoading);
    console.log('orders: ' + orders);
    console.log('ordersAlreadyFetched: ' + ordersAlreadyFetched);
    console.log('isEmpty: ' + isEmpty);
    console.log('ordersDetails: ' + ordersDetails);
    console.log('ordersDetailsAlreadyFetched: ' + ordersDetailsAlreadyFetched);
    console.log('productNames: ' + productNames);
    console.log('---')

    return (
        <div id='browseOrderHistoryContainer'>
            {/* <OrderHistoryList />
            <ButtonsContainer>
                <Link to='/'><Button text='Powrót' buttonId='exitButton'/></Link>
            </ButtonsContainer> */}
        </div>
    )
}

export default BrowseOrderHistory;