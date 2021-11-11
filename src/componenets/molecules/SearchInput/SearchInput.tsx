import React, { memo, useCallback, useMemo } from "react"
import { debounceFunction } from "../../../utils/Utils"
import TextField from "../../atoms/TextField/TextField";


const SearchInput: React.FC<{
    setSearch: React.Dispatch<React.SetStateAction<RegExp>>
}> = ({ setSearch }) => {

    const updateSearchState = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;
        if (input === undefined || input === null) 
            return;

        setSearch(search => {
            if (search.source === input) 
                return search;
            return new RegExp(input, 'i');
        });
    }

    const onChange = debounceFunction(updateSearchState, 500);

    return (
        <TextField 
            placeHolder="Search users by name"
            onChange={onChange}
        />
    )
}

export default memo(SearchInput);
