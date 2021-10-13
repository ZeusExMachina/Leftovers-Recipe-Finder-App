// 3rd-party Imports
import React, { useEffect, useMemo, useState } from 'react'

// function ingredientsMapDefaultValue() : Map<string,string[]> {
//     var map = new Map<string,string[]>();
//     map.set("Meat", ["Beef", "Pork", "Chicken"]);
//     map.set("Vegetables", ["Potato", "Tomato", "Carrot"]);
//     map.set("Fruits", ["Apple", "Banana", "Orange"]);
//     return map;
// }

export const searchbarTextInputStateDefaultValue = {
    allIngredients: new Map<string,string[]>()
                        .set("Meat", ["Beef", "Pork", "Chicken"])
                        .set("Vegetables", ["Potato", "Tomato", "Carrot"])
                        .set("Fruits", ["Apple", "Banana", "Orange"])
                        .set("Dairy", ["Milk", "Cheese", "Yogurt"])
                        .set("Baking", ["Flour", "Sugar", "Sprinkles"])
                        .set("Alcohol", ["Red Wine", "White Wine", "Beer"])
                        .set("Seasonings", ["Parsley", "Cumin", "Basil"])
    setAllIngredients: (state:Map<string,string[]>) => {}
};

export const AllIngredients = React.createContext(searchbarTextInputStateDefaultValue);

export default function AllIngredientsProvider({ children }) {
    const [allIngredients, setAllIngredients] = useState<Map<string,string[]>>(searchbarTextInputStateDefaultValue.allIngredients);

    const allIngredientsProviderValue = useMemo(() => ({allIngredients,setAllIngredients}), [allIngredients,setAllIngredients]);

    function updateAndRefreshAllIngredients({allIngredients,setAllIngredients}) {
        //let new
    }

    useEffect(() => {
        console.log("All_Ingredients useEffect", allIngredients);
    }, [allIngredients]);

    return (
        <AllIngredients.Provider value={allIngredientsProviderValue}>
            {children}
        </AllIngredients.Provider>
    );
}