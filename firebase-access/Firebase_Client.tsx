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
        password: password
    }, { merge: true })

    return Promise.resolve(true);
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