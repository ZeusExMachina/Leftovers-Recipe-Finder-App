// 3rd-party Imports
import React, { useState, useMemo, useEffect } from 'react'
// Firebase
import { getUserRecent } from '../firebase-access/Firebase_Client';

const recentIngredientsStateDefaultValue = {
    recentIngredients: new Map<string,number>(),
    setRecentIngredients: (state:Map<string,number>) => {}
};

const getRecentIngredientsAsArrayDefaultValue = () => { return []; }
const refreshRecentIngredientsDefaultValue = async (username:string, setRecentIngredients) => {}

export const RecentIngredients = React.createContext(recentIngredientsStateDefaultValue);
export const GetRecentIngredientsAsArray = React.createContext(getRecentIngredientsAsArrayDefaultValue);
export const RefreshRecentIngredients = React.createContext(refreshRecentIngredientsDefaultValue);

export default function RecentIngredientsProvider({ children }) {
    const [recentIngredients, setRecentIngredients] = useState(new Map<string,number>())
    const recentIngredientsProviderValue = useMemo(() => ({recentIngredients, setRecentIngredients}), [recentIngredients, setRecentIngredients]);

    useEffect(() => {
        //console.log("RecentIngredients useEffect", recentIngredients);
    }, [recentIngredients]);

    function getRecentIngredientsAsArray() : string[] {
        return Array.from(recentIngredients.keys());
    }

    async function refreshRecentIngredients(username:string, setRecentIngredientsFunc:(faves:Map<string,number>)=>void) {
        const recentFromFirebase = await getUserRecent(username);

        if (!mapsAreEqual(recentIngredients, recentFromFirebase)) {
            setRecentIngredientsFunc(recentFromFirebase);
        }
    }

    return (
        <RecentIngredients.Provider value={recentIngredientsProviderValue}>
            <GetRecentIngredientsAsArray.Provider value={getRecentIngredientsAsArray}>
                <RefreshRecentIngredients.Provider value={refreshRecentIngredients}>
                    { children }
                </RefreshRecentIngredients.Provider>
            </GetRecentIngredientsAsArray.Provider>
        </RecentIngredients.Provider>
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