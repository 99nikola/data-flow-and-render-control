import React from "react"

export interface TableHeaderProps {
    text?: string,
    onClick?: any
}

const TableHeader: React.FC<TableHeaderProps> = (props) => {
    return (
        <th onClick={props.onClick}>
            {props.text}
        </th>
    )
}

export default TableHeader
