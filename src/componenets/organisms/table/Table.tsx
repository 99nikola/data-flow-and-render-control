import classes from "./table.module.css";
import { memo } from "react";
import TableRow from "../../atoms/TableRow/TableRow";
import { ReactComponent as DeleteIcon } from "../../../res/delete.svg";

const Table: React.FC<{
    users: Record<string, string | number>[]
}> = ({ users }) => {

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
                        return (
                            <TableRow 
                                key={index}
                                cells={Object.values(user)} 
                                Icon={DeleteIcon}
                                />);
                    })}

                </tbody>
            </table>
        </div>
    )
}

export default memo(Table);
