import classes from "./manageUsers.module.css";
import UserForm, { DEFAULT_ERROR_VALUES, FormType, FormValidationState } from "../../organisms/form/UserForm";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { IUser } from "../../../typescript/interfaces/User";
import SearchInput from "../../molecules/SearchInput/SearchInput";
import nextId from "react-id-generator";
import UserTable from "../../organisms/table/UserTable";
import { useSortedAndFilteredData } from "../../../hooks/sortAdnFilterData";

const DEFAULT_USERS: IUser[] = [];
const DEFAULT_SEARCH: RegExp = new RegExp('', 'i');

let DEFAULT_USER_INFO: FormType = {
    firstName: "",
    lastName: "",
    emailAddress: "",
    address: ""
}

const SORT_BY = {
    name: "firstName",
    asc: 1  // 1 or -1
}

const ManageUsers = () => {

    const [ users, setUsers ] = useState(DEFAULT_USERS);
    const [ search, setSearch ] = useState<RegExp>(DEFAULT_SEARCH);
    const [ userInfo, setUserInfo ] = useState(DEFAULT_USER_INFO);
    const [ sortBy, setSortBy ] = useState<Record<string, any>>(SORT_BY);
    const [ formValidState, setFormValidState ] = useState<FormValidationState>(FormValidationState.INVALID);
    const [ errors, setErrors ] = useState(DEFAULT_ERROR_VALUES);
    const [ idToEdit, setIdToEdit ] = useState<string>();


    const processedUsers = useSortedAndFilteredData({
        original: users,
        filterBy: "firstName",
        filterValue: search,
        sortBy
    });

    const updateOrCreate = useCallback(() => {
        if (idToEdit) {
            setUsers(users => users.map(user => {
                if (user.id !== idToEdit)
                    return user;

                return {
                    id: user.id,
                    ...userInfo
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
    }, [idToEdit, userInfo]);

    const onReset = useCallback(() => {
        setFormValidState(FormValidationState.INVALID);
        setErrors(DEFAULT_ERROR_VALUES);
        setIdToEdit(undefined);
        setUserInfo(DEFAULT_USER_INFO);
    }, []);

    const onSubmit = useCallback(() => {

        updateOrCreate();  

        setFormValidState(FormValidationState.INVALID);
        setUserInfo(DEFAULT_USER_INFO);
        
    }, [updateOrCreate])

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
                onReset={onReset}
                editLabel={idToEdit ? "Edit" : undefined}
                />
            <div className={classes.usersTable}>
                <SearchInput setSearch={setSearch} />
                <UserTable 
                    users={processedUsers}
                    setUsers={setUsers} 
                    setFormValidState={setFormValidState}
                    setUserInfo={setUserInfo}
                    setIdToEdit={setIdToEdit}
                    setSortBy={setSortBy}
                    />
            </div>
        </div>
    )
}

export default memo(ManageUsers);
