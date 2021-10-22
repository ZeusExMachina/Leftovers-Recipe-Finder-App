import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Chip } from 'react-native-paper';
// Components
import IngredientModalPopup from './IngredientModalPopup';
// States
import { GetUrlOfIngredientImage } from '../states/All_IngredientImages';
// Styling
import { TertiaryThemeColour } from "../styling/Styling";

/**
 * The button representing a single ingredient that can be used to find recipes with. Has a corresponding IngredientModalPopup as a child.
 */

interface Props {
    ingredientName : string
    isSelected(ingredientName:string) : boolean
    toggleHandler(ingredientName:string) : void
}

const IngredientButton = (props:Props) => {
    // Modal component state and functions
    const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);
    // Image URL state
    const getUrlOfIngredientImage = useContext(GetUrlOfIngredientImage);
    const [ingredientImageUrl, setIngredientImageUrl] = useState<string>("Default");
    useEffect(() => {
        const urlOfIngredientImage : string|undefined = getUrlOfIngredientImage(props.ingredientName);
        if (urlOfIngredientImage == undefined) { setIngredientImageUrl("<no url>"); }
        else { setIngredientImageUrl(urlOfIngredientImage); }
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
                avatar={<Avatar.Image size={24} style={{ backgroundColor:TertiaryThemeColour }} source={{ uri: ingredientImageUrl }}/>}
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