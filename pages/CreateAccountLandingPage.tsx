// 3rd-paarty Imports
import React, { useState, useContext } from "react";
import { View } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
// Components
import SnackbarMessagePopup from '../components/SnackbarMessagePopup';
// States
import { CurrentUser, CreateNewUser } from "../states/CurrentUser"
import { ClearAllSelectedIngredients } from "../states/SelectedIngredientsList";
import { RefreshFavouriteIngredients } from "../states/All_FavouriteIngredients";
import { RefreshRecentIngredients } from "../states/RecentIngredients";
import { ShowSnackbarMessage } from "../states/SnackbarVisible";
// Styling
import { PrimaryThemeColour, AccentsThemeColour  } from "../styling/Styling";

const CreateAccountLandingPage = ({ navigation }) => {
    // Local states
    const [usernameText, setUsernameText] = useState<string>("");
    const [passwordText, setPasswordText] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Imported states
    const currentUser = useContext(CurrentUser);
    const createNewUser = useContext(CreateNewUser);
    const clearSelectedIngredients = useContext(ClearAllSelectedIngredients);
    const refreshFavouriteIngredients = useContext(RefreshFavouriteIngredients);
    const refreshRecentIngredients = useContext(RefreshRecentIngredients);
    const showSnackbarMessage = useContext(ShowSnackbarMessage);

    async function createNewAccount() {
        setIsLoading(true);

        if (usernameText.length < 1) {
            showSnackbarMessage("Username needs to be at least 1 character long. Please try again");
        } else if (passwordText.length < 1) {
            showSnackbarMessage("Password needs to be at least 1 character long. Please try again");
        } else {
            const createUser_result = await createNewUser(usernameText, passwordText);
            if (createUser_result) {
                // No existing user has this username, so new account creation is successful. Change to MainIngredientSelect page
                await refreshFavouriteIngredients(currentUser);
                await refreshRecentIngredients(currentUser);
                clearSelectedIngredients();
                navigation.navigate("Ingredient Selection");
            } else {
                // Username already exists, show this message on snackbar
                showSnackbarMessage("That username already exists. Please enter a different username");
                return;
            }
        }

        setIsLoading(false);
    }

    async function goToLogin() {
        navigation.navigate("LoginPage");
    }
    
    return (
        <View style={{ flex:1, display:"flex", justifyContent:"center" }}>
            <Text style={{ fontSize:28, alignSelf:"center", marginTop:10, color:PrimaryThemeColour }}>
                Leftovers Recipe Finder
            </Text>

            <Text style={{ fontSize:15, alignSelf:"center", marginTop:20, color:AccentsThemeColour }}>
                Create an account to get started
            </Text>

            <TextInput style={{ marginTop:15, alignSelf:"center", width:"84%" }}
                mode="outlined"
                label="Username"
                selectionColor={PrimaryThemeColour}
                underlineColor={PrimaryThemeColour}
                outlineColor={AccentsThemeColour}
                theme={{ colors: { primary: PrimaryThemeColour }}}
                value={usernameText}
                onChangeText={text => setUsernameText(text)}
            />

            <TextInput style={{ marginTop:3, alignSelf:"center", width:"84%" }}
                mode="outlined"
                label="Password"
                selectionColor={PrimaryThemeColour}
                underlineColor={PrimaryThemeColour}
                outlineColor={AccentsThemeColour}
                theme={{ colors: { primary: PrimaryThemeColour }}}
                secureTextEntry
                right={<TextInput.Icon name="eye" />}
                value={passwordText}
                onChangeText={text => setPasswordText(text)}
            />

            <Button style={{ marginTop:20, alignSelf:"center", width:"45%", backgroundColor:PrimaryThemeColour, }}
                mode="contained"
                loading={isLoading}
                onPress={() => createNewAccount()}
            >
                Get Started
            </Button>

            <Text style={{ fontSize:14, alignSelf:"center", marginTop:30, color:AccentsThemeColour }}>
                Already have an account?
            </Text>

            <Button
                mode="text"
                theme={{ colors: { primary: PrimaryThemeColour }}}
                style={{ alignSelf:"center", width:"45%" }}
                labelStyle={{ color: PrimaryThemeColour }}
                onPress={() => goToLogin()}
            >
                Log in
            </Button>

            <SnackbarMessagePopup/>
        </View>
    );
};

export default CreateAccountLandingPage;