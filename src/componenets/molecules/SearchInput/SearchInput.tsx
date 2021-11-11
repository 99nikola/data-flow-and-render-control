import React, { memo, useCallback, useMemo } from "react"
import { debounce } from "underscore";
import { debounceFunction } from "../../../utils/Utils"
import TextField from "../../atoms/TextField/TextField"

const SearchInput: React.FC<{
    setSearch: React.Dispatch<React.SetStateAction<RegExp>>
}> = ({ setSearch }) => {

    const updateSearchState = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;
        if (!input || input.length === 0)
            return;

        setSearch(search => new RegExp(input, 'i'));
    }

    const onChange = debounceFunction(updateSearchState, 500);

    return (
        <TextField 
            onChange={onChange}
        />
    )
}

export default memo(SearchInput);
