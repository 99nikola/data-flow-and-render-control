import classes from "./tableRow.module.css";
import React, { memo } from "react";
import { IUser } from "../../../typescript/interfaces/User";

export interface TableRowProps extends IUser {
    Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement> & {
        title?: string | undefined;
    }>,
    onClick(user: Partial<IUser>): void;
}

const TableRow: React.FC<TableRowProps> = (props: TableRowProps) => {
    function onClick() {
        props.onClick({
            id: props.id,
            firstName: props.firstName,
        });
    }

    return (
        <tr>
            <td>{props.firstName}</td>
            <td>{props.lastName}</td>
            <td>{props.emailAddress}</td>
            <td>{props.address}</td>
            {props.Icon && (
                <th className={classes.iconCell}>
                    <div
                        className={classes.iconContainer}
                        onClick={onClick}
                    >
                        <props.Icon   
                            className={classes.icon}
                            pointerEvents="none"
                        />
                    </div>
                </th>
            )}
        </tr>
    );
}

export default memo(TableRow);
