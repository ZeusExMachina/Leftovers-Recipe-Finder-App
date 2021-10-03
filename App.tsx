import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// Screens
import IngredientSelection from "./pages/MainIngredientSelect";
import SelectedIngredientsDisplayScreen from './pages/SelectedIngredientsDisplay';
import RecipeResults from "./pages/RecipeResults";
// States
import IngredientsListProvider from './states/SelectedIngredientsList';
// Styles for divs
import "./styles/styles.css"

const Stack = createStackNavigator();

export default function App() {
  return (

    <IngredientsListProvider>
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
    </IngredientsListProvider>
  );
}