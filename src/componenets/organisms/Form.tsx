import { useEffect, useState } from "react";
import Button from "../atoms/Button/Button";
import EmailField from "../molecules/fields/EmailField";
import FirstNameField from "../molecules/fields/FirstNameField";
import LastNameField from "../molecules/fields/LastNameField";

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
            <FirstNameField setUserInfo={setUserInfo} />
            <LastNameField />
            <EmailField />
            <Button type="submit" value="Submit" color="secondary" />
        </form>
    )
}

export default Form
