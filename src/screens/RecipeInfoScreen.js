import React, { useState, useEffect, useContext, Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import { Context as RecipeContext } from "../context/Recipe/RecipeContext";

const RecipeInfoScreen = ({ navigation }) => {
  //const recipeId = navigation.getParam("id");
  // use the recipe context
  const { state, deleteRecipe } = useContext(RecipeContext);

  const recipe = state.find(
    (recipe) => recipe.id === navigation.getParam("id")
  );

  return (
    <View>
      <Text>מרכיבים</Text>
      <Text>{recipe.name}</Text>
    </View>
  );
};

/*
// customize the header
RecipeInfoScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity
        onPress={() => navigation.state.params.callDeleteFromNav()}
      >
        <FontAwesome5 name="trash" style={styles.icon} color="red" />
      </TouchableOpacity>
    ),
  };
};
*/

const styles = StyleSheet.create({
  icon: {
    fontSize: 24,
    marginRight: 10,
  },
});

export default RecipeInfoScreen;
