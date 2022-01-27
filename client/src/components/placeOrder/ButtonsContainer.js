import './ButtonsContainer.css'

const ButtonsContainer = (props) => {
    return (
        <div id='buttonsContainer'>
            {props.children}
        </div>
    )
}

export default ButtonsContainer;