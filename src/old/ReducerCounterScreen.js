import React, { useReducer } from "react";
import { Text, StyleSheet, View, Button } from "react-native";

const reducer = (state, action) => {
  // state === { count: num }
  // action === { type: "Increment" || "Decrement", payload: 1}
  switch (action.type) {
    case "Increase":
      return { ...state, counter: state.counter + action.payload };
    case "Decrease":
      return { ...state, counter: state.counter - action.payload };
    default:
      return state;
  }
};

const ReducerCounterScreen = () => {
  const [state, dispatch] = useReducer(reducer, { counter: 0 });
  const { counter } = state;

  return (
    <View>
      <Button
        title="Increase"
        onPress={() => {
          dispatch({ type: "Increase", payload: 1 });
        }}
      />

      <Button
        title="Decrease"
        onPress={() => {
          dispatch({ type: "Decrease", payload: 1 });
        }}
      />

      <Text>Current Count: {state.counter}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ReducerCounterScreen;
