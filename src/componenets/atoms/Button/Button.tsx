import classes from "./button.module.css";

interface ButtonProps {
    type?: "submit" | "button" | "reset",
    value?: string,
    color?: "primary" | "secondary"
}

const Button: React.FC<ButtonProps> = ({ type, value, color }) => {
    return (
        <button 
            className={`${classes.button} ${color}`}
            type={type}
            >
            {value}
        </button>
    );
}

Button.defaultProps = {
    type: "submit",
    value: "Submit",
    color: "primary"
}
export default Button
