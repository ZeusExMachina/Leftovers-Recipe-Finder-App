import React, { useContext } from "react";
import * as WebBrowser from 'expo-web-browser';
import { StyleSheet } from 'react-native';
import { Button } from "react-native-paper";
// Components
import SnackbarMessagePopup from '../components/SnackbarMessagePopup';
// States
import { CurrentUser } from "../states/CurrentUser";
import { SelectedIngredients } from '../states/SelectedIngredientsList';
import { RefreshRecentIngredients } from "../states/RecentIngredients";
import { ShowSnackbarMessage } from "../states/SnackbarVisible";
// Firebase
import { updateRecentList } from '../firebase-access/Firebase_Client'
// Styling
import { PrimaryThemeColour } from "../styling/Styling";

function createSearchUrl(ingredientsList:string[]) : string {
  let url = "https://google.com/search?q=Recipes+with";

  for (let i = 0; i < ingredientsList.length; i++) {
    url = url.concat("+" + ingredientsList[i].replace(" ", "+"));
    if (i == ingredientsList.length-2) { url = url.concat(",+and"); }
    else if (i < ingredientsList.length-2) { url = url.concat(","); }
  }

  return url;
}

const RecipeResults = () => {
  const currentUser = useContext(CurrentUser);
  const selectedIngredients = useContext(SelectedIngredients);
  const refreshRecentIngredients = useContext(RefreshRecentIngredients);
  const showSnackbarMessage = useContext(ShowSnackbarMessage);

  async function openInAppBrowserWindow(ingredientsList:string[]) {
    if (ingredientsList.length < 1) {
      showSnackbarMessage("No ingredients selected. Please select ingredients to use in a recipe");
      return;
    }
  
    const url = createSearchUrl(ingredientsList)
  
    await WebBrowser.openBrowserAsync(url);
    await updateRecentList(ingredientsList, currentUser);
    refreshRecentIngredients(currentUser);
  }
  
  return (  
    <>
      <Button
        icon="magnify"
        mode="contained"
        contentStyle={{ flexDirection:"row-reverse" }}
        style={styles.bottomBar_button}
        labelStyle={{ fontSize:13 }}
        onPress={async () => { 
          await openInAppBrowserWindow(selectedIngredients);
        }
      }>
          Find Recipes
      </Button>
      
      <SnackbarMessagePopup/>
    </>
  );
}

const styles = StyleSheet.create({
    bottomBar_button: {
        height: 40,
        width: "45%",
        backgroundColor: PrimaryThemeColour,
    },

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default RecipeResults;