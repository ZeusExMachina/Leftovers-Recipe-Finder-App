// 3rd-party Imports
import React, { useContext } from "react";
import { StyleSheet, View, ScrollView } from 'react-native';
import { Avatar, Text } from 'react-native-paper';
// Components
import IngredientCategory from '../components/IngredientCategory';
import IngredientButtonGrid from "../components/IngredientButtonGrid";
// States
import { CurrentUser } from "../states/CurrentUser";
import { AllIngredients } from "../states/All_Ingredients";
import { FavouriteIngredients, RefreshFavouriteIngredients } from "../states/All_FavouriteIngredients";
import { SearchbarTextInput } from "../states/SearchbarTextInput";
import { SearchedIngredientsResults } from '../states/SearchedIngredientsResults'
import { GetRecentIngredientsAsArray, RefreshRecentIngredients } from "../states/RecentIngredients";

interface Props {
    navigationObj:any
}

function convertAllIngredientsIntoMap(allIngredients : Map<string,string>) : Map<string,string[]> {
    let mapOfCategoriesAndIngredients = new Map<string,string[]>();

    allIngredients.forEach((category:string, ingredient:string) => {
        let categoryList = mapOfCategoriesAndIngredients.get(category);
        if (categoryList == undefined) { mapOfCategoriesAndIngredients.set(category,[ingredient]); }
        else { categoryList.push(ingredient); }
    });

    // console.log("mapOfCategoriesAndIngredients", mapOfCategoriesAndIngredients);

    return mapOfCategoriesAndIngredients;
}

const IngredientsContents = (props : Props) => {
    const currentUser = useContext(CurrentUser)
    const allIngredients = useContext(AllIngredients);
    const {searchInput,setSearchInput} = useContext(SearchbarTextInput);
    const searchedIngredients = useContext(SearchedIngredientsResults);
    const favouriteIngredients = useContext(FavouriteIngredients);
    const refreshFavouriteIngredients = useContext(RefreshFavouriteIngredients);
    const getRecentIngredientsAsArray = useContext(GetRecentIngredientsAsArray);
    const refreshRecentIngredients = useContext(RefreshRecentIngredients);

    refreshFavouriteIngredients(currentUser);
    refreshRecentIngredients(currentUser);

    const recentIngredients = getRecentIngredientsAsArray();

    return (
        (searchInput.length < 1)
            ?
                <ScrollView scrollEnabled={true} style={styles.ingredientsContents}>
                    {favouriteIngredients.length > 0 &&
                        <>
                            <View style={{flexDirection:"row"}}>
                                <Text style={styles.ingredientSection_heading}>
                                    Favourite Ingredients
                                </Text>
                                <Avatar.Icon size={28} icon="star" style={styles.contentSection_avatarIcon} />
                            </View>

                            <IngredientButtonGrid
                                ingredientNames={favouriteIngredients}
                                extrasScreenObjs={{navigationObj:props.navigationObj, screenName:"All Favourites List", extraScreenLinkMessage:"See all..."}}
                            />
                        </>
                    }

                    {recentIngredients.length > 0 &&
                        <>
                            <View style={{flexDirection:"row"}}>
                                <Text style={styles.ingredientSection_heading}>
                                    Recently Used Ingredients
                                </Text>
                                <Avatar.Icon size={28} icon="history" style={styles.contentSection_avatarIcon} />
                            </View>

                            <IngredientButtonGrid
                                ingredientNames={recentIngredients}
                                extrasScreenObjs={{navigationObj:props.navigationObj, screenName:"All Recents List", extraScreenLinkMessage:"See all.."}}
                            />
                        </>
                    }

                    <Text style={styles.ingredientSection_heading}>Food Categories</Text>

                    {Array.from(convertAllIngredientsIntoMap(allIngredients)).map(([ingredientCategory,ingredientNames], i) => 
                        React.createElement(IngredientCategory, {key:i, categoryName:ingredientCategory, ingredientNames:ingredientNames}))}
                </ScrollView>
            :
                (searchedIngredients.length < 1)
                    ?
                        <View style={styles.ingredientsContents}>
                            <Text
                                style={{marginTop:15, marginLeft:15, marginRight:15, alignItems:"center", fontSize:17}}>
                                No ingredients found. You may need to check your spelling, or we may not have the ingredient you are looking for.
                            </Text>
                        </View>
                    :
                        <ScrollView scrollEnabled={true} style={styles.ingredientsContents}>
                            <IngredientButtonGrid ingredientNames={searchedIngredients}/>
                        </ScrollView>
    );
}

const styles = StyleSheet.create({
    ingredientsContents: {
        flex: 1,
        marginTop:10,
        paddingTop: 10,
        paddingBottom: 5,
    },

    contentSection_avatarIcon: {
        marginLeft: 5,
    },
    
    ingredientSection_heading: {
        marginTop: 0,
        marginBottom: 5,
        marginLeft: 8,
        fontSize: 20,
    },
});

export default IngredientsContents;