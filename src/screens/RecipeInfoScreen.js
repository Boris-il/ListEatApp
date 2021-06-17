import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Context as RecipeContext } from "../context/RecipeContext";

const RecipeInfoScreen = ({ navigation }) => {
  //const recipeId = navigation.getParam("id");
  // use the recipe context
  const { state } = useContext(RecipeContext);
  useContext(RecipeContext);

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

const styles = StyleSheet.create({});

export default RecipeInfoScreen;
