import SelectComponent from './SelectComponent.js';
import InputComponent from './InputComponent.js';
import './ProofOfPurchase.css'

const ProofOfPurchase = (props) => {
    return (
        <div id='proofOfPurchaseContainer'>
            <SelectComponent selectId='proofOfPurchaseSelect' labelText='Wybór rodzaju dowodu zakupu' options={props.proofsOfPurchase} currentValue={props.chosenProofOfPurchase} setValue={props.setChosenProofOfPurchase}/>
            <div id='invoiceBoxContainer'>
                {props.chosenProofOfPurchase !== props.proofsOfPurchase.RECEIPT && (
                    <div id='invoiceBox'>
                        <p id='invoiceBoxHeader'>Dane do faktury:</p>
                        <InputComponent 
                            inputId='nipInput' 
                            labelText='NIP: ' 
                            currentValue={props.nipNumber} 
                            setValue={(newValue) => {
                                props.setNipNumber(newValue);
                            }}/>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProofOfPurchase;