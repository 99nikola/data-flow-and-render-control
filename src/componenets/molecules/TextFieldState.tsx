import { memo } from "react";
import { debounceFunction } from "../../utils/Utils";
import TextField, { TextFieldProps } from "../atoms/TextField/TextField";

interface PropsType extends TextFieldProps {
    name: string,
    setUserInfo: React.Dispatch<React.SetStateAction<object>>
}

const TextFieldState: React.FC<PropsType> = ({ name, setUserInfo, ...rest }) => {

    const changeHandler = (e: any) => {

        setUserInfo((currentState) => {
            return {
                ...currentState,
                [name]: e.target.value
            };
        });

    }

    return (
        <TextField 
            {...rest}
            onChange={debounceFunction(changeHandler, 500)}
            />
    );
}

export default memo(TextFieldState);
