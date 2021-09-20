import * as React from 'react';
import { StyleSheet } from 'react-native';
import { ToggleButton } from 'react-native-paper';
import { List } from 'react-native-paper';

import IngredientButtonGrid from "../components/IngredientButtonGrid"

interface Props {
  categoryName : String

  functionForWhenPressed(ingredient:string) : void
}

function onButtonToggle() {
  console.log("Toggle Button Pressed!");
};

const IngredientCategory = (props : Props) => (
  // <div>
  //   <Chip icon="information" onPress={() => console.log('Pressed')}>Example Chip</Chip>
  //   <Chip icon="information" onPress={() => console.log('Pressed')}>Example Chip</Chip>
  // </div>

  
  
  <List.Accordion
    title={props.categoryName}
    left={props => <List.Icon {...props} icon="folder" />}>

    <ToggleButton
      icon="bluetooth"
      value="bluetooth"
      onPress={onButtonToggle}
      theme={{ roundness:5 }}
    />

    <IngredientButtonGrid ingredientNames={["Apple", "Banana", "Carrot"]} functionForWhenPressed={props.functionForWhenPressed}/>

  </List.Accordion>
);

const styles = StyleSheet.create({
  ingredientCategory_dropDown: {
    height: "20px",
  },
});

export default IngredientCategory;