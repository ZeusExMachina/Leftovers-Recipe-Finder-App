// 3rd-party Imports
import React, { useContext } from "react";
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
// States
import { SelectedIngredients } from '../states/SelectedIngredientsList';
// Components
import IngredientButtonGrid from "../components/IngredientButtonGrid";

const SelectedIngredientsDisplayScreen = () => {
    const {ingredientsList, updateIngredientsList} = useContext(SelectedIngredients);
    console.log(ingredientsList);

    return (
        <View>
            <Text>Selected Ingredients</Text>
            <IngredientButtonGrid ingredientNames={ingredientsList}/>
        </View>
    );
};

export default SelectedIngredientsDisplayScreen;