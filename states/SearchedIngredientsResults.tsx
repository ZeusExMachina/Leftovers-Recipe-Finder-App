// 3rd-party Imports
import React, { useEffect, useMemo, useState, useContext } from 'react'
import allIngredientsStateDefaultValue from "../states/All_Ingredients"

const searchedIngredientsStateDefaultValue = {
    searchedIngredients: [] as string[],
    setSearchedIngredients: (state:string[]) => {}
};

const updateSearchedIngredientsDefaultValue = (searchQuery:string, searchedIngredientsStateDefaultValue, allIngredientsStateDefaultValue) => {};

export const SearchedIngredientsResults = React.createContext(searchedIngredientsStateDefaultValue);
export const UpdateSearchedIngredients = React.createContext(updateSearchedIngredientsDefaultValue);

export default function SearchedIngredientsResultsProvider({ children }) {
    const [searchedIngredients, setSearchedIngredients] = useState<string[]>(searchedIngredientsStateDefaultValue.searchedIngredients);

    const searchedIngredientsProviderValue = useMemo(() => ({searchedIngredients,setSearchedIngredients}), [searchedIngredients,setSearchedIngredients]);

    function updateSearchedIngredients(searchQuery:string, {searchedIngredients,setSearchedIngredients}, {allIngredients,setAllIngredients}) {
        if (searchQuery.length < 1) {
            // If nothing is typed into the search bar, then no ingredients are returned as results
            setSearchedIngredients([]);
        } else {
            // Otherwise, search for ingredients from All_Ingredients and display them
            let searchResults : string[] = [];
            allIngredients.forEach((category:string, ingredient:string) => {
                if (ingredient.startsWith(searchQuery)) {
                    searchResults.push(ingredient);
                }
            });
            setSearchedIngredients(searchResults);
        }
    }

    useEffect(() => {
        console.log("SearchedIngredientsResults useEffect", searchedIngredients);
    }, [searchedIngredients]);

    return (
        <SearchedIngredientsResults.Provider value={searchedIngredientsProviderValue}>
            <UpdateSearchedIngredients.Provider value={updateSearchedIngredients}>
                {children}
            </UpdateSearchedIngredients.Provider>
        </SearchedIngredientsResults.Provider>
    );
}