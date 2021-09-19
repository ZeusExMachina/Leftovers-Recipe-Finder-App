import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Chip } from 'react-native-paper';
import { List } from 'react-native-paper';

import IngredientButtonGrid from "../components/IngredientButtonGrid"

interface Props {
  categoryName : String
}

const IngredientCategory = (props : Props) => (
  // <div>
  //   <Chip icon="information" onPress={() => console.log('Pressed')}>Example Chip</Chip>
  //   <Chip icon="information" onPress={() => console.log('Pressed')}>Example Chip</Chip>
  // </div>

  
  <List.Accordion
    title={props.categoryName}
    left={props => <List.Icon {...props} icon="folder" />}>
    <IngredientButtonGrid ingredientNames={["Apple", "Banana", "Carrot"]}/>
  </List.Accordion>
);

export default IngredientCategory;