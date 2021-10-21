// 3rd-party Imports
import React, { useContext, useState } from 'react'
// States
import { CurrentUser } from "../states/CurrentUser";
// Utility
import arraysAreEqual from '../utility/ArraysAreEqual';
// Firebase
import { getUserFavourites, toggleFavouriteIngredient } from '../firebase-access/Firebase_Client';

export const FavouriteIngredients = React.createContext([] as string[]);
export const ToggleFavouriteIngredient = React.createContext(async (ingredientName:string) => {});
export const RefreshFavouriteIngredients = React.createContext(async (username:string) => {});

export default function FavouriteIngredientsProvider({ children }) {
    // Local states
    const [favouriteIngredients, setFavouriteIngredients] = useState<string[]>([]);
    // Imported states
    const currentUser = useContext(CurrentUser);

    async function toggleFavouriteIngredientInFirebase(ingredientName : string) {
        await toggleFavouriteIngredient(ingredientName, currentUser);
        await refreshFavouriteIngredients(currentUser);
    }

    async function refreshFavouriteIngredients(username:string) {
        const favouritesFromFirebase = await getUserFavourites(username);

        if (!arraysAreEqual(favouriteIngredients, favouritesFromFirebase)) {
            setFavouriteIngredients(favouritesFromFirebase);
        }
    }

    return (
        <FavouriteIngredients.Provider value={favouriteIngredients}>
            <ToggleFavouriteIngredient.Provider value={toggleFavouriteIngredientInFirebase}>
                <RefreshFavouriteIngredients.Provider value={refreshFavouriteIngredients}>
                    { children }
                </RefreshFavouriteIngredients.Provider>
            </ToggleFavouriteIngredient.Provider>
        </FavouriteIngredients.Provider>
    );
}