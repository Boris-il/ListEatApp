import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';

const ActionButton = ({ onPressing }) => {
  return (
    <View style={styles.addView}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => onPressing()}
        style={styles.addtouchableOpacity}>
        <Image
          //We are making FAB using TouchableOpacity with an online image
          source={{
            uri: 'https://img.icons8.com/pastel-glyph/64/000000/plus.png',
          }}
          style={styles.floatingButtonStyle}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  addView: {
    flex: 1,
    right: 0,
    margin: 5,
    bottom: 0,
    position: 'absolute',

    borderWidth: 0,
    borderColor: 'black',
  },
  addtouchableOpacity: {
    width: 75,
    height: 75,
    backgroundColor: 'green',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  floatingButtonStyle: {
    resizeMode: 'contain',
    width: 80,
    height: 80,
    margin: 5,
    alignSelf: 'center',
  },
});

export default ActionButton;
