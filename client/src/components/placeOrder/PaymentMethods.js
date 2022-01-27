import SelectComponent from './SelectComponent.js';
import './PaymentMethods.css'

const PaymentMethods = (props) => {
    return (
        <div id='paymentMethodsContainer'>
            <SelectComponent selectId='paymentMethodSelect' labelText='Wybór sposobu płatności:' options={props.paymentMethods} currentValue={props.chosenPaymentMethod} setValue={props.setChosenPaymentMethod}/>
        </div>
    )
}

export default PaymentMethods;