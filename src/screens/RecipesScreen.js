import React, { useState, useContext } from "react";
import { ListItem, Icon, CheckBox } from "react-native-elements";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  Button,
  TouchableOpacity,
} from "react-native";
import { Context as RecipeContext } from "../context/RecipeContext";
import SearchBar from "../components/SearchBar";
import RecipeDetails from "../components/RecipeDetails";

const RecipesScreen = ({ results, navigation }) => {
  const [term, setTerm] = useState("");
  const { state, addRecipe, getRecipe, getAllRecipes, deleteRecipe } =
    useContext(RecipeContext);

  return (
    <View>
      <SearchBar
        term={term}
        onTermChange={(newTerm) => setTerm(newTerm)}
        onTermSubmit={() => {}}
      />
      <FlatList
        horizontal
        showsVerticalScrollIndicator={false}
        data={state}
        keyExtractor={(recipe) => recipe.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
            //TODO:
            //onPress={() => navigation.navigate("ShowResult", { id: item.id })}
            >
              <RecipeDetails result={item} />
            </TouchableOpacity>
          );
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
});

export default RecipesScreen;

/*
    <TouchableOpacity onPress={function () { props.navigation.navigate("List") }}
    >
      <Text>Go to List Demo</Text>
    </TouchableOpacity>

*/
