// 3rd-party Imports
import React, { useContext } from "react";
import { StyleSheet, View, Linking, Alert } from 'react-native';
import { Appbar, Button } from 'react-native-paper';
import { InAppBrowser } from 'react-native-inappbrowser-reborn'
// Components
import RecipeResults from "../pages/RecipeResults";
// States
import { SelectedIngredients } from '../states/SelectedIngredientsList';

interface Props {
  navigationObj
}

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
  },

  bottomBar_button: {
      height: 40,
      width: "45%",
      fontSize: 17,
  },
});

const MainPageFooter = (props : Props) => {
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
          onPress={() => { switchToSelectedIngredientsScreen(); }}>
          Selected Ingredients
        </Button>
        <RecipeResults/>
      </Appbar>
    </View>
  );
};

export default MainPageFooter