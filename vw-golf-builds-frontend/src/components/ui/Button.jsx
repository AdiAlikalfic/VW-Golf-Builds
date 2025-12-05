import "./Button.css"

function Button(props) {
    return (
    <button onClick={props.onClick} disabled={props.disabled} className={`btn btn-${props.variant}`}>{props.text}</button>
)
}

export default Button