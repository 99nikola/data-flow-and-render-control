import React from "react"
import ManageUsers from "../componenets/templates/ManageUsers/ManageUsers";

export enum EFactoryTypes {
    TManageUsers,
    TSomeOtherContent
}

interface MainFactoryProps {
    type:  EFactoryTypes
}

const MainFactory: React.FC<MainFactoryProps> = (props) => {
    switch (props.type) {
        case EFactoryTypes.TManageUsers:
            return (
                <ManageUsers />
            );
        case EFactoryTypes.TSomeOtherContent:
            return (
                <h1>Some other content</h1>
            );
        default:
            throw "Something went wrong, unknown type";
    }
}

export default MainFactory;
