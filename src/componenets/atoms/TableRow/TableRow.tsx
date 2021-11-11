import classes from "./tableRow.module.css";
import React, { memo, useCallback, useState } from "react";
import { IIdentifiable } from "../../../typescript/interfaces/Identity";
import { ReactComponent as DeleteIcon } from "../../../res/delete.svg";

export interface TableRowProps extends IIdentifiable {
    children: any,
    onDeleteEntity?: (id: string) => void,
}

const TableRow: React.FC<TableRowProps> = (props: TableRowProps) => {    
    function onClick() {
        props.onDeleteEntity!(props.id);
    }

    return (
        <tr>
            {props.children}
            {typeof props.onDeleteEntity == "function" && (
                <th className={classes.iconCell}>
                    <div
                        className={classes.iconContainer}
                        onClick={onClick}
                    >
                        <DeleteIcon   
                            className={classes.icon}
                            pointerEvents="none"
                        />
                    </div>
                </th>
            )}
        </tr>
    );
}

export default TableRow;
