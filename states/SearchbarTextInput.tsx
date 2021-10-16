// 3rd-party Imports
import React, { useEffect, useMemo, useState, useContext } from 'react'
// States
import { AllIngredients } from './All_Ingredients';
import { SearchedIngredientsResults, UpdateSearchedIngredients } from './SearchedIngredientsResults'

const searchbarTextInputStateDefaultValue = {
    searchInput: "",
    setSearchInput: (state:string) => {}
};

export const SearchbarTextInput = React.createContext(searchbarTextInputStateDefaultValue);

export default function SearchbarTextInputProvider({ children }) {
    const [searchInput, setSearchInput] = useState<string>("");
    const searchInputProviderValue = useMemo(() => ({searchInput,setSearchInput}), [searchInput,setSearchInput]);

    // Imported states
    const {allIngredients, setAllIngredients} = useContext(AllIngredients);
    const {searchedIngredients,setSearchedIngredients} = useContext(SearchedIngredientsResults);
    const updateSearchedIngredients = useContext(UpdateSearchedIngredients);

    useEffect(() => {
        //console.log("SearchbarTextInput useEffect", searchInput);
        updateSearchedIngredients(searchInput, {searchedIngredients,setSearchedIngredients}, {allIngredients, setAllIngredients});
    }, [searchInput]);

    return (
        <SearchbarTextInput.Provider value={searchInputProviderValue}>
            {children}
        </SearchbarTextInput.Provider>
    );
}