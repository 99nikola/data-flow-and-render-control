import classes from "./manageUsers.module.css";
import Form from "../../organisms/form/Form";
import Table from "../../organisms/table/Table";
import { useEffect, useState } from "react";
import { IUser } from "../../../typescript/interfaces/User";
import SearchInput from "../../molecules/SearchInput/SearchInput";

const DEFAULT_USERS: IUser[] = [];
const DEFAULT_SEARCH: RegExp = new RegExp('', 'i');

const ManageUsers = () => {


    const [ users, setUsers ] = useState(DEFAULT_USERS);
    const [ search, setSearch ] = useState<RegExp>(DEFAULT_SEARCH);


    return (
        <div className={classes.container}>
            <Form setUsers={setUsers} />
            <div className={classes.usersTable}>
                <SearchInput setSearch={setSearch} />
                <Table users={users} setUsers={setUsers} search={search} />
            </div>
        </div>
    )
}

export default ManageUsers
