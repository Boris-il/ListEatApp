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
    marginLeft: 15,
  },
  image: {
    width: 250,
    height: 120,
    borderRadius: 4,
    marginBottom: 5,
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default RecipeDetails;
