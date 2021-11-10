import React, { memo, useCallback, useMemo } from "react";
import { debounceFunction } from "../../utils/Utils";
import { IValidationRuleKey, ValidationRuleFactory } from "../../validation/data/data";
import TextField, { TextFieldProps } from "../atoms/TextField/TextField";
import { FormErrorValue, FormType, FormValidationState } from "../organisms/form/Form";

export type DictionaryType<T> = { [key: string]: T };

interface PropsType extends TextFieldProps {
    name: string;
    setState: React.Dispatch<React.SetStateAction<FormType>>;
    setErrors: React.Dispatch<React.SetStateAction<DictionaryType<FormErrorValue>>>;
    setFormValidState: React.Dispatch<React.SetStateAction<FormValidationState>>;
    validate?: Function,
    rules?: IValidationRuleKey; 
}

const TextFieldState: React.FC<PropsType> = ({ name, setState, setErrors, rules, setFormValidState, ...rest }) => {
    const internalRules = useMemo(() => {
        if (!rules) {
            return [];
        }

        const output = [];
        for (const [key, value] of Object.entries(rules) as [keyof IValidationRuleKey, any][]) {
            const rule = ValidationRuleFactory.create(key, value);
            if (rule) {
                output.push(rule);
            }
        }
        return output;
    }, [rules]);

    const validate = useCallback(function validateValue(input: any) {
        try {
            internalRules.forEach(rule => {
                rule.validate(input);
            });

            setErrors(errors => {
                if (Object.values(errors).every(error => !error.hasError)) {
                    setFormValidState(FormValidationState.VALID);
                }
                return errors;
            });
        } catch (error: any) {
            setErrors(errors => ({
                ...errors,
                [name]: {
                    hasError: true,
                    errorMessage: error.message
                }
            }));
            setFormValidState(FormValidationState.INVALID);
        }
    }, [internalRules]);

    const debouncedValidate = useMemo(() => debounceFunction(validate, 1000), [validate])

    const changeValue = useCallback(function changeValue(event: React.ChangeEvent<HTMLInputElement>) {
        debouncedValidate.cancel();
        debouncedValidate(event.target.value);
        setErrors((errors: DictionaryType<FormErrorValue>) => {
            if (errors[name].hasError) {
                return {
                    ...errors,
                    [name]: {
                        hasError: false,
                        errorMessage: ""
                    }
                }
            }

            setFormValidState(FormValidationState.VALIDATING);

            return errors;
        });
        setState(currentState => ({
            ...currentState,
            [name]: event.target.value
        }));
    }, [debouncedValidate, name, setFormValidState]);

    return (
        <TextField 
            {...rest}
            onChange={changeValue}
            />
    );
}

export default memo(TextFieldState);
