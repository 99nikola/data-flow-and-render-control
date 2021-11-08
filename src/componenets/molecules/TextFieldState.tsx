import { memo, useCallback, useMemo } from "react";
import { debounceFunction } from "../../utils/Utils";
import TextField, { TextFieldProps } from "../atoms/TextField/TextField";

interface PropsType extends TextFieldProps {
    name: string,
    setUserInfo: React.Dispatch<React.SetStateAction<object>>
}

const TextFieldState: React.FC<PropsType> = ({ name, setUserInfo, ...rest }) => {

    const changeHandler = useCallback(
        (e: any) => {
            console.log(e.target.value);
            setUserInfo((currentState) => {
                return {
                    ...currentState,
                    [name]: e.target.value
                };
            });
        }, [setUserInfo]
    );

    const debounceCallBack = useMemo(() => debounceFunction(changeHandler, 500), [changeHandler]);

    return (
        <TextField 
            {...rest}
            onChange={debounceCallBack}
            />
    );
}

export default memo(TextFieldState);
