// 3rd-party Imports
import React, { useContext } from "react";
import { StyleSheet, View, ScrollView } from 'react-native';
import { Appbar, Avatar, Button, Text } from 'react-native-paper';
// Components
import IngredientButtonGrid from "../components/IngredientButtonGrid";
// States
import { GetRecentIngredientsAsArray } from "../states/RecentIngredients";
// Styling
import { PrimaryThemeColour } from "../styling/Styling";

const ContentTitle = ({ title, style }) => (
    <Appbar.Content
        title={<Text style={style}> {title} </Text>}
        style={{ alignItems: 'center' }}
    />
);

const AllRecentIngredientsScreen = ({ navigation }) => {
    const getRecentIngredientsAsArray = useContext(GetRecentIngredientsAsArray);

    const switchToIngredientSelectionScreen = () => {
        navigation.navigate("Ingredient Selection");
    }

    return (
        <View style={{flex:1}}>
            <View style={styles.header}>
                <Appbar.Header style={styles.top}>
                    <Button 
                        mode="contained"
                        compact={true}
                        theme={{ roundness:20, colors: { primary: PrimaryThemeColour } }}
                        style={{ position:"absolute", top:25, left:10, width:40, height:40, backgroundColor:PrimaryThemeColour }}
                        onPress={() => { switchToIngredientSelectionScreen(); }}
                    >
                        <Avatar.Icon icon="arrow-left" style={{ backgroundColor:PrimaryThemeColour }} size={28}></Avatar.Icon>
                    </Button>
                    <View style={{alignItems: "center", top:32, left:5 }}>
                        <ContentTitle title={'Recently Used Ingredients'} style={{position:"relative", fontSize:19, color:'white'}} />
                    </View>
                </Appbar.Header>
            </View>
            
            <ScrollView>
                <IngredientButtonGrid ingredientNames={getRecentIngredientsAsArray()}/>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        position: "relative",
        top: 0,
        left: 0,
        right: 0,
        marginTop: 0,
        height: 75,
    },

    top: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 75,
        display: "flex",
        justifyContent: "center",
        backgroundColor:PrimaryThemeColour,
    },
});

export default AllRecentIngredientsScreen;