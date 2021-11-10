import classes from "./table.module.css";
import { memo, useCallback } from "react";
import TableRow from "../../atoms/TableRow/TableRow";
import { ReactComponent as DeleteIcon } from "../../../res/delete.svg";
import { IUser } from "../../../typescript/interfaces/User";

const Table: React.FC<{
    users: IUser[],
    setUsers: React.Dispatch<React.SetStateAction<IUser[]>>;
}> = ({ users, setUsers }) => {

    const deleteHandler = useCallback((user: Partial<IUser>) => {
        const id = user.id;
        const label = user.firstName || id || "";

        const confirm = window.confirm("Are you sure you want to delete user: " + label);
        if (!confirm) return;

        setUsers((users) => users.filter(user => user.id !== id));
    }, [setUsers]);

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
                            <TableRow 
                                key={user.id}
                                {...user}
                                Icon={DeleteIcon}
                                onClick={deleteHandler}
                            />);
                    })}

                </tbody>
            </table>
        </div>
    )
}

export default memo(Table);
