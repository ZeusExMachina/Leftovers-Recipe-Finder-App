import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Portal, Modal, Provider as PaperProvider } from 'react-native-paper';
// Screens
import IngredientSelection from "./pages/MainIngredientSelect";
import SelectedIngredientsDisplayScreen from './pages/SelectedIngredientsDisplay';
import RecipeResults from "./pages/RecipeResults";
// States
import AllIngredientsProvider from './states/All_Ingredients';
import IngredientsListProvider from './states/SelectedIngredientsList';
import ScrollingEnabledProvider from './states/ScrollingEnabled';
// Styles for divs
//import "./styles/styles.css"

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      {/* <AllIngredientsProvider> */}
        <IngredientsListProvider>
          <ScrollingEnabledProvider>
            <Portal.Host>
              <NavigationContainer>
                <Stack.Navigator 
                  initialRouteName="Ingredient Selection"
                  screenOptions={{
                    headerShown: false
                  }}
                >
                  <Stack.Screen name="Ingredient Selection" component={IngredientSelection} />
                  <Stack.Screen name="Selected Ingredients" component={SelectedIngredientsDisplayScreen} />
                  
                </Stack.Navigator>
              </NavigationContainer>
            </Portal.Host>
          </ScrollingEnabledProvider>
        </IngredientsListProvider>
      {/* </AllIngredientsProvider> */}
    </PaperProvider>
  );
}