// 3rd-party Imports
import React, { useEffect, useMemo, useState } from 'react'

const searchbarTextInputStateDefaultValue = {
    searchInput: "",
    setSearchInput: (state:string) => {}
};

export const SearchbarTextInput = React.createContext(searchbarTextInputStateDefaultValue);

export default function SearchbarTextInputProvider({ children }) {
    const [searchInput, setSearchInput] = useState<string>("");

    const searchInputProviderValue = useMemo(() => ({searchInput,setSearchInput}), [searchInput,setSearchInput]);

    useEffect(() => {
        //console.log("SearchbarTextInput useEffect", searchInput);
    }, [searchInput]);

    return (
        <SearchbarTextInput.Provider value={searchInputProviderValue}>
            {children}
        </SearchbarTextInput.Provider>
    );
}