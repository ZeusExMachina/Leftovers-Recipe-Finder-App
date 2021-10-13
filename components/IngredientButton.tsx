import React, { useState, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Chip } from 'react-native-paper';
import { initialWindowMetrics } from 'react-native-safe-area-context';
// Components
import IngredientModalPopup from './IngredientModalPopup';
// States
import { ScrollEnabled } from "../states/ScrollingEnabled";

interface Props {
    ingredientName : string
    isSelected(ingredientName:string) : boolean
    toggleHandler(ingredientName:string) : void
}

const IngredientButton = (props:Props) => {
    const {scrollEnabled, setScrollEnabled} = useContext(ScrollEnabled);

    // Modal State and functions
    const [modalIsVisible, setModalIsVisible] = useState(false);

    function showModal() {
        setModalIsVisible(true);
        setScrollEnabled(false);
    }
    function hideModal() {
        setModalIsVisible(false);
        setScrollEnabled(true);
    }

    return (
        <>
            <IngredientModalPopup 
                ingredientName={props.ingredientName} 
                modalIsVisible={modalIsVisible} 
                hideModal={hideModal}
            />
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
    ingredientButton: {
      //backgroundColor: "purple",
      width: "96.5%",
      marginTop: 4,
      marginBottom: 4,
    },

    ingredientButton_text: {
    //   display: 'flex',
    //   justifyContent: "center",
      paddingLeft: 20,
      paddingRight: 20,
      fontSize: 20,
    },
});

export default IngredientButton;