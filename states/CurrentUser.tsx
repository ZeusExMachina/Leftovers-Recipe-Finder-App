// 3rd-party Imports
import React, { useState } from "react";
// Firebase
import { validateLogin, addNewUser } from '../firebase-access/Firebase_Client';

export const CurrentUser = React.createContext("")
export const AuthenticateUser = React.createContext((username:string, password:string) => { return Promise.resolve(false); })
export const CreateNewUser = React.createContext((username:string, password:string) => { return Promise.resolve(false); })

export default function CurrentUserProvider({ children }) {
    const [currentUser, setCurrentUser] = useState<string>("")

    async function authenticateUser(username:string, password:string) : Promise<boolean> {
        if (await validateLogin(username, password) == true) {
            setCurrentUser(username);
            return Promise.resolve(true);
        }
        return Promise.resolve(false);
    }

    async function createUser(username:string, password:string) : Promise<boolean> {
        const addNewUserResult = await addNewUser(username, password);

        if (addNewUserResult) {
            setCurrentUser(username);
            return Promise.resolve(true);
        }
        return Promise.resolve(false)
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