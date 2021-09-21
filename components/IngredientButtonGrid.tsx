import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { Chip, ToggleButton } from 'react-native-paper';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';

interface Props {
    ingredientNames : string[]

    functionForWhenPressed(ingredient:string) : void
}

type ButtonInFlatList = {
    name: string;
    key: number;
};

function makeButtonFlatListData(ingredientNames : string[]) {
    let data : ButtonInFlatList[] = [];
    for (let i = 0; i < ingredientNames.length; i++) {
        data.push({ name : ingredientNames[i], key : i })
    }
    return data
}

const IngredientButtonGrid = (props : Props) => {

    const flatListData = makeButtonFlatListData(props.ingredientNames);
    console.log(typeof flatListData);

    // const [status, setStatus] = useState(false);

    // function onButtonToggle() {
    //     setStatus(status === true ? false : true);
    // }

    function makeMapOfToggleStates(flatListData : ButtonInFlatList[]) : Map<number,boolean> {
        let toggleStates = new Map<number,boolean>();
        for (var i = 0; i < flatListData.length; i++) {
            toggleStates.set(flatListData[i].key, false);
        }

        return toggleStates;
    }

    //Set up array of 
    let toggleButtonStateMap = makeMapOfToggleStates(flatListData);

    function updateToggleButtonState(toggleButtonID : number) {
        if (!toggleButtonStateMap.has(toggleButtonID)) { return; }

        if (toggleButtonStateMap.get(toggleButtonID) == false) { toggleButtonStateMap.set(toggleButtonID, true); }
        else { toggleButtonStateMap.set(toggleButtonID, false); }
    }

    return (
        <div style={{margin: 5}}>
            <FlatList
                data={flatListData}
                renderItem={({item}) => (
                    <ToggleButton
                        icon="bluetooth"
                        value="bluetooth"
                        status={ toggleButtonStateMap.get(item.key) == true ? "checked" : "unchecked" }
                        onPress={ () => { updateToggleButtonState(item.key); } }
                        theme={{ roundness:50 }}
                    />

                    // <Chip 
                    //     icon="information" 
                    //     mode="outlined"
                    //     //selected={true}
                    //     textStyle={styles.ingredientButton_text}
                    //     style={styles.ingredientButton} 
                    //     onPress={() => { props.functionForWhenPressed(item.name); }}>
                    // {item.name}
                    // </Chip>
                )}
                numColumns={2}>
            </FlatList>
        </div>
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

export default IngredientButtonGrid;