// 3rd-party Imports
import React, { useState, useEffect } from 'react'
// Firebase
import { getUserRecent } from '../firebase-access/Firebase_Client';

export const GetRecentIngredientsAsArray = React.createContext(() => { return [] as string[]; });
export const RefreshRecentIngredients = React.createContext(async (username:string) => {});

export default function RecentIngredientsProvider({ children }) {
    const [recentIngredients, setRecentIngredients] = useState(new Map<string,number>())

    useEffect(() => {
        //console.log("RecentIngredients useEffect", recentIngredients);
    }, [recentIngredients]);

    function getRecentIngredientsAsArray() : string[] {
        return Array.from(recentIngredients.keys());
    }

    async function refreshRecentIngredients(username:string) {
        const recentFromFirebase = await getUserRecent(username);

        if (!mapsAreEqual(recentIngredients, recentFromFirebase)) {
            setRecentIngredients(recentFromFirebase);
        }
    }

    return (
        <GetRecentIngredientsAsArray.Provider value={getRecentIngredientsAsArray}>
            <RefreshRecentIngredients.Provider value={refreshRecentIngredients}>
                { children }
            </RefreshRecentIngredients.Provider>
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