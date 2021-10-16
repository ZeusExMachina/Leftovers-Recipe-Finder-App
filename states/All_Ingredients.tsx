// 3rd-party Imports
import React, { useEffect, useMemo, useState } from 'react'
// Firebase
import getAllIngredients from '../firebase-access/Firebase_Client';

const allIngredientsStateDefaultValue = {
    allIngredients: new Map<string,string>().set("Default", "value"),
    setAllIngredients: (state:Map<string,string>) => {}
};

export const AllIngredients = React.createContext(allIngredientsStateDefaultValue); 

export default function AllIngredientsProvider({ children }) {
    const [allIngredients, setAllIngredients] = useState<Map<string,string>>(allIngredientsStateDefaultValue.allIngredients);

    const allIngredientsProviderValue = useMemo(() => ({allIngredients,setAllIngredients}), [allIngredients,setAllIngredients]);

    useEffect(() => {
        getAllIngredients().then(value => { setAllIngredients(value); console.log("AllIngredients useEffect inner", allIngredients); });
        console.log("AllIngredients useEffect", allIngredients);
    }, []);

    return (
        <AllIngredients.Provider value={allIngredientsProviderValue}>
            {children}
        </AllIngredients.Provider>
    );
}