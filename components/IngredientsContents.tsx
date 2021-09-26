// 3rd-party Imports
import React from "react";
import { StyleSheet, View, ScrollView } from 'react-native';
import { Avatar, Text } from 'react-native-paper';
// States
import IngredientsListProvider from '../states/SelectedIngredientsList';
// Components
import IngredientCategory from '../components/IngredientCategory';
import IngredientButtonGrid from "../components/IngredientButtonGrid";

const styles = StyleSheet.create({
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

const IngredientsContents = () => {
    return (
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
    );
}

export default IngredientsContents;