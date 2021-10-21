// 3rd-party Imports
import React, { useState, useEffect } from 'react'
// Firebase
import getAllIngredients, { getImageUrlFromStorage } from "../firebase-access/Firebase_Client"

// export const AllIngredientImageUrls = React.createContext(new Map<string,string>());
export const GetUrlOfIngredientImage = React.createContext((ingredientName:string) => { return "" as string|undefined; })

export default function AllIngredientImagesProvider({ children }) {
    const [allIngredientImageUrls, setAllIngredientImageUrls] = useState<Map<string,string>>(new Map<string,string>());

    function getUrlOfIngredientImage(ingredientName : string) : string|undefined {
        return allIngredientImageUrls.get(ingredientName);
    }

    async function initialiseAllImageIngredientUrls(allIngredients : string[]) {
        let mapOfIngredientImageUrls = new Map<string,string>();

        for (let i = 0; i < allIngredients.length; i++) {
            const ingredientName : string = allIngredients[i];
            const ingredientImageUrl : string = await getImageUrlFromStorage(ingredientNameTransform(ingredientName));
            mapOfIngredientImageUrls.set(ingredientName, ingredientImageUrl);
        }

        return mapOfIngredientImageUrls;
    }

    useEffect(() => {
        getAllIngredients().then(value => {
            if (!mapsAreEqual(allIngredientImageUrls, value)) {
                const ingredientNames : string[] = Array.from(value.keys());
                initialiseAllImageIngredientUrls(ingredientNames)
                    .then(value => setAllIngredientImageUrls(value));
            }
        });
    }, [allIngredientImageUrls]);
    
    return (
        <GetUrlOfIngredientImage.Provider value={getUrlOfIngredientImage}>
            { children }
        </GetUrlOfIngredientImage.Provider>
    );
}

function ingredientNameTransform(ingredientName : string) : string {
    return ingredientName.toLowerCase().replace(" ", "-").concat(".png");
}

function mapsAreEqual<K,V>(a:Map<K,V>, b:Map<K,V>) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.size !== b.size) return false;

    a.forEach((value:V, key:K) => {
        if (key !== key || value !== value) return false;
    })
    return true;
}