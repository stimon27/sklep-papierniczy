import react from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

const Menu = (props) => {
    return (
        <div id='menuContainer'>
            <Link to='/browseCatalog'>
                <h2>Przeglądanie katalogu</h2>
            </Link>
            <Link to='/browseBasket'>
                <h2>Obsługa koszyka</h2>
            </Link>
            <Link to='/browseOrderHistory'>
                <h2>Wyświetl historię zamówień</h2>
            </Link>
        </div>
    )
}

export default Menu;