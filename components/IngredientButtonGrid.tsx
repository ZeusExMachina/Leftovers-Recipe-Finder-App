import * as React from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { Chip } from 'react-native-paper';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';

const styles = StyleSheet.create({
    ingredientButton: {
      width: "25%",
    }
});

const data = [
    { name: 'A', key: "1" }, { name: 'B', key: "2" }, { name: 'C', key: "3" }, { name: 'D', key: "4" }, { name: 'E', key: "5" }, { name: 'F', key: "6" }
]

// Make a function to render a new Chip for each ingredient to show

const IngredientButtonGrid = () => {
    const renderItem = (
        <Chip icon="information" onPress={() => console.log('Pressed')}>Example Chip</Chip>
    );

    return (
        <View>
            <FlatList 
                data={data}
                renderItem={({item}) => (
                    <Chip icon="information" onPress={() => console.log('Pressed')}>item.name</Chip>
                )}
                numColumns={2}>
                {/* <Chip icon="information" mode="outlined" style={styles.ingredientButton} onPress={() => console.log('Pressed')}>Example Chip</Chip>
                <Chip icon="information" onPress={() => console.log('Pressed')}>Example Chip</Chip>
                <Chip icon="information" onPress={() => console.log('Pressed')}>Example Chip</Chip>
                <Chip icon="information" onPress={() => console.log('Pressed')}>Example Chip</Chip>
                <Chip icon="information" onPress={() => console.log('Pressed')}>Example Chip</Chip>
                <Chip icon="information" onPress={() => console.log('Pressed')}>Example Chip</Chip> */}
            </FlatList>
        </View>
    );
}

export default IngredientButtonGrid;