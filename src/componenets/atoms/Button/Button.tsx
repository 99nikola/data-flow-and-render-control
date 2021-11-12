import classes from "./button.module.css";
import { memo } from "react";

interface ButtonProps {
    type?: "submit" | "button" | "reset",
    value?: string,
    color?: "primary" | "secondary",
    disabled?: boolean,
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const Button: React.FC<ButtonProps> = ({ type, value, color, disabled, onClick }) => {
    return (
        <button 
            className={classes.button}
            type={type}
            data-color={color}
            disabled={disabled}
            onClick={onClick}
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
export default memo(Button);
