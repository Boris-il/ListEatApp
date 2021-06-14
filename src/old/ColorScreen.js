import React, { useState } from "react";
import { StyleSheet, View, Button, FlatList } from "react-native";

/*
  1. ...colors, randomRgb()] means create new array with all elements from 'colors' and adding elements from randomRgb() return
  2. reminder: if we want to make a list of elements of an array we can use FlatList component
*/

const ColorScreen = () => {
  const [colors, SetColors] = useState([]);

  return (
    <View>
      <Button
        title="Add a Color"
        onPress={() => {
          SetColors([...colors, randomRgb()]);
        }}
      />

      <FlatList
        keyExtractor={item => item}
        data={colors}
        renderItem={({ item }) => {
          return (
            <View style={{ height: 100, width: 100, backgroundColor: item }} />
          );
        }}
      ></FlatList>
    </View>
  );
};

const randomRgb = () => {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  return `rgb(${red}, ${green}, ${blue})`;
};

const styles = StyleSheet.create({});

export default ColorScreen;
