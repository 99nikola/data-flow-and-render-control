import { useState } from "react";
import { address, email, name } from "../../validation/data/data";
import { isEmail } from "../../validation/Validation";
import Button from "../atoms/Button/Button";
import TextFieldState, { RulesType } from "../molecules/TextFieldState";

export interface FormType {
    firstName: "",
    lastName: "",
    emailAddress: "",
    address: ""
}

let DEFAULT_VALUES: FormType = {
    firstName: "",
    lastName: "",
    emailAddress: "",
    address: ""
}

const Form = () => {

    const [ userInfo, setUserInfo ] = useState(DEFAULT_VALUES);
    const [ errors, setErrors ] = useState(DEFAULT_VALUES);

    const submitHandler = (e: any) => {
        e.preventDefault();
        if (Object.keys(errors).length !== 0) {
            console.log("Error: ", errors);
            return;
        }
        console.log(userInfo);
    }

    return (
        <form onSubmit={submitHandler} noValidate={true}>
            <TextFieldState 
                name="firstName"
                rules={name.rules}
                setState={setUserInfo}
                setErrors={setErrors}
                placeHolder="First Name"
                />

            <TextFieldState 
                name="lastName"
                setState={setUserInfo} 
                setErrors={setErrors}
                placeHolder="Last Name"
                />

            <TextFieldState 
                name="emailAddress"
                setState={setUserInfo} 
                setErrors={setErrors}
                validate={email.validation}
                rules={email.rules}
                error={errors.emailAddress}
                placeHolder="Email Address"
                type="email"
                />

            <TextFieldState 
                name="address"
                rules={address.rules}
                setErrors={setErrors}
                setState={setUserInfo} 
                placeHolder="Address"
                />

            <Button 
                type="submit" 
                value="Submit" 
                color="primary" 
                
                />
        </form>
    )
}

export default Form
