import React, { useState, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Modal, Portal, Text, Avatar, ToggleButton } from 'react-native-paper';

interface Props {
    ingredientName : string
    modalIsVisible : boolean
    hideModal() : void
}

const IngredientModalPopup = (props : Props) => {
    // Favourite toggle button State and functions
    const [isFavourite, setIsFavourite] = useState<'checked'|'unchecked'>('unchecked');

    function onButtonToggle() {
        setIsFavourite(isFavourite == 'checked' ? 'unchecked' : 'checked');
    };

    return (
        <Portal>
            <Modal visible={props.modalIsVisible} onDismiss={props.hideModal} contentContainerStyle={styles.modalStyles}>
                <View style={styles.innerModal_container}>
                    <View style={styles.avatar_and_favouritesToggle_view}>
                        <Avatar.Image size={100} source={require('../assets/favicon.png')}/>
                        <ToggleButton icon={'star-outline'} size={50} status={isFavourite} onPress={onButtonToggle}/>
                    </View>
                    <Text style={{fontSize: 17, paddingTop: 30}}><b>{props.ingredientName}</b></Text>
                    <Text style={{fontSize: 17, paddingTop: 20}}><b>Category:</b> [Food Category Name Here]</Text>
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
        paddingTop: '40%',
        paddingBottom: '40%',
        paddingLeft: 20,
        paddingRight:20,
    },

    innerModal_container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "space-evenly",
        // borderColor: "#000",
        // borderWidth: 5,
    },

    avatar_and_favouritesToggle_view: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between",
    }
});

export default IngredientModalPopup;