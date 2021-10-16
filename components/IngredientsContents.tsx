// 3rd-party Imports
import React, { useContext } from "react";
import { StyleSheet, View, ScrollView } from 'react-native';
import { Avatar, Text } from 'react-native-paper';
// Components
import IngredientCategory from '../components/IngredientCategory';
import IngredientButtonGrid from "../components/IngredientButtonGrid";
// States
import { AllIngredients } from "../states/All_Ingredients";

function convertAllIngredientsIntoMap(allIngredients : Map<string,string>) : Map<string,string[]> {
    let mapOfCategoriesAndIngredients = new Map<string,string[]>();

    allIngredients.forEach((category:string, ingredient:string) => {
        let categoryList = mapOfCategoriesAndIngredients.get(category);
        if (categoryList == undefined) { mapOfCategoriesAndIngredients.set(category,[ingredient]); }
        else { categoryList.push(ingredient); }
    });

    console.log("mapOfCategoriesAndIngredients", mapOfCategoriesAndIngredients);

    return mapOfCategoriesAndIngredients;
}

const IngredientsContents = () => {
    const {allIngredients, setAllIngredients} = useContext(AllIngredients);

    return (
        <View style={styles.ingredientsContents}>
            <ScrollView scrollEnabled={true} style={styles.ingredientsContents}>
                <View style={{flexDirection:"row"}}>
                    <Text style={styles.ingredientSection_heading}>
                        Favourite Ingredients
                    </Text>
                    <Avatar.Icon size={28} icon="star" style={styles.contentSection_avatarIcon} />
                </View>

                <IngredientButtonGrid ingredientNames={[]}/>

                <View style={{flexDirection:"row"}}>
                    <Text style={styles.ingredientSection_heading}>
                        Recently Used Ingredients
                    </Text>
                    <Avatar.Icon size={28} icon="history" style={styles.contentSection_avatarIcon} />
                </View>

                <IngredientButtonGrid ingredientNames={[]}/>

                <Text style={styles.ingredientSection_heading}>Food Categories</Text>

                {Array.from(convertAllIngredientsIntoMap(allIngredients)).map(([ingredientCategory,ingredientNames], i) => 
                    React.createElement(IngredientCategory, {key:i, categoryName:ingredientCategory, ingredientNames:ingredientNames}))}

                {/* <IngredientCategory categoryName="Meat"/>
                <IngredientCategory categoryName="Vegetables"/>
                <IngredientCategory categoryName="Fruits"/>
                <IngredientCategory categoryName="Dairy"/>
                <IngredientCategory categoryName="Baking"/>
                <IngredientCategory categoryName="Alcohol"/>
                <IngredientCategory categoryName="Seasonings"/> */}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    ingredientsContents: {
        flex: 1,
        paddingTop: 10,
        paddingBottom: 5,
    },

    contentSection_avatarIcon: {
        marginLeft: 5,
    },
    
    ingredientSection_heading: {
        marginTop: 0,
        marginBottom: 5,
        marginLeft: 8,
        fontSize: 20,
    },
});

export default IngredientsContents;