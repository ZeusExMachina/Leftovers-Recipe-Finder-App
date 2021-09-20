import * as React from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { Chip } from 'react-native-paper';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';

interface Props {
    ingredientNames : string[]

    functionForWhenPressed(ingredient:string) : void
}

function makeChipGridData(ingredientNames : string[]) {
    let data : {name:string, key:number}[] = [];
    for (let i = 0; i < ingredientNames.length; i++) {
        data.push({ name : ingredientNames[i], key : i })
    }
    return data
}

const IngredientButtonGrid = (props : Props) => {

    const data = makeChipGridData(props.ingredientNames);

    return (
        <div style={{margin: 5}}>
            <FlatList
                data={data}
                renderItem={({item}) => (
                    <Chip 
                        icon="information" 
                        mode="outlined"
                        style={styles.ingredientButton} 
                        onPress={() => { props.functionForWhenPressed(item.name); }}>
                    {item.name}
                    </Chip>
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
      width: "47.5%",
    //   paddingLeft: "25px",
    //   paddingRight: "20%",
      marginLeft: "1.25%",
      marginRight: "1.25%",
      marginTop: 4,
      marginBottom: 4,
    }
});

export default IngredientButtonGrid;