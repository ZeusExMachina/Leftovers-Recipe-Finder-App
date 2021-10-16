import React, { useState, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Modal, Portal, Text, Avatar, ToggleButton } from 'react-native-paper';
// States
import { AllIngredients } from "../states/All_Ingredients";

interface Props {
    ingredientName : string
    imageUrl : string | undefined
    modalIsVisible : boolean
    hideModal() : void
}

const IngredientModalPopup = (props : Props) => {
    // Favourite toggle button State and functions
    const [isFavourite, setIsFavourite] = useState<'checked'|'unchecked'>('unchecked');

    function onButtonToggle() {
        setIsFavourite(isFavourite == 'checked' ? 'unchecked' : 'checked');
    };

    const {allIngredients, setAllIngredients} = useContext(AllIngredients);

    return (
        <Portal>
            <Modal visible={props.modalIsVisible} onDismiss={props.hideModal} contentContainerStyle={styles.modalStyles}>
                <View style={styles.innerModal_container}>
                    <View style={styles.avatar_and_favouritesToggle_view}>
                        <Avatar.Image size={90} source={{ uri: props.imageUrl }}/>
                        <ToggleButton icon={'star-outline'} size={50} status={isFavourite} onPress={onButtonToggle} style={{width:50, height:50}}/>
                    </View>
                    <Text style={{fontSize: 20, paddingTop: 30}}>{props.ingredientName}</Text>
                    <Text style={{fontSize: 20, paddingTop: 20}}>Category: {allIngredients.get(props.ingredientName)}</Text>
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
    }
});

export default IngredientModalPopup;