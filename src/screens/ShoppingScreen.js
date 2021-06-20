import React, { useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import { Context as RecipeContext } from "../context/Recipe/RecipeContext";
import SearchBar from "../components/SearchBar";

const ShoppingScreen = () => {
  const [term, setTerm] = useState("");

  return (
    <View>
      <SearchBar
        term={term}
        onTermChange={(newTerm) => setTerm(newTerm)}
        onTermSubmit={() => {
          //TODO: Search ingredient
        }}
      />
      {/*list.map((item, i) => (
          <ListItem key={i} bottomDivider>
            <ListItem.Chevron style={styles.icon} />
            <ListItem.Content>
              <ListItem.Title style={styles.text}>{item.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))*/}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    alignSelf: "flex-end",
  },
  icon: {
    transform: [{ rotateY: "180deg" }],
  },
});

export default ShoppingScreen;

/*
    <TouchableOpacity onPress={function () { props.navigation.navigate("List") }}
    >
      <Text>Go to List Demo</Text>
    </TouchableOpacity>

*/
