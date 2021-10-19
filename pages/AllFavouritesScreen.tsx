// 3rd-party Imports
import React, { useContext } from "react";
import { StyleSheet, View } from 'react-native';
import { Appbar, Button, Text } from 'react-native-paper';
// Components
import IngredientButtonGrid from "../components/IngredientButtonGrid";
// States
import { FavouriteIngredients } from "../states/All_FavouriteIngredients";

const ContentTitle = ({ title, style }) => (
    <Appbar.Content
        title={<Text style={style}> {title} </Text>}
        style={{ alignItems: 'center' }}
    />
);

const AllFavouriteIngredients = ({ navigation }) => {
    const {favouriteIngredients, setFavouriteIngredients} = useContext(FavouriteIngredients);

    const switchToIngredientSelectionScreen = () => {
        navigation.navigate("Ingredient Selection");
    }

    return (
        <View style={{flex:1}}>
            <View style={styles.header}>
                <Appbar.Header style={styles.top}>
                    <Button 
                        icon="arrow-left" 
                        mode="contained" 
                        style={{}} 
                        onPress={() => { switchToIngredientSelectionScreen(); }}>
                        Back
                    </Button>
                    <ContentTitle title={'All Favourite Ingredients'} style={{marginTop:15, fontSize:22, color:'white'}} />
                </Appbar.Header>
            </View>
            
            <IngredientButtonGrid ingredientNames={favouriteIngredients}/>
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
    },
});

export default AllFavouriteIngredients;