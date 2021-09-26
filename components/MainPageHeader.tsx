// 3rd-party Imports
import React, { useState } from "react";
import { StyleSheet } from 'react-native';
import { Appbar, Text, Searchbar, IconButton } from 'react-native-paper';

const ContentTitle = ({ title, style }) => (
    <Appbar.Content
        title={<Text style={style}> {title} </Text>}
        style={{ alignItems: 'center' }}
    />
);

const styles = StyleSheet.create({
    top: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: "85px",
        display: "flex",
        justifyContent: "center",
    },
    
    searchBar: {
        marginTop: 7,
        marginLeft: 5,
        marginRight: 5,
        height: "35px",
        //width: "80%",
    },

    screenTitle: {
        borderColor: "#000",
        borderWidth: 5,
    },
});

const MainPageHeader = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const onChangeSearch = query => setSearchQuery(query);

    return (
        <div className={"header"}>
          <Appbar.Header style={styles.top}>
            <div className={"header_inner"}>
              <ContentTitle title={'Select ingredients you have'} style={{color:'white'}} />
              <div>
                <Searchbar style={styles.searchBar}
                  placeholder="Search"
                  theme={{ roundness:17 }}
                  onChangeText={onChangeSearch}
                  value={searchQuery}
                />
                {/* <IconButton icon="microphone" /> */}
              </div>
            </div>
          </Appbar.Header>
        </div>
    );
};

export default MainPageHeader