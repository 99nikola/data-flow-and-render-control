import classes from "./form.module.css";
import React, { memo, useState } from "react";
import { address, email, name } from "../../../validation/data/data";
import { isEmail } from "../../../validation/Validation";
import Button from "../../atoms/Button/Button";
import TextFieldState, { DictionaryType } from "../../molecules/TextFieldState/TextFieldState";
import { IUser } from "../../../typescript/interfaces/User";

export interface FormType extends Omit<IUser, "id">{}

export type FormErrorValue = {
    hasError: boolean;
    errorMessage: string;
}

export let DEFAULT_ERROR_VALUES: DictionaryType<FormErrorValue> = {
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

export enum FormValidationState {
    VALID,
    VALIDATING,
    INVALID
}

const UserForm: React.FC<{
    setErrors: React.Dispatch<React.SetStateAction<DictionaryType<FormErrorValue>>>,
    setUserInfo: React.Dispatch<React.SetStateAction<FormType>>,
    setFormValidState: React.Dispatch<React.SetStateAction<FormValidationState>>,
    errors: DictionaryType<FormErrorValue>,
    userInfo: FormType,
    formValidState: FormValidationState,
    onSubmit(): void,
    onReset(): void,
    setIdToEdit?: React.Dispatch<React.SetStateAction<any>>,
    editLabel?: string
}> = (props) => {


    const submitHandler = (e: any) => {
        e.preventDefault();
        props.onSubmit();
    }

    const resetHandler = (e: any) => {
        e.preventDefault();
        props.onReset();        
    }

    return (
       <div className={classes.container}>
            <form 
                className={classes.item}
                onSubmit={submitHandler} 
                onReset={resetHandler}
                noValidate={true}
                >

                <TextFieldState 
                    name="firstName"
                    text={props.userInfo.firstName}
                    rules={name.rules}
                    error={props.errors.firstName.errorMessage}
                    setState={props.setUserInfo}
                    setErrors={props.setErrors}
                    setFormValidState={props.setFormValidState}
                    placeHolder="First Name"
                    />

                <TextFieldState 
                    name="lastName"
                    text={props.userInfo.lastName}
                    rules={name.rules}
                    error={props.errors.lastName.errorMessage}
                    setState={props.setUserInfo} 
                    setErrors={props.setErrors}
                    setFormValidState={props.setFormValidState}
                    placeHolder="Last Name"
                    />

                <TextFieldState 
                    name="emailAddress"
                    text={props.userInfo.emailAddress}
                    setState={props.setUserInfo} 
                    setErrors={props.setErrors}
                    rules={email.rules}
                    error={props.errors.emailAddress.errorMessage}
                    placeHolder="Email Address"
                    type="email"
                    setFormValidState={props.setFormValidState}
                    />

                <TextFieldState 
                    name="address"
                    text={props.userInfo.address}
                    rules={address.rules}
                    error={props.errors.address.errorMessage}
                    setErrors={props.setErrors}
                    setState={props.setUserInfo} 
                    placeHolder="Address"
                    setFormValidState={props.setFormValidState}
                    />

                <div className={classes.buttons}>
                    <Button 
                        type="submit" 
                        value={props.editLabel || "Submit"}
                        color="primary" 
                        disabled={props.formValidState !== FormValidationState.VALID}
                        />

                    <Button 
                        type="reset"
                        value="Reset"
                        color="secondary"
                        />
                </div>
            </form>
       </div>
    )
}

export default memo(UserForm);
