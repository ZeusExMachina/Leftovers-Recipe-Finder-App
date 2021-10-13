import React, { useState, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Chip } from 'react-native-paper';
// Components
import IngredientModalPopup from './IngredientModalPopup';

interface Props {
    ingredientName : string
    isSelected(ingredientName:string) : boolean
    toggleHandler(ingredientName:string) : void
}

const IngredientButton = (props:Props) => {
    // Modal State and functions
    const [modalIsVisible, setModalIsVisible] = useState(false);

    return (
        <>
            <IngredientModalPopup 
                ingredientName={props.ingredientName} 
                modalIsVisible={modalIsVisible} 
                hideModal={() => { setModalIsVisible(false) }}
            />
            <Chip
                icon="information"
                mode="outlined"
                selected={ props.isSelected(props.ingredientName) }
                textStyle={ styles.ingredientButton_text }
                style={ styles.ingredientButton } 
                onPress={() => { props.toggleHandler(props.ingredientName); }}
                onLongPress={() => { setModalIsVisible(true) }}>
                {props.ingredientName}
            </Chip>
        </>
    );
}

const styles = StyleSheet.create({
    ingredientButton: {
      width: "96.5%",
      marginTop: 4,
      marginBottom: 4,
    },

    ingredientButton_text: {
      paddingLeft: 20,
      paddingRight: 20,
      fontSize: 20,
    },
});

export default IngredientButton;