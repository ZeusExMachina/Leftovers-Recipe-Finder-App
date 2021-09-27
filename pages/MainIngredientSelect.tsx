// 3rd-paarty Imports
import React from "react";
import { StyleSheet } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
// Components
import IngredientsContents from "../components/IngredientsContents";
import MainPageHeader from "../components/MainPageHeader";
import MainPageFooter from "../components/MainPageFooter";
// Styles for divs
import "../styles/styles.css"

const IngredientSelection = ({ navigation }) => {
  return (
      <PaperProvider>
        <IngredientsContents/>

        <MainPageHeader/>

        <MainPageFooter navigationObj={navigation}/>
      </PaperProvider> 
  );
}

const styles = StyleSheet.create({

});

export default IngredientSelection