// 3rd-party Imports
import React, { useContext } from "react";
import { StyleSheet, View } from 'react-native';
import { Appbar, Text, Searchbar } from 'react-native-paper';
// State - Selected Ingredients
import { SearchbarTextInput } from "../states/SearchbarTextInput";
// Styling
import { PrimaryThemeColour, AccentsThemeColour } from "../styling/Styling";

const ContentTitle = ({ title, style }) => (
    <Appbar.Content
        title={<Text style={style}> {title} </Text>}
        style={{ alignItems: 'center' }}
    />
);

const MainPageHeader = () => {
    const {searchInput,setSearchInput} = useContext(SearchbarTextInput);

    return (
      <View style={styles.header}>
        <Appbar.Header style={styles.top}>
          <View style={{alignItems: "center", marginTop:10}}>
            <ContentTitle title={'Select ingredients you have'} style={{position:"relative", fontSize:22, color:'white'}} />
            <Searchbar style={styles.searchBar}
              placeholder="Search"
              theme={{ roundness:17, colors: { primary: PrimaryThemeColour } }}
              inputStyle={{ color:AccentsThemeColour }}
              onChangeText={setSearchInput}
              value={searchInput}
            />
          </View>
        </Appbar.Header>
      </View>
    );
};

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
      backgroundColor: PrimaryThemeColour
  },
  
  searchBar: {
    position: "relative",
    height: 35,
    width: "100%",
    alignSelf: "center",
  },
});

export default MainPageHeader