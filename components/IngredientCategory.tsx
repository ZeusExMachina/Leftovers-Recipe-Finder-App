import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Chip } from 'react-native-paper';
import { List } from 'react-native-paper';

interface Props {
  categoryName : String
}

const styles = StyleSheet.create({
  ingredientButton: {
    width: "25%",
  }
});

const IngredientCategory = (props : Props) => (
  // <div>
  //   <Chip icon="information" onPress={() => console.log('Pressed')}>Example Chip</Chip>
  //   <Chip icon="information" onPress={() => console.log('Pressed')}>Example Chip</Chip>
  // </div>

  
  <List.Accordion
    title={props.categoryName}
    left={props => <List.Icon {...props} icon="folder" />}>
    <Chip icon="information" mode="outlined" style={styles.ingredientButton} onPress={() => console.log('Pressed')}>Example Chip</Chip>
    <Chip icon="information" onPress={() => console.log('Pressed')}>Example Chip</Chip>
  </List.Accordion>
);

export default IngredientCategory;