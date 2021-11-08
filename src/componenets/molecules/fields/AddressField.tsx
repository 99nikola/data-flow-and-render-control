import { memo } from "react";
import TextField from "../../atoms/TextField/TextField";

const AddressField = () => {
    return (
        <TextField placeHolder="Address" />
    );
}

export default memo(AddressField);