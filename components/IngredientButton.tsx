import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Chip, Modal, Portal, Text } from 'react-native-paper';

interface Props {
    ingredientName : string
    isSelected(ingredientName:string) : boolean
    toggleHandler(ingredientName:string) : void
}

const IngredientButton = (props:Props) => {
    const [modalIsVisible, setModalIsVisible] = useState(false);

    const showModal = () => setModalIsVisible(true);
    const hideModal = () => setModalIsVisible(false);
    const containerStyle = {backgroundColor: 'white', padding: 20};

    return (
        <>
            <Portal>
                <Modal visible={modalIsVisible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                <Text>Example Modal.  Click outside this area to dismiss.</Text>
                </Modal>
            </Portal>
            <Chip 
                icon="information"
                mode="outlined"
                selected={ props.isSelected(props.ingredientName) }
                textStyle={ styles.ingredientButton_text }
                style={ styles.ingredientButton } 
                onPress={() => { props.toggleHandler(props.ingredientName); }}
                onLongPress={() => { showModal(); }}>
                {props.ingredientName}
            </Chip>
        </>
    );
}

const styles = StyleSheet.create({
    // ingredientButton_container: {
    //     display: "flex",
    //     justifyContent: "space-evenly",
    // },

    ingredientButton: {
      //backgroundColor: "purple",
      width: "47.5%",
      marginLeft: "1.25%",
      marginRight: "1.25%",
      marginTop: 4,
      marginBottom: 4,
    },

    ingredientButton_text: {
    //   display: 'flex',
    //   justifyContent: "center",
      paddingLeft: "20px",
      paddingRight: "20px",
      fontSize: 20,
    }
});

export default IngredientButton;