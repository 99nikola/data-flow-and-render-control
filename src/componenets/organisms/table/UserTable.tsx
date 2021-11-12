import classes from "./table.module.css";
import React, { memo } from "react";
import { IUser } from "../../../typescript/interfaces/User";
import UserRow from "../../molecules/UserRow/UserRow";
import { FormType, FormValidationState } from "../form/UserForm";

const UserTable: React.FC<{
    users: IUser[],
    setUsers: React.Dispatch<React.SetStateAction<IUser[]>>;
    setFormValidState: React.Dispatch<React.SetStateAction<FormValidationState>>,
    setUserInfo: React.Dispatch<React.SetStateAction<FormType>>,
    setIdToEdit: React.Dispatch<React.SetStateAction<string | undefined>>
}> = (props) => {
    return (
        <div className={classes.container}>
            <table className={classes.item}>
                <tbody>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email Address</th>
                        <th>Address</th>
                        <th>Remove</th>
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