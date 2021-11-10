import classes from "./manageUsers.module.css";
import Form from "../../organisms/form/Form";
import Table from "../../organisms/table/Table";
import { useState } from "react";
import { IUser } from "../../../typescript/interfaces/User";

const DEFAULT_USERS: IUser[] = [];


/**
 * 1. Napravi novi input iznad tabele.
 * 2. Kada kucas tekst u input, nakon 500ms filtriraj podatke tabele po first name-u.
 *      Za filtraciju koristis .contains`
 * 
 * Vodi racuna o re-renderu
 * 
 * - Kada kucas samo se input menja.
 * - Kada se filtrira (posle 500ms) samo se tabela menja.
 * 
 *  const inputValue = "bc";
    const re = new RegExp(inputValue, "i");
    if ("abcd".match(re)) {
        // ukljuci u tabelu.
    }
 * 
 */
const ManageUsers = () => {


    const [ users, setUsers ] = useState(DEFAULT_USERS);

    return (
        <div className={classes.container}>
            <Form setUsers={setUsers} />
            <Table users={users} setUsers={setUsers} />
        </div>
    )
}

export default ManageUsers
