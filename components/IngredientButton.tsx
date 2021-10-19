import React, { useState, useEffect, } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Chip } from 'react-native-paper';
// Components
import IngredientModalPopup from './IngredientModalPopup';
// Firebase
import { getImageUrlOfIngredient } from "../firebase-access/Firebase_Client"

interface Props {
    ingredientName : string
    isSelected(ingredientName:string) : boolean
    toggleHandler(ingredientName:string) : void
}

const IngredientButton = (props:Props) => {
    // Modal State and functions
    const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);

    const [ingredientImageUrl, setIngredientImageUrl] = useState<string>("DefaultVal");

    useEffect(() => {
        getImageUrlOfIngredient(props.ingredientName)
            .then(value => setIngredientImageUrl(value));
        // console.log(ingredientImageUrl);
    }, [ingredientImageUrl]);

    return (
        <View>
            <IngredientModalPopup 
                ingredientName={ props.ingredientName } 
                imageUrl={ ingredientImageUrl }
                modalIsVisible={ modalIsVisible } 
                hideModal={() => { setModalIsVisible(false) }}
            />
            <Chip
                avatar={<Avatar.Image size={24} source={{ uri: ingredientImageUrl }}/>}
                mode="outlined"
                selected={ props.isSelected(props.ingredientName) }
                textStyle={ styles.ingredientButton_text }
                style={ styles.ingredientButton } 
                onPress={() => { props.toggleHandler(props.ingredientName); }}
                onLongPress={() => { setModalIsVisible(true) }}>
                {props.ingredientName}
            </Chip>
        </View>
    );
}

const styles = StyleSheet.create({
    ingredientButton: {
        width: "96.5%",
        marginTop: 4,
        marginBottom: 4,
    },

    ingredientButton_text: {
        width: "72%",
        height: 25,
        fontSize: 14,
    },
});

export default IngredientButton;