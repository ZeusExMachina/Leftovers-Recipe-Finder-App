// 3rd-party Imports
import React, { useContext } from "react";
import { StyleSheet, View, ScrollView } from 'react-native';
import { Avatar, Text } from 'react-native-paper';
// Components
import IngredientCategory from '../components/IngredientCategory';
import IngredientButtonGrid from "../components/IngredientButtonGrid";

const IngredientsContents = () => {
    return (
        <View style={styles.ingredientsContents}>
            <ScrollView scrollEnabled={true} style={styles.ingredientsContents}>
                <View style={{flexDirection:"row"}}>
                    <Text style={styles.ingredientSection_heading}>
                        Favourite Ingredients
                    </Text>
                    <Avatar.Icon size={28} icon="star" style={styles.contentSection_avatarIcon} />
                </View>

                <IngredientButtonGrid ingredientNames={["Chili Oil"]}/>

                <View style={{flexDirection:"row"}}>
                    <Text style={styles.ingredientSection_heading}>
                        Recently Used Ingredients
                    </Text>
                    <Avatar.Icon size={28} icon="history" style={styles.contentSection_avatarIcon} />
                </View>

                <IngredientButtonGrid ingredientNames={["Tortilla", "Cheese"]}/>

                <Text style={styles.ingredientSection_heading}>Food Categories</Text>

                <IngredientCategory categoryName="Meat"/>
                <IngredientCategory categoryName="Vegetables"/>
                <IngredientCategory categoryName="Fruits"/>
                <IngredientCategory categoryName="Dairy"/>
                <IngredientCategory categoryName="Baking"/>
                <IngredientCategory categoryName="Alcohol"/>
                <IngredientCategory categoryName="Seasonings"/>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    ingredientsContents: {
        flex: 1,
        paddingTop: 10,
        paddingBottom: 5,
    },

    contentSection_avatarIcon: {
        marginLeft: 5,
    },
    
    ingredientSection_heading: {
        marginTop: 0,
        marginBottom: 5,
        marginLeft: 8,
        fontSize: 20,
    },
});

export default IngredientsContents;