// 3rd-paarty Imports
import React from "react";
import { StyleSheet, View } from 'react-native';
// Components
import IngredientsContents from "../components/IngredientsContents";
import MainPageHeader from "../components/MainPageHeader";
import MainPageFooter from "../components/MainPageFooter";
// States
import SearchbarTextInputProvider from "../states/SearchbarTextInput";
import SearchedIngredientsResultsProvider from '../states/SearchedIngredientsResults';

const IngredientSelection = ({ navigation }) => {
  return (
    <SearchedIngredientsResultsProvider>
      <SearchbarTextInputProvider>
        <View style={{ flex:1 }}>
          <MainPageHeader/>
        
          <IngredientsContents navigationObj={navigation}/>
          
          <MainPageFooter navigationObj={navigation}/>
        </View>
      </SearchbarTextInputProvider>
    </SearchedIngredientsResultsProvider>
  );
}

export default IngredientSelection