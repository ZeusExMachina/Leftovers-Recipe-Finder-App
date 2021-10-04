// 3rd-party Imports
import React, { useContext } from 'react';
import { StyleSheet, FlatList } from 'react-native';
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
    return data
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
        <div style={{margin: 5}}>
            <FlatList
                data={flatListData}
                renderItem={({item}) => (
                    <IngredientButton ingredientName={item.name} isSelected={isSelected} toggleHandler={toggleIngredientSelectHandler}/>
                )}
                numColumns={2}>
            </FlatList>
        </div>
    );
}

const styles = StyleSheet.create({
    // ingredientButton_container: {
    //     display: "flex",
    //     justifyContent: "space-evenly",
    // },

    ingredientButton: {
      //backgroundColor: "purple",
      width: "47.5%",
      marginLeft: "1.25%",
      marginRight: "1.25%",
      marginTop: 4,
      marginBottom: 4,
    },

    ingredientButton_text: {
    //   display: 'flex',
    //   justifyContent: "center",
      paddingLeft: "20px",
      paddingRight: "20px",
      fontSize: 20,
    }
});

export default IngredientButtonGrid;