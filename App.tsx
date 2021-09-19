import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Appbar, Provider as PaperProvider } from 'react-native-paper';

import IngredientSelection from "./pages/MainIngredientSelect";
import RecipeResults from "./pages/RecipeResults";

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

    <IngredientSelection />
  );
}