// 3rd-party Imports
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Avatar, List } from 'react-native-paper';
// Components
import IngredientButtonGrid from "../components/IngredientButtonGrid"
// States
import { SelectedIngredients } from '../states/SelectedIngredientsList';
import { GetUrlOfIngredientImage } from '../states/All_IngredientImages';
// Styling
import { PrimaryThemeColour, TertiaryThemeColour } from "../styling/Styling";

interface Props {
  categoryName : string
  ingredientNames : string[]
}

const IngredientCategory = (props : Props) => {
  // Image URL state
  const getUrlOfIngredientImage = useContext(GetUrlOfIngredientImage);
  const [ingredientImageUrl, setIngredientImageUrl] = useState<string>("DefaultVal");
  useEffect(() => {
    if (props.ingredientNames.length > 0) {
        const urlOfIngredientImage : string|undefined = getUrlOfIngredientImage(props.ingredientNames[0]);
        if (urlOfIngredientImage == undefined) { setIngredientImageUrl("<no url>"); }
        else { setIngredientImageUrl(urlOfIngredientImage); }
    }
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