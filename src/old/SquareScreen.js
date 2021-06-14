import React, { useState } from "react";
import { Text, StyleSheet, View, Button } from "react-native";
import ColorCounter from "./ColorCounter";

// Hook = adds additional functionality/capability to a functional component.

const COLOR_INCREMENT = 15;

const SquareScreen = () => {
  const [red, setRed] = useState(0);
  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(0);

  // We pass the different inc/dec and color props to the component (=child) itself.

  const setColor = (color, change) => {
    // color === 'red', 'green', 'blue'
    // change === +15 or -15

    switch (color) {
      case "red": {
        return red + change > 255 || red + change < 0
          ? null
          : setRed(red + change);
      }
      case "blue": {
        if (blue + change > 255 || blue + change < 0) {
          return;
        } else {
          setBlue(blue + change);
        }
        break;
      }
      case "green": {
        if (color === "green") {
          if (green + change > 255 || green + change < 0) {
            return;
          } else {
            setGreen(green + change);
          }
        }
        break;
      }
      default:
        break;
    }
  };

  return (
    <View>
      <ColorCounter
        color="Red"
        onIncrease={() => setColor("red", COLOR_INCREMENT)}
        onDecrease={() => setColor("red", -COLOR_INCREMENT)}
      />
      <ColorCounter
        color="Blue"
        onIncrease={() => setColor("blue", COLOR_INCREMENT)}
        onDecrease={() => setColor("blue", -COLOR_INCREMENT)}
      />
      <ColorCounter
        color="Green"
        onIncrease={() => setColor("green", COLOR_INCREMENT)}
        onDecrease={() => setColor("green", -COLOR_INCREMENT)}
      />

      <View
        style={{
          height: 150,
          width: 150,
          backgroundColor: `rgb(${red},${green},${blue})`,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default SquareScreen;
