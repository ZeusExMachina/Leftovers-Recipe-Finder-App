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
// Styling
import { PrimaryThemeColour, AccentsThemeColour } from "../styling/Styling";

const LoginPage = ({ navigation }) => {
    // Local states
    const [usernameText, setUsernameText] = useState<string>("");
    const [passwordText, setPasswordText] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Imported states
    const currentUser = useContext(CurrentUser);
    const authenticateUser = useContext(AuthenticateUser);
    const clearSelectedIngredients = useContext(ClearAllSelectedIngredients);
    const refreshFavouriteIngredients = useContext(RefreshFavouriteIngredients);
    const refreshRecentIngredients = useContext(RefreshRecentIngredients);
    const showSnackbarMessage = useContext(ShowSnackbarMessage);

    async function loginToAccount() {
        setIsLoading(true);

        const authenticateUserResult : number = await authenticateUser(usernameText, passwordText);

        if (authenticateUserResult == 0) {
            // No existing user has this username, so new account creation is successful. Change to MainIngredientSelect page
            await refreshFavouriteIngredients(currentUser);
            await refreshRecentIngredients(currentUser);
            clearSelectedIngredients();
            navigation.navigate("Ingredient Selection");
        } else if (authenticateUserResult == 1) {
            showSnackbarMessage("Username needs to be at least 1 character long. Please try again");
        } else if (authenticateUserResult == 2) {
            showSnackbarMessage("Password needs to be at least 1 character long. Please try again");
        } else if (authenticateUserResult == 3) {
            showSnackbarMessage("Username or password is invalid. Please a valid username and password");
        }

        setIsLoading(false);
    }

    function goBackToCreateAccount() {
        navigation.navigate("CreateAccountLandingPage");
    }

    return(
        <View style={{ flex:1, display:"flex", justifyContent:"center" }}>
            <Button style={{ position:"absolute", top:35, left:15, backgroundColor:PrimaryThemeColour }}
                mode="contained"
                icon="arrow-left"
                onPress={() => goBackToCreateAccount()}
            >
                Back
            </Button>

            <Text style={{ fontSize:18, alignSelf:"center", color:AccentsThemeColour }}>
                Welcome back! Log in to continue
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

            <Button style={{ marginTop:20, alignSelf:"center", width:"45%", backgroundColor:PrimaryThemeColour }}
                mode="contained"
                loading={isLoading}
                onPress={() => loginToAccount()}
            >
                Log in
            </Button>

            <SnackbarMessagePopup/>
        </View>
    )
};

export default LoginPage;