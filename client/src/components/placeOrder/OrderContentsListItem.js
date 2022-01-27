import './OrderContentsListItem.css';

const OrderContentsListItem = (props) => {

    return (
        <div className='listItem'>
            <h2 className='listItemTitle'>{props.recordDetails.nazwa}</h2>
            <p className='listItemPrice'>{String.fromCharCode(0x25CF)} Cena jednostkowa produktu: <span>{props.recordDetails.cena_brutto} zł</span></p>
            <p className='listItemAmount'>{String.fromCharCode(0x25CF)} Liczba sztuk produktu w koszyku: <span>{props.basketRecord.liczba_produktu}</span></p>
            <hr/>
        </div>
    )
}

export default OrderContentsListItem;