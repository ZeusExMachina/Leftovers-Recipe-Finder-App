// 3rd-party Imports
import React, { useContext } from "react";
import { StyleSheet, View, } from 'react-native';
import { Appbar, Button, Text } from 'react-native-paper';
// Components
import RecipeResults from "../pages/RecipeResults";
// States
import { SelectedIngredients } from "../states/SelectedIngredientsList";

interface Props {
  navigationObj
}

const MainPageFooter = (props : Props) => {
  const selectedIngredients = useContext(SelectedIngredients);

  const switchToSelectedIngredientsScreen = () => {
    props.navigationObj.navigate("Selected Ingredients");
  }

  return (
    <View style={styles.footer}>
      <Appbar style={styles.bottom}>
        <Button 
          icon="format-list-bulleted-square" 
          mode="contained" 
          style={styles.bottomBar_button}
          labelStyle={{ fontSize: 13 }}
          onPress={() => { switchToSelectedIngredientsScreen(); }}
        >
          {selectedIngredients.length>0 ? "Selected ("+selectedIngredients.length+")" : "Selected"}
        </Button>

        <RecipeResults/>
      </Appbar>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: 'relative',
    bottom: 0,
    left: 0,
    right: 0,
    height: 55,
  },

  bottom: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: 55,
      display: "flex",
      justifyContent: "space-evenly",
      flexDirection:"row"
  },

  bottomBar_button: {
      height: 40,
      width: "45%",
  },
});

export default MainPageFooter