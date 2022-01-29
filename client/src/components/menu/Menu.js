import react from 'react';
import { Link } from 'react-router-dom';

import ButtonsContainer from './ButtonsContainer.js';
import Button from './Button.js';

import './Menu.css';

const Menu = (props) => {
    return (
        <div id='menuContainer'>
            <ButtonsContainer>
                <Link to='/browseCatalog'>
                    <Button text='Przeglądanie katalogu' buttonId='browseCatalogMenuButton'/>
                </Link>
                <Link to='/browseBasket'>
                    <Button text='Obsługa koszyka' buttonId='browseBasketMenuButton'/>
                </Link>
                <Link to='/browseOrderHistory'>
                    <Button text='Wyświetl historię zamówień' buttonId='orderHistoryMenuButton'/>
                </Link>
            </ButtonsContainer>
        </div>
    )
}

export default Menu;