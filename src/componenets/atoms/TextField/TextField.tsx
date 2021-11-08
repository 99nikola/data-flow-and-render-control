import classes from "./textField.module.css";

interface PropsType {
    type?: string,
    placeHolder?: string,
    onChange?: React.ChangeEventHandler<HTMLInputElement>
}

const TextField: React.FC<PropsType> = ({ type, placeHolder, onChange }) => {
    return (
        <input 
            className={classes.inputField}
            type={type} 
            placeholder={placeHolder}
            onChange={onChange}
        />
    )
}

TextField.defaultProps = {
    type: "text"
}

export default TextField;
