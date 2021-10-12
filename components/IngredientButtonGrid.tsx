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

type ButtonInFlatList = {
    name: string;
    key: number;
};

function makeButtonFlatListData(ingredientNames : string[]) : ButtonInFlatList[] {
    let data : ButtonInFlatList[] = [];
    for (let i = 0; i < ingredientNames.length; i++) {
        data.push({ name : ingredientNames[i], key : i })
    }
    return data;
}

const IngredientButtonGrid = (props : Props) => {
    const flatListData = makeButtonFlatListData(props.ingredientNames);

    const {ingredientsList, updateIngredientsList} = useContext(SelectedIngredients)
    const useToggleIngredientSelect = useContext(UpdateSelectedIngredients)

    function isSelected(ingredientName:string) : boolean {
        return ingredientsList.includes(ingredientName);
    }

    function toggleIngredientSelectHandler(ingredientName:string) {
        useToggleIngredientSelect(ingredientName, {ingredientsList, updateIngredientsList});
    }

    return (
        <View style={{flex:1, margin: 5}}>
            <FlatList
                data={flatListData}
                scrollEnabled={false}
                renderItem={({item}) => (
                    <IngredientButton ingredientName={item.name} isSelected={isSelected} toggleHandler={toggleIngredientSelectHandler}/>
                )}
                numColumns={2}>
            </FlatList>
        </View>
    );
}

const styles = StyleSheet.create({

});

export default IngredientButtonGrid;