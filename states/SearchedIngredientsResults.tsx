// 3rd-party Imports
import React, { useEffect, useMemo, useState } from 'react'

const searchedIngredientsStateDefaultValue = {
    searchedIngredients: [] as string[],
    setSearchedIngredients: (state:string[]) => {}
};

export const SearchedIngredientsResults = React.createContext(searchedIngredientsStateDefaultValue);

export default function SearchedIngredientsResultsProvider({ children }) {
    const [searchedIngredients, setSearchedIngredients] = useState<string[]>([]);

    const searchedIngredientsProviderValue = useMemo(() => ({searchedIngredients,setSearchedIngredients}), [searchedIngredients,setSearchedIngredients]);

    useEffect(() => {
        console.log("SearchbarTextInput useEffect", searchedIngredients);
    }, [searchedIngredients]);

    return (
        <SearchedIngredientsResults.Provider value={searchedIngredientsProviderValue}>
            {children}
        </SearchedIngredientsResults.Provider>
    );
}