import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { Portal, Provider as PaperProvider } from 'react-native-paper';
// Screens
import CreateAccountLandingPage from './pages/CreateAccountLandingPage';
import IngredientSelection from "./pages/MainIngredientSelect";
import SelectedIngredientsDisplayScreen from './pages/SelectedIngredientsDisplay';
// States
import CurrentUserProvider from './states/CurrentUser';
import LoginPage from './pages/LoginPage';
import AllIngredientsProvider from './states/All_Ingredients';
import FavouriteIngredientsProvider from './states/All_FavouriteIngredients';
import RecentIngredientsProvider from './states/RecentIngredients';
import IngredientsListProvider from './states/SelectedIngredientsList';
import AllFavouriteIngredientsScreen from './pages/AllFavouritesScreen';
import AllRecentIngredientsScreen from './pages/AllRecentsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <CurrentUserProvider>
        <AllIngredientsProvider>
          <FavouriteIngredientsProvider>
            <RecentIngredientsProvider>
              <IngredientsListProvider>
                  <Portal.Host>
                    <NavigationContainer>
                      <Stack.Navigator 
                        initialRouteName="CreateAccountLandingPage"
                        screenOptions={{
                          headerShown: false
                        }}
                      >
                        <Stack.Screen name="CreateAccountLandingPage" component={CreateAccountLandingPage}/>
                        <Stack.Screen name="LoginPage" component={LoginPage}/>
                        <Stack.Screen name="Ingredient Selection" component={IngredientSelection}/>
                        <Stack.Screen
                          name="Selected Ingredients"
                          options={{
                            cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
                            gestureEnabled: true,
                            gestureDirection: 'vertical',
                          }}
                          component={SelectedIngredientsDisplayScreen}/>
                        <Stack.Screen name="All Favourites List" component={AllFavouriteIngredientsScreen}/>
                        <Stack.Screen name="All Recents List" component={AllRecentIngredientsScreen}/>
                        
                      </Stack.Navigator>
                    </NavigationContainer>
                  </Portal.Host>
              </IngredientsListProvider>
            </RecentIngredientsProvider>
          </FavouriteIngredientsProvider>
        </AllIngredientsProvider>
      </CurrentUserProvider>
    </PaperProvider>
  );
}