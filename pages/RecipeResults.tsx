import React, { useState, useEffect, useContext } from "react";
import * as WebBrowser from 'expo-web-browser';
import { InAppBrowser } from 'react-native-inappbrowser-reborn'
import { StyleSheet, Linking, Alert } from 'react-native';
import { Button } from "react-native-paper";
// States
import { SelectedIngredients } from '../states/SelectedIngredientsList';

const RecipeResults = () => {
    const {ingredientsList,updateIngredientsList} = useContext(SelectedIngredients);

    let url = "https://google.com/search?q=Recipes+with";
    for (let i = 0; i < ingredientsList.length; i++) {
      url = url.concat("+" + ingredientsList[i].replace(" ", "+"));
      if (i == ingredientsList.length-2) { url = url.concat(",+and"); }
      else if (i < ingredientsList.length-2) { url = url.concat(","); }
    }

    return (
        <Button 
            icon="arrow-right"
            mode="contained"
            contentStyle={{ flexDirection:"row-reverse" }}
            style={styles.bottomBar_button} 
            onPress={async () => { 
                await WebBrowser.openBrowserAsync(url);
                // openLink(url);
            }
        }>
            Find Recipes
        </Button>
    );
}

// async function openLink(url:string) {
//   try {
//     if (await InAppBrowser.isAvailable()) {
//       const result = await InAppBrowser.open(url, {
//         // iOS Properties
//         dismissButtonStyle: 'cancel',
//         preferredBarTintColor: '#453AA4',
//         preferredControlTintColor: 'white',
//         readerMode: false,
//         animated: true,
//         modalPresentationStyle: 'fullScreen',
//         modalTransitionStyle: 'coverVertical',
//         modalEnabled: true,
//         enableBarCollapsing: false,
//         // Android Properties
//         showTitle: true,
//         toolbarColor: '#6200EE',
//         secondaryToolbarColor: 'black',
//         navigationBarColor: 'black',
//         navigationBarDividerColor: 'white',
//         enableUrlBarHiding: true,
//         enableDefaultShare: true,
//         forceCloseOnRedirection: false,
//         // Specify full animation resource identifier(package:anim/name)
//         // or only resource name(in case of animation bundled with app).
//         animations: {
//           startEnter: 'slide_in_right',
//           startExit: 'slide_out_left',
//           endEnter: 'slide_in_left',
//           endExit: 'slide_out_right'
//         },
//         headers: {
//           'my-custom-header': 'my custom header value'
//         }
//       });
//       Alert.alert(JSON.stringify(result));
//     } else {
//       Linking.openURL(url)
//     }
//   } catch (error : any) {
//     Alert.alert("Hi! There's an error here", error.message);
//   }
// }

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