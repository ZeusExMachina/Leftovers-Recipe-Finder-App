// 3rd-party Imports
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Avatar, List } from 'react-native-paper';
// Components
import IngredientButtonGrid from "../components/IngredientButtonGrid"
// States
import { SelectedIngredients } from '../states/SelectedIngredientsList';
// Firebase
import { getImageUrlFromStorage } from "../firebase-access/Firebase_Client"
// Styling
import { PrimaryThemeColour, TertiaryThemeColour } from "../styling/Styling";

interface Props {
  categoryName : string
  ingredientNames : string[]
}

function ingredientNameTransform(ingredientName : string) : string {
  return ingredientName.toLowerCase().replace(" ", "-").concat(".png");
}

const IngredientCategory = (props : Props) => {
  const [ingredientImageUrl, setIngredientImageUrl] = useState<string>("DefaultVal");

  useEffect(() => {
    if (props.ingredientNames.length > 0) {
        getImageUrlFromStorage(ingredientNameTransform(props.ingredientNames[0]))
        .then(value => setIngredientImageUrl(value));
    }
    // console.log(ingredientImageUrl);
  }, [ingredientImageUrl]);

  // Imported states
  const selectedIngredients = useContext(SelectedIngredients);

  function getNumberOfIngredientsInCategoryAreSelected() : number {
    let numberOfSelectedIngredients = 0;
    for(let i = 0; i < props.ingredientNames.length; i++) {
      if (selectedIngredients.includes(props.ingredientNames[i])) { numberOfSelectedIngredients++; }
    }
    return numberOfSelectedIngredients;
  }

  const numOfSelected = getNumberOfIngredientsInCategoryAreSelected();

  return (
    <List.Accordion
      title={numOfSelected>0 ? props.categoryName+" ("+numOfSelected+")" : props.categoryName}
      theme={{ roundness:20, colors: { primary: PrimaryThemeColour } }}
      left={props => <Avatar.Image {...props} size={35} style={{ backgroundColor:TertiaryThemeColour }} source={{ uri: ingredientImageUrl }} />}
    >

      <IngredientButtonGrid ingredientNames={props.ingredientNames}/>

    </List.Accordion>
  );
}

const styles = StyleSheet.create({
  ingredientCategory_dropDown: {
    height: 20,
  },
});

export default IngredientCategory;