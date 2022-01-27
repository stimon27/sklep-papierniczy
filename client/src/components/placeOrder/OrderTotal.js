import './OrderTotal.css'

const OrderTotal = (props) => {
    return (
        <div id='orderTotalContainer'>
            <h1>Łączna kwota zamówienia: {props.total} zł</h1>
        </div>
    )
}

export default OrderTotal;