// 3rd-party Imports
import React, { useContext } from "react";
import { StyleSheet, View } from 'react-native';
import { Appbar, Button, Text } from 'react-native-paper';
// States
import { SelectedIngredients } from '../states/SelectedIngredientsList';
// Components
import IngredientButtonGrid from "../components/IngredientButtonGrid";
import { ScrollView } from "react-native-gesture-handler";

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

    const {ingredientsList, updateIngredientsList} = useContext(SelectedIngredients);
    console.log(ingredientsList);

    return (
        <View style={{flex:1}}>
            <View style={{height:50, borderWidth:10, borderColor:"#000"}}>
                <Appbar.Header style={styles.top}>
                    <View style={{alignItems: "center"}}>
                        <ContentTitle title={'Selected Ingredients'} style={{color:'white'}} />
                    </View>
                </Appbar.Header>
            </View>

            <View>
                <IngredientButtonGrid ingredientNames={ingredientsList}/>
            </View>
            
            <View style={{height:60, borderWidth:10, borderColor:"#000"}}>
                <Appbar style={styles.bottom}>
                    <Button 
                        icon="close" 
                        mode="contained" 
                        style={styles.bottomBar_button} 
                        onPress={() => { switchToIngredientSelectionScreen(); }}>
                        Selected Ingredients
                    </Button>
                </Appbar>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    // footer: {
    //     position: 'absolute',
    //     bottom: 50,
    //     left: 0,
    //     right: 0,
    //     marginBottom: '0px',
    //     height: '60px',
    // },

    top: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 50,
        display: "flex",
        justifyContent: "center",
    },

    footer: {
        //position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        marginBottom: 0,
        height: 60,
    },

    bottom: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 60,
        display: "flex",
        justifyContent: "space-evenly",
    },

    bottomBar_button: {
        height: 40,
        width: "45%",
    },
});

export default SelectedIngredientsDisplayScreen;