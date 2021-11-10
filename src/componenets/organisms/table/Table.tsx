import classes from "./table.module.css";
import { memo, useCallback } from "react";
import TableRow from "../../atoms/TableRow/TableRow";
import { ReactComponent as DeleteIcon } from "../../../res/delete.svg";

const Table: React.FC<{
    users: Record<string, string | number>[],
    setUsers: React.Dispatch<React.SetStateAction<Record<string, string>[]>>
}> = ({ users, setUsers }) => {

    const deleteHandler = useCallback((event: any) => {
        const id = event.target.id;
        const userToDelete = users.find(user => user.id === id);

        const confirm = window.confirm("Are you sure you want to delete user: " + userToDelete!.firstName);
        if (!confirm)
            return;

        setUsers((users) => users.filter(user => user.id !== id));
    }, [setUsers, users]);

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

                    {users.map((user, index) => {
                        const { id, ...rest } = user;

                        return (
                            <TableRow 
                                key={index}
                                cells={Object.values(rest)} 
                                Icon={DeleteIcon}
                                onClick={deleteHandler}
                                iconId={id as string}
                                />);
                    })}

                </tbody>
            </table>
        </div>
    )
}

export default memo(Table);
