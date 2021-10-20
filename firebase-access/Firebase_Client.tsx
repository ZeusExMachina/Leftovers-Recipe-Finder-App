// Firebase
import { FirestoreDB, FirebaseStorage } from "../firebase";

// ------------------------------------
// Creating new accounts and logging in
// ------------------------------------
export async function validateLogin(username:string, password:string) : Promise<boolean> {
    let userExists = false;

    const usersRef = FirestoreDB.collection("users");
    const usersSnapshot = await usersRef.get();
    usersSnapshot.forEach(async (doc) => {
        if (doc.id == username && doc.get("password") == password && userExists == false) {
            userExists = true;
        }
    });

    return Promise.resolve(userExists);
}

async function userExists(username:string) : Promise<boolean> {
    let userExists = false;

    const usersRef = FirestoreDB.collection("users");
    const usersSnapshot = await usersRef.get();
    usersSnapshot.forEach(async (doc) => {
        if (doc.id == username && userExists == false) {
            userExists = true;
        }
    });

    return Promise.resolve(userExists);
}

export async function addNewUser(username:string, password:string) : Promise<boolean> {
    if (await userExists(username) == true) { return Promise.resolve(false); }

    const newUserRef = FirestoreDB.collection("users").doc(username);
    const setWithMerge = newUserRef.set({
        password: password,
        favourites: [],
        recent: {}, // Map with key->ingredient, value->ingredient was searched for "value" number of times ago
    }, { merge: true })

    return Promise.resolve(true);
}

// ---------------------
// Favourite Ingredients
// ---------------------
export async function getUserFavourites(username:string) : Promise<string[]> {
    if (await userExists(username) == false) { return Promise.resolve([]); }

    let favourites : string[] = [];
    const userRef = FirestoreDB.collection("users").doc(username);
    const userSnapshot = await userRef.get()
    favourites = userSnapshot.get("favourites")

    return Promise.resolve(favourites);
}

export async function toggleFavouriteIngredient(ingredient:string, username:string) {
    if (await userExists(username) == false) { return }

    const currentFavourites = await getUserFavourites(username);

    if (currentFavourites.includes(ingredient)) { 
        // It is currently a favourite ingredient, so remove it from favourites
        const indexOfIngredientInFavourites = currentFavourites.indexOf(ingredient);
        if (indexOfIngredientInFavourites != -1) { currentFavourites.splice(indexOfIngredientInFavourites, 1); }
    } else {
        // It is currently not a favourite ingredient, so add it to favourites
        currentFavourites.push(ingredient)
    }

    const userRef = FirestoreDB.collection("users").doc(username);
    userRef.update({
        favourites: currentFavourites
    });
}

// -----------------------------
// Recently searched Ingredients
// -----------------------------
export async function getUserRecent(username:string) : Promise<Map<string,number>> {
    if (await userExists(username) == false) { return Promise.resolve(new Map<string,number>()); }

    let recent = new Map<string,number>();
    const userRef = FirestoreDB.collection("users").doc(username);
    const userSnapshot = await userRef.get();
    recent = new Map(Object.entries(userSnapshot.get("recent")));

    return Promise.resolve(recent);
}

function setDifferenceOfTwoArrays<T>(arr1:T[], arr2:T[]) {
    return arr1.filter(x => !arr2.includes(x));
}

export async function updateRecentList(mostRecentSearch:string[], username:string) {
    if (await userExists(username) == false) { return }

    let currentRecent = await getUserRecent(username);

    // Now, iterate through the currentRecent
    // 1. Remove any ingredients that were searched for at the earliest 4+ searches ago
    // 2. Reset any ingredients that were just searched for to the lowest setting (i.e. 1)
    // 3. Finally, add in any ingredients that weren't in currentRecent
    // 4. Then update the user's document in Firebase

    let ingredientsThatWereAlreadyInRecent : string[] = [];
    currentRecent.forEach((numberOfSearchesAgo:number, ingredient:string) => {
        if (mostRecentSearch.includes(ingredient)) {
            currentRecent.set(ingredient, 1);
            ingredientsThatWereAlreadyInRecent.push(ingredient);
        } else if (numberOfSearchesAgo >= 3) {
            currentRecent.delete(ingredient);
        } else {
            currentRecent.set(ingredient, numberOfSearchesAgo+1);
        }
    });

    let toAddToRecent = setDifferenceOfTwoArrays(mostRecentSearch, ingredientsThatWereAlreadyInRecent);
    for (let i = 0; i < toAddToRecent.length; i++) {
        currentRecent.set(toAddToRecent[i], 1);
    }

    const userRef = FirestoreDB.collection("users").doc(username);
    userRef.update({
        recent: Object.fromEntries(currentRecent)
    })
}

// ---------------------------------
// Retrieving ingredient information
// ---------------------------------
export async function getImageUrlFromStorage(imageFileName : string) : Promise<string> {
    const imageResult = FirebaseStorage.ref().child(imageFileName);
    let imageUrl = imageResult.getDownloadURL();
    return await Promise.resolve(imageUrl);
}

export default async function getAllIngredients() : Promise<Map<string,string>> {
    let ingredients = new Map<string,string>();

    const ingredientsRef = FirestoreDB.collection("ingredients");
    const ingredientsSnapshot = await ingredientsRef.get();
    ingredientsSnapshot.forEach(async (doc) => {
        ingredients.set(doc.id, doc.get("category"));
    });

    return Promise.resolve(ingredients);
}