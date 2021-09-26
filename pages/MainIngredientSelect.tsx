import React, { useState } from "react";
import { StyleSheet, View, ScrollView } from 'react-native';
import { Appbar, Avatar, Text, Searchbar, IconButton, Button, Provider as PaperProvider } from 'react-native-paper';
import IngredientsListProvider from '../states/SelectedIngredientsList';

// Imported Components
import IngredientCategory from '../components/IngredientCategory';
import IngredientButtonGrid from "../components/IngredientButtonGrid";

import "../styles/styles.css"

const ContentTitle = ({ title, style }) => (
  <Appbar.Content
    title={<Text style={style}> {title} </Text>}
    style={{ alignItems: 'center' }}
  />
);

const IngredientSelection = () => {

  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = query => setSearchQuery(query);

  return (
      <PaperProvider>
        <IngredientsListProvider>
          <View style={styles.ingredientsContents}>
            <ScrollView>
              <Text style={styles.ingredientSection_heading}>
                Favourite Ingredients
                <Avatar.Icon size={28} icon="star" style={styles.contentSection_avatarIcon} />
              </Text>

              <IngredientButtonGrid ingredientNames={["Chili Oil"]}/>

              <Text style={styles.ingredientSection_heading}>
                Recently Used Ingredients
                <Avatar.Icon size={28} icon="history" style={styles.contentSection_avatarIcon} />
              </Text>

              <IngredientButtonGrid ingredientNames={["Tortilla", "Cheese"]}/>

              <Text style={styles.ingredientSection_heading}>Food Categories</Text>

              <IngredientCategory categoryName="Meat"/>
              <IngredientCategory categoryName="Vegetables"/>
              <IngredientCategory categoryName="Fruits"/>
              <IngredientCategory categoryName="Dairy"/>
              <IngredientCategory categoryName="Baking"/>
              <IngredientCategory categoryName="Alcohol"/>
            </ScrollView>
          </View>
        </IngredientsListProvider>

        <div className={"header"}>
          <Appbar.Header style={styles.top}>
            <div className={"header_inner"}>
            <ContentTitle title={'Select ingredients you have'} style={{color:'white'}} />
              <Searchbar style={styles.searchBar}
                placeholder="Search"
                theme={{ roundness:17 }}
                onChangeText={onChangeSearch}
                value={searchQuery}
              />
              {/* <IconButton icon="microphone" /> */}
            </div>
          </Appbar.Header>
        </div>

        <div className={"footer"}>
          <Appbar style={styles.bottom}>
            <Button 
              icon="format-list-bulleted-square" 
              mode="contained" 
              style={styles.bottomBar_button} 
              onPress={() => console.log('Pressed')}>
              Selected Ingredients
            </Button>
            <Button 
              icon="arrow-right"
              mode="contained"
              contentStyle={{ flexDirection:"row-reverse" }}
              style={styles.bottomBar_button} 
              onPress={() => console.log('Pressed')}>
              Find Recipes
            </Button>
          </Appbar>
        </div>
      </PaperProvider>
  );
}

const styles = StyleSheet.create({
  top: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: "85px",
    display: "flex",
    justifyContent: "center",
  },

  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: "60px",
    display: "flex",
    justifyContent: "space-evenly",
  },

  screenTitle: {
    borderColor: "#000",
    borderWidth: 5,
  },

  searchBar: {
    marginTop: 7,
    height: "35px",
    //width: "80%",
  },

  contentSection_avatarIcon: {
    marginLeft: 5,
  },

  ingredientSection_heading: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 8,
    fontSize: 20,
  },

  ingredientsContents: {
    flex: 1,
    marginTop: "85px",
    marginBottom: "50px",
    paddingTop: "10px",
  },

  bottomBar_button: {
    height: "40px",
    width: "45%",
  },
});

export default IngredientSelection