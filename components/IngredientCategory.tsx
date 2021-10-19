// 3rd-party Imports
import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Avatar, List } from 'react-native-paper';
// Components
import IngredientButtonGrid from "../components/IngredientButtonGrid"
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

  return (
    <List.Accordion
      title={props.categoryName}
      theme={{ roundness:20 }}
      left={props => <Avatar.Image {...props} size={35} source={{ uri: ingredientImageUrl }} />}>

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