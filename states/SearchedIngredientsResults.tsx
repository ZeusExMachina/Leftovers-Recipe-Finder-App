// 3rd-party Imports
import React, { useEffect, useMemo, useState, useContext } from 'react'
//import searchbarTextInputStateDefaultValue from "../states/All_Ingredients"
import { UpdateSelectedIngredients } from './SelectedIngredientsList';

const searchedIngredientsStateDefaultValue = {
    searchedIngredients: [] as string[],
    setSearchedIngredients: (state:string[]) => {}
};

const updateSearchedIngredientsDefaultValue = (searchQuery:string, searchedIngredientsStateDefaultValue, searchbarTextInputStateDefaultValue) => {};

export const SearchedIngredientsResults = React.createContext(searchedIngredientsStateDefaultValue);
export const UpdateSearchedIngredients = React.createContext(updateSearchedIngredientsDefaultValue);

export default function SearchedIngredientsResultsProvider({ children }) {
    const [searchedIngredients, setSearchedIngredients] = useState<string[]>([]);

    const searchedIngredientsProviderValue = useMemo(() => ({searchedIngredients,setSearchedIngredients}), [searchedIngredients,setSearchedIngredients]);

    function updateSearchedIngredients(searchQuery:string, {searchedIngredients,setSearchedIngredients}, {allIngredients,setAllIngredients}) {
        if (searchQuery.length < 1) {
            // If nothing is typed into the search bar, then no ingredients are returned as results
            setSearchedIngredients([]);
        } else {
            // Otherwise, search for ingredients from All_Ingredients and display them
            let searchResults : string[] = [];
            allIngredients.forEach((value: string[], key: string) => {
                for (let i = 0; i < value.length; i++) {
                    if (value[i].startsWith(searchQuery)) {
                        searchResults.push(value[i]);
                    }
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
            <UpdateSelectedIngredients.Provider value={updateSearchedIngredients}>
                {children}
            </UpdateSelectedIngredients.Provider>
        </SearchedIngredientsResults.Provider>
    );
}