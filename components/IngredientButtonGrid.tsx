// 3rd-party Imports
import React, { useContext } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { Chip } from 'react-native-paper';
// Components
import IngredientButton from './IngredientButton';
// State - Selected Ingredients
import { SelectedIngredients, UpdateSelectedIngredients } from '../states/SelectedIngredientsList';

interface Props {
    ingredientNames : string[]
}

const IngredientButtonGrid = (props : Props) => {
    const {ingredientsList, updateIngredientsList} = useContext(SelectedIngredients)
    const useToggleIngredientSelect = useContext(UpdateSelectedIngredients)

    function isSelected(ingredientName:string) : boolean {
        return ingredientsList.includes(ingredientName);
    }

    function toggleIngredientSelectHandler(ingredientName:string) {
        useToggleIngredientSelect(ingredientName, {ingredientsList, updateIngredientsList});
    }

    function getListOfIngredientsInRow(left:boolean) : string[] {
        let ingredientsInColumn : string[] = [];
        const modulusDenominator : number = left ? 0 : 1;
        for (var i = 0; i < props.ingredientNames.length; i++) {
            if(i % 2 == modulusDenominator) {
                ingredientsInColumn.push(props.ingredientNames[i]);
            }
        }

        return ingredientsInColumn;
    }

    return (
        <View style={{flex:1, margin: 5, display:'flex', flexDirection:'row'}}>
            <View style={styles.singleColumnContainer}>
                {getListOfIngredientsInRow(true).map((ingredientName,i) => 
                    React.createElement(IngredientButton,
                                        {ingredientName:ingredientName, isSelected:isSelected, toggleHandler:toggleIngredientSelectHandler}))}
            </View>

            <View style={styles.singleColumnContainer}>
                {getListOfIngredientsInRow(false).map((ingredientName,i) => 
                    React.createElement(IngredientButton,
                                        {ingredientName:ingredientName, isSelected:isSelected, toggleHandler:toggleIngredientSelectHandler}))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    singleColumnContainer: {
        width:"50%",
        alignItems:'center',
    }
});

export default IngredientButtonGrid;