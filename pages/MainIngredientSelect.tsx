import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Appbar, Avatar, Button, Card, Title, Paragraph, Badge, Text, Searchbar, Provider as PaperProvider } from 'react-native-paper';

import IngredientCategory from '../components/IngredientCategory';
import IngredientButtonGrid from "../components/IngredientButtonGrid"

import "../styles/styles.css"

const styles = StyleSheet.create({
  top: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
  },

  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: "50px",
  },

  searchBar: {
    marginTop: 10,
    height: "35px",
    width: "200px",
  },

  ingredientsContents: {
    flex: 1,
    marginTop: "50px",
    marginBottom: "50px",
    paddingTop: "10px",
  },

  ingredientSection_heading: {
    margin: 10,
    fontSize: 20,
  },
});

const IngredientSelection = () => {

  const _goBack = () => console.log('Went back');

  const _handleSearch = () => console.log('Searching');

  const _handleMore = () => console.log('Shown more');

  const LeftContent = props => <Avatar.Icon {...props} icon="folder" />


  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  return (
    // <View style={styles.container}>
    //   <Text>This is the Main Ingredient Selection page!</Text>
    //   <StatusBar style="auto" />
    // </View>
    //<View style={{flex: 1}}>
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

            <IngredientButtonGrid ingredientNames={["Chili Oil"]}/>

            <Text style={styles.ingredientSection_heading}>Recently Used Ingredients</Text>

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

        <div className={"header"}>
          <Appbar.Header>
            <div>
              <Appbar.Content title="Title" subtitle="Subtitle" />
            </div>
            <div>
              <Searchbar style={styles.searchBar}
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
              />
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

export default IngredientSelection