import React, { memo, useCallback, useMemo } from "react";
import { debounceFunction, throttleFunction } from "../../utils/Utils";
import { maxLength, minLength, required, ValidationError } from "../../validation/Validation";
import TextField, { TextFieldProps } from "../atoms/TextField/TextField";
import { FormType } from "../organisms/Form";

export interface RulesType {
    required?: boolean | string,
    minLength?: number,
    maxLength?: number 
}

interface PropsType extends TextFieldProps {
    name: string,
    setState: React.Dispatch<React.SetStateAction<FormType>>,
    setErrors: React.Dispatch<React.SetStateAction<FormType>>,
    validate?: Function,
    rules?: RulesType 
}

const validateInput = (value: string, validate: Function) => {

    let validObj = {
        isValid: true,
        message: ''
    }
    console.log(validate(value));
    // for (let func of validate) {
    //     let rvalue = func(value);

    //     if (typeof rvalue === 'string' || rvalue === false) {
    //         validObj.isValid = false;
    //         validObj.message = rvalue;
    //         return validObj;
    //     }
    // }

    return validObj;
}

const TextFieldState: React.FC<PropsType> = ({ name, setState, setErrors, validate, rules, ...rest }) => {

    const updateError = useCallback((message: string | boolean) => {
        setErrors((currentErrors) => ({
            ...currentErrors,
            [name]: message
        }));
    }, [setErrors]);

    const updateState = useCallback((value: string) => {
        setState((currentState) => ({
            ...currentState,
            [name]: value
        }));
    }, [setState]);


    const checkValidation = useCallback((input: string) => {
        let valid: boolean | ValidationError = validate!(input);
        if (valid instanceof ValidationError) {
            updateError(valid.error);
            return false;
        }
        updateError(false); // clean error
        return true;
    }, [setErrors]);

    const checkRules = useCallback((input: string) => {
        if (rules?.required) {
            let req: boolean | string = required(input);
            if (typeof req === 'string' || !req) {
                updateError(req); 
                return false;
            }
        }

        if (rules?.minLength) {
            let minL: boolean | string = minLength(input, rules.minLength);
            if (typeof minL === 'string' || !minL) {
                updateError(minL); 
                return false;
            }
        }
        
        if (rules?.maxLength) {
            let maxL: boolean | string = maxLength(input, rules.maxLength);
            if (typeof maxL === 'string' || !maxL) {
                updateError(maxL); 
                return false;
            }
        }
        return true;
    }, [updateError]);

    const changeHandler = useCallback((e: any) => {
        const value = e.target.value;

        if (rules && !checkRules(value)) 
            return;

        if (validate && !checkValidation(value))
            return;

        updateState(value);

        }, [ updateState, checkValidation, checkRules ] // maybe chage to [ setState, setErrors ]
    );

    const debounceCallBack = useMemo(() => debounceFunction(changeHandler, 1000), [changeHandler]);

    return (
        <TextField 
            {...rest}
            onChange={debounceCallBack}
            />
    );
}

export default memo(TextFieldState);
