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
      <Text style={styles.text}>Hello Katon!</Text>
      <Button
        onPress={function () {
          props.navigation.navigate("Components");
        }}
        title="Go to Components Demo"
      />
      <Button
        onPress={function () {
          props.navigation.navigate("List");
        }}
        title="Go to List Demo"
      />
      <Button
        onPress={function () {
          props.navigation.navigate("Images");
        }}
        title="Go to Images Demo"
      />
      <Button
        onPress={function () {
          props.navigation.navigate("Counter");
        }}
        title="Go to Counter Demo"
      />
      <Button
        onPress={function () {
          props.navigation.navigate("Color");
        }}
        title="Go to Color Demo"
      />
      <Button
        onPress={function () {
          props.navigation.navigate("Square");
        }}
        title="Go to Square Demo"
      />
      <Button
        onPress={function () {
          props.navigation.navigate("Text");
        }}
        title="Go to Text Demo"
      />
      <Button
        onPress={function () {
          props.navigation.navigate("Box");
        }}
        title="Go to Box Demo"
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
