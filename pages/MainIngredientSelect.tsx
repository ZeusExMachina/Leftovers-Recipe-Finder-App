import React, { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Appbar, Avatar, Text, Searchbar, IconButton, Provider as PaperProvider } from 'react-native-paper';

import IngredientCategory from '../components/IngredientCategory';
import IngredientButtonGrid from "../components/IngredientButtonGrid"

import "../styles/styles.css"

const IngredientSelection = () => {

  const _goBack = () => console.log('Went back');

  const _handleSearch = () => console.log('Searching');

  const _handleMore = () => console.log('Shown more');

  const LeftContent = props => <Avatar.Icon {...props} icon="folder" />


  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = query => setSearchQuery(query);

  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  function addIngredient(ingredient : string) {
    if (!selectedIngredients.includes(ingredient)) {
      let newSelectedIngredients : string[] = selectedIngredients;
      newSelectedIngredients.push(ingredient);
      setSelectedIngredients(newSelectedIngredients);
    }
    console.log(selectedIngredients);
  }

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
            <Text style={styles.ingredientSection_heading}>Favourite Ingredients</Text>

            <IngredientButtonGrid ingredientNames={["Chili Oil"]} functionForWhenPressed={addIngredient}/>

            <Text style={styles.ingredientSection_heading}>Recently Used Ingredients</Text>

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
              <div>
                <Appbar.Content title="Select ingredients you have" />
              </div>
              <div>
                <Searchbar style={styles.searchBar}
                  placeholder="Search"
                  onChangeText={onChangeSearch}
                  value={searchQuery}
                />
                {/* <IconButton icon="microphone" /> */}
              </div>
            </div>
          </Appbar.Header>
        </div>  

        <div className={"footer"}>
          <Appbar style={styles.bottom}>
            <Appbar.Action icon="format-list-bulleted-square" onPress={() => console.log('Pressed ingredient list')} />
            <Appbar.Action
              icon="archive"
              onPress={() => console.log('Pressed archive')}
            />
            <Appbar.Action icon="mail" onPress={() => console.log('Pressed mail')} />
            <Appbar.Action icon="label" onPress={() => console.log('Pressed label')} />
            <Appbar.Action
              icon="delete"
              onPress={() => console.log('Pressed delete')}
            />
          </Appbar>
        </div>
      </PaperProvider>
    //</View>
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
    height: "50px",
  },

  searchBar: {
    marginTop: 7,
    height: "35px",
    width: "90%",
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