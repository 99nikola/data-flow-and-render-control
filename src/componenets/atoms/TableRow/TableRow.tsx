import classes from "./tableRow.module.css";
import React, { memo, useCallback, useState } from "react";
import { IIdentifiable } from "../../../typescript/interfaces/Identity";
import { ReactComponent as DeleteIcon } from "../../../res/delete.svg";
import { ReactComponent as EditIcon } from "../../../res/edit.svg";


export interface TableRowProps extends IIdentifiable {
    children: any,
    onDeleteEntity?: (id: string) => void,
    onEditEntity?: (id: string) => void
}

const TableRow: React.FC<TableRowProps> = (props: TableRowProps) => {    
    function onDelete() {
        props.onDeleteEntity!(props.id);
    }

    function onEdit() {
        props.onEditEntity!(props.id);
    }

    return (
        <tr>
            {props.children}
            {typeof props.onEditEntity === "function" && (
                <th className={classes.iconCell}>
                    <div
                        className={classes.iconContainer}
                        onClick={onEdit}
                    >
                        <EditIcon   
                            className={classes.icon}
                            pointerEvents="none"
                        />
                    </div>
                </th>
            )}
            {typeof props.onDeleteEntity === "function" && (
                <th className={classes.iconCell}>
                    <div
                        className={classes.iconContainer}
                        onClick={onDelete}
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
