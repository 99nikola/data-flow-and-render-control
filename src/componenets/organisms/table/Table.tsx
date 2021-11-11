import classes from "./table.module.css";
import { memo } from "react";
import { IUser } from "../../../typescript/interfaces/User";
import UserRow from "../../molecules/UserRow/UserRow";

const Table: React.FC<{
    users: IUser[],
    setUsers: React.Dispatch<React.SetStateAction<IUser[]>>;
    search: RegExp
}> = ({ users, setUsers, search }) => {
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
                        if (search.source.length === 0 || search.test(user.firstName))
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
    );
}

export default memo(Table);
