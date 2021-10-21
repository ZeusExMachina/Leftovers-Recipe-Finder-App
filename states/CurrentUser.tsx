// 3rd-party Imports
import React, { useState } from "react";
// Firebase
import { validateLogin, addNewUser } from '../firebase-access/Firebase_Client';

export const CurrentUser = React.createContext("")
export const AuthenticateUser = React.createContext((username:string, password:string) => { return Promise.resolve(-1); })
export const CreateNewUser = React.createContext((username:string, password:string) => { return Promise.resolve(-1); })

export default function CurrentUserProvider({ children }) {
    const [currentUser, setCurrentUser] = useState<string>("")

    async function authenticateUser(username:string, password:string) : Promise<number> {
        if (username.length < 1) { return Promise.resolve(1); }
        else if (password.length < 1) { return Promise.resolve(2); }

        const validateLoginResult = await validateLogin(username, password);

        if (validateLoginResult) {
            setCurrentUser(username);
            return Promise.resolve(0);
        } else {
            return Promise.resolve(3);
        }
    }

    async function createUser(username:string, password:string) : Promise<number> {
        if (username.length < 1) { return Promise.resolve(1); }
        else if (password.length < 1) { return Promise.resolve(2); }

        const addNewUserResult = await addNewUser(username, password);

        if (addNewUserResult) {
            setCurrentUser(username);
            return Promise.resolve(0);
        } else {
            return Promise.resolve(3);
        }
    }

    return (
        <CurrentUser.Provider value={currentUser}>
            <AuthenticateUser.Provider value={authenticateUser}>
                <CreateNewUser.Provider value={createUser}>
                    { children }
                </CreateNewUser.Provider>
            </AuthenticateUser.Provider>
        </CurrentUser.Provider>
    );
}