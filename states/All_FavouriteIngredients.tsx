// 3rd-party Imports
import React, { useState } from 'react'
// Firebase
import { getUserFavourites } from '../firebase-access/Firebase_Client';

export const FavouriteIngredients = React.createContext([] as string[]);
export const RefreshFavouriteIngredients = React.createContext(async (username:string) => {});

export default function FavouriteIngredientsProvider({ children }) {
    const [favouriteIngredients, setFavouriteIngredients] = useState<string[]>([]);

    async function refreshFavouriteIngredients(username:string) {
        const favouritesFromFirebase = await getUserFavourites(username);

        if (!arraysAreEqual(favouriteIngredients, favouritesFromFirebase)) {
            setFavouriteIngredients(favouritesFromFirebase);
        }
    }

    return (
        <FavouriteIngredients.Provider value={favouriteIngredients}>
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