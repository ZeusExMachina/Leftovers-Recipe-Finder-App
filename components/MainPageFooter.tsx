// 3rd-party Imports
import React from "react";
import { StyleSheet } from 'react-native';
import { Appbar, Button } from 'react-native-paper';

interface Props {
  navigationObj
}

const styles = StyleSheet.create({
    bottom: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: "60px",
        display: "flex",
        justifyContent: "space-evenly",
    },

    bottomBar_button: {
        height: "40px",
        width: "45%",
    },
});

const MainPageFooter = (props : Props) => {
   const switchToSelectedIngredientsScreen = () => {
     props.navigationObj.navigate("Selected Ingredients");
   }

  return (
    <div className={"footer"}>
    <Appbar style={styles.bottom}>
      <Button 
        icon="format-list-bulleted-square" 
        mode="contained" 
        style={styles.bottomBar_button} 
        onPress={() => { switchToSelectedIngredientsScreen(); }}>
        Selected Ingredients
      </Button>
      <Button 
        icon="arrow-right"
        mode="contained"
        contentStyle={{ flexDirection:"row-reverse" }}
        style={styles.bottomBar_button} 
        onPress={() => console.log('Pressed')}>
        Find Recipes
      </Button>
    </Appbar>
  </div>
  );
};

export default MainPageFooter