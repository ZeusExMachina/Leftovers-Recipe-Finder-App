import React, { useState, useContext } from "react";
import * as WebBrowser from 'expo-web-browser';
import { StyleSheet } from 'react-native';
import { Button, Snackbar } from "react-native-paper";
// States
import { SelectedIngredients } from '../states/SelectedIngredientsList';

async function openInAppBrowserWindow(ingredientsList : string[]) : number {
  if (ingredientsList.length < 1) {
    return 1;
  }

  let url = "https://google.com/search?q=Recipes+with";
  for (let i = 0; i < ingredientsList.length; i++) {
    url = url.concat("+" + ingredientsList[i].replace(" ", "+"));
    if (i == ingredientsList.length-2) { url = url.concat(",+and"); }
    else if (i < ingredientsList.length-2) { url = url.concat(","); }
  }

  await WebBrowser.openBrowserAsync(url);
  return 0;
}

const RecipeResults = () => {
  // List of selected ingredients
  const {ingredientsList,updateIngredientsList} = useContext(SelectedIngredients);

  // State of Snackbar message
  const [snackBarVisible, setSnackBarVisible] = useState<boolean>(false);
  const dismissSnackBar = () => setSnackBarVisible(false);

  return (
    <>
      <Button
        icon="arrow-right"
        mode="contained"
        contentStyle={{ flexDirection:"row-reverse" }}
        style={styles.bottomBar_button} 
        onPress={async () => { 
          if (openInAppBrowserWindow(ingredientsList) != 0) {
            setSnackBarVisible(true);
          }
        }
      }>
          Find Recipes
      </Button>
      <Snackbar
        visible={snackBarVisible}
        onDismiss={() => {dismissSnackBar()}}
        action={{
          label: 'OK',
          onPress: () => {dismissSnackBar()}
        }}
        style={{width:"91%", marginBottom:65}}
      >
        No ingredients selected. Please select ingredients to use in a recipe.
      </Snackbar>
    </>
  );
}

const styles = StyleSheet.create({
    bottomBar_button: {
        height: 40,
        width: "45%",
    },

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default RecipeResults