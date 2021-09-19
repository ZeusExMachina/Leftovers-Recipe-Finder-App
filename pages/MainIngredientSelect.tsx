import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Appbar, Avatar, Button, Card, Title, Paragraph, Badge, Text, Provider as PaperProvider } from 'react-native-paper';

import IngredientCategory from '../components/IngredientCategory';
import IngredientButtonGrid from "../components/IngredientButtonGrid"

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
  },
});

const IngredientSelection = () => {

  const _goBack = () => console.log('Went back');

  const _handleSearch = () => console.log('Searching');

  const _handleMore = () => console.log('Shown more');

  const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

  return (
    // <View style={styles.container}>
    //   <Text>This is the Main Ingredient Selection page!</Text>
    //   <StatusBar style="auto" />
    // </View>
    
    <PaperProvider>
      <Appbar.Header>
        <Appbar.BackAction onPress={_goBack} />
        <Appbar.Content title="Title" subtitle="Subtitle" />
        <Appbar.Action icon="magnify" onPress={_handleSearch} />
        <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
      </Appbar.Header>

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

      <Text>Favourite Ingredients</Text>

      <IngredientButtonGrid ingredientNames={["Chili Oil"]}/>

      <Text>Recently Used Ingredients</Text>

      <IngredientButtonGrid ingredientNames={["Tortilla", "Cheese"]}/>

      <Text>Food Categories</Text>
      <IngredientCategory categoryName="Meat"/>
      <IngredientCategory categoryName="Vegetables"/>
      <IngredientCategory categoryName="Fruits"/>
      <IngredientCategory categoryName="Dairy"/>
      <IngredientCategory categoryName="Vegetables"/>

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
    </PaperProvider>
  );
}

export default IngredientSelection