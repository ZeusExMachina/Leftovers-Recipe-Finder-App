import React, { useState, useEffect, useContext } from "react";
import * as WebBrowser from 'expo-web-browser';
import { InAppBrowser } from 'react-native-inappbrowser-reborn'
import { StyleSheet, Linking, Alert } from 'react-native';
import { Button } from "react-native-paper";
// States
import { SelectedIngredients } from '../states/SelectedIngredientsList';

async function handlePressButtonAsync(ingredientsList:string[], setResult:(state:WebBrowser.WebBrowserResult) => void) {
    //const {ingredientsList,updateIngredientsList} = useContext(SelectedIngredients);

    if (ingredientsList.length < 1) { return; }

    let url = "google.com/search?q=";
    for (let i = 0; i < ingredientsList.length; i++) {
        url = url.concat(ingredientsList[i]);
    }

    let result = await WebBrowser.openBrowserAsync(url);
    setResult(result);
    // return <WebBrowser.WebBrowserResultType/>
};

async function openLink(url:string) {
  try {
    if (await InAppBrowser.isAvailable()) {
      const result = await InAppBrowser.open(url, {
        // iOS Properties
        dismissButtonStyle: 'cancel',
        preferredBarTintColor: '#453AA4',
        preferredControlTintColor: 'white',
        readerMode: false,
        animated: true,
        modalPresentationStyle: 'fullScreen',
        modalTransitionStyle: 'coverVertical',
        modalEnabled: true,
        enableBarCollapsing: false,
        // Android Properties
        showTitle: true,
        toolbarColor: '#6200EE',
        secondaryToolbarColor: 'black',
        navigationBarColor: 'black',
        navigationBarDividerColor: 'white',
        enableUrlBarHiding: true,
        enableDefaultShare: true,
        forceCloseOnRedirection: false,
        // Specify full animation resource identifier(package:anim/name)
        // or only resource name(in case of animation bundled with app).
        animations: {
          startEnter: 'slide_in_right',
          startExit: 'slide_out_left',
          endEnter: 'slide_in_left',
          endExit: 'slide_out_right'
        },
        headers: {
          'my-custom-header': 'my custom header value'
        }
      });
      Alert.alert(JSON.stringify(result));
    } else {
      Linking.openURL(url)
    }
  } catch (error : any) {
    Alert.alert("Hi! There's an error here", error.message);
  }
}

const RecipeResults = () => {
    //const [result, setResult] = useState<WebBrowser.WebBrowserResult>();

    // useEffect(() => {
    //     console.log("SelectedIngredientsList useEffect", result);
    // }, [result])

    const {ingredientsList,updateIngredientsList} = useContext(SelectedIngredients);

    let url = "https://google.com/search?q=Recipes with";
    for (let i = 0; i < ingredientsList.length; i++) {
        url = url.concat(" " + ingredientsList[i]);
    }
    url = url.replace(" ", "+");

    return (
        <Button 
            icon="arrow-right"
            mode="contained"
            contentStyle={{ flexDirection:"row-reverse" }}
            style={styles.bottomBar_button} 
            onPress={async () => { 
                console.log('Find Recipes pressed');
                //let result = await WebBrowser.openBrowserAsync(url);
                //console.log(result);
                //setResult(result);
                openLink(url);
            }
        }>
            Find Recipes
        </Button>
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