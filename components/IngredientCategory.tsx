// 3rd-party Imports
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Avatar, List } from 'react-native-paper';
// Components
import IngredientButtonGrid from "../components/IngredientButtonGrid"
// States
import { SelectedIngredients } from '../states/SelectedIngredientsList';
// Firebase
import { getImageUrlOfIngredient } from "../firebase-access/Firebase_Client"

interface Props {
  categoryName : string
  ingredientNames : string[]
}

const IngredientCategory = (props : Props) => {
  const [ingredientImageUrl, setIngredientImageUrl] = useState<string>("DefaultVal");

  useEffect(() => {
    if (props.ingredientNames.length > 0) {
      getImageUrlOfIngredient(props.ingredientNames[0])
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
      theme={{ roundness:20 }}
      left={props => <Avatar.Image {...props} size={35} source={{ uri: ingredientImageUrl }} />}
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