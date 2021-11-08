import React, { memo, useCallback, useMemo } from "react";
import { debounceFunction } from "../../utils/Utils";
import TextField, { TextFieldProps } from "../atoms/TextField/TextField";
import { FormType } from "../organisms/Form";

interface PropsType extends TextFieldProps {
    name: string,
    setState: React.Dispatch<React.SetStateAction<FormType>>,
    setErrors: React.Dispatch<React.SetStateAction<FormType>>,
    validate?: Function,
    error?: string
}

const TextFieldState: React.FC<PropsType> = ({ name, setState, setErrors, validate, error, ...rest }) => {

    const changeHandler = useCallback(
        (e: any) => {
            if (validate) {
                let isValid: boolean | string = validate(e.target.value);
                if (typeof isValid === 'string' || !isValid) {
                    setErrors((currentErrors) => ({
                        ...currentErrors,
                        [name]: isValid
                    }));
                    return;
                } else {
                    setErrors((currentErrors) => ({
                        ...currentErrors,
                        [name]: false
                    }))
                }
            }

            setState((currentState) => ({
                ...currentState,
                [name]: e.target.value
            }));
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
