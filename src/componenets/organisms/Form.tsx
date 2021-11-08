import { useEffect, useState } from "react";
import Button from "../atoms/Button/Button";
import TextFieldState from "../molecules/TextFieldState";

const Form = () => {

    const [ userInfo, setUserInfo ] = useState({});
    const [ errors, setErrors ] = useState({});

    useEffect(() => {
        console.log(userInfo);
    }, [userInfo]);

    const submitHandler = (e: any) => {
        e.preventDefault();
        console.log(e);

    }

    return (
        <form onSubmit={submitHandler}>
            <TextFieldState 
                name="firstName"
                setUserInfo={setUserInfo} 
                placeHolder="First Name"
                />

            <TextFieldState 
                name="lastName"
                setUserInfo={setUserInfo} 
                placeHolder="Last Name"
                />

            <TextFieldState 
                name="emailAddress"
                setUserInfo={setUserInfo} 
                placeHolder="Email Address"
                type="email"
                />

            <TextFieldState 
                name="address"
                setUserInfo={setUserInfo} 
                placeHolder="Address"
                />



            <Button type="submit" value="Submit" color="secondary" />
        </form>
    )
}

export default Form
