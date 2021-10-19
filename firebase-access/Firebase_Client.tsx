// Firebase
import { FirestoreDB, FirebaseStorage } from "../firebase";

const storageRef = FirebaseStorage.ref();

function ingredientNameTransform(ingredientName : string) : string {
    return ingredientName.toLowerCase().replace(" ", "-").concat(".png");
}

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
    // Check if a user exists - for registering a user
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
        recent: []
    }, { merge: true })

    return Promise.resolve(true);
}

export async function getUserFavourites(username:string) : Promise<string[]> {
    if (await userExists(username) == false) { return Promise.resolve([]); }

    let favourites : string[] = [];
    const userRef = FirestoreDB.collection("users").doc(username);
    const userSnapshot = await userRef.get()
    favourites = userSnapshot.get("favourites")

    return Promise.resolve(favourites);
}

export async function getUserRecent(username:string) : Promise<string[]> {
    if (await userExists(username) == false) { return Promise.resolve([]); }

    let recent : string[] = [];
    const userRef = FirestoreDB.collection("users").doc(username);
    const userSnapshot = await userRef.get()
    recent = userSnapshot.get("recent")

    return Promise.resolve(recent);
}

export async function toggleFavouriteIngredient(ingredient:string, username:string) {
    if (await userExists(username) == false) { return }

    const currentFavourites = await getUserFavourites(username);
    const userRef = FirestoreDB.collection("users").doc(username);

    if (currentFavourites.includes(ingredient)) { 
        // It is currently a favourite ingredient, so remove it from favourites
        const indexOfIngredientInFavourites = currentFavourites.indexOf(ingredient);
        if (indexOfIngredientInFavourites != -1) { currentFavourites.splice(indexOfIngredientInFavourites, 1); }
    } else {
        // It is currently not a favourite ingredient, so add it to favourites
        currentFavourites.push(ingredient)
    }

    userRef.update({
        favourites: currentFavourites
    });
}

export async function getImageUrlOfIngredient(ingredientName:string) : Promise<string> {
    const imageResult = storageRef.child(ingredientNameTransform(ingredientName));
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