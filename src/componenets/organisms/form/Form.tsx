import classes from "./form.module.css";
import { memo, useState } from "react";
import { address, email, name } from "../../../validation/data/data";
import { isEmail } from "../../../validation/Validation";
import Button from "../../atoms/Button/Button";
import TextFieldState, { DictionaryType } from "../../molecules/TextFieldState";
import nextId from "react-id-generator";

export interface FormType {
    firstName: "",
    lastName: "",
    emailAddress: "",
    address: ""
}

export type FormErrorValue = {
    hasError: boolean;
    errorMessage: string;
}

let DEFAULT_ERROR_VALUES: DictionaryType<FormErrorValue> = {
    firstName: {
        hasError: true,
        errorMessage: ""
    },
    lastName: {
        hasError: true,
        errorMessage: ""
    },
    emailAddress: {
        hasError: true,
        errorMessage: ""
    },
    address: {
        hasError: true,
        errorMessage: ""
    }
}

let DEFAULT_VALUES: DictionaryType<string> = {
    firstName: "",
    lastName: "",
    emailAddress: "",
    address: ""
}

export enum FormValidationState {
    VALID,
    VALIDATING,
    INVALID
}

const Form: React.FC<{
    setUsers: React.Dispatch<React.SetStateAction<Record<string, string>[]>>
}> = ({ setUsers }) => {

    const [ userInfo, setUserInfo ] = useState(DEFAULT_VALUES);
    const [ errors, setErrors ] = useState(DEFAULT_ERROR_VALUES);
    const [ formValidState, setFormValidState ] = useState<FormValidationState>(FormValidationState.INVALID);

    const submitHandler = (e: any) => {
        e.preventDefault();
        if (Object.values(errors).some(error => error.hasError)) {
            setFormValidState(FormValidationState.INVALID);
            return;
        }

        setFormValidState(FormValidationState.VALID);

        setUsers(users => ([
            ...users,
            {
                ...userInfo,
                id: nextId()
            }
        ]));
    }

    return (
       <div className={classes.container}>
            <form 
                className={classes.item}
                onSubmit={submitHandler} 
                noValidate={true}>
                <TextFieldState 
                    name="firstName"
                    rules={name.rules}
                    error={errors.firstName.errorMessage}
                    setState={setUserInfo}
                    setErrors={setErrors}
                    setFormValidState={setFormValidState}
                    placeHolder="First Name"
                    />

                <TextFieldState 
                    name="lastName"
                    rules={name.rules}
                    error={errors.lastName.errorMessage}
                    setState={setUserInfo} 
                    setErrors={setErrors}
                    setFormValidState={setFormValidState}
                    placeHolder="Last Name"
                    />

                <TextFieldState 
                    name="emailAddress"
                    setState={setUserInfo} 
                    setErrors={setErrors}
                    rules={email.rules}
                    error={errors.emailAddress.errorMessage}
                    placeHolder="Email Address"
                    type="email"
                    setFormValidState={setFormValidState}
                    />

                <TextFieldState 
                    name="address"
                    rules={address.rules}
                    error={errors.address.errorMessage}
                    setErrors={setErrors}
                    setState={setUserInfo} 
                    placeHolder="Address"
                    setFormValidState={setFormValidState}
                    />

                <Button 
                    type="submit" 
                    value="Submit" 
                    color="primary" 
                    disabled={formValidState !== FormValidationState.VALID}
                    />
            </form>
       </div>
    )
}

export default memo(Form);
