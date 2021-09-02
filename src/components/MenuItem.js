import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const MenuItem = ({ option }) => {
  const imgSrc = Image.resolveAssetSource(option.image).uri;

  return (
    <View style={styles.container}>
      <Text style={styles.name}> hi</Text>
    </View>
  );
};

//<Image style={styles.image} source={{ uri: imgSrc }} />

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
    fontWeight: 'bold',
  },
});

export default MenuItem;
