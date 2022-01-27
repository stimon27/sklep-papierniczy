import SelectComponent from './SelectComponent.js';
import InputComponent from './InputComponent.js';
import './DeliveryOptions.css'

const DeliveryOptions = (props) => {
    return (
        <div id='deliveryOptionsContainer'>
            <SelectComponent selectId='deliveryOptionSelect' labelText='Wybór sposobu dostawy:' options={props.deliveryOptions} currentValue={props.chosenDeliveryOption} setValue={props.setChosenDeliveryOption}/>
            <div id='addressBoxContainer'>
                {props.chosenDeliveryOption !== props.deliveryOptions.SELF_PICKUP && (
                    <div id='addressBox'>
                        <p id='addressBoxHeader'>Adres dostawy:</p>
                        <InputComponent 
                            inputId='streetInput' 
                            labelText='Ulica: ' 
                            currentValue={props.deliveryAddress.ulica} 
                            setValue={(newValue) => {
                                props.setDeliveryAddress((prevDeliveryAddress) => ({...prevDeliveryAddress, ulica: newValue}));
                            }}/>
                        <InputComponent 
                            inputId='buildingNoInput' 
                            labelText='Nr budynku: ' 
                            currentValue={props.deliveryAddress.numer} 
                            setValue={(newValue) => {
                                props.setDeliveryAddress((prevDeliveryAddress) => ({...prevDeliveryAddress, numer: newValue}));
                            }}/>
                        <InputComponent 
                            inputId='cityInput' 
                            labelText='Miejscowość: ' 
                            currentValue={props.deliveryAddress.miasto} 
                            setValue={(newValue) => {
                                props.setDeliveryAddress((prevDeliveryAddress) => ({...prevDeliveryAddress, miasto: newValue}));
                            }}/>
                        <InputComponent 
                            inputId='zipInput' 
                            labelText='Kod pocztowy: ' 
                            currentValue={props.deliveryAddress.zip} 
                            setValue={(newValue) => {
                                props.setDeliveryAddress((prevDeliveryAddress) => ({...prevDeliveryAddress, zip: newValue}));
                            }}/>
                    </div>
                )}
            </div>
        </div>
    )
}

export default DeliveryOptions;