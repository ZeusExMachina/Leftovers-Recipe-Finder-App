// 3rd-party Imports
import React, { useState, useContext } from "react";
import { StyleSheet, View } from 'react-native';
import { Appbar, Text, Searchbar, IconButton } from 'react-native-paper';
// State - Selected Ingredients
import { SearchbarTextInput } from "../states/SearchbarTextInput";
import { SearchedIngredientsResults } from '../states/SearchedIngredientsResults';

const ContentTitle = ({ title, style }) => (
    <Appbar.Content
        title={<Text style={style}> {title} </Text>}
        style={{ alignItems: 'center' }}
    />
);

const styles = StyleSheet.create({
  header: {
    position: "relative",
    top: 0,
    left: 0,
    right: 0,
    marginTop: 0,
    height: 90,
  },

  top: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 10,
      height: 90,
      display: "flex",
      justifyContent: "center",
      paddingBottom: 10,
  },
  
  searchBar: {
    position: "relative",
    height: 35,
    width: "100%",
    alignSelf: "center",
  },
});

const MainPageHeader = () => {
    const {searchInput,setSearchInput} = useContext(SearchbarTextInput);
    const {searchedIngredients,setSearchedIngredients} = useContext(SearchedIngredientsResults);

    // const [searchQuery, setSearchQuery] = useState<string>("");

    // const onChangeSearch = (query:string) => {
    //   setSearchInput(query);
    // };

    return (
      <View style={styles.header}>
        <Appbar.Header style={styles.top}>
          <View style={{alignItems: "center", marginTop:10}}>
            <ContentTitle title={'Select ingredients you have'} style={{position:"relative", fontSize:22, color:'white'}} />
            <Searchbar style={styles.searchBar}
              placeholder="Search"
              theme={{ roundness:17 }}
              onChangeText={setSearchInput}
              value={searchInput}
            />
            {/* <IconButton icon="microphone" /> */}
          </View>
        </Appbar.Header>
      </View>
    );
};

export default MainPageHeader