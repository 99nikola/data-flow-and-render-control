import classes from "./textField.module.css";

export interface TextFieldProps {
    type?: string,
    placeHolder?: string,
    onChange?: React.ChangeEventHandler<HTMLInputElement>,
    error?: string
}

const TextField: React.FC<TextFieldProps> = ({ type, placeHolder, onChange, error }) => {
    return (
        <div className={classes.field}>
            <input 
                className={classes.inputField}
                type={type} 
                placeholder={placeHolder}
                onChange={onChange}
            />
            {error && (
                <p className={classes.errorMessage}>{error}</p>
            )}
        </div>
    )
}

TextField.defaultProps = {
    type: "text"
}

export default TextField;
