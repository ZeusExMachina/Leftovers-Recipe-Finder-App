// 3rd-party Imports
import React, { useEffect, useState, useContext } from 'react'
// States
import { AllIngredients } from './All_Ingredients';

export const SearchedIngredientsResults = React.createContext([] as string[]);
export const UpdateSearchedIngredients = React.createContext((searchQuery:string) => {});

export default function SearchedIngredientsResultsProvider({ children }) {
    // Local states
    const [searchedIngredients, setSearchedIngredients] = useState<string[]>([] as string[]);

    // Imported states
    const allIngredients = useContext(AllIngredients);

    function updateSearchedIngredients(searchQuery : string) {
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
        //console.log("SearchedIngredientsResults useEffect", searchedIngredients);
    }, [searchedIngredients]);

    return (
        <SearchedIngredientsResults.Provider value={searchedIngredients}>
            <UpdateSearchedIngredients.Provider value={updateSearchedIngredients}>
                {children}
            </UpdateSearchedIngredients.Provider>
        </SearchedIngredientsResults.Provider>
    );
}