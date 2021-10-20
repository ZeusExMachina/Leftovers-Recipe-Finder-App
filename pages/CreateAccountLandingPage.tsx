// 3rd-paarty Imports
import React, { useState, useContext } from "react";
import { View } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
// Components
import SnackbarMessagePopup from '../components/SnackbarMessagePopup';
// States
import { CurrentUser, CreateNewUser } from "../states/CurrentUser"
import { SelectedIngredients, ClearAllSelectedIngredients } from "../states/SelectedIngredientsList";
import { FavouriteIngredients, RefreshFavouriteIngredients } from "../states/All_FavouriteIngredients";
import { RecentIngredients, RefreshRecentIngredients } from "../states/RecentIngredients";
import { ShowSnackbarMessage } from "../states/SnackbarVisible";

const CreateAccountLandingPage = ({ navigation }) => {
    // Local states
    const [usernameText, setUsernameText] = useState<string>("");
    const [passwordText, setPasswordText] = useState<string>("");

    // Imported states
    const {currentUser, setCurrentUser} = useContext(CurrentUser);
    const createNewUser = useContext(CreateNewUser);
    const {ingredientsList, updateIngredientsList} = useContext(SelectedIngredients);
    const clearSelectedIngredients = useContext(ClearAllSelectedIngredients);
    const {favouriteIngredients, setFavouriteIngredients} = useContext(FavouriteIngredients)
    const refreshFavouriteIngredients = useContext(RefreshFavouriteIngredients);
    const {recentIngredients, setRecentIngredients} = useContext(RecentIngredients);
    const refreshRecentIngredients = useContext(RefreshRecentIngredients);
    const showSnackbarMessage = useContext(ShowSnackbarMessage);

    async function createNewAccount() {
        if (usernameText.length < 1) {
            // Open snackbar
            showSnackbarMessage("Username needs to be at least 1 character long. Please try again");
            return;
        } else if (passwordText.length < 1) {
            // Open snackbar
            showSnackbarMessage("Password needs to be at least 1 character long. Please try again");
            return;
        }

        const createUser_result = await createNewUser(usernameText, passwordText, {currentUser, setCurrentUser});
        if (createUser_result) {
            // No existing user has this username, so new account creation is successful. Change to MainIngredientSelect page
            await refreshFavouriteIngredients(currentUser, setFavouriteIngredients);
            await refreshRecentIngredients(currentUser, setRecentIngredients);
            clearSelectedIngredients(updateIngredientsList);
            navigation.navigate("Ingredient Selection");
        } else {
            // Username already exists, show this message on snackbar
            showSnackbarMessage("That username already exists. Please enter a different username");
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

            <SnackbarMessagePopup/>
        </View>
    );
};

export default CreateAccountLandingPage;