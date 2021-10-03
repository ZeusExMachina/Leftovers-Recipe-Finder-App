// 3rd-party Imports
import React, { useEffect, useMemo, useState } from 'react'

export default function IngredientsListProvider({ children }) {
    const [allIngredients, setAllIngredients] = useState<string[]>([]);

    const searchedIngredientsProviderValue = useMemo(() => ({searchedIngredients,setSearchedIngredients}), [searchedIngredients,setSearchedIngredients]);

    function updateAndRefreshAllIngredients({ingredientsList,updateIngredientsList}) {
        let new
    }

    return (

    );
}