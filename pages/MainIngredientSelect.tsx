// 3rd-paarty Imports
import React from "react";
import { StyleSheet } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
// Components
import IngredientsContents from "../components/IngredientsContents";
import MainPageHeader from "../components/MainPageHeader";
import MainPageFooter from "../components/MainPageFooter";
// States
import SearchbarTextInputProvider from '../states/SearchedIngredientsResults';

const IngredientSelection = ({ navigation }) => {
  return (
      <PaperProvider>
        <SearchbarTextInputProvider>
          <IngredientsContents/>

          <MainPageHeader/>
        </SearchbarTextInputProvider>

        <MainPageFooter navigationObj={navigation}/>
      </PaperProvider> 
  );
}

const styles = StyleSheet.create({

});

export default IngredientSelection