// 3rd-party Imports
import React, { useEffect, useMemo, useState } from 'react'

const favouriteIngredientsStateDefaultValue = {
    favouriteIngredients: [] as string[],
    setFavouriteIngredients: (state:string[]) => {}
};

export const FavouriteIngredients = React.createContext(favouriteIngredientsStateDefaultValue);

export default function FavouriteIngredientsProvider({ children }) {
    const [favouriteIngredients, setFavouriteIngredients] = useState<string[]>([]);

    const favouriteIngredientsProviderValue = useMemo(() => ({favouriteIngredients, setFavouriteIngredients}), [favouriteIngredients, setFavouriteIngredients]);

    useEffect(() => {
        console.log("FavouriteIngredients useEffect", favouriteIngredients);
    }, [favouriteIngredients])

    return (
        <FavouriteIngredients.Provider value={favouriteIngredientsProviderValue}>
            { children }
        </FavouriteIngredients.Provider>
    );
}