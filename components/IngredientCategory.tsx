// 3rd-party Imports
import React from 'react';
import { StyleSheet } from 'react-native';
import { List } from 'react-native-paper';
// Components
import IngredientButtonGrid from "../components/IngredientButtonGrid"

interface Props {
  categoryName : String
}

const IngredientCategory = (props : Props) => {
  return (
    <List.Accordion
      title={props.categoryName}
      theme={{ roundness:20 }}
      left={props => <List.Icon {...props} icon="folder" />}>

      <IngredientButtonGrid ingredientNames={["Apple", "Banana", "Carrot"]}/>

    </List.Accordion>
  );
}

const styles = StyleSheet.create({
  ingredientCategory_dropDown: {
    height: 20,
  },
});

export default IngredientCategory;