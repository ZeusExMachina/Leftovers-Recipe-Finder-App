// 3rd-party Imports
import React from "react";
import { StyleSheet, View, } from 'react-native';
import { Appbar, Button, Text } from 'react-native-paper';
// Components
import RecipeResults from "../pages/RecipeResults";
// States

interface Props {
  navigationObj
}

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
          labelStyle={{ fontSize: 14 }}
          onPress={() => { switchToSelectedIngredientsScreen(); }}
        >
          Selected
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