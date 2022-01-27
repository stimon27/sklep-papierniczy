import './InputComponent.css';

const InputComponent = (props) => {
    return (
        <div className="inputComponent">
            <label htmlFor={props.inputId}>{props.labelText}</label>
            <input type="text" id={props.inputId} value={props.currentValue} onChange={(event) => {props.setValue(event.target.value)}}></input>
        </div>
    );
}

export default InputComponent;