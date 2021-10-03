// 3rd-party Imports
import React, { useContext } from "react";
import { StyleSheet, View } from 'react-native';
import { Appbar, Button, Text } from 'react-native-paper';
// States
import { SelectedIngredients } from '../states/SelectedIngredientsList';
// Components
import IngredientButtonGrid from "../components/IngredientButtonGrid";

const styles = StyleSheet.create({
    bottom: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: "60px",
        display: "flex",
        justifyContent: "space-evenly",
    },

    bottomBar_button: {
        height: "40px",
        width: "45%",
    },
});

const SelectedIngredientsDisplayScreen = ({ navigation }) => {
    const switchToIngredientSelectionScreen = () => {
        navigation.navigate("Ingredient Selection");
    }

    const {ingredientsList, updateIngredientsList} = useContext(SelectedIngredients);
    console.log(ingredientsList);

    return (
        <View>
            <Text>Selected Ingredients</Text>

            <IngredientButtonGrid ingredientNames={ingredientsList}/>
            
            <div className={"footer"}>
                <Appbar style={styles.bottom}>
                    <Button 
                        icon="close" 
                        mode="contained" 
                        style={styles.bottomBar_button} 
                        onPress={() => { switchToIngredientSelectionScreen(); }}>
                        Selected Ingredients
                    </Button>
                </Appbar>
            </div>
        </View>
    );
};

export default SelectedIngredientsDisplayScreen;