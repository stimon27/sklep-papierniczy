import './OrderHistoryList.css'

const OrderHistoryList = (props) => {
    return (
        <div id='orderHistoryList'>
            {props.children}
        </div>
    )
}

export default OrderHistoryList;