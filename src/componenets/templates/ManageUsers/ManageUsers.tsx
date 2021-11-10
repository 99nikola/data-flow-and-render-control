import classes from "./manageUsers.module.css";
import Form from "../../organisms/form/Form";
import Table from "../../organisms/table/Table";
import { useState } from "react";

const DEFAULT_USERS: Record<string, string>[] = [];

const ManageUsers = () => {

    const [ users, setUsers ] = useState(DEFAULT_USERS);

    return (
        <div className={classes.container}>
            <Form setUsers={setUsers}/>
            <Table users={users} setUsers={setUsers} />
        </div>
    )
}

export default ManageUsers
