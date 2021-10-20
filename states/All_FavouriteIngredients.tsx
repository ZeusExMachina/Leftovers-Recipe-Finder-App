// 3rd-party Imports
import React, { useState, useMemo, useEffect } from 'react'
// Firebase
import { getUserFavourites } from '../firebase-access/Firebase_Client';

const favouriteIngredientsStateDefaultValue = {
    favouriteIngredients: [] as string[],
    setFavouriteIngredients: (state:string[]) => {}
};

const refreshFavouriteIngredientsDefaultValue = async (username:string, setFavouriteIngredients) => {}

export const FavouriteIngredients = React.createContext(favouriteIngredientsStateDefaultValue);
export const RefreshFavouriteIngredients = React.createContext(refreshFavouriteIngredientsDefaultValue);

export default function FavouriteIngredientsProvider({ children }) {
    const [favouriteIngredients, setFavouriteIngredients] = useState<string[]>([]);
    const favouriteIngredientsProviderValue = useMemo(() => ({favouriteIngredients, setFavouriteIngredients}), [favouriteIngredients, setFavouriteIngredients]);

    useEffect(() => {
        //console.log("FavouriteIngredients useEffect", favouriteIngredients);
    }, [favouriteIngredients])

    async function refreshFavouriteIngredients(username:string, setFavouriteIngredientsFunc:(faves:string[])=>void) {
        const favouritesFromFirebase = await getUserFavourites(username);

        if (!arraysAreEqual(favouriteIngredients, favouritesFromFirebase)) {
            setFavouriteIngredientsFunc(favouritesFromFirebase);
        }
    }

    return (
        <FavouriteIngredients.Provider value={favouriteIngredientsProviderValue}>
            <RefreshFavouriteIngredients.Provider value={refreshFavouriteIngredients}>
                { children }
            </RefreshFavouriteIngredients.Provider>
        </FavouriteIngredients.Provider>
    );
}

function arraysAreEqual(a:string[], b:string[]) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
}