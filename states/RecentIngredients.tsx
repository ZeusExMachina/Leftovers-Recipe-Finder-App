// 3rd-party Imports
import React, { useState, useContext } from 'react'
// States
import { CurrentUser } from "../states/CurrentUser";
// Utility
import mapsAreEqual from '../utility/MapsAreEqual';
// Firebase
import { getUserRecent, updateRecentList } from '../firebase-access/Firebase_Client';

/**
 * This state stores all ingredients recently used in recipe searches. It stays in sync with the current user's "recent" collection in Firebase.
 */

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