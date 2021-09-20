import React, { useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Appbar, Avatar, Text, Searchbar, IconButton, Button, Provider as PaperProvider } from 'react-native-paper';

import IngredientCategory from '../components/IngredientCategory';
import IngredientButtonGrid from "../components/IngredientButtonGrid"

import "../styles/styles.css"

const IngredientSelection = () => {

  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = query => setSearchQuery(query);

  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  function addIngredient(ingredient : string) {
    let newSelectedIngredients : string[] = [];
    newSelectedIngredients = newSelectedIngredients.concat(selectedIngredients);
    
    if (selectedIngredients.includes(ingredient)) {
      // If item is selected, deselect it by removing it from the list
      let indexOfIngredient : number = newSelectedIngredients.indexOf(ingredient);
      if (indexOfIngredient != -1) { newSelectedIngredients.splice(indexOfIngredient, 1); }
      setSelectedIngredients(newSelectedIngredients);
    } else {
      console.log("is not in - will add");
      // If item is not selected, then add it to the list
      newSelectedIngredients.push(ingredient);
      setSelectedIngredients(newSelectedIngredients);
    }
  }

  useEffect(() => {
    console.log("useEffect", selectedIngredients);
  }, [selectedIngredients])

  return (
      <PaperProvider>
        
          {/* <Badge>3</Badge>

          <Card>
            <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />
            <Card.Content>
              <Title>Card title</Title>
              <Paragraph>Card content</Paragraph>
            </Card.Content>
            <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
            <Card.Actions>
              <Button>Cancel</Button>
              <Button>Ok</Button>
            </Card.Actions>
          </Card> */}

        <View style={styles.ingredientsContents}>
          <ScrollView>
            <Text style={styles.ingredientSection_heading}>
              Favourite Ingredients
              <Avatar.Icon size={28} icon="star" style={styles.contentSection_avatarIcon} />
            </Text>

            <IngredientButtonGrid ingredientNames={["Chili Oil"]} functionForWhenPressed={addIngredient}/>

            <Text style={styles.ingredientSection_heading}>
              Recently Used Ingredients
              <Avatar.Icon size={28} icon="history" style={styles.contentSection_avatarIcon} />
            </Text>

            <IngredientButtonGrid ingredientNames={["Tortilla", "Cheese"]} functionForWhenPressed={addIngredient}/>

            <Text style={styles.ingredientSection_heading}>Food Categories</Text>

            <IngredientCategory categoryName="Meat" functionForWhenPressed={addIngredient}/>
            <IngredientCategory categoryName="Vegetables" functionForWhenPressed={addIngredient}/>
            <IngredientCategory categoryName="Fruits" functionForWhenPressed={addIngredient}/>
            <IngredientCategory categoryName="Dairy" functionForWhenPressed={addIngredient}/>
            <IngredientCategory categoryName="Baking" functionForWhenPressed={addIngredient}/>
            <IngredientCategory categoryName="Alcohol" functionForWhenPressed={addIngredient}/>
          </ScrollView>
        </View>

        <div className={"header"}>
          <Appbar.Header style={styles.top}>
            <div>
              {/* <div>
                <Appbar.Content title="Select ingredients you have" />
              </div> */}

                <Searchbar style={styles.searchBar}
                  placeholder="Search"
                  onChangeText={onChangeSearch}
                  value={searchQuery}
                />
                {/* <IconButton icon="microphone" /> */}
            </div>
          </Appbar.Header>
        </div>  

        <div className={"footer"}>
          <Appbar style={styles.bottom}>
            <Button icon="format-list-bulleted-square" mode="contained" onPress={() => console.log('Pressed')}>
              Press me
            </Button>
            <Button icon="format-list-bulleted-square" mode="contained" onPress={() => console.log('Pressed')}>
              Press me
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

  searchBar: {
    marginTop: 7,
    height: "35px",
    width: "90%",
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
});

export default IngredientSelection