import classes from "./table.module.css";
import React, { memo, useMemo } from "react";
import { IUser } from "../../../typescript/interfaces/User";
import UserRow from "../../molecules/UserRow/UserRow";
import { FormType, FormValidationState } from "../form/UserForm";

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


    const sortByHandler = (e: any) => {
        let accessKey = JSON.parse(e.target.accessKey);
        props.setSortBy({
            name: accessKey.name,
            asc: accessKey.asc
        });
        accessKey.asc = -accessKey.asc;
        e.target.accessKey = JSON.stringify(accessKey);
    }

    return (
        <div className={classes.container}>
            <table className={classes.item}>
                <tbody>
                    <tr>
                        <th onClick={sortByHandler} accessKey={firstName}>
                            First Name
                        </th>
                        <th onClick={sortByHandler} accessKey={lastName}>
                            Last Name
                        </th>
                        <th onClick={sortByHandler} accessKey={emailAddress}>
                            Email Address
                        </th>
                        <th onClick={sortByHandler} accessKey={address}>
                            Address
                        </th>
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