import { memo } from "react";
import TextField from "../../atoms/TextField/TextField";

const EmailField = () => {
    return (
        <TextField type="email" placeHolder="Email Address" />
    );
}

export default memo(EmailField);