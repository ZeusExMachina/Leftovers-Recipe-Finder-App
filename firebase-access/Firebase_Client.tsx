// Firebase
import { FirestoreDB, FirebaseStorage } from "../firebase";

const storageRef = FirebaseStorage.ref();

function ingredientNameTransform(ingredientName : string) : string {
    return ingredientName.toLowerCase().replace(" ", "-").concat(".png");
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