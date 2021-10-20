// 3rd-paarty Imports
import React, { useState, useContext } from "react";
import { View } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
// Components
import SnackbarMessagePopup from '../components/SnackbarMessagePopup';
// States
import { CurrentUser, AuthenticateUser } from "../states/CurrentUser"
import { ClearAllSelectedIngredients } from "../states/SelectedIngredientsList";
import { RefreshFavouriteIngredients } from "../states/All_FavouriteIngredients";
import { RefreshRecentIngredients } from "../states/RecentIngredients";
import { ShowSnackbarMessage } from "../states/SnackbarVisible";

const LoginPage = ({ navigation }) => {
    // Local states
    const [usernameText, setUsernameText] = useState<string>("");
    const [passwordText, setPasswordText] = useState<string>("");

    // Imported states
    const currentUser = useContext(CurrentUser);
    const authenticateUser = useContext(AuthenticateUser);
    const clearSelectedIngredients = useContext(ClearAllSelectedIngredients);
    const refreshFavouriteIngredients = useContext(RefreshFavouriteIngredients);
    const refreshRecentIngredients = useContext(RefreshRecentIngredients);
    const showSnackbarMessage = useContext(ShowSnackbarMessage);

    async function loginToAccount() {
        if (usernameText.length < 1) {
            showSnackbarMessage("Username needs to be at least 1 character long. Please try again");
            return;
        } else if (passwordText.length < 1) {
            showSnackbarMessage("Password needs to be at least 1 character long. Please try again");
            return;
        }

        const login_result = await authenticateUser(usernameText, passwordText);
        if (login_result) {
            // User exists, so account authentication was successful. Switch to MainIngredientSelect page
            await refreshFavouriteIngredients(currentUser);
            await refreshRecentIngredients(currentUser);
            clearSelectedIngredients();
            navigation.navigate("Ingredient Selection");
        } else {
            // Username-Password pair doesn't exist, so open snackbar
            showSnackbarMessage("Username or password is invalid. Please a valid username and password");
            return;
        }
    }

    function goBackToCreateAccount() {
        navigation.navigate("CreateAccountLandingPage");
    }

    return(
        <View style={{ flex:1, display:"flex", justifyContent:"center" }}>
            <Button style={{ position:"absolute", top:35, left:15 }}
                mode="contained"
                icon="arrow-left"
                onPress={() => goBackToCreateAccount()}
            >
                Back
            </Button>

            <Text style={{ fontSize:18, alignSelf:"center"}}>
                Welcome back! Log in to continue
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
                secureTextEntry
                right={<TextInput.Icon name="eye" />}
                value={passwordText}
                onChangeText={text => setPasswordText(text)}
            />

            <Button style={{ marginTop:20, alignSelf:"center", width:"45%" }}
                mode="contained"
                onPress={() => loginToAccount()}
            >
                Log in
            </Button>

            <SnackbarMessagePopup/>
        </View>
    )
};

export default LoginPage;