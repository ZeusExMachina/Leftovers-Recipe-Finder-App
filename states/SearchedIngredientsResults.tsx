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

    //const 

    function updateSearchedIngredients(searchQuery:string, {searchedIngredients,setSearchedIngredients}) {
        if (searchQuery.length < 1) {
            // If nothing is typed into the search bar, then no ingredients are returned as results
            setSearchedIngredients([]);
        } else {
            // Otherwise, search for ingredients from All_Ingredients and display them
            //setSearchedIngredients()
        }
    }

    useEffect(() => {
        console.log("SearchedIngredientsResults useEffect", searchedIngredients);
    }, [searchedIngredients]);

    return (
        <SearchedIngredientsResults.Provider value={searchedIngredientsProviderValue}>
            {children}
        </SearchedIngredientsResults.Provider>
    );
}