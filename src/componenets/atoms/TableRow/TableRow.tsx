import React, { memo } from "react";

export interface TableRowProps {
    cells: Array<string | number>
    Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement> & {
        title?: string | undefined;
    }>
}

const TableRow: React.FC<TableRowProps> = ({ cells, Icon }) => {
    return (
        <tr>
            {cells.map((cell, index) => (
                <td key={index}>
                    {cell}
                </td>
            ))}
            {Icon && (
                <th>
                    <Icon />
                </th>
            )}
        </tr>
    );
}

export default memo(TableRow);
