import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Modal, Portal, Text, Avatar, ToggleButton } from 'react-native-paper';
// States
import { AllIngredients } from "../states/All_Ingredients";
import { FavouriteIngredients, ToggleFavouriteIngredient } from '../states/All_FavouriteIngredients';
// Styling
import { SecondaryThemeColour, TertiaryThemeColour } from "../styling/Styling";

interface Props {
    ingredientName : string
    imageUrl : string | undefined
    modalIsVisible : boolean
    hideModal() : void
}

const IngredientModalPopup = (props : Props) => {
    const allIngredients = useContext(AllIngredients);
    const favouriteIngredients = useContext(FavouriteIngredients);
    const toggleFavouriteIngredientInFirebase = useContext(ToggleFavouriteIngredient);

    const [isFavourite, setIsFavourite] = useState<'checked'|'unchecked'>(checkIfIngredientIsFavourite());

    useEffect(() => {
        setIsFavourite(checkIfIngredientIsFavourite())
    }, [favouriteIngredients]);

    async function onButtonToggle() {
        toggleFavouriteIngredientInFirebase(props.ingredientName);
    };

    function checkIfIngredientIsFavourite() : 'checked'|'unchecked' {
        if (favouriteIngredients.includes(props.ingredientName)) { return 'checked';}
        else { return 'unchecked'; }
    }

    return (
        <Portal>
            <Modal visible={props.modalIsVisible} onDismiss={props.hideModal} contentContainerStyle={styles.modalStyles}>
                <View style={styles.innerModal_container}>
                    <View style={styles.avatar_and_favouritesToggle_view}>
                        <Avatar.Image
                            size={90}
                            style={{ backgroundColor:TertiaryThemeColour }}
                            source={{ uri: props.imageUrl }}
                        />
                        <ToggleButton
                            icon={'star-outline'}
                            size={50}
                            theme={{ roundness:50 }}
                            style={ (isFavourite == "checked") ? styles.favouritesButton_selected : styles.favouritesButton_unselected }
                            status={isFavourite}
                            onPress={onButtonToggle}
                        />
                    </View>
                    <Text style={{ fontSize: 20, paddingTop: 30 }}>{props.ingredientName}</Text>
                    <Text style={{ fontSize: 20, paddingTop: 20 }}>Category: {allIngredients.get(props.ingredientName)}</Text>
                </View>
            </Modal>
        </Portal>
    );
}

const styles = StyleSheet.create({
    modalStyles: {
        backgroundColor: 'white',
        height: '50%',
        marginTop: '25%',
        marginBottom: '25%',
        marginLeft: '12.5%',
        marginRight: '12.5%',
        paddingLeft: 20,
        paddingRight:20,
    },

    innerModal_container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "center",
    },

    avatar_and_favouritesToggle_view: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between",
    },

    favouritesButton_unselected: {
        width:50,
        height:50,
    },

    favouritesButton_selected: {
        width:50,
        height:50,
        backgroundColor:SecondaryThemeColour,
    }
});

export default IngredientModalPopup;