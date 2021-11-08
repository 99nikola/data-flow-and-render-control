import React, { memo, useCallback, useMemo } from "react";
import { debounceFunction } from "../../utils/Utils";
import TextField, { TextFieldProps } from "../atoms/TextField/TextField";
import { FormType } from "../organisms/Form";

interface PropsType extends TextFieldProps {
    name: string,
    setState: React.Dispatch<React.SetStateAction<FormType>>,
    setErrors: React.Dispatch<React.SetStateAction<FormType>>,
    validate?: Array<Function>,
    error?: string,
    minLength?: number 
}

const validateInput = (value: string, validate: Array<Function>) => {

    let validObj = {
        isValid: true,
        message: ''
    }

    for (let func of validate) {
        let rvalue = func(value);

        if (typeof rvalue === 'string' || rvalue === false) {
            validObj.isValid = false;
            validObj.message = rvalue;
            return validObj;
        }
    }


    return validObj;
}

const TextFieldState: React.FC<PropsType> = ({ name, setState, setErrors, validate, error, minLength, ...rest }) => {

    const changeHandler = useCallback(
        (e: any) => {
            const value = e.target.value;
            if (validate) {
                let { isValid, message }: { isValid: boolean, message: string } = validateInput(value, validate);
                if (isValid) {
                    setState((currentState) => ({
                        ...currentState,
                        [name]: value
                    }));
                } else {
                    setErrors((currentErrors) => ({
                        ...currentErrors,
                        [name]: message
                    }));
                }
            }
        }, [setState]
    );

    const debounceCallBack = useMemo(() => debounceFunction(changeHandler, 500), [changeHandler]);

    return (
        <TextField 
            {...rest}
            onChange={debounceCallBack}
            error={error}
            />
    );
}

export default memo(TextFieldState);
