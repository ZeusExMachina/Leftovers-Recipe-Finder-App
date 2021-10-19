// 3rd-paarty Imports
import React, { useState, useContext } from "react";
import { StyleSheet, View } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
// States
import { CurrentUser, CreateNewUser } from "../states/CurrentUser"
import { FavouriteIngredients, RefreshFavouriteIngredients } from "../states/All_FavouriteIngredients";

const CreateAccountLandingPage = ({ navigation }) => {
    const [usernameText, setUsernameText] = useState<string>("");
    const [passwordText, setPasswordText] = useState<string>("");

    const {currentUser, setCurrentUser} = useContext(CurrentUser);
    const createNewUser = useContext(CreateNewUser);
    const {favouriteIngredients, setFavouriteIngredients} = useContext(FavouriteIngredients)
    const refreshFavouriteIngredients = useContext(RefreshFavouriteIngredients);

    async function createNewAccount() {
        if (usernameText.length < 1) {
            // Open snackbar
            return;
        } else if (passwordText.length < 1) {
            // Open snackbar
            return;
        }

        const createUser_result = await createNewUser(usernameText, passwordText, {currentUser, setCurrentUser});
        if (createUser_result) {
            // No existing user has this username, so new account creation is successful. Change to MainIngredientSelect page
            await refreshFavouriteIngredients(currentUser, setFavouriteIngredients);
            navigation.navigate("Ingredient Selection");
        } else {
            // Username already exists, show this message on snackbar
            return;
        }
    }

    async function goToLogin() {
        navigation.navigate("LoginPage");
    }
    
    return (
        <View style={{ flex:1, display:"flex", justifyContent:"center" }}>
            <Text style={{ fontSize:26, alignSelf:"center", marginTop:10 }}>
                Leftovers Recipe Finder
            </Text>

            <Text style={{ fontSize:15, alignSelf:"center", marginTop:20 }}>
                Create an account to get started
            </Text>

            <TextInput style={{ marginTop:15, alignSelf:"center", width:"84%" }}
                mode="outlined"
                label="Username"
                value={usernameText}
                onChangeText={text => setUsernameText(text)}
            />

            <TextInput style={{ marginTop:3, alignSelf:"center", width:"84%" }}
                mode="outlined"
                label="Password"
                right={<TextInput.Icon name="eye" />}
                secureTextEntry
                value={passwordText}
                onChangeText={text => setPasswordText(text)}
            />

            <Button style={{ marginTop:20, alignSelf:"center", width:"45%" }}
                mode="contained"
                onPress={() => createNewAccount()}
            >
                Get Started
            </Button>

            <Text style={{ fontSize:14, alignSelf:"center", marginTop:30 }}>
                Already have an account?
            </Text>
            <Button
                mode="text"
                onPress={() => goToLogin()}
                style={{ alignSelf:"center", width:"45%" }}
            >
                Log in
            </Button>
        </View>
    );
};

export default CreateAccountLandingPage;