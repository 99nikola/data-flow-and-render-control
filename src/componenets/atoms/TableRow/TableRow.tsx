import classes from "./tableRow.module.css";
import React, { memo } from "react";

export interface TableRowProps {
    cells: Array<string | number>
    Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement> & {
        title?: string | undefined;
    }>,
    onClick?: React.MouseEventHandler<HTMLDivElement>
    iconId?: string
}

const TableRow: React.FC<TableRowProps> = ({ cells, Icon, onClick, iconId }) => {
    return (
        <tr>
            {cells.map((cell, index) => (
                <td key={index}>
                    {cell}
                </td>
            ))}
            {Icon && (
                <th className={classes.iconCell}>
                    <div
                        className={classes.iconContainer}
                         onClick={onClick}
                         id={iconId}>
                        <Icon   
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
