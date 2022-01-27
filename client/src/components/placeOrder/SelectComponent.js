import './SelectComponent.css';

const SelectComponent = (props) => {
    return (
        <div className='selectComponent'>
            <label htmlFor={props.selectId}>{props.labelText}</label>
            <select id={props.selectId} defaultValue={props.currentValue} onChange={(event) => {props.setValue(event.target.value)}}>
                {Object.entries(props.options).map(([key, value]) => (
                    <option key={key} value={value}>{value}</option>
                ))}
            </select>
        </div>
    );
}

export default SelectComponent;