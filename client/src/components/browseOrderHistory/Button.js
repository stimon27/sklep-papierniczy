import './Button.css'

const Button = ({ text, buttonId, onClick = null }) => {
    if(!!onClick) {
        return (
            <button id={buttonId} onClick={onClick}>{text}</button>
        )
    } else {
        return (
            <button id={buttonId}>{text}</button>
        )
    }
}

export default Button;