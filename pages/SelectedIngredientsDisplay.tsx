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
            <View style={styles.header}>
                <Appbar.Header style={styles.top}>
                    <ContentTitle title={'Selected Ingredients'} style={{marginTop:15, fontSize:22, color:'white'}} />
                </Appbar.Header>
            </View>
            
            <IngredientButtonGrid ingredientNames={ingredientsList}/>
            
            <View style={styles.footer}>
                <Appbar style={styles.bottom}>
                    <Button 
                        icon="close" 
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
        height: 60,
        //height:50,
        //borderWidth:10, borderColor:"#000"
    },

    top: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 60,
        display: "flex",
        justifyContent: "center",
    },

    footer: {
        position: 'relative',
        bottom: 0,
        left: 0,
        right: 0,
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