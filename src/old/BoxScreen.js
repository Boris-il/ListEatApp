import React from "react";
import { Text, StyleSheet, View, Button } from "react-native";

const BoxScreen = () => {
  return (
    <View style={styles.parentStyle}>
      <View style={styles.view1} />
      <View style={styles.view2} />
      <View style={styles.view3} />
    </View>
  );
};

const styles = StyleSheet.create({
  parentStyle: {
    borderWidth: 3,
    borderColor: "black",
    height: 100,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  view1: {
    height: 50,
    width: 50,
    backgroundColor: "red",
  },
  view2: {
    //marginTop: 50,
    height: 50,
    width: 50,
    backgroundColor: "green",
    alignSelf: "flex-end",
    //top: 50
  },
  view3: {
    height: 50,
    width: 50,
    backgroundColor: "purple",
  },
});

export default BoxScreen;
