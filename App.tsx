import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { Portal, Provider as PaperProvider } from 'react-native-paper';
// Screens
import IngredientSelection from "./pages/MainIngredientSelect";
import SelectedIngredientsDisplayScreen from './pages/SelectedIngredientsDisplay';
// States
import AllIngredientsProvider from './states/All_Ingredients';
import IngredientsListProvider from './states/SelectedIngredientsList';

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <AllIngredientsProvider>
        <IngredientsListProvider>
            <Portal.Host>
              <NavigationContainer>
                <Stack.Navigator 
                  initialRouteName="Ingredient Selection"
                  screenOptions={{
                    headerShown: false
                  }}
                >
                  <Stack.Screen name="Ingredient Selection" component={IngredientSelection} />
                  <Stack.Screen
                    name="Selected Ingredients"
                    options={{
                      cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
                      gestureEnabled: true,
                      gestureDirection: 'vertical',
                    }}
                    component={SelectedIngredientsDisplayScreen} />
                  
                </Stack.Navigator>
              </NavigationContainer>
            </Portal.Host>
        </IngredientsListProvider>
      </AllIngredientsProvider>
    </PaperProvider>
  );
}