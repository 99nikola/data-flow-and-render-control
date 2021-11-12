import React, { memo, useCallback, useEffect, useState } from "react";
import { IUser } from "../../../typescript/interfaces/User";
import TableRow from "../../atoms/TableRow/TableRow";
import { FormType, FormValidationState } from "../../organisms/form/UserForm";

export interface UserRowProps extends IUser {
    updateUsers: React.Dispatch<React.SetStateAction<IUser[]>>,
    setUserInfo: React.Dispatch<React.SetStateAction<FormType>>,
    setFormValidState: React.Dispatch<React.SetStateAction<FormValidationState>>,
    setIdToEdit: React.Dispatch<React.SetStateAction<string | undefined>>
}

const UserRow: React.FC<UserRowProps> = (props) => {

    const deleteSelectedUser = useCallback((id: string) => {
        const confirm = window.confirm("Are you sure you want to delete entity: " + props.firstName);
        if (!confirm) return;

        props.updateUsers((entity) => entity.filter(entity => entity.id !== id));
    }, [props.firstName]);

    const changeUserFormValues = useCallback((id: string) => {
        props.setUserInfo({
            firstName: props.firstName,
            lastName: props.lastName,
            emailAddress: props.emailAddress,
            address: props.address
        });
        props.setIdToEdit(id);
        props.setFormValidState(FormValidationState.VALID);
    }, [props.firstName, props.lastName, props.emailAddress, props.address]);

    return (
        <TableRow 
            id={props.id} 
            onDeleteEntity={deleteSelectedUser} 
            onEditEntity={changeUserFormValues}
            >
            <td>{props.firstName}</td>
            <td>{props.lastName}</td>
            <td>{props.emailAddress}</td>
            <td>{props.address}</td>
        </TableRow>
    );
}

export default memo(UserRow);
