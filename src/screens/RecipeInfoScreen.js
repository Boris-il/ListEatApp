import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { Context as RecipeContext } from '../context/Recipe/RecipeContext';
import RecipeDetails from '../components/RecipeDetails';

const RecipeInfoScreen = ({ navigation }) => {
  //const recipeId = navigation.getParam("id");
  // use the recipe context
  const { state } = useContext(RecipeContext);
  // expand item state

  const recipe = state.find(
    (recipe) => recipe.recipe.id === navigation.getParam('id')
  );

  return <RecipeDetails displayRecipe={recipe} />;
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
