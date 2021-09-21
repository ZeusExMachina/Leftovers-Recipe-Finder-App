import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { List, ToggleButton } from 'react-native-paper';

import IngredientButtonGrid from "../components/IngredientButtonGrid"

interface Props {
  categoryName : String
  functionForWhenPressed(ingredient:string) : void
}

const IngredientCategory = (props : Props) => {
  
  // const [status, setStatus] = useState(false);

  // function onButtonToggle() {
  //   setStatus(status === true ? false : true);
  // }

  return (
    <List.Accordion
      title={props.categoryName}
      theme={{ roundness:20 }}
      left={props => <List.Icon {...props} icon="folder" />}>

      {/* <ToggleButton
        icon="bluetooth"
        value="bluetooth"
        status={status == true ? "checked" : "unchecked"}
        onPress={onButtonToggle}
        theme={{ roundness:50 }}
      /> */}

      <IngredientButtonGrid ingredientNames={["Apple", "Banana", "Carrot"]} functionForWhenPressed={props.functionForWhenPressed}/>

    </List.Accordion>
  );
}

const styles = StyleSheet.create({
  ingredientCategory_dropDown: {
    height: "20px",
  },
});

export default IngredientCategory;