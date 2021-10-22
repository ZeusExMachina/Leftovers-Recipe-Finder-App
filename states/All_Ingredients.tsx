// 3rd-party Imports
import React, { useContext, useEffect, useState } from 'react';
// Firebase
import getAllIngredients from '../firebase-access/Firebase_Client';

/**
 * This state temporarily stores local entries for all ingredients that exist in Firebase. Loaded on app launch, and only ever updated when the app 
 * is relaunched.
 */

export const AllIngredients = React.createContext(new Map<string,string>()); 

export default function AllIngredientsProvider({ children }) {
    // Local states
    const [allIngredients, setAllIngredients] = useState<Map<string,string>>(new Map<string,string>());

    useEffect(() => {
        getAllIngredients().then(value => { setAllIngredients(value); });
    }, []);

    return (
        <AllIngredients.Provider value={allIngredients}>
            {children}
        </AllIngredients.Provider>
    );
}