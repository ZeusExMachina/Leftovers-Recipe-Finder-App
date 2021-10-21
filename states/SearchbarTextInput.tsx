// 3rd-party Imports
import React, { useEffect, useMemo, useState, useContext } from 'react'
// States
import { UpdateSearchedIngredients } from './SearchedIngredientsResults'

const searchbarTextInputStateDefaultValue = {
    searchInput: "",
    setSearchInput: (state:string) => {}
};

export const SearchbarTextInput = React.createContext(searchbarTextInputStateDefaultValue);

export default function SearchbarTextInputProvider({ children }) {
    const [searchInput, setSearchInput] = useState<string>("");
    const searchInputProviderValue = useMemo(() => ({searchInput,setSearchInput}), [searchInput,setSearchInput]);

    // Imported states
    const updateSearchedIngredients = useContext(UpdateSearchedIngredients);

    useEffect(() => {
        updateSearchedIngredients(searchInput);
    }, [searchInput]);

    return (
        <SearchbarTextInput.Provider value={searchInputProviderValue}>
            {children}
        </SearchbarTextInput.Provider>
    );
}