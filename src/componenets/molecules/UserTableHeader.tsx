import React, { memo, useCallback, useMemo, useState } from "react"
import { IUser } from "../../typescript/interfaces/User"
import TableHeader, { TableHeaderProps } from "../atoms/Button/TableHeader"

export enum ESortDirection {
    ASCENDING = 1,
    DESCENDING = -1
}

let sortDirection = ESortDirection.DESCENDING;

interface UserTableHeaderProps extends TableHeaderProps {
    name: keyof IUser,
}

const UserTableHeader: React.FC<UserTableHeaderProps>  = ({ name, onClick, ...rest}) => {

    const onClickSort = useCallback(() => {
        onClick(name, sortDirection);
        sortDirection = -sortDirection;
    }, [onClick]);

    return (
        <TableHeader 
            {...rest} 
            onClick={onClickSort}
            />
    )
}

export default memo(UserTableHeader);
