// 3rd-party Imports
import React, { useContext } from "react";
import { StyleSheet, View, ScrollView } from 'react-native';
import { Appbar, Button, Text } from 'react-native-paper';
// States
import { SelectedIngredients } from '../states/SelectedIngredientsList';
// Components
import IngredientButtonGrid from "../components/IngredientButtonGrid";
// Styling
import { PrimaryThemeColour } from "../styling/Styling";

const ContentTitle = ({ title, style }) => (
    <Appbar.Content
        title={<Text style={style}> {title} </Text>}
        style={{ alignItems: 'center' }}
    />
);

const SelectedIngredientsDisplayScreen = ({ navigation }) => {
    const switchToIngredientSelectionScreen = () => {
        navigation.navigate("Ingredient Selection");
    }

    const selectedIngredients = useContext(SelectedIngredients);

    return (
        <View style={{flex:1}}>
            <View style={styles.header}>
                <Appbar.Header style={styles.top}>
                    <ContentTitle title={'Selected Ingredients'} style={{fontSize:22, color:'white'}} />
                </Appbar.Header>
            </View>
            
            <ScrollView>
                <IngredientButtonGrid ingredientNames={selectedIngredients}/>
            </ScrollView>
            
            <View style={styles.footer}>
                <Appbar style={styles.bottom}>
                    <Button 
                        icon="arrow-left" 
                        mode="contained" 
                        style={styles.bottomBar_button} 
                        onPress={() => { switchToIngredientSelectionScreen(); }}>
                        Back
                    </Button>
                </Appbar>
            </View>
            
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        position: "relative",
        top: 0,
        left: 0,
        right: 0,
        marginTop: 0,
        height: 55,
    },

    top: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 55,
        display: "flex",
        justifyContent: "center",
        backgroundColor: PrimaryThemeColour,
    },

    footer: {
        position: 'relative',
        bottom: 0,
        left: 0,
        right: 0,
        height: 55,
    },

    bottom: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 60,
        display: "flex",
        justifyContent: "space-evenly",
        backgroundColor: PrimaryThemeColour,
    },

    bottomBar_button: {
        height: 40,
        width: "45%",
        fontSize: 17,
        backgroundColor: PrimaryThemeColour,
    },
});

export default SelectedIngredientsDisplayScreen;