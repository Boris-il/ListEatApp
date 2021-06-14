import React, { useState } from "react";
import { Text, StyleSheet, View, Button } from "react-native";

// useState is a react feature that updates the component each time the variable changes
const CounterScreen = () => {
  /* 0 is initial value of the counter
       counter is the variable, we never modify it directly! 
       Instead, we always use the setCounter function.
    */
  const [counter, setCounter] = useState(0);
  return (
    <View>
      <Button
        title="Increase"
        onPress={function() {
          setCounter(counter + 1);
        }}
      />

      <Button
        title="Decrease"
        onPress={() => {
          setCounter(counter - 1);
        }}
      />

      <Text>Current Count: {counter}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default CounterScreen;
