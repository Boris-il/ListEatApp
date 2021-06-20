import React from "react";
import { Text, StyleSheet, View, Button, TouchableOpacity } from "react-native";

/* button can contain only text while TouchableOpacity can store any element.
  the button is a little less powerful and has little configurations available.

  props is a system to pass data from a parent to a child

  state is a system to track a piece of data that will change over time.
  if that data changes, our app will 'rerender'
*/
const HomeScreen = (props) => {
  return (
    <View>
      <Text style={styles.text}>Home Screen</Text>
      <Button
        title="My Recipes"
        onPress={() => {
          props.navigation.navigate("Recipes");
        }}
      />
      <Button
        title="Shopping List"
        onPress={() => {
          props.navigation.navigate("Shopping");
        }}
      />
      <Button
        title="Test Server"
        onPress={() => {
          props.navigation.navigate("Test");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
});

export default HomeScreen;

/*
    <TouchableOpacity onPress={function () { props.navigation.navigate("List") }}
    >
      <Text>Go to List Demo</Text>
    </TouchableOpacity>

*/
