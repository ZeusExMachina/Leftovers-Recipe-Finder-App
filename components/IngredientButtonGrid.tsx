import * as React from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { Chip } from 'react-native-paper';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';

interface Props {
    ingredientNames : string[]
}

const styles = StyleSheet.create({
    ingredientButton: {
      width: "25%",
      marginLeft: "5px",
      marginRight: "5px",
    }
});

// Make a function to render a new Chip for each ingredient to show

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
        <View>
            <FlatList 
                data={data}
                renderItem={({item}) => (
                    <Chip icon="information" style={styles.ingredientButton} onPress={() => console.log('Pressed')}>
                        {item.name}
                    </Chip>
                )}
                numColumns={2}>
            </FlatList>
        </View>
    );
}

export default IngredientButtonGrid;