// 3rd-party Imports
import React, { useState, useContext } from 'react'
// States
import { CurrentUser } from "../states/CurrentUser";
// Firebase
import { getUserRecent, updateRecentList } from '../firebase-access/Firebase_Client';

export const GetRecentIngredientsAsArray = React.createContext(() => { return [] as string[]; });
export const UpdateRecentList = React.createContext(async (mostRecentSearch:string[]) => {});
export const RefreshRecentIngredients = React.createContext(async (username:string) => {});

export default function RecentIngredientsProvider({ children }) {
    // Local states
    const [recentIngredients, setRecentIngredients] = useState(new Map<string,number>())
    // Imported states
    const currentUser = useContext(CurrentUser);

    function getRecentIngredientsAsArray() : string[] {
        return Array.from(recentIngredients.keys());
    }

    async function updateRecentListInFirebase(mostRecentlySearchedIngredients : string[]) {
        await updateRecentList(mostRecentlySearchedIngredients, currentUser);
        await refreshRecentIngredients(currentUser);
    }

    async function refreshRecentIngredients(username:string) {
        const recentFromFirebase = await getUserRecent(username);

        if (!mapsAreEqual(recentIngredients, recentFromFirebase)) {
            setRecentIngredients(recentFromFirebase);
        }
    }

    return (
        <GetRecentIngredientsAsArray.Provider value={getRecentIngredientsAsArray}>
            <UpdateRecentList.Provider value={updateRecentListInFirebase}>
                <RefreshRecentIngredients.Provider value={refreshRecentIngredients}>
                    { children }
                </RefreshRecentIngredients.Provider>
            </UpdateRecentList.Provider>
        </GetRecentIngredientsAsArray.Provider>
    );
}

function mapsAreEqual<K,V>(a:Map<K,V>, b:Map<K,V>) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.size !== b.size) return false;

    a.forEach((value:V, key:K) => {
        if (key !== key || value !== value) return false;
    })
    return true;
}