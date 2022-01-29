import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import ButtonsContainer from './ButtonsContainer.js';
import Button from './Button.js';
import OrderHistoryList from './OrderHistoryList.js'
import OrderHistoryListItem from './OrderHistoryListItem.js';

import './BrowseOrderHistory.css';

const BrowseOrderHistory = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const [ordersAlreadyFetched, setOrdersAlreadyFetched] = useState(false);
    const [isEmpty, setIsEmpty] = useState(true);
    const [ordersDetails, setOrdersDetails] = useState([]);
    const [ordersDetailsAlreadyFetched, setOrdersDetailsAlreadyFetched] = useState(false);
    const [productNames, setProductNames] = useState({});

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
        const promises = []

        orders.forEach((order) => {
            promises.push(new Promise((resolve, reject) => {
                axios
                    .get('http://localhost:5000/orderContents/getAll', { params: {id_zamowienia: Number(order.id_zamowienia)} })
                    .then((response) => {
                        setOrdersDetails((prevOrdersDetails) => {
                            return [...prevOrdersDetails, ...response.data];
                        });
                        resolve(response);
                    })
                    .catch((err) => {
                        console.error(err);
                        reject(err);
                    })
            }))
        })

        Promise.all(promises)
            .then((response) => {
                setOrdersDetailsAlreadyFetched(true);
            })
            .catch((err) => {
                console.error(err);
            })
    }

    const fetchProductNames = async () => {
        let product_ids = [];

        for(let i = 0; i < ordersDetails.length; i++) {
            product_ids.push(ordersDetails[i].id_produktu);
        }

        product_ids = new Set(product_ids);
        
        const promises = []

        product_ids.forEach((product_id) => {
            promises.push(new Promise((resolve, reject) => {
                axios
                    .get('http://localhost:5000/products/get', { params: {id_produktu: Number(product_id)} })
                    .then((response) => {
                        setProductNames((prevProductNames) => {
                            return {...prevProductNames, [product_id.toString()]: response.data[0].nazwa}
                        })
                        resolve(response);
                    })
                    .catch((err) => {
                        console.error(err);
                        reject(err);
                    })
            }))
        })

        Promise.all(promises)
            .then((response) => {
                setIsLoading(false);
            })
            .catch((err) => {
                console.error(err);
            })
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
            fetchProductNames();
        }
    }, [ordersDetailsAlreadyFetched])

    if(isLoading) {
        return (
            <div id='loadingContainer'>
                <h3>Ładowanie historii zamówień...</h3>
            </div>
        )
    } else if(isEmpty) {
        return (
            <div id='emptyContainer'>
                <h3>Nie znaleziono żadnych zamówień z ostatnich 30 dni...</h3>
                <Link to='/'><Button text='Powrót' buttonId='exitButton'/></Link>
            </div>
        )
    } else {
        return (
            <div id='browseOrderHistoryContainer'>
                <div id='browseOrderHistoryHeader'>
                    <h2>Twoja historia zamówień z ostatnich 30 dni</h2>
                </div>
                <OrderHistoryList>
                    {orders.map((order) => (
                        <OrderHistoryListItem
                            key={order.id_zamowienia}
                            order={order}
                            orderDetails={ordersDetails.filter((orderDetails) => orderDetails.id_zamowienia === order.id_zamowienia)}
                            productNames={productNames}
                        />
                    ))}
                </OrderHistoryList>
                <ButtonsContainer>
                    <Link to='/'><Button text='Powrót' buttonId='exitButton'/></Link>
                </ButtonsContainer>
            </div>
        )
    }
}

export default BrowseOrderHistory;