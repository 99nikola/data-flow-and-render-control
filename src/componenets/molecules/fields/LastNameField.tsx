import { memo } from "react";
import TextField from "../../atoms/TextField/TextField";

const LastNameField = () => {
    return (
        <TextField placeHolder="Last Name" />
    );
}

export default memo(LastNameField);
