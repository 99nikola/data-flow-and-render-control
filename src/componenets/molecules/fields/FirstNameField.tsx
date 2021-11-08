import { debounceFunction } from "../../../utils/Utils";
import TextField from "../../atoms/TextField/TextField";

interface PropsType {
    setUserInfo: React.Dispatch<React.SetStateAction<object>>
}

const FirstNameField: React.FC<PropsType> = ({ setUserInfo }) => {

    const changeHandler = (e: any) => {

        console.log(e.target.value);

        setUserInfo((currentState) => {
            return {
                ...currentState,
                firstName: e.target.value
            };
        });

    }

    return (
        <TextField 
            placeHolder="First Name" 
            onChange={debounceFunction(changeHandler, 500)}
            />
    );
}

export default FirstNameField;
