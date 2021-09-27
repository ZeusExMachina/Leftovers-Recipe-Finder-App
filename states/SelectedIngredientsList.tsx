// 3rd-party Imports
import React, { useEffect, useMemo, useState } from 'react'

const selectedIngredientsStateDefaultValue = {
    ingredientsList: [] as string[],
    updateIngredientsList: (state:string[]) => {}
};

const updateIngredientsDefaultValue = (ingredient:string, selectedIngredientsStateDefaultValue) => {};

export const SelectedIngredients = React.createContext(selectedIngredientsStateDefaultValue);
export const UpdateSelectedIngredients = React.createContext(updateIngredientsDefaultValue);

export default function IngredientsListProvider({ children }) {
    const [ingredientsList, updateIngredientsList] = useState<string[]>([]);

    const ingredientsListProviderValue = useMemo(() => ({ingredientsList,updateIngredientsList}), [ingredientsList,updateIngredientsList])

    function isInSelectedIngredientsList(ingredient : string) : boolean {
        return ingredientsList.includes(ingredient);
    }

    function useToggleIngredientSelect(ingredient:string, {ingredientsList,updateIngredientsList}) {
        let newSelectedIngredients : string[] = [];
        newSelectedIngredients = newSelectedIngredients.concat(ingredientsList);
        
        if (ingredientsList.includes(ingredient)) {
          // If item is selected, deselect it by removing it from the list
          let indexOfIngredient : number = newSelectedIngredients.indexOf(ingredient);
          if (indexOfIngredient != -1) { newSelectedIngredients.splice(indexOfIngredient, 1); }
          updateIngredientsList(newSelectedIngredients);
        } else {
          // If item is not selected, then add it to the list
          newSelectedIngredients.push(ingredient);
          updateIngredientsList(newSelectedIngredients);
        }
    }

    useEffect(() => {
    console.log("useEffect", ingredientsList);
    }, [ingredientsList])

    return (
        <SelectedIngredients.Provider value={ingredientsListProviderValue}>
            <UpdateSelectedIngredients.Provider value={useToggleIngredientSelect}>
                {children}
            </UpdateSelectedIngredients.Provider>
        </SelectedIngredients.Provider>
    );
}