import React, { useState, useContext, useEffect, useRef } from "react";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Overlay } from "react-native-elements";
import axios from "axios";
import ActionButton from "react-native-action-button";
import recAPI from "../api/recipesAPI";
import { Context as RecipeContext } from "../context/Recipe/RecipeContext";
import SearchBar from "../components/SearchBar";
import RecipeDetails from "../components/RecipeDetails";
import { VisibilityRounded } from "@material-ui/icons";

const RecipesScreen = ({ navigation }) => {
  // state for search bar query
  const [term, setTerm] = useState("");
  // state for api call results
  const [result, setResult] = useState(null);
  // state for api call error message
  const [errorMessage, setErrorMessage] = useState("");
  // global context
  const { state, addRecipe, getRecipe, getAllRecipes, deleteRecipe } =
    useContext(RecipeContext);
  // required for api sync in useEffect
  let isRendered = useRef(false);
  // loaded
  const [loaded, setLoaded] = useState(false);
  // overlay
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const done = () => {
    setLoaded(true);
    console.log("loaded");
  };

  const getRecipes = (dispatch) => {
    return async (userId, callback) => {
      try {
        // get recipes from server
        const response = await recAPI.get(`/get-all/1`).then((response) => {
          response.data;
        });

        // update recipes context
        dispatch({
          type: "update_all_recipes",
          payload: { recipes: response },
        });
        if (callback) {
          callback();
        }
      } catch (err) {
        console.log(err);
      }
    };
  };

  useEffect(() => {
    isRendered = true;
    //toggleLoading();
    getAllRecipes("12", done);
    return () => {
      isRendered = false;
    };
  }, []);

  /** 
   if (!result) {
    return null;
  }
   */

  const handleAddRecipe = () => {
    Alert.alert("", "new recipe");
    //TODO: Open an overlay for recipe url insertion and call addRecipe()
  };

  return (
    <View>
      <SearchBar
        term={term}
        type="חיפוש מתכון"
        onTermChange={(newTerm) => setTerm(newTerm)}
        //TODO: Search recipe by user-given name
        onTermSubmit={() => {}}
      />
      {loaded ? (
        <View>
          <FlatList
            vertical
            showsVerticalScrollIndicator={false}
            data={state}
            keyExtractor={(recipe) => recipe.id}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  //TODO: Navigate to screen with the ingredients
                  onPress={() =>
                    navigation.navigate("RecipeInfo", { id: item.id })
                  }
                >
                  <Text>{item.id}</Text>
                </TouchableOpacity>
              );
            }}
          />
          <Button title="add new recipe" onPress={toggleOverlay} />
          <Overlay
            isVisible={visible}
            onBackdropPress={toggleOverlay}
            overlayStyle={styles.overlay}
          >
            <Text>sup</Text>
          </Overlay>
        </View>
      ) : null}
    </View>
  );
};

/**
 *
 */

const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 15,
    marginBottom: 5,
  },
  container: {
    marginBottom: 10,
  },
  actionButton: {
    marginBottom: -40,
  },
  overlay: {
    position: "absolute",
    top: 80,
    right: 60,
    bottom: 40,
    left: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "grey",
    opacity: 0.9,
  },
});

export default RecipesScreen;

/*
    <TouchableOpacity onPress={function () { props.navigation.navigate("List") }}
    >
      <Text>Go to List Demo</Text>
    </TouchableOpacity>

*/
