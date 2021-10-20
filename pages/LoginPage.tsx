// 3rd-paarty Imports
import React, { useState, useContext } from "react";
import { StyleSheet, View } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
// States
import { CurrentUser, AuthenticateUser } from "../states/CurrentUser"
import { FavouriteIngredients, RefreshFavouriteIngredients } from "../states/All_FavouriteIngredients";
import { RecentIngredients, RefreshRecentIngredients } from "../states/RecentIngredients";

const LoginPage = ({ navigation }) => {
    const [usernameText, setUsernameText] = useState<string>("")
    const [passwordText, setPasswordText] = useState<string>("")

    const {currentUser, setCurrentUser} = useContext(CurrentUser)
    const authenticateUser = useContext(AuthenticateUser)
    const {favouriteIngredients, setFavouriteIngredients} = useContext(FavouriteIngredients)
    const refreshFavouriteIngredients = useContext(RefreshFavouriteIngredients);
    const {recentIngredients, setRecentIngredients} = useContext(RecentIngredients);
    const refreshRecentIngredients = useContext(RefreshRecentIngredients);

    async function loginToAccount() {
        if (usernameText.length < 1) {
            // Open snackbar
            return;
        } else if (passwordText.length < 1) {
            // Open snackbar
            return;
        }

        const login_result = await authenticateUser(usernameText, passwordText, {currentUser, setCurrentUser});
        if (login_result) {
            // User exists, so account authentication was successful. Switch to MainIngredientSelect page
            await refreshFavouriteIngredients(currentUser, setFavouriteIngredients);
            await refreshRecentIngredients(currentUser, setRecentIngredients);
            navigation.navigate("Ingredient Selection");
        } else {
            // Username-Password pair doesn't exist, so open snackbar
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
        </View>
    )
};

export default LoginPage;