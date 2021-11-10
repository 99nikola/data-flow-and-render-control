import classes from "./table.module.css";
import { memo } from "react";
import { IUser } from "../../../typescript/interfaces/User";
import UserRow from "../../molecules/UserRow/UserRow";

const Table: React.FC<{
    users: IUser[],
    setUsers: React.Dispatch<React.SetStateAction<IUser[]>>;
}> = ({ users, setUsers }) => {
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

                    {users.map((user) => {
                        return (
                            <UserRow 
                                key={user.id}
                                {...user}
                                deleteEntity={setUsers}
                            />);
                    })}

                </tbody>
            </table>
        </div>
    )
}

export default memo(Table);
