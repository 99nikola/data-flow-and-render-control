import classes from "./manageUsers.module.css";
import UserForm, { DEFAULT_ERROR_VALUES, FormType, FormValidationState } from "../../organisms/form/UserForm";
import { useEffect, useMemo, useState } from "react";
import { IUser } from "../../../typescript/interfaces/User";
import SearchInput from "../../molecules/SearchInput/SearchInput";
import nextId from "react-id-generator";
import UserTable from "../../organisms/table/UserTable";
import { useSortedAndFilteredData } from "../../../hooks/sortAdnFilterData";

const DEFAULT_USERS: IUser[] = [];
const DEFAULT_SEARCH: RegExp = new RegExp('', 'i');

 
let DEFAULT_USER_INFO0: FormType = {
    firstName: "Nikola",
    lastName: "Popovic",
    emailAddress: "nikola@gmail.com",
    address: "adresa"
}
let DEFAULT_USER_INFO: FormType = {
    firstName: "",
    lastName: "",
    emailAddress: "",
    address: ""
}

const ManageUsers = () => {

    const [ users, setUsers ] = useState(DEFAULT_USERS);
    const [ search, setSearch ] = useState<RegExp>(DEFAULT_SEARCH);
    const [ userInfo, setUserInfo ] = useState(DEFAULT_USER_INFO);
    const [ sortBy, setSortBy ] = useState<keyof IUser>("firstName");
    const [ formValidState, setFormValidState ] = useState<FormValidationState>(FormValidationState.INVALID);
    const [ errors, setErrors ] = useState(DEFAULT_ERROR_VALUES);
    const [ idToEdit, setIdToEdit ] = useState<string>();


    const processedUsers = useSortedAndFilteredData({
        original: users,
        filterBy: "firstName",
        filterValue: search,
        sortBy
    });

    const onSubmit = () => {

        if (idToEdit) {
            setUsers(users => users.map(user => {
                if (user.id !== idToEdit)
                    return user;

                return {
                    id: user.id,
                    firstName: userInfo.firstName,
                    lastName: userInfo.lastName,
                    emailAddress: userInfo.emailAddress,
                    address: userInfo.address
                }
            }));
            return;
        }

        setUsers(users => ([
            ...users,
            {
                ...userInfo,
                id: nextId()
            }
        ]));

        setUserInfo(DEFAULT_USER_INFO);
    }

    return (
        <div className={classes.container}>
            <UserForm
                errors={errors}
                setErrors={setErrors} 
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                formValidState={formValidState}
                setFormValidState={setFormValidState}
                onSubmit={onSubmit}
                />
            <div className={classes.usersTable}>
                <SearchInput setSearch={setSearch} />
                <UserTable 
                    users={processedUsers}
                    setUsers={setUsers} 
                    setFormValidState={setFormValidState}
                    setUserInfo={setUserInfo}
                    setIdToEdit={setIdToEdit}
                    />
            </div>
        </div>
    )
}

export default ManageUsers
