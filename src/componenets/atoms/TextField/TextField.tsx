import classes from "./textField.module.css";

export interface TextFieldProps {
    type?: string,
    placeHolder?: string,
    onChange?: React.ChangeEventHandler<HTMLInputElement>,
    error?: string,
    text?: string
}

const TextField: React.FC<TextFieldProps> = ({ type, placeHolder, onChange, error, text }) => {
    return (
        <div className={classes.field}>
            <input 
                value={text}
                className={classes.inputField}
                type={type} 
                placeholder={placeHolder}
                onChange={onChange}
                autoComplete="off"
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
