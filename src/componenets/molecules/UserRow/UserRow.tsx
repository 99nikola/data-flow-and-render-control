import React, { memo, useCallback } from "react";
import { IUser } from "../../../typescript/interfaces/User";
import TableRow from "../../atoms/TableRow/TableRow";

export interface UserRowProps extends IUser {
  deleteEntity: React.Dispatch<React.SetStateAction<IUser[]>>;
}

const UserRow: React.FC<UserRowProps> = (props: UserRowProps) => {
    const deleteSelectedUser = useCallback((id: string) => {
        const confirm = window.confirm("Are you sure you want to delete entity: " + props.firstName);
        if (!confirm) return;

        props.deleteEntity((entity) => entity.filter(entity => entity.id !== id));
    }, [props.firstName]);

    return (
        <TableRow id={props.id} onDeleteEntity={deleteSelectedUser}>
            <td>{props.firstName}</td>
            <td>{props.lastName}</td>
            <td>{props.emailAddress}</td>
            <td>{props.address}</td>
        </TableRow>
    );
}

export default memo(UserRow);
