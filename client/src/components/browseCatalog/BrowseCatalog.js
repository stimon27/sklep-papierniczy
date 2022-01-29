import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import './BrowseCatalog.css'

const BrowseCatalog = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [currentProductId, setCurrentProductId] = useState(-1);
    const [isModalActive, setIsModalActive] = useState(false);
    const [value, setValue] = useState(1);
    const [status, setStatus] = useState('Witamy w katalogu!');
    const [searchQuery, setSearchQuery] = useState('');

    const sleep = (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    const fetchProducts = async () => {
        axios.get('http://localhost:5000/products/getAll')
            .then((response) => {
                setProducts(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setStatus('Błąd...');
            })
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        if(!isLoading) {
            document.getElementById('addToBasketButton').disabled = currentProductId === -1;
            document.getElementById('addToFavoritesButton').disabled = currentProductId === -1;
        }
    }, [isLoading]);

    useEffect(() => {
        products
            .filter((product) => searchQuery ? product.nazwa.toLowerCase().includes(searchQuery.toLowerCase()) : true)
            .forEach((product) => {
                if(Number(product.id_produktu) === currentProductId) {
                    Array.from(document.getElementById(product.id_produktu).children).forEach((child) => {child.classList.add('productActive')});
                } else {
                    Array.from(document.getElementById(product.id_produktu).children).forEach((child) => {child.classList.remove('productActive')});
                }
            })
        if(!isLoading) {
            document.getElementById('addToBasketButton').disabled = currentProductId === -1;
            document.getElementById('addToFavoritesButton').disabled = currentProductId === -1;
        }
        setIsModalActive(false);
    }, [currentProductId])

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
        if(currentProductId !== Number(event.target.parentNode.getAttribute('id'))) {
            setCurrentProductId(Number(event.target.parentNode.getAttribute('id')));
        }
        else {
            setCurrentProductId(-1);
        }
    }

    const handleAddToBasket = (event) => {
        const quantity = value;
        let quantityLimit;
        for(let i = 0; i < products.length; i++) {
            if(Number(products[i].id_produktu) === currentProductId) {
                quantityLimit = products[i].stan_magazynowy;
            }
        }
        if(quantity < 1 || quantity % 1 != 0) {
            setStatus('Podano błędną ilość produktu do dodania');
        } else if(quantity > quantityLimit) {
            setStatus('Niewystarczająca ilość produktu w magazynie');
        } else {
            axios
                .get('http://localhost:5000/basketRecords/get', { params: {id_produktu: currentProductId, id_klienta: Number(props.customerId)} })
                .then((response) => {
                    return response.data.length > 0;
                })
                .then(async (ifRecordExists) => {
                    if(ifRecordExists) {
                        axios
                            .put('http://localhost:5000/basketRecords/update', { id_produktu: currentProductId, id_klienta: props.customerId, liczba_produktu: quantity})
                            .then((response) => {
                                setStatus('Pomyślnie zaktualizowano pozycję w koszyku')
                            })
                            .catch((error) => {
                                setStatus('Błąd...');
                                console.error(error);
                            })
                    } else {
                        axios
                            .post('http://localhost:5000/basketRecords/create', { id_produktu: currentProductId, id_klienta: props.customerId, liczba_produktu: quantity})
                            .then((response) => {
                                setStatus('Pomyślnie dodano pozycję do koszyka')
                            })
                            .catch((error) => {
                                setStatus('Błąd...');
                                console.error(error);
                            })
                    }
                
                    document.querySelector('.modalArea').classList.remove('modalActive');
                    await sleep(1000);
                    setIsModalActive(false);
                })
                .catch((error) => {
                    setStatus('Błąd...');
                    console.error(error);
                });
        }
    }

    const handleAddToFavorites = (event) => {
        axios
            .get('http://localhost:5000/favorites/get', { params: { id_produktu: currentProductId, id_klienta: props.customerId } })
            .then((response) => {
                return response.data.length > 0;
            })
            .then((ifRecordExists) => {
                if(ifRecordExists) {
                    setStatus('Produkt jest już dodany do ulubionych');
                } else {
                    axios
                        .post('http://localhost:5000/favorites/create', { id_produktu: currentProductId, id_klienta: props.customerId })
                        .then((response) => {
                            setStatus('Pomyślnie dodano produkt do ulubionych');
                        })
                        .catch((error) => {
                            setStatus('Błąd...');
                            console.error(error);
                        });
                }
            })
            .catch((error) => {
                setStatus('Błąd...');
                console.error(error);
            });
    }


    if(isLoading) {
        return (
            <div id='loadingContainer'>
                <h3>Ładowanie katalogu...</h3>
            </div>
        )
    } else {
        return (
            <div id='browseCatalogContainer'>
                <div className='catalogBrowser'>
                    <h2>Katalog produktów</h2>
                    <div className='searchWrapper'>
                        <label htmlFor='searchInput'>
                            Wprowadź kryterium wyszukiwania:
                        </label>
                        <input 
                        type='text' 
                        id='searchInput' 
                        placeholder='Zeszyt'
                        value={searchQuery}
                        onChange={(event) => {setSearchQuery(event.target.value);}}
                        ></input>
                    </div>
                    {products
                        .filter((product) => searchQuery ? product.nazwa.toLowerCase().includes(searchQuery.toLowerCase()) : true)
                        .length > 0 ? 
                            <table>
                                <thead>
                                    <tr>
                                        <th>Nazwa produktu</th>
                                        <th>Koszt</th>
                                        <th>Ilość sztuk</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {products
                                .filter((product) => searchQuery ? product.nazwa.toLowerCase().includes(searchQuery.toLowerCase()) : true)
                                .map((product) => (
                                        <tr key={product.id_produktu} id={product.id_produktu} className='productRow' onClick={handleProductChoice}>
                                            <td>{product.nazwa}</td>
                                            <td>{product.cena_brutto} zł</td>
                                            <td>{product.stan_magazynowy}</td>
                                        </tr>
                                    )
                                )}
                                </tbody>
                            </table>
                    :
                        <h3>Nie znaleziono produktów spełniających kryterium</h3>
                    }
                </div>
                <div className='modalArea'>
                    {isModalActive &&
                        <div className='modal'>
                            <div>
                                <label htmlFor='productQuantityInput'>Podaj liczbę sztuk produktu, którą chcesz dodać do koszyka:</label>
                                <input type='number' id='productQuantityInput' value={value} onChange={(event) => {setValue(event.target.value)}}></input>
                            </div>
                            <button onClick={handleAddToBasket}>Dodaj do koszyka</button>
                            <button onClick={() => {setIsModalActive(false)}} id='closeModalButton'>X</button>
                        </div>
                    }
                </div>
                <div className='buttonsWrapper'>
                    <button id='addToBasketButton' onClick={(event) => {setIsModalActive(true)}} >Dodaj do koszyka</button>
                    <button id='addToFavoritesButton' onClick={handleAddToFavorites}>Dodaj do ulubionych</button>
                    <Link to='/'><button>Powrót</button></Link>
                </div>
                <div className='statusWrapper'>
                    <h3>{status}</h3>
                </div>
            </div>
        )
    }
}

export default BrowseCatalog;