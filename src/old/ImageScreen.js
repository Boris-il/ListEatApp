import React from "react";
import { Text, StyleSheet, View } from "react-native";
import ImageDetail from "./ImageDetail";

const ImageScreen = () => {
  return (
    <View>
      <ImageDetail
        imageTitle="Forest"
        imageSource={require("../../assets/forest.jpg")}
        imageScore={10}
      />
      <ImageDetail
        imageTitle="Beach"
        imageSource={require("../../assets/beach.jpg")}
        imageScore={20}
      />
      <ImageDetail
        imageTitle="Mountain"
        imageSource={require("../../assets/mountain.jpg")}
        imageScore={30}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default ImageScreen;
