// 3rd-party Imports
import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
// Components
import IngredientButton from './IngredientButton';
// State - Selected Ingredients
import { SelectedIngredients, UpdateSelectedIngredients } from '../states/SelectedIngredientsList';

interface Props {
    ingredientNames : string[]
    extrasScreenObjs? : {navigationObj:any, screenName:string, extraScreenLinkMessage:string}
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

    const switchToExtrasScreen = () => {
        props.extrasScreenObjs?.navigationObj.navigate(props.extrasScreenObjs?.screenName);
    }

    return (
        (props.extrasScreenObjs === undefined || props.ingredientNames.length < 5)
            ?   
                <View style={styles.columnsContainer}>
                    <View style={styles.singleColumnContainer}>
                        {getListOfIngredientsInRow(true).map((ingredientName,i) => 
                            React.createElement(IngredientButton,
                                                {key:i, ingredientName:ingredientName, isSelected:isSelected, toggleHandler:toggleIngredientSelectHandler}))}
                    </View>
                    <View style={styles.singleColumnContainer}>
                        {getListOfIngredientsInRow(false).map((ingredientName,i) => 
                            React.createElement(IngredientButton,
                                                {key:i, ingredientName:ingredientName, isSelected:isSelected, toggleHandler:toggleIngredientSelectHandler}))}
                    </View>
                </View>
            :
                <View style={styles.columnsContainer}>
                    <View style={styles.singleColumnContainer}>
                        {[props.ingredientNames[0],props.ingredientNames[2]].map((ingredientName,i) => 
                            React.createElement(IngredientButton,
                                                {key:i, ingredientName:ingredientName, isSelected:isSelected, toggleHandler:toggleIngredientSelectHandler}))}
                    </View>
                    <View style={styles.singleColumnContainer}>
                        <IngredientButton ingredientName={props.ingredientNames[1]} isSelected={isSelected} toggleHandler={toggleIngredientSelectHandler}/>
                        <Button 
                            mode="text" 
                            theme={{ roundness:20 }}
                            style={{ alignSelf:"center", width:"80%", display:"flex", justifyContent:"center" }} 
                            labelStyle={{ fontSize:11 }}
                            onPress={() => { switchToExtrasScreen(); }}>
                            {props.extrasScreenObjs?.extraScreenLinkMessage}
                        </Button>
                    </View>
                </View>
    );
}

const styles = StyleSheet.create({
    columnsContainer: {
        flex:1,
        margin: 5,
        display:'flex',
        flexDirection:'row'
    },

    singleColumnContainer: {
        width:"50%",
        alignItems:'center',
        display:'flex',
        flexDirection:'column',
    }
});

export default IngredientButtonGrid;