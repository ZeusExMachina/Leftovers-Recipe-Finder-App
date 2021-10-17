// 3rd-party Imports
import React, { useState, useMemo, useContext } from "react";
// Firebase
import { validateLogin, addNewUser } from '../firebase-access/Firebase_Client';

export const currentUserStateDefaultValue = {
    currentUser: "",
    setCurrentUser: (state:string) => {}
};

export const CurrentUser = React.createContext(currentUserStateDefaultValue)
export const AuthenticateUser = React.createContext((username:string, password:string, currentUserStateDefaultValue) => { return Promise.resolve(false); })
export const CreateNewUser = React.createContext((username:string, password:string, currentUserStateDefaultValue) => { return Promise.resolve(false); })

export default function CurrentUserProvider({ children }) {
    const [currentUser, setCurrentUser] = useState<string>("")
    const allIngredientsProviderValue = useMemo(() => ({currentUser, setCurrentUser}), [currentUser, setCurrentUser]);

    async function authenticateUser(username:string, password:string, {currentUser, setCurrentUser}) : Promise<boolean> {
        if (await validateLogin(username, password) == true) {
            setCurrentUser(username);
            return Promise.resolve(true);
        }
        return Promise.resolve(false);
    }

    async function createUser(username:string, password:string, {currentUser, setCurrentUser}) : Promise<boolean> {
        const addNewUserResult = await addNewUser(username, password);

        if (addNewUserResult) {
            setCurrentUser(username);
            return Promise.resolve(true);
        }
        return Promise.resolve(false)
    }

    return (
        <CurrentUser.Provider value={allIngredientsProviderValue}>
            <AuthenticateUser.Provider value={authenticateUser}>
                <CreateNewUser.Provider value={createUser}>
                    { children }
                </CreateNewUser.Provider>
            </AuthenticateUser.Provider>
        </CurrentUser.Provider>
    );
}