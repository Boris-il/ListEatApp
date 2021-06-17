import React, { useState, useContext } from "react";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import ActionButton from "react-native-action-button";

import { Context as RecipeContext } from "../context/RecipeContext";
import SearchBar from "../components/SearchBar";
import RecipeDetails from "../components/RecipeDetails";

const RecipesScreen = ({ navigation }) => {
  const [term, setTerm] = useState("");
  const { state, addRecipe, getRecipe, getAllRecipes, deleteRecipe } =
    useContext(RecipeContext);

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
      <FlatList
        vertical
        showsVerticalScrollIndicator={false}
        data={state}
        keyExtractor={(recipe) => recipe.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              //TODO: Navigate to screen with the ingredients
              onPress={() => navigation.navigate("RecipeInfo", { id: item.id })}
            >
              <RecipeDetails result={item} />
            </TouchableOpacity>
          );
        }}
      />
      <ActionButton
        style={styles.actionButton}
        size={75}
        offsetY={0}
        offsetX={20}
        position="left"
        buttonColor="rgba(231,76,60,1)"
        onPress={() => {
          handleAddRecipe();
        }}
      />
    </View>
  );
};

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
});

export default RecipesScreen;

/*
    <TouchableOpacity onPress={function () { props.navigation.navigate("List") }}
    >
      <Text>Go to List Demo</Text>
    </TouchableOpacity>

*/
