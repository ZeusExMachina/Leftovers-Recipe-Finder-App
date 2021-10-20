// 3rd-party Imports
import React, { useEffect, useState } from 'react'
// Firebase
import getAllIngredients from '../firebase-access/Firebase_Client';

export const AllIngredients = React.createContext(new Map<string,string>()); 

export default function AllIngredientsProvider({ children }) {
    const [allIngredients, setAllIngredients] = useState<Map<string,string>>(new Map<string,string>());

    useEffect(() => {
        getAllIngredients().then(value => { setAllIngredients(value); });
        // console.log("AllIngredients useEffect", allIngredients);
    }, []);

    return (
        <AllIngredients.Provider value={allIngredients}>
            {children}
        </AllIngredients.Provider>
    );
}