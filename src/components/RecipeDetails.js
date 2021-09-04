import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { DataTable } from 'react-native-paper';
import NutritionTable from './NutritionTable';

// remember: each time we pass props from the father, we need to 'catch' it in the component's param.
const RecipeDetails = ({ displayRecipe }) => {
  const imgSrc = displayRecipe.recipe.imageUrl;
  const valuesObj = displayRecipe.recipe.nutritionValues;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {{ uri: imgSrc } ? (
        <Image style={styles.image} source={{ uri: imgSrc }} />
      ) : null}
      <NutritionTable values={valuesObj} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  image: {
    width: 380,
    height: 210,
    borderRadius: 12,
  },
});

export default RecipeDetails;
