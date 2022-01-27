import './OrderContentsList.css'

const OrderContentsList = (props) => {
    return (
        <div id='orderContentsListContainer'>
            <h1>Twoje zamówienie:</h1>
            {props.children}
        </div>
    )
}

export default OrderContentsList;