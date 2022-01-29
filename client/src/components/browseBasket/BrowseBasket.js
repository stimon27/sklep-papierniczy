import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './BrowseBasket.css'

const BrowseBasket = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isEmpty, setIsEmpty] = useState(true);
    const [basketRecords, setBasketRecords] = useState([]);
    const [basketRecordsAlreadyFetched, setBasketRecordsAlreadyFetched] = useState(false);
    const [currentRecordsDetails, setCurrentRecordsDetails] = useState([]);
    const [currentRecordProductId, setCurrentRecordProductId] = useState(-1);
    const [isModalActive, setIsModalActive] = useState(false);
    const [value, setValue] = useState(1);
    const [status, setStatus] = useState('Witamy w koszyku!');
    const [total, setTotal] = useState(0);

    const fetchBasketRecords = async () => {
        axios
            .get('http://localhost:5000/basketRecords/getAll', { params: { id_klienta: Number(props.customerId) } })
            .then((response) => {
                setBasketRecords(response.data.sort((a, b) => a.id_produktu - b.id_produktu)) 
                setBasketRecordsAlreadyFetched(true);              
            })
            .catch((error) => {
                console.error(error);
                setStatus('Błąd...');
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
                    setStatus('Błąd...');
                })
        })

        setCurrentRecordsDetails((prev_current_records) => {
            return prev_current_records.sort((a, b) => a.id_produktu - b.id_produktu);
        })
    }

    useEffect(() => {
        fetchBasketRecords();
    }, []);

    useEffect(() => {
        if(basketRecordsAlreadyFetched) 
        {   
            if(basketRecords.length > 0) {
                fetchCurrentRecordsDetails();
            } else {
                setIsLoading(false);
            }        
        }
    }, [basketRecordsAlreadyFetched]);

    useEffect(() => {
        if(basketRecords.length > 0) {
            setIsEmpty(false);
        }
    }, [basketRecords])

    useEffect(() => {
        if(currentRecordsDetails.length === basketRecords.length && basketRecords.length !== 0) {
            setIsLoading(false);
            calculateTotal();
        }
    }, [currentRecordsDetails])

    useEffect(() => {
        if(currentRecordProductId === -1 && !isLoading && !isEmpty && basketRecords.length === currentRecordsDetails.length) {
            document.getElementById('changeBasketQuantityButton').disabled = true;
            document.getElementById('removeFromBasketButton').disabled = true;
        }
    });

    useEffect(() => {

        if(!isLoading && !isEmpty) {
            basketRecords
            .forEach((basketRecord) => {
                if(Number(basketRecord.id_produktu) === currentRecordProductId) {
                    Array.from(document.getElementById(basketRecord.id_produktu).children).forEach((child) => {child.classList.add('recordActive')});
                } else {
                    Array.from(document.getElementById(basketRecord.id_produktu).children).forEach((child) => {child.classList.remove('recordActive')});
                }
            })

            document.getElementById('changeBasketQuantityButton').disabled = currentRecordProductId === -1;
            document.getElementById('removeFromBasketButton').disabled = currentRecordProductId === -1;
            setIsModalActive(false);
        }
    }, [currentRecordProductId])

    useEffect(() => {
        if(isEmpty) {
            setIsLoading(false);
        }
    }, [isEmpty])

    useEffect(() => {
        if(!isLoading) {
            if(isModalActive) {
                document.querySelector('.modalArea').classList.add('modalActive');
            }
            else {
                document.querySelector('.modalArea').classList.remove('modalActive');
            }
        }
    }, [isModalActive])

    const handleProductChoice = (event) => {
        if(currentRecordProductId !== Number(event.target.parentNode.getAttribute('id'))) {
            setCurrentRecordProductId(Number(event.target.parentNode.getAttribute('id')));
        }
        else {
            setCurrentRecordProductId(-1);
        }
    }

    const handleChangeBasketQuantity = (event) => {
        const quantity = value;
        let quantityLimit;
        for(let i = 0; i < basketRecords.length; i++) {
            if(Number(basketRecords[i].id_produktu) === currentRecordProductId) {
                quantityLimit = currentRecordsDetails[i].stan_magazynowy;
            }
        }
        if(quantity < 1 || quantity % 1 != 0) {
            setStatus('Podano błędną ilość produktu');
        } else if(quantity > quantityLimit) {
            setStatus('Niewystarczająca ilość produktu w magazynie');
        } else {
            axios
                .put('http://localhost:5000/basketRecords/update', { id_klienta: Number(props.customerId), id_produktu: currentRecordProductId, liczba_produktu: value })
                .then(async (response) => {
                    document.querySelector('.modalArea').classList.remove('modalActive');
                    await sleep(1000);
                    setIsModalActive(false);
                    setStatus('Pomyślnie zaktualizowano pozycję w koszyku');
                    setIsLoading(true);
                    setIsEmpty(true);
                    setBasketRecords([]);
                    setBasketRecordsAlreadyFetched(false);
                    setCurrentRecordsDetails([]);
                    setCurrentRecordProductId(-1);
                    setTotal(0);
                    fetchBasketRecords();
                })
                .catch((error) => {
                    console.error(error);
                    setStatus('Błąd...');
                })
        }
    }

    const handleRemoveFromBasket = (event) => {
        axios
            .delete('http://localhost:5000/basketRecords/delete', { data: { id_klienta: Number(props.customerId), id_produktu: currentRecordProductId } })
            .then((response) => {
                setStatus('Pomyślnie usunięto pozycję z koszyka');
                setIsLoading(true);
                setIsEmpty(true);
                setBasketRecords([]);
                setCurrentRecordProductId(-1);
                setBasketRecordsAlreadyFetched(false);
                setCurrentRecordsDetails([]);
                setTotal(0);
                fetchBasketRecords();
            })
            .catch((error) => {
                console.error(error);
                setStatus('Błąd...');
            })
    }

    const sleep = (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    const calculateTotal = () => {
        let total = 0;
        for(let i = 0; i < basketRecords.length; i++) {
            total += Number(basketRecords[i].liczba_produktu) * Number(currentRecordsDetails[i].cena_brutto);
        }
        total = Math.round(total * 100) / 100;
        setTotal(total);
    }

    if(isLoading) {
        return (
            <div id='loadingContainer'>
                <h3>Ładowanie koszyka...</h3>
            </div>
        )
    } else if (isEmpty) {
        return (
            <div id='emptyContainer'>
                <h3>Twój koszyk jest pusty...</h3>
                <Link to='/'><button>Powrót</button></Link>
            </div>
        )
    } else if (currentRecordsDetails.length !== basketRecords.length) {
        return (
            <div id='loadingContainer'>
                <h3>Ładowanie informacji o produktach...</h3>
            </div>
        )
    } else {
        return (
            <div id='browseBasketContainer'>
                <div className='basketBrowser'>
                {basketRecords.length > 0 ? 
                    <table>
                        <thead>
                            <tr>
                                <th>Nazwa produktu</th>
                                <th>Cena produktu</th>
                                <th>Ilość w koszyku</th>
                                <th>Cena</th>
                            </tr>
                        </thead>
                        <tbody>
                {basketRecords.map((basketRecord, index) => (
                                        <tr key={basketRecord.id_produktu} id={basketRecord.id_produktu} className='recordRow' onClick={handleProductChoice}>
                                            <td>{currentRecordsDetails[index].nazwa}</td>
                                            <td>{currentRecordsDetails[index].cena_brutto} zł</td>
                                            <td>{basketRecord.liczba_produktu}</td>
                                            <td>{Math.round(Number(currentRecordsDetails[index].cena_brutto) * Number(basketRecord.liczba_produktu) * 100) / 100} zł</td>
                                        </tr>
                                    )
                                )}
                        </tbody>
                    </table>
                    :
                        <h3>Twój koszyk jest pusty</h3>
                    }
                </div>
                <div className='modalArea'>
                    {isModalActive &&
                        <div className='modal'>
                            <div>
                                <label htmlFor='productQuantityInput'>Podaj nową ilość produktu w koszyku:</label>
                                <input type='number' id='productQuantityInput' value={value} onChange={(event) => {setValue(event.target.value)}}></input>
                            </div>
                            <button onClick={handleChangeBasketQuantity}>Zastosuj zmiany</button>
                            <button onClick={() => {setIsModalActive(false)}} id='closeModalButton'>X</button>
                        </div>
                    }
                </div>
                <div className='buttonsWrapper'>
                    <button id='changeBasketQuantityButton' onClick={(event) => {setIsModalActive(true)}}>Zmień ilość produktu</button>
                    <button id='removeFromBasketButton' onClick={handleRemoveFromBasket}>Usuń produkt z koszyka</button>
                    <Link to='/placeOrder'><button>Złóż zamówienie</button></Link>
                    <Link to='/'><button>Powrót</button></Link>
                </div>
                <div className='statusWrapper'>
                    <h3>{status}</h3>
                </div>
                <div className='totalWrapper'>
                    <h3>Cena całkowita: {total} zł</h3>
                </div>
            </div>
        )
    }
}

export default BrowseBasket;