import classes from "./table.module.css";
import React, { memo, useCallback, useMemo } from "react";
import { IUser } from "../../../typescript/interfaces/User";
import UserRow from "../../molecules/UserRow/UserRow";
import { FormType, FormValidationState } from "../form/UserForm";
import UserTableHeader, { ESortDirection } from "../../molecules/UserTableHeader/UserTableHeader";

const firstName = (
    JSON.stringify({
        name: "firstName",
        asc: 1
    }));

const lastName = (
    JSON.stringify({
        name: "firstName",
        asc: 1
    }));

const emailAddress = (
    JSON.stringify({
        name: "firstName",
        asc: 1
    }));

const address = (
    JSON.stringify({
        name: "firstName",
        asc: 1
    }));

const UserTable: React.FC<{
    users: IUser[],
    setUsers: React.Dispatch<React.SetStateAction<IUser[]>>;
    setFormValidState: React.Dispatch<React.SetStateAction<FormValidationState>>,
    setUserInfo: React.Dispatch<React.SetStateAction<FormType>>,
    setIdToEdit: React.Dispatch<React.SetStateAction<string | undefined>>,
    setSortBy: React.Dispatch<React.SetStateAction<Record<string, any>>>
}> = (props) => {

    const sortByHandler = useCallback((sortBy: keyof IUser, sortDirection?: ESortDirection) => {
        props.setSortBy({
            name: sortBy,
            asc: sortDirection
        })
    }, []);

    return (
        <div className={classes.container}>
            <table className={classes.item}>
                <tbody>
                    <tr>
                        <UserTableHeader 
                            text="Frist Name" 
                            name="firstName" 
                            onClick={sortByHandler}
                            />

                        <UserTableHeader 
                            text="Last Name" 
                            name="lastName" 
                            onClick={sortByHandler}
                            />

                        <UserTableHeader 
                            text="Email Address" 
                            name="emailAddress" 
                            onClick={sortByHandler}
                            />

                        <UserTableHeader 
                            text="Address" 
                            name="address" 
                            onClick={sortByHandler}
                            />
                    </tr>

                    {props.users.map((user) => {
                        return (
                            <UserRow 
                                key={user.id}
                                {...user}
                                updateUsers={props.setUsers}
                                setUserInfo={props.setUserInfo}
                                setFormValidState={props.setFormValidState}
                                setIdToEdit={props.setIdToEdit}
                            />);
                    })}

                </tbody>
            </table>
        </div>
    );
}

export default memo(UserTable);