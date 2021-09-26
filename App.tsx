import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import IngredientSelection from "./pages/MainIngredientSelect";
import RecipeResults from "./pages/RecipeResults";

const Stack = createStackNavigator();

function IngredientSelectionScreen() {
  return (
    <IngredientSelection />
  );
}

export default function App() {
  return (
    // <View style={styles.container}>
    //   <Text>Open up App.tsx to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>

    // <BrowserRouter>
    //   <Route path = "/" exact={true} component = {IngredientSelection} />
    //   <Route path = "/ingredient-select" component = {IngredientSelection} />
    //   <Route path = "/recipe-results" component = {RecipeResults} />
    // </BrowserRouter>
    
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="IngredientSelection"
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="IngredientSelection" component={IngredientSelectionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}