// 3rd-party Imports
import React, { useState } from 'react'

export const SelectedIngredients = React.createContext([] as string[]);
export const ClearAllSelectedIngredients = React.createContext(() => {})
export const UpdateSelectedIngredients = React.createContext((ingredient:string) => {});

export default function IngredientsListProvider({ children }) {
    const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

    function clearSelectedIngredients() {
        setSelectedIngredients([]);
    }

    function toggleIngredientSelect(ingredient:string) {
        let newSelectedIngredients : string[] = [];
        newSelectedIngredients = newSelectedIngredients.concat(selectedIngredients);
        
        if (selectedIngredients.includes(ingredient)) {
          // If item is selected, deselect it by removing it from the list
          let indexOfIngredient : number = newSelectedIngredients.indexOf(ingredient);
          if (indexOfIngredient != -1) { newSelectedIngredients.splice(indexOfIngredient, 1); }
          setSelectedIngredients(newSelectedIngredients);
        } else {
          // If item is not selected, then add it to the list
          newSelectedIngredients.push(ingredient);
          setSelectedIngredients(newSelectedIngredients);
        }
    }

    return (
        <SelectedIngredients.Provider value={selectedIngredients}>
            <ClearAllSelectedIngredients.Provider value={clearSelectedIngredients}>
                <UpdateSelectedIngredients.Provider value={toggleIngredientSelect}>
                    {children}
                </UpdateSelectedIngredients.Provider>
            </ClearAllSelectedIngredients.Provider>
        </SelectedIngredients.Provider>
    );
}