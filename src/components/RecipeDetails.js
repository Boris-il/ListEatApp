import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

// remember: each time we pass props from the father, we need to 'catch' it in the component's param.
const RecipeDetails = ({ result }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: result.image_url }} />
      <Text style={styles.name}> {result.name} </Text>
      <Text>
        {" "}
        Added on: {result.insertion_time}, {result.ingredients.length}{" "}
        ingredients
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 170,
    borderRadius: 6,
    marginBottom: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RecipeDetails;
